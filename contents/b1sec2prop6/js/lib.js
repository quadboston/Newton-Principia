( function() {
    var {
        sn, $$, mcurve, bezier,
        ssD,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            curveIsSolvable,
        },
    });
    ssD.curveSTEPS = 1000;
    return;











    ///Returns: false if radius-vector is nearly parallel to
    ///         tangent in some point of the curve
    function curveIsSolvable()
    {
        var NON_SOLVABLE_THRESHOLD = 0.01;
        //too many steps, todm: make analytical validation or
        //make program simpler than planeCurveDerivatives,
        //but if even we have STEPS = 1 million, it still works, very sturdy,
        var STEPS = ssD.curveSTEPS;
        var end_q = bezier.end_q;
        var start_q = bezier.start_q;
        
        var rrc      = rg.S.pos;
        var solvable = true;
        var fun      = bezier.fun;
        var forceGraphArray = [];
        var foldPoints = [];
        var curve = ssD.curve = (new Array(STEPS+1)).fill({});
        
        //how rare we will output graph points on svg
        //ba
        var FORCE_ARRAY_PERIOD = 100; //gives STEPS/FORCE_ARRAY_PERIOD points for graph
        var FORCE_ARRAY_PERIOD = 5; //gives STEPS/FORCE_ARRAY_PERIOD points for graph
        var stepScale=( end_q - start_q ) / STEPS;
        for (var solix=0; solix<=STEPS; solix++ )
        {
            var graphArrRem = solix % FORCE_ARRAY_PERIOD;
            //grows from small to big
            //curve paramter is coordinate x:
            var q = start_q + solix * stepScale;
            var curvePars = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
            var {
                rr,
                r, //from chosen rrc
                r2,
                R,
                bk,
                //cosOmega,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
                staticSectorialSpeed_rrrOnUU,
            } = curvePars;
            curvePars.curveIx = solix;
            curve[solix] = curvePars;
            
            // Kepler's motion: rvₜcos(w) = M
            // f = M²/(Rr²cos³(w))
            cosAbs = Math.abs( sinOmega );
            if( NON_SOLVABLE_THRESHOLD > cosAbs ) {
                solvable = false;
                var nonSolvablePoint = [ rr[0], rr[1] ];
                foldPoints.push( [ rr[0], rr[1] ] );
                //c cc( 'not solvable q='+q+ ' solix='+solix );
                ////////break;
            }


            ///rebuilds forceGraphArray if yet solvable
            //if point falls on the graph grid, do the job:
            if( !graphArrRem ) {
                var comparLaw = -1 / r2;
                var unitlessForce = -1/(R*r2*sinOmega)*bk;
                var forceSafe = Math.max( Math.abs( unitlessForce ), 1e-150 );

                var sectSpeedSafe = 1e-150 > Math.abs( staticSectorialSpeed_rrrOnUU ) ?
                        1e+150 : 1/staticSectorialSpeed_rrrOnUU;
                sectSpeedSafe = Math.abs( sectSpeedSafe );

                if( forceGraphArray.length === 0 ) {
                    var forceMax = forceSafe;
                    var comparLawMin = comparLaw;
                    var speedMax = sectSpeedSafe;
                }

                //-----------------------------------------------------------
                // //\\ builds coefficients at maximum |force|
                //-----------------------------------------------------------
                if( forceMax < forceSafe ) {
                    var forceMax = forceSafe;
                }
                if( comparLawMin > comparLaw ) {
                    var comparLawMin = comparLaw;
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
        // // //if( solvable ){
            stdMod.graphArray = forceGraphArray;
            var arrLen = forceGraphArray.length;
            ///renorms 1/r2 graph for better comparision
            for (var forceArrayIx = 0; forceArrayIx<arrLen; forceArrayIx++ )
            {
                var far = forceGraphArray[ forceArrayIx ];
                far.y[0] = far.y[0] / forceMax;
                far.y[1] = far.y[1] / (-comparLawMin);
                far.y[2] = far.y[2] / speedMax;
            }
        // // //}
        stdMod.pos2qix = pos2qix;
        ssD.solvable = solvable;
        ssD.foldPoints = foldPoints;
        return;


        function pos2qix( pos )
        {
            var q = rg.P.q;
            var qixMax = forceGraphArray.length-1;
            var qix = Math.floor(    ( q - start_q ) / ( end_q - start_q ) * qixMax   );
            return  Math.max( 0, Math.min( qixMax, qix ) );
        }
    }
}) ();

