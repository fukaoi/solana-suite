"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Config: () => Config
});
module.exports = __toCommonJS(src_exports);

// src/search-config.ts
var import_node_fs = require("fs");
var import_node_path = require("path");
var Config;
((Config2) => {
  Config2.JSON_FILE_NAME = "solana-suite.json";
  Config2.searchForSolanaSuiteConfig = (dir) => {
    const files = (0, import_node_fs.readdirSync)(dir);
    for (const file of files) {
      const filePath = (0, import_node_path.join)(dir, file);
      if ((0, import_node_fs.statSync)(filePath).isFile() && file === Config2.JSON_FILE_NAME) {
        return filePath;
      } else if ((0, import_node_fs.statSync)(filePath).isDirectory()) {
        const res = (0, Config2.searchForSolanaSuiteConfig)(filePath);
        if (res) {
          return res;
        }
      }
    }
    return void 0;
  };
})(Config || (Config = {}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Config
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9zZWFyY2gtY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL3NlYXJjaC1jb25maWcnO1xuIiwgImltcG9ydCB7XG4gIGV4aXN0c1N5bmMsXG4gIHJlYWRkaXJTeW5jLFxuICByZWFkRmlsZVN5bmMsXG4gIHJtZGlyU3luYyxcbiAgc3RhdFN5bmMsXG4gIHdyaXRlRmlsZVN5bmMsXG59IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maWcge1xuICBleHBvcnQgY29uc3QgSlNPTl9GSUxFX05BTUUgPSAnc29sYW5hLXN1aXRlLmpzb24nO1xuICBleHBvcnQgY29uc3Qgc2VhcmNoRm9yU29sYW5hU3VpdGVDb25maWcgPSAoXG4gICAgZGlyOiBzdHJpbmcsXG4gICk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgZmlsZXMgPSByZWFkZGlyU3luYyhkaXIpO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBqb2luKGRpciwgZmlsZSk7XG4gICAgICBpZiAoc3RhdFN5bmMoZmlsZVBhdGgpLmlzRmlsZSgpICYmIGZpbGUgPT09IEpTT05fRklMRV9OQU1FKSB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdFN5bmMoZmlsZVBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgY29uc3QgcmVzID0gc2VhcmNoRm9yU29sYW5hU3VpdGVDb25maWcoZmlsZVBhdGgpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxxQkFPTztBQUVQLHVCQUFxQjtBQUVkLElBQVU7QUFBQSxDQUFWLENBQVVBLFlBQVY7QUFDRSxFQUFNQSxRQUFBLGlCQUFpQjtBQUN2QixFQUFNQSxRQUFBLDZCQUE2QixDQUN4QyxRQUN1QjtBQUN2QixVQUFNLFlBQVEsNEJBQVksR0FBRztBQUM3QixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLGVBQVcsdUJBQUssS0FBSyxJQUFJO0FBQy9CLGNBQUkseUJBQVMsUUFBUSxFQUFFLE9BQU8sS0FBSyxTQUFTQSxRQUFBLGdCQUFnQjtBQUMxRCxlQUFPO0FBQUEsTUFDVCxlQUFXLHlCQUFTLFFBQVEsRUFBRSxZQUFZLEdBQUc7QUFDM0MsY0FBTSxVQUFNQSxRQUFBLDRCQUEyQixRQUFRO0FBQy9DLFlBQUksS0FBSztBQUNQLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxHQWxCZTsiLAogICJuYW1lcyI6IFsiQ29uZmlnIl0KfQo=