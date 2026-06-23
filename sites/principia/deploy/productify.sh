#!/bin/bash -e

#must run from folder which is a parent of this file
#and abs path to this-script must have pattern:
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
  printf "\nThis shell script path must contain token /deploy/. But it is $THIS_SCRIPT_FOLDER_REL\n"
  exit 1
fi
#######################################
# \\// detects site-name
#######################################



#######################################
# //\\ assembles production folder
#######################################
cd ../../..
#now we are at FW (main) root

#in this synatax, no uglification will be done:
deploy/concat0uglify.sh $SITEID

#deploy/concatenate.sh $SITEID
#to uglify, do use:
# ... concat0uglify.sh $SITEID uglify

#this is FW (main) root
PACKAGE_ROOT=`pwd`
#JS concatenation does not do the move of texts,
#texts are in sites/.../content folder,
#this content is being moved by this statement:
deploy/move-to-prod-folder.php $PACKAGE_ROOT $SITEID
#######################################
# \\// assembles production folder
#######################################


