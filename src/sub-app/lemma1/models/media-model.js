( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;


    ssF.initMediaModel = initMediaModel;
    return;




    function initMediaModel()
    {
        sDomF.topicModel_2_css_html();
        //ssF.initDragModel();
        sDomF.populateMenu();
        //ssF.create_proofSlider();
        ssF.mediaModelInitialized = true;
    };


    function setModule()
    {
        ssF.upcreateMedia   = upcreateMedia;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMedia()
    {



        //:study-pars
        var modCurvPivots   = ssD.curvePivots;    //curve params
        //:run-time-pars
        var tB              = ssF.tB;
        if( ssF.mediaModelInitialized ) {
            //sDomF.medD8D && sDomF.medD8D.updateAllDecPoints();
        } else {
            //ssF.initMediaModel = initMediaModel;
        }
        //rrrrrrrrrrrrrrrrrrrr
        return;
        //rrrrrrrrrrrrrrrrrrrr





        //comment-bug:
        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================


        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================
        // //\\ paints curve with two pivot points
        ///names pivotPoint1 and pivotPoint2 are needed for topic engine
        // \\// paints curve with two pivot points
        //==========================================
        // //\\ paints areas
        // //\\ paints curved areas
        // \\// paints curved areas
        //==========================================

        //==========================================
        // //\\ linear areas
        // \\// linear areas
        // \\// paints areas
        //==========================================

        //==========================
        // //\\ prints areas values
        //==========================
        ssF.upcreate_mainLegend();
        //==========================
        // \\// prints areas values
        //==========================================
        // \\// does paint view
        //==========================================
        return;
        // \\//\\// ends imperative part of the module


        //==========================================
        // //\\ paint helpers
        //==========================================
        // //\\ pos to pos
        ///transforms model-coordinates to media-coordinates
        // \\// pos to pos
        ///makes line
        ///converts model-pos and attributes to pointy
        //==========================================
        // \\// paint helpers
        //==========================================
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

}) ();

