( function() {
    var ns = window.b$l;
    ns.app = apptree;
    return;


    function apptree({
        //optional variables
        modName,   //default: ''+mCount.count
        setModule,
        SUB_MODEL, //default: SUB_MODEL : 'common',
        stdModExportList,
    }) {
        var $$          = ns.$$;
        var sn          = ns.sn;
        var bezier      = sn('bezier');
        var mat         = sn('mat');
        var sv          = sn('svg');

        var fapp        = sn('fapp' ); 
        var fmethods    = sn('methods',fapp);
        var d8d_p       = sn('d8d-point',fmethods);

        var fconf       = sn('fconf',fapp);
        var sconf       = sn('sconf',fconf);

        var ss          = sn('ss', fapp);
        var ssD         = sn('ssData',ss);
        var ssF         = sn('ssFunctions',ss);
        //.registry is used for study-model-elements or media-model-elements
        var rg          = sn('registry',ssD);

        var sapp        = sn('sapp');
        var studyMods   = sn('studyMods', sapp);
        var amode       = sn('mode',sapp);
        var sDomF       = sn('dfunctions',sapp);
        var sDomN       = sn('dnative',sapp);

        var tr          = ssF.tr;
        var tp          = ssF.tp;

        var srg         = sn('sapprg', fapp ); 
        var srg_modules = sn('srg_modules', sapp);

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
        srg_modules[ modName + mCount.count ] = () => {
            setModule && setModule();
            if( stdModExportList ) {
                Object.keys( stdModExportList ).forEach( fname => {
                    stdMod[ fname ] = stdModExportList[ fname ];
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
            sn,
            bezier,
            mat,
            d8d_p,
            sv,

            fapp,
            fmethods,
            fconf,
            sconf,

            ss,
            ssD,
            ssF,
            rg,

            sapp,
            studyMods,
            amode,
            sDomN,
            sDomF,

            tr,
            tp,

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

}) ();

