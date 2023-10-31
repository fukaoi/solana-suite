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

// src/converter/index.ts
var converter_exports = {};
__export(converter_exports, {
  Common: () => Common,
  UserInput: () => UserInput
});
module.exports = __toCommonJS(converter_exports);

// src/converter/user/input.ts
var UserInput;
((UserInput2) => {
  let TokenStandard;
  ((TokenStandard2) => {
    TokenStandard2[TokenStandard2["NonFungible"] = 0] = "NonFungible";
    TokenStandard2[TokenStandard2["FungibleAsset"] = 1] = "FungibleAsset";
    TokenStandard2[TokenStandard2["Fungible"] = 2] = "Fungible";
    TokenStandard2[TokenStandard2["NonFungibleEdition"] = 3] = "NonFungibleEdition";
    TokenStandard2[TokenStandard2["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
  })(TokenStandard = UserInput2.TokenStandard || (UserInput2.TokenStandard = {}));
})(UserInput || (UserInput = {}));

// src/converter/common.ts
var Common;
((Common2) => {
  let UseMethod;
  ((UseMethod2) => {
    UseMethod2[UseMethod2["Burn"] = 0] = "Burn";
    UseMethod2[UseMethod2["Multiple"] = 1] = "Multiple";
    UseMethod2[UseMethod2["Single"] = 2] = "Single";
  })(UseMethod = Common2.UseMethod || (Common2.UseMethod = {}));
})(Common || (Common = {}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Common,
  UserInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2NvbnZlcnRlci9pbmRleC50cyIsICIuLi9zcmMvY29udmVydGVyL3VzZXIvaW5wdXQudHMiLCAiLi4vc3JjL2NvbnZlcnRlci9jb21tb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCAqIGZyb20gJy4vaW5mcmEnO1xuZXhwb3J0ICogZnJvbSAnLi91c2VyJztcbmV4cG9ydCAqIGZyb20gJy4vY29tbW9uJztcbiIsICJpbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4uLy4uL3N0b3JhZ2UnO1xuaW1wb3J0IHsgYmlnbnVtLCBDb21tb24gfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnLi4vLi4vYWNjb3VudCc7XG5pbXBvcnQgeyBGaWxlVHlwZSB9IGZyb20gJy4uLy4uL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFVzZXJJbnB1dCB7XG4gIGV4cG9ydCB0eXBlIENvbGxlY3Rpb24gPSBQdWJrZXk7XG5cbiAgZXhwb3J0IHR5cGUgQ3JlYXRvcnMgPSB7XG4gICAgYWRkcmVzczogUHVia2V5O1xuICAgIHNoYXJlOiBudW1iZXI7XG4gICAgdmVyaWZpZWQ6IGJvb2xlYW47XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgUHJvcGVydGllcyA9IENvbW1vbi5Qcm9wZXJ0aWVzO1xuXG4gIGV4cG9ydCBlbnVtIFRva2VuU3RhbmRhcmQge1xuICAgIE5vbkZ1bmdpYmxlID0gMCxcbiAgICBGdW5naWJsZUFzc2V0ID0gMSxcbiAgICBGdW5naWJsZSA9IDIsXG4gICAgTm9uRnVuZ2libGVFZGl0aW9uID0gMyxcbiAgICBQcm9ncmFtbWFibGVOb25GdW5naWJsZSA9IDQsXG4gIH1cblxuICBleHBvcnQgdHlwZSBOZnRNZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3ltYm9sOiBzdHJpbmc7XG4gICAgcm95YWx0eTogbnVtYmVyO1xuICAgIHN0b3JhZ2VUeXBlPzogU3RvcmFnZVR5cGU7XG4gICAgZmlsZVBhdGg/OiBGaWxlVHlwZTtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgaXNNdXRhYmxlPzogYm9vbGVhbjtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBleHRlcm5hbF91cmw/OiBzdHJpbmc7XG4gICAgYXR0cmlidXRlcz86IENvbW1vbi5BdHRyaWJ1dGVbXTtcbiAgICBwcm9wZXJ0aWVzPzogUHJvcGVydGllcztcbiAgICBtYXhTdXBwbHk/OiBiaWdudW07XG4gICAgY3JlYXRvcnM/OiBDcmVhdG9yc1tdO1xuICAgIHVzZXM/OiBDb21tb24uVXNlcztcbiAgICBjb2xsZWN0aW9uPzogQ29sbGVjdGlvbjtcbiAgICBvcHRpb25zPzogQ29tbW9uLk9wdGlvbnM7XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgVG9rZW5NZXRhZGF0YSA9IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc3ltYm9sOiBzdHJpbmc7XG4gICAgZmlsZVBhdGg/OiBGaWxlVHlwZTtcbiAgICB1cmk/OiBzdHJpbmc7XG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICByb3lhbHR5PzogbnVtYmVyO1xuICAgIHVzZXM/OiBDb21tb24uVXNlcztcbiAgICBjcmVhdG9ycz86IENyZWF0b3JzW107XG4gICAgYXR0cmlidXRlcz86IENvbW1vbi5BdHRyaWJ1dGVbXTtcbiAgICBvcHRpb25zPzogQ29tbW9uLk9wdGlvbnM7XG4gIH07XG59XG4iLCAiaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcbmltcG9ydCB7IEZpbGVUeXBlIH0gZnJvbSAnLi4vc3RvcmFnZSc7XG5cbmV4cG9ydCB0eXBlIE9wdGlvbjxUPiA9IFQgfCBudWxsO1xuZXhwb3J0IHR5cGUgYmlnbnVtID0gbnVtYmVyIHwgQk47XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tbW9uIHtcbiAgZXhwb3J0IHR5cGUgUHJvcGVydGllcyA9IHtcbiAgICBjcmVhdG9ycz86IHtcbiAgICAgIGFkZHJlc3M/OiBzdHJpbmc7XG4gICAgICBzaGFyZT86IG51bWJlcjtcbiAgICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XG4gICAgfVtdO1xuICAgIGZpbGVzPzoge1xuICAgICAgdHlwZT86IHN0cmluZztcbiAgICAgIGZpbGVQYXRoPzogRmlsZVR5cGU7XG4gICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH1bXTtcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGV4cG9ydCB0eXBlIEF0dHJpYnV0ZSA9IHtcbiAgICB0cmFpdF90eXBlPzogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XG4gIH07XG5cbiAgZXhwb3J0IGVudW0gVXNlTWV0aG9kIHtcbiAgICBCdXJuID0gMCxcbiAgICBNdWx0aXBsZSA9IDEsXG4gICAgU2luZ2xlID0gMixcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIFVzZXMgPSB7XG4gICAgdXNlTWV0aG9kOiBVc2VNZXRob2Q7XG4gICAgcmVtYWluaW5nOiBiaWdudW07XG4gICAgdG90YWw6IGJpZ251bTtcbiAgfTtcblxuICBleHBvcnQgdHlwZSBPcHRpb25zID0geyBba2V5OiBzdHJpbmddOiB1bmtub3duIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDS08sSUFBVTtBQUFBLENBQVYsQ0FBVUEsZUFBVjtBQVdFLE1BQUs7QUFBTCxJQUFLQyxtQkFBTDtBQUNMLElBQUFBLDhCQUFBLGlCQUFjLEtBQWQ7QUFDQSxJQUFBQSw4QkFBQSxtQkFBZ0IsS0FBaEI7QUFDQSxJQUFBQSw4QkFBQSxjQUFXLEtBQVg7QUFDQSxJQUFBQSw4QkFBQSx3QkFBcUIsS0FBckI7QUFDQSxJQUFBQSw4QkFBQSw2QkFBMEIsS0FBMUI7QUFBQSxLQUxVLGdCQUFBRCxXQUFBLGtCQUFBQSxXQUFBO0FBQUEsR0FYRzs7O0FDQ1YsSUFBVTtBQUFBLENBQVYsQ0FBVUUsWUFBVjtBQXFCRSxNQUFLO0FBQUwsSUFBS0MsZUFBTDtBQUNMLElBQUFBLHNCQUFBLFVBQU8sS0FBUDtBQUNBLElBQUFBLHNCQUFBLGNBQVcsS0FBWDtBQUNBLElBQUFBLHNCQUFBLFlBQVMsS0FBVDtBQUFBLEtBSFUsWUFBQUQsUUFBQSxjQUFBQSxRQUFBO0FBQUEsR0FyQkc7IiwKICAibmFtZXMiOiBbIlVzZXJJbnB1dCIsICJUb2tlblN0YW5kYXJkIiwgIkNvbW1vbiIsICJVc2VNZXRob2QiXQp9Cg==