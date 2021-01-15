( function() {
    var {
        ns, sn, $$,
        nspaste, eachprop,
        mat, has, haz,
        fconf, sconf,
        rg, toreg,
        ssF, ssD,
        sDomF, sDomN, amode,
        exegs,
        studyMods,
        stdMod,
    } = window.b$l.apptree({
        ssFExportList :
        {
            in_subessay_launch____amode2lemma,
        },
    });
    return;







    ///===================================================================
    /// app-mode to lemma states and actions,
    /// runs only in two click events and
    /// after init_model_parameters in lemma-main::init_sapp...studyMods,
    ///===================================================================
    function in_subessay_launch____amode2lemma()
    {
        doMinimizeTextMenus();

        //------------------------------------------------
        // //\\ sets "undefined" flag
        //      for registry rg members with defined pname,
        //      uses sconf.rgShapesVisible if defined in lemma,
        //      if not, uses existing sconf.rgShapesVisible.
        //------------------------------------------------
        eachprop( rg, (prop,propname) => {
            if( haz( prop, 'pname' ) ) {
                prop.undisplay = !(
                                        ns.h( sconf, 'rgShapesVisible' ) ?
                                        sconf.rgShapesVisible :
                                        fconf.rgShapesVisible
                                 );
            }
        });
        //------------------------------------------------
        // \\// sets "undefined" flag
        //------------------------------------------------

        var { theorion, aspect, submodel, subessay } = amode;
        var stdMod  = studyMods[ submodel ];
        var captured = null;
        ssD.__amode2rgstate.forEach( (cblock,ix) => {
            ///aka: "true", or "( theorion === 'claim' || ...
            var cond = cblock[0];
            if( eval( cond ) ) {
                var instr = cblock[ 1 ];

                ///latter "captured" in array overrides previous "captured"
                captured = ns.haz( instr, "captured" ) || captured;

                ///core of condition: sets registry immediately
                nspaste( rg, ns.haz( instr, "rg" )||{} );

                if( ns.h( instr, 'action' ) ) {
                    ////aka: sDomF.detected_user_interaction_effect()
                    eval( instr.action );
                }
            }
        });
        if( ns.haz( ssF, 'amode2rgstate' ) ){
            captured = ssF.amode2rgstate( captured );
        }


        ///???for past-lemmas: lemma 1, lemma 2, ...
        //haf( stdMod, 'astate_2_rg8model' )(
        //also does execute "stdMod.model_upcreate",
        //todm ... no need to put extra "captured" ... do fix this:

        stdMod.astate_2_rg8model( captured && ssD.capture[ captured ], captured );
    }


    ///modifies only global CSS if configuration is specified doing so
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
                var hideAspect = Object.keys( exegs[ amode.theorion ] ).length === 1;
            }

            var textMenuStyle$ = haz( sDomN, 'textMenuStyle$' );
            if( !textMenuStyle$ ) {
                textMenuStyle$ = sDomN.textMenuStyle$ = $$.c( 'style' ).to( document.head );
            }
            var html = '';
            if( hideTheor ){
                html += `
                    .leftside-menuholder .menu-teaf.theorion {
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

