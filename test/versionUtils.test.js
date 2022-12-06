import { strict as assert } from "node:assert";

import { minimumVersion, NoSuchVersionError } from "../src/versionUtils.js";

describe("minimumVersion()", function () {
  it("throws if version is not one for that browser", function () {
    assert.throws(() => {
      minimumVersion(["-1"], "firefox");
    }, NoSuchVersionError);
    assert.throws(() => {
      minimumVersion(["14.9"], "safari");
    }, NoSuchVersionError);
    assert.throws(() => {
      minimumVersion(["100.1"], "chrome");
    }, NoSuchVersionError);
  });

  it("returns the lesser of more than one version number", function () {
    assert.equal(minimumVersion(["5", "100"], "firefox"), "5");
  });
});
