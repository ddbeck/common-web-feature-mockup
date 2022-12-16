import { strict as assert } from "node:assert";

import {
  hasFlags,
  isOpen,
  wasAdded,
  wasRemoved,
} from "../src/statementUtils.js";

describe("wasAdded()", function () {
  it("return true for added with version number", function () {
    assert.ok(wasAdded({ version_added: "100" }));
  });

  it("return true for added with boolean", function () {
    assert.ok(wasAdded({ version_added: true }));
  });

  it("return false for not added", function () {
    assert.ok(!wasAdded({ version_added: false }));
  });

  it("return false for unknown version_added", function () {
    assert.ok(!wasAdded({ version_added: null }));
  });
});

describe("wasRemoved()", function () {
  it("return true for removed with version number", function () {
    assert.ok(wasRemoved({ version_added: "100", version_removed: "200" }));
  });

  it("return true for removed with boolean", function () {
    assert.ok(wasRemoved({ version_added: "100", version_removed: true }));
  });

  it("return false removal false", function () {
    assert.ok(!wasRemoved({ version_added: "100", version_removed: false }));
  });

  it("return false removal unknown", function () {
    assert.ok(!wasRemoved({ version_added: "100", version_removed: null }));
  });

  it("return false removal undefined", function () {
    assert.ok(!wasRemoved({ version_added: "100" }));
  });
});

describe("hasFlags()", function () {
  const flaggedStatement = {
    version_added: "123",
    flags: [
      {
        type: "preference",
        name: "some.preference.in.firefox",
        value_to_set: "true",
      },
    ],
  };

  const unflaggedStatement = { version_added: "123" };

  it("returns true for flags", function () {
    assert.ok(hasFlags(flaggedStatement));
  });

  it("return false for no flags", function () {
    assert.ok(!hasFlags(unflaggedStatement));
  });
});

describe("isOpen()", function () {
  it("return true for open support statements", function () {
    assert.ok(isOpen({ version_added: "123" }));
    assert.ok(isOpen({ version_added: true }));
  });

  it("return false for closed support statements", function () {
    assert.ok(!isOpen({ version_added: false }));
    assert.ok(!isOpen({ version_added: "100", version_removed: "200" }));
    assert.ok(!isOpen({ version_added: "100", version_removed: true }));
  });

  it("return false for unknown support statements", function () {
    assert.ok(!isOpen({ version_added: null }));
  });
});
