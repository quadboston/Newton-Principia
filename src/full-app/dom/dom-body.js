( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;
    var html        = sn('html');
    var rootvm      = sn('rootvm');

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    html.buildCommonHTMLBody = buildCommonHTMLBody;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000



    

    function buildCommonHTMLBody()
    {
        //===================================
        // //\\ creates application root
        //===================================
        var fappRoot$ =
            fapp.fappRoot$ = $$
              .div()
              .cls( 'bsl-approot' )
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
        ns.create_mobile_tester( fappRoot$(),
                                 fconf.SMALL_DESKTOP_MEDIA_QUERY_WIDTH_THRESHOLD );
        //===================================
        // \\// makes CSS testers
        //===================================


        //==========================================
        // //\\ creates home page behind the scenes
        //==========================================
        //fapp.homePage$ = $$.cdt( 'bsl-home-pane', fappRoot$ );
        fapp.homePage$ = $$
              .div()
              .id( 'home-pane' )
              .cls( 'bsl-home-pane is-hidden' )
              //.to( document.body );
              .to( fappRoot$ );
        //==========================================
        // \\// creates home page behind the scenes
        //==========================================







        //==========================================
        // //\\ creates basic css
        //==========================================
        ns.globalCss.addText( `
            .bsl-home-pane {
                position : absolute;
                z-index : 100;
            }
            .bsl-home-pane {
                top : 0;
                left : 0;
                transition : left 1s ease;
            }
            .bsl-home-pane.is-hidden {
                left : -130%;
            }
        `);
        ns.globalCss.update();
        //==========================================
        // \\// creates basic css
        //==========================================


        //todm: must be appMode
        //sDomN.captionHTML$ = $$.c('h1'); //todm remove?

        //==================================================
        // //\\ page master menu
        //==================================================
        var ww = fconf.sappModulesList[ sapp.sappId ];
        var caption = ww.book + '.' + ww.caption + '.';

        var navBar$ = sDomN.navBar$ = $$.dc( 'nav-bar' )
            .to( fapp.fappRoot$ )
            //==================================================
            // //\\ builds home button
            //==================================================
            .ch(    
                sDomN.homeButton$ = $$
                .dc( "master-pagination-btn home-button is-hidden" )
                .html("Contents")
                .e( 'click', function() {
                      if( fapp.homePage$().className.indexOf( 'is-hidden' ) > -1 ) {
                            ////home-pane becomes visible
                            fapp.homePage$.removeClass( 'is-hidden' );
                            sDomN.homeButton$
                                .html( 'X' )
                                .removeClass( 'is-hidden' )
                                ;
                            fapp.fappRoot$.css( 'overflow', 'visible' );
                            document.body.style.overflow = 'visible';
                      } else {
                            fapp.homePage$.addClass( 'is-hidden' );
                            sDomN.homeButton$
                                .html( 'Contents' )
                                .addClass( 'is-hidden' )
                                ;
                            document.body.style.overflow = 'hidden';
                      }
                      return false;
                })
            )
            //==================================================
            // \\// builds home button
            //==================================================

            .ch( sDomN.middleNavBar$ = $$.dc( 'middle-subnav-bar' )
                //==================================================
                // //\\ builds lemmas' navigator
                //==================================================
                .ch(    
                    sDomN.leftButton$ = $$
                    .dc( "master-pagination-btn" )
                    //.html('<img src="images/back-arrow-link.svg">')
                )
                .ch(
                    sDomN.midddleButton$ = $$
                    .dc( "master-pagination-btn current-lemma" )
                    .html( caption )
                )
                .ch(    
                    sDomN.rightButton$ = $$
                    .dc( "master-pagination-btn" )
                    //.html('<img src="images/right-page-triangle.svg">')
                )
                //==================================================
                // \\// builds lemmas' navigator
                //==================================================
            );
        //==================================================
        // \\// page master menu
        //==================================================


        //==================================================
        // //\\ application version label
        //==================================================
        $$  .div()
            .to( document.body )
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
