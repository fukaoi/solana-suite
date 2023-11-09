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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3JlZ3VsYXItbmZ0L2luZGV4LnRzIiwgIi4uL3NyYy9yZWd1bGFyLW5mdC9pbnB1dC50cyIsICIuLi9zcmMvcmVndWxhci1uZnQvY29tbW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tICcuL2lucHV0JztcbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vb3V0cHV0JztcbiIsICJpbXBvcnQgeyBQdWJrZXkgfSBmcm9tICcuLi9hY2NvdW50JztcbmltcG9ydCB7IEF0dHJpYnV0ZSwgUHJvcGVydGllcywgU3RvcmFnZVR5cGUgfSBmcm9tICcuLi9zdG9yYWdlJztcbmltcG9ydCB7IEZpbGVUeXBlIH0gZnJvbSAnLi4vc3RvcmFnZSc7XG5pbXBvcnQgeyBJbnRlcm5hbENvbGxlY3Rpb24sIEludGVybmFsQ3JlYXRvcnMgfSBmcm9tICcuLi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgYmlnbnVtLCBPcHRpb24sIFVzZXMsIElucHV0Q3JlYXRvcnMgfSBmcm9tICcuL2NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIElucHV0Q29sbGVjdGlvbiA9IFB1YmtleTtcbmV4cG9ydCB0eXBlIE9wdGlvbnMgPSB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfTtcblxuZXhwb3J0IHR5cGUgTWV0YXBsZXhEYXRhVjIgPSB7XG4gIG5hbWU6IHN0cmluZztcbiAgc3ltYm9sOiBzdHJpbmc7XG4gIHVyaTogc3RyaW5nO1xuICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyO1xuICBjcmVhdG9yczogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT47XG4gIGNvbGxlY3Rpb246IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+O1xuICB1c2VzOiBPcHRpb248VXNlcz47XG59O1xuZXhwb3J0IGVudW0gVG9rZW5TdGFuZGFyZCB7XG4gIE5vbkZ1bmdpYmxlID0gMCxcbiAgRnVuZ2libGVBc3NldCA9IDEsXG4gIEZ1bmdpYmxlID0gMixcbiAgTm9uRnVuZ2libGVFZGl0aW9uID0gMyxcbiAgUHJvZ3JhbW1hYmxlTm9uRnVuZ2libGUgPSA0LFxufVxuXG5leHBvcnQgdHlwZSBJbnB1dE5mdE1ldGFkYXRhID0ge1xuICBuYW1lOiBzdHJpbmc7XG4gIHN5bWJvbDogc3RyaW5nO1xuICByb3lhbHR5OiBudW1iZXI7XG4gIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZTtcbiAgZmlsZVBhdGg/OiBGaWxlVHlwZTtcbiAgdXJpPzogc3RyaW5nO1xuICBpc011dGFibGU/OiBib29sZWFuO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZXh0ZXJuYWxfdXJsPzogc3RyaW5nO1xuICBhdHRyaWJ1dGVzPzogQXR0cmlidXRlW107XG4gIHByb3BlcnRpZXM/OiBQcm9wZXJ0aWVzO1xuICBtYXhTdXBwbHk/OiBiaWdudW07XG4gIGNyZWF0b3JzPzogSW5wdXRDcmVhdG9yc1tdO1xuICB1c2VzPzogVXNlcztcbiAgY29sbGVjdGlvbj86IElucHV0Q29sbGVjdGlvbjtcbiAgb3B0aW9ucz86IE9wdGlvbnM7XG59O1xuIiwgImltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnLi4vYWNjb3VudCc7XG5pbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgdHlwZSBiaWdudW0gPSBudW1iZXIgfCBCTjtcblxuZXhwb3J0IHR5cGUgT3B0aW9uPFQ+ID0gVCB8IG51bGw7XG5cbmV4cG9ydCBlbnVtIFVzZU1ldGhvZCB7XG4gIEJ1cm4gPSAwLFxuICBNdWx0aXBsZSA9IDEsXG4gIFNpbmdsZSA9IDIsXG59XG5cbmV4cG9ydCB0eXBlIFVzZXMgPSB7XG4gIHVzZU1ldGhvZDogVXNlTWV0aG9kO1xuICByZW1haW5pbmc6IGJpZ251bTtcbiAgdG90YWw6IGJpZ251bTtcbn07XG5cbmV4cG9ydCB0eXBlIENyZWF0b3JzID0ge1xuICBhZGRyZXNzOiBQdWJrZXk7XG4gIHNoYXJlOiBudW1iZXI7XG4gIHZlcmlmaWVkOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgSW5wdXRDcmVhdG9ycyA9IHtcbiAgYWRkcmVzczogUHVia2V5O1xuICBzZWNyZXQ6IFNlY3JldDtcbiAgc2hhcmU6IG51bWJlcjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDa0JPLElBQUssZ0JBQUwsa0JBQUtBLG1CQUFMO0FBQ0wsRUFBQUEsOEJBQUEsaUJBQWMsS0FBZDtBQUNBLEVBQUFBLDhCQUFBLG1CQUFnQixLQUFoQjtBQUNBLEVBQUFBLDhCQUFBLGNBQVcsS0FBWDtBQUNBLEVBQUFBLDhCQUFBLHdCQUFxQixLQUFyQjtBQUNBLEVBQUFBLDhCQUFBLDZCQUEwQixLQUExQjtBQUxVLFNBQUFBO0FBQUEsR0FBQTs7O0FDWEwsSUFBSyxZQUFMLGtCQUFLQyxlQUFMO0FBQ0wsRUFBQUEsc0JBQUEsVUFBTyxLQUFQO0FBQ0EsRUFBQUEsc0JBQUEsY0FBVyxLQUFYO0FBQ0EsRUFBQUEsc0JBQUEsWUFBUyxLQUFUO0FBSFUsU0FBQUE7QUFBQSxHQUFBOyIsCiAgIm5hbWVzIjogWyJUb2tlblN0YW5kYXJkIiwgIlVzZU1ldGhvZCJdCn0K