import fs from 'fs';
import {Constants} from '../../constants';
import {Util} from '../../util';
import fetch from 'cross-fetch';
import FormData from 'form-data';
import {SolNative} from '../../sol-native';
import path from 'path';
import {Keypair, LAMPORTS_PER_SOL} from '@solana/web3.js';
import {Storage} from './index';

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

  const calculateArFee = async (files: Buffer[]) => {
    const totalBytes = files.reduce((sum, f) => (sum += f.length), 0);

    console.debug('Total bytes', totalBytes);

    const txnFeeInWinstons = parseInt(
      await (
        await fetch(`${Constants.ARWEAVE_GATEWAY_URL}/price/0`)).text()
      , DEFAULT_RADIX);

    console.debug('txn fee', txnFeeInWinstons);

    const byteCostInWinstons = parseInt(
      await (
        await fetch(`${Constants.ARWEAVE_GATEWAY_URL}/price/` + totalBytes.toString())
      ).text()
      , DEFAULT_RADIX);

    console.debug('byte cost', byteCostInWinstons);

    const totalArCost =
      (txnFeeInWinstons * files.length + byteCostInWinstons) / WINSTON_MULTIPLIER;

    console.debug('total ar', totalArCost);

    const conversionRates = JSON.parse(await (
      await fetch(`${Constants.COIN_MARKET_URL}?ids=solana,arweave&vs_currencies=usd`)
    ).text());

    console.debug(JSON.stringify(conversionRates));

    // To figure out how many lamports are required, multiply ar byte cost by this number
    const arMultiplier =
      (conversionRates.arweave.usd / conversionRates.solana.usd) / LAMPORTS_PER_SOL;
    console.debug('Ar mult', arMultiplier);
    // // We also always make a manifest file, which, though tiny, needs payment.
    return LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1;
  }

  const isJpegFile = (imageName: string): boolean => {
    const match = imageName.match(/.+(.jpeg|.jpg)$/i);
    return Util.isEmpty(match) ? false : true;
  }

  const createMetadata = ( storageData: Storage.Format): {buffer: Buffer, pngName: string} => {
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
    uploadData.append('env', Constants.CURRENT_NETWORK);
    uploadData.append('file[]', imageBuffer, {filename: pngName, contentType: 'image/png'});
    uploadData.append('file[]', metadataBuffer, METADATA_FILE);
    return uploadData;
  }
  const uploadServer = async (uploadData: BodyInit): Promise<ArweaveResult> => {
    return await (await fetch(
      Constants.ARWEAVE_UPLOAD_SRV_URL,
      {
        method: 'POST',
        body: uploadData,
      }
    )).json() as ArweaveResult;
  }

  export const upload = async (
    payer: Keypair,
    storageData: Storage.Format
  ) => {
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

    await SolNative.transfer(
      payer.publicKey,
      [payer],
      Constants.AR_SOL_HOLDER_ID,
      await calculateArFee(fileBuffers)
    )();

    // todo: No support FormData
    const res = await uploadServer(formData as any);
    if (res.error) throw new Error(res.error);

    const manifest = res.messages.pop();
    return `${Constants.ARWEAVE_GATEWAY_URL}/${manifest!.transactionId}`
  }
}
