( function() {
    var {
        ns, $$, haz, userOptions,
        fapp, sapp, sDomN, html, fconf, stdMod,
    } = window.b$l.apptree({
    });
    html.builds_body_4_home8lemma = builds_body_4_home8lemma;
    sDomN.landingPage8Options_click = landingPage8Options_click;
    return;


    

    function builds_body_4_home8lemma()
    {
        //===================================
        // //\\ creates application root
        //===================================
        var fappRoot$ =
            fapp.fappRoot$ = $$
              .div()
              .cls( 'bsl-approot appid-' + fconf.sappIdUnCamel )
              .to( document.body );
        //===================================
        // \\// creates application root
        //===================================
        

        //===================================
        // //\\ makes CSS testers
        //      we do this as soon as possible to enable the test service ...
        //===================================
        ns.create_mobile_tester( fappRoot$(),
                                 fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD );
        //===================================
        // \\// makes CSS testers
        //===================================


        //==========================================
        // //\\ creates home page behind the scenes
        //==========================================
        fapp.homePage$ = $$
              .div()
              .cls( 'bsl-home-pane is-hidden' )
              .to( fappRoot$ );
        //==========================================
        // \\// creates home page behind the scenes
        //==========================================







        //==========================================
        // //\\ creates basic css
        //==========================================
        ns.globalCss.update( '', 'home' ); //seems vital ...why?
        ns.globalCss.update();             //seems vital ...why?
        //==========================================
        // \\// creates basic css
        //==========================================


        //todm: must be appMode
        //sDomN.captionHTML$ = $$.c('h1'); //todm remove?

        //==================================================
        // //\\ page master menu
        //==================================================
        var ww = fconf.sappId2lemmaDef[ fconf.sappId ];
        var caption = ww.book + ', ' + ww.caption;

        //pageNavTopBar
        var navBar$ =
            sDomN.pageNavTopBar$ =
            $$.dc( 'page-top-nav-bar' )
            .to( fapp.fappRoot$ )
            ;
        //==================================================
        // //\\ builds home button
        //==================================================
        //==================================================
        // \\// builds home button
        //==================================================

        //==================================================
        // //\\ builds drop down button
        //==================================================
        navBar$
            .ch( sDomN.homeButton$ = $$
                .dc( "master-pagination-btn home-button" )
            )
            .ch( sDomN.returnToLemmaButton$ = $$
                .dc( "master-pagination-btn return-to-lemma-button" )
                .e( 'click', function() {
                    return landingPage8Options_click();
                 })
            );
        //==================================================
        // \\// builds drop down button
        //==================================================

        navBar$
            .ch( sDomN.middleNavBar$ = $$.dc( 'middle-subnav-bar' )
                //==================================================
                // //\\ site menu: builds lemmas' navigator
                //==================================================
                .ch(    
                    sDomN.leftButton$ = $$
                    .dc( "master-pagination-btn left" )
                    .a( 'title', 'Previous item of site content.' )
                )
                .ch(
                    sDomN.midddleButton$ = $$
                    .dc( "master-pagination-btn current-lemma" )
                    .a( 'title', 'Currently chosen item of site content.' )
                    //todo hard problem: why border is still black?
                    .css( 'border', '3px solid rgba(150, 175, 200, 1)' )
                    .html( caption )
                )
                .ch(    
                    sDomN.rightButton$ = $$
                    .dc( "master-pagination-btn right" )
                    .a( 'title', 'Next item of site content.' )
                )
                //==================================================
                // \\// site menu: builds lemmas' navigator
                //==================================================
            );
        //==================================================
        // \\// page master menu
        //==================================================

        sDomN.homeButton$.html( fillsLemmasList() );
        sDomN.returnToLemmaButton$.html( fconf.appDecor.backButtonCaption );

        //==================================================
        // //\\ application version label
        //==================================================
        $$  .div()
            .to( fapp.fappRoot$ ) //document.body )
            .cls('test-version')
            .css('position', 'absolute')
            .css('bottom', '10px')
            .css('right', '10px')
            .css('color', 'grey')
            .css('font-size', '10px')
            .html('Version 0.' + fapp.version);
        //==================================================
        // \\// application version label
        //==================================================

    }
    ///inserts itself into sDomN.homeButton$.html
    function fillsLemmasList()
    {
        var coreText =
        `
            <div class="lemma-list-opener isclosed" style="position:absolute; text-align:left;">
                <div class="trigger-option" style="text-align:left;">
                    Contents
                </div>
                <div class="trigger-content content-list">
                   <div>
        `;//rid content-book-title, content-book-title left-home- button
        coreText += `
                <div>
                    <ul style="margin-bottom:0; margin-top:0;">
                        <li><div class="lemma-item-title go-to-front-page"
                                     onclick="window.b$l.sapp.dnative.landingPage8Options_click();"
                                     title="Go to front page and preferences."
                               >🏠 🛠
                              </div><!-- ⚙ -->
                        </li>
                    </ul>
                </div>
        `;
        coreText += sapp.buildsListOfLemmas(false) +
        `
                   </div>
                </div>
            </div>
        `;
        fapp.fappRoot$.e( 'click', function( event ) {
            //ccc( 'event.target=',event.target);
            //ccc( 'event.currentTarget=',event.currentTarget, 'this, el=', this );
            stepUp( event.target )
        });
        return coreText;
    }
    ///recurses up till button found or nothing found,
    ///if button found, does nothing,
    ///if not, then closes list,
    function stepUp( el ) {
        if( !el || !el.className || typeof el.className !== 'string' ) {
            ////c cc( 'reached the top of dom tree' );
            let b = document.body.querySelector(
                '.master-pagination-btn.home-button div' );
            $$.$( b ).removeClass( 'isopen' ).addClass( 'isclosed' );
            return;
        }
        if( el.className.indexOf('trigger-option') < 0 ) {
            stepUp( el.parentNode );
        }
    }
    
    function landingPage8Options_click( goToFrontPage )
    {
        userOptions.userOptions_2_updatedGUI();
        
        if( typeof goToFrontPage === 'undefined' ) {
            goToFrontPage = fapp.homePage$().className.indexOf( 'is-hidden' ) > -1;
        }
        ////it does always click on landing of pure home page when
        ////no lemmas called
        if( goToFrontPage ) {
            //(I) this replaces "erased css", whish was erased before,
            //this creates exceptionally strong separation of styles of
            //front-page-pane and lemma-pane without reloading the application,
            ns.globalCss.update('','home');

            fapp.homePage$.removeClass( 'is-hidden' );
            sDomN.returnToLemmaButton$.removeClass( 'non-displayed' );
            sDomN.homeButton$.addClass( 'non-displayed' );
            
            fapp.fappRoot$.css( 'overflow', 'visible' );
            document.body.style.overflow = 'visible';
            $$.$( document.body ).addClass( 'contents' );
            //todm patch
            haz( sDomN , 'simSScene$' ) &&
                sDomN.simSScene$.css( 'display', 'none' );

        } else {
            //(I) this erases css of front-page-pane
            ns.globalCss.clearStyleTag('home');
            
            fapp.homePage$.addClass( 'is-hidden' );
            sDomN.returnToLemmaButton$.addClass( 'non-displayed' );
            sDomN.homeButton$.removeClass('non-displayed');
            
            document.body.style.overflow = 'hidden';
            $$.$(document.body).removeClass('contents');
            //todm patch
            let sce$ = haz( sDomN, 'simSScene$' );
            if( sce$ ) {
                sce$.css('display', 'inline-block');
            }
        }
    }
}) ();
