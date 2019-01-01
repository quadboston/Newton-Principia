
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

Data/Claim/Proof tab switch

    It seems designed unreasonably complex.
    It is a switch between lemma-content-mode: claim or proof. For desktop,
    the data-legend does not exist there and is always on.
    But, depending on the web-device-screen, data-legend is added to the switch for mobiles.
    Because of this complexity, the switch is constructed not as a decent CSS-view, but as JavaScript code.
    This make the view defining the content and not the content normally defining a view.

    Moreover, this tabe belongs to different parts of content: in mobile it is in mobile view and between
    the model and data-legend, in desktop, it is in text pane and not a part of model pane.
    This is also would be hard to accomplish by CSS and html, so the html-transclusion is used by means of
    JavaScript.

    Normally, the switch or menu should not be a part of content view, but somewere aside, for example, on top
    or on sides.

    Moreover, the Claim/Proof menu was initially a part of top-application menu which
    controlled all state changes including English/Latin/Informal...
    Since adding the switch, the switch hides Claim/Proof menu which still exist
    as part of intial architecture. Because of this, there are actually two controls:
    swhitch and originall "master"Claim/Proof". There is an extra JS code exists which
    synchronizes these two "menus".

    (
        Before version 650, this switch was in one place in HTML.
        Since version 673, this tab transcludes its place when width shrinks to mobile-width
        (800px in ver 673).
        Transclusion introduces two complexities in code:
            1. JS has to detect change-to-mobile. This must be in synch with CSS-detection of
                change-to-mobile, which is "a second masters on one spot" and requires extra code
                to sinch two masters: (app/full-app/lib/mobile-tester.js)
            2. Transclusion happens not inside of one-type-of-html, but between two types
                In desktop, the switch-html is inside "text" area and on top of the text.
                In mobile, the switch-html is inside "media" area and between svg and
                digital-legend.

        Another possible variant is placing switch under main menu which does not need all the complexities of transclusion:
            For example: 
            http://landkey.net/z/bs/lemma9/demo/archive/660-tabs-above-the-content-variant/660.html?conf=lemma=9
    )

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

    Spacing in lemmas is set in Newton-Principia/src/sub-app/lemma-2-3/data/topic-map.js

