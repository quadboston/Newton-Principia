( function () {
    var {
        ns, sn, $$, userOptions,
        fapp, fconf, sconf, sDomN, ssF,
        rg, amode,
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




    //todo why it does calculate curve twice?
    //because ? micropoints do this twice for
    //monotonity-turn-points calr?
    function paints_curve8axes()
    {
        var ff = numModel.f;
        ///calculates curve with horizontal increment = delta
        var delta           = 3;
        var curveMicroPts   = [];
        var curveMicroPtsRounded = [];
        var fb              = dr.figureParams;
        for (var xx = fb.minX; xx < fb.maxX; xx+=delta) {
	        var yy = ff( xx );
	        curveMicroPts.push([xx,yy]);
            curveMicroPtsRounded.push([xx.toFixed(2),yy.toFixed(2)]);
        }

        //:paints curve
        var yy = ff( fb.maxX );
        //this does not collect
        curveMicroPts.push([fb.maxX, yy]);
        curveMicroPtsRounded.push([fb.maxX.toFixed(2),yy.toFixed(2)]);

        var wwPL = document.getElementById( 'polylineCurve' );
        wwPL.setAttribute( "points",curveMicroPtsRounded.join(" ") );
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
        var wfirstPoint = curveMicroPts[0];
        var wlastPoint = curveMicroPts[curveMicroPts.length-1];
        //.this code connects four points two tips on base and first and end
        //.points on curve making base as a part of area perimeter
        var figureInternalAreaStr = curveMicroPtsRounded.concat([
            [wlastPoint[0].toFixed(2) ,yy.toFixed(2)],
            [wfirstPoint[0].toFixed(2) ,yy.toFixed(2)]
        ]);        
        figureInternalAreaStr = figureInternalAreaStr.join(" ");
        dr.figureInternalArea.setAttribute( "points",figureInternalAreaStr );
        $$.$(dr.figureInternalArea).addClass( "debug-curve-svg-points" );
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
        if( userOptions.showingBonusFeatures() && dr.basesN > 4 ) {
            sDomN.essaionsRoot$.removeClass( 'active-higlight-do' );
            sDomN.essaionsRoot$.addClass( 'active-no-higlight-do' );
        } else {
            sDomN.essaionsRoot$.removeClass( 'active-no-higlight-do' );
            sDomN.essaionsRoot$.addClass( 'active-higlight-do' );
        }
        // \\// resets app modes
    }





    //========================================
    // //\\ possibly move to gui-update module
    //========================================
    function updatesRect(rectDom,width,x,y,height)
    {
        var fb  = dr.figureParams;
        var yRef = dr.yVariations.yRef;
        if( typeof height === 'undefined' ) {
            guiup.xywh2svg( rectDom, x, y, width, yRef-y );
        } else {
            guiup.xywh2svg( rectDom, x, y, width, height );
        }
    }
    function updatePts(i, x)
    {
        var fb  = dr.figureParams;
        var yRef = dr.yVariations.yRef; //fb.baseY
        if (!appstate.movingBasePt) {
	        guiup.xy_2_xy8shape( dr.basePts.list[i], "cx", x, "cy", yRef );
        }
    }
    function updatePtsRectsLabelsAreas()
    {
        var fb  = dr.figureParams;
        var x = fb.minX;
        var basN = dr.basesN;
        var basXar = dr.basePts.basXar;
        var insYar = dr.basePts.inscribedY;
        var cirYar = dr.basePts.circumscribedY;
        var yRef = dr.yVariations.yRef; //?fb.base
        for (var i=0; i<basN; i++) {
            let x = basXar[i];
            let insY = insYar[i];
            let cirY = cirYar[i];
   	        var width = dr.partitionWidths[i];
	        updatesRect( dr.circRects.list[i], width, x, cirY, );
	        updatesRect( dr.InscrRects.list[i], width, x, insY, );
            updatesRect( dr.differenceRects.list[i], width, x, cirY,
                         insY-cirY );
            updatePts(i, x);
        }
        updatePts( basN, fb.maxX);
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
    function syncPoint( item ) {
        var xoff = sconf.originX_onPicture;
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;
        var cirYar = dr.basePts.circumscribedY;
        var insYar = dr.basePts.inscribedY;
        if( item.type === 'base' ) {
            var iIx = item.index;
            let blist = dr.basePts.list;
            let insPy = -( insYar[iIx] - yoff ) / scale;
            let cirPy = -( cirYar[iIx] - yoff ) / scale;
            let posAx = ( blist[0].x - xoff )  / scale;
            let posBx = ( blist[1].x - xoff )  / scale;
            let posCx = ( blist[2].x - xoff )  / scale;
            let posDx = ( blist[3].x - xoff )  / scale;
            let posEx = ( blist[4].x - xoff )  / scale;
            switch( iIx ) {
            case 0 : var pname = 'A';
                        var pnameFun = 'a'; //right on the curve
                        var pnameLow_ = 'K'; //min of the interval
                        rg[ pnameLow_ ].pos[0] = posAx;
                        //rg[ pname ].pos[0];
                        rg[ pnameLow_ ].pos[1] = insPy;

                        var pnameLow_ = 'bk'; //min of the interval
                        rg[ pnameLow_ ].pos[0] = posBx;
                        //rg[ 'B' ].pos[0];
                        rg[ pnameLow_ ].pos[1] = insPy;

                        var pnameTop_ = 'l'; //min of the interval
                        rg[ pnameTop_ ].pos[0] = posBx;
                        rg[ pnameTop_ ].pos[1] = cirPy;
                     break;
            case 1 : var pname = 'B';
                     ////optional names
                     var pnameFun = 'b'; //right on the curve
                     var pnameLow_ = 'L'; //min of the interval
                     rg[ pnameLow_ ].pos[0] = posBx;
                     rg[ pnameLow_ ].pos[1] = insPy;

                    var pnameTop_ = 'm'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = posCx;
                    //rg[ 'C' ].pos[0];
                    rg[ pnameTop_ ].pos[1] = cirPy;
                    break;
            case 2 : var pname = 'C';
                     ////optional names
                     var pnameFun = 'c';
                     var pnameLow_ = 'M'; //min of the interval
                     rg[ pnameLow_ ].pos[0] = posCx;
                     rg[ pnameLow_ ].pos[1] = insPy;

                    var pnameTop_ = 'n'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = posDx;
                    rg[ pnameTop_ ].pos[1] = cirPy;
                    break;
            case 3 : var pname = 'D';
                     ////optional names   
                     var pnameFun = 'd';
                    var pnameTop_ = 'o'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = posEx;
                    rg[ pnameTop_ ].pos[1] = cirPy;
                     var pnameLow_ = 'G'; //min of the interval
                     rg[ pnameLow_ ].pos[0] = posDx;
                     rg[ pnameLow_ ].pos[1] = insPy;
                     
                     //--------------------------------------------
                     // //\\ making low boundary of difference-rect
                     //--------------------------------------------
                     rg.e.pos[0] = posDx;
                     rg.e.pos[1] = insPy;
                     //--------------------------------------------
                     // \\// making low boundary of difference-rect
                     //--------------------------------------------
                     break;
            case 4 :
                     var pname = 'E';
                     //--------------------------------------------
                     // //\\ making low boundary of difference-rect
                     //--------------------------------------------
                     rg.p.pos[0] = posEx;
                     //this fails: bases are too low:
                     //( blist[4].y - yoff )  / scale;
                     //insPy;
                     rg.p.pos[1] = rg.e.pos[1];
                     //--------------------------------------------
                     // \\// making low boundary of difference-rect
                     //--------------------------------------------
                     break;
            }
        }
        if( pname ) {
            var iY = item.type === 'base' ? dr.yVariations.yRef : item.y;
            ////apparently convert from svg-space to model-space
            ////apparently program and numModel.f made in svg-space and
            ////not in gemetrical-model-space;
            rg[ pname ].pos[0] = (item.x - xoff) / scale;
            rg[ pname ].pos[1] = -(iY - yoff) / scale;
            ////optional names
            if( pnameFun ) {
                rg[ pnameFun ].pos[0] = rg[ pname ].pos[0];
                rg[ pnameFun ].pos[1] = -( numModel.f( item.x ) - yoff ) / scale;
            }
        }
    }


    function syncPoints() {
        let videoMode = amode.aspect === 'video';
        let view = sdata.view;
        let isFig = !!view.isFigureChecked;
        let isIn = !!view.isInscribed;
        let isCir = !!view.isCircumscribed;
        let onlyFig = !isIn&&!isCir;
        {
            let s = videoMode || onlyFig;
            [ 'a', 'b', 'c', 'd', 'A', 'B', 'C', 'D', 'E',
            ].forEach( function( l ) {
                    rg[ l ].undisplay = s;
                    rg[ l ].doPaintPname = !s;
            });
            [ 'AE', 'AB', 'BC', 'CD' ].forEach( function( l ) {
                    rg[ l ].undisplay = s;
            });
            [ 'Bb', 'Cc', 'Dd', 'oE' ].forEach( function( l ) {
                    rg[ l ].undisplay = s;
            });
            rg.Aa.undisplay = videoMode || (!isCir && isIn && !isFig);
            if( !isFig && isIn && !isCir ) {
                rg["a"].undisplay = true;
            }
        }
        let doset = videoMode || !isIn;
        rg.K.undisplay = doset;
        rg.L.undisplay = doset;
        rg.M.undisplay = doset;
        rg.gG.undisplay = doset;
        rg.dM.undisplay = doset;
        rg.cL.undisplay = doset;
        rg["K,bk"].undisplay = doset;
        rg.AK.undisplay = doset;
        rg.LB.undisplay = doset;
        rg.MC.undisplay = doset;
        rg.GD.undisplay = doset;
        rg.gE.undisplay = doset;

        doset = videoMode || !isCir;
        rg.l.undisplay = doset;
        rg.m.undisplay = doset;
        rg.n.undisplay = doset;
        rg.o.undisplay = doset;
        rg.la.undisplay = doset;
        rg["m,bk"].undisplay = doset;
        rg.nc.undisplay = doset;
        rg.od.undisplay = doset;
        //right sides:
        rg.lB.undisplay = doset;
        rg.mC.undisplay = doset;
        rg.nD.undisplay = doset;
        rg.oE.undisplay = doset;

        //order of statements seems vital
        [0,1,2,3,4].forEach( ix => { syncPoint( dr.basePts.list[ ix ] ); });
        dr.ctrlPts.forEach( item => { syncPoint( item ); });

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
        rg.g.pos[0] = rg.E.pos[0];
        rg.g.pos[1] = rg.G.pos[1];

        //--------------------------------------
        // //\\ majorant
        //--------------------------------------
        {
            let l2 = fconf.sappId.indexOf('lemma2') === 0;
            let checked = amode.logic_phase !== 'claim';
            rg.F.undisplay = !checked || videoMode || onlyFig || l2;
            rg.f.undisplay = !checked || videoMode || onlyFig || l2;
            rg.AF.undisplay = !checked;
        }
        //--------------------------------------
        // \\// majorant
        //--------------------------------------
    }
}) ();

