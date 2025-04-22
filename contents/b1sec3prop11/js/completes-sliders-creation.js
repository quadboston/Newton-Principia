( function() {
    var {
        sn, mat, userOptions,
        fconf, sData, ssD,
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

            let sForSagitta_valT = ssD.sForSagitta_valT;
            stdMod.correctsPos8angle2angle( 'Q', newPos );
            {
                let tR = ssD.timeRange;
                let tP = ssD.qix2orb[ rg.P.qix ].timeAtQ;
                let tQ = ssD.qix2orb[ rg.Q.qix ].timeAtQ;
                ssD.sForSagitta_valT = ( tR + tQ - tP ) % tR;
                //recalculates dQ attached to orbit points,
                //todm for now, does redundant job of rebuilding grids
                stdMod.buildsforceGraphArray();
            }
            if( ssD.sForSagitta_valT > ssD.timeRange*0.33 ) {
                ssD.sForSagitta_valT = sForSagitta_valT;
            }
            //lets validators to do the job
            stdMod.model8media_upcreate();
            //"return false skips d8d engine"
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
                stdMod.correctsPos8angle2angle( 'P', null, rg.P.parQ );
                return true;
            }
        }
        //=====================================================================
        // \\// point S slider
        //=====================================================================
    }


}) ();

