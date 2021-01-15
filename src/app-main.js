//\\// Application Entry
//     recommended: /doc/landing-code-overview.txt


( function() {
    var {
        ns,
        $$,
        cssp,
        sn,
        eachprop,
        haff,
        has,
        haz,
        cssmods,
        html,

        nsmethods,

        fapp,
        fmethods,
        fconf,
        sconf,

        sapp,
        srg_modules,
        sDomF,
        sDomN,
        studyMods,
        amode,

        //:nearly a patch
        ss,
        ssD,
        ssF,
        cssmod,
        wrkwin,
        normId2topic,
    } = window.b$l.apptree({
    });



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

    //******************************************************
    //main application entry
    document.addEventListener( "DOMContentLoaded", app_main );
    //******************************************************

    return;








    //***********************************************
    // //\\ begins establish home and lemmas
    //***********************************************
    function app_main() 
    {
        //=========================
        // //\\ home8lemmas
        // //\\ sets ids and titles
        //===============================
        ns.url2conf( fconf );
        fconf.pathToStem        = fconf.pathToStem ? fconf.pathToStem + '/' : '';
        fconf.sappId            = fconf.sappId || 'home-pane';

        //pulls content-list.js::sappModulesArray
        var lemmaConfig         = fconf.sappModulesList[ fconf.sappId ];
        sapp.siteCaptionHTML    = lemmaConfig.caption;
        sapp.ix                 = lemmaConfig.ix; 
        document.title          = lemmaConfig.caption;
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

        if( fconf.sappId === 'home-pane' ) {
            //// home. apparently does not do any modules landing-load
            landingFlag_8_nextLemmaButtons();
                sDomN.homeButton$().click();
            ns.doScrollToHash();
        } else {
            if( !haz( fconf, 'lemmaHasHomeButton' ) ) {
                sDomN.homeButton$.css( 'display', 'none' );
            }
            //// lemma
            main_lemma( lemmaConfig );
        }
    }



    function main_lemma( lemmaConfig )
    {
        //====================================================
        // does first round of executing setModule for modules
        //====================================================
        eachprop( srg_modules, function( setModule ) {
            //// if order insignificant: todo needless?: can? be executed when module loaded right away
            setModule();
        });
        ///purges list to avoid executing setModule twice when lemma's
        ///modules are loaded
        Object.keys( srg_modules ).forEach( mkey => {
            delete srg_modules[ mkey ];
        });


        //====================================
        // further-modules-loads: lemmas
        //====================================
        ns.globalCss.clearStyleTag( 'home' )
        config8run_lemmaModules( lemmaConfig ); //no home-pane modules
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
        var lemmaSourcePath;
        var codesList;
        nsmethods.loadScripts(
            [
                { src : fconf.pathToStem + "contents/" + lemmaConfig.sappId + "/lemma-conf.js"
                }
            ],
            function() {
                ns.paste( lemmaConfig, fapp.lemmaConfig() );
                if( ns.haz( lemmaConfig, 'sappCodeReference' ) ) {
                    ////rerouts lemma-sources to "parent-lemma",
                    ////parent-lemma = sappCodeReference,
                    lemmaSourcePath = lemmaConfig.sappCodeReference;
                    nsmethods.loadScripts(
                        [
                            { src : fconf.pathToStem + "contents/" +
                                    lemmaSourcePath + "/lemma-conf.js"
                            }
                        ],
                        function() {
                            ////we don't change lemmaConfig here, but borrow parent's lemma-sources
                            codesList = sn( 'codesList', fapp.lemmaConfig(), [] );
                            loadLemmaJSCodes( lemmaConfig );
                        }
                    );

                } else {
                    codesList = sn( 'codesList', lemmaConfig, [] );
                    lemmaSourcePath = lemmaConfig.sappId;
                    loadLemmaJSCodes( lemmaConfig );
                }
            }
        );
        //------------------------------------------------
        // \\// prepares sub-application-source-code-files
        //------------------------------------------------
        return;


        function loadLemmaJSCodes( lemmaConfig )
        {
            codesList.forEach( function( codeItem ) {
                codeItem.src = fconf.pathToStem + "contents/" +
                               lemmaSourcePath + "/js/" + codeItem.src;
            });
            ssF.runExpandConfig = !lemmaConfig.dontRun_ExpandConfig;
            nsmethods.loadScripts(
                codesList,

                ///this function is called when all modules are loaded
                function()
                {
                    //----------------------------------------------------------
                    ///module can be executed right after load if it is safe or
                    ///module can register subs. in setModule and execute them
                    ///here right below
                    ///
                    ///executes loaded modules from modules registry
                    ///after all lemma-code-modules have been loaded
                    ///does second round of executing setModule for modules
                    eachprop( srg_modules, function( setModule, wwProp ) {
                        //ccc( 'running lemma-code-setModule() for module ' + wwProp );
                        setModule();
                    });
                    //----------------------------------------------------------
 
                    ssF.init_conf(); //todo must be before contributor scripts 
                    //optional new app feature:
                    //must be right after ssF.init_conf:
                    ssF.runExpandConfig && ssF.doExpandConfig();

                    //recall: url goes to both fconf and to fconf.sconf:
                    ns.url2conf( sconf );

                    ///loads Book === loads "proferssor's scripts"
                    ssF.loads_scenarioList8refs8conf8contents__8__builds_exegs8subexegs( function() {

                        ////exegs are ready now,

                        //this place looks like
                        //the best to establish initial topics
                        //then additional topics will be extracted from exegs
                        var wwCase = sDomF.topicIdUpperCase_2_underscore;
                        eachprop( ssD['fixed-colors'], ( colorArray, topicId_ ) => {
                            normId2topic[ wwCase( topicId_ ) ] = {
                                'fixed-color' : colorArray,
                            }
                        });

                        ////executes loaded "proferssor's scripts"
                        //=======================================
                        // //\\ html and css
                        //=======================================
                        //todm: unclear: which part of content
                        //      this sesction uses, why not full content? ...
                        cssmods.init_siteWideLemmaCSS( cssp, fconf );
                        sn('ssCssOrder',ss).list.forEach( function( cssName ) {
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
                                    ns.doScrollToHash();
                            }
                        );
                    });
                }
            );
        }
    }

    function exegs__2__frags_dom_css_mjax_tpanch_initapp_menu_evs_capture()
    {
        ssF.exegs_2_frags(); //to active-areas
        ssF.frags__2__dom_css_mjax_tpanchors();

        ///inits effective or empty astate_2_.... functions
        sapp.init_astate2sapp();

        //.patches l2
        haff( ssF, 'sliderGroupLemma2' );

        //this works for outdated-lemmas ... l9, l2, (l3) l21, l20,
        //new lemmas may use stdMod ns,
        //note, here, legend is created too early, before model,
        ns.haff( ssF, 'create_digital_legend' );

        sapp.init_sapp();
        sDomF.populateMenu();
        ns.haff( sapp, 'finish_sapp_UI' ); 
        sapp.isInitialized = true;
        fmethods.setupEvents();

        //todm:
        //this call is vital for l2: placing it here does
        //restore proportion text/media to normal: othewise media is small;
        //this restoration is still abrupt, media is small then jerks to big;
        //
        //this resize should fix any graphic misfits
        //.todm code proliferation with "setStates_when_entering..." for upcreate ...
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

