export namespace CrossModule {
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

    }
  }
}
