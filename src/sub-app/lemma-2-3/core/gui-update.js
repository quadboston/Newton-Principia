( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);
    var sacf    = sconf;

    var ss          = sn('ss',fapp);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );
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
            xy2shape( item, "x", x, "y", y );
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
            pt.dom.setAttributeNS(null, "r", sacf.MOVABLE_BASE_RADIUS);
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
	        dr.polylineCurve.setAttribute( "points",curveMicroPts.join(" ") );
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


	        l23.adjustVisibilityForBaseDelta();
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
}) ();

