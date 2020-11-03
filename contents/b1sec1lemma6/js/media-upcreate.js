( function() {
    var {
        ns, sn, $$, mat,
        sconf, rg, toreg,
        ssF, ssD,
        sDomF,
        amode,
        stdMod,

    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate_custom_curves,
        },
    });
    return;











    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate_custom_curves()
    {

        //=================================================
        // //\\ analytical derivative dy/dx
        //=================================================
        var cfun = ssD.repoConf[ssD.repoConf.customFunction];

        //-------------------------------------------------
        // //\\ original arc and curve
        //-------------------------------------------------
        ssF.paintsCurve({
                //rgName    : will become 'arc-AB',
                fun         : cfun.fun,
                pointA      : rg.A,
                pointB      : rg.B,
                mmedia      : stdMod.mmedia,
        });

        ssF.paintsCurve({
                rgName      : 'curve-AB',
                fun         : cfun.fun,
                pointA      : rg.curveStart,
                pointB      : rg.curveEnd,
                mmedia      : stdMod.mmedia,
        });
        //-------------------------------------------------
        // \\// original arc and curve
        //-------------------------------------------------




        //-------------------------------------------------
        // //\\ paints magnified curve
        //-------------------------------------------------
        var magnitude = rg.magnitude.value;
        rg.derotated_b = toreg( 'derotated_b' )( 'pos', [rg.B.unrotatedParameterX,0] )();
        ssF.paintsCurve({
                rgName      : 'arc-Ab',
                fun         : cfun.fun,
                pointA      : rg.A,
                pointB      : rg.derotated_b,
                mmedia      : stdMod.mmedia,
                magnitude,
                //addedCssClass: 'tp-arc-Ab tp-both-curves', 
                addedCssClass: 'tp-arc-Ab', 
        });
        //-------------------------------------------------
        // \\// paints magnified curve
        //-------------------------------------------------

        ///draws tangentPhi
        var angleName = amode.subessay === 'derivative' ? 'ψ' : 'φo';
        var wwRg = toreg( 'tangentPhi' )( 'pname', 'tangentPhi' )
                        ( 'pos', rg.L.pos )( 'pcolor', rg.L.pcolor )();
        wwRg.medpos = ssF.mod2inn( rg.tangentPhi.pos );
        ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
            AB : [ rg.dr.pivots[1], rg.dr.pivots[0] ],
            CD : rg.AL.pivots,
            rgSample : wwRg,
            ANGLE_SIZE : 1,
            caption : angleName,
        });


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

        if( amode.subessay === 'sine derivative' || amode.subessay === 'derivative' ){
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
                caption     : 'φo',
            })
        }
        ssF.angleVisib({ pname : 'phi0' });

        if( amode.subessay === 'sine derivative' ) {
            ssF.str2line( 'x0,x', 'tp-debug', sconf.lines[ 'x0,x' ], 'Δsin(φ)' );
        } else {
            ////todo patch ... overrides caption by rewriting the line
            ssF.str2line( 'x0,x', 'tp-debug', sconf.lines[ 'x0,x' ], ' ' );
        }
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

