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
var updateFilebaseConfigFile = (filebase) => {
  parsed["filebase"] = filebase;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbmZpZy1zY3JpcHQudHMiLCAiLi4vc3JjL3NlYXJjaC1jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIiMhL3Vzci9iaW4vZW52IG5vZGVcblxuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCBybWRpclN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJztcbmltcG9ydCB7IENvbW1hbmQgfSBmcm9tICdjb21tYW5kZXInO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9zZWFyY2gtY29uZmlnJztcblxuY29uc3QgcHJvZ3JhbSA9IG5ldyBDb21tYW5kKCk7XG5cbnR5cGUgRmlsZWJhc2UgPSB7XG4gIGtleTogc3RyaW5nO1xuICBzZWNyZXQ6IHN0cmluZztcbiAgYnVja2V0OiBzdHJpbmc7XG59O1xuXG5sZXQgY29uZmlnUGF0aDogc3RyaW5nO1xubGV0IHBhcnNlZDoge1xuICBjbHVzdGVyOiB7IHR5cGU6IHN0cmluZzsgY3VzdG9tQ2x1c3RlclVybDogc3RyaW5nW10gfTtcbiAgZGVidWdnaW5nOiBzdHJpbmc7XG4gIGZpbGViYXNlOiBGaWxlYmFzZTtcbiAgZGFzQXBpVXJsOiBzdHJpbmdbXTtcbn07XG5jb25zdCBWRVJTSU9OID0gJzAuNSc7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGxvY2FsIGZ1bmN0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY29uc3Qgc3VjY2Vzc01lc3NhZ2UgPSAoKSA9PiBjb25zb2xlLmxvZygnIyBVcGRhdGUgc29sYW5hIHN1aXRlIGNvbmZpZy4nKTtcbmNvbnN0IHNob3dNZXNzYWdlID0gKG1lc3M6IHN0cmluZykgPT4gY29uc29sZS5sb2coYCMgJHttZXNzfWApO1xuY29uc3Qgd2Fybk1lc3NhZ2UgPSAobWVzczogc3RyaW5nKSA9PiBjb25zb2xlLmVycm9yKGAjICR7bWVzc31gKTtcblxuKCgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXRoID0gQ29uZmlnLnNlYXJjaENvbmZpZ0pzb24oJy4vJyk7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICB0aHJvdyBFcnJvcihgTm90IGZvdW5kICR7Q29uZmlnLkpTT05fRklMRV9OQU1FfWApO1xuICAgIH1cbiAgICBjb25maWdQYXRoID0gcGF0aDtcbiAgICBzaG93TWVzc2FnZShgY29uZmlnIHBhdGg6ICR7Y29uZmlnUGF0aH1gKTtcbiAgICBwYXJzZWQgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhjb25maWdQYXRoKS50b1N0cmluZygpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHdhcm5NZXNzYWdlKGBFcnJvciBkb24ndCByZWFkIHNvbGFuYS1zdWl0ZS1jb25maWcuanNvbiwgJHtlLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxufSkoKTtcblxuY29uc3QgdXBkYXRlRGVidWdDb25maWdGaWxlID0gKGRlYnVnZ2luZzogc3RyaW5nKTogdm9pZCA9PiB7XG4gIHBhcnNlZFsnZGVidWdnaW5nJ10gPSBkZWJ1Z2dpbmc7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUNsdXN0ZXJDb25maWdGaWxlID0gKHR5cGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2NsdXN0ZXInXS50eXBlID0gdHlwZTtcbiAgd3JpdGVGaWxlU3luYyhjb25maWdQYXRoLCBKU09OLnN0cmluZ2lmeShwYXJzZWQpKTtcbiAgc3VjY2Vzc01lc3NhZ2UoKTtcbiAgY2xlYXJDYWNoZSgpO1xufTtcblxuY29uc3QgdXBkYXRlQ2x1c3RlclVybENvbmZpZ0ZpbGUgPSAoY3VzdG9tQ2x1c3RlclVybDogc3RyaW5nW10pOiB2b2lkID0+IHtcbiAgcGFyc2VkWydjbHVzdGVyJ10uY3VzdG9tQ2x1c3RlclVybCA9IGN1c3RvbUNsdXN0ZXJVcmw7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZUZpbGViYXNlQ29uZmlnRmlsZSA9IChmaWxlYmFzZTogRmlsZWJhc2UpOiB2b2lkID0+IHtcbiAgcGFyc2VkWydmaWxlYmFzZSddID0gZmlsZWJhc2U7XG4gIHdyaXRlRmlsZVN5bmMoY29uZmlnUGF0aCwgSlNPTi5zdHJpbmdpZnkocGFyc2VkKSk7XG4gIHN1Y2Nlc3NNZXNzYWdlKCk7XG4gIGNsZWFyQ2FjaGUoKTtcbn07XG5cbmNvbnN0IHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUgPSAoZGFzQXBpVXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBwYXJzZWRbJ2Rhc0FwaVVybCddID0gZGFzQXBpVXJsO1xuICB3cml0ZUZpbGVTeW5jKGNvbmZpZ1BhdGgsIEpTT04uc3RyaW5naWZ5KHBhcnNlZCkpO1xuICBzdWNjZXNzTWVzc2FnZSgpO1xuICBjbGVhckNhY2hlKCk7XG59O1xuXG5jb25zdCBzaG93Q3VycmVudENvbmZpZ0ZpbGUgPSAoKTogdm9pZCA9PiB7XG4gIGNvbnN0IGNqcyA9IHJlYWRGaWxlU3luYyhjb25maWdQYXRoKTtcbiAgc2hvd01lc3NhZ2UoYEN1cnJlbnQgdmFsdWVcXG4ke2Nqcy50b1N0cmluZygpfVxcbmApO1xufTtcblxuY29uc3QgY2xlYXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgZGlyID0gJy4uLy4uL25vZGVfbW9kdWxlcy8uY2FjaGUnO1xuICBpZiAoZGlyICE9PSB1bmRlZmluZWQgJiYgZXhpc3RzU3luYyhkaXIpKSB7XG4gICAgcm1kaXJTeW5jKGRpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgc2hvd01lc3NhZ2UoJ2NsZWFyIGNhY2hlJyk7XG4gIH1cbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnByb2dyYW1cbiAgLm5hbWUoJ3NvbGFuYS1zdWl0ZS1jb25maWcnKVxuICAuZGVzY3JpcHRpb24oYFNldHVwICR7Q29uZmlnLkpTT05fRklMRV9OQU1FfWApXG4gIC52ZXJzaW9uKFZFUlNJT04pO1xuXG5wcm9ncmFtXG4gIC5vcHRpb24oXG4gICAgJy1jIC0tY2x1c3RlciA8Y2x1c3RlciB0eXBlPicsXG4gICAgJ2Nvbm5lY3QgdG8gY2x1c3RlciB0eXBlLiBcInByZFwiLCBcImRldlwiLCBcImxvY2FsaG9zdFwiJyxcbiAgKVxuICAub3B0aW9uKFxuICAgICctY2MgLS1jdXN0b20tY2x1c3RlciA8Y2x1c3RlciB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBjbHVzdGVyIHVybC4gXCJodHRwczovLy4uLlwiLCBpZiB5b3Ugc2V0IG1vcmUgdGhhbiBvbmUgdXJsLCBwbGVhc2Ugc2VwYXJhdGUgdGhlbSB3aXRoIGEgc3BhY2UnLFxuICApXG4gIC5vcHRpb24oXG4gICAgJy1kIC0tZGVidWcgPHRydWUgb3IgZmFsc2U+JyxcbiAgICAnZGlzcGxheSBkZWJ1ZyBsb2cgb24gdGVybWluYWwuIGRlZmFsdXQgXCJmYWxzZVwiICcsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWYgLS1maWxlYmFzZSA8a2V5PiA8c2VjcmV0PiA8YnVja2V0Li4uPicsXG4gICAgJ1NldCBmaWxlYmFzZSBrZXkgYW5kIHNlY3JldC4gXCI5Q0E1MUNFRkY5RkY5OENCOTFDRlwiIFwiQ2dqWXVNdnMyTmRGR2JMUHlGRFNXRVNhTzA1bm9iUTltcDE2UFBEb1wiIFwiTXlTdG9yYWdlXCIgICcsXG4gIClcbiAgLm9wdGlvbihcbiAgICAnLWRhcyAtLWRhcy1hcGktdXJsIDxkaWdpdGFsIGFzc2V0IGFwaSB1cmwuLi4+JyxcbiAgICAnY29ubmVjdCB0byBkaWdpdGFsIGFzc2V0IGFwaSB1cmwuIFwiaHR0cHM6Ly8uLi5cIiwgaWYgeW91IHNldCBtb3JlIHRoYW4gb25lIHVybCwgcGxlYXNlIHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlJyxcbiAgKVxuICAub3B0aW9uKCctcyAtLXNob3cnLCAnU2hvdyB2YWx1ZSBjdXJyZW50IHNvbGFuYS1zdWl0ZS5qc29uJyk7XG5cbnByb2dyYW0ucGFyc2UoKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gYWN0aW9uc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBleGVjQ2x1c2VyID0gKHR5cGU6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBsZXQgY29udmVydGVkVHlwZSA9ICcnO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdwcmQnOlxuICAgICAgY29udmVydGVkVHlwZSA9ICdtYWlubmV0LWJldGEnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZGV2JzpcbiAgICAgIGNvbnZlcnRlZFR5cGUgPSAnZGV2bmV0JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xvY2FsaG9zdCc6XG4gICAgICBjb252ZXJ0ZWRUeXBlID0gJ2xvY2FsaG9zdC1kZXZuZXQnO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHdhcm5NZXNzYWdlKFxuICAgICAgICBgTm8gbWF0Y2ggcGFyYW1ldGVyOiBuZWVkIHBhcmFtZXRlciBpc1xcblwicHJkXCIsIFwiZGV2XCIsIFwibG9jYWxob3N0XCIsIGFueSBvbmUgb2YgdGhlbWAsXG4gICAgICApO1xuICB9XG4gIHVwZGF0ZUNsdXN0ZXJDb25maWdGaWxlKGNvbnZlcnRlZFR5cGUpO1xufTtcblxuY29uc3QgZXhlY0N1c3RvbUNsdXN0ZXIgPSAodXJsOiBzdHJpbmdbXSk6IHZvaWQgPT4ge1xuICBjb25zdCB2YWxpZGF0aW9uID0gKHU6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiAvaHR0cHM/OlxcL1xcL1stXy4hfipcXFxcKClhLXpBLVowLTk7Lz86QCY9KyQsJSNdKy9nLnRlc3QodSk7XG4gIH07XG5cbiAgdXJsLmZvckVhY2goKGVsZW1lbnQ6IHN0cmluZykgPT4ge1xuICAgIGlmICghdmFsaWRhdGlvbihlbGVtZW50KSkge1xuICAgICAgd2Fybk1lc3NhZ2UoXG4gICAgICAgIGBOb3QgZm91bmQgY3VzdG9tIGNsdXN0ZXIgdXJsOiAke2VsZW1lbnR9LiBlLmc6IGN1c3RvbSBodHRwczovLy4uLmAsXG4gICAgICApO1xuICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgIH1cbiAgfSk7XG5cbiAgdXBkYXRlQ2x1c3RlclVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNEZWJ1ZyA9IChib29sOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKGJvb2wgIT0gJ3RydWUnICYmIGJvb2wgIT0gJ2ZhbHNlJykge1xuICAgIHdhcm5NZXNzYWdlKFxuICAgICAgYE5vIG1hdGNoIHBhcmFtZXRlcjogbmVlZCBwYXJhbWV0ZXIgaXMgXCJ0cnVlXCIsIFwiZmFsc2VcIi4gYW55IG9uZSBvZiB0aGVtYCxcbiAgICApO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfVxuICB1cGRhdGVEZWJ1Z0NvbmZpZ0ZpbGUoYm9vbCk7XG59O1xuXG5jb25zdCBleGVjRmlsZWJhc2UgPSAoZmlsZWJhc2U6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGlmIChmaWxlYmFzZS5sZW5ndGggPCAzKSB7XG4gICAgd2Fybk1lc3NhZ2UoJ05vdCBmb3VuZCBmaWxlYmFzZSBrZXkgb3Igc2VjcmV0Jyk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuICB9XG4gIHVwZGF0ZUZpbGViYXNlQ29uZmlnRmlsZSh7XG4gICAga2V5OiBmaWxlYmFzZVswXSxcbiAgICBzZWNyZXQ6IGZpbGViYXNlWzFdLFxuICAgIGJ1Y2tldDogZmlsZWJhc2VbMl0sXG4gIH0pO1xufTtcblxuY29uc3QgZXhlY0Rhc0FwaVVybCA9ICh1cmw6IHN0cmluZ1tdKTogdm9pZCA9PiB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSAodTogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIC9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTsvPzpAJj0rJCwlI10rL2cudGVzdCh1KTtcbiAgfTtcblxuICB1cmwuZm9yRWFjaCgoZWxlbWVudDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF2YWxpZGF0aW9uKGVsZW1lbnQpKSB7XG4gICAgICB3YXJuTWVzc2FnZShcbiAgICAgICAgYE5vdCBmb3VuZCBEaWdpdGFsIGFzc2V0IGFwaSB1cmw6ICR7ZWxlbWVudH0uIGUuZzogaHR0cHM6Ly8uLi5gLFxuICAgICAgKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9XG4gIH0pO1xuXG4gIHVwZGF0ZURhc0FwaVVybENvbmZpZ0ZpbGUodXJsKTtcbn07XG5cbmNvbnN0IGV4ZWNTaG93ID0gKCk6IHZvaWQgPT4ge1xuICBzaG93Q3VycmVudENvbmZpZ0ZpbGUoKTtcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBhcnNlIG9wdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3Qgb3B0aW9ucyA9IHByb2dyYW0ub3B0cygpO1xuaWYgKG9wdGlvbnMuY2x1c3Rlcikge1xuICBleGVjQ2x1c2VyKG9wdGlvbnMuY2x1c3Rlcik7XG59IGVsc2UgaWYgKG9wdGlvbnMuY3VzdG9tQ2x1c3Rlcikge1xuICBleGVjQ3VzdG9tQ2x1c3RlcihvcHRpb25zLmN1c3RvbUNsdXN0ZXIpO1xufSBlbHNlIGlmIChvcHRpb25zLmRlYnVnKSB7XG4gIGV4ZWNEZWJ1ZyhvcHRpb25zLmRlYnVnKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5maWxlYmFzZSkge1xuICBjb25zb2xlLmxvZyhvcHRpb25zKTtcbiAgZXhlY0ZpbGViYXNlKG9wdGlvbnMuZmlsZWJhc2UpO1xufSBlbHNlIGlmIChvcHRpb25zLmRhc0FwaVVybCkge1xuICBleGVjRGFzQXBpVXJsKG9wdGlvbnMuZGFzQXBpVXJsKTtcbn0gZWxzZSBpZiAob3B0aW9ucy5zaG93KSB7XG4gIGV4ZWNTaG93KCk7XG59IGVsc2Uge1xuICB3YXJuTWVzc2FnZSgnTm8gbWF0Y2ggcGFyYW1ldGVyJyk7XG59XG4iLCAiaW1wb3J0IHsgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAnbm9kZTpwYXRoJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25maWcge1xuICBleHBvcnQgY29uc3QgSlNPTl9GSUxFX05BTUUgPSAnc29sYW5hLXN1aXRlLmpzb24nO1xuXG4gIC8qKlxuICAgKiBTZWFyY2ggIGZpbGUgcGF0aCBmb3Igc29sYW5hLXN1aXRlLmpzb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRpclxuICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfVxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHNlYXJjaENvbmZpZ0pzb24gPSAoZGlyOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICAgIGNvbnN0IGZpbGVzID0gcmVhZGRpclN5bmMoZGlyKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gam9pbihkaXIsIGZpbGUpO1xuICAgICAgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0ZpbGUoKSAmJiBmaWxlID09PSBKU09OX0ZJTEVfTkFNRSkge1xuICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRTeW5jKGZpbGVQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IHNlYXJjaENvbmZpZ0pzb24oZmlsZVBhdGgpO1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBRUEsU0FBUyxZQUFZLGNBQWMsV0FBVyxxQkFBcUI7QUFDbkUsU0FBUyxlQUFlOzs7QUNIeEIsU0FBUyxhQUFhLGdCQUFnQjtBQUN0QyxTQUFTLFlBQVk7QUFFZCxJQUFVO0FBQUEsQ0FBVixDQUFVQSxZQUFWO0FBQ0UsRUFBTUEsUUFBQSxpQkFBaUI7QUFPdkIsRUFBTUEsUUFBQSxtQkFBbUIsQ0FBQyxRQUFvQztBQUNuRSxVQUFNLFFBQVEsWUFBWSxHQUFHO0FBQzdCLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLFlBQU0sV0FBVyxLQUFLLEtBQUssSUFBSTtBQUMvQixVQUFJLFNBQVMsUUFBUSxFQUFFLE9BQU8sS0FBSyxTQUFTQSxRQUFBLGdCQUFnQjtBQUMxRCxlQUFPO0FBQUEsTUFDVCxXQUFXLFNBQVMsUUFBUSxFQUFFLFlBQVksR0FBRztBQUMzQyxjQUFNLFVBQU1BLFFBQUEsa0JBQWlCLFFBQVE7QUFDckMsWUFBSSxLQUFLO0FBQ1AsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEdBdEJlOzs7QURHakIsSUFBTSxVQUFVLElBQUksUUFBUTtBQVE1QixJQUFJO0FBQ0osSUFBSTtBQU1KLElBQU0sVUFBVTtBQUtoQixJQUFNLGlCQUFpQixNQUFNLFFBQVEsSUFBSSwrQkFBK0I7QUFDeEUsSUFB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