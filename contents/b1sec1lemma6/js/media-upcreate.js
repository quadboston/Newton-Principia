( function() {
    var {
        $$, haz, fconf, ssF, ssD, sconf, amode, stdMod, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList : {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;


    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        rg.DLeft.pos[0] = -0.3; //extends tangent to the left
        //=================================================
        // //\\ manages legend CSS-visibility
        //      by essay-state
        //=================================================
        var rgMainLegend = haz( rg, 'main-legend' );
        if( rgMainLegend ) {
            var rgTeoTab = rgMainLegend[ amode.logic_phase ];
            if( amode.logic_phase === 'corollary' && amode.aspect === 'model' ) {
                $$.$( rgTeoTab.tableDom ).addClass( 'hidden' );
            } else {
                $$.$( rgTeoTab.tableDom ).removeClass( 'hidden' );
            }
        }
        //=================================================
        // \\// manages legend CSS-visibility
        //=================================================

        //vital for letters/picture conflict
        //see: model-point-dragger.js ... haz( sconf, 'dragHidesPictures' )
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        // analytical derivative dy/dx
        var cfun = ssD.repoConf[ssD.repoConf.customFunction];

        //-------------------------------------------------
        // //\\ original arc and curve
        //-------------------------------------------------
        //must be in synch with rotation of AL
        //pointB      : rg.B,
        
        ssF.paintsCurve({
                //rgName    : will become 'arc-AB',
                fun         : cfun.fun,
                pointA      : rg.A,
                pointB      : rg.B,

                //-----------------------------------------
                // //\\ apparently this fixes
                //-----------------------------------------
                //      arc out of synch with B
                start       : rg.A.pos[0],
                step        : (rg.B.unrotatedParameterX - rg.A.pos[0] ) / 20,
                stepsCount  : 20,
                //-----------------------------------------
                // \\// apparently this fixes
                //-----------------------------------------

                mmedia      : stdMod.mmedia,
                addToStepCount : 1,
        });

        ssF.paintsCurve({
                rgName      : 'curve-AB',
                fun         : cfun.fun,

                //this makes curve's beginning tail going up - not good
                //pointA      : rg.curveStart,
                //so, we truncate it, but need to draw it separately later on,
                pointA      : rg.A,

                pointB      : rg.curveEnd,
                mmedia      : stdMod.mmedia,
                addToStepCount : 1,
        });

        ///left branch of original curve is a reflection against axis y
        ssF.paintsCurve({
                rgName      : 'left-curve-AB',
                fun         : ssD.repoConf[2].fun,

                pointA      : rg.A,
                pointB      : rg.curveLeftEnd,
                mmedia      : stdMod.mmedia,
                addToStepCount : 1,
        });
        //-------------------------------------------------
        // \\// original arc and curve
        //-------------------------------------------------
        
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
