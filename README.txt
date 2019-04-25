
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
    sapp - sub application ... assumingly there can be many lemmas then code for each lemma
            shold be loaded on demand ... 
            sapp stands for lemma2, lemma3, lemma4, ....

    this jargon is reflected in JavaScript object tree and folder structure


Vital for developer

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


Topic engine.

    Figure dom-elements are grouped by topics.

        For example, 
        topic "ABD" has svg curved area ABD, caption "legend-ABD", and data "number-ABD", and
        hyperlink in the text.

        which is supplied in configuartion file in line:
        ABD:{ id:['area-ABD', 'legend-ABD', 'number-ABD'], tfamily :'claim' },

    Topic members can be assigned a distinct color.

    Topics can be grouped into topic-family.
    For example, vanished areas and approaching points belong family: "claim".
    Topic-family can be assigned a color. For example, "claim" usually has color "green".
    Topic-color overrides family color.

    Spacing(??forgot what is this?) in lemmas
    is set in Newton-Principia/src/sub-app/lemma-2-3/data/topic-map.js

