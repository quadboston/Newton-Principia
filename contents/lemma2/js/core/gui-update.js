( function () {
    var {
        sn,
        fapp, sconf, sDomN, ssF,
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
        redraws_labels8curveLabels,
        normalizedStr,
        sets_pt2movable_2_tpl8domParless,
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
    function y2cy(item, y)
    {
        item.setAttributeNS( null, "cy", y );
    }
    ///updates item with rectangular parameters x, y, width, height
    function xywh2svg(item, x, y, width, height) {
        xy2shape(item, "x", x, "y", y);
        item.setAttributeNS(null, "width", width);
        item.setAttributeNS(null, "height", height);
    }


    function sets_pt2movable_2_tpl8domParless( pt )
    {
        pt.dom.setAttributeNS(null, "class", "movable figure");
        pt.dom.setAttributeNS(null, "r", sconf.MOVABLE_BASE_RADIUS);
        pt.movable = true;
    }





    function paints_curve8axes()
    {
        var ff = numModel.f;

        ///calculates curve with horizontal increment = delta
        var delta           = 3;
        var curveMicroPts   = [];
        var fb              = dr.figureParams;
        for (var xx = fb.minX; xx < fb.maxX; xx+=delta) {
	        var yy = ff( xx );
	        curveMicroPts.push([xx,yy]);
        }

        //:paints curve
        var yy = ff( fb.maxX );
        //this does not collect
        curveMicroPts.push([fb.maxX,yy]);

        var wwPL = document.getElementById( 'polylineCurve' );
        wwPL.setAttribute( "points",curveMicroPts.join(" ") );
        //:paints axes
        //var yy = fb.baseY;
        var yy = dr.yVariations.yRef;
        var x1 = fb.minX;
        var x2 = fb.maxX;
        //apparently, horizontal axis x
        xy2lineShape( dr.baseAxis,x1,yy,x2,yy );
        //apparently, vertical axis y = x1
        xy2lineShape( dr.wallL,x1,yy,x1, ff(x1) );
        //apparently, vertical axis y = x2
        xy2lineShape( dr.wallR,x2,yy,x2, ff(x2) );


        //=============================================
        // //\\ builds bottom part of curve area string
        //=============================================
        //var figureInternalArea = curveMicroPts.concat([[x1,yy]]);
        var wfirstPoint = curveMicroPts[0];
        var wlastPoint = curveMicroPts[curveMicroPts.length-1];
        //.this code connects four points two tips on base and first and end
        //.points on curve making base as a part of area perimeter
        var figureInternalArea = curveMicroPts.concat([
            [wlastPoint[0] ,yy], [wfirstPoint[0] ,yy]
        ]);
        var figureInternalAreaStr = figureInternalArea.join(" ");
        dr.figureInternalArea.setAttribute( "points",figureInternalAreaStr );
        //=============================================
        // \\// builds bottom part of curve area string
        //=============================================


        // //\\ sets curves type
        stdL2.adjustVisibilityForBaseDelta();

        // //\\ resets app modes
        var wfirst = curveMicroPts[0];
        var wlast = curveMicroPts[curveMicroPts.length-1];
        //:note: y axis is apparently flipped, bottom > top
        //:dr.figureParams.deltaOnLeft is already calculated and
        //:can be used
        //:and means decresing function witm max on left
        if( wfirst[1] > wlast[1] ) {
            sDomN.essaionsRoot$.removeClass( 'active-left' );
            sDomN.essaionsRoot$.addClass( 'active-right' );
        } else {
            sDomN.essaionsRoot$.removeClass( 'active-right' );
            sDomN.essaionsRoot$.addClass( 'active-left' );
        }
        // \\// resets app modes
    }





    //========================================
    // //\\ possibly move to gui-update module
    //========================================
    ///gui-model
    ///resets "dr-labels" to match maximum Y
    function redraws_labels8curveLabels()
    {
        var ctrlPts = dr.ctrlPts;
        //finds index of control point with maximum x:
        var max = numModel.ctrlPt_2_maxIx();
        var min = numModel.ctrlPt_2_minIx();
        var fb  = dr.figureParams;

        if( fb.deltaOnLeft ) {
            //// most x-right point has maximum ordinate:
            //// decreasing function: screen-y increases ===
            //// goes from screen-top to screen-bottom
	        dr.leftLabels.offset = -1;
	        dr.righLabels.visOffset = 0;
	        dr.curvLabels.visOffset = 0;
	        dr.curvLabels.offset = 0;
        } else {
	        dr.leftLabels.offset = 0;
	        dr.righLabels.visOffset = 1;
	        dr.curvLabels.visOffset = 1;
	        dr.curvLabels.offset = 1;
        }
        //todm remove: experiment:
        //has( stdMod.rg, 'baseSlider' ) && ssF.pos2pointy( 'baseSlider' );
    }

    function updatesRect(rectDom,width,x,y,nextX,nextY)
    {
        var fb  = dr.figureParams;
        var yRef = dr.yVariations.yRef;
        ///shows bottom points
        if (appstate.showRectPts) {
	        guiup.xy2shape( rectDom, "cx", nextX, "cy", yRef );
        }
        guiup.xywh2svg( rectDom, x, y, width, yRef-y );
    }
    function updatePts(i, x)
    {
        var fb  = dr.figureParams;
        var yRef = dr.yVariations.yRef; //fb.baseY
        if (!appstate.movingBasePt) {
	        guiup.xy_2_xy8shape( dr.basePts.list[i], "cx", x, "cy", yRef );
        }
        if (appstate.showRectPts) {
	        guiup.xy_2_xy8shape( dr.curvPts.list[i], "cx", x, "cy", numModel.f(x) );
        }
        if (i< dr.baseLabels.list.length) {
	        //guiup.updateLabel( dr.baseLabels.list[i], x-5, yRef+20 );
        }
    }
    function updatePtsRectsLabelsAreas()
    {
        var fb  = dr.figureParams;
        var x = fb.minX;
        var basN = dr.bases;
        var basXar = dr.basePts.basXar;
        var insYar = dr.basePts.inscribedY;
        var cirYar = dr.basePts.circumscribedY;
        var yRef = dr.yVariations.yRef; //?fb.base
        for (var i=0; i<basN; i++) {
            let x = basXar[i];
            let insY = insYar[i];
            let cirY = cirYar[i];
   	        var width = dr.partitionWidths[i];
	        updatesRect( dr.circRects.list[i], width, x, cirY, x + width );
	        updatesRect( dr.InscrRects.list[i], width, x, insY, x + width );
	        updatePts(i, x);
        }
        updatePts( basN, fb.maxX);
        gui.drawsWidestRect( dr.basePts.list[basN].dom,
                               appstate.showRectPts, sdata.view );
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
    /// framework points and legacy points
    ///======================================
    function syncPoint( item ) {
       if( item.type === 'ctrl' ) {
            switch( item.index ) {
            case 0 : var pname = 'a';
                     syncPoint( dr.basePts.list[ 0 ] );
                     break;
            case 4 :
                     if( dr.bases === 4 ) {
                         var pname = 'E';
                         var pnameTop = 'o';
                         var previousItem = dr.basePts.list[ 3 ];
                     }
                     break;
            }
        } else if( item.spinnerClsId === 'ctrl-0' ) {
            var pname = 'A';
        } else if( item.type === 'base' ) {
            switch( item.index ) {
            //case 0 : var pname = 'A';
            //         break;
            case 1 : var pname = 'B';
                     ////optional names
                     var pnameFun = 'b'; //right on the curve
                     var pnameTop = 'l'; //max of the interval
                     var pnameLow = 'K'; //min of the interval
                     var previousItem = dr.basePts.list[ 0 ];
                     break;
            case 2 : var pname = 'C';
                     ////optional names
                     var pnameFun = 'c';
                     var pnameTop = 'm';
                     var pnameLow = 'L';
                     var previousItem = dr.basePts.list[ 1 ];
                     break;
            case 3 : var pname = 'D';
                     ////optional names   
                     var pnameFun = 'd';
                     var pnameTop = 'n';
                     var pnameLow = 'M';
                     var previousItem = dr.basePts.list[ 2 ];
                     break;
            case 4 : if( dr.bases > 4 ) {
                        var pname = 'E';
                        ////optional names
                        var pnameTop = 'o';
                        var previousItem = dr.basePts.list[ 3 ];
                     }
                     break;
            }
        }
        if( pname ) {
            var iY = item.type === 'base' ? dr.yVariations.yRef : item.y;
            ////apparently convert from svg-space to model-space
            ////apparently program and numModel.f made in svg-space and
            ////not in gemetrical-model-space;
            var xoff = sconf.originX_onPicture;
            var yoff = sconf.originY_onPicture;
            var scale = sconf.mod2inn_scale;
            rg[ pname ].pos[0] = (item.x - xoff) / scale;
            rg[ pname ].pos[1] = -(iY - yoff) / scale;

            ////optional names
            if( pnameFun ) {
                rg[ pnameFun ].pos[0] = rg[ pname ].pos[0];
                rg[ pnameFun ].pos[1] = -( numModel.f( item.x ) - yoff ) / scale;
            }
            if( pnameLow ) {
                rg[ pnameLow ].pos[0] = ( previousItem.x - xoff ) / scale;
                rg[ pnameLow ].pos[1] = -( numModel.f( item.x ) - yoff ) / scale;
            }
            if( pnameTop ) {
                rg[ pnameTop ].pos[0] = rg[ pname ].pos[0];
                rg[ pnameTop ].pos[1] = -( numModel.f( previousItem.x ) - yoff ) / scale;
            }
        }
    }


    function syncPoints() {
        //order of statements seems vital
        [0,1,2,3,4].forEach( ix => { syncPoint( dr.basePts.list[ ix ] ); });
        dr.ctrlPts.forEach( item => { syncPoint( item ); });

        if( dr.bases < 4 ) {
            rg.E.undisplay = true;
            rg.o.undisplay = true;
        } else {
            rg.E.undisplay = false;
            rg.o.undisplay = false;
        }
        if( dr.bases < 3 ) {
            rg.D.undisplay = true;
            rg.n.undisplay = true;
        } else {
            rg.D.undisplay = false;
            rg.n.undisplay = false;
        }
        ssF.poly_2_updatedPolyPos8undisplay( rg[ 'a--K--b--l' ] );
        ssF.poly_2_updatedPolyPos8undisplay( rg[ 'b--L--c--m' ] );
        ssF.poly_2_updatedPolyPos8undisplay( rg[ 'c--M--d--n' ] );
        ssF.poly_2_updatedPolyPos8undisplay( rg[ 'd--D--E--o' ] );

        rg.AB.undisplay = dr.figureParams.baseY > dr.yVariations.maxY;

        // //\\ majorant rect
        var xoff = sconf.originX_onPicture;
        //yoff is equal to 0 in "numerical space" of "rg.point.pos"
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;

        rg.F.pos[1] = -( dr.yVariations.yRef - yoff ) / scale;
        rg.E.pos[1] = -( dr.yVariations.yRef - yoff ) / scale;
        var { left, right, bottom, top, } = dr.widestRect;
        rg.f.pos[1] = -( top - yoff ) / scale;
        if( dr.figureParams.deltaOnLeft || dr.yVariations.areMany ) {
            rg.F.pos[0] = ( right - xoff ) / scale;
            rg.f.pos[0] = ( right - xoff ) / scale;
        } else {
            rg.F.pos[0] = ( left - xoff ) / scale;
            rg.f.pos[0] = ( left - xoff ) / scale;
        }
        // \\// majorant rect
    }

}) ();

