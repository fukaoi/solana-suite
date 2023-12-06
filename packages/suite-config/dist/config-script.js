#!/usr/bin/env node
"use strict";

// src/config-script.ts
var import_node_fs2 = require("fs");
var import_commander = require("commander");

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

// src/config-script.ts
var program = new import_commander.Command();
var configPath;
var parsed;
var VERSION = "0.5";
var successMessage = () => console.log("# Update solana suite config.");
var showMessage = (mess) => console.log(`# ${mess}`);
var warnMessage = (mess) => console.error(`# ${mess}`);
(() => {
  try {
    const path = Config.searchConfigJson("./");
    if (!path) {
      throw Error(`Not found ${Config.JSON_FILE_NAME}`);
    }
    configPath = path;
    showMessage(`config path: ${configPath}`);
    parsed = JSON.parse((0, import_node_fs2.readFileSync)(configPath).toString());
  } catch (e) {
    if (e instanceof Error) {
      warnMessage(`Error don't read solana-suite-config.json, ${e.message}`);
    }
    process.exit(0);
  }
})();
var updateDebugConfigFile = (debugging) => {
  parsed["debugging"] = debugging;
  (0, import_node_fs2.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterConfigFile = (type) => {
  parsed["cluster"].type = type;
  (0, import_node_fs2.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterUrlConfigFile = (customClusterUrl) => {
  parsed["cluster"].customClusterUrl = customClusterUrl;
  (0, import_node_fs2.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateNftStorageConfigFile = (apiKey) => {
  parsed["nftStorageApiKey"] = apiKey;
  (0, import_node_fs2.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateDasApiUrlConfigFile = (dasApiUrl) => {
  parsed["dasApiUrl"] = dasApiUrl;
  (0, import_node_fs2.writeFileSync)(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var showCurrentConfigFile = () => {
  const cjs = (0, import_node_fs2.readFileSync)(Config.JSON_FILE_NAME);
  showMessage(`Current cjs
${cjs.toString()}
`);
};
var clearCache = () => {
  const dir = "../../node_modules/.cache";
  if (dir !== void 0 && (0, import_node_fs2.existsSync)(dir)) {
    (0, import_node_fs2.rmdirSync)(dir, { recursive: true });
    showMessage("clear cache");
  }
};
program.name("solana-suite-config").description(`Setup ${Config.JSON_FILE_NAME}`).version(VERSION);
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
    return /https?:\/\/[-_.!~*\\()a-zA-Z0-9;/?:@&=+$,%#]+/g.test(u);
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
    return /https?:\/\/[-_.!~*\\()a-zA-Z0-9;/?:@&=+$,%#]+/g.test(u);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbmZpZy1zY3JpcHQudHMiLCAiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZWFyY2gtY29uZmlnJztcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKCk7XG5cbmxldCBjb25maWdQYXRoOiBzdHJpbmc7XG5sZXQgcGFyc2VkOiB7XG4gIGNsdXN0ZXI6IHsgdHlwZTogc3RyaW5nOyBjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSB9O1xuICBkZWJ1Z2dpbmc6IHN0cmluZztcbiAgbmZ0U3RvcmFnZUFwaUtleTogc3RyaW5nO1xuICBkYXNBcGlVcmw6IHN0cmluZ1tdO1xufTtcbmNvbnN0IFZFUlNJT04gPSAnMC41JztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gbG9jYWwgZnVuY3Rpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBzdWNjZXNzTWVzc2FnZSA9ICgpID0+IGNvbnNvbGUubG9nKCcjIFVwZGF0ZSBzb2xhbmEgc3VpdGUgY29uZmlnLicpO1xuY29uc3Qgc2hvd01lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhgIyAke21lc3N9YCk7XG5jb25zdCB3YXJuTWVzc2FnZSA9IChtZXNzOiBzdHJpbmcpID0+IGNvbnNvbGUuZXJyb3IoYCMgJHttZXNzfWApO1xuXG4oKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGggPSBDb25maWcuc2VhcmNoQ29uZmlnSnNvbignLi8nKTtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBOb3QgZm91bmQgJHtDb25maWcuSlNPTl9GSUxFX05BTUV9YCk7XG4gICAgfVxuICAgIGNvbmZpZ1BhdGggPSBwYXRoO1xuICAgIHNob3dNZXNzYWdlKGBjb25maWcgcGF0aDogJHtjb25maWdQYXRofWApO1xuICAgIHBhcnNlZCA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGNvbmZpZ1BhdGgpLnRvU3RyaW5nKCkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgd2Fybk1lc3NhZ2UoYEVycm9yIGRvbid0IHJlYWQgc29sYW5hLXN1aXRlLWNvbmZpZy5qc29uLCAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG59KSgpO1xuXG5jb25zdCB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUgPSAoZGVidWdnaW5nOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWydkZWJ1Z2dpbmcnXSA9IGRlYnVnZ2luZztcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlQ2x1c3RlckNvbmZpZ0ZpbGUgPSAodHlwZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnY2x1c3RlciddLnR5cGUgPSB0eXBlO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVDbHVzdGVyVXJsQ29uZmlnRmlsZSA9IChjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2NsdXN0ZXInXS5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlTmZ0U3RvcmFnZUNvbmZpZ0ZpbGUgPSAoYXBpS2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWyduZnRTdG9yYWdlQXBpS2V5J10gPSBhcGlLZXk7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUgPSAoZGFzQXBpVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2Rhc0FwaVVybCddID0gZGFzQXBpVXJsO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCBzaG93Q3VycmVudENvbmZpZ0ZpbGUgPSAoKTogdm9pZCA9PiB7XG4gIGNvbnN0IGNqcyA9IHJlYWRGaWxlU3luYyhDb25maWcuSlNPTl9GSUxFX05BTUUpO1xuICBzaG93TWVzc2FnZShgQ3VycmVudCBjanNcXG4ke2Nqcy50b1N0cmluZygpfVxcbmApO1xufTtcblxuY29uc3QgY2xlYXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgZGlyID0gJy4uLy4uL25vZGVfbW9kdWxlcy8uY2FjaGUnO1xuICBpZiAoZGlyICE9PSB1bmRlZmluZWQgJiYgZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgcm1kaXJTeW5jKGRpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgc2hvd01lc3NhZ2UoJ2NsZWFyIGNhY2hlJyk7XG4gIH1cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnByb2dyYW1cbiAgLm5hbWUoJ3NvbGFuYS1zdWl0ZS1jb25maWcnKVxuICAuZGVzY3JpcHRpb24oYFNldHVwICR7Q29uZmlnLkpTT05fRklMRV9OQU1FfWApXG4gIC52ZXJzaW9uKFZFUlNJT04pO1xuXG5wcm9ncmFtXG4gIC5vcHRpb24oXG4gICAgJy1jIC0tY2x1c3RlciA8Y2x1c3RlciB0eXBlPicsXG4gICAgJ2Nvbm5lY3QgdG8gY2x1c3RlciB0eXBlLiBcInByZFwiLCBcImRldlwiLCBcInRlc3RcIiwgXCJsb2NhbGhvc3RcIicsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWNjIC0tY3VzdG9tLWNsdXN0ZXIgPGNsdXN0ZXIgdXJsLi4uPicsXG4gICAgJ2Nvbm5lY3QgdG8gY2x1c3RlciB1cmwuIFwiaHR0cHM6Ly8uLi5cIiwgaWYgeW91IHNldCBtb3JlIHRoYW4gb25lIHVybCwgcGxlYXNlIHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctZCAtLWRlYnVnIDx0cnVlIG9yIGZhbHNlPicsXG4gICAgJ2Rpc3BsYXkgZGVidWcgbG9nIG9uIHRlcm1pbmFsLiBkZWZhbHV0IFwiZmFsc2VcIiAnLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1uIC0tbmZ0c3RvcmFnZSA8YXBpa2V5PicsXG4gICAgJ1NldCBhcGlrZXkgb2YgbmZ0LnN0b3JhZ2UuIFwiZXlKaGJHY2lPLi4uXCInLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1kYXMgLS1kYXMtYXBpLXVybCA8ZGlnaXRhbCBhc3NldCBhcGkgdXJsLi4uPicsXG4gICAgJ2Nvbm5lY3QgdG8gZGlnaXRhbCBhc3NldCBhcGkgdXJsLiBcImh0dHBzOi8vLi4uXCIsIGlmIHlvdSBzZXQgbW9yZSB0aGFuIG9uZSB1cmwsIHBsZWFzZSBzZXBhcmF0ZSB0aGVtIHdpdGggYSBzcGFjZScsXG4gIClcbiAgLm9wdGlvbignLXMgLS1zaG93JywgJ1Nob3cgdmFsdWUgY3VycmVudCBzb2xhbmEtc3VpdGUuanNvbicpO1xuXG5wcm9ncmFtLnBhcnNlKCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGFjdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgZXhlY0NsdXNlciA9ICh0eXBlOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgbGV0IGNvbnZlcnRlZFR5cGUgPSAnJztcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAncHJkJzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnbWFpbm5ldC1iZXRhJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Rldic6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ2Rldm5ldCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZXN0JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAndGVzdG5ldCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsb2NhbGhvc3QnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdsb2NhbGhvc3QtZGV2bmV0JztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vIG1hdGNoIHBhcmFtZXRlcjogbmVlZCBwYXJhbWV0ZXIgaXNcXG5cInByZFwiLCBcImRldlwiLCBcInRlc3RcIiwgXCJsb2NhbGhvc3RcIiwgYW55IG9uZSBvZiB0aGVtYCxcbiAgICAgICk7XG4gIH1cbiAgdXBkYXRlQ2x1c3RlckNvbmZpZ0ZpbGUoY29udmVydGVkVHlwZSk7XG59O1xuXG5jb25zdCBleGVjQ3VzdG9tQ2x1c3RlciA9ICh1cmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSAodTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIC9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTsvPzpAJj0rJCwlI10rL2cudGVzdCh1KTtcbiAgfTtcblxuICB1cmwuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF2YWxpZGF0aW9uKGVsZW1lbnQpKSB7XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vdCBmb3VuZCBjdXN0b20gY2x1c3RlciB1cmw6ICR7ZWxlbWVudH0uIGUuZzogY3VzdG9tIGh0dHBzOi8vLi4uYCxcbiAgICAgICk7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxuICB9KTtcblxuICB1cGRhdGVDbHVzdGVyVXJsQ29uZmlnRmlsZSh1cmwpO1xufTtcblxuY29uc3QgZXhlY0RlYnVnID0gKGJvb2w6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBpZiAoYm9vbCAhPSAndHJ1ZScgJiYgYm9vbCAhPSAnZmFsc2UnKSB7XG4gICAgd2Fybk1lc3NhZ2UoXG4gICAgICBgTm8gbWF0Y2ggcGFyYW1ldGVyOiBuZWVkIHBhcmFtZXRlciBpcyBcInRydWVcIiwgXCJmYWxzZVwiLiBhbnkgb25lIG9mIHRoZW1gLFxuICAgICk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZURlYnVnQ29uZmlnRmlsZShib29sKTtcbn07XG5cbmNvbnN0IGV4ZWNOZnRzdG9yYWdlID0gKGFwaUtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmIChhcGlLZXkubGVuZ3RoIDwgMjMwKSB7XG4gICAgd2Fybk1lc3NhZ2UoJ05vdCBmb3VuZCBhcGkga2V5Jyk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZU5mdFN0b3JhZ2VDb25maWdGaWxlKGFwaUtleSk7XG59O1xuXG5jb25zdCBleGVjRGFzQXBpVXJsID0gKHVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbiA9ICh1OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oy8/OkAmPSskLCUjXSsvZy50ZXN0KHUpO1xuICB9O1xuXG4gIHVybC5mb3JFYWNoKChlbGVtZW50OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXZhbGlkYXRpb24oZWxlbWVudCkpIHtcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm90IGZvdW5kIERpZ2l0YWwgYXNzZXQgYXBpIHVybDogJHtlbGVtZW50fS4gZS5nOiBodHRwczovLy4uLmAsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlRGFzQXBpVXJsQ29uZmlnRmlsZSh1cmwpO1xufTtcblxuY29uc3QgZXhlY1Nob3cgPSAoKTogdm9pZCA9PiB7XG4gIHNob3dDdXJyZW50Q29uZmlnRmlsZSgpO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUGFyc2Ugb3B0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBvcHRpb25zID0gcHJvZ3JhbS5vcHRzKCk7XG5pZiAob3B0aW9ucy5jbHVzdGVyKSB7XG4gIGV4ZWNDbHVzZXIob3B0aW9ucy5jbHVzdGVyKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5jdXN0b21DbHVzdGVyKSB7XG4gIGV4ZWNDdXN0b21DbHVzdGVyKG9wdGlvbnMuY3VzdG9tQ2x1c3Rlcik7XG59IGVsc2UgaWYgKG9wdGlvbnMuZGVidWcpIHtcbiAgZXhlY0RlYnVnKG9wdGlvbnMuZGVidWcpO1xufSBlbHNlIGlmIChvcHRpb25zLm5mdHN0b3JhZ2UpIHtcbiAgZXhlY05mdHN0b3JhZ2Uob3B0aW9ucy5uZnRzdG9yYWdlKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5kYXNBcGlVcmwpIHtcbiAgZXhlY0Rhc0FwaVVybChvcHRpb25zLmRhc0FwaVVybCk7XG59IGVsc2UgaWYgKG9wdGlvbnMuc2hvdykge1xuICBleGVjU2hvdygpO1xufSBlbHNlIHtcbiAgd2Fybk1lc3NhZ2UoJ05vIG1hdGNoIHBhcmFtZXRlcicpO1xufVxuIiwgImltcG9ydCB7IHJlYWRkaXJTeW5jLCBzdGF0U3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uZmlnIHtcbiAgZXhwb3J0IGNvbnN0IEpTT05fRklMRV9OQU1FID0gJ3NvbGFuYS1zdWl0ZS5qc29uJztcblxuICAvKipcbiAgICogU2VhcmNoICBmaWxlIHBhdGggZm9yIHNvbGFuYS1zdWl0ZS5qc29uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBzZWFyY2hDb25maWdKc29uID0gKGRpcjogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBmaWxlcyA9IHJlYWRkaXJTeW5jKGRpcik7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oZGlyLCBmaWxlKTtcbiAgICAgIGlmIChzdGF0U3luYyhmaWxlUGF0aCkuaXNGaWxlKCkgJiYgZmlsZSA9PT0gSlNPTl9GSUxFX05BTUUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgfSBlbHNlIGlmIChzdGF0U3luYyhmaWxlUGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBjb25zdCByZXMgPSBzZWFyY2hDb25maWdKc29uKGZpbGVQYXRoKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7QUFFQSxJQUFBQSxrQkFBbUU7QUFDbkUsdUJBQXdCOzs7QUNIeEIscUJBQXNDO0FBQ3RDLHVCQUFxQjtBQUVkLElBQVU7QUFBQSxDQUFWLENBQVVDLFlBQVY7QUFDRSxFQUFNQSxRQUFBLGlCQUFpQjtBQU92QixFQUFNQSxRQUFBLG1CQUFtQixDQUFDLFFBQW9DO0FBQ25FLFVBQU0sWUFBUSw0QkFBWSxHQUFHO0FBQzdCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sZUFBVyx1QkFBSyxLQUFLLElBQUk7QUFDL0IsY0FBSSx5QkFBUyxRQUFRLEVBQUUsT0FBTyxLQUFLLFNBQVNBLFFBQUEsZ0JBQWdCO0FBQzFELGVBQU87QUFBQSxNQUNULGVBQVcseUJBQVMsUUFBUSxFQUFFLFlBQVksR0FBRztBQUMzQyxjQUFNLFVBQU1BLFFBQUEsa0JBQWlCLFFBQVE7QUFDckMsWUFBSSxLQUFLO0FBQ1AsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEdBdEJlOzs7QURHakIsSUFBTSxVQUFVLElBQUkseUJBQVE7QUFFNUIsSUFBSTtBQUNKLElBQUk7QUFNSixJQUFNLFVBQVU7QUFLaEIsSUFBTSxpQkFBaUIsTUFBTSxRQUFRLElBQUksK0JBQStCO0FBQ3hFLElBQU0sY0FBYyxDQUFDLFNBQWlCLFFBQVEsSUFBSSxLQUFLLElBQUksRUFBRTtBQUM3RCxJQUFNLGNBQWMsQ0FBQyxTQUFpQixRQUFRLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBQSxDQUU5RCxNQUFNO0FBQ0wsTUFBSTtBQUNGLFVBQU0sT0FBTyxPQUFPLGlCQUFpQixJQUFJO0FBQ3pDLFFBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBTSxNQUFNLGFBQWEs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