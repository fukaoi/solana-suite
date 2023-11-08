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

// src/regular-nft/index.ts
var regular_nft_exports = {};
__export(regular_nft_exports, {
  TokenStandard: () => TokenStandard,
  UseMethod: () => UseMethod
});
module.exports = __toCommonJS(regular_nft_exports);

// src/regular-nft/input.ts
var TokenStandard = /* @__PURE__ */ ((TokenStandard2) => {
  TokenStandard2[TokenStandard2["NonFungible"] = 0] = "NonFungible";
  TokenStandard2[TokenStandard2["FungibleAsset"] = 1] = "FungibleAsset";
  TokenStandard2[TokenStandard2["Fungible"] = 2] = "Fungible";
  TokenStandard2[TokenStandard2["NonFungibleEdition"] = 3] = "NonFungibleEdition";
  TokenStandard2[TokenStandard2["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
  return TokenStandard2;
})(TokenStandard || {});

// src/regular-nft/common.ts
var UseMethod = /* @__PURE__ */ ((UseMethod2) => {
  UseMethod2[UseMethod2["Burn"] = 0] = "Burn";
  UseMethod2[UseMethod2["Multiple"] = 1] = "Multiple";
  UseMethod2[UseMethod2["Single"] = 2] = "Single";
  return UseMethod2;
})(UseMethod || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TokenStandard,
  UseMethod
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3JlZ3VsYXItbmZ0L2luZGV4LnRzIiwgIi4uL3NyYy9yZWd1bGFyLW5mdC9pbnB1dC50cyIsICIuLi9zcmMvcmVndWxhci1uZnQvY29tbW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2lucHV0JztcbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vb3V0cHV0JztcbiIsICJpbXBvcnQgeyBQdWJrZXkgfSBmcm9tICcuLi9hY2NvdW50JztcbmltcG9ydCB7IEF0dHJpYnV0ZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICcuLi9zdG9yYWdlJztcbmltcG9ydCB7IEZpbGVUeXBlIH0gZnJvbSAnLi4vc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnRlcm5hbENvbGxlY3Rpb24sIEludGVybmFsQ3JlYXRvcnMgfSBmcm9tICcuLi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgYmlnbnVtLCBDcmVhdG9ycywgT3B0aW9uLCBVc2VzIH0gZnJvbSAnLi9jb21tb24nO1xuXG5leHBvcnQgdHlwZSBJbnB1dENvbGxlY3Rpb24gPSBQdWJrZXk7XG5leHBvcnQgdHlwZSBPcHRpb25zID0geyBba2V5OiBzdHJpbmddOiB1bmtub3duIH07XG5cbmV4cG9ydCB0eXBlIE1ldGFwbGV4RGF0YVYyID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHN5bWJvbDogc3RyaW5nO1xuICB1cmk6IHN0cmluZztcbiAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcjtcbiAgY3JlYXRvcnM6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+O1xuICBjb2xsZWN0aW9uOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPjtcbiAgdXNlczogT3B0aW9uPFVzZXM+O1xufTtcbmV4cG9ydCBlbnVtIFRva2VuU3RhbmRhcmQge1xuICBOb25GdW5naWJsZSA9IDAsXG4gIEZ1bmdpYmxlQXNzZXQgPSAxLFxuICBGdW5naWJsZSA9IDIsXG4gIE5vbkZ1bmdpYmxlRWRpdGlvbiA9IDMsXG4gIFByb2dyYW1tYWJsZU5vbkZ1bmdpYmxlID0gNCxcbn1cblxuZXhwb3J0IHR5cGUgSW5wdXROZnRNZXRhZGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBzeW1ib2w6IHN0cmluZztcbiAgcm95YWx0eTogbnVtYmVyO1xuICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGU7XG4gIGZpbGVQYXRoPzogRmlsZVR5cGU7XG4gIHVyaT86IHN0cmluZztcbiAgaXNNdXRhYmxlPzogYm9vbGVhbjtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGV4dGVybmFsX3VybD86IHN0cmluZztcbiAgYXR0cmlidXRlcz86IEF0dHJpYnV0ZVtdO1xuICBwcm9wZXJ0aWVzPzogUHJvcGVydGllcztcbiAgbWF4U3VwcGx5PzogYmlnbnVtO1xuICBjcmVhdG9ycz86IENyZWF0b3JzW107XG4gIHVzZXM/OiBVc2VzO1xuICBjb2xsZWN0aW9uPzogSW5wdXRDb2xsZWN0aW9uO1xuICBvcHRpb25zPzogT3B0aW9ucztcbn07XG4iLCAiaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnLi4vYWNjb3VudCc7XG5pbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgdHlwZSBiaWdudW0gPSBudW1iZXIgfCBCTjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uPFQ+ID0gVCB8IG51bGw7XG5cbmV4cG9ydCBlbnVtIFVzZU1ldGhvZCB7XG4gIEJ1cm4gPSAwLFxuICBNdWx0aXBsZSA9IDEsXG4gIFNpbmdsZSA9IDIsXG59XG5cbmV4cG9ydCB0eXBlIFVzZXMgPSB7XG4gIHVzZU1ldGhvZDogVXNlTWV0aG9kO1xuICByZW1haW5pbmc6IGJpZ251bTtcbiAgdG90YWw6IGJpZ251bTtcbn07XG5cbmV4cG9ydCB0eXBlIENyZWF0b3JzID0ge1xuICBhZGRyZXNzOiBQdWJrZXk7XG4gIHNoYXJlOiBudW1iZXI7XG4gIHZlcmlmaWVkOiBib29sZWFuO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNrQk8sSUFBSyxnQkFBTCxrQkFBS0EsbUJBQUw7QUFDTCxFQUFBQSw4QkFBQSxpQkFBYyxLQUFkO0FBQ0EsRUFBQUEsOEJBQUEsbUJBQWdCLEtBQWhCO0FBQ0EsRUFBQUEsOEJBQUEsY0FBVyxLQUFYO0FBQ0EsRUFBQUEsOEJBQUEsd0JBQXFCLEtBQXJCO0FBQ0EsRUFBQUEsOEJBQUEsNkJBQTBCLEtBQTFCO0FBTFUsU0FBQUE7QUFBQSxHQUFBOzs7QUNYTCxJQUFLLFlBQUwsa0JBQUtDLGVBQUw7QUFDTCxFQUFBQSxzQkFBQSxVQUFPLEtBQVA7QUFDQSxFQUFBQSxzQkFBQSxjQUFXLEtBQVg7QUFDQSxFQUFBQSxzQkFBQSxZQUFTLEtBQVQ7QUFIVSxTQUFBQTtBQUFBLEdBQUE7IiwKICAibmFtZXMiOiBbIlRva2VuU3RhbmRhcmQiLCAiVXNlTWV0aG9kIl0KfQo=