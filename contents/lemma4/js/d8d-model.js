// //\\// application-level d8d module
( function () {
    var {
        sn, mat, dpdec, d8dp, fmethods, globalCss,
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

            //TEMP
            console.log("**********findDraggee**********");
            var closest = null;
            dragWraps.forEach( function( dwrap ) {
                closest = findClosestPoint( closest, mousePoint, dwrap );
            });
            console.log("closest =", closest);
            return closest ? closest.dwrap : null;
        }
        function findClosestPoint( closest, mousePoint, dwrap )
        {
            var pointWrap = dwrap.pointWrap;
            // var DRAGGEE_HALF_SIZE = pointWrap.type === 'base' ?
            //         5 : //crowdy base needs pinpointed selection
            //         sconf.DRAGGEE_HALF_SIZE;
            var DRAGGEE_HALF_SIZE = sconf.DRAGGEE_HALF_SIZE;

            //.already in sync
            //sconf.modorInPicY + sconf.pictureActiveArea - mousePoint[1];

            //TEMP
            //Does this code actually get the closest point?  I believe it
            //probably doesn't always do that.  To get the closest point
            //shouldn't it always use the exact distance from the mouse to the
            //point?  Suppose the mouse is somewhat close to base point 1 and
            //2.  When looping through it first selects point 1 because no
            //closest point has been selected yet.  Next it looks at point 2
            //and determines that it is also close enough to the mouse meaning
            //it could be selected.  If checks the distance td which happens to
            //be the exact same as point 1.  Note that the distances (straight
            //line) to the mouse likely aren't actually the same.  The td value
            //is only part of the distance.  Therefore point 1 stays chosen
            //even if point 2 is actually closer.

            //One possibility would be to check if a point is within the square
            //half size distance, then use the exact distance to determine if
            //it's closest.
            var tdX = Math.abs( mousePoint[0] - pointWrap.x );
            var tdY = Math.abs( mousePoint[1] - pointWrap.y );
            var td  = Math.max( tdX, tdY );
            //TEMP
            console.log("td =", td);
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

                //TEMP Should probably be disabled for L2/3
                //Prevent the y value from passing the following constraint.
                const yLine = computeYForOffsetSlopeConstraint(dr, posNew[0]);
                if (posNew[1] > yLine)
                    posNew[1] = yLine;


                //Update stored un-transformed control point position.
                const pos = dr.ctrlPts.positions.at(index);
                if (pos) {
                    pos.x = posNew[0];
                    pos.y = posNew[1];
                }

                //Update dragger transformed position.
                const posNewT = stdMod.xy_2_Txy(dr, posNew);
                item.x = posNewT[0];
                item.y = posNewT[1];

                //TEMP The following can probably be removed.
                // //\\ rescaling
                //let mscale = sconf.mod2inn_scale;
                //dr.ctrlPts_unscaled[pw.ix][0] = item.x/mscale;
                //dr.ctrlPts_unscaled[pw.ix][1] = item.y/mscale;
                // \\// rescaling


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



        function computeYForOffsetSlopeConstraint(dr, x) {
            //Computes the y coordinate of a sloped line offset from the bottom
            //of the figure.

            //When the right side of the figure’s curve is very low and flat,
            //the area under it becomes small which leads to jumping issues
            //(see "calculateRectWidthsToMatchAreaRatios" in "model-aux.js" for
            //more about jumping).  
            //
            //Slope...
            //Constraining the curve control points to be above a sloped line
            //helps keep the this area on the larger side, which is helpful to
            //reduce jumping.
            //
            //Offset...
            //Suppose there are two control points (1, 2) excluding the end
            //points.  When point 1 is moved towards the top of the screen, the
            //size of the area decreases, and adding offset to the slope
            //constraint helps keep the area large.

            const positions = dr.ctrlPts.positions;
            const ptLast = positions[positions.length - 1];

            const andleRad = mat.degToRad(sconf.SLOPE_CONSTRAINT_ANGLE_DEG);
            const offset = sconf.SLOPE_CONSTRAINT_OFFSET;

            //Amount to move in the y direction per x
            const slope = Math.tan(andleRad);

            const ySlopedLine = ptLast.y - slope * (ptLast.x - x);
            return ySlopedLine - offset;
        }


        //TEMP
        // function distanceToSlopeConstraintOffset(dr, pos) {
        //     //The vertical distance from the input coordinate to a sloped line
        //     //offset from the bottom of the figure.

        //     //When the right side of the figure’s curve is very low and flat,
        //     //the area under it becomes small which leads to jumping issues
        //     //(see "calculateRectWidthsToMatchAreaRatios" in "model-aux.js" for
        //     //more about jumping).  
        //     //
        //     //Slope...
        //     //Constraining the curve control points to be above a sloped line
        //     //helps keep the this area on the larger side, which is helpful to
        //     //reduce jumping.
        //     //
        //     //Offset...
        //     //Suppose there are two control points excluding the end points.
        //     //When point 1 is moved towards the top of the screen, the size of
        //     //the area decreases, and adding offset to the slope constraint
        //     //helps keep the area large.

        //     const positions = dr.ctrlPts.positions;
        //     const ptLast = positions[positions.length - 1];

        //     const andleRad = mat.degToRad(sconf.SLOPE_CONSTRAINT_ANGLE_DEG);
        //     const offset = sconf.SLOPE_CONSTRAINT_OFFSET;

        //     //Amount to move in the y direction per x
        //     const slope = Math.tan(andleRad);

        //     const ySlopedLine = ptLast.y - slope * (ptLast.x - pos[0]);
        //     return pos[1] - (ySlopedLine - offset);
        // }


        // //function adjustYToBeAboveSlopeConstraintOffset(dr, pos) {
        // function computeYAboveSlopeConstraintOffset(dr, pos) {
        //     //Checks if the y coordinate for the input pos passed a sloped line
        //     //offset from the bottom of the figure.  If so 

        //     //When the right side of the figure’s curve is very low and
        //     //flat, the area under it becomes small which leads to jumping
        //     //issues (see "calculateRectWidthsToMatchAreaRatios" in
        //     //"model-aux.js" for more about jumping).  
        //     //
        //     //Slope...
        //     //Constraining the curve control points to be above a sloped
        //     //line helps keep the this area on the larger side, which is
        //     //helpful to reduce jumping.
        //     //
        //     //Offset...
        //     //Suppose there are two control points excluding the end
        //     //points.  When point 1 is moved towards the top of the screen,
        //     //the size of the area decreases, and adding offset to the
        //     //slope constraint helps keep the area large.

        // }
        // //Prevent the y value from passing the following constraint.
        //         //When the right side of the figure’s curve is very low and
        //         //flat, the area under it becomes small which leads to jumping
        //         //issues (see "calculateRectWidthsToMatchAreaRatios" in
        //         //"model-aux.js" for more about jumping).
        //         //
        //         //Constraining the
        //         //curve control points to be above a sloped line helps keep the
        //         //this area on the larger side, which is helpful to reduce
        //         //jumping.  When point 1 is moved towards the top of the
        //         //screen, the size of the area decreases, and adding offset to
        //         //the slope constraint helps keep the area large.

        //         //Prevent the y value from passing the following constraint.
        //         //When the right side of the figure’s curve is very low and
        //         //flat, the area under it becomes small which leads to jumping
        //         //issues (see "calculateRectWidthsToMatchAreaRatios" in
        //         //"model-aux.js" for more about jumping).  
        //         //
        //         //Slope...
        //         //Constraining the curve control points to be above a sloped
        //         //line helps keep the this area on the larger side, which is
        //         //helpful to reduce jumping.
        //         //
        //         //Offset...
        //         //Suppose there are two control points excluding the end
        //         //points.  When point 1 is moved towards the top of the screen,
        //         //the size of the area decreases, and adding offset to the
        //         //slope constraint helps keep the area large.

        //         //sNew[1] = adjustYToBeAboveSlopeConstraintOffset(dr, posNew);
        //         const distanceY = distanceToSlopeConstraintOffset(dr, posNew);
        //         if (distanceY > 0)
        //             posNew[1] -= distanceY;




        // //TEMP Should this function be here or in a different file?
        // //I believe it's only used in "d8d-model.js"
        // //TEMP Possible alternate names...
        // //distancePointAboveSlopeConstraint
        // //distanceAboveSlopeConstraint
        // //distanceToSlopeConstraintOffset()
        // function distanceToSlopeConstraintOffset(dr, x, y) {
        //     //Output the vertical distance from the input coordinate to a
        //     //sloped line offset from the bottom of the figure.
        //     //
        //     //TEMP
        //     //Maybe better to have the note about the origin later?
        //     //sloped line offset from the bottom of the figure.  The origin of
        //     //the slope is the bottom right of the figure.
        //     //
        //     //TEMP
        //     //-Should probably mention why this has been added
        //     //-Perhaps here of maybe where it's called?
        //     //-Also probably in the sconf file
        //     //
        //     // |      \
        //     // |       \
        //     // |        \
        //     // |         \
        //     // |__________\
        //     //
        //     //
        //     //TEMP
        //     //What does this function do?
        //     //-Outputs how far a point is above or below the slope constraint
        //     //-Perhaps it would be best if it included offset?


        //     //
        //     //-Slope origin would use the last point on dr.ctrlPts.positions
        //     //

        //     //TEMP

        //     //TEMP Note that dv.maxY changes when non-monotonic therefore use an
        //     //alternative.
        //     //TEMP Be careful with the points that are selected to ensure that they
        //     //always work and behave the same, even if eg. the figure is
        //     //transformed.  I forget do the ctrlPts positions always stay the same
        //     //no matter what, even when eg. any of the transform points are moved?
        //     //TEMP
        //     //Should generic functions be created to get the first and last
        //     //positions?  I believe there may already be some that could be used.
        //     const positions = dr.ctrlPts.positions;
            
        //     //TEMP
        //     const ptFirst = positions[0];
        //     const ptLast = positions[positions.length - 1];
        //     //If the points couldn't be found then 
        //     //TEMP Should this output 0 ot eg. Infinity or -Infinity?
        //     if (!ptFirst && !ptLast)
        //         return 0;
            
        //     //TEMP Angle and offset for the slope constraint.
        //     const andleRad = mat.degToRad(11.933733957246143106397232250154);//sconf.SLOPE_CONSTRAINT_ANGLE_DEG);
        //     //TEMP
        //     const offset = sconf.SLOPE_CONSTRAINT_OFFSET;

        //     //Math.tan(andleRad) - The amount to move in the y direction per x
        //     //x - ptLast.x
        //     //
        //     //Therefore would it simplify to the following, at least to get the y
        //     //position of the slope constraint?...
        //     //ptLast.y - Math.tan(andleRad) * (x - ptLast.x)

        //     //x distance to the right side of the figure
        //     const xOffset = (ptLast.x - x);

        //     //The slope origin is the bottom right of the figure
        //     const slope = Math.tan(andleRad);
        //     const constraintY = ptLast.y - slope * (ptLast.x - x);
        //     return (constraintY - offset) - y;
        // }
    }

}) ();

