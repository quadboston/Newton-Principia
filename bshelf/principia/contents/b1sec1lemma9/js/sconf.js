(function(){
    const { sconf, sf, nspaste, fconf, rg, toreg, tprepo, tpelect, ssD,
            CONST, apush, gshapes,
          } = window.b$l.atree({ ssFList: { init_conf }});
    const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
    const el = tpelect;
return;


function init_conf(){
    //----------------------------------
    // //\\ study model parameters
    //----------------------------------
    const APP_MODEL_Y_RANGE = 1000;
    //----------------------------------
    // \\// study model parameters
    //----------------------------------

    //====================================================
    // //\\ subapp regim switches
    //====================================================
    sconf.enableStudylab            = false;
    sconf.enableTools               = false;
    //sconf.rgShapesVisible           = true;
    //====================================================
    // \\// subapp regim switches
    //====================================================

    //----------------------------------
    // //\\ paper diagram parameters
    //----------------------------------
    sf.medWidth    = 504;
    sf.medHeight   = 495;
    const pointA       = [ 28, 456 ];
    const pointe       = [ 28, 46 ];
    sf.medposOfModOrigin_x = pointA[0];
    sf.medposOfModOrigin_y = pointA[1];
    //pictureActiveArea = (pointA[1] - 46)
    sf.mod2med = (pointA[1] - 46) / APP_MODEL_Y_RANGE;
    //----------------------------------
    // \\// paper diagram parameters
    //----------------------------------

    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************
    //double back step ../../ is to reuse this path
    //in code for twin-lemma
    sf.mediaBgImage = "../../b1sec1lemma9/img/lemma9-original.png";
    //to comply standard layout, one must add these 2 lines:
    const medsizeScale =
        ( sf.medWidth + sf.medHeight ) / // medsize
        sconf.medsize_standard;

    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;
    //overrides "global", lemma.c onf.js::sconf
    //sconf.pointDecoration.r= 3;
    sconf.pointDecoration.r= 4;
    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 30;
    //--------------------------------------
    // //\\ does override engine defaults,
    //      in expands-c onf.js,
    //--------------------------------------
    sconf.default_tp_lightness = 30;
    sconf.TP_OPACITY_FROM_fixed_colors = true;
    //default_tp_stroke_width = Math.floor( 6 * medsizeScale ),
    //defaultLineWidth        = Math.floor( 1 * medsizeScale ),
    //handleRadius            = Math.floor( 3 * medsizeScale ),

    // //\\ principal tp-css pars
    //      see: topics-media-glocss.js
    //this makes hanle's border nicely thin
    sconf.nonhover_width    = Math.max( 1, Math.floor( 1*medsizeScale/1.6 ) );
    sconf.hover_width       = Math.max( 2, Math.floor( 7*medsizeScale/1.6 ) );

    //make effect apparently only for line-captions,
    //not for point-captions bs
    //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
    sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
    sconf.text_hover_width      = 1.5;
    // \\// principal tp-css pars
    // \\// does override engine defaults,
    // \\// decorational parameters
    //***************************************************************

    //*************************************
    // //\\ elected colors,
    //*************************************
    [
        'given',
        'proof',
        'result',
        'hidden',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    nspaste( el, { //need deep copy
        //:curves
        "ABC"               : el.given,
        "mainCurve"         : el.given,
        "Abc"               : el.proof,
        "remoteCurve"       : el.proof,

        //:areas
        "ABD"               : el.given,
        "ACE"               : el.given,
        "area-ABD"          : el.given,
        "area-ACE"          : el.given,
        "Abd"               : el.proof,
        "Ace"               : el.proof,
        "area-Abd"          : el.proof,
        "area-Ace"          : el.proof,
        //:linear areas
        "Afd"               : el.result,
        "Age"               : el.result,

        "ABDPerACE"         : el.given,
        "AD2PerAE2"         : el.result,
    });
    //-----------------------------------
    // \\// topic group colors,
    //-----------------------------------

    nspaste( sf, {
        //----------------------------------
        // //\\ scenario
        //----------------------------------
        SLIDER_LANDING_ANIMATION_DURATION: 0,
        ancestorClassToHideSlider: 'logic_phase--claim',
        //as of Jan 18, 2025, this is the only lemma
        //which creates landing-animation for slider,
        //doubtful value, why to not create slider at all?
        //hideProofSlider: false,
        //100; //display in "percents" of Ae
        MODEL_SCALE_TO_SLIDER_CAPTION_SCALE : 100,
        //----------------------------------
        // \\// scenario
        //----------------------------------

        //*************************************************
        // //\\ lemma model parameters
        //*************************************************
        APP_MODEL_Y_RANGE,
        //:ranges
        angleA_min : 5.71,  //Degrees
        pivot1y_max : APP_MODEL_Y_RANGE * 0.99,  //Left here for lemma 10
        pivot2x_max : APP_MODEL_Y_RANGE * 1.8,
        pivot2y_min : APP_MODEL_Y_RANGE * 0.3,
        pivot2y_max : APP_MODEL_Y_RANGE * 0.99,

        //bezier parameter t of point C on principal curve,
        //This value ensures line EC not too high and
        //upper bezier curve not cutoff.
        tC : 0.48,

        claimRatio : 0.74081,
        //range:
        claimRatio_max : 0.9, //Dy_per_Ey


        tiltAngle : 0.0, //controls EC-line tilt:
                         //in degrees;  0.0 is horizontal;
                         //from perspective of point E
                         //(+ve when C y above E y);
        //:ranges
        tiltAngle_min   : -15,
        tiltAngle_max   : 40,

        Cx_min          : 0.1,
        //*************************************************
        // \\// lemma model parameters
        //*************************************************
    });
    sf.areaScale = 1 / sf.APP_MODEL_Y_RANGE
                     / sf.APP_MODEL_Y_RANGE;

    //*************************************
    // //\\ shapes
    //*************************************
    apush( gshapes, [
        {
          kind: CURVE,
          //todm: merge mainCurve and dcurve, cpivots and
          //cpivotsMedpos
          rgn : 'dcurve',
          cpivots: [
            [0, 0],
            //The bezier middle pivot is constrained in
            //"model-upcreate.js"
            //beginning of "model_upcreate" function.
            [440, APP_MODEL_Y_RANGE],
            [ 1060, 567 ]

            /* very good for debug: simple curve
            [0, 0],
            [500, 1000],
            [1000, 0]
            */
          ].map( medpos => ({
            pos         : medpos,
            pcolor: el.given,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
          })),
          initShapes: (gshape, rgn)=>{
            rg[rgn].gshape2svg = _=>{};
            ///reduces pivots back to simple array
            rg[rgn].cpivotsMedpos = rg[rgn].cpivots.map( cp =>
                [cp.rgX.medpos[0], cp.rgX.medpos[1]] );
            ssD.tC = sconf.tC;
            ssD.claimRatio = sconf.claimRatio;
            toreg( 'tiltAngle' )( 'value', sconf.tiltAngle );
          },
        },
    ]);

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    {
        // used in proof
        kind: LINE,
        rgn: 'Ab',
        pcolor: el.proof,
    },
        { rgn: 'Ac', pcolor: el.proof },
        { rgn: 'Ad', pcolor: el.result },
        { rgn: 'Ae', pcolor: el.result, 'stroke-width' : 4 },

        { rgn: 'Ag', pcolor: el.result, 'stroke-width' : 4, },

        { rgn: 'ec', pcolor: el.proof },
        { rgn: 'db', pcolor: el.proof },

        { rgn: 'AB', pcolor: el.given },
        { rgn: 'AC', pcolor: el.given },
        { rgn: 'AD', pcolor: el.given },
        { rgn: 'AE', pcolor: el.given,
            'stroke-width' : 1, },
        { rgn: 'AG', pcolor: el.given },
        { rgn: 'EC', pcolor: el.given },
        { rgn: 'DB', pcolor: el.given },
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
        rgn: 'A',
        pos         : pointA,
        pcolor: el.given,
        letterAngle : -90,
    },
        //----------------------------------
        // //\\ original lemma parameters
        //----------------------------------
    { rgn: 'e',
            pos         : pointe,
            pcolor: el.proof,
            letterAngle : 90,
        },

        { rgn: 'B',
            pcolor: el.given,
            letterAngle : 0,
        },
        { rgn: 'C',
            pcolor: el.given,
            letterAngle : -45,
        },
        { rgn: 'D',
            pcolor: el.given,
            letterAngle : 215,
            initialR : 4,
        },
        { rgn: 'E',
            pcolor: el.given,
            letterAngle : 180,
        },
        { rgn: 'b',
            pcolor: el.proof,
            letterAngle : 0,
        },
        { rgn: 'c',
            pcolor: el.proof,
            letterAngle : -90,
        },
        { rgn: 'd',
            pcolor: el.proof,
            letterAngle : 180,
        },

        { rgn: 'F',
            pcolor: el.given,
            letterAngle : 135,
        },
        { rgn: 'G',
            pcolor: el.given,
            letterAngle : 45,
        },
        { rgn: 'f',
            pcolor: el.proof,
            letterAngle : 90,
        },
        { rgn: 'g',
            pcolor: el.proof,
            letterAngle : 90,
        },

        { rgn: 'pivotPoint1',
            pcolor: el.proof,
            doPaintPname : false,
            letterAngle : 90,
        },

        { rgn: 'pivotPoint2',
            pcolor: el.given,
            letterAngle : 90,
            doPaintPname : false,
        },
    ]);
    //*************************************
    // \\// points
    //*************************************
}
})();