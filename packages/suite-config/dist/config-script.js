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
var updateFilebaseConfigFile = (filebase) => {
  parsed["filebase"] = filebase;
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
  "-f --filebase <key> <secret>",
  'Set filebase key and secret. "9CA51CEFF9FF98CB91CF" "CgjYuMvs2NdFGbLPyFDSWESaO05nobQ9mp16PPDo" '
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
var execFilebase = (filebase) => {
  if (filebase.key.length < 1 || filebase.secret.length < 1) {
    warnMessage("Not found filebase key or secret");
    process.exit(0);
  }
  updateFilebaseConfigFile(filebase);
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
} else if (options.filebase) {
  execFilebase(options.filebase);
} else if (options.dasApiUrl) {
  execDasApiUrl(options.dasApiUrl);
} else if (options.show) {
  execShow();
} else {
  warnMessage("No match parameter");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbmZpZy1zY3JpcHQudHMiLCAiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZWFyY2gtY29uZmlnJztcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKCk7XG5cbnR5cGUgRmlsZWJhc2UgPSB7XG4gIGtleTogc3RyaW5nO1xuICBzZWNyZXQ6IHN0cmluZztcbn07XG5cbmxldCBjb25maWdQYXRoOiBzdHJpbmc7XG5sZXQgcGFyc2VkOiB7XG4gIGNsdXN0ZXI6IHsgdHlwZTogc3RyaW5nOyBjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSB9O1xuICBkZWJ1Z2dpbmc6IHN0cmluZztcbiAgZmlsZWJhc2U6IEZpbGViYXNlO1xuICBkYXNBcGlVcmw6IHN0cmluZ1tdO1xufTtcbmNvbnN0IFZFUlNJT04gPSAnMC41JztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gbG9jYWwgZnVuY3Rpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jb25zdCBzdWNjZXNzTWVzc2FnZSA9ICgpID0+IGNvbnNvbGUubG9nKCcjIFVwZGF0ZSBzb2xhbmEgc3VpdGUgY29uZmlnLicpO1xuY29uc3Qgc2hvd01lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmxvZyhgIyAke21lc3N9YCk7XG5jb25zdCB3YXJuTWVzc2FnZSA9IChtZXNzOiBzdHJpbmcpID0+IGNvbnNvbGUuZXJyb3IoYCMgJHttZXNzfWApO1xuXG4oKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGggPSBDb25maWcuc2VhcmNoQ29uZmlnSnNvbignLi8nKTtcbiAgICBpZiAoIXBhdGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBOb3QgZm91bmQgJHtDb25maWcuSlNPTl9GSUxFX05BTUV9YCk7XG4gICAgfVxuICAgIGNvbmZpZ1BhdGggPSBwYXRoO1xuICAgIHNob3dNZXNzYWdlKGBjb25maWcgcGF0aDogJHtjb25maWdQYXRofWApO1xuICAgIHBhcnNlZCA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGNvbmZpZ1BhdGgpLnRvU3RyaW5nKCkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgd2Fybk1lc3NhZ2UoYEVycm9yIGRvbid0IHJlYWQgc29sYW5hLXN1aXRlLWNvbmZpZy5qc29uLCAke2UubWVzc2FnZX1gKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG59KSgpO1xuXG5jb25zdCB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUgPSAoZGVidWdnaW5nOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgcGFyc2VkWydkZWJ1Z2dpbmcnXSA9IGRlYnVnZ2luZztcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlQ2x1c3RlckNvbmZpZ0ZpbGUgPSAodHlwZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnY2x1c3RlciddLnR5cGUgPSB0eXBlO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCB1cGRhdGVDbHVzdGVyVXJsQ29uZmlnRmlsZSA9IChjdXN0b21DbHVzdGVyVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2NsdXN0ZXInXS5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlRmlsZWJhc2VDb25maWdGaWxlID0gKGZpbGViYXNlOiBGaWxlYmFzZSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2ZpbGViYXNlJ10gPSBmaWxlYmFzZTtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlRGFzQXBpVXJsQ29uZmlnRmlsZSA9IChkYXNBcGlVcmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnZGFzQXBpVXJsJ10gPSBkYXNBcGlVcmw7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHNob3dDdXJyZW50Q29uZmlnRmlsZSA9ICgpOiB2b2lkID0+IHtcbiAgY29uc3QgY2pzID0gcmVhZEZpbGVTeW5jKGNvbmZpZ1BhdGgpO1xuICBzaG93TWVzc2FnZShgQ3VycmVudCB2YWx1ZVxcbiR7Y2pzLnRvU3RyaW5nKCl9XFxuYCk7XG59O1xuXG5jb25zdCBjbGVhckNhY2hlID0gKCkgPT4ge1xuICBjb25zdCBkaXIgPSAnLi4vLi4vbm9kZV9tb2R1bGVzLy5jYWNoZSc7XG4gIGlmIChkaXIgIT09IHVuZGVmaW5lZCAmJiBleGlzdHNTeW5jKGRpcikpIHtcbiAgICBybWRpclN5bmMoZGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBzaG93TWVzc2FnZSgnY2xlYXIgY2FjaGUnKTtcbiAgfVxufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gb3B0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xucHJvZ3JhbVxuICAubmFtZSgnc29sYW5hLXN1aXRlLWNvbmZpZycpXG4gIC5kZXNjcmlwdGlvbihgU2V0dXAgJHtDb25maWcuSlNPTl9GSUxFX05BTUV9YClcbiAgLnZlcnNpb24oVkVSU0lPTik7XG5cbnByb2dyYW1cbiAgLm9wdGlvbihcbiAgICAnLWMgLS1jbHVzdGVyIDxjbHVzdGVyIHR5cGU+JyxcbiAgICAnY29ubmVjdCB0byBjbHVzdGVyIHR5cGUuIFwicHJkXCIsIFwiZGV2XCIsIFwibG9jYWxob3N0XCInLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1jYyAtLWN1c3RvbS1jbHVzdGVyIDxjbHVzdGVyIHVybC4uLj4nLFxuICAgICdjb25uZWN0IHRvIGNsdXN0ZXIgdXJsLiBcImh0dHBzOi8vLi4uXCIsIGlmIHlvdSBzZXQgbW9yZSB0aGFuIG9uZSB1cmwsIHBsZWFzZSBzZXBhcmF0ZSB0aGVtIHdpdGggYSBzcGFjZScsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWQgLS1kZWJ1ZyA8dHJ1ZSBvciBmYWxzZT4nLFxuICAgICdkaXNwbGF5IGRlYnVnIGxvZyBvbiB0ZXJtaW5hbC4gZGVmYWx1dCBcImZhbHNlXCIgJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctZiAtLWZpbGViYXNlIDxrZXk+IDxzZWNyZXQ+JyxcbiAgICAnU2V0IGZpbGViYXNlIGtleSBhbmQgc2VjcmV0LiBcIjlDQTUxQ0VGRjlGRjk4Q0I5MUNGXCIgXCJDZ2pZdU12czJOZEZHYkxQeUZEU1dFU2FPMDVub2JROW1wMTZQUERvXCIgJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctZGFzIC0tZGFzLWFwaS11cmwgPGRpZ2l0YWwgYXNzZXQgYXBpIHVybC4uLj4nLFxuICAgICdjb25uZWN0IHRvIGRpZ2l0YWwgYXNzZXQgYXBpIHVybC4gXCJodHRwczovLy4uLlwiLCBpZiB5b3Ugc2V0IG1vcmUgdGhhbiBvbmUgdXJsLCBwbGVhc2Ugc2VwYXJhdGUgdGhlbSB3aXRoIGEgc3BhY2UnLFxuICApXG4gIC5vcHRpb24oJy1zIC0tc2hvdycsICdTaG93IHZhbHVlIGN1cnJlbnQgc29sYW5hLXN1aXRlLmpzb24nKTtcblxucHJvZ3JhbS5wYXJzZSgpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBhY3Rpb25zXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IGV4ZWNDbHVzZXIgPSAodHlwZTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGxldCBjb252ZXJ0ZWRUeXBlID0gJyc7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3ByZCc6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ21haW5uZXQtYmV0YSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdkZXYnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdkZXZuZXQnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbG9jYWxob3N0JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnbG9jYWxob3N0LWRldm5ldCc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgd2Fybk1lc3NhZ2UoXG4gICAgICAgIGBObyBtYXRjaCBwYXJhbWV0ZXI6IG5lZWQgcGFyYW1ldGVyIGlzXFxuXCJwcmRcIiwgXCJkZXZcIiwgXCJsb2NhbGhvc3RcIiwgYW55IG9uZSBvZiB0aGVtYCxcbiAgICAgICk7XG4gIH1cbiAgdXBkYXRlQ2x1c3RlckNvbmZpZ0ZpbGUoY29udmVydGVkVHlwZSk7XG59O1xuXG5jb25zdCBleGVjQ3VzdG9tQ2x1c3RlciA9ICh1cmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSAodTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIC9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTsvPzpAJj0rJCwlI10rL2cudGVzdCh1KTtcbiAgfTtcblxuICB1cmwuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF2YWxpZGF0aW9uKGVsZW1lbnQpKSB7XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vdCBmb3VuZCBjdXN0b20gY2x1c3RlciB1cmw6ICR7ZWxlbWVudH0uIGUuZzogY3VzdG9tIGh0dHBzOi8vLi4uYCxcbiAgICAgICk7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfVxuICB9KTtcblxuICB1cGRhdGVDbHVzdGVyVXJsQ29uZmlnRmlsZSh1cmwpO1xufTtcblxuY29uc3QgZXhlY0RlYnVnID0gKGJvb2w6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBpZiAoYm9vbCAhPSAndHJ1ZScgJiYgYm9vbCAhPSAnZmFsc2UnKSB7XG4gICAgd2Fybk1lc3NhZ2UoXG4gICAgICBgTm8gbWF0Y2ggcGFyYW1ldGVyOiBuZWVkIHBhcmFtZXRlciBpcyBcInRydWVcIiwgXCJmYWxzZVwiLiBhbnkgb25lIG9mIHRoZW1gLFxuICAgICk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZURlYnVnQ29uZmlnRmlsZShib29sKTtcbn07XG5cbmNvbnN0IGV4ZWNGaWxlYmFzZSA9IChmaWxlYmFzZTogRmlsZWJhc2UpOiB2b2lkID0+IHtcbiAgaWYgKGZpbGViYXNlLmtleS5sZW5ndGggPCAxIHx8IGZpbGViYXNlLnNlY3JldC5sZW5ndGggPCAxKSB7XG4gICAgd2Fybk1lc3NhZ2UoJ05vdCBmb3VuZCBmaWxlYmFzZSBrZXkgb3Igc2VjcmV0Jyk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZUZpbGViYXNlQ29uZmlnRmlsZShmaWxlYmFzZSk7XG59O1xuXG5jb25zdCBleGVjRGFzQXBpVXJsID0gKHVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgY29uc3QgdmFsaWRhdGlvbiA9ICh1OiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oy8/OkAmPSskLCUjXSsvZy50ZXN0KHUpO1xuICB9O1xuXG4gIHVybC5mb3JFYWNoKChlbGVtZW50OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIXZhbGlkYXRpb24oZWxlbWVudCkpIHtcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm90IGZvdW5kIERpZ2l0YWwgYXNzZXQgYXBpIHVybDogJHtlbGVtZW50fS4gZS5nOiBodHRwczovLy4uLmAsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlRGFzQXBpVXJsQ29uZmlnRmlsZSh1cmwpO1xufTtcblxuY29uc3QgZXhlY1Nob3cgPSAoKTogdm9pZCA9PiB7XG4gIHNob3dDdXJyZW50Q29uZmlnRmlsZSgpO1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUGFyc2Ugb3B0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBvcHRpb25zID0gcHJvZ3JhbS5vcHRzKCk7XG5pZiAob3B0aW9ucy5jbHVzdGVyKSB7XG4gIGV4ZWNDbHVzZXIob3B0aW9ucy5jbHVzdGVyKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5jdXN0b21DbHVzdGVyKSB7XG4gIGV4ZWNDdXN0b21DbHVzdGVyKG9wdGlvbnMuY3VzdG9tQ2x1c3Rlcik7XG59IGVsc2UgaWYgKG9wdGlvbnMuZGVidWcpIHtcbiAgZXhlY0RlYnVnKG9wdGlvbnMuZGVidWcpO1xufSBlbHNlIGlmIChvcHRpb25zLmZpbGViYXNlKSB7XG4gIGV4ZWNGaWxlYmFzZShvcHRpb25zLmZpbGViYXNlKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5kYXNBcGlVcmwpIHtcbiAgZXhlY0Rhc0FwaVVybChvcHRpb25zLmRhc0FwaVVybCk7XG59IGVsc2UgaWYgKG9wdGlvbnMuc2hvdykge1xuICBleGVjU2hvdygpO1xufSBlbHNlIHtcbiAgd2Fybk1lc3NhZ2UoJ05vIG1hdGNoIHBhcmFtZXRlcicpO1xufVxuIiwgImltcG9ydCB7IHJlYWRkaXJTeW5jLCBzdGF0U3luYyB9IGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gJ25vZGU6cGF0aCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uZmlnIHtcbiAgZXhwb3J0IGNvbnN0IEpTT05fRklMRV9OQU1FID0gJ3NvbGFuYS1zdWl0ZS5qc29uJztcblxuICAvKipcbiAgICogU2VhcmNoICBmaWxlIHBhdGggZm9yIHNvbGFuYS1zdWl0ZS5qc29uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkaXJcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH1cbiAgICovXG4gIGV4cG9ydCBjb25zdCBzZWFyY2hDb25maWdKc29uID0gKGRpcjogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgICBjb25zdCBmaWxlcyA9IHJlYWRkaXJTeW5jKGRpcik7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IGpvaW4oZGlyLCBmaWxlKTtcbiAgICAgIGlmIChzdGF0U3luYyhmaWxlUGF0aCkuaXNGaWxlKCkgJiYgZmlsZSA9PT0gSlNPTl9GSUxFX05BTUUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgfSBlbHNlIGlmIChzdGF0U3luYyhmaWxlUGF0aCkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBjb25zdCByZXMgPSBzZWFyY2hDb25maWdKc29uKGZpbGVQYXRoKTtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7QUFFQSxJQUFBQSxrQkFBbUU7QUFDbkUsdUJBQXdCOzs7QUNIeEIscUJBQXNDO0FBQ3RDLHVCQUFxQjtBQUVkLElBQVU7QUFBQSxDQUFWLENBQVVDLFlBQVY7QUFDRSxFQUFNQSxRQUFBLGlCQUFpQjtBQU92QixFQUFNQSxRQUFBLG1CQUFtQixDQUFDLFFBQW9DO0FBQ25FLFVBQU0sWUFBUSw0QkFBWSxHQUFHO0FBQzdCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sZUFBVyx1QkFBSyxLQUFLLElBQUk7QUFDL0IsY0FBSSx5QkFBUyxRQUFRLEVBQUUsT0FBTyxLQUFLLFNBQVNBLFFBQUEsZ0JBQWdCO0FBQzFELGVBQU87QUFBQSxNQUNULGVBQVcseUJBQVMsUUFBUSxFQUFFLFlBQVksR0FBRztBQUMzQyxjQUFNLFVBQU1BLFFBQUEsa0JBQWlCLFFBQVE7QUFDckMsWUFBSSxLQUFLO0FBQ1AsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEdBdEJlOzs7QURHakIsSUFBTSxVQUFVLElBQUkseUJBQVE7QUFPNUIsSUFBSTtBQUNKLElBQUk7QUFNSixJQUFNLFVBQVU7QUFLaEIsSUFBTSxpQkFBaUIsTUFBTSxRQUFRLElBQUksK0JBQStCO0FBQ3hFLElBQU0sY0FBYyxDQUFDLFNBQWlCLFFBQVEsSUFBSSxLQUFLLElBQUksRUFBRTtBQUM3RCxJQUFNLGNBQWMsQ0FBQyxTQUFpQixRQUFRLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFBQSxDQUU5RCxNQUFNO0FBQ0wsTUFBSTtBQUNGLFVBQU0sT0FBTyxPQUFPLGlCQUFpQixJQUFJO0FBQ3pDLFFBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBTSxNQUFNLGFBQWEsT0FBTyxjQUFjLEVBQUU7QUFBQSxJQUNsRDtBQUNBLGlCQUFhO0FBQ2IsZ0JBQVksZ0JBQWdCLFVBQVUsRUFBRTtBQUN4QyxhQUFTLEtBQUssVUFBTSw4QkFBYSxVQUFVLEVBQUUsU0FBUyxDQUFDO0FBQUEsRUFDekQsU0FBUyxHQUFHO0FBQ1YsUUFBSSxhQUFhLE9BQU87QUFDdEIsa0JBQVksOENBQThDLEVBQUUsT0FBTyxFQUFFO0FBQUEsSUFDdkU7QUFDQSxZQUFRLEtBQUssQ0FBQztBQUFBLEVBQ2hCO0FBQ0YsR0FBRztBQUVILElBQU0sd0JBQXdCLENBQUMsY0FBNEI7QUFDekQsU0FBTyxXQUFXLElBQUk7QUFDdEIscUNBQWMsWUFBWSxLQUFLLFVBQVUsTUFBTSxDQUFDO0FBQ2hELGlCQUFlO0FBQ2YsYUFBVztBQUNiO0FBRUEsSUFBTSwwQkFBMEIsQ0FBQyxTQUF1QjtBQUN0RCxTQUFPLFNBQVMsRUFBRSxPQUFPO0FBQ3pCLHFDQUFjLFlBQVksS0FBSyxVQUFVLE1BQU0sQ0FBQztBQUNoRCxpQkFBZTtBQUNmLGFBQVc7QUFDYjtBQUVBLElBQU0sNkJBQTZCLENBQUMscUJBQXFDO0FBQ3ZFLFNBQU8sU0FBUyxFQUFFLG1CQUFtQjtBQUNyQyxxQ0FBYyxZQUFZLEtBQUssVUFBVSxNQUFNLENBQUM7QUFDaEQsaUJBQWU7QUFDZixhQUFXO0FBQ2I7QUFFQSxJQUFNLDJCQUEyQixDQUFDLGFBQTZCO0FBQzdELFNBQU8sVUFBVSxJQUFJO0FBQ3JCLHFDQUFjLFlBQVksS0FBSyxVQUFVLE1BQU0sQ0FBQztBQUNoRCxpQkFBZTtBQUNmLGFBQVc7QUFDYjtBQUVBLElBQU0sNEJBQTRCLENBQUMsY0FBOEI7QUFDL0QsU0FBTyxXQUFXLElBQUk7QUFDdEIscUNBQWMsWUFBWSxLQUFLLFVBQVUsTUFBTSxDQUFDO0FBQ2hELGlCQUFlO0FBQ2YsYUFBVztBQUNiO0FBRUEsSUFBTSx3QkFBd0IsTUFBWTtBQUN4QyxRQUFNLFVBQU0sOEJBQWEsVUFBVTtBQUNuQyxjQUFZO0FBQUEsRUFBa0IsSUFBSSxTQUFTLENBQUM7QUFBQSxDQUFJO0FBQ2xEO0FBRUEsSUFBTSxhQUFhLE1BQU07QUFDdkIsUUFBTSxNQUFNO0FBQ1osTUFBSSxRQUFRLGNBQWEsNEJBQVcsR0FBRyxHQUFHO0FBQ3hDLG1DQUFVLEtBQUssRUFBRSxXQUFXLEtBQUssQ0FBQztBQUNsQyxnQkFBWSxhQUFhO0FBQUEsRUFDM0I7QUFDRjtBQUtBLFFBQ0csS0FBSyxxQkFBcUIsRUFDMUIsWUFBWSxTQUFTLE9BQU8sY0FBYyxFQUFFLEVBQzVDLFFBQVEsT0FBTztBQUVsQixRQUNHO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDO0FBQUEsRUFDQztBQUFBLEVBQ0E7QUFDRixFQUNDLE9BQU8sYUFBYSxzQ0FBc0M7QUFFN0QsUUFBUSxNQUFNO0FBTWQsSUFBTSxhQUFhLENBQUMsU0FBdUI7QUFDekMsTUFBSSxnQkFBZ0I7QUFDcEIsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsc0JBQWdCO0FBQ2hCO0FBQUEsSUFDRixLQUFLO0FBQ0gsc0JBQWdCO0FBQ2hCO0FBQUEsSUFDRixLQUFLO0FBQ0gsc0JBQWdCO0FBQ2hCO0FBQUEsSUFDRjtBQUNFO0FBQUEsUUFDRTtBQUFBO0FBQUEsTUFDRjtBQUFBLEVBQ0o7QUFDQSwwQkFBd0IsYUFBYTtBQUN2QztBQUVBLElBQU0sb0JBQW9CLENBQUMsUUFBd0I7QUFDakQsUUFBTSxhQUFhLENBQUMsTUFBYztBQUNoQyxXQUFPLGlEQUFpRCxLQUFLLENBQUM7QUFBQSxFQUNoRTtBQUVBLE1BQUksUUFBUSxDQUFDLFlBQW9CO0FBQy9CLFFBQUksQ0FBQyxXQUFXLE9BQU8sR0FBRztBQUN4QjtBQUFBLFFBQ0UsaUNBQWlDLE9BQU87QUFBQSxNQUMxQztBQUNBLGNBQVEsS0FBSyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNGLENBQUM7QUFFRCw2QkFBMkIsR0FBRztBQUNoQztBQUVBLElBQU0sWUFBWSxDQUFDLFNBQXVCO0FBQ3hDLE1BQUksUUFBUSxVQUFVLFFBQVEsU0FBUztBQUNyQztBQUFBLE1BQ0U7QUFBQSxJQUNGO0FBQ0EsWUFBUSxLQUFLLENBQUM7QUFBQSxFQUNoQjtBQUNBLHdCQUFzQixJQUFJO0FBQzVCO0FBRUEsSUFBTSxlQUFlLENBQUMsYUFBNkI7QUFDakQsTUFBSSxTQUFTLElBQUksU0FBUyxLQUFLLFNBQVMsT0FBTyxTQUFTLEdBQUc7QUFDekQsZ0JBQVksa0NBQWtDO0FBQzlDLFlBQVEsS0FBSyxDQUFDO0FBQUEsRUFDaEI7QUFDQSwyQkFBeUIsUUFBUTtBQUNuQztBQUVBLElBQU0sZ0JBQWdCLENBQUMsUUFBd0I7QUFDN0MsUUFBTSxhQUFhLENBQUMsTUFBYztBQUNoQyxXQUFPLGlEQUFpRCxLQUFLLENBQUM7QUFBQSxFQUNoRTtBQUVBLE1BQUksUUFBUSxDQUFDLFlBQW9CO0FBQy9CLFFBQUksQ0FBQyxXQUFXLE9BQU8sR0FBRztBQUN4QjtBQUFBLFFBQ0Usb0NBQW9DLE9BQU87QUFBQSxNQUM3QztBQUNBLGNBQVEsS0FBSyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNGLENBQUM7QUFFRCw0QkFBMEIsR0FBRztBQUMvQjtBQUVBLElBQU0sV0FBVyxNQUFZO0FBQzNCLHdCQUFzQjtBQUN4QjtBQU1BLElBQU0sVUFBVSxRQUFRLEtBQUs7QUFDN0IsSUFBSSxRQUFRLFNBQVM7QUFDbkIsYUFBVyxRQUFRLE9BQU87QUFDNUIsV0FBVyxRQUFRLGVBQWU7QUFDaEMsb0JBQWtCLFFBQVEsYUFBYTtBQUN6QyxXQUFXLFFBQVEsT0FBTztBQUN4QixZQUFVLFFBQVEsS0FBSztBQUN6QixXQUFXLFFBQVEsVUFBVTtBQUMzQixlQUFhLFFBQVEsUUFBUTtBQUMvQixXQUFXLFFBQVEsV0FBVztBQUM1QixnQkFBYyxRQUFRLFNBQVM7QUFDakMsV0FBVyxRQUFRLE1BQU07QUFDdkIsV0FBUztBQUNYLE9BQU87QUFDTCxjQUFZLG9CQUFvQjtBQUNsQzsiLAogICJuYW1lcyI6IFsiaW1wb3J0X25vZGVfZnMiLCAiQ29uZmlnIl0KfQo=