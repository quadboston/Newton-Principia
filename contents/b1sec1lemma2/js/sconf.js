(function(){
const {sn, nspaste, fapp, fconf, sconf, sf, sapp, originalPoints, } =
      window.b$l.apptree({ ssFExportList : { init_conf }     
});
var stdL2       = sn('stdL2', fapp );
var study       = sn('study', stdL2 );
var sdata       = sn('sdata', study );
var dr          = sn('datareg', stdL2 );
var appstate    = sn('appstate', stdL2 );

//=====================================
// //\\ presets data placeholders
//=====================================
Object.assign( dr, {
    basePts         : {offset:1, visOffset:0, list:[]},
    curvPts         : {offset:1, visOffset:0, list:[]},
    circRects       : {offset:0, visOffset:0, list:[]},
    InscrRects      : {offset:0, visOffset:0, list:[]},
    differenceRects : {offset:0, visOffset:0, list:[]},

    //baseLabels    : {offset:1, visOffset:0, list:[]},
    curvLabels      : {offset:0, visOffset:0, list:[]},
    leftLabels      : {offset:0, visOffset:0, list:[]},
    //righLabels      : {offset:0, visOffset:0, list:[]},
    //deltaOnLeft historically means "virtual majoranta-rectangle"
    //is on the right
    figureParams    : {minX:0, maxX:0, deltaOnLeft:true},
    ctrlPts         : [],
    partitionWidths : [1],
    basesN          : 4,
    movables        : {} //key-value for movable jswrap
});
appstate.movingBasePt = false;
sdata.view = { isInscribed:1, isCircumscribed:1, isFigureChecked:1 };
//=====================================
// \\// presets data placeholders
//=====================================
return;


function init_conf (){
    //as of Ap/13 2023 sets data in preset-data.js

    //***************************************************************
    // //\\ user scenarios
    //***************************************************************
    sf.dontDoMathJax = false;
    sf.enableTools = false;
    sf.enableStudylab = false;
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
    sf.mod2inn_scale = 1;
    //***************************************************************
    // \\// original picture dimensions for svg scene
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
    var MONITOR_Y_FLIP = 0;
    var SLIDERS_LEGEND_HEIGHT = 0;

    sf.mediaMoverPointDisabled = true;
    sconf.default_tp_lightness = 30;
    sconf.ONLY_MONOTONIC_CURVE = false;
    sconf.skipGenDragList = !false; //false is for media mover,
    //no dice: sconf.default_tp_lightness = 0;

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
    sf.SLIDERS_LEGEND_HEIGHT = SLIDERS_LEGEND_HEIGHT;
    sf.MONITOR_Y_FLIP = MONITOR_Y_FLIP;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //******************************************
    // \\// model principals parameters
    //******************************************

    //=====================================
    // //\\ configures application engine
    //=====================================
    Object.assign( sconf, {
        //:model
        BASE_MAX_NUM         : 500,
        DRAGGABLE_BASE_POINTS : 15,
        //user-adjustable points
        ctrlPtXYs_js : [
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

        ////GUI
        FINEPTS_RADIUS  : 10,
        MOVABLE_BASE_RADIUS : 3,
        CTRL_RADIUS     : 3,
        BASE_POINTS_REPELLING_DISTANCE : 5, //formerly PAD

        //:d8d
        //ms, softens drag8drop on performance-weak-devices
        //DRAG_POINTS_THROTTLE_TIME : 0,

        //"rectangular-distance" to point to be detected
        DRAGGEE_HALF_SIZE : 20,

        default_tp_stroke_width : 8,
        //rubbish:
        //show or hide drag points by mouse
        //dragPointVisibilityToggling  : false,-enter
    });
    //=====================================
    // \\// configures application engine
    //=====================================

    //*************************************
    // //\\ elected colors,
    //      to see templates what to override here, do
    //      look at conf/lemma.conf.js:
    //*************************************
    //predefined-topic colors [R, G, B, Adefault, A-mouse-highlighted]
    {
        let difference = [150, 50, 0, 0, 0.8 ];
        var tpel = sf.topicColors_elected = nspaste( {}, {
            "given"                     : [0,    100,  0 ],
            difference,
            "base"                      : [0,    100,  0 ],
            "curve"                     : [0,    100,  0 ],

            "figure"                    : [0,    100,  0 ],
            "figure-area"               : [0,    80,  0, 0.4, 0.8 ],
            "figure-area-txt"           : [0,    80,  0, 0.7, 1],

            "circumscribed-rectangles"  : [0,  50, 100, 0.4, 0.8],
            "inscribed-rectangles"      : [100,  0, 100, 0.4, 0.8],

            //[xx,  xx, xx, 0.1, 0.7],  opacity: 0.1 defalut, 0.7 highlighted
            "widest-rectangular"      : fconf.sappId.indexOf('b1sec1lemma2')===0 ?
                                                [0,  0, 100, 0.0, 0.7] :
                                                [0,  0, 100, 0.4, 0.7],

            "circ-txt"                  : [0,  50, 100, 0.7, 1],
            "insc-txt"                  : [100,  0, 100, 0.7, 1],
            "widt-txt"                  : [0,  0, 100, 0.7, 1],
            'a--K--b--l'                : difference,
            'b--L--c--m'                : difference,
            'c--M--d--n'                : difference,
            'd--e--p--o'                : difference,
        });
    }
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    Object.assign( originalPoints, {
        B : {
            pcolor      : tpel.given,
            letterAngle : -45,
            initialR    : 3,
        },

        K : {
            pcolor      : tpel.given,
            letterAngle : -145,
            letterRotRadius : 40,
            initialR    : 3,
        },

        L : {
            pcolor      : tpel.given,
            letterAngle : -145,
            initialR    : 3,
        },

        M : {
            pcolor      : tpel.given,
            letterAngle : -145,
            letterRotRadius : 40,
            initialR    : 3,
        },

        a : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
        },

        A : {
            pcolor      : tpel.given,
            letterAngle : -45,
            initialR    : 3,
        },

        F : {
            pcolor      : tpel[ "widest-rectangular" ],
            letterAngle : 45,
            initialR    : 3,
        },

        f : {
            pcolor      : tpel.given,
            letterAngle : 90,
            initialR    : 3,
        },

        C : {
            pcolor      : tpel.given,
            letterAngle : -45,
            initialR    : 3,
        },

        D : {
            pcolor      : tpel.given,
            letterAngle : -45,
            initialR    : 3,
        },

        E : {
            pcolor      : tpel.given,
            letterAngle : -45,
            initialR    : 3,
        },

        l : {
            pcolor      : tpel.given,
            letterAngle : 135,
            initialR    : 3,
        },

        b : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
        },

        //invizible point
        c : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
        },

        d : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
        },
        m : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
        },

        n : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
        },

        o : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
        },

        e : {
            pcolor      : tpel.given,
            letterAngle : 45,
            initialR    : 3,
            hideCaption  : true,
        },
    });

    //AB, BC, CD
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
                    //undisplayAlways : true,
                    //undisplay : true,
                },
        },
    ]);
    //*************************************
    // \\// original app points
    //*************************************
};
})();
