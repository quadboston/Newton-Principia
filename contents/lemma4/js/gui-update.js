( function () {
    var { sn, $$, userOptions, fapp, fconf, sconf, sDomN, ssF, rg, amode,
        stdMod, } = window.b$l.apptree({
        stdModExportList : { syncPoint, syncPoints, }, });
    var stdL2       = sn('stdL2', fapp );
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
        pt.dom.setAttributeNS(null, "class", "movable figure");
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

        //Show/hide figure base as needed
        $$.$(dr.baseAxis).css( 'display',
            !study.isMonotonic(dr) ? 'none' : 'block' );


        //Show/hide the following lines on the figure as needed
        const {CTRL_PT_FIRST, CTRL_PT_LAST, BASE_PT_FIRST} = dr.POINT_LABELS;
        const lineLeftSide = rg[BASE_PT_FIRST + CTRL_PT_FIRST];
        if (lineLeftSide)
            lineLeftSide.undisplay = !study.isMonotonic(dr);

        const lineBottomSide = rg[BASE_PT_FIRST + CTRL_PT_LAST];
        if (lineBottomSide)
            lineBottomSide.undisplay = !study.isMonotonic(dr);


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
        setsVisibleRange(dr.basePts, study.isMonotonic(dr));
        shows_rects(dr);

        //TEMP Should only be needed by L2/3
        //Also note the classes don't seem to exist, therefore this code may no
        //longer be needed.
        // // //\\ resets app modes
        // let remove = sDomN.essaionsRoot$.removeClass;
        // let add = sDomN.essaionsRoot$.addClass;
        // if( dr.figureParams.deltaOnLeft ) {
        //     remove( 'active-right' );
        //     add( 'active-left' );
        // } else {
        //     remove( 'active-left' );
        //     add( 'active-right' );
        // }
        // //TEMP Does the following need to be called every time now that
        // //bonus mode no longer exists?
        // remove( 'active-no-higlight-do' );
        // add( 'active-higlight-do' );
        // // \\// resets app modes
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

            //TEMP Many updates are for L2/3 only.
	        // updatesRect( dr, dr.circRects.list[i], x, cirY, width, );
	        updatesRect( dr, dr.InscrRects.list[i], x, insY, width, );
            // updatesRect( dr, dr.differenceRects.list[i], x, cirY, width,
            //              insY-cirY );
            updatePts(dr, i, x);
        }
        updatePts(dr, basN, dr.yVariations.x_end);
        gui.drawsWidestRect(dr, dr.basePts.list[basN].dom, false, sdata.view);


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


        //-----------------------------------------------------
        // //\\ legend amounts
        //-----------------------------------------------------
        //TEMP Should only be needed by L2/3, data table
        //If this code ends up getting used by L2/3 it should only be updated
        //by the original datareg or similar.
        // document.getElementById("figAmt").innerHTML =
        //     ((Math.sign( dr.figureArea )==-1)?"-":"" )+ "100.0";
        // document.getElementById("inAmtd").innerHTML =
        //     normalizedStr( dr, dr.areaIns, dr.figureArea);
        // document.getElementById("circAmtd").innerHTML =
        //     normalizedStr( dr, dr.areaCir, dr.figureArea);
        //-----------------------------------------------------
        // \\// legend amounts
        //-----------------------------------------------------
    }

    function normalizedStr( dr, amt )
    {
        //TEMP See above message for "legend amounts"
        return (100*amt/Math.abs(dr.figureArea)).toFixed(1);
    }
    //========================================
    // \\// possibly move to gui-update module
    //========================================


    ///======================================
    /// syncronizes positions for
    /// framework points with L2/3 legacy
    /// code points (with rg[ name ].pos)
    ///======================================
    //TEMP Intended for L2/3 only.  L4 syncs points differently.
    function syncPoint( dr, item )
    {
        var dv = dr.yVariations;
        var xoff = sconf.originX_onPicture;
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;
        var cirYar = dr.basePts.circumscribedY;
        var insYar = dr.basePts.inscribedY;
        if( item.type === 'base' ) {
            let blist = dr.basePts.list;
            var iIx = item.index;

            let insPy = -( insYar[iIx] - yoff ) / scale;
            var cirPy = -( cirYar[iIx] - yoff ) / scale;
            let posAx = blist[0].x;
            let posBx = blist[1].x;
            let posCx = blist[2].x;
            let posDx = blist[3].x;
            // let posEx = blist[4].x;
            const basesN = sconf.basesN;
            let posEx = blist[basesN].x;

            switch( iIx ) {
            case 0 : var pname = 'A';
                    var itemx = posAx;
                    var pnameFun = 'a'; //right on the curve
                    var pnameLow_ = 'K'; //min of the interval
                    rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
                    //rg[ pname ].pos[0];
                    rg[ pnameLow_ ].pos[1] = insPy;

                    var pnameTop_ = 'l'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = (posBx - xoff) / scale;
                    rg[ pnameTop_ ].pos[1] = cirPy;
                    break;
            // case 1 : var pname = 'B';
            //          var itemx = posBx;
            //          ////optional names
            //          var pnameFun = 'b'; //right on the curve
            //          var pnameLow_ = 'L'; //min of the interval
            //          rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
            //          rg[ pnameLow_ ].pos[1] = insPy;

            //         var pnameTop_ = 'm'; //min of the interval
            //         rg[ pnameTop_ ].pos[0] = (posCx - xoff) / scale;
            //         //rg[ 'C' ].pos[0];
            //         rg[ pnameTop_ ].pos[1] = cirPy;
            //         break;
            // case 2 : var pname = 'C';
            //          var itemx = posCx;
            //          ////optional names
            //          var pnameFun = 'c';
            //          var pnameLow_ = 'M'; //min of the interval
            //          rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
            //          rg[ pnameLow_ ].pos[1] = insPy;

            //         var pnameTop_ = 'n'; //min of the interval
            //         rg[ pnameTop_ ].pos[0] = (posDx - xoff) / scale;
            //         rg[ pnameTop_ ].pos[1] = cirPy;
            //         break;
            // case 3 : var pname = 'D';
            //         var itemx = posDx;
            //          ////optional names   
            //          var pnameFun = 'd';
            //         var pnameTop_ = 'o'; //min of the interval
            //         rg[ pnameTop_ ].pos[0] = (posEx - xoff) / scale;
            //         rg[ pnameTop_ ].pos[1] = cirPy;
            //          //var pnameLow_ = 'G'; //min of the interval
            //          //rg[ pnameLow_ ].pos[0] = (posDx - xoff) / scale;
            //          //rg[ pnameLow_ ].pos[1] = insPy;
                     
            //          //--------------------------------------------
            //          // //\\ making low boundary of difference-rect
            //          //--------------------------------------------
            //          rg.e.pos[0] = (posDx - xoff) / scale;
            //          rg.e.pos[1] = insPy;
            //          //--------------------------------------------
            //          // \\// making low boundary of difference-rect
            //          //--------------------------------------------
            //          break;
            // case 4 :
            //          var pname = 'E';
            //          var itemx = posEx;
            //          //--------------------------------------------
            //          // //\\ making low boundary of difference-rect
            //          //--------------------------------------------
            //          ////rg.p.pos[0] = (itemx - xoff) / scale;
            //          //this fails: bases are too low:
            //          //( blist[4].y - yoff )  / scale;
            //          //insPy;
            //          ////rg.p.pos[1] = rg.e.pos[1];
            //          //--------------------------------------------
            //          // \\// making low boundary of difference-rect
            //          //--------------------------------------------
            //          break;
            }
        }
        if( pname ) {
            var iY = item.type === 'base' ? dv.maxY : item.y;
            ////apparently convert from svg-space to model-space
            ////apparently program and numModel.curveFun made in svg-space and
            ////not in gemetrical-model-space;
            rg[ pname ].pos[0] = (itemx - xoff) / scale;
            rg[ pname ].pos[1] = -(iY - yoff) / scale;

            ////optional names
            if( pnameFun ) {
                if( pnameFun === 'a' || pnameFun === 'b') {
                    ////sets upper boundary of the bar
                    rg[ pnameFun ].pos[1] = cirPy;
                } else {
                    rg[ pnameFun ].pos[1] = -( numModel.curveFun( dr, itemx ) - yoff ) / scale;
                }
                rg[ pnameFun ].pos[0] = rg[ pname ].pos[0];
            }
        }
    }


    function syncPointWithPos(dr, pname, pos) {
        //Move point to position on the transformed figure.

        const pt = rg[pname];
        if (!pt)
            return;

        const posTransformed = stdMod.xy_2_Txy(dr, [pos.x, pos.y]);

        //Additional offset and scaling required for rg points, to ensure they
        //end up in the correct position.
        var xoff = sconf.originX_onPicture;
        //yoff is equal to 0 in "numerical space" of "rg.point.pos"
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;

        pt.pos[0] = (posTransformed[0] - xoff) / scale;
        pt.pos[1] = -(posTransformed[1] - yoff) / scale;
    }


    function syncPoints(dr) {
        //--------------------------------------
        // //\\ Syncs points for L4
        //--------------------------------------
        const ptsUntransformed = dr.ctrlPts.untransformed;
        const ptFirst = ptsUntransformed[0];
        const ptLast = ptsUntransformed[ptsUntransformed.length - 1];

        if (ptFirst && ptLast) {
            const xMiddle = (ptFirst.x + ptLast.x) / 2;
            const posMiddle = {x: xMiddle, y: numModel.curveFun(dr, xMiddle)};
            const posBaseFirst = {x: ptFirst.x, y: ptLast.y};

            const {CTRL_PT_FIRST, CURVE_MIDDLE, CTRL_PT_LAST, BASE_PT_FIRST} =
                dr.POINT_LABELS;
            syncPointWithPos(dr, CTRL_PT_FIRST, ptFirst);
            syncPointWithPos(dr, CTRL_PT_LAST, ptLast);
            syncPointWithPos(dr, CURVE_MIDDLE, posMiddle);
            syncPointWithPos(dr, BASE_PT_FIRST, posBaseFirst);
        }
        //--------------------------------------
        // \\// Syncs points for L4
        //--------------------------------------
    }

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

    //TEMP Should only be needed by L2/3, data table
    //For L4 I suppose the inscribed rectangles are always shown unless
    //non-monotonic, meaning view probably doesn't need to be checked.
    function shows_rects(dr)
    {
        var view = sdata.view;
        setsVisibleRange(dr.InscrRects, view.isInscribed);
        //TEMP Really only for L2/L3
        // setsVisibleRange(dr.circRects, view.isCircumscribed);
        // setsVisibleRange(dr.differenceRects, view.isCircumscribed);
    }
    //======================================
    // \\// manages visibility
    //======================================
    
    
}) ();

