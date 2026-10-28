{ const { ns, eachprop, haz, nspaste, fconf, sconf, sf, tprepo,
          tpelect, gshapes, apush, CONST } =
          window.b$l.atree({ ssFList: { init_conf: function(){

    const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
    const el = tpelect;

    //overrides "global", lemma.c onf.js::sconf
    // opacity of items defined in gshapes of points and line below
    sconf.TP_OPACITY_LOW_POINT = 1;
    // applied to items defined in tpelect below
    sconf.TP_OPACITY_LOW = 1;
    // darkness of lines, curves
    sconf.default_tp_lightness = 22;
    //size of slider circles
    sconf.default_tp_stroke_width = 8;
    // radius of all points, both static and slider
    sconf.pointDecoration.r= 5;

    //====================================================
    // //\\ subapp regim switches
    //====================================================
    // true to include options as in Book 3 Lemma 5
    sconf.enableStudylab  = false;
    sconf.enableTools     = true;
    // false to show only relevant lines, points, labels
    sconf.rgShapesVisible = false;
    //====================================================
    // \\// subapp regim switches
    //====================================================
    //double back step ../../ is to reuse this path in code for lemma7
    sf.mediaBgImage = "../../b1sec1lemma8/img/d.png";

    //making size to better fit lemma's diagram labels
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;

    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 858; // size of svg div
    sf.medHeight = 566;
    const orx = sf.medposOfModOrigin_x = 166; // affect the shape of ACB
    const ory = sf.medposOfModOrigin_y = 63;

    //model's spacial unit in pixels of the picture:
    //conversion factor to calc values displayed in data table
    sf.mod2med = 239;

    const A = [orx, ory];
    const B = [358, 165];
    const D = [496, ory];

    // determines distance between B and b
    sconf.b_per_B_original = 1.931578947;

    //*************************************
    // //\\ elected colors,
    //*************************************
    [
        'context',
        'given',
        'proof',
        'result',
        'hidden',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    nspaste( el, { //need deep copy
        //:basic topics
        //given (claim)
        "curve-AB"      : el.given, // ACB and curve segment after B
        "left-curve-AB" : el.given, // curve segment before A
        "arc-AB"        : el.given, // ACB (redundant?)

        //proof
        "arc-Ab"        : el.proof, // Acb

        // the rest are only used when rgShapesVisible === true
        // todo: maybe some are not used at all
        "curve-Ab"      : el.proof,

        //addendum
        "phi0"          : el.given,
        "deltaphi"      : el.given,
        "tangentPsy"    : el.result,
        'angleBAD'      : el.given,
        'conterminousRatio' : el.proof,

        // triangles
        'RAB' : el.given,
        'RACB' : el.given,
        'RAD' : el.given,
        'RACB-RAB' : el.given,
        'RAD-RAB' : el.given,

        'rAb' : el.proof,
        'rAcb' : el.proof,
        'rAd' : el.proof,
        'rAcb-rAb' : el.proof,
        'rAd-rAb' : el.proof,
    });
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    {
        // used in proof
        kind: LINE,
        rgn: 'AB',
        pcolor: el.given,
    },
        { rgn: 'AR', pcolor: el.given },
        { rgn: 'AD', pcolor: el.given },
        // to left of A
        { rgn: 'A,DLeft', pcolor: el.given, 'stroke-width' : 2, },

        { rgn: 'RD', pcolor: el.given },
        { rgn: 'BR', pcolor: el.given },

        // proof (shown in blue)
        { rgn: 'Ab', pcolor: el.proof },

        { rgn: 'A,imageOfD', pcolor: el.proof }, // Ad
        { rgn: 'A,imageOfR', pcolor: el.proof }, // Ar
        { rgn: 'imageOfR,imageOfD', pcolor: el.proof }, // rd
        { rgn: 'imageOfR,b', pcolor: el.proof }, //rb

        // questionable
        { rgn: 'Ad', pcolor: el.hidden }, // todo: Ad dup
        { rgn: 'Ar', pcolor: el.hidden }, // todo: this line should not exist
        { rgn: 'rd', pcolor: el.hidden }, // todo: this line should not exist
        { rgn: 'rb', pcolor: el.hidden }, // todo: this doesn't seem to exist


        // the rest of these are only use if rgShapesVisible
        // todo: maybe some not at all in L8?

        { rgn: 'dr-decorpoint,d', pcolor: el.proof },
        { rgn: 'dr', pcolor: el.proof },

        //l7
        { rgn: 'bd', pcolor: el.hidden },
        { rgn: 'be', pcolor: el.hidden },

        //l7
        { rgn: 'BD', pcolor: el.hidden },  //lemma 7, coroll 1
        { rgn: 'BF', pcolor: el.hidden },
        { rgn: 'AF', pcolor: el.hidden },
        { rgn: 'AG', pcolor: el.hidden },
        { rgn: 'AE', pcolor: el.hidden },
        { rgn: 'BG', pcolor: el.hidden },

        //sin(x)/x
        { rgn: 'Br', pcolor: el.given },

        { rgn: 'line-dr-start,dr-decorpoint', pcolor: el.proof, undisplay : true },

            //:context
        { rgn: 'ylow,ytop', pcolor: el.context, },
        { rgn: 'xlow,xtop', pcolor: el.context, },
        { rgn: 'O,ytop', pcolor: el.context, },

        //cirle radius
        { rgn: 'AO', pcolor: el.given, 'stroke-width' : 1, },

        //cirle radius
        { rgn: 'BO', pcolor: el.given, 'stroke-width' : 1, },

            //x-drops to axix x
        { rgn: 'A,x0', pcolor: el.given, 'stroke-width' : 1, },
        { rgn: 'Bx', pcolor: el.given, 'stroke-width' : 1, },
            //y-drops to axix y
        { rgn: 'A,y0', pcolor: el.given, 'stroke-width' : 1, },
        { rgn: 'By', pcolor: el.given, 'stroke-width' : 1, },


        //dy
        { rgn: 'y0,y', pcolor: el.given, 'stroke-width' : 8, },
        //dx
        { rgn: 'x0,x', pcolor: el.given, 'stroke-width' : 8, },

        { rgn: 'A,line-AL-end', pcolor: el.result },

        //DY
        { rgn: 'A,Y', pcolor: el.proof, 'stroke-width' : 8, },
        //DX
        { rgn: 'X0,X', pcolor: el.proof, 'stroke-width' : 8, },

        //tangent
        { rgn: 'AL', pcolor: el.result },
        { rgn: 'Ae', pcolor: el.proof },

        { rgn: 'AE', pcolor: el.given },
        { rgn: 'BE', pcolor: el.given },
    ]);
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    // styles, positions, and animations of points and their labels
    //originals from Book
    {
        kind: POINT,
        rgn: 'A',
        //assigment by reference to pos is safe: no parasite links,
        //pos is recalculated later
        pos         : A,
        letterAngle : 90,
        pcolor: el.given,
    },
    { rgn: 'B',
            pos: B,
            letterAngle : 0,
            pcolor: el.given,
        },
    { rgn: 'C',
            letterAngle : 45,
            letterRotRadius : 13,
            pcolor: el.given,
        },
        { rgn: 'D',
            pos: D,
            letterAngle : 90,
            pcolor: el.given,
        },
        { rgn: 'R',
            letterAngle : 135,
            pcolor: el.given,
            draggableX  : true,
            draggableY  : true,
        },
        { rgn: 'fi',
            caption : "φ",
            pcolor: el.shadow,
            letterAngle : 180,
            draggableX  : true,
            draggableY  : true,
        },
        { rgn: 'c',
            letterAngle : 45,
            letterRotRadius : 18,
            pcolor: el.proof,
        },
        { rgn: 'b',
            letterAngle : 0,
            pcolor: el.proof,
        },

        ///modified point r, closer to d
        { rgn: 'imageOfR',
            caption : "r",
            pcolor: el.proof,
            letterAngle : -45,
            letterRotRadius : 30,
        },

        ///modified point r, closer to d
        { rgn: 'imageOfD',
            caption : "d",
            pos : D,
            pcolor: el.proof,
            letterAngle : -90,
            letterRotRadius : 30,
        },

        { rgn: 'curveStart',
            pos : [ A[0]-80, 0 ],
        },
        { rgn: 'curveEnd',
            pos : [B[0]+50,0],
        },
        { rgn: 'curveLeftEnd',
            pos : [250,100],
        },


        // the rest are only used when rgShapesVisible
        // todo: maybe some are not used at all
        { rgn: 'd',
            caption : 'dₒ',
            letterAngle : 90,
            pcolor: el.proof,
        },
        { rgn: 'r',
            caption : 'rₒ',
            letterAngle : 135,
            pcolor: el.given,
        },

        //axis-y addendum
        { rgn: 'ytop',
            letterAngle     : 90,
            caption         : 'axis y',
            letterRotRadius : 35,
            pcolor: el.context,
        },
        { rgn: 'ylow',
            letterAngle : 90,
        },
        { rgn: 'O',
            letterAngle : -90,
            pcolor: el.given,
        },
        { rgn: 'axis-y_X_rd',
        },

        //axis-x addendum
        { rgn: 'xtop',
            letterAngle     : 130,
            caption         : 'axis x',
            letterRotRadius : 40,
            //pcolor: el.given,
        },
        { rgn: 'xlow',
            letterAngle : 90,
        },

        //beyond X and L to enable show of tangent angle
        { rgn: 'line-AL-end',
        },

        //extends rd to show an angle
        { rgn: 'line-dr-start',
            letterAngle : 30,
        },
        ///modified point r, closer to d
        { rgn: 'dr-decorpoint',
            caption : 'r',
            pcolor: el.proof,
            letterAngle : -90,
            letterRotRadius : 20,
        },


        { rgn: 'y0',
            caption     : 'yₒ',
            letterAngle : 225,
            pcolor: el.given,
        },
        //By
        { rgn: 'y',
            caption     : 'y',
            letterAngle : 45,
            pcolor: el.given,
        },
        //Ax
        { rgn: 'x',
            caption     : 'x',
            letterAngle : -45,
            pcolor: el.given,
        },
        //Bx
        { rgn: 'x0',
            caption     : 'xₒ',
            letterAngle : 135,
            pcolor: el.given,
        },

        // //\\ magnified points
        { rgn: 'Y0',
            pos             : A,
            caption         : 'Yₒ',
            letterAngle     : 210,
            letterRotRadius : 50,
            pcolor: el.proof,
        },
        //BY
        { rgn: 'Y',
            caption         : 'Y',
            letterAngle     : 180,
            letterRotRadius : 35,
            pcolor: el.proof,
        },
        //AX0
        { rgn: 'X0',
            caption         : 'Xₒ',
            letterAngle     : -90,
            pcolor: el.proof,
        },
        //BX
        { rgn: 'X',
            caption         : 'X',
            letterAngle     : -90,
            pcolor: el.proof,
        },
        // \\// magnified points

        { rgn: 'DLeft',
            letterAngle : 90,
            pcolor: el.given,
            doPaintPname : false,
        },

        //lemma 7, coroll 1
        { rgn: 'F',
            letterAngle : 90,
            pcolor: el.given,
        },
        { rgn: 'G',
            letterAngle : 90,
            pcolor: el.given,
        },
        { rgn: 'E',
            letterAngle : 90,
            pcolor: el.given,
        },
        { rgn: 'e',
            letterAngle : 90,
            pcolor: el.proof,
        },
        { rgn: 'L',
            letterAngle : -45,
            pcolor: el.result,
        },
    ]);
    //*************************************
    // \\// points
    //*************************************

    //----------------------------------
    // //\\ curve pars
    //     points for divided differences interpolation
    //
    // *** used only if sconf.rgShapesVisible === true
    //----------------------------------
    {
        //const ww1 = [204,67];
        const ww1 = [244,82];
        //const ww2 = [272,94];
        const ww2 = [300,110];
        const ww3 = B;
        apush( gshapes, [
            {
                kind: POINT,
                rgn: 't1',
                pos         : ww1,
                letterAngle : 90,
                pcolor: el.given,
            },
            {
                rgn: 't2',
                pos: ww2,
                letterAngle : 90,
                pcolor: el.given,
            },
        ]);
        const givenCurve_pivots = [
            //make curve symmetrical in respect to axis Y
            [2*A[0]-ww3[0],ww3[1]],
            [2*A[0]-ww2[0],ww2[1]],
            [2*A[0]-ww1[0],ww1[1]],

            [A[0], A[1]],
            ww1,
            ww2,
            [ww3[0], ww3[1]],
            [377,206],
        ];
        const ww_MONITOR_Y_FLIP = -1;
        const ww_med2mod_scale = 1/sf.mod2med;
        const ww_factor = ww_MONITOR_Y_FLIP * ww_med2mod_scale;
        sf.givenCurve_pivots_inModel = givenCurve_pivots.map( opoint =>
            [ ( opoint[0] - orx ) * ww_med2mod_scale,
                ( opoint[1] - ory ) * ww_factor,
            ]
        );
    }
    //----------------------------------
    // \\// curve pars
    //----------------------------------
}}})}