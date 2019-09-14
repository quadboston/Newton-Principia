// //\\// application-level d8d module
( function () {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var $$          = ns.$$;
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
    
    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return; //0000000000000000









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
        var medD8D;

        gui.createDragModel = createDragModel;
        return; //mmmmmmmmmm



        function createDragModel() {
            medD8D = sn(SUB_MODEL, studyMods ).medD8D =
                d8d_p.createFramework ({
                    findDraggee                         : findDraggee,
                    dragSurface                         : sDomN.medRoot,
                    DRAG_POINTS_THROTTLE_TIME           : false,
                    detected_user_interaction_effect    : sDomF.detected_user_interaction_effect,
                    processMouseDown                    : processMouseDown
                });
            setDragPoints();
        }

        function processMouseDown( cPW )
        {
            cPW.achieved.achieved.x = cPW.x; //point_on_dragSurf[0];
            cPW.achieved.achieved.y = cPW.y; //point_on_dragSurf[1];
        }

        function setDragPoints() {
            ///Points on x-axis, on the base of the figure.
            datareg.basePts.list.forEach( setPoint );
            datareg.ctrlPts.forEach( setPoint );
            //for decorator ... todm very easy to forget and be in pain ...
            ns.globalCss.update(); 
        }

        function setPoint( pointWrap, pwix ) {
            if( pointWrap.type === 'base' ) {
                if( fconf.sappId === 'lemma2' ) return; //base is "dead" in lemma2
                pointWrap.dragCssCls = 'base-'+pwix;
                pointWrap.dragDecorColor='blue';
            } else {
                pointWrap.dragCssCls = 'ctrl-'+pwix;   //optional for css
                pointWrap.dragDecorColor='red';        //optional
            }
            if( typeof pointWrap.x === 'number' ) {
                var decorator = Update_decPoint( pointWrap )
                var achieved = { x:pointWrap.x, y:pointWrap.y };
            } else {
                ////avoids excessive assignment to idle points
                ////which are not yet ready
                ////one must code "decorator" for new points
                ////when they are created
                var decorator = null;
            }

            ///small test-case
            //if( pointWrap.dragCssCls === "base-2" ) {
            //    ccc('assigned achieved', achieved, " point wrap", pointWrap);
            //}
            var dragWrap = medD8D.pointWrap_2_dragWrap({
                achieved        :achieved,
                pointWrap       :pointWrap,
                doProcess       :doProcess,
                update_decPoint :decorator
            });
            if( pointWrap.type !== 'base' ) {
                ////makes decoration point rotating
                $$.cls( 'rotate', dragWrap.decPoint );
            }
        }


        ///decorates DraggeeHoverer movement    
        function Update_decPoint( pointWrap )
        {
            var pw = pointWrap;
            return ( function( decPoint ) {
                if( pw.x || pw.x === 0 ) {
                    var dompos = sDomF.medpos2dompos.call(
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

                //ns.eachprop( studyMods, ( stdMod, modName ) => {
                //    stdMod.upcreate();
                //});
                if( ns.h( amode, 'submodel' ) && amode['submodel'] ) {
                    //.this is a duty of contributor to provide:
                    //.if( studyMods[ ww ] ) {
                    studyMods[ amode['submodel'] ].upcreate();
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
            mousePoint = sDomF.pOnDs_2_innerViewBox( mousePoint );
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
                    sacf.DRAGGEE_HALF_SIZE;
            var bases = dr.bases;
            var closestPoint = null;
            if( 
                //.excludes excess of non-used points
                pointWrap.type === 'base' && pointWrap.index >= bases
            ) {
                return closest;
            }
            //.already in sync
            //sacf.activeAreaOffsetY + sacf.pictureActiveArea - mousePoint[1];

            var tdX = Math.abs( mousePoint[0] - pointWrap.x );
            var tdY = Math.abs( mousePoint[1] - pointWrap.y );
            var td  = Math.max( tdX, tdY );
            if( td <= DRAGGEE_HALF_SIZE ) {
                if( !closestPoint || closestPoint.td > td ) {
                    closestPoint = { td:td, pt:pointWrap };
                    closest = dwrap;
                    //if( pointWrap.dragCssCls === 'ctrl-'+1 ) {
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

}) ();

