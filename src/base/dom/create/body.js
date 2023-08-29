( function() {
    var {
        ns,
        $$,
        haz,
        fapp,
        sDomN,
        html,
        fconf,
        userOptions
    } = window.b$l.apptree({
    });
    html.builds_body_4_home8lemma = builds_body_4_home8lemma;
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
        var caption = ww.book + '. ' + ww.caption;

        //pageNavTopBar
        var navBar$ =
            sDomN.pageNavTopBar$ =
            $$.dc( 'page-top-nav-bar' )
            .to( fapp.fappRoot$ )
            ;

        //==================================================
        // //\\ builds home button
        //==================================================
        navBar$
            .ch(    
                sDomN.homeButton$ = $$
                .dc( "master-pagination-btn home-button is-hidden" )
                .html( fconf.homeButtonName )
                .e( 'click', function() {
                      if( fapp.homePage$().className.indexOf( 'is-hidden' ) > -1 ) {
                            // user is viewing landing page
                            userOptions.initializeOptions();
                            ns.globalCss.update('','home');
                            ////home-pane becomes visible
                            fapp.homePage$.removeClass( 'is-hidden' );
                            sDomN.homeButton$
                                .html( fconf.appDecor.backButtonCaption )
                                .removeClass( 'is-hidden' )
                                ;
                            fapp.fappRoot$.css( 'overflow', 'visible' );
                            document.body.style.overflow = 'visible';
                            $$.$( document.body ).addClass( 'contents' );
                            //todm patch
                            haz( sDomN , 'simSScene$' ) &&
                                sDomN.simSScene$.css( 'display', 'none' );

                      } else {
                            // user is going back the lemmas
                            if (userOptions.hasNewSettings()) {
                                window.location.reload();
                            } else {
                                wipeFromHomeToLemma();
                            }
                      }
                      return false;
                })
            )

            function wipeFromHomeToLemma() {
                ns.globalCss.clearStyleTag('home');
                fapp.homePage$.addClass('is-hidden');
                sDomN.homeButton$
                    .html(fconf.homeButtonName)
                    .addClass('is-hidden');
                document.body.style.overflow = 'hidden';
                $$.$(document.body).removeClass('contents');
                //todm patch
                sDomN.simSScene$.css('display', 'inline-block');
            }
        //==================================================
        // \\// builds home button
        //==================================================

        navBar$
            .ch( sDomN.middleNavBar$ = $$.dc( 'middle-subnav-bar' )
                //==================================================
                // //\\ site menu: builds lemmas' navigator
                //==================================================
                .ch(    
                    sDomN.leftButton$ = $$
                    .dc( "master-pagination-btn" )
                    .a( 'title', 'Previous item of site content.' )
                )
                .ch(
                    sDomN.midddleButton$ = $$
                    .dc( "master-pagination-btn current-lemma" )
                    .a( 'title', 'Currently chosen item of site content.' )
                    .html( caption )
                )
                .ch(    
                    sDomN.rightButton$ = $$
                    .dc( "master-pagination-btn" )
                    .a( 'title', 'Next item of site content.' )
                )
                //==================================================
                // \\// site menu: builds lemmas' navigator
                //==================================================
            );
        //==================================================
        // \\// page master menu
        //==================================================


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

}) ();
