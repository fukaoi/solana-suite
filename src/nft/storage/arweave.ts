import fs from 'fs';
import {Constants} from '../../constants';
import {Util} from '../../util';
import fetch from 'cross-fetch';
import FormData from 'form-data';
import {SolNative} from '../../sol-native';
import {Storage} from './index';
import path from 'path';

export namespace StorageArweave {
  const METADATA_FILE = 'metadata.json';
  const LAMPORT_MULTIPLIER = 10 ** 9;
  const WINSTON_MULTIPLIER = 10 ** 12;

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

  const createGatewayUrl = (cid: string): string => `https://arweave.net/${cid}`

  const calculateArFee = async (files: File[]) => {
    const totalBytes = files.reduce((sum, f) => (sum += f.size), 0);
    console.log('Total bytes', totalBytes);
    const txnFeeInWinstons = parseInt(
      await (await fetch('https://arweave.net/price/0')).text(),
    );
    console.log('txn fee', txnFeeInWinstons);
    const byteCostInWinstons = parseInt(
      await (
        await fetch('https://arweave.net/price/' + totalBytes.toString())
      ).text(),
    );
    console.log('byte cost', byteCostInWinstons);
    const totalArCost =
      (txnFeeInWinstons * files.length + byteCostInWinstons) / WINSTON_MULTIPLIER;

    console.log('total ar', totalArCost);

    let conversionRates = JSON.parse(
      localStorage.getItem('conversionRates') || '{}',
    );

    if (
      !conversionRates ||
      !conversionRates.expiry ||
      conversionRates.expiry < Date.now()
    ) {
      conversionRates = {
        value: JSON.parse(
          await (
            await fetch(
              'https://api.coingecko.com/api/v3/simple/price?ids=solana,arweave&vs_currencies=usd',
            )
          ).text(),
        ),
        expiry: Date.now() + 5 * 60 * 1000,
      };

      if (conversionRates.value.solana) {
        try {
          localStorage.setItem(
            'conversionRates',
            JSON.stringify(conversionRates),
          );
        } catch {
          // ignore
        }
      }
    }

    // To figure out how many lamports are required, multiply ar byte cost by this number
    const arMultiplier =
      conversionRates.value.arweave.usd / conversionRates.value.solana.usd;
    console.log('Ar mult', arMultiplier);
    // We also always make a manifest file, which, though tiny, needs payment.
    return LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1;
  }

  const isJpegFile = (imageName: string): boolean => {
    const match = imageName.match(/.+(.jpeg|.jpg)$/i);
    return Util.isEmpty(match) ? false : true;
  }

  const createMetadata = (
    name: string, 
    description: string, 
    imagePath: string
  ): {buffer: Buffer, pngName: string} => {
    let image = path.basename(imagePath);
    if (isJpegFile(image)) {
      const split = image.split('.jpeg');
      image = `${split[0]}.png`;
    }

    const metadata: Storage.MetadataFormat = {
      name,
      description,
      image
    }
    return {
      buffer: Buffer.from(JSON.stringify(metadata)),
      pngName: image
    };
  }

  const createUploadData = (
    payedSignature: string,
    imagePath: string,
    pngName: string,
    metadataBuffer: Buffer
  ): FormData => {
    const uploadData = new FormData();
    uploadData.append('transaction', payedSignature);
    uploadData.append('env', Constants.CURRENT_NETWORK);
    uploadData.append('file[]', fs.createReadStream(imagePath), {filename: pngName, contentType: 'image/png'});
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
    payerSecret: string,
    name: string,
    description: string,
    imagePath: string,
  ) => {
    const payer = Util.createKeypair(payerSecret);
    const meta = createMetadata(name, description, imagePath);

    const fileBuffers: File[] = [];
    const imageBuffer = fs.createReadStream(imagePath);
    const metadataBuffer = meta.buffer;
    imageBuffer.size;

    const formData = createUploadData(
      payer.publicKey.toBase58(),
      imagePath,
      meta.pngName,
      meta.buffer
    );


    await SolNative.transfer(
      payer.publicKey.toString(),
      [payerSecret],
      Constants.AR_SOL_HOLDER_ID,
      await calculateArFee()
    )();

    // todo: No support FormData
    const res = await uploadServer(formData as any);
    if (res.error) throw new Error(res.error);

    const manifest = res.messages.pop();
    return createGatewayUrl(manifest!.transactionId);
  }
}
