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
    return;









    function setModule()
    {
        stdMod = sn( SUB_MODEL, studyMods );
        stdMod.initDragModel = initDragModel;
    }


    //==========================================
    // //\\ inits drag model
    //==========================================
    function initDragModel()
    {
        ///======================================
        /// sets framework
        ///======================================
        var medD8D = sn( SUB_MODEL, studyMods ).medD8D =
        d8d_p.createFramework({
            findDraggee                         : findDraggee,
            dragSurface                         : sDomN.medRoot,
            decPoint_parentClasses              : fconf.dragPointDecoratorClasses
        });
        //no need, done in media-model.js:  update_decPoint( decPoint )
        //==========================================
        //: sets drag points
        //==========================================
        sapp.readyToResize = true;
        createDraggers_p( medD8D );
        createDragger_m( medD8D );
        stdMod.initCommonDragModel( medD8D, css2media )
        ns.globalCss.update(); //for decorator
    }; 
    //==========================================
    // \\// inits drag model
    //==========================================





    //===========================================
    // //\\ create draggers p
    //===========================================
    function createDraggers_p( medD8D )
    {
        sconf.basePairs.forEach( bpair => {
            createDragger_p( bpair[0].pointWrap, medD8D );
        });
    }

    function createDragger_p( pointWrap, medD8D )
    {
        //:sets dragger handle color
        //.making this class unique may help to set correct color ... todm
        pointWrap.spinnerClsId    = 'dragged-point-'+pointWrap.originalPoint.pname;
        pointWrap.dragDecorColor = pointWrap.pcolor;
        var argc =
        {
            achieved            : [ pointWrap.pos[0], pointWrap.pos[1] ],
            pointWrap           : pointWrap,
            update_decPoint     : update_decPoint,
            doProcess           : doProcess_slider_point,
        };
        medD8D.pointWrap_2_dragWrap( argc );

        ///decorates DraggeeHoverer movement    
        function update_decPoint( decPoint )
        {
            var dompos = sDomF.medpos2dompos.call( pointWrap );
            //ccc( 'updates draggee: medpos=' + pointWrap.medpos[1] + 'dompos=' + dompos[1] );
            decPoint.style.left = dompos[0] + 'px';            
            decPoint.style.top = dompos[1] + 'px';            
        }
    }


    function doProcess_slider_point( arg )
    {
        var p = arg.pointWrap;
        var ach = arg.pointWrap.achieved;
        //ccc( 'arg.down_move_up=' + arg.down_move_up );

        switch( arg.down_move_up ) {
            case 'up':
                 ach.achieved = [ p.pos[0], p.pos[1] ];
                 //p.model8media_upcreate();
                 break;
            case 'move':
                sDomF.detected_user_interaction_effect();
                p.pos2value([
                    ach.achieved[0] + arg.surfMove[0] *
                        sconf.med2mod_scale * css2media(),
                    ach.achieved[1] + arg.surfMove[1] * sconf.MONITOR_Y_FLIP *
                        sconf.med2mod_scale * css2media()
                ]);
                break;
        }
    }
    //===========================================
    // \\// create draggers p
    //===========================================








    //============================================
    // //\\ slider m
    //============================================
    function createDragger_m( medD8D )
    {
        var pointWrap = rg.m;
        //:sets dragger handle color
        pointWrap.spinnerClsId    = 'tp-m';
        //todm ... not straight
        pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
        var argc =
        {
            achieved            : [ rg.m.pos[0], rg.m.pos[1] ],
            pointWrap           : rg.m,
            update_decPoint     : update_decPoint,
            doProcess           : doProcess_slider_m,
        };
        medD8D.pointWrap_2_dragWrap( argc );

        ///decorates DraggeeHoverer movement    
        function update_decPoint( decPoint )
        {
            var dompos = sDomF.medpos2dompos.call( pointWrap );
            decPoint.style.left = dompos[0] + 'px';            
            decPoint.style.top = dompos[1] + 'px';            
        }
    }

    function doProcess_slider_m( arg )
    {
        var ach = arg.pointWrap.achieved;
        var m = rg.m;
        switch( arg.down_move_up ) {
            case 'up':
                 ach.achieved = [ m.pos[0], m.pos[1] ];
                 break;
            case 'move':
                sDomF.detected_user_interaction_effect();
                var new_m = [
                        ach.achieved[0] + arg.surfMove[0] *
                            //sconf.med2mod_scale * css2media(),
                            (1/sconf.originalMod2med_scale) * css2media(),
                        ach.achieved[1] //unchanged => only abscissa move
                    ];
                    m.pos2value( new_m );
                break;
        }
    }
    //============================================
    // \\// slider m
    //============================================


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

        var closestDragWrap = null;
        var closestTd = null;
        //.the bigger is priority, the more "choicable" is the drag Wrap point
        var closestDragPriority = 0;

        var testMedpos = sDomF.pOnDs_2_innerViewBox( pOnS );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];

        dragWraps.forEach( function( dragWrap, dix ) {
            var dragPoint   = dragWrap.pointWrap;
            if( dragPoint.hideD8Dpoint ) return;
            var tdX         = Math.abs( testMediaX - dragPoint.medpos[0] );
            var tdY         = Math.abs( testMediaY - dragPoint.medpos[1] );
            var td          = Math.max( tdX, tdY );

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

