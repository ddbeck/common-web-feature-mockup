#!/usr/bin/env fish

set -l json_source_dirs query-results web-platform-features

for dir in $json_source_dirs
    for json in $dir/*.json
        set -l yaml (string join '/' (dirname $json) (basename $json .json).yaml)
        yq --prettyPrint $json >$yaml
        rg --passthrough --no-line-number --fixed-strings '$comment:' --replace '#' $yaml | sponge $yaml
    end
end
