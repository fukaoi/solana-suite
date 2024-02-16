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
  const cjs = (0, import_node_fs2.readFileSync)(configPath);
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
  'connect to cluster type. "prd", "dev", "localhost"'
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
    case "localhost":
      convertedType = "localhost-devnet";
      break;
    default:
      warnMessage(
        `No match parameter: need parameter is
"prd", "dev", "localhost", any one of them`
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbmZpZy1zY3JpcHQudHMiLCAiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZWFyY2gtY29uZmlnJztcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKCk7XG5cbmxldCBjb25maWdQYXRoOiBzdHJpbmc7XG5sZXQgcGFyc2VkOiB7XG4gIGNsdXN0ZXI6IHsgdHlwZTogc3RyaW5nOyBjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSB9O1xuICBkZWJ1Z2dpbmc6IHN0cmluZztcbiAgbmZ0U3RvcmFnZUFwaUtleTogc3RyaW5nO1xuICBkYXNBcGlVcmw6IHN0cmluZ1tdO1xufTtcbmNvbnN0IFZFUlNJT04gPSAnMC41JztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gbG9jYWwgZnVuY3Rpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBzdWNjZXNzTWVzc2FnZSA9ICgpID0+IGNvbnNvbGUubG9nKCcjIFVwZGF0ZSBzb2xhbmEgc3VpdGUgY29uZmlnLicpO1xuY29uc3Qgc2hvd01lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhgIyAke21lc3N9YCk7XG5jb25zdCB3YXJuTWVzc2FnZSA9IChtZXNzOiBzdHJpbmcpID0+IGNvbnNvbGUuZXJyb3IoYCMgJHttZXNzfWApO1xuXG4oKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGggPSBDb25maWcuc2VhcmNoQ29uZmlnSnNvbignLi8nKTtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBOb3QgZm91bmQgJHtDb25maWcuSlNPTl9GSUxFX05BTUV9YCk7XG4gICAgfVxuICAgIGNvbmZpZ1BhdGggPSBwYXRoO1xuICAgIHNob3dNZXNzYWdlKGBjb25maWcgcGF0aDogJHtjb25maWdQYXRofWApO1xuICAgIHBhcnNlZCA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGNvbmZpZ1BhdGgpLnRvU3RyaW5nKCkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgd2Fybk1lc3NhZ2UoYEVycm9yIGRvbid0IHJlYWQgc29sYW5hLXN1aXRlLWNvbmZpZy5qc29uLCAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG59KSgpO1xuXG5jb25zdCB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUgPSAoZGVidWdnaW5nOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWydkZWJ1Z2dpbmcnXSA9IGRlYnVnZ2luZztcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlQ2x1c3RlckNvbmZpZ0ZpbGUgPSAodHlwZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnY2x1c3RlciddLnR5cGUgPSB0eXBlO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVDbHVzdGVyVXJsQ29uZmlnRmlsZSA9IChjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2NsdXN0ZXInXS5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlTmZ0U3RvcmFnZUNvbmZpZ0ZpbGUgPSAoYXBpS2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWyduZnRTdG9yYWdlQXBpS2V5J10gPSBhcGlLZXk7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUgPSAoZGFzQXBpVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2Rhc0FwaVVybCddID0gZGFzQXBpVXJsO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCBzaG93Q3VycmVudENvbmZpZ0ZpbGUgPSAoKTogdm9pZCA9PiB7XG4gIGNvbnN0IGNqcyA9IHJlYWRGaWxlU3luYyhjb25maWdQYXRoKTtcbiAgc2hvd01lc3NhZ2UoYEN1cnJlbnQgdmFsdWVcXG4ke2Nqcy50b1N0cmluZygpfVxcbmApO1xufTtcblxuY29uc3QgY2xlYXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgZGlyID0gJy4uLy4uL25vZGVfbW9kdWxlcy8uY2FjaGUnO1xuICBpZiAoZGlyICE9PSB1bmRlZmluZWQgJiYgZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgcm1kaXJTeW5jKGRpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgc2hvd01lc3NhZ2UoJ2NsZWFyIGNhY2hlJyk7XG4gIH1cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnByb2dyYW1cbiAgLm5hbWUoJ3NvbGFuYS1zdWl0ZS1jb25maWcnKVxuICAuZGVzY3JpcHRpb24oYFNldHVwICR7Q29uZmlnLkpTT05fRklMRV9OQU1FfWApXG4gIC52ZXJzaW9uKFZFUlNJT04pO1xuXG5wcm9ncmFtXG4gIC5vcHRpb24oXG4gICAgJy1jIC0tY2x1c3RlciA8Y2x1c3RlciB0eXBlPicsXG4gICAgJ2Nvbm5lY3QgdG8gY2x1c3RlciB0eXBlLiBcInByZFwiLCBcImRldlwiLCBcImxvY2FsaG9zdFwiJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctY2MgLS1jdXN0b20tY2x1c3RlciA8Y2x1c3RlciB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBjbHVzdGVyIHVybC4gXCJodHRwczovLy4uLlwiLCBpZiB5b3Ugc2V0IG1vcmUgdGhhbiBvbmUgdXJsLCBwbGVhc2Ugc2VwYXJhdGUgdGhlbSB3aXRoIGEgc3BhY2UnLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1kIC0tZGVidWcgPHRydWUgb3IgZmFsc2U+JyxcbiAgICAnZGlzcGxheSBkZWJ1ZyBsb2cgb24gdGVybWluYWwuIGRlZmFsdXQgXCJmYWxzZVwiICcsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLW4gLS1uZnRzdG9yYWdlIDxhcGlrZXk+JyxcbiAgICAnU2V0IGFwaWtleSBvZiBuZnQuc3RvcmFnZS4gXCJleUpoYkdjaU8uLi5cIicsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWRhcyAtLWRhcy1hcGktdXJsIDxkaWdpdGFsIGFzc2V0IGFwaSB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBkaWdpdGFsIGFzc2V0IGFwaSB1cmwuIFwiaHR0cHM6Ly8uLi5cIiwgaWYgeW91IHNldCBtb3JlIHRoYW4gb25lIHVybCwgcGxlYXNlIHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlJyxcbiAgKVxuICAub3B0aW9uKCctcyAtLXNob3cnLCAnU2hvdyB2YWx1ZSBjdXJyZW50IHNvbGFuYS1zdWl0ZS5qc29uJyk7XG5cbnByb2dyYW0ucGFyc2UoKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gYWN0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBleGVjQ2x1c2VyID0gKHR5cGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBsZXQgY29udmVydGVkVHlwZSA9ICcnO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdwcmQnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdtYWlubmV0LWJldGEnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZGV2JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnZGV2bmV0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xvY2FsaG9zdCc6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ2xvY2FsaG9zdC1kZXZuZXQnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm8gbWF0Y2ggcGFyYW1ldGVyOiBuZWVkIHBhcmFtZXRlciBpc1xcblwicHJkXCIsIFwiZGV2XCIsIFwibG9jYWxob3N0XCIsIGFueSBvbmUgb2YgdGhlbWAsXG4gICAgICApO1xuICB9XG4gIHVwZGF0ZUNsdXN0ZXJDb25maWdGaWxlKGNvbnZlcnRlZFR5cGUpO1xufTtcblxuY29uc3QgZXhlY0N1c3RvbUNsdXN0ZXIgPSAodXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBjb25zdCB2YWxpZGF0aW9uID0gKHU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiAvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7Lz86QCY9KyQsJSNdKy9nLnRlc3QodSk7XG4gIH07XG5cbiAgdXJsLmZvckVhY2goKGVsZW1lbnQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghdmFsaWRhdGlvbihlbGVtZW50KSkge1xuICAgICAgd2Fybk1lc3NhZ2UoXG4gICAgICAgIGBOb3QgZm91bmQgY3VzdG9tIGNsdXN0ZXIgdXJsOiAke2VsZW1lbnR9LiBlLmc6IGN1c3RvbSBodHRwczovLy4uLmAsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlQ2x1c3RlclVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNEZWJ1ZyA9IChib29sOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKGJvb2wgIT0gJ3RydWUnICYmIGJvb2wgIT0gJ2ZhbHNlJykge1xuICAgIHdhcm5NZXNzYWdlKFxuICAgICAgYE5vIG1hdGNoIHBhcmFtZXRlcjogbmVlZCBwYXJhbWV0ZXIgaXMgXCJ0cnVlXCIsIFwiZmFsc2VcIi4gYW55IG9uZSBvZiB0aGVtYCxcbiAgICApO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuICB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUoYm9vbCk7XG59O1xuXG5jb25zdCBleGVjTmZ0c3RvcmFnZSA9IChhcGlLZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBpZiAoYXBpS2V5Lmxlbmd0aCA8IDIzMCkge1xuICAgIHdhcm5NZXNzYWdlKCdOb3QgZm91bmQgYXBpIGtleScpO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuICB1cGRhdGVOZnRTdG9yYWdlQ29uZmlnRmlsZShhcGlLZXkpO1xufTtcblxuY29uc3QgZXhlY0Rhc0FwaVVybCA9ICh1cmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSAodTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIC9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTsvPzpAJj0rJCwlI10rL2cudGVzdCh1KTtcbiAgfTtcblxuICB1cmwuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF2YWxpZGF0aW9uKGVsZW1lbnQpKSB7XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vdCBmb3VuZCBEaWdpdGFsIGFzc2V0IGFwaSB1cmw6ICR7ZWxlbWVudH0uIGUuZzogaHR0cHM6Ly8uLi5gLFxuICAgICAgKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNTaG93ID0gKCk6IHZvaWQgPT4ge1xuICBzaG93Q3VycmVudENvbmZpZ0ZpbGUoKTtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBhcnNlIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3Qgb3B0aW9ucyA9IHByb2dyYW0ub3B0cygpO1xuaWYgKG9wdGlvbnMuY2x1c3Rlcikge1xuICBleGVjQ2x1c2VyKG9wdGlvbnMuY2x1c3Rlcik7XG59IGVsc2UgaWYgKG9wdGlvbnMuY3VzdG9tQ2x1c3Rlcikge1xuICBleGVjQ3VzdG9tQ2x1c3RlcihvcHRpb25zLmN1c3RvbUNsdXN0ZXIpO1xufSBlbHNlIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gIGV4ZWNEZWJ1ZyhvcHRpb25zLmRlYnVnKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5uZnRzdG9yYWdlKSB7XG4gIGV4ZWNOZnRzdG9yYWdlKG9wdGlvbnMubmZ0c3RvcmFnZSk7XG59IGVsc2UgaWYgKG9wdGlvbnMuZGFzQXBpVXJsKSB7XG4gIGV4ZWNEYXNBcGlVcmwob3B0aW9ucy5kYXNBcGlVcmwpO1xufSBlbHNlIGlmIChvcHRpb25zLnNob3cpIHtcbiAgZXhlY1Nob3coKTtcbn0gZWxzZSB7XG4gIHdhcm5NZXNzYWdlKCdObyBtYXRjaCBwYXJhbWV0ZXInKTtcbn1cbiIsICJpbXBvcnQgeyByZWFkZGlyU3luYywgc3RhdFN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IGpvaW4gfSBmcm9tICdub2RlOnBhdGgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbmZpZyB7XG4gIGV4cG9ydCBjb25zdCBKU09OX0ZJTEVfTkFNRSA9ICdzb2xhbmEtc3VpdGUuanNvbic7XG5cbiAgLyoqXG4gICAqIFNlYXJjaCAgZmlsZSBwYXRoIGZvciBzb2xhbmEtc3VpdGUuanNvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyXG4gICAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWR9XG4gICAqL1xuICBleHBvcnQgY29uc3Qgc2VhcmNoQ29uZmlnSnNvbiA9IChkaXI6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgZmlsZXMgPSByZWFkZGlyU3luYyhkaXIpO1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgZmlsZVBhdGggPSBqb2luKGRpciwgZmlsZSk7XG4gICAgICBpZiAoc3RhdFN5bmMoZmlsZVBhdGgpLmlzRmlsZSgpICYmIGZpbGUgPT09IEpTT05fRklMRV9OQU1FKSB7XG4gICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdFN5bmMoZmlsZVBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgY29uc3QgcmVzID0gc2VhcmNoQ29uZmlnSnNvbihmaWxlUGF0aCk7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRl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