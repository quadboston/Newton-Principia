( function () {
    var { sn, $$, fapp, sconf, sDomN, rg, stdMod, } = window.b$l.apptree({});
    var stdL2       = sn('stdL2', fapp );
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
        sets_pt2movable,
        //updateLabel,
        updatesRect,
        xy2shape,
        xy_2_xy8shape,
        paints_curve8axes,
        setsVisibleRange,
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
    function xy_2_xy8shape( item, xName, x, yName, y )
    {
        item.x = x;
        item.y = y;
        item.dom.setAttributeNS( null, xName, x );
        item.dom.setAttributeNS( null, yName, y );
    }
    function xy2shape( item, xName, x, yName, y )
    {
        item.setAttributeNS( null, xName, x );
        item.setAttributeNS( null, yName, y );
    }


    function sets_pt2movable( pt )
    {
        pt.dom.setAttributeNS(null, "class", "figure");
        pt.dom.setAttributeNS(null, "r", sconf.MOVABLE_BASE_RADIUS);
        pt.movable = true;
    }



    ///rather redigitizes model for curves and more
    function paints_curve8axes(dr)
    {
        // var curveFun = numModel.curveFun;
        var mpRounded = [];
        var dv = dr.yVariations;
        var mp = dr.curveMicroPts.points;
        var mp_start_ix  = dv.mp_start_ix;
        var mp_end_ix = dv.mp_end_ix;
        var maxY= dv.maxY;
        var x_start = dv.x_start;
        var x_end = dv.x_end;
        var mp_len1 = mp.length-1;
        //Include mp_end_ix to ensure there can't be a gap on the right side of
        //the figure.
        for( var ix = mp_start_ix ; ix <= mp_end_ix; ix++ ) {
            const posT = stdMod.xy_2_Txy(dr, mp[ix]);
            mpRounded.push([posT[0].toFixed(2),posT[1].toFixed(2)]);
        }
        dr.curve_middle$.a( "points", mpRounded.join(" ") );


        //:paints axes
        //horizontal axis x
        const posBaseStart = stdMod.xy_2_Txy(dr, [x_start, maxY]);
        const posBaseEnd = stdMod.xy_2_Txy(dr, [x_end, maxY]);
        xy2lineShape(dr.baseAxis, posBaseStart[0], posBaseStart[1],
            posBaseEnd[0], posBaseEnd[1]);


        stdMod.hideWhenNonMonotonic?.(dr);


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
        if(!study.isMonotonic(dr)) {
            let pre_Rounded = [];
            //Include mp_start_ix to ensure there can't be a gap between lines.
            for( let ix = 0; ix <= mp_start_ix; ix++ ) {
                const posT = stdMod.xy_2_Txy(dr, mp[ix]);
                pre_Rounded.push([posT[0].toFixed(2), posT[1].toFixed(2)]);
            }
            let past_Rounded = [];
            //Include the last point on curveMicroPts to ensure there can't be
            //a gap on the right side of the figure.
            for( let ix = mp_end_ix; ix <= mp_len1; ix++ ) {
                const pos = stdMod.xy_2_Txy(dr,  mp[ix]);
                past_Rounded.push([pos[0].toFixed(2),pos[1].toFixed(2)]);
            }
            dr.curve_pre$.a( "points", pre_Rounded.join(" ") );
            dr.curve_past$.a( "points", past_Rounded.join(" ") );
        } else {
            ////hides red branches
            dr.curve_pre$.a( "points", '' );
            dr.curve_past$.a( "points", '' );
        }

        if (appstate.showRectPts) {
            setsVisibleRange(dr.curvPts,1);
        }
        setsVisibleRange(dr.basePts, !sconf.HIDE_WHEN_NON_MONOTONIC ||
            study.isMonotonic(dr));
        shows_rects(dr);

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
		remove( 'active-no-higlight-do' );
		add( 'active-higlight-do' );
        // \\// resets app modes
    }



    //========================================
    // //\\ possibly move to gui-update module
    //========================================
    function updatesRect(dr, rectDom, x, y, width, height) {
        //Update the rect (polygon) with transformed rectangular parameters
        const yRef = dr.yVariations.maxY;
        const w = width;
        const h = typeof height === 'undefined' ? yRef-y : height;

        //Transformed positions
        const positionsT = [
            stdMod.xy_2_Txy(dr, [x, y]),
            stdMod.xy_2_Txy(dr, [x + w, y]),
            stdMod.xy_2_Txy(dr, [x + w, y + h]),
            stdMod.xy_2_Txy(dr, [x, y + h]),
        ];

        rectDom.setAttributeNS(null, "points", positionsT.join(" "));
    }
    

    function updatePts(dr, i, x)
    {
        var yRef = dr.yVariations.yRef;
        if (!appstate.movingBasePt) {
	        guiup.xy_2_xy8shape( dr.basePts.list[i], "cx", x, "cy", yRef );
        }
    }
    function updatePtsRectsLabelsAreas(dr)
    {
        var view = sdata.view;
        var basN = sconf.basesN;
        var baseBarsLefts = dr.basePts.baseBarsLefts;
        var insYar = dr.basePts.inscribedY;
        var cirYar = dr.basePts.circumscribedY;
        var yRef = dr.yVariations.yRef;
        for (var i=0; i<basN; i++) {
            let x = baseBarsLefts[i];
            let insY = insYar[i];
            let cirY = cirYar[i];
   	        var width = dr.partitionWidths[i];

            //Only update rects that are visible
            if (view.isInscribed)
                updatesRect( dr, dr.InscrRects.list[i], x, insY, width, );
            if (view.isCircumscribed) {
                updatesRect( dr, dr.circRects.list[i], x, cirY, width, );
                updatesRect( dr, dr.differenceRects.list[i], x, cirY, width,
                         insY-cirY );
            }

            updatePts(dr, i, x);
        }
        updatePts(dr, basN, dr.yVariations.x_end);
        gui.drawsWidestRect?.(dr);


        //Update curve handle positions (for when transforming)
        const transforms = dr.transforms;
        if (transforms.POINT_I_ENABLED || transforms.POINT_J_ENABLED) {
            dr.ctrlPts.list.forEach((pt) => {
                const pos = dr.ctrlPts.untransformed[pt.index];
                if (pos) {
                    const posT = stdMod.xy_2_Txy(dr, [pos.x, pos.y]);
                    guiup.xy_2_xy8shape(pt, "cx", posT[0], "cy", posT[1]);
                }
            });
        }


        guiup.updateLegendAmounts?.(dr);
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
    ///     in this range: items.visOffset <= ii && ii < items.visOffset+sconf.basesN,
    ///     the rest is filled with "hidden",
    function setsVisibleRange( items, vis )
    {
        let list = items.list;
        let len = list.length;
        var end = Math.min( len, sconf.basesN+items.offset);
        let offset = items.visOffset;
        for( ix=0; ix<len; ix++ ) {
            let item = list[ix];
            var visib = ( offset <= ix && ix < end && vis ) ? "visible" : "hidden";
            ( item.dom || item ).style.visibility = visib; //vital line
        }
    }

    function shows_rects(dr)
    {
        var view = sdata.view;
        const hidden = sconf.HIDE_WHEN_NON_MONOTONIC && !study.isMonotonic(dr);

        setsVisibleRange(dr.InscrRects, view.isInscribed && !hidden);
        setsVisibleRange(dr.circRects, view.isCircumscribed && !hidden);
        setsVisibleRange(dr.differenceRects, view.isCircumscribed && !hidden);
    }
    //======================================
    // \\// manages visibility
    //======================================
    
    
}) ();

