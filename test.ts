interface StorageNftStorage {};
interface StorageArweave {};

type NftStorage = StorageArweave | StorageNftStorage;

const demo = <NftStorage>(data: NftStorage) => {
  console.log(typeof data);  
  return `${data} +++++`; 
}


const res = demo<StorageNftStorage>('test');

console.log(res);
