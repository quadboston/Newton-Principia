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
                <br>
                <i>Source</i>: <br>
                <a href="https://www.e-rara.ch/zut/wihibe/content/structure/338026"
                     target="_blank">
                     3rd Edition: https://www.e-rara.ch/zut/wihibe/content/structure/338026
                     License: public domain.
                </a>
        `,
        'latin---inline-style' : `
            font-size: 11px;
        `,

        Donahue : `
                <br>
                <i>Source</i>: <br>
                William H Donahue cited <br>
                in the book "Newton Principia. The Central Argument." <br>
                by Dana Densmore. Published by Green Lion Press 2003, 2010. <br>
                We did not find year and name for book by William H Donahue.
        `,
        'Donahue---inline-style' : `
            font-size: 11px;
        `,


        'Motte-3rd' : `
            <br>
            <i>Source</i>:<br>
            The Mathematical Principles of
            Natural Philosophy, by Sir Isaac Newton;<br>
            Translated into English by Andrew Motte.<br>
            First American Edition, Carefully Revised and corrected. New York. Published By Daniel
            Adee, 45 Liberty Street.<br>
            Year is possibly 1846.<br>
        `,
        'Motte-3rd---inline-style' : `
            font-size: 11px;
        `,



        'Bernard-Cohen-Anne-Whitman' : `
            <br>
            <div style="font-size:12px;">
                <i>Source:</i><br>
                <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z" target="_blank">
                NEWTON, THE <i>PRINCIPIA</i><br>
                <i>Mathematical Principles of Natural Philosophy</i><br>
                A New Translation<br>
                I. Bernard Cohen and Anne Whitman<br>
                </a>
            </div>
            `,


        'Bernard-Cohen-Anne-Whitman-without-Guide' : `
            <br><br>
            <div style="font-size:12px;">
                <i>Source:</i><br><br>
                ISAAC NEWTON, THE PRINCIPIA
                        <br>
                Mathematical Principles of Natural Philosophy
                <br>
                Authoritative Translation
                by I. Bernard Cohen and Anne Whitman
                assisted by Julia Budenz
                <br><br>
                (without Guide)<br>
                UNIVERSITY OF CALIFORNI A PRESS, 1999
                <br>
                Oakland, California
                <br><br>
            </div>
            `,





        //so far used only in lemma2
        'Bernard-Cohen' : `
        <br>
        <i>Source</i>:<br>
        <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z" target="_blank">
            3rd Edition English translation by I. Bernard Cohen.
        </a>
        <br>
        `,

        /*
        'Bernard-Cohen---inline-style' : `
            font-size: 11px;
        `,
        */

        'latin-diagram' : `
        <br>
        <i>Source</i>:<br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102"  target="_blank">
            Diagram. Latin, 3rd Edition.
        </a>
        `,
        'latin-diagram---inline-style' : `
            font-size: 11px;
        `,

        'IanBruce' : `
        <br>
        <i>Source</i>:<br>
        Isaac NEWTON: Philosophiae Naturalis Principia Mathematica. 3rd Ed.<br>
        Translated and annotated by Ian Bruce<br>
        <a href="http://www.17centurymaths.com/contents/newtoncontents.html">
        http://www.17centurymaths.com/contents/newtoncontents.html</a>
        <br>
        `,
        'IanBruce---inline-style' : `
            font-size: 11px;
        `,


        'kvk' : `
            <br><span style="font-size:9px">
            <a href="http://landkey.org/Sandbox/z/82b-visualiz/scenarios/intro/full-stack/" target="_blank">Addendum (c) Konstantin Kirillov</a>.</span><br>
        `,



        'Krylov' : `
            <br>
            <i>Source</i>:<br>
            <a target="_blank" href="http://shaping.ru/download/pdffile/newton.pdf">
            Исаак Ньютон. Математические начала натуральной философии.
            <br>
            Перевод с латинского А.Н. Крылова.
            </a>
            <br>
            Изд. Наука. 1989.
            <br>
            Mathematical Principles of Natural Philosophy.
            <br>
            Translation by A.N. Krylov.
        `,

        /*
            Binet Jacqes Phillipe Marie 1786 1856, cited at Krylov p83, p84
        */

    }

}) ();

