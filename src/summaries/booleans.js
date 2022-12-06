import { defaultBrowsers } from "../defaults.js";
import { hasOpenSupport } from "../supportUtils.js";

function group(group, browsers = defaultBrowsers) {
  const summary = {};

  for (const browser of browsers) {
    summary[browser] = !group.features
      .map((f) => f.summarize().boolean[browser])
      .includes(false);
  }

  return summary;
}

function feature(feature, browsers = defaultBrowsers) {
  const summary = {};

  for (const browser of browsers) {
    summary[browser] = hasOpenSupport(feature.compatData, browser);
  }

  return summary;
}

export default { feature, group };
