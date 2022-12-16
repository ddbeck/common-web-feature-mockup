import { strict as assert } from "node:assert";

import { minimumVersion } from "../src/versionUtils.js";

describe("minimumVersion()", function () {
  it("returns the lesser of more than one version number", function () {
    assert.equal(minimumVersion(["5", "100"], "firefox"), "5");
  });
});
