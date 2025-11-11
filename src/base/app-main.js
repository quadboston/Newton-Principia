//\\// Application Entry
//     recommended: /doc/landing-code-overview.txt


( function() {
    var {
        ns, sn, $$, cssp, eachprop, nspaste, haff, has, haz, nsmethods, html,
        userOptions, fapp, sapp, fconf, sconf, engCssMs, fmethods, sDomF, sDomN,
        fixedColorsOriginal,
        srg_modules, amode,
        //:nearly a patch
        stdMod, ssD, ssF, wrkwin, lowId2topics,
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

            //duplicate with css file ... dom-roots.css
            //"    height : 100vh \n" +
            "    opacity :1; \n" +
            "    transition  :opacity 1s ease-in-out; \n" +
            "} \n"
        );
    //======================================================
    // \\// establishes landing-start-state
    //======================================================

    //******************************************************
    //main application entry
    document.addEventListener( "DOMContentLoaded", LANDING_I___app_main );
    //******************************************************
    return;


    //***********************************************
    // //\\ begins establish home and lemmas
    //***********************************************
    function LANDING_I___app_main() 
    {
        // each page is independent so this gets re-run on each page load
        // console.log('domContentLoaded - app_main');

        //=========================
        // //\\ home8lemmas
        // //\\ sets ids and titles
        //===============================
        // if fconf.sappId is undefined, sets it to 'home-pane' (otherwise it's the page id, ex b1sec1lemma6)
        sn( 'sappId', fconf, 'home-pane' ); 
        ssF.spawns_lemsDefArr(); // contents/content-list.js to fconf
        fapp.doesConfigLemma(); // adds colors etc to sconf from lemma-conf.js
        fapp.lemmaDef       = fconf.sappId2lemmaDef[ fconf.sappId ];
        document.title      = fapp.lemmaDef.caption;
        fconf.sappIdUnCamel = nsmethods.camelName2cssName( fconf.sappId );
        //=========================
        // \\// sets ids and titles
        //===============================

        //===============================
        // //\\ preconstructs home8lemmas
        // adds bsl-approot, bsl-home-pane, page-top-nav-bar to DOM
        //===============================
        html.builds_body_4_home8lemma();
        html.builds_homePane();
        //===============================
        // \\// preconstructs home8lemmas
        // \\// home8lemmas
        //=========================

        if( fconf.sappId === 'home-pane' ) {
            //// home. apparently does not do any modules landing-load
            LANDING_VII___landingFlag_8_nextLemmaButtons();
            sDomN.landingPage8Options_click( !!'goToFrontPage' );
            ns.doScrollToHash();
        } else {
            sDomN.landingPage8Options_click( !'goToFrontPage' );
            if( !haz( fconf, 'lemmaHasHomeButton' ) ) {
                sDomN.homeButton$.css( 'display', 'none' );
            }
            /// removed LANDING_II___main_lemma() bc it was just making redundant calls
            ns.globalCss.clearStyleTag( 'home' )
            LANDING_III___config8run_lemmaModules(); //no home-pane modules
        }
    }
    //***********************************************
    // \\// begins establish home and lemmas
    //***********************************************

    //***********************************************
    // //\\ establishes lemmas (loads page specific scrips)
    //***********************************************
    function LANDING_III___config8run_lemmaModules()
    {
        fconf.lemmaCode_fullpath = fconf.pathToContents + "/" +
                                   fapp.lemmaDef.sappId;
        //-------------------------------------------------
        // //\\ prepares sub-application-source-code-files,
        //      sub-application === lemma
        //-------------------------------------------------
        var codesList;
        nsmethods.loadScripts(
            [
                { src : fconf.lemmaCode_fullpath + "/lemma-conf.js" }
            ],
            landing_III_cb,
        );
        //-------------------------------------------------
        // \\// prepares sub-application-source-code-files,
        //-------------------------------------------------
        return;

        function landing_III_cb()
        {
            //"ancestor" scripts list now is "inside" of function fapp.lemmaConfig
            //deep copy, original does not change
            ns.paste( fapp.lemmaDef, fapp.lemmaConfig() );
            //establishes array if missed
            sn( 'codesList', fapp.lemmaDef, [] );
            fconf.ancestor_ref = ns.haz( fapp.lemmaDef, 'sappCodeReference' );
            fconf.ancestorCode_fullpath = fconf.pathToContents + "/" +
                                          fconf.ancestor_ref;
            // //\\ loads jscodes and continues
            if( fconf.ancestor_ref ) {
                ////preloads referenced jscodes before own jscodes
                nsmethods.loadScripts(
                    [
                        { src : fconf.ancestorCode_fullpath + "/lemma-conf.js"
                        }
                    ],
                    function() {
                        ////uses own placeholder of-jscodes-list or adds missed
                        fapp.jsCodesList = sn( 'codesList', fapp.lemmaConfig(), [] );
                        //loads own jscodes and continues landing
                        LANDING_IV___loadLemmaJSCodes();
                    }
                );

            } else {
                fapp.jsCodesList = [];
                ////loads own jscodes and continues landing
                LANDING_IV___loadLemmaJSCodes();
            }
            // \\// loads jscodes and continues
        }

        //loads images (if any) and then JS-scripts for specific lemma
        function LANDING_IV___loadLemmaJSCodes()
        {
            let imagesToLoadList = fapp.lemmaDef.imagesToLoadList;
            if( imagesToLoadList ) {
                ////loads images first
                eachprop( imagesToLoadList, function( codeItem ) {
                    codeItem.src = fconf.lemmaCode_fullpath + "/img/" + codeItem.src;
                });
                ///loads images first and then follows to load scripts
                nsmethods.loadImages( loadsJSScripts, imagesToLoadList );
            } else {
                ///follows to load scripts
                loadsJSScripts();
            }

            function loadsJSScripts()
            {
                //c cc( 'ancestor jsCodesList=', fapp.jsCodesList );
                ///we complete paths for ancestor list if any
                fapp.jsCodesList.forEach( function( codeItem ) {
                    codeItem.src = fconf.ancestorCode_fullpath + "/js/" + codeItem.src;
                });

                //c cc( 'descendant codes=', fapp.lemmaDef.codesList );
                ///adds ancestors (if any) to descendants(if any) and accumulates
                ///result in fapp.jsCodesList
                fapp.lemmaDef.codesList.forEach( function( codeItem ) {
                    fapp.jsCodesList.push({
                        src : fconf.lemmaCode_fullpath + "/js/" + codeItem.src
                        });
                });
                //fapp.jsCodesList has ancestor and desc list merged and
                //polished for fapp.lemmaDef.sappId
                //goes again to web site and gets all js-codes for lemma:
                nsmethods.loadScripts( fapp.jsCodesList, loadsJSScripts_atLastLoadedScript );

                function loadsJSScripts_atLastLoadedScript()
                {
                    //----------------------------------------------------------
                    ///module can be executed right after load if it is safe or
                    ///module can register subs. in setModule and execute them
                    ///here right below after all lemma-modules are loaded,
                    ///
                    ///executes loaded modules from modules registry
                    ///this is a second and a last round of executing setModule for
                    ///lemma modules
                    eachprop( srg_modules, function( setModule, wwProp ) {
                        setModule();
                    });
                    //----------------------------------------------------------

                    //==========================================================
                    // //\\ init_conf for models
                    //==========================================================
                    //adds common-module data to fconf.sconf
                    ssF.init_conf();
                    //modifies appearance effect depending on user options
                    fconf.timeToShowOriginalDiagram_effective =
                        userOptions.usingBackgroundImage() ? fconf.timeToShowOriginalDiagram : 1;

                    {
                        haff( stdMod, 'init_conf' );
                        //expansion patch: todm: make function for this:
                        //unscaled mediaSize = originalMod2inn_scale * modelSize, 
                        sconf.originalMod2inn_scale = sconf.mod2inn_scale;
                        //can add this here: doesImproveSconf();
                        !haz( sconf, 'dontRun_ExpandConfig' ) &&
                                ssF.doExpandConfig();
                        ns.url2conf( sconf );
                    }
                    ns.url2conf( fconf ); //overriding url-query one more time
                    //==========================================================
                    // \\// init_conf for models
                    //==========================================================


                    sDomF.creates_mainWorkspace_domRoots();
                    fmethods.populate_mediaSuperRoot(); //rename: ?? popul sim Super Scene
                    sDomF.cre_simscene8svg8legendIIslider();

                    ///loads Book
                    ssF.LANDING_V___loads_professorList8cont_8_buildsSubexegs(
                        function() {
                            ////exegs are ready now,

                            //this place looks like
                            //the best to establish initial topics,
                            //then additional topics will be extracted from exegs
                            var wwCase = sDomF.topicIdUpperCase_2_underscore;
                            //pppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
                            // //\\ central step
                            //pppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
                            //pastes ssD['fixed-colors'] into l caseId2allLemTopics
                            //ssD['fixed-colors'] - goes from JS-code and book's text,
                            //l caseId2allLemTopics is empty at this moment,
                            eachprop( fixedColorsOriginal, ( colorArray, camelId ) => {
                                var lowId = wwCase( camelId );
                                lowId2topics[ lowId ] = {
                                    'fixed-color' : colorArray,
                                    camelId,
                                    lowId, 
                                };
                            });
                            //pppppppppppppppppppppppppppppppppppppppppppppppppppppppppp
                            // \\// central step
                            //pppppppppppppppppppppppppppppppppppppppppppppppppppppppppp

                            ////executes loaded "proferssor's scripts"
                            //=======================================
                            // //\\ html and css
                            //=======================================
                            //set up css that requires js vars
                            engCssMs.dispatches_css();

                            //...........................................................

                            //=======================================
                            // \\// html and css
                            //=======================================

                            ////perhaps this is a cause of random failed load bug: ...
                            ////the body which follows below can be put in
                            ////cb for image-loader-ajax
                            fmethods.cre__medRootDetails(
                                ///this callback goes to final event of
                                ///loading all media-bg-images:
                                () => {
                                    LANDING_VI___exegs_2_frags8majorInit();
                                    LANDING_VII___landingFlag_8_nextLemmaButtons();
                                    ns.doScrollToHash();
                                }
                            );
                        }
                    );
                }
            }
        }
    }

    //does: exegs__2__frags_dom_css_mjax_tpanch_initapp_menu_evs_capture
    function LANDING_VI___exegs_2_frags8majorInit()
    {
        ssF.exegs_2_frags(); //to active-areas
        ssF.frags__2__dom_css_mjax_tpanchors();

        ///inits effective or empty astate_2_.... functions
        sapp.init_astate2sapp();


        //this works for outdated-lemmas ... l9, l2, (l3) l21, l20,
        //new lemmas may use stdMod ns,
        //note, here, legend is created too early, before model,
        ns.haff( ssF, 'create_digital_legend' );

        stdModPatch();
        sapp.init_sapp();

        sDomF.populateMenu();
        ns.haff( sapp, 'finish_sapp_UI' ); 
        nsmethods.establishesContentTriggers();
        sapp.isInitialized = true;
        fmethods.setupEvents();

        // todo: this isn't really necessary here, 
        // except that L6, L7, L8 tables are misaligned on page load without it...
        wrkwin.start8finish_media8Ess8Legend_resize__upcreate(null, !!'doDividorSynch');

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
    function LANDING_VII___landingFlag_8_nextLemmaButtons()
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
        //      remove this fix, reproduce 
        //      vertical-misplacement-bug and solve it thoroughtly:
        document.body.scrollTop = 0; //todo ... type number? not a "0px"
    }

    function stdModPatch()
    {
        //======================================================
        // todm: patch: generates pars needed possibly for
        //       d8d creation and decorational points
        //       before first resize set these pars
        //       appar. needed for:
        //              dom2model-scales.js::out2inn() and 
        //              dom2model-scales.js::inn2outparent()
        stdMod.bgImgOffset = sDomN.bgImgOffset;
        stdMod.bgImgW = sDomN.bgImgW;
        //======================================================

        //================================================================
        // **api simSceSvg_narrowestAsp
        //Asp when scene svg is shrinked to minimal possible value,
        //when svg-width fits bg image width:
        //todo rename with simSceSvg_narrowestAsp
        stdMod.sceBgAspR = stdMod.simSceSvg_narrowestAsp =
                        ( haz( sconf, 'innerMediaHeight' ) ||
                            sconf.innerMediaHeight )
                        /
                        ( haz( sconf, 'innerMediaWidth' ) ||
                            sconf.innerMediaWidth )
                        ;
        //================================================================
    }
})();