#!/usr/bin/env node

import fs from "node:fs";
import yargs from "yargs";
import { Feature } from "./feature.js";

const { argv } = yargs(process.argv.slice(2))
  .command("$0 <definition> [destination]")
  .positional("destination", {
    default: "./results",
  });

main();

function getDefinition(path) {
  return;
}

function main() {
  console.log(argv);

  const definition = JSON.parse(
    fs.readFileSync(argv.definition, { encoding: "utf-8" })
  );
  const { constituentFeatures } = definition;

  const features = constituentFeatures.map(
    (cf) => new Feature(cf.source, cf.query, argv.destination)
  );

  for (const f of features) {
    f.resolve();

    console.log();
    console.log(f.destination);
    console.log("-------");
    console.log(f.output);

    f.write();
  }
}
