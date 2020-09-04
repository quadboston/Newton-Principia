//\\// Application Entry
//     recommended: /doc/landing-code-overview.txt


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
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    //:nearly a patch
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var cssmod      = sn('ssCssModules',ss);
    var wrkwin      = sn('wrkwin',ssD); //work window




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
        // //\\ sets ids and titles
        //===============================
        ns.url2conf( fconf );
        fconf.sappId            = fconf.sappId || 'home-pane';
        var lemmaConfig         = fconf.sappModulesList[ fconf.sappId ];
        sapp.siteCaptionHTML    = lemmaConfig.caption;
        sapp.ix                 = lemmaConfig.ix; 
        document.title          = fconf.sappId === 'home-pane' ?
                                  fconf.siteCaptionPlain :
                                  lemmaConfig.caption;
        //=========================
        // \\// sets ids and titles
        //===============================

        //===============================
        // //\\ preconstructs home8lemmas
        //===============================
        cssmods.adds_home8lemma_baseCss();
        html.builds_body_4_home8lemma();
        html.builds_homePane();
        //===============================
        // \\// preconstructs home8lemmas
        // \\// home8lemmas
        //=========================


        //=================================================
        // home
        // apparently does not do any modules landing-load
        //=================================================
        if( fconf.sappId === 'home-pane' ) {
            landingFlag_8_nextLemmaButtons();
            sDomN.homeButton$().click();
            return;
        }

        //====================================
        // further-modules-loads: lemmas
        //====================================
        ns.globalCss.clearStyleTag( 'home' )
        config8run_lemmaModules( lemmaConfig );
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
                ns.eachprop( srg_modules, function( setModule ) {
                    setModule();
                });
                ssF.init_conf(); //todo must be before contributor scripts 
                //alternative: ns.url2conf( fconf ); //overrides subapp conf again
                ns.url2conf( sconf );   //overrides subapp conf again

                ///loads "proferssor's scripts"
                sDomF.loads_scenarioList8refs8conf__2__essaions_2_exegs( function() {
                    ////executes loaded "proferssor's scripts"
                    //=======================================
                    // //\\ html and css
                    //=======================================
                    //todm: unclear: which part of content
                    //      this sesction uses, why not full content? ...
                    cssmods.init_siteWideLemmaCSS( cssp, fconf );
                    sn('ssCssOrder',ss).list.forEach( function( cssName ) {
                        //ns.globalCss.upqueue( cssmod[cssName]( cssp, fconf ) );

                        //we do first check existence of the function because of
                        //module can be a blank stub and function is missed
                        var css = ns.haf( cssmod, cssName )( cssp, fconf );
                        //if stub is valid, do add css
                        css && ns.globalCss.update( css );
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
        sapp.init_astate2sapp();

        ///this is too early
        //ns.eachprop( studyMods, ( stdMod, modName ) => {
        //    sDomF.mediaMoverPoint();
        //});

        sapp.init_sapp();
        sDomF.populateMenu();
        ns.haf( sapp, 'finish_sapp_UI' )(); 
        sapp.isInitialized = true;
        fmethods.setupEvents();

        //todm:
        //this call is vital for l2: placing it here does
        //restore proportion text/media to normal: othewise media is small;
        //this restoration is still abrupt, media is small then jerks to big;
        //
        //this resize should fix any graphic misfits
        //.todm code prolifiration with "setStates_when_entering..." for upcreate ...
        //.includes sapp.up-create();
        wrkwin.finish_Media8Ess8Legend_resize__upcreate(
            null, !!'doDividorSynch');

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


    ///apparently does not do any modules landing-load
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

        //todo: do observe does it fix vertical-misplacement-bug?
        //      remove this fix, reproduce vertical-misplacement-bug and solve it thoroughtly:
        document.body.scrollTop = 0; //todo ... type number? not a "0px"
    }

}) ();

