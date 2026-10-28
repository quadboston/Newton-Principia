{
const { ns, nspaste, fconf, sconf, sf, tprepo, apush, gshapes,
        CONST, tpelect,
      } = window.b$l.atree({ ssFList: { init_conf }});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;

function init_conf (){
    //====================================================
    // //\\ subapp regim switches
    //====================================================
    sconf.enableStudylab            = false;
    sconf.enableTools               = true;
    sconf.rgShapesVisible           = false;
    //====================================================
    // \\// subapp regim switches
    //====================================================

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 839;
    sf.medHeight = 563;
    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sconf.medsize_standard
    sf.medposOfModOrigin_x = 140;
    sf.medposOfModOrigin_y = 61;
    sconf.diagramOrigin = [ 0, 0 ];
    var A = [ sf.medposOfModOrigin_x, sf.medposOfModOrigin_y];
    var r = [ sf.medposOfModOrigin_x, 531];
    var R = [ sf.medposOfModOrigin_x, 302];
    var B = [323, 156];
    var D = [474, sf.medposOfModOrigin_y];
    var d = [778, sf.medposOfModOrigin_y];
    var b = [514, 254];
    //var M = [50, sf.medposOfModOrigin_y];
    //sets position of axis-y for Calculus-framework, not
    //for model axis-y
    var ytop = [-151, 50];
    //model's spacial unit in pixels of the picture:
    sf.mod2med = R[1] - A[1];
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at c onf/c onf.js or especally at
    //      c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.mediaBgImage = "b1s1l6-diagram-3rded-b.png";
    sconf.TP_OPACITY_LOW_POINT = 1;
    sconf.TP_OPACITY_LOW = 1; // applied to points, lines, and
                              //table data
    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;
    //overrides "global", lemma.c onf.js::sc onf
    sconf.pointDecoration.r= 5;

    sconf.default_tp_lightness = 22;
    //todm ??
    //default_tp_stroke_width = Math.floor( 6 * medsizeScale ),
    sconf.default_tp_stroke_width = 8;

    //defaultLineWidth        = Math.floor( 1 * medsizeScale ),
    //handleRadius            = Math.floor( 3 * medsizeScale ),

    // //\\ principal tp-css pars
    //      see: topics-media-glocss.js
    //this makes hanle's border nicely thin
    sconf.nonhover_width    = Math.max( 1,
        Math.floor( 1*medsizeScale/1.6 ) );
    sconf.hover_width       = Math.max( 2,
        Math.floor( 7*medsizeScale/1.6 ) );
    //needs hover-width cls at svg-text-el,
    //aka for: Δsin(φ),
    //sconf.hover_width = 114;
    //make effect apparently only for line-captions,
    //not for point-captions bs
    //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
    //sconf.text_nonhover_width = 1;
    //needs hover-width cls at svg-text-el,
    //aka for: Δsin(φ),
    sconf.text_hover_width = 2;
    // \\// principal tp-css pars
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //--------------------------------------
    // //\\ lemma 7
    //--------------------------------------
    //todm ... bug: when decreasing then ratio begins worse:
    sconf.NON_ZERO_A_PREVENTOR = 0.0001;
    //--------------------------------------
    // \\// lemma 7
    //--------------------------------------

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

    ///does export topic colors
    nspaste( el, { //need deep copy
        //:basic topics
        "curve-AB"      : el.given,
        "left-curve-AB" : el.given, //patch for left branch
        "arc-AB"        : el.given,

        //proof
        "curve-Ab"      : el.proof,
        "arc-Ab"        : el.proof,

        //addendum
        "phi0"          : el.given,
        //"deltaphi"      : el.given,
        "tangentPsy"    : el.result,
        'angleBAD'      : el.given,
        'conterminousRatio' : el.proof,
    });
    //*************************************
    // \\// elected colors,
    //*************************************

    //-------------------------------------
    // //\\ prepares points
    // //\\ curve pars
    //      points for divided
    //      differences interpolation
    //----------------------------------
    /*
    var minusX1 = 148 -  sf.medposOfModOrigin_x;
    var minusX2 = 161 -  sf.medposOfModOrigin_x;
    var minusX3 = 202 -  sf.medposOfModOrigin_x;
    var minusX4 = 259 -  sf.medposOfModOrigin_x;
    var minusX5 = 305 -  sf.medposOfModOrigin_x;
    var minusX6 = B[0] -  sf.medposOfModOrigin_x;
    var minusX7 = 353 -  sf.medposOfModOrigin_x;
    var minusX8 = 360.5 -  sf.medposOfModOrigin_x;
    */
    var givenCurve_pivots = [
        //extending the curve to the left is quite a work bs
        //we need to change hard-coded tangent
        [148,62],
        [161,64],
        [202,75],
        [259,100],
        [305,135],
        [B[0], B[1]],
        [353,203],
        //[360.5, 239.0], //"oversampling"
    ];
    {
        const MONITOR_Y_FLIP = -1;
        const med2mod = 1/sf.mod2med;
        const factor = MONITOR_Y_FLIP * med2mod;
        sf.givenCurve_pivots_inModel =
            givenCurve_pivots.map( opoint =>
            [ ( opoint[0] -  sf.medposOfModOrigin_x ) * med2mod,
                ( opoint[1] - sf.medposOfModOrigin_y +
                //additional tune-up: shifting curve
                //exactly into origin A
                sf.medposOfModOrigin_y - 61.085869

                ) * factor,
            ]
        );
    }
    //----------------------------------
    // \\// curve pars
    // \\// prepares points
    //----------------------------------


    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    {
        // used in proof
        kind: LINE,
        rgn: 'Ad',
        pcolor: el.context,
    },
        { rgn: 'Ar', pcolor: el.given },
        { rgn: 'Ab', pcolor: el.proof },
        { rgn: 'rd', pcolor: el.proof },

        { rgn: 'dr-decorpoint,d', pcolor: el.proof },
        { rgn: 'dr', pcolor: el.proof },

        //l7
        { rgn: 'bd', pcolor: el.proof },
        { rgn: 'BD', pcolor: el.given },  //lemma 7, coroll 1
        { rgn: 'BF', pcolor: el.given },
        { rgn: 'AF', pcolor: el.given },
        { rgn: 'AG', pcolor: el.given },
        { rgn: 'AE', pcolor: el.given },
        { rgn: 'BG', pcolor: el.given },
        { rgn: 'be', pcolor: el.proof },

        //sin(x)/x
        { rgn: 'Br', pcolor: el.given },

        { rgn: 'line-dr-start,dr-decorpoint',
          pcolor: el.proof, undisplay : true },

            //:context
        { rgn: 'ylow,ytop', pcolor: el.context, },
        { rgn: 'xlow,xtop', pcolor: el.context, },
        { rgn: 'O,ytop', pcolor: el.context, },

        //cirle radius
        { rgn: 'AO', pcolor: el.given, 'stroke-width' : 1, },
        { rgn: 'A,DLeft', pcolor: el.given, 'stroke-width' : 2, },

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
        { rgn: 'AB', pcolor: el.given },
        { rgn: 'AD', pcolor: el.given },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    {
        //:context
        //axis-y addendum
        kind: POINT,
        rgn: 'ytop',
        pos             : ytop,
        letterAngle     : 90,
        caption         : 'axis y',
        letterRotRadius : 35,
        pcolor: el.context,
     },

     { rgn: "ylow",
            letterAngle : 90,
        },
     { rgn: 'O',
            letterAngle : -90,
            pcolor: el.given,
        },
     { rgn:    'axis-y_X_rd',
        },

        //axis-x addendum
     { rgn:    'xtop',
            letterAngle     : 130,
            caption         : 'axis x',
            letterRotRadius : 40,
            //pcolor: el.given,
        },
     { rgn:    "xlow",
            letterAngle : 90,
        },

        //beyond X and L to enable show of tangent angle
     { rgn:    "line-AL-end",
        },

        //extends rd to show an angle
     { rgn:    "line-dr-start",
            letterAngle : 30,
        },
        ///modified point r, closer to d
     { rgn:    "dr-decorpoint",
            caption : 'r',
            pcolor: el.proof,
            letterAngle : -90,
            letterRotRadius : 20,
        },

     { rgn:    "y0",
            caption     : 'yₒ',
            letterAngle : 225,
            pcolor: el.given,
        },
        //By
     { rgn:    'y',
            caption     : 'y',
            letterAngle : 45,
            pcolor: el.given,
        },
        //Ax
     { rgn:    'x',
            caption     : 'x',
            letterAngle : -45,
            pcolor: el.given,
        },
        //Bx
     { rgn:    'x0',
            caption     : 'xₒ',
            letterAngle : 135,
            pcolor: el.given,
        },

        // //\\ magnified points
     { rgn:    'Y0',
            pos             : A,
            caption         : 'Yₒ',
            letterAngle     : 210,
            letterRotRadius : 50,
            pcolor: el.proof,
        },
        //BY
     { rgn:    'Y',
            caption         : 'Y',
            letterAngle     : 180,
            letterRotRadius : 35,
            pcolor: el.proof,
        },
        //AX0
      { rgn:   'X0',
            caption         : 'Xₒ',
            letterAngle     : -90,
            pcolor: el.proof,
        },
        //BX
      { rgn:   'X',
            caption         : 'X',
            letterAngle     : -90,
            pcolor: el.proof,
        },
        // \\// magnified points


        //:originals from Book
      { rgn:   'A',
            //assigment by reference to pos is safe:
            //no parasite links, pos is recalculated later
            pos         : A,
            letterAngle : 90,
            pcolor: el.given,
        },
      { rgn:   'r',
            pos: r,
            letterAngle : 135,
            pcolor: el.given,
        },
      { rgn:   'R',
            pos: R,
            letterAngle : 135,
            pcolor: el.given,
        },
      { rgn:   'B',
            pos: B,
            letterAngle : 0,
            pcolor: el.given,
        },
        /*
        'B-kernelx' : {
            cssClass : 'hover-width',
        },
        */

     { rgn:    'C',
            letterAngle : 45,
            letterRotRadius : 13,
            pcolor: el.given,
        },

     { rgn:    'D',
            pos: D,
            letterAngle : 90,
            pcolor: el.given,
        },
     { rgn:    'DLeft',
            letterAngle : 90,
            pcolor: el.given,
            doPaintPname : false,
        },

        //proof
     { rgn:    'b',
            pos: b,
            letterAngle : 0,
            pcolor: el.proof,
        },

     { rgn:    'c',
            letterAngle : 45,
            letterRotRadius : 13,
            pcolor: el.proof,
        },


     { rgn:    'd',
            pos         : d,
            letterAngle : 90,
            pcolor: el.proof,
        },

     { rgn:    'curveStart',
            pos : [ A[0]-80, 0 ],
        },

     { rgn:    'curveEnd',
            pos : [B[0]+50,0],
        },
     { rgn:    'curveLeftEnd',
            pos : [250,100],
        },

        //lemma 7, coroll 1
     { rgn:    'F',
            letterAngle : 90,
            pcolor: el.given,
        },
     { rgn:    'G',
            letterAngle : 90,
            pcolor: el.given,
        },
     { rgn:    'E',
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
}
}