//these modules run before:
// ns.url2conf( fconf );
// /contents/config/
//   full.conf.js works before this code
//   sapp.conf.js works before this code

//\\// Application Entry
(function(){
    var {
        ns, sn, $$, cssp, eachprop, nspaste, haff, has, haz, nsmethods, html,
        userOptions, fapp, sapp, fconf, sconf, engCssMs, fmethods, sDomF, sDomN,
        topicColors_repo_camel2col,
        srg_modules, amode,
        //:nearly a patch
        stdMod, ssD, ssF, wrkwin, lowtpid_2_glocss8anchorRack,
    } = window.b$l.apptree({});


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
    //main application entry
    document.addEventListener( "DOMContentLoaded", I__front_page );
    return;


    //***********************************************
    // //\\ begins establish home and lemmas
    //***********************************************
    function I__front_page()
    {
        //=========================
        // //\\ home8lemmas
        // //\\ sets ids and titles
        //===============================
        sn( 'sappId', fconf, 'home-pane' );
        ssF.spawns_lemsDefArr();
        fapp.lemmaDef       = fconf.sappId2lemmaDef[ fconf.sappId ];
        document.title      = fapp.lemmaDef.caption;
        fconf.sappIdUnCamel = nsmethods.camelName2cssName( fconf.sappId );
        //=========================
        // \\// sets ids and titles
        //===============================

        //===============================
        // //\\ preconstructs home8lemmas
        //===============================
        html.builds_body_4_home8lemma();
        html.builds_homePane();
        //===============================
        // \\// preconstructs home8lemmas
        // \\// home8lemmas
        //=========================

        if( fconf.sappId === 'home-pane' ) {
            //// home. apparently does not do any modules landing-load
            VII__finalize_app_and_cosmetics();
            sDomN.landingPage8Options_click( !!'goToFrontPage' );
            ns.doScrollToHash();
        } else {
            sDomN.landingPage8Options_click( !'goToFrontPage' );
            if( !haz( fconf, 'lemmaHasHomeButton' ) ) {
                sDomN.homeButton$.css( 'display', 'none' );
            }
            //// lemma
            II__starts_lemma();
        }
    }

    function II__starts_lemma()
    {
        //=============================================================
        // does first round (of two) of executing setModule for modules
        //=============================================================
        eachprop( srg_modules, function( setModule, debugIdleName ) {
            //// if order insignificant: todo needless?:
            //// can? be executed when module loaded right away
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
        III__config8run_lemmaModules(); //no home-pane modules
    }
    //***********************************************
    // \\// begins establish home and lemmas
    //***********************************************

    ///-------------------------------------------------
    /// prepares sub-application-source-code-files,
    ///-------------------------------------------------
    function III__config8run_lemmaModules()
    {
        fconf.lemmaCode_fullpath = fconf.pathToContents + "/" +
                                   fapp.lemmaDef.sappId;
        nsmethods.loadScripts(
            [
                //for the first time creates property fapp.lemmaConfig,
                //will be overriden by ancestor-lemma,
                { src : fconf.lemmaCode_fullpath + "/lemma-conf.js" }
            ],
            function (){
                //does deep copy of own "local lemma config" to lemmaDef
                nspaste( fapp.lemmaDef, fapp.lemmaConfig() );
                //establishes array if missed
                sn( 'codesList', fapp.lemmaDef, [] );
                fconf.ancestor_ref = haz( fapp.lemmaDef, 'sappCodeReference' );
                if( fconf.ancestor_ref ) {
                    fconf.ancestorCode_fullpath =
                        fconf.pathToContents + "/" + fconf.ancestor_ref;
                    //c cc( "ancestor' root=" + fconf.ancestorCode_fullpath );
                    ////preloads ancestor JS modules and continues with IV,
                    ////overrides own fapp.lemmaConfig which is safe becase
                    ////own modules list is already preserved
                    ////in fapp.lemmaDef
                    nsmethods.loadScripts(
                        [
                            { src : fconf.ancestorCode_fullpath + "/lemma-conf.js"
                            }
                        ],
                        function() {
                            //adds ancestor modules codesList
                            //and continues landing
                            IV__loads_img8ancestors8own(
                                //sanitizes ancestor's list if none
                                sn( 'codesList', fapp.lemmaConfig(), [] )
                            );
                        }
                    );

                } else {
                    //continues landing on own codes list
                    IV__loads_img8ancestors8own( [] );
                }
            }
        );
    }

    //loads images (if any) and then JS-scripts for specific lemma
    function IV__loads_img8ancestors8own ( ancestor_jsModules ){
        let imagesToLoadList = fapp.lemmaDef.imagesToLoadList;
        if( imagesToLoadList ) {
            //prepares path to load images
            eachprop( imagesToLoadList, function( codeItem ) {
                codeItem.src = fconf.lemmaCode_fullpath +
                                "/img/" + codeItem.src;
            });
            //loads images first and then calls back
            //to load scripts
            nsmethods.loadImages( loads_ancestors8own, imagesToLoadList );
        } else {
            loads_ancestors8own();
        }

        function loads_ancestors8own (){
            const all_jsModules = ancestor_jsModules;
            //c cc( 'ancestor ancestor_jsModules=', ancestor_jsModules );

            ///we complete paths for ancestor list if any,
            //if fconf.ancestorCode_fullpath is undfined, then
            //this is safe because ancestor_jsModules is empty,
            ancestor_jsModules.forEach( function( codeItem ) {
                codeItem.src = fconf.ancestorCode_fullpath +
                               "/js/" + codeItem.src;
            });

            //c cc( 'descendant codes=', fapp.lemmaDef.codesList );
            ///adds ancestors (if any) to own (if any) and accumulates
            ///result in all_jsModules
            fapp.lemmaDef.codesList.forEach( function( codeItem ) {
                all_jsModules.push({
                    src : fconf.lemmaCode_fullpath + "/js/" + codeItem.src
                });
            });
            //all_jsModules has ancestor and desc list merged and
            //polished for fapp.lemmaDef.sappId,
            //goes again to web site and gets all own and ancestor
            //js-modules contents for lemma:
            nsmethods.loadScripts(
                all_jsModules,
                cb__activates_modules8lemma
            );
        }
    }

    function cb__activates_modules8lemma (){
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
        // //\\ init_conf for lemma model
        //==========================================================
        //adds common-module data to fconf.sconf
        ssF.init_conf();
        //modifies appearance effect depending on user options
        fconf.timeToShowOriginalDiagram_effective =
            userOptions.usingBackgroundImage() ?
            fconf.timeToShowOriginalDiagram : 1;
        haff( stdMod, 'init_conf' );
        //expansion patch: todm: make function for this:
        //unscaled mediaSize = originalMod2inn_scale * modelSize,
        sconf.originalMod2inn_scale = sconf.mod2inn_scale;
        //can add this here: doesImproveSconf();
        
        //all lemmas except 1, and 5 are normalized and do not
        //need this flag:
        !haz(sconf, 'dontRun_ExpandConfig') && ssF.doExpandConfig();

        ns.url2conf( sconf );
        ns.url2conf( fconf );
        //==========================================================
        // \\// init_conf for lemma model
        //==========================================================

        sDomF.creates_mainWorkspace_domRoots();
        //rename: ?? popul sim Super Scene
        fmethods.populate_mediaSuperRoot();
        sDomF.cre_simscene8svg8legendIIslider();
        ///loads Book
        ssF.LANDING_V___loads_professorList8cont_8_buildsSubexegs(
            cb__LANDING_VI
        );
    }

    function cb__LANDING_VI (){
        ////exegs are ready now,
        ccc('LANDING_VI');

        //this place looks like
        //the best to establish initial topics,
        //then additional topics will be extracted from exegs
        var tpid2low = sDomF.tpid2low;
        //ppppppppppppppppppppppppppppppppppppppppppppppp
        // //\\ central step
        //ppppppppppppppppppppppppppppppppppppppppppppppp
        //pastes ssD['fixed-colors'] into
        //l caseId2allLemTopics
        //ssD['fixed-colors'] - goes from JS-code and
        //book's text,
        //l caseId2allLemTopics is empty at this moment,
        eachprop( topicColors_repo_camel2col,
                    ( colorArray, camelId ) => {
            var lowId = tpid2low( camelId );
            lowtpid_2_glocss8anchorRack[ lowId ] = {
                tpcolarr : colorArray,
                camelId,
                lowId,
            };
        });
        //ppppppppppppppppppppppppppppppppppppppppppppppp
        // \\// central step
        //ppppppppppppppppppppppppppppppppppppppppppppppp

        ////executes loaded "proferssor's scripts"
        //=======================================
        // //\\ html and css
        //=======================================
        //set up css that requires js vars
        engCssMs.dispatches_css();
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
                VI__exegs2frags_8_initApp();
                VII__finalize_app_and_cosmetics();
                ns.doScrollToHash();

                ///.this is a patch: the cause and real solution
                ///is not known;
                ///.and it still does not work for l2,3
                ///
                ///.this timeout is vital: it allows to hovering-arrows
                ///to get to their
                ///.place: othewise, the img.style.top for
                ///draggee is wrong which
                ///.moves arrows to the top edge of media which is wrong
                ///.the value of timeout seems also vital for l9
                //setTimeout( fmethods.full Resize, 50 );
                //50 is enough for l9
                setTimeout( fmethods.fullResize, 500 );
            }
        );
    }

    //does: exegs__2__frags_dom_css_mjax_tpanch_initapp_menu_evs_capture
    function VI__exegs2frags_8_initApp()
    {
ccc( 'VI VI__exegs2frags_8_initApp');
        ssF.exegs_2_frags(); //to active-areas
        ssF.frags__2__dom_css_mjax_tpanchors();

        ///inits effective or empty astate_2_.... functions
        sapp.init_astate2sapp();

        // init legends here to ensure they are in DOM when layout it calculated
        // todo: some pages use stdMod, others ssF - should be same
        ns.haff( stdMod, 'create_digital_legend' );
        //this works for outdated-lemmas ... l9, l2, (l3) l21, l20,
        //new lemmas may use stdMod ns,
        //note, here, legend is created too early, before model,
        ns.haff( ssF, 'create_digital_legend' );

        //======================================================
        // //\\ stdModPatch
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
            sconf.innerMediaHeight/sconf.innerMediaWidth;
        //======================================================
        // \\// stdModPatch
        //======================================================

        sapp.init_sapp();

        sDomF.populateMenu();
        ns.haff( sapp, 'finish_sapp_UI' );
        nsmethods.establishesContentTriggers();
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
        wrkwin.start8finish_media8Ess8Legend_resize__upcreate(
            null, !!'doDividorSynch');

        ///.this is a patch: the cause and real solution is not known;
        ///.and it still does not work for l2,3
        ///
        ///.this timeout is vital: it allows to hovering-arrows to get to their
        ///.place: othewise, the img.style.top for draggee is wrong which
        ///.moves arrows to the top edge of media which is wrong
        ///.the value of timeout seems also vital for l9
        //setTimeout( fmethods.full Resize, 50 ); 50 is enough for l9
        //setTimeout( fmethods.fullResize, 500 );

        fmethods.setupCapturerEvents();
    }

    function VII__finalize_app_and_cosmetics (){
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
})();
