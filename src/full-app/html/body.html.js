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

    html.body = buildBody;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000








    function buildBody()
    {
        var landingPath = window.location.pathname;

        //:creates application root
        var fappRoot$ = fapp.fappRoot$ =
            $$.div()
              .cls( 'bsl-approot' )
              .to( document.body );
        //.must be called fapproot
        rootvm.approot = fapp.fappRoot$();

        
        //todm: must be appMode
        if( sapp.pageMode === 'lemma' ) {
            //==================================================
            // //\\ sapp.pageMode === lemma
            //==================================================
            var rootDomId = sapp.sappId;
            document.title = sapp.siteCaptionPlain;
            fappRoot$.id( rootDomId );

            sugarButtonsForMobileGUI_toDirect_to_other_lemmas$().to( fappRoot$ );


            //==================================================
            // //\\ page master menu
            //==================================================
            sDomN.menu = $$
                .dc( 'sub-nav-bar ' + cssp + '-menu' )
                .html( "<h1>" + sapp.siteCaptionHTML + "</h1>"
                )();
            //==================================================
            // \\// page master menu
            //==================================================

            build_siteWideNavBar$()
                .to( fappRoot$ )
                .ch( sDomN.menu );
            build_navDrawer$().to( fappRoot$ );
            build_shade$().to( fappRoot$ );
            //==================================================
            // \\// sapp.pageMode === lemma
            //==================================================

        } else {
            //==================================================
            // //\\ sapp.pageMode as front page
            //==================================================
            var rootDomId = 'landing';
            fappRoot$.id( rootDomId );
            build_siteWideNavBar$().to( fappRoot$ );
            build_shade$().to( fappRoot$ );
            build_navDrawer$().to( fappRoot$ );
            html.siteTitlePage(); 
            //==================================================
            // \\// sapp.pageMode as front page
            //==================================================
        }
        //.we do this as soon as possible to enable the test service ...
        ns.create_mobile_tester( fapp.fappRoot$(),
                                 fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD );
        ns.create_mobile_tester( fapp.fappRoot$(),
                                 fconf.SMALL_DESKTOP_MEDIA_QUERY_WIDTH_THRESHOLD );

        fapp.initBurgerMenu_8_navDrawerShade();
        return; //rrrrrrrrrrrrrrrrrrrrrrr




        



        //==================================================
        // //\\ nav drawer
        //      right sliding side-bar with list of lemmas
        //      when clicking on burger menu
        //==================================================
        function build_navDrawer$()
        {
            var navDrawer$ = $$.dic( "navDrawer", "nav-drawer");
            var htmlTxt = `
                <a href="index.html" class="nav-drawer__title">
                    ${sapp.siteCaptionHTML}
                </a>
                <ul>
                `;
            //--------------------------------------------------
            // //\\ builds list of nav drawer links
            //--------------------------------------------------
            fconf.sappModulesArray.forEach( function( sappItem ) {
                var selected = sappItem.sappId === sapp.sappId ? ' selected' : '';
                htmlTxt += `
                    <li class="nav-drawer__list-item${selected}">
                        <div class="nav-drawer__dot">
                            <img src="images/nav-dot.svg">
                        </div>
                        <a href="${landingPath}?conf=sappId=${sappItem.sappId}">
                            <h3 class="nav-drawer__list-item__title">
                                ${sappItem.caption}</h3>
                            <span class="nav-drawer__list-item__desc">${sappItem.annotation}
                            </span>
                        </a>
                    </li>
                `;
            });
            //--------------------------------------------------
            // \\// builds list of nav drawer links
            //--------------------------------------------------



            //--------------------------------------------------
            // //\\ builds other-links
            //--------------------------------------------------
            htmlTxt += `
                </ul>
                <div class="other-links">
                    <a class="other-links__link" href="${landingPath}">
                            <span class="other-links__link__graphic">
                                <img src="images/back-arrow-link.svg">
                            </span>
                            <span class="other-links__link__text">
                                Back to home
                            </span>
                        </a>
                </div>
            `;
            navDrawer$.html( htmlTxt );
            //--------------------------------------------------
            // \\// builds other-links
            //--------------------------------------------------
            return navDrawer$;
        }
        //==================================================
        // \\// nav drawer
        //==================================================



        //====================================================
        // //\\ site-wide master-nav-bar
        //      menu bar on page top all page width on desktop
        //====================================================
        function build_siteWideNavBar$()
        {
            return $$
                .dc( 'nav-bar')
                .ch(    ///burger button
                        $$  .dc( "btn btn__menu" )
                            .ch(
                                [1,2,3].map( function( lineN ) {
                                    //.this makes lines in burger-button
                                    return $$
                                       .span()
                                       .id("menu-line-" + lineN)
                                       .cls("btn__menu__bar")
                                       .ch( [
                                            $$.span().cls("btn__menu__bar--dot"),
                                            $$.span().cls("btn__menu__bar--line")
                                       ]); 
                                })
                            )
                );
        }
        //====================================================
        // \\// site-wide master-nav-bar
        //====================================================



        function sugarButtonsForMobileGUI_toDirect_to_other_lemmas$()
        { return  $$
            .dc( 'bottom-nav' )
            .html(`
                <div class="mobile-page-btn">
                    <a class="btn page-btn mobile-link page-btn--left">
                        <img src="images/left-arrow.svg">
                    </a>
                    <a class="btn page-btn mobile-link page-btn--right">
                        <img src="images/right-arrow.svg">
                    </a>
                </div>
                <!-- END mobile redirector buttons -->
            `);
        }

        function build_shade$()
        {
            return $$.di("shade");
        }
    };


}) ();
