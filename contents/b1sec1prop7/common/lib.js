( function() {
    var {
        sn, $$, mat, nssvg, mcurve, haz,
        fconf, ssF, ssD, sDomF, toreg, fixedColors,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            //pointsArr_2_doubledDividedDifferences,
            pointsArr_2_singleDividedDifferences,
            //curveIsSolvable,
            builds_forceGraphArray,
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
        var rgX = rg[ 'approximated-curve' ];
        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );

        //sets div.dif. rack, see: **api-outputs---divided-diff
        //return { ...
        //          calculate_polynomial,
        //            //calculates Newton's polynomial at point t
        //            //f : t |-> p(t), p(t) in |R
        //          derivativeAtZero
        //};
        var axy = rg[ 'approximated-curve' ].xy =  mat.calculate_divided_differences( xy );

        var result = {
                //rg[ 'approximated-curve' ] will have these properties:
                axy,
                t2xy, // f : x |-> rr, rr is in |R^2
                trange2points,
                ownrange2points,
                poly2svg,
        };
        Object.assign( rgX, result );
        poly2svg({
        });
        return result;


        function t2xy( x )
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
    function builds_forceGraphArray()
    {
        var xStart   = 0.;
        var xEnd     = Math.PI*2;

        var rrc      = rg.S.pos;
        var fun      = rg[ 'approximated-curve' ].t2xy;
        var forceGraphArray = [];
        var FORCE_ARRAY_LEN = 100;
        for (var forceArrayIx = 0; forceArrayIx<=FORCE_ARRAY_LEN; forceArrayIx++ )
        {
            var t = xStart + forceArrayIx * ( xEnd - xStart ) / FORCE_ARRAY_LEN;
            var {
                rr,
                r, //from chosen rrc
                r2,
                R,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                t,
                rrc,
            });
            // Kepler's motion: rvₜcos(w) = 2K
            // f = 4K²/(Rr²cos³(w))
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

        ///renorms 1/r2 graph for better comparision
        for (var forceArrayIx = 0; forceArrayIx<=FORCE_ARRAY_LEN; forceArrayIx++ )
        {
            //renorms 1/r2 to equalize with force at maximum force point
            forceGraphArray[ forceArrayIx ].y[1] *= forceCoeffMax;
            forceGraphArray[ forceArrayIx ].y[2] *= speedCoef;
        }
        stdMod.graphArray = forceGraphArray;
    }




}) ();

