( function() {
    var {
        sn, mat,
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
            if( fconf.sappId === "b1sec3prop14" ) {
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
        };

        rg.Q.acceptPos = ( newPos, dragMove ) => {
            var newPos0 = dragMove[0] + sData.Qpos0;
            var newPos1 = -dragMove[1] + sData.Qpos1;

            //--------------------------------------------------------------------
            // //\\ separates dragging pivot and moving body,
            //      prevents moving body come too close to pivot,
            //--------------------------------------------------------------------
            //this is main parameter which updates math-model,
            //this is a time interval to build a chord for suggitae,
            var Qq = stdMod.posQ2t( [newPos0,newPos1] );
            //sagitta will be validated in unique place in model_upcreate, because
            //validation must be done for other sliders too,
            var sagittaDelta_q = Qq - rg.P.q; //Math.max(
            if( sagittaDelta_q === 0 ) {
                sagittaDelta_q = rg.P.q - sconf.REPELLING_DISTANCE;
            }
            if( Math.abs( sagittaDelta_q ) > Math.PI/3 ) return false;
            sconf.orbitParameters.sagittaDelta_q = sagittaDelta_q;
            //--------------------------------------------------------------------
            // \\// separates dragging pivot and moving body,
            //--------------------------------------------------------------------

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
            if( "b1sec3prop14" === fconf.sappId ) {
                op.latus = Math.abs( rg.P.abs *
                    ( 1 - op.eccentricity * Math.cos( rg.P.q ) ) );
            }
            stdMod.establishesEccentricity( eccentricity );
            newPos[0] = rg.Zeta.pos[0];         //corrects
            newPos[1] = rg.ZetaStart.pos[1];    //corrects

            var pos = rg[ 'approximated-curve' ].t2xy( rg.P.q );
            var checkAbs = mat.unitVector( rg.P.pos ).abs;
            return true;
        }
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================

    }

}) ();

