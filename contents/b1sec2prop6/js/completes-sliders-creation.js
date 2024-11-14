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
                        let dpos0 = newPos[0]-stashedPos[0];
                        let dpos1 = newPos[1]-stashedPos[1];
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
            if( sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING_P ) {
                ssD.PdragInitiated = true;
            }
            sData.stashed_curveP = sData.curveP;
            let curvePix = Math.floor( (rg.P.q - bezier.start_q )*bezier.q2ix );
            sData.stashed_curvePP = ssD.curve[curvePix];
        };
        rg.P.processOwnUpEvent = () => { ssD.PdragInitiated = false; };
        rg.P.acceptPos = (newPos, move) => {
            let REPELLING_DISTANCE = 0.02;
            let returnValue = true;
            if( sconf.APPROX === 'D' ) {            
                //calculates new ordinate y(x)
                newPos[1] = rg[ 'approximated-curve' ].t2xy( newPos[0] )[1];
            } else {
                let curvePP = sData.stashed_curvePP;
                let { v, uu, rr, curveIx } = curvePP;
                let move0 = newPos[0]-rr[0];
                let move1 = newPos[1]-rr[1];
                let delta_curveIx = Math.floor( (uu[0]*move0 + uu[1]*move1)/v*bezier.q2ix );
                curveIx = curveIx + delta_curveIx;
                curveIx = Math.max(0, Math.min( curveIx, ssD.curveSTEPS) );
                let stashed_curvePP = ssD.curve[ curveIx ];
                
                ///validates
                sconf.originalPoints.curvePivots.forEach( (cp,cpix) => {
                    let rgX = rg[ 'curvePivots-' + cpix ];
                    if( REPELLING_DISTANCE > Math.abs( stashed_curvePP.q - rgX.q ) ) {
                        returnValue = false;
                        return;
                    }
                });
                
                if( returnValue ) {
                    sData.stashed_curvePP = stashed_curvePP;
                    rg.P.q = sData.stashed_curvePP.q;
                }
            }
            return returnValue;
        };
        //=========================================================================
        // \\// point P slider
        //=========================================================================



        //=========================================================================
        // //\\ point Q slider
        //      for delta t
        //=========================================================================
        rg.Q.processOwnDownEvent = function() {
            //this is for user mouse motion,
            //remember, mouse motion and Q.pos motions are
            //different,
            ssD.QnewPos0_stashed = rg.Q.pos[0];
            ssD.QnewPos1_stashed = rg.Q.pos[1];
        };

        rg.Q.acceptPos = newPos => {
            var REPELLING_DISTANCE = 0.01;

            //--------------------------------------------------------------------
            // //\\ sets delta t
            //--------------------------------------------------------------------
            //this is main parameter which updates math-model,
            //this is a time interval to build a chord for suggitae,
            //rg.tForSagitta.val = Math.abs( deltaX ) * sData.deltaX2deltaT;
            let deltaPos = [
                newPos[0]-ssD.QnewPos0_stashed,
                newPos[1]-ssD.QnewPos1_stashed,
            ];
            let { v, uu } = rg.Q.Qparams;
            let deltaQ = (deltaPos[0]*uu[0] + deltaPos[1]*uu[1])/v;
            let new_q = rg.Q.q + deltaQ;
            
            //this is resundant: this is validated in model
            //if( new_q <=0 || new_q >= 1 ) return false; 

            let delta_t = deltaQ / rg.Q.dt2dq
            let sagg_t = rg.tForSagitta.val + delta_t;
            //prevents too small saggita
            if( sagg_t < 0.01 ) return false;
            //--------------------------------------------------------------------
            // //\\ to separate dragging pivotsPos and moving body,
            //      druring building a chord tip point,
            //      prevents moving body come too close to pivotsPos
            //--------------------------------------------------------------------
            var returnValue = true;
            
            ///this is a partial validation,
            ///because of overlapping can happen during
            //moving of P
            sconf.originalPoints.curvePivots.forEach( (cp,cpix) => {
                let rgX = rg[ 'curvePivots-' + cpix ];
                if( REPELLING_DISTANCE > Math.abs( new_q - rgX.q ) ) {
                    returnValue = false;
                    return;
                }
            });
            if( !returnValue ) return false;
            //--------------------------------------------------------------------
            // \\// to separate dragging pivotsPos and moving body,
            //--------------------------------------------------------------------
            
            rg.tForSagitta.val = sagg_t;
            //--------------------------------------------------------------------
            // \\// sets delta t
            //--------------------------------------------------------------------

            //lets validators to do the job
            stdMod.model8media_upcreate();
            ssD.QnewPos0_stashed = newPos[0];
            ssD.QnewPos1_stashed = newPos[1];

            //"false" prevents model8media_upcreate() from running second time
            return false;
        }
        //=========================================================================
        // \\// point Q slider
        //=========================================================================



        //=========================================================================
        // //\\ point S slider
        //=========================================================================
        {
            //rg.S.processOwnDownEvent = () => {};
            //rg.S.processOwnUpEvent = () => {};
            rg.S.acceptPos = newPos => {
                //does this for decorational purposes
                stdMod.curveIsSolvable();
                //this permits an orbitrary move
                return true;
            }
        }
        //=========================================================================
        // \\// point S slider
        //=========================================================================
    }


}) ();

