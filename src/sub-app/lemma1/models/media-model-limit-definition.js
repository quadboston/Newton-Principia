( function() {
    var SUB_MODEL   = 'limit-definition';
    var ns          = window.b$l;
    var nssvg       = ns.sn( 'svg' );
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);
    var ssF         = sn('ssFunctions',ss);
    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

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
    return;









    function setModule()
    {
        sn(SUB_MODEL, studyMods ).upcreateMedia = upcreateMedia;
        sn(SUB_MODEL, studyMods ).initMediaModel = initMediaModel;
    }

    function initMediaModel()
    {
        sn( SUB_MODEL, studyMods ).initDragModel();
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMedia( limDemo_ )
    {

        var mmedia = studyMods[ SUB_MODEL ].mmedia$();

        //:study-pars
        var EPSILON = ssD.EPSILON;
        //:run-time-pars
        if( ssF.mediaModelInitialized ) {
            //.vital for making
            var ww = studyMods[ SUB_MODEL ].medD8D;
            ww && ww.updateAllDecPoints();
        } else {
            studyMods[ SUB_MODEL ].mmedia$.cls( 'submodel-' + SUB_MODEL );
            globalStyle$ = $$.style().to( document.head );
        }
        limDemo = limDemo_;
        var globalStyleStr = '';


        //==========================================
        // //\\// starts graphic shapes construction
        //==========================================

        // //\\ epsilon range interval
        //ccc( 'recreated pointy E: medposY=' + point_E.medpos[1] );
        epsNeighb_svg = interval2media(
            epsNeighb_svg,
            points2media( rg[ 'eps_Neighb' ][ 'eps_Neighb' ] ),
            { style : { 'stroke' : 'red' } }
        );
        $$.$(epsNeighb_svg).cls('tp-eps-up');
        epsNeighbUp_svg = interval2media(
            epsNeighbUp_svg,
            points2media( rg[ 'eps_NeighbUp' ][ 'eps_NeighbUp' ] ),
            { style :
                {
                    'stroke' : 'red',
                    'stroke-width' : 11
                }
            }
        );
        // \\// epsilon range interval


        // //\\ drawing eps-strip
        epsUpperLine = interval2media(
            epsUpperLine,
            points2media( rg[ 'yNeighbUpper' ][ 'yNeighbUpper' ].upperLine ),
            { style : { 'stroke' : 'red' } }
        );
        epsLowLine = interval2media(
            epsLowLine,
            points2media( rg[ 'yNeighbUpper' ][ 'yNeighbUpper' ].lowerLine ),
            { style : { 'stroke' : 'red' } }
        );
        // \\// drawing eps-strip


        ///draws N-gamma along g-axis
        neighbVertical = interval2media(
            neighbVertical,
            points2media( rg[ 'neighbVertical' ][ 'neighbVertical' ] ),
            { style : { 'stroke' : 'red' } }
        );

        ///draws N-gamma along gamma axis
        var nLine = rg[ 'neighbHor' ][ 'neighbHor' ];
        neighbHor = interval2media(
            neighbHor,
            points2media( nLine ),
            { style : { 'stroke' : 'black', 'stroke-width':10 } }
        );


        var nLineChosen = rg[ 'chosenDelta' ][ 'chosenDelta' ];
        neighbHorChosen = interval2media(
            neighbHorChosen,
            points2media( nLineChosen ),
            { style : { 'stroke' : 'blue', 'stroke-width':6 } }
        );

        var point_E = pos2pointy(
            'point-E',
            { 
                dragDecorColor: 'red',
                'fill' : 'white', //todm: patch: removes black core from the point
                'stroke-width' : 2,
                style : { 'stroke' : 'red' }
            }
        );
        var point_D = pos2pointy(
            'point-D',
            { 
                dragDecorColor: 'blue',
                //cssClass : 'debug-point-D',
                'fill' : 'white', //todm: patch: removes black core from the point
                'stroke-width' : 2,
                style : { 'stroke' : 'blue' }
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
            'class' : 'tp-chosen-function tofill',
            points  : forthPath + backPath,
            parent  : mmedia,
            style   :
            {
                fill : 'blue',
                stroke : 'none'
            }
        });
        //--------------------------
        // \\// chosen delta's graph
        //--------------------------

        var passedWork =
        {
            globalStyleStr : globalStyleStr,
            limDemo : limDemo,
            points2media : points2media,
            pos2pointy : pos2pointy
        };
        sn(SUB_MODEL, studyMods ).upcreateMediaLables( passedWork );
        globalStyle$.html( passedWork.globalStyleStr );
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================








    ///makes line
    function interval2media( svgEl, interval, attr )
    {
        svgEl = sv.polyline({
            svgel   : svgEl,
            parent  : studyMods[ SUB_MODEL ].mmedia$(),
            pivots  : interval,
            style   : attr.style,
            'stroke-width' : ( attr && attr[ 'stroke-width' ] || 1 ) * sconf.thickness
        });
        var cssClass = attr && attr['cssClass'];
        $$.addClass( cssClass, svgEl )   //todm addClassNS
          .addClass( 'tostroke' )
          .addClass( 'stroke' );
        return svgEl;
    }

    ///converts array of points to media scale
    function points2media( points )
    {
        var conv = limDemo.instance.xy2mediaArr;
        return points.map( point => conv( point[0], point[1] ) );
    }


    ///converts model-pos and attributes to pointy
    function pos2pointy( pName, attrs )
    {
        var pt              = tr( pName );
        var pos             = pt.pos;
        pt.dragCssCls       = pName;
        pt.pos              = pos;
        pt.dragDecorColor   = attrs.dragDecorColor || pt.dragDecorColor;
        pt.medpos2dompos    = sDomF.medpos2dompos;
        pt.medpos           = limDemo.instance.xy2mediaArr( pt.pos[0], pt.pos[1] );
        pt.svgel = sv.u({
            svgel   : pt.svgel,
            parent  : studyMods[ SUB_MODEL ].mmedia$(),
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

