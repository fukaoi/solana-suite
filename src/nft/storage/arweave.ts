import fs from 'fs';
import {Constants} from '../../constants';
import {Util} from '../../util';
import fetch from 'cross-fetch';
import FormData from 'form-data';
import {SolNative} from '../../sol-native';

export namespace StorageArweave {
  const METADATA_FILE = 'metadata.json';

  interface ArweaveResult {
    error?: string;
    messages?: {
      filename: string;
      status: 'success' | 'fail';
      transactionId?: string;
      error?: string;
    }[];
  }

  const calculateArFee = () => {
    return 0.00001;
  }

  const createMetadataJsonFile = (name: string, description: string, image: string) => {
    return './test/assets/metadata.json';
  }

  const createUploadData = (
    payedSignature: string,
    imagePath: string,
    metadataJsonFilePath: string
  ) => {
    const uploadData = new FormData();
    const metadata = JSON.parse(fs.readFileSync(metadataJsonFilePath, 'utf8'));
    const manifestBuffer = Buffer.from(JSON.stringify(metadata));
    uploadData.append('transaction', payedSignature);
    uploadData.append('env', Constants.CURRENT_NETWORK);
    const fileSize = fs.statSync(imagePath).size;
    uploadData.append('file[]', fs.createReadStream(imagePath), {filename: `image.jpeg`, contentType: 'image/jpeg', knownLength: fileSize});
    uploadData.append('file[]', manifestBuffer, METADATA_FILE);
    return uploadData;
  }

  const uploadServer = async (uploadData: FormData) => {
    return await (await fetch(
      Constants.ARWEAVE_UPLOAD_SRV_URL,
      {
        method: 'POST',
        body: uploadData as any,
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
    const metadataFilePath = createMetadataJsonFile(name, description, imagePath);

    await SolNative.transfer(
      payer.publicKey.toString(),
      [payerSecret],
      Constants.AR_SOL_HOLDER_ID,
      calculateArFee()
    )();

    const metadata = createUploadData(
      payer.publicKey.toBase58(),
      imagePath,
      metadataFilePath
    );
    return await uploadServer(metadata);
  }
}
