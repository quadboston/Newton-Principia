( function() {
    var { sn, mat, mcurve, nspaste, fconf, sData, amode, stdMod, sconf, rg, } 
        = window.b$l.apptree({ stdModExportList : { completesSlidersCreation, },  });
    var conics = sn( 'conics', mat );
    var op = sn( 'orbitParameters', sconf );
    var sop = sn( 'sampleOrbitParameters', sconf );
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
        // //\\ point Fi slider
        //=========================================================================
        rg.Fi.acceptPos = newPos => {
            var sliderAbs = mat.p1_to_p2( rg.P.pos, rg.omegaHandle.pos ).abs;
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            var q = Math.atan2( newPos[1], newPos[0] );

            var posAbs = mat.unitVector( newPos ).abs;
            //sets handle
            newPos[0] = posAbs*Math.cos( q );
            newPos[1] = posAbs*Math.sin( q );
            if( fconf.effId === "b1sec3prop14" ) {
                //sets main axis
                op.mainAxisAngle = q;
                //fixes P in respect to main axis 
                rg.P.q = op.PparQ_initial - op.mainAxisAngle;
                op.latus = Math.abs( rg.P.abs *
                    (1 - op.eccentricity * Math.cos( rg.P.q ) ) );
            } else {
                //sets body
                rg.P.q = q;
            }
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------

            // **api-input---plane-curve-derivatives
            var { angleRV, rr } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : rg.P.q,
                rrc : rg.S.pos,
            });
            nspaste( rg.P.pos, rr );
            setsOmegaHandle( angleRV, sliderAbs );

            return true;
        }
        //=========================================================================
        // \\// point Fi slider
        //=========================================================================


        //=========================================================================
        // //\\ point L slider
        //      for omega
        //=========================================================================
        rg.L.processOwnDownEvent = function() {
            sData.Lpos0               = rg.L.pos[0];
            sData.Lpos1               = rg.L.pos[1];
            var dShift                = [ rg.L.pos[0] - rg.S.pos[0], rg.L.pos[1] - rg.S.pos[1] ];
            sData.dShift              = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            sData.stashedOmega        = op.om;
            sData.stashedCosOmega     = op.cosOmega;
            sData.stashedLatus4slider = op.latus;
        };

        rg.L.acceptPos = ( newPos, dragMove ) => {
            var { logic_phase, aspect, subessay } = amode;

            var newPos0 = dragMove[0] + sData.Lpos0;
            var newPos1 = -dragMove[1] + sData.Lpos1;

            var dShift = [ newPos0 - rg.S.pos[0], newPos1 - rg.S.pos[1] ];
            var dS     = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            if( dS < 0.00000001 ) return;
            var incr   = dS / sData.dShift;
            if( logic_phase === 'claim' || logic_phase === 'proof' ||
                fconf.sappId === 'b1sec3prop15'
            ){
                //speed on latus, omega = const
                var newLatus = incr * sData.stashedLatus4slider;
                var { e, fi, om, lat, r, eta, Kepler_v } = conics.innerPars2innerPars({
                    r : rg.P.abs * (
                        op.conicSignum === -1 && Math.abs( rg.P.q ) < op.SINGULARITY_ANGLE ?
                            -1 : 1
                        ),
                    lat : newLatus,
                    e   : fconf.sappId === 'b1sec3prop15' ? op.eccentricity : null,
                    om  : fconf.sappId === 'b1sec3prop15' ? null : sData.stashedOmega,
                    fi  : fconf.sappId === 'b1sec3prop15' ? rg.P.q : null,
                    signCosOmega : sData.stashedCosOmega,
                    Kepler_g : op.Kepler_g,
                })
                op.Kepler_v         = Kepler_v;
                rg.P.q              = fi;


                //rotates main axis in respect to change q,
                //bs op.PparQ_initial === initial axis-fi
                //in respect to SP
                op.mainAxisAngle    = op.PparQ_initial - fi;

                op.latus            = newLatus;
                stdMod.establishesEccentricity( e );

                // //\\ decorates Fi handle
                var posAbs = mat.unitVector( rg.Fi.pos ).abs;            
                //sets handle
                rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
                rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
                // \\// decorates Fi handle
            }
            stdMod.model8media_upcreate();
        }
        //=========================================================================
        // \\// point L slider
        //=========================================================================


        //=========================================================================
        // //\\  body speed slider
        //=========================================================================
        rg.vb.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            const pp                    = rg.P.pos;
            sData.vbpos                 = nspaste( [], rg.vb.pos );
            var dShift                  = [ sData.vbpos[0] - pp[0], sData.vbpos[1] - pp[1] ];
            var dS                      = dShift[0]*dShift[0] + dShift[1]*dShift[1];
            sData.stashedOmega          = op.om;
            sData.stashedCosOmega       = op.cosOmega;
            sData.dShift                = dS;
            sData.Kepler_v_stashed      = op.Kepler_v;
            sData.stashedR              = rg.P.abs;
            sData.stashedLatus4slider   = op.latus;
        };

        rg.vb.acceptPos = ( newPos, dragMove ) => {
            var { logic_phase, aspect, subessay } = amode;
            var newPos0  = dragMove[0] + sData.vbpos[0];
            var newPos1  = -dragMove[1] + sData.vbpos[1];
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //      todm redundant code
            //-------------------------------------------------------------------
            var newSinOmega = sData.stashedOmega;
            var signCosOmega = Math.sign( sData.stashedCosOmega );
            
            // the value of omega being calculated here is slightly off
            // using sData.stashedOmega prevents error, by limiting to only
            // changes in magnitude of Pv, not the angle
            // this is also used in P14
            if( fconf.sappId === 'b1sec3prop16' ) {
                const pp      = rg.P.pos;
                const sl      = mat.p1_to_p2( pp, newPos ); //slider
                if( sl.abs < 0.2 ) return;
                let omega = mat.angleBetweenLines([
                    [ [0,0], pp ],
                    [ [0,0], sl.vector ], 
                ]).angle;
                //--------------------------------
                // //\\ corrects extreme values
                //--------------------------------
                {
                    //excludes unsafe values
                    let LIM = Math.PI * 0.99999;
                    if( Math.abs( omega ) > LIM ){
                        omega = Math.sign( omega ) > 0 ? LIM : -LIM;
                    }
                    if( Math.abs( omega ) < 0.000001 ){
                        omega = Math.sign( omega ) > 0 ? 0.000001 : -0.000001;
                    }
                }

                //--------------------------------
                // \\// corrects extreme values
                //--------------------------------
                var newSinOmega = Math.sin( omega );
                var signCosOmega = Math.sign( Math.cos( omega ) );
            }
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------

            var dShift   = [ newPos0 - rg.P.pos[0], newPos1 - rg.P.pos[1] ];
            var dS       = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase = dS / sData.dShift;

            var Kepler_v = sData.Kepler_v_stashed * increase;
            if( fconf.sappId === 'b1sec3prop14' &&
                Math.abs( Kepler_v/op.Kepler_v_initial ) > op.delta_v_increase_LIMIT ){
                return;
            }

            var momentumIncrease = increase * Math.abs( newSinOmega / sData.stashedOmega );
            var latus    = sData.stashedLatus4slider * momentumIncrease * momentumIncrease;
            var { e, fi, om, cosOmega, lat, r, eta, } = conics.innerPars2innerPars({
                r   : sData.stashedR, //rg.P.abs
                om  : newSinOmega,
                lat : latus,
                signCosOmega,
            });
            rg.P.q              = fi;
            op.cosOmega         = cosOmega;
            op.om               = om;

            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            op.mainAxisAngle    = op.PparQ_initial - fi;
            op.latus            = latus;
            op.Kepler_v         = Kepler_v;
            stdMod.establishesEccentricity( e );

            //------------------------------------------------
            // //\\ decorates Fi handle
            //------------------------------------------------
            var posAbs = mat.unitVector( rg.Fi.pos ).abs;            
            //sets handle
            rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
            rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
            //------------------------------------------------
            // \\// decorates Fi handle
            //------------------------------------------------

            stdMod.model8media_upcreate();
        }
        //=========================================================================
        // \\// body speed slider
        //=========================================================================



        //=========================================================================
        // //\\ omega slider
        //=========================================================================
        rg.omegaHandle.processOwnDownEvent = function() {
            sData.stashedOmega = rg.P.sinOmega;
            sData.stashedLatus4slider = op.latus;
        };

        rg.omegaHandle.acceptPos = ( newPos, dragMove ) => {
            var { logic_phase, aspect, subessay } = amode;
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            const pp      = rg.P.pos;
            const sl      = mat.p1_to_p2( pp, newPos );
            if( sl.abs < 0.2 ) return;
            let omega = mat.angleBetweenLines([
                [ [0,0], pp ],
                [ [0,0], sl.vector ], 
            ]).angle;
            //--------------------------------
            // //\\ corrects extreme values
            //--------------------------------
            {
                //excludes unsafe values
                let LIM = Math.PI * 0.99999;
                if( Math.abs( omega ) > LIM ){
                    omega = Math.sign( omega ) > 0 ? LIM : -LIM;
                }
                if( Math.abs( omega ) < 0.000001 ){
                    omega = Math.sign( omega ) > 0 ? 0.000001 : -0.000001;
                }
            }

            //--------------------------------
            // \\// corrects extreme values
            //--------------------------------
            setsOmegaHandle( omega, sl.abs );
            var newSinOmega = Math.sin( omega );
            var signCosOmega = Math.sign( Math.cos( omega ) );
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------

            let incr = newSinOmega / sData.stashedOmega;
            ////apparently emulates latus rectum via omege when speed === const and
            ////force law is const
            var newLatus = incr*incr * sData.stashedLatus4slider;

            //-----------------------------------------------------
            // //\\ corollary 1
            //      if( fconf.sappId === 'b1sec3prop16' ) {
            //-----------------------------------------------------
            //latus and omega do change
            var { e, fi, lat, r, eta, cosOmega, om, Kepler_v } = conics.innerPars2innerPars({
                r : rg.P.abs,
                lat : newLatus,
                om : newSinOmega,
                signCosOmega,
                Kepler_g : op.Kepler_g,
            });
            op.cosOmega         = cosOmega;
            op.om               = om;

            op.Kepler_v         = Kepler_v;
            rg.P.q              = fi;
            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            op.mainAxisAngle    = op.PparQ_initial - fi;
            op.latus            = newLatus;
            stdMod.establishesEccentricity( e );

            // //\\ decorates Fi handle
            {
                let posAbs = mat.unitVector( rg.Fi.pos ).abs;
                //sets handle
                rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
                rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
            }
            // \\// decorates Fi handle
            //-----------------------------------------------------
            // \\// corollary 1
            //-----------------------------------------------------
            //--------------------------------------------------------------------
            // //\\ lets validators to do the job
            //--------------------------------------------------------------------

            stdMod.model8media_upcreate();
            //--------------------------------------------------------------------
            // \\// lets validators to do the job
            //--------------------------------------------------------------------
        }
        //=========================================================================
        // \\// omega slider
        //=========================================================================


        //=========================================================================
        // //\\ eccentricity slider
        //=========================================================================
        rg.Zeta.acceptPos = newPos => {
            var sliderAbs = mat.p1_to_p2( rg.P.pos, rg.omegaHandle.pos ).abs;
            var scale = ( rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0] );
            var modelPar = ( newPos[0] - rg.ZetaStart.pos[0] )
                           / scale;
            modelPar = Math.max( 0.0000000001, Math.min( 0.99999999, modelPar ) );  //validates
            var zeta = Math.PI / 2 * modelPar;
            var eccentricity = Math.tan( zeta );
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
            setsOmegaHandle( angleRV, sliderAbs );

            return true;
        }
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================

    }

    //"normalizes" slider by omega and position of point rg.P.pos
    function setsOmegaHandle( omega, sliderAbs )
    {
        const pp = rg.P.pos;
        const up = mat.unitVector( pp ).unitVec; //unit radius vector
        const rv = mat.rotatesVect( up, omega ); //radius vector rotated up to handle direction
        const np = mat.sm( pp, sliderAbs, rv );  //A,b,B, handle-vector scaled to value of sliderAbs
                                                 //and ofsetted from rg.P.pos
        nspaste( rg.omegaHandle.pos, np );
    }

}) ();

