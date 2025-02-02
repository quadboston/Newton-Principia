( function () {
    var {
        sn, haz,
        fapp,
        sapp,
        amode, SUB_MODEL, stdMod,
    } = window.b$l.apptree({
        setModule,
        stdModExportList :
        {
             media_upcreate___before_basic_L2,
        },
    });
    var stdL2   = sn('stdL2', fapp );
    var study   = sn('study', stdL2 );
    var gui     = sn('gui', stdL2 );
    var guicon  = sn('guiConstruct', gui );
    var sdata   = sn('sdata', study );
    var dr      = sn('datareg', stdL2 );

    var guiup       = sn('guiUpdate', gui);
    var numModel    = sn('numModel', stdL2 );
    var appstate    = sn('appstate', stdL2 );
    return;





    function setModule()
    {
        ///same in meaning to legacy !view.isNewton property
        sapp.isLite = function()
        {
            return amode.aspect === 'video';
        };

        //======================================
        // //\\ exports module
        //======================================
        Object.assign( stdL2, {
            adjustVisibilityForBaseDelta,
            shows_rects,
        });
        //======================================
        // \\// exports module
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
    //======================================
    // //\\ view top-manager
    //======================================
    function media_upcreate___before_basic_L2() {
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
        stdMod.mmedia$.cls( 'submodel-' + SUB_MODEL );
        
        //stdMod.model_upcreate();
        
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
    }
    //======================================
    // \\// view top-manager
    //======================================

}) ();

