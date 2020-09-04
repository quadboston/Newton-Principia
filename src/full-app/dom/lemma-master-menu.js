/*
        vital jargon:
            teaf  - menu top level leaf
            teaf_id = "theorion", "aspect"
            leaf  - menu low level leaf
            menu tree is like:
                teaf_id = "theorion"
                              leaf_id = claim, proof, ...           
                teaf_id = "aspect"
                              leaf_id = latin, english, hypertext, ...           
*/


( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);
    var exegs       = sn('exegs', ssD);
    var wrkwin      = sn('wrkwin',ssD); //work window

    var sapp        = sn('sapp'); 
    var amode       = sn('mode',sapp);
    var studyMods   = sn('studyMods', sapp);

    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);



    var teaf_Rks = {};

    sDomF.populateMenu          = populateMenu;
    sDomF.selectMenu            = selectMenu;
    //sDomF.do_select_leaf        = do_select_leaf;
    sDomF.build_menu_top_leafs_placeholders = build_menu_top_leafs_placeholders;
    return;








    //====================================
    // //\\ populate menu
    //      creates menu from config list
    //====================================
    function populateMenu( modelOnly )
    {
        ns.eachprop( sconf.submenus, function( submenus, teaf_id ) {
            build_teaf( teaf_id, submenus, modelOnly );
        });
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

        ['aspect','theorion'].forEach( function( teaf_id ) {
            sDomN.teafs$[ teaf_id ] = $$.dct(
                'menu-teaf ' + teaf_id,
                fconf.attach_menu_to_essaion_root ?
                    ( teaf_id === 'aspect' ? leftSide_menuRotator$ : sDomN.essaionsRoot$ ) :
                    sDomN.menu
            );
        });
    }

    function selectMenu( teaf_id, leaf_id )
    {
        teaf_Rks[ teaf_id ][ leaf_id ].li$().click();
    }



    //====================================
    // //\\ sets menu top leaf
    //====================================
    //Input: menuTeafRack - contains list = array of items in submenu
    function build_teaf( teaf_id, menuTeafRack, modelOnly )
    {
        var leafRks = {};
        var teaf$   = sDomN.teafs$[ teaf_id ];

        var decorOfShuttle$;

        //------------------------------------
        // //\\ shuttle
        //------------------------------------
        var decorationsContainer$ = $$
            .dct( 'tleaf-decorations-container', teaf$ )
            .ch( ( decorOfShuttle$ = $$.dc( 'shuttle shape' ) )
                 .ch( fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ) )
            );
        //------------------------------------
        // \\// shuttle
        //------------------------------------

        
        menuTeafRack.list.forEach( function( mitem, mitemIx ) {
            var leaf_id = mitem.id;
            var leafRk = leafRks[ leaf_id ] =
            {
                teaf_id : teaf_id,
                leafRks : leafRks,
                teaf$   : teaf$,
                decorOfShuttle$ : decorOfShuttle$,
                decorationsContainer$ : decorationsContainer$,
                ix      : mitemIx,
                menuTeafRack : menuTeafRack,
                caption :mitem.hasOwnProperty( 'caption' ) ? mitem.caption : leaf_id,
                studylab : mitem.studylab, //comes from essaion header
                leaf_id : leaf_id //for debug
            };
            make_menu_leaf( leafRk );
        });
    }
    //====================================
    // \\// sets menu top leaf
    //====================================







    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // //\\ makes radio menu
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    /// for single leafRk indexed with pair (teaf_id, leaf_id),
    /// builds its togglable-menu-tab;
    /// makes tab's components shadow and button;
    function make_menu_leaf( leafRk )
    {
        var leaf_id     =leafRk.leaf_id;
        var teaf_id     =leafRk.teaf_id;
        var leafRks     =leafRk.leafRks;
        var menuTeafRack=leafRk.menuTeafRack;
        var mitemIx     =leafRk.ix;
        var caption     =leafRk.caption;
        var studylab    =leafRk.studylab;
        var teaf$       =leafRk.teaf$;
        var decorOfShuttle$=leafRk.decorOfShuttle$;
        var decorationsContainer$ = leafRk.decorationsContainer$;
        //ccc( 'teaf_id='+teaf_id + ' leaf_id=' + leaf_id + ' leaf rack=', leafRk );

        //--------------------------
        // //\\ shuttle shadow
        //--------------------------
        leafRk.itemShadow$ = $$.dct( 'shadow shape', decorationsContainer$ )
            .ch( fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ) );
        if( studylab && teaf_id === 'aspect' ) {
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
        if( teaf_id === 'theorion' ) {
            var iconClass = 'videoicon-placeholder';
            var videoPlaceholder$ = ssF.tr( iconClass, leaf_id,
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

        var mItemCaption$;
        var li$ = leafRk.li$ = $$
            .dct( 'shape litem', teaf$ )
            .e('click', function( event ) {
                do_select_leaf( leafRk );
            })
            .ch([
                fconf.decorateTopMenuWithRadioCircle && $$.dc( 'radio-circle' ),
                mItemCaption$ = $$
                    .dc( 'caption' )
                    .ch( 
                        [   videoPlaceholder$,
                            $$.span().html( caption )
                        ]
                    )
            ]);
        if( studylab && teaf_id === 'aspect' ) {
            li$.addClass( 'studylab' );
        }

        if( menuTeafRack['default'] === leaf_id  ) {
            //ccc( 'there must be two def: menuTeafRack = ', menuTeafRack );
            do_select_leaf( leafRk, !!'will upcreate later' );

        }
    }
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    // \\// makes radio menu
    //WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW





    //---------------------------
    // //\\ does select menu-leaf
    //---------------------------
    function do_select_leaf( leafRk, no_subapp_upcreate )
    {
        var leaf_id     =leafRk.leaf_id;
        var teaf_id     =leafRk.teaf_id;
        var leafRks     =leafRk.leafRks;
        var menuTeafRack=leafRk.menuTeafRack;
        var mitemIx     =leafRk.ix;
        var caption     =leafRk.caption;
        var teaf$       =leafRk.teaf$;
        var decorOfShuttle$=leafRk.decorOfShuttle$;
        var decorationsContainer$ = leafRk.decorationsContainer$;

        //todm: with this lemma 2 looks bad ... why? ... missed resize?
        //if( amode[ teaf_id ] === leaf_id ) return; //click is idempotent


        ( function () {
            //==================================================
            // //\\ updates menu mode in CSS classes
            //==================================================
            var lrs = leafRks;
            var ww$ = fapp.fappRoot$;
            menuTeafRack.list.forEach( function( mitem ) {
                ////removes all possible classes
                ww$.removeClass(teaf_id + '--' + mitem.id);
                lrs[ mitem.id ] &&  //todm do without a check
                    lrs[ mitem.id ].li$.removeClass( 'chosen' );
            });
            var wwcls = teaf_id + '--' + leaf_id;
            ww$.addClass( wwcls );
            leafRk.li$.addClass( 'chosen' ); //todm redundant state-flag
            //c cc( 'setting chosen menu tab class = ' + wwcls);
            //==================================================
            // \\// updates menu mode in CSS classes
            //==================================================
        })();

        //==================================================
        // //\\ draws CSS decorations
        //==================================================
        decorOfShuttle$.a('class','shape shuttle shuttle-'+leafRk.ix);
        //==================================================
        // \\// draws CSS decorations
        //==================================================



        //==================================================
        // //\\ swaps original texts depending on new amode
        //==================================================
        if( teaf_id === 'aspect' || teaf_id === 'theorion' ) {
            if( amode['theorion'] && amode['aspect'] ) {
                ////this state of application is already constructed
                ////it is perhaps to overridden, so clean it up for case now
                var searchStr = '.original-text.' + amode['theorion'] +
                                '.' + amode['aspect'];
                var chosenTextDiv = sDomN.essaionsRoot$()
                                    .querySelectorAll( searchStr );
                chosenTextDiv[0] && $$.removeClass( 'chosen', chosenTextDiv[0] );
            }

            if( teaf_id === 'aspect' ) {
                var formerMType = 'aspect';
                var unchangedMType = 'theorion';
            } else {
                var formerMType = 'theorion';
                var unchangedMType = 'aspect';
            }

            var notToBeChangedMode = amode[unchangedMType];
            if( notToBeChangedMode ) {
                ////this state does already exist ... do set CSS
                var changedMode = leaf_id;
                //ccc( 'teaf_id=' + teaf_id + ' leaf_id=' + leaf_id );
                var searchStr = '.original-text.' + notToBeChangedMode + '.' +
                                changedMode;

                //todm: using stashed domN.... objects will eliminate this seach
                //and may fix leaf_id collisions between different teaf_id
                var chosenTextDiv = sDomN.essaionsRoot$()
                                    .querySelectorAll( searchStr );
                chosenTextDiv[0] && $$.addClass( 'chosen', chosenTextDiv[0] );
            }
        }
        //==================================================
        // \\// swaps original texts depending on new amode
        //==================================================


        //==================================================
        // //\\ updates app and ...
        //==================================================
        amode[teaf_id] = leaf_id;
        if( amode['theorion'] && amode['aspect'] ) {
            var rtRk = exegs[ amode['theorion'] ][ amode['aspect'] ];
            //recall: rtRk.essayHeader.submodel is always defined:
            amode['submodel'] = rtRk.essayHeader.submodel;
            fmethods.spawnVideoList && fmethods.spawnVideoList();
            sDomN.bgImage$ = rtRk.imgRk.dom$;
            //c cc( 'does select menu-leaf: image is set in menu', sDomN.bgImage$ );
        }
        if( !no_subapp_upcreate ) {
            //.menu work for special subapp
            ns.haf( ss, 'menuExtraWork' )( teaf_id, leaf_id );
        }
        //==================================================
        // \\// updates app and ...
        //==================================================




        //==================================================
        // //\\ hides or shows image and legend
        //      as prescribed in essaion
        //      if its menu item exist and is already constructed
        //==================================================
        if( amode['theorion'] && amode['aspect'] ) {
            var wRT = exegs[ amode.theorion ] &&
                      exegs[ amode.theorion ][ amode.aspect ]; //todo simple
            var eHeader = wRT && wRT.header;
            if( eHeader ) {
                if( eHeader.dataLegend === "0" ) {
                    $$.$(sDomN.medRoot).addClass('main-legend-disabled');
                } else if( eHeader.dataLegend === "1" ) {
                    $$.$(sDomN.medRoot).removeClass('main-legend-disabled');
                }
            }
        }
        if( sapp.readyToResize && !no_subapp_upcreate ) {
            //c cc( 'menu is just selected: setting amode 4 model8media' );

            //we need to run "media" updater because we need to update
            //archived, "sleeping", d8d past values,
            //todm ... instead the solution of updating them at "down" event
            //         will be more elagant and cause less fuss,
            ns.haf( studyMods[ amode['submodel'] ], 'amode2lemma' )( 'rg8model' );

            //todm possibly useless:
            ns.haf( studyMods[ amode['submodel'] ], 'amode2lemma' )( 'media' );

            //.todm code prolifiration ... model runs twice?
            wrkwin.finish_Media8Ess8Legend_resize__upcreate(
                null, !!'doDividorSynch');
        }
        //==================================================
        // \\// hides or shows image and legend
        //==================================================
    }
    //---------------------------
    // \\// does select menu-leaf
    //---------------------------


}) ();

