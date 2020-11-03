

all lemmas are added
    amode2lemma
not all have
    "runExpandConfig" - this is a flag

l1, l2,3, l9 have obsolete and own
    function init_sapp()
other lemmas have common and generic
    base/lemma/main.js


App initialtion schema: conceptual steps labeled with "*":

    * html, header, core JavaScript
        establishes fconf.sappId
        defines fconf.sappModulesList[ fconf.sappId ];

    - if sappId === 'home-pane' then stops     
    - otherwise                      continues as outlined below:
        ///does first round of executing setModule for modules
        **************************************************    
        * sapp-modules
          from ...modulesList ( in nsmethods.loadScripts )
          will be loaded
        **************************************************    
                ////does second round of executing setModule for modules
                ////executes setModule() for each module
                ssF.init_conf(); ??? wis?
                ns.url2conf( sconf );

                ***************************************    
                * "proferssor's scripts" list and files
                  will be loaded in two p-steps
                ***************************************    

                  sDomF.loads_scenarioList8refs8conf__2__essaions_2_exegs(
                        p-step I: list
                                        { id: 'contents-list.txt', ...
                             p-step II: files
                                  loads_scenarioList8refs8conf__2__essaions_2_exegs
                                  ///This ajax-load takes contents-files, concatenates them, and calls
                                  ///final subroutine, essaions2exegs.
                                  contentsList_2_essaions_2_exegs( conf_files_list )
                                      nsmethods.loadAjaxFiles(

                                          * essaions2exegs( conf_files_list );
                                              * sets sapp.amodel_initial and amode
                                              * presets exegs[ theorion_id ][ aspect_id ] like =
                                                {
                                                    bodyscript:wPreText, essayHeader:essayHeader // essayHeader = JSON.parse( wHeader )
                                                                                                 // clears up essayHeader.submodel
                                                };

                                              ??? and possibly set into menu sconf.asp8theor_menus[ mcat_id ].default
                                      upon load does this:

                                         ******************************************************************
                                           builds GUI/DOM placeholders for study-models and media
                                         * lemmaDom___ess8med8leg_roots_8_menuPH_8_dividor_8_medSRoot(
                                         ******************************************************************
                                                * creates essaion pane
                                                * creates media superroot
                                                    cssp + '-media-superroot';
                                                    sDomN.medSuperroot$ ... to fapp.fappRoot$
                                                * model data legend
                                                * build_menu_top_leafs_placeholders();
                                                * createDividorResizer();
                                                * populate_mediaSuperRoot( bgImagesAreLoaded_cb );
                                                    //top media controls
                                                        sDomN.topMediaControls$ 
                                                            .addClass( 'top-media-controls' )
                                                            .to( sDomN.medSuperroot$ )
                                                        helpBoxAboveMedia$
                                                    //change tools button
                                                    //change model data button
                                                    //sets capture button
                                                    //sets studylab button
                                                    videoListPopup_button_onModelPane$
                                                    idleHelpButton$
                                                    helpBoxText$
                                                    // media root ... medRoot$ ... addClass( cssp + '-media-root' )
                                                    changeModeButton$
                                                    ...
                                                    // study image and submodel
                                                            ns.eachprop( exegs, ( theor, tkey ) => {
                                                                ns.eachprop( theor, ( aspect, akey ) => {
                                                                    var imgRk = aspect.imgRk;
                                                                        //creates study-image for each theor/aspect:
                                                                        imgRk.dom$ = $$
                                                    sDomF.create8prepopulate_svg();
                                                    //.patches l2
                                                    ssF.continue_create_8_prepopulate_svg && ssF.continue_create_8_prepopulate_svg();
                                                    ssF.create_digital_legend && ssF.create_digital_legend();

                                                    if( fconf.ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED ) {
                                                        sDomF.create_original_picture_vis_slider();
                                                    }
                                             loads media-bg-images and upon their load:

                                                * exegs__2__frags_dom_css_mjax_tpanch_initapp_menu_evs_capture

                                                        **********************************************
                                                        * finally parses "professor's scripts"
                                                          sDomF.exegs_2_frags(); //to active-areas
                                                          sDomF.frags__2__dom_css_mjax_tpanchors();
                                                        **********************************************

                                                        sapp.init_astate2sapp(); //appends state-functions to submodels:


                                                        **********************************************
                                                          finally builds study-model and media 
                                                        * sapp.init_sapp(); //core subapplication init
                                                        **********************************************

                                                        * study-model-menu: sDomF.populateMenu();

                                                        ns.haf( sapp, 'finish_sapp_UI' )(); 
                                                        sapp.isInitialized = true;

                                                        fmethods.setupEvents();
                                                        ns.haf( studyMods[ amode['submodel'] ], 'amode2lemma' )( 'media' );
                                                        fmethods.finish_Media8Ess8Legend_resize__upcreate(
                                                            null, null, !!'doDividorSynch');
                                                        setTimeout( fmethods.fullResize, 500 );
                                                        fmethods.setupCapturerEvents();
           landingFlag_8_nextLemmaButtons();

