
// namespace Default {

  interface String {
    toPubKey(): string;
  }

  String.prototype.toPubKey = () => {
    return 'fuck';
  };
  console.log('test'.toPubKey());
// }
