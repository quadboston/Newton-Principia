#!/bin/bash -e


#must run in folder which is a parent of this file
#and path to this-script must have pattern:
#".../site-name/deploy/this-script"


#######################################
# //\\ detects site-name
#######################################
#test: PWD="/bingo/deploy"
PWD=`pwd`

#https://stackoverflow.com/questions/3532718/extract-string-from-string-using-regex-in-the-terminal
if [[ $PWD =~ \/([^\/]*)\/deploy ]]; then
  SITEID="${BASH_REMATCH[1]}"  
else
  exit 1
fi
#######################################
# \\// detects site-name
#######################################





cd ../../..
PACKAGE_ROOT=`pwd`
deploy/extract-site.php $PACKAGE_ROOT $SITEID

