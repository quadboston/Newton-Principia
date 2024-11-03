( function() {
    var {
        ssD,
    } = window.b$l.apptree({
    });



    ssD.bookReferences =
    {
        ////no unescaped special chars between backticks `...`
        ////no unescaped $, "\", ...

        latin : `
            <div class="isclosed">
                <div class="trigger-option">
                    Philosophiae Naturalis Principia Mathematica.
                </div>
                <div class="trigger-content">
                    Auctore Isaaco<br><br>
                    Newton, Isaac<br>
                    Londini [i.e. London], 1726<br>
                    3rd Edition<br>
                    ETH-Bibliothek Zürich<br>
                    Shelf Mark: Rar 4176<br>
                    License: public domain.<br>
                    Persistent Link: <a href="http://dx.doi.org/10.3931/e-rara-1235"
                               target="_blank"> http://dx.doi.org/10.3931/e-rara-1235<br>
                               http://www.e-rara.ch/<br>
                    </a>
                </div>
            </div>
        `,
        /*
        'latin---inline-style' : `
            font-size: 11px;
        `,
        */

        Donahue : `
            <div class="isclosed">
                <div class="trigger-option">
                    William H Donahue cited
                </div>
                <div class="trigger-content">
                    Dana Densmore and William H. Donahue (2003, 2010).<br>
                    <a href="https://www.greenlion.com/books/NewtonPrincipia.html" target="_blank">
                    <i>Newton’s Principia: The Central Argument</i> (3rd ed.)</a><br>
                    Green Lion Press.<br>
                </div>
            </div>
        `,
        /*
        'Donahue---inline-style' : `
            font-size: 11px;
        `,
        */

        'Motte-3rd' : `
            <div class="isclosed">
                <div class="trigger-option">
                   The Mathematical Principles of Natural Philosophy, by Sir Isaac Newton;
                </div>
                <div class="trigger-content">
                    Translated into English by Andrew Motte.<br>
                    First American Edition, Carefully Revised and corrected. New York. Published By Daniel
                    Adee, 45 Liberty Street.<br>
                    Year is possibly 1846.<br>
                </div>
            </div>

        `,
        /*
        'Motte-3rd---inline-style' : `
            font-size: 11px;
        `,
        */

        'Bernard-Cohen-Anne-Whitman' : `
            <div class="isclosed">
                <div class="trigger-option">
                    The <i>Principia</i>, Cohen translation
                </div>
                <div class="trigger-content">
                    Cohen, I. B., Whitman, A., & Budenz, J. (1999).<br>
                    <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z" target="_blank">
                    <i>The Principia: Mathematical Principles of Natural Philosophy</i> (1st ed.)</a>.<br>
                    University of California Press.<br>
                </div>
            </div>
            `,


        'Bernard-Cohen-Anne-Whitman-without-Guide' : `
            <div class="isclosed">
                <div class="trigger-option">
                    <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z"
                       target="_blank">
                       NEWTON, THE <i>PRINCIPIA</i></a>
                </div>
                <div class="trigger-content">
                    <i>Mathematical Principles of Natural Philosophy</i><br>
                    A New Translation<br>
                    I. Bernard Cohen and Anne Whitman<br>
                </div>
            </div>
            `,





        //so far used only in lemma2
        'Bernard-Cohen' : `
            <div class="isclosed">
                <div class="trigger-option">
                    <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z" target="_blank">
                    3rd Edition English translation by I. Bernard Cohen.
                </a>
                </div>
                <div class="trigger-content">
                </div>
            </div>
        `,

        /*
        'Bernard-Cohen---inline-style' : `
            font-size: 11px;
        `,
        */




        'latin-diagram' : `
            <div class="isclosed">
                <div class="trigger-option">
                   <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102"
                      target="_blank">
                        Diagram. Latin, 3rd Edition.
                    </a>
                </a>
                </div>
                <div class="trigger-content">
                </div>
            </div>
        `,
        /*
        'latin-diagram---inline-style' : `
            font-size: 11px;
        `,
        */

        'IanBruce' : `
            <div class="isclosed">
                <div class="trigger-option">
                    Isaac NEWTON: Philosophiae Naturalis Principia
                </div>
                <div class="trigger-content">
                     Mathematica. 3rd Ed.<br>
                     Translated and annotated by Ian Bruce<br>
                     <a href="http://www.17centurymaths.com/contents/newtoncontents.html">
                     http://www.17centurymaths.com/contents/newtoncontents.html</a>
                </div>
            </div>
        `,
        /*
        'IanBruce---inline-style' : `
            font-size: 11px;
        `,
        */


        'kvk' : `
            <span style="font-size:9px">
            <a href="http://landkey.org/Sandbox/z/82b-visualiz/scenarios/intro/full-stack/" target="_blank">Addendum (c) Konstantin Kirillov</a>.</span><br>
        `,



        'Krylov' : `
            <div class="isclosed">
                <div class="trigger-option">
                    <a target="_blank" href="http://shaping.ru/download/pdffile/newton.pdf">
                        Исаак Ньютон. Математические начала натуральной философии.
                    </a>
                </div>
                <div class="trigger-content">
                    Перевод с латинского А.Н. Крылова.
                    <br>
                    Изд. Наука. 1989.
                    <br>
                    Mathematical Principles of Natural Philosophy.
                    <br>
                    Translation by A.N. Krylov.
                </div>
            </div>
        `,

        /*
            Binet Jacqes Phillipe Marie 1786 1856, cited at Krylov p83, p84
        */

    }

}) ();

