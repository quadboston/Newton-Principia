( function() {
    var {
        sn, $$, mat, nssvg, mcurve, haz,
        ssF, ssD, sDomF, toreg, fixedColors,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            //pointsArr_2_doubledDividedDifferences,
            pointsArr_2_singleDividedDifferences,
            curveIsSolvable,
        },
    });
    var pname2point = sn( 'pname2point', sconf );
    //test
    /*
        var { axt, ayt, t2xy, trange2points } =
            stdMod.pointsArr_2_doubledDividedDifferences();        

        var curvePoints = trange2points({ tStart:0, tEnd:9, stepsCount:180 });
        var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
        var psvg = nssvg.polyline({
            pivots  : medpoints, 
            svgel   : psvg,
            parent  : stdMod.svgScene,
        });
    */
    return;








    ///*********************************************************
    ///does all at once: approximates and paints and
    ///ready for calculation at any poit,
    ///uses pivots array as input,
    ///
    ///avoids using "traditional way" curves.js::ssF.paintsCurve
    ///which uses function as input,
    ///*********************************************************
    function pointsArr_2_singleDividedDifferences()
    {
        var xy = [];
        var curveName = 'orbit';
        var lowname = sDomF.topicIdUpperCase_2_underscore( curveName );

        sconf.originalPoints.curvePivots.forEach( (pivot,pix) => {
            var pname = 'curvePivots-'+pix;
            var p = pname2point[pname];
            xy[ pix ] = [ p[0], p[1] ];
        });
        var rgX = toreg( 'approximated-curve' )();
        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );

        //sets the function:
        // **api-outputs---divided-diff
        //return { ...
        //          calculate_polynomial,
        //          //calculates Newton's polynomial at point x
        //          //f : x |-> p(x), p(x) in |R
        // derivativeAtZero }; 
        var axy = rg[ 'approximated-curve' ].xy =  mat.calculate_divided_differences( xy );

        var result = {
                //rg[ 'approximated-curve' ] will have these properties:
                axy,
                x2xy, // f : x |-> rr, rr is in |R^2
                trange2points,
                ownrange2points,
                poly2svg,
        };
        Object.assign( rgX, result );
        poly2svg({
        });
        return result;


        function x2xy( x )
        {
            var pos = [
                x, axy.calculate_polynomial( x ),
            ];
            return pos;
        }

        function trange2points({ tStart, tEnd, stepsCount, })
        {
            var newpoints = [];
            var tstep = ( tEnd - tStart ) / stepsCount;
            for( var tix = 0; tix<=stepsCount; tix++ ) {
                var x = tStart + tstep * tix;
                newpoints.push( [
                    x, axy.calculate_polynomial( x ),
                ]);
            }
            return newpoints;
        }

        function ownrange2points({ stepsCount })
        {
            var tStart = xy[ 0 ][0];
            var tEnd = xy[ xy.length-1 ][0];
            return trange2points({ tStart, tEnd, stepsCount });
        }


        function poly2svg(arg)
        {
            var curvePoints = ownrange2points({ stepsCount:80 });
            var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
            var polylineSvg = rgX.polylineSvg = nssvg.polyline({
                pivots  : medpoints, 
                svgel   : rgX.polylineSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            //##tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );

            /*
            var strokeWidth = haz( arg, 'stroke-width' );
            if( strokeWidth ) {
                polylineSvg.setAttribute( 'stroke-width', strokeWidth );
            }
            */
        }

    }







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
        var fun      = rg[ 'approximated-curve' ].x2xy;
        var forceGraphArray = [];
        var FORCE_ARRAY_LEN = 100;
        for (var solix=0; solix<=STEPS; solix++ )
        {
            var graphArrRem = solix % FORCE_ARRAY_LEN;
            var t = xStart + solix * ( xEnd - xStart ) / STEPS;
            var {
                rr,
                r, //from chosen rrc
                r2,
                R,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].x2xy,
                t,
                rrc,
            });

            // Kepler's motion: rvₜcos(w) = 2K
            // f = 4K²/(Rr²cos³(w))
            cosAbs = Math.abs( sinOmega );
            if( NON_SOLVABLE_THRESHOLD > cosAbs ) {
                solvable = false;
                break;
            }


            ///rebuilds forceGraphArray if yet solvable
            if( !graphArrRem ) {
                var forceArrayIx = ( solix - graphArrRem )
                                   / FORCE_ARRAY_LEN;

                var unitlessForce = 1/(R*r2*sinOmega);
                var fCoefAbs = Math.max( Math.abs( unitlessForce ), 1e-150 );

                //-----------------------------------------------------------
                // //\\ builds coefficients at maximum |force|
                //-----------------------------------------------------------
                if( forceArrayIx === 0 ) {
                var forceMax = fCoefAbs;
                var forceCoeffMax = fCoefAbs / ( 1/r2 );
                    var speedCoef = fCoefAbs / staticSectorialSpeed_rrrOnUU;
                }
                if( fCoefAbs > forceMax ) {
                    var forceMax = fCoefAbs;
                    var forceCoeffMax = fCoefAbs / ( 1/r2 );
                    var speedCoef = fCoefAbs / staticSectorialSpeed_rrrOnUU;
                }
                //-----------------------------------------------------------
                // \\// builds coefficients at maximum |force|
                //-----------------------------------------------------------

                forceGraphArray[ forceArrayIx ] = {
                    x : r,
                    y : [
                        unitlessForce, //actual
                        1 / r2,        //for comparision
                        //=vt=tangent speed
                        staticSectorialSpeed_rrrOnUU,
                    ],
                };
            }
        }
        ///resets forceGraphArray if solvable
        if( solvable ){
            stdMod.graphArray = forceGraphArray;
            ///renorms 1/r2 graph for better comparision
            for (var forceArrayIx = 0; forceArrayIx<=FORCE_ARRAY_LEN; forceArrayIx++ )
            {
                //renorms 1/r2 to equalize with force at maximum force point
                forceGraphArray[ forceArrayIx ].y[1] *= forceCoeffMax;
                forceGraphArray[ forceArrayIx ].y[2] *= speedCoef;
            }
        }
        return { solvable, rr };
    }


    /*
    ///***********************************************************
    ///does job similar to pointsArr_2_singleDividedDifferences(),
    ///but approximates x(t) and y(t) independently,
    ///***********************************************************
    function pointsArr_2_doubledDividedDifferences()
    {
        var xt = [];
        var yt = [];
        sconf.originalPoints.curvePivots.forEach( (pivot,pix) => {
            var pname = 'curvePivots-'+pix;
            ccc( pname, pname2point[pname] );
            var p = pname2point[pname];
            xt[ pix ] = [ pix, p[0] ];
            yt[ pix ] = [ pix, p[1] ];
        });
        toreg( 'approximated-curve' );
        //sets the function:
        var axt = rg[ 'approximated-curve' ].xt = mat.calculate_divided_differences( xt );
        var ayt = rg[ 'approximated-curve' ].yt = mat.calculate_divided_differences( yt );
        return { axt, ayt, t2xy, trange2points, };


        function t2xy( t )
        {
            var pos = [
                axt.calculate_polynomial( t ),
                ayt.calculate_polynomial( t ),
            ];
            return pos;
        }

        function trange2points({ tStart, tEnd, stepsCount })
        {
            var newpoints = [];
            var tstep = ( tEnd - tStart ) / stepsCount;
            for( var tix = 0; tix<=stepsCount; tix++ ) {
                var t = tStart + tstep * tix;
                newpoints.push( [
                    axt.calculate_polynomial( t ),
                    ayt.calculate_polynomial( t ),
                ]);
            }
            return newpoints;
        }
    }
    */


}) ();

