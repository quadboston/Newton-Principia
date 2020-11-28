( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var ss     = ns.sn('ss', fapp);
    var ssD    = ns.sn('ssData',ss);



    ssD.bookReferences =
    {
        ////no unescaped special chars between backticks `...`
        ////no unescaped $, "\", ...

        latin : `
            <span style="font-size:10px;">
                <br><br>
                Source:
                <br>
                <a href="https://www.e-rara.ch/zut/wihibe/content/structure/338026"
                     target="_blank">
                     3rd Edition: https://www.e-rara.ch/zut/wihibe/content/structure/338026
                     License: public domain.
                </a>
            </span>
        `,

        Donahue : `
            <br>
            <div style="font-size:10px;">
                Source: <br>
                William H Donahue cited <br>
                in the book "Newton Principia. The Central Argument." <br>
                by Dana Densmore. Published by Green Lion Press 2003, 2010. <br>
                We did not find year and name for book by William H Donahue.
            </div>

        `,

        'Motte-3rd' : `
            <br>
            The Mathematical Principles of
            Natural Philosophy, by Sir Isaac Newton;<br>
            Translated into English by Andrew Motte.<br>
            First American Edition, Carefully Revised and corrected. New York. Published By Daniel
            Adee, 45 Liberty Street.<br>
            Year is possibly 1846.<br><br>
        `,

        'Bernard-Cohen' : `
        Source:
        <br>
        <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z" target="_blank">
            3rd Edition English translation by I. Bernard Cohen.
        </a>
        <br>
        `,


        'Latin-diagram' : `
        Source:
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102"  target="_blank">
            Diagram. Latin, 3rd Edition.
        </a>
        `,

        'IanBruce' : `
        Source:
        <br>
        Isaac NEWTON: Philosophiae Naturalis Principia Mathematica. 3rd Ed.<br>
        Translated and annotated by Ian Bruce<br>
        <a href="http://www.17centurymaths.com/contents/newtoncontents.html">
        http://www.17centurymaths.com/contents/newtoncontents.html</a>
        <br>
        `,


        'kvk' : `
            <br><span style="font-size:9px">This addendum is written by
            <a href="http://landkey.org/Sandbox/z/82b-visualiz/scenarios/intro/full-stack/" target="_blank">Konstantin Kirillov</a>.</span><br>
        `,


    }

}) ();

