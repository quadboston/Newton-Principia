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
            reset_hollowPoints,
        });
    }

    //======================================================
    // //\\ rects
    //======================================================
    //apparently makes "emptu junk" "without numbers there"
    function constructsRects_tillExtraOffset_parlessDom()
    {
        //this is just an empty list
        makes_rects( dr.circRects, "tp-circumscribed-rectangles circumscribed");

        makes_rects( dr.InscrRects, "tp-inscribed-rectangles inscribed");
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
    function makes_rects( listWrap, classStyle )
    {
        classStyle += ' rect tofill';
        let BASE_MAX_NUM = sconf.BASE_MAX_NUM;
        let list = listWrap.list;
        let len = BASE_MAX_NUM+listWrap.offset;
        for (var i=0; i<len; i++){
            //"makes an empty junk"
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
    ///This is the last time we use "sconf.ctrlPtXYs_js".
    function constructsControlPoints()
    {
        // control points
        var ctrlPts = dr.ctrlPts;
        dr.ctrlPts_unscaled = [];
        var scale = 1/sconf.originalMod2inn_scale;
        var offsetX = sconf.originX_onPicture;
        var offsetY = sconf.originY_onPicture;
        var flipY1 = sconf.MONITOR_Y_FLIP;
        
        for (var i=0, len=sconf.ctrlPtXYs_js.length; i < len; i++) {
            var cp = sconf.ctrlPtXYs_js;
            //pt = dr.movables[ type + i ]
            var pt = makeDragP_tpl( "ctrl", i );
            var pdom = pt.dom;

            pdom.setAttributeNS(null, "class", "movable ctrlPt");
            pdom.setAttributeNS(null, "cx", cp[i].x);
            pdom.setAttributeNS(null, "cy", cp[i].y);
            pdom.setAttributeNS(null, "r", sconf.CTRL_RADIUS);
            //.todm patch
            //pdom.style.fill = 'rgba(255,255,255,1)'; //makes the point hollow
            //pdom.style.stroke = sDomF.getFixedColor( 'curve' );
            pdom.style[ 'stroke-width' ] = '1px';
            pt.x = cp[i].x;
            pt.y = cp[i].y;
            
            //pt.posx = (cp[i].x - offsetX)*scale;
            //pt.posy = (cp[i].y - offsetY)*scale*flipY1;
            ctrlPts.push( pt );
            dr.ctrlPts_unscaled.push( [pt.x, pt.y] );
        }
        reset_hollowPoints({ onCurve:true, onBase:false });
    }
    
    
    function reset_hollowPoints({ onCurve, onBase })
    {
        let view = sdata.view;
        let isFig = !!view.isFigureChecked;
        let isIn = !!view.isInscribed;
        let isCir = !!view.isCircumscribed;
        //let functionYes = !isFig &&
        //          ((!isIn && isCir) || (isIn && !isCir));
        // control points
        var ctrlPts = dr.ctrlPts;
        if( onCurve ) {
            for (var i=0, len=dr.ctrlPts.length; i < len; i++) {
                //if( i===4 ) functionYes = false; //continue;
                //pt = dr.movables[ type + i ]
                let pt = ctrlPts[i];
                let pdom = pt.dom;
                pdom.style.fill = !isFig ? 'transparent' :
                    //.todm patch
                    'rgba(255,255,255,1)'; //makes the point hollow
                pdom.style.stroke = !isFig ? 'transparent' :
                    sDomF.getFixedColor( 'curve' );
            }
        }

        // //\\ dehollowfies basePts
        if( onBase && fconf.sappId === 'lemma3' ) {
            let bplist = dr.basePts.list;
            const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
            for (var i=0,
                //let len=Math.min( sconf.DRAGGABLE_BASE_POINTS, sconf.BASE_MAX_NUM );
                len=sconf.DRAGGABLE_BASE_POINTS;
                i <= len; i++) {
                //not yet draggable, just a template
                //todo-patch-disable-base-drag 1 of 2
                //if( i>0 ) {
                //    guiup.sets_pt2movable( pt );
                //}
                var pt = bplist[i];
                var pdom = pt.dom;
                pdom.style.fill = !isIn && !isCir ? 'transparent' :
                    //.todm patch
                    'rgba(255,255,255,1)'; //makes the point hollow
                pdom.style.stroke = !isIn && !isCir ? 'transparent' :
                    sDomF.getFixedColor( 'curve' );
            }
        }
        // \\//  dehollowfies basePts
    }

    ///apparently, base points from second to "D" are
    ///draggable (movable) and also include draggable point "E" = end point,
    function constructBasePts_domParless( basePts )
    {
        let bplist = basePts.list;
        //constant, sconf.BASE_MAX_NUM = usually 500,
        //sconf.DRAGGABLE_BASE_POINTS = usually 15,
        const DRAGGABLE_BASE_POINTS = sconf.DRAGGABLE_BASE_POINTS;
        const l3 = fconf.sappId === 'lemma3';
        for (var i=0, len=sconf.BASE_MAX_NUM; i <= len; i++) {
            //not yet draggable, just a template
  		    pt = makeDragP_tpl( "base", i );
	        if( l3 && i < DRAGGABLE_BASE_POINTS ) {
                //todo-patch-disable-base-drag 1 of 2
                if( i>0 ) {
                    guiup.sets_pt2movable( pt );
                }
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
    function makeDragP_tpl( type, i )
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
    //==================================================
    // \\// common shape
    //==================================================
    
}) ();

