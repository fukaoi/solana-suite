import {
  JsonMetadata,
  CreateNftInput,
} from "@metaplex-foundation/js";

interface StorageNftStorage extends JsonMetadata {
  storageType: 'nftStorage';
};

type StorageArweave = JsonMetadata & { 
  storageType: 'arweave',
  feePayer: string
};

const data: StorageArweave = {
  name: 'test',
  storageType: 'arweave',
  feePayer: 'feePayer'
};

console.log(typeof data, data.storageType);

type NftStorage = StorageArweave | StorageNftStorage;

type noNeedOptional = 'confirmOptions' | 'payer' | 'associatedTokenProgram' | 'tokenProgram';
type MetaplexData = Omit<CreateNftInput, noNeedOptional>;


const data3 :MetaplexData = {
  uri: 'https://xxxxx.dom',
};


const data2: NftStorage = {
  name: 'test',
  storageType: 'nftStorage',
  // feePayer: 'feePayer'
}


console.log(data2);

