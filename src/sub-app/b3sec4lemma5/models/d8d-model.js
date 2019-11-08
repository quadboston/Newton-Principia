( function() {

    //apparently vital to merge this module with proper submodel
    var SUB_MODEL   = 'common'; 

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
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

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

    var stdMod;
    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
    return;
    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr








    function setModule()
    {
        stdMod = sn( SUB_MODEL, studyMods );
        stdMod.initDragModel = initDragModel;
    }


    //==========================================
    // //\\ inits drag points
    //==========================================
    function initDragModel()
    {
        ///======================================
        /// sets framework of draggee-points
        ///======================================
        var medD8D = sn( SUB_MODEL, studyMods ).medD8D =
        d8d_p.createFramework({
            findDraggee                         : findDraggee,
            dragSurface                         : sDomN.medRoot,
            DRAG_POINTS_THROTTLE_TIME           : fconf.DRAG_POINTS_THROTTLE_TIME,

            //this "destroys" main image of original manuscript at drag start
            //detected_user_interaction_effect    : sDomF.detected_user_interaction_effect,
            decPoint_parentClasses              : fconf.dragPointDecoratorClasses
        });
        //no need, done in media-model.js:  update_decPoint( decPoint )

        //==========================================
        //: sets drag points
        //==========================================
        sapp.readyToResize = true;
        createDragger_G();
        createDragger_AA();
        createDragger_H();
        createDragger_media_scale();
        createDragger_thickness();
        ns.globalCss.update(); //for decorator
        return;












        function createDragger_G()
        {
            var pointWrap = rg.G;

            //:sets additional features ... dragger handle color
            pointWrap.dragCssCls    = 'g-slider-point';
            pointWrap.dragDecorColor = pointWrap.stroke;

            var argc =
            {
                achieved            : [ rg.G.pos[0], rg.G.pos[1] ],
                pointWrap           : rg.G,
                update_decPoint     : update_decPoint,
                doProcess           : doProcess_sliderG,
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


        function doProcess_sliderG( arg )
        {
            var ach = arg.pointWrap.achieved;
            var G = rg.G;
            switch( arg.down_move_up ) {
                case 'up':
                     ach.achieved = [ G.pos[0], G.pos[1] ];
                     break;
                case 'move':
                    G.pos2value([
                        ach.achieved[0] + arg.surfMove[0] *
                        sconf.med2mod_scale * css2media(),
                        ach.achieved[1] + arg.surfMove[1] * sconf.MONITOR_Y_FLIP *
                        sconf.med2mod_scale * css2media()
                    ]);
                    break;
            }
        }

        function createDragger_AA()
        {
            var pointWrap = rg.AA;
            //:sets dragger handle color
            pointWrap.dragCssCls    = 'aa-slider-point';
            pointWrap.dragDecorColor = pointWrap.stroke;

            var argc =
            {
                achieved            : [ rg.AA.pos[0], rg.AA.pos[1] ],
                pointWrap           : rg.AA,
                update_decPoint     : update_decPoint,
                doProcess           : doProcess_sliderAA,
            };
            var dragWrap = medD8D.pointWrap_2_dragWrap( argc );

            ['rotate'].forEach( function( cls ) {
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


        function doProcess_sliderAA( arg )
        {
            var ach = arg.pointWrap.achieved;
            var AA = rg.AA;
            switch( arg.down_move_up ) {
                case 'up':
                     ach.achieved = [ AA.pos[0], AA.pos[1] ];
                     break;
                case 'move':
                    AA.pos2value([
                        ach.achieved[0] + arg.surfMove[0] *
                        sconf.med2mod_scale * css2media(),
                        ach.achieved[1] + arg.surfMove[1] * sconf.MONITOR_Y_FLIP *
                        sconf.med2mod_scale * css2media()
                    ]);
                    break;
            }
        }

        function createDragger_H()
        {
            var pointWrap = rg.H;
            //:sets dragger handle color
            pointWrap.dragCssCls    = 'h-slider-point';
            pointWrap.dragDecorColor = pointWrap.stroke;

            var argc =
            {
                achieved            : [ rg.H.pos[0], rg.H.pos[1] ],
                pointWrap           : rg.H,
                update_decPoint     : update_decPoint,
                doProcess           : doProcess_sliderH,
            };
            var dragWrap = medD8D.pointWrap_2_dragWrap( argc );

            ['x-axis'].forEach( function( cls ) {
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


        function doProcess_sliderH( arg )
        {
            var ach = arg.pointWrap.achieved;
            var H = rg.H;
            switch( arg.down_move_up ) {
                case 'up':
                     ach.achieved = [ H.pos[0], H.pos[1] ];
                     break;
                case 'move':
                    sDomF.detected_user_interaction_effect();
                    H.pos2value([
                        ach.achieved[0] + arg.surfMove[0] *
                        sconf.med2mod_scale * css2media(),
                        ach.achieved[1] + arg.surfMove[1] * sconf.MONITOR_Y_FLIP *
                        sconf.med2mod_scale * css2media()
                    ]);
                    break;
            }
        }

        //============================================
        // //\\ slider media_scale
        //============================================
        function createDragger_media_scale()
        {
            var pointWrap = rg.media_scale;
            //:sets dragger handle color
            pointWrap.dragCssCls    = 'tp-ellipse';
            //todm ... not straight
            pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
            var argc =
            {
                achieved            : [ rg.media_scale.pos[0], rg.media_scale.pos[1] ],
                pointWrap           : rg.media_scale,
                update_decPoint     : update_decPoint,
                doProcess           : doProcess_slider_media_scale,
            };
            var dragWrap = medD8D.pointWrap_2_dragWrap( argc );

            ['axis-x'].forEach( function( cls ) {
                $$.addClass( cls, dragWrap.decPoint );
            });

            ///decorates DraggeeHoverer movement    
            function update_decPoint( decPoint )
            {
                var dompos = sDomF.medpos2dompos.call( pointWrap );
                decPoint.style.left = dompos[0] + 'px';            
                decPoint.style.top = dompos[1] + 'px';            
            }
        }

        function doProcess_slider_media_scale( arg )
        {
            var ach = arg.pointWrap.achieved;
            var media_scale = rg.media_scale;
            switch( arg.down_move_up ) {
                case 'up':
                     ach.achieved = [ media_scale.pos[0], media_scale.pos[1] ];
                     break;
                case 'move':
                    sDomF.detected_user_interaction_effect();
                    var new_media_scale = [
                            ach.achieved[0] + arg.surfMove[0] *
                            //sconf.med2mod_scale * css2media(),
                            (1/sconf.originalMod2med_scale) * css2media(),
                            ach.achieved[1]
                        ];
                        media_scale.pos2value( new_media_scale );
                    break;
            }
        }
        //============================================
        // \\// slider media_scale
        //============================================

        //============================================
        // //\\ slider thickness
        //============================================
        function createDragger_thickness()
        {
            var pointWrap = rg.thickness;
            //:sets dragger handle color
            pointWrap.dragCssCls    = 'tp-ellipse';
            //todm ... not straight
            pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
            var argc =
            {
                achieved            : [ rg.thickness.pos[0], rg.thickness.pos[1] ],
                pointWrap           : rg.thickness,
                update_decPoint     : update_decPoint,
                doProcess           : doProcess_slider_thickness,
            };
            var dragWrap = medD8D.pointWrap_2_dragWrap( argc );

            ['axis-x'].forEach( function( cls ) {
                $$.addClass( cls, dragWrap.decPoint );
            });

            ///decorates DraggeeHoverer movement    
            function update_decPoint( decPoint )
            {
                var dompos = sDomF.medpos2dompos.call( pointWrap );
                decPoint.style.left = dompos[0] + 'px';            
                decPoint.style.top = dompos[1] + 'px';            
            }
        }

        function doProcess_slider_thickness( arg )
        {
            var ach = arg.pointWrap.achieved;
            var thickness = rg.thickness;
            switch( arg.down_move_up ) {
                case 'up':
                     ach.achieved = [ thickness.pos[0], thickness.pos[1] ];
                     break;
                case 'move':
                    sDomF.detected_user_interaction_effect();
                    var new_thickness = [
                            ach.achieved[0] + arg.surfMove[0] *
                            //sconf.med2mod_scale * css2media(),
                            (1/sconf.originalMod2med_scale) * css2media(),
                            ach.achieved[1]
                        ];
                        thickness.pos2value( new_thickness );
                    break;
            }
        }
        //============================================
        // \\// slider thickness
        //============================================


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

    function css2media()
    {
       return sconf.innerMediaWidth / stdMod.mmedia.getBoundingClientRect().width;
       //return sconf.innerMediaWidth /
       //       studyMods[ amode['submodel'] ].mmedia.getBoundingClientRect().width;
    };


}) ();

