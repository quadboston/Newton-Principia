( function() {
    var {
        ns, sn, $$, nsmethods, nspaste, nssvg, mcurve, integral,
        mat, bezier,
        ssF, ssD, sData, sDomN,
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
        //stdMod.createsGraphFW( stdMod.legendRoot$ );
        stdMod.graphFW_lemma = stdMod.createsGraphFW_lemma({ digramParentDom$:stdMod.legendRoot$ });
        //==================================================
        // \\// decoration graph 
        //==================================================
       
        {   ///curve pars
            ///sconf is insufficient, there is a fine tuneup,
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
                ssD.bezier = bezier.preparesOptimizedBezier(                
                                    bezier.pivotsPos );
                bezier.fun = ssD.bezier.fun;
                ssD.initialPivots = nspaste( [], bezier.pivotsPos );
            } //bezier end
            bezier.q2ix = 1/(bezier.end_q-bezier.start_q)*ssD.curveSTEPS;
        }   ///curve pars
        rg.A.pos = rg[ 'curvePivots-0' ].pos;
        
        //-----------------------------------------
        // //\\ partially draggers and decoration
        //      are initiated here
        //      todm: not very consistent,
        //-----------------------------------------
        ssD.PdragInitiated = false;
        ssD.SdragInitiated = false;
        ssD.PivotDragInitiated = false;
        sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
            fp.rgX = rg[ 'foldPoints-' + ppix ];
            fp.rgX.undisplay = true;
        });
        //-----------------------------------------
        // \\// partially draggers and decoration
        //-----------------------------------------
        
        stdMod.createsChordModeRadioControl();
    }

}) ();

