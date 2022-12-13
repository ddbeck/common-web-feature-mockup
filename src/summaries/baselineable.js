import { defaultBrowsers } from "../defaults.js";
import {
  earliestContinuouslySupportedVersion,
  hasOpenSupport,
} from "../supportUtils.js";
import { versionToDate } from "../versionUtils.js";

function and(a, b) {
  return a && b;
}

function group(group, browsers = defaultBrowsers) {
  const baselineable = group.features
    .map((f) => f.summarize().baselineable.baselineable)
    .reduce(and, true);
  let baselineableSince = false;

  if (baselineable) {
    baselineableSince = group.features
      .map((f) => f.summarize().baselineable.baselineableSince)
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
      .pop();
  }

  const offBaseline = group.features
    .filter((f) => !f.summarize().baselineable.baselineable)
    .map((f) => `<${f.query}>`);

  return {
    baselineable,
    baselineableSince,
    offBaseline,
  };
}

function feature(feature, browsers = defaultBrowsers) {
  const baselineable = browsers
    .map((browser) => hasOpenSupport(feature.compatData, browser))
    .reduce(and, true);

  let baselineableSince = false;

  if (baselineable) {
    const baselineReleases = browsers.map((browser) => {
      const version = earliestContinuouslySupportedVersion(
        feature.compatData,
        browser
      );
      const releaseDate = versionToDate(version, browser);
      return {
        browser,
        version,
        releaseDate,
      };
    });

    baselineableSince = baselineReleases
      .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
      .pop();
  }

  return { baselineable, baselineableSince };
}

export default { feature, group };
