#!/bin/bash -e


#***********************************************************************
#API

#the only requirement: PWD must be positioned to this script root
PWD=`pwd`

SITEID="$1"
WEB_LANDING_PATH="$PWD/sites/$SITEID/index.html"
PHP_DEPLOYER="$PWD/deploy/site-deployment-engine.php"

#-----------------------------------------------------------------------
#sets uglification mode,
#if $1 is supplied and is "uglify", then uglification mode is set
if [ "$#" = "2" ]; then
    UGLIFY="$2"
else
    UGLIFY=""
fi
#printf "UGLIFY=\"$UGLIFY\""
#-----------------------------------------------------------------------
#***********************************************************************





#***********************************************************************
#prepares node.js to resolve a possible problem of missing nodejs lib
#in the path of invoked bash instance
#this "if" is ignored when nodejs is installed globally not in user's-home-folder
if [ "$UGLIFY" = "uglify" ] ; then
    printf "\nuglificating\n"
    #https://stackoverflow.com/questions/229551/string-contains-a-substring-in-bash
    #https://stackoverflow.com/questions/34419218/how-to-check-substring-in-bash
    if [[ "$PATH" == *"nodejs"* ]] ; then
        #////nodejs is found, do noting
        #printf "\n\nPATH is unchanged: PATH=$PATH\n"
        #printf "shell PATH variable is unchanged\n"
        printf "\n"
    else
        #this path must be set unique for your personal computer
        export PATH="/home/stan/Downloads/nodejs/node-v6.9.1-linux-x64/bin:$PATH"
        #https://unix.stackexchange.com/questions/14895/duplicate-entries-in-path-a-problem
        #printf "\nnew PATH=$PATH\n"
        #printf "nodejs added to the PATH\n"
    fi
fi
#***********************************************************************



#***********************************************************************
#:executes
cmd="php $PHP_DEPLOYER $WEB_LANDING_PATH $SITEID $UGLIFY"
eval $cmd #works but not without "node fix" for uglifying
#***********************************************************************



#***********************************************************************
read -p "done, press key ... " -n1 -s #-n1 : one char; -s : no echo
printf "\n\n"
#***********************************************************************



