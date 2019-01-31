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
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);
    var rawTexts    = sn('rawTexts', ssD);

    var sapp        = sn('sapp'); 
    var amode       = sn('mode',sapp);

    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    sDomF.createMenu = createMenu;
    //00000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000









    ///==========================================
    ///creates menu from config list
    ///==========================================
    function createMenu()
    {
        var mtype2inputRacks = {};
        var mtypeDecoration = {};

        //this is a parent of legacy-app-menu
        sDomN.menu = document.querySelector( '.sub-nav-bar' );

        $$.addClass( cssp + '-menu', sDomN.menu );
        var sroot = rootvm.approot;
        ///todm ... this is may be a css filler ... should be removed
        sDomN.menuAreaFiller = $$
            .c('div')
            .addClass(cssp + '-menu-filler')
            .to(sroot)
            ();

        sDomF.populateMenu = populateMenu;
        sDomF.selectMenu = selectMenu;
        sDomF.resizeMenuDecorations = resizeMenuDecorations;
        //11111111111111111111111111111111
        return;
        //11111111111111111111111111111111







        function selectMenu( mtype, mid )
        {
            mtype2inputRacks[ mtype ][ mid ].li$().click();
        }

        function resizeMenuDecorations()
        {
            Object.keys( mtype2inputRacks ).forEach( function(mtype) {
                mtypeDecoration[ mtype ].alignShadows();
            });
        }



        //====================================
        // //\\ populate menu
        //====================================
        function populateMenu()
        {
            var sroot = rootvm.approot;
            Object.keys( sconf.submenus ).forEach( function( key ) {
                setupModeType( key, sconf.submenus[key] );
            });
            //222222222222222222222222222222222222222222222222222222
            return;
            //222222222222222222222222222222222222222222222222222222





            //====================================
            // //\\ sets submenu
            //------------------------------------
            //Input: mtype - menu type id
            //       submenu - contains list = array of items in submenu
            function setupModeType( mtype, submenu )
            {
                var mlist = submenu.list;
                var mdefault = submenu['default'];
                mtypeDecoration[ mtype ] = {};
                var parent = $$
                    //this is a parent of menu list ...
                    //should be a div for clear coding ...
                    .c('div')
                    .addClass('submenu')
                    .addClass(mtype)
                    .to(sDomN.menu)
                    ();

                // //\\ switch Handle
                var switchHandleBackground$ = $$
                    .c('div')
                    .addClass( 'handle-background' )
                    .to( parent )
                    ;
                var switchHandle$ = $$
                    .c('div')
                    .addClass( 'handle' )
                    .addClass( 'shape' )
                    .css( 'transition', "top 0.5s ease-in-out")
                    .to( switchHandleBackground$() )
                    ;
                $$  .c( 'div' )
                    .addClass( 'radio-circle' )
                    .to( switchHandle$() )
                    ;
                mtypeDecoration[ mtype ].alignShadows = alignShadows;
                // \\// switch Handle

                var t2r      =mtype2inputRacks;
                t2r[ mtype ] =t2r[ mtype ] || {};
                mlist.forEach( function( mitem, mitemIx ) {
                    var mid             =mitem.id;
                    t2r[ mtype ][ mid ] = {};
                    makeRadio({
                        mid         :mid,
                        caption     :mitem.hasOwnProperty( 'caption' ) ? mitem.caption : mid,
                        inputRack   :t2r[ mtype ][ mid ],
                        mitemIx     :mitemIx
                    });
                });
                //333333333333333333333333333333333333333333333333333333
                return;
                //333333333333333333333333333333333333333333333333333333






                //-----------------------------------------------------------
                // //\\ alignes handle- and shadows- absolute pos to li-fluid
                //-----------------------------------------------------------
                function alignShadows()
                {
                    var box = parent.getBoundingClientRect();
                    switchHandleBackground$
                        .css('width', box.width.toFixed(2) + 'px')
                        .css('height', box.height.toFixed(2) + 'px')
                        ;
                    Object.keys( t2r[ mtype ] ).forEach( function( mid ) {
                        var inputRack = t2r[ mtype ][ mid ];
                        alignShadow( inputRack.li$(), inputRack.switchHandleShadow$ );
                    });
                }

                function alignShadow( li, shadow$, doDecorateWithTransition )
                {
                    var box = li.getBoundingClientRect();
                    var pbox = li.parentNode.getBoundingClientRect();
                    var posX = box.left - pbox.left;
                    var posY = box.top - pbox.top;

                    if( doDecorateWithTransition ) {
                        shadow$
                            .a( 'style',
                                'left:' + posX + 'px;' +
                                "top:" +  posY + 'px;' +
                                "transition: top 0.3s ease-in-out, left 0.5s ease-in-out;"
                            );
                    } else {
                        shadow$ .css( 'left', posX + 'px' )
                                .css( 'top', posY + 'px' );
                    }
                }
                //-----------------------------------------------------------
                // \\// alignes handle- and shadows- absolute pos to li-fluid
                //-----------------------------------------------------------


                //------------------------------------
                // //\\ makes radio
                //------------------------------------
                function makeRadio( marg )
                {
                    var mid         =marg.mid;
                    var caption     =marg.caption;
                    //.inputRack is a group-of-menu-dom-elements (?related to one menu itmem)
                    var inputRack   =marg.inputRack;
                    var mitemIx     =marg.mitemIx;

                    var id          = cssp+'-'+mtype+'--'+mid;

                    //--------------------------
                    // //\\ handle shadow
                    //--------------------------
                    inputRack.switchHandleShadow$ = $$
                        .c('div')
                        .addClass( 'shadow' )
                        .addClass( 'shape' )
                        .to( switchHandleBackground$() );
                        ;
                    
                    $$
                        .c( 'div' )
                        .addClass( 'radio-circle' )
                        .to( inputRack.switchHandleShadow$() )
                        ;
                    
                    // \\// handle shadow

                    //--------------------------
                    // //\\ fluid-html part
                    //--------------------------
                    var li$ = inputRack.li$ = $$
                        .c('div')
                        .addClass( 'shape' )
                        .addClass( 'litem' )
                        .e('click', function( event ) { 
                            do_select_mid();
                        })
                        .to( parent )
                        ;
                    var li = li$();
                    $$
                        .c( 'div' )
                        .addClass( 'radio-circle' )
                        .to( li )
                        ;
                    $$
                        .c( 'div' )
                        .addClass( 'caption' )
                        .html( caption )
                        .to( li )
                        ;
                    //--------------------------
                    // \\// fluid-html part
                    //--------------------------



                    if( mdefault === mid ) {
                        do_select_mid();
                    }
                    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                    return;
                    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr





                    ///---------------------------
                    /// processes radio change
                    ///---------------------------
                    function do_select_mid()
                    {
                        if( amode[ mtype ] === mid ) return; //click is idempotent
                        var inputRackType = t2r[ mtype ];
                        //==================================================
                        // //\\ updates application mode in CSS classes
                        //==================================================
                        var ww$ = $$.$(sroot);
                        mlist.forEach( function( mitem ) {
                            ////removes all possible classes
                            ww$.removeClass(mtype + '--' + mitem.id);
                            inputRackType[ mitem.id ] &&  //todm do without a check
                                inputRackType[ mitem.id ].li$.removeClass( 'chosen' );
                        });
                        ww$.addClass(mtype + '--' + mid);
                        inputRackType[ mid ].li$.addClass( 'chosen' ); //todm redundant state-flag
                        //==================================================
                        // \\// updates application mode in CSS classes
                        //==================================================



                        //==================================================
                        // //\\ draws CSS decorations
                        //==================================================
                        alignShadow( li, switchHandle$, !!'doDecorateWithTransition' )
                        //==================================================
                        // \\// draws CSS decorations
                        //==================================================





                        //==================================================
                        // //\\ swaps original texts depending on new amode
                        //==================================================
                        if( mtype === 'text' || mtype === 'proof' ) {
                            if( amode['proof'] && amode['text'] ) {
                                ////this state of application does already exist
                                ////do remove it from CSS
                                var searchStr = '.original-text.' + amode['proof'] + '.' + amode['text'];
                                var chosenTextDiv = sDomN.text$().querySelectorAll( searchStr );
                                chosenTextDiv[0] && $$.removeClass( 'chosen', chosenTextDiv[0] );
                            }

                            if( mtype === 'text' ) {
                                var formerMType = 'text';
                                var unchangedMType = 'proof';
                            } else {
                                var formerMType = 'proof';
                                var unchangedMType = 'text';
                            }
    
                            var notToBeChangedMode = amode[unchangedMType];
                            if( notToBeChangedMode ) {
                                ////this state does already exist ... do set CSS
                                var changedMode = mid;
                                //ccc( 'mtype=' + mtype + ' mid=' + mid );
                                var searchStr = '.original-text.' + notToBeChangedMode + '.' +
                                                changedMode;
                                var chosenTextDiv = sDomN.text$().querySelectorAll( searchStr );
                                chosenTextDiv[0] && $$.addClass( 'chosen', chosenTextDiv[0] );
                            }
                        }
                        //==================================================
                        // \\// swaps original texts depending on new amode
                        //==================================================


                        //==================================================
                        // //\\ menu work for special subapp
                        //==================================================
                        ss.menuExtraWork && ss.menuExtraWork( mtype, mid );
                        //==================================================
                        // \\// menu work for special subapp
                        //==================================================


                        //==================================================
                        // //\\ updates application mode
                        //==================================================
                        amode[mtype] = mid;
                        //ccc( 'set new state: amode[' + mtype + ']=' + amode[mtype] );
                        fmethods.spawnVideoList && fmethods.spawnVideoList();
                        //==================================================
                        // \\// updates application mode
                        //==================================================

                        if( mtype !== 'proof' ) { //todm ... this looks clumsy
                            ////Synchs with tab switch:
                            ////"text"-call still must update "proof"-texts hidden by tab-switch
                            ////In other words, when one switches the text, then text's proof-type-mode and
                            ////claim-type-mode are hidden.
                            ////This picks up existing proof-type-mode and unhides it:
                            rg['mobile-tabs'][ amode['proof']+'-og' ].clicker.click();
                        }

                        ///refreshes legacy state of subapplication for l23 ...
                        ///todo ... patch ... merges l23 legacy state engine and l9
                        ///should be in some state enging specific to subapplication ...
                        if(( sapp.sappId === 'lemma2' || sapp.sappId === 'lemma3') &&
                             mtype === 'proof' ) {
                            ss.study.sdata.view.isClaim = amode.proof === 'claim';
                        }

                        //==================================================
                        // //\\ recalculates app for new application mode
                        //==================================================
                        ///hides or shows main-data-legend if prescribed in essay
                        ///if following modes already defined
                        if( amode['proof'] && amode['text'] ) {
                            var wRT = rawTexts[ amode.proof ] &&
                                      rawTexts[ amode.proof ][ amode.text ];
                            var eHeader = wRT && wRT.header;
                            if( eHeader ) {
                                if( eHeader.dataLegend === "0" ) {
                                    $$.$(sDomN.medRoot).addClass('main-legend-disabled');
                                } else if( eHeader.dataLegend === "1" ) {
                                    $$.$(sDomN.medRoot).removeClass('main-legend-disabled');
                                }
                                if( typeof eHeader.mediaBgImage === 'string' ) {
                                    if( eHeader.mediaBgImage ) {
                                        sDomN.bgImage$.removeClass( 'disabled' );
                                        sDomN.bgImage$.a( 'src', eHeader.mediaBgImage );
                                    } else if( eHeader.mediaBgImage === '' ) {
                                        sDomN.bgImage$.addClass( 'disabled' );
                                    }
                                }
                            }
                        }
                        if( sapp.readyToPopulateMenu ) { sapp.upcreate(); }
                        //==================================================
                        // \\// recalculates app for new application mode
                        //==================================================
                    }
                }
                //------------------------------------
                // \\// makes radio
                //------------------------------------
            }
            //------------------------------------
            // \\// sets submenu
            //====================================
        }
        //====================================
        // \\// populate menu
        //====================================
    };

}) ();

