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


    var css2media;
    var stdMod;
    return;








    function setModule()
    {
        stdMod = sn( SUB_MODEL, studyMods );
        stdMod.initCommonDragModel = initCommonDragModel;
    }


    //==========================================
    // //\\ inits drag points
    //==========================================
    function initCommonDragModel( medD8D, css2media_ )
    {
        css2media = css2media_;
        if( sconf.enableTools ) {
            createDragger_media_scale();
            createDragger_thickness();
        }
        return;












        //============================================
        // //\\ slider media_scale
        //============================================
        function createDragger_media_scale()
        {
            var pointWrap = rg.media_scale;
            //:sets dragger handle color
            pointWrap.spinnerClsId    = 'tp-media-scale';
            //todm ... not straight
            pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
            var argc =
            {
                achieved            : [ rg.media_scale.pos[0], rg.media_scale.pos[1] ],
                pointWrap           : rg.media_scale,
                doProcess           : doProcess_slider_media_scale,
            };
            medD8D.pointWrap_2_dragWrap( argc );
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
            pointWrap.spinnerClsId    = 'tp-thickness';
            //todm ... not straight
            pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
            var argc =
            {
                achieved            : [ rg.thickness.pos[0], rg.thickness.pos[1] ],
                pointWrap           : rg.thickness,
                doProcess           : doProcess_slider_thickness,
            };
            medD8D.pointWrap_2_dragWrap( argc );
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




}) ();

