import utils from "@ddbeck/bcd-utils";
import { FeatureOrGroup } from "./feature-or-group.js";
import summaryBool from "./summaries/booleans.js";
import summarySinceVersions from "./summaries/sinceVersions.js";
import summarySinceDates from "./summaries/sinceDates.js";

class Feature extends FeatureOrGroup {
  constructor(source, query, destDir) {
    super();
    console.error(
      `Initialized: Feature(<${query}>, ${JSON.stringify(destDir)})`
    );
    this.source = source;
    this.query = query;
    this.destination = `${destDir}/${source}/${query}.json`;
    this.compatData = utils.query(this.query);
  }

  resolve() {
    this.output = JSON.stringify(
      {
        source: this.source,
        query: this.query,
        supportSummaries: this.summarize(),
        compatData: this.compatData,
      },
      undefined,
      2
    );
  }

  summarize() {
    const summaries = {
      boolean: summaryBool.feature(this),
      sinceVersions: summarySinceVersions.feature(this),
      sinceDates: summarySinceDates.feature(this),
    };
    return summaries;
  }
}

export { Feature };
