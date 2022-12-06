import { iterSupport } from "@ddbeck/bcd-utils";
import { isOpen } from "./statementUtils.js";
import { minimumVersion } from "./versionUtils.js";

function earliestContinuouslySupportedVersion(compatObject, browser) {
  const openStatementVersions = [];

  for (const statement of iterSupport(compatObject.__compat, browser)) {
    if (isOpen(statement)) {
      openStatementVersions.push(statement.version_added);
    }
  }

  if (openStatementVersions.length > 0) {
    return minimumVersion(openStatementVersions, browser);
  }
  return false;
}

function hasOpenSupport(compatObject, browser) {
  for (const statement of iterSupport(compatObject.__compat, browser)) {
    if (isOpen(statement)) {
      return true;
    }
  }

  return false;
}

export { hasOpenSupport, earliestContinuouslySupportedVersion };
