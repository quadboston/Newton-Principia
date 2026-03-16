// For application, creates and exports namespace tree
// variables ("placeholders") and useful functions.
(function(){
    var nsvars = window.b$l.nstree();
    var { ns, sn, haz, } = nsvars;
    ns.apptree      = apptree;
    var engCssMs    = sn('engCssMs'); // sn returns property if it exists
    var fapp        = sn('fapp' );
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);

    //lemma-independent lemma-subapplication (aka lemma-class-functions in Java)
    //this layer, ss, should be invisible in lemmas, but
    //this invisibility is not yet done in many praxis sites,
    var ss          = sn('ss', fapp);   //todm remove ss later
    var ssF         = sn('ssFunctions',ss);
    var ssD         = sn('ssData',ss);
    const ts        = sn( 'activityScenario', ss );
    var actionsList_coded = sn( 'actionsList_coded', ts );
    var actionsList_default = sn( 'actionsList_default', ts );
    const ario      = sn( 'activityScenario', ss );
    const arios     = sn( 'activityScenarios', ario, [] );

    var rgtools     = sn('tools',ssD);
    var topicColors_repo = sn('fixed-colors',ssD);
    var topicColors_repo_camel2col = sn('fixed-colors-original-id',ssD);
    var wrkwin      = sn('wrkwin',ssD); //work window
    var exegs       = sn('exegs', ssD);
    var references  = sn('references', ssD);
    var capture     = sn( 'capture', ssD );
    var topics      = sn('topics', ssD);
    var lowtpid_2_glocss8anchorRack= sn('lowtpid_2_glocss8anchorRack', topics);
    var anid2anrack   = sn('anid2anrack', topics);
    var anix2anrack   = sn('anix2anrack', topics, []);

    //lemma-dependent lemma-subapplication (aka lemma-class-instance functions in Java)
    var sapp        = sn('sapp');
    var stdMod      = sn('stdMod', sapp);
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);
    var sData       = sn('sappDat',sapp);
    var amode       = sapp.mode = {};

    var sconf       = sn('sconf', fconf);
    var originalPoints = sn( 'originalPoints', sconf );
    var dividorFractions = sn('dividorFractions', wrkwin, []);

    //non-consistent: srg should be under fapp or sapp, not both:
    var srg         = sn('sapprg', fapp );

    //site-wide user options
    var userOptions = sn('userOptions',fapp);
    setsEngineDefaults();
    let ret = null;
    return;


    function setsEngineDefaults()
    {
        //these are pre-professorscripts values: at engine level
        amode.logic_phase = '';
        amode.aspect = '';
        amode.subessay = '';
        //todm: poor? name: to be "amode.stdmod" //study model
    }

    ///this function is called at the top of each module 
    ///to retrieve 'global' objects and register functions
    function apptree({
        //optional variables
        modName,   //default: ''+mCount.count
        stdModExportList,
        ssFExportList,   //removes need to import var ssF into calling module
        sDomFExportList,
        sDomNExportList,
        expoFun,
    }) {
        console.log('apptree');

        ssFExportList && Object.assign( ssF, ssFExportList );
        expoFun = expoFun || ssFExportList,
        expoFun = ssFExportList;

        //-------------------------------------------------------------
        // //\\ module and s ubmodel sugar
        //-------------------------------------------------------------
        //todo: are these really used?
        var mCount      = sn('modulesCount', sapp);
        mCount.count    = mCount.count ? mCount.count + 1 : 1;
        modName         = ( modName && modName + '-' ) || '';

        if( stdModExportList ) {
            Object.assign( stdMod, stdModExportList );
        }
        
        //==========================================================
        //the minor advantage of these is that client-modules do not
        //have to import an extra vars sDomN, sDomF,
        sDomNExportList && Object.assign( sDomN, sDomNExportList );
        sDomFExportList && Object.assign( sDomF, sDomFExportList );
        //==========================================================

        sn( 'customDraggers_list', stdMod, [] ); //todm: fake
        //-------------------------------------------------------------
        // \\// module and s ubmodel sugar
        //-------------------------------------------------------------

        //-------------------------------------------------------------
        // //\\ output
        //-------------------------------------------------------------
        if( ret !== null ) return ret;
        Object.assign( nsvars, {
            engCssMs,
            fmethods,
            ss,
            ssF,
            ssD, topicColors_repo, topicColors_repo_camel2col,
            actionsList_coded,
            actionsList_default,
            //ario,
            arios,
            originalPoints,
            rg    : sapp.rg,
            topos : sapp.topos,
            toreg : sapp.toreg,

            rgtools, wrkwin, exegs, references,

            capture,
            topics,
            lowtpid_2_glocss8anchorRack,
            anid2anrack,
            anix2anrack,

            sapp,
            amode,
            sDomN,
            sDomF,
            sData,

            dividorFractions,

            srg,

            userOptions,

            //sugar variables
            mCount,
            modName,
            stdMod,
        });
        ret = nsvars;
        //-------------------------------------------------------------
        // \\// output
        //-------------------------------------------------------------
        return ret;
    }
})();
