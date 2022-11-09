# Common web platform feature representation mockup (WIP)

This is a mock up of a way of defining web platform features based on support in different browsers. It has lots of missing pieces, including tools, an output format, and much more besides. This is meant to illustrate some ideas in a Google Doc; don't rely on it for anything at this point.

To learn more about this project, examine two key areas:

## Feature group authoring

- Read `web-platform-features/array.json`, `web-platform-features/array.2022.json`, `web-platform-features/array-grouping.json`, and `web-platform-features/array-relative-indexing.json` to see one possible future for how feature groups may relate to each other.

- Read `web-platform-features/temporal.json` to see some of the challenges and quirks of tracking _future_ feature groups.

- Read `web-platform-features/consensus-web-2023.json` to see how this approach might be used to version the entire web platform.

- Read `base.schema.json` to see how we might enforce the format of group files.

## Constructing data from these groups

- Read `query-results/bcd/javascript.builtins.Array*.json` to see how we might query and summarize data found in external data sources, such as [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data).

- Read `query-results/array*.json` to learn how we might combine data from multiple queries together, in the group output.
