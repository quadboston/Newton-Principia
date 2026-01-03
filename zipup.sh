#!/bin/bash -e

#**************************************************
# advances version and zips up the root folder
# more details are in deploy/zipify-except-git.php
# in brief: the resulted zip-archive will be
# a sibling of project-root-folder
#
# the reason for this tool is that
# sometimes two groups of files must be backed up
#
#   1. non-versioned files
#   2. non-committed and non-scheduled changes
#
#**************************************************

p=$( readlink -f -- "$0"; )
root=$(dirname "$p")
b=$(basename $root)
cd $root
cd ..

cmd="$b/deploy/zipify.php $b";
eval $cmd
