( function () {
    var {
        sn, $$, userOptions,
        fapp, fconf, sconf, sDomN, ssF,
        rg, amode, stdMod,
    } = window.b$l.apptree({});
    var stdL2       = sn('stdL2', fapp );
    var dr          = sn('datareg', stdL2 );
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );
    var gui         = sn('gui', stdL2 );
    var guiup       = sn('guiUpdate',gui);
    var appstate    = sn('appstate', stdL2 );
    var sdata       = sn('sdata', study );

    //======================================
    // //\\ exports module
    //======================================
    Object.assign( guiup, {
        updatePtsRectsLabelsAreas,
        normalizedStr,
        figurePnt_2_cls8style,
        //updateLabel,
        xywh2svg,
        xy2shape,
        xy_2_xy8shape,
        paints_curve8axes,
    });
    //======================================
    // \\// exports module
    //======================================
    return;




    function xy2lineShape( line,x1,y1,x2,y2 )
    {
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
    }
    ///2 use cases: base, ctrl ...
    function xy_2_xy8shape(
            item, //list[i]
            xName, x, yName, y )
    {
        ////x comes from updatePtsRectsLabelsAreas
        item.x = x;
        item.y = y;

        //merging with core code
        item.medpos[0] = x;
        item.medpos[1] = y;

        item.dom.setAttributeNS( null, xName, x );
        item.dom.setAttributeNS( null, yName, y );
    }
    function xy2shape( item, xName, x, yName, y )
    {
        item.setAttributeNS( null, xName, x );
        item.setAttributeNS( null, yName, y );
    }
    ///updates item with rectangular parameters x, y, width, height
    function xywh2svg(item, x, y, width, height) {
        xy2shape(item, "x", x, "y", y);
        item.setAttributeNS(null, "width", width);
        item.setAttributeNS(null, "height", height);
    }

    function figurePnt_2_cls8style( pt ){ //change to decoratesPoint
        pt.dom.setAttributeNS(null, "class", "figure");
        pt.dom.setAttributeNS(null, "r", sconf.MOVABLE_BASE_RADIUS);
    }

    ///rather redigitizes model for curves and more
    function paints_curve8axes()
    {
        var curveFun = numModel.curveFun;
        var mpRounded = [];
        var dv = dr.yVariations;
        var mp = dr.curveMicroPts;
        var mp_start_ix  = dv.mp_start_ix;
        var mp_end_ix = dv.mp_end_ix;
        var maxY= dv.maxY;
        var x_start = dv.x_start;
        var x_end = dv.x_end;
        var mp_len1 = mp.length-1;
        for( var ix = mp_start_ix ; ix < mp_end_ix; ix++ ) {
            var yy = mp[ix][1];
            var xx = mp[ix][0];
            mpRounded.push([xx.toFixed(2),yy.toFixed(2)]);
        }
        sDomN.curve_middle$.a( "points", mpRounded.join(" ") );
        //:paints axes
        //horizontal axis x
        xy2lineShape( dr.baseAxis, x_start, maxY, x_end, maxY );
        //=============================================
        // //\\ builds bottom part of curve area string
        //=============================================
        //.this code connects two tips on base and first and end
        //.points on curve making base as a part of area perimeter
        var figAreaStr = mpRounded.concat([
            [x_end.toFixed(2) ,maxY.toFixed(2)],
            [x_start.toFixed(2) ,maxY.toFixed(2)]
        ]);
        figAreaStr = figAreaStr.join(" ");
        dr.figureInternalArea.setAttribute( "points",figAreaStr );
        //=============================================
        // \\// builds bottom part of curve area string
        //=============================================

        ///calculates red curves
        if( dv.changes.length > 1 ) {
            let pre_Rounded = [];
            for( let ix = 0; ix < mp_start_ix; ix++ ) {
                let mpt = mp[ix];
                pre_Rounded.push(
                    [mpt[0].toFixed(2),mpt[1].toFixed(2)]
                );
            }
            let past_Rounded = [];
            for( let ix = mp_end_ix; ix < mp_len1; ix++ ) {
                let mpt = mp[ix];
                past_Rounded.push(
                    [mpt[0].toFixed(2),mpt[1].toFixed(2)]
                );
            }
            sDomN.curve_pre$.a( "points", pre_Rounded.join(" ") );
            sDomN.curve_past$.a( "points", past_Rounded.join(" ") );
        } else {
            ////hides red branches
            sDomN.curve_pre$.a( "points", '' );
            sDomN.curve_past$.a( "points", '' );
        }

        if (appstate.showRectPts) {
            setsVisibleRange(dr.curvPts,1);
        }
        setsVisibleRange(dr.basePts,1);
        shows_rects();

        // //\\ resets app modes
        let remove = sDomN.essaionsRoot$.removeClass;
        let add = sDomN.essaionsRoot$.addClass;
        if( dr.figureParams.deltaOnLeft ) {
            remove( 'active-right' );
            add( 'active-left' );
        } else {
            remove( 'active-left' );
            add( 'active-right' );
        }
        if( dr.basesN > 4 ) {
            remove( 'active-higlight-do' );
            add( 'active-no-higlight-do' );
        } else {
            remove( 'active-no-higlight-do' );
            add( 'active-higlight-do' );
        }
        // \\// resets app modes
    }





    //========================================
    // //\\ possibly move to gui-update module
    //========================================
    function updatesRect(rectDom,width,x,y,height)
    {
        var yRef = dr.yVariations.maxY;
        if( typeof height === 'undefined' ) {
            guiup.xywh2svg( rectDom, x, y, width, yRef-y );
        } else {
            guiup.xywh2svg( rectDom, x, y, width, height );
        }
    }
    function updatePts(i, x){
        ////x comes from updatePtsRectsLabelsAreas
        var yRef = dr.yVariations.yRef;
        if (!appstate.basePointsAreMoving) {
	        guiup.xy_2_xy8shape( dr.basePts.list[i], "cx", x, "cy", yRef );
        }
    }
    function updatePtsRectsLabelsAreas()
    {
        var basN = dr.basesN;
        var baseBarsLefts = dr.basePts.baseBarsLefts;
        var insYar = dr.basePts.inscribedY;
        var cirYar = dr.basePts.circumscribedY;
        var yRef = dr.yVariations.yRef;
        for (var i=0; i<basN; i++) {
            let x = baseBarsLefts[i];
            let insY = insYar[i];
            let cirY = cirYar[i];
   	        var width = dr.partitionWidths[i];
	        updatesRect( dr.circRects.list[i], width, x, cirY, );
	        updatesRect( dr.InscrRects.list[i], width, x, insY, );
            updatesRect( dr.differenceRects.list[i], width, x, cirY,
                         insY-cirY );
            updatePts(i, x);
        }
        updatePts( basN, dr.yVariations.x_end);
        gui.drawsWidestRect();
        //-----------------------------------------------------
        // //\\ legend amounts
        //-----------------------------------------------------
        document.getElementById("figAmt").innerHTML =
            ((Math.sign( dr.figureArea )==-1)?"-":"" )+ "100.0";
        document.getElementById("inAmtd").innerHTML =
            normalizedStr( dr.areaIns, dr.figureArea);
        document.getElementById("circAmtd").innerHTML =
            normalizedStr( dr.areaCir, dr.figureArea);
        //-----------------------------------------------------
        // \\// legend amounts
        //-----------------------------------------------------
    }

    function normalizedStr( amt )
    {
        return (100*amt/Math.abs(dr.figureArea)).toFixed(1);
    }
    //========================================
    // \\// possibly move to gui-update module
    //========================================

    //======================================
    // //\\ manages visibility
    //======================================
    ///shows vis. for Labels, Points, Rects
    ///only decorational and non-positional settings
    ///fills visibility in items.list by value vis:
    ///     in this range: items.visOffset <= ii && ii < items.visOffset+dr.basesN,
    ///     the rest is filled with "hidden",
    function setsVisibleRange( items, vis )
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
        setsVisibleRange(dr.InscrRects, view.isInscribed);
        setsVisibleRange(dr.circRects, view.isCircumscribed);
        setsVisibleRange(dr.differenceRects, view.isCircumscribed);
    }
    //======================================
    // \\// manages visibility
    //======================================


}) ();

