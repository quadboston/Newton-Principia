( function () {
    var {
        sn,
        ss,
        sapp,
        amode, SUB_MODEL, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    return;





    function setModule()
    {
        stdMod.refreshSVG_master = refreshSVG_master;
        var study       = sn('study', ss );
        var sdata       = sn('sdata', study );
        var gui         = sn('gui', ss );
        var guiup       = sn('guiUpdate', gui);
        var numModel    = sn('numModel', ss );
        var dr          = sn('datareg', ss );
        var appstate    = sn('appstate', ss );
        
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

        Object.assign( ss, {
            adjustVisibilityForBaseDelta    : adjustVisibilityForBaseDelta,
            show_LPR                        : show_LPR
        });
        //======================================
        // \\// exports module
        //======================================






        //======================================
        // //\\ view top-manager
        //======================================
        function refreshSVG_master() {
            stdMod.mmedia$.cls( 'submodel-' + SUB_MODEL );
	        guiup.updateFigureBasicsJS();
	        show_LPR();
	        guiup.calculate8paintCurve_8_paintAxes();
	        guiup.updatePtsRectsLabelsAreas(); // depends on curveArea
            var ww = stdMod.medD8D;
            ww && ww.updateAllDecPoints();
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
        function show_LPR()
        {
            var view = sdata.view;
	        setVisibilityGap(dr.curvLabels, !sapp.isLite() );
	        setVisibilityGap(dr.baseLabels, !sapp.isLite() );

	        if (appstate.showRectPts) {
		        setVisibilityGap(dr.leftPts, view.isInscribed);
		        setVisibilityGap(dr.righPts, view.isCircumscribed);
	        }

	        setVisibilityGap(dr.leftRects, view.isInscribed);
	        setVisibilityGap(dr.leftLabels, !sapp.isLite() && view.isInscribed);

	        setVisibilityGap(dr.righRects, view.isCircumscribed);		
	        setVisibilityGap(dr.righLabels, !sapp.isLite() && view.isCircumscribed);
	        gui.show_widthest_claim_labels( view );
            gui.toggle_widthest_rect_visib;
        }

        ///fills visibility in items' list 
        ///     gap: items.visOffset <= ii && ii < end
        ///     by value vis
        function setVisibilityGap( items, vis )
        {
	        var end = Math.min(items.list.length, dr.bases+items.offset);
            items.list.forEach( function( item, ix ) {
                var visib = items.visOffset <= ix && ix < end && vis ? "visible" : "hidden";
                ( item.dom || item ).setAttributeNS( null, "visibility", visib );
                ( item.dom || item ).style.visibility = visib; //vital line
            });
        }

        function adjustVisibilityForBaseDelta() {
	        if (appstate.showRectPts)
		        setVisibilityGap(dr.curvPts,1);
	        setVisibilityGap(dr.basePts,1);
	        show_LPR();
        }
        //======================================
        // \\// manages visibility
        //======================================

    }

}) ();

