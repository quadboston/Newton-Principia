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

    sapp.additionalDragCreators = []; //to be optionally overriden in inits

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'dragModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var stdMod;
    return;









    function setModule()
    {
        stdMod = sn( SUB_MODEL, studyMods );
        stdMod.initDragModel_base = initDragModel_base;
    }


    //==========================================
    // //\\ inits drag model
    //==========================================
    function initDragModel_base()
    {
        ///****************************************************************
        /// creates a framework, medD8D,
        /// to which arbitrary drag8droppers can be attached from different
        /// lemma modules
        ///****************************************************************
        var medD8D = sn( SUB_MODEL, studyMods ).medD8D =
        d8d_p.createFramework({
            findDraggee                         : findDraggee,
            dragSurface                         : sDomN.medRoot,
            decPoint_parentClasses              : fconf.dragPointDecoratorClasses,
            medpos2dompos                       : sDomF.medpos2dompos,
        });
        //no need, done in media-model.js:  update_decPoint( decPoint )
        //==========================================
        //: sets drag points
        //==========================================
        sapp.readyToResize = true;

        ///***********************************************************************
        /// attaches drag8droppers to medD8D
        /// see other lemmas for search-token additionalDragCreators
        sapp.additionalDragCreators.forEach( dcreator => { dcreator( medD8D ); });
        stdMod.addCommonSliders( medD8D, css2media )
        ///***********************************************************************

        ns.globalCss.update(); //for decorator
    }; 
    //==========================================
    // \\// inits drag model
    //==========================================





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

