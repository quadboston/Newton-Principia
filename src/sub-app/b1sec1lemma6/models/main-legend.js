( function() {
    var SUB_MODEL   = 'common';
    var ns      = window.b$l;
    var $$      = ns.$$;
    var sn      = ns.sn;    
    var bezier  = sn('bezier');
    var sv      = sn('svg');

    var fapp    = sn('fapp'); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);

    var sapp    = sn('sapp'); 
    var sDomN   = sn('dnative',sapp);
    var sDomF   = sn('dfunctions',sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss      = sn('ss',fapp);
    var ssD     = sn('ssData',ss);
    var ssF     = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mainLegend_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;


    var domModel$ = {
        firstRow$ : [],
        body$ : [],
    }
    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];
    var visibilizeTableLocal;
    var fillTableData_inModule;

    var stdMod;
    return;








    function setModule()
    {
        stdMod                          = sn( SUB_MODEL, studyMods );
        stdMod.upcreate_mainLegend      = upcreate_mainLegend;

        //.uncomment this to execute fullapp code which ads legend lemma-wise:
        //ssF.create_digital_legend       = create_digital_legend;
    }

    ///this function is called from common-application-library,
    ///from full-app/dom/...
    function create_digital_legend()
    {
        //ccc( 'starts create_digital_legend' );
        var mlegend = ssF.tr( 'main-legend' );
        doCreateTable_proof( mlegend );
    }





    //=========================================
    // //\\ updates values during simulation
    //      can be called from slider and from
    //      other places
    //=========================================
    function upcreate_mainLegend()
    {
    }
    //=========================================
    // \\// updates values during simulation
    //=========================================





    //=========================================
    // //\\ creates proof table
    //      does one time work of html creation
    //=========================================
    function doCreateTable_proof(mlegend)
    {
    }
    //=========================================
    // \\// creates proof table
    //=========================================


}) ();

