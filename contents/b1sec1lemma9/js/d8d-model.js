( function() {
    var {
        ns, 
        sn,
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
        var yRange          = sconf.APP_MODEL_Y_RANGE;
        var mat             = sn( 'mat' );


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
        //Store the position for point E rather than tiltAngle.  In lemma 9 the bezier middle pivot point is constrained to point g, meaning that point C
        //moves when the tiltAngle changes.  The following needs the initial E y position.  This could be computed using the initial tiltAngle and initial 
        //point C y.  However if achieved stored the initial the tiltAngle, it would not have access to the initial point C y.
        var wpoint              = rg.E;
        wpoint.dragDecorColor   = ns.haz( rg.E, 'pcolor' ) || sDomF.getFixedColor( 'given' );
        wpoint.spinnerClsId       = 'E';
        createDragger({
            achieved            : rg.E.pos.concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['axis-y'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'down':
                        //Update ach.achieved to prevent 'jumping' in case point E moved (eg. point C was moved).
                        ach.achieved = rg.E.pos.concat([]);
                    break;
                    case 'up': ach.achieved = rg.E.pos.concat([]);
                               sDomF.detected_user_interaction_effect();
                    break;
                    case 'move' :
                        //Calculate point C
                        const modC = bezier.parT2point( ssD.tC, modCurvPivots );

                        //Dragger offset in y direction relative to initial dragger position (note dragger offset and diagram use different scales).
                        const yOffset = sDomF.out2inn() * sconf.inn2mod_scale * arg.surfMove[1] * yflip;

                        //Calculate and constrain the new tiltAngle (angle of line EC from perspective of E)
                        const newEy = ach.achieved[1] + yOffset;
                        const newTiltAngle = -mat.radToDeg(Math.atan2(newEy - modC[1], modC[0]));
                        rg.tiltAngle.value = Math.min(Math.max(newTiltAngle, sconf.tiltAngle_min), sconf.tiltAngle_max);
                        
                        //Note the bezier middle pivot is constrained in "model-upcreate.js" beginning of "model_upcreate" function.

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
        //A few different points could be used for the following, pivotPoint1 was choosen
        //-mainCurve.mediael.pivotPoints[1]
        //  -Used previously, however is undefined when second paint pivot is hidden ("media-upcreate.js" near beginning of "does paint view" section)
        //-point g
        //  -Note that lemma 10 shares code with lemma 9
        //  -Would work well for lemma 9 as the bezier middle pivot and point g are supposed to be the same point
        //  -Wouldn't work well for lemma 10 as it uses a separate point (pivotPoint1) that's not supposed to be the same as point g
        //-pivotPoint1
        //  -Works for both lemma 9 and 10

        var wpoint              = rg.pivotPoint1;
        wpoint.dragDecorColor   = ns.haz( rg.pivotPoint1, 'pcolor' ) || sDomF.getFixedColor( 'proof' );
        wpoint.spinnerClsId     = 'pivotPoint1';
        createDragger({
            achieved            : ssD.curvePivots[1].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['axis-x'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                var pv = ssD.curvePivots[1];
                switch( arg.down_move_up ) {
                    case 'down':
                        //Update ach.achieved to prevent 'jumping' in case the bezier middle pivot moved (eg. point E was moved and constrained it).
                        ach.achieved = pv.concat([]);
                    break;
                    case 'up':   ach.achieved = pv.concat([]);
                                 sDomF.detected_user_interaction_effect();
                    break;
                    case 'move': 
                        //Dragger offset in x direction relative to initial dragger position (note dragger offset and diagram use different scales).
                        const wwMed = sDomF.out2inn();
                        const xOffset = wwMed * sconf.inn2mod_scale * arg.surfMove[0];

                        //Calculate the new bezier middle pivot, ensure it's on line ec.
                        //Would be (newX, yRange) if line ec was horizontal.  Then tiltAngle adds or subtracts in the y direction.
                        const newX = ach.achieved[0] + xOffset;  //New x pos for point being dragged.
                        modCurvPivots[1][0] = newX;
                        modCurvPivots[1][1] = yRange + Math.tan(mat.degToRad(rg.tiltAngle.value)) * modCurvPivots[1][0];
                        
                        //Note the bezier middle pivot is further constrained in "model-upcreate.js" beginning of "model_upcreate" function.

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
        var mainCurve           = rg['mainCurve'];
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

