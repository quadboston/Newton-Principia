( function() {
    var {
        sn, has, mat, mcurve, nspaste,
        fconf, sData,
        amode, stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            completesSlidersCreation,
            //setsOmegaHandle,
        },
    });
    var conics = sn( 'conics', mat );
    var op = sn( 'orbitParameters', sconf );
    var sop = sn( 'sampleOrbitParameters', sconf );

    sconf.REPELLING_DISTANCE = 0.01;
    return;













    function completesSlidersCreation()
    {
        var op = sconf.orbitParameters;

        //=========================================================================
        // //\\ point P slider
        //=========================================================================
        rg.Fi.acceptPos = newPos => {

            var sliderAbs = mat.p1_to_p2( rg.P.pos, rg.Yhandle.pos ).abs;
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
        // \\// point P slider
        //=========================================================================



        //=========================================================================
        // //\\ point Q slider
        //      for delta t
        //=========================================================================
        rg.Q.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            sData.Qpos0 = rg.Q.pos[0];
            sData.Qpos1 = rg.Q.pos[1];
            if( fconf.effId === "b1sec3prop14" ) {
                var deltaShift = [ rg.Q.pos[0] - rg.P.pos[0], rg.Q.pos[1] - rg.P.pos[1] ];
                var deltaMove = ( rg.P.uu[0] * deltaShift[0] + rg.P.uu[1] * deltaShift[1] );
                sData.delta_t_crude = deltaMove / op.delta_t_initial;
                sData.delta_t = op.delta_t;
                sData.stashedLatus4slider = op.latus;
                var { sinOmega, } = mcurve.planeCurveDerivatives({
                    fun : rg[ 'approximated-curve' ].t2xy,
                    q : rg.P.q,
                    rrc : rg.O.pos,
                });
                sData.stashedOmega = sinOmega;
                //sData.eSphi0 = op.eccentricity * Math.sin( rg.P.q );
            }
        };

        rg.Q.acceptPos = ( newPos, dragMove ) => {
            var newPos0 = dragMove[0] + sData.Qpos0;
            var newPos1 = -dragMove[1] + sData.Qpos1;

            if( fconf.effId === 'b1sec3prop14' ) {
                ////controls delta t
                var deltaShift = [ newPos0 - rg.P.pos[0], newPos1 - rg.P.pos[1] ];
                var deltaMove = rg.P.uu[0] * deltaShift[0] + rg.P.uu[1] * deltaShift[1];
                var delta_t = deltaMove / op.delta_t_initial;

                var delta_t = delta_t * sData.delta_t / sData.delta_t_crude;
                if( Math.abs( delta_t ) > op.delta_t_LIMIT ) return false;
                op.delta_t = delta_t;

            } else {
                ////controls sagitta chord parameter 
                var pos2 = newPos0*newPos0 + newPos1*newPos1;
                if( pos2 < 0.0000000000001 ) return false;
                //var Qq = stdMod.posQ_2_andgleInPIandMinusPI( [newPos0,newPos1] );
                var Qq = Math.atan2( newPos[1], newPos[0] ) - op.mainAxisAngle;
                //at the moment Qq is an internal conics-focused-angle
                {
                    let PI2 = Math.PI*2;
                    var sagittaDelta_q_1 = ( Qq - rg.P.q + PI2*3) % PI2;
                    var sagittaDelta_q_2 = ( rg.P.q - Qq + PI2*3) % PI2;
                    var sagittaDelta_q = sagittaDelta_q_1 > sagittaDelta_q_2 ? 
                            -sagittaDelta_q_2 : sagittaDelta_q_1;
                    if( Math.abs( sagittaDelta_q ) > Math.PI/3 ) {
                        ////trying case of hyperbola when rg.P.q is inversed, so
                        ////Qq must be inversed too, see 3.5 instead of 3:
                        var sagittaDelta_q_1 = ( Qq - rg.P.q + PI2*3.5) % PI2;
                        var sagittaDelta_q_2 = ( rg.P.q - Qq + PI2*3.5) % PI2;
                        var sagittaDelta_q = sagittaDelta_q_1 > sagittaDelta_q_2 ? 
                                -sagittaDelta_q_2 : sagittaDelta_q_1;
                    }
                }
                //sagitta will be validated in unique place in model_upcreate, because
                //validation must be done for other sliders too,
                if( Math.abs( sagittaDelta_q ) > Math.PI/3 ) {
                    return false;
                }
                if( sagittaDelta_q === 0 ) {
                    //// prevents delta becoming zero
                    sagittaDelta_q = rg.P.q - sconf.REPELLING_DISTANCE;
                }
                op.sagittaDelta_q = sagittaDelta_q;
            }

            //--------------------------------------------------------------------
            // //\\ lets validators to do the job
            //--------------------------------------------------------------------
            stdMod.model8media_upcreate();
            return false;
            //--------------------------------------------------------------------
            // \\// lets validators to do the job
            //--------------------------------------------------------------------
        }
        //=========================================================================
        // \\// point Q slider
        //=========================================================================





        //=========================================================================
        // //\\ omega slider
        //=========================================================================
        rg.Yhandle.processOwnDownEvent = function() {
            sData.stashedOmega = rg.P.sinOmega;
            sData.stashedLatus4slider = op.latus;
        };

        rg.Yhandle.acceptPos = ( newPos, dragMove ) => {
            var { theorion, aspect, submodel, subessay } = amode;
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            {
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
                //sets handle
                setsOmegaHandle( omega, sl.abs );
                var newSinOmega = Math.sin( omega );
                var signCosOmega = Math.sign( Math.cos( omega ) );
            }
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------

            var newLatus = sData.stashedLatus4slider;
            if( subessay === 'corollary1' && fconf.sappId === "b1sec3prop16" ){
                let incr = newSinOmega / sData.stashedOmega;
                ////apparently emulates latus rectum via omege when speed === const and
                ////force law is const
                var newLatus = incr*incr * sData.stashedLatus4slider;
            }
            //-----------------------------------------------------
            // //\\ corollary 1
            //      if( fconf.sappId === 'b1sec3prop16' ) {
            //-----------------------------------------------------
            //latus and omega do change
            var { e, fi, lat, r, eta, Kepler_v } = conics.innerPars2innerPars({
                r : rg.P.abs * (
                    op.conicSignum === -1 && Math.abs( rg.P.q ) < op.SINGULARITY_ANGLE ?
                        -1 : 1
                    ),
                lat : newLatus,
                om : newSinOmega,
                signCosOmega,
                Kepler_g : op.Kepler_g,
            });
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
            return;
            //--------------------------------------------------------------------
            // \\// lets validators to do the job
            //--------------------------------------------------------------------
        }
        //=========================================================================
        // \\// omega slider
        //=========================================================================






        //=========================================================================
        // //\\ point L slider
        //      for omega
        //=========================================================================
        rg.L.processOwnDownEvent = function() {
            sData.Lpos0 = rg.L.pos[0];
            sData.Lpos1 = rg.L.pos[1];
            var dShift = [ rg.L.pos[0] - rg.S.pos[0], rg.L.pos[1] - rg.S.pos[1] ];
            var dS = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            sData.dShift = dS;
            var { sinOmega, cosOmega } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : rg.P.q,
                rrc : rg.O.pos,
            });
            sData.stashedOmega = sinOmega;
            sData.stashedCosOmega = cosOmega;
            sData.stashedLatus4slider = op.latus;
        };

        rg.L.acceptPos = ( newPos, dragMove ) => {
            var { theorion, aspect, submodel, subessay } = amode;

            var newPos0 = dragMove[0] + sData.Lpos0;
            var newPos1 = -dragMove[1] + sData.Lpos1;

            var dShift = [ newPos0 - rg.S.pos[0], newPos1 - rg.S.pos[1] ];
            var dS = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            if( dS < 0.00000001 ) return;
            var incr = dS / sData.dShift;
            if( theorion === 'claim' || theorion === 'proof' ||
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
            //--------------------------------------------------------------------
            // //\\ lets validators to do the job
            //--------------------------------------------------------------------
            stdMod.model8media_upcreate();
            //--------------------------------------------------------------------
            // \\// lets validators to do the job
            //--------------------------------------------------------------------
        }
        //=========================================================================
        // \\// point L slider
        //=========================================================================



        //=========================================================================
        // //\\ gamma slider
        //      for omega
        //=========================================================================
        rg.f.processOwnDownEvent = function() {

            //--------------------------------------------------------
            // //\\ stashes sample
            //--------------------------------------------------------
            sData.Lpos0_g = rg.f.pos[0];
            sData.Lpos1_g = rg.f.pos[1];
            {
                let dShift    = [ rg.f.pos[0] - rg.p.pos[0],
                               rg.f.pos[1] - rg.p.pos[1] ];
                sData.dShift_g = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
                let { sinOmega, cosOmega } = mcurve.planeCurveDerivatives({
                    fun : rg[ 'approximated-curve-sample' ].t2xy,
                    q : rg.p.q,
                    rrc : rg.O.pos,
                });
                sData.stashedOmega_g = sinOmega;
                sData.stashedCosOmega_g = cosOmega;
            }
            sData.stashedKepler_g = op.Kepler_g;
            sData.stashedKepler_v = sop.Kepler_v;
            sData.stashedLatus_g = sop.latus;
            //--------------------------------------------------------
            // \\// stashes sample
            //--------------------------------------------------------

            //--------------------------------------------------------
            // //\\ stashes solved
            //--------------------------------------------------------
            let { sinOmega, cosOmega } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : rg.P.q,
                rrc : rg.O.pos,
            });
            sData.stashedOmega = sinOmega;
            sData.stashedCosOmega = cosOmega;
            sData.stashedLatus = op.latus;
            //--------------------------------------------------------
            // \\// stashes solved
            //--------------------------------------------------------
        };

        rg.f.acceptPos = ( newPos, dragMove ) => {
            var { theorion, aspect, submodel, subessay } = amode;
            var newPos0 = dragMove[0] *
                          0.5 //decreases slider sensetivity
                         + sData.Lpos0_g;
            var newPos1 = -dragMove[1] *
                          0.5 //decreases slider sensetivity
                         + sData.Lpos1_g;
            var incr;
            {
                let dShift = [ newPos0 - rg.p.pos[0], newPos1 - rg.p.pos[1] ];
                var dS = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
                if( dS < 0.00000001 ) return;
                incr = dS / sData.dShift_g;
            }

            //-------------------------------------------
            // //\\ sample
            //-------------------------------------------
            var Kepler_g = sData.stashedKepler_g * incr;

            if( fconf.sappId === 'b1sec3prop17' && amode.subessay === 'corollary2' ){
                var newLatus = sData.stashedLatus_g;
                sop.Kepler_v = sData.stashedKepler_v * Math.sqrt( incr );
            } else {
                var newLatus = sData.stashedLatus_g / incr;
            }

            var { e, fi } = conics.innerPars2innerPars({
                r : rg.p.abs,
                lat : newLatus,
                om  : sData.stashedOmega_g,
                signCosOmega : sData.stashedCosOmega_g,
                Kepler_g,
            });
            sop.Kepler_g = Kepler_g;
            op.Kepler_g = Kepler_g;
            sop.latus = newLatus;

            if( !( fconf.sappId === 'b1sec3prop17' && amode.subessay === 'corollary2' ) ){
                rg.p.q = fi;
                //rotates main axis in respect to change q,
                //bs op.PparQ_initial === initial axis-fi
                //in respect to SP
                sop.mainAxisAngle = sop.r2axisX_angle - fi;
            }
            stdMod.establishesEccentricity( e, !'doAdjustLatus', sop );
            //-------------------------------------------
            // \\// sample
            //-------------------------------------------

            //--------------------------------
            // //\\ reestablish solved-orbit
            //--------------------------------
            let solvedLatus = sData.stashedLatus / incr;
            let p17c12 = fconf.sappId === 'b1sec3prop17' &&
                ( amode.subessay === 'corollary1' || amode.subessay === 'corollary2' );
            var { e, fi } = conics.innerPars2innerPars({
                r : ( p17c12 ? rg.P.posInitialUnitVector.abs : rg.P.abs ) *
                    1,  //We do enforce here only positive branch, no matter is this
                        //ellipse or hyperbola.
                lat : solvedLatus,
                om  : sData.stashedOmega,
                signCosOmega : sData.stashedCosOmega,  // -1 for for cor.
            })
            if( p17c12 ){
                if( e > 1 ) {
                    op.mainAxisAngle = -Math.PI;
                }
            }

            rg.P.q              = fi;
            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            op.mainAxisAngle    = op.PparQ_initial - fi;
            op.latus            = solvedLatus;
            stdMod.establishesEccentricity( e );
            // //\\ decorates Fi handle
            var posAbs = mat.unitVector( rg.Fi.pos ).abs;            
            //sets handle
            rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
            rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
            // \\// decorates Fi handle
            //--------------------------------
            // \\// reestablish solved-orbit
            //--------------------------------------------------------------------
            // //\\ lets validators to do the job
            //--------------------------------------------------------------------
            stdMod.model8media_upcreate();
            //--------------------------------------------------------------------
            // \\// lets validators to do the job
            //--------------------------------------------------------------------
        }
        //=========================================================================
        // \\// gamma slider
        //=========================================================================



        //=========================================================================
        // //\\ point R slider
        //      for Kepler_v
        //=========================================================================
        rg.R.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            sData.Rpos0 = rg.R.pos[0];
            sData.Rpos1 = rg.R.pos[1];
            var dShift = [ rg.R.pos[0] - rg.P.pos[0], rg.R.pos[1] - rg.P.pos[1] ];
            //var dS = ( rg.P.uu[0] * dShift[0] + rg.P.uu[1] * dShift[1] );
            var dS = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var { sinOmega, cosOmega } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].t2xy,
                q : rg.P.q,
                rrc : rg.O.pos,
            });
            sData.stashedOmega          = sinOmega;
            sData.stashedCosOmega       = cosOmega;
            sData.dShift                = dS;
            sData.Kepler_v_stashed      = op.Kepler_v;
            sData.stashedR              = rg.P.abs;
            sData.stashedLatus4slider   = op.latus;
        };

        rg.R.acceptPos = ( newPos, dragMove ) => {
            var { theorion, aspect, submodel, subessay } = amode;

            var newPos0  = dragMove[0] + sData.Rpos0;
            var newPos1  = -dragMove[1] + sData.Rpos1;

            var dShift   = [ newPos0 - rg.P.pos[0], newPos1 - rg.P.pos[1] ];
            var dS       = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase = dS / sData.dShift;
            var Kepler_v = sData.Kepler_v_stashed * increase;
            var latus    = sData.stashedLatus4slider * increase * increase;

            var { e, fi, om, lat, r, eta, } = conics.innerPars2innerPars({
                r : sData.stashedR * (
                    op.conicSignum === -1 && Math.abs( rg.P.q ) < op.SINGULARITY_ANGLE ?
                        -1 : 1
                    ),
                om : sData.stashedOmega,
                lat : latus, 
            })
            rg.P.q              = fi;

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

            //--------------------------------------------------------------------
            // //\\ lets validators to do the job
            //--------------------------------------------------------------------
            stdMod.model8media_upcreate();
            return false;
            //--------------------------------------------------------------------
            // \\// lets validators to do the job
            //--------------------------------------------------------------------
        }
        //=========================================================================
        // \\// point R slider
        //=========================================================================



        //=========================================================================
        // //\\ point r slider
        //      for Kepler_v
        //=========================================================================
        rg.vSample.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            sData.pos_r = [];
            nspaste( sData.pos_r, rg.vSample.pos );

            var dShift = mat.sm( 1, rg.vSample.pos, -1, rg.p.pos );
            sData.dShift_r = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );

            var { sinOmega, cosOmega } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve-sample' ].t2xy,
                q   : rg.p.q,
                rrc : rg.O.pos,
            });
            sData.stashedOmega_r        = sinOmega;
            sData.stashedCosOmega_r     = cosOmega;
            sData.Kepler_v_stashed_r    = sop.Kepler_v;
            sData.stashedR_r            = rg.p.abs;
            sData.stashedLatus4slider_r = sop.latus;
        };

        rg.vSample.acceptPos = ( newPos, dragMove ) => {
            var { theorion, aspect, submodel, subessay } = amode;
            let np       = [];
            np[0]        = dragMove[0] + sData.pos_r[0];
            np[1]        = -dragMove[1] + sData.pos_r[1];
            var dShift   = mat.sm( 1, np, -1, rg.p.pos );
            var dS       = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase = dS / sData.dShift_r;
            var Kepler_v = sData.Kepler_v_stashed_r * increase;
            //in chosen scenario, speed changes force's constant gamma, no latus change
            var latus    = sData.stashedLatus4slider_r * increase * increase;
            var { e, fi, om, lat, r, eta, } = conics.innerPars2innerPars({

                r : sop.r,
                //apparently, we can restrict ourself with positive r ouside of
                //condition, i.e. in positive conic branch:
                //  sop.conicSignum === -1 && Math.abs( rg.p.q ) < sop.SINGULARITY_ANGLE ?
                //  -1 : 1

                om : sData.stashedOmega_r,
                signCosOmega : sData.stashedCosOmega_r,
                lat : latus, 
            })
            rg.p.q = fi;

            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            //sop.mainAxisAngle    = sop.mainAxisAngle - fi;
            sop.mainAxisAngle    = sop.r2axisX_angle - fi;
            sop.latus            = latus;
            sop.Kepler_v         = Kepler_v;
            stdMod.establishesEccentricity( e, null, sop );
            //start here

            //--------------------------------------------------------------------
            // //\\ lets validators to do the job
            //--------------------------------------------------------------------
            stdMod.model8media_upcreate();
            return false;
            //--------------------------------------------------------------------
            // \\// lets validators to do the job
            //--------------------------------------------------------------------
        }
        //=========================================================================
        // \\// point r slider
        //=========================================================================




        //=========================================================================
        // //\\ point S slider
        //=========================================================================
        {
            let stashedPos = null;
            let sp = rg.S.pos;
            rg.S.processOwnDownEvent = () => {
                stashedPos = [ sp[0], sp[1] ];
            };

            rg.S.processOwnUpEvent = () => {
                sp[0] = stashedPos[0];
                sp[1] = stashedPos[1];
            };

            rg.S.acceptPos = newPos => {
                if( mat.p1_to_p2( newPos, sconf.diagramOrigin ).abs > -1 ) {
                    stashedPos[0] = newPos[0];
                    stashedPos[1] = newPos[1];
                }
                return true;
            }
        }
        //=========================================================================
        // \\// point S slider
        //=========================================================================



        //=========================================================================
        // //\\ eccentricity slider
        //=========================================================================
        rg.Zeta.acceptPos = newPos => {
            var sliderAbs = mat.p1_to_p2( rg.P.pos, rg.Yhandle.pos ).abs;
            var scale = ( rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0] );
            var modelPar = ( newPos[0] - rg.ZetaStart.pos[0] )
                           / scale;
            modelPar = Math.max( 0.0000000001, Math.min( 0.99999999, modelPar ) );  //validates
            var zeta = Math.PI / 2 * modelPar;
            var eccentricity = Math.tan( zeta );
            if( fconf.sappId === 'b1sec3prop15' && eccentricity > 0.99) {
                ///draws ellipse only
                return;
            }
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


    function setsOmegaHandle( omega, sliderAbs )
    {
        const pp = rg.P.pos;
        const up = mat.unitVector( pp ).unitVec;
        const rv = mat.rotatesVect( up, omega );
        const np = mat.sm( pp, sliderAbs, rv ); //A,b,B
        nspaste( rg.Yhandle.pos, np );
    }

}) ();

