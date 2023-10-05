( function () {
    var {
        ///standard levels of application
        sn, $$, svgNS,
        fapp, fconf, sconf,
        sDomF,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2               = sn('stdL2', fapp );
    var gui                 = sn('gui', stdL2 );
    var guicon              = sn('guiConstruct', gui );
    var guiup               = sn('guiUpdate',gui);
    var appstate            = sn('appstate', stdL2 );
    var dr                  = sn('datareg', stdL2 );
    return;












    function setModule()
    {
        guicon.makeShape_parlessDom  = makeShape_parlessDom;
        guicon.constructFigure_tillExtraOffset_parlessDom       = constructFigure_tillExtraOffset_parlessDom;
        guicon.buildsControlPoints   = buildsControlPoints;
        guicon.buildsRect8BasePoints = buildsRect8BasePoints;
    }

    function constructFigure_tillExtraOffset_parlessDom()
    {
        // labels
        /*constructLabels(dr.curvLabels.list, "figure tostroke", 'abcde');
        constructLabels(dr.baseLabels.list, "figure tostroke", 'ABCDE');
        constructLabels(dr.leftLabels.list, "inscribed tostroke", 'KLMNO');
        constructLabels(dr.righLabels.list, "circumscribed tostroke", 'lmnop');
        */
        // rects
        constructShapesList_tillExtraOffset_parlessDom("rect", dr.circRects, sconf.baseMax,
            "tp-circumscribed-rectangles circumscribed rect tofill");
        constructShapesList_tillExtraOffset_parlessDom("rect", dr.InscrRects, sconf.baseMax,
            "tp-inscribed-rectangles inscribed rect tofill");
    }

    ///builds ...
    function buildsRect8BasePoints()
    {
        // rectangle points
        if (appstate.showRectPts) {
	        //constructPts_tillOffset_parslessDom(dr.leftPts, baseMax, "inscribed tofill", sconf.FINEPTS_RADIUS);
	        constructPts_tillOffset_parslessDom(dr.leftPts, baseMax, "inscribed", sconf.FINEPTS_RADIUS);
	        constructPts_tillOffset_parslessDom(dr.righPts, baseMax, "circumscribed", sconf.FINEPTS_RADIUS);
	        constructPts_tillOffset_parslessDom(dr.curvPts, baseMax, "figure", sconf.FINEPTS_RADIUS);
        }
        constructBasePts_domParless(appstate.showRectPts, dr.basePts);
    }

    ///builds list of control points, dr.ctrlPts and updates construction of
    ///bookkeeper dr.movables,
    function buildsControlPoints()
    {
        // control points
        var ctrlPts = dr.ctrlPts;
        for (var i=0, len=sconf.ctrlPtXYs_js.length; i < len; i++) {
	        dr.ctrlPts.push( constructCtrlPt( i ) );
        }
    }


    //==================================================
    // //\\ shapes in list
    //==================================================
    ///apparently, base points from second to "D" are
    ///draggable (movable) and also include draggable point "E" = end point,
    function constructBasePts_domParless( show, basePts )
    {
        //.this restriction is done via css ... the rect is simply hidden
        //.if( fconf.sappId === 'lemma3' ) {
        //   constructEndBasePt_parslessDom_inList(basePts, show ? "figure" : "todm-fix-this");

        constructEndBasePt_parslessDom_inList(basePts, show ? "figure" : "todm-fix-this");

        for (var i=1, len=sconf.baseMax; i <= len; i++) {
  		    pt = makeDragP_parlessDom( "base", i );
	        if( fconf.sappId === 'lemma3' && i < sconf.draggableBasePoints ) {
                //todo-patch-disable-base-drag 1 of 2
                guiup.sets_pt2movable_2_tpl8domParless( pt );
            }
            pt.dom.style.fill = 'rgba(255,255,255,1)';
  		    basePts.list.push( pt );
        }
        return;

        function constructEndBasePt_parslessDom_inList( basePts, style )
        {
            var pdom = makeS_inList_parlessDom( "circle", basePts.list, style );
            //.makes end point of the same structure as movable points
            basePts.list[ basePts.list.length-1 ] = { dom:pdom };

            // //\\ patch: todm-fix-this
            //pdom.setAttributeNS(null, "r", sconf.FINEPTS_RADIUS);
            pdom.setAttributeNS(null, "stroke", 'blue');
            pdom.setAttributeNS(null, "stroke-width", '5px');
            pdom.setAttributeNS(null, "fill", 'rgba(255,255,255,1)');
            // \\// patch: todm-fix-this
        }
    };

    //---------------------------------------------------------
    // //\\ builds generic lists
    //---------------------------------------------------------
    ///dom, constructs generic shapeType,
    function constructShapesList_tillExtraOffset_parlessDom( shapeType, list, n, style ) {
        for (var i=0; i<n+list.offset; i++){
	        makeS_inList_parlessDom( shapeType, list.list, style );
        }
    }
    ///dom, constructs "circle" type,
    function constructPts_tillOffset_parslessDom( list, n, classStyle, r )
    {
        for (var i=0; i<n+list.offset; i++){
	        var shape = makeS_inList_parlessDom( "circle", list.list, classStyle );
	        shape.dom.setAttributeNS( null, "r", r );
        }
    }
    ///dom, constructs "text" type,
    function constructLabels(list, style, content) {
        for (var i=0; i<content.length; i++){
	        var l = makeS_inList_parlessDom( "text", list, style+" label" );
	        l.textContent = content.slice(i, i+1);
        }
    }
    ///dom, constructs shapeType in given list
    function makeS_inList_parlessDom( shapeType, list, classStyle )
    {
        var sdom = makeShape_parlessDom( shapeType, classStyle );
        list.push( sdom );
        return sdom;
    }
    //---------------------------------------------------------
    // \\// builds generic lists
    // \\// shapes in list
    //==================================================



    //==================================
    // //\\ single shape
    //==================================

    ///dom and
    ///updated bookkeeper: dr.movables[ key ] = draggable
    function constructCtrlPt( i )
    {
        var ctrlPtXYs_js = sconf.ctrlPtXYs_js;
        //pt = dr.movables[ type + i ]
        var pt = makeDragP_parlessDom( "ctrl", i );
        var pdom = pt.dom;

        //pdom.setAttributeNS(null, "class", "movable ctrlPt tofill");
        pdom.setAttributeNS(null, "class", "movable ctrlPt");

        pdom.setAttributeNS(null, "cx", ctrlPtXYs_js[i].x);
        pdom.setAttributeNS(null, "cy", ctrlPtXYs_js[i].y);
        pdom.setAttributeNS(null, "r", sconf.CTRL_RADIUS);
        //.todm patch
        pdom.style.fill = 'rgba(255,255,255,1)';
        pdom.style.stroke = sDomF.getFixedColor( 'given' );
        pdom.style[ 'stroke-width' ] = '1px';
        pt.x = ctrlPtXYs_js[i].x;
        pt.y = ctrlPtXYs_js[i].y;
        return pt;
    }

    ///does only dom
    function makeShape_parlessDom( shapeType, classStyle, textContent )
    {
        var sdom = document.createElementNS( svgNS, shapeType);
        sdom.setAttributeNS(null, "class", classStyle);
        sdom.setAttributeNS(null, "visibility", "hidden");
        if( textContent ) { sdom.textContent = textContent; }
        stdMod.svgScene.appendChild( sdom );
        return sdom;
    }

    ///does only dom and bookkeeper, dr.movables[ key ] = draggable,
    ///creates svg-circle-tag with unit-transform and and appends it to svg-root
    function makeDragP_parlessDom( type, i )
    {
        var key  = type + i;
        var pdom = document.createElementNS( svgNS, "circle");
        stdMod.svgScene.appendChild( pdom );
        pdom.setAttributeNS( null, "id", key );
        pdom.setAttributeNS( null, "draggable", "false" ); //todo ... redundant? ...
        var draggable = { dom:pdom, type:type, index:i, id:key };
        dr.movables[ key ] = draggable;
        return draggable;
    }
    //==================================
    // \\// single shape
    //==================================


}) ();

