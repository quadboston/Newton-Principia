(function (){

const { sn, nspaste, mat, mcurve, rg, fconf, sf,
        stdMod, tprepo, tpelect, originalPoints, } =
        window.b$l.atree({ ssFList : {
            init_conf
}});
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
    sf.medWidth = 938;
    sf.medHeight = 611;
    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sf.medsize_standard

    var F = [ 560, 554 ];
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
    op.mainAxisAngle_initial = 0;
    op.mainAxisAngle = op.mainAxisAngle_initial;
    op.delta_v_increase_LIMIT = 1.5;

    //sets cinematics
    var Kepler_g        = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
    op.Kepler_g         = Kepler_g;
    op.Kepler_gInitial  = Kepler_g;
    //sop.Kepler_g        = Kepler_g;
    //sop.Kepler_gInitial = Kepler_g;
    fconf.effId = fconf.sappId;

    //conic pars
    op.latusInitial           = 2.10;
    op.initialEccentricity    = 1; //parabola
    var PparQ                 = 0.386 * Math.PI;
    //decorations
    op.sagittaDelta_q_initial = 0.39;
    sf.Fi_distance         = 3.7;

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
            undisplayAlways : true,
            doPaintPname : false,
        },
        H : {
            pcolor : proof,
            letterAngle : -90,
            cssClass: 'subessay--solution',
        },
        //for P12 code
        I : {
            pcolor : proof,
            letterRotRadius : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        B : {
            letterRotRadius : 20,
            pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
        },
        BB : {
            letterAngle : 90,
            undisplayAlways : true,
            doPaintPname : false,
            pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
        },
        L : {
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
            undisplayAlways : true,
            doPaintPname : false,
        },
        D : {
            pcolor : proof,
            letterRotRadius : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        K : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -60,
            undisplayAlways : true,
            doPaintPname : false,
        },
        M : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--solution',
        },
        N : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--solution',
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
            cssClass: 'logic_phase--proof subessay--corollary2',
        },
        R : {
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 20,
            cssClass: 'logic_phase--proof ' +
                      'logic_phase--corollary',
        },
        Y : {
            pcolor : proof,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //speed of the body
        vb : {
            caption : '',
            pcolor : proof,
            letterAngle : 135,
            letterRotRadius : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        omegaHandle : {
            caption : 'ω',
            pcolor : shadow,
            letterAngle : 90,
            letterRotRadius : 17,
            undisplayAlways : true,
            doPaintPname : false,
            fontSize : 20,
        },
        f : {
            caption : '𝛾',
            pcolor : force,
            letterAngle : 90,
            letterRotRadius : 17,
            //draggableX  : fconf.sappId !== 'b1sec3prop12',
            //draggableY  : fconf.sappId !== 'b1sec3prop12',
            fontSize : 20,
            undisplayAlways : true,
            doPaintPname : false,
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
            undisplayAlways : true,
            doPaintPname : false,
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
            undisplayAlways : true,
            doPaintPname : false,
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
            undisplayAlways : true,
            doPaintPname : false,
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
            draggableX  : true,
            draggableY  : true,
        },
        Fi : {
            caption : "φ",
            pcolor : shadow, //body,
            letterAngle : 120,
            undisplayAlways : true,
            doPaintPname : false,
        },

        Q : {
        pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'logic_phase--proof subessay--corollary2',
        },

        // //\\ eccentricity slider
        Zeta : {
            caption : 'eccentricity, e',
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.92 ],
            pcolor : borbit,
            letterAngle : 90,
            letterRotRadius : 20,
            draggableX  : false,
            undisplayAlways  : true,
            doPaintPname : false,
            unscalable  : true,
            cssClass: 'subessay--none',
        },

        ZetaCaption : {
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.97 ],
            pcolor : borbit,
            undisplayAlways : true,
            letterAngle : 90,
            letterRotRadius : 20,
            doPaintPname : false,
            unscalable  : true,
            cssClass: 'subessay--none',
        },

        ZetaStart : {
            pos : [ sf.medWidth * 0.1, sf.medHeight * 0.92 ],
            pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
            undisplayAlways : true,
            doPaintPname : false,
        },

        ZetaEnd : {
            pos : [ sf.medWidth * 0.9, sf.medHeight * 0.92 ],
            pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //---------------------------------------
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
        { Px : { pcolor : proof,
                 cssClass: 'subessay--solution',
        },},
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        { 'PC' : { pcolor : proof,
                   cssClass: 'logic_phase--proof',
        }, },
        { 'S,Fi' : { pcolor : shadow,
                     cssClass: 'logic_phase--none',
        }, },
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
        { 'P,Zminus' : {
            pcolor : body,
            cssClass: 'subessay--solution',
        }, },
        { 'P,omegaHandle' : {
            pcolor : context,
            cssClass: 'logic_phase--none',
        }, },
        { 'PZ' : { pcolor : body,
                   cssClass: 'subessay--solution',
        }, },
        { 'ZR' : { pcolor : body,
                   cssClass: 'subessay--solution',
        }, },
        { 'PR' : {
            pcolor : body,
            'stroke-width' : 2,
            cssClass: 'logic_phase--corollary',
            captionShiftNorm : -18, }, },
        { 'P,vb' : { pcolor : body, 'stroke-width' : 2,
                     captionShiftNorm : -18,
                     vectorTipIx : 1,
                     cssClass: 'aspect--none',
        }, },
        { 'QR' : {
            pcolor : displacement,
            cssClass: 'logic_phase--proof subessay--corollary2',
        }, },
        { 'QT' : {
            pcolor : proof,
            cssClass: 'logic_phase--proof subessay--corollary2',
        }, },
        { 'PT' : { pcolor : proof,
                   cssClass: 'logic_phase--proof',
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
                   cssClass: 'subessay--solution',
        }, },
        { SM : { pcolor : body,
                   cssClass: 'subessay--solution',
        }, },
        { NS : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { SA : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { NP : { pcolor : proof,
                 cssClass: 'subessay--solution',
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
                 cssClass: 'logic_phase--none',
        }, },
        { 'A,AA' : { pcolor : proof,
                     cssClass: 'logic_phase--none'
        }},
        { 'B,BB' : { pcolor : proof,
                     cssClass: 'logic_phase--none'
        }},
        { AT : { pcolor : proof,
                 cssClass: 'subessay--none',
        }, },
        { CA : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { CB : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { 'L,LL' : {
            pcolor : borbit,
            cssClass: 'logic_phase--proof subessay--corollary2',
            captionShiftNorm : 22,
            lposYSugar : 3
        }, },
        { SL : { pcolor : borbit,
                 cssClass: 'logic_phase--none'
        }},
        { CD : { pcolor : proof,
                 cssClass: 'subessay--solution',
        }, },
        { 'SP' : {
            pcolor : body,
            vectorTipIx : 1,
            cssClass: 'subessay--solution subessay-corollary2',
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
              cssClass: 'logic_phase--none',
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
          isCurve: true,
          rgn : 'borbit',
          initShapes: ()=>{
            stdMod.init__borbitTripleShapes( op )
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
          //todm apparently needs implementation
          cssClass: 'subessay-not-comparing-proof-steps',
        },
    ];
    //*************************************
    // \\// shapes
    //*************************************
}
})();
