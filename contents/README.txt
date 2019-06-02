Essay syntax.

    Essay is a collection of essaions. Semantically, each essaion dedicated to specific aspect
    of the Book and mathematical phase of expression. The phase can be theorem or claim.
    In other words, essaion is indexed with pair (theorion,aspect):

        theorion: specific part of theorem: Claim, Proof, Theorem, neutral, ...
    and
        aspect:  Lite, English, Latin, ...

    Essaions separated with characters:
        *::*
        <optional essaion header> 
        *..*
        <essaion body>

    The <essaion body> is further separated to activity-areas:

        ¿       ( separates active areas )
        ¦       ( separates topics, this is not ASCII "|" char )
    
    The remaining text is a mix of LaTeX text and HTML.
    Between HTML tags, there is an ordinary text which can have any characters except,
    obviously, LaTeX escape chars, except upper-level-essaions separators and except
    ordinary HTML-special chars:
        &, >, < ( html specials ). However in plain text, &amp; &gt; &lt; can be used.

    The contributor can use any HTML tags.

Active areas have content which depends on essaion index, depends on pair (theorion,aspect).
    For example:
        For the current figure, that ¦widthest-rectangular¦single rectangle¦¦ is on the
        ¿?
        {
            "default" : "left",
            "highest y is on the right" : "right"
        }
        ¿
    Active area is simply a JSON key/value text where effect of key is defined in JavaScript code.

references.html,
    if provided, sets common footer for all essaions.


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
    and in JavaScript:
        <circle class="tp-mytopic tofill tobold ... " ...

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






