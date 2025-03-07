( function() {
    var {
        //**************************************************
        // this module has "eval" statement which may
        // need common objects, so don't be greedy to
        // list them here:
        //============================================================
        sn, $$, nspaste, eachprop, has, haz, hazz, haff,
        fapp, fconf, sconf, ssF, ssD, sDomN, sDomF, exegs, rg,
        stdMod, amode,
        //**************************************************
    } = window.b$l.apptree({
        ssFExportList :
        {
            in_subessay_launch____amode2lemma,
            doMinimizeTextMenus,
        },
    });
    return;







    ///===================================================================
    /// app-mode to lemma states and actions,
    ///     runs only in three? categories of click events and
    ///     after init_model_parameters in init-sapp.js::init_sapp...s tudyMods,
    ///     more comments are in: ver/excluded/code-overview/init-params-tips.txt
    ///===================================================================
    function in_subessay_launch____amode2lemma( amodel2app_8_extraWork,  )
    {
        if( amodel2app_8_extraWork ) {
            doMinimizeTextMenus();
        }
        var { textSection, aspect, subessay } = amode;
        //------------------------------------------------
        // //\\ sets "undefined" flag
        //      for registry rg members with defined pname,
        //      uses sconf.rgShapesVisible if defined in lemma,
        //      if not, uses existing sconf.rgShapesVisible.
        //------------------------------------------------
        eachprop( rg, (prop,propname) => {

            //we don't implement this now because of
            //damage to other legacy lemmas,
            //general solution should be
            //if( hazz( prop, 'pname' ) && !has( prop, propname ) ) {
            //,or in case of 'undisplay'
            //if( hazz( prop, 'pname' ) && !has( prop, 'undisplay' ) ) {

            if( hazz( prop, 'pname' ) ) {
                prop.undisplay = !(
                    has( sconf, 'rgShapesVisible' ) ?
                        sconf.rgShapesVisible :
                        fconf.rgShapesVisible
                );
            }
        });
        //------------------------------------------------
        // \\// sets "undefined" flag
        //------------------------------------------------



        var captured = null;
        ///------------------------------------------------------------------
        /// //\\ takes conditions scripted at the bottom of professor-script,
        ///      loops via these conditions and executes them,
        ///         context is a closure of running function:
        ///             { textSection, aspect, subessay ...
        ///
        ///      "__amode2rgstate" can come from JS-module
        ///------------------------------------------------------------------
        ssD.__amode2rgstate.forEach( (cblock,ix) => {
            ///aka: "true", or "( textSection === 'claim' || ...
            var cond = cblock[0];
            if( eval( cond ) ) {
                var instr = cblock[ 1 ];
                ///latter "captured" in array overrides previous "captured"
                captured = haz( instr, "captured" ) || captured;

                ///core of condition: sets registry immediately
                nspaste( rg, haz( instr, "rg" )||{} );

                if( has( instr, 'action' ) ) {
                    ////aka: sDomF.detected_user_interaction_effect()
                    eval( instr.action );
                }
            }
        });
        ///------------------------------------------------------------------
        /// \\// takes conditions scripted at the bottom of professor-script,
        ///------------------------------------------------------------------
        if( haz( ssF, 'amode2rgstate' ) ){
            //appar. can do this
            //ssF.amode2rgstate();
            //and remove " captured " fully
            captured = ssF.amode2rgstate( captured );
        }

        ///???for past-lemmas: lemma 1, lemma 2, ...
        //haf( stdMod, 'astate_ 2_rg8model' )(
        //also does execute "stdMod.model_upcreate",

        //reminder: captured here is the last satisfied captured,
        //the last after recent loop via code fragements above
        stdMod.astate_2_rg8model( captured && ssD.capture[ captured ], );

        //=================================================================
        // //\\ makes s ubmodel displayed
        //=================================================================
        //var rootCls = fapp.fappRoot$._cls();
        //var smcls = /\b(s ubmodel\-\-\S+)\b/;
        //var clsMatch = rootCls.match( smcls );
        //var removeCls = ( clsMatch && clsMatch[1] ) || '';
        //fapp.fappRoot$
        //    .removeClass( removeCls )
        /*
        c cc( 'swapped:' +
             '\nremoved=' + removeCls +
             '\nadded=' + fapp.fappRoot$._cls().match( smcls )[1]
        );
        */
        //=================================================================
        // \\// makes s ubmodel displayed
        //=================================================================

        var wwLaunch = haz( stdMod, 'subessayLaunch_definedInLemma_universal' );
        if( wwLaunch ) {
            wwLaunch();
        } else {
            if( !amodel2app_8_extraWork ) return;
            //patch-function,
            //todom: must be ported to normal app-launch-subessay scenario
            haff( stdMod, 'subessayLaunch_definedInLemma_after_model_upcreate' );
        }
    }


    ///modifies only global CSS if configuration is specified doing so,
    //apparently removes astray aspect-menu button,
    function doMinimizeTextMenus()
    {
        if( haz( fconf, 'attach_menu_to_essaion_root' ) ){

            var hideSingles     = haz( fconf, 'hideSingleItemContentMenus' );
            var overrideAspect  = has( fconf, 'showAspectMenu' );
            var hideTheor       = false;
            var hideAspect      = false;

            if( hideSingles ) {
                var hideTheor = Object.keys( exegs ).length === 1;
            }
            if( overrideAspect ) {
                var hideAspect = !fconf.showAspectMenu;
            } else if( hideSingles ) {
                var hideAspect = Object.keys( exegs[ amode.textSection ] ).length === 1;
            }

            var textMenuStyle$ = haz( sDomN, 'textMenuStyle$' );
            if( !textMenuStyle$ ) {
                textMenuStyle$ = sDomN.textMenuStyle$ = $$.c( 'style' ).to( document.head );
            }
            var html = '';
            if( hideTheor ){
                html += `
                    .leftside-menuholder .menu-teaf.textSection {
                        display : none;
                    }
                `;
            }
            if( hideAspect ){
                html += `
                    .leftside-menuholder .left-side-menu-rotator {
                        display : none;
                    }
                `;
            }
            textMenuStyle$.html( html );
        }
    }


}) ();

