{
const {sn, nspaste, fapp, fconf, sconf, sf, sapp, rg,
      CONST, apush, gshapes, tprepo, tpelect, ssF, stdMod, sDomF} =
      window.b$l.atree({ ssFList: { init_conf } });
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;

function init_conf (){
    //***************************************************************
    // //\\ user scenarios
    //***************************************************************
    sf.dontDoMathJax = false;
    sf.enableTools = false;
    sf.enableStudylab = false;
    sf.enableZoom = false;
    sf.mediaMover_isDisabled = true;
    //***************************************************************
    // \\// user scenarios
    //***************************************************************

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    sf.medWidth = 282;
    sf.medHeight = 290;
    sf.medposOfModOrigin_x = 31.5;
    sf.medposOfModOrigin_y = 29;
    sf.mod2med = 1;
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ app scenario
    //***************************************************************
    sconf.ONLY_MONOTONIC_CURVE = false;
    //***************************************************************
    // \\// app scenario
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at c onf/c onf.js or especally at c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sconf.default_tp_lightness = 30;

    //todm: this disables functionality ... not only CSS:
    fconf.appDecor.helpBox_opacity0             = true;
    fconf.appDecor.idleHelpButtonTooltip        = '';

    //to make legend nicely seen, the legend needs
    //own css independent of rectangulars:
    //then so, we can decreas opacities below for nicer diagram:

    //these are additional over high and low opacities in color itself:
    sconf.ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS = 0.8;
    sconf.ANCHOR_TOPIC__OPACITY_IN_FOCUS = 1;
    sf.handleRadius = 55;

    sf.SLIDERS_LEGEND_HEIGHT = 0;
    sf.MINP=4;  //bottom slider min bases

    Object.assign( sconf, {
        ////GUI
        MOVABLE_BASE_RADIUS : 3,
        CTRL_RADIUS     : 3,
        BASE_POINTS_REPELLING_DISTANCE : 5, //formerly PAD

        //:d8d
        //ms, softens drag8drop on performance-weak-devices
        //DRAG_POINTS_THROTTLE_TIME : 0,

        //"rectangular-distance" to point to be detected
        DRAGGEE_HALF_SIZE : 20,

        default_tp_stroke_width : 4,
    });
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    Object.assign( sconf, {
        //number of intervals in base partition
        BASE_MAX_NUM         : 500,
        DRAGGABLE_BASE_POINTS : 15,
        //user-draggable points
        ctrlMedpos : [
            {x:sf.medposOfModOrigin_x, y: sf.medposOfModOrigin_y},

            //four middle handles:
            {x: 74.8, y: 45.97726888798351},
            {x: 118.1, y: 72.70148453700233},
            {x: 161.4, y: 109.92474464283467},
            {x: 204.7, y: 166.52378909964816},

            /*
            //three middle handles
            {x:85,          y: 51.5},
            {x:139,         y: 89.0},
            {x:193,         y: 148.5 },
            */

            {x:248,         y: 259.5 }

            /*
            //cloned from public version,
            //works neatly
            //Top left
            {x: 0, y: 0},
            //Two middle handles
            {x: 102.7, y: 44.5},
            {x: 217.3, y: 151.0},
            //Bottom right
            {x: 265, y: 252},
            */
        ],
    });
    //******************************************
    // \\// model principals parameters
    //******************************************

    //*************************************
    // //\\ elected colors,
    //*************************************
    //predefined-topic colors [R, G, B, Adefault, A-mouse-highlighted]
    {
        const difference = [150, 50, 0, 0, 0.8 ];
        let curve = [0, 120, 0, 1, 1];
        let { given, legends, attention } = tprepo;
        given = [given[0],given[1],given[2], 1, 1];
        nspaste( el, {
            "given"                     : given,
            difference,
            "base"                      : curve,
            curve,

            "figure"                    : curve,
            "figure-area"               : [0,    80,  0, 0.4, 0.8 ],
            "figure-area-txt"           : [0,    80,  0, 0.7, 1],
            "circumscribed-rectangles":
                tprepo["circumscribed-rectangles"].concat(),
            "inscribed-rectangles":
                tprepo["inscribed-rectangles"].concat(),
            //[xx,  xx, xx, 0.1, 0.7],
            //opacity: 0.1 defalut, 0.7 highlighted
            "widest-rectangular" :
                fconf.sappId.indexOf('b1sec1lemma2')===0 ?
                    [0,  0, 100, 0.0, 0.7] :
                    [0,  0, 100, 0.4, 0.7],
            "circ-txt"                  : [0,  50, 100, 0.7, 1],
            "insc-txt"                  : [100,  0, 100, 0.7, 1],
            "widt-txt"                  : [0,  0, 100, 0.7, 1],
            'a--K--b--l'                : difference,
            'b--L--c--m'                : difference,
            'c--M--d--n'                : difference,
            'd--e--p--o'                : difference,
            attention,
            legends,
        });
    }
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
        {
           kind: LINE,
           rgn: 'AB',
           pcolor : el.given,
        },
        { rgn: 'BC',
                    pcolor : el.given,
        },
        { rgn: 'CD',
                    pcolor : el.given,
        },
        { rgn: 'AE',
                    pcolor : el.given,
        },
        { rgn: 'Aa',
                    pcolor : el.given,
        },
        { rgn: 'aK',
                    pcolor : el.given,
        },
        { rgn: 'AK',
                    pcolor : el.given,
        },
        { rgn: 'LB',
                    pcolor : el.given,
        },
        { rgn: 'MC',
                    pcolor : el.given,
        },
        // //\\ top rect sides
        //lower
        { rgn: 'cL',
                    pcolor : el.given,
        },
        { rgn: 'dM',
                    pcolor : el.given,
        },
        //circ, right rect sides
        { rgn: 'lB',
                    pcolor : el.given,
        },
        { rgn: 'mC',
                    pcolor : el.given,
        },
        { rgn: 'nD',
                    pcolor : el.given,
        },
        { rgn: 'oE',
                    pcolor : el.given,
        },
        //upper
        { rgn: 'od',
                    pcolor : el.given,
        },
        { rgn: 'nc',
                    pcolor : el.given,
        },
        { rgn: 'mb',
                    pcolor: el.given,
        },
        { rgn: 'la',
                    pcolor : el.given,
        },
        // \\// top rect sides
        { rgn: 'Bb',
                    pcolor : el.given,
        },
        { rgn: 'Cc',
                    pcolor : el.given,
        },
        { rgn: 'Dd',
                    pcolor : el.given,
        },
        { rgn: 'AF',
                    pcolor : el.given,
        },
        { rgn: 'Kb',
                    pcolor : el.given,
        },
    ]);
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    {
        kind: POINT,
        rgn: 'ctrl0',
        pcolor      : el.base,
        pos: [sconf.ctrlMedpos[0].x,
        sconf.ctrlMedpos[0].y],
        hideCaption: true,
    },
    { rgn: 'ctrl1',
            pcolor      : el.base,
            pos: [sconf.ctrlMedpos[1].x,
                  sconf.ctrlMedpos[1].y],
            hideCaption: true,
        },
        { rgn: 'ctrl2',
            pcolor      : el.base,
            pos: [sconf.ctrlMedpos[2].x,
                  sconf.ctrlMedpos[2].y],
            hideCaption: true,
        },
        { rgn: 'ctrl3',
            pcolor      : el.base,
            pos: [sconf.ctrlMedpos[3].x,
                  sconf.ctrlMedpos[3].y],
            hideCaption: true,
        },
        { rgn: 'ctrl4',
            pcolor      : el.base,
            pos: [sconf.ctrlMedpos[4].x,
                  sconf.ctrlMedpos[4].y],
            hideCaption: true,
        },
        { rgn: 'ctrl5',
            pcolor      : el.base,
            pos: [sconf.ctrlMedpos[5].x,
                  sconf.ctrlMedpos[5].y],
            hideCaption: true,
        },
        { rgn: 'A',
            pcolor      : el.base,
            letterAngle : -45,
        },
        { rgn: 'B',
            pcolor      : el.base,
            letterAngle : -45,
            doWhiteKernel : fconf.sappId === 'b1sec1lemma3',
        },
        { rgn: 'C',
            pcolor      : el.base,
            letterAngle : -45,
            doWhiteKernel : fconf.sappId === 'b1sec1lemma3',
        },
        { rgn: 'D',
            pcolor      : el.base,
            letterAngle : -45,
            doWhiteKernel : fconf.sappId === 'b1sec1lemma3',
        },
        { rgn: 'E',
            pcolor      : el.base,
            letterAngle : -45,
        },
        { rgn: 'F',
            pcolor      : el[ "widest-rectangular" ],
            letterAngle : 45,
        },
        { rgn: 'K',
            pcolor      : el.curve,
            letterAngle : -145,
            letterRotRadius : 40,
        },
        { rgn: 'L',
            pcolor      : el.curve,
            letterAngle : -145,
        },
        { rgn: 'M',
            pcolor      : el.curve,
            letterAngle : -145,
            letterRotRadius : 40,
        },
        { rgn: 'a',
            pcolor      : el.curve,
            letterAngle : 45,
        },
        { rgn: 'b',
            pcolor      : el.curve,
            letterAngle : 45,
        },
        //invizible point
        { rgn: 'c',
            pcolor      : el.curve,
            letterAngle : 45,
        },
        { rgn: 'd',
            pcolor      : el.curve,
            letterAngle : 45,
        },
        { rgn: 'e',
            pcolor      : el.curve,
            letterAngle : 45,
            hideCaption  : true,
        },
        { rgn: 'f',
            pcolor      : el.curve,
            letterAngle : 90,
        },
        { rgn: 'l',
            pcolor      : el.curve,
            letterAngle : 135,
        },
        { rgn: 'm',
            pcolor      : el.curve,
            letterAngle : 45,
        },
        { rgn: 'n',
            pcolor      : el.curve,
            letterAngle : 45,
        },
        { rgn: 'o',
            pcolor      : el.curve,
            letterAngle : 45,
        },
    ]);
    {
        //modifies points before sliders are added
        let kind = null;
        gshapes.forEach( gs=>{
            kind = gs.kind || kind;
            if( kind === POINT ){
                gs['stroke-width'] = 0.5;
                gs.initialR = 3;
            }
        });
    }
    ssF.conf__points2sliders({
        SLIDERS_OFFSET_PER_HEIGHT: 0.94,
        sliderPoints: [
        {   rgn: 'legend-slider',
            pcolor: el.legends,
            letterAngle: -90,
            letterRotRadius: 40,
            draggableX: true,
            undisplayAlways: false,
            doPaintPname: true,
            unscalable: true,

            animateDuration_flg: 5000,
            gconf: {
                unit: '',
                val: sf.MINP,
                min: sf.MINP,
                max: sf.BASE_MAX_NUM,
                caption: ( val, unit ) => {
                    return val + ((val===1) ? ' base' : ' bases');
                },
            },
            afterInitShapes: (gs_origin) => {
                const rgX = rg[gs_origin.rgn];
                const dr = fapp.stdL2.datareg;
                function rawval2floorVal( raw ){
                    return Math.max( gs_origin.gconf.min,
                           Math.floor(raw));
                }
                //level IV: processMoveEvent_IV
                rgX.processOwnMoveEent = ()=>{
                    rgX.val = rawval2floorVal( rgX.val );
                    dr.basesN = rgX.val;
                    stdMod.removeOutdatedClasses();
                    fapp.stdL2.appstate.basePointsAreMoving = false;
                    sDomF.shows_book_picture();
                    stdMod.adaptsPartitionChange(
                        rgX.val, dr.basePts );
                };
            },
        },
    ]});
    //*************************************
    // \\// points
    //*************************************
}
}