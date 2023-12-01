#!/usr/bin/env node
"use strict";

// src/index.ts
var import_node_fs = require("fs");
var import_commander = require("commander");
var import_node_path = require("path");
var program = new import_commander.Command();
var configPath;
var parsed;
var JSON_FILE_NAME = "solana-suite.json";
var VERSION = "0.5";
var successMessage = () => console.log("# Update solana suite config.");
var showMessage = (mess) => console.log(`# ${mess}`);
var warnMessage = (mess) => console.error(`# ${mess}`);
var searchForSolanaSuiteConfig = (dir) => {
  const files = (0, import_node_fs.readdirSync)(dir);
  for (const file of files) {
    const filePath = (0, import_node_path.join)(dir, file);
    if ((0, import_node_fs.statSync)(filePath).isFile() && file === JSON_FILE_NAME) {
      return filePath;
    } else if ((0, import_node_fs.statSync)(filePath).isDirectory()) {
      const res = searchForSolanaSuiteConfig(filePath);
      if (res) {
        return res;
      }
    }
  }
  return void 0;
};
(() => {
  try {
    const path = searchForSolanaSuiteConfig("./");
    if (!path) {
      throw Error(`Not found ${JSON_FILE_NAME}`);
    }
    configPath = path;
    showMessage(`config path: ${configPath}`);
    parsed = JSON.parse((0, import_node_fs.readFileSync)(configPath).toString());
  } catch (e) {
    if (e instanceof Error) {
      warnMessage(`Error don't read solana-suite-config.json, ${e.message}`);
    }
    process.exit(0);
  }
})();
var updateDebugConfigFile = (debugging) => {
  parsed["debugging"] = debugging;
  (0, import_node_fs.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterConfigFile = (type) => {
  parsed["cluster"].type = type;
  (0, import_node_fs.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterUrlConfigFile = (customClusterUrl) => {
  parsed["cluster"].customClusterUrl = customClusterUrl;
  (0, import_node_fs.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateNftStorageConfigFile = (apiKey) => {
  parsed["nftStorageApiKey"] = apiKey;
  (0, import_node_fs.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateDasApiUrlConfigFile = (dasApiUrl) => {
  parsed["dasApiUrl"] = dasApiUrl;
  (0, import_node_fs.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var showCurrentConfigFile = () => {
  const cjs = (0, import_node_fs.readFileSync)(JSON_FILE_NAME);
  showMessage(`Current cjs
${cjs.toString()}
`);
};
var clearCache = () => {
  const dir = "../../node_modules/.cache";
  if (dir !== void 0 && (0, import_node_fs.existsSync)(dir)) {
    (0, import_node_fs.rmdirSync)(dir, { recursive: true });
    showMessage("clear cache");
  }
};
program.name("solana-suite-config").description(`Setup ${JSON_FILE_NAME}`).version(VERSION);
program.option(
  "-c --cluster <cluster type>",
  'connect to cluster type. "prd", "dev", "test", "localhost"'
).option(
  "-cc --custom-cluster <cluster url...>",
  'connect to cluster url. "https://...", if you set more than one url, please separate them with a space'
).option(
  "-d --debug <true or false>",
  'display debug log on terminal. defalut "false" '
).option(
  "-n --nftstorage <apikey>",
  'Set apikey of nft.storage. "eyJhbGciO..."'
).option(
  "-das --das-api-url <digital asset api url...>",
  'connect to digital asset api url. "https://...", if you set more than one url, please separate them with a space'
).option("-s --show", "Show value current solana-suite.json");
program.parse();
var execCluser = (type) => {
  let convertedType = "";
  switch (type) {
    case "prd":
      convertedType = "mainnet-beta";
      break;
    case "dev":
      convertedType = "devnet";
      break;
    case "test":
      convertedType = "testnet";
      break;
    case "localhost":
      convertedType = "localhost-devnet";
      break;
    default:
      warnMessage(
        `No match parameter: need parameter is
"prd", "dev", "test", "localhost", any one of them`
      );
  }
  updateClusterConfigFile(convertedType);
};
var execCustomCluster = (url) => {
  const validation = (u) => {
    return /https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(u);
  };
  url.forEach((element) => {
    if (!validation(element)) {
      warnMessage(
        `Not found custom cluster url: ${element}. e.g: custom https://...`
      );
      process.exit(0);
    }
  });
  updateClusterUrlConfigFile(url);
};
var execDebug = (bool) => {
  if (bool != "true" && bool != "false") {
    warnMessage(
      `No match parameter: need parameter is "true", "false". any one of them`
    );
    process.exit(0);
  }
  updateDebugConfigFile(bool);
};
var execNftstorage = (apiKey) => {
  if (apiKey.length < 230) {
    warnMessage("Not found api key");
    process.exit(0);
  }
  updateNftStorageConfigFile(apiKey);
};
var execDasApiUrl = (url) => {
  const validation = (u) => {
    return /https?:\/\/[-_.!~*\\()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(u);
  };
  url.forEach((element) => {
    if (!validation(element)) {
      warnMessage(
        `Not found Digital asset api url: ${element}. e.g: https://...`
      );
      process.exit(0);
    }
  });
  updateDasApiUrlConfigFile(url);
};
var execShow = () => {
  showCurrentConfigFile();
};
var options = program.opts();
if (options.cluster) {
  execCluser(options.cluster);
} else if (options.customCluster) {
  execCustomCluster(options.customCluster);
} else if (options.debug) {
  execDebug(options.debug);
} else if (options.nftstorage) {
  execNftstorage(options.nftstorage);
} else if (options.dasApiUrl) {
  execDasApiUrl(options.dasApiUrl);
} else if (options.show) {
  execShow();
} else {
  warnMessage("No match parameter");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCB7XG4gIGV4aXN0c1N5bmMsXG4gIHJlYWRkaXJTeW5jLFxuICByZWFkRmlsZVN5bmMsXG4gIHJtZGlyU3luYyxcbiAgc3RhdFN5bmMsXG4gIHdyaXRlRmlsZVN5bmMsXG59IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcbmNvbnN0IHByb2dyYW0gPSBuZXcgQ29tbWFuZCgpO1xuXG5sZXQgY29uZmlnUGF0aDogc3RyaW5nO1xubGV0IHBhcnNlZDoge1xuICBjbHVzdGVyOiB7IHR5cGU6IHN0cmluZzsgY3VzdG9tQ2x1c3RlclVybDogc3RyaW5nW10gfTtcbiAgZGVidWdnaW5nOiBzdHJpbmc7XG4gIG5mdFN0b3JhZ2VBcGlLZXk6IHN0cmluZztcbiAgZGFzQXBpVXJsOiBzdHJpbmdbXTtcbn07XG5jb25zdCBKU09OX0ZJTEVfTkFNRSA9ICdzb2xhbmEtc3VpdGUuanNvbic7XG5jb25zdCBWRVJTSU9OID0gJzAuNSc7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGxvY2FsIGZ1bmN0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3Qgc3VjY2Vzc01lc3NhZ2UgPSAoKSA9PiBjb25zb2xlLmxvZygnIyBVcGRhdGUgc29sYW5hIHN1aXRlIGNvbmZpZy4nKTtcbmNvbnN0IHNob3dNZXNzYWdlID0gKG1lc3M6IHN0cmluZykgPT4gY29uc29sZS5sb2coYCMgJHttZXNzfWApO1xuY29uc3Qgd2Fybk1lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmVycm9yKGAjICR7bWVzc31gKTtcblxuY29uc3Qgc2VhcmNoRm9yU29sYW5hU3VpdGVDb25maWcgPSAoZGlyOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCBmaWxlcyA9IHJlYWRkaXJTeW5jKGRpcik7XG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihkaXIsIGZpbGUpO1xuICAgIGlmIChzdGF0U3luYyhmaWxlUGF0aCkuaXNGaWxlKCkgJiYgZmlsZSA9PT0gSlNPTl9GSUxFX05BTUUpIHtcbiAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICB9IGVsc2UgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICBjb25zdCByZXMgPSBzZWFyY2hGb3JTb2xhbmFTdWl0ZUNvbmZpZyhmaWxlUGF0aCk7XG4gICAgICBpZiAocmVzKSB7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG4oKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGggPSBzZWFyY2hGb3JTb2xhbmFTdWl0ZUNvbmZpZygnLi8nKTtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBOb3QgZm91bmQgJHtKU09OX0ZJTEVfTkFNRX1gKTtcbiAgICB9XG4gICAgY29uZmlnUGF0aCA9IHBhdGg7XG4gICAgc2hvd01lc3NhZ2UoYGNvbmZpZyBwYXRoOiAke2NvbmZpZ1BhdGh9YCk7XG4gICAgcGFyc2VkID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoY29uZmlnUGF0aCkudG9TdHJpbmcoKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICB3YXJuTWVzc2FnZShgRXJyb3IgZG9uJ3QgcmVhZCBzb2xhbmEtc3VpdGUtY29uZmlnLmpzb24sICR7ZS5tZXNzYWdlfWApO1xuICAgIH1cbiAgICBwcm9jZXNzLmV4aXQoMCk7XG4gIH1cbn0pKCk7XG5cbmNvbnN0IHVwZGF0ZURlYnVnQ29uZmlnRmlsZSA9IChkZWJ1Z2dpbmc6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2RlYnVnZ2luZyddID0gZGVidWdnaW5nO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVDbHVzdGVyQ29uZmlnRmlsZSA9ICh0eXBlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWydjbHVzdGVyJ10udHlwZSA9IHR5cGU7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUNsdXN0ZXJVcmxDb25maWdGaWxlID0gKGN1c3RvbUNsdXN0ZXJVcmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnY2x1c3RlciddLmN1c3RvbUNsdXN0ZXJVcmwgPSBjdXN0b21DbHVzdGVyVXJsO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVOZnRTdG9yYWdlQ29uZmlnRmlsZSA9IChhcGlLZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ25mdFN0b3JhZ2VBcGlLZXknXSA9IGFwaUtleTtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlRGFzQXBpVXJsQ29uZmlnRmlsZSA9IChkYXNBcGlVcmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnZGFzQXBpVXJsJ10gPSBkYXNBcGlVcmw7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHNob3dDdXJyZW50Q29uZmlnRmlsZSA9ICgpOiB2b2lkID0+IHtcbiAgY29uc3QgY2pzID0gcmVhZEZpbGVTeW5jKEpTT05fRklMRV9OQU1FKTtcbiAgc2hvd01lc3NhZ2UoYEN1cnJlbnQgY2pzXFxuJHtjanMudG9TdHJpbmcoKX1cXG5gKTtcbn07XG5cbmNvbnN0IGNsZWFyQ2FjaGUgPSAoKSA9PiB7XG4gIGNvbnN0IGRpciA9ICcuLi8uLi9ub2RlX21vZHVsZXMvLmNhY2hlJztcbiAgaWYgKGRpciAhPT0gdW5kZWZpbmVkICYmIGV4aXN0c1N5bmMoZGlyKSkge1xuICAgIHJtZGlyU3luYyhkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIHNob3dNZXNzYWdlKCdjbGVhciBjYWNoZScpO1xuICB9XG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBvcHRpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5wcm9ncmFtXG4gIC5uYW1lKCdzb2xhbmEtc3VpdGUtY29uZmlnJylcbiAgLmRlc2NyaXB0aW9uKGBTZXR1cCAke0pTT05fRklMRV9OQU1FfWApXG4gIC52ZXJzaW9uKFZFUlNJT04pO1xuXG5wcm9ncmFtXG4gIC5vcHRpb24oXG4gICAgJy1jIC0tY2x1c3RlciA8Y2x1c3RlciB0eXBlPicsXG4gICAgJ2Nvbm5lY3QgdG8gY2x1c3RlciB0eXBlLiBcInByZFwiLCBcImRldlwiLCBcInRlc3RcIiwgXCJsb2NhbGhvc3RcIicsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWNjIC0tY3VzdG9tLWNsdXN0ZXIgPGNsdXN0ZXIgdXJsLi4uPicsXG4gICAgJ2Nvbm5lY3QgdG8gY2x1c3RlciB1cmwuIFwiaHR0cHM6Ly8uLi5cIiwgaWYgeW91IHNldCBtb3JlIHRoYW4gb25lIHVybCwgcGxlYXNlIHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctZCAtLWRlYnVnIDx0cnVlIG9yIGZhbHNlPicsXG4gICAgJ2Rpc3BsYXkgZGVidWcgbG9nIG9uIHRlcm1pbmFsLiBkZWZhbHV0IFwiZmFsc2VcIiAnLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1uIC0tbmZ0c3RvcmFnZSA8YXBpa2V5PicsXG4gICAgJ1NldCBhcGlrZXkgb2YgbmZ0LnN0b3JhZ2UuIFwiZXlKaGJHY2lPLi4uXCInLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1kYXMgLS1kYXMtYXBpLXVybCA8ZGlnaXRhbCBhc3NldCBhcGkgdXJsLi4uPicsXG4gICAgJ2Nvbm5lY3QgdG8gZGlnaXRhbCBhc3NldCBhcGkgdXJsLiBcImh0dHBzOi8vLi4uXCIsIGlmIHlvdSBzZXQgbW9yZSB0aGFuIG9uZSB1cmwsIHBsZWFzZSBzZXBhcmF0ZSB0aGVtIHdpdGggYSBzcGFjZScsXG4gIClcbiAgLm9wdGlvbignLXMgLS1zaG93JywgJ1Nob3cgdmFsdWUgY3VycmVudCBzb2xhbmEtc3VpdGUuanNvbicpO1xuXG5wcm9ncmFtLnBhcnNlKCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGFjdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgZXhlY0NsdXNlciA9ICh0eXBlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgbGV0IGNvbnZlcnRlZFR5cGUgPSAnJztcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAncHJkJzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnbWFpbm5ldC1iZXRhJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Rldic6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ2Rldm5ldCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZXN0JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAndGVzdG5ldCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsb2NhbGhvc3QnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdsb2NhbGhvc3QtZGV2bmV0JztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vIG1hdGNoIHBhcmFtZXRlcjogbmVlZCBwYXJhbWV0ZXIgaXNcXG5cInByZFwiLCBcImRldlwiLCBcInRlc3RcIiwgXCJsb2NhbGhvc3RcIiwgYW55IG9uZSBvZiB0aGVtYCxcbiAgICAgICk7XG4gIH1cbiAgdXBkYXRlQ2x1c3RlckNvbmZpZ0ZpbGUoY29udmVydGVkVHlwZSk7XG59O1xuXG5jb25zdCBleGVjQ3VzdG9tQ2x1c3RlciA9ICh1cmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSAodTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIC9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTtcXC8/OlxcQCY9K1xcJCwlI10rL2cudGVzdCh1KTtcbiAgfTtcblxuICB1cmwuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF2YWxpZGF0aW9uKGVsZW1lbnQpKSB7XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vdCBmb3VuZCBjdXN0b20gY2x1c3RlciB1cmw6ICR7ZWxlbWVudH0uIGUuZzogY3VzdG9tIGh0dHBzOi8vLi4uYCxcbiAgICAgICk7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxuICB9KTtcblxuICB1cGRhdGVDbHVzdGVyVXJsQ29uZmlnRmlsZSh1cmwpO1xufTtcblxuY29uc3QgZXhlY0RlYnVnID0gKGJvb2w6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBpZiAoYm9vbCAhPSAndHJ1ZScgJiYgYm9vbCAhPSAnZmFsc2UnKSB7XG4gICAgd2Fybk1lc3NhZ2UoXG4gICAgICBgTm8gbWF0Y2ggcGFyYW1ldGVyOiBuZWVkIHBhcmFtZXRlciBpcyBcInRydWVcIiwgXCJmYWxzZVwiLiBhbnkgb25lIG9mIHRoZW1gLFxuICAgICk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZURlYnVnQ29uZmlnRmlsZShib29sKTtcbn07XG5cbmNvbnN0IGV4ZWNOZnRzdG9yYWdlID0gKGFwaUtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmIChhcGlLZXkubGVuZ3RoIDwgMjMwKSB7XG4gICAgd2Fybk1lc3NhZ2UoJ05vdCBmb3VuZCBhcGkga2V5Jyk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZU5mdFN0b3JhZ2VDb25maWdGaWxlKGFwaUtleSk7XG59O1xuXG5jb25zdCBleGVjRGFzQXBpVXJsID0gKHVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbiA9ICh1OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05O1xcLz86XFxAJj0rXFwkLCUjXSsvZy50ZXN0KHUpO1xuICB9O1xuXG4gIHVybC5mb3JFYWNoKChlbGVtZW50OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXZhbGlkYXRpb24oZWxlbWVudCkpIHtcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm90IGZvdW5kIERpZ2l0YWwgYXNzZXQgYXBpIHVybDogJHtlbGVtZW50fS4gZS5nOiBodHRwczovLy4uLmAsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlRGFzQXBpVXJsQ29uZmlnRmlsZSh1cmwpO1xufTtcblxuY29uc3QgZXhlY1Nob3cgPSAoKTogdm9pZCA9PiB7XG4gIHNob3dDdXJyZW50Q29uZmlnRmlsZSgpO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUGFyc2Ugb3B0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBvcHRpb25zID0gcHJvZ3JhbS5vcHRzKCk7XG5pZiAob3B0aW9ucy5jbHVzdGVyKSB7XG4gIGV4ZWNDbHVzZXIob3B0aW9ucy5jbHVzdGVyKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5jdXN0b21DbHVzdGVyKSB7XG4gIGV4ZWNDdXN0b21DbHVzdGVyKG9wdGlvbnMuY3VzdG9tQ2x1c3Rlcik7XG59IGVsc2UgaWYgKG9wdGlvbnMuZGVidWcpIHtcbiAgZXhlY0RlYnVnKG9wdGlvbnMuZGVidWcpO1xufSBlbHNlIGlmIChvcHRpb25zLm5mdHN0b3JhZ2UpIHtcbiAgZXhlY05mdHN0b3JhZ2Uob3B0aW9ucy5uZnRzdG9yYWdlKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5kYXNBcGlVcmwpIHtcbiAgZXhlY0Rhc0FwaVVybChvcHRpb25zLmRhc0FwaVVybCk7XG59IGVsc2UgaWYgKG9wdGlvbnMuc2hvdykge1xuICBleGVjU2hvdygpO1xufSBlbHNlIHtcbiAgd2Fybk1lc3NhZ2UoJ05vIG1hdGNoIHBhcmFtZXRlcicpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUVBLHFCQU9PO0FBQ1AsdUJBQXdCO0FBQ3hCLHVCQUFxQjtBQUNyQixJQUFNLFVBQVUsSUFBSSx5QkFBUTtBQUU1QixJQUFJO0FBQ0osSUFBSTtBQU1KLElBQU0saUJBQWlCO0FBQ3ZCLElBQU0sVUFBVTtBQUtoQixJQUFNLGlCQUFpQixNQUFNLFFBQVEsSUFBSSwrQkFBK0I7QUFDeEUsSUFBTSxjQUFjLENBQUMsU0FBaUIsUUFBUSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQzdELElBQU0sY0FBYyxDQUFDLFNBQWlCLFFBQVEsTUFBTSxLQUFLLElBQUksRUFBRTtBQUUvRCxJQUFNLDZCQUE2QixDQUFDLFFBQW9DO0FBQ3RFLFFBQU0sWUFBUSw0QkFBWSxHQUFHO0FBQzdCLGFBQVcsUUFBUSxPQUFPO0FBQ3hCLFVBQU0sZUFBVyx1QkFBSyxLQUFLLElBQUk7QUFDL0IsWUFBSSx5QkFBUyxRQUFRLEVBQUUsT0FBTyxLQUFLLFNBQVMsZ0JBQWdCO0FBQzFELGFBQU87QUFBQSxJQUNULGVBQVcseUJBQVMsUUFBUSxFQUFFLFlBQVksR0FBRztBQUMzQyxZQUFNLE1BQU0sMkJBQTJCLFFBQVE7QUFDL0MsVUFBSSxLQUFLO0FBQ1AsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQUFBLENBRUMsTUFBTTtBQUNMLE1BQUk7QUFDRixVQUFNLE9BQU8sMkJBQTJCLElBQUk7QUFDNUMsUUFBSSxDQUFDLE1BQU07QUFDVCxZQUFNLE1BQU0sYUFBYSxjQUFjLEVBQUU7QUFBQSxJQUMzQztBQUNBLGlCQUFhO0FBQ2IsZ0JBQVksZ0JBQWdCLFVBQVUsRUFBRTtBQUN4QyxhQUFTLEtBQUssVUFBTSw2QkFBYSxVQUFVLEVBQUUsU0FBUyxDQUFDO0FBQUEsRUFDekQsU0FBUyxHQUFHO0FBQ1YsUUFBSSxhQUFhLE9BQU87QUFDdEIsa0JBQVksOENBQThDLEVBQUUsT0FBTyxFQUFFO0FBQUEsSUFDdkU7QUFDQSxZQUFRLEtBQUssQ0FBQztBQUFBLEVBQ2hCO0FBQ0YsR0FBRztBQUVILElBQU0sd0JBQXdCLENBQUMsY0FBNEI7QUFDekQsU0FBTyxXQUFXLElBQUk7QUFDdEIsb0NBQWMsWUFBWSxLQUFLLFVBQVUsTUFBTSxDQUFDO0FBQ2hELGlCQUFlO0FBQ2YsYUFBVztBQUNiO0FBRUEsSUFBTSwwQkFBMEIsQ0FBQyxTQUF1QjtBQUN0RCxTQUFPLFNBQVMsRUFBRSxPQUFPO0FBQ3pCLG9DQUFjLFlBQVksS0FBSyxVQUFVLE1BQU0sQ0FBQztBQUNoRCxpQkFBZTtBQUNmLGFBQVc7QUFDYjtBQUVBLElBQU0sNkJBQTZCLENBQUMscUJBQXFDO0FBQ3ZFLFNBQU8sU0FBUyxFQUFFLG1CQUFtQjtBQUNyQyxvQ0FBYyxZQUFZLEtBQUssVUFBVSxNQUFNLENBQUM7QUFDaEQsaUJBQWU7QUFDZixhQUFXO0FBQ2I7QUFFQSxJQUFNLDZCQUE2QixDQUFDLFdBQXlCO0FBQzNELFNBQU8sa0JBQWtCLElBQUk7QUFDN0Isb0NBQWMsWUFBWSxLQUFLLFVBQVUsTUFBTSxDQUFDO0FBQ2hELGlCQUFlO0FBQ2YsYUFBVztBQUNiO0FBRUEsSUFBTSw0QkFBNEIsQ0FBQyxjQUE4QjtBQUMvRCxTQUFPLFdBQVcsSUFBSTtBQUN0QixvQ0FBYyxZQUFZLEtBQUssVUFBVSxNQUFNLENBQUM7QUFDaEQsaUJBQWU7QUFDZixhQUFXO0FBQ2I7QUFFQSxJQUFNLHdCQUF3QixNQUFZO0FBQ3hDLFFBQU0sVUFBTSw2QkFBYSxjQUFjO0FBQ3ZDLGNBQVk7QUFBQSxFQUFnQixJQUFJLFNBQVMsQ0FBQztBQUFBLENBQUk7QUFDaEQ7QUFFQSxJQUFNLGFBQWEsTUFBTTtBQUN2QixRQUFNLE1BQU07QUFDWixNQUFJLFFBQVEsY0FBYSwyQkFBVyxHQUFHLEdBQUc7QUFDeEMsa0NBQVUsS0FBSyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQ2xDLGdCQUFZLGFBQWE7QUFBQSxFQUMzQjtBQUNGO0FBS0EsUUFDRyxLQUFLLHFCQUFxQixFQUMxQixZQUFZLFNBQVMsY0FBYyxFQUFFLEVBQ3JDLFFBQVEsT0FBTztBQUVsQixRQUNHO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDLE9BQU8sYUFBYSxzQ0FBc0M7QUFFN0QsUUFBUSxNQUFNO0FBTWQsSUFBTSxhQUFhLENBQUMsU0FBdUI7QUFDekMsTUFBSSxnQkFBZ0I7QUFDcEIsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsc0JBQWdCO0FBQ2hCO0FBQUEsSUFDRixLQUFLO0FBQ0gsc0JBQWdCO0FBQ2hCO0FBQUEsSUFDRixLQUFLO0FBQ0gsc0JBQWdCO0FBQ2hCO0FBQUEsSUFDRixLQUFLO0FBQ0gsc0JBQWdCO0FBQ2hCO0FBQUEsSUFDRjtBQUNFO0FBQUEsUUFDRTtBQUFBO0FBQUEsTUFDRjtBQUFBLEVBQ0o7QUFDQSwwQkFBd0IsYUFBYTtBQUN2QztBQUVBLElBQU0sb0JBQW9CLENBQUMsUUFBd0I7QUFDakQsUUFBTSxhQUFhLENBQUMsTUFBYztBQUNoQyxXQUFPLG9EQUFvRCxLQUFLLENBQUM7QUFBQSxFQUNuRTtBQUVBLE1BQUksUUFBUSxDQUFDLFlBQW9CO0FBQy9CLFFBQUksQ0FBQyxXQUFXLE9BQU8sR0FBRztBQUN4QjtBQUFBLFFBQ0UsaUNBQWlDLE9BQU87QUFBQSxNQUMxQztBQUNBLGNBQVEsS0FBSyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNGLENBQUM7QUFFRCw2QkFBMkIsR0FBRztBQUNoQztBQUVBLElBQU0sWUFBWSxDQUFDLFNBQXVCO0FBQ3hDLE1BQUksUUFBUSxVQUFVLFFBQVEsU0FBUztBQUNyQztBQUFBLE1BQ0U7QUFBQSxJQUNGO0FBQ0EsWUFBUSxLQUFLLENBQUM7QUFBQSxFQUNoQjtBQUNBLHdCQUFzQixJQUFJO0FBQzVCO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxXQUF5QjtBQUMvQyxNQUFJLE9BQU8sU0FBUyxLQUFLO0FBQ3ZCLGdCQUFZLG1CQUFtQjtBQUMvQixZQUFRLEtBQUssQ0FBQztBQUFBLEVBQ2hCO0FBQ0EsNkJBQTJCLE1BQU07QUFDbkM7QUFFQSxJQUFNLGdCQUFnQixDQUFDLFFBQXdCO0FBQzdDLFFBQU0sYUFBYSxDQUFDLE1BQWM7QUFDaEMsV0FBTyxvREFBb0QsS0FBSyxDQUFDO0FBQUEsRUFDbkU7QUFFQSxNQUFJLFFBQVEsQ0FBQyxZQUFvQjtBQUMvQixRQUFJLENBQUMsV0FBVyxPQUFPLEdBQUc7QUFDeEI7QUFBQSxRQUNFLG9DQUFvQyxPQUFPO0FBQUEsTUFDN0M7QUFDQSxjQUFRLEtBQUssQ0FBQztBQUFBLElBQ2hCO0FBQUEsRUFDRixDQUFDO0FBRUQsNEJBQTBCLEdBQUc7QUFDL0I7QUFFQSxJQUFNLFdBQVcsTUFBWTtBQUMzQix3QkFBc0I7QUFDeEI7QUFNQSxJQUFNLFVBQVUsUUFBUSxLQUFLO0FBQzdCLElBQUksUUFBUSxTQUFTO0FBQ25CLGFBQVcsUUFBUSxPQUFPO0FBQzVCLFdBQVcsUUFBUSxlQUFlO0FBQ2hDLG9CQUFrQixRQUFRLGFBQWE7QUFDekMsV0FBVyxRQUFRLE9BQU87QUFDeEIsWUFBVSxRQUFRLEtBQUs7QUFDekIsV0FBVyxRQUFRLFlBQVk7QUFDN0IsaUJBQWUsUUFBUSxVQUFVO0FBQ25DLFdBQVcsUUFBUSxXQUFXO0FBQzVCLGdCQUFjLFFBQVEsU0FBUztBQUNqQyxXQUFXLFFBQVEsTUFBTTtBQUN2QixXQUFTO0FBQ1gsT0FBTztBQUNMLGNBQVksb0JBQW9CO0FBQ2xDOyIsCiAgIm5hbWVzIjogW10KfQo=