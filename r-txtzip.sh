#!/bin/bash -e
#************************************************
# the same as zipup.sh but excludes imgages,
# see description in zipup.sh,
#************************************************

p=$( readlink -f -- "$0"; )
root=$(dirname "$p")
b=$(basename $root)
cd $root
cd ..

cmd="$b/deploy/zipify.php $b nogit skipsall";
eval $cmd
