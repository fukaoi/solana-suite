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
  showMessage(`Current value
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbmZpZy1zY3JpcHQudHMiLCAiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZWFyY2gtY29uZmlnJztcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKCk7XG5cbmxldCBjb25maWdQYXRoOiBzdHJpbmc7XG5sZXQgcGFyc2VkOiB7XG4gIGNsdXN0ZXI6IHsgdHlwZTogc3RyaW5nOyBjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSB9O1xuICBkZWJ1Z2dpbmc6IHN0cmluZztcbiAgbmZ0U3RvcmFnZUFwaUtleTogc3RyaW5nO1xuICBkYXNBcGlVcmw6IHN0cmluZ1tdO1xufTtcbmNvbnN0IFZFUlNJT04gPSAnMC41JztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gbG9jYWwgZnVuY3Rpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBzdWNjZXNzTWVzc2FnZSA9ICgpID0+IGNvbnNvbGUubG9nKCcjIFVwZGF0ZSBzb2xhbmEgc3VpdGUgY29uZmlnLicpO1xuY29uc3Qgc2hvd01lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhgIyAke21lc3N9YCk7XG5jb25zdCB3YXJuTWVzc2FnZSA9IChtZXNzOiBzdHJpbmcpID0+IGNvbnNvbGUuZXJyb3IoYCMgJHttZXNzfWApO1xuXG4oKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGggPSBDb25maWcuc2VhcmNoQ29uZmlnSnNvbignLi8nKTtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBOb3QgZm91bmQgJHtDb25maWcuSlNPTl9GSUxFX05BTUV9YCk7XG4gICAgfVxuICAgIGNvbmZpZ1BhdGggPSBwYXRoO1xuICAgIHNob3dNZXNzYWdlKGBjb25maWcgcGF0aDogJHtjb25maWdQYXRofWApO1xuICAgIHBhcnNlZCA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGNvbmZpZ1BhdGgpLnRvU3RyaW5nKCkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgd2Fybk1lc3NhZ2UoYEVycm9yIGRvbid0IHJlYWQgc29sYW5hLXN1aXRlLWNvbmZpZy5qc29uLCAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG59KSgpO1xuXG5jb25zdCB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUgPSAoZGVidWdnaW5nOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWydkZWJ1Z2dpbmcnXSA9IGRlYnVnZ2luZztcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlQ2x1c3RlckNvbmZpZ0ZpbGUgPSAodHlwZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnY2x1c3RlciddLnR5cGUgPSB0eXBlO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVDbHVzdGVyVXJsQ29uZmlnRmlsZSA9IChjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2NsdXN0ZXInXS5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlTmZ0U3RvcmFnZUNvbmZpZ0ZpbGUgPSAoYXBpS2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWyduZnRTdG9yYWdlQXBpS2V5J10gPSBhcGlLZXk7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUgPSAoZGFzQXBpVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2Rhc0FwaVVybCddID0gZGFzQXBpVXJsO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCBzaG93Q3VycmVudENvbmZpZ0ZpbGUgPSAoKTogdm9pZCA9PiB7XG4gIGNvbnN0IGNqcyA9IHJlYWRGaWxlU3luYyhDb25maWcuSlNPTl9GSUxFX05BTUUpO1xuICBzaG93TWVzc2FnZShgQ3VycmVudCB2YWx1ZVxcbiR7Y2pzLnRvU3RyaW5nKCl9XFxuYCk7XG59O1xuXG5jb25zdCBjbGVhckNhY2hlID0gKCkgPT4ge1xuICBjb25zdCBkaXIgPSAnLi4vLi4vbm9kZV9tb2R1bGVzLy5jYWNoZSc7XG4gIGlmIChkaXIgIT09IHVuZGVmaW5lZCAmJiBleGlzdHNTeW5jKGRpcikpIHtcbiAgICBybWRpclN5bmMoZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBzaG93TWVzc2FnZSgnY2xlYXIgY2FjaGUnKTtcbiAgfVxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gb3B0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xucHJvZ3JhbVxuICAubmFtZSgnc29sYW5hLXN1aXRlLWNvbmZpZycpXG4gIC5kZXNjcmlwdGlvbihgU2V0dXAgJHtDb25maWcuSlNPTl9GSUxFX05BTUV9YClcbiAgLnZlcnNpb24oVkVSU0lPTik7XG5cbnByb2dyYW1cbiAgLm9wdGlvbihcbiAgICAnLWMgLS1jbHVzdGVyIDxjbHVzdGVyIHR5cGU+JyxcbiAgICAnY29ubmVjdCB0byBjbHVzdGVyIHR5cGUuIFwicHJkXCIsIFwiZGV2XCIsIFwidGVzdFwiLCBcImxvY2FsaG9zdFwiJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctY2MgLS1jdXN0b20tY2x1c3RlciA8Y2x1c3RlciB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBjbHVzdGVyIHVybC4gXCJodHRwczovLy4uLlwiLCBpZiB5b3Ugc2V0IG1vcmUgdGhhbiBvbmUgdXJsLCBwbGVhc2Ugc2VwYXJhdGUgdGhlbSB3aXRoIGEgc3BhY2UnLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1kIC0tZGVidWcgPHRydWUgb3IgZmFsc2U+JyxcbiAgICAnZGlzcGxheSBkZWJ1ZyBsb2cgb24gdGVybWluYWwuIGRlZmFsdXQgXCJmYWxzZVwiICcsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLW4gLS1uZnRzdG9yYWdlIDxhcGlrZXk+JyxcbiAgICAnU2V0IGFwaWtleSBvZiBuZnQuc3RvcmFnZS4gXCJleUpoYkdjaU8uLi5cIicsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWRhcyAtLWRhcy1hcGktdXJsIDxkaWdpdGFsIGFzc2V0IGFwaSB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBkaWdpdGFsIGFzc2V0IGFwaSB1cmwuIFwiaHR0cHM6Ly8uLi5cIiwgaWYgeW91IHNldCBtb3JlIHRoYW4gb25lIHVybCwgcGxlYXNlIHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlJyxcbiAgKVxuICAub3B0aW9uKCctcyAtLXNob3cnLCAnU2hvdyB2YWx1ZSBjdXJyZW50IHNvbGFuYS1zdWl0ZS5qc29uJyk7XG5cbnByb2dyYW0ucGFyc2UoKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gYWN0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBleGVjQ2x1c2VyID0gKHR5cGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBsZXQgY29udmVydGVkVHlwZSA9ICcnO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdwcmQnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdtYWlubmV0LWJldGEnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZGV2JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnZGV2bmV0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3Rlc3QnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICd0ZXN0bmV0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xvY2FsaG9zdCc6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ2xvY2FsaG9zdC1kZXZuZXQnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm8gbWF0Y2ggcGFyYW1ldGVyOiBuZWVkIHBhcmFtZXRlciBpc1xcblwicHJkXCIsIFwiZGV2XCIsIFwidGVzdFwiLCBcImxvY2FsaG9zdFwiLCBhbnkgb25lIG9mIHRoZW1gLFxuICAgICAgKTtcbiAgfVxuICB1cGRhdGVDbHVzdGVyQ29uZmlnRmlsZShjb252ZXJ0ZWRUeXBlKTtcbn07XG5cbmNvbnN0IGV4ZWNDdXN0b21DbHVzdGVyID0gKHVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbiA9ICh1OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oy8/OkAmPSskLCUjXSsvZy50ZXN0KHUpO1xuICB9O1xuXG4gIHVybC5mb3JFYWNoKChlbGVtZW50OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXZhbGlkYXRpb24oZWxlbWVudCkpIHtcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm90IGZvdW5kIGN1c3RvbSBjbHVzdGVyIHVybDogJHtlbGVtZW50fS4gZS5nOiBjdXN0b20gaHR0cHM6Ly8uLi5gLFxuICAgICAgKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZUNsdXN0ZXJVcmxDb25maWdGaWxlKHVybCk7XG59O1xuXG5jb25zdCBleGVjRGVidWcgPSAoYm9vbDogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmIChib29sICE9ICd0cnVlJyAmJiBib29sICE9ICdmYWxzZScpIHtcbiAgICB3YXJuTWVzc2FnZShcbiAgICAgIGBObyBtYXRjaCBwYXJhbWV0ZXI6IG5lZWQgcGFyYW1ldGVyIGlzIFwidHJ1ZVwiLCBcImZhbHNlXCIuIGFueSBvbmUgb2YgdGhlbWAsXG4gICAgKTtcbiAgICBwcm9jZXNzLmV4aXQoMCk7XG4gIH1cbiAgdXBkYXRlRGVidWdDb25maWdGaWxlKGJvb2wpO1xufTtcblxuY29uc3QgZXhlY05mdHN0b3JhZ2UgPSAoYXBpS2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKGFwaUtleS5sZW5ndGggPCAyMzApIHtcbiAgICB3YXJuTWVzc2FnZSgnTm90IGZvdW5kIGFwaSBrZXknKTtcbiAgICBwcm9jZXNzLmV4aXQoMCk7XG4gIH1cbiAgdXBkYXRlTmZ0U3RvcmFnZUNvbmZpZ0ZpbGUoYXBpS2V5KTtcbn07XG5cbmNvbnN0IGV4ZWNEYXNBcGlVcmwgPSAodXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBjb25zdCB2YWxpZGF0aW9uID0gKHU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiAvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7Lz86QCY9KyQsJSNdKy9nLnRlc3QodSk7XG4gIH07XG5cbiAgdXJsLmZvckVhY2goKGVsZW1lbnQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghdmFsaWRhdGlvbihlbGVtZW50KSkge1xuICAgICAgd2Fybk1lc3NhZ2UoXG4gICAgICAgIGBOb3QgZm91bmQgRGlnaXRhbCBhc3NldCBhcGkgdXJsOiAke2VsZW1lbnR9LiBlLmc6IGh0dHBzOi8vLi4uYCxcbiAgICAgICk7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxuICB9KTtcblxuICB1cGRhdGVEYXNBcGlVcmxDb25maWdGaWxlKHVybCk7XG59O1xuXG5jb25zdCBleGVjU2hvdyA9ICgpOiB2b2lkID0+IHtcbiAgc2hvd0N1cnJlbnRDb25maWdGaWxlKCk7XG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQYXJzZSBvcHRpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IG9wdGlvbnMgPSBwcm9ncmFtLm9wdHMoKTtcbmlmIChvcHRpb25zLmNsdXN0ZXIpIHtcbiAgZXhlY0NsdXNlcihvcHRpb25zLmNsdXN0ZXIpO1xufSBlbHNlIGlmIChvcHRpb25zLmN1c3RvbUNsdXN0ZXIpIHtcbiAgZXhlY0N1c3RvbUNsdXN0ZXIob3B0aW9ucy5jdXN0b21DbHVzdGVyKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5kZWJ1Zykge1xuICBleGVjRGVidWcob3B0aW9ucy5kZWJ1Zyk7XG59IGVsc2UgaWYgKG9wdGlvbnMubmZ0c3RvcmFnZSkge1xuICBleGVjTmZ0c3RvcmFnZShvcHRpb25zLm5mdHN0b3JhZ2UpO1xufSBlbHNlIGlmIChvcHRpb25zLmRhc0FwaVVybCkge1xuICBleGVjRGFzQXBpVXJsKG9wdGlvbnMuZGFzQXBpVXJsKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5zaG93KSB7XG4gIGV4ZWNTaG93KCk7XG59IGVsc2Uge1xuICB3YXJuTWVzc2FnZSgnTm8gbWF0Y2ggcGFyYW1ldGVyJyk7XG59XG4iLCAiaW1wb3J0IHsgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maWcge1xuICBleHBvcnQgY29uc3QgSlNPTl9GSUxFX05BTUUgPSAnc29sYW5hLXN1aXRlLmpzb24nO1xuXG4gIC8qKlxuICAgKiBTZWFyY2ggIGZpbGUgcGF0aCBmb3Igc29sYW5hLXN1aXRlLmpzb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRpclxuICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHNlYXJjaENvbmZpZ0pzb24gPSAoZGlyOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGZpbGVzID0gcmVhZGRpclN5bmMoZGlyKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihkaXIsIGZpbGUpO1xuICAgICAgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0ZpbGUoKSAmJiBmaWxlID09PSBKU09OX0ZJTEVfTkFNRSkge1xuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHNlYXJjaENvbmZpZ0pzb24oZmlsZVBhdGgpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUVBLElBQUFBLGtCQUFtRTtBQUNuRSx1QkFBd0I7OztBQ0h4QixxQkFBc0M7QUFDdEMsdUJBQXFCO0FBRWQsSUFBVTtBQUFBLENBQVYsQ0FBVUMsWUFBVjtBQUNFLEVBQU1BLFFBQUEsaUJBQWlCO0FBT3ZCLEVBQU1BLFFBQUEsbUJBQW1CLENBQUMsUUFBb0M7QUFDbkUsVUFBTSxZQUFRLDRCQUFZLEdBQUc7QUFDN0IsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxlQUFXLHVCQUFLLEtBQUssSUFBSTtBQUMvQixjQUFJLHlCQUFTLFFBQVEsRUFBRSxPQUFPLEtBQUssU0FBU0EsUUFBQSxnQkFBZ0I7QUFDMUQsZUFBTztBQUFBLE1BQ1QsZUFBVyx5QkFBUyxRQUFRLEVBQUUsWUFBWSxHQUFHO0FBQzNDLGNBQU0sVUFBTUEsUUFBQSxrQkFBaUIsUUFBUTtBQUNyQyxZQUFJLEtBQUs7QUFDUCxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsR0F0QmU7OztBREdqQixJQUFNLFVBQVUsSUFBSSx5QkFBUTtBQUU1QixJQUFJO0FBQ0osSUFBSTtBQU1KLElBQU0sVUFBVTtBQUtoQixJQUFNLGlCQUFpQixNQUFNLFFBQVEsSUFBSSwrQkFBK0I7QUFDeEUsSUFBTSxjQUFjLENBQUMsU0FBaUIsUUFBUSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQzdELElBQU0sY0FBYyxDQUFDLFNBQWlCLFFBQVEsTUFBTSxLQUFLLElBQUksRUFBRTtBQUFBLENBRTlELE1BQU07QUFDTCxNQUFJO0FBQ0YsVUFBTSxPQUFPLE9BQU8saUJBQWlCLElBQUk7QUFDekMsUUFBSSxDQUFDLE1BQU07QUFDVCxZQUFNLE1BQU0sYUFB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