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
        Object.assign( guicon,
        {
            constructsRects_tillExtraOffset_parlessDom,
            constructsControlPoints,
            constructBasePts_domParless,
        });
    }

    //======================================================
    // //\\ rects
    //======================================================
    function constructsRects_tillExtraOffset_parlessDom()
    {
        makes_rects( dr.circRects, "tp-circumscribed-rectangles circumscribed");
        makes_rects( dr.InscrRects, "tp-inscribed-rectangles inscribed");
    }
    function makes_rects( listWrap, classStyle )
    {
        classStyle += ' rect tofill';
        let BASE_MAX_NUM = sconf.BASE_MAX_NUM;
        let list = listWrap.list;
        let len = BASE_MAX_NUM+listWrap.offset;
        for (var i=0; i<len; i++){
            list.push( makeSType( "rect", classStyle ) );
        }
    }
    //======================================================
    // \\// rects
    //======================================================


    
    
    //======================================================
    // //\\ figure and base contol points
    //======================================================
    ///builds list of control points, dr.ctrlPts and updates construction of
    ///bookkeeper dr.movables,
    function constructsControlPoints()
    {
        // control points
        var ctrlPts = dr.ctrlPts;
        for (var i=0, len=sconf.ctrlPtXYs_js.length; i < len; i++) {
            var ctrlPtXYs_js = sconf.ctrlPtXYs_js;
            //pt = dr.movables[ type + i ]
            var pt = makeDragP_tpl( "ctrl", i );
            var pdom = pt.dom;

            pdom.setAttributeNS(null, "class", "movable ctrlPt");
            pdom.setAttributeNS(null, "cx", ctrlPtXYs_js[i].x);
            pdom.setAttributeNS(null, "cy", ctrlPtXYs_js[i].y);
            pdom.setAttributeNS(null, "r", sconf.CTRL_RADIUS);
            //.todm patch
            pdom.style.fill = 'rgba(255,255,255,1)'; //makes the point hollow
            pdom.style.stroke = sDomF.getFixedColor( 'curve' );
            pdom.style[ 'stroke-width' ] = '1px';
            pt.x = ctrlPtXYs_js[i].x;
            pt.y = ctrlPtXYs_js[i].y;
            ctrlPts.push( pt );
        }
    }


    ///apparently, base points from second to "D" are
    ///draggable (movable) and also include draggable point "E" = end point,
    function constructBasePts_domParless( basePts )
    {
        let bplist = basePts.list;
        {
            let pdom = makeSType( "circle", "figure" );
            //.makes end point of the same structure as movable points
            bplist.push( { dom:pdom } );

            // //\\ patch: todm-fix-this
            let col = sDomF.getFixedColor( 'base' );
            pdom.setAttributeNS(null, "stroke", col );
            pdom.setAttributeNS(null, "stroke-width", '5px');
            pdom.setAttributeNS(null, "fill", col );
            // \\// patch: todm-fix-this
        }
        //constant, sconf.BASE_MAX_NUM = usually 500,
        //sconf.DRAGGABLE_BASE_POINTS = usually 15,
        const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
        const l3 = fconf.sappId === 'lemma3';
        for (var i=1, len=sconf.BASE_MAX_NUM; i <= len; i++) {
            //not yet draggable, just a template
  		    pt = makeDragP_tpl( "base", i );
	        if( l3 && i < DRAGGABLE_BASE_POINTS ) {
                //todo-patch-disable-base-drag 1 of 2
                guiup.sets_pt2movable( pt );
            }
            pt.dom.style.fill = 'rgba(255,255,255,1)';
  		    bplist.push( pt );
        }
    };
    //======================================================
    // \\// figure and base contol points
    //======================================================

    
    
    
    //==================================================
    // //\\ common shape
    //      dom without numberic parameters
    //==================================================
    function makeSType( shapeType, classStyle )
    {
        ///does only dom
        var sdom = document.createElementNS( svgNS, shapeType);
        sdom.setAttributeNS(null, "class", classStyle);
        sdom.setAttributeNS(null, "visibility", "hidden");
        stdMod.svgScene.appendChild( sdom );
        return sdom;
    }
    
    ///does only dom and bookkeeper, dr.movables[ key ] = draggable,
    ///creates svg-circle-tag with unit-transform and and appends it to svg-root
    function makeDragP_tpl( type, i )
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
    //==================================================
    // \\// common shape
    //==================================================
    
}) ();

