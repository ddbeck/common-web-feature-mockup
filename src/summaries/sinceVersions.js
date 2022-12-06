import { minimumVersion } from "../versionUtils.js";
import { earliestContinuouslySupportedVersion } from "../supportUtils.js";
import { defaultBrowsers } from "../defaults.js";

function group(group, browsers = defaultBrowsers) {
  const summary = {};

  for (const browser of browsers) {
    const versions = group.features.map(
      (f) => f.summarize().sinceVersions[browser]
    );

    summary[browser] = versions.includes(false)
      ? false
      : minimumVersion(versions, browser);
  }

  return summary;
}

function feature(feature, browsers = defaultBrowsers) {
  const summary = {};

  for (const browser of browsers) {
    summary[browser] = earliestContinuouslySupportedVersion(
      feature.compatData,
      browser
    );
  }

  return summary;
}

export default { feature, group };
