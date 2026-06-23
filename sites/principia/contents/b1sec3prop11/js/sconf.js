(function(){
const { nspaste, fconf, sf, tprepo, stripp,
        tpelect, originalPoints, stdMod, rg
      } = window.b$l.atree({ ssFList : {
        init_conf
}});
return;


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
    sf.mediaBgImage = "diagram.png";
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
    const FT = sf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
    sf.CURVE_REVOLVES = true; //true for cyclic orbit
    sf.DQ_SLIDER_MAX = FT ? null : 0.69;
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


    //***************************************************************
    // //\\ model comparison demo
    //***************************************************************
    //t/sf.SHOW_FORMULAS = [
    //***************************************************************
    // \\// model comparison demo
    //***************************************************************

    //*************************************
    // //\\ topic group colors,
    //*************************************
///does import topic colors
const {
    force,
    estimatedForce,
    fQR,
    displacement,
    curvature,
    curvatureCircle,
    sagitta,
    distanceToCenter,

    borbit,
    body,
    distance,
    chord,

    time,
    dtime,

    given,
    proof,
    result,

    hidden,
    context,
    invalid,
    shadow,
} = tprepo;

    ///does export topic colors
    nspaste( tpelect, { //need deep copy
        given,
        proof,
        result,
        displacement,
        hidden,
        context,
        curvature,
        body,
        borbit   : given,
        force   : result,
    });
    //*************************************
    // \\// topic group colors,
    //*************************************


    //*************************************
    // //\\ original app points
    //*************************************
    Object.assign( originalPoints, {
        O : {
            pcolor : context,
            caption : 'C',
            pos: C,
            letterAngle : -135,
            letterRotRadius : 35,
            cssClass: 'logic_phase--proof',
        },

        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
        E : {
            pcolor : proof,
            letterAngle : 90,
            cssClass: 'logic_phase--proof',
        },
        H : {
            pcolor : proof,
            letterAngle : -90,
            cssClass: 'subessay--solution',
        },
        I : {
            pcolor : proof,
            letterAngle : 90,
            cssClass: 'subessay--solution',
        },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        B : {
            pcolor : proof,
            letterAngle : 90,
            cssClass: 'subessay--solution',
        },

        BB : {
            letterAngle : 90,
            undisplayAlways : true,
            doPaintPname : false,
            cssClass: 'subessay--solution',
        },


        A : {
            pcolor : proof,
            cssClass: 'subessay--solution',
        },

        AA : {
            undisplayAlways : true,
            doPaintPname : false,
            cssClass: 'subessay--solution',
        },


        D : {
            pcolor : proof,
            letterAngle : 70,
            cssClass: 'subessay--solution',
        },
        K : {
            pcolor : proof,
            letterAngle : 70,
            cssClass: 'subessay--solution',
        },
        G : {
            pcolor : proof,
            letterAngle : 70,
            cssClass: 'subessay--solution',
        },
        T : {
            pcolor : proof,
            letterAngle : 180,
            cssClass: 'subessay--solution',
        },
        R : {
            pcolor : proof,
            letterAngle : 45,
            cssClass: 'logic_phase--proof',
        },
        Z : {
            pcolor : body,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
        },
        Zminus : {
            caption : 'Z',
            pcolor : body,
            letterAngle : 45,
            //undisplay : true,
            cssClass: 'subessay--solution',
        },
        v : {
            caption : '𝑣',
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 15,
            cssClass: 'subessay--solution',
        },
        F : {
            pcolor : proof,
            letterAngle : -135,
            cssClass: 'subessay--solution',
        },
        VV : {
            caption : 'V',
            pcolor : proof,
            letterAngle : -45,
            cssClass: 'logic_phase--none',
        },
        //center of instant curvature circle
        C : {
            pos : C,
            caption : 'Rc',
            pcolor : curvature,
            letterAngle : -45,
            undisplayAlways : true,
            doPaintPname : false,
            cssClass: 'subessay--solution',
        },
        //----------------------------------------
        // //\\ Prop. 10 Book's "another solution"
        //----------------------------------------
        u : {
            caption : '𝑢',
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 15,
            cssClass: 'logic_phase--none',
        },
        tCircleCenter : {
            pos : C,
            caption : "C'",
            pcolor : curvature,
            letterAngle : -45,
            cssClass: 'logic_phase--none',
        },
        //----------------------------------------
        // \\// Prop. 10 Book's "another solution"
        //----------------------------------------
        //----------------------------------------
        // //\\ Prop. 11
        //----------------------------------------
        x : {
            caption : "𝑥",
            pcolor : proof,
            letterAngle : 100,
            letterRotRadius : 20,
            cssClass: 'subessay--solution',
        },
        SS : { //focus
            caption : 'Sₛ',
            pcolor : result,
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
        S : {
            pcolor : result,
            letterAngle : -115,
            letterRotRadius : 35,
            draggableX  : true,
            draggableY  : true,
        },

        P : {
            //set by sf.parQ
            //pos: P,
            pcolor : body,
            letterAngle : 70,
            draggableX  : true,
            draggableY  : true,
        },
        Q : {
            //set in amode8captures
            //pos: Q,

            pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 40,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'subessay--solution',
        },
        //---------------------------------------
        // \\// draggable points
        //---------------------------------------
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = nspaste( {},
    [
        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
        { Qx : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { EP : { pcolor : result,
                    cssClass: 'logic_phase--proof',
        }, },
        { ES : { pcolor : result,
                 cssClass: 'subessay--solution',
        }, },
        { EI : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { EO : { pcolor : proof,
                    cssClass: 'logic_phase--proof',
        }, },
        { PH : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { HI : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { OS : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { OH : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { PI : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        //{ 'CV' : { pcolor : curvature }, },
        { 'PC' : { pcolor : proof,
                    cssClass: 'logic_phase--none',
        }, },
        { 'SP' : { pcolor : result,
                    cssClass: 'logic_phase--proof',
        }, },
        { 'P,Zminus' : { pcolor : body,
                    cssClass: 'logic_phase--proof',
        }, },
        { 'PZ' : { pcolor : body,
                    cssClass: 'logic_phase--proof',
        }, },
        { 'ZR' : { pcolor : body,
                    cssClass: 'logic_phase--proof',
        }, },
        { 'PR' : { pcolor : body,
                    cssClass: 'logic_phase--proof',
        }, },
        { 'QR' : { pcolor : displacement,
                   cssClass: 'subessay--solution',
        }, },
        { 'SQ' : { pcolor : proof,
                   cssClass: 'subessay--solution',
        }, },
        { 'QT' : { pcolor : proof,
                   cssClass: 'subessay--solution',
        }, },
        { 'PT' : { pcolor : proof,
                   cssClass: 'subessay--none',
        }, },
        { DK : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { GP : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { Qv : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { Pv : { pcolor : proof,
                    cssClass: 'logic_phase--proof',
        }, },
        { Tv : { pcolor : proof,
                 cssClass: 'logic_phase--none',
        }, },
        { vG : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { PF : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { 'A,AA' : { pcolor : proof,
                     cssClass: 'logic_phase--none'
        }},
        { 'B,BB' : { pcolor : proof,
                     cssClass: 'logic_phase--none'
        }},
        { AO : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { DO : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { BO : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { PO : { pcolor : proof,
                    cssClass: 'logic_phase--proof',
        }, },
        { GO : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { FO : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        //Book's "another solution"
        { Tu : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        { 'u,VV' : { pcolor : proof,
                    cssClass: 'logic_phase--none',
        }, },
        { uP : { pcolor : proof,
                    cssClass: 'logic_phase--none',
        }, },
        { PQ : { pcolor : proof,
                    cssClass: 'subessay--solution',
        }, },
        { 'P,VV' : { pcolor : proof,
                    cssClass: 'logic_phase--none',
        }, },
        { 'P,tCircleCenter' : { pcolor : curvature,
                    cssClass: 'logic_phase--none',
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
    ];
}
})();
