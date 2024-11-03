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
        //=================================================
        // //\\ model parameters,
        //      these are independent parameters,
        //      to be varied by sliders
        //=================================================
        //curve //varied by pivotsPos
        //      //pivot 'P' is attached to initial spped V,
        //      it is already in registry,

        //projection of speed to static tangent vector uu
        //at all points P used for differentiation,
        //body moves backward on x,
        toreg( 'vt' )( 'val', -1 );
        //interval of t to construct an arc for
        //Newton's sagitta
        toreg( 'tForSagitta' )( 'val', 0.210 );
        //center 'S'
        //      it is already in registry,
        //=================================================
        // \\// model parameters,
        //=================================================

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

                    //40 seems better than 40 for distinct graph lines
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
        
        {
            let ocp = sconf.originalPoints.curvePivots;
            let pivotsPos = bezier.pivotsPos = ocp.map( (cp,cpix) => {
                let pos = rg[ 'curvePivots-' + cpix ].pos;
                return [ pos[0], pos[1] ];
            });
            bezier.startPos = { pos : nspaste( [], rg[ 'curvePivots-' + 0 ].pos ) };
            bezier.endPos = { pos : nspaste( [], rg[ 'curvePivots-' + (ocp.length-1) ].pos ) };
            if( sconf.APPROX === 'D' ) {
                bezier.fun = rg[ 'approximated-curve' ].t2xy;
                bezier.start_q = bezier.startPos.pos[0];
                bezier.end_q = bezier.endPos.pos[0];
                rg.P.q = (rg.P.pos[0]-bezier.startPos.pos[0])
                         / (bezier.endPos.pos[0] - bezier.startPos.pos[0]);
            } else {
                let start_q = bezier.start_q = 0;
                let end_q = bezier.end_q = 1;
                let startX = bezier.startPos.pos[0];
                let endX = bezier.endPos.pos[0];
                let pivotsPos = bezier.pivotsPos = bezier.pivotsPos.map( (pos,cpix) => {
                    let scale = 1.2;
                    /*
                    switch (cpix)
                    {
                        case 1 : scale = 1.25;
                        break;
                        case 2 : scale = 1.4;
                        break;
                        case 3 : scale = 1.18;
                        break;
                        case 4 : scale = 0.95;
                        break;
                        case 5 : scale = 1.275;
                        break;
                        case 6 : scale = 1.15;
                        break;
                        case 7 : scale = 1.02;
                        break;
                    }
                    */
                    rg[ 'curvePivots-' + cpix ].q = cpix / (bezier.pivotsPos.length-1);
                    return [ pos[0], pos[1]*scale ];
                }); //map
                rg.P.q = (rg.P.pos[0]-bezier.startPos.pos[0])
                            / (bezier.endPos.pos[0] - bezier.startPos.pos[0]);
                var parT2point = bezier.parT2point;
                bezier.fun = fun;
                function fun( q )
                {
                    return parT2point( q, pivotsPos );
                }
            }
        }
        var { bk } = mcurve.planeCurveDerivatives({
            fun : bezier.fun,
            q : bezier.start_q,
            rrc : rg.S.pos,
        });
    }

}) ();

