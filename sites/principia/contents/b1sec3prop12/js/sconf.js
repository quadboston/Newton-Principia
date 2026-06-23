//todm graph is still negative whey force is repelling
(function (){

const {sn, nspaste, mat, mcurve,
       fconf, sf, stdMod, tprepo,
       tpelect, originalPoints, rg } =
       window.b$l.atree({ ssFList : { init_conf } });
const op = sn( 'orbitParameters', sf );
return;


function init_conf (){
    //====================================================
    // //\\ user scenarios
    //====================================================
    //====================================================
    // \\// user scenarios
    //====================================================

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 690;
    sf.medHeight = 836;

    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sf.medsize_standard

    var F = [ 492, 565 ];
    var S = F;
    sf.diagramOrigin = [ 0, 0 ];

    sf.medposOfModOrigin_x = F[0]; //for model's axis x
    sf.medposOfModOrigin_y = F[1]; //for model's axis y
    sf.mod2med = 145;
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
    sf.default_tp_lightness = 30;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //sets model offset
    op.rgn = 'borbit';
    op.dqName = 'borbitdq';

    op.mainAxisAngle_initial = 0;
    op.mainAxisAngle = op.mainAxisAngle_initial;
    op.delta_v_increase_LIMIT = 1.5;

    //sets cinematics
    var Kepler_g        = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
    op.Kepler_g         = Kepler_g;
    op.Kepler_gInitial  = Kepler_g;
    fconf.effId = fconf.sappId;

    //conic pars
    op.initialEccentricity = 1.365; //hyperbola
    op.latusInitial = 0.90;
    var PparQ = 0.49 * Math.PI;
    //decorations
    op.sagittaDelta_q_initial = 1;
    sf.Fi_distance = 3;

    op.PparQ_initial        = PparQ;
    op.PparQ_initial_essay  = PparQ;
    op.sagittaDelta_q       = op.sagittaDelta_q_initial;
    op.sagittaDelta_q_instant = 0.001;

    //-----------------------------------------------------
    // //\\ sets Kepler_v
    //-----------------------------------------------------
    op.latus = op.latusInitial;
    stdMod.establishesEccentricity( op.initialEccentricity );
    var { Kepler_v, cosOmega, om } =
        mat.conics.innerPars2innerPars({
            lat         : op.latusInitial,
            fi          : PparQ,
            e           : op.initialEccentricity,
            Kepler_g    : op.Kepler_g,
    });
    //saves initial speed
    op.cosOmega             = cosOmega;
    op.om                   = om;
    op.cosOmega_initial     = cosOmega;
    op.om_initial           = om;
    op.Kepler_v_initial     = Kepler_v;
    op.Kepler_v             = op.Kepler_v_initial;
    //-----------------------------------------------------
    // \\// sets Kepler_v
    //-----------------------------------------------------
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
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
    // //\\ elected colors,
    //*************************************
    ///does import topic colors
    const {
        force,
        curvature,
        displacement,

        body,
        borbit,

        given,
        proof,
        result,

        hidden,
        context,
        invalid,
        shadow,
        dimShadow,
    } = tprepo;
    const attention = [200,  200,  0,      1];

    ///does export topic colors
    nspaste( tpelect, { //need deep copy
        force,
        curvature,
        displacement,
        given,
        proof,
        result,
        hidden,
        context,
        body,
        borbit,
        borbitdq : given,
        shadow,
        dimShadow,
    });
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    //*************************************
    // \\// bricks for originalPoints
    //*************************************
    //-------------------------------------
    // //\\ prepares points
    //-------------------------------------
    //-------------------------------------
    // \\// prepares points
    //-------------------------------------

    Object.assign( originalPoints, {
        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
        E : {
            pcolor : proof,
            letterRotRadius : 20,
            cssClass: 'logic_phase--proof',
        },
        H : {
            pcolor : proof,
            letterAngle : -90,
            cssClass: 'subessay--solution',
        },
        I : {
            pcolor : proof,
            letterRotRadius : 20,
            cssClass: 'subessay--solution',
        },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        B : {
            letterRotRadius : 20,
            pcolor : borbit,
            cssClass: 'subessay--solution',
        },

        BB : {
            letterAngle : 90,
            undisplayAlways : true,
            doPaintPname : false,
            pcolor : borbit,
            cssClass: 'subessay--solution',
        },

        L : {
            //no need: will be dynamic: caption : 'mmm',
            //draggableX  : true,
            //draggableY  : true,
            undisplayAlways : true,
            doPaintPname : false,
        },
        LL : {
            undisplayAlways : true,
            doPaintPname : false,
        },
        A : {
            pcolor : borbit,
            letterRotRadius : 20,
            letterAngle : -90,
            cssClass: 'subessay--solution',
        },
        AA : {
            undisplayAlways : true,
            doPaintPname : false,
            pcolor : borbit,
            cssClass: 'subessay--solution',
        },
        D : {
            pcolor : proof,
            letterRotRadius : 20,
            //letterAngle : 135,
            cssClass: 'subessay--solution',
        },
        K : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -60,
            cssClass: 'subessay--solution',
        },
        M : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--none',
        },
        N : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--none',
        },
        G : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--solution',
        },
        T : {
            pcolor : proof,
            //letterAngle : 180,
            letterRotRadius : 20,
            cssClass: 'subessay--solution',
        },
        R : {
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 20,
            cssClass: 'subessay--solution',
        },
        Y : {
            pcolor : proof,
            letterAngle : 45,
            cssClass: 'subessay--none',
        },
        //speed of the body
        vb : {
            caption : '',
            pcolor : proof,
            letterAngle : 135,
            letterRotRadius : 20,
            draggableX  : fconf.sappId !== 'b1sec3prop12',
            draggableY  : fconf.sappId !== 'b1sec3prop12',
            cssClass: fconf.sappId === 'b1sec3prop12' ?
                'aspect--none' : 'aspect--addendum',
        },
        omegaHandle : {
            caption : 'ω',
            pcolor : shadow,
            letterAngle : 90,
            letterRotRadius : 17,
            draggableX  : fconf.sappId !== 'b1sec3prop12',
            draggableY  : fconf.sappId !== 'b1sec3prop12',
            fontSize : 20,
            cssClass: fconf.sappId === 'b1sec3prop12' ?
                'logic_phase--none' : 'logic_phase--proof',
        },
        f : {
            caption : '𝛾',
            pcolor : force,
            letterAngle : 90,
            letterRotRadius : 17,
            draggableX  : fconf.sappId !== 'b1sec3prop12',
            draggableY  : fconf.sappId !== 'b1sec3prop12',
            fontSize : 20,
            cssClass: fconf.sappId === 'b1sec3prop12' ?
                'logic_phase--none' : 'logic_phase--proof',
        },
        Z : {
            pcolor : body,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
            cssClass: 'subessay--solution',
        },
        Zminus : {
            caption : 'Z',
            pcolor : body,
            letterAngle : 145,
            letterRotRadius : 20,
            doPaintPname : "b1sec3prop13" !== fconf.sappId,
            cssClass: 'subessay--solution',
        },
        v : {
            caption : '𝑣',
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 15,
            cssClass: 'subessay--solution',
        },

        //F is possibly a tip of diameter
        //conjugate to Center-Body diameter
        F : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : 135,
            cssClass: 'subessay--solution',
        },
        VV : {
            caption : 'V',
            pcolor : proof,
            letterAngle : -45,
            cssClass: 'logic_phase--none',
        },
        //center symmetry of orbit
        C : {
            pcolor : borbit,
            letterAngle : -45,
            cssClass: 'logic_phase--proof',
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
        //----------------------------------------
        // \\// Prop. 10 Book's "another solution"
        //----------------------------------------
        //----------------------------------------
        // //\\ Prop. 11
        //----------------------------------------
        x : {
            caption : "𝑥",
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 20,
            cssClass: 'subessay--solution',
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
            letterRotRadius : 20,
        },

        P : {
            pcolor : body,
            letterAngle : 120,
        },

        Fi : {
            caption : "φ",
            pcolor : shadow, //body,
            letterAngle : 120,
            draggableX  : true,
            draggableY  : true,
        },

        Q : {
            pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'subessay--solution',
        },
        // //\\ eccentricity slider
        Zeta : {
            caption : 'eccentricity, e',
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.92 ],
            pcolor : borbit,
            letterAngle : 90,
            letterRotRadius : 20,
            draggableX  : true,
            undisplayAlways  : false,
            doPaintPname : true,
            unscalable  : true,
            cssClass: 'logic_phase--proof',
        },

        ZetaCaption : {
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.97 ],
            pcolor : borbit,
            undisplayAlways : true,
            letterAngle : 90,
            letterRotRadius : 20,
            doPaintPname : true,
            unscalable  : true,
            cssClass: 'logic_phase--proof',
        },

        ZetaStart : {
            pos : [ sf.medWidth * 0.1, sf.medHeight * 0.92 ],
            pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
            cssClass: 'logic_phase--proof',
        },

        ZetaEnd : {
            pos : [ sf.medWidth * 0.9, sf.medHeight * 0.92 ],
            pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
            cssClass: 'logic_phase--proof',
        },
        // \\// eccentricity slider
        //---------------------------------------
        // \\// draggable points
        //---------------------------------------
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*********************************************
    // //\\ pcolor -> elected topics,
    //      colors can be set in points and
    //      then added to elected topics
    //*********************************************
    //*********************************************
    // \\// pcolor -> elected topics,
    //*********************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = nspaste( {}, [
        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
        { Qx : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { Px : { pcolor : proof },
                 cssClass: 'subessay--solution',
        },
        //todm: proliferation
        { EP : { pcolor : result,
                 cssClass: 'logic_phase--proof',
        }, },
        { ES : { pcolor : result,
                 cssClass: 'subessay--solution',
        }, },
        { EI : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        /*
        { EO : { pcolor : proof,
                 cssClass: 'logic_phase--proof',
        }, },
        */
        { PE : { pcolor : proof,
                 cssClass: 'logic_phase--proof',
        }, },
        { EC : { pcolor : proof,
                 cssClass: 'logic_phase--proof',
        }, },
        { PH : {
                    pcolor : proof,
                    cssClass: 'subessay--solution',
                    vectorTipIx : 0,
               },
        },
        /*
        { PK : { pcolor : attention,
                 cssClass: 'subessay--none',
        }, },
        { SK : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        */
        { HI : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { BH : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        /*
        { OH : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        */
        { PI : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------

        { 'PC' : { pcolor : proof,
                   cssClass: 'logic_phase--proof',
        }, },
        { 'S,Fi' : { pcolor : shadow }, },

        { ST : { pcolor : proof,
                 cssClass: 'logic_phase--proof',
        }, },
        { 'SY' : { pcolor :  proof,
                   captionShiftNorm : -28,
                   cssClass: 'subessay--none',
        }, },
        { 'PY' : { pcolor : body,
                   cssClass: 'subessay--none',
        }, },
        { 'CS' : { pcolor : proof,
                   cssClass: 'subessay--solution',
        }, },
        { 'CH' : { pcolor : proof,
                   cssClass: 'subessay--solution',
        }, },
        { 'P,Zminus' : { pcolor : body,
           cssClass: 'subessay--solution',
        }, },
        { 'P,omegaHandle' : {
            pcolor : context,
            cssClass: fconf.sappId === 'b1sec3prop12' ?
                'logic_phase--none' : 'logic_phase--proof',
        }, },
        { 'PZ' : { pcolor : body,
                 cssClass: 'subessay--solution',
        }, },
        { 'ZR' : { pcolor : body,
                 cssClass: 'subessay--solution',
        }, },
        { 'PR' : { pcolor : body, 'stroke-width' : 2,
                   cssClass: 'subessay--solution',
                   captionShiftNorm : -18, }, },
        { 'P,vb' : { pcolor : body, 'stroke-width' : 2,
                     captionShiftNorm : -18,
                     vectorTipIx : 1,
                     cssClass: fconf.sappId === 'b1sec3prop12' ?
                        'aspect--none' : 'aspect--addendum',
        }, },
        { 'QR' : { pcolor : displacement,
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
        { DS : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        { DH : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        { PM : { pcolor : body,
                   cssClass: 'subessay--none',
        }, },
        { SM : { pcolor : body,
                   cssClass: 'subessay--none',
        }, },
        /*
        { OM : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        */
        /*
        { ON : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        */
        { NS : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        { SA : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { NP : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        { GP : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { Qv : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { Pv : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { Tv : { pcolor : proof,
                 cssClass: 'logic_phase--none',
        }, },
        { xv : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { Tx : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { Gv : { pcolor : proof,
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
        { AT : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { CA : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { CB : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { 'L,LL' : {
            pcolor : borbit,
            cssClass: 'subessay--solution',
            captionShiftNorm : 22,
            lposYSugar : 3
        }, },
        { SL : { pcolor : borbit,
                 cssClass: 'logic_phase--none'
        }},
        { CD : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        /*
        { PO : { pcolor : proof,
                 cssClass: 'logic_phase--proof',
        }, },
        */
        /*
        { FO : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        */
        { 'SP' : {
                pcolor : body,
                vectorTipIx : 1,
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
        { 'ZetaStart,ZetaEnd' :
            { pcolor : borbit,
              cssClass: 'logic_phase--proof',
             }
        },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    sf.shapesArray = [
        {
          isAngle: true,
          vertex_id: 'phi',
          rgn: 'phi-name',
          vertexTwin_rgn: 'S',
          CDString: 'S,Fi',
          angleStart: 0,
          pcolor: dimShadow,
          cssClass: 'aspect--addendum tofill',
          ANGLE_SIZE: 1.5,
          angleCaption: 'φ',
        },
        {
          isCurve: true,
          rgn : 'borbit',
          initShapes: ()=>{
                stdMod.init__borbitTripleShapes( op );
                let {
                    rr,
                    projectionOfCenterOnTangent,
                } = mcurve.planeCurveDerivatives({
                    fun : rg.borbit.dyn_q2xy,
                    q : op.PparQ_initial,
                    rrc : rg.S.pos,
                });
                nspaste( rg.P.pos, rr );
                nspaste( rg.Y.pos, projectionOfCenterOnTangent );
                ////establishes rg.omegaHandle.pos
                let excess = -0.2;
                rg.omegaHandle.initialPos =
                    mat.sm( 1+excess, rg.Y.pos, -excess, rg.P.pos );
                nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );

                //was in init_app
                rg.P.q = op.PparQ_initial;
                stdMod.completesSlidersCreation(); //in-diagram sliders
                stdMod.establishesEccentricity( op.eccentricity );
                //==================================================
                // //\\ decoration graph
                //==================================================
                stdMod.graphFW_lemma = stdMod.creates_lemma_graph_fw({
                    digramParentDom$:stdMod.legendRoot$
                });
                const graphArray = sn( 'graphArray', stdMod, [] );
                stdMod.graphFW_lemma.fw.content.pix2values = graphArray;
                //==================================================
                // \\// decoration graph
                //==================================================
          },
          //todo apparently needs implementation
          cssClass: 'subessay-not-comparing-proof-steps',
        },
    ];
    //*************************************
    // \\// shapes
    //*************************************
}
})();
