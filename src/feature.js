import utils from "@ddbeck/bcd-utils";
import path from "node:path";

class Feature {
  constructor(source, query, destDir) {
    this.source = source;
    this.query = query;
    this.destination = `${destDir}/${source}/${query}.json`;
  }

  _prepareDestination() {
    fs.mkdirSync(path.dirname(this.destination), { recursive: true });
    if (fs.existsSync(this.destination)) {
      fs.unlink(this.destination);
    }
  }

  resolve() {
    if (this.source === "bcd") {
      this.data = utils.query(this.query);
    }
    this.output = JSON.stringify(
      {
        source: this.source,
        query: this.query,
        supportSummaries: "TODO",
      },
      undefined,
      2
    );
  }

  write() {
    if (this.output == undefined) {
      throw Error("Unresolved data!");
    }
    this._prepareDestination();
    fs.writeFileSync(this.destination, this.output, { encoding: "utf-8" });
  }

  summarize() {
    // TODO: do something with this.data
  }
}

export { Feature };
