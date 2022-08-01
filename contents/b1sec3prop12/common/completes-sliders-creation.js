( function() {
    var {
        sn, mat, mcurve,
        fconf, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            completesSlidersCreation,
        },
    });

    sconf.REPELLING_DISTANCE = 0.01;
    return;













    ///****************************************************
    ///****************************************************
    function completesSlidersCreation()
    {
        //=========================================================================
        // //\\ point P slider
        //=========================================================================
        rg.Fi.acceptPos = newPos => {
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            var op = sconf.orbitParameters;
            var q = Math.atan2( newPos[1], newPos[0] );
            var posAbs = mat.unitVector( newPos ).abs;            
            //sets handle
            newPos[0] = posAbs*Math.cos( q );
            newPos[1] = posAbs*Math.sin( q );
            if( fconf.effId === "b1sec3prop14" ) {
                //sets axis
                op.mainAxisAngle = q;
                rg.P.q = sconf.PparQ - op.mainAxisAngle; //fixes P and moves Axis
                op.latus = Math.abs( rg.P.abs *
                    (1 - op.eccentricity * Math.cos( rg.P.q ) ) );
            } else {
                //sets body
                rg.P.q = q;
            }
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
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
                sData.delta_t_crude = deltaMove / op.arcSpeed_initial;
                sData.delta_t = op.delta_t;
                sData.stashedLatus4slider = op.latus;
                var { sinOmega, } = mcurve.planeCurveDerivatives({
                    fun : rg[ 'approximated-curve' ].t2xy,
                    q : rg.P.q,
                    rrc : rg.O.pos,
                });
                sData.stashedOmega = sinOmega;
                sData.eSphi0 = op.eccentricity * Math.sin( rg.P.q );
            }
        };

        rg.Q.acceptPos = ( newPos, dragMove ) => {
            var op = sconf.orbitParameters;

            var newPos0 = dragMove[0] + sData.Qpos0;
            var newPos1 = -dragMove[1] + sData.Qpos1;

            if( fconf.effId === 'b1sec3prop14' ) {
                var deltaShift = [ newPos0 - rg.P.pos[0], newPos1 - rg.P.pos[1] ];
                var deltaMove = rg.P.uu[0] * deltaShift[0] + rg.P.uu[1] * deltaShift[1];
                var delta_t = deltaMove / op.arcSpeed_initial;

                var delta_t = delta_t * sData.delta_t / sData.delta_t_crude;
                if( Math.abs( delta_t ) > op.delta_t_LIMIT ) return false;

                if( fconf.sappId === 'b1sec3prop16' ) {

                    //-----------------------------------------------------
                    // //\\ corollary 1
                    //-----------------------------------------------------
                    var latusIncrease = ( delta_t*delta_t ) / (sData.delta_t*sData.delta_t);
                    var newLatus = latusIncrease * sData.stashedLatus4slider;
                    var relativeLatus = newLatus / rg.P.abs;

                    var eSphi = sData.eSphi0 * latusIncrease;
                    var newFi = Math.atan( eSphi / (1-relativeLatus) );
                    rg.P.q = newFi;
                    op.mainAxisAngle = sconf.PparQ - rg.P.q;
                    var newExcentricity = (1-relativeLatus) / Math.cos( newFi );

                    op.latus = newLatus;
                    stdMod.establishesEccentricity( newExcentricity );
                    var { sinOmega, } = mcurve.planeCurveDerivatives({
                        fun : rg[ 'approximated-curve' ].t2xy,
                        q : rg.P.q,
                        rrc : rg.O.pos,
                    });
                    var newV = sData.delta_t * Math.sqrt( newLatus/sData.stashedLatus4slider )
                               * sData.stashedOmega / sinOmega;
                    op.delta_t = newV;

                    // //\\ decorates Fi handle
                    var posAbs = mat.unitVector( rg.Fi.pos ).abs;            
                    //sets handle
                    rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
                    rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
                    // \\// decorates Fi handle
                    //-----------------------------------------------------
                    // \\// corollary 1
                    //-----------------------------------------------------

                } else {
                    op.delta_t = delta_t;
                }
            } else {
                //--------------------------------------------------------------------
                // //\\ estimates sagitta chord parameter 
                //--------------------------------------------------------------------
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
                sconf.orbitParameters.sagittaDelta_q = sagittaDelta_q;
                //--------------------------------------------------------------------
                // \\// estimates sagitta chord parameter
                //--------------------------------------------------------------------
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
            var op = sconf.orbitParameters;
            var scale = ( rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0] );
            var modelPar = ( newPos[0] - rg.ZetaStart.pos[0] )
                           / scale;
            modelPar = Math.max( 0.0000000001, Math.min( 0.99999999, modelPar ) );  //validates
            var zeta = Math.PI / 2 * modelPar;
            var eccentricity = Math.tan( zeta );
            if( fconf.sappId === 'b1sec3prop15' && eccentricity > 0.99) {
                ///draws ellipse only
                return false;
            }
            stdMod.establishesEccentricity( eccentricity, "b1sec3prop14" === fconf.effId );
            newPos[0] = rg.Zeta.pos[0];         //corrects
            newPos[1] = rg.ZetaStart.pos[1];    //corrects

            var pos = rg[ 'approximated-curve' ].t2xy( rg.P.q );
            var checkAbs = mat.unitVector( rg.P.pos ).abs;
            /*
            ccc( 'move: '+ rg.P.pos[0].toFixed(3) +
                 ' checked=' + pos[0].toFixed(3) +
                 ' derived latus=' + op.latus.toFixed(3) +
                 ' exc=' + op.eccentricity.toFixed(3)
            );
            */
            //stdMod.model8media_upcreate();
            //return false;
            return true;
        }
        /*
        rg.Zeta.processOwnUpEvent= function() {
            ccc(
        }
        */
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================

    }

}) ();

