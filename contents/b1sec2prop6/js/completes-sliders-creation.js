( function() {
    var {
        sn, bezier, mat,
        ssD, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            completesSlidersCreation,
        },
    });
    return;













    ///****************************************************
    ///****************************************************
    function completesSlidersCreation()
    {
        //=========================================================================
        // //\\ curve pivotsPos sliders
        //=========================================================================
        var pivs = sconf.originalPoints.curvePivots;

        pivs.forEach( (cp,cpix) => {
            var pos1 = rg[ 'curvePivots-' + cpix ].pos;
            var stashedPos = null;
            var stashedCurveP = null;

            cp.rgX.processOwnDownEvent = () => {
                if( sconf.APPROX === 'D' ) {   
                    let pos = rg[ 'curvePivots-' + cpix ].pos;                
                    stashedPos = [ pos[0], pos[1] ];
                } else {
                    let pos = bezier.fun( ssD.bezier.ix2parameter[cpix] );
                    stashedPos = [ pos[0], pos[1] ];
                }
            };

            cp.rgX.processOwnUpEvent = () => {
                pos1[0] = stashedPos[0];
                pos1[1] = stashedPos[1];
                if( sconf.APPROX === 'D' ) {    
                    stdMod.pointsArr_2_singleDividedDifferences();
                }
            };

            cp.rgX.acceptPos = (newPos, move) => {
                var REPELLING_DISTANCE = 0.01;
                var returnValue = true;
                //--------------------------------------------------------------
                // //\\ preserves pivot's order along x and being them too close
                //      to each other; note: order is reverse to axis x order,
                //--------------------------------------------------------------
                var previousPoint = cpix-1;
                var nextPoint = cpix+1;
                var nextPoint = (nextPoint === pivs.length ) ? null : nextPoint;
                var previousPoint = (previousPoint < 0 ) ? null : previousPoint;
                
                if( sconf.APPROX === 'D' ) {   
                    if(
                        (
                            previousPoint !== null &&
                            pivs[previousPoint].rgX.pos[0] <= newPos[0] + REPELLING_DISTANCE
                        ) ||
                        (
                            nextPoint !== null &&
                            pivs[nextPoint].rgX.pos[0] >= newPos[0] - REPELLING_DISTANCE
                        )
                    ){
                        returnValue = false;
                    }
                }
                //--------------------------------------------------------------
                // \\// preserves pivot's order along x and being them too close
                //--------------------------------------------------------------


                if( returnValue ) {
                    if( sconf.APPROX === 'D' ) {    
                        //calculates new curve
                        pos1[0] = newPos[0];
                        pos1[1] = newPos[1];
                        stdMod.pointsArr_2_singleDividedDifferences();

                        ///apparently validates if point is valid and
                        ///if not, shows a warning, and stashes most possible value
                        stdMod.curveIsSolvable();
                        if( !ssD.foldPoints.length ) {    
                            stashedPos = [ pos1[0], pos1[1] ];
                        }
                    } else {
                        ////sconf.APPROX === 'B'
                        let dpos0 = newPos[0]-stashedPos[0];//bezier.pivotsPos[cpix];
                        let dpos1 = newPos[1]-stashedPos[1];//bezier.pivotsPos[cpix];
                        let pos = bezier.pivotsPos[cpix];
                        let bpos0 = pos[0];
                        let bpos1 = pos[1];
                        let c2p = ssD.bezier.curvePivots2bezierPivots[cpix];
                        pos[0] += dpos0*c2p;
                        pos[1] += dpos1*c2p;
                        ssD.bezier.updatesPivot( pos, cpix );
                        stdMod.curveIsSolvable();
                        stashedPos = [ newPos[0], newPos[1] ];
                        if( ssD.foldPoints.length ) {    
                            //these works in connection,
                            //one can run stdMod.model8media_upcreate(); and
                            //not set return false to skip automatic 
                            //stdMod.model8media_upcreate(); which runs in 
                            //src/base/draggers/points/model-point-dragger.js
                            //stdMod.model8media_upcreate()
                            return true; //false;
                        }
                    }
                }
                return returnValue;
            };
        });
        //=========================================================================
        // \\// curve pivotsPos sliders
        //=========================================================================



        //=========================================================================
        // //\\ point P slider
        //=========================================================================
        rg.P.processOwnDownEvent = () => {
            sData.stashed_curveP = sData.curveP;
        };
        rg.P.acceptPos = (newPos, move) => {

            //prevents dragged point to go outside of curve tips x
            //if( newPos[0] > rg[ 'curvePivots-' + ( 0 ) ].pos[0] ) return false;
            //if( newPos[0] < rg[ 'curvePivots-' + ( pivs.length-1 ) ].pos[0] ) return false;

            /*
            //--------------------------------------------------------------------
            // //\\ to separate dragging pivotsPos and moving body,
            //      prevents moving body come too close to pivotsPos
            //--------------------------------------------------------------------
            var REPELLING_DISTANCE = 0.01; //0.005; still draggable too
            var returnValue = true;
            sconf.originalPoints.curvePivots.forEach( (cp2,cpix2) => {
                var pos2 = rg[ 'curvePivots-' + cpix2 ].pos;
                if( REPELLING_DISTANCE > Math.abs( newPos[0] - pos2[0] ) ) {
                    returnValue = false;
                    return;
                }
            });
            if( !returnValue ) return false;
            //--------------------------------------------------------------------
            // \\// to separate dragging pivotsPos and moving body,
            //--------------------------------------------------------------------
            */
            
            
            if( sconf.APPROX === 'D' ) {            
                //calculates new ordinate y(x)
                newPos[1] = rg[ 'approximated-curve' ].t2xy( newPos[0] )[1];
            } else {
                let { v, uu, q } = sData.stashed_curveP;
                let delta_q = (uu[0]*move[0] - uu[1]*move[1])/v;
                q = q + delta_q;
                //proposedPos = bezier.fun( 
                if( q<0 || q>1 ) return false;
                rg.P.q = q;
            }
            return true;
        };
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

            //because deltaX may already changed, resets scale for delta X,
            //this is a decorational constant for mouse drag,
            sData.deltaX2deltaT = rg.tForSagitta.val / (rg.P.pos[0]-rg.Q.pos[0]);
            sData.tForSagitta0 = rg.tForSagitta.val;
            sData.Qpos0 = rg.Q.pos[0];
            sData.Qpos1 = rg.Q.pos[1];
        };

        rg.Q.acceptPos = newPos => {
            var REPELLING_DISTANCE = 0.00001;
            var deltaX = newPos[0] - rg.P.pos[0];
            //prevents dragged point to go beyond P
            if( deltaX > -REPELLING_DISTANCE ) return false;
            //deltaX is negative, Q+ is on the left from P,


            //prevents dragged point to go outside of curve tips x
            //... this moved in to study-model.js::model...
            //var wwRightLim = rg[ 'curvePivots-' + ( 0 ) ].pos[0] - REPELLING_DISTANCE;

            //--------------------------------------------------------------------
            // //\\ to separate dragging pivotsPos and moving body,
            //      prevents moving body come too close to pivotsPos
            //--------------------------------------------------------------------
            var returnValue = true;
            sconf.originalPoints.curvePivots.forEach( (cp2,cpix2) => {
                var pos2 = rg[ 'curvePivots-' + cpix2 ].pos;
                if( REPELLING_DISTANCE > Math.abs( newPos[0] - pos2[0] ) ) {
                    returnValue = false;
                    return;
                }
            });
            if( !returnValue ) return false;
            //--------------------------------------------------------------------
            // \\// to separate dragging pivotsPos and moving body,
            //--------------------------------------------------------------------

            //--------------------------------------------------------------------
            // //\\ sets delta t
            //--------------------------------------------------------------------
            //this is main parameter which updates math-model,
            //this is a time interval to build a chord for suggitae,
            //rg.tForSagitta.val = Math.abs( deltaX ) * sData.deltaX2deltaT;
            let deltaPos = [
                newPos[0]-sData.Qpos0,
                newPos[1]-sData.Qpos1,
            ];
            let { v, uu } = sData.curveP;
            let deltaQ = (deltaPos[0]*uu[0] + deltaPos[1]*uu[1])/v;
            let sagg_t = sData.tForSagitta0 + deltaQ;
            //prevents too small saggita
            if( sagg_t < 0.01 ) return false;
            rg.tForSagitta.val = sagg_t;
            //--------------------------------------------------------------------
            // \\// sets delta t
            //--------------------------------------------------------------------

            //lets validators to do the job
            stdMod.model8media_upcreate();
            return false;
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
                stdMod.curveIsSolvable();
                if( !ssD.foldPoints.length ) {
                    stashedPos[0] = newPos[0];
                    stashedPos[1] = newPos[1];
                }
                return true;
            }
        }
        //=========================================================================
        // \\// point S slider
        //=========================================================================
    }


}) ();

