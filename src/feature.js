import utils from "@ddbeck/bcd-utils";
import { FeatureOrGroup } from "./feature-or-group.js";
import summaries from "./summaries/index.js";

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
    const s = {};

    for (const [summaryName, summary] of Object.entries(summaries)) {
      s[summaryName] = summary.feature(this);
    }

    return s;
  }
}

export { Feature };
