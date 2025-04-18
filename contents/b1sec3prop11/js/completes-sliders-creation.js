( function() {
    var {
        sn, mat, userOptions,
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
        //=====================================================================
        // //\\ point P slider
        //=====================================================================
        rg.P.acceptPos = newPos => {
            let newP = stdMod.correctsPos8angle2angle( 'P', newPos );
            newPos[0] = newP[0];
            newPos[1] = newP[1];
            return true;
        }
        //=====================================================================
        // \\// point P slider
        //=====================================================================



        //=====================================================================
        // //\\ point Q slider
        //      for delta t
        //=====================================================================
        rg.Q.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            sData.Qpos0 = rg.Q.pos[0];
            sData.Qpos1 = rg.Q.pos[1];
        };

        rg.Q.acceptPos = ( newPos, dragMove ) => {
            var newPos0 = dragMove[0] + sData.Qpos0;
            var newPos1 = -dragMove[1] + sData.Qpos1;

            //------------------------------------------------------------------
            // //\\ to separate dragging pivots and moving body,
            //      prevents moving body come too close to pivots
            //------------------------------------------------------------------
            //this is main parameter which updates math-model,
            //this is a time interval to build a chord for suggitae,
            var sForSagitta_val = Math.max(
                sconf.REPELLING_DISTANCE,
                stdMod.pos2t( [newPos0,newPos1] ) - stdMod.pos2t( rg.P.pos )
            );
            /*
            if( Math.abs(mat.atan2PI( newPos ) - rg.P.angle) >
                1.5*Math.PI ) return false;
            rg.Q.pos[0] = newPos[0];
            rg.Q.pos[1] = newPos[1];
            stdMod.model8media_upcreate();
            */
            if( sForSagitta_val > Math.PI/3 ) return false;
            rg.sForSagitta.val = sForSagitta_val;
            newPos[0] = newPos0;
            newPos[1] = newPos1;
            //------------------------------------------------------------------
            // \\// to separate dragging pivots and moving body,
            //------------------------------------------------------------------

            //lets validators to do the job
            stdMod.model8media_upcreate();
            return false;
        }
        //=====================================================================
        // \\// point Q slider
        //=====================================================================


        //=====================================================================
        // //\\ point S slider
        //=====================================================================
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
                    if( userOptions.showingBonusFeatures() ) {
                        stashedPos[0] = newPos[0];
                        stashedPos[1] = newPos[1];
                    } else {
                        if( newPos[0] > -0.00001 || newPos[0] < -1.2 ) {
                            return false;
                        }
                        stashedPos[0] = newPos[0];
                        newPos[1] = stashedPos[1];
                        sconf.ellipseFocus = -stashedPos[0];
                        rg.H.pos[0] = sconf.ellipseFocus;
                        let ellA2 = sconf.ellipseFocus*sconf.ellipseFocus +
                                    sconf.ellipseB*sconf.ellipseB;
                        sconf.ellipseA = Math.sqrt( ellA2 );
                        let lambda2 = sconf.ellipseB/sconf.ellipseA;
                        lambda2 *= lambda2;
                        sconf.eccentricity = Math.sqrt( 1 - lambda2 );
                    }
                }
                stdMod.correctsPos8angle2angle( 'P', null, rg.P.angle );
                return true;
            }
        }
        //=====================================================================
        // \\// point S slider
        //=====================================================================
    }


}) ();

