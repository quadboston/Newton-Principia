{
const {
        nspaste, fconf, sf, haff, tprepo, tpelect,
        apush, gshapes, rg, stripp, stdMod, ssD, CONST,
      } = window.b$l.atree({ ssFList: {
        init_conf
      }});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;


function init_conf (){
    //****************************************************
    // //\\ original picture dimensions for svg scene
    //****************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 1000;
    sf.medHeight = 600;

    //to comply standard layout, one must add these 2 lines:
    let medsize = sf.medWidth + sf.medHeight;
    let medsizeScale = medsize / sf.medsize_standard

    const  V = [64, 462 ];
    const  C = [510, 311 ]; // V[0] + ww1/2, V[1] + ww2/2, ];
    //pos of point P
    const  S = C;

    sf.medposOfModOrigin_x = C[0]; //for model's axis x
    sf.medposOfModOrigin_y = C[1]; //for model's axis y
    sf.diagramOrigin = [ 0, 0 ];

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = 360; //RR;
    //****************************************************
    // \\// original picture dimensions for svg scene
    //****************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at c onf/c onf.js or especally at c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.allLettersAreHidden = true;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //----------------------------
    // //\\ sconf.curve
    //----------------------------
    sf.curve = stripp({
        orbit_q_start: -0.05 * Math.PI,
        orbit_q_end: 1.3 * Math.PI,
        ro0: 1.17,
        curveParA: -0.64,
        diagramOrigin: sf.diagramOrigin,
    });
    //----------------------------
    // \\// sconf.curve
    //----------------------------
    //pos of P?
    sf.parQ = -sf.curve.orbit_q_start*2;
    //the law to be studied in given lemma:
    //  fe: for 1/r^2, the assigment is
    //    sf.force_law = bP => 1/(bP.r2);
    //  null means that program will calculated the law
    //  based on dt -> 0:
    sf.force_law = bP => 1/(bP.r2*bP.r);
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
    //true; //vs q is free variable
    const FT = sf.TIME_IS_FREE_VARIABLE = false;
    sf.CURVE_REVOLVES = false; //true for cyclic orbit
    sf.DQ_SLIDER_MAX = FT ? null : 0.69;
    sf.DQ_SLIDER_MIN = FT ? null : 0.0001;
    sf.DT_SLIDER_MAX = FT ? 0.32 : null;
    sf.Q_STEPS = 1000;
    sf.TIME_STEPS = 1000;
    sf.DATA_GRAPH_STEPS = 200;

    //intervals of dt or dq to construct an arc for
    //fQR or sagitta,
    if( FT ){
        sf.Dt0 = 0.3;
    } else {
        sf.Dq0 = 0.19;
    }
    //***************************************************************
    // \\// math model auxilaries
    //***************************************************************

    //*************************************
    // //\\ elected colors,
    //      does import topic colors to 
    //      elected colors from
    //      c onf/lemma.c onf.js
    //*************************************
    [
        'force',
        'estimatedForce',
        'fQR',
        'curvature',
        'body',
        'borbit',
        'time',
        'proof',
        'result',
        'hidden',
        'context',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    el.APQ = el.borbit.concat();
    el.orbitGap = [255,255,255,1];
    //*************************************
    // \\// elected colors,
    //*************************************

    apush( gshapes, [
    {
        kind: CURVE,
        rgn: 'borbit',
        initShapes: (gshape)=>{
            //creates rgShape.bodyq2xy() with pars. in closure,
            (function(){
                const { diagramOrigin,
                        ro0,
                        curveParA,
                        orbit_q_start
                } = sf.curve;
                gshape.rgShape.bodyq2xy = function ( q ){
                    q += orbit_q_start;
                    var ro = ro0*Math.exp( curveParA*q );
                    return [
                        ro * Math.cos( q ) + diagramOrigin[0],
                        ro * Math.sin( q ) + diagramOrigin[1],
                    ];
                }
            })();
            stdMod.init__orbit8graph( gshape.rgn );
        },
    },
    ]);

    //*************************************
    // //\\ original app lines
    //*************************************
    apush( gshapes, [
    {
        kind: LINE,
        rgn: 'SP',
        pcolor: el.borbit
    },
    { rgn: 'SQ', pcolor: el.borbit },
    { rgn: 'PV', pcolor: el.borbit,
                cssClass : 'logic_phase--proof',
    },
    { rgn: 'PR', pcolor: el.borbit,
                cssClass : 'logic_phase--proof',
    },
    { rgn: 'SY', pcolor: el.proof,
                cssClass : 'logic_phase--proof',
    },

    { rgn: 'QR', pcolor: el.proof,
                cssClass : 'logic_phase--proof',
    },
    { rgn: 'QP', pcolor: el.proof,
                cssClass : 'logic_phase--proof',
    },
    { rgn: 'QT', pcolor: el.proof,
                cssClass : 'logic_phase--proof',
    },
    { rgn: 'PT', pcolor: el.proof,
                cssClass : 'logic_phase--proof',
    },

    { rgn: 'PC', pcolor: el.curvature,
                cssClass : 'logic_phase--proof',
    },
    { rgn: 'PY', pcolor: el.body,
                cssClass : 'logic_phase--proof '+
                            'logic_phase--claim',
    },
    { rgn: 'P,Zminus', pcolor: el.body,
                        cssClass : 'logic_phase--proof',
    },
    { rgn: 'PZ', pcolor: el.body,
                cssClass : 'logic_phase--proof',
    },
    { rgn: 'ZR', pcolor: el.body,
                cssClass : 'logic_phase--proof',
    },

    { rgn: 'CV', pcolor: el.curvature,
                cssClass : 'logic_phase--proof',
    },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    apush( gshapes, [
    {   kind: POINT,
        rgn: 'S',
        pos: S,
        pcolor : el.force,
        letterAngle : -90,
    },
    {
        rgn: 'P',
        pcolor: el.body,
        letterAngle : 70,
        draggableX  : true,
    },
    {
        rgn: 'Q',
        pcolor: el.proof,
        letterAngle : 225,
        letterRotRadius : 40,
        draggableX  : true,
        draggableY  : fconf.sappId === 'b1sec2prop7',
    },
    {
        rgn: 'R',
        pcolor: el.proof,
        letterAngle : 45,
        cssClass : 'logic_phase--proof',
    },
    {
        rgn: 'T',
        pcolor: el.proof,
        letterAngle : 180,
        cssClass : 'logic_phase--proof',
    },
    {
        rgn: 'Z',
        pcolor: el.body,
        letterAngle : 45,
        undisplayAlways : true,
        doPaintPname : false,
    },
    {
        rgn: 'Zminus',
        pcolor: el.body,
        letterAngle : 45,
        //undisplay : true,
        undisplayAlways : true,
        doPaintPname : false,
    },
    {
        rgn: 'V',
        pos: V,
        pcolor: el.curvature,
        letterAngle : -45,
        cssClass : 'logic_phase--proof',
    },
    //center of instant curvature circle
    {
        rgn: 'C',
        pos : C,
        doPaintPname: false,
        pcolor: el.curvature,
        letterAngle : -45,
        cssClass : 'logic_phase--proof',
    },
    {
        rgn: 'Y',
        pcolor: el.proof,
        letterAngle : -90,
        cssClass : 'logic_phase--proof',
    },
    {
        rgn: 'Or',
        doPaintPname : false,
        pos: C,
    },
    ]);
    //*************************************
    // \\// original app points
    //*************************************
}
}
