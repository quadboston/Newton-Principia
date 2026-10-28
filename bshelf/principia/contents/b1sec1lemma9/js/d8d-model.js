( function() {
    var {
        ns,
        sn,
        bezier,
        fapp,
        fconf,
        sconf,
        sDomF,
        amode,
        ssD,
        ssF,
        rg,
        stdMod,
    } = window.b$l.atree({
        stdModList :
        {
            initDragModel,
        },
    });
    return;


    //==========================================
    // //\\ inits drag points
    //==========================================
    function initDragModel( lemmaD8D ){
        var modCurvPivots   = rg.dcurve.cpivotsMedpos;
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
        wpoint.dragDecorColor   = sDomF.rgn0arrc_2_rgba( 'given' );
        wpoint.dragPriority     = 9;
        wpoint.spinnerClsId       = 'B';
        rgx2dragwraps({
            achieved    : sconf.claimRatio,
            pointWrap   : wpoint,
            cssClasses  : ['axis-y'],
            cbDownMoveUp_III : function( arg )
            {
                var ach = arg.pointWrap.achievedtop;
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = ssD.claimRatio;
                                 sDomF.shows_book_picture();
                    break;
                    case 'move':
                        sDomF.shows_book_picture();
                        ////some of these Ey, Dy, values are perpendicular projections, not
                        ////y-coordinates
                        ////but since proportion holds, they are good here  ...
                        var Ey = bezier.parT2point( ssD.tC, modCurvPivots )[1];

                        var startDy = ach.achieved * Ey;
                        var newDy   = Math.min(
                                        Ey * claimRatio_max,
                                        startDy - arg.domMove__downToCurrent[1] * sconf.med2mod *
                                        sDomF.dom2med()
                                      );
                        newDy = Math.max( newDy, Ey*0.01 ); //todm make ranges in c onf
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
        wpoint.dragDecorColor   = ns.haz( rg.E, 'pcolor' ) || sDomF.rgn0arrc_2_rgba( 'given' );
        wpoint.spinnerClsId       = 'E';
        rgx2dragwraps({
            achieved            : rg.E.pos.concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['axis-y'],
            cbDownMoveUp_III : function( arg )
            {
                var ach = arg.pointWrap.achievedtop;
                switch( arg.down_move_up ) {
                    case 'down':
                        //Update ach.achieved to prevent 'jumping' in case point E moved (eg. point C was moved).
                        ach.achieved = rg.E.pos.concat([]);
                    break;
                    case 'up': ach.achieved = rg.E.pos.concat([]);
                               sDomF.shows_book_picture();
                    break;
                    case 'move' :
                        //Calculate point C
                        const modC = bezier.parT2point( ssD.tC, modCurvPivots );

                        //Dragger offset in y direction relative to initial dragger position (note dragger offset and diagram use different scales).
                        const yOffset = sDomF.dom2med() * sconf.med2mod * arg.domMove__downToCurrent[1] * yflip;

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
        wpoint.dragDecorColor   = sDomF.rgn0arrc_2_rgba( 'given' );

        //todo why this is not included into slider body?
        //if( !sconf.hideProofSlider ){
            rgx2dragwraps({
                achieved            : sconf.tC,
                pointWrap           : rg.C,
                cssClasses          : ['green'],
                cbDownMoveUp_III : function( arg )
                {
                    var ach = arg.pointWrap.achievedtop;
                    switch( arg.down_move_up ) {
                        case 'up':
                            ach.achieved = ssD.tC; //todo? //start here
                            sDomF.shows_book_picture();
                        break;
                        case 'move':
                             var startCx = bezier.parT2point(
                                           ach.achieved, modCurvPivots )[0];
                             var newCx = startCx + arg.domMove__downToCurrent[0] *
                                         sconf.med2mod * sDomF.dom2med();
                             newCx = Math.max( newCx, Cx_min );
                             var newTC = ssF.x0y_2_t( newCx, 0 );
                             ssD.tC = newTC; //todo correct? //start here
                             stdMod.model8media_upcreate(); //todo correct?
                        break;
                    }
                }
            });
        //} //remmm
        //.........................................
        // \\// moves inner size, Cx
        //.........................................


        //.........................................
        // //\\ moves bezier middle pivot
        //.........................................
        //A few different points could be used for the
        //following, pivotPoint1 was choosen
        //-mainCurve.mediael.pivotPoints[1]
        //  -Used previously, however is undefined when second
        //paint pivot is hidden ("media-upcreate.js" near beginning of
        //"does paint view" section)
        //-point g
        //  -Note that lemma 10 shares code with lemma 9
        //  -Would work well for lemma 9 as the bezier middle pivot and
        //   point g are supposed to be the same point
        //  -Wouldn't work well for lemma 10 as it uses a separate point
        //   (pivotPoint1) that's not supposed to be the same as point g
        //-pivotPoint1
        //  -Works for both lemma 9 and 10

        var wpoint              = rg.pivotPoint1;
        wpoint.dragDecorColor   = ns.haz( rg.pivotPoint1, 'pcolor' )
            || sDomF.rgn0arrc_2_rgba( 'proof' );
        wpoint.spinnerClsId     = 'pivotPoint1';
        rgx2dragwraps({
            achieved            : rg.dcurve.cpivotsMedpos[1].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['axis-x'],
            cbDownMoveUp_III : function( arg )
            {
                var ach = arg.pointWrap.achievedtop;
                //var pv = rg.dcurve.cpivotsMedpos.cpivots[1];
                var pv = rg.dcurve.cpivotsMedpos[1];
                switch( arg.down_move_up ) {
                    case 'down':
                        //Update ach.achieved to prevent 'jumping' in case the bezier middle pivot moved (eg. point E was moved and constrained it).
                        ach.achieved = pv.concat([]);
                    break;
                    case 'up':   ach.achieved = pv.concat([]);
                                 sDomF.shows_book_picture();
                    break;
                    case 'move':
                        //Dragger offset in x direction relative to initial dragger position (note dragger offset and diagram use different scales).
                        const wwMed = sDomF.dom2med();
                        const xOffset = wwMed * sconf.med2mod * arg.domMove__downToCurrent[0];

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
        wpoint.dragDecorColor   = ns.haz( rg.pivotPoint2, 'pcolor' ) || sDomF.rgn0arrc_2_rgba( 'given' );
        wpoint.spinnerClsId        = 'pivotPoint2';

        rgx2dragwraps({
            achieved            : rg.dcurve.cpivotsMedpos[2].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['given','rotate'],
            cbDownMoveUp_III : function( arg )
            {
                var ach = arg.pointWrap.achievedtop;
                var pv = rg.dcurve.cpivotsMedpos[2];
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = pv.concat([]);
                                 sDomF.shows_book_picture();
                    break;
                    case 'move':
                        var wwMed = sDomF.dom2med();
                        var mx = wwMed * sconf.med2mod * arg.domMove__downToCurrent[0];
                        var my = wwMed * sconf.med2mod * arg.domMove__downToCurrent[1] * yflip;

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

        function rgx2dragwraps( argc )
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
            lemmaD8D.pointWrap_2_dragWraps( argc );
        }
    };
    //==========================================
    // \\// inits drag points
    //==========================================
})();