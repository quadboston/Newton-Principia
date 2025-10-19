( function() {
    var {
        sn, mcurve, mat,
        stdMod, rg, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsforceGraphArray,
            P2gix,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    return;


    function buildsforceGraphArray()
    {
        var xStart   = 0.;
        var xEnd     = sconf.curveParFiMax;
        var rrc      = rg.S.pos;
        var fun      = rg[ 'approximated-curve' ].t2xy;
        var forceGraphArray = [];
        var Q_STEPS = 400;
        for (var forceArrayIx = 0; forceArrayIx<=Q_STEPS; forceArrayIx++ )
        {
            var q = xStart + forceArrayIx * ( xEnd - xStart ) / Q_STEPS;
            var {
                rr, //from coor. sys. orig.
                rOrAbs,
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
            sinOmega = Math.max( 1e-100, sinOmega );
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

            var Dpos = fun( q + Math.PI/2 );
            var Kpos = fun( q + 3/2*Math.PI );
            var DK = [ Kpos[0]-Dpos[0], Kpos[1]-Dpos[1] ];
            var Epos = mat.lineSegmentsCross(
                Dpos, Kpos,
                rrc, rr,
            );
            var EPabs = mat.unitVector( [ Epos[0]- rr[0], Epos[1]- rr[1] ] ).abs;
            forceGraphArray[ forceArrayIx ] = {
                x : q,
                y : [
                    EPabs,
                    rOrAbs, //from origin
                    r, //from new center
                    sconf.ellipseA,
                    0, //decoration: makes graph bottom 0
                ],
            };
        }

        var arrLen = forceGraphArray.length;
        graphArray.length = 0;
        for (let fix = 0; fix<arrLen; fix++ )
        {
            graphArray[ fix ] = forceGraphArray[ fix ];
        }
    }


    function P2gix( pos )
    {
        var q = stdMod.pos2t( rg.P.pos );
        var qixMax = stdMod.graphArray.length-1;
        var qix = Math.floor(   qixMax * q / Math.PI / 2   ); //=angle Ix,
        return Math.max( 0, Math.min( qixMax, qix ) );
    }

}) ();

