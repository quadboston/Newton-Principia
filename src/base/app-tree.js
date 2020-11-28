( function() {
    var ns          = window.b$l;
    ns.app          = apptree;
    ns.apptree      = apptree;

    var $$          = ns.$$;
    var sn          = ns.sn;
    var cssp        = ns.CSS_PREFIX;
    var cssmods     = sn('cssModules');
    var nsmethods   = sn('methods');
    var html        = sn('html');
    var bezier      = sn('bezier');
    var mat         = sn('mat');
    var sv          = sn('svg');
    var nssvg       = sn( 'svg' ); //todm rid

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);
    var ssF         = sn('ssFunctions',ss);
    var ssD         = sn('ssData',ss);
    var bgImages    = sn('bgImages', ssD);

    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);
    var rgtools     = sn('tools',ssD);
    var fixedColors = sn('fixed-colors',ssD);
    var wrkwin      = sn('wrkwin',ssD); //work window
    var exegs       = sn('exegs', ssD);
    var references  = sn('references', ssD);
    var capture     = sn( 'capture', ssD );
    var topics      = sn('topics', ssD);
    var normId2topic= sn('normId2topic', topics);
    var id2tplink   = sn('id2tplink', topics);
    var ix2tplink   = sn('ix2tplink', topics, []);

    var sapp        = sn('sapp');
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);

    var tr          = ssF.tr;
    var tp          = ssF.tp;
    var toreg       = ssF.toreg;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);
    return;






    function apptree({
        //optional variables
        modName,   //default: ''+mCount.count
        setModule,
        SUB_MODEL, //default: SUB_MODEL : 'common',
        stdModExportList,
        ssFExportList,
        sDomFExportList,
        sDomNExportList,
    }) {

        //-------------------------------------------------------------
        // //\\ module and submodel sugar
        //-------------------------------------------------------------
        //:binds to submodel for case there is a need for this
        SUB_MODEL = SUB_MODEL || 'common';
        var stdMod = sn( SUB_MODEL, studyMods );

        //:advances modules registry
        var mCount      = sn('modulesCount', sapp);
        mCount.count = mCount.count ? mCount.count + 1 : 1;
        modName = ( modName && modName + '-' ) || '';
        if( ssFExportList ) {
            Object.keys( ssFExportList ).forEach( fname => {
                ssF[ fname ] = ssFExportList[ fname ];
            });
        }

        srg_modules[ modName + mCount.count ] = () => {
            setModule && setModule();
            if( stdModExportList ) {

                ///adds media_upcreate if createMedia0updateMediaAUX is in the list;
                ///removes createMedia0updateMediaAUX then;
                if( ns.h( stdModExportList, 'createMedia0updateMediaAUX' ) ) {
                    stdModExportList.media_upcreate = create_media_upcreate(
                        ssF, stdMod, stdModExportList.createMedia0updateMediaAUX );
                    delete stdModExportList.createMedia0updateMediaAUX;
                }

                Object.keys( stdModExportList ).forEach( fname => {
                    stdMod[ fname ] = stdModExportList[ fname ];
                });

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
                        stdMod.model_upcreate();
                        ns.haff( stdMod, 'media_upcreate' );
                    }
                }
            }

            if( sDomNExportList ) {
                Object.keys( sDomNExportList ).forEach( fname => {
                    sDomN[ fname ] = sDomNExportList[ fname ];
                });
            }
            if( sDomFExportList ) {
                Object.keys( sDomFExportList ).forEach( fname => {
                    sDomF[ fname ] = sDomFExportList[ fname ];
                });
            }
        };
        sn( 'customDraggers_list', stdMod, [] ); //todm: fake
        //-------------------------------------------------------------
        // \\// module and submodel sugar
        //-------------------------------------------------------------



        //-------------------------------------------------------------
        // //\\ output
        //-------------------------------------------------------------
        var ret =
        {
            ns,

            //:frequent functions
            sn,
            own : ns.own,
            haz : ns.haz,
            has : ns.h,
            haf : ns.haf,
            haff : ns.haff,
            url2conf : ns.url2conf,
            eachprop : ns.eachprop,
            paste : ns.paste,           //todm: remove
            nspaste : ns.paste,


            $$,
            cssp,
            cssmods,
            cssmod,
            nsmethods,
            html,
            bezier,
            mat,
            d8d_p,
            sv,
            nssvg, //todm rid

            fapp,
            fmethods,
            fconf,
            sconf,

            ss,
            ssF,
            ssD, fixedColors, rg, rgtools, wrkwin, exegs, references,
            bgImages,
            capture,
            topics,
            normId2topic,
            id2tplink,
            ix2tplink,

            sapp,
            studyMods,
            amode,
            sDomN,
            sDomF,

            tr,
            tp,
            toreg,

            srg,
            srg_modules,

            //sugar variables
            mCount,
            SUB_MODEL,
            modName,
            stdMod,
        };
        //-------------------------------------------------------------
        // \\// output
        //-------------------------------------------------------------
        return ret;
    }

    //=========================================================
    // //\\ updates and creates media
    //      stdMod.createMedia0updateMediaAUX must exist
    //      at time of inner function call
    //=========================================================
    function create_media_upcreate( ssF, stdMod, createMedia0updateMediaAUX )
    {
        return ( function media_upcreate()
        {
            /*
            if( !ssF.mediaModelInitialized ) {
                stdMod.declaresMediaDecorationElements();
            }
            */
            //refreshes detectability
            stdMod.toogle_detectablilitySliderPoints4Tools();
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

