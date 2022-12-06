import fs from "node:fs";
import path from "node:path";

class FeatureOrGroup {
  write() {
    if (this.output == undefined) {
      throw Error("Unresolved data!");
    }

    fs.mkdirSync(path.dirname(this.destination), { recursive: true });
    if (fs.existsSync(this.destination)) {
      fs.unlinkSync(this.destination);
    }

    fs.writeFileSync(this.destination, this.output, { encoding: "utf-8" });
    console.error(`Wrote: ${this.destination}`);
  }
}

export { FeatureOrGroup };
