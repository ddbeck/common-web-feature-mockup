import { iterReleases, query } from "@ddbeck/bcd-utils";

class NoSuchVersionError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoSuchVersionError";
  }
}

function minimumVersion(versions, browser) {
  const releases = [...iterReleases(query(`browsers.${browser}`).releases)];
  let index = Infinity;

  for (const version of versions) {
    const idx = releases.findIndex((release) => release.version === version);

    if (idx === -1) {
      throw new NoSuchVersionError(`${browser} version ${version} not found!`);
    }

    index = idx < index ? idx : index;
  }

  return releases[index].version;
}

function versionToDate(version, browser) {
  return query(`browsers.${browser}`).releases[version].release_date;
}

export { minimumVersion, NoSuchVersionError, versionToDate };
