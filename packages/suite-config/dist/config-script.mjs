#!/usr/bin/env node

// src/config-script.ts
import { existsSync, readFileSync, rmdirSync, writeFileSync } from "node:fs";
import { Command } from "commander";

// src/search-config.ts
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
var Config;
((Config2) => {
  Config2.JSON_FILE_NAME = "solana-suite.json";
  Config2.searchConfigJson = (dir) => {
    const files = readdirSync(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      if (statSync(filePath).isFile() && file === Config2.JSON_FILE_NAME) {
        return filePath;
      } else if (statSync(filePath).isDirectory()) {
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
var program = new Command();
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
    parsed = JSON.parse(readFileSync(configPath).toString());
  } catch (e) {
    if (e instanceof Error) {
      warnMessage(`Error don't read solana-suite-config.json, ${e.message}`);
    }
    process.exit(0);
  }
})();
var updateDebugConfigFile = (debugging) => {
  parsed["debugging"] = debugging;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterConfigFile = (type) => {
  parsed["cluster"].type = type;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateClusterUrlConfigFile = (customClusterUrl) => {
  parsed["cluster"].customClusterUrl = customClusterUrl;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateNftStorageConfigFile = (apiKey) => {
  parsed["nftStorageApiKey"] = apiKey;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var updateDasApiUrlConfigFile = (dasApiUrl) => {
  parsed["dasApiUrl"] = dasApiUrl;
  writeFileSync(configPath, JSON.stringify(parsed));
  successMessage();
  clearCache();
};
var showCurrentConfigFile = () => {
  const cjs = readFileSync(configPath);
  showMessage(`Current value
${cjs.toString()}
`);
};
var clearCache = () => {
  const dir = "../../node_modules/.cache";
  if (dir !== void 0 && existsSync(dir)) {
    rmdirSync(dir, { recursive: true });
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