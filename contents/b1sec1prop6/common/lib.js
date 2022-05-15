( function() {
    var {
        sn, $$, mcurve,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            curveIsSolvable,
        },
    });
    return;











    ///Returns: false if radius-vector is nearly parallel to
    ///         tangent in some point of the curve
    function curveIsSolvable()
    {
        var NON_SOLVABLE_THRESHOLD = 0.01;
        //too many steps, todm: make analytical validation or
        //make program simpler than planeCurveDerivatives,
        //but if even we have STEPS = 1 million, it still works, very sturdy,
        var STEPS    = 10000;
        var xStart   = rg[ 'curvePivots-' +
                           ( sconf.originalPoints.curvePivots.length-1 ) ].pos[0];
        var xEnd     = rg[ 'curvePivots-0' ].pos[0];
        var rrc      = rg.S.pos;
        var solvable = true;
        var fun      = rg[ 'approximated-curve' ].t2xy;
        var forceGraphArray = [];
        var FORCE_ARRAY_FREQUEN = 20; //gives STEPS/FORCE_ARRAY_FREQUEN points for graph
        for (var solix=0; solix<=STEPS; solix++ )
        {
            var graphArrRem = solix % FORCE_ARRAY_FREQUEN;
            var q = xStart + solix * ( xEnd - xStart ) / STEPS;
            var {
                rr,
                r, //from chosen rrc
                r2,
                R,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q,
                rrc,
            });

            // Kepler's motion: rvₜcos(w) = M
            // f = M²/(Rr²cos³(w))
            cosAbs = Math.abs( sinOmega );
            if( NON_SOLVABLE_THRESHOLD > cosAbs ) {
                solvable = false;
                break;
            }



            ///rebuilds forceGraphArray if yet solvable
            if( !graphArrRem ) {
                var comparLaw = 1 / r2;
                var unitlessForce = 1/(R*r2*sinOmega);
                var forceSafe = Math.max( Math.abs( unitlessForce ), 1e-150 );

                var sectSpeedSafe = 1e-150 > Math.abs( staticSectorialSpeed_rrrOnUU ) ?
                        1e+150 : 1/staticSectorialSpeed_rrrOnUU;
                sectSpeedSafe = Math.abs( sectSpeedSafe );

                if( forceGraphArray.length === 0 ) {
                    var forceMax = forceSafe;
                    var comparLawMax = comparLaw;
                    var speedMax = sectSpeedSafe;
                }

                //-----------------------------------------------------------
                // //\\ builds coefficients at maximum |force|
                //-----------------------------------------------------------
                if( forceMax < forceSafe ) {
                    var forceMax = forceSafe;
                }
                if( comparLawMax < comparLaw ) {
                    var comparLawMax = comparLaw;
                }
                if( speedMax < sectSpeedSafe ) {
                    var speedMax = sectSpeedSafe;
                }
                //-----------------------------------------------------------
                // \\// builds coefficients at maximum |force|
                //-----------------------------------------------------------

                forceGraphArray.push({
                    x : r,
                    y : [
                        unitlessForce, //actual
                        comparLaw,
                        //=vt=tangent speed
                        sectSpeedSafe,
                    ],
                });
            }
        }
        ///resets forceGraphArray if solvable
        if( solvable ){
            stdMod.graphArray = forceGraphArray;
            var arrLen = forceGraphArray.length;
            ///renorms 1/r2 graph for better comparision
            for (var forceArrayIx = 0; forceArrayIx<arrLen; forceArrayIx++ )
            {
                var far = forceGraphArray[ forceArrayIx ];
                far.y[0] = far.y[0] / forceMax;
                far.y[1] = far.y[1] / comparLawMax;
                far.y[2] = far.y[2] / speedMax;
            }
        }
        stdMod.pos2qix = pos2qix;
        return { solvable, rr };



        function pos2qix( pos )
        {
            var q = rg.P.pos[0];
            var qixMax = forceGraphArray.length-1;
            var qix = Math.floor(    ( q - xStart ) / ( xEnd - xStart ) * qixMax   );
            return  Math.max( 0, Math.min( qixMax, qix ) );
        }
    }




}) ();

