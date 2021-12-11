( function() {
    var ns           = window.b$l;
    var $$           = ns.$$;
    var sn           = ns.sn;
    var fapp         = ns.sn('fapp' ); 
    var fconf        = ns.sn('fconf',fapp);
    var sconf        = ns.sn('sconf',fconf);

    var sapp         = sn('sapp');
    var html         = sn('html');

    html.builds_homePane = builds_homePane;
    return;







    function builds_homePane()
    {
        var landingPath = window.location.pathname;
        var subsiteImg  = fconf.pathToContentSiteImg;
        var coreText    = '';

        //==================================================
        // //\\ header
        //==================================================
        $$.c('header').to( fapp.homePage$() ).html(`
            <div class="hp-section-wrap">
                <div class="landing-text">
                    <h1 class="landing-title">${fconf.appDecor.homePageCaption}</h1>
                    <!--
                    <p class="sub-title"> 
                    </p>
                    -->
                </div>
            </div>
            <img class="newton-img"
                 src="${subsiteImg}/${fconf.appDecor.landingImage}">
        `);
        //==================================================
        // \\// header
        //==================================================




        //==================================================
        // //\\ table of contents
        //==================================================
        var coreText =`
                <h2>Table of contents</h2>
                <ul>
        `;

        var book = null;
        fconf.ix2lemmaDef.forEach( function( sappItem ) {
            if( sappItem.sappId === 'home-pane' ) return;
            if( book === null || book !== sappItem.book ) {
                book = sappItem.book;
                ////add title "Book ... " when list switches to the next book ...
                coreText += `
                    <li><div class="content-book-title">
                            <span class="table-title">${book}</span>
                        </div>
                    </li>
                `;
            }
            coreText += `
                <li><a href="${landingPath}?conf=sappId=${sappItem.sappId}">
                    <span class="table-title">&nbsp;&nbsp;&nbsp;${sappItem.caption}</span>
                    </a>
                </li>
            `;
        });
        coreText += `
             </ul>
             <!--END table of contents-->
        `;
        $$  .c('div').addClass('landing-table-of-contents hp-section-wrap').to( fapp.homePage$() )
            .html(coreText);
        //==================================================
        // \\// table of contents
        //==================================================


        //==================================================
        // //\\ how-to
        //==================================================
        coreText = `
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
                    <p>Drag sliders and hollow points to interact with the mode.</p>
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
            </div>
        `;
        $$  .c('div').addClass('how-to').to( fapp.homePage$() )
            .html(coreText);
        //==================================================
        // \\// how-to
        //==================================================







        //==================================================
        // //\\ about wrapper
        //==================================================
        coreText = `
                <div class="about__author">
                    <p class="about__author__text">
                        Programming by Konstantin Kirillov and John Scott.<br>
                        A User Interface Design by
                        <span class="dd-label">
                            <a href="http://theoddson.io">Darien Dodson</a>.
                        </span><br>
                        Welcome to project home: 
                        <span class="dd-label">
                            <a href="https://github.com/quadboston/Newton-Principia"
                               target="_blank">
                                github.com/quadboston/Newton-Principia</a>.
                        </span><br>
                        Produced by John Scott.
                        <span style="display:inlilne-block; float:right; right:10px;">
                            Version 0.${fapp.version}
                        </span>
                        <!-- todm fix these <br> by css not by markup -->
                        <br><br><br><br>
                    </p>
                </div>
        `;
        var aboutWrapper$ = $$  .c('div').addClass('about hp-section-wrap').to( fapp.homePage$() )
            .html(coreText);
        //==================================================
        // \\// about wrapper
        //==================================================

    }
}) ();

