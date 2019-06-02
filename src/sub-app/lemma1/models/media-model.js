( function() {
    var ns          = window.b$l;
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
    var epsLab = null;
    var epsNeighb_svg = null;
    var epsNeighbUp_svg = null;
    var epsLowLine = null;
    var epsUpperLine = null;
    var neighbHor = null;
    var neighbVertical = null;
    var xNeighbMark = null;
    var xNdm = null;
    var xNm = null;
    var limSvg = null;
    var gammaAxisSvg = null;
    var gAxisSvg = null;    
    var cPSvg = null;
    var aPSvg = null;



    ssF.initMediaModel = initMediaModel;
    ssF.initMediaModel_II = initMediaModel_II;
    return;









    function setModule()
    {
        ssF.upcreateMedia   = upcreateMedia;
    }

    function initMediaModel()
    {
        //this sub runs after first upcreate (which includes upcreateMedia )
        sDomF.topicModel_2_css_html();
        ssF.initDragModel();
    }
    function initMediaModel_II()
    {
        ssF.mediaModelInitialized = true;
    };

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMedia( limDemo_ )
    {
        //:study-pars
        var EPSILON = ssD.EPSILON;
        //:run-time-pars
        if( ssF.mediaModelInitialized ) {
            //.vital for making
            sDomF.medD8D && sDomF.medD8D.updateAllDecPoints();
        } else {
            //.makes visible only for this essay aspects
            sDomN.mmedia$.cls( 'essay-claim--xixcentury' );
            globalStyle$ = $$.style().to( document.head );
        }
        limDemo = limDemo_;
        var globalStyleStr = '';





        //==========================================
        // //\\// starts graphic shapes construction
        //==========================================
        var point_E = pos2pointy(
            'point-E',
            { 
                dragDecorColor: 'red',
                'fill' : 'transparent', //todm: patch: removes black core from the point
                'stroke-width' : 2,
                style : { 'stroke' : 'red' }
            }
        );



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

        //=====================================
        // //\\ labels
        //=====================================
        //codes for Greek letters
        //https://sites.psu.edu/symbolcodes/languages/ancient/greek/greekchart/#greeklower
        var xy2m = limDemo.instance.xy2mediaArr;
        xDelta = xy2m( nLine[1][0]-0.04, nLine[1][1]-0.05 );
        xN     = xy2m( nLine[1][0]/2-0.01, nLine[1][1]+0.03 );
        xNdelta = xy2m( nLine[1][0]/2-0.01+0.035, nLine[1][1]+0.02 );
        xNeighbMark = sv.printText({
            svgel   : xNeighbMark,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'c+δ', //&#x03B4;', //delta
            fill    : 'black',
            style   : { font: 'bold 40px sans-serif' },
            x : xDelta[0],
            y : xDelta[1]
        });
        xNm = sv.printText({
            svgel   : xNm,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'N',
            fill    : 'black',
            style   : { font: 'bold 40px sans-serif' },
            x : xN[0],
            y : xN[1]
        });
        xNdm = sv.printText({
            svgel   : xNdm,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'δ',
            fill    : 'black',
            style   : { font: 'bold 30px sans-serif' },
            x : xNdelta[0],
            y : xNdelta[1]
        });

        var EPS_X = -0.035;
        var epsPoint = rg[ 'eps_Neighb' ][ 'eps_Neighb' ][1];
        var lim = limDemo.dataSamples.beats_sample.lim;
        epsP = xy2m( epsPoint[0]+EPS_X, (epsPoint[1]-lim)/2 + lim );
        epsLab = sv.printText({
            svgel   : epsLab,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'ε',
            fill    : 'red',
            style   : { font: 'bold 30px sans-serif' },
            x : epsP[0],
            y : epsP[1]
        });

        var limP = xy2m( -0.045, lim );
        limSvg = sv.printText({
            svgel   : limSvg,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'h',
            fill    : 'green',
            //style   : { font: '30px sans-serif' },
            //style   : { fill: 'green' },
            x : limP[0],
            y : limP[1]
        });
        $$.$(limSvg).cls( 'tp-lim tofill' );
        globalStyleStr += `
            .${cssp}-approot .tp-lim {
                font: 30px sans-serif;
            }
        `;
        
        //----------------
        // //\\ gamma axis
        //----------------
        var gammaAxisP = xy2m( limDemo.dataSamples.beats_sample.xRange + 0.01, 0 );
        gammaAxisSvg = sv.printText({
            svgel   : gammaAxisSvg,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'γ',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : gammaAxisP[0],
            y : gammaAxisP[1]
        });
        $$.$(gammaAxisSvg).cls( 'tp-gamma' );
        globalStyleStr += `
            .${cssp}-approot .tp-gamma {
                font: 30px sans-serif;
            }
        `;
        //----------------
        // \\// gamma axis
        //----------------

        //----------------
        // //\\ g axis
        //----------------
        var gAxisP = xy2m( -0.01, 1.015 );
        gAxisSvg = sv.printText({
            svgel   : gAxisSvg,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'g',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : gAxisP[0],
            y : gAxisP[1]
        });
        $$.$(gAxisSvg).cls( 'tp-g' );
        globalStyleStr += `
            .${cssp}-approot .tp-g {
                font: 30px sans-serif;
            }
        `;
        //----------------
        // \\// g axis
        //----------------

        //----------------
        // //\\ point c
        //----------------
        var cP = xy2m( -0.01, -0.03 );
        cPSvg = sv.printText({
            svgel   : cPSvg,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'c',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : cP[0],
            y : cP[1]
        });
        $$.$(cPSvg).cls( 'tp-c' );
        globalStyleStr += `
            .${cssp}-approot .tp-c {
                font: 30px sans-serif;
            }
        `;
        //----------------
        // \\// point c
        //----------------

        //----------------
        // //\\ point a
        //----------------
        var aP = xy2m( -0.01, -0.06 );
        aPSvg = sv.printText({
            svgel   : aPSvg,
            parent  : sDomN.svg,
            type    : 'text',
            text    : 'a',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : aP[0],
            y : aP[1]
        });
        $$.$(aPSvg).cls( 'tp-a' );
        globalStyleStr += `
            .${cssp}-approot .tp-a {
                font: 30px sans-serif;
            }
        `;
        //----------------
        // \\// point c
        //----------------

        //=====================================
        // \\// labels
        //=====================================

        globalStyle$.html( globalStyleStr );
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================








    ///makes line
    function interval2media( svgEl, interval, attr )
    {
        svgEl = sv.polyline({
            svgel   : svgEl,
            parent  : sDomN.svg,
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
            parent  : sDomN.svg,
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

