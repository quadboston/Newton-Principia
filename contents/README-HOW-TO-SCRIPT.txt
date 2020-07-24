
Terms
=====

Essay is a scenario text. Each Book's lemma has multiple essays.

(Occasionally in app code, "essay" can meen set of all essays belonging to single lemma.
This is an artifact from the past.)



Essays structure
================

    In program, essay is called "fragment" ( of all-essays ), or "exegesis", or "exeg".

    Essays differ with their purpose: claim, proof, in-English, Model, ...

    Math-category of exeg is called "theorion". It can have values: claim, proof, ...
    Writing-category if exeg is called "aspect". It can have values: English, Latin, Model, ...

    Each essay is indexed with pair of categories: math-category/writing-category.
    For example, claim/English or proof/lite.

    In content script, exegs separated with characters:
        *::*
        <optional exeg header> 
        *..*
        <exegesis body>

    The <exegesis body> is comprised of activity-areas.
    Activity areas contain either activity-json or exeg's content.
    Exegs's content is comprised with topic-anchors, and content-text between them.

    Activity-json is indicated with "?" at the beginning.

        ¿       ( separates active areas )
        ¦       ( separates topic-anchors, this is not ASCII "|" char )
    
    The content-text is a mix of LaTeX text and HTML.
    Between HTML tags, there is an ordinary text which can have any characters except,
    obviously, LaTeX escape chars, except upper-level-exegs separators, and except
    ordinary HTML-special chars:
        &, >, < ( html specials ). However in plain text, &amp; &gt; &lt; can be used.

    The contributor can use any HTML tags.

    Example of activity-json:
        ...
        For the current figure, that ¦widthest-rectangular¦single rectangle¦¦ is on the
        ¿?
        {
            "left" : "left",
            "right" : "right"
        }
        ¿
        ...
    Active area is simply a JSON key/value text where effect of key must be defined in JavaScript code.

references.html,
    if provided, sets common footer for all exegs.





<optional exeg header>
======================
    sample
        *::*claim|xixcentury
        {
          "dataLegend":"0",
          "mediaBgImage" : null,
          "submodel" : "limit-definition",
          "default" : "0",
          "menuCaption" : "XIX Century"
        }
        *..*

        "mediaBgImage" : null,                  - loads empty image,
        "mediaBgImage" : 'my-bg-image.png',     - loads contents/.../img/my-bg-image.png,
        missed "mediaBgImage" :                 - loads common image,

        "submodel" : "limit-definition",        - loads this submodel for given essay,
        "default" : "1",                        - makes this essay default at site-landing,

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
    
     



