import { Feature } from "./feature.js";
import { FeatureOrGroup } from "./feature-or-group.js";
import summaries from "./summaries/index.js";
import fs from "node:fs";
import path from "node:path";

class Group extends FeatureOrGroup {
  constructor(filePath, destinationDirectory) {
    super();
    this.filePath = filePath;
    const definition = JSON.parse(
      fs.readFileSync(filePath, { encoding: "utf-8" })
    );
    console.error(
      `Initialized: Group(<${definition.identifier}>, ${JSON.stringify(
        destinationDirectory
      )})`
    );
    this.source = "@ddbeck/common-web-feature-mockup";
    this.definition = definition;
    this.destination = path.join(
      destinationDirectory,
      `${definition.identifier}.json`
    );
    this.features = this.definition.constituentFeatures.map((cf) => {
      console.log(cf);
      if (cf.source === "ddbeck/common-web-feature-mockup") {
        const group = path.join(
          path.dirname(this.filePath),
          `${cf.query}.json`
        );
        console.log(group);
        return new Group(group, destinationDirectory);
      }
      return new Feature(cf.source, cf.query, destinationDirectory);
    });
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
    const s = {};

    for (const [summaryName, summary] of Object.entries(summaries)) {
      s[summaryName] = summary.group(this);
    }

    return s;
  }
}

export { Group };
