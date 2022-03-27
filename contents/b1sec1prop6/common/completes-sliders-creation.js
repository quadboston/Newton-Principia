( function() {
    var {
        sn,
        sData,
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
        var nsp = rg.nonSolvablePoint;
        var nsl = rg[ 'S,nonSolvablePoint' ];

        //=========================================================================
        // //\\ curve pivots sliders
        //=========================================================================
        var pivs = sconf.originalPoints.curvePivots;

        pivs.forEach( (cp,cpix) => {
            var pos1 = rg[ 'curvePivots-' + cpix ].pos;
            var stashedPos = null;

            cp.rgX.processOwnDownEvent = () => {
                stashedPos = [ pos1[0], pos1[1] ];
                //ccc( 'down: ' + stashedPos[0].toFixed(3) + ', ' +
                //     stashedPos[1].toFixed(3) );
            };

            cp.rgX.processOwnUpEvent = () => {
                pos1[0] = stashedPos[0];
                pos1[1] = stashedPos[1];
                //ccc( cpix + ' up: ' + stashedPos[0].toFixed(3) + ', ' +
                //     stashedPos[1].toFixed(3) );

                stdMod.pointsArr_2_singleDividedDifferences();
                nsp.undisplay = true;
                nsl.undisplay = true;
            };

            cp.rgX.acceptPos = newPos => {
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
                //--------------------------------------------------------------
                // \\// preserves pivot's order along x and being them too close
                //--------------------------------------------------------------


                if( returnValue ) {
                    //calculates new curve
                    pos1[0] = newPos[0];
                    pos1[1] = newPos[1];
                    stdMod.pointsArr_2_singleDividedDifferences();
                    var { solvable, rr } = stdMod.curveIsSolvable();
                    if( solvable ) {
                        stashedPos = [ pos1[0], pos1[1] ];
                        //ccc( 'new: ' + stashedPos[0].toFixed(3) + ', ' +
                        //     stashedPos[1].toFixed(3) );

                        //corrects y-position of point P on new curve
                        //rg.P.pos[1] = rg[ 'approximated-curve' ].x2xy( rg.P.pos[0] )[1];
                        nsp.undisplay = true;
                        nsl.undisplay = true;
                    } else {
                        //pos1[0] = stashedPos[0];
                        //pos1[1] = stashedPos[1];
                        //stdMod.pointsArr_2_singleDividedDifferences();
                        nsp.pos[0] = rr[0];
                        nsp.pos[1] = rr[1];
                        nsp.undisplay = false;
                        nsl.undisplay = false;
                        //stdMod.model8media_upcreate();
                        //ccc( 'keeps former: ' + stashedPos[0].toFixed(3) + ', ' +
                        //     stashedPos[1].toFixed(3) );
                    }
                    //returnValue = solvable;
                }
                return returnValue;
            };
        });
        //=========================================================================
        // \\// curve pivots sliders
        //=========================================================================



        //=========================================================================
        // //\\ point P slider
        //=========================================================================
        rg.P.acceptPos = newPos => {

            //prevents dragged point to go outside of curve tips x
            if( newPos[0] > rg[ 'curvePivots-' + ( 0 ) ].pos[0] ) return false;
            if( newPos[0] < rg[ 'curvePivots-' + ( pivs.length-1 ) ].pos[0] ) return false;

            //--------------------------------------------------------------------
            // //\\ to separate dragging pivots and moving body,
            //      prevents moving body come too close to pivots
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
            // \\// to separate dragging pivots and moving body,
            //--------------------------------------------------------------------

            //calculates new ordinate y(x)
            newPos[1] = rg[ 'approximated-curve' ].x2xy( newPos[0] )[1];
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

            //because deltaX may already changed, resets scale for delta X,
            //this is a decorational constant for mouse drag,
            sData.deltaX2deltaT = rg.tForSagitta.val / (rg.P.pos[0]-rg.Q.pos[0]);
            sData.tForSagitta0 = rg.tForSagitta.val;
            sData.Qpos0 = rg.Q.pos[0];
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
            // //\\ to separate dragging pivots and moving body,
            //      prevents moving body come too close to pivots
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
            // \\// to separate dragging pivots and moving body,
            //--------------------------------------------------------------------

            //--------------------------------------------------------------------
            // //\\ sets delta t
            //--------------------------------------------------------------------
            //this is main parameter which updates math-model,
            //this is a time interval to build a chord for suggitae,
            //rg.tForSagitta.val = Math.abs( deltaX ) * sData.deltaX2deltaT;

            rg.tForSagitta.val = Math.max( 0, sData.tForSagitta0 +
                    0.5 * //smaller values improve mouse precision
                    (sData.Qpos0-newPos[0]) * sData.deltaX2deltaT
            );
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
                nsp.undisplay = true;
                nsl.undisplay = true;
            };

            rg.S.acceptPos = newPos => {
                var { solvable, rr } = stdMod.curveIsSolvable();
                if( !solvable ) {
                    nsp.pos[0] = rr[0];
                    nsp.pos[1] = rr[1];
                    nsp.undisplay = false;
                    nsl.undisplay = false;
                } else {
                    stashedPos[0] = newPos[0];
                    stashedPos[1] = newPos[1];
                    nsp.undisplay = true;
                    nsl.undisplay = true;
                }
                return true;
            }
        }
        //=========================================================================
        // \\// point S slider
        //=========================================================================
    }


}) ();

