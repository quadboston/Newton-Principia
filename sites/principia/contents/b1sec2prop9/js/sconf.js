(function(){
const {
        nspaste, fconf, sf, haff, tprepo, tpelect, originalPoints,
        stripp, stdMod
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
return;


function init_conf (){
    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
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
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at conf/conf.js or especally at conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.mediaBgImage = "diagram.png";
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
    const FT = sf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
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

    //***************************************************************
    // //\\ model comparison demo
    //***************************************************************
    //***************************************************************
    // \\// model comparison demo
    //***************************************************************

    //*************************************
    // //\\ topic group colors,
    //      to see templates what to override here, do
    //      look at conf/lemma.conf.js:
    //*************************************
    ///does import topic colors
    const {
        force,
        estimatedForce,
        fQR,
        displacement,
        curvature,
        curvatureCircle,
        //sagitta,
        distanceToCenter,

        borbit,
        body,
        distance,
        //chord,

        time,
        //dtime,

        //given,
        proof,
        result,

        hidden,
        context,
        //invalid,
        //shadow,
    } = tprepo;

    ///does export topic colors
    nspaste( tpelect, { //need deep copy
        force,
        estimatedForce,
        fQR,
        displacement,
        curvature,
        curvatureCircle,
        //t/sagitta,
        distanceToCenter,

        borbit,
        body,
        distance,
        //t/chord,

        time,
        //t/dtime,

        //t/given,
        proof,
        result,

        hidden,
        context,
        //t/invalid,
        //t/shadow,
    });
    //*************************************
    // \\// topic group colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    Object.assign( originalPoints, {
        S : {
            pos: S,
            pcolor : force,
            letterAngle : -90,
        },
        P : {
            pcolor : body,
            letterAngle : 70,
            draggableX  : true,
        },
        Q : {
            pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 40,
            draggableX  : true,
            draggableY  : fconf.sappId === 'b1sec2prop7',
        },
        R : {
            pcolor : proof,
            letterAngle : 45,
            cssClass : 'logic_phase--proof',
        },
        T : {
            pcolor : proof,
            letterAngle : 180,
            cssClass : 'logic_phase--proof',
        },
        Z : {
            pcolor : body,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
        },
        Zminus : {
            pcolor : body,
            letterAngle : 45,
            //undisplay : true,
            undisplayAlways : true,
            doPaintPname : false,
        },
        V : {
            pos: V,
            pcolor : curvature,
            letterAngle : -45,
            cssClass : 'logic_phase--proof',
        },
        //center of instant curvature circle
        C : {
            pos : C,
            doPaintPname: false,
            pcolor : curvature,
            letterAngle : -45,
            cssClass : 'logic_phase--proof',
        },
        Y : {
            pcolor : proof,
            letterAngle : -90,
            cssClass : 'logic_phase--proof',
        },
        Or : {
            doPaintPname : false,
            pos: C,
        },
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = nspaste( {},
    [
        { 'SP' : { pcolor : borbit }, },
        { 'SQ' : { pcolor : borbit }, },
        { 'PV' : { pcolor : borbit,
                   cssClass : 'logic_phase--proof',
        }, },
        { 'PR' : { pcolor : borbit,
                   cssClass : 'logic_phase--proof',
        }, },
        { 'SY' : { pcolor : proof,
                   cssClass : 'logic_phase--proof',
        }, },

        { 'QR' : { pcolor : proof,
                   cssClass : 'logic_phase--proof',
        }, },
        { 'QP' : { pcolor : proof,
                   cssClass : 'logic_phase--proof',
        }, },
        { 'QT' : { pcolor : proof,
                   cssClass : 'logic_phase--proof',
        }, },
        { 'PT' : { pcolor : proof,
                   cssClass : 'logic_phase--proof',
        }, },

        { 'PC' : { pcolor : curvature,
                   cssClass : 'logic_phase--proof',
        }, },
        { 'PY' : { pcolor : body,
                   cssClass : 'logic_phase--proof '+
                              'logic_phase--claim',
        }, },
        { 'P,Zminus' : { pcolor : body,
                         cssClass : 'logic_phase--proof',
        }, },
        { 'PZ' : { pcolor : body,
                   cssClass : 'logic_phase--proof',
        }, },
        { 'ZR' : { pcolor : body,
                   cssClass : 'logic_phase--proof',
        }, },

        { 'CV' : { pcolor : curvature,
                   cssClass : 'logic_phase--proof',
        }, },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************
    sf.shapesArray = [
        {
            isCurve: true,
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
    ];
}})();
