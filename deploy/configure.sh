#!/bin/bash -e

#configures defaults
PROJECT_PATH_FROM_THIS_SCRIPT="../index.src.html"
PHP_DEPLOYER="deployment-engine.php"


#gets mode
if [ "$#" = "1" ]; then
    UGLIFY="$1"
else
    UGLIFY=""
fi


#prepares
PHP_DEPLOYER_PATH_ABS="$PHP_DEPLOYER"
THIS_SCRIPT_FOLDER_REL=$(dirname "$0")
cd $THIS_SCRIPT_FOLDER_REL #---reposition---1---of---2
THIS_SCRIPT_PARENT_ABS=`pwd`
PROJECT_FILE_PATH_ABS="$THIS_SCRIPT_PARENT_ABS"/$PROJECT_PATH_FROM_THIS_SCRIPT


#:prepares node.js 
if [ "$UGLIFY" = "uglify" ] ; then
    #https://stackoverflow.com/questions/229551/string-contains-a-substring-in-bash
    #https://stackoverflow.com/questions/34419218/how-to-check-substring-in-bash
    if [[ "$PATH" == *"nodejs"* ]] ; then
        #printf "\n\nPATH is unchanged: PATH=$PATH\n"
        #printf "shell PATH variable is unchanged\n"
        printf "\n"
    else
        #https://unix.stackexchange.com/questions/14895/duplicate-entries-in-path-a-problem
        export PATH="/home/stan/Downloads/nodejs/node-v6.9.1-linux-x64/bin:$PATH"
        #printf "\nnew PATH=$PATH\n"
        #printf "nodejs added to the PATH\n"
    fi
fi


#:executes
cmd="php $PHP_DEPLOYER_PATH_ABS $PROJECT_FILE_PATH_ABS $UGLIFY"
eval $cmd #works but not without "node fix" for uglifying

read -p "..." -n1 -s #-n1 : one char; -s : no echo
printf "\n"



