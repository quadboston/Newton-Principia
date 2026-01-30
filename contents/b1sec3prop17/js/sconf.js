(function() {
    const {
        sn, nspaste, mat, fconf, sf, tpid2arrc_repo,
        tpid2arrc_elect, originalPoints,
        stdMod,
    } = window.b$l.apptree({ //export to apptree
        ssFExportList : { init_conf }
    });
    const op = sn( 'orbitParameters', sf );
    const sop = sn( 'sampleOrbitParameters', sf );
    return;


    function init_conf(){
        //***************************************************************
        // //\\ original picture dimensions for svg scene
        //***************************************************************
        sf.pictureWidth = 1037;
        sf.pictureHeight = 765;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( sf.pictureWidth + sf.pictureHeight ) / 2;
        var controlsScale = realSvgSize / sf.standardSvgSize

        var forceHandleInitial = 0.8; //todm fix
        var F = [ 350, 410 ];
        var S = F;
        sf.diagramOrigin = [ 0, 0 ];
        sf.originX_onPicture = F[0]; //for model's axis x
        sf.originY_onPicture = F[1]; //for model's axis y
        sf.mod2inn_scale = 260;
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
        sf.LETTER_FONT_SIZE_PER_1000 = 20;
        sf.pointDecoration.r = 5;
        //no effect: sf.handleRadius = 5;
        //sf.text_hover_width = 1;
        //***************************************************************
        // \\// GUI cosmetics
        //***************************************************************

        //******************************************
        // //\\ model principals parameters
        //******************************************
        //sets model offset
        op.curveName = 'orbit';
        op.mainAxisAngle_initial = 0;
        op.mainAxisAngle = op.mainAxisAngle_initial;
        op.delta_v_increase_LIMIT = 1.5;

        //sets cinematics
        var Kepler_g        = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
        op.Kepler_g         = Kepler_g;
        op.Kepler_gInitial  = Kepler_g;
        sop.Kepler_g        = Kepler_g;
        sop.Kepler_gInitial = Kepler_g;
        fconf.effId = 'prop_from_14_to_17';

        //media
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        sf.Fi_distance = 1.8;
        sf.insertDelayedBatch = true;

        //-------------------------------------------
        // //\\ sop
        //-------------------------------------------
        //sets cinematics
        sop.curveName ='orbit-sample';
        sop.latusInitial       = 1;
        sop.latus              = sop.latusInitial;
        sop.forceHandleInitial = forceHandleInitial;
        sop.forceHandle        = forceHandleInitial;
        {
            //Book's diagram values
            let r             = 1.30307;
            let r2axisX_angle = 2.24;
            let sin2speed     = 0.999;
            //Book's derivative values
            let eta = sop.latus / r;
            let e   = Math.sqrt( eta*eta / sin2speed / sin2speed - 2 * eta + 1 );
            let fi  = Math.acos( (1-eta)/e );

            //sop.latusInitial is already saved
            sop.r = r;
            sop.PparQ_initial = fi;
            sop.initialEccentricity = e;
            //diagram valuse:
            sop.r2axisX_angle = r2axisX_angle;
            sop.r2axisX_angle_initial = r2axisX_angle;
            //derived
            sop.mainAxisAngle = sop.r2axisX_angle - sop.PparQ_initial;
        }
        stdMod.establishesEccentricity( sop.initialEccentricity, null, sop );

        //decoration
        sop.sagittaDelta_q_initial = 0.4;
        //-------------------------------------------
        // \\// sop
        //-------------------------------------------

        //-------------------------------------------
        // //\\ op
        //-------------------------------------------
        op.latusInitial         = 0.93;
        op.latus                = op.latusInitial;
        op.initialEccentricity  = 0.60;
        var PparQ = 0.39 * Math.PI;
        {
            let sag_init                    = 0.16;
            op.sagittaDelta_q_initial       = sag_init;
            //in this prop, using Dt instead of sag_delta_q
            op.Dt0              = sag_init * 2.5;
            op.Dt                      = op.Dt0;
            op.delta_t_LIMIT                = op.Dt0 * 1.5;
        }
        stdMod.establishesEccentricity( op.initialEccentricity );
        //-------------------------------------------
        // \\// op
        //-------------------------------------------
        //todm get r and then e:
        //var neededG = 0.975339131380;

        //-----------------------------------------
        // //\\ defines sample speed
        //-----------------------------------------
        var { Kepler_v, cosOmega, om } = mat.conics.innerPars2innerPars({
            lat         : sop.latusInitial,
            fi          : sop.PparQ_initial,
            e           : sop.initialEccentricity,
            Kepler_g    : sop.Kepler_g,
        })
        sop.Kepler_v         = Kepler_v;
        sop.Kepler_v_initial = Kepler_v;
        sop.cosOmega         = cosOmega;
        sop.om               = om;
        sop.cosOmega_initial = cosOmega;
        sop.om_initial       = om;
        //-----------------------------------------
        // \\// defines sample speed
        //-----------------------------------------
        stdMod.establishesEccentricity( op.initialEccentricity );

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
        let {
            force,
            curvature,

            body,
            orbit,

            given,
            proof,
            result,

            hidden,
            context,
            invalid,
            shadow,
        } = tpid2arrc_repo;
        orbitSample = given;

        //orbit to be calculated based on sample orbit
        const resultingOrbit = [100,  0, 0, 1];
        orbit = resultingOrbit;
        body = resultingOrbit;
        const orbitdq = resultingOrbit;

        //for proof key point, segment PK
        const attention = [200,  200, 0, 1];

        //second part of the proof,
        //possibly redundant,
        result = proof;

        var proofHidden = [0, 0,   255, 0.05];

        nspaste( tpid2arrc_elect, { //need deep copy
            force,
            curvature,
            given,

            proof,
            result,

            hidden,
            context,

            body,
            orbit,
            orbitdq,
            shadow,

            //PQS
            instanttriangle : [0, 150, 200, 0.2, 0.5 ],

            //sample:
            //orbitarea : [0,     150, 0,    0.1, 0.5],
            'orbitarea-sample' : [0,     150, 0,  0.05],
            'orbit-sample' : orbitSample,
            'orbitdq-sample' : orbitSample, //todm remove
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
                pcolor : resultingOrbit,
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
                pcolor : proof,
            },

            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : proof,
            },

            L : {
                //no need: will be dynamic: caption : 'mmm',
                pcolor : orbit,
                letterAngle : -45,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },

            LL : {
                pcolor : orbit,
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
                pcolor : resultingOrbit,
                letterRotRadius : 20,
                letterAngle : -90,
            },

            AA : {
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : result,
            },

            D : {
                pcolor : resultingOrbit,
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
                pcolor : body,
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
                pcolor : body,
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
                pcolor : proof,
                letterAngle : -45,
            },

            //----------------------------------------
            // //\\ Prop. 10 Book's "another solution"
            //----------------------------------------
            u : {
                caption : '𝑢',
                pcolor : body,
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
                pcolor : force,
                letterAngle : -115,
                letterRotRadius : 20,
            },

            P : {
                pcolor : body,
                letterAngle : 225,
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
                pcolor : resultingOrbit,
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
                pos : [ sf.pictureWidth * 0.5, sf.pictureHeight * 0.92 ],
                pcolor : proof,
                letterAngle : 90,
                letterRotRadius : 20,
                draggableX  : true,
                undisplayAlways  : false,
                doPaintPname : true,
                unscalable  : true,
            },

            ZetaCaption : {
                pos : [ sf.pictureWidth * 0.5, sf.pictureHeight * 0.97 ],
                pcolor : proof,
                undisplayAlways : true,
                letterAngle : 90,
                letterRotRadius : 20,
                doPaintPname : true,
                unscalable  : true,
            },

            ZetaStart : {
                pos : [ sf.pictureWidth * 0.1, sf.pictureHeight * 0.92 ],
                pcolor : proof,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },

            ZetaEnd : {
                pos : [ sf.pictureWidth * 0.9, sf.pictureHeight * 0.92 ],
                pcolor : proof,
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
            { Qx : { pcolor : resultingOrbit }, },
            { Px : { pcolor : proof }, },
            //todm: proliferation
            { EP : { pcolor : proof }, },
            { PE : { pcolor : proof }, },
            { ES : { pcolor : proof }, },
            { EI : { pcolor : proof }, },
            { EO : { pcolor : resultingOrbit }, },
            { EC : { pcolor : proof }, },
            { PH : {
                        pcolor : proof,
                        vectorTipIx : 0,
                   },
            },
            { PK : { pcolor : attention }, },
            { SK : { pcolor : proof }, },
            { HI : { pcolor : resultingOrbit }, },
            { BH : { pcolor : proof }, },
            //{ OS : { pcolor : proof }, },
            { OH : { pcolor : resultingOrbit }, },
            { PI : { pcolor : proof }, },
            //-----------------------------------------
            // \\// Book's prop. 11
            //-----------------------------------------

            //{ 'CV' : { pcolor : curvature }, },
            { 'PC' : { pcolor : proof }, },
            { 'O,Fi' : { pcolor : shadow }, },

            { ST : { pcolor : proof, }, },

            { 'SY' : { pcolor : proofHidden,
                       captionShiftNorm : -28 }, },
            { 'S,Ys' : { pcolor : proofHidden,
                       captionShiftNorm : -28 }, },

            { 'PY' : { pcolor : body }, },
            { 'CS' : { pcolor : proof}, },
            { 'CH' : { pcolor : proof }, },

            { 'P,Zminus' : { pcolor : body }, },
            { 'P,omegaHandle' : { pcolor : context }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body, 'stroke-width' : 2, captionShiftNorm : -18, }, },
            { 'P,vb' : { pcolor : body, 'stroke-width' : 2, captionShiftNorm : -18,
                       vectorTipIx : 1 }, },
            { 'p,vSample' : { pcolor : given, 'stroke-width' : 1.1,
              captionShiftNorm : -18,
                       vectorTipIx : 1 }, },
            { 'p,f' : { pcolor : force, 'stroke-width' : 1.1, captionShiftNorm : -18,
                       vectorTipIx : 1 }, },

            { 'QR' : { pcolor : proof }, },
            //{ 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { DK : { pcolor : proof }, },
            { DS : { pcolor : proof }, },
            { DH : { pcolor : resultingOrbit }, },
            { PM : { pcolor : body }, },
            { SM : { pcolor : body }, },

            { OM : { pcolor : proof }, },
            { ON : { pcolor : proof }, },
            { NS : { pcolor : proof }, },
            { SA : { pcolor : result }, },
            { NP : { pcolor : proof }, },

            { GP : { pcolor : proof }, },
            { Qv : { pcolor : proof }, },
            { Pv : { pcolor : proof }, },
            { Tv : { pcolor : proof }, },
            { xv : { pcolor : proof }, },
            { Tx : { pcolor : proof }, },

            { Gv : { pcolor : proof }, },
            { PF : { pcolor : proof }, },
            { 'A,AA' : { pcolor : resultingOrbit }, },
            { 'B,BB' : { pcolor : resultingOrbit }, },
            //{ AO : { pcolor : result }, },
            { AT : { pcolor : proof }, },
            { CA : { pcolor : resultingOrbit }, },

            //{ DO : { pcolor : result }, },
            //{ BO : { pcolor : result }, },
            { CB : { pcolor : resultingOrbit }, },
            //{ 'L,LL' : { pcolor : proof, caption : 'L/2',
            //             captionShiftNorm : -18, fontSize : 20, }, },
            { 'L,LL' : { pcolor : resultingOrbit,
               captionShiftNorm : 22, lposYSugar : 3 }, },
            { 'l,ll' : { pcolor : given,
               captionShiftNorm : 44, lposYSugar : -5, }, },
            { SL : { pcolor : orbit, }, },
            { CD : { pcolor : result }, },

            { PO : { pcolor : proof }, },
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
              { pcolor : result }
            },
        ]);
        //*************************************
        // \\// original app lines
        //*************************************
    }
})();
