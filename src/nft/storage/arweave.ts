import Arweave from 'arweave';
import fs from 'fs';

export namespace StorageArweave {

  // const connect = () => {
    // return Arweave.init({
      // host: 'arweave.net'
    // });
  // }

  // export const upload = async (
    // name: string,
    // description: string,
    // imagePath: string
  // ) => {
    // const arweave = connect();
    // let data = fs.readFileSync(imagePath);

    // let transaction = await arweave.createTransaction({data: data}, key);
    // transaction.addTag('Content-Type', 'application/pdf');

    // await arweave.transactions.sign(transaction, key);

    // let uploader = await arweave.transactions.getUploader(transaction);

    // while (!uploader.isComplete) {
      // await uploader.uploadChunk();
      // console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
    // }
  // }
}
