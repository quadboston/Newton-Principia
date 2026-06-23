(function(){
const {
        sn, nspaste, mat, fconf, sf, tprepo,
        tpelect, originalPoints, stdMod, rg, ssF,
      } = window.b$l.atree({ ssFList: { init_conf
}});
var op = sn( 'orbitParameters', sf );
return;


function init_conf(){
    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 884;
    sf.medHeight = 733;

    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sf.medsize_standard

    var F = [ 160, 410 ];
    var S = F;
    sf.diagramOrigin = [ 0, 0 ];

    sf.medposOfModOrigin_x = F[0]; //for model's axis x
    sf.medposOfModOrigin_y = F[1]; //for model's axis y
    sf.mod2med = 260;
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
    fconf.effId = 'prop_from_14_to_17';

            op.initialEccentricity = fconf.sappId === 'b1sec3prop16' ? 0.67 : 0.68;
            //for real picture if diagram's picture is supplied or
            //for graphical-media work-area if not supplied:
            op.latusInitial = 0.83;
            var PparQ       = ( fconf.sappId === 'b1sec3prop16' ? 0.14 : 0.07 ) * Math.PI;
            {
                let sag_q = fconf.sappId === 'b1sec3prop16' ?
                    //0.2 :
                    0.4 :
                    //0.19;
                    0.62;
                op.sagittaDelta_q_initial     = sag_q;
                op.Dt0 = sag_q * 2.5;
            }
            op.Dt = op.Dt0;
            op.delta_t_LIMIT = op.Dt0 * 1.5;
            sf.Fi_distance = 1.8;

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

    //*************************************
    // //\\ topic group colors,
    //      to see templates what to override here, do
    //      look at conf/lemma.conf.js:
    //*************************************
    ///does import topic colors
    const {
        force,
        curvature,

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
        instanttriangle : [0, 150, 200, 0.001, 0.5 ],
    });
    //*************************************
    // \\// topic group colors,
    //*************************************

    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    //empty section is kept
    //for modules comparision
    //*************************************
    // \\// bricks for originalPoints
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    //-------------------------------------
    // //\\ prepares points
    //-------------------------------------
    // empty section for comparisions
    //-------------------------------------
    // \\// prepares points
    //-------------------------------------

    Object.assign( originalPoints, {
        O : {
            pcolor : context,
            caption : 'O',
            pos: F,
            letterAngle : 45,
            letterRotRadius : 20,
        },

        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
        E : {
            pcolor : proof,
            letterRotRadius : 20,
            //letterAngle : 90,
        },
        H : {
            pcolor : proof,
            letterAngle : -90,
        },
        I : {
            pcolor : proof,
            letterRotRadius : 20,
        },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------



        B : {
            letterRotRadius : 20,
        pcolor : borbit,
        },

        BB : {
            letterAngle : 90,
            undisplayAlways : true,
            doPaintPname : false,
        pcolor : borbit,
        },

        L : {
            //no need: will be dynamic: caption : 'mmm',
            pcolor : borbit,
            letterAngle : -45,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
        },

        LL : {
            pcolor : borbit,
            doPaintPname : false,
        },


        l : {
            //no need: will be dynamic: caption : 'mmm',
            pcolor : given,
            letterAngle : -45,
            letterRotRadius : 20,
        },

        ll : {
            pcolor : given,
            doPaintPname : false,
        },


        A : {
        pcolor : borbit,
            letterRotRadius : 20,
            letterAngle : -90,
        },

        AA : {
            undisplayAlways : true,
            doPaintPname : false,
        pcolor : borbit,
        },


        D : {
        pcolor : proof,
            letterRotRadius : 20,
            //letterAngle : 135,
        },

        K : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -60,
        },

        M : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
        },

        N : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
        },
        G : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : -45,
        },


        T : {
            pcolor : proof,
            //letterAngle : 180,
            letterRotRadius : 20,
        },

        R : {
        pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 20,
        },



        vSample : {
            ////prop17
            caption : 'r',
            pcolor : given,
            letterAngle : 135,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
        },


        Y : {
            pcolor : proof,
            letterAngle : 45,
        },

        //speed of the body
        vb : {
            caption : '',
        pcolor : proof,
            letterAngle : 135,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
        },


        omegaHandle : {
            caption : 'ω',
            pcolor : shadow,
            letterAngle : 90,
            letterRotRadius : 17,
            draggableX  : true,
            draggableY  : true,
            fontSize : 20,
        },


        f : {
            caption : '𝛾',
            pcolor : force,
            letterAngle : 90,
            letterRotRadius : 17,
            draggableX  : true,
            draggableY  : true,
            fontSize : 20,
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
            letterAngle : 145,
            letterRotRadius : 20,
            doPaintPname : "b1sec3prop13" !== fconf.sappId,
        },
        Ys : {
            caption : '',
            pcolor : proof,
            letterAngle : 45,
        },
        v : {
            caption : '𝑣',
            pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 15,
        },
        F : {
            pcolor : proof,
            letterRotRadius : 20,
            letterAngle : 135,
        },
        VV : {
            caption : 'V',
            pcolor : proof,
            letterAngle : -45,
        },

        //center symmetry of orbit
        C : {
        pcolor : borbit,
            letterAngle : -45,
        },

        //----------------------------------------
        // //\\ Prop. 10 Book's "another solution"
        //----------------------------------------
        u : {
            caption : '𝑢',
        pcolor : proof,
            letterAngle : -45,
            letterRotRadius : 15,
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
            letterAngle : -90,
        },

        p : {
            pcolor : given,
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
        },
        q : {
            ////prop17
            pcolor : given,
            letterAngle : -65,
            letterRotRadius : 20,
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
        },

        ZetaCaption : {
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.97 ],
        pcolor : borbit,
            undisplayAlways : true,
            letterAngle : 90,
            letterRotRadius : 20,
            doPaintPname : true,
            unscalable  : true,
        },

        ZetaStart : {
            pos : [ sf.medWidth * 0.1, sf.medHeight * 0.92 ],
        pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
        },

        ZetaEnd : {
            pos : [ sf.medWidth * 0.9, sf.medHeight * 0.92 ],
        pcolor : borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
        },
        // \\// eccentricity slider
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
        { Qx : { pcolor : proof }, },
        { Px : { pcolor : proof }, },
        //todm: proliferation
        { EP : { pcolor : proof }, },
        { PE : { pcolor : proof }, },
        { ES : { pcolor : proof }, },
        { EI : { pcolor : proof }, },
        { EO : { pcolor : proof }, },
        { EC : { pcolor : proof }, },
        { PH : {
                    pcolor : proof,
                    vectorTipIx : 0,
                },
        },
        { PK : { pcolor : attention }, },
        { SK : { pcolor : proof }, },
        { HI : { pcolor : proof }, },
        { BH : { pcolor : proof }, },
        //{ OS : { pcolor : proof }, },
        { OH : { pcolor : proof }, },
        { PI : { pcolor : proof }, },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------

        //{ 'CV' : { pcolor : curvature }, },
        { 'PC' : { pcolor : proof }, },
        { 'O,Fi' : { pcolor : shadow }, },

        { ST : { pcolor : proof, }, },

    { 'SY' : { pcolor :  proof,
                    captionShiftNorm : -28 }, },
    { 'S,Ys' : { pcolor : proof,
                    captionShiftNorm : -28 }, },

        { 'PY' : { pcolor : body }, },
    { 'CS' : { pcolor : proof }, },
        { 'CH' : { pcolor : proof }, },

        { 'P,Zminus' : { pcolor : body }, },
        { 'P,omegaHandle' : { pcolor : context }, },
        { 'PZ' : { pcolor : body }, },
        { 'ZR' : { pcolor : body }, },

        { 'PR' : { pcolor : body, 'stroke-width' : 2, captionShiftNorm : -18, }, },
        { 'P,vb' : { pcolor : body, 'stroke-width' : 2, captionShiftNorm : -18,
                    vectorTipIx : 1 }, },
        { 'p,vSample' : { pcolor : given, 'stroke-width' : 1.1, captionShiftNorm : -18,
                    vectorTipIx : 1 }, },
        { 'p,f' : { pcolor : force, 'stroke-width' : 1.1, captionShiftNorm : -18,
                    vectorTipIx : 1 }, },

    { 'QR' : { pcolor : proof }, },
        //{ 'SQ' : { pcolor : proof }, },
        { 'QT' : { pcolor : proof }, },
        { 'PT' : { pcolor : proof }, },

        { DK : { pcolor : proof }, },
        { DS : { pcolor : proof }, },
    { DH : { pcolor : proof }, },
        { PM : { pcolor : body }, },
        { SM : { pcolor : body }, },

        { OM : { pcolor : proof }, },
        { ON : { pcolor : proof }, },
        { NS : { pcolor : proof }, },
    { SA : { pcolor : proof }, },
        { NP : { pcolor : proof }, },

        { GP : { pcolor : proof }, },
        { Qv : { pcolor : proof }, },
        { Pv : { pcolor : proof }, },
        { Tv : { pcolor : proof }, },
        { xv : { pcolor : proof }, },
        { Tx : { pcolor : proof }, },

        { Gv : { pcolor : proof }, },
        { PF : { pcolor : proof }, },
    { 'A,AA' : { pcolor : borbit }, },
    { 'B,BB' : { pcolor : borbit }, },
    //{ AO : { pcolor : borbit }, },
        { AT : { pcolor : proof }, },
    { CA : { pcolor : proof }, },

    //{ DO : { pcolor : proof }, },
    //{ BO : { pcolor : proof }, },
    { CB : { pcolor : proof }, },
        //{ 'L,LL' : { pcolor : proof, caption : 'L/2',
        //             captionShiftNorm : -18, fontSize : 20, }, },
    { 'L,LL' : { pcolor : borbit,
            captionShiftNorm : 22, lposYSugar : 3 }, },
        { 'l,ll' : { pcolor : given,
            captionShiftNorm : 44, lposYSugar : -5, }, },
        { SL : { pcolor : borbit, }, },
    { CD : { pcolor : proof }, },

        { PO : { pcolor : proof }, },
        { OP : { pcolor : hidden }, },

        //{ GO : { pcolor : proof }, },
        { FO : { pcolor : proof }, },
        { 'SP' : {
            pcolor : body,
                vectorTipIx : 1 },
        },
        { 'Sp' : { pcolor : given, 'stroke-width' : 1.1, captionShiftNorm : -18,
                    vectorTipIx : 1 }, },

        //Book's "another solution"
        { Tu : { pcolor : proof }, },
        { 'u,VV' : { pcolor : proof }, },
        { uP : { pcolor : proof }, },
        { PQ : { pcolor : proof }, },
        { 'P,VV' : { pcolor : proof }, },
        { 'ZetaStart,ZetaEnd' :
        { pcolor : borbit }
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
            isAngle : true,
            vertex_id : 'vertex-phi',
            rgn: 'phi',
            vertexTwin_rgn: 'O',
            angleCaption: 'φ',
            pcolor : dimShadow,
            ABString: 'O,Fi',
            CDString: 'OP',
            cssClass: 'aspect--addendum tofill',
            ANGLE_SIZE: 1.5,
        },
        {
            isAngle : true,
            vertex_id : 'vertex-Omega',
            rgn: 'Omega',
            vertexTwin_rgn: 'P',
            angleCaption: 'ω',
            pcolor : dimShadow,
            ABString: 'SP',
            CDString: 'PR',
            cssClass: 'aspect--addendum tofill',
            ANGLE_SIZE  : 0.7,
        },
        {
            isCurve: true,
            rgn : 'borbit',
            initShapes: ()=>{
                stdMod.init__borbitTripleShapes(op);
                //was in init_app
                rg.P.q = op.PparQ_initial;
                stdMod.completesSlidersCreation(); //in-diagram sliders
                stdMod.establishesEccentricity( op.eccentricity );
            },
        },
        {
            rgn : 'instanttriangle',
            initShapes: ()=>{
                let pkey = 'instanttriangle';
                rg[ pkey ].vertices = [ rg.S.pos, rg.P.pos, rg.Q.pos ];
                ssF.paintTriangle(
                    pkey,
                    'tofill', //cssCls,
                );
            },
        },
    ];
    //*************************************
    // \\// shapes
    //*************************************
}
})();