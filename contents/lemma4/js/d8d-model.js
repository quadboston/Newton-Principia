// //\\// application-level d8d module
( function () {
    var {
        sn, dpdec, d8dp, fmethods, globalCss,
        fapp, sconf, sDomN, sDomF, ssF,
        fconf,
        amode, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2 = sn('stdL2', fapp );
    // var datareg = sn('datareg', stdL2 );
    return;


    function setModule()
    {
        // var datareg     = sn('datareg', stdL2 );
        //var dr          = sn('datareg', stdL2 );
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
                    spinnerCursorGrabbed : sconf.spinnerCursorGrabbed,
                    spinnerCursorGrab : sconf.spinnerCursorGrabbed,
                });
            //TEMP Update datareg naming and similar
            [stdL2.datareg, stdL2.datareg2].forEach(dr => {
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
            if (dr.basePtDraggersEnabled) {
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
            var nospinner = false;
            var decorator;
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

            // if( typeof pointWrap.x === 'number' ) {
            //TEMP To avoid adding the arrows that appear when hovering the
            //mouse, for the right most base point that hasn't been added yet.
            if( pointWrap.type !== 'base' || pwix < sconf.basesN) {
                decorator = Update_decPoint( pointWrap )
                var achieved = { x:pointWrap.x, y:pointWrap.y };
            } else {
                ////avoids excessive nospinner assignment to idle points
                ////which are not yet ready
                ////one must code "decorator" for new points
                ////when they are created
                nospinner = true;
            }

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
            return ( function( decPoint ) {
                if( pw.x || pw.x === 0 ) {
                    var dompos = sDomF.inn2outparent.call(
                        { medpos : [ pw.x, pw.y ] }
                    );
                    decPoint.style.left = dompos[0] + 'px';
                    decPoint.style.top = dompos[1] + 'px';
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
                    // recent framework
                    ssF.media_upcreate_generic();
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
            var DRAGGEE_HALF_SIZE = pointWrap.type === 'base' ?
                    5 : //crowdy base needs pinpointed selection
                    sconf.DRAGGEE_HALF_SIZE;

            //.already in sync
            //sconf.modorInPicY + sconf.pictureActiveArea - mousePoint[1];

            var tdX = Math.abs( mousePoint[0] - pointWrap.x );
            var tdY = Math.abs( mousePoint[1] - pointWrap.y );
            var td  = Math.max( tdX, tdY );
            if( td <= DRAGGEE_HALF_SIZE ) {
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
            //TEMP This function is long, maybe it should be split up more?
            const scale = sDomF.out2inn();
            let newX = ach.achieved.x + move[0]*scale;
            let newY = ach.achieved.y + move[1]*scale;
            const item = pointWrap;
            const index = item.index;
            const dr = item.datareg;
	        appstate.movingBasePt = false;//Default

            if ( "ctrl" === item.type ) {
                //Curve control points
                //Calculate new un-transformed position.
                const posNew = stdMod.Txy_2_xy(dr, [newX, newY]);

                //Constrain x value if needed.
                const {minX, maxX} = dr.ctrlPts.constraints;
                if (minX != null && posNew[0] < minX)
                    posNew[0] = minX + 1;
                if (maxX != null && posNew[0] > maxX)
                    posNew[0] = maxX - 1;


                //TEMP
                // const handleXPreventChange = 
                //     document.getElementById("radio-handle-x-offset").checked;
                // if (handleXPreventChange) {
                //     const pos = dr.ctrlPts.positions.at(index);
                //     if (pos)
                //         posNew[0] = pos.x;
                // }

                // // //TEMP
                // // //Check slope
                // const constrainSlopeEntire = document.getElementById("radio-slope-entire").checked;
                // if (constrainSlopeEntire) {
                //     // const positionsNewTemp = [...dr.ctrlPts.positions];
                //     const positionsNewTemp = dr.ctrlPts.positions.map(pos => {
                //         const {x, y} = pos;
                //         return {x, y};
                //     });
                //     positionsNewTemp[index] = {x: posNew[0], y: posNew[1]};
                //     if (!stdL2.numModel.checkIfCurveSlopeOkTemp(dr, positionsNewTemp))
                //         return;
                // }
                // // // const posFound = checkIfCurveSlopeOk2(dr, index, posNew);
                // // // if (!posFound)
                // // //     return;
                // // // // posNew = [...posFound];
                // // // posNew[0] = posFound.x;
                // // // posNew[1] = posFound.y;
                // // // // Object.assign(posNew, posFound);


                // //TEMP Check slope point on right only
                // const constrainSlopeHandleYAndRight = document.getElementById("radio-slope-handle-y-and-right").checked;
                // if (constrainSlopeHandleYAndRight) {
                //     // const positionsNewTemp = [...dr.ctrlPts.positions];
                //     const positionsNewTemp = dr.ctrlPts.positions.map(pos => {
                //         const {x, y} = pos;
                //         return {x, y};
                //     });
                //     positionsNewTemp[index] = {x: posNew[0], y: posNew[1]};
                //     if (stdL2.numModel.checkIfPointOnRightOfCurvePassedSlope(dr, positionsNewTemp))
                //         return;
                // }
                


                //TEMP Prevent handle y values from passing slope constraint
                const constrainHandleY = document.getElementById("radio-slope-handle-y").checked;
                // if (constrainSlopeHandleYAndRight || constrainHandleY) {
                if (constrainHandleY) {
                    let yTemp = stdL2.numModel.checkIfControlPointYOkForSlopeTemp(dr, posNew[0], posNew[1]);
                    // console.log("yTemp =", yTemp);
                    //TEMP Add extra padding
                    // yTemp -= 10;
                    if (yTemp < 0)
                        posNew[1] += yTemp;
                    // if (!stdL2.numModel.checkIfControlPointYOkForSlopeTemp(dr, posNew[0], posNew[1]))
                    //     return;
                }

                //TEMP Prevent handle y values from passing line offset from slope constraint
                const constrainHandleYOffset = document.getElementById("radio-slope-handle-y-offset").checked;
                if (constrainHandleYOffset) {
                    const offset = document.getElementById("input-slope-constraint-offset")?.value || 0;
                    let yTemp = stdL2.numModel.checkIfControlPointYOkForSlopeTemp(dr, posNew[0], posNew[1]);
                    yTemp -= offset;
                    // console.log("yTemp =", yTemp);
                    //TEMP Add extra padding
                    // yTemp -= 10;
                    if (yTemp < 0)
                        posNew[1] += yTemp;
                    // if (!stdL2.numModel.checkIfControlPointYOkForSlopeTemp(dr, posNew[0], posNew[1]))
                    //     return;
                }




                // //TEMP Move other handles with this one
                // const constrainSlopeEntireAndMoveOtherHandles =
                //     document.getElementById("radio-slope-entire-and-move-others").checked;
                // // const moveOtherHandlesWithThisOne = true;
                // if (constrainSlopeEntireAndMoveOtherHandles) {//moveOtherHandlesWithThisOne) {
                //     const xStart = dr.ctrlPts.positions.at(0).x;
                //     const chosenWidth = dr.ctrlPts.positions.at(-1).x - xStart;

                //     // const positionsNewTemp = [...dr.ctrlPts.positions];
                //     const positionsNewTemp = dr.ctrlPts.positions.map(pos => {
                //         const {x, y} = pos;
                //         return {x, y};
                //     });
                //     // positionsNewTemp[index] = {x: posNew[0], y: posNew[1]};

                //     //A handle at this distance or beyond won't move with the
                //     //handle beign dragged.
                //     const distanceNoMovement = chosenWidth * 0.5;

                //     const posOld = dr.ctrlPts.positions[index];
                //     const deltaY = posNew[1] - posOld.y;

                //     positionsNewTemp[index].x = posNew[0];
                //     positionsNewTemp[index].y = posNew[1];
                //     for(let i = 1; i < positionsNewTemp.length - 1; i++) {
                //         if (i === index)
                //             continue;

                //         const pos = positionsNewTemp[i];
                //         const fMoveY = 1 - Math.min(1, 
                //             Math.abs((pos.x - posOld.x) / distanceNoMovement));

                //         pos.y += deltaY * fMoveY;
                //         // const yAdjustment = stdL2.numModel.checkIfControlPointYOkForSlopeTemp(dr, pos.x, pos.y);
                //         // if (yAdjustment < 0)
                //         //     pos.y += yAdjustment;
                //     }

                //     //Check if all new positions ok
                //     if (!stdL2.numModel.checkIfCurveSlopeOkTemp(dr, positionsNewTemp))
                //         return;

                //     //Update the control points
                //     for(let i = 1; i < positionsNewTemp.length - 1; i++) {
                //         const {x, y} = positionsNewTemp[i];
                //         dr.ctrlPts.positions[i].x = x;
                //         dr.ctrlPts.positions[i].y = y;
                //     }
                // }



                //Prevents move if any part of the curve passes the slope
                //constraint, but doesn't work well.  Perhaps a variation that
                //causes the other handles to be constrained if they go too far
                //would work better.
                // //TEMP Move other handles with this one
                // const moveOtherHandlesWithThisOne = true;
                // if (moveOtherHandlesWithThisOne) {
                //     const xStart = dr.ctrlPts.positions.at(0).x;
                //     const chosenWidth = dr.ctrlPts.positions.at(-1).x - xStart;

                //     // const positionsNewTemp = [...dr.ctrlPts.positions];
                //     const positionsNewTemp = dr.ctrlPts.positions.map(pos => {
                //         const {x, y} = pos;
                //         return {x, y};
                //     });
                //     // positionsNewTemp[index] = {x: posNew[0], y: posNew[1]};

                //     //A handle at this distance or beyond won't move with the
                //     //handle beign dragged.
                //     const distanceNoMovement = chosenWidth * 0.33;

                //     const posOld = dr.ctrlPts.positions[index];
                //     const deltaY = posNew[1] - posOld.y;
                //     for(let i = 1; i < positionsNewTemp.length - 1; i++) {
                //         const pos = positionsNewTemp[i];
                //         const fMoveY = 1 - Math.min(1, 
                //             Math.abs((pos.x - posOld.x) / distanceNoMovement));
                //         pos.y += deltaY * fMoveY;
                //     }

                //     //Check if all new positions ok
                //     if (!stdL2.numModel.checkIfCurveSlopeOkTemp(dr, positionsNewTemp))
                //         return;

                //     //Update the control points
                //     for(let i = 1; i < positionsNewTemp.length - 1; i++) {
                //         const {x, y} = positionsNewTemp[i];
                //         dr.ctrlPts.positions[i].x = x;
                //         dr.ctrlPts.positions[i].y = y;
                //     }
                // }

                //TEMP Rectangle constraint for testing
                const constrainRectangle = 
                    document.getElementById("radio-rectangle").checked;
                if (constrainRectangle) {
                    const posTopLeft = dr.ctrlPts.positions.at(0);
                    const posBottomRight = dr.ctrlPts.positions.at(-1);
                    if (posTopLeft && posBottomRight) {
                        const figureWidth = posBottomRight.x - posTopLeft.x;
                        const figureHeight = posBottomRight.y - posTopLeft.y;
                        const bound = {
                            xMin: posTopLeft.x + figureWidth * 0.20,
                            xMax: posTopLeft.x + figureWidth * (1 - 0.15),
                            yMin: posTopLeft.y + figureHeight * 0.15,
                            yMax: posTopLeft.y + figureHeight * (1 - 0.25),
                        };
                        posNew[0] = Math.max(Math.min(posNew[0], bound.xMax), bound.xMin);
                        posNew[1] = Math.max(Math.min(posNew[1], bound.yMax), bound.yMin);
                    }
                }




                //Update stored un-transformed control point position.
                const pos = dr.ctrlPts.positions.at(index);
                if (pos) {
                    pos.x = posNew[0];
                    pos.y = posNew[1];
                }

                //Update dragger transformed position.
                const posTransformed = stdMod.xy_2_Txy(dr, posNew);
                item.x = posTransformed[0];
                item.y = posTransformed[1];

                // //\\ rescaling
                //let mscale = sconf.mod2inn_scale;
                //dr.ctrlPts_unscaled[pw.ix][0] = item.x/mscale;
                //dr.ctrlPts_unscaled[pw.ix][1] = item.y/mscale;
                // \\// rescaling


            } else if ("trans" === item.type) {
                //Transform points
                //TEMP To constrain the y position.  Note may not be needed.
                // const newY = Math.min(newY, ptLast.y - 50);
                if (item.draggableX)
                    item.x = newX;
                if (item.draggableY)
                    item.y = newY;

                stdMod.recalculateTransforms(dr);

                                
            } else if(index > 0 && index < sconf.basesN) {
                //Base points
                // //\\ limitifies newX by dom-neighbors
                var PAD         = sconf.BASE_POINTS_REPELLING_DISTANCE;
                var lst         = dr.basePts.list;
                var itemM       = lst[index];   //middle
                var itemL       = lst[index-1]; //left
                var itemR       = lst[index+1]; //right
                newX            = Math.max( newX, itemL.x + PAD );
                newX            = Math.min( newX, itemR.x - PAD );
                // \\// limitifies newX by dom-neighbors

                // //\\ applies newX to js-model
                itemM.x = newX;
                //TEMP Really only for L2/L3
                // if( itemM.index < 4 )
                //   stdMod.syncPoint(dr, item);
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
    }

}) ();

