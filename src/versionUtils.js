import { iterReleases, query } from "@ddbeck/bcd-utils";

class NoSuchVersionError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoSuchVersionError";
  }
}

function versionCompareFunction(a, b, browser) {
  const releases = [...iterReleases(query(`browsers.${browser}`).releases)];
  const aIndex = releases.findIndex((release) => release.version === a);
  const bIndex = releases.findIndex((release) => release.version === b);
  return aIndex - bIndex;
}

function versionsByReleaseOrder(versions, browser) {
  return [...versions].sort((a, b) => versionCompareFunction(a, b, browser));
}

function minimumVersion(versions, browser) {
  return versionsByReleaseOrder(versions, browser).shift();
}

function maximumVersion(versions, browser) {
  return versionsByReleaseOrder(versions, browser).pop();
}

function versionToDate(version, browser) {
  return query(`browsers.${browser}`).releases[version].release_date;
}

export { maximumVersion, minimumVersion, NoSuchVersionError, versionToDate };
