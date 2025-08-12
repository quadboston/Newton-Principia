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
            //TEMP Should be fine as it will just add points to both dataregs.
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
            //TEMP Seems like changing the order fixes the drag priority issue.
            Object.values(dr.transforms.pts).forEach((pointWrap) => {
                setPoint(dr, pointWrap, pointWrap.index);
            });
            //Placed after transform points to have drag priority over them.
            //Otherwise if a point on the curve gets close to a transform point
            //it's very hard to move the point on the curve.
            dr.ctrlPts.list.forEach((pointWrap) => {
                setPoint(dr, pointWrap, pointWrap.index);
            });

            //TEMP Moved base points here so that they have priority over the
            //curve control points.  This is helpful when the curve is close
            //to the base points.
            ///Points on x-axis, on the base of the figure.
            if (dr.basePtDraggersEnabled) {
                const bplist =  dr.basePts.list;
                const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
                const iMax = Math.min(bplist.length, DRAGGABLE_BASE_POINTS);
                for(let ix = 1; ix < iMax; ix++) {
                    setPoint(dr, bplist[ix], ix);
                }
                // dr.basePts.list.forEach((pointWrap, pwix) => {
                //     if( pwix > 0 )
                //         setPoint(dr, pointWrap, pwix);
                // });
            }

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

            if( typeof pointWrap.x === 'number' ) {
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
            return closest;
        }
        function findClosestPoint( closest, mousePoint, dwrap )
        {
            var pointWrap = dwrap.pointWrap;
            var DRAGGEE_HALF_SIZE = pointWrap.type === 'base' ?
                    5 : //crowdy base needs pinpointed selection
                    sconf.DRAGGEE_HALF_SIZE;
            var closestPoint = null;

            //.already in sync
            //sconf.modorInPicY + sconf.pictureActiveArea - mousePoint[1];

            var tdX = Math.abs( mousePoint[0] - pointWrap.x );
            var tdY = Math.abs( mousePoint[1] - pointWrap.y );
            var td  = Math.max( tdX, tdY );
            if( td <= DRAGGEE_HALF_SIZE ) {
                if( !closestPoint || closestPoint.td > td ) {
                    closestPoint = { td:td, pt:pointWrap };
                    closest = dwrap;
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

                // //TEMP
                // //Check slope
                // const positionsNewTemp = [...dr.ctrlPts.positions];
                // positionsNewTemp[index] = {x: posNew[0], y: posNew[1]};
                // if (!stdL2.numModel.checkIfCurveSlopeOkTemp(dr, positionsNewTemp))
                //     return;
                // // const posFound = checkIfCurveSlopeOk2(dr, index, posNew);
                // // if (!posFound)
                // //     return;
                // // // posNew = [...posFound];
                // // posNew[0] = posFound.x;
                // // posNew[1] = posFound.y;
                // // // Object.assign(posNew, posFound);

                //TEMP Constrain y value if needed
                let yTemp = stdL2.numModel.checkIfControlPointYOkForSlopeTemp(dr, posNew[0], posNew[1]);
                // console.log("yTemp =", yTemp);
                //TEMP Add extra padding
                // yTemp -= 10;
                if (yTemp < 0)
                    posNew[1] += yTemp;
                // if (!stdL2.numModel.checkIfControlPointYOkForSlopeTemp(dr, posNew[0], posNew[1]))
                //     return;


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


        //TEMP
        // function checkIfCurveSlopeOk2(dr, index, posNew) {
        //     const posCurrent = dr.ctrlPts.positions[index];

        //     const posNew2 = checkUsingFOffset(1);
        //     if (posNew2)
        //         return posNew2;

        //     let fOffsetMin = 0;
        //     let fOffsetMax = 1;
        //     let posBest = null;
        //     for (let i = 0; i < 7; i++){
        //         const fOffsetMid = (fOffsetMin + fOffsetMax) / 2;
        //         const posCheck = checkUsingFOffset(fOffsetMid);
        //         if (posCheck) {
        //             fOffsetMin = fOffsetMid;
        //             posBest = posCheck;
        //         } else {
        //             fOffsetMax = fOffsetMid;
        //             posBest = posCheck;
        //         }
        //     }

        //     return posBest;
            

        //     function checkUsingFOffset(fOffset) {
        //         const posCheck = {
        //             x: (posNew[0] - posCurrent.x) * fOffset + posCurrent.x,
        //             y: (posNew[1] - posCurrent.y) * fOffset + posCurrent.y,
        //         };
        //         //Check slope
        //         const positionsNewTemp = [...dr.ctrlPts.positions];
        //         positionsNewTemp[index] = posCheck;//{x: posCheck[0], y: posCheck[1]};
        //         if (checkIfCurveSlopeOk(dr, positionsNewTemp))
        //             return posCheck;
        //         return null;
        //     }
        // }

        //TEMP Moved to numModel in "model-aux.js"
        // function checkIfCurveSlopeOk(dr, positionsNewTemp) {
        //     //TEMP
        //     const ff = stdL2.numModel.curveFun;
        //     // const dv = dr.yVariations;
        //     //TEMP Is something similar to the following needed?
        //     // if (!dv) return true;
        //     // const yVariations = dr.yVariations;
        //     // const xStart = yVariations.x_start;
        //     // const chosenWidth = yVariations.chosenWidth;
        //     const xStart = dr.ctrlPts.positions.at(0).x;
        //     const chosenWidth = dr.ctrlPts.positions.at(-1).x - xStart;

        //     //TEMP Note that dv.maxY changes when non-monotonic therefore use
        //     //an alternative.
        //     const maxY = dr.ctrlPts.positions.at(-1).y;

        //     //TEMP Store current control point positions
        //     const positionsStored = [...dr.ctrlPts.positions];

        //     dr.ctrlPts.positions = [...positionsNewTemp];

        //     //TEMP
        //     //Want to check points in between the left and right sides
        //     //Eg.  0  1  2  3  should be for 2 points
        //     const slopeBound = (maxY * 0.2) / chosenWidth;
        //     // const slopeBound = (dv.maxY * 0.2) / chosenWidth;
        //     const countPoints = 30;
        //     // const iMax = 5;
        //     const xInterval = chosenWidth / (countPoints + 1);
        //     for(let i = 1; i <= countPoints; i++){
        //         const x = xStart + xInterval * i;
        //         const y = ff(dr, x);
        //         // const height = Math.abs(maxY - y);
        //         const height = maxY - y;
        //         // const height = Math.abs(dv.maxY - y);
                
        //         const heightBound = slopeBound * (chosenWidth - (x - xStart));
        //         // console.log(`i = ${i}  height = ${height}  heightBound = ${heightBound}`);
        //         if (height < heightBound) {
        //             dr.ctrlPts.positions = [...positionsStored];
        //             console.log("return false");
        //             return false;
        //         }
        //     }
        //     dr.ctrlPts.positions = [...positionsStored];
        //     console.log("return true");
        //     return true;
        // }
    }

}) ();

