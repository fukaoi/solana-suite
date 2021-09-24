import fetch from "cross-fetch";
import FormData from 'form-data';
import fs from 'fs';

const txid = '5qRGhUcqavLPqL887jgs6CoammYEZh7wJaUmGTQYZKWrPm3UFFw5SWCJUsrY7JY2bVCiGBGneQgbhihaYuqQx6DS';

const uploadData = new FormData();
const metadata = JSON.parse(fs.readFileSync('./test/assets/metadata.json', 'utf8'));
const manifestBuffer = Buffer.from(JSON.stringify(metadata));
uploadData.append('transaction', txid);
uploadData.append('env', 'devnet');
const imagePath = './test/assets/cat.png';
const moviePath = './test/assets/movie.mp4';
const fileSize = fs.statSync(imagePath).size;
uploadData.append('file[]', fs.createReadStream(imagePath), {filename: `image.png`, contentType: 'image/png', knownLength: fileSize});
uploadData.append('file[]', fs.createReadStream(moviePath), {filename: `moivie.mp4`, contentType: 'video/mgp4'});
uploadData.append('file[]', manifestBuffer, 'metadata.json');

const main = async () => {
  const result = await (await fetch(
    'https://us-central1-principal-lane-200702.cloudfunctions.net/uploadFile4',
    {
      method: 'POST',
      body: uploadData as any,
    }
  )).json() as any;

  console.info(result);
  console.info(`https://arweave.net/${result.messages[0].transactionId}`);
  console.info(`https://arweave.net/${result.messages[1].transactionId}`);
}


main();
