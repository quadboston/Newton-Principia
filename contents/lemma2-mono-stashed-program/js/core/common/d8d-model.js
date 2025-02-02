// //\\// application-level d8d module
( function () {
    var {
        sn, dpdec, d8dp, fmethods, globalCss, nspaste,
        fapp, sconf, sDomN, sDomF, ssF,
        fconf,
        amode, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var curveFW = sn( 'curveFW', ssF );
    var stdL2 = sn('stdL2', fapp );
    var datareg = sn('datareg', stdL2 );
    var dr      = sn('datareg', stdL2 );
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
                    processMouseDown                    : processMouseDown
                });
            setDragPoints();
        }

        function processMouseDown( cPW )
        {
            cPW.achieved.achieved.x = cPW.x; //point_on_dragSurf[0];
            cPW.achieved.achieved.y = cPW.y; //point_on_dragSurf[1];
            //prevents jerking when non-monotonity is encountered
            cPW.lastMove = [0,0];
            let len = dr.ctrlPts.length;
            dr.ctrlPts.forEach( (item,ix) => {
                if( ix === 0 || ix > len - 2 ) return;
                item.achieved.achieved = { x:item.x, y:item.y };
            });
            ///apparently, d8dp.crePointFW_BSLd8d1CHAMBER does this
            //if( !rg.detected_user_interaction_effect_DONE ) {
                //sDomF.detected_user_interaction_effect();
            //}
        }

        function setDragPoints() {
            ///Points on x-axis, on the base of the figure.
            datareg.basePts.list.forEach( setPoint );
            datareg.ctrlPts.forEach( setPoint );
            //for decorator ... todm very easy to forget and be in pain ...
            globalCss.update();
        }

        function setPoint( pointWrap, pwix ) {
            var nospinner = false;
            var decorator;
            if( pointWrap.type === 'base' ) {
                if( pwix === 0 ) return; //point A is "unmovable"
                //base is "dead" in lemma2
                if( fconf.sappId.indexOf('lemma2') === 0 ) return;
                pointWrap.spinnerClsId = 'base-'+pwix;
                pointWrap.dragDecorColor=sDomF.getFixedColor( 'given' );
            } else {
                if( pwix === 0 || pwix > dr.ctrlPts.length-2 ) {
                    pointWrap.dom.style.display = 'none'; 
                    return;
                }
                pointWrap.spinnerClsId = 'ctrl-'+pwix;   //optional for css
                pointWrap.dragDecorColor = sDomF.getFixedColor( 'given' );
                var achieved = { x:pointWrap.x, y:pointWrap.y };

                //todm for some reason hole point does not update
                //at launch time and hole point is not aligned with
                //curve on svg,
                //this is a patch for this flaw
                let cp = pointWrap;
                guiup.xy2shape( cp.dom, "cx", cp.x, "cy", cp.y );
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
                nospinner      : nospinner,
                update_decPoint : decorator,
                orientation     : pointWrap.type !== 'base' ? 
                        ( pwix === 4 ?
                              'axis-x'     //not in use jan 14, 2024
                            : 'axis-y' ) : false,
            });
            //ccc( 'pointWrap=', pointWrap, 'achieved=',pointWrap.achieved );
        }


        ///decorates DraggeeHoverer movement
        function Update_decPoint( pointWrap )
        {
            var pw = pointWrap;
            return ( function( decPoint ) {
                
                if( decPoint.id === 'ctrl3' ) {
                    ccc( decPoint, pw.y );
                }
                
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
            let fw = curveFW.fw;
            if( arg.down_move_up === 'down' ) {
                arg.pointWrap.lastMove = 0;
                dr.ctrlPts.forEach( (item,ix) => {
                    if( ix === 0 || ix > dr.ctrlPts.length-2 ) return;
                    item.achieved.achieved = { x:item.x, y:item.y };
                });
            } else if( arg.down_move_up === 'up' ) {
                fw.deriv = fw.newDeriv;
            } else if( arg.down_move_up === 'move' ) {
                var pw = arg.pointWrap;
                if( pw.type === 'base' ) {
                    move2js( pw, [arg.surfMove[0],0], pw.achieved );
                    guiup.xy2shape( pw.dom, "cx", pw.x, "cy", pw.y );
                    ssF.media_upcreate_generic();
                } else {
                    var moveY = arg.surfMove[1];
                    let changed = curveFW.fw.changesFunction({ ix:pw.index-1, deltaF:moveY });
                    if( changed.invalidRequest ) {
                        //ccc( changed.invalidRequest );
                        return;
                    }
                    let calcF = fw.integral( null, null, null, pw.index-1 );

                    ///developer: to see algo nicely: turn display derivatives on
                    ///by this call:
                    curveFW.doPaintArray( fw.step, fw.newDeriv,
                                          //fw.integral_of_derivative
                                         );

                    /*
                    let userY = pw.achieved.achieved.y+moveY;
                    c cc( '\n '
                            + 'arch F=' + pw.achieved.achieved.y.toFixed(3)
                            + ' DF='+moveY.toFixed(3)
                            + ' newF=' + userY.toFixed(3)
                            + ' calcF=' + calcF.toFixed(3)
                    );
                    */
                    dr.ctrlPts.forEach( (item,ix) => {
                        if( ix===0 || ix===dr.ctrlPts.length-1 ) return;
                        let y = fw.integral( null, null, fw.F0, ix-1 );
                        item.y = y;
                        //todm why media_upcreate_generic does not
                        //do this:
                        guiup.xy2shape(
                            item.dom,
                            "cx", item.x,
                            "cy", item.y,
                        );
                    });
                    ssF.media_upcreate_generic();
                }
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
            var basesN = dr.basesN;
            var closestPoint = null;
            if(
                //.excludes excess of non-used points
                pointWrap.type === 'base' && pointWrap.index >= basesN
            ) {
                return closest;
            }
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
        function move2js( pointWrap, move, ach )
        {
            var item = pointWrap;
            var index = item.index;
            if ( "ctrl" === item.type ) {
                item.x = ach.achieved.x + move[0];
                
                //makes point E vertically fixed at 0 level
                let lastHandleIndex = sconf.ctrlPtXYs_js.length - 1;
                item.y = ach.achieved.y + (index === lastHandleIndex ? 0 :  move[1]);

                /*
                if( item.index === 0 || item.index === 4 ) {
                    stdMod.syncPoints();
                } else {
                    stdMod.syncPoint( item );
                }
                */
	            appstate.movingBasePt = false;

            } else if( index > 0 && index < dr.basesN ) {
	            var newX = ach.achieved.x + move[0];
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
                if( itemM.index < 4 ) {
                    stdMod.syncPoint( item );
                }
                dr.partitionWidths[index-1] = itemM.x - itemL.x;
                dr.partitionWidths[index]   = itemR.x - itemM.x;
                // \\// applies newX to js-model

                //. todo: plays only in function updatePts(i, x) ... what for?
	            appstate.movingBasePt = true;
            }
            return item;
        }
        //======================================
        // \\// event to js
        //======================================
    }

}) ();

