#!/usr/bin/env node

import fs from "node:fs";
import yargs from "yargs";
import { Group } from "./group.js";

const { argv } = yargs(process.argv.slice(2))
  .command("$0 <definition> [destination]")
  .positional("destination", {
    default: "./results",
  });

main();

function main() {
  console.log(argv);

  const definition = JSON.parse(
    fs.readFileSync(argv.definition, { encoding: "utf-8" })
  );
  const group = new Group(definition, argv.destination);
  group.resolve();
  group.summarize();

  console.log();
  console.log(group.destination);
  console.log("-------");
  console.log(group.output);

  group.write();
}
