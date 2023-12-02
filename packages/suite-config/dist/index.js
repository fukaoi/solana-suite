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
  Config2.searchConfigJson = (dir) => {
    const files = (0, import_node_fs.readdirSync)(dir);
    for (const file of files) {
      const filePath = (0, import_node_path.join)(dir, file);
      if ((0, import_node_fs.statSync)(filePath).isFile() && file === Config2.JSON_FILE_NAME) {
        return filePath;
      } else if ((0, import_node_fs.statSync)(filePath).isDirectory()) {
        const res = (0, Config2.searchConfigJson)(filePath);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9zZWFyY2gtY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL3NlYXJjaC1jb25maWcnO1xuIiwgImltcG9ydCB7IHJlYWRkaXJTeW5jLCBzdGF0U3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uZmlnIHtcbiAgZXhwb3J0IGNvbnN0IEpTT05fRklMRV9OQU1FID0gJ3NvbGFuYS1zdWl0ZS5qc29uJztcblxuICAvKipcbiAgICogU2VhcmNoICBmaWxlIHBhdGggZm9yIHNvbGFuYS1zdWl0ZS5qc29uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBzZWFyY2hDb25maWdKc29uID0gKGRpcjogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBmaWxlcyA9IHJlYWRkaXJTeW5jKGRpcik7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oZGlyLCBmaWxlKTtcbiAgICAgIGlmIChzdGF0U3luYyhmaWxlUGF0aCkuaXNGaWxlKCkgJiYgZmlsZSA9PT0gSlNPTl9GSUxFX05BTUUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgfSBlbHNlIGlmIChzdGF0U3luYyhmaWxlUGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBjb25zdCByZXMgPSBzZWFyY2hDb25maWdKc29uKGZpbGVQYXRoKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEscUJBQXNDO0FBQ3RDLHVCQUFxQjtBQUVkLElBQVU7QUFBQSxDQUFWLENBQVVBLFlBQVY7QUFDRSxFQUFNQSxRQUFBLGlCQUFpQjtBQU92QixFQUFNQSxRQUFBLG1CQUFtQixDQUFDLFFBQW9DO0FBQ25FLFVBQU0sWUFBUSw0QkFBWSxHQUFHO0FBQzdCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sZUFBVyx1QkFBSyxLQUFLLElBQUk7QUFDL0IsY0FBSSx5QkFBUyxRQUFRLEVBQUUsT0FBTyxLQUFLLFNBQVNBLFFBQUEsZ0JBQWdCO0FBQzFELGVBQU87QUFBQSxNQUNULGVBQVcseUJBQVMsUUFBUSxFQUFFLFlBQVksR0FBRztBQUMzQyxjQUFNLFVBQU1BLFFBQUEsa0JBQWlCLFFBQVE7QUFDckMsWUFBSSxLQUFLO0FBQ1AsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEdBdEJlOyIsCiAgIm5hbWVzIjogWyJDb25maWciXQp9Cg==