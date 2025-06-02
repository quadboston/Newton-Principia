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

        //: analytical derivative dy/dx
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


        //-------------------------------------------------
        // //\\ paints magnified curve
        //-------------------------------------------------
        var magnitude = rg.magnitude.value;
        //misleading notation: this is not ..._b, this is ..._B
        rg.derotated_b = toreg( 'derotated_b' )( 'pos', [rg.B.unrotatedParameterX,0] )();
        ssF.paintsCurve({
                rgName      : 'arc-Ab',
                fun         : cfun.fun, //for l8, cust fun = 0 = rotated fun
                pointA      : rg.A,
                pointB      : rg.derotated_b,
                mmedia      : stdMod.mmedia,
                magnitude,
                //addedCssClass: 'tp-arc-Ab tp-both-curves', 
                addedCssClass: 'tp-arc-Ab', 
                addToStepCount : 1,
                stepsCount : fconf.sappId === "b1sec1lemma8" ? 200 : null,
        });
        //-------------------------------------------------
        // \\// paints magnified curve
        //-------------------------------------------------


        ( function() {
            var AB = null;
            ////delta phi
            var rgSample = toreg( 'deltaphi' )( 'pname', 'deltaphi' )( 'pcolor', rg.A.pcolor )();
            if( amode.subessay === 'sin(x)/x' ){
                ///draws phi and renames it
                var caption = 'φ';
                rgSample.pos = rg.r.pos;
                var AB = [ rg.Ar.pivots[1], rg.Ar.pivots[0] ];
                var CD = [ rg.Br.pivots[1], rg.Br.pivots[0] ];
            } else if( amode.subessay === 'sine derivative' ) {
                ///draws delta phi
                var caption = 'Δφ';
                rgSample.pos = rg.O.pos;
                var AB = [ rg.AO.pivots[1], rg.AO.pivots[0] ];
                var CD = [ rg.BO.pivots[1], rg.BO.pivots[0] ];
            }
            rgSample.medpos = ssF.mod2inn( rgSample.pos );
            if( AB ) {
                ///todM useless when not displayed, but algo fails to omit this block:
                ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
                    AB,
                    CD,
                    rgSample,
                    ANGLE_SIZE  : 1,
                    caption,
                })
            }
        }) ();
        ssF.angleVisib({ pname : 'deltaphi' });

        if( amode.subessay === 'sine derivative' ||
            amode.subessay === 'derivative' ||
            amode.subessay === 'vector-derivative'
        ){
            ///draws phi
            ///adds an extra point at rg.O to comply angle-api
            var wwRg = toreg( 'phi0' )( 'pname', 'phi0' )( 'pos', rg.O.pos )
                            ( 'pcolor', rg.A.pcolor )();
            wwRg.medpos = ssF.mod2inn( wwRg.pos );
            ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
                AB          : rg[ 'O,ytop' ].pivots,
                CD          : [ rg.AO.pivots[1], rg.AO.pivots[0] ],
                rgSample    : wwRg,
                ANGLE_SIZE  : 1.5,
                caption     : 'φₒ',
            })
        }
        ssF.angleVisib({ pname : 'phi0' });

        if( amode.subessay === 'sine derivative' ) {
            var wwLine = ssF.str2line( 'x0,x', 'tp-debug', sconf.lines[ 'x0,x' ], 'Δsin(φ)' );
            //patch: overrides wide-lemma settings for tp-width for svg-text element
            wwLine.pnameLabelsvg$.addClass( 'hover-width' );
        } else {
            ////todo patch ... overrides caption by rewriting the line
            ssF.str2line( 'x0,x', 'tp-debug', sconf.lines[ 'x0,x' ], ' ' );
        }
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

