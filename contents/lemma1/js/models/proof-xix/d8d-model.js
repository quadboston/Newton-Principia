( function() {
    var {
        sn, $$, globalCss, eachprop, d8dp,
        fconf, sconf, sDomF, rg, ssD,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            initDragModel,
        },
    });
    return;










    //==========================================
    // //\\ inits drag points
    //==========================================
    function initDragModel()
    {
        return;
        ///======================================
        /// sets framework of draggee-points
        ///======================================
        var medD8D = stdMod.medD8D =
        d8dp.crePointFW_BSLd8d1CHAMBER({
            findDraggee                         : findDraggee,
            dragSurface                         : stdMod.simScene,
            //DRAG_POINTS_THROTTLE_TIME           : fconf.DRAG_POINTS_THROTTLE_TIME,
            detected_user_interaction_effect    : sDomF.detected_user_interaction_effect,
            decPoint_parentClasses              : fconf.dragPointDecoratorClasses,
            inn2outparent                       : sDomF.inn2outparent,
        });
        //no need, done in media-model.js:  update_decPoint( decPoint )

        //==========================================
        //: sets drag points
        //==========================================
        createDragger();
        globalCss.update(); //for decorator
        return;




        function doProcessE( arg )
        {
            var ach = arg.pointWrap.achieved;
            switch( arg.down_move_up ) {
                case 'up':
                     ach.achieved = ssD.EPSILON;
                     break;
                case 'move':
                        var newEy = ach.achieved -
                                 arg.surfMove[1] * sconf.inn2mod_scale * sDomF.out2inn();
                        ssD.EPSILON = Math.max( Math.min( newEy, 0.4 ), 0.05 );
                        stdMod.model8media_upcreate();
                     break;
            }
        }



        function createDragger()
        {
            var pointWrap = rg[ 'point-E' ];
            var argc =
            {
                achieved            : ssD.EPSILON,
                pointWrap           : pointWrap,
                doProcess           : doProcessE,
                orientation         : 'axis-y',
            };
            medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE( argc );
        }
    }; 
    //==========================================
    // \\// inits drag points
    //==========================================





    //====================
    // //\\ finds draggee
    //====================
    ///Uses:    sDomF.outparent2inn( testPoint );
    ///
    ///Returns: point drag Wrap
    ///         which is closest to testPoint.
    function findDraggee( point_on_dragSurf, dragWraps ) //, dragSurface )
    {
        var pOnS = point_on_dragSurf;
        //.if distance to pOnS is "outside" of this par.,
        //.then dragWrap is not "considered" for drag
        var DRAGGEE_HALF_SIZE = fconf.DRAGGEE_HALF_SIZE;

        //:for Pif. metric
        //var DRAGGEE_HALF_SIZE2 = sconf.DRAGGEE_HALF_SIZE;
        //DRAGGEE_HALF_SIZE2 *= DRAGGEE_HALF_SIZE2;

        var closestDragWrap = null;
        var closestTd = null;
        //.the bigger is priority, the more "choicable" is the drag Wrap point
        var closestDragPriority = 0;

        var testMedpos = sDomF.outparent2inn( pOnS );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];
        //c cc( '\n\n****', pOnS, testMediaX, testMediaY,
        //      ' sDomF.out2inn='+sDomF.out2inn );

        dragWraps.forEach( function( dragWrap, dix ) {
            var dragPoint   = dragWrap.pointWrap;
            var tdX         = Math.abs( testMediaX - dragPoint.medpos[0] );
            var tdY         = Math.abs( testMediaY - dragPoint.medpos[1] );
            var td          = Math.max( tdX, tdY );
            //Pif. metric: var td2     = tdX*tdX + tdY*tdY;
            //c cc( 'test: td=' + td + ' dp=' + dragPoint.medpos[0] + ' ' + dragPoint.medpos[1] );

            //.td is a "rect-metric" for distance between
            //.pOnS and drag-point-candidate
            if( td <= DRAGGEE_HALF_SIZE ) {
                if( !closestDragWrap || closestTd > td ||
                    (dragPoint.dragPriority || 0 ) > closestDragPriority ) {
                    closestDragWrap = dragWrap;
                    closestTd = td;
                    closestDragPriority = dragPoint.dragPriority || 0;
               }
            }
        });
        return closestDragWrap;
    }
    //====================
    // \\// finds draggee
    //====================


}) ();

