{   const { ns, nspaste, tpelect, tprepo, fconf, sconf, sf, apush,
            gshapes, CONST,
          } = window.b$l.atree({ ssFList : { init_conf: ()=>{

    const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
    const el = tpelect;

    //model's spacial unit in pixels of the picture:
    sf.mod2med = 1000;

    fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
    sf.default_tp_stroke_width = 12;

    //====================================================
    // //\\ subapp regim switches
    //====================================================
    sconf.enableStudylab            = false;
    sconf.enableTools               = true; //false;
    sconf.GENERIC_SLIDERS_COUNT     = 0;
    sconf.SLIDERS_LEGEND_HEIGHT     = 0;
    //====================================================
    // \\// subapp regim switches
    //====================================================

    //--------------------------------------
    // //\\ geometics parameters
    //--------------------------------------
    sconf.default_tp_lightness = 30;
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 1500;
    sf.medHeight = 1200;
    const orx = sf.medposOfModOrigin_x = 400;
    const ory = sf.medposOfModOrigin_y = 150;
    const A       = [orx, ory];
    const B       = [orx+400, ory];
    const axisX   = [orx, 1100];
    const axisY   = [1300, ory];
    const T       = [1000, ory];
    const Tleft   = [orx-350, ory];
    const X       = [1000, ory+100];
    //--------------------------------------
    // \\// geometics parameters
    //--------------------------------------

    //-----------------------------------
    // //\\ topics
    //-----------------------------------
    [
        'proof',
        'given',
        'result',
        'hidden',
        'context',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    nspaste( el, { //need deep copy
        curveIF             : el.given,
        curveCIF            : el.given,
        curveIFC            : el.given,
        curveIFCleft        : el.given,
        curveCircle         : el.given,
        curveLeftCircle     : el.given,
        curveRightCircle    : el.given,
        curveParabola       : el.given,
        curvatureCircle     : el.result,
    });
    //-----------------------------------
    // \\// topics
    //-----------------------------------

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
        {
            kind: POINT,
            rgn: 'A',
            pos         : A,
            letterAngle : 90,
            pcolor: el.given,
        },
        //---------------------------------------
        // //\\ curvature related
        //---------------------------------------
        { rgn: 'B',
            pos         : B,
            letterAngle : 0,
            pcolor: el.proof,
            draggableX  : true,
        },

        //for circumscribed circle
        { rgn: 'D',
            pos         : A,
            letterAngle : 0,
            pcolor: el.proof,
        },
        { rgn: 'R',
            pos         : A,
            letterAngle : 0,
            pcolor: el.result,
        },
        //curvature center
        { rgn: 'Rc',
            pos         : A,
            letterAngle : 180,
            letterRotRadius : 50,
            pcolor: el.result,
        },
        { rgn: 'N',
            pos         : [ A[0], 1100*0.9 ],
            letterAngle : 180,
            letterRotRadius : 50,
            pcolor: el.proof,
        },
        //---------------------------------------
        // \\// curvature related
        //---------------------------------------
        { rgn: 'axisX',
            pos         : axisX,
            caption     : 'axis x',
            letterAngle : 135,
            pcolor: el.context,
        },
        { rgn: 'axisY',
            pos         : axisY,
            caption     : 'axis y',
            letterAngle : 0,
            pcolor: el.context,
        },
        { rgn: 'T',

            //apparently UTF misses "g" and "f", funny ...
            //caption     : 'Tᵣᵢₒₕₜ',
            caption     : 'Tright',

            pos         : T,
            letterAngle : 90,
            pcolor: el.result,
        },
        { rgn: 'Tleft',

            //apparently UTF misses "g" and "f", funny ...
            //caption     : 'Tᵣᵢₒₕₜ',
            caption     : 'Tleft',

            pos         : Tleft,
            letterAngle : 90,
            pcolor: el.result,
        },
        { rgn: 'X',
            pos         : X,
            letterAngle : 0,
            pcolor: el.proof,
            draggableY  : true,
        },
    ]);
    //*************************************
    // \\// points
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
        {
            kind: LINE,
            rgn: 'A,axisX',
            pcolor: el.context
        },
        { rgn: 'A,axisY', pcolor: el.context },
        { rgn: 'AT'     , pcolor: el.result, },
        { rgn: 'A,Tleft', pcolor: el.result, },
        { rgn: 'AX'     , pcolor: el.proof,  },
        { rgn: 'AB'     , pcolor: el.proof,  },
        { rgn: 'AD'     , pcolor: el.proof,  },
        { rgn: 'BR'     , pcolor: el.result, },
        { rgn: 'BD'     , pcolor: el.proof,  },
        { rgn: 'AN'     , pcolor: el.proof,  },
        { rgn: 'A,Rc'   , pcolor: el.result, },
        //{ 'H1,H2'  , pcolor: el.context },
    ]);
    //*************************************
    // \\// lines
    //*************************************
}}})}