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
        var lemmaD8D = stdMod.lemmaD8D =
        d8dp.lemmaFW({
            findDraggee                         : findDraggee,
            //findDraggee, if we skip findDraggee,
            //we can add sDomF.dspos2medpos
            //dspos2medpos: sDomF.dspos2medpos,

            dragSurface                         : stdMod.medParent,
            //DRAG_POINTS_THROTTLE_TIME           : fconf.DRAG_POINTS_THROTTLE_TIME,
            detected_user_interaction_effect:
                sDomF.detected_user_interaction_effect,
            decPoint_parentClasses              : fconf.dragPointDecoratorClasses,
            medpos2dspos                       : sDomF.medpos2dspos,
            DRAGGEE_HALF_SIZE: fconf.DRAGGEE_HALF_SIZE,
        });
        //no need, done in media-model.js:  update_decPoint( decPoint )

        //==========================================
        //: sets drag points
        //==========================================
        rgx2dragwraps();
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
                                 arg.surfMove[1] * sconf.med2mod * sDomF.ds2med();
                        ssD.EPSILON = Math.max( Math.min( newEy, 0.4 ), 0.05 );
                        stdMod.model8media_upcreate();
                     break;
            }
        }



        function rgx2dragwraps()
        {
            var pointWrap = rg[ 'point-E' ];
            var argc =
            {
                achieved            : ssD.EPSILON,
                pointWrap           : pointWrap,
                finish_DownMoveUp           : doProcessE,
                orientation         : 'axis-y',
            };
            lemmaD8D.pointWrap_2_dragWraps( argc );
        }
    };
    //==========================================
    // \\// inits drag points
    //==========================================





    //====================
    // //\\ finds draggee
    //====================
    ///Uses:    sDomF.dspos2medpos( testPoint );
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

        var testMedpos = sDomF.dspos2medpos( pOnS );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];
        //c cc( '\n\n****', pOnS, testMediaX, testMediaY,
        //      ' sDomF.ds2med='+sDomF.ds2med );

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

