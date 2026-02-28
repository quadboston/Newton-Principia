(function(){

const {sn, nspaste, fapp, fconf, sconf, sf, sapp, originalPoints,
       tpid2arrc_repo, tpid2arrc_elect,} =
      window.b$l.apptree({ ssFExportList : { init_conf }
});
return;


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
    sf.pictureWidth = 282;
    sf.pictureHeight = 290;

    sf.modorInPicX = 31.5;
    sf.modorInPicY = 29;
    //.set it from graph editor
    sf.originX_onPicture = sf.modorInPicX;
    sf.originY_onPicture = sf.modorInPicY +
                           259 - sf.modorInPicY; //pic. active area,
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
    //      look at conf/conf.js or especally at conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    //sconf.TP_OPACITY_FROM_fixed_colors = true;
    //sf.mediaBgImage = "diagram.png";
    //sf.default_tp_lightness = 30;

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
    sf.MAXP=50; //todm what is this

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
            {x:sf.modorInPicX, y: sf.modorInPicY},

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
        let { given, legends } = tpid2arrc_repo;
        let curve = [0, 120, 0, 1, 1];
        given = [given[0],given[1],given[2], 1, 1];
        const difference = [150, 50, 0, 0, 0.8 ];

        var tpel = nspaste( tpid2arrc_elect, {
            "given"                     : given,
            difference,
            "base"                      : curve,
            curve,

            "figure"                    : curve,
            "figure-area"               : [0,    80,  0, 0.4, 0.8 ],
            "figure-area-txt"           : [0,    80,  0, 0.7, 1],

            "circumscribed-rectangles"  : [0,  50, 100, 0.4, 0.8],
            "inscribed-rectangles"      : [100,  0, 100, 0.4, 0.8],

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
            attention                   : tpid2arrc_repo.attention,
            legends,
        });
    }
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    //*************************************
    // \\// bricks for originalPoints
    //*************************************
    //-------------------------------------
    // //\\ prepares points
    //-------------------------------------
    //-------------------------------------
    // \\// prepares points
    //-------------------------------------
    nspaste( originalPoints, {
       ctrl0 : {
            pcolor      : tpel.base,
            pos: [sconf.ctrlMedpos[0].x,
                  sconf.ctrlMedpos[0].y],
            hideCaption: true,
        },
        ctrl1 : {
            pcolor      : tpel.base,
            pos: [sconf.ctrlMedpos[1].x,
                  sconf.ctrlMedpos[1].y],
            hideCaption: true,
        },
        ctrl2 : {
            pcolor      : tpel.base,
            pos: [sconf.ctrlMedpos[2].x,
                  sconf.ctrlMedpos[2].y],
            hideCaption: true,
        },
        ctrl3 : {
            pcolor      : tpel.base,
            pos: [sconf.ctrlMedpos[3].x,
                  sconf.ctrlMedpos[3].y],
            hideCaption: true,
        },
        ctrl4 : {
            pcolor      : tpel.base,
            pos: [sconf.ctrlMedpos[4].x,
                  sconf.ctrlMedpos[4].y],
            hideCaption: true,
        },
        ctrl5 : {
            pcolor      : tpel.base,
            pos: [sconf.ctrlMedpos[5].x,
                  sconf.ctrlMedpos[5].y],
            hideCaption: true,
        },
        A : {
            pcolor      : tpel.base,
            letterAngle : -45,
        },
        B : {
            pcolor      : tpel.base,
            letterAngle : -45,
            doWhiteKernel : fconf.sappId === 'b1sec1lemma3',
        },
        C : {
            pcolor      : tpel.base,
            letterAngle : -45,
            doWhiteKernel : fconf.sappId === 'b1sec1lemma3',
        },
        D : {
            pcolor      : tpel.base,
            letterAngle : -45,
            doWhiteKernel : fconf.sappId === 'b1sec1lemma3',
        },
        E : {
            pcolor      : tpel.base,
            letterAngle : -45,
        },
        F : {
            pcolor      : tpel[ "widest-rectangular" ],
            letterAngle : 45,
        },
        K : {
            pcolor      : tpel.curve,
            letterAngle : -145,
            letterRotRadius : 40,
        },
        L : {
            pcolor      : tpel.curve,
            letterAngle : -145,
        },
        M : {
            pcolor      : tpel.curve,
            letterAngle : -145,
            letterRotRadius : 40,
        },
        a : {
            pcolor      : tpel.curve,
            letterAngle : 45,
        },
        b : {
            pcolor      : tpel.curve,
            letterAngle : 45,
        },
        //invizible point
        c : {
            pcolor      : tpel.curve,
            letterAngle : 45,
        },
        d : {
            pcolor      : tpel.curve,
            letterAngle : 45,
        },
        e : {
            pcolor      : tpel.curve,
            letterAngle : 45,
            hideCaption  : true,
        },
        f : {
            pcolor      : tpel.curve,
            letterAngle : 90,
        },
        l : {
            pcolor      : tpel.curve,
            letterAngle : 135,
        },
        m : {
            pcolor      : tpel.curve,
            letterAngle : 45,
        },
        n : {
            pcolor      : tpel.curve,
            letterAngle : 45,
        },
        o : {
            pcolor      : tpel.curve,
            letterAngle : 45,
        },
        //-------------------
        // //\\ bottomSlider
        //-------------------
        bottomSlider : {
            caption : 'bases count',
            pos : [ sf.pictureWidth * 0.5, sf.pictureHeight * 0.95 ],
            pcolor : tpel.legends,
            letterAngle : -90,
            letterRotRadius : 40,
            draggableX  : true,
            undisplayAlways  : false,
            doPaintPname : true,
            unscalable  : true,
        },
        bottomSliderStart : {
            pos : [ sf.pictureWidth * 0.1, sf.pictureHeight * 0.95 ],
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
        },
        bottomSliderEnd : {
            pos : [ sf.pictureWidth * 0.9, sf.pictureHeight * 0.95 ],
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
        },
        //-------------------
        // \\// bottomSlider
        //-------------------
    });
    Object.values( originalPoints ).forEach( pt => {
        pt['stroke-width'] = 0.5;
        pt.initialR = 3;
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*********************************************
    // //\\ pcolor -> elected topics,
    //      colors can be set in points and
    //      then added to elected topics
    //*********************************************
    //*********************************************
    // \\// pcolor -> elected topics,
    //*********************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = nspaste( {}, [
        { AB : {
                    pcolor : tpel.given,
                },
        },
        { BC : {
                    pcolor : tpel.given,
                },
        },
        { CD : {
                    pcolor : tpel.given,
                },
        },
        { AE : {
                    pcolor : tpel.given,
                },
        },
        { Aa : {
                    pcolor : tpel.given,
                },
        },
        { aK : {
                    pcolor : tpel.given,
               },
        },
        { AK : {
                    pcolor : tpel.given,
                },
        },
        { LB : {
                    pcolor : tpel.given,
                },
        },
        { MC : {
                    pcolor : tpel.given,
                },
        },
        // //\\ top rect sides
        //lower
        { cL : {
                    pcolor : tpel.given,
                },
        },
        { dM : {
                    pcolor : tpel.given,
                },
        },
        //circ, right rect sides
        { lB : {
                    pcolor : tpel.given,
                },
        },
        { mC : {
                    pcolor : tpel.given,
                },
        },
        { nD : {
                    pcolor : tpel.given,
                },
        },
        { oE : {
                    pcolor : tpel.given,
                },
        },

        //upper
        { od : {
                    pcolor : tpel.given,
                },
        },
        { nc : {
                    pcolor : tpel.given,
                },
        },
        { mb : {
                    pcolor: tpel.given,
               },
        },
        { la : {
                    pcolor : tpel.given,
                },
        },
        // \\// top rect sides


        { Bb : {
                    pcolor : tpel.given,
                },
        },
        { Cc : {
                    pcolor : tpel.given,
                },
        },
        { Dd : {
                    pcolor : tpel.given,
                },
        },
        { AF : {
                    pcolor : tpel.given,
                },
        },

        { Kb : {
                    pcolor : tpel.given,
               },
        },
        { 'bottomSliderStart,bottomSliderEnd' :
            { pcolor : tpel.diagram }
        },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************
}
})();
