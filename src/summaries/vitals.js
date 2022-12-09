import { defaultBrowsers } from "../defaults.js";
import { iterSupport } from "@ddbeck/bcd-utils";
import { isOpen } from "../statementUtils.js";

function group(group, browsers = defaultBrowsers) {
  const summary = {
    features: 0,
    supportedFeatures: 0,
    notes: 0,
    flags: 0,
    alternativeNames: 0,
  };

  for (const feature of group.features) {
    summary.features += 1;
    summary.supportedFeatures += feature.summarize().vitals.supportedFeatures;
    summary.notes += feature.summarize().vitals.notes;
    summary.flags += feature.summarize().vitals.flags;
    summary.alternativeNames += feature.summarize().vitals.alternativeNames;
  }

  return summary;
}

function feature(feature, browsers = defaultBrowsers) {
  const summary = {
    features: 1,
    supportedFeatures: 0,
    notes: 0,
    flags: 0,
    alternativeNames: 0,
  };

  for (const browser of browsers) {
    const statements = openSupportStatements(feature.compatData, browser);
    summary.notes += extractNotes(statements).length;
    summary.flags += countFlags(statements);
    summary.alternativeNames += countAlternativeNames(statements);
  }

  return summary;
}

function openSupportStatements(compatObject, browser) {
  return [...iterSupport(compatObject.__compat, browser)].filter(isOpen);
}

function extractNotes(statements) {
  return statements.filter((s) => "notes" in s).map((s) => s.notes);
}

function countFlags(statements) {
  return statements.filter((s) => "flags" in s).length;
}

function countAlternativeNames(statements) {
  return statements.filter((s) => "prefix" in s || "alternative_name" in s)
    .length;
}

export default { feature, group };
