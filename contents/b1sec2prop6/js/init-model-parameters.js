( function() {
    var {
        ns, sn, $$, nsmethods, nspaste, nssvg, mcurve, integral,
        mat, bezier,
        ssF, ssD, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    return;













    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        //interval of t to construct an arc for
        //Newton's sagitta
        toreg( 'tForSagitta' )( 'val', sconf.tForSagitta0 );

        if( sconf.APPROX === 'D' ) {    
            //sets and paints initial orbit
            stdMod.pointsArr_2_singleDividedDifferences();        
        }
        stdMod.completesSlidersCreation();

        //creates placeholder
        toreg( 'curvatureCircle' );


        //==================================================
        // //\\ decoration graph
        //==================================================
        ssD.zebraCols = {};
        [ false, ns.rgbaArr2hsla( [0,     0,   255,    1] )[0] ].forEach(
            ( monoColorHue ) => {
                var wwCols = ns.builds_zebraNColors_array({
                    maxColors : 10,
                    SATUR       : sconf.DEFAULT_TP_SATUR,  //site setting
                    LIGHT       : 40,  //sconf.default_tp_lightness ||
                    OPACITY     : 0.8, //apparently irrelevant; sconf.DEFAULT_TP_OPACITY,
                    zebraNumber : 4,
                    monoColorHue, //true is for mono, false is for multy,
                });
                if( monoColorHue ) {
                    ssD.zebraCols.monocolor = wwCols;
                } else {
                    ssD.zebraCols.multicolor = wwCols;
                }
            });
        stdMod.createsGraphFW( stdMod.legendRoot$ );
        //==================================================
        // \\// decoration graph 
        //==================================================

        //too early: overriden later by sconf.rgShapesVisible
        //rg[ 'S,nonSolvablePoint' ].undisplay = true;
        
        {   ///curve pars
            let ocp = sconf.originalPoints.curvePivots;
            let pivotsPos = bezier.pivotsPos = ocp.map( (cp,cpix) => {
                let pos = rg[ 'curvePivots-' + cpix ].pos;
                return [ pos[0], pos[1] ];
            });
            let startX = rg[ 'curvePivots-' + 0 ].pos[0];
            let endPosX = rg[ 'curvePivots-' + (ocp.length-1) ].pos[0];
            if( sconf.APPROX === 'D' ) {
                bezier.fun = rg[ 'approximated-curve' ].t2xy;
                bezier.start_q = startX;
                bezier.end_q = endPosX;
                rg.P.q = (rg.P.pos[0]-startX) / (endPosX - startX);
            } else {
                let start_q = bezier.start_q = 0;
                let end_q = bezier.end_q = 1;
                let pivotsPos = bezier.pivotsPos = bezier.pivotsPos.map( (pos,cpix) => {
                    let scale = 1.2;
                    let scaleX = 1;
                    switch (cpix)
                    {
                        case 1 : scale = 1.4;
                                 scaleX = 1.02;
                        break;
                        case 4 : scale = 1.12;
                        break;
                        case 7 : scale = 1.38;
                                 scaleX = 1.1;
                        break;
                    }
                    rg[ 'curvePivots-' + cpix ].q = cpix / (bezier.pivotsPos.length-1);
                    return [ pos[0]*scaleX, pos[1]*scale ];
                }); //map
                rg.P.q = sconf.rgPq;
                var parT2point = bezier.parT2point;
                bezier.fun = fun;
                function fun( q )
                {
                    return parT2point( q, pivotsPos );
                }
            }
        }   ///curve pars
        var { bk } = mcurve.planeCurveDerivatives({
            fun : bezier.fun,
            q : bezier.start_q,
            rrc : rg.S.pos,
        });
        rg.A.pos = rg[ 'curvePivots-0' ].pos;
    }

}) ();

