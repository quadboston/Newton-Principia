( function() {
    var {
        SUB_MODEL, stdMod, rg,
    } = window.b$l.apptree({
    });

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

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'dragModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;











    function setModule()
    {
        stdMod = sn( SUB_MODEL, studyMods );
        stdMod.populates__cust_draggers_list = populates__cust_draggers_list;
    }


    //==========================================
    // //\\ inits drag model
    //==========================================
    function populates__cust_draggers_list()
    {
        ns.sn( 'customDraggers_list', stdMod, [] );
        stdMod.customDraggers_list.push( createDraggers_p );

        //todm ... do automate
        stdMod.railsCustomSlidersCount = ns.h( stdMod, 'railsCustomSlidersCount' ) ?
            stdMod.railsCustomSlidersCount + 1 : 1; 
    };
    //==========================================
    // \\// inits drag model
    //==========================================



    //===========================================
    // //\\ create draggers p
    //===========================================
    function createDraggers_p( medD8D )
    {
        createDragger_T( rg.T, medD8D );
        createDragger_a( rg.a, medD8D );
    }


    function createDragger_T( pointWrap, medD8D )
    {
        //:sets dragger handle color
        pointWrap.spinnerClsId    = 't-slider-point';

        //todo ... not proof
        pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );

        var argc =
        {
            achieved            : [ rg.T.pos[0], rg.T.pos[1] ],
            pointWrap           : rg.T,
            doProcess           : doProcess_sliderT,
        };
        medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE( argc );
        return;

        function doProcess_sliderT( arg )
        {
            var ach = arg.pointWrap.achieved;
            var T = rg.T;
            switch( arg.down_move_up ) {
                case 'down':
                     ach.achieved = [ T.pos[0], T.pos[1] ];
                     break;
                case 'move':
                    T.pos2value([
                        ach.achieved[0] + arg.surfMove[0] *
                        sconf.inn2mod_scale * sDomF.out2inn(),
                        ach.achieved[1]
                    ]);
                    break;
            }
        }
    }

    //============================================
    // //\\ slider a
    //============================================
    function createDragger_a( pointWrap, medD8D )
    {
        //:sets dragger handle color
        pointWrap.spinnerClsId    = 'tp-ellipse';
        //todm ... not straight
        pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
        var argc =
        {
            achieved            : [ rg.a.pos[0], rg.a.pos[1] ],
            pointWrap           : rg.a,
            doProcess           : doProcess_slider_a,
        };
        medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE( argc );
        return;

        function doProcess_slider_a( arg )
        {
            var ach = arg.pointWrap.achieved;
            var a = rg.a;
            switch( arg.down_move_up ) {
                case 'down':
                     ach.achieved = [ a.pos[0], a.pos[1] ];
                     break;
                case 'move':
                    sDomF.detected_user_interaction_effect();
                    var new_a = [
                            ach.achieved[0] + arg.surfMove[0] *
                            //sconf.inn2mod_scale * sDomF.out2inn(),

                            (1/stdMod.sconf.originalMod2inn_scale) *
                            sDomF.out2inn(),

                            ach.achieved[1]
                        ];
                        a.pos2value( new_a );
                    break;
            }
        }
    }
    //============================================
    // \\// slider a
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

