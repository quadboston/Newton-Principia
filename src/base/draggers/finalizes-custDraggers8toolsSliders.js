// This module independently complements similar default module
// bsl/d8d/d8d-framework.js
// They have different findDraggee and findDraggee_default
// functions, for example.
( function() {
    var {
        ns, sn, has, haz, eachprop, d8dp,
        sapp, sconf, fconf, fmethods,
        ssF, sDomN, sDomF,
        stdMod, amode,
    } = window.b$l.apptree({
        modName:'studyModel_2_ss',
        setModule
    });
    sDomF.createsFW__8__executes_dragWr_gens_list =
          createsFW__8__executes_dragWr_gens_list;
    return;









    function setModule()
    {
    }


    //==========================================
    // //\\ inits drag model
    //      createsFW === ? FrameWork
    //==========================================
    function createsFW__8__executes_dragWr_gens_list()
    {
        ///creates tools for the first time and only once

        ///******************************************************
        /// todm,
        /// nearly a bug, thickness and wheel scaling are coupled
        /// unnecessarily
        ///******************************************************
        if( sconf.enableTools ) {
            ssF.createSliderPlaceholder_media_scale();
            ssF.createSliderPlaceholder_thickness();
            fmethods.attachWeelToDomEl(
                stdMod.svgScen$,
            );
        }

        ///****************************************************************
        /// creates a framework, medD8D,
        /// to which arbitrary drag8droppers can be attached from different
        /// lemma modules
        ///****************************************************************
        var medD8D = stdMod.medD8D =
        d8dp.crePointFW_BSLd8d1CHAMBER({
            findDraggee                         : findDraggee,
            dragSurface                         : stdMod.simScene,
            decPoint_parentClasses              : fconf.dragPointDecoratorClasses,
            inn2outparent                       : sDomF.inn2outparent,
            doCreateDynamicSpinners             : true,
        });
        //no need, done in media-model.js:  update_decPoint( decPoint )

        //sets cursor on entire surface
        //other places for this property are:
        //  processDownEvent
        //  processUpEvent
        //todm: do this by adding class "grab" to medRoot
        if( !haz( sconf, 'mediaMoverPointDisabled' ) ){
            stdMod.simScene.style.cursor = 'grab';
        }
        //==========================================
        //: sets drag points
        //==========================================
        ///***********************************************************************
        /// attaches drag8droppers to medD8D
        /// see other lemmas for search-token customDraggers_list
        stdMod.customDraggers_list.forEach( dcreator => { dcreator( medD8D ); });
        ssF.inits_tools_sliders( medD8D, );
        ///***********************************************************************
        ns.globalCss.update(); //for decorator
    }; 
    //==========================================
    // \\// inits drag model
    //==========================================





    //====================
    // //\\ finds draggee
    //      overrides default finder
    //====================
    ///Uses:    sDomF.outparent2inn( testPoint );
    ///
    ///Returns: point drag Wrap
    ///         which is closest to testPoint.
    function findDraggee( point_on_dragSurf, dragWraps )
    {
        /*
        //vital-for-mobile
        ns.d('findDraggee in launcher: fw=' +
            ( dragWraps[0] && dragWraps[0].createdFramework.frameworkId )
        );
        */
        var pOnS = point_on_dragSurf;
        //.if distance to pOnS is "outside" of this par.,
        //.then dragWrap is not "considered" for drag
        var DRAGGEE_HALF_SIZE = fconf.DRAGGEE_HALF_SIZE;

        var closestDragWrap = null;
        var closestTd = null;
        //.the bigger is priority, the more "choicable" is the drag Wrap point
        var closestDragPriority = 0;

        var testMedpos = sDomF.outparent2inn( pOnS );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];

        var unfoundDragger = null;
        dragWraps.forEach( function( dragWrap, dix ) {
            var dragPoint   = dragWrap.pointWrap;
            if( ns.haz( dragPoint, 'unfound' ) ) {
                unfoundDragger = dragWrap;
                return;
            }
            //if( dragPoint.pname === 'loose1' ) {
            //    ccc( dragPoint.pname, dragPoint );
            //}
            if( haz( dragPoint, 'hideD8Dpoint' ) ||
                haz( dragPoint, 'd8d_find_is_LOCKED' )  ) {
                return;
            }

            var tdX = Math.abs( testMediaX - dragPoint.medpos[0] );
            var tdY = Math.abs( testMediaY - dragPoint.medpos[1] );
            var td  = Math.max( tdX, tdY );

            var distLim = haz( dragPoint, 'DRAGGEE_HALF_SIZE' ) || DRAGGEE_HALF_SIZE;
            if( td <= distLim ) {
                if( !closestDragWrap || closestTd > td ||
                    (dragPoint.dragPriority || 0 ) > closestDragPriority ) {
                    closestDragWrap = dragWrap;
                    closestTd = td;
                    closestDragPriority = dragPoint.dragPriority || 0;

                    //vital-for-mobile
                    //ns.d('closest=' + dragPoint.pname +
                    //     ' fw' + dragWrap.createdFramework.frameworkId );
               }
            }
        });
        ///used in full model-media area drag ...
        if( !closestDragWrap && unfoundDragger ) {
            closestDragWrap = unfoundDragger;
        }
        return closestDragWrap;
    }
    //====================
    // \\// finds draggee
    //====================


}) ();

