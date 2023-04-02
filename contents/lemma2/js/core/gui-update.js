( function () {
    var {
        sn,
        sconf, ss, sDomN, ssF,
    } = window.b$l.apptree({
        setModule,
        stdModExportList :
        {
            syncPoint,
            syncPoints,
        },
    });
    var dr          = sn('datareg', ss );
    var numModel    = sn('numModel', ss );
    return;





    function setModule()
    {
        var study       = sn('study', ss );
        var gui         = sn('gui', ss );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', ss );
        var dr          = sn('datareg', ss );
        var numModel    = sn('numModel', ss );
        var sdata       = sn('sdata', study );
        //======================================
        // //\\ exports module
        //======================================
        Object.assign( guiup, {

            updatePtsRectsLabelsAreas   : updatePtsRectsLabelsAreas,
            updateFigureBasicsJS        : updateFigureBasicsJS,
            normalizedStr               : normalizedStr,

            set_pt2movable  : set_pt2movable,
	        updateLabel     : updateLabel,
	        updateRectLike  : updateRectLike,
            xy2shape        : xy2shape,
            xy_2_xy8shape   : xy_2_xy8shape,
            calculate8paintCurve_8_paintAxes : calculate8paintCurve_8_paintAxes
        });
        //======================================
        // \\// exports module
        //======================================


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
        function updateLabel( item, x, y )
        {
            //xy2shape( item, "x", x, "y", y );
        }
        ///updates item with rectangular parameters x, y, width, height
        function updateRectLike(item, x, y, width, height) {
	        xy2shape(item, "x", x, "y", y);
	        item.setAttributeNS(null, "width", width);
	        item.setAttributeNS(null, "height", height);
        }


        function set_pt2movable( pt )
        {
            pt.dom.setAttributeNS(null, "class", "movable figure");
            pt.dom.setAttributeNS(null, "r", sconf.MOVABLE_BASE_RADIUS);
            pt.movable = true;
        }


        function calculate8paintCurve_8_paintAxes()
        {
            var ff = numModel.f;

            ///calculates curve
	        var delta           = 3;
	        var curveMicroPts   = [];
            var figureArea      = 0;
            var fb              = dr.figureBasics;
	        var oldY            = 2 * fb.baseY-ff(fb.minX);
	        for (var xx = fb.minX; xx < fb.maxX; xx+=delta) {
		        var yy = ff( xx );
		        curveMicroPts.push([xx,yy]);
		        figureArea += (delta*(fb.baseY-(yy+oldY)/2));
		        oldY = yy;
	        }

            //:paints curve
	        var yy = ff( fb.maxX );
	        curveMicroPts.push([fb.maxX,yy]);
            dr.figureArea = figureArea + ((fb.maxX-xx+delta)*(fb.baseY-(yy+oldY)/2));

            var wwPL = document.getElementById( 'polylineCurve' );
	        wwPL.setAttribute( "points",curveMicroPts.join(" ") );
            //:paints axes
	        var yy = fb.baseY;
	        var x1 = fb.minX;
	        var x2 = fb.maxX;
	        xy2lineShape( dr.baseAxis,x1,yy,x2,yy );
	        xy2lineShape( dr.wallL,x1,yy,x1, ff(x1) );
	        xy2lineShape( dr.wallR,x2,yy,x2, ff(x2) );


            //=============================================
            // //\\ paints figureInternalArea
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
            // \\// paints figureInternalArea
            //=============================================


            // //\\ sets curves type

	        ss.adjustVisibilityForBaseDelta();

            // //\\ resets app modes
            var wfirst = curveMicroPts[0];
            var wlast = curveMicroPts[curveMicroPts.length-1];
            //:note: y axis is apparently flipped, bottom > top
            //:dr.figureBasics.deltaOnLeft is already calculated and
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
        function updateFigureBasicsJS()
        {
            var ctrlPts = dr.ctrlPts;
	        var max = numModel.ctrlPt_2_maxIx();
	        var min = numModel.ctrlPt_2_minIx();
            var fb  = dr.figureBasics;
	        fb.minX = ctrlPts[min].x;
	        fb.maxX = ctrlPts[max].x;
            
	        if (ctrlPts[max].y > ctrlPts[min].y) {
		        fb.baseY = ctrlPts[max].y;
		        fb.deltaOnLeft = true;
		        dr.leftLabels.offset = -1;
		        dr.righLabels.visOffset = 0;
		        dr.curvLabels.visOffset = 0;
		        dr.curvLabels.offset = 0;
	        } else {
		        fb.baseY = ctrlPts[min].y;
		        fb.deltaOnLeft = false;
		        dr.leftLabels.offset = 0;
		        dr.righLabels.visOffset = 1;
		        dr.curvLabels.visOffset = 1;
		        dr.curvLabels.offset = 1;
	        }

            //todm remove: experiment:
            //has( stdMod.rg, 'baseSlider' ) && ssF.pos2pointy( 'baseSlider' );
        }

        function updateLeft(i,width,x,y,nextX,nextY)
        {
            var fb  = dr.figureBasics;
	        if (appstate.showRectPts)
		        guiup.xy2shape( dr.leftPts.list[i], "cx", x, "cy", nextY ); 
	        guiup.updateRectLike( dr.leftRects.list[i], x, Math.min(nextY, fb.baseY), width, Math.abs( fb.baseY-nextY));
	        if (i< dr.bases-1 && i< dr.leftLabels.list.length) {
		        guiup.updateLabel( dr.leftLabels.list[i], x-20, nextY+3);
	        }
	        //todo why?: already done: dr.leftRects.list[i].setAttributeNS(null, "class", "inscribed rect");
        }
        function updateRigh(i,width,x,y,nextX,nextY)
        {
            var fb  = dr.figureBasics;
	        if (appstate.showRectPts)
		        guiup.xy2shape( dr.righPts.list[i], "cx", nextX, "cy", y );
	        guiup.updateRectLike( dr.righRects.list[i], x, Math.min(y, fb.baseY), width, Math.abs( fb.baseY-y));
	        if (i<dr.righLabels.list.length) {
		        guiup.updateLabel( dr.righLabels.list[i], nextX-5, y-10);
	        }		
        }
        function updatePts(i, x)
        {
            var fb  = dr.figureBasics;
	        if (!appstate.movingBasePt) {
		        guiup.xy_2_xy8shape( dr.basePts.list[i], "cx", x, "cy", fb.baseY );
	        }
	        if (appstate.showRectPts) {
		        guiup.xy_2_xy8shape( dr.curvPts.list[i], "cx", x, "cy", numModel.f(x) );
	        }
	        if (i< dr.baseLabels.list.length) {
		        guiup.updateLabel( dr.baseLabels.list[i], x-5, fb.baseY+20 );
	        }
        }
        function updatePtsRectsLabelsAreas()
        {
            var fb  = dr.figureBasics;
	        var x = fb.minX;
            var bases = dr.bases;

        	//.var useInitialWidest = true; //kvk: I don't understand what is this for ... probably need more background on "Principia"
	        //.gui.widthStart(figureBasics, bases);
	        dr.sumWidth = numModel.calcSumBaseWidth( bases );

            var circumscribedArea = 0
	        var inscribedArea = circumscribedArea;
	        for (var i=0; i<bases; i++) {
		        var width = numModel.nextWidth(i);
		        var y = numModel.f(x);
		        var nextX = x + width;
		        var nextY = numModel.f(nextX);
		        if (i< dr.curvLabels.list.length) {
			        guiup.updateLabel( dr.curvLabels.list[i], x-15, y+(i==0?-5:15));
		        }
		        updateRigh(i,width,x,y,nextX,nextY);
		        circumscribedArea += (width*( fb.baseY-y));
		        updateLeft(i,width,x,y,nextX,nextY);
		        inscribedArea += width*( fb.baseY-nextY);
		        if (i< dr.righLabels.list.length) {
			        guiup.updateLabel( dr.righLabels.list[i], nextX-5, y-10);
			        guiup.updateLabel( dr.leftLabels.list[i], x-20, nextY+3);
		        }
		        updatePts(i, x);
		        x += width;
	        }
	        updatePts( bases, x);
	        gui.widthEnd( dr.basePts.list[bases].dom, appstate.showRectPts, sdata.view );
	        document.getElementById("figAmt").innerHTML = ((Math.sign( dr.figureArea )==-1)?"-":"" )+ "100.0";

	        //tod? document.getElementById("inAmt").innerHTML = normalizedStr( inscribedArea, dr.figureArea);
	        document.getElementById("inAmtd").innerHTML = normalizedStr( inscribedArea, dr.figureArea);

	        //tod? document.getElementById("circAmt").innerHTML = normalizedStr( circumscribedArea, dr.figureArea);
	        document.getElementById("circAmtd").innerHTML = normalizedStr( circumscribedArea, dr.figureArea);
        }

        function normalizedStr( amt )
        {
	        return (100*amt/Math.abs(dr.figureArea)).toFixed(1);
        }
        //========================================
        // \\// possibly move to gui-update module
        //========================================

    }

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
            case 1 : var pname = 'B';
                     var pnameFun = 'b';
                     var pnameTop = 'l';
                     var pnameLow = 'K';
                     var previousItem = dr.basePts.list[ 0 ];
                     break;
            case 2 : var pname = 'C';
                     var pnameFun = 'c';
                     var pnameTop = 'm';
                     var pnameLow = 'L';
                     var previousItem = dr.basePts.list[ 1 ];
                     break;
            case 3 : var pname = 'D';
                     var pnameFun = 'd';
                     var pnameTop = 'n';
                     var pnameLow = 'M';
                     var previousItem = dr.basePts.list[ 2 ];
                     break;
            case 4 : if( dr.bases > 4 ) {
                        var pname = 'E';
                        var pnameTop = 'o';
                        var previousItem = dr.basePts.list[ 3 ];
                     }
                     break;
            }
        }
        if( pname ) {
            var xoff = sconf.originX_onPicture;
            var yoff = sconf.originY_onPicture;
            var scale = sconf.mod2inn_scale;
            rg[ pname ].pos[0] = (item.x - xoff) / scale;
            rg[ pname ].pos[1] = -(item.y - yoff) / scale;

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
        [0,1,2,3,4].forEach( ix => { syncPoint( dr.basePts.list[ ix ] ); });

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

        // //\\ majorant rect
        var xoff = sconf.originX_onPicture;
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;

        /*
        var fb = dr.figureBasics; 
        rg.F.pos[1] = 0;
        var Fx = dr.widest + ( dr.widest < 0 ? fb.maxX : fb.minX );
        rg.F.pos[0] = ( Fx - xoff ) / scale;
        rg.f.pos[0] = rg.F.pos[0];
        rg.f.pos[1] = -( numModel.f( Fx ) - yoff ) / scale;
        */

        var { x, y, rightX, rightY, F, f } = dr.widestRect;
        rg.F.pos[0] = ( F - xoff ) / scale;
        rg.F.pos[1] = 0;
        rg.f.pos[0] = rg.F.pos[0];
        rg.f.pos[1] = -( f - yoff ) / scale;
        // \\// majorant rect
    }

}) ();

