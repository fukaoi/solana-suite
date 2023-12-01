#!/usr/bin/env node

// src/config-script.ts
import { existsSync as existsSync2, readFileSync as readFileSync2, rmdirSync as rmdirSync2, writeFileSync as writeFileSync2 } from "node:fs";
import { Command } from "commander";

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

// src/config-script.ts
var program = new Command();
var configPath;
var parsed;
var VERSION = "0.5";
var successMessage = () => console.log("# Update solana suite config.");
var showMessage = (mess) => console.log(`# ${mess}`);
var warnMessage = (mess) => console.error(`# ${mess}`);
(() => {
  try {
    const path = Config.searchForSolanaSuiteConfig("./");
    if (!path) {
      throw Error(`Not found ${Config.JSON_FILE_NAME}`);
    }
    configPath = path;
    showMessage(`config path: ${configPath}`);
    parsed = JSON.parse(readFileSync2(configPath).toString());
  } catch (e) {
    if (e instanceof Error) {
      warnMessage(`Error don't read solana-suite-config.json, ${e.message}`);
    }
    process.exit(0);
  }
})();
var updateDebugConfigFile = (debugging) => {
  parsed["debugging"] = debugging;
  writeFileSync2(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterConfigFile = (type) => {
  parsed["cluster"].type = type;
  writeFileSync2(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterUrlConfigFile = (customClusterUrl) => {
  parsed["cluster"].customClusterUrl = customClusterUrl;
  writeFileSync2(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateNftStorageConfigFile = (apiKey) => {
  parsed["nftStorageApiKey"] = apiKey;
  writeFileSync2(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateDasApiUrlConfigFile = (dasApiUrl) => {
  parsed["dasApiUrl"] = dasApiUrl;
  writeFileSync2(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var showCurrentConfigFile = () => {
  const cjs = readFileSync2(Config.JSON_FILE_NAME);
  showMessage(`Current cjs
${cjs.toString()}
`);
};
var clearCache = () => {
  const dir = "../../node_modules/.cache";
  if (dir !== void 0 && existsSync2(dir)) {
    rmdirSync2(dir, { recursive: true });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbmZpZy1zY3JpcHQudHMiLCAiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZWFyY2gtY29uZmlnJztcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKCk7XG5cbmxldCBjb25maWdQYXRoOiBzdHJpbmc7XG5sZXQgcGFyc2VkOiB7XG4gIGNsdXN0ZXI6IHsgdHlwZTogc3RyaW5nOyBjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSB9O1xuICBkZWJ1Z2dpbmc6IHN0cmluZztcbiAgbmZ0U3RvcmFnZUFwaUtleTogc3RyaW5nO1xuICBkYXNBcGlVcmw6IHN0cmluZ1tdO1xufTtcbmNvbnN0IFZFUlNJT04gPSAnMC41JztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gbG9jYWwgZnVuY3Rpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBzdWNjZXNzTWVzc2FnZSA9ICgpID0+IGNvbnNvbGUubG9nKCcjIFVwZGF0ZSBzb2xhbmEgc3VpdGUgY29uZmlnLicpO1xuY29uc3Qgc2hvd01lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhgIyAke21lc3N9YCk7XG5jb25zdCB3YXJuTWVzc2FnZSA9IChtZXNzOiBzdHJpbmcpID0+IGNvbnNvbGUuZXJyb3IoYCMgJHttZXNzfWApO1xuXG4oKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGggPSBDb25maWcuc2VhcmNoRm9yU29sYW5hU3VpdGVDb25maWcoJy4vJyk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICB0aHJvdyBFcnJvcihgTm90IGZvdW5kICR7Q29uZmlnLkpTT05fRklMRV9OQU1FfWApO1xuICAgIH1cbiAgICBjb25maWdQYXRoID0gcGF0aDtcbiAgICBzaG93TWVzc2FnZShgY29uZmlnIHBhdGg6ICR7Y29uZmlnUGF0aH1gKTtcbiAgICBwYXJzZWQgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhjb25maWdQYXRoKS50b1N0cmluZygpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHdhcm5NZXNzYWdlKGBFcnJvciBkb24ndCByZWFkIHNvbGFuYS1zdWl0ZS1jb25maWcuanNvbiwgJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxufSkoKTtcblxuY29uc3QgdXBkYXRlRGVidWdDb25maWdGaWxlID0gKGRlYnVnZ2luZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnZGVidWdnaW5nJ10gPSBkZWJ1Z2dpbmc7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUNsdXN0ZXJDb25maWdGaWxlID0gKHR5cGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2NsdXN0ZXInXS50eXBlID0gdHlwZTtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlQ2x1c3RlclVybENvbmZpZ0ZpbGUgPSAoY3VzdG9tQ2x1c3RlclVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgcGFyc2VkWydjbHVzdGVyJ10uY3VzdG9tQ2x1c3RlclVybCA9IGN1c3RvbUNsdXN0ZXJVcmw7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZU5mdFN0b3JhZ2VDb25maWdGaWxlID0gKGFwaUtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnbmZ0U3RvcmFnZUFwaUtleSddID0gYXBpS2V5O1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVEYXNBcGlVcmxDb25maWdGaWxlID0gKGRhc0FwaVVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgcGFyc2VkWydkYXNBcGlVcmwnXSA9IGRhc0FwaVVybDtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3Qgc2hvd0N1cnJlbnRDb25maWdGaWxlID0gKCk6IHZvaWQgPT4ge1xuICBjb25zdCBjanMgPSByZWFkRmlsZVN5bmMoQ29uZmlnLkpTT05fRklMRV9OQU1FKTtcbiAgc2hvd01lc3NhZ2UoYEN1cnJlbnQgY2pzXFxuJHtjanMudG9TdHJpbmcoKX1cXG5gKTtcbn07XG5cbmNvbnN0IGNsZWFyQ2FjaGUgPSAoKSA9PiB7XG4gIGNvbnN0IGRpciA9ICcuLi8uLi9ub2RlX21vZHVsZXMvLmNhY2hlJztcbiAgaWYgKGRpciAhPT0gdW5kZWZpbmVkICYmIGV4aXN0c1N5bmMoZGlyKSkge1xuICAgIHJtZGlyU3luYyhkaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIHNob3dNZXNzYWdlKCdjbGVhciBjYWNoZScpO1xuICB9XG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBvcHRpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5wcm9ncmFtXG4gIC5uYW1lKCdzb2xhbmEtc3VpdGUtY29uZmlnJylcbiAgLmRlc2NyaXB0aW9uKGBTZXR1cCAke0NvbmZpZy5KU09OX0ZJTEVfTkFNRX1gKVxuICAudmVyc2lvbihWRVJTSU9OKTtcblxucHJvZ3JhbVxuICAub3B0aW9uKFxuICAgICctYyAtLWNsdXN0ZXIgPGNsdXN0ZXIgdHlwZT4nLFxuICAgICdjb25uZWN0IHRvIGNsdXN0ZXIgdHlwZS4gXCJwcmRcIiwgXCJkZXZcIiwgXCJ0ZXN0XCIsIFwibG9jYWxob3N0XCInLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1jYyAtLWN1c3RvbS1jbHVzdGVyIDxjbHVzdGVyIHVybC4uLj4nLFxuICAgICdjb25uZWN0IHRvIGNsdXN0ZXIgdXJsLiBcImh0dHBzOi8vLi4uXCIsIGlmIHlvdSBzZXQgbW9yZSB0aGFuIG9uZSB1cmwsIHBsZWFzZSBzZXBhcmF0ZSB0aGVtIHdpdGggYSBzcGFjZScsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWQgLS1kZWJ1ZyA8dHJ1ZSBvciBmYWxzZT4nLFxuICAgICdkaXNwbGF5IGRlYnVnIGxvZyBvbiB0ZXJtaW5hbC4gZGVmYWx1dCBcImZhbHNlXCIgJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctbiAtLW5mdHN0b3JhZ2UgPGFwaWtleT4nLFxuICAgICdTZXQgYXBpa2V5IG9mIG5mdC5zdG9yYWdlLiBcImV5SmhiR2NpTy4uLlwiJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctZGFzIC0tZGFzLWFwaS11cmwgPGRpZ2l0YWwgYXNzZXQgYXBpIHVybC4uLj4nLFxuICAgICdjb25uZWN0IHRvIGRpZ2l0YWwgYXNzZXQgYXBpIHVybC4gXCJodHRwczovLy4uLlwiLCBpZiB5b3Ugc2V0IG1vcmUgdGhhbiBvbmUgdXJsLCBwbGVhc2Ugc2VwYXJhdGUgdGhlbSB3aXRoIGEgc3BhY2UnLFxuICApXG4gIC5vcHRpb24oJy1zIC0tc2hvdycsICdTaG93IHZhbHVlIGN1cnJlbnQgc29sYW5hLXN1aXRlLmpzb24nKTtcblxucHJvZ3JhbS5wYXJzZSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBhY3Rpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IGV4ZWNDbHVzZXIgPSAodHlwZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGxldCBjb252ZXJ0ZWRUeXBlID0gJyc7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3ByZCc6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ21haW5uZXQtYmV0YSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkZXYnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdkZXZuZXQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndGVzdCc6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ3Rlc3RuZXQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbG9jYWxob3N0JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnbG9jYWxob3N0LWRldm5ldCc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgd2Fybk1lc3NhZ2UoXG4gICAgICAgIGBObyBtYXRjaCBwYXJhbWV0ZXI6IG5lZWQgcGFyYW1ldGVyIGlzXFxuXCJwcmRcIiwgXCJkZXZcIiwgXCJ0ZXN0XCIsIFwibG9jYWxob3N0XCIsIGFueSBvbmUgb2YgdGhlbWAsXG4gICAgICApO1xuICB9XG4gIHVwZGF0ZUNsdXN0ZXJDb25maWdGaWxlKGNvbnZlcnRlZFR5cGUpO1xufTtcblxuY29uc3QgZXhlY0N1c3RvbUNsdXN0ZXIgPSAodXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBjb25zdCB2YWxpZGF0aW9uID0gKHU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiAvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7XFwvPzpcXEAmPStcXCQsJSNdKy9nLnRlc3QodSk7XG4gIH07XG5cbiAgdXJsLmZvckVhY2goKGVsZW1lbnQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghdmFsaWRhdGlvbihlbGVtZW50KSkge1xuICAgICAgd2Fybk1lc3NhZ2UoXG4gICAgICAgIGBOb3QgZm91bmQgY3VzdG9tIGNsdXN0ZXIgdXJsOiAke2VsZW1lbnR9LiBlLmc6IGN1c3RvbSBodHRwczovLy4uLmAsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlQ2x1c3RlclVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNEZWJ1ZyA9IChib29sOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKGJvb2wgIT0gJ3RydWUnICYmIGJvb2wgIT0gJ2ZhbHNlJykge1xuICAgIHdhcm5NZXNzYWdlKFxuICAgICAgYE5vIG1hdGNoIHBhcmFtZXRlcjogbmVlZCBwYXJhbWV0ZXIgaXMgXCJ0cnVlXCIsIFwiZmFsc2VcIi4gYW55IG9uZSBvZiB0aGVtYCxcbiAgICApO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuICB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUoYm9vbCk7XG59O1xuXG5jb25zdCBleGVjTmZ0c3RvcmFnZSA9IChhcGlLZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBpZiAoYXBpS2V5Lmxlbmd0aCA8IDIzMCkge1xuICAgIHdhcm5NZXNzYWdlKCdOb3QgZm91bmQgYXBpIGtleScpO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuICB1cGRhdGVOZnRTdG9yYWdlQ29uZmlnRmlsZShhcGlLZXkpO1xufTtcblxuY29uc3QgZXhlY0Rhc0FwaVVybCA9ICh1cmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSAodTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIC9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTtcXC8/OlxcQCY9K1xcJCwlI10rL2cudGVzdCh1KTtcbiAgfTtcblxuICB1cmwuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF2YWxpZGF0aW9uKGVsZW1lbnQpKSB7XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vdCBmb3VuZCBEaWdpdGFsIGFzc2V0IGFwaSB1cmw6ICR7ZWxlbWVudH0uIGUuZzogaHR0cHM6Ly8uLi5gLFxuICAgICAgKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNTaG93ID0gKCk6IHZvaWQgPT4ge1xuICBzaG93Q3VycmVudENvbmZpZ0ZpbGUoKTtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBhcnNlIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3Qgb3B0aW9ucyA9IHByb2dyYW0ub3B0cygpO1xuaWYgKG9wdGlvbnMuY2x1c3Rlcikge1xuICBleGVjQ2x1c2VyKG9wdGlvbnMuY2x1c3Rlcik7XG59IGVsc2UgaWYgKG9wdGlvbnMuY3VzdG9tQ2x1c3Rlcikge1xuICBleGVjQ3VzdG9tQ2x1c3RlcihvcHRpb25zLmN1c3RvbUNsdXN0ZXIpO1xufSBlbHNlIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gIGV4ZWNEZWJ1ZyhvcHRpb25zLmRlYnVnKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5uZnRzdG9yYWdlKSB7XG4gIGV4ZWNOZnRzdG9yYWdlKG9wdGlvbnMubmZ0c3RvcmFnZSk7XG59IGVsc2UgaWYgKG9wdGlvbnMuZGFzQXBpVXJsKSB7XG4gIGV4ZWNEYXNBcGlVcmwob3B0aW9ucy5kYXNBcGlVcmwpO1xufSBlbHNlIGlmIChvcHRpb25zLnNob3cpIHtcbiAgZXhlY1Nob3coKTtcbn0gZWxzZSB7XG4gIHdhcm5NZXNzYWdlKCdObyBtYXRjaCBwYXJhbWV0ZXInKTtcbn1cbiIsICJpbXBvcnQge1xuICBleGlzdHNTeW5jLFxuICByZWFkZGlyU3luYyxcbiAgcmVhZEZpbGVTeW5jLFxuICBybWRpclN5bmMsXG4gIHN0YXRTeW5jLFxuICB3cml0ZUZpbGVTeW5jLFxufSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uZmlnIHtcbiAgZXhwb3J0IGNvbnN0IEpTT05fRklMRV9OQU1FID0gJ3NvbGFuYS1zdWl0ZS5qc29uJztcbiAgZXhwb3J0IGNvbnN0IHNlYXJjaEZvclNvbGFuYVN1aXRlQ29uZmlnID0gKFxuICAgIGRpcjogc3RyaW5nLFxuICApOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGZpbGVzID0gcmVhZGRpclN5bmMoZGlyKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihkaXIsIGZpbGUpO1xuICAgICAgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0ZpbGUoKSAmJiBmaWxlID09PSBKU09OX0ZJTEVfTkFNRSkge1xuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHNlYXJjaEZvclNvbGFuYVN1aXRlQ29uZmlnKGZpbGVQYXRoKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQUVBLFNBQVMsY0FBQUEsYUFBWSxnQkFBQUMsZUFBYyxhQUFBQyxZQUFXLGlCQUFBQyxzQkFBcUI7QUFDbkUsU0FBUyxlQUFlOzs7QUNIeEI7QUFBQSxFQUVFO0FBQUEsRUFHQTtBQUFBLE9BRUs7QUFFUCxTQUFTLFlBQVk7QUFFZCxJQUFVO0FBQUEsQ0FBVixDQUFVQyxZQUFWO0FBQ0UsRUFBTUEsUUFBQSxpQkFBaUI7QUFDdkIsRUFBTUEsUUFBQSw2QkFBNkIsQ0FDeEMsUUFDdUI7QUFDdkIsVUFBTSxRQUFRLFlBQVksR0FBRztBQUM3QixlQUFXLFFBQVEsT0FBTztBQUN4QixZQUFNLFdBQVcsS0FBSyxLQUFLLElBQUk7QUFDL0IsVUFBSSxTQUFTLFFBQVEsRUFBRSxPQUFPLEtBQUssU0FBU0EsUUFBQSxnQkFBZ0I7QUFDMUQsZUFBTztBQUFBLE1BQ1QsV0FBVyxTQUFTLFFBQVEsRUFBRSxZQUFZLEdBQUc7QUFDM0MsY0FBTSxVQUFNQSxRQUFBLDRCQUEyQixRQUFRO0FBQy9DLFlBQUksS0FBSztBQUNQLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxHQWxCZTs7O0FETGpCLElBQU0sVUFBVSxJQUFJLFFBQVE7QUFFNUIsSUFBSTtBQUNKLElBQUk7QUFNSixJQUFNLFVBQVU7QUFLaEIsSUFBTSxpQkFBaUIsTUFBTSxRQUFRLElBQUksK0JBQStCO0FBQ3hFLElBQU0sY0FBYyxDQUFDLFNBQWlCLFFBQVEsSUFBSSxLQUFLLElBQUksRUFBRTtBQUM3RCxJQUFNLGNBQWMsQ0FBQyxTQUFpQixRQUFRLE1BQU0sS0FBSyxJQUFJLEVB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S0FBSyxDQUFDO0FBQUEsRUFDbkU7QUFFQSxNQUFJLFFBQVEsQ0FBQyxZQUFvQjtBQUMvQixRQUFJLENBQUMsV0FBVyxPQUFPLEdBQUc7QUFDeEI7QUFBQSxRQUNFLGlDQUFpQyxPQUFPO0FBQUEsTUFDMUM7QUFDQSxjQUFRLEtBQUssQ0FBQztBQUFBLElBQ2hCO0FBQUEsRUFDRixDQUFDO0FBRUQsNkJBQTJCLEdBQUc7QUFDaEM7QUFFQSxJQUFNLFlBQVksQ0FBQyxTQUF1QjtBQUN4QyxNQUFJLFFBQVEsVUFBVSxRQUFRLFNBQVM7QUFDckM7QUFBQSxNQUNFO0FBQUEsSUFDRjtBQUNBLFlBQVEsS0FBSyxDQUFDO0FBQUEsRUFDaEI7QUFDQSx3QkFBc0IsSUFBSTtBQUM1QjtBQUVBLElBQU0saUJBQWlCLENBQUMsV0FBeUI7QUFDL0MsTUFBSSxPQUFPLFNBQVMsS0FBSztBQUN2QixnQkFBWSxtQkFBbUI7QUFDL0IsWUFBUSxLQUFLLENBQUM7QUFBQSxFQUNoQjtBQUNBLDZCQUEyQixNQUFNO0FBQ25DO0FBRUEsSUFBTSxnQkFBZ0IsQ0FBQyxRQUF3QjtBQUM3QyxRQUFNLGFBQWEsQ0FBQyxNQUFjO0FBQ2hDLFdBQU8sb0RBQW9ELEtBQUssQ0FBQztBQUFBLEVBQ25FO0FBRUEsTUFBSSxRQUFRLENBQUMsWUFBb0I7QUFDL0IsUUFBSSxDQUFDLFdBQVcsT0FBTyxHQUFHO0FBQ3hCO0FBQUEsUUFDRSxvQ0FBb0MsT0FBTztBQUFBLE1BQzdDO0FBQ0EsY0FBUSxLQUFLLENBQUM7QUFBQSxJQUNoQjtBQUFBLEVBQ0YsQ0FBQztBQUVELDRCQUEwQixHQUFHO0FBQy9CO0FBRUEsSUFBTSxXQUFXLE1BQVk7QUFDM0Isd0JBQXNCO0FBQ3hCO0FBTUEsSUFBTSxVQUFVLFFBQVEsS0FBSztBQUM3QixJQUFJLFFBQVEsU0FBUztBQUNuQixhQUFXLFFBQVEsT0FBTztBQUM1QixXQUFXLFFBQVEsZUFBZTtBQUNoQyxvQkFBa0IsUUFBUSxhQUFhO0FBQ3pDLFdBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQVUsUUFBUSxLQUFLO0FBQ3pCLFdBQVcsUUFBUSxZQUFZO0FBQzdCLGlCQUFlLFFBQVEsVUFBVTtBQUNuQyxXQUFXLFFBQVEsV0FBVztBQUM1QixnQkFBYyxRQUFRLFNBQVM7QUFDakMsV0FBVyxRQUFRLE1BQU07QUFDdkIsV0FBUztBQUNYLE9BQU87QUFDTCxjQUFZLG9CQUFvQjtBQUNsQzsiLAogICJuYW1lcyI6IFsiZXhpc3RzU3luYyIsICJyZWFkRmlsZVN5bmMiLCAicm1kaXJTeW5jIiwgIndyaXRlRmlsZVN5bmMiLCAiQ29uZmlnIiwgInJlYWRGaWxlU3luYyIsICJ3cml0ZUZpbGVTeW5jIiwgImV4aXN0c1N5bmMiLCAicm1kaXJTeW5jIl0KfQo=