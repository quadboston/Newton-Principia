// For application, creates and exports namespace tree
// variables ("placeholders") and useful functions.
// See comment for atree below.
(function(){

var nsvars = window.b$l.nstree();
var { ns, sn, haz, stripp, fapp, sapp, fconf, sconf } = nsvars;
ns.atree      = atree;
var engCssMs    = sn('engCssMs');
var fmethods    = sn('methods',fapp);

var ssF         = sn('ssFunctions',fapp);
var ssD         = sn('ssD',fapp);
const ts        = sn( 'activityScenario', fapp );
var actionsList_coded = sn( 'actionsList_coded', ts );
var actionsList_default = sn( 'actionsList_default', ts );
const ario      = sn( 'activityScenario', fapp );
const arios     = sn( 'activityScenarios', ario, [] );

var rgtools     = sn('tools',ssD);
var tprepo = ssD.topicRepo = ns.stripp();
var tpelect = ssD.topicElect = ns.stripp();
var rootWnd      = sn('rootWnd',ssD); //work window
var exegs       = sn('exegs', ssD);
var references  = sn('references', ssD);
var capture     = sn( 'capture', ssD );
var topics      = sn('topics', ssD);
var lowrgid_2_glocss8anchorRack= sn('lowrgid_2_glocss8anchorRack', topics);
var anid2anrack   = sn('anid2anrack', topics);
var anix2anrack   = sn('anix2anrack', topics, []);

//lemma-dependent lemma-subapplication
//(aka lemma-class-instance functions in Java)
var stdMod      = sn('stdMod', sapp);
var sDomF       = sn('dfunctions',sapp);
var sDomN       = sn('dnative',sapp);
var sData       = sn('sappDat',sapp);
var amode       = sn('mode',sapp);

var point_rgn2rgx = sn( 'point_rgn2rgx', sconf );

var dividorFractions = sn('dividorFractions', rootWnd, []);
//geometric (and not only) shapes
var gshapes = sn( 'gshapes', sconf, [] );

//non-consistent: srg should be under fapp or sapp, not both:
var srg         = sn('sapprg', fapp );
var srg_modules = sn('srg_modules', sapp);
var lemma_book_text = sn('lemma_book_text', ssD, '');

var CONST = {
    POINT: 'point',
    LINE: 'line',
    ANGLE: 'angle',
    CURVE: 'curve',
    SHAPE: 'shape',
    GRAPH: 'graph',
};

//site-wide user options
var userOptions = sn('userOptions',fapp);
setsEngineDefaults();
let exportVariables = null;
return;


///=========================================================
///This function does 4 things:
/// 1) import and export objects necessary for lemmas,
///    i.e. "placeholders" of app object-tree.
/// 2) stacking setModule s for future execution in a batch,
/// 3) stacking objects for future use from:
///     sDomNExportList,
///     sDomNExportList,
///     stdModList,
/// 4) and filtering/modifying the code in some of
///    these objects
/// Stacking setModule for delayed usage
/// instead of immediate execution
/// has the benefit of their mutual use, (although
/// maybe this benefit is ever used).
///
///Don't forget, this function executes multiple times, so any
///"global external" calculations will be done multiple times,
///=========================================================
function atree(args){ var {
    //optional variables
    modName,   //default: ''+mCount.count
    setModule,
    stdModList,
    ssFList,   //removes need to import var ssF into calling module
    sDomFExportList,
    sDomNExportList,
} = stripp( args );

    ssFList = ssFList||stripp();
    //---------------------------------------------
    // //\\ constructs init_conf calls chain
    //      in which decendant lemma overrides
    //      the parent
    //---------------------------------------------
    if( ssF.init_conf && ssFList.init_conf ){
        const originInit = ssF.init_conf;
        const newInit = ssFList.init_conf;
        ssF.init_conf = function(){
            newInit( //overrider
                ////overrider will decide run this or not:
                originInit
            );
        }
        delete ssFList.init_conf;
    }
    //---------------------------------------------
    // \\// constructs init_conf calls chain
    //---------------------------------------------

    Object.assign( ssF, ssFList );
    //==========================================================
    //the minor advantage of these is that client-modules do not
    //have to import an extra vars sDomN, sDomF,
    Object.assign( sDomN, sDomNExportList||{} );
    Object.assign( sDomF, sDomFExportList||{} );
    //==========================================================

    //-------------------------------------------------------------
    // //\\ module and sub-model sugar
    //-------------------------------------------------------------
    //:advances modules registry for setModule
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    modName         = ( modName && modName + '-' ) || '';

    srg_modules[ modName + mCount.count ] = () => {
        setModule && setModule();
        ///filtering/modifying the code, as noted above in 4)
        if( stdModList ) {
            Object.assign( stdMod, stdModList );

            ///replaces media_upcreate if createMedia0updateMediaAUX
            ///is in the list,
            ///removes createMedia0updateMediaAUX then,
            var mediaUpcreate = haz( stdModList,
                                        'createMedia0updateMediaAUX' );
            if( mediaUpcreate ) {
                stdMod.media_upcreate = create_media_upcreate(
                    ssF, stdMod, stdModList.createMedia0updateMediaAUX );
                delete stdModList.createMedia0updateMediaAUX;
            }

            ///if "model_upcreate" does exist in the list, but
            ///"model8media_upcreate" does not, then latter is created
            ///and added possible "media_upcreate".
            if(
                //this condition indicates we are in module "study-model.js" now,
                //assuming this is a most indicative property,
                //and assuming this condition happens only once in app
                ns.has( stdModList, 'model_upcreate' ) &&
                !ns.has( stdModList, 'model8media_upcreate' )
            ) {
                stdMod.model8media_upcreate = () => {
                    //called once on page load and again any
                    //time the model/data changes
                    //console.log('model and media upcreate');
                    stdMod.model_upcreate();
                    ns.haff( stdMod, 'media_upcreate' );
                }
            }
        }
    };
    sn( 'dragList', stdMod, [] ); //todm: fake
    //-------------------------------------------------------------
    // \\// module and sub-model sugar
    //-------------------------------------------------------------

    //-------------------------------------------------------------
    // //\\ output
    //-------------------------------------------------------------
    if( exportVariables === null ){
        ////Export variables are not yet set, do build them.
        //this is __proto__:null object
        exportVariables = Object.assign( nsvars, {
            CONST,
            engCssMs,
            fmethods,
            ssF,
            ssD,
            tprepo,
            tpelect,
            actionsList_coded,
            actionsList_default,
            //ario,
            arios,
            point_rgn2rgx,
            rg    : sapp.rg,
            topos : sapp.topos,
            toreg : sapp.toreg,

            rgtools, rootWnd, exegs, references,

            capture,
            topics,
            lowrgid_2_glocss8anchorRack,
            anid2anrack,
            anix2anrack,

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
            fldo: ns.stripp(), //manual assignment to svg and
                               //effect by manual execution,
            flcs: ns.stripp(), //manual assignment to svg and
                               //effect by css
            gshapes,
            lemma_book_text,
        });
    }
    return exportVariables;
    //-------------------------------------------------------------
    // \\// output
    //-------------------------------------------------------------
}

//=========================================================
// //\\ updates and creates media
//      stdMod.createMedia0updateMediaAUX must exist
//      at time of inner function call
//=========================================================
function create_media_upcreate( ssF, createMedia0updateMediaAUX ){
    return ( function media_upcreate (){
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            stdMod.lemmaD8D && stdMod.lemmaD8D.updateAllDecPoints();
        }
        ssF.mediaModelInitialized = true;
    });
}
//=========================================================
// \\// updates and creates media
//=========================================================

function setsEngineDefaults (){
    //these are pre-professorscripts values: at engine level
    amode.logic_phase = '';
    amode.aspect = '';
    amode.subessay = '';
    //todm: poor? name: to be "amode.stdmod" //study model
}
})();