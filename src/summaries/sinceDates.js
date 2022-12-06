import { defaultBrowsers } from "../defaults.js";
import {
  earliestContinuouslySupportedVersion,
  hasOpenSupport,
} from "../supportUtils.js";
import { versionToDate } from "../versionUtils.js";

function group(group, browsers = defaultBrowsers) {
  const summary = {};

  for (const browser of browsers) {
    const dates = group.features.map((f) => f.summarize().sinceDates[browser]);
    if (dates.includes(false)) {
      summary[browser] = false;
    } else {
      // This is not the nicest way to do it but it works for now
      // TODO: Use actual date comparisons?
      summary[browser] = dates.sort().shift();
    }
  }

  return summary;
}

function feature(feature, browsers = defaultBrowsers) {
  const summary = {};

  for (const browser of browsers) {
    hasOpenSupport(feature.compatData, browser);
    const ver = earliestContinuouslySupportedVersion(
      feature.compatData,
      browser
    );
    summary[browser] = ver === false ? false : versionToDate(ver, browser);
  }

  return summary;
}

export default { feature, group };
