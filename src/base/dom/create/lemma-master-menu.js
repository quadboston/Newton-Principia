/*
        vital jargon:
            mcat_id = "theorion", "aspect"
            menu tree is like:
                mcat_id = "theorion"
                              scat_id = claim, proof, ...           
                mcat_id = "aspect"
                              scat_id = latin, english, hypertext, ...           
*/


( function() {
    var {
        ns, sn, $$, haff,
        eachprop, haz,
        sconf, fconf,
        fapp, sapp, ss,
        fmethods,
        ssF,
        sDomF, sDomN,
        studyMods,
        amode,
        wrkwin,
        exegs,
    } = window.b$l.apptree({
    });
    sDomF.populateMenu                      = populateMenu;
    sDomF.menu2lemma                        = menu2lemma;
    sDomF.state2subessayMenu                = state2subessayMenu;
    sDomF.build_menu_top_leafs_placeholders = build_menu_top_leafs_placeholders;
    sDomF.tellActivityEngine_that_userStartedSubessay = tellActivityEngine_that_userStartedSubessay;
    return;








    //====================================
    // //\\ populate menu
    //      creates menu from config list,
    //      at this moment, exegs are built,
    //====================================
    function populateMenu(
    ){
        ns.eachprop( sconf.asp8theor_menus, function( subcatsMenu, mcat_id ) {
            build_teaf__localfun( mcat_id, subcatsMenu,
            );
        });

        //:sets up a state and theorion-menu
        var submItem = sconf.asp8theor_menus.theorion.duplicates[ amode.theorion ];
        do_select_leaf__localfun( submItem.leafRk, !'amodel2app_8_extraWork' );

        //this does extra work ... skip this:
        //var submItem = sconf.asp8theor_menus.aspect.duplicates[ amode.aspect ];
        //do_ select_leaf__localfun( submItem.leafRk, !'amodel2app_8_extraWork' );

        //:sets up aspect menu
        var submItem = sconf.asp8theor_menus.aspect.duplicates[ amode.aspect ];
        submItem.leafRk.li$.addClass( 'chosen' );
        submItem.leafRk.decorOfShuttle$.a('class','shape shuttle shuttle-'+submItem.leafRk.ix);
    }
    //====================================
    // \\// populate menu
    //====================================


    function build_menu_top_leafs_placeholders()
    {
        //teaf$ is one of the top-leafs of menu
        sDomN.teafs$ = {};

        if( fconf.attach_menu_to_essaion_root ) {
            var leftSide_menuRotator$ = $$.dct(
                'left-side-menu-rotator',
                sDomN.essaionsRoot$
            );
        }

        ['aspect','theorion'].forEach( function( mcat_id ) {
            sDomN.teafs$[ mcat_id ] = $$.dct(
                'menu-teaf ' + mcat_id,
                fconf.attach_menu_to_essaion_root ?
                    ( mcat_id === 'aspect' ? leftSide_menuRotator$ : sDomN.essaionsRoot$ ) :
                    sDomN.menu
            );
        });

        if( haz( fconf, 'theorionTab_nonClickable' ) ){
            sDomF.makes_theorionTab_nonClickable();
        }
    }



    //====================================
    // //\\ sets menu top leaf
    //====================================
    //Input: subcatsMenu - contains list = array of items in submenu
    function build_teaf__localfun( mcat_id, subcatsMenu,
    ){
        var teaf$ = sDomN.teafs$[ mcat_id ];
        var decorOfShuttle$;

        //------------------------------------
        // shuttle
        //------------------------------------
        var decorationsContainer$ = $$
            .dct( 'tleaf-decorations-container', teaf$ )
            .ch( ( decorOfShuttle$ = $$.dc( 'shuttle shape' ) )
                 .ch( fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ) )
            );


        //------------------------------------
        // builds mencat own tree
        //------------------------------------
        subcatsMenu.list.forEach( function( mitem, mitemIx ) {
            var scat_id = mitem.id;
            var leafRk = mitem.leafRk =
            {
                ix          : mitemIx,
                mcat_id,
                scat_id,
                teaf$       : teaf$,
                studylab    : mitem.studylab, //comes from essaion header
                caption     : mitem.hasOwnProperty( 'caption' ) ? mitem.caption : scat_id,
                decorOfShuttle$ : decorOfShuttle$,
                decorationsContainer$ : decorationsContainer$,
            };
            make_menu_leaf__localfun( leafRk );
        });
    }
    //====================================
    // \\// sets menu top leaf
    //====================================




    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // //\\ makes radio menu
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    /// for single leafRk indexed with pair (mcat_id, scat_id),
    /// builds its togglable-menu-tab;
    /// makes tab's components shadow and button;
    function make_menu_leaf__localfun( leafRk )
    {
        var scat_id     = leafRk.scat_id;
        var mcat_id     = leafRk.mcat_id;
        var mitemIx     = leafRk.ix;
        var caption     = leafRk.caption;
        var studylab    = leafRk.studylab;
        var teaf$       = leafRk.teaf$;
        var decorOfShuttle$         = leafRk.decorOfShuttle$;
        var decorationsContainer$   = leafRk.decorationsContainer$;
        //--------------------------
        // //\\ shuttle shadow
        //--------------------------
        leafRk.itemShadow$ = $$.dct( 'shadow shape', decorationsContainer$ )
            .ch( fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ) );
        if( studylab && mcat_id === 'aspect' ) {
            leafRk.itemShadow$.addClass( 'studylab' );
        }
        //--------------------------
        // \\// shuttle shadow
        //--------------------------

        //--------------------------
        // //\\ fluid-html part
        //--------------------------

        //------------------------------
        // //\\ video-button placeholder
        //------------------------------
        if( mcat_id === 'theorion' ) {
            var iconClass = 'videoicon-placeholder';
            var videoPlaceholder$ = ssF.tr( iconClass, scat_id,
                $$
                .div()
                .cls( iconClass )
                //:can put this css into fapp.css.js 
                //:while no specific place exist
                .css( 'display', 'inline-block' )
                .css( 'position', 'relative' )
                .css( 'top', '2px' )
                .css( 'padding-right', '4%' )
                .css( 'padding-left', '0%' )
                .css( 'height', '10px' )
            );
        }
        //------------------------------
        // \\// video-button placeholder
        // \\// fluid-html part
        //--------------------------

        //-------------------------------------------------------------------
        // //\\ builds clickable dom element to toggle essay-texts-menu-items
        //-------------------------------------------------------------------
        var li$ = leafRk.li$ = $$
            .dct( 'shape litem', teaf$ )
            .e('click', function( event ) {
                if( mcat_id !== 'theorion' || !fconf.theorionTab_nonClickable ) {
                    do_select_leaf__localfun( leafRk, !!'amodel2app_8_extraWork' );
                }
            })
            .ch([
                fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ),
                $$
                    .dc( 'caption' )
                    .ch( 
                        [   videoPlaceholder$,
                            leafRk.mItemCaptionHtml$ = $$.span().html( caption )
                        ]
                    )
            ]);
        //-------------------------------------------------------------------
        // \\// builds clickable dom element to toggle essay-texts-menu-items
        //-------------------------------------------------------------------

        if( studylab && mcat_id === 'aspect' ) {
            li$.addClass( 'studylab' );
        }
    }
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // \\// makes radio menu
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW







    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // //\\ does select menu-leaf
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    function do_select_leaf__localfun( leafRk, amodel2app_8_extraWork )
    {
        var scat_id         = leafRk.scat_id;
        var mcat_id         = leafRk.mcat_id;
        var decorOfShuttle$ = leafRk.decorOfShuttle$;
        var exAspect        = exegs[ amode.theorion ][ amode.aspect ];

        //todm: with this lemma 2 looks bad ... why? ... missed resize?
        //if( amode[ mcat_id ] === scat_id ) return; //click is idempotent

        //==================================================
        // does cleanup before change
        //==================================================
        //sets menu flag
        leafRk.li$.removeClass( 'chosen' );
        //sets fappRoot flags
        fapp.fappRoot$.removeClass( 'theorion--' + amode.theorion + ' aspect--' + amode.aspect );
        //sets content-text visibility
        if( exAspect.subexegs.length > 1 ) {
            exAspect.subessayMenuContainer$.removeClass( 'chosen' );
        }
        exAspect.subexegs.forEach( subexeg => {
            $$.removeClass( 'chosen', subexeg.domEl );
            ( exAspect.subexegs.length > 1 ) && subexeg.subessayMenuItem$.removeClass( 'chosen' );
        });




        //**************************************************************
        //**************************************************************
        // //\\ makes model change
        //**************************************************************
        //**************************************************************
        amode[ mcat_id ]    = scat_id;
        var exAspect        = exegs[ amode.theorion ][ amode.aspect ];
        //if no default, always selects only the first essay
        var subexeg0        = exAspect.subexegs[ 0 ];
        var subexeg         = ns.haz( exAspect, "default" ) || subexeg0;
        amode.subessay      = subexeg.essayHeader.subessay;
        amode.submodel      = subexeg.essayHeader.submodel;
        //**************************************************************
        //**************************************************************
        // \\// makes model change
        //**************************************************************
        //**************************************************************




        //==================================================
        // //\\ spawns changes
        //==================================================
        //flag to root
        fapp.fappRoot$.addClass( 'theorion--' + amode.theorion + ' aspect--' + amode.aspect );
        //flag to content-text-components
        if( exAspect.subexegs.length > 1 || fconf.SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM ) {

            //vital: makes an entire subessays-menu visible ...
            //       misleading wording "chosen"
            exAspect.subessayMenuContainer$.addClass( 'chosen' );

            exAspect.subexegs.forEach( subexeg => {
                subexeg.subessayMenuItem$.addClass( 'chosen' );
            });
        } else {
            $$.addClass( 'chosen', subexeg0.domEl );
        }

        //flag to menu
        leafRk.li$.addClass( 'chosen' ); //todm redundant state-flag
        //flag to shuttle
        decorOfShuttle$.a('class','shape shuttle shuttle-'+leafRk.ix);
        if( mcat_id === 'theorion' ) {
            ns.eachprop( exegs[ amode.theorion ], ( exegAsp, aspId ) => {
                //updates left menu caption for theorions with omitted aspect texts
                var menItem = sconf.asp8theor_menus.aspect.duplicates[ aspId ];
                menItem.leafRk.mItemCaptionHtml$.html(
                    exegAsp.subexegs[ 0 ].essayHeader.menuCaption ||
                    menItem.caption
                );
            });
        }

        //==================================================
        // updates app and ...
        //==================================================
        if( amodel2app_8_extraWork ) {
            ////menu work for special subapp
            ////this happens only on 2 click events(ver Dec10,2020)
            ////one click is for top-text-menu?,
            ////second click is for submenu,
            ns.haf( ss, 'menuExtraWork' )( mcat_id, scat_id );
        }


        //==================================================
        // //\\ amodel and image and legend
        //      as prescribed in essaion
        //      if its menu item exist and is already constructed
        //==================================================
        fmethods.spawnVideoList && fmethods.spawnVideoList(); //todon what?
        sDomN.bgImage$ = subexeg0.imgRk.dom$;
        if( subexeg.essayHeader.dataLegend === "0" ) {
            $$.$(sDomN.medRoot).addClass('main-legend-disabled');
        } else if( subexeg.essayHeader.dataLegend === "1" ) {
            $$.$(sDomN.medRoot).removeClass('main-legend-disabled');
        }
        //==================================================
        // \\// amodel and image and legend
        //==================================================


        ///=========================================================
        /// establishes amodel state if lemma is ready for it
        ///=========================================================
        if( amodel2app_8_extraWork ) {
            ////this happens only on 1 click events(ver Dec10,2020)
            ////one click is for top-text-menu?,
            menu2lemma();
        }
        //==================================================
        // \\// spawns changes
        //==================================================
    }
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // \\// does select menu-leaf
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW



    ///this happens only on 2 click events(ver Dec10,2020)
    ///one click is for top-text-menu?,
    ///second click is for submenu,
    function menu2lemma()
    {
        //we need to run "media" updater because we need to update
        //archived, "sleeping", d8d past values,
        //todm ... instead the solution of updating them at "down" event
        //         will be more elagant and cause less fuss,
        var stdMod = studyMods[ amode.submodel ];

        //possibly for lemmas from the past: lemma1, l2, ...
        ssF.in_subessay_launch____amode2lemma();

        haff( stdMod, 'sliders_value2pos' );

        //.todm code proliferation ... model runs twice?
        var resize8more = wrkwin.finish_Media8Ess8Legend_resize__upcreate;
        resize8more( null, !!'doDividorSynch');

        //**********************************************************************************
        //todo patch: this is a vital patch, without it to appear legend needs
        //second resize event,
        //the reason for the bug is unknown,
        setTimeout(
            function() {
                resize8more( null, !!'doDividorSynch' );
            },
            100
        );
        //**********************************************************************************
    }


    function state2subessayMenu({ exAspect, subexeg, })
    {
        exAspect.subexegs.forEach( subexeg => {
            subexeg.domEl$.removeClass( 'chosen' );
            if( exAspect.subexegs.length > 1) {
                subexeg.subessayMenuItem$.removeClass( 'subexeg-toggler-chosen' );
            }
        });
        subexeg.domEl$.addClass( 'chosen' );
        if( exAspect.subexegs.length > 1) {
            subexeg.subessayMenuItem$.addClass( 'subexeg-toggler-chosen' );
        }
    }


    function tellActivityEngine_that_userStartedSubessay()
    {
        ////real human acted on app,
        ////because of this, human activity state-machines are being
        ////informed in this block,
        eachprop( exegs[ amode.theorion ][ amode.aspect ].subessay2subexeg,
                  (subessayRack, sname) => {

            ///this is flag of presense of activity-script for this subessay
            if( haz( subessayRack, 'stateId2state' ) ) {

                if( amode.subessay === sname ) {
                    return;
                }
                //sibling activities begin aware that current activity is started
                ssF.executesTopicScenario( 'sibling-activity-start', sname );
            }
        });

        var subessayRack =
            exegs[ amode.theorion ][ amode.aspect ].subessay2subexeg[ amode.subessay ];
        if( haz( subessayRack, 'stateId2state' ) ) {
            ////adds state "start" to avoid entering the state machine in ambiguous state
            ////in plain words, every "user click" is "start over"
            subessayRack.scenario_stateId = 'start';
            ssF.executesTopicScenario( 'start' );
        }
    }



}) ();

