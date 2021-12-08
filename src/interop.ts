export namespace Interop {
  export const isNodeJs = (): boolean => {
    if (typeof process === 'object') {
      if (typeof process.versions === 'object') {
        if (typeof process.versions.node !== 'undefined') {
          return true;
        }
      }
    }
    return false;
  }

  export const fetchJson = async (filePath: string) => {
    if (isNodeJs()) {
      const fs = await import('fs');
      return fs.readFileSync(filePath);
    } else {
      // todo:browser 
    }
  }

  // export const getSolanaSuiteConfig = async () => {
    // if (isNodeJs()) {
      // return (import('../package.json')).solanaSuite;
    // } else {
      // // todo:browser 
      // return (await import('../package.json')).solanaSuite;
    // }
  // }
}
