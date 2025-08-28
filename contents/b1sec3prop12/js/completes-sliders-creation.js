( function() {
    var { 
        sn, mat, mcurve, nspaste, fconf, sData, amode, stdMod, sconf, rg,  
    } = window.b$l.apptree({ 
        stdModExportList : { completesSlidersCreation, },  
    });
    var conics = sn( 'conics', mat );
    var op = sn( 'orbitParameters', sconf );
    return;


    function completesSlidersCreation()
    {
        var op = sconf.orbitParameters;

        //=========================================================================
        // //\\ point P slider
        //=========================================================================
        rg.P.acceptPos = newPos => {
            //Compute x value, using y value as the input to hyperbola equation.
            const y = newPos[1];
            //The following uses eccentricity and latus, which makes the calculation much simpler.
            //While op.A and op.B could potentially be used, at the time of writing this code they
            //sometimes lead to errors (for the parabola/ellipse).  They are calculated to ensure
            //that a and b are always positive and to avoid imaginary numbers (for more details see
            //establishesEccentricity function "makes-orbit.js").  This means that using them would
            //require additional adjustments and be more complicating.
            const denom = op.eccentricity**2 - 1;
            if (denom != 0) {
                //Calculate using the hyperbola equation (in its local coordinate system).
                const xLocalSquared = (op.latus / denom)**2 + y**2 / denom;
                if (xLocalSquared >= 0) {
                    //Offset by point C's x value, so point P ends up in the correct position.
                    //Required because diagram has a different origin than the hyperbola equation.
                    const offset = rg.C.pos[0];
                    //Ensure the sign calculated using sqrt is correct.
                    const x = Math.sign(op.eccentricity - 1) * Math.sqrt(xLocalSquared) + offset;

                    const q = Math.atan2( y, x );
                    rg.P.q = q;
                    nspaste( rg.P.pos, [x, y] );
                }
            }
            
            return true;
        }
        //=========================================================================
        // \\// point P slider
        //=========================================================================


        //=========================================================================
        // //\\ point Q slider
        //      for delta t
        //=========================================================================
        rg.Q.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            sData.r_normal= [ -rg.P.ee[1], rg.P.ee[0] ];
            rg.P.angle = mat.atan2PI( rg.P.pos );
        };

        rg.Q.acceptPos = ( newPos, dragMove ) => {
            let Qangle = mat.atan2PI( newPos );
            var new_dq = Qangle - rg.P.angle;
            ///defloats dq
            if( Math.abs( new_dq ) < 0.0000001 ) {
                new_dq = 0.0000001 * ( new_dq >=0 ? 1:-1 );
            }
            if( !dQisInBranch( new_dq, rg.P.q ) ) return;
            op.sagittaDelta_q = new_dq;
            stdMod.model8media_upcreate();
        }
        //=========================================================================
        // \\// point Q slider
        //=========================================================================


        //=========================================================================
        // //\\ eccentricity slider
        //=========================================================================
        rg.Zeta.acceptPos = newPos => {
            var scale = ( rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0] );
            var modelPar = ( newPos[0] - rg.ZetaStart.pos[0] )
                           / scale;
            modelPar = Math.max( 0.0000000001, Math.min( 0.99999999, modelPar ) );  //validates
            var zeta = Math.PI / 2 * modelPar;
            var eccentricity = Math.tan( zeta );
            if( fconf.sappId === 'b1sec3prop15' && eccentricity > 0.99) {
                ////draws ellipse only
                return;
            }
            //let stashedExc = op.eccentricity;
            stdMod.establishesEccentricity( eccentricity,
                        fconf.sappId !== 'b1sec3prop15' &&
                        "b1sec3prop14" === fconf.effId );

            newPos[0] = rg.Zeta.pos[0];         //corrects
            newPos[1] = rg.ZetaStart.pos[1];    //corrects
            var { angleRV, rr } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : rg.P.q,
                rrc : rg.S.pos,
            });
            nspaste( rg.P.pos, rr );

            return true;
        }
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================

    }

    ///newQ and q are in the same branch => returns true
    function dQisInBranch( dq, q )
    {
        var newQ = q + dq;
        if( op.conicSignum === -1 ) {
            if(
                ( Math.abs( newQ ) <= op.SINGULARITY_ANGLE &&
                  Math.abs( q ) >= op.SINGULARITY_ANGLE ) ||
                ( Math.abs( newQ ) >= op.SINGULARITY_ANGLE &&
                  Math.abs( q ) <= op.SINGULARITY_ANGLE )
            ) return;
        }
        return true;
    }
}) ();

