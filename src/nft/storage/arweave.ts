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

  const calculateArFee = () => {
    return 0.00001;
  }

  const createMetadataBuffer = (name: string, description: string, imagePath: string): Buffer => {
    const image = path.basename(imagePath);
    const metadata: Storage.MetadataFormat = {
      name,
      description,
      image
    }
    return Buffer.from(JSON.stringify(metadata));
  }

  const createUploadData = (
    payedSignature: string,
    imagePath: string,
    metadataBuffer: Buffer
  ): FormData => {
    const uploadData = new FormData();
    uploadData.append('transaction', payedSignature);
    uploadData.append('env', Constants.CURRENT_NETWORK);
    uploadData.append('file[]', fs.createReadStream(imagePath), {filename: `image.png`, contentType: 'image/png'});
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
    const buffer = createMetadataBuffer(name, description, imagePath);

    await SolNative.transfer(
      payer.publicKey.toString(),
      [payerSecret],
      Constants.AR_SOL_HOLDER_ID,
      calculateArFee()
    )();

    const metadata = createUploadData(
      payer.publicKey.toBase58(),
      imagePath,
      buffer
    );
    // todo: No support FormData
    const res = await uploadServer(metadata as any);
    if (res.error) throw new Error(res.error);

    const manifest = res.messages.pop();
    return createGatewayUrl(manifest!.transactionId);
  }
}
