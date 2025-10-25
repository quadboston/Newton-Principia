( function () {
    var {
        sn, $$, userOptions,
        fapp, fconf, sconf, sDomN, ssF,
        rg, amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            syncPoint,
            syncPoints,
        },
    });
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
        sets_pt2movable,
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
    ///updates item with rectangular parameters x, y, width, height
    function xywh2svg(item, x, y, width, height) {
        xy2shape(item, "x", x, "y", y);
        item.setAttributeNS(null, "width", width);
        item.setAttributeNS(null, "height", height);
    }


    function sets_pt2movable( pt )
    {
        pt.dom.setAttributeNS(null, "class", "movable figure");
        pt.dom.setAttributeNS(null, "r", sconf.MOVABLE_BASE_RADIUS);
        pt.movable = true;
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
		remove( 'active-no-higlight-do' );
		add( 'active-higlight-do' );
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
    function updatePts(i, x)
    {
        var yRef = dr.yVariations.yRef;
        if (!appstate.movingBasePt) {
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
        gui.drawsWidestRect( dr.basePts.list[basN].dom,false, sdata.view );
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


    ///======================================
    /// syncronizes positions for
    /// framework points with L2/3 legacy
    /// code points (with rg[ name ].pos)
    ///======================================
    function syncPoint( item )
    {
        var dv = dr.yVariations;
        var xoff = sconf.originX_onPicture;
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;
        var cirYar = dr.basePts.circumscribedY;
        var insYar = dr.basePts.inscribedY;
        if( item.type === 'base' ) {
            let blist = dr.basePts.list;
            var bN = dr.basesN;
            var iIx = item.index;

            let insPy = -( insYar[iIx] - yoff ) / scale;
            var cirPy = -( cirYar[iIx] - yoff ) / scale;
            let posAx = blist[0].x;
            let posBx = blist[1].x;
            let posCx = blist[2].x;
            let posDx = blist[3].x;
            let posEx = blist[4].x;

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
            case 1 : var pname = 'B';
                     var itemx = posBx;
                     ////optional names
                     var pnameFun = 'b'; //right on the curve
                     var pnameLow_ = 'L'; //min of the interval
                     rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
                     rg[ pnameLow_ ].pos[1] = insPy;

                    var pnameTop_ = 'm'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = (posCx - xoff) / scale;
                    //rg[ 'C' ].pos[0];
                    rg[ pnameTop_ ].pos[1] = cirPy;
                    break;
            case 2 : var pname = 'C';
                     var itemx = posCx;
                     ////optional names
                     var pnameFun = 'c';
                     var pnameLow_ = 'M'; //min of the interval
                     rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
                     rg[ pnameLow_ ].pos[1] = insPy;

                    var pnameTop_ = 'n'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = (posDx - xoff) / scale;
                    rg[ pnameTop_ ].pos[1] = cirPy;
                    break;
            case 3 : var pname = 'D';
                    var itemx = posDx;
                     ////optional names   
                     var pnameFun = 'd';
                    var pnameTop_ = 'o'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = (posEx - xoff) / scale;
                    rg[ pnameTop_ ].pos[1] = cirPy;
                     //var pnameLow_ = 'G'; //min of the interval
                     //rg[ pnameLow_ ].pos[0] = (posDx - xoff) / scale;
                     //rg[ pnameLow_ ].pos[1] = insPy;
                     
                     //--------------------------------------------
                     // //\\ making low boundary of difference-rect
                     //--------------------------------------------
                     rg.e.pos[0] = (posDx - xoff) / scale;
                     rg.e.pos[1] = insPy;
                     //--------------------------------------------
                     // \\// making low boundary of difference-rect
                     //--------------------------------------------
                     break;
            case 4 :
                     var pname = 'E';
                     var itemx = posEx;
                     //--------------------------------------------
                     // //\\ making low boundary of difference-rect
                     //--------------------------------------------
                     ////rg.p.pos[0] = (itemx - xoff) / scale;
                     //this fails: bases are too low:
                     //( blist[4].y - yoff )  / scale;
                     //insPy;
                     ////rg.p.pos[1] = rg.e.pos[1];
                     //--------------------------------------------
                     // \\// making low boundary of difference-rect
                     //--------------------------------------------
                     break;
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
                    rg[ pnameFun ].pos[1] = -( numModel.curveFun( itemx ) - yoff ) / scale;
                }
                rg[ pnameFun ].pos[0] = rg[ pname ].pos[0];
            }
        }
    }


    function syncPoints() {
        let view = sdata.view;
        let isFig = !!view.isFigureChecked;
        let isIn = !!view.isInscribed;
        let isCir = !!view.isCircumscribed;
        let onlyFig = !isIn&&!isCir;
        {
            let s = onlyFig;
            [ 'a', 'b', 'c', 'd', 
              'A', 'B', 'C', 'D', 'E',
            ].forEach( function( l ) {
                    rg[ l ].undisplay = s;
                    rg[ l ].doPaintPname = !s;
            });
            [ 'AE', 'AB', 'BC', 'CD' ].forEach( function( l ) {
                    rg[ l ].undisplay = s;
            });
            [ 'Bb', 'Cc', 'Dd', 'oE', 'Aa' ].forEach( function( l ) {
                    rg[ l ].undisplay = s;
            });
            if( !isFig && isIn && !isCir ) {
                rg["a"].undisplay = true;
            }
            if( isFig ) {
                rg["Aa"].undisplay = false;
            } else if( !isCir ) {
                rg["Aa"].undisplay = true;
            }
        }
        
        //order of statements seems vital
        [0,1,2,3,4].forEach( ix => { syncPoint( dr.basePts.list[ ix ] ); });
        dr.ctrlPts.forEach( item => { syncPoint( item ); });

        // //\\ majorant rect
        var xoff = sconf.originX_onPicture;
        //yoff is equal to 0 in "numerical space" of "rg.point.pos"
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;
        let dv = dr.yVariations;
        
        rg.F.pos[1] = -( dv.maxY - yoff ) / scale;
        rg.E.pos[1] = -( dv.maxY - yoff ) / scale;
        var { left, right, bottom, top, } = dr.widestRect;
        rg.f.pos[1] = -( top - yoff ) / scale;
        rg.F.pos[0] = ( right - xoff ) / scale;
        rg.f.pos[0] = ( right - xoff ) / scale;
        //--------------------------------------
        // //\\ majorant
        //--------------------------------------
        {
            let l2 = fconf.sappId.indexOf('b1sec1lemma2') === 0;
            let checked = amode.logic_phase !== 'claim';
            let undisplay = !checked || onlyFig;
            rg.F.undisplay = undisplay||l2;
            rg.f.undisplay = undisplay||l2;
            rg.AF.undisplay = undisplay||l2;
            //majorant bar:
            $$.$(dr.faaf).css( 'display', undisplay ? 'none' : 'block' );
        }
        //--------------------------------------
        // \\// majorant
        //--------------------------------------
        stdMod.setsDifferenceBarsMonotonity();
        ( dv.chchosen.dir <= 0 ) && stdMod.swapMonotonity();
    }

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

