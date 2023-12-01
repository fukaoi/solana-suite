// src/search-config.ts
import {
  readdirSync,
  statSync
} from "node:fs";
import { join } from "node:path";
var Config;
((Config2) => {
  Config2.JSON_FILE_NAME = "solana-suite.json";
  Config2.searchForSolanaSuiteConfig = (dir) => {
    const files = readdirSync(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      if (statSync(filePath).isFile() && file === Config2.JSON_FILE_NAME) {
        return filePath;
      } else if (statSync(filePath).isDirectory()) {
        const res = (0, Config2.searchForSolanaSuiteConfig)(filePath);
        if (res) {
          return res;
        }
      }
    }
    return void 0;
  };
})(Config || (Config = {}));
export {
  Config
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7XG4gIGV4aXN0c1N5bmMsXG4gIHJlYWRkaXJTeW5jLFxuICByZWFkRmlsZVN5bmMsXG4gIHJtZGlyU3luYyxcbiAgc3RhdFN5bmMsXG4gIHdyaXRlRmlsZVN5bmMsXG59IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maWcge1xuICBleHBvcnQgY29uc3QgSlNPTl9GSUxFX05BTUUgPSAnc29sYW5hLXN1aXRlLmpzb24nO1xuICBleHBvcnQgY29uc3Qgc2VhcmNoRm9yU29sYW5hU3VpdGVDb25maWcgPSAoXG4gICAgZGlyOiBzdHJpbmcsXG4gICk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgZmlsZXMgPSByZWFkZGlyU3luYyhkaXIpO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBqb2luKGRpciwgZmlsZSk7XG4gICAgICBpZiAoc3RhdFN5bmMoZmlsZVBhdGgpLmlzRmlsZSgpICYmIGZpbGUgPT09IEpTT05fRklMRV9OQU1FKSB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdFN5bmMoZmlsZVBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgY29uc3QgcmVzID0gc2VhcmNoRm9yU29sYW5hU3VpdGVDb25maWcoZmlsZVBhdGgpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBO0FBQUEsRUFFRTtBQUFBLEVBR0E7QUFBQSxPQUVLO0FBRVAsU0FBUyxZQUFZO0FBRWQsSUFBVTtBQUFBLENBQVYsQ0FBVUEsWUFBVjtBQUNFLEVBQU1BLFFBQUEsaUJBQWlCO0FBQ3ZCLEVBQU1BLFFBQUEsNkJBQTZCLENBQ3hDLFFBQ3VCO0FBQ3ZCLFVBQU0sUUFBUSxZQUFZLEdBQUc7QUFDN0IsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxXQUFXLEtBQUssS0FBSyxJQUFJO0FBQy9CLFVBQUksU0FBUyxRQUFRLEVBQUUsT0FBTyxLQUFLLFNBQVNBLFFBQUEsZ0JBQWdCO0FBQzFELGVBQU87QUFBQSxNQUNULFdBQVcsU0FBUyxRQUFRLEVBQUUsWUFBWSxHQUFHO0FBQzNDLGNBQU0sVUFBTUEsUUFBQSw0QkFBMkIsUUFBUTtBQUMvQyxZQUFJLEtBQUs7QUFDUCxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsR0FsQmU7IiwKICAibmFtZXMiOiBbIkNvbmZpZyJdCn0K