// //\\// application-level d8d module
( function () {
    var {
        sn, dpdec, d8dp, fmethods, globalCss,
        fapp, sconf, sDomN, sDomF, ssF,
        fconf,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2 = sn('stdL2', fapp );
    var datareg = sn('datareg', stdL2 );
    return;









    function setModule()
    {
        var study       = sn('study', stdL2 );
        var sdata       = sn('sdata', study );
        var dr          = sn('datareg', stdL2 );
        var numModel    = sn('numModel', stdL2 );
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
                if( fconf.sappId === 'lemma2' ) return; //base is "dead" in lemma2
                pointWrap.spinnerClsId = 'base-'+pwix;
                pointWrap.dragDecorColor='blue';
            } else {
                pointWrap.spinnerClsId = 'ctrl-'+pwix;   //optional for css
                pointWrap.dragDecorColor = sDomF.getFixedColor( 'given' );
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
            //    ccc('assigned achieved', achieved, " point wrap", pointWrap);
            //}
            medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE({
                pointWrap       : pointWrap,
                doProcess       : doProcess,
                //-------------------------
                achieved        : achieved,
                nospinner      : nospinner,
                update_decPoint : decorator,
                orientation     : pointWrap.type !== 'base' ? 'rotate' : false,
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
                move2js( pw, arg.surfMove, pw.achieved );
                guiup.xy2shape( pw.dom, "cx", pw.x, "cy", pw.y );

                // //\\ recent framework
                ssF.media_upcreate_generic();
                //instead of following:
                /*
                if( ns.h( amode, 'submodel' ) && amode['submodel'] ) {
                    //.this is a duty of contributor to provide:
                    //.if( studyMods[ ww ] ) {
                    studyMods[ amode['submodel'] ].model8media_upcreate();
                }
                */
                // \\// recent framework
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

            //ccc( 'mouseY=' + mousePoint[1].toFixed() );
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
            var bases = dr.bases;
            var closestPoint = null;
            if( 
                //.excludes excess of non-used points
                pointWrap.type === 'base' && pointWrap.index >= bases
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
                    //    //ccc( 'selected' );
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
        function move2js( pointWrap,move, ach )
        {
            var item = pointWrap;
            let pw = item;
            var index = item.index;
            if( pw.type === 'base' && pw.index === 0 ) {
                ccc( 'moves point A ' );
            }
            if ( "ctrl" === item.type ) {
                item.x = ach.achieved.x + move[0];
                item.y = ach.achieved.y + move[1];
                /*
                if( item.index === 0 || item.index === 4 ) {
                    stdMod.syncPoints();
                } else {
                    stdMod.syncPoint( item );
                }
                */
	            appstate.movingBasePt = false;

            } else if( index > 0 && index < dr.bases ) {

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
                dr.baseWidths[index-1] = itemM.x - itemL.x;
                dr.baseWidths[index]   = itemR.x - itemM.x;
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

