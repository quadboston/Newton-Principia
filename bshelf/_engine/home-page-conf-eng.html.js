(function(){
const {
        ns, sn, nsmethods, $$, has, haz, haff, hafa, userOptions,
        globalCss, fapp, fconf, sapp, sconf, html, stdMod,
     } = window.b$l.atree();
sapp.buildsListOfLemmas = buildListOfLemmas;
html.builds_homePane = builds_homePane;
return;


function builds_homePane(){
    var subsiteImg = fconf.pathToContentSiteImg;
    buildHeader();
    haff(html, 'buildHowTo');
    buildTableOfContents();
    haff(html, 'buildOptions');
    haff(html, 'buildAbout');
    haff(html, 'buildTranslations');
    if( fconf.PING_SITE_URL && has(html, 'buildFeedbackAndTip') ){
        const hasInternetAccess = nsmethods.setsupInternetChecker({
            PING_SITE_URL: fconf.PING_SITE_URL,
            doThisWhenStatusUpdates: (statusIsOn)=>{
                html.buildFeedbackAndTip(statusIsOn);
            }
        });
        if( navigator.onLine ){
            //const online = await hasInternetAccess();
            html.buildFeedbackAndTip( hasInternetAccess() );
        }
    }
    padBottom();

    //==================================================
    // //\\ header
    //==================================================
    function buildHeader(){
        let hClass = userOptions.showingExtraFeatures() ?
            "extramat-showing" : "default";
        $$.c('header').addClass(hClass).to(fapp.homePage$()).html(`
        <div class="hp-section-wrap">
            <div class="landing-text">
                <h1 class="landing-title">
                    ${fconf.appDecor.homePageCaption}</h1>
                <br><br>
                <p class="landing-subtitle">
                    ${fconf.appDecor.homePageSubCaption}</p>
                <br>
                <p class="sub-title">
                    ${fconf.appDecor.homePageSubtitle}</p>
            </div>
        </div>
        <img class="book-image"
            alt="${fconf.appDecor.landingImage_alt}"
                src="${subsiteImg}/${fconf.appDecor.landingImage}">
        `);

        globalCss.add8update(`
            div header.default {
                min-height:${fconf['header-default-min-height']};
            }
        `);
    }
    //==================================================
    // \\// header
    //==================================================

    //==================================================
    // //\\ table of contents
    //==================================================
        function buildTableOfContents (){
        var coreText = '<h2 id="model-list">Table of contents</h2>' +
            buildListOfLemmas(true);
        if (userOptions.showingExtraFeatures()) {
            $$.c('div')
                .addClass( 'landing-table-of-contents bonusTOC' +
                           'hp-section-wrap')
                .to(fapp.homePage$())
                .html(coreText);
        } else {
            $$.c('div')
                .addClass('landing-table-of-contents ' +
                    'hp-section-wrap').to(fapp.homePage$())
                .html(coreText);
        }
    }
    //==================================================
    // \\// table of contents
    //==================================================
}

//==================================================
// //\\ pad bottom
//      (Without padding at the bottom of the homepage,
//      desktop Safari 18.1.1 cuts off text.
//      Chrome and Edge are fine, so for them this just adds
//      innocuous space.)
//==================================================
function padBottom (){
    //todm fix this by css not by markup
    $$.c('div')
        .to(fapp.homePage$())
        .html(`<div class="hp-text-section"></div>`);
}
//==================================================
// \\// pad bottom
//==================================================

// param: true if building for homepage, false if
// building for Contents button
function buildListOfLemmas( isHomepage ){
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

            ////add title "Book ... " when list switches to
            ////the next book ...
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
                    ////?? this is hand made home page patch
                    ////to close and reopen column of lemmas
                    coreText += `</ul></div></div><div class="column" style="padding-top: 3rem"><div><ul>`;
                }
            } else if (sappItem.sappId === "b1sec2prop9") {
                ////?? this is hand made home page patch
                ////to close and reopen column of lemmas
                coreText += `</ul></div></div><div class="column" style="padding-top: 3rem"><div><ul>`;
            }
        }
    });
    coreText += '\n</ul></div></div>';
    return coreText;
}
})();