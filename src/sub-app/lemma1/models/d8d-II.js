( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var bezier      = sn('bezier');

    var fapp        = ns.sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var d8d_p       = sn('d8d-point',fmethods);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'dragModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
    return;
    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr








    function setModule()
    {
        ssF.initDragModel = initDragModel;
    }


    //==========================================
    // //\\ inits drag points
    //==========================================
    function initDragModel()
    {
        var modCurvPivots   = ssD.curvePivots;
        var yflip           = sconf.MONITOR_Y_FLIP;


        //======================================
        // //\\ sets framework of draggee-points
        //======================================
        var medD8D = sDomF.medD8D = d8d_p.createFramework( 
            findDraggee,
            sDomN.svg.parentNode,
            //:optional
            sconf.DRAG_POINTS_THROTTLE_TIME, //todo undefined
            sDomF.detected_user_interaction_effect,
            fconf.dragPointDecoratorClasses
            //for devel: function(){}
        );
        //======================================
        // \\// sets framework of draggee-points
        //======================================



        //==========================================
        // //\\ sets drag points
        //==========================================
        sapp.readyToPopulateMenu = true;

        //.........................................
        // //\\ moves inner ratio
        //.........................................
        var claimRatio_max = sconf.claimRatio_max;
        rg[ 'point_B' ].dragPriority = 9;
        createDragger({
            achieved            : sconf.claimRatio,
            pointWrap           : rg[ 'point_B' ],
            cssClasses          : ['green','axis-y'],
            doProcess           : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = ssD.claimRatio;
                    break;
                    case 'move':
                                ////some of these Ey, Dy, values are perpendicular projections, not
                                ////y-coordinates
                                ////but since proportion holds, they are good here  ... 
                                var Ey = bezier.parT2point( ssD.tC, modCurvPivots )[1];

                                var startDy = ach.achieved * Ey;
                                var newDy   = Math.min( Ey * claimRatio_max,
                                              startDy - arg.move[1] * sconf.med2mod_scale * sDomF.css2media() );
                                newDy = Math.max( newDy, Ey*0.01 ); //todm make ranges in conf
                                ssD.claimRatio = newDy/Ey;
                                //c cc( 'new: claimRatio=' + ssD.claimRatio + ' Dy=' +
                                //      ( ssD.claimRatio * Ey ) );
                                sapp.upcreate();
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
        createDragger({
            achieved            : sconf.tiltRatio,
            pointWrap           : rg[ 'point_E' ],
            cssClasses          : ['green','axis-y'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = ssD.tiltRatio;
                    break;
                    case 'move':
                                 var Epy = bezier.parT2point( ssD.tC, modCurvPivots )[1];
                                 var startEy = ach.achieved * Epy;
                                 var newEy   = Math.min( 
                                                sconf.Ep2yrange_max * sconf.APP_MODEL_Y_RANGE,
                                                sconf.tiltRatio_max * Epy,
                                               startEy - arg.move[1] * sconf.med2mod_scale * sDomF.css2media() );
                                 newEy = Math.max( newEy, Epy * sconf.tiltRatio_min );
                                 ssD.tiltRatio = newEy/Epy;
                                 sapp.upcreate();
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
        var Cx_min          = sconf.Cx_min;
        //.was: var REPEL_D_FROM_E = 0.999;
        rg[ 'point_C' ].dragPriority = 10;
        createDragger({
            achieved            : sconf.tC,
            pointWrap           : rg[ 'point_C' ],
            cssClasses          : ['green'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up':   //.this is done through proofSlider: ach.achieved = ssD.tC;
                                 //.does update through proofSlider synch
                                 sDomF.proofSlider.slider.d8d_emulateAbsFractionX( ssD.tC, 'up' );
                    break;
                    case 'move': 
                                 var startCx = bezier.parT2point(
                                               ach.achieved, modCurvPivots )[0];
                                 var newCx = startCx + arg.move[0] * sconf.med2mod_scale * sDomF.css2media();
                                 newCx = Math.max( newCx, Cx_min );
                                 //c cc( 'start Ex=' + startCx + ' start tC=' + ach.achieved +
                                 //     ' arg.move[0]=' + arg.move[0] );

                                 var newTC = ssF.x0y_2_t( newCx, 0 );

                                 //:this is done through proofSlider
                                 //ssD.tC = newTC;
                                 //ssF.upcreate();

                                 //.does update through proofSlider synch
                                 sDomF.proofSlider.slider.d8d_emulateAbsFractionX( newTC, 'move' );
                    break;
                }
            }
        });
        //.........................................
        // \\// moves inner size, Cx
        //.........................................


        //.........................................
        // //\\ moves bezier middle pivot
        //.........................................
        var mainCurve           = rg['mainCurve'];
        var wpoint              = mainCurve.mediael.pivotPoints[1];
        wpoint.name             = 'pivotPoint1';
        //****************************************************************
        //todo: wpoint, pointWrap, rg['point_E'] - like must always be in 
        //      the same place, in rg
        //****************************************************************
        wpoint.tfamily          = 'primary-curve'; //todm: do this at media-model.js level
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
                                 //c cc( 'up ach=' + pv[0] + ', ' + pv[1] );
                    break;
                    case 'move': 
                                var css2media = sDomF.css2media();
                                var mx = css2media * sconf.med2mod_scale * arg.move[0];
                                var my = css2media * sconf.med2mod_scale * arg.move[1] * yflip;
                                var newMy = ach.achieved[1] + my;
                                var newMx = ach.achieved[0] + mx;
                                newMy = Math.min( newMy, sconf.pivot1y_max );
                                newMx = Math.max( newMx, sconf.tanA_min * newMy )
                                pv[0] = newMx;
                                pv[1] = newMy;
                                //c cc( 'res x,y= ' + pv[0] + ', ' + pv[1] );
                                sapp.upcreate();
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
        wpoint.name             = 'pivotPoint2';
        wpoint.tfamily          = 'primary-curve';
        createDragger({
            achieved            : sconf.curvePivots[2].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['red','rotate'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                var pv = ssD.curvePivots[2];
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = pv.concat([]);
                    break;
                    case 'move': 
                                var css2media = sDomF.css2media();
                                var mx = css2media * sconf.med2mod_scale * arg.move[0];
                                var my = css2media * sconf.med2mod_scale * arg.move[1] * yflip;

                                var newX = ach.achieved[0] + mx;
                                var newY = ach.achieved[1] + my;
                                var newX = Math.min( newX, sconf.pivot2x_max );
                                var newY = Math.max( newY, sconf.pivot2y_min );
                                var newY = Math.min( newY, sconf.pivot2y_max );

                                pv[0] = newX;
                                pv[1] = newY;

                                sapp.upcreate();
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
            var pointWrap               = argc.pointWrap;
            var pointKey                = pointWrap.name;
            argc.update_decPoint        = update_decPoint;

            if( !pointWrap.finalColor && pointWrap.tfamily ) {
                pointWrap.finalColor = 'rgb(' + sconf.tfamilyColor[ pointWrap.tfamily ] + ')';
            }

            var dragWrap = medD8D.createDragUpdate( argc );
            if( argc.cssClasses ) {
                argc.cssClasses.forEach( function( cls ) {
                    //no need: if( !dragWrap.decPoint ) return;
                    $$.addClass( cls, dragWrap.decPoint );
                });
            }

            ///decorates DraggeeHoverer movement    
            function update_decPoint( decPoint )
            {
                var dompos = sDomF.medpos2dompos.call( pointWrap );
                decPoint.style.left = dompos[0] + 'px';            
                decPoint.style.top = dompos[1] + 'px';            
            }
        }
    }; 
    //==========================================
    // \\// inits drag points
    //==========================================





    //====================
    // //\\ finds draggee
    //====================
    ///Uses:    sDomF.dompos2medpos( testPoint );
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

        var testMedpos = sDomF.dompos2medpos( testPoint );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];
        //c cc( '\n\n****', testPoint, testMediaX, testMediaY, ' sDomF.css2media='+sDomF.css2media );

        dragWraps.forEach( function( dragWrap, dix ) {
            var dragPoint   = dragWrap.pointWrap;
            var tdX         = Math.abs( testMediaX - dragPoint.medpos[0] );
            var tdY         = Math.abs( testMediaY - dragPoint.medpos[1] );
            var td          = Math.max( tdX, tdY );
            //Pif. metric: var td2     = tdX*tdX + tdY*tdY;
            //c cc( 'test: td=' + td + ' dp=' + dragPoint.medpos[0] + ' ' + dragPoint.medpos[1] );

            //.td is a "rect-metric" for distance between testPoint and drag-point-candidate
            if( td <= DRAGGEE_HALF_SIZE ) {
                //c cc( 'test:' + dragPoint.name + ' ' + td, dragPoint.medpos); 
                if( !closestDragWrap || closestTd > td ||
                    (dragPoint.dragPriority || 0 ) > closestDragPriority ) {
                    closestDragWrap = dragWrap;
                    closestTd = td;
                    closestDragPriority = dragPoint.dragPriority || 0;
                    //c cc( dragPoint.name + ' ' + td );
               }
            }
        });
        return closestDragWrap;
    }
    //====================
    // \\// finds draggee
    //====================


}) ();

