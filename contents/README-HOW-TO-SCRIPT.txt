
Handy help
==========

example: makes self-reference in content-script
<a target="_blank" href="?conf=sappId=addd-prel-curveXX,theorionId=proof,aspectId=curve,subessayId=areas#scholium">



Authoring own content
=====================

Contributor can modify or add own lemmmas. To add own-lemma, contributor must add a folder

ver/contents folder/own-lemma

and in file ver/contents/content-list.js

add an entry like
        {   sappId : 'b1sec1lemma11',
            book : 'Book 1',
            caption : 'Sec. I. Lemma XI',
            annotation : "",
        },

The simplest way to add own lemma is to copy/paste existging simple lemma,
(as of today 'b1sec1lemma11') and modify its name, code, and contents.

Throughout, lemma's commenting-text is called "essay".



Essays structure
================

    Essays are classified with their role in logic: claim, proof, corollary, ...
    These categories are called called "theorions" and are arranged horizontally
    in essay menu.

    Any other classification categories called "aspects". They are arranged vertically
    in essay menu. For example: English, Latin, Addendum, ...

    Hence, each essay is indexed with pair aspect/theoreon categories.
    For example, claim/English or proof/lite.

    (The semantic "theorion" and "aspect" is insignificant, the only hard-coded part
     is a GUI structure with two menus: vertical and horizontal.)

    In essay-script, essays are separated with characters:
        *::*
        <optional exeg header> 
        *..*
        <exegesis body>

    with these two elements described below.


<exegesis body>
===============
    There is one more level of complexity in essay structure due the application feature
    that allows to change essay text when application-model state changes.
    Specifically, model-states are indexed with special words, "state-keys".
    Consequently, the essay is split to fragments and each fragment is mapped to
    a "state-key". At single moment only fragment which is mapped to active application
    state is visible. Other fragment are hidden.

    Hence, these essay fragments are called "active-fragments" in program code.

    In essay-script, active fragments are represented as JSON text with object-properties
    equal to state-keys.

    In essay-script, activity areas are separated with character "¿".

    If activity-area begins with character "?", then it is "activity-json which
    is writtne in JSON format.
    If no character "?" is present at the beginning of activity-area, then
    it active fragmen is a plain text.

    Next level of essay structure is presence of topic-anchors and
    content-text between them.

    Character "¦" separates topic-anchors. THIS IS NOT an ASCII "|" char.
    
    The content-text is a mix of LaTeX text and HTML.
    Between HTML tags, there is an ordinary text which can have any characters except,
    obviously, LaTeX escape chars, except upper-level-exegs separators, and except
    ordinary HTML-special chars:
        &, >, < ( html specials ). However in plain text, &amp; &gt; &lt; can be used.

    The contributor can use any HTML tags.




More details if active-fragment implementation is of interest.
==============================================================
    Example of activity-json:
        ...
        For the current figure, that ¦widthest-rectangular¦single rectangle¦¦ is on the
        ¿?
        {
            "left" : "fragment body 1",
            "right" : "fragment body 2"
        }
        ¿
        ...
    Active area is simply a JSON key/value text where effect of key must be defined in JavaScript code.
        The key 'static' is reserved ( for non-JSON content ).
    For above example, the active area in final text in running program has class like:
    "active-right exeg-frag".
    Example in app source code: frags-2-dom8topiccss-core.js::builtFrags_2_dom8mj()
        //-------------------------------------------------------
        // //\\ sets css-machinery for reverse-action
        //      ===from-media---to---text
        //-------------------------------------------------------
        bFrag.dom$.cls( 'active-'+fid + ' exeg-frag');
        activeFrags_styles += `
            .${cssp}-text-widget.active-${fid} .active-${fid} {
                display : inline;
            }
        `;
        //-------------------------------------------------------
        // \\// sets css-machinery for reverse-action
        //-------------------------------------------------------
        So, when app sets a class "flag" .${cssp}-text-widget.active-${fid} to
        essay, then active fragment with fid becomes visible.
        Like this:
            in gui-update.js::calculate8paintCurve_8_paintAxes()
                sDomN.essaionsRoot$.removeClass( 'active-left' );
                sDomN.essaionsRoot$.addClass( 'active-right' );


