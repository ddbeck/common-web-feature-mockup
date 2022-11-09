#!/usr/bin/env fish

begin
    command -q yq
    and command -q sponge
    and command -q rg
    and command -q splarf
end
or begin
    echo -e "Sorry, this script is not very portable. You need:\n - yq\n - rg (ripgrep)\n - sponge\nto run this script."
    exit 1
end

set -l json_source_dirs query-results web-platform-features

for dir in $json_source_dirs
    for json in $dir/*.json
        set -l yaml (string join '/' (dirname $json) (basename $json .json).yaml)
        yq --prettyPrint $json >$yaml
        rg --passthrough --no-line-number --fixed-strings '$comment:' --replace '#' $yaml | sponge $yaml
    end
end
