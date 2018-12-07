
Jargon

    ns   - top node of name space = window.b$l

    fapp - full application - a shell for an entire book
    sapp - sub application ... assumingly there can be many lemmas then code for each lemma
            shold be loaded on demand ... 
            sapp stands for lemma2, lemma3, lemma4, ....

    this jargon is reflected in JavaScript object tree and folder structure

Data/Claim/Proof tab switch

    Before version 650, this tab was in one place in HTML.
    Since version 673, this tab transcludes its place when width shrinks to mobile-width
    (800px in ver 673).
        Transclusion introduces two complexities in code:
            1. JS has to detect change to mobile. This must be in synch with CSS-detection of
                change-to-mobile, which is "two masters on one spot" and requires extra code.
                (app/full-app/lib/mobile-tester.js)
            2. Transclusion happens not inside of one-type-of-html, but between two types
                In desktop, the switch-html is inside "text" area and on top of the text.
                In mobile, the switch-html is inside "media" area and between svg and
                digital-legend.
        Moveover, conceptually this switch mixes two different types of options:
            application-mode Claim/Proof with Area-legend which is media-presentation-view state.

        Note: the Claim/Proof menu was initially a part of top-application menu which
            controlled all state changes including English/Latin/Informal...
            Since adding the switch, the switch hides Claim/Proof menu which still exist
            as part of intial architecture. Because of this, there are actually two controls:
            swhitch and originall "master"Claim/Proof". There is an extra JS code exists which
            synchronizes these two "menus".

    Another possible variant is placing switch under main menu which does not need all the complexities of transclusion:
        For example: 
        http://landkey.net/z/bs/lemma9/demo/archive/660-tabs-above-the-content-variant/660.html?conf=lemma=9


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



