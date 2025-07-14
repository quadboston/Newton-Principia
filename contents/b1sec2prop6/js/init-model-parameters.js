( function() {
    var { ns, sn, $$, nsmethods, nspaste, nssvg, mcurve, integral, mat, bezier,
        ssF, ssD, sDomN, stdMod, sconf, rg, toreg, } = window.b$l.apptree({
        stdModExportList : { init_model_parameters, }, });
    return;


    function init_model_parameters()
    {
        ///curve pars
        ///sconf is insufficient, there is a fine tuneup,
        {
            let ocp = sconf.originalPoints.curvePivots;
            let pivotsPos = ocp.map( (cp,cpix) => {
                let pos = rg[ 'curvePivots-' + cpix ].pos;
                return [ pos[0], pos[1] ];
            });
            pivotsPos = pivotsPos.map( (pos,cpix) => {
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
                rg[ 'curvePivots-' + cpix ].q = cpix / (pivotsPos.length-1);
                return [ pos[0]*scaleX, pos[1]*scale ];
            }); //map
            rg.P.q = sconf.rgPq;

            //bezier framework generates Optimized Bezier Framework:
            const bezio = ssD.bezio = bezier.preparesOptimizedBezier( pivotsPos );;
            bezio.pivotsPos = pivotsPos;
            ssD.initialPivots = nspaste( [], pivotsPos );

            //reasonable aliasing
            stdMod.q2xy = bezio.fun;

            //fixes small pivots and curve displacements,
            //todm why do they exist in the first place?
            stdMod.bp2cp();
        }
        rg.A.pos = rg[ 'curvePivots-0' ].pos;

        //-----------------------------------------
        // //\\ partially draggers and decoration
        //      are initiated here
        //      todm: not very consistent,
        //-----------------------------------------
        sconf.originalPoints.foldPoints.forEach( (fp,ppix) => {
            fp.rgX = rg[ 'foldPoints-' + ppix ];
            fp.rgX.undisplay = true;
        });
        //-----------------------------------------
        // \\// partially draggers and decoration
        //-----------------------------------------

        stdMod.initiates_orbit8graph();
        stdMod.creates__curve_pivots_sliders();

        //creates placeholder
        toreg( 'curvatureCircle' );

        //possibly good user control for changing diagram scenatio:
        //stdMod.createsChordModeRadioControl();
    }

}) ();

