( function() {
    var {
        sn, globalCss, has, d8dp,
        fconf, sconf, ssD, sDomF, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        SUB_MODEL : 'limit-definition',
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
        createDraggerDelta();
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
                                arg.surfMove[1] * sconf.inn2mod_scale *
                                sDomF.out2inn();
                        ssD.EPSILON = Math.max( Math.min( newEy, 0.4 ), 0.05 );
                        stdMod.model8media_upcreate();
                     break;
            }
        }

        function doProcessD( arg )
        {
            var ach = arg.pointWrap.achieved;
            switch( arg.down_move_up ) {
                case 'up':
                     ach.achieved = ssD.delta_fraction;
                     break;
                case 'move':
                        var norm = rg['neighbHor']['neighbHor'][1][0];
                        var newDx = ach.achieved +

                                    //todm: hard bug: remove this patch-coeff
                                    //apparently all is programmed right, but
                                    //result is wrong and needs a patch-coeff 1.25
                                    //to drag the handle correctly ...

                                    //this is a surprising that such bugs still do not ruin
                                    //the application ... amazing fact that increased
                                    //complexity of programming defuses the bugs long range
                                    //effect
                                    1.25 *

                                    arg.surfMove[0] * sconf.inn2mod_scale *
                                    sDomF.out2inn()
                                    / norm
                                    ;
                        ssD.delta_fraction = Math.max( Math.min( newDx, 1 ), 0.0001 );
                        if( has( amode, 'submodel' ) && amode['submodel'] ) {
                            //.this is a duty of contributor to provide:
                            //.if( studyMods[ ww ] ) {
                            stdMod.model8media_upcreate();
                        }
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
        function createDraggerDelta()
        {
            var pointWrap = rg[ 'point-D' ];
            var argc =
            {
                achieved            : ssD.delta_fraction,
                pointWrap           : pointWrap,
                doProcess           : doProcessD,
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

        dragWraps.forEach( function( dragWrap, dix ) {
            var dragPoint   = dragWrap.pointWrap;
            var tdX         = Math.abs( testMediaX - dragPoint.medpos[0] );
            var tdY         = Math.abs( testMediaY - dragPoint.medpos[1] );
            var td          = Math.max( tdX, tdY );
            //Pif. metric: var td2     = tdX*tdX + tdY*tdY;
            //c cc( 'test: td=' + td + ' dp=' + dragPoint.medpos[0] +
            //' ' + dragPoint.medpos[1] );

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

