// For application, creates and exports namespace tree
// variables ("placeholders") and useful functions.

( function() {
    var nsvars = window.b$l.nstree();
    var { ns, sn, haz, } = nsvars;
    ns.apptree      = apptree;
    var engCssMs    = sn('engCssMs');
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

    var sconf       = sn('sconf', sapp);
    var originalPoints = sn( 'originalPoints', sconf );
    var dividorFractions = sn('dividorFractions', wrkwin, []);

    //non-consistent: srg should be under fapp or sapp, not both:
    var srg         = sn('sapprg', fapp );
    var srg_modules = sn('srg_modules', sapp);

    //site-wide user options
    var userOptions = sn('userOptions',fapp);

    setsEngineDefaults();
    return;


    function setsEngineDefaults()
    {
        //these are pre-professorscripts values: at engine level
        amode.logic_phase = '';
        amode.aspect = '';
        amode.subessay = '';
        //todm: poor? name: to be "amode.stdmod" //study model
    }

    ///be aware, this function executes multiple times, so any
    ///"global external" calculations will be done multiple times,
    function apptree({
        //optional variables
        modName,   //default: ''+mCount.count
        setModule,
        stdModExportList,
        ssFExportList,   //removes need to import var ssF into calling module
        sDomFExportList,
        sDomNExportList,
        expoFun,
    }) {
        //todo: why does it execute so many times??
        //console.log('apptree');

        ssFExportList && Object.assign( ssF, ssFExportList );

        expoFun = expoFun || ssFExportList,
        expoFun = ssFExportList;

        //-------------------------------------------------------------
        // //\\ module and s ubmodel sugar
        //-------------------------------------------------------------
        //:advances modules registry
        var mCount      = sn('modulesCount', sapp);
        mCount.count    = mCount.count ? mCount.count + 1 : 1;
        modName         = ( modName && modName + '-' ) || '';

        srg_modules[ modName + mCount.count ] = () => {

            if( setModule ) {
                //ccc( '... running setModule() for ' + mCount.count );
                setModule();
            }
            //todm: why this code is delayes to srg_modules?
            if( stdModExportList ) {

                ///replaces media_upcreate if createMedia0updateMediaAUX is in the list,
                ///removes createMedia0updateMediaAUX then,
                var mediaUpcreate = haz( stdModExportList, 'createMedia0updateMediaAUX' );
                if( mediaUpcreate ) {
                    stdMod.media_upcreate = create_media_upcreate(
                        ssF, stdMod, stdModExportList.createMedia0updateMediaAUX );
                    delete stdModExportList.createMedia0updateMediaAUX;
                }

                Object.assign( stdMod, stdModExportList );

                ///if "model_upcreate" does exist in the list, but
                ///"model8media_upcreate" does not, then latter is created
                ///and added possible "media_upcreate".
                if(
                    //todm patch
                    //this condition indicates we are in module "study-model.js" now,
                    //assuming this is a most indicative property,
                    ns.h( stdModExportList, 'model_upcreate' ) &&
                    !ns.h( stdModExportList, 'model8media_upcreate' )
                ) {
                    stdMod.model8media_upcreate = () => {
                        // called once on page load and again any time the model/data changes
                        //console.log('model and media upcreate');
                        stdMod.model_upcreate();
                        ns.haff( stdMod, 'media_upcreate' );
                    }
                }
            }
            //==========================================================
            //the minor advantage of these is that client-modules do not
            //have to import an extra vars sDomN, sDomF,
            sDomNExportList && Object.assign( sDomN, sDomNExportList );
            sDomFExportList && Object.assign( sDomF, sDomFExportList );
            //==========================================================
        };

        sn( 'customDraggers_list', stdMod, [] ); //todm: fake
        //-------------------------------------------------------------
        // \\// module and s ubmodel sugar
        //-------------------------------------------------------------



        //-------------------------------------------------------------
        // //\\ output
        //-------------------------------------------------------------
        Object.assign( nsvars,
        {
            engCssMs,

            fapp,
            fmethods,
            fconf,
            sconf,

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
            srg_modules,

            userOptions,

            //sugar variables
            mCount,
            modName,
            stdMod,
        });
        //-------------------------------------------------------------
        // \\// output
        //-------------------------------------------------------------

        return nsvars;
    }

    //=========================================================
    // //\\ updates and creates media
    //      stdMod.createMedia0updateMediaAUX must exist
    //      at time of inner function call
    //=========================================================
    function create_media_upcreate( ssF, createMedia0updateMediaAUX )
    {
        return ( function media_upcreate()
        {
            //refreshes detectability
            ssF.toogle_detectablilitySliderPoints4Tools();
            createMedia0updateMediaAUX();
            if( ssF.mediaModelInitialized ) {
                stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
            }
            ssF.mediaModelInitialized = true;
        });
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

}) ();

