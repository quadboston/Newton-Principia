( function() {
    var {
        SUB_MODEL,
        ns, sn, $$, mat, nssvg,
        sconf, ssF, ssD,
        stdMod, rg, toreg,
    } = window.b$l.apptree({
        SUB_MODEL : 'limit-definition',
        stdModExportList :
        {
            media_upcreate,
        },
    });
    var globalStyle$ = null;
    var limDemo = null;
    var epsNeighbUp_svg = null;
    var epsLowLine = null;
    var epsUpperLine = null;
    var epsNeighb_svg = null;
    var neighbHor = null;
    var neighbHorChosen = null;
    var neighbVertical = null;
    var chosenSvgEl = null;
    var overGraph = null;
    return;










    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate()
    {
        var mmedia = stdMod.mmedia$();

        //:study-pars
        var EPSILON = ssD.EPSILON;
        //:run-time-pars
        if( ssF.mediaModelInitialized ) {
            //.vital for making
            var ww = stdMod.medD8D;
            ww && ww.updateAllDecPoints();
        } else {
            stdMod.mmedia$.cls( 'submodel-' + SUB_MODEL );
            globalStyle$ = $$.style().to( document.head );
        }
        limDemo = sn( 'limDemo', mat );
        var globalStyleStr = '';




        //==========================================
        // //\\// starts graphic shapes construction
        //==========================================
        // //\\ epsilon range interval
        //ccc( 'recreated pointy E: medposY=' + point_E.medpos[1] );


        //==========================================
        // //\\ epsilon stuff
        //==========================================

        //.full eps range
        epsNeighb_svg = interval2media_tostroke(
            epsNeighb_svg,
            points2media( rg[ 'eps_Neighb' ][ 'eps_Neighb' ] )
        );

        epsNeighbUp_svg = interval2media_tostroke(
            epsNeighbUp_svg,
            points2media( rg[ 'eps_NeighbUp' ][ 'eps_NeighbUp' ] ),
            { style :
                {
                    'stroke-width' : 11
                },
              cssClass : 'tp-epsilon'
            }
        );
        var point_E = pos2pointy4lemma1(
            'point-E',
            { 
                dragDecorColor: 'rgba(42,1,152,1)', //todo ... patch
                'stroke-width' : 2,
                cssClass : 'tp-epsilon tostroke',
                //.fill : 'white', //patch: removes black core from the point
                style : { fill : 'white', fillOpacity : '1', strokeOpacity : '1' }
            }
        );
        // \\// epsilon range interval


        // //\\ drawing eps-horizontal-strip
        epsUpperLine = interval2media_tostroke(
            epsUpperLine,
            points2media( rg[ 'yNeighbUpper' ][ 'yNeighbUpper' ].upperLine ),
            { style : { 'stroke' : 'red' } }
        );
        epsLowLine = interval2media_tostroke(
            epsLowLine,
            points2media( rg[ 'yNeighbUpper' ][ 'yNeighbUpper' ].lowerLine ),
            { style : { 'stroke' : 'red' } }
        );
        // \\// drawing eps-horizontal-strip
        //==========================================
        // \\// epsilon stuff
        //==========================================





        ///draws N-gamma along g-axis
        neighbVertical = interval2media_tostroke(
            neighbVertical,
            points2media( rg[ 'neighbVertical' ][ 'neighbVertical' ] ),
            { style : { 'stroke' : 'red' } }
        );

        ///draws N-gamma along gamma axis
        var nLine = rg[ 'neighbHor' ][ 'neighbHor' ];
        neighbHor = interval2media_tostroke(
            neighbHor,
            points2media( nLine ),
            { style : { 'stroke' : 'grey', 'stroke-width' : 6 }
            },
            stdMod,
        );

        //===============================================
        // //\\ chosen stuff
        //===============================================
        var nLineChosen = rg[ 'chosenDelta' ][ 'chosenDelta' ];
        neighbHorChosen = interval2media_tostroke(
            neighbHorChosen,
            points2media( nLineChosen ),
            { style : { 'stroke-width':12 }
            }
        );
        $$.$(neighbHorChosen).cls( 'tp-neighborhood tofill' );

        var point_D = pos2pointy4lemma1(
            'point-D',
            { 
                dragDecorColor: '#988201', //todo  //blue',
                cssClass : 'tp-neighborhood tostroke',
                'stroke-width' : 2,
                //.fill : 'white', //patch: removes black core from the point
                style : { fill : 'white', fillOpacity : '1', strokeOpacity : '1' }
            }
        );

        //--------------------------
        // //\\ chosen delta's graph
        //--------------------------
        var neighbIxChosen = rg['neighbIxChosen']['neighbIxChosen'];
        var modelPaths = rg['modelPaths']['modelPaths'];

        var svgLowPath = modelPaths.svgLowPath;
        var svgTopPath = modelPaths.svgTopPath;

        var forthPath = '';
        var backPath = '';
        var pd = rg['point-D'].pos;
        for( var ip = 0; ip<=neighbIxChosen; ip++ ) {
            forthPath += svgLowPath[ip] + ' ';
            backPath = svgTopPath[ip] + ' ' + backPath;
        }
        chosenSvgEl = nssvg.u({
            svgel   : chosenSvgEl,
            type    : 'polyline',
            'class' : 'tp-neighborhood tofill',
            points  : forthPath + backPath,
            parent  : mmedia,
            style : { 'fill-opacity':'1' }
        });
        //--------------------------
        // \\// chosen delta's graph
        // \\// chosen stuff
        //===============================================


        //===============================================
        // //\\ curve over all
        //===============================================
        var graph_model = rg.modelPaths.modelPaths.graph;
        overGraph = nssvg.u({
            svgel   : overGraph,
            type    :'polyline',
            'class' :'tp-set-function tofill tohidden',
            points  :graph_model,
            parent  :mmedia,
            style   :
            {
                'fill-opacity':'1',
                stroke:'none'
            }
        });
        //===============================================
        // \\// curve over all
        //===============================================

        var passedWork =
        {
            globalStyleStr : globalStyleStr,
            limDemo : limDemo,
            points2media : points2media,
            //pos2pointy4lemma1 : pos2pointy4lemma1
        };
        stdMod.upcreateMediaLables( passedWork );
        globalStyle$.html( passedWork.globalStyleStr );
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================








    ///makes line
    function interval2media( svgEl, interval, attr )
    {
        svgEl = nssvg.polyline({
            svgel   : svgEl,
            parent  : stdMod.mmedia$(),
            pivots  : interval,
            style   : attr && attr.style,
            'stroke-width' : ( attr && attr[ 'stroke-width' ] || 1 ) * sconf.thickness
        });
        var cssClass = attr && attr['cssClass'];
        if( cssClass ) {
            $$.addClass( cssClass, svgEl )
        }
        return svgEl;
    }
    function interval2media_tostroke( svgEl, interval, attr )
    {
        var svgEl = interval2media( svgEl, interval, attr );
        $$.$(svgEl).addClass( 'tostroke' );
        return svgEl;
    }
    function interval2media_tofill( svgEl, interval, attr )
    {
        var svgEl = interval2media( svgEl, interval, attr );
        $$.$(svgEl).addClass( 'tofill' );
        return svgEl;
    }

    ///converts array of points to media scale
    function points2media( points )
    {
        var conv = limDemo.instance.xy2mediaArr;
        return points.map( point => conv( point[0], point[1] ) );
    }


    ///converts model-pos and attributes to pointy
    function pos2pointy4lemma1( pName, attrs )
    {
        var pt              = toreg( pName )();
        var pos             = pt.pos;
        pt.spinnerClsId       = pName;
        pt.pos              = pos;
        pt.dragDecorColor   = attrs.dragDecorColor || pt.dragDecorColor;
        pt.medpos           = limDemo.instance.xy2mediaArr( pt.pos[0], pt.pos[1] );
        pt.svgel = nssvg.u({
            svgel   : pt.svgel,
            parent  : stdMod.mmedia$(),
            type    : 'circle',
            fill    : attrs && attrs.fill,
            stroke  : attrs && attrs.stroke,
            style   : attrs.style,
            'stroke-width' : (( attrs && attrs[ 'stroke-width' ] ) || 0) * sconf.thickness,
            cx : pt.medpos[0],
            cy : pt.medpos[1],
            r : 4 * sconf.thickness
        });
        var cssClass = attrs && attrs['cssClass'];
        //pt.svgel.setAttributeNS( null, 'class', cssClass );
        $$.addClass( cssClass, pt.svgel ); //todm addClassNS
        return pt;
    }

}) ();

