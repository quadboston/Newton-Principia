( function () {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
	var bsl	        = ns;

    var fapp        = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);

    var ss          = sn('ss',fapp);

    var sapp        = sn('sapp'); 
    var srg_modules = sn('srg_modules', sapp);
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

        guicon.makeShape  = makeShape;
        guicon.constructFigure = constructFigure;
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
	        constructShapesList("rect", dr.righRects, baseMax,
                "tp-circumscribed-rectangles circumscribed rect tofill");
	        constructShapesList("rect", dr.leftRects, baseMax,
                "tp-inscribed-rectangles inscribed rect tofill");

	        // rectangle points
	        if (appstate.showRectPts) {
		        //constructPts(dr.leftPts, baseMax, "inscribed tofill", sacf.FINEPTS_RADIUS);
		        //constructPts(dr.righPts, baseMax, "circumscribed tofill", sacf.FINEPTS_RADIUS);
		        //constructPts(dr.curvPts, baseMax, "figure tofill", sacf.FINEPTS_RADIUS);
		        constructPts(dr.leftPts, baseMax, "inscribed", sacf.FINEPTS_RADIUS);
		        constructPts(dr.righPts, baseMax, "circumscribed", sacf.FINEPTS_RADIUS);
		        constructPts(dr.curvPts, baseMax, "figure", sacf.FINEPTS_RADIUS);
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













        //==================================================
        // //\\ shapes in list
        //==================================================
        function constructBasePts_dom( show, basePts )
        {
            //.this restriction is done via css ... the rect is simply hidden
	        //.if( fconf.sappId === 'lemma3' ) {
            //   constructEndBasePt_dom(basePts, show ? "figure" : "todm-fix-this");

            constructEndBasePt_dom(basePts, show ? "figure" : "todm-fix-this");

	        for (var i=1, len=sacf.baseMax; i <= len; i++) {
      		    pt = makeDragP( "base", i );
		        if( fconf.sappId === 'lemma3' ) {
		            guiup.set_pt2movable( pt ); //todo-patch-disable-base-drag 1 of 2
                }
                pt.dom.style.fill = 'rgba(255,255,255,0.3)';
      		    basePts.list.push( pt );
                //ccc( 'must be full p', pt ) todo
	        }
            function constructEndBasePt_dom( basePts, style )
            {
	            var pdom = makeS_inList( "circle", basePts.list, style );
                //.makes end point of the same structure as movable points
                basePts.list[ basePts.list.length-1 ] = { dom:pdom };

                // //\\ patch: todm-fix-this
	            //pdom.setAttributeNS(null, "r", sacf.FINEPTS_RADIUS);
	            pdom.setAttributeNS(null, "stroke", 'blue');
	            pdom.setAttributeNS(null, "stroke-width", '5px');
	            pdom.setAttributeNS(null, "fill", 'rgba(255,255,255,0.3)');
                // \\// patch: todm-fix-this
            }
        };
        ///dom
        function constructPts( list, n, classStyle, r )
        {
	        for (var i=0; i<n+list.offset; i++){
		        var shape = makeS_inList("circle", list.list, classStyle);
		        shape.dom.setAttributeNS(null, "r", r);
	        }
        }
        ///dom
        function constructShapesList(shape, list, n, style) {
	        for (var i=0; i<n+list.offset; i++){
		        makeS_inList(shape, list.list, style);
	        }
        }
        ///dom
        function constructLabels(list, style, content) {
	        for (var i=0; i<content.length; i++){
		        var l = makeS_inList("text", list, style+" label");
		        l.textContent = content.slice(i, i+1);
	        }
        }
        ///dom
        function makeS_inList( shapeType, list, classStyle )
        {
	        var sdom = makeShape( shapeType, classStyle );
	        list.push( sdom );
	        return sdom;
        }
        //==================================================
        // \\// shapes in list
        //==================================================



        //==================================
        // //\\ single shape
        //==================================
        ///dom
        function constructCtrlPt( i )
        {
            var ctrlPtXYs_js = sacf.ctrlPtXYs_js; 
	        var pt = makeDragP( "ctrl", i );
            var pdom = pt.dom;

	        //pdom.setAttributeNS(null, "class", "movable ctrlPt tofill");
	        pdom.setAttributeNS(null, "class", "movable ctrlPt");

	        pdom.setAttributeNS(null, "cx", ctrlPtXYs_js[i].x);
	        pdom.setAttributeNS(null, "cy", ctrlPtXYs_js[i].y);
	        pdom.setAttributeNS(null, "r", sacf.CTRL_RADIUS);
            //.todm patch
            pdom.style.fill = 'rgba(255,255,255,0.7)';
            pdom.style.stroke = 'red';
            pdom.style[ 'stroke-width' ] = '1px';
            pt.x = ctrlPtXYs_js[i].x;
            pt.y = ctrlPtXYs_js[i].y;
	        return pt;
        }

        function makeShape( shapeType, classStyle, textContent )
        {
	        var sdom = document.createElementNS( sacf.svgns, shapeType);
	        sdom.setAttributeNS(null, "class", classStyle);
	        sdom.setAttributeNS(null, "visibility", "hidden");
            if( textContent ) { sdom.textContent = textContent; }
	        dr.svgSeg.appendChild( sdom );
	        return sdom;
        }

        ///creates svg-circle-tag with unit-transform and and appends it to svg-root
        function makeDragP( type, i )
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
        //==================================
        // \\// single shape
        //==================================

    }
}) ();

