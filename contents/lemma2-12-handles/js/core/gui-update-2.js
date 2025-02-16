( function () {
    var {
        sn, haz,
        fapp,
        sapp,
        amode, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2   = sn('stdL2', fapp );
    var study   = sn('study', stdL2 );
    var gui     = sn('gui', stdL2 );
    var guicon  = sn('guiConstruct', gui );
    var sdata   = sn('sdata', study );
    var dr      = sn('datareg', stdL2 );
    return;





    function setModule()
    {
        stdMod.refreshSVG_master = refreshSVG_master;
        var guiup       = sn('guiUpdate', gui);
        var numModel    = sn('numModel', stdL2 );
        var appstate    = sn('appstate', stdL2 );

        ///same in meaning to legacy !view.isNewton property
        sapp.isLite = function()
        {
            return amode.aspect === 'video';
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
            shows_rects,
        });
        //======================================
        // \\// exports module
        //======================================






        //======================================
        // //\\ view top-manager
        //======================================
        function refreshSVG_master() {
            
            ccc( 'rg=========', rg );
            rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
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
            guicon.reset_hollowPoints({
                onCurve:true,
                onBase:true,
            });
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
        ///only decorational and non-positional settings
        ///fills visibility in items.list by value vis:
        ///     in this range: items.visOffset <= ii && ii < items.visOffset+dr.basesN,
        ///     the rest is filled with "hidden",
        function setsVisGap( items, vis )
        {
            let list = items.list;
            let len = list.length;
	        var end = Math.min( len, dr.basesN+items.offset);
            let offset = items.visOffset;
            for( ix=0; ix<len; ix++ ) {
                let item = list[ix];
                var visib = ( offset <= ix && ix < end && vis ) ? "visible" : "hidden";
                ( item.dom || item ).style.visibility = visib; //vital line
            }
        }

        function shows_rects()
        {
            var view = sdata.view;
	        setsVisGap(dr.InscrRects, view.isInscribed);
	        setsVisGap(dr.circRects, view.isCircumscribed);
	        setsVisGap(dr.differenceRects, view.isCircumscribed);
        }


        function adjustVisibilityForBaseDelta() {
	        if (appstate.showRectPts) {
		        setsVisGap(dr.curvPts,1);
            }
            setsVisGap(dr.basePts,1);
	        shows_rects();
        }
        //======================================
        // \\// manages visibility
        //======================================
    }

}) ();

