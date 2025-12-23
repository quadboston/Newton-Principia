( function() {
    var { ns, ssD, stdMod, sconf, toreg, } = window.b$l.apptree({
        stdModExportList : { init_model_parameters, }, });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        //TEMP
        //Should the follwoing be added here?
        //-Set rg.S.pos
        //  -Probably best to check sconf for this one
        //Y-"stdMod.initiates_orbit8graph();"
        //N-"//body moves backward on x,"
        // "toreg( 'vt' )( 'val', 1 );"
        //    -I See this initialized for many other props however I don't
        //     believe it's used anywhere.
        //N-"rg.allLettersAreHidden = true;"




        stdMod.initiates_orbit8graph();
        stdMod.creates_Zeta_slider();

        toreg( 'instanttriangle' );

        //TEMP/

        // var op = sconf.orbitParameters;
        //TEMP I forget what this does, I believe it stored data points for the
        //curve?  If so then it will be replaced by the standardized code.
        // toreg( 'approximated-curve' );  //TEMP Remove? (removed in P9, P10)

        //TEMP I believe with the standardized code P is set elesewhere?
        //There seems to be similar code in the following ~line 42
        //"src\base\lemma\study-model\kepler-orbit\initiates_orbit8graph.js"
        // rg.P.q = op.PparQ_initial;
        //TEMP I think this should be removed?  Should this code be moved to
        //eg. "config-functions.js"?  I think it was previously used by other
        //similar models before the code standardization occurred.
        // ////creates both curve and its area
        // stdMod.creates_orbitRack();

        //TEMP I believe the following sets the poistion of point P, and
        //probably isn't needed here anymore.
        // {
        //     let {
        //         rr,
        //     } = mcurve.planeCurveDerivatives({
        //         fun : rg[ 'approximated-curve' ].t2xy,
        //         q : op.PparQ_initial,
        //         rrc : rg.S.pos,
        //     });
        //     nspaste( rg.P.pos, rr );
        // }

        //TEMP I believe the sliders function is replaced by the one in the
        //standardized code?  How about the one for zeta (perhaps look at the
        //one for S as a comparison).
        // stdMod.completesSlidersCreation();      //in-diagram sliders
        stdMod.establishesEccentricity( sconf.orbitParameters.eccentricity );

        //TEMP Is the following still needed?
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

        //TEMP Looks like this is commented out for the other models.  Also
        //when it wasn't that function had an error with the new code.
        // stdMod.createsGraphFW( stdMod.legendRoot$ );
        //==================================================
        // \\// decoration graph 
        //==================================================
    }

}) ();

