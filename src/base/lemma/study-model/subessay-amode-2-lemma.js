( function() {
    var {
        nspaste, eachprop, has, haz, haff,
        fconf, ssF, ssD, rg, sDomF,
        stdMod, amode,
        //**************************************************
    } = window.b$l.apptree({
        ssFExportList :
        {
            in_subessay_launch____amode2lemma,
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
        // called once on page load from init-sapp.js
        // called again on tab switch from lemma-master-menu.js

        var { logic_phase, aspect, subessay } = amode;
        // //\\ patch. works for
        //      hiding/unhiding optional svg-elements
        //no other tokens allowed in class attribute for this
        //element, they will be erased by this statement:
        //this element is (non comfortably) made holding only
        //class for visibility:
        stdMod.svgScene$().setAttribute( 'class', 'bsl--svgscene ' +
            'logic_phase--' + logic_phase + ' ' +
            'aspect--' + aspect + ' ' +
            'subessay--' + subessay
        );
        // \\// patch. works for

        var captured = null;
        ///------------------------------------------------------------------
        /// //\\ takes conditions scripted at the bottom of professor-script,
        ///      loops via these conditions and executes them,
        ///         context is a closure of running function:
        ///             { logic_phase, aspect, subessay ...
        ///
        ///      "__amode2rgstate" can come from JS-module
        ///------------------------------------------------------------------
        ssD.__amode2rgstate.forEach( (cblock) => {
            ///aka: "true", or "( logic_phase === 'claim' || ...
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

        ///enables or disables conditional drag point if preset in sconf.js,
        eachprop( rg, (shape) => {
            if( has( shape, 'conditionalDrag' ) ){
                let dohide = true;
                //options which do activate drag
                'logic_phase aspect subessay sappId'

                .split( ' ' ).forEach(
                    aname => {
                    //https://javascript.info/regexp-introduction
                    //can be \-\-(\S*)(?:$|\s)/g
                    const RE = new RegExp( '\\b' + aname + '\\-\\-(\\S*)\\b', 'g' );
                    let matches = shape.conditionalDrag.matchAll( RE );
                    for (const match of matches) {
                        if( amode[aname] === match[1] ||
                            ( aname === 'sappId' && fconf.sappId === match[1] )
                        ) {
                            dohide = false;
                        }
                    }
                })
				rg[shape.rgId].hideD8Dpoint = dohide;
            }
        });

        if( haz( ssF, 'amode2rgstate' ) ){
            //appar. can do this
            //ssF.amode2rgstate();
            //and remove " captured " fully
            captured = ssF.amode2rgstate( captured );
        }

        // every tab starts with the book's diagram behind the model
        if( haz( stdMod.imgRk, 'hasImage' ) ) {
            sDomF.detected_user_interaction_effect( 'doUndetected' );
        }

        //reminder: captured here is the last satisfied captured,
        //the last after recent loop via code fragements above
        stdMod.astate_2_rg8model( captured && ssD.capture[ captured ] );

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
})();
