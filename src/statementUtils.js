function isOpen(statement) {
  // TODO: handle future versions
  // TODO: handle flags and prefs
  return wasAdded(statement) && !wasRemoved(statement);
}

function wasAdded(statement) {
  return ![false, null].includes(statement.version_added); // There's a true or version number for version added
}

function wasRemoved(statement) {
  return ![undefined, false, null].includes(statement.version_removed);
}

export { isOpen, wasAdded, wasRemoved };
