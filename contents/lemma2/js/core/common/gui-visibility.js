( function () {
    var {
        SUB_MODEL, stdMod, rg,
    } = window.b$l.apptree({
    });

    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var ss          = sn('ss',fapp);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);

    var amode       = sn('mode',sapp);
    var sDomF       = sn('dfunctions', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var numModel    = sn('numModel', l23 );
        var dr          = sn('datareg', l23 );
        var appstate    = sn('appstate', l23 );

        
        ///same in meaning to legacy !view.isNewton property
        sapp.isLite = function()
        {
            return amode.text === 'hypertext';
        };



        //======================================
        // //\\ exports module
        //======================================
        stdMod.model8media_upcreate = refreshSVG_master;

        Object.assign( l23, {
	        //refreshSVG_master               : refreshSVG_master,
            //refreshSVG                      : refreshSVG_master,
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
            //if(sDomN.topicModelInitialized)sDomF.exegs_2_tpAn8dom8mjax(); //todo toggle ???active
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

