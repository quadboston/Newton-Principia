//\\// Application Entry
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var html        = sn('html');

    var nsmethods   = sn('methods');

    var fapp        = sn('fapp'); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative', sapp);

    //:nearly a patch
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var cssmod      = sn('ssCssModules',ss);




    //======================================================
    // //\\ establishes landing-start-state
    //======================================================
    document.documentElement.className += 'non-loaded';
    $$  .style()
        .to( document.head )
        .html(
            "html.non-loaded body { \n" +
                "opacity :0; \n" +
            "} \n" +
            "html body { \n" +
            "    opacity :1; \n" +
            "    transition  :opacity 1s ease-in-out; \n" +
            "} \n"
        );
    //======================================================
    // \\// establishes landing-start-state
    //======================================================
    document.addEventListener( "DOMContentLoaded", home8lemmas__config8spawn );
    return;








    //***********************************************
    // //\\ begins establish home and lemmas
    //***********************************************
    function home8lemmas__config8spawn() 
    {
        //=========================
        // //\\ home8lemmas
        //=========================
        ns.url2conf( fconf );
        fconf.sappId            = fconf.sappId || 'home-pane';
        sapp.siteCaptionHTML    = fconf.siteCaptionHTML;
        sapp.siteCaptionPlain   = fconf.siteCaptionPlain;
        document.title          = sapp.siteCaptionPlain;

        cssmods.initHomePageCSS( cssp, fconf );
        html.buildCommonHTMLBody();
        html.buildHomePage();

        //: spawns lemmaConfig
        var lemmaConfig         = fconf.sappModulesList[ fconf.sappId ];
        sapp.siteCaptionHTML    = lemmaConfig.caption;
        sapp.siteCaptionPlain   = lemmaConfig.caption;
        sapp.ix                 = lemmaConfig.ix; 
        //=========================
        // \\// home8lemmas
        //=========================

        //=========================
        // //\\ home
        //=========================
        if( fconf.sappId === 'home-pane' ) {
            landingFlag_8_nextLemmaButtons();
            sDomN.homeButton$().click();
            return;
        }
        //=========================
        // \\// home
        //=========================

        //=========================
        // //\\ lemmas
        //=========================
        config8run_lemmaModules( lemmaConfig );
        //=========================
        // \\// lemmas
        //=========================
    }

    function landingFlag_8_nextLemmaButtons()
    {
        //--------------------------------------------
        // //\\ remove_landing_state_from_top_html();
        //--------------------------------------------
        //.todmm ... why without 1s transition the
        //.landing flickers?
        //.todm ... use regEx to cooperate with
        //.other frameworks on html-element
        var de = document.documentElement;
        de.className = de.className.replace( 'non-loaded', '' );
        //--------------------------------------------
        // \\// remove_landing_state_from_top_html();
        //--------------------------------------------
        fmethods.does_set_next_lemma_button_event( 'right' );
        fmethods.does_set_next_lemma_button_event( 'left' );
    }
    //***********************************************
    // \\// begins establish home and lemmas
    //***********************************************




    //***********************************************
    // //\\ establishes lemmas
    //***********************************************
    function config8run_lemmaModules( lemmaConfig )
    {
        //------------------------------------------------
        // //\\ prepares sub-application-source-code-files
        //------------------------------------------------
        //.makes common path to folder of files
        var effectiveId     = lemmaConfig.sappCodeReference || lemmaConfig.sappId;
        var codesList       = lemmaConfig.codesList || [];
        codesList.forEach( function( codeItem ) {
            codeItem.src = "src/sub-app/" + effectiveId + "/" + codeItem.src;
        });
        //------------------------------------------------
        // \\// prepares sub-application-source-code-files
        //------------------------------------------------


        nsmethods.loadScripts(
            codesList,
            function()
            {
                ////executes loaded modules from modules registry
                ////after all scripts have been loaded
                ns.eachprop( srg_modules, function( module ) {
                    module();
                });
                ssF.init_conf(); //todo must be before contributor scripts 
                //alternative: ns.url2conf( fconf ); //overrides subapp conf again
                ns.url2conf( sconf );   //overrides subapp conf again

                sDomF.loads_scenarioList8refs8conf__2__essaions_2_exegs( function() {
                        //=======================================
                        // //\\ html and css
                        //=======================================
                        //todm: unclear: which part of content
                        //      this sesction uses, why not full content? ...
                        cssmods.initSiteWideCSS( cssp, fconf );
                        sn('ssCssOrder',ss).list.forEach( function( cssName ) {
                            ns.globalCss.upqueue( cssmod[cssName]( cssp, fconf ) );
                        });
                        //=======================================
                        // \\// html and css
                        //=======================================

                        ////perhaps this is a cause of random failed load bug: ...
                        ////the body which follows below can be put in cb for image-loader-ajax
                        fmethods.lemmaDom___ess8med8leg_roots_8_menuPH_8_dividor_8_medSRoot(
                            ///this callback goes to final event of loading all media-bg-images:
                            () => {
                                exegs__2__frags_dom_css_mjax_tpanch_initapp_menu_evs_capture();
                                landingFlag_8_nextLemmaButtons();
                            }
                        );
                });
            }
        );
    }

    function exegs__2__frags_dom_css_mjax_tpanch_initapp_menu_evs_capture()
    {
        sDomF.exegs_2_frags(); //to active-areas
        sDomF.frags__2__dom_css_mjax_tpanchors();
        sapp.init_sapp();
        sDomF.populateMenu();
        ns.haf( sapp, 'finish_sapp_UI' )(); 
        sapp.isInitialized = true;
        fmethods.setupEvents();

        //todm:
        //sets (for second time) initial media depending on amode,
        //? the first time was needed because of menu needs media in lemmas 2,3
        //following resize should fix any graphic misfits
        ns.haf( ssF, 'amode_4_model8media' )( null, 'media' );

        //.todm code prolifiration with "setStates_when_entering..." for upcreate ...
        //.includes sapp.up-create();
        fmethods.finish_Media8Ess8Legend_resize__upcreate(
            null, null, !!'doDividorSynch');


        ///.this is a patch: the cause and real solution is not known;
        ///.and it still does not work for l2,3
        ///
        ///.this timeout is vital: it allows to hovering-arrows to get to their
        ///.place: othewise, the img.style.top for draggee is wrong which
        ///.moves arrows to the top edge of media which is wrong
        ///.the value of timeout seems also vital for l9
        //setTimeout( fmethods.full Resize, 50 ); 50 is enough for l9
        setTimeout( fmethods.fullResize, 500 );
        fmethods.setupCapturerEvents();
    }
    //***********************************************
    // \\// establishes lemmas
    //***********************************************


}) ();

