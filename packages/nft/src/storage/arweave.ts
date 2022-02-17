import fs from 'fs';
import {Storage} from './';
import fetch from 'cross-fetch';
import FormData from 'form-data';
import path from 'path';
import {
  Keypair,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

import {
  Constants,
  ConstantsFunc,
  Result
} from '@solana-suite/shared'

import {
  SolNative,
} from '@solana-suite/core';

export namespace StorageArweave {
  const METADATA_FILE = 'metadata.json';
  const LAMPORT_MULTIPLIER = 10 ** 9;
  const WINSTON_MULTIPLIER = 10 ** 12;
  const DEFAULT_RADIX = 10;

  interface ArweaveResult {
    error: string;
    messages: [
      {
        filename: string;
        status: 'success' | 'fail';
        transactionId: string;
        error?: string;
      }
    ];
  }

  interface ConventionsRate {
    solana: {
      usd: number
    },
    arweave: {
      usd: number
    }
  }

  const totalBytes = (files: Buffer[]): number => {
    const bytes = files.reduce((sum, f) => (sum += f.length), 0);
    console.debug('# total bytes: ', bytes);
    return bytes;
  }

  const fetchArweaveFeePrice = async ()
    : Promise<Result<number, Error>> => {
    const res = await (await fetch(`${Constants.ARWEAVE_GATEWAY_URL}/price/0`))
      .text()
      .then(Result.ok)
      .catch(Result.err)

    if (res.isErr) return Result.err(res.error);

    const price = parseInt(res.value, DEFAULT_RADIX);
    console.debug('# arweave txn fee: ', price);
    return Result.ok(price);
  }

  const fetchArweaveContentsCost = async (cost: number)
    : Promise<Result<number, Error>> => {
    const res = await (await fetch(`${Constants.ARWEAVE_GATEWAY_URL}/price/${cost.toString()}`))
      .text()
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) return Result.err(res.error);

    const price = parseInt(res.value, DEFAULT_RADIX);
    console.debug('# arweave contents cost: ', price);
    return Result.ok(price);
  }

  const fetchConvesionRateSolAndAr = async ()
    : Promise<Result<ConventionsRate, Error>> => {
    const res = await (await fetch(`${Constants.COIN_MARKET_URL}?ids=solana,arweave&vs_currencies=usd`))
      .text()
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) return Result.err(res.error);

    console.debug('# conversion rate: ', JSON.stringify(res.value));
    return Result.ok(JSON.parse(res.value));
  }

  const calculateArweave = async (files: Buffer[]) => {
    const t = totalBytes(files);
    const feePrice = await fetchArweaveFeePrice();
    if (feePrice.isErr) return Result.err(feePrice.error);

    const contentsPrice = await fetchArweaveContentsCost(t);
    if (contentsPrice.isErr) return Result.err(contentsPrice.error);

    const totalArCost =
      (feePrice.value * files.length + contentsPrice.value) / WINSTON_MULTIPLIER;

    console.debug('# total arweave cost: ', totalArCost);

    // MEMO: To figure out how many lamports are required, multiply ar byte cost by this number
    const rates = await fetchConvesionRateSolAndAr();
    if (rates.isErr) return Result.err(rates.error);

    const multiplier =
      (rates.value.arweave.usd / rates.value.solana.usd) / LAMPORTS_PER_SOL;
    console.debug('# arweave multiplier: ', multiplier);

    // MEMO: We also always make a manifest file, which, though tiny, needs payment.
    return Result.ok(LAMPORT_MULTIPLIER * totalArCost * multiplier * 1.1);
  }

  const isJpegFile = (imageName: string): boolean => {
    const match = imageName.match(/.+(.jpeg|.jpg)$/i);
    return match !== null;
  }

  const createMetadata = (storageData: Storage.Format): {buffer: Buffer, pngName: string} => {
    let image = path.basename(storageData.image);
    if (isJpegFile(image)) {
      const split = image.split('.jpeg');
      image = `${split[0]}.png`;
    }

    // update image name
    storageData.image = image;

    return {
      buffer: Buffer.from(JSON.stringify(storageData)),
      pngName: image
    };
  }

  const createUploadData = (
    payedSignature: string,
    pngName: string,
    imageBuffer: Buffer,
    metadataBuffer: Buffer
  ): FormData => {
    const uploadData = new FormData();
    uploadData.append('transaction', payedSignature);
    uploadData.append('env', ConstantsFunc.switchApi(Constants.currentCluster));
    uploadData.append('file[]', imageBuffer, {filename: pngName, contentType: 'image/png'});
    uploadData.append('file[]', metadataBuffer, METADATA_FILE);
    return uploadData;
  }
  const uploadServer = async (uploadData: BodyInit):
    Promise<Result<ArweaveResult, Error>> => {
    const res = await fetch(
      Constants.ARWEAVE_UPLOAD_SRV_URL,
      {
        method: 'POST',
        body: uploadData,
      }
    )
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) return res.error;

    const json = await res.value.json()
      .then(Result.ok)
      .catch(Result.err);

    if (json.isErr) return json;
    return Result.ok(json.value);
  }

  export const upload = async (
    payer: Keypair,
    storageData: Storage.Format
  ): Promise<Result<string, Error>> => {
    const imagePath = storageData.image;
    const meta = createMetadata(storageData);

    const fileBuffers: Buffer[] = [];
    const imageBuffer = fs.readFileSync(imagePath);
    const metadataBuffer = meta.buffer;
    fileBuffers.push(imageBuffer);
    fileBuffers.push(metadataBuffer);

    const formData = createUploadData(
      payer.publicKey.toBase58(),
      meta.pngName,
      imageBuffer,
      metadataBuffer
    );

    const totalConst = await calculateArweave(fileBuffers);
    if (totalConst.isErr) return Result.err(totalConst.error);

    const inst =
      await SolNative.transfer(
        payer.publicKey,
        Constants.AR_SOL_HOLDER_ID,
        [payer],
        totalConst.value
      );

    if (inst.isErr) {
      return Result.err(inst.error);
    } else {
      const sig = await inst.submit();
      if (sig.isErr) {
        return Result.err(sig.error);
      }
    }


    // todo: No support FormData
    const res = await uploadServer(formData as any)
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) return res.error;
    const manifest = (res.value.unwrap() as ArweaveResult).messages[0];
    if (!manifest) return Result.err(Error('Invalid manifest data'));
    return Result.ok(`${Constants.ARWEAVE_GATEWAY_URL}/${manifest!.transactionId}`);
  }
}
