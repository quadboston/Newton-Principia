( function () {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var sapp        = sn('sapp'); 
    var fapp        = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);

    var ss          = sn('ss',fapp);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000






    function setModule()
    {
        var l23         = ss;

        var gui         = sn('gui', l23 );
        var guicon      = sn('guiConstruct', gui );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );
        var sacf        = sconf;

        guicon.constructSingle_dom  = constructSingle_dom;
        guicon.constructFigure      = constructFigure;
        return;
        //*************************************
        // execution end
        //*************************************








        //======================================
        // //\\ constructFigure
        //======================================
        function constructFigure()
        {
            var baseMax = sacf.baseMax;
	        // labels
	        /*constructLabels(dr.curvLabels.list, "figure tostroke", 'abcde');
	        constructLabels(dr.baseLabels.list, "figure tostroke", 'ABCDE');
	        constructLabels(dr.leftLabels.list, "inscribed tostroke", 'KLMNO');
	        constructLabels(dr.righLabels.list, "circumscribed tostroke", 'lmnop');
            */
            
	        // rects
	        constructShapesList("rect", dr.righRects, baseMax, "circumscribed rect tofill tostroke");
	        constructShapesList("rect", dr.leftRects, baseMax, "inscribed rect tofill tostroke");

	        // rectangle points
	        if (appstate.showRectPts) {
		        constructPts(dr.leftPts, baseMax, "inscribed tofill tostroke", sacf.FINEPTS_RADIUS);
		        constructPts(dr.righPts, baseMax, "circumscribed tofill tostroke", sacf.FINEPTS_RADIUS);
		        constructPts(dr.curvPts, baseMax, "figure tofill tostroke", sacf.FINEPTS_RADIUS);
	        }
	        constructBasePts_dom(appstate.showRectPts, dr.basePts);

	        // control points
            var ctrlPts = dr.ctrlPts;
	        for (var i=0, len=sacf.ctrlPtXYs_js.length; i < len; i++) {
		        dr.ctrlPts.push( constructCtrlPt( i ) );
	        }
        }
        //======================================
        // \\// constructFigure
        //======================================













        //==================================
        // //\\ constructs points and shapes
        //==================================
        function constructBasePts_dom( show, basePts )
        {
            //.this restriction is done via css ... the rect is simply hidden
	        //.if( sapp.lemmaNumber === 3 ) {
            //   constructEndBasePt_dom(basePts, show ? "figure" : "todm-fix-this");

            constructEndBasePt_dom(basePts, show ? "figure" : "todm-fix-this");

	        for (var i=1, len=sacf.baseMax; i <= len; i++) {
      		    pt = constructDraggablePt_dom( "base", i );
		        if( sapp.lemmaNumber === 3 ) {
		            guiup.set_pt2movable( pt ); //todo-patch-disable-base-drag 1 of 2
                }
      		    basePts.list.push( pt );
                //ccc( 'must be full p', pt ) todo
	        }
            function constructEndBasePt_dom( basePts, style )
            {
	            var pdom = constructSingleInList_dom( "circle", basePts.list, style );
                //.makes end point of the same structure as movable points
                basePts.list[ basePts.list.length-1 ] = { dom:pdom };

                // //\\ patch: todm-fix-this
	            //pdom.setAttributeNS(null, "r", sacf.FINEPTS_RADIUS);
	            pdom.setAttributeNS(null, "stroke", 'transparent');
	            pdom.setAttributeNS(null, "fill", 'transparent');
                // \\// patch: todm-fix-this
            }
        };


        ///creates svg-circle-tag with unit-transform and and appends it to svg-root
        function constructDraggablePt_dom( type, i )
        {
            var key  = type + i;
	        var pdom = document.createElementNS( sacf.svgns, "circle");
	        dr.svgSeg.appendChild( pdom );
	        pdom.setAttributeNS( null, "id", key );
	        pdom.setAttributeNS( null, "draggable", "false" ); //todo ... redundant? ...
            var draggable = { dom:pdom, type:type, index:i, id:key };
            dr.movables[ key ] = draggable;
            return draggable;
        }

        ///dom
        function constructCtrlPt( i )
        {
            var ctrlPtXYs_js = sacf.ctrlPtXYs_js; 
	        var pt = constructDraggablePt_dom( "ctrl", i );
            var pdom = pt.dom;
	        //pdom.setAttributeNS(null, "class", "movable ctrlPt tofill");
	        pdom.setAttributeNS(null, "class", "movable ctrlPt");
	        //$$.$(pdom).addClass("movable ctrlPt tofill");


//start here: ccc( 'ctrl pt=', pt )
	        pdom.setAttributeNS(null, "cx", ctrlPtXYs_js[i].x);
	        pdom.setAttributeNS(null, "cy", ctrlPtXYs_js[i].y);
	        pdom.setAttributeNS(null, "r", sacf.CTRL_RADIUS);
            pt.x = ctrlPtXYs_js[i].x;
            pt.y = ctrlPtXYs_js[i].y;
	        return pt;
        }

        // //\\ constructs shapes
        ///dom
        function constructPts( list, n, style, r )
        {
	        for (var i=0; i<n+list.offset; i++){
		        var shape = constructSingleInList_dom("circle", list.list, style);
		        shape.dom.setAttributeNS(null, "r", r);
	        }
        }
        ///dom
        function constructSingleInList_dom( shapeType, list, classStyle )
        {
	        var sdom = constructSingle_dom( shapeType, classStyle );
	        list.push( sdom );
	        return sdom;
        }
        function constructSingle_dom( shapeType, classStyle, textContent )
        {
	        var sdom = document.createElementNS( sacf.svgns, shapeType);
	        sdom.setAttributeNS(null, "class", classStyle);
	        sdom.setAttributeNS(null, "visibility", "hidden");
            if( textContent ) { sdom.textContent = textContent; }
	        dr.svgSeg.appendChild( sdom );
	        return sdom;
        }
        ///dom
        function constructShapesList(shape, list, n, style) {
	        for (var i=0; i<n+list.offset; i++){
		        constructSingleInList_dom(shape, list.list, style);
	        }
        }
        ///dom
        function constructLabels(list, style, content) {
	        for (var i=0; i<content.length; i++){
		        var l = constructSingleInList_dom("text", list, style+" label");
		        l.textContent = content.slice(i, i+1);
	        }
        }
        // \\// constructs shapes
        //==================================
        // \\// constructs points and shapes
        //==================================
    }
}) ();

