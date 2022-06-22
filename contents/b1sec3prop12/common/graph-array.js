( function() {
    var {
        sn, mcurve,
        stdMod, rg, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsforceGraphArray,
            pos2qix,
        },
    });
    return;


    function buildsforceGraphArray()
    {
        var xStart   = 0.;
        var xEnd     = sconf.curveParFiMax;
        var rrc      = rg.S.pos;
        var fun      = rg[ 'approximated-curve' ].t2xy;
        var forceGraphArray = [];
        var FORCE_ARRAY_LEN = 400;
        for (var forceArrayIx = 0; forceArrayIx<=FORCE_ARRAY_LEN; forceArrayIx++ )
        {
            var q = xStart + forceArrayIx * ( xEnd - xStart ) / FORCE_ARRAY_LEN;
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
            var sinAbs = Math.abs( sinOmega );
            if( sinAbs < 1e-100 ) {
                sinOmega = 1e-100 * Math.sign( sinOmega );
            }

            // Kepler's motion: rvₜcos(w) = M
            // f = M²/(Rr²cos³(w))
            var sinOmega2 = sinOmega*sinOmega;

            //M is excluded in following lines:
            var comparLaw = 1/r2;
            var unitlessForce = 1/(R*r2*sinOmega*sinOmega2);
            var forceSafe = Math.max( Math.abs( unitlessForce ), 1e-150 );

            var sectSpeedSafe = 1e-150 > Math.abs( staticSectorialSpeed_rrrOnUU ) ?
                    1e+150 : 1/staticSectorialSpeed_rrrOnUU;
            sectSpeedSafe = Math.abs( sectSpeedSafe );

            //-----------------------------------------------------------
            // //\\ builds coefficients at maximum |force|
            //-----------------------------------------------------------
            if( forceArrayIx === 0 ) {
                var forceMax        = forceSafe;
                var comparLawMax    = comparLaw;
                var speedMax        = sectSpeedSafe;
            }
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

            forceGraphArray[ forceArrayIx ] = {
                x : Math.log( r ),
                y : [
                        comparLaw,      //for comparision
                        unitlessForce, //actual
                        //=vt=tangent speed
                        sectSpeedSafe,
                ],
            };
        }

        var arrLen = forceGraphArray.length;
        stdMod.graphArray = [];
        for (var forceArrayIx = 0; forceArrayIx<arrLen; forceArrayIx++ )
        {
            var far = forceGraphArray[ forceArrayIx ];
            far.y[0] = far.y[0] / comparLawMax;
            //force element is second to visually overlap by force color
            far.y[1] = far.y[1] / forceMax;
            far.y[2] = far.y[2] / speedMax;
        }
        stdMod.graphArray = forceGraphArray;
    }


    function pos2qix( pos )
    {
        var q = stdMod.pos2t( rg.P.pos );
        var qixMax = stdMod.graphArray.length-1;
        var qix = Math.floor(   qixMax * q / Math.PI / 2   ); //=angle Ix,
        return Math.max( 0, Math.min( qixMax, qix ) );
    }

}) ();

