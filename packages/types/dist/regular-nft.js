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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3JlZ3VsYXItbmZ0L2luZGV4LnRzIiwgIi4uL3NyYy9yZWd1bGFyLW5mdC9pbnB1dC50cyIsICIuLi9zcmMvcmVndWxhci1uZnQvY29tbW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2lucHV0JztcbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vb3V0cHV0JztcbiIsICJpbXBvcnQgeyBQdWJrZXkgfSBmcm9tICcuLi9hY2NvdW50JztcbmltcG9ydCB7IEF0dHJpYnV0ZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICcuLi9zdG9yYWdlJztcbmltcG9ydCB7IEZpbGVUeXBlIH0gZnJvbSAnLi4vc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzLCBJbnRlcm5hbENvbGxlY3Rpb24gfSBmcm9tICcuLi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgYmlnbnVtLCBDcmVhdG9ycywgT3B0aW9uLCBVc2VzIH0gZnJvbSAnLi9jb21tb24nO1xuXG5leHBvcnQgdHlwZSBJbnB1dENvbGxlY3Rpb24gPSBQdWJrZXk7XG5leHBvcnQgdHlwZSBPcHRpb25zID0geyBba2V5OiBzdHJpbmddOiB1bmtub3duIH07XG5cbmV4cG9ydCB0eXBlIE1ldGFwbGV4RGF0YVYyID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHN5bWJvbDogc3RyaW5nO1xuICB1cmk6IHN0cmluZztcbiAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcjtcbiAgY3JlYXRvcnM6IE9wdGlvbjxJbnRlcm5hbENyZWF0b3JzW10+O1xuICBjb2xsZWN0aW9uOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPjtcbiAgdXNlczogT3B0aW9uPFVzZXM+O1xufTtcbmV4cG9ydCBlbnVtIFRva2VuU3RhbmRhcmQge1xuICBOb25GdW5naWJsZSA9IDAsXG4gIEZ1bmdpYmxlQXNzZXQgPSAxLFxuICBGdW5naWJsZSA9IDIsXG4gIE5vbkZ1bmdpYmxlRWRpdGlvbiA9IDMsXG4gIFByb2dyYW1tYWJsZU5vbkZ1bmdpYmxlID0gNCxcbn1cblxuZXhwb3J0IHR5cGUgSW5wdXROZnRNZXRhZGF0YSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBzeW1ib2w6IHN0cmluZztcbiAgcm95YWx0eTogbnVtYmVyO1xuICBzdG9yYWdlVHlwZT86IFN0b3JhZ2VUeXBlO1xuICBmaWxlUGF0aD86IEZpbGVUeXBlO1xuICB1cmk/OiBzdHJpbmc7XG4gIGlzTXV0YWJsZT86IGJvb2xlYW47XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBleHRlcm5hbF91cmw/OiBzdHJpbmc7XG4gIGF0dHJpYnV0ZXM/OiBBdHRyaWJ1dGVbXTtcbiAgcHJvcGVydGllcz86IFByb3BlcnRpZXM7XG4gIG1heFN1cHBseT86IGJpZ251bTtcbiAgY3JlYXRvcnM/OiBDcmVhdG9yc1tdO1xuICB1c2VzPzogVXNlcztcbiAgY29sbGVjdGlvbj86IElucHV0Q29sbGVjdGlvbjtcbiAgb3B0aW9ucz86IE9wdGlvbnM7XG59O1xuXG5leHBvcnQgdHlwZSBJbnB1dFRva2VuTWV0YWRhdGEgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgc3ltYm9sOiBzdHJpbmc7XG4gIGZpbGVQYXRoPzogRmlsZVR5cGU7XG4gIHVyaT86IHN0cmluZztcbiAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIHJveWFsdHk/OiBudW1iZXI7XG4gIHVzZXM/OiBVc2VzO1xuICBjcmVhdG9ycz86IENyZWF0b3JzW107XG4gIGF0dHJpYnV0ZXM/OiBBdHRyaWJ1dGVbXTtcbiAgb3B0aW9ucz86IE9wdGlvbnM7XG59O1xuIiwgImltcG9ydCB7IFB1YmtleSB9IGZyb20gJy4uL2FjY291bnQnO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IHR5cGUgYmlnbnVtID0gbnVtYmVyIHwgQk47XG5cbmV4cG9ydCB0eXBlIE9wdGlvbjxUPiA9IFQgfCBudWxsO1xuXG5leHBvcnQgZW51bSBVc2VNZXRob2Qge1xuICBCdXJuID0gMCxcbiAgTXVsdGlwbGUgPSAxLFxuICBTaW5nbGUgPSAyLFxufVxuXG5leHBvcnQgdHlwZSBVc2VzID0ge1xuICB1c2VNZXRob2Q6IFVzZU1ldGhvZDtcbiAgcmVtYWluaW5nOiBiaWdudW07XG4gIHRvdGFsOiBiaWdudW07XG59O1xuXG5leHBvcnQgdHlwZSBDcmVhdG9ycyA9IHtcbiAgYWRkcmVzczogUHVia2V5O1xuICBzaGFyZTogbnVtYmVyO1xuICB2ZXJpZmllZDogYm9vbGVhbjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDa0JPLElBQUssZ0JBQUwsa0JBQUtBLG1CQUFMO0FBQ0wsRUFBQUEsOEJBQUEsaUJBQWMsS0FBZDtBQUNBLEVBQUFBLDhCQUFBLG1CQUFnQixLQUFoQjtBQUNBLEVBQUFBLDhCQUFBLGNBQVcsS0FBWDtBQUNBLEVBQUFBLDhCQUFBLHdCQUFxQixLQUFyQjtBQUNBLEVBQUFBLDhCQUFBLDZCQUEwQixLQUExQjtBQUxVLFNBQUFBO0FBQUEsR0FBQTs7O0FDWEwsSUFBSyxZQUFMLGtCQUFLQyxlQUFMO0FBQ0wsRUFBQUEsc0JBQUEsVUFBTyxLQUFQO0FBQ0EsRUFBQUEsc0JBQUEsY0FBVyxLQUFYO0FBQ0EsRUFBQUEsc0JBQUEsWUFBUyxLQUFUO0FBSFUsU0FBQUE7QUFBQSxHQUFBOyIsCiAgIm5hbWVzIjogWyJUb2tlblN0YW5kYXJkIiwgIlVzZU1ldGhvZCJdCn0K