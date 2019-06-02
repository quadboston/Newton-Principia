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
        ///======================================
        /// sets framework of draggee-points
        ///======================================
        var medD8D = sDomF.medD8D = d8d_p.createFramework({
            findDraggee                         : findDraggee,
            dragSurface                         : sDomN.svg.parentNode,
            DRAG_POINTS_THROTTLE_TIME           : fconf.DRAG_POINTS_THROTTLE_TIME,
            detected_user_interaction_effect    : sDomF.detected_user_interaction_effect,
            decPoint_parentClasses              : fconf.dragPointDecoratorClasses
        });
        //no need, done in media-model.js:  update_decPoint( decPoint )

        //==========================================
        //: sets drag points
        //==========================================
        sapp.readyToResize = true;
        createDragger();
        ns.globalCss.update(); //for decorator
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
                                 arg.move[1] * sconf.med2mod_scale * sDomF.css2media();
                     ssD.EPSILON = Math.max( Math.min( newEy, 0.4 ), 0.05 );
                     sapp.upcreate();
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
                update_decPoint     : update_decPoint,
                doProcess           : doProcessE
            };
            var dragWrap = medD8D.pointWrap_2_dragWrap( argc );
            
            ['axis-y'].forEach( function( cls ) {
                $$.addClass( cls, dragWrap.decPoint );
            });

            ///decorates DraggeeHoverer movement    
            function update_decPoint( decPoint )
            {
                var dompos = sDomF.medpos2dompos.call( pointWrap );
                //ccc( 'updates draggee: medpos=' + pointWrap.medpos[1] + 'dompos=' + dompos[1] );
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
    ///Uses:    sDomF.pOnDs_2_innerViewBox( testPoint );
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

        var testMedpos = sDomF.pOnDs_2_innerViewBox( pOnS );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];
        //c cc( '\n\n****', pOnS, testMediaX, testMediaY,
        //      ' sDomF.css2media='+sDomF.css2media );

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

