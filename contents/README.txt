Text commenting an entire lemma called an essay here.

    Essay is paritioned into claim or proof or other aspects like English or Latin.
    Each partition is called exegesis.
    In program code, exegesis is denoted simply as exeg.

    In other words, exegesis is indexed with pair (theorion,aspect):

        theorion: specific part of theorem: Claim, Proof, Theorem, neutral, ...
    and
        aspect:  Lite, English, Latin, ...

    exegs separated with characters:
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
    obviously, LaTeX escape chars, except upper-level-exegs separators and except
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
    Active area is simply a JSON key/value text where effect of key is defined in JavaScript code.

references.html,
    if provided, sets common footer for all exegs.


Topic-engine highlight links
============================

    Phrases labeled with construct

    ... and ¦upper-darboux¦sum¦¦ of Darboux ....

    will force the application to search for the topic "upper-darboux" for
    HTML or SVG element and enable mouse highlight when hovering "sum".

    When page is loaded, this construct is converted to HTML anchor.
    For this to work, the lemma must have topic-labels precoded.
    In JS code, these labels contained in CSS classes and prfixed with "tp-".

    Label can have multiple one-blank separated topics like:

    ¦mytopic-1 mytopc-2¦sum¦¦

    Topic must have CSS selector compatible characters and must not have
    underscores. Underscores are used internaly to convert upper-case letters to
    low case like "A" => "_a".

    An alternative way to enable topic-links is to manually code like
        in content:
            <a class="tl-mytopic" href="">my text</a>
        and in HTML (including JavaScript-controlled HTML):
            <circle class="tp-mytopic tofill tobold ... " ...

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






