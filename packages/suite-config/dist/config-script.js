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
  "-f --filebase <key> <secret> <bucket...>",
  'Set filebase key and secret. "9CA51CEFF9FF98CB91CF" "CgjYuMvs2NdFGbLPyFDSWESaO05nobQ9mp16PPDo" "MyStorage"  '
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
  if (filebase.length < 3) {
    warnMessage("Not found filebase key or secret");
    process.exit(0);
  }
  updateFilebaseConfigFile({
    key: filebase[0],
    secret: filebase[1],
    bucket: filebase[2]
  });
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
  console.log(options);
  execFilebase(options.filebase);
} else if (options.dasApiUrl) {
  execDasApiUrl(options.dasApiUrl);
} else if (options.show) {
  execShow();
} else {
  warnMessage("No match parameter");
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbmZpZy1zY3JpcHQudHMiLCAiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZWFyY2gtY29uZmlnJztcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKCk7XG5cbnR5cGUgRmlsZWJhc2UgPSB7XG4gIGtleTogc3RyaW5nO1xuICBzZWNyZXQ6IHN0cmluZztcbiAgYnVja2V0OiBzdHJpbmc7XG59O1xuXG5sZXQgY29uZmlnUGF0aDogc3RyaW5nO1xubGV0IHBhcnNlZDoge1xuICBjbHVzdGVyOiB7IHR5cGU6IHN0cmluZzsgY3VzdG9tQ2x1c3RlclVybDogc3RyaW5nW10gfTtcbiAgZGVidWdnaW5nOiBzdHJpbmc7XG4gIGZpbGViYXNlOiBGaWxlYmFzZTtcbiAgZGFzQXBpVXJsOiBzdHJpbmdbXTtcbn07XG5jb25zdCBWRVJTSU9OID0gJzAuNSc7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGxvY2FsIGZ1bmN0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3Qgc3VjY2Vzc01lc3NhZ2UgPSAoKSA9PiBjb25zb2xlLmxvZygnIyBVcGRhdGUgc29sYW5hIHN1aXRlIGNvbmZpZy4nKTtcbmNvbnN0IHNob3dNZXNzYWdlID0gKG1lc3M6IHN0cmluZykgPT4gY29uc29sZS5sb2coYCMgJHttZXNzfWApO1xuY29uc3Qgd2Fybk1lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmVycm9yKGAjICR7bWVzc31gKTtcblxuKCgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoID0gQ29uZmlnLnNlYXJjaENvbmZpZ0pzb24oJy4vJyk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICB0aHJvdyBFcnJvcihgTm90IGZvdW5kICR7Q29uZmlnLkpTT05fRklMRV9OQU1FfWApO1xuICAgIH1cbiAgICBjb25maWdQYXRoID0gcGF0aDtcbiAgICBzaG93TWVzc2FnZShgY29uZmlnIHBhdGg6ICR7Y29uZmlnUGF0aH1gKTtcbiAgICBwYXJzZWQgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhjb25maWdQYXRoKS50b1N0cmluZygpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHdhcm5NZXNzYWdlKGBFcnJvciBkb24ndCByZWFkIHNvbGFuYS1zdWl0ZS1jb25maWcuanNvbiwgJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxufSkoKTtcblxuY29uc3QgdXBkYXRlRGVidWdDb25maWdGaWxlID0gKGRlYnVnZ2luZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnZGVidWdnaW5nJ10gPSBkZWJ1Z2dpbmc7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUNsdXN0ZXJDb25maWdGaWxlID0gKHR5cGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2NsdXN0ZXInXS50eXBlID0gdHlwZTtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlQ2x1c3RlclVybENvbmZpZ0ZpbGUgPSAoY3VzdG9tQ2x1c3RlclVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgcGFyc2VkWydjbHVzdGVyJ10uY3VzdG9tQ2x1c3RlclVybCA9IGN1c3RvbUNsdXN0ZXJVcmw7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUZpbGViYXNlQ29uZmlnRmlsZSA9IChmaWxlYmFzZTogRmlsZWJhc2UpOiB2b2lkID0+IHtcbiAgcGFyc2VkWydmaWxlYmFzZSddID0gZmlsZWJhc2U7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUgPSAoZGFzQXBpVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2Rhc0FwaVVybCddID0gZGFzQXBpVXJsO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCBzaG93Q3VycmVudENvbmZpZ0ZpbGUgPSAoKTogdm9pZCA9PiB7XG4gIGNvbnN0IGNqcyA9IHJlYWRGaWxlU3luYyhjb25maWdQYXRoKTtcbiAgc2hvd01lc3NhZ2UoYEN1cnJlbnQgdmFsdWVcXG4ke2Nqcy50b1N0cmluZygpfVxcbmApO1xufTtcblxuY29uc3QgY2xlYXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgZGlyID0gJy4uLy4uL25vZGVfbW9kdWxlcy8uY2FjaGUnO1xuICBpZiAoZGlyICE9PSB1bmRlZmluZWQgJiYgZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgcm1kaXJTeW5jKGRpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgc2hvd01lc3NhZ2UoJ2NsZWFyIGNhY2hlJyk7XG4gIH1cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnByb2dyYW1cbiAgLm5hbWUoJ3NvbGFuYS1zdWl0ZS1jb25maWcnKVxuICAuZGVzY3JpcHRpb24oYFNldHVwICR7Q29uZmlnLkpTT05fRklMRV9OQU1FfWApXG4gIC52ZXJzaW9uKFZFUlNJT04pO1xuXG5wcm9ncmFtXG4gIC5vcHRpb24oXG4gICAgJy1jIC0tY2x1c3RlciA8Y2x1c3RlciB0eXBlPicsXG4gICAgJ2Nvbm5lY3QgdG8gY2x1c3RlciB0eXBlLiBcInByZFwiLCBcImRldlwiLCBcImxvY2FsaG9zdFwiJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctY2MgLS1jdXN0b20tY2x1c3RlciA8Y2x1c3RlciB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBjbHVzdGVyIHVybC4gXCJodHRwczovLy4uLlwiLCBpZiB5b3Ugc2V0IG1vcmUgdGhhbiBvbmUgdXJsLCBwbGVhc2Ugc2VwYXJhdGUgdGhlbSB3aXRoIGEgc3BhY2UnLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1kIC0tZGVidWcgPHRydWUgb3IgZmFsc2U+JyxcbiAgICAnZGlzcGxheSBkZWJ1ZyBsb2cgb24gdGVybWluYWwuIGRlZmFsdXQgXCJmYWxzZVwiICcsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWYgLS1maWxlYmFzZSA8a2V5PiA8c2VjcmV0PiA8YnVja2V0Li4uPicsXG4gICAgJ1NldCBmaWxlYmFzZSBrZXkgYW5kIHNlY3JldC4gXCI5Q0E1MUNFRkY5RkY5OENCOTFDRlwiIFwiQ2dqWXVNdnMyTmRGR2JMUHlGRFNXRVNhTzA1bm9iUTltcDE2UFBEb1wiIFwiTXlTdG9yYWdlXCIgICcsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWRhcyAtLWRhcy1hcGktdXJsIDxkaWdpdGFsIGFzc2V0IGFwaSB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBkaWdpdGFsIGFzc2V0IGFwaSB1cmwuIFwiaHR0cHM6Ly8uLi5cIiwgaWYgeW91IHNldCBtb3JlIHRoYW4gb25lIHVybCwgcGxlYXNlIHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlJyxcbiAgKVxuICAub3B0aW9uKCctcyAtLXNob3cnLCAnU2hvdyB2YWx1ZSBjdXJyZW50IHNvbGFuYS1zdWl0ZS5qc29uJyk7XG5cbnByb2dyYW0ucGFyc2UoKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gYWN0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBleGVjQ2x1c2VyID0gKHR5cGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBsZXQgY29udmVydGVkVHlwZSA9ICcnO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdwcmQnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdtYWlubmV0LWJldGEnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZGV2JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnZGV2bmV0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xvY2FsaG9zdCc6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ2xvY2FsaG9zdC1kZXZuZXQnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm8gbWF0Y2ggcGFyYW1ldGVyOiBuZWVkIHBhcmFtZXRlciBpc1xcblwicHJkXCIsIFwiZGV2XCIsIFwibG9jYWxob3N0XCIsIGFueSBvbmUgb2YgdGhlbWAsXG4gICAgICApO1xuICB9XG4gIHVwZGF0ZUNsdXN0ZXJDb25maWdGaWxlKGNvbnZlcnRlZFR5cGUpO1xufTtcblxuY29uc3QgZXhlY0N1c3RvbUNsdXN0ZXIgPSAodXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBjb25zdCB2YWxpZGF0aW9uID0gKHU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiAvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7Lz86QCY9KyQsJSNdKy9nLnRlc3QodSk7XG4gIH07XG5cbiAgdXJsLmZvckVhY2goKGVsZW1lbnQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghdmFsaWRhdGlvbihlbGVtZW50KSkge1xuICAgICAgd2Fybk1lc3NhZ2UoXG4gICAgICAgIGBOb3QgZm91bmQgY3VzdG9tIGNsdXN0ZXIgdXJsOiAke2VsZW1lbnR9LiBlLmc6IGN1c3RvbSBodHRwczovLy4uLmAsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlQ2x1c3RlclVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNEZWJ1ZyA9IChib29sOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKGJvb2wgIT0gJ3RydWUnICYmIGJvb2wgIT0gJ2ZhbHNlJykge1xuICAgIHdhcm5NZXNzYWdlKFxuICAgICAgYE5vIG1hdGNoIHBhcmFtZXRlcjogbmVlZCBwYXJhbWV0ZXIgaXMgXCJ0cnVlXCIsIFwiZmFsc2VcIi4gYW55IG9uZSBvZiB0aGVtYCxcbiAgICApO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuICB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUoYm9vbCk7XG59O1xuXG5jb25zdCBleGVjRmlsZWJhc2UgPSAoZmlsZWJhc2U6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGlmIChmaWxlYmFzZS5sZW5ndGggPCAzKSB7XG4gICAgd2Fybk1lc3NhZ2UoJ05vdCBmb3VuZCBmaWxlYmFzZSBrZXkgb3Igc2VjcmV0Jyk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZUZpbGViYXNlQ29uZmlnRmlsZSh7XG4gICAga2V5OiBmaWxlYmFzZVswXSxcbiAgICBzZWNyZXQ6IGZpbGViYXNlWzFdLFxuICAgIGJ1Y2tldDogZmlsZWJhc2VbMl0sXG4gIH0pO1xufTtcblxuY29uc3QgZXhlY0Rhc0FwaVVybCA9ICh1cmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSAodTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIC9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTsvPzpAJj0rJCwlI10rL2cudGVzdCh1KTtcbiAgfTtcblxuICB1cmwuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF2YWxpZGF0aW9uKGVsZW1lbnQpKSB7XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vdCBmb3VuZCBEaWdpdGFsIGFzc2V0IGFwaSB1cmw6ICR7ZWxlbWVudH0uIGUuZzogaHR0cHM6Ly8uLi5gLFxuICAgICAgKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNTaG93ID0gKCk6IHZvaWQgPT4ge1xuICBzaG93Q3VycmVudENvbmZpZ0ZpbGUoKTtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBhcnNlIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3Qgb3B0aW9ucyA9IHByb2dyYW0ub3B0cygpO1xuaWYgKG9wdGlvbnMuY2x1c3Rlcikge1xuICBleGVjQ2x1c2VyKG9wdGlvbnMuY2x1c3Rlcik7XG59IGVsc2UgaWYgKG9wdGlvbnMuY3VzdG9tQ2x1c3Rlcikge1xuICBleGVjQ3VzdG9tQ2x1c3RlcihvcHRpb25zLmN1c3RvbUNsdXN0ZXIpO1xufSBlbHNlIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gIGV4ZWNEZWJ1ZyhvcHRpb25zLmRlYnVnKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5maWxlYmFzZSkge1xuICBjb25zb2xlLmxvZyhvcHRpb25zKTtcbiAgZXhlY0ZpbGViYXNlKG9wdGlvbnMuZmlsZWJhc2UpO1xufSBlbHNlIGlmIChvcHRpb25zLmRhc0FwaVVybCkge1xuICBleGVjRGFzQXBpVXJsKG9wdGlvbnMuZGFzQXBpVXJsKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5zaG93KSB7XG4gIGV4ZWNTaG93KCk7XG59IGVsc2Uge1xuICB3YXJuTWVzc2FnZSgnTm8gbWF0Y2ggcGFyYW1ldGVyJyk7XG59XG4iLCAiaW1wb3J0IHsgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maWcge1xuICBleHBvcnQgY29uc3QgSlNPTl9GSUxFX05BTUUgPSAnc29sYW5hLXN1aXRlLmpzb24nO1xuXG4gIC8qKlxuICAgKiBTZWFyY2ggIGZpbGUgcGF0aCBmb3Igc29sYW5hLXN1aXRlLmpzb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRpclxuICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHNlYXJjaENvbmZpZ0pzb24gPSAoZGlyOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGZpbGVzID0gcmVhZGRpclN5bmMoZGlyKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihkaXIsIGZpbGUpO1xuICAgICAgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0ZpbGUoKSAmJiBmaWxlID09PSBKU09OX0ZJTEVfTkFNRSkge1xuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHNlYXJjaENvbmZpZ0pzb24oZmlsZVBhdGgpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUVBLElBQUFBLGtCQUFtRTtBQUNuRSx1QkFBd0I7OztBQ0h4QixxQkFBc0M7QUFDdEMsdUJBQXFCO0FBRWQsSUFBVTtBQUFBLENBQVYsQ0FBVUMsWUFBVjtBQUNFLEVBQU1BLFFBQUEsaUJBQWlCO0FBT3ZCLEVBQU1BLFFBQUEsbUJBQW1CLENBQUMsUUFBb0M7QUFDbkUsVUFBTSxZQUFRLDRCQUFZLEdBQUc7QUFDN0IsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxlQUFXLHVCQUFLLEtBQUssSUFBSTtBQUMvQixjQUFJLHlCQUFTLFFBQVEsRUFBRSxPQUFPLEtBQUssU0FBU0EsUUFBQSxnQkFBZ0I7QUFDMUQsZUFBTztBQUFBLE1BQ1QsZUFBVyx5QkFBUyxRQUFRLEVBQUUsWUFBWSxHQUFHO0FBQzNDLGNBQU0sVUFBTUEsUUFBQSxrQkFBaUIsUUFBUTtBQUNyQyxZQUFJLEtBQUs7QUFDUCxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsR0F0QmU7OztBREdqQixJQUFNLFVBQVUsSUFBSSx5QkFBUTtBQVE1QixJQUFJO0FBQ0osSUFBSTtBQU1KLElBQU0sVUFBVTtBQUtoQixJQUFNLGlCQUFpQixNQUFNLFFBQVEsSUFBSSwrQkFBK0I7QUFDeEUsSUFBTSxjQUFjLENBQUMsU0FBaUIsUUFBUSxJ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QUssQ0FBQztBQUFBLEVBQ2hFO0FBRUEsTUFBSSxRQUFRLENBQUMsWUFBb0I7QUFDL0IsUUFBSSxDQUFDLFdBQVcsT0FBTyxHQUFHO0FBQ3hCO0FBQUEsUUFDRSxpQ0FBaUMsT0FBTztBQUFBLE1BQzFDO0FBQ0EsY0FBUSxLQUFLLENBQUM7QUFBQSxJQUNoQjtBQUFBLEVBQ0YsQ0FBQztBQUVELDZCQUEyQixHQUFHO0FBQ2hDO0FBRUEsSUFBTSxZQUFZLENBQUMsU0FBdUI7QUFDeEMsTUFBSSxRQUFRLFVBQVUsUUFBUSxTQUFTO0FBQ3JDO0FBQUEsTUFDRTtBQUFBLElBQ0Y7QUFDQSxZQUFRLEtBQUssQ0FBQztBQUFBLEVBQ2hCO0FBQ0Esd0JBQXNCLElBQUk7QUFDNUI7QUFFQSxJQUFNLGVBQWUsQ0FBQyxhQUE2QjtBQUNqRCxNQUFJLFNBQVMsU0FBUyxHQUFHO0FBQ3ZCLGdCQUFZLGtDQUFrQztBQUM5QyxZQUFRLEtBQUssQ0FBQztBQUFBLEVBQ2hCO0FBQ0EsMkJBQXlCO0FBQUEsSUFDdkIsS0FBSyxTQUFTLENBQUM7QUFBQSxJQUNmLFFBQVEsU0FBUyxDQUFDO0FBQUEsSUFDbEIsUUFBUSxTQUFTLENBQUM7QUFBQSxFQUNwQixDQUFDO0FBQ0g7QUFFQSxJQUFNLGdCQUFnQixDQUFDLFFBQXdCO0FBQzdDLFFBQU0sYUFBYSxDQUFDLE1BQWM7QUFDaEMsV0FBTyxpREFBaUQsS0FBSyxDQUFDO0FBQUEsRUFDaEU7QUFFQSxNQUFJLFFBQVEsQ0FBQyxZQUFvQjtBQUMvQixRQUFJLENBQUMsV0FBVyxPQUFPLEdBQUc7QUFDeEI7QUFBQSxRQUNFLG9DQUFvQyxPQUFPO0FBQUEsTUFDN0M7QUFDQSxjQUFRLEtBQUssQ0FBQztBQUFBLElBQ2hCO0FBQUEsRUFDRixDQUFDO0FBRUQsNEJBQTBCLEdBQUc7QUFDL0I7QUFFQSxJQUFNLFdBQVcsTUFBWTtBQUMzQix3QkFBc0I7QUFDeEI7QUFNQSxJQUFNLFVBQVUsUUFBUSxLQUFLO0FBQzdCLElBQUksUUFBUSxTQUFTO0FBQ25CLGFBQVcsUUFBUSxPQUFPO0FBQzVCLFdBQVcsUUFBUSxlQUFlO0FBQ2hDLG9CQUFrQixRQUFRLGFBQWE7QUFDekMsV0FBVyxRQUFRLE9BQU87QUFDeEIsWUFBVSxRQUFRLEtBQUs7QUFDekIsV0FBVyxRQUFRLFVBQVU7QUFDM0IsVUFBUSxJQUFJLE9BQU87QUFDbkIsZUFBYSxRQUFRLFFBQVE7QUFDL0IsV0FBVyxRQUFRLFdBQVc7QUFDNUIsZ0JBQWMsUUFBUSxTQUFTO0FBQ2pDLFdBQVcsUUFBUSxNQUFNO0FBQ3ZCLFdBQVM7QUFDWCxPQUFPO0FBQ0wsY0FBWSxvQkFBb0I7QUFDbEM7IiwKICAibmFtZXMiOiBbImltcG9ydF9ub2RlX2ZzIiwgIkNvbmZpZyJdCn0K