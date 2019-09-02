( function() {
    var SUB_MODEL   = 'common';
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
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var tr          = ssF.tr;
    var tp          = ssF.tp;
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;








    function setModule()
    {
        sn(SUB_MODEL, studyMods ).upcreateMedia = upcreateMedia;



        //=========================================================
        // //\\ updates and creates media
        //=========================================================
        function upcreateMedia()
        {
            //===================================================
            // //\\
            //===================================================

            //:study-pars
            var S       = rg.S.pos;
            var force   = rg.force.pos;
            var path    = rg.path.pos;
            var freePath= rg.freePath.pos;
            var forces  = rg.forces.pos;
            //var freeTriangles = rg.freeTriangles.pos;
            var keplerTriangles = rg.keplerTriangles.pos;
            var speeds  = rg.speeds.pos;
            var spatialStepsMax = rg.spatialStepsMax.pos;
            //===================================================
            // \\//
            //===================================================
            studyMods[SUB_MODEL].createMedia();



            //==========================================
            // \\// does paint view
            //==========================================
            if( ssF.mediaModelInitialized ) {
                var ww = studyMods[ SUB_MODEL ].medD8D;
                ww && ww.updateAllDecPoints();
            } else {
                sn(SUB_MODEL, studyMods ).initMediaModel = initMediaModel;
            }
            ssF.mediaModelInitialized = true;
            return;
            // \\//\\// ends imperative part of the module







            function initMediaModel()
            {
                studyMods[ SUB_MODEL ].mmedia$.cls( 'submodel-' + SUB_MODEL );
                sn( SUB_MODEL, studyMods ).initDragModel();
            }

        }
        //=========================================================
        // \\// updates and creates media
        //=========================================================
    }

}) ();

