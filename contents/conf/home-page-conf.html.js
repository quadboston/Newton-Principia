( function() {
    var {
        ns, sn, $$, userOptions,
        fapp, fconf, sapp, sconf, html, stdMod,
    } = window.b$l.apptree({
    });
    sapp.buildsListOfLemmas = buildsListOfLemmas;
    html.builds_homePane = builds_homePane;
    return;


    function builds_homePane()
    {
        var subsiteImg = fconf.pathToContentSiteImg;

        buildHeader();
        buildTableOfContents();
        buildHowTo();
        buildOptions();
        buildAbout();


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
                    <!--
                    <p class="sub-title"> 
                    </p>
                    -->
                </div>
            </div>
            <img class="newton-img"
                 src="${subsiteImg}/${fconf.appDecor.landingImage}">`);
        }
        //==================================================
        // \\// header
        //==================================================

        
        //==================================================
        // //\\ table of contents
        //==================================================
         function buildTableOfContents()
         {
            var coreText = '<h2>Table of contents</h2>' + buildsListOfLemmas();
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
                <h2>Usage Guide</h2>
                <div class=" how-to-grid">
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img style="width:150px; height:150px;"
                             src="${subsiteImg}/menu-buttons.mkv.gif">
                    </div>

                    <h4>Text</h4>
                    <p>Click on the tab corresponding to the text you want to view.</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img style="width:221px; height:150px;"
                             src="${subsiteImg}/draggable-model.mkv.gif">
                    </div>
                    <h4>Model</h4>
                    <p>Drag sliders and hollow points to interact with the model.</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                            <!-- apparently flex allows both % and px here for this image -->
                            <img style="width:260px; height:150px;"
                             src="${subsiteImg}/text-model2.mkv.gif">
                    </div>
                    <h4>Text-Model Interaction</h4>
                    <p>Hover over colored text to easily find the corresponding
                       item in the model.</p>
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
            //return coreText;
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
                    <p class="about__author__text">
                        <span class="dd-label"><a href="https://www.linkedin.com/in/john-scott-61956614/">John Scott</a>:</span>
                            concept, production, programming, video<br>
                        <span class="dd-label"><a href="http://landkey.net/">Konstantin Kirillov:</a></span>
                            lead programming, addenda, UI<br>
                        <span class="dd-label"><a href="https://www.linkedin.com/in/kathryn-lepome">Kathryn LePome:</a></span>
                            voice<br>
                        <span class="dd-label"><a href="http://darien.io/">Darien Dodson:</a></span>
                            UI<br>
                        <span class="dd-label"><a href="https://github.com/quadboston/Newton-Principia">Source Code:</a></span> 
                            open source, MIT license. Version 0.${fapp.version}<br>
                        <!-- todm fix these <br> by css not by markup -->
                        <br><br><br><br>
                    </p>
                </div>`;
            $$.c('div').addClass('about hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
        //==================================================
        // \\// about wrapper
        //==================================================

    }
    
    function buildsListOfLemmas()
    {
        var landingPath = window.location.pathname;
        var book = null;
        var coreText = '';
        fconf.ix2lemmaDef.forEach(function (sappItem) {
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

