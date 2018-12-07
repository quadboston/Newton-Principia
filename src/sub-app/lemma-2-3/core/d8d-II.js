// //\\// application-level d8d module
( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var dpdec       = ns.sn('drag-point-decorator');
    var fapp        = ns.sn('fapp' );
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sacf        = sconf;

    var ss          = sn('ss',fapp);
    var datareg     = sn('datareg', ss );
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);

    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions', sapp);
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    return;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~









    function setModule()
    {
        var l23         = ss
        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );
        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );

        gui.createDragModel = createDragModel;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        return;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~









        function createDragModel(
        ) {
            var doDragUpdate;

            sDomF.medD8D = d8d_p.createFramework (
                findDraggee,
                datareg.svgSeg.parentNode,
                false,
                sDomF.detected_user_interaction_effect
            );

            var createDragUpdate = sDomF.medD8D.createDragUpdate;
            setupDragUpdates();
            //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
            return;
            //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr








            function setupDragUpdates() {
                if( sapp.lemmaNumber === 3 ) {
                    ////todo-patch-disable-base-drag 2 of 2
                    datareg.basePts.list.forEach( function( pointWrap, pwix ) {

                        pointWrap.name = 'base-'+pwix;     //optional for css
                        pointWrap.finalColor='black';      //optional

                        if( typeof pointWrap.x === 'number' ) {
                            //ccc( 'set ix=' + pwix );
                            var decorator = update_decPoint;
                        } else {
                            var decorator = null;
                        }
                        createDragUpdate({
                            pointWrap:pointWrap,
                            doProcess:doProcess,

                            //.todm ... disabled ... needs more work
                            update_decPoint:null, //decorator,

                            //nop: achieved: { x:pointWrap.x, y:pointWrap.y } 
                            achieved: { x:null, y:null } 
                         });

                        ///decorates DraggeeHoverer movement    
                        function update_decPoint( decPoint )
                        {
                            if( pointWrap.x || pointWrap.x === 0 ) {
                                var dompos = sDomF.medpos2dompos.call( { medpos:[pointWrap.x,pointWrap.y ] } );
                                //ccc( 'run ix=' + pwix +' x='+pointWrap.x +' dompos=', dompos );
                                decPoint.style.left = dompos[0] + 'px';            
                                decPoint.style.top = dompos[1] + 'px';            
                            }
                        }
                    });
                }
                //todo: dragWraps
                datareg.ctrlPts.forEach( function( pointWrap, pwix ) {
                        pointWrap.name = 'ctrl-'+pwix;     //optional for css
                        pointWrap.finalColor='black';      //optional
                        createDragUpdate({
                            pointWrap:pointWrap,
                            doProcess:doProcess,

                            //.todm ... disabled ... needs more work
                            update_decPoint:null, //update_decPoint,


                            //nop: achieved: { x:pointWrap.x, y:pointWrap.y } 
                            achieved: { x:null, y:null } 
                        });
                        ///decorates DraggeeHoverer movement    
                        function update_decPoint( decPoint )
                        {
                            return; //todo ... blocks control drag
                            if( pointWrap.x || pointWrap.x === 0 ) {
                                var dompos = sDomF.medpos2dompos.call( { medpos:[pointWrap.x,pointWrap.y ] } );
                                decPoint.style.left = dompos[0] + 'px';            
                                decPoint.style.top = dompos[1] + 'px';            
                            }
                        }
                });
                ns.globalCss.update(); //for decorator ... todm very easy to forget and be in pain ...
            }


            function doProcess( arg )
            {
                if( arg.down_move_up === 'move' ) {
                    var ach = arg.pointWrap.achieved;
                    var se = arg.pointWrap;
                    move2js( se, arg.move, ach );
                    guiup.xy2shape( se.dom, "cx", se.x, "cy", se.y );
        	        //.l23.refreshSVG();
                    sapp.upcreate();
                }
            }


            //====================
            // //\\ finds draggee
            //====================
            ///Gets movable and visible point which is closest to testPoint.
            function findDraggee( testPoint, dragWraps )
            {
                //////////////////////////////////////////////////////////
                // //\\ todo. d8d points tmp patch.
                testPoint = sDomF.dompos2medpos( testPoint );
                // \\// todo. d8d points tmp patch.
                //////////////////////////////////////////////////////////

                var DRAGGEE_HALF_SIZE = sacf.DRAGGEE_HALF_SIZE;
                var bases = dr.bases;
                var closestPoint = null;
                var closestDragWrap = null;

                dragWraps.forEach( function( dwrap ) {
                    findClosestPoint( dwrap );
                });

                function findClosestPoint( dwrap )
                {
                    var dragPoint = dwrap.pointWrap;
                    if( 
                        //.excludes "invisible" ("non-thick") points on axis x
                        dragPoint.type === 'base' && dragPoint.index >= bases ||
                        dragPoint.visible === false
                    ) {
                        return;
                    }
                    var tdX = Math.abs( testPoint[0] - dragPoint.x );
                    var tdY = Math.abs( testPoint[1] - dragPoint.y );
                    var td  = Math.max( tdX, tdY );
                    if( td <= DRAGGEE_HALF_SIZE ) {
                        if( !closestPoint || closestPoint.td > td ) {
                            closestPoint = { td:td, pt:dragPoint };
                            closestDragWrap = dwrap;
                        }
                    }
                };
                if( closestDragWrap ) {
                    return closestDragWrap;
                } else {
                    return null;
                }
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
                var index = item.index;
	            if ( "ctrl" === item.type ) {
	                item.x = ach.achieved.x + move[0];
	                item.y = ach.achieved.y + move[1];;
		            appstate.movingBasePt = false;

	            } else if( index > 0 && index < dr.bases ) {

		            var newX = ach.achieved.x + move[0];
                    // //\\ limitifies newX by dom-neighbors
	                var PAD         = sacf.BASE_POINTS_REPELLING_DISTANCE;
                    var lst         = dr.basePts.list;
                    var itemM       = lst[index];   //middle
                    var itemL       = lst[index-1]; //left
                    var itemR       = lst[index+1]; //right
	                newX            = Math.max( newX, itemL.x + PAD );
	                newX            = Math.min( newX, itemR.x - PAD );
                    // \\// limitifies newX by dom-neighbors

                    // //\\ applies newX to js-model
                    itemM.x = newX;        
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

    }

}) ();

