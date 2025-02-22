Contributor Guidelines

Note: The examples here use the git cli for clarity and consistency, 
but you can also perform these actions using the VSCode GUI.

1. Clone master branch to your local workspace
    git clone https://github.com/quadboston/Newton-Principia

2. Create a new branch for your assigned task 
    git fetch origin
    git checkout master
    git checkout -b new-branch-name
    git push -u origin new-branch-name

3. Stage all changes and commit to your new branch
    git add .
    git commit -m "Meaningful commit message"
    git push origin your-branch-name

4. Before creating a pull request, fetch and merge any changes from master and resolve conflicts before committing
    git fetch origin 
    git merge origin/master
    git commit -m "Merging changes from master"

5. When your changes are ready for review, push changes to GitHub create a pull request
    git push origin your-branch-name

    In GitHub, switch to your branch and click "Compare and pull request" button. Ensure base branch is master.
    Include a descriptive title and detailed description of changes, then click "Create pull request" button.



Deployment.

    usage:

        #this does concatenatenation;
        #   assembles all JS and CSS files into two files to be run from index.prod.html
        #   creates index.prod.html
        cd deploy
        ./concatenate.sh

        #this does what ./concatenate.sh does with additional minification of js-code
        cd deploy
        ./uglify.sh

    dependency: PHP and uglifyjs (uglify-es)
    how to set up: see comments at top of file deployment-engine.php
        1. briefly:
            //https://www.npmjs.com/package/uglify-es
            //npm install uglify-es -g
        2. shell and php codes are simple, glance at them for
           guidance how and what to do

    zipup.sh is not a deployer( see its header), it is an additional tool to develop
        between commits to git


Jargon

    ns   - top node of name space = window.b$l

    fapp - full application - a shell for an entire book
    sapp - sub application ... assuming there can be many lemmas then code for each lemma
            should be loaded on demand ... 
            sapp stands for lemma2, lemma3, lemma4, ....

    this jargon is reflected in JavaScript object tree and folder structure


Vital for developer

    * some svg/html elements may have ".hidden" css class; if they are a part
    of tp-mytopic engine, then to unlock .hidden state when tp-link is hovered,
    the token, "tohidden" must be supplied to this element.


    Related vital topic is "Content essay syntax" in README-MATHJAX-WRITING.txt.

    get-content-texts.js and topic-engine.js convert essay-script to HTML/JavaScript
    From browser viewpoint, essay-script is an HTML text.

    essay-script has following nest of scripts
        1. toppest one is a set of esseyions
        2. esseion contains
                instruction-line
                header
                    header has some meta info which in particular defines GUI menu
                body
        3. body is a set of active-fragments
        4. active-fragment contains one or more prescripts
        5. prescript contains topic-marks which must be parsed to HTML
        6. resulted HTML may have MathJax and has to be parsed into HTML

Running project from local PC.

    It should not run from folder on local PC with file://...
    protocol in Chrome. And should not in other browser ...
    Apparently because of "cross-domain" permissions.
    You may try MS Edge though or FireFox, they were known less restrictive.

    This is because, this application loads texts and MathJax via ajax.
    The proper way is to install server. The good one is Apache.

    On Windows, after installation, there should be a folder like:

    c:/Apache24/htdocs/

    where one can put np (Newton-Principia) folder.
    Then land on
    localhost/np/index.src.html

    IIS should work too, but it feels as less convenient.


