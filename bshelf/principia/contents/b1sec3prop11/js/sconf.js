{
const { nspaste, fconf, sf, tprepo, stripp, CONST, apush, gshapes,
        tpelect, stdMod, rg
      } = window.b$l.atree({ ssFList: { init_conf }});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;


function init_conf (){
    //tools
    sf.enableStudylab = false;
    //true enables framework zoom:
    sf.enableTools = true;

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 841;
    sf.medHeight = 728;

    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sf.medsize_standard

    var C = [409, 408 ];

    sf.medposOfModOrigin_x = C[0]; //for model's axis x
    sf.medposOfModOrigin_y = C[1]; //for model's axis y
    sf.diagramOrigin = [ 0, 0 ];

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = 360;
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************


    //***************************************************************
    // //\\ GUI cosmetics
    //***************************************************************
    sf.allLettersAreHidden = true;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //pos of P
    sf.parQ = 0.250 * Math.PI;

    //----------------------------
    // //\\ sconf.curve
    //----------------------------
    ///this is not trully static config, it
    ///changes along code execution
    sf.curve = stripp({
        ellipseA: 1.07,
        eccentricity: 0.59498295,
        orbit_q_start: 0,
        orbit_q_end: 2 * Math.PI,
        diagramOrigin: sf.diagramOrigin,
        curveParFi0: 0.0 * Math.PI, //todm bug?
    });
    sf.curve.ellipseB = Math.sqrt( Math.abs(
            1 - sf.curve.eccentricity*sf.curve.eccentricity ) ) //Lambda
        * sf.curve.ellipseA; //0.86;
    {
        // gets ellipse parameters
        let ellB2 = sf.curve.ellipseB*sf.curve.ellipseB;
        let ellA2 = sf.curve.ellipseA*sf.curve.ellipseA;
        let excentris2 = 1 - ellA2/ellB2;
        let excentris = Math.sqrt( excentris2 );
        sf.curve.ellipseFocus = Math.sqrt( ellA2 - ellB2 );
    }    sf.curve.ellipseAOriginal  = sf.curve.ellipseA;
    //----------------------------
    // \\// sconf.curve
    //----------------------------

    sf.force_law = bP => 1/(bP.r2);
    //******************************************
    // \\// model principals parameters
    //******************************************


    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
    const FT = sf.TIME_IS_FREE_VARIABLE =
           false; //todo patch //true; //vs q is free variable
    sf.CURVE_REVOLVES = true; //true for cyclic orbit
    sf.DQ_SLIDER_MAX = FT ? null : 0.69;
    sf.DQ_SLIDER_MIN = FT ? null : 0.0001; //todo patch
    sf.DT_SLIDER_MAX = FT ? 0.32 : null;
    sf.DT_FRACTION_OF_T_RANGE_MAX = 0.23;
    sf.Q_STEPS = 1500;
    sf.TIME_STEPS = 1500;
    sf.DATA_GRAPH_STEPS = 500;
    sf.RESHAPABLE_ORBIT = 2; //omitted or 1-once, 2-many
    //-------------------------------------------
    // \\// calculation algo parameters
    //-------------------------------------------


    //intervals of dt or dq to construct an arc for
    //displacement or sagitta,
    if( FT ){
        sf.Dt0 = 0.39;
    } else {
        sf.Dq0 = 0.19;
    }
    //***************************************************************
    // \\// math model auxilaries
    //***************************************************************

    //************************************************
    // //\\ elected colors,
    //      does import topic colors to elected colors
    //      from c onf/lemma.c onf.js
    //************************************************
    [
        'given',
        'proof',
        'result',
        'body',
        'hidden',
        'context',
        'curvature',
        'borbit',
        'force',
        'displacement',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    //************************************************
    // \\// elected colors,
    //************************************************

    apush( gshapes, [
    {
        kind: CURVE,
        rgn: 'borbit',
        initShapes: (gshape)=>{
            //creates rgShape.bodyq2xy() with pars. in closure,
            (function(){
                const {
                    ///parameters in closure for performance
                    ellipseA, ellipseB, orbit_q_start, diagramOrigin
                } = sf.curve;
                gshape.rgShape.bodyq2xy = function( q ){
                    q += orbit_q_start;
                    return [
                        ellipseA * Math.cos( q ) + diagramOrigin[0],
                        ellipseB * Math.sin( q ) + diagramOrigin[1],
                    ];
                }
            })();
            stdMod.init__orbit8graph( gshape.rgn );
            rg.S.pos[0] = -sf.curve.ellipseFocus;
            rg.S.pos[1] = 0;
        },
    },
    {
        //todm do we need this? get rid of,
        rgn: 'curvatureCircle', //reserves rg spot
    }
    ]);

    //*************************************
    // //\\ original app lines
    //*************************************
    apush( gshapes, [
    //-----------------------------------------
    // //\\ Book's prop. 11
    //-----------------------------------------
    {
        kind: LINE,
        rgn: 'Qx',
        pcolor : el.proof,
        cssClass: 'subessay--solution',
    },

    { rgn: 'EP', pcolor : el.result,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'ES', pcolor : el.result,
                cssClass: 'subessay--solution',
    },
    { rgn: 'EI', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'EO', pcolor : el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'PH', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'HI', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'OS', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'OH', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'PI', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    //-----------------------------------------
    // \\// Book's prop. 11
    //-----------------------------------------

    { rgn: 'PC', pcolor : el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'SP', pcolor : el.result,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'P,Zminus', pcolor : el.body,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'PZ', pcolor : el.body,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'ZR', pcolor : el.body,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'PR', pcolor : el.body,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'QR', pcolor : el.displacement,
                cssClass: 'subessay--solution',
    },
    { rgn: 'SQ', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'QT', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'PT', pcolor : el.proof,
                cssClass: 'subessay--none',
    },
    { rgn: 'DK', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'GP', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'Qv', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'Pv', pcolor : el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'Tv', pcolor : el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'vG', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'PF', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'A,AA', pcolor : el.proof,
                    cssClass: 'logic_phase--none'
    },
    { rgn: 'B,BB', pcolor : el.proof,
                    cssClass: 'logic_phase--none'
    },
    { rgn: 'AO', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'DO', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'BO', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'PO', pcolor : el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'GO', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'FO', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    //Book's "another solution"
    { rgn: 'Tu', pcolor : el.proof,
                cssClass: 'subessay--none',
    },
    { rgn: 'u,VV', pcolor : el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'uP', pcolor : el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'PQ', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'P,VV', pcolor : el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'P,tCircleCenter', pcolor : el.curvature,
                cssClass: 'logic_phase--none',
    },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    apush( gshapes, [
    {
        kind: POINT,
        rgn: 'O',
        pcolor : el.context,
        caption : 'C',
        pos: C,
        letterAngle : -135,
        letterRotRadius : 35,
        cssClass: 'logic_phase--proof',
    },
    //-----------------------------------------
    // //\\ Book's prop. 11
    //-----------------------------------------
    { rgn: 'E',
        pcolor : el.proof,
        letterAngle : 90,
        cssClass: 'logic_phase--proof',
    },
    { rgn: 'H',
        pcolor : el.proof,
        letterAngle : -90,
        cssClass: 'subessay--solution',
    },
    { rgn: 'I',
        pcolor : el.proof,
        letterAngle : 90,
        cssClass: 'subessay--solution',
    },
    //-----------------------------------------
    // \\// Book's prop. 11
    //-----------------------------------------
    { rgn: 'B',
        pcolor : el.proof,
        letterAngle : 90,
        cssClass: 'subessay--solution',
    },

    { rgn: 'BB',
        letterAngle : 90,
        undisplayAlways : true,
        doPaintPname : false,
        cssClass: 'subessay--solution',
    },


    { rgn: 'A',
        pcolor : el.proof,
        cssClass: 'subessay--solution',
    },

    { rgn: 'AA',
        undisplayAlways : true,
        doPaintPname : false,
        cssClass: 'subessay--solution',
    },


    { rgn: 'D',
        pcolor : el.proof,
        letterAngle : 70,
        cssClass: 'subessay--solution',
    },
    { rgn: 'K',
        pcolor : el.proof,
        letterAngle : 70,
        cssClass: 'subessay--solution',
    },
    { rgn: 'G',
        pcolor : el.proof,
        letterAngle : 70,
        cssClass: 'subessay--solution',
    },
    { rgn: 'T',
        pcolor : el.proof,
        letterAngle : 180,
        cssClass: 'subessay--solution',
    },
    { rgn: 'R',
        pcolor : el.proof,
        letterAngle : 45,
        cssClass: 'logic_phase--proof',
    },
    { rgn: 'Z',
        pcolor : el.body,
        letterAngle : 45,
        undisplayAlways : true,
        doPaintPname : false,
    },
    { rgn: 'Zminus',
        caption : 'Z',
        pcolor : el.body,
        letterAngle : 45,
        //undisplay : true,
        cssClass: 'subessay--solution',
    },
    { rgn: 'v',
        caption : '𝑣',
        pcolor : el.proof,
        letterAngle : -45,
        letterRotRadius : 15,
        cssClass: 'subessay--solution',
    },
    { rgn: 'F',
        pcolor : el.proof,
        letterAngle : -135,
        cssClass: 'subessay--solution',
    },
    { rgn: 'VV',
        caption : 'V',
        pcolor : el.proof,
        letterAngle : -45,
        cssClass: 'logic_phase--none',
    },
    //center of instant curvature circle
    { rgn: 'C',
        pos : C,
        caption : 'Rc',
        pcolor : el.curvature,
        letterAngle : -45,
        undisplayAlways : true,
        doPaintPname : false,
        cssClass: 'subessay--solution',
    },
    //----------------------------------------
    // //\\ Prop. 10 Book's "another solution"
    //----------------------------------------
    { rgn: 'u',
        caption : '𝑢',
        pcolor : el.proof,
        letterAngle : -45,
        letterRotRadius : 15,
        cssClass: 'logic_phase--none',
    },
    { rgn: 'tCircleCenter',
        pos : C,
        caption : "C'",
        pcolor : el.curvature,
        letterAngle : -45,
        cssClass: 'logic_phase--none',
    },
    //----------------------------------------
    // \\// Prop. 10 Book's "another solution"
    //----------------------------------------
    //----------------------------------------
    // //\\ Prop. 11
    //----------------------------------------
    { rgn: 'x',
        caption : "𝑥",
        pcolor : el.proof,
        letterAngle : 100,
        letterRotRadius : 20,
        cssClass: 'subessay--solution',
    },
    { rgn: 'SS', //focus
        caption : 'Sₛ',
        pcolor : el.result,
        letterAngle : -45,
        letterRotRadius : 35,
        cssClass: 'logic_phase--proof',
    },
    //----------------------------------------
    // \\// Prop. 11
    //----------------------------------------

    //---------------------------------------
    // //\\ draggable points
    //---------------------------------------
    { rgn: 'S',
        pcolor : el.result,
        letterAngle : -115,
        letterRotRadius : 35,
        draggableX  : true,
        draggableY  : true,
    },

    { rgn: 'P',
        //set by sf.parQ
        //pos: P,
        pcolor : el.body,
        letterAngle : 70,
        draggableX  : true,
        draggableY  : true,
    },
    { rgn: 'Q',
        //set in amode8captures
        //pos: Q,

        pcolor : el.proof,
        letterAngle : 225,
        letterRotRadius : 40,
        draggableX  : true,
        draggableY  : true,
        cssClass: 'subessay--solution',
    },
    //---------------------------------------
    // \\// draggable points
    //---------------------------------------
    ]);
    //*************************************
    // \\// original app points
    //*************************************
}
}
