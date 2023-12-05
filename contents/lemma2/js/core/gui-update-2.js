( function () {
    var {
        sn, haz,
        fapp,
        sapp,
        amode, SUB_MODEL, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2 = sn('stdL2', fapp );
    var study = sn('study', stdL2 );
    return;





    function setModule()
    {
        stdMod.refreshSVG_master = refreshSVG_master;

        var study       = sn('study', stdL2 );
        var sdata       = sn('sdata', study );
        var gui         = sn('gui', stdL2 );
        var guiup       = sn('guiUpdate', gui);
        var numModel    = sn('numModel', stdL2 );
        var dr          = sn('datareg', stdL2 );
        var appstate    = sn('appstate', stdL2 );

        ///same in meaning to legacy !view.isNewton property
        sapp.isLite = function()
        {
            return amode.text === 'hypertext';
        };



        //======================================
        // //\\ exports module
        //======================================
        //stdMod.model8media_upcreate = refreshSVG_master;

        //----------------------------------------------
        // //\\ fits lemma to modern framework
        //----------------------------------------------
        //we do this because of refreshSVG_master may play role of model, so all the
        //stuff for gui must be created before framework's media update
        //        stdMod.media_upcreate___before_basic = refreshSVG_master;
        //stdMod.media_upcreate___part_of_medupcr_basic = refreshSVG_master;
        //----------------------------------------------
        // \\// fits lemma to modern framework
        //----------------------------------------------

        Object.assign( stdL2, {
            adjustVisibilityForBaseDelta,
            styles___shows_LabelsPointsRects,
        });
        //======================================
        // \\// exports module
        //======================================






        //======================================
        // //\\ view top-manager
        //======================================
        function refreshSVG_master() {
            rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
            
            stdMod.mmedia$.cls( 'submodel-' + SUB_MODEL );

            let max = numModel.ctrlPt_2_maxIx();
            let min = numModel.ctrlPt_2_minIx();
            dr.figureParams.minX= dr.ctrlPts[min].x;
            dr.figureParams.maxX= dr.ctrlPts[max].x;

            numModel.recalculates_Bases8maxWidth();
            study.calculates_microPoints8curveArea();
            study.calculates_monotIntervals8ref();
            study.calculates_inscr8circums();
            study.calculatesWidestRect();
	        guiup.paints_curve8axes();
            guiup.updatePtsRectsLabelsAreas();
            let medD8D = haz( stdMod, 'medD8D' );
            if( medD8D ) {
                ////it may be not defined at application landing up
                medD8D.updateAllDecPoints();
            }
            stdMod.syncPoints();
            //todm this function no longer exists; toggle ???active
            //if(sDomN.topicModelInitialized)sDomF.exegs_2_tpAn8dom8mjax();
        }
        //======================================
        // \\// view top-manager
        //======================================




        //======================================
        // //\\ manages visibility
        //======================================
        ///shows vis. for Labels, Points, Rects
        function styles___shows_LabelsPointsRects()
        {
            var view = sdata.view;
	        styles___setVisibilityGap(dr.curvLabels, !sapp.isLite() );
	        styles___setVisibilityGap(dr.baseLabels, !sapp.isLite() );

	        styles___setVisibilityGap(dr.InscrRects, view.isInscribed);
	        styles___setVisibilityGap(dr.leftLabels, !sapp.isLite() && view.isInscribed);

	        styles___setVisibilityGap(dr.circRects, view.isCircumscribed);
	        styles___setVisibilityGap(dr.righLabels, !sapp.isLite() && view.isCircumscribed);
        }

        ///only decorational and non-positional settings
        ///fills visibility in items' list
        ///     gap: items.visOffset <= ii && ii < end
        ///     by value vis
        function styles___setVisibilityGap( items, vis )
        {
	        var end = Math.min(items.list.length, dr.bases+items.offset);
            items.list.forEach( function( item, ix ) {
                var visib = ( items.visOffset <= ix && ix < end && vis ) ? "visible" : "hidden";
                //( item.dom || item ).setAttributeNS( null, "visibility", visib );
                //this overrides other "style" settings and makes desired effect
                ( item.dom || item ).style.visibility = visib; //vital line
            });
        }

        function adjustVisibilityForBaseDelta() {
	        if (appstate.showRectPts) {
		        styles___setVisibilityGap(dr.curvPts,1);
            }
            styles___setVisibilityGap(dr.basePts,1);
	        styles___shows_LabelsPointsRects();
        }
        //======================================
        // \\// manages visibility
        //======================================

    }

}) ();

