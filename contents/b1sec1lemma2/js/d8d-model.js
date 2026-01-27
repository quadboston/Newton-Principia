// //\\// application-level d8d module
( function () {
    var { sn, mat, dpdec, d8dp, fmethods, globalCss, fapp, sconf, sDomN, sDomF,
        ssF, fconf, amode, stdMod, } = window.b$l.apptree({ setModule, });
    var stdL2       = sn('stdL2', fapp );
    var dataregs    = sn('dataregs', stdL2 );
    return;


    function setModule()
    {
        var gui         = sn('gui', stdL2 );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', stdL2 );
        var medD8D;

        gui.createDragModel = createDragModel;
        return;


        function createDragModel() {
            medD8D = stdMod.medD8D =
                d8dp.crePointFW_BSLd8d1CHAMBER ({
                    findDraggee                         : findDraggee,
                    dragSurface                         : sDomN.medRoot,
                    //DRAG_POINTS_THROTTLE_TIME           : false,
                    detected_user_interaction_effect    :
                                    sDomF.detected_user_interaction_effect,
                    processMouseDown                    : processMouseDown,
                    //Enabled the following so only the arrows for the dragger
                    //closest to the mouse will be shown.  Otherwise when
                    //draggers are close together, arrows are sometimes shown
                    //for a different dragger than the one which gets selected.
                    doCreateDynamicSpinners : true,
                });
            Object.values(dataregs).forEach(dr => {
                setDragPoints(dr);
            });
        }

        function processMouseDown( cPW )
        {
            cPW.achieved.achieved.x = cPW.x; //point_on_dragSurf[0];
            cPW.achieved.achieved.y = cPW.y; //point_on_dragSurf[1];
            ///apparently, d8dp.crePointFW_BSLd8d1CHAMBER does this
            //if( !rg.detected_user_interaction_effect_DONE ) {
                //sDomF.detected_user_interaction_effect();
            //}
        }

        function setDragPoints(dr) {
            //In terms of drag priority see "findDraggee" function for more.

            ///Points on x-axis, on the base of the figure.
            if (dr.BASE_PT_DRAGGERS_ENABLED) {
                const bplist =  dr.basePts.list;
                const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
                const iMax = Math.min(bplist.length, DRAGGABLE_BASE_POINTS);
                for(let ix = 1; ix < iMax; ix++) {
                    setPoint(dr, bplist[ix], ix);
                }
            }

            dr.ctrlPts.list.forEach((pointWrap) => {
                setPoint(dr, pointWrap, pointWrap.index);
            });

            Object.values(dr.transforms.pts).forEach((pointWrap) => {
                setPoint(dr, pointWrap, pointWrap.index);
            });

            //for decorator ... todm very easy to forget and be in pain ...
            globalCss.update();
        }


        function setPoint(dr, pointWrap, pwix) {
            let orientation = false;
            pointWrap.datareg = dr;

            if( pointWrap.type === 'base' ) {
                pointWrap.spinnerClsId = 'base-'+pwix;
                pointWrap.dragDecorColor = sDomF.getFixedColor( 'given' );
                orientation = false;

            } else if ( pointWrap.type === 'trans' ) {
                pointWrap.spinnerClsId = 'trans-'+pwix;   //optional for css
                pointWrap.dragDecorColor = sDomF.getFixedColor( 'given' );
                if (pointWrap.draggableX && pointWrap.draggableY)
                    orientation = 'rotate';
                else if (pointWrap.draggableX)
                    orientation = false;
                else if (pointWrap.draggableY)
                    orientation = 'axis-y';

            } else {
                pointWrap.spinnerClsId = 'ctrl-'+pwix;   //optional for css
                pointWrap.dragDecorColor = sDomF.getFixedColor( 'given' );
                orientation = 'rotate';
            }

            //Always add the arrows that appear when hovering the mouse
            var nospinner = false;
            var decorator = Update_decPoint( pointWrap )
            var achieved = { x:pointWrap.x, y:pointWrap.y };

            ///small test-case
            //if( pointWrap.spinnerClsId === "base-2" ) {
            //    c cc('assigned achieved', achieved, " point wrap", pointWrap);
            //}
            medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE({
                pointWrap       : pointWrap,
                doProcess       : doProcess,
                //-------------------------
                achieved        : achieved,
                nospinner       : nospinner,
                update_decPoint : decorator,
                orientation     : orientation,
            });
        }


        ///decorates DraggeeHoverer movement
        function Update_decPoint( pointWrap )
        {
            var pw = pointWrap;
            return ( function( decPoint, dragSurface, pointWrap, nonenify ) {
                if( pw.x || pw.x === 0 ) {
                    var dompos = sDomF.inn2outparent.call(
                        { medpos : [ pw.x, pw.y ] }
                    );
                    decPoint.style.left = dompos[0] + 'px';
                    decPoint.style.top = dompos[1] + 'px';
                }

                //Hide arrows for all the draggers (for when they are created)
                if( nonenify === 'nonenify' ) {
                    decPoint.style.display = 'none';
                }
            });
        }


        function doProcess( arg )
        {
            if( arg.down_move_up === 'move' ) {
                var pw = arg.pointWrap;
                if( pw.type === 'base' ) {
                    move2js( pw, [arg.surfMove[0],0], pw.achieved );
                } else {
                    //reshapes the curve
                    move2js( pw, arg.surfMove, pw.achieved );
                }
                guiup.xy2shape( pw.dom, "cx", pw.x, "cy", pw.y );
                stdMod.model8media_upcreate();
            }
        }


        //====================
        // //\\ finds draggee
        //====================
        ///Gets movable and visible point which is closest to mousePoint.
        function findDraggee( mousePoint, dragWraps )
        {

            //////////////////////////////////////////////////////////
            // //\\ todo. d8d points tmp patch.
            mousePoint = sDomF.outparent2inn( mousePoint );
            // \\// todo. d8d points tmp patch.
            //////////////////////////////////////////////////////////

            var closest = null;
            dragWraps.forEach( function( dwrap ) {
                closest = findClosestPoint( closest, mousePoint, dwrap );
            });
            return closest ? closest.dwrap : null;
        }
        function findClosestPoint( closest, mousePoint, dwrap )
        {
            var pointWrap = dwrap.pointWrap;
            var DRAGGER_TOLERANCE = sconf.DRAGGER_TOLERANCE;

            if(
                //.excludes excess of non-used points
                pointWrap.type === 'base' && pointWrap.index >= sconf.basesN
            ) {
                return closest;
            }
            //.already in sync
            //sconf.modorInPicY + sconf.pictureActiveArea - mousePoint[1];

            var tdX = Math.abs( mousePoint[0] - pointWrap.x );
            var tdY = Math.abs( mousePoint[1] - pointWrap.y );
            var td  = Math.max( tdX, tdY );
            if( td <= DRAGGER_TOLERANCE ) {
                if( !closest || closest.td > td ) {
                    closest = { td, dwrap };
                    //if( pointWrap.spinnerClsId === 'ctrl-'+1 ) {
                    //    //c cc( 'selected' );
                }
            }
            return closest;
        }
        //====================
        // \\// finds draggee
        //====================



        //======================================
        // //\\ event to js
        //======================================
        function move2js(pointWrap, move, ach)
        {
            const scale = sDomF.out2inn();
            const newX = ach.achieved.x + move[0]*scale;
            const newY = ach.achieved.y + move[1]*scale;
            const item = pointWrap;
            const index = item.index;
            const dr = item.datareg;
            const ctrlPts = dr.ctrlPts;
            const ptsUntransformed = ctrlPts.untransformed;
            const DRAGGABLE_END_POINTS = ctrlPts.DRAGGABLE_END_POINTS;
	        appstate.movingBasePt = false;//Default

            if ( "ctrl" === item.type ) {
                //Curve control points
                //Calculate new un-transformed position.
                const posNew = stdMod.Txy_2_xy(dr, [newX, newY]);


                //Constrain x value if needed.
                if (!DRAGGABLE_END_POINTS) {
                    const minX = ptsUntransformed[0].x;
                    const maxX = ptsUntransformed[ptsUntransformed.length-1].x
                        - sconf.HORIZONTAL_CONSTRAINT;

                    if (posNew[0] < minX)
                        posNew[0] = minX;
                    if (posNew[0] > maxX)
                        posNew[0] = maxX;
                }

                //Prevent the y value from passing the following constraint.
                if (!DRAGGABLE_END_POINTS) {
                    const yLine = yOffsetSlopeConstraint(dr, posNew[0]);
                    if (posNew[1] > yLine)
                        posNew[1] = yLine;
                }


                //Update stored un-transformed control point position.
                const pos = ptsUntransformed[index];
                if (pos) {
                    pos.x = posNew[0];
                    pos.y = posNew[1];
                }

                //Update dragger transformed position.
                const posNewT = stdMod.xy_2_Txy(dr, posNew);
                item.x = posNewT[0];
                item.y = posNewT[1];


            } else if ("trans" === item.type) {
                //Transform points
                if (item.draggableX)
                    item.x = newX;
                if (item.draggableY)
                    item.y = newY;

                stdMod.recalculateAndStoreTransforms(dr);

                                
            } else if(index > 0 && index < sconf.basesN) {
                //Base points
                // //\\ limitifies newX by dom-neighbors
                var PAD         = sconf.BASE_POINTS_REPELLING_DISTANCE;
                var lst         = dr.basePts.list;
                var itemM       = lst[index];   //middle
                var itemL       = lst[index-1]; //left
                var itemR       = lst[index+1]; //right

                const minX = itemL.x + PAD;
                const maxX = itemR.x - PAD;

                const xConstrained = Math.min(Math.max(newX, minX), maxX);
                //Ensure the constrained value is in bounds before moving the
                //handle.  Otherwise when the number of bases is large, it's
                //possible that it can be out of bounds, which can cause the
                //rectangles to get reversed.
                if (xConstrained < minX || xConstrained > maxX)
                    return;
                // \\// limitifies newX by dom-neighbors

                // //\\ applies newX to js-model
                itemM.x = xConstrained;
                dr.partitionWidths[index-1] = itemM.x - itemL.x;
                dr.partitionWidths[index]   = itemR.x - itemM.x;
                // \\// applies newX to js-model

                //. todo: plays only in function updatePts(dr, i, x) ... what for?
	            appstate.movingBasePt = true;
            }
            return item;
        }
        //======================================
        // \\// event to js
        //======================================



        function yOffsetSlopeConstraint(dr, x) {
            //Computes y coordinate of a sloped line offset from figure bottom.

            //When the right side of the figure’s curve is very low and flat,
            //the area under it becomes small.  This leads to jumping issues
            //where the algorithm that automatically adjusts rectangle widths
            //can jump between different possible solutions.
            //
            //Slope...
            //Constraining the curve control points to be above a sloped line
            //helps keep the this area on the larger side, which is helpful to
            //reduce jumping.
            //
            //Offset...
            //Suppose there are two control points (1, 2) excluding the end
            //points.  When point 1 is moved towards the top of the screen, the
            //size of this area decreases.  Adding offset to the slope
            //constraint keeps point 2 further from the bottom of the figure,
            //which helps keep this area large.

            const ptsUntransformed = dr.ctrlPts.untransformed;
            const ptLast = ptsUntransformed[ptsUntransformed.length - 1];

            const andleRad = mat.degToRad(sconf.SLOPE_CONSTRAINT_ANGLE_DEG);
            const offset = sconf.SLOPE_CONSTRAINT_OFFSET;

            //Amount to move in the y direction per x
            const slope = Math.tan(andleRad);

            const ySlopedLine = ptLast.y - slope * (ptLast.x - x);
            return ySlopedLine - offset;
        }
    }
}) ();

