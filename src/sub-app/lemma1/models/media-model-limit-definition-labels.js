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

    var gammaAxisSvg = null;
    var gAxisSvg = null;
    var limSvg = null;
    var epsLab = null;
    var xNeighbMark = null;
    var xChosenMark = null;
    var xNdm = null;
    var xNm = null;
    var cPSvg = null;
    var aPSvg = null;
    var bPSvg = null;
    var legendSvg = null;
    return;









    function setModule()
    {
        sn(SUB_MODEL, studyMods ).upcreateMediaLables = upcreateMediaLables;
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMediaLables( pwork )
    {
        var limDemo = pwork.limDemo;
        var points2media = pwork.points2media;
        var pos2pointy = pwork.pos2pointy;

        var mmedia = studyMods[ SUB_MODEL ].mmedia$();
        var nLine = rg[ 'neighbHor' ][ 'neighbHor' ];
        var nLineChosen = rg[ 'chosenDelta' ][ 'chosenDelta' ];


        //=====================================
        // //\\ labels
        //=====================================
        //codes for Greek letters
        //https://sites.psu.edu/symbolcodes/languages/ancient/greek/greekchart/#greeklower
        var xy2m = limDemo.instance.xy2mediaArr;
        xDelta = xy2m( nLine[1][0]-0.04, nLine[1][1]-0.05 );

        xDeltaCh = xy2m( nLineChosen[1][0]-0.04, nLineChosen[1][1]-0.05 );
        xNCh     = xy2m( nLineChosen[1][0]/2-0.01, nLineChosen[1][1]+0.03 );
        xNdeltaCh = xy2m( nLineChosen[1][0]/2-0.01+0.035, nLineChosen[1][1]+0.02 );

        xNeighbMark = sv.printText({
            svgel   : xNeighbMark,
            parent  : mmedia,
            type    : 'text',
            text    : "c+δ'", //&#x03B4;'
            fill    : 'black',
            style   : { font: 'bold 40px sans-serif' },
            x : xDelta[0],
            y : xDelta[1]
        });


        var ww = points2media( nLineChosen );
        ww = ww[1];
        ///mark of delta finally chosen in proof for given epsilon
        xChosenMark = sv.printText({
            svgel   : xChosenMark,
            parent  : mmedia,
            type    : 'text',
            text    : "δ", //&#x03B4;'
            fill    : 'blue',
            style   : { font: 'bold 40px sans-serif' },
            x : ww[0]-10,
            y : ww[1]+45
        });
        xNm = sv.printText({
            svgel   : xNm,
            parent  : mmedia,
            type    : 'text',
            text    : 'N',
            fill    : 'blue',
            style   : { font: 'bold 40px sans-serif' },
            x : xNCh[0],
            y : xNCh[1]
        });
        xNdm = sv.printText({
            svgel   : xNdm,
            parent  : mmedia,
            type    : 'text',
            text    : 'δ',
            fill    : 'blue',
            style   : { font: 'bold 30px sans-serif' },
            x : xNdeltaCh[0],
            y : xNdeltaCh[1]
        });

        var EPS_X = -0.035;
        var epsPoint = rg[ 'eps_Neighb' ][ 'eps_Neighb' ][1];
        var lim = limDemo.dataSamples.beats_sample.lim;
        epsP = xy2m( epsPoint[0]+EPS_X, (epsPoint[1]-lim)/2 + lim );
        epsLab = sv.printText({
            svgel   : epsLab,
            parent  : mmedia,
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
            parent  : mmedia,
            type    : 'text',
            text    : 'h',
            fill    : 'green',
            //style   : { font: '30px sans-serif' },
            //style   : { fill: 'green' },
            x : limP[0],
            y : limP[1]
        });
        $$.$(limSvg).cls( 'tp-lim tofill' );
        pwork.globalStyleStr += `
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
            parent  : mmedia,
            type    : 'text',
            text    : 'γ',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : gammaAxisP[0],
            y : gammaAxisP[1]
        });
        $$.$(gammaAxisSvg).cls( 'tp-gamma' );
        pwork.globalStyleStr += `
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
            parent  : mmedia,
            type    : 'text',
            text    : 'g',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : gAxisP[0],
            y : gAxisP[1]
        });
        $$.$(gAxisSvg).cls( 'tp-g' );
        pwork.globalStyleStr += `
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
        var cP = xy2m( -0.01, -0.08 );
        cPSvg = sv.printText({
            svgel   : cPSvg,
            parent  : mmedia,
            type    : 'text',
            text    : 'c',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : cP[0],
            y : cP[1]
        });
        $$.$(cPSvg).cls( 'tp-c' );
        pwork.globalStyleStr += `
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
        var aP = xy2m( -0.01, -0.04 );
        aPSvg = sv.printText({
            svgel   : aPSvg,
            parent  : mmedia,
            type    : 'text',
            text    : 'a',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : aP[0],
            y : aP[1]
        });
        $$.$(aPSvg).cls( 'tp-a' );
        pwork.globalStyleStr += `
            .${cssp}-approot .tp-a {
                font: 30px sans-serif;
            }
        `;
        //----------------
        // \\// point c
        //----------------

        //----------------
        // //\\ point b
        //----------------
        var bP = xy2m( 0.99, -0.04 );
        bPSvg = sv.printText({
            svgel   : bPSvg,
            parent  : mmedia,
            type    : 'text',
            text    : 'b',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : bP[0],
            y : bP[1]
        });
        $$.$(bPSvg).cls( 'tp-b' );
        pwork.globalStyleStr += `
            .${cssp}-approot .tp-b {
                font: 30px sans-serif;
            }
        `;
        //----------------
        // \\// point b
        //----------------



        //----------------
        // //\\ legend
        //----------------
        var legendP = xy2m( 0.4, -0.12 );
        legendSvg = sv.printText({
            svgel   : legendSvg,
            parent  : mmedia,
            type    : 'text',
            text    : 'Γ = (a,b)', //'&#x0393;',
            fill    : 'black',
            //style   : { font: '30px sans-serif' },
            x : legendP[0],
            y : legendP[1]
        });
        $$.$(legendSvg).cls( 'tp-legend' );
        pwork.globalStyleStr += `
            .${cssp}-approot .tp-legend {
                font: 30px sans-serif;
            }
        `;
        //----------------
        // \\// legend
        //----------------




        //=====================================
        // \\// labels
        //=====================================
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================


}) ();

