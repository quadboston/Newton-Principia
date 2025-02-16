( function() {
    var {
        ns,
        bezier,
        fapp,
        fconf,
        sconf,
        sDomF,
        sDomN,
        amode,
        ssD,
        ssF,
        rg,
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
    function initDragModel( medD8D )
    {
        var modCurvPivots   = ssD.curvePivots;
        var yflip           = sconf.MONITOR_Y_FLIP;


        //==========================================
        // //\\ sets drag points
        //==========================================
        //.........................................
        // //\\ moves inner ratio
        //.........................................
        var claimRatio_max = sconf.claimRatio_max;
        var wpoint              = rg.B;
        wpoint.dragDecorColor   = sDomF.getFixedColor( 'given' );
        wpoint.dragPriority     = 9;
        wpoint.spinnerClsId       = 'B';
        createDragger({
            achieved    : sconf.claimRatio,
            pointWrap   : wpoint,
            cssClasses  : ['axis-y'],
            doProcess   : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = ssD.claimRatio;
                                 sDomF.detected_user_interaction_effect();
                    break;
                    case 'move':
                        sDomF.detected_user_interaction_effect();
                        ////some of these Ey, Dy, values are perpendicular projections, not
                        ////y-coordinates
                        ////but since proportion holds, they are good here  ... 
                        var Ey = bezier.parT2point( ssD.tC, modCurvPivots )[1];

                        var startDy = ach.achieved * Ey;
                        var newDy   = Math.min(
                                        Ey * claimRatio_max,
                                        startDy - arg.surfMove[1] * sconf.inn2mod_scale *
                                        sDomF.out2inn()
                                      );
                        newDy = Math.max( newDy, Ey*0.01 ); //todm make ranges in conf
                        ssD.claimRatio = newDy/Ey;
                        //c cc( 'new: claimRatio=' + ssD.claimRatio + ' Dy=' +
                        //      ( ssD.claimRatio * Ey ) );
                        stdMod.model8media_upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves inner ratio
        //.........................................




        //.........................................
        // //\\ moves E
        //.........................................
        var wpoint              = rg.E;
        wpoint.dragDecorColor   = sDomF.getFixedColor( 'given' );
        wpoint.spinnerClsId       = 'E';
        createDragger({
            achieved            : rg.tiltRatio.value,
            pointWrap           : wpoint,
            cssClasses          : ['axis-y'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up': ach.achieved = rg.tiltRatio.value;
                               sDomF.detected_user_interaction_effect();
                    break;
                    case 'move' :
                         var Epy = bezier.parT2point( ssD.tC, modCurvPivots )[1];
                         var startEy = ach.achieved * Epy;
                         var newEy   = Math.min( 
                                            sconf.Ep2yrange_max * sconf.APP_MODEL_Y_RANGE,
                                            sconf.tiltRatio_max * Epy,
                                            startEy - arg.surfMove[1] *
                                                      sconf.inn2mod_scale *
                                                      sDomF.out2inn()
                                       );
                         newEy = Math.max( newEy, Epy * sconf.tiltRatio_min );
                         rg.tiltRatio.value = newEy/Epy;
                         stdMod.model8media_upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves E
        //.........................................




        //.........................................
        // //\\ moves inner size, Cx
        //.........................................
        var Cx_min              = sconf.Cx_min;
        var wpoint              = rg.C;
        wpoint.dragPriority     = 10;
        wpoint.spinnerClsId       = 'C';
        wpoint.dragDecorColor   = sDomF.getFixedColor( 'given' );

        if( !sconf.hideProofSliderCompletely ){
            createDragger({
                achieved            : sconf.tC,
                pointWrap           : rg.C,
                cssClasses          : ['green'],
                doProcess : function( arg )
                {
                    var ach = arg.pointWrap.achieved;
                    switch( arg.down_move_up ) {
                        case 'up':   //.this is done through proofSlider: ach.achieved = ssD.tC;
                                     //.does update through proofSlider synch
                                     sDomF.proofSlider.slider.d8d_emulateAbsFractionX( ssD.tC, 'up' );
                                     sDomF.detected_user_interaction_effect();
                        break;
                        case 'move': 
                             var startCx = bezier.parT2point(
                                           ach.achieved, modCurvPivots )[0];
                             var newCx = startCx + arg.surfMove[0] *
                                         sconf.inn2mod_scale * sDomF.out2inn();
                             newCx = Math.max( newCx, Cx_min );
                             //c cc( 'start Ex=' + startCx + ' start tC=' + ach.achieved +
                             //     ' arg.move[0]=' + arg.move[0] );

                             var newTC = ssF.x0y_2_t( newCx, 0 );

                             //.does update through proofSlider synch
                             sDomF.proofSlider.slider.d8d_emulateAbsFractionX( newTC, 'move' );
                        break;
                    }
                }
            });
        }
        //.........................................
        // \\// moves inner size, Cx
        //.........................................


        //.........................................
        // //\\ moves bezier middle pivot
        //.........................................
        var mainCurve           = rg['mainCurve'];
        var wpoint              = mainCurve.mediael.pivotPoints[1];
        wpoint.dragDecorColor   = ns.haz( rg.pivotPoint1, 'pcolor' ) || sDomF.getFixedColor( 'result' );
        wpoint.spinnerClsId       = 'pivotPoint1';

        //****************************************************************
        //todo: wpoint, pointWrap, rg.E - like must always be in 
        //      the same place, in rg
        //****************************************************************
        createDragger({
            achieved            : sconf.curvePivots[1].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['red','rotate'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                var pv = ssD.curvePivots[1];
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = pv.concat([]);
                                 sDomF.detected_user_interaction_effect();
                    break;
                    case 'move': 
                        var wwMed = sDomF.out2inn();
                        var mx = wwMed * sconf.inn2mod_scale * arg.surfMove[0];
                        var my = wwMed * sconf.inn2mod_scale * arg.surfMove[1] * yflip;
                        var newMy = ach.achieved[1] + my;
                        var newMx = ach.achieved[0] + mx;
                        newMy = Math.min( newMy, sconf.pivot1y_max );
                        newMx = Math.max( newMx, sconf.tanA_min * newMy )
                        pv[0] = newMx;
                        pv[1] = newMy;
                        stdMod.model8media_upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves bezier middle pivot
        //.........................................


        //.........................................
        // //\\ moves bezier end pivot
        //.........................................
        var wpoint              = mainCurve.mediael.pivotPoints[2];
        wpoint.dragDecorColor   = ns.haz( rg.pivotPoint2, 'pcolor' ) || sDomF.getFixedColor( 'given' );
        wpoint.spinnerClsId        = 'pivotPoint2';

        createDragger({
            achieved            : sconf.curvePivots[2].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['given','rotate'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                var pv = ssD.curvePivots[2];
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = pv.concat([]);
                                 sDomF.detected_user_interaction_effect();
                    break;
                    case 'move': 
                        var wwMed = sDomF.out2inn();
                        var mx = wwMed * sconf.inn2mod_scale * arg.surfMove[0];
                        var my = wwMed * sconf.inn2mod_scale * arg.surfMove[1] * yflip;

                        var newX = ach.achieved[0] + mx;
                        var newY = ach.achieved[1] + my;
                        var newX = Math.min( newX, sconf.pivot2x_max );
                        var newY = Math.max( newY, sconf.pivot2y_min );
                        var newY = Math.min( newY, sconf.pivot2y_max );

                        pv[0] = newX;
                        pv[1] = newY;
                        stdMod.model8media_upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves bezier end pivot
        //.........................................
        ns.globalCss.update(); //for decorator
        return;



        function createDragger( argc )
        {
            var pointWrap        = argc.pointWrap;
            pointWrap.dragDecorColor = pointWrap.dragDecorColor || 'red';

            if( argc.cssClasses ) {
                var orientation = '';
                argc.cssClasses.forEach( function( cls ) {
                    orientation += orientation ? ' ' + cls : cls;
                });
                argc.orientation = orientation;
            }
            medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE( argc );
        }
    }; 
    //==========================================
    // \\// inits drag points
    //==========================================




    /*
    //====================
    // //\\ finds draggee
    //====================
    ///Uses:    sDomF.outparent2inn( testPoint );
    ///
    ///Returns: point drag Wrap
    ///         which is closest to testPoint.
    function findDraggee( testPoint, dragWraps )
    {
        //.if distance to testPoint is "outside" of this par.,
        //.then dragWrap is not "considered" for drag
        var DRAGGEE_HALF_SIZE = fconf.DRAGGEE_HALF_SIZE;

        //:for Pif. metric
        //var DRAGGEE_HALF_SIZE2 = sconf.DRAGGEE_HALF_SIZE;
        //DRAGGEE_HALF_SIZE2 *= DRAGGEE_HALF_SIZE2;

        var closestDragWrap = null;
        var closestTd = null;
        //.the bigger is priority, the more "choicable" is the drag Wrap point
        var closestDragPriority = 0;

        var testMedpos = sDomF.outparent2inn( testPoint );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];
        //c cc( '\n\n****', testPoint, testMediaX, testMediaY,
        //' wwMed='+wwMed );

        dragWraps.forEach( function( dragWrap, dix ) {
            var dragPoint   = dragWrap.pointWrap;
            var tdX         = Math.abs( testMediaX - dragPoint.medpos[0] );
            var tdY         = Math.abs( testMediaY - dragPoint.medpos[1] );
            var td          = Math.max( tdX, tdY );
            //Pif. metric: var td2     = tdX*tdX + tdY*tdY;
            //c cc( 'test: td=' + td + ' dp=' + dragPoint.medpos[0] + ' ' + dragPoint.medpos[1] );

            //.td is a "rect-metric" for distance between testPoint and drag-point-candidate
            if( td <= DRAGGEE_HALF_SIZE ) {
                //c cc( 'test:' + dragPoint.spinnerClsId + ' ' + td, dragPoint.medpos); 
                if( !closestDragWrap || closestTd > td ||
                    (dragPoint.dragPriority || 0 ) > closestDragPriority ) {
                    closestDragWrap = dragWrap;
                    closestTd = td;
                    closestDragPriority = dragPoint.dragPriority || 0;
                    //c cc( dragPoint.spinnerClsId + ' ' + td );
               }
            }
        });
        return closestDragWrap;
    }
    */
    //====================
    // \\// finds draggee
    //====================

}) ();

