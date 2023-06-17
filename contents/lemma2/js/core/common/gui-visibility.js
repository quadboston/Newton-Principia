( function () {
    var {
        sn,
        fapp,
        sapp,
        amode, SUB_MODEL, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2 = sn('stdL2', fapp );
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
            adjustVisibilityForBaseDelta    : adjustVisibilityForBaseDelta,
            styles___shows_LabelsPointsRects         : styles___shows_LabelsPointsRects
        });
        //======================================
        // \\// exports module
        //======================================






        //======================================
        // //\\ view top-manager
        //======================================
        function refreshSVG_master() {
            stdMod.mmedia$.cls( 'submodel-' + SUB_MODEL );
            //resets fb.baseY, "dr-labels" to match maximum Y
	        guiup.updateFigureBasicsJS();
	        //why is this here? styles___shows_LabelsPointsRects();
	        guiup.calculate8paintCurve_8_paintAxes();
	        guiup.updatePtsRectsLabelsAreas(); // depends on curveArea
            //todm needed?: styles___shows_LabelsPointsRects();
            var ww = stdMod.medD8D;
            ww &&       //it may be not defined at landing up application
            ww.updateAllDecPoints();
            stdMod.syncPoints();
            //todo toggle ???active
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

	        if (appstate.showRectPts) {
		        styles___setVisibilityGap(dr.leftPts, view.isInscribed);
		        styles___setVisibilityGap(dr.righPts, view.isCircumscribed);
	        }

	        styles___setVisibilityGap(dr.leftRects, view.isInscribed);
	        styles___setVisibilityGap(dr.leftLabels, !sapp.isLite() && view.isInscribed);

	        styles___setVisibilityGap(dr.righRects, view.isCircumscribed);		
	        styles___setVisibilityGap(dr.righLabels, !sapp.isLite() && view.isCircumscribed);
	        gui.styles___show_widthest_claim_labels( view );
            //strange line: what is this for?
            //gui.toggle_widthest_rect_visib;
        }

        ///only decorational and non-positional settings
        ///fills visibility in items' list 
        ///     gap: items.visOffset <= ii && ii < end
        ///     by value vis
        function styles___setVisibilityGap( items, vis )
        {
	        var end = Math.min(items.list.length, dr.bases+items.offset);
            items.list.forEach( function( item, ix ) {
                var visib = items.visOffset <= ix && ix < end && vis ? "visible" : "hidden";

                ( item.dom || item ).setAttributeNS( null, "visibility", visib );

                //perhaps, this overrides other "style" settings and makes desired
                //effect
                ( item.dom || item ).style.visibility = visib; //vital line
            });
        }

        function adjustVisibilityForBaseDelta() {
	        if (appstate.showRectPts)
		        styles___setVisibilityGap(dr.curvPts,1);
	        styles___setVisibilityGap(dr.basePts,1);
	        styles___shows_LabelsPointsRects();
        }
        //======================================
        // \\// manages visibility
        //======================================

    }

}) ();

