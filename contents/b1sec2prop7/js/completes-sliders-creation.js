( function() {
    var {
        sn, mat,
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
        // //\\ point Q slider
        //      for delta t
        //=========================================================================
        rg.Q.dragPriority = 100;
        rg.Q.DRAGGEE_HALF_SIZE = fconf.DRAG_HANDLE_HALFHOTSPOT;
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
            let qgrid_step = (deltaPos[0]*uu[0] + deltaPos[1]*uu[1])/v;
            let new_q = rg.Q.q + qgrid_step;
            
            //this is resundant: this is validated in model
            //if( new_q <=0 || new_q >= 1 ) return false; 

            //let delta_t = qgrid_step / rg.Q.dt2dq
            let sagg_t = rg.tForSagitta.val + qgrid_step / rg.Q.dt2dq;
            //prevents too small saggita
            //if( sagg_t < 0.0001 ) return false;
            const ACCURACY = 1e-4;
            if( sagg_t < ACCURACY ) {
                sagg_t = ACCURACY;
            }
            if( sagg_t > 2 ) return false;
            //--------------------------------------------------------------------
            // //\\ to separate dragging pivotsPos and moving body,
            //      druring building a chord tip point,
            //      prevents moving body come too close to pivotsPos
            //--------------------------------------------------------------------
            var returnValue = true;
            
            if( sconf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES ) {
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
            }
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
        // //\\ point P slider
        //=========================================================================

        //note: combination of relative priorities of Q and P and
        //relative sizes allows splitting user motions for Q and P:
        // P.DRAGGEE_HALF_SIZE = 60 and for Q is 30,
        rg.P.dragPriority = 60;
        rg.P.DRAGGEE_HALF_SIZE = fconf.DRAG_HANDLE_HALFHOTSPOT;
        
        
        rg.P.processOwnDownEvent = () => {
            const rgCurve = rg[ 'approximated-curve' ];
            if( sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING ) {
                ssD.PdragInitiated = true;
            }
            sData.stashed_curveP = sData.curveP;
            let curvePix = Math.floor( (rg.P.q - rgCurve.tStart )*rgCurve.q2ix );
            sData.stashed_curvePP = ssD.curve[curvePix];
        };
        
        rg.P.processOwnUpEvent = () => { ssD.PdragInitiated = false; };
        
        rg.P.acceptPos = (newPos, move) => {
            const rgCurve = rg[ 'approximated-curve' ];
            let REPELLING_DISTANCE = 0.02;
            let returnValue = true;
            {
                let curvePP = sData.stashed_curvePP;
                let { v, uu, rr, curveIx } = curvePP;
                
                // //\\  we project INCREMENTAL move
                // to instant speed to calculate incremental angle:
                let move0 = newPos[0]-rr[0];
                let move1 = newPos[1]-rr[1];
                let delta_curveIx =
                    Math.floor( (uu[0]*move0 + uu[1]*move1)/v*rgCurve.q2ix );
                curveIx = curveIx + delta_curveIx;
                // \\//  we project INCREMENTAL move
                
                curveIx = (curveIx+ssD.curveSTEPS*2)%ssD.curveSTEPS;
                //Math.max(0, Math.min( curveIx, ssD.curveSTEPS) );
                let stashed_curvePP = ssD.curve[ curveIx ];
                
                ///validates
                if( sconf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES ) {
                    sconf.originalPoints.curvePivots.forEach( (cp,cpix) => {
                        let rgX = rg[ 'curvePivots-' + cpix ];
                        if( REPELLING_DISTANCE > Math.abs( stashed_curvePP.q - rgX.q ) ) {
                            returnValue = false;
                            return;
                        }
                    });
                }
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
        // //\\ point S slider
        //=========================================================================
        {
            rg.S.dragPriority  = 30;
            rg.S.DRAGGEE_HALF_SIZE = fconf.DRAG_HANDLE_HALFHOTSPOT;
            rg.S.processOwnDownEvent = () => {
                if( sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING ) {
                    ssD.SdragInitiated = true;
                }
            };
            rg.S.processOwnUpEvent = () => { ssD.SdragInitiated = false; };
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

        
        
        
        //=========================================================================
        // //\\ point Rcol2 slider
        //=========================================================================
        {
            rg.Rcol2.dragPriority  = 30;
            rg.Rcol2.DRAGGEE_HALF_SIZE = fconf.DRAG_HANDLE_HALFHOTSPOT;
            rg.Rcol2.processOwnDownEvent = () => {
                if( sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING ) {
                    ssD.SdragInitiated = true;
                }
            };
            rg.Rcol2.processOwnUpEvent = () => { ssD.SdragInitiated = false; };
            //rg.Rcol2.processOwnUpEvent = () => {};
            rg.Rcol2.acceptPos = newPos => {
                //does this for decorational purposes
                stdMod.curveIsSolvable();
                //this permits an orbitrary move
                return true;
            }
        }
        //=========================================================================
        // \\// point Rcol2 slider
        //=========================================================================
        
    }


}) ();

