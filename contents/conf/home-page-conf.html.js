( function() {
    var {
        ns, sn, $$, haz, userOptions,
        fapp, fconf, sapp, sconf, html, stdMod,
    } = window.b$l.apptree({
    });
    sapp.buildsListOfLemmas = buildListOfLemmas;
    html.builds_homePane = builds_homePane;
    return;


    function builds_homePane()
    {
        var subsiteImg = fconf.pathToContentSiteImg;

        buildHeader();
        buildHowTo();
        buildTableOfContents();
        buildOptions();
        buildAbout();
        buildLegal();
        //buildTranslations();
        buildFeedbackAndTip();
        padBottom();


        //==================================================
        // //\\ header
        //==================================================
        function buildHeader() {
            $$.c('header').to(fapp.homePage$()).html(`
            <div class="hp-section-wrap">
                <div class="landing-text">
                    <h1 class="landing-title">${fconf.appDecor.homePageCaption}</h1>
                    <br><br>
                    <p class="landing-subtitle">${fconf.appDecor.homePageSubCaption}</p>
                    <p class="sub-title">${fconf.appDecor.homePageSubtitle}</p>
                </div>
            </div>
            <img class="newton-img"
                 src="${subsiteImg}/${fconf.appDecor.landingImage}">
            `);
        }
        //==================================================
        // \\// header
        //==================================================

        
        //==================================================
        // //\\ table of contents
        //==================================================
         function buildTableOfContents()
         {
            var coreText = '<h2 id="model-list">Table of contents</h2>' + buildListOfLemmas();
            $$.c('div').addClass('landing-table-of-contents hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// table of contents
        //==================================================


        //==================================================
        // //\\ how-to
        //==================================================
        function buildHowTo() {
            var coreText = `
            <div class="hp-section-wrap">
                <h2>Usage Tips</h2>
                <div class=" how-to-grid">
                
                    <div class="how-to__cell">
                        <p>Hover over labels to highlight corresponding items in the diagram</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/hilight.gif">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Drag hollow points to manipulate the models</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/manipulate.gif">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Step through complicated proofs step-by-step</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/steps.gif">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>View qualitative data as you manipulate the models</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/data.gif">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Switch horizontal tabs to focus on only what is needed for a claim, proof, or corollary</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/horiz-tabs.gif">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Switch vertical tabs to watch an explanation, or to read the original text</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/vert-tabs.gif">
                        </div>
                    </div><!--END cell-->

                </div>
            </div>`;
            $$.c('div').addClass('how-to').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// how-to
        //==================================================


        //==================================================
        // //\\ options
        //==================================================
        function buildOptions(coreText) {
            var coreText = `
                <h2>Options</h2>
                <div>
                    <p class="option__text">      
                        <input type="checkbox" id="latinCheckbox"> 
                            Latin tabs (in progress)<br>
                        <input type="checkbox" id="fadeCheckbox"> 
                            overlay original diagrams<br>
                        <input type="checkbox" id="bonusCheckbox"> 
                            addendums and additional interpetations by Konstantin Krillov 
                    </p>
                </div>`;
            $$.c('div').addClass('options hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// options
        //==================================================


        //==================================================
        // //\\ about wrapper
        //==================================================
        function buildAbout() {
            var coreText = `
                <div class="about__author">
                    <h2>About</h2>
                    <p class="hp-text-section-body">
                        <span class="dd-label"><a href="https://www.linkedin.com/in/john-scott-61956614/">John Scott</a>:</span>
                            concept, production, programming, video<br>
                        <span class="dd-label"><a href="https://bastyon.com/konstantin_kirillov">Konstantin Kirillov:</a></span>
                            lead programming, addenda, UI<br>
                        <span class="dd-label"><a href="https://www.linkedin.com/in/kathryn-lepome">Kathryn LePome:</a></span>
                            voice<br>

                        <span class="dd-label"><a href="https://github.com/quadboston/Newton-Principia">Source Code:</a></span> 
                            open source, MIT license. Built ${fapp.buildDateString}, Version 0.${fapp.version}<br>
                        <span class="dd-label"><a href="javascript:showChangeLog()">What's New</a></span> 
                    </p>
                </div>`;
            $$.c('div').addClass('hp-text-section hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// about wrapper
        //==================================================


        //==================================================
        // //\\ legal wrapper
        //==================================================
        function buildLegal() {
            var coreText = `
                <div>
                    <h2>Legal</h2>
                    <p class="hp-text-section-body">
                        This website contains copyrighted material used under the 'fair use' provisions of copyright law (17 U.S.C. § 107) for the purpose of scholarship. No copyright infringement is intended.
                    </p>
                </div>`;
            $$.c('div').addClass('hp-text-section hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// legal wrapper
        //==================================================

        //==================================================
        // //\\ translattion wrapper
        //==================================================
        function buildTranslations() {
            var coreText = `
                <div>
                    <h2>Translations</h2>
                    <p class="hp-text-section-body">
                        This site draws upon 2 excellent English translations of Newton’s Principia. As each translation was written with a different aim, they have different strengths. The 2 translations are by Cohen and Donahue.
                        <br>
                        In general, Cohen’s translation has been preferred. For purposes of this site, it has these strengths:
                        <ul>
                            <li> it typically favors clarity over adherence to what would now be archaic language or notation. For example, what Donahue translates as “subduplicate ratio” is translated by Cohen as “square root”. While both are correct, the clarity of the modern term “square root” is preferred for this site.</li>
                            <li> it’s a complete translation of the entire Principia. Should this software be expanded to cover text not translated by Donahue, Cohen’s text can serve as a source.</li>
                        </ul>

However, Donahue’s translation (as published by Densmore) is used when its strengths better align with this site.
* sometimes Donahue’s text impresses as more clear. For example, what Cohen translates as “secant” (using a less-familiar meaning of the word), Donahue translates as “intersecting line” without any loss of meaning.
* Donahue argues a careful reading of lemma 4’s corollary leads to using “obtain” rather than Cohen’s “maintain”, and as “obtain” better fits the proof’s logic, Donahue’s translation has been used for lemma 4.

Occasionally a mix of both translations are used.
                    </p>
                </div>`;
            $$.c('div').addClass('hp-text-section hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// legal wrapper
        //==================================================

        //==================================================
        // //\\ feedback wrapper
        //==================================================
        function buildFeedbackAndTip() {
            var coreText = 
                `
                <div class="feedback">
                    <span class="feedback-label"><a href="javascript:decryptEmail('ZmVlZGJhY2tAc2NpZW5jZWhpa2UuY29t');">Feedback</a></span> welcome, as well as donations:
                
                    &nbsp;<a href='https://ko-fi.com/L4L618688P' target='_blank'><img height='24' style='border:0px;height:24px;' 
                    src='https://storage.ko-fi.com/cdn/kofi1.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
                </div>
                `;
            $$.c('div').addClass('hp-text-section hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// feedback wrapper
        //==================================================
        

        //==================================================
        // //\\ pad bottom
        //      (Without padding at the bottom of the homepage, desktop Safari 18.1.1 cuts off text.
        //      Chrome and Edge are fine, so for them this just adds innocuous space.)
        //==================================================
        function padBottom() {
            // todm fix this by css not by markup
            var coreText = `<div class="hp-text-section"></div>`;
            $$.c('div').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// pad bottom
        //==================================================
    }


    
    function buildListOfLemmas()
    {
        var landingPath = window.location.pathname;
        var book = null;
        var coreText = '';
        fconf.ix2lemmaDefAllowed.forEach(function (sappItem) {
            if (sappItem.sappId === 'home-pane') return;
            if (book === null || book !== sappItem.book) {
                if( book !== null ) {
                    coreText += '</ul></div>';
                }
                book = sappItem.book;
                let cls = sappItem.annotation === userOptions.BONUS_START ?
                         ' class="' + userOptions.BONUS_START + '"' : '';
                coreText += '<div' + cls  + `><ul>`;
                ////add title "Book ... " when list switches to the next book ...
                coreText += `
                    <li><div class="content-book-title">
                            <span class="book-title">${book}</span>
                        </div>
                    </li>
                `;
            }
            let chosen = sappItem.sappId === fconf.sappId ? ' chosen' : '';
            coreText += `
                <li><a href="${landingPath}?conf=sappId=${sappItem.sappId}"
                    class="lemma-item-title ${chosen}">&nbsp;&nbsp;&nbsp;${sappItem.caption}
                    </a>
                </li>`;
            if (sappItem.annotation === userOptions.BONUS_END) {
                coreText += `</ul></div>`;
            }
        });
        coreText += '\n</ul></div>';
        return coreText;
    }
}) ();

