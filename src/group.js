import { Feature } from "./feature.js";
import { FeatureOrGroup } from "./feature-or-group.js";
import summaryBooleans from "./summaries/booleans.js";
import summarySinceVersions from "./summaries/sinceVersions.js";
import summarySinceDates from "./summaries/sinceDates.js";

class Group extends FeatureOrGroup {
  constructor(definition, destinationDirectory) {
    super();
    console.error(
      `Initialized: Group(<${definition.identifier}>, ${JSON.stringify(
        destinationDirectory
      )})`
    );
    this.source = "@ddbeck/common-web-feature-mockup";
    this.definition = definition;
    this.destination = `${destinationDirectory}/${definition.identifier}.json`;
    this.features = this.definition.constituentFeatures.map(
      (cf) => new Feature(cf.source, cf.query, destinationDirectory)
    );
    this.query = this.definition.identifier;
  }

  resolve() {
    for (const feature of this.features) {
      feature.resolve();
      feature.summarize();
      feature.write();
    }
    this.output = JSON.stringify(
      {
        source: this.source,
        query: this.query,
        supportSummaries: this.summarize(),
      },
      undefined,
      2
    );
  }

  summarize() {
    const summaries = {
      booleans: summaryBooleans.group(this),
      sinceVersions: summarySinceVersions.group(this),
      sinceDates: summarySinceDates.group(this),
    };
    return summaries;
  }
}

export { Group };
