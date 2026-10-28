// //\\// Provides d&d module for set of points which act exclusively
//        one at the time and share common handler.
//        The active point is elected by "findDraggee" function
//        which is supplied at initialization time.
{
const {ns, sn, d8dp, has, haz, $$, dpdec, fconf, stripp, sDomF } =
       window.b$l.nstree();
//const createdFrameworks = []; //for debug

///===========================================================
/// //\\ inits common framework for the set of  point-draggees
///      There can be as many frameworks as one wishes.
///this function is never called outside of init_dragList
///(except workplace-dividor.js),
///
///making finalizes-custDraggers8toolsSliders.js::findDraggee() an effective
///default finder instead of d8d-lemma.js::findDraggee_default()
///
///lemma1,lemma2, possibly have own createDragModel() and finder
///===========================================================
d8dp.lemmaFW = function( apia ){
    let {
        //these two parameter are mutially dependent:
        //if findDraggee is excluded, then "pos_dom2med"
        //becomes a flag for default findDraggee
        findDraggee, //function which finds draggeePoint
        pos_dom2med, //usually sDomF.pos_dom2med
        //this thing is used only in vendor's default
        //update_decPoint_inn2outparent:
        pos_med2dom,

        dragSurface,

        //the rest is optional
        doCreateDynamicSpinners,
        spinnerCursorGrab,
        spinnerCursorGrabbed,
        DRAGGEE_HALF_SIZE,
        skipD8D,
        //fires this function at down event and only at this event
        shows_book_picture,

        dragPointDecoratorClasses,
        processMouseDown_II,
        //only for two things:
        //  findDraggee_default()
        //  spinner((u pdate_decPoint_default))
        handle2dragsurf_pos,

        //dontStopDownAfteshocks,
        //dontStopMoveAfteshocks,
        //dontStopEndAfteshocks,
    }=stripp(apia);

    DRAGGEE_HALF_SIZE = DRAGGEE_HALF_SIZE || 40;
    findDraggee = findDraggee || findDraggee_default;
    handle2dragsurf_pos = handle2dragsurf_pos ||
        handle2dragsurf_pos_default;
    //for debug
    //var frameworkId = createdFrameworks.length;
    var elected_dragWrap;
    var activeDecPoint = null;
    var spinnerCandidate_dragWrap = null;
    var dragWraps = [];
    ///sets single lower-level handler for framework draggees
    var { eventPos_2_surfacePos } = d8dp.deviceFW({
        dragSurface : dragSurface,
        cbDownMoveUp: cbDownMoveUp_I,
        movesAndFindsHandle : doCreateDynamicSpinners && movesAndFindsHandle,
        skipD8D,
        //frameworkId, ////for debug
        //dontStopDownAfteshocks,
        //dontStopMoveAfteshocks,
        //dontStopEndAfteshocks,
    });
    /*
    var createdFramework = {
        //frameworkId, //for debug
        dragSurface,
        //april 2026, not yet implemented
        dragPointDecoratorClasses,
    };
    */
    //createdFrameworks.push( createdFramework );
    return {
        pointWrap_2_dragWraps,
        updateAllDecPoints,
    };

    function movesAndFindsHandle( rootEvent ){
        //----------------------------------------------------------
        // //\\ possible update for mobile for spinner
        //----------------------------------------------------------
        ///touch-down
        //if( rootEvent.touches && rootEvent.touches.length === 1 ) {
        //    var childEvent = rootEvent.touches[0];
        //var point_on_dragSurf = eventPos_2_surfacePos( childEvent );
        //----------------------------------------------------------
        // \\// possible update for mobile for spinner
        //----------------------------------------------------------
        var point_on_dragSurf = eventPos_2_surfacePos( rootEvent );
        //seems wrong: childEvent.preventDefault(); //trying for mobiles
        //forbidden = do_complete_down( childEvent, ev );
        spinnerCandidate_dragWrap = findDraggee(
            point_on_dragSurf,
            dragWraps,
            dragSurface
        );
        //very good for debug:
        //c cc( spinnerCandidate_dragWrap.pointWrap.rgn  );
        if( activeDecPoint ) {
            activeDecPoint.style.display = 'none';
        }
        const decPoint = haz( spinnerCandidate_dragWrap, 'decPoint' );
        //if( spinnerCandidate_dragWrap.pointWrap.rgn === 'P' )
        //c cc( spinnerCandidate_dragWrap.pointWrap.rgn, decPoint );
        if( decPoint &&
            spinnerCandidate_dragWrap.pointWrap.rgn !== 'media-mover'
        ){
            if( spinnerCandidate_dragWrap.pointWrap.hideD8Dpoint ) {
                decPoint.style.display = 'none';
            } else {
                decPoint.style.display = 'block';
                //vital
                //html global style tag does not do this:
                dragSurface.style.cursor = spinnerCursorGrab || 'grab';

                activeDecPoint = decPoint;
            }
        } else {
            dragSurface.style.cursor = 'grab';
        }
    }

    //==========================================
    // //\\ converts pos-in-parent to dom-pos
    //==========================================
    //Gets position of dom-drag-handle in respect to drag-surface.
    //In contrary to "pos_med2dom",
    //  it does not convert inner-media-position and
    //  does not convert inner-model-position to dom position.
    //The dragHandleDOM must belong the "surface".
    function handle2dragsurf_pos_default( dragWrap, dragSurface ){
        var rr = dragSurface.getBoundingClientRect();
        var hh = dragWrap.dragHandleDOM.getBoundingClientRect();
        //var orien = dragWrap.orientation;
        var h2r = [
            hh.left - rr.left + hh.width/2,
            hh.top - rr.top + hh.height/2
        ];
        return h2r;
    }
    //==========================================
    // \\// converts pos-in-parent to dom-pos
    //==========================================

    function updateAllDecPoints (){
        dragWraps.forEach( function( dragWrap ) {
            var uP = dragWrap.update_decPoint;
            uP && uP( dragWrap.decPoint, dragSurface, dragWrap.pointWrap,
                        //'nonenify'
            );
            //c cc( 'all dec end: ', dragWrap.decPoint );
        });
    }

    ///Creates drag handler for each specific point-draggee.
    ///Usually called when each model point is created to be dragged.
    //todo { var {...} = stripp( api )
    function pointWrap_2_dragWraps( api ){
        //---------------------------------------------
        // //\\ AAA PPP III
        //---------------------------------------------
        var pointWrap = api.pointWrap;
        //    || {}; //does this has practical value?
        var cbDownMoveUp_III = api.cbDownMoveUp_III;
        //to be set at point-def.
        //:optional

        ///////////////////////////////////////////////////////////
        // //\\ the combination of these switches is too convoluted
        //      and needs thought:
        //=========================================================
        var addFeaturesToDecPoint= haz( pointWrap,
                                        'addFeaturesToDecPoint');
        //thes two ignite
        //addFeaturesToDecPoint.dragDecorColor as a condition to
        //run creates_spinnerOwnCss()
        var spinnerClsId         = pointWrap.spinnerClsId;
        var dragDecorColor       = pointWrap.dragDecorColor;
        //=========================================================
        // \\// the combination of these switches is too convoluted
        ///////////////////////////////////////////////////////////

        var individual_zindex    = haz( pointWrap, 'individual_zindex' );
        var makeCentralDiskInvisible = pointWrap.makeCentralDiskInvisible;
        var update_decPoint      = api.update_decPoint;
        var nospinner            = api.nospinner;
        var grabffect            = api.spinnerCursorGrab ||
                                        spinnerCursorGrab;
        var grabbedffect         = api.spinnerCursorGrabbed ||
                                        spinnerCursorGrabbed;
        var orientation          = api.orientation;
        var achieved             = api.achieved; //api sugar
        var dragHandleDOM        = api.dragHandleDOM;
        var tooltip              = api.tooltip;
        //---------------------------------------------
        // \\// AAA PPP III
        //---------------------------------------------

        //==============================================
        // //\\ api.achieved is an optional parameter
        //      see page footnote comment;
        //==============================================
        if( !has( pointWrap, 'achievedtop' ) ) {
            pointWrap.achievedtop = ( achieved || achieved === 0 ) ?
               { achieved : achieved } : { achieved : stripp() };
        }
        //==============================================
        // \\// api.achieved is an optional parameter
        //==============================================

        //========================================================
        // //\\ creates and updates drag overlay: decoration point
        //========================================================
        var decPoint = null;
        if( !nospinner ) {
            update_decPoint = !update_decPoint ?
                update_decPoint_inn2outparent :
                ( update_decPoint === 'update_decPoint_default' ?
                        update_decPoint_default :
                        update_decPoint
                );

            if( spinnerClsId ) {
                //don't do this here: not a d8d concern:
                //var cssIdLowCase = sDomF.rgid2low(
                //spinnerClsId );
                var cssIdLowCase = spinnerClsId;

                addFeaturesToDecPoint = Object.assign(
                        addFeaturesToDecPoint || {},
                        {
                            dragDecorColor      : dragDecorColor,
                            spinnerClsId        : cssIdLowCase,
                            individual_zindex   : individual_zindex,
                            spinnerCursorGrab   : grabffect,
                            spinnerCursorGrabbed : grabbedffect,
                        }
                );
            }

            decPoint = dpdec.adds_decorSpinner({
                spinner_domParent : dragSurface,
                opt :
                {
                    tooltip,
                    addFeaturesToDecPoint,
                        orientation,
                        dragPointDecoratorClasses,
                        makeCentralDiskInvisible,
                }
            });
        }
        //========================================================
        // \\// creates and updates drag overlay: decoration point
        //========================================================

        //=====================================================
        // //\\ drag8drop main wrapper over item
        //=====================================================
        var dragWrap =
        {
            pointWrap       : pointWrap, //often, should be = rgX
            cbDownMoveUp_II   : cbDownMoveUp_II,
            update_decPoint : update_decPoint,
            //recall: decPoint = document.createElement( 'div' )
            decPoint        : decPoint,
            orientation     : orientation,
            dragHandleDOM   : dragHandleDOM,
            //achieved,
            //createdFramework,
        }
        dragWraps.push( dragWrap );
        //**********************************************
        //not yet implemented, but planned:
        // app engine change since ver 9239,
        // allows to get decPoint at run time, f.e.
        //pointWrap.dragWrap = dragWrap;
        //**********************************************

        //nonefy is needed
        update_decPoint &&
            update_decPoint( decPoint, dragSurface, pointWrap,
                doCreateDynamicSpinners ? 'nonenify' : 'block' );
        //=====================================================
        // \\// drag8drop main wrapper over item
        //=====================================================

        //explicit setting to avoid property in prototype:
        sn( 'dragPriority', pointWrap, 0 );
        return; // dragWrap; //todm consider adding this
                //to pointWrap

        ///=====================================================
        /// tiny wrap around cbDownMoveUp_III
        /// 1) provides decPoint
        /// 2) stops drag and nullifies elected_dragWrap
        /// 3) at "up", nullifies elected_dragWrap
        ///=====================================================
        function cbDownMoveUp_II( arg ){
            arg.pointWrap = pointWrap;
            const decPoint = haz( elected_dragWrap, 'decPoint' );
            var appFeedback = cbDownMoveUp_III(arg);
            if( appFeedback ){
                elected_dragWrap = null;
                return true;
            }
            if( arg.down_move_up === 'up' ) {
                if( decPoint ) {
                    update_decPoint( decPoint,
                        dragSurface, elected_dragWrap,
                    );
                }
                ////this cleans up drag and drop lifecycle
                elected_dragWrap=null;
            }
        }

        ///updates spinner position.
        ///uses already existing-on-drag-surface handle, "dragWrap",
        ///to synch with it.
        ///recall: spinner is a div with two children divs which are animated
        ///        spinner's master-css is made here:
        ///        bsl/d8d/decorator.css.js::creates _spinnerOwnCss.
        function update_decPoint_default(
            decPoint, dragSurface, pointWrap, nonenify
        ){
            var dompos = handle2dragsurf_pos( dragWrap, dragSurface );
            decPoint.style.left = dompos[0] + 'px';
            decPoint.style.top = dompos[1] + 'px';

            if( nonenify === 'nonenify' ) {
                decPoint.style.display = 'none';
            } else if( nonenify === 'block' ) {
                if( !pointWrap.ignore_hideD8Dpoint_for_CSS &&
                    pointWrap.hideD8Dpoint
                ) {
                    decPoint.style.display = 'none';
                } else {
                    decPoint.style.display = 'block';
                }
            }
        }

        ///this thing runs when no update_decPoint is supplied to
        //      pointWrap_2_dragWraps( api )
        ///recall: spinner is a div with two children divs which are animated
        ///        spinner's master-css is made here:
        ///        bsl/d8d/decorator.css.js::creates _spinnerOwnCss
        ///does position spinner by converting
        ///inner-media-position to dom-position
        ///and setting spinner ot this dom-position
        function update_decPoint_inn2outparent(
            dummy1, dummy2, dummy3, nonenify ){
            var dompos   = pos_med2dom.call( pointWrap );
            //c cc( pointWrap.rgn, pointWrap.pos, dompos );
            decPoint.style.left = dompos[0] + 'px';
            decPoint.style.top  = dompos[1] + 'px';
            if( nonenify === 'nonenify' ) {
                decPoint.style.display = 'none';
            } else if( nonenify === 'block' ) {
                if( !pointWrap.ignore_hideD8Dpoint_for_CSS &&
                    pointWrap.hideD8Dpoint
                ) {
                    decPoint.style.display = 'none';
                } else {
                    decPoint.style.display = 'block';
                }
            }
        }
    }

    ///d8d handler shared between all draggee-points.
    ///Input: point_on_dragSurf
    ///       it is precalculated by lower level handler;
    ///       it offsets in "local-surface" if no special converter is supplied:
    ///       details are in d8d code:
    ///            var point_on_dragSurf = eventPoint_2_localPoint( childEvent );
    ///            var eventPoint_2_localPoint = arg.eventPoint_2_localPoint ||
    ///                                          eventPos_2_surfacePos;
    function cbDownMoveUp_I(
        domMove__downToCurrent,
        down_move_up,
        point_on_dragSurf,
        event,
        moveIncrement
    ){
        //var fw = createdFramework;
        //vital-for-mobile
        //ns.d('fram/w: case="' + down_move_up + '"');
        switch( down_move_up ){
            case 'down':
                //vital-for-mobile
                //ns.d('down: fw=' + fw.frameworkId );
                if( elected_dragWrap ) {
                    ns.d('bug ' + down_move_up + '"');
                    ////possible bug
                    ////ns.d(ww);
                    return true;
                }
                elected_dragWrap = spinnerCandidate_dragWrap ||
                    findDraggee(
                        point_on_dragSurf,
                        dragWraps,
                        dragSurface, //needed only if !pos_dom2med
                );
                if( !elected_dragWrap ) return true;
                shows_book_picture && shows_book_picture();
                //only for lemma 2, even if coded there
                processMouseDown_II && processMouseDown_II(
                    elected_dragWrap.pointWrap );
                if( ns.haz( elected_dragWrap, 'decPoint' ) ) {
                    $$.$( elected_dragWrap.decPoint ).addClass( 'grabbing' );
                }
                var appFeedback = elected_dragWrap.cbDownMoveUp_II({
                    down_move_up: down_move_up,
                    domMove__downToCurrent:
                        domMove__downToCurrent,
                    moveIncrement: 0,
                    dragWrap: elected_dragWrap,
                    point_on_dragSurf,
                });
                return appFeedback;
            break;
            case 'move':
            case 'up':
                spinnerCandidate_dragWrap = null;
                //.is throttled: does condence move and up events

                if( down_move_up !== 'move' &&
                    ns.haz( elected_dragWrap, 'decPoint' ) ) {
                    $$.$( elected_dragWrap.decPoint )
                        .removeClass( 'grabbing' );
                }
                elected_dragWrap.cbDownMoveUp_II({
                    down_move_up: down_move_up, //flag, string
                    //possibly = move from start to current,
                    domMove__downToCurrent:
                        domMove__downToCurrent,
                    moveIncrement: moveIncrement,
                    dragWrap: elected_dragWrap,
                    point_on_dragSurf,
                });
            break;
            default:
        }
    }

    //====================
    // //\\ finds draggee
    //====================
    ///Returns: point drag Wrap
    ///         which is closest to testPoint.
    ///Algo:    if distance to point_on_dragSurf is "outside"
    //          of this par.,
    ///         then dragWrap is not "considered" for drag
    function findDraggee_default(
            //point_on_dragSurf,
            //either on inner or parent drag surface,
            //depending on flag pos_dom2med,
            pOnS,
            dragWraps,
            dragSurface
    ){
        var closestDragWrap = null;
        var closestTd = null;
        //.the bigger is priority, the more "choicable"
        //.is the drag Wrap point
        var closestDragPriority = 0;
        //var testMedpos = pOnS;
        var testMedpos = pos_dom2med ?
                            pos_dom2med( pOnS ) : pOnS;
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];

        var unfoundDragger = null;
        ///------------------------------------
        /// loops and finds closest item
        ///------------------------------------
        dragWraps.forEach( function( dragWrap, dix ) {
            var pointWrap   = dragWrap.pointWrap;
            if( haz( pointWrap, 'unfound' ) ) {
                unfoundDragger = dragWrap;
                return;
            }
            if( haz( pointWrap, 'hideD8Dpoint' ) ) return;
            if( pos_dom2med ){
                var dompos = pointWrap.medpos;
            } else {
                var dompos = handle2dragsurf_pos(
                    dragWrap, dragSurface );
            }
            var tdX = Math.abs( testMediaX - dompos[0] );
            var tdY = Math.abs( testMediaY - dompos[1] );
            var td  = Math.max( tdX, tdY );

            var distLim = haz( pointWrap, 'DRAGGEE_HALF_SIZE' ) ||
                          fconf.DRAGGEE_HALF_SIZE || 40;
            //if( !pointWrap.rgn ) c cc(
            //.td is a "rect-metric" for distance between
            //.pOnS and drag-point-candidate
            if(
                td <= distLim ||
                distLim < 0 //finds the first existing dragWrap
            ) {
                let dpp = pointWrap.dragPriority;
                if( !closestDragWrap ||
                    (
                        ( dpp > closestDragPriority ) ||
                        ( dpp === closestDragPriority && closestTd > td )
                    )
                ){
                    closestDragWrap = dragWrap;
                    closestTd = td;
                    closestDragPriority = pointWrap.dragPriority || 0;
                    //vital-for-mobile
                    //ns.d('closest=' + pointWrap.rgn +
                    //     ' fw' + dragWrap.createdFramework.frameworkId );
                }
            }
        });
        ///used in full model-media area drag ...
        if( !closestDragWrap && unfoundDragger ) {
            closestDragWrap = unfoundDragger;
        }
        return closestDragWrap;
    }
    //====================
    // \\// finds draggee
    //====================
};
///============================================================
/// \\// inits common framework for the set of  point-draggees
///============================================================
}