references.html,
    if provided, sets common footer for all exegs.







<optional exeg header> 
======================
this contains another JSON, not a JSON for active fragments
    sample
    ------
        *::*claim|xixcentury
        {
          "dataLegend":"0",
          "mediaBgImage" : null,
          "submodel" : "limit-definition",

          "adding-any-new-key-to-this-JSON-does-not-affect-other-key-pairs-functionality. Like adding this key." : "This keypair is just a comment",

          "default" : "0",
          "menuCaption" : "XIX Century"
        }
        *..*



    description of above JSON
    -------------------------    
        "default" : "1",                        - makes this essay default at site-landing,
        "mediaBgImage" : null,                  - loads empty image,
        "mediaBgImage" : 'my-bg-image.png',     - loads contents/.../img/my-bg-image.png,
        missed "mediaBgImage" :                 - loads common image,

        "submodel" : "limit-definition",        - loads this submodel for given essay,

        "studylab" : true                       - makes this essay hidden if "lab" is not on
                                                  note: incompatible with "default",




Topics. (Topic-engine highlight links.)
=======================================


Topics are declared in essay-header or in essay-body.
In essay-header, they are declared ( a bit confusingly ) with keyword:
    fixed-colors
aka
    // fixed-colors are in [R,G,B,OPTIONAL_OPACITY_FOR_NONHIGHLIGHTED_MODE] format,
    // LITE and SATURATION parameters (implied from fixed-colors) are ignored.
    "fixed-colors" :
    {
        "kepler-triangle" : [0,   0, 100],
        "force"           : [255, 0, 0,1],




I. Essay-body topics.

    Phrases labeled with construct

    ¦upper-darboux¦sum¦¦

    will force the application to search for the topic "upper-darboux" for
    HTML or SVG element and enable mouse highlight when hovering "sum".

    For example, in text: " ... and ¦upper-darboux¦sum¦¦ of Darboux .... ".

    When page is loaded, this construct is converted to HTML anchor.
    For this to work, the lemma must have topic-labels precoded.
    In JS code, these labels contained in CSS classes and prfixed with "tp-".

    Label can have multiple one-blank separated topics like:

    ¦mytopic-1 mytopc-2¦sum¦¦

    Topic must have CSS selector compatible characters. Topic can use upper case letters, but
    they are internally converted to low case like "A" => "_a". Therefore be careful about
    using underscores in topic name or don't use underscores at all.

    ¦mytopic-1 mytopc-2¦sum¦¦
    ¦mytopic-1 mytopc-2¦sum¦¦¦ - same as above but forces topic into MathJax sibling-html-element
    ¦mytopic-1 mytopc-2¦sum¦¦¦¦ - same as above but forces topic into all MathJax sibling-html-elements

    If lemma is already coded and new content needs adding topics, then an
    easy way to find list available topics is to run the following command in Chrome console:

window.tpItems = ''; document.querySelectorAll('*').forEach( q => {
if( typeof q.className !== 'string' ) return; var match = q.className.match( /(tp-\S*)/ ); if( match ) { window.tpItems += '\n' + match[1] } }); console.log( window.tpItems );

    This gives the result like:

        tp-circumscribed
        tp-circumscribed-rectangles
        tp-circumscribed-rectangles
        tp-circumscribed-rectangles

    Striping "tp-" gives available topics.

II. Topic color precedence.

    Topic colors take precedence over colors declared for graphic-elements in JS-code.

    However, if graphic-element has no topic-link-in-scenario to ownself, then
    graphic-element will use own-color defined in JS-code.
    (This is a sort of surprise which may be fixed later.)

    Topic colors declared in essay-header take precedence over dynamically-generated
    colors for topics declared in essay-body links.
    
    Topic colors declared in essay-header can be used in JS-code for graphic-elements which
    don't have to be a part of any topic.

III. Topic grouping.

    a. Assigning the same topic in JS-code to multiple graphic elements whill higlight
       all of them when topic is referenced in scenario-topic-link.
    
       All of them are highlighted with the same color.

    b. Compounding multiple topics in single scenario-topic-link will highlight all
       graphic-elements of these topics, and each group of lements will use own color.
    
     



