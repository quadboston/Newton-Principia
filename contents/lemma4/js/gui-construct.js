( function () {
    var {
        ///standard levels of application
        sn, $$, svgNS, fapp, fconf, sconf, sDomF, stdMod, }
        = window.b$l.apptree({ setModule, });
    var stdL2               = sn('stdL2', fapp );
    var gui                 = sn('gui', stdL2 );
    var guicon              = sn('guiConstruct', gui );
    var guiup               = sn('guiUpdate',gui);
    var appstate            = sn('appstate', stdL2 );

    var study               = sn('study', stdL2 );
    var sdata               = sn('sdata', study );
    return;


    function setModule()
    {
        Object.assign( guicon,
        {
            constructsRects_tillExtraOffset_parlessDom,
            constructsControlPoints,
            constructBasePts_domParless,
            constructTransformPoints,
            reset_hollowPoints,
        });
    }

    //======================================================
    // //\\ rects
    //======================================================
    //apparently makes "emptu junk" "without numbers there"
    function constructsRects_tillExtraOffset_parlessDom(dr)
    {
        //this is just an empty list
        //TEMP Should only be needed by L2/3
        makes_rects( dr.circRects, "tp-circumscribed-rectangles circumscribed");

        //Generate figure name using letters from input datareg
        const {CTRL_PT_FIRST, CURVE_MIDDLE, CTRL_PT_LAST, BASE_PT_FIRST} =
            dr.POINT_LABELS;
        const figureName = BASE_PT_FIRST + CTRL_PT_FIRST + CURVE_MIDDLE +
            CTRL_PT_LAST;
        const lowname = sDomF.topicIdUpperCase_2_underscore(figureName);
        makes_rects(dr.InscrRects,
            `tp-inscribed-rectangles-${lowname} inscribed`,
            `tp-inscribed-rectangle-${lowname}-`
        );

        //TEMP Should only be needed by L2/3
        makes_rects( dr.differenceRects, "tp-difference difference");
        /*
        $$.$(dr.differenceRects.list[0]).addClass( 'tp-a--_k--b--l' );
        $$.$(dr.differenceRects.list[1]).addClass( 'tp-b--_l--c--m' );
        $$.$(dr.differenceRects.list[2]).addClass( 'tp-c--_m--d--n' );
        $$.$(dr.differenceRects.list[3]).addClass( 'tp-d--e--p--o' );
        */
    }
    //listWrap can hold an empt arry
    //reserves "empty junk" and includes
    //cells 0,...,listWrap.offset-1 there.
    function makes_rects( listWrap, classStyle, classPrefixSingle = null )
    {
        classStyle += ' rect tofill';
        let BASE_MAX_NUM = sconf.BASE_MAX_NUM;
        let list = listWrap.list;
        let len = BASE_MAX_NUM+listWrap.offset;
        for (var i=0; i<len; i++){
            //"makes an empty junk"
            //Class for individual ones if applicable
            let classSingle = "";
            if (classPrefixSingle)
                classSingle = classPrefixSingle + i.toString() + " ";
            //A polygon (rather than "rect") so it can be transformed
            list.push( makeSType( "polygon", classSingle + classStyle ) );
        }
    }
    //======================================================
    // \\// rects
    //======================================================


    
    
    //======================================================
    // //\\ figure, base, and transform contol points
    //======================================================
    ///builds list of control points, dr.ctrlPts.list and updates construction
    ///of bookkeeper dr.movables
    function constructsControlPoints(dr)
    {
        const ctrlPts = dr.ctrlPts;
        const cp = ctrlPts.untransformed;
        var scale = 1/sconf.originalMod2inn_scale;
        var offsetX = sconf.originX_onPicture;
        var offsetY = sconf.originY_onPicture;
        var flipY1 = sconf.MONITOR_Y_FLIP;

        //Only create and add points for the control points that are enabled.
        const offset = ctrlPts.DRAGGABLE_END_POINTS ? 0 : 1;
        for (var i=offset, len=cp.length-offset; i < len; i++) {
            const posTransformed = stdMod.xy_2_Txy(dr, [cp[i].x, cp[i].y]);
            ctrlPts.list.push(createCurvePoint(dr, posTransformed, "ctrl", i));
        }

        reset_hollowPoints({ dr, onCurve:true, onBase:false });
    }



    function reset_hollowPoints({ dr, onCurve, onBase })
    {
        let view = sdata.view;
        let isFig = !!view.isFigureChecked;
        let isIn = !!view.isInscribed;
        let isCir = !!view.isCircumscribed;
        
        // control points
        if( onCurve ) {
            var cpList = dr.ctrlPts.list;
            for (var i=0, len=cpList.length; i < len; i++)
                resetPoint(cpList[i], !isFig);
        }

        if( onBase && dr.BASE_PT_DRAGGERS_ENABLED) {
            // //\\ dehollowfies basePts
            const bplist = dr.basePts.list;
            const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
            for (var i=0, len=DRAGGABLE_BASE_POINTS; i <= len; i++)
                resetPoint(bplist[i], !isIn && !isCir);
            // \\//  dehollowfies basePts
        }

        // transform points
        if( onCurve ) {
            const tpList = Object.values(dr.transforms.pts);
            for (var i=0, len=tpList.length; i < len; i++)
                resetPoint(tpList[i], !isFig);
        }


        function resetPoint(pt, isTransparent) {
            const pdom = pt.dom;
            pdom.style.fill = isTransparent ? 'transparent' :
                //.todm patch
                'rgba(255,255,255,1)'; //makes the point hollow
            pdom.style.stroke = isTransparent ? 'transparent' :
                sDomF.getFixedColor( 'curve' );
        }
    }

    ///apparently, base points from second to "D" are
    ///draggable (movable) and also include draggable point "E" = end point,
    function constructBasePts_domParless( dr, basePts )
    {
        let bplist = basePts.list;
        //constant, sconf.BASE_MAX_NUM = usually 500,
        //sconf.DRAGGABLE_BASE_POINTS = usually 15,
        const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
        const BASE_PT_DRAGGERS_ENABLED = dr.BASE_PT_DRAGGERS_ENABLED;
        for (var i=0, len=sconf.BASE_MAX_NUM; i <= len; i++) {
            //not yet draggable, just a template
  		    pt = makeDragP_tpl( dr, "base", i );
	        if( BASE_PT_DRAGGERS_ENABLED && i < DRAGGABLE_BASE_POINTS ) {
                //todo-patch-disable-base-drag 1 of 2
                if( i>0 ) {
                    guiup.sets_pt2movable( pt );
                }
            }
            pt.dom.style.fill = 'rgba(255,255,255,1)';
  		    bplist.push( pt );
        }
    }



    function constructTransformPoints(dr) {
        //Creates and adds the transform points to the input datareg for any
        //that are enabled.

        const ptsUntransformed = dr.ctrlPts.untransformed;
        const transforms = dr.transforms;

        //Must use default positions that aren't transformed.
        const ptFirst = ptsUntransformed[0];
        const ptLast = ptsUntransformed[ptsUntransformed.length - 1];
        if (!ptFirst || !ptLast)
            return;
        
        //Set pos to transform relative to.
        transforms.origin = [ptFirst.x, ptLast.y];

        //Create and add points as required.
        if (transforms.POINT_J_ENABLED)
            transforms.pts.j = createPoint(ptFirst, 0, true, true);
        if (transforms.POINT_I_ENABLED)
            transforms.pts.i = createPoint(ptLast, 1, true, false);


        function createPoint(cp, i, draggableX, draggableY) {
            const pt = createCurvePoint(dr, [cp.x, cp.y], "trans", i);
            //Initial offset used to determine how transforms should change as
            //this point is dragged.
            pt.xOffsetInitial = cp.x - transforms.origin[0];
            pt.yOffsetInitial = cp.y - transforms.origin[1];
            pt.draggableX = draggableX;
            pt.draggableY = draggableY;
            return pt;
        }
    };
    //======================================================
    // \\// figure, base, and transform contol points
    //======================================================

    
    
    
    //==================================================
    // //\\ common shape
    //      dom without numeric parameters
    //      "makes an empty junk"
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
    function makeDragP_tpl( dr, type, i )
    {
        var key  = type + i;
        var pdom = document.createElementNS( svgNS, "circle");
        stdMod.svgScene.appendChild( pdom );
        pdom.setAttributeNS( null, "id", key );
        pdom.setAttributeNS( null, "draggable", "false" ); //todo ... redundant? ...
        var draggable = { dom:pdom, type:type, index:i, id:key };
        if( i>0 || type === 'ctrl' ) {
            dr.movables[ key ] = draggable;
        }
        return draggable;
    }

    function createCurvePoint(dr, pos, type, i) {
        //Used to create curve control and transform points.  It may be
        //possible to combine with base points to reduce code.
        //pt = dr.movables[ type + i ]
        const pt = makeDragP_tpl( dr, type, i );
        const pdom = pt.dom;

        pdom.setAttributeNS(null, "class", `movable ${type}Pt`);
        pdom.setAttributeNS(null, "cx", pos[0]);
        pdom.setAttributeNS(null, "cy", pos[1]);
        pdom.setAttributeNS(null, "r", sconf.CTRL_RADIUS);
        //.todm patch
        //pdom.style.fill = 'rgba(255,255,255,1)'; //makes the point hollow
        //pdom.style.stroke = sDomF.getFixedColor( 'curve' );
        pdom.style[ 'stroke-width' ] = '1px';
        pt.x = pos[0];
        pt.y = pos[1];
        
        return pt;
    }
    //==================================================
    // \\// common shape
    //==================================================
    
}) ();

