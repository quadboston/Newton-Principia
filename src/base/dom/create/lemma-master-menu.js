/*
        vital jargon:
            mcat_id = "theorion", "aspect"
            menu tree is like:
                mcat_id = "theorion"
                              scat_id = claim, proof, ...           
                mcat_id = "aspect"
                              scat_id = latin, english, video, ...           
*/


( function() {
    var {
        ns, sn, $$, haff,
        eachprop, haz,
        sconf, fconf,
        fapp, sapp,
        fmethods,
        ssF,
        sDomF, sDomN,
        studyMods,
        amode,
        wrkwin,
        exegs,
        toreg,
        userOptions
    } = window.b$l.apptree({
    });
    sDomF.populateMenu  = populateMenu;
    sDomF.menu2lemma    = menu2lemma;
    sDomF.addsChosenCSSCls_to_subessay8menuSubitem =
          addsChosenCSSCls_to_subessay8menuSubitem;
    sDomF.build_menu_top_leafs_placeholders =
          build_menu_top_leafs_placeholders;
    sDomF.tellActivityEngine_that_userStartedSubessay =
          tellActivityEngine_that_userStartedSubessay;
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

        //:sets up aspect menu
        //skip this, possibly does duplicate job,
        //do_select_leaf__localfun( submItem.leafRk, !!'amodel2app_8_extraWork' );
        //do only CSS job:
        let lRk = sconf.asp8theor_menus.aspect.duplicates[ amode.aspect ].leafRk;
        lRk.li$.addClass( 'chosen' );
        lRk.decorOfShuttle$.a('class','litem shuttle shuttle-'+lRk.ix);
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
        //makes shuttle non-chosen and its position undefined
        decorOfShuttle$ = $$.dct( 'litem shuttle', teaf$ );
        /*       
                            .ch( $$.dc( 'shuttle-oval-body' ) )
                            .ch( $$.dc( 'shuttle-shadow' ) )
                            ;
        */
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
                teaf$,
                studylab    : mitem.studylab, //comes from essaion header
                caption     : mitem.hasOwnProperty( 'caption' ) ? mitem.caption : scat_id,
                decorOfShuttle$,
            };
            make_menu_leaf__onceLocFun( leafRk );
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
    /// makes tab's components button;
    function make_menu_leaf__onceLocFun( leafRk )
    {
        var scat_id     = leafRk.scat_id;   //sub category: theorion or aspect
        var mcat_id     = leafRk.mcat_id;   //main category: theorion or aspect
        var mitemIx     = leafRk.ix;
        var caption     = leafRk.caption;
        var studylab    = leafRk.studylab;
        var teaf$       = leafRk.teaf$;
        var decorOfShuttle$ = leafRk.decorOfShuttle$;

        //--------------------------
        // //\\ fluid-html part
        // //\\ video-button placeholder
        //------------------------------
        //if( mcat_id === 'theorion' ) {
        ///this thing participate in creation placeholder inside
        ///theorion tab-tags-buttons
        var iconClass = 'videoicon-placeholder' +
            ( mcat_id === 'aspect' ? '-aspect' : '' );
        var videoPlaceholder$ = toreg( iconClass )( scat_id,
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
        )( scat_id );
        //------------------------------
        // \\// video-button placeholder
        // \\// fluid-html part
        //--------------------------

        //-------------------------------------------------------------------
        // //\\ builds clickable dom element to toggle essay-texts-menu-items
        //-------------------------------------------------------------------
        let decor$ = $$.dct( 'decorated litem litem-'+leafRk.ix, teaf$ )
        var li$ = leafRk.li$ = $$
            .dct( 'litem litem-'+leafRk.ix, teaf$ )
            .e('mouseover', ()=>{ decor$.addClass( 'hovered' ) })
            .e('mouseleave', ()=>{ decor$.removeClass( 'hovered' ) })
            .e('click', function( event ) {
                if( mcat_id !== 'theorion' || !fconf.theorionTab_nonClickable ) {

                    //:todm: it is not clear why this is required, and why flag
                    //:'chosen' is not cleared up downstream automatically
                    let mid = mcat_id;
                    let submItem = sconf.asp8theor_menus[ mid ].duplicates[ amode[ mid ] ];
                        submItem.leafRk.li$.removeClass( 'chosen' );

                    do_select_leaf__localfun( leafRk, !!'amodel2app_8_extraWork' );
                }
            })
            .ch([
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
        fapp.fappRoot$.removeClass( 'theorion--' + amode.theorion +
            ' aspect--' + amode.aspect );
        //sets content-text visibility
        if( userOptions.shouldShowSubessayMenu(exAspect) ) {
            exAspect.subessayMenuContainer$.removeClass( 'chosen' );
        }
        exAspect.subexegs.forEach( subexeg => {
            //book's text
            $$.removeClass( 'chosen', subexeg.domEl );
            ( userOptions.shouldShowSubessayMenu(exAspect) ) &&
              subexeg.subessayMenuItem$.removeClass( 'chosen' );
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
        fapp.fappRoot$.addClass(
            'theorion--' + amode.theorion + ' aspect--' + amode.aspect
        );
        //ccc( 'new cls: ' + amode.submodel + ' rootCls=' + fapp.fappRoot$._cls() );

        //flag to content-text-components
        if( userOptions.shouldShowSubessayMenu(exAspect) ) {

            //vital: makes an entire subessays-menu visible ...
            //       misleading wording "chosen"
            exAspect.subessayMenuContainer$.addClass( 'chosen' );

            exAspect.subexegs.forEach( subexeg => {
                subexeg.subessayMenuItem$.addClass( 'chosen' );
            });
        } else {
            //adds 'chosen' to book's text
            $$.addClass( 'chosen', subexeg0.domEl );
        }

        //flag to menu
        //menu "button"
        leafRk.li$.addClass( 'chosen' ); //todm redundant state-flag, but fails if omitted
        //flag to shuttle
        decorOfShuttle$.a('class','litem shuttle shuttle-'+leafRk.ix);
        if( mcat_id === 'theorion' ) {
            ns.eachprop( exegs[ amode.theorion ], ( exegAsp, aspId ) => {
                //updates left menu caption for theorions with omitted aspect texts
                var menItem = sconf.asp8theor_menus.aspect.duplicates[ aspId ];
                menItem.leafRk.mItemCaptionHtml$.html(
                    exegAsp.subexegs[ 0 ].essayHeader.menuCaption ||
                    menItem.caption //where this came from?
                                    // ... where theoreon caption comes?
                                    // ... theoreonCaption ?
                );
            });
        }

        //==================================================
        // updates app and ...
        //==================================================

        //==================================================
        // //\\ amodel and image and legend
        //      as prescribed in essaion
        //      if its menu item exist and is already constructed
        //==================================================
        fmethods.spawnVideoList && fmethods.spawnVideoList(); //todon what?
        //==================================================
        // \\// amodel and image and legend
        //==================================================


        ///=========================================================
        /// establishes amodel state if lemma is ready for it
        ///=========================================================
        menu2lemma( amodel2app_8_extraWork );
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
    function menu2lemma( amodel2app_8_extraWork )
    {

        //we need to run "media" updater because we need to update
        //archived, "sleeping", d8d past values,
        //todm ... instead the solution of updating them at "down" event
        //         will be more elagant and cause less fuss,
        var stdMod = studyMods[ amode.submodel ];

        //possibly for lemmas from the past: lemma1, l2, ...
        ssF.in_subessay_launch____amode2lemma( amodel2app_8_extraWork );

        if( amodel2app_8_extraWork ) {
            haff( stdMod, 'sliders_value2pos' );

            //.todm code proliferation ... model runs twice?
            var res = wrkwin.start8finish_media8Ess8Legend_resize__upcreate;
            res( null, !!'doDividorSynch');

            //**********************************************************************************
            //todo patch: this is a vital patch, without it to appear legend needs
            //second resize event,
            //the reason for the bug is unknown,
            setTimeout(
                function() {
                    res( null, !!'doDividorSynch' );
                },
                100
            );
            //**********************************************************************************
        }
    }

    //reveals subessay in menu and in text
    function addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg, })
    {
        exAspect.subexegs.forEach( subexeg => {
            subexeg.domEl$.removeClass( 'chosen' );
            if(userOptions.shouldShowSubessayMenu(exAspect, subexeg) ) {
                subexeg.subessayMenuItem$.removeClass( 'subexeg-toggler-chosen' );
            }
        });
        subexeg.domEl$.addClass( 'chosen' );
        if( userOptions.shouldShowSubessayMenu(exAspect, subexeg) ) {
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

