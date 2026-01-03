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
        buildTranslations();
        //calls Internet: should test Internet first:
        //buildFeedbackAndTip();
        padBottom();


        //==================================================
        // //\\ header
        //==================================================
        function buildHeader() {
            let hClass = userOptions.showingExtraFeatures() ? "extramat-showing" : "default";
            $$.c('header').addClass(hClass).to(fapp.homePage$()).html(`
            <div class="hp-section-wrap">
                <div class="landing-text">
                    <h1 class="landing-title">${fconf.appDecor.homePageCaption}</h1>
                    <br><br>
                    <p class="landing-subtitle">${fconf.appDecor.homePageSubCaption}</p>
                    <p class="sub-title">${fconf.appDecor.homePageSubtitle}</p>
                </div>
            </div>
            <img class="newton-img" alt="portrait of Newton"
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
            var coreText = '<h2 id="model-list">Table of contents</h2>' + buildListOfLemmas(true);
            if (userOptions.showingExtraFeatures()) {
                $$.c('div').addClass('landing-table-of-contents bonusTOC hp-section-wrap').to(fapp.homePage$())
                    .html(coreText);
            } else {
                $$.c('div').addClass('landing-table-of-contents hp-section-wrap').to(fapp.homePage$())
                    .html(coreText);
            }
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
                            <img src="${subsiteImg}/hilight.gif" alt="label highlight">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Drag hollow points to manipulate the models</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/manipulate.gif" alt="manipulate points">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Step through complicated proofs step-by-step</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/steps.gif" alt="step through">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>View qualitative data as you manipulate the models</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/data.gif" alt="qualitative data">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Switch horizontal tabs to focus on only what is needed for a claim, proof, or corollary</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/horiz-tabs.gif" alt="horizontal tabs">
                        </div>
                    </div><!--END cell-->

                    <div class="how-to__cell">
                        <p>Switch vertical tabs to watch an explanation, or to read the original text</p>
                        <div class="how-to__cell__image">
                            <img src="${subsiteImg}/vert-tabs.gif" alt="vertical tabs">
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
                        <input type="checkbox" id="latinCheckbox" aria-label="latin">
                            Latin tabs (in progress)<br>
                        <input type="checkbox" id="fadeCheckbox" aria-label="fade">
                            overlay original diagrams<br>

                        <!-- hidden, available only via URL -->
                        <!--
                        <input type="checkbox" id="bonusCheckbox" aria-label="extramat">
                            shows development
                        -->

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
                        <span class="dd-label"><a href="changelog/changelog.html">What's New</a></span>
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
                        This website contains copyrighted material used under the 'fair use' provisions of copyright law (17 U.S.C. § 107) for the purpose of scholarship. No copyright infringement is intended.
                    </p><p class="hp-small-text-section-body">
                        This site draws upon two English translations of Newton’s Principia, each with unique strengths: L. Bernard Cohen’s <span class="dd-label"><a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z"><em>A Guide to Newton’s Principia</em></a></span> and Dana Densmore’s <span class="dd-label"><a href="https://www.greenlion.com/books/NewtonPrincipia.html"><em>Newton’s Principia: The Central Argument</em></a></span>.
                        <br><br>
                        Cohen’s translation is the primary choice for this site due to:<br>
                        ✔ Modernized clarity – It favors readability over strict adherence to archaic terminology. For instance, Cohen translates “subduplicate ratio” as “square root,” making the concept clearer.<br>
                        ✔ Completeness – It covers the entire Principia, allowing for future expansion beyond Donahue’s coverage.
                        <br><br>
                        Donahue’s translation is preferred when it enhances clarity or accuracy:<br>
                        ✔ Simplified terminology – Cohen’s “secant” (in an uncommon sense) is more intuitively rendered by Donahue as “intersecting line.”<br>
                        ✔ Logical precision – In Lemma 4’s corollary, Donahue translates “obtain” instead of Cohen’s “maintain,” which better aligns with the proof’s reasoning.<br><br>
                        In some cases, elements of both translations are combined.
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


    // param: true if building for homepage, false if building for Contents button
    function buildListOfLemmas(isHomepage)
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
                let cls2 = book === "Book 1" ? ' class="column"' : '';
                coreText += '<div' + cls2 + '><div><ul>';

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
            if(isHomepage) {
                ////todm: apparent home-made patches:
                if (userOptions.showingExtraFeatures()) {
                    if (sappItem.sappId === "b1sec3prop14") {
                        ////?? this is hand made home page patch to close and reopen column of lemmas
                        coreText += `</ul></div></div><div class="column" style="padding-top: 3rem"><div><ul>`;
                    }
                } else if (sappItem.sappId === "b1sec2prop9") {
                    ////?? this is hand made home page patch to close and reopen column of lemmas
                    coreText += `</ul></div></div><div class="column" style="padding-top: 3rem"><div><ul>`;
                }
            }
        });
        coreText += '\n</ul></div></div>';
        return coreText;
    }
}) ();

