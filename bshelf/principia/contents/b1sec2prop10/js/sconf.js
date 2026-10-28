{
const { nspaste, haff, fconf, sf, tpelect, apush,
        tprepo, gshapes, stripp, stdMod, CONST,
      } = window.b$l.atree({ ssFList: { init_conf } });
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
    sf.medWidth = 922;
    sf.medHeight = 705;

    //to comply standard layout, one must add these 2 lines:
    let medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    let medsizeScale = medsize / sf.medsize_standard

    let C = [443, 375 ];
    let S = C;

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
    //----------------------------
    // //\\ sconf.curve
    //----------------------------
    sf.curve = stripp({
        ellipseA: 1.03,
        ellipseB: 0.86,
        orbit_q_start: 0,
        orbit_q_end: 2.0 * Math.PI,
        diagramOrigin: sf.diagramOrigin,
    });
    //----------------------------
    // \\// sconf.curve
    //----------------------------
    //pos of P
    sf.parQ = 0.255 * Math.PI;
    sf.tForSagitta0 = 0.168;
    //to be studied in given proposition:
    sf.force_law_function = sf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN ?
        null :
        //can be
        //bp.r
        bp => 1/(bp.R*bp.r2*(bp.sinOmega**3));
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
    const FT = sf.TIME_IS_FREE_VARIABLE = false; //vs q is free variable
    sf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN = false;
    sf.CURVE_REVOLVES = true; //true for cyclic orbit
    sf.DQ_SLIDER_MAX = FT ? null : 1.0;
    sf.DQ_SLIDER_MIN = FT ? null : 0.0001;
    sf.DT_SLIDER_MAX = FT ? 0.66 : null;
    sf.TIME_STEPS = FT ? 1000 : null;;
    sf.Q_STEPS = 1500;
    sf.DATA_GRAPH_STEPS = 500;

    //intervals of dt or dq to construct an arc for
    //displacement or sagitta,
    //Sets initial distance of point Q from P
    if( FT ){
        sf.Dt0 = 0.36;
    } else {
        sf.Dq0 = 0.42;
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
        'given',
        'proof',
        'result',
        'body',
        'hidden',
        'context',
        'curvature',
        'borbit',
        'force',
        'curvatureCircle',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    //*************************************
    // \\// elected colors,
    //*************************************

    apush( gshapes, [
        {
            kind: CONST.CURVE,
            rgn: 'borbit',
            initShapes: (gshape)=>{
                //creates rgShape.bodyq2xy() with pars. in closure,
                (function() {
                    const {
                        ellipseA, ellipseB, diagramOrigin, orbit_q_start
                    } = sf.curve;
                    gshape.rgShape.bodyq2xy = function ( q ){
                        q += orbit_q_start;
                        return [
                            ellipseA * Math.cos( q ) + diagramOrigin[0],
                            ellipseB * Math.sin( q ) + diagramOrigin[1],
                        ];
                    }
                })();
                stdMod.init__orbit8graph( gshape.rgn );
            },
        },
        {
            rgn: 'curvatureCircle',
            cssClass: 'subessay--another-solution',
        }
    ]);


    //*************************************
    // //\\ original app lines
    //*************************************
    apush( gshapes, [
    {
        kind: LINE,
        rgn: 'A,AA',
        pcolor: el.proof,
        cssClass : 'logic_phase--proof',
    },
    { rgn: 'B,BB',
        pcolor: el.proof,
        cssClass : 'logic_phase--proof',
    },
    { rgn: 'P,Zminus',  pcolor: el.body,
        cssClass : 'logic_phase--proof',
    },
    { rgn: 'PZ',  pcolor: el.body,
        cssClass : 'logic_phase--proof',
    },
    { rgn: 'ZR',
        pcolor: el.body,
        cssClass : 'logic_phase--proof',
    },
    { rgn: 'AO',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof',
    },
    { rgn: 'BO',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof',
    },
    { rgn: 'PO',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof',
    },

    // //\\ proof
    { rgn: 'P,VV',  pcolor: el.proof,
                    cssClass: 'logic_phase--proof',
    },

    { rgn: 'PC',  pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'SP',
        pcolor: el.result,
        cssClass : 'logic_phase--proof',
    },
    { rgn: 'PR',  pcolor: el.body,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'QR',  pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'SQ',  pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'QT',  pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'PT',  pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },

    { rgn: 'DK',  pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'GP', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'Qv', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'Pv', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'Tv', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },

    { rgn: 'vG', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'PF', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'DO', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },

    { rgn: 'GO', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'FO', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    // \\// proof

    //Book's "another solution"
    { rgn: 'Tu', pcolor: el.proof,
                cssClass: 'subessay--another-solution',
    },
    {   rgn: 'u,VV',  pcolor: el.proof,
                    cssClass: 'subessay--another-solution',
    },
    {   rgn: 'uP', pcolor: el.proof,
        cssClass: 'subessay--another-solution',
    },
    {   rgn: 'PQ', pcolor: el.proof,
        cssClass: 'subessay--another-solution',
    },
    {   rgn: 'P,tCircleCenter',  pcolor: el.curvature,
        cssClass: 'subessay--another-solution',
    },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    apush( gshapes, [
    // //\\ no visibility cssClass
    {
        kind: POINT,
        rgn: 'AA',
        undisplayAlways : true,
        doPaintPname : false,
        cssClass : 'logic_phase--proof',
    },
    {
        rgn: 'BB',
        letterAngle : 90,
        undisplayAlways : true,
        doPaintPname : false,
        cssClass : 'logic_phase--proof',
    },
    { rgn: 'O',
            pcolor: el.result,
            caption : 'C',
            pos: C,
            letterAngle : 120,
            letterRotRadius : 35,
        },

    { rgn: 'Z',
            pcolor: el.body,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
            cssClass : 'logic_phase--proof',
        },

        { rgn: 'Zminus',
            pcolor: el.body,
            letterAngle : 45,
            //undisplay : true,
            undisplayAlways : true,
            doPaintPname : false,
            cssClass : 'logic_phase--proof',
        },
        // \\// no visibility cssClass
        { rgn: 'A',
            pcolor: el.proof,
            cssClass: 'logic_phase--proof',
        },
        { rgn: 'B',
            pcolor: el.proof,
            letterAngle : 90,
            cssClass: 'logic_phase--proof',
        },
        // //\\ proof
        { rgn: 'D',
            pcolor: el.proof,
            letterAngle : 70,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'K',
            pcolor: el.proof,
            letterAngle : 70,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'G',
            pcolor: el.proof,
            letterAngle : 90,
            letterRotRadius : 25,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'T',
            pcolor: el.proof,
            letterAngle : 180,
            letterRotRadius : 15,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'R',
            pcolor: el.proof,
            letterAngle : 45,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'v',
            caption : '𝑣',
            pcolor: el.proof,
            letterAngle : -45,
            letterRotRadius : 15,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'F',
            pcolor: el.proof,
            letterAngle : -135,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'VV',
            caption : 'V',
            pcolor: el.proof,
            letterAngle : -45,
            cssClass: 'logic_phase--proof',
        },

        { rgn: 'Q',
            pcolor: el.proof,
            letterAngle : 180,
            letterRotRadius : 25,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'logic_phase--proof',
            conditionalDrag:
                'logic_phase--proof' +
                ' aspect--addendum subessay--corollary2',
        },
        // \\// proof
        //Book's "another solution"
        { rgn: 'u',
            caption : '𝑢',
            pcolor: el.proof,
            letterAngle : -45,
            letterRotRadius : 15,
            cssClass: 'subessay--another-solution',
        },
        //curvature
        { rgn: 'tCircleCenter',
            pos : C,
            caption : "C'",
            pcolor: el.result,
            letterAngle : -45,
            cssClass: 'subessay--another-solution',
        },
        //center of instant curvature circle
        { rgn: 'C',
            pos : C,
            caption : 'Rc',
            pcolor: el.result,
            letterAngle : -45,
            undisplayAlways : true,
            cssClass: 'logic_phase--addendum',
            doPaintPname : false,
        },
        { rgn: 'S',
            pos: S,
            pcolor: el.result,
            letterAngle : -115,
            letterRotRadius : 25,
            undisplayAlways : true,
            //todo make S draggable if necessary
            //fix error in
            //        ssF.creates_Q8P_sliders();
            //if( rg.S.draggableX || rg.S.draggableY ) {
            //    stdMod.creates_S_slider();
            //for this, take create sliders from prop 11, or other,
            //draggableX  : true,
            //draggableY  : true,
        },
        { rgn: 'P',
            pcolor: el.body,
            letterAngle : 70,
            draggableX  : true,
            draggableY  : true,
        },
    ]);
    //*************************************
    // \\// original app points
    //*************************************
}
}