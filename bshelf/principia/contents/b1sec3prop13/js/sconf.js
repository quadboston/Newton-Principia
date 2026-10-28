{
const{
        sn, nspaste, mat, mcurve, rg, fconf, sf, CONST, apush,
        gshapes, stdMod, tprepo, tpelect, ssF,
    }=window.b$l.atree();
const op = sn( 'orbitParameters', sf );
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;

ssF.init_conf=function(){
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
    //      look at c onf/c onf.js or especally at c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
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
    // \\// model principals parameters
    //******************************************

    //************************************************
    // //\\ elected colors,
    //      does import topic colors to elected colors
    //      from c onf/lemma.c onf.js
    //************************************************
    [
        'force',
        'curvature',
        'displacement',
        'given',
        'proof',
        'result',
        'hidden',
        'context',
        'body',
        'borbit',
        'borbitdq',
        'shadow',
        'dimShadow',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    //************************************************
    // \\// elected colors,
    //************************************************

    //*************************************
    // //\\ shapes
    //*************************************
    apush( gshapes, [
        {
          kind: CURVE,
          rgn : 'borbit',
          initShapes: ()=>{
            stdMod.init__borbitTripleShapes( op );
            let {
                rr,
                projectionOfCenterOnTangent,
            } = mcurve.planeCurveDerivatives(
                rg.borbit.dyn_q2xy,
                op.PparQ_initial,
                rg.S.pos,
            );
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
          resetsLesson: (gshape, rgn)=>{
            rg.f.caption = '';
          },
          //todm apparently needs implementation
          cssClass: 'subessay--off-comparing-proof-steps',
        },
    ]);
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    //-----------------------------------------
    // //\\ Book's prop. 11
    //-----------------------------------------
    {
        kind: LINE,
        rgn: 'Qx',
        pcolor: el.proof,
        cssClass: 'subessay--solution',
    },
    { rgn: 'Px', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    //-----------------------------------------
    // \\// Book's prop. 11
    //-----------------------------------------
    { rgn: 'PC', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'S,Fi', pcolor: el.shadow,
                    cssClass: 'logic_phase--none',
    },
    { rgn: 'ST', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'SY', pcolor: el. proof,
                captionShiftNorm : -28,
                cssClass: 'subessay--none',
    },
    { rgn: 'PY', pcolor: el.body,
                cssClass: 'subessay--none',
    },
    { rgn: 'CS', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'CH', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'P,Zminus',
        pcolor: el.body,
        cssClass: 'subessay--solution',
    },
    { rgn: 'P,omegaHandle',
        pcolor: el.context,
        cssClass: 'logic_phase--none',
    },
    { rgn: 'PZ', pcolor: el.body,
                cssClass: 'subessay--solution',
    },
    { rgn: 'ZR', pcolor: el.body,
                cssClass: 'subessay--solution',
    },
    { rgn: 'PR',
        pcolor: el.body,
        'stroke-width' : 2,
        cssClass: 'logic_phase--corollary',
        captionShiftNorm : -18, },
    { rgn: 'P,vb', pcolor: el.body, 'stroke-width' : 2,
                    captionShiftNorm : -18,
                    vectorTipIx : 1,
                    cssClass: 'aspect--none',
    },
    { rgn: 'QR',
        pcolor: el.displacement,
        cssClass: 'logic_phase--proof subessay--corollary2',
    },
    { rgn: 'QT',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof subessay--corollary2',
    },
    { rgn: 'PT', pcolor: el.proof,
                cssClass: 'logic_phase--proof',
    },
    { rgn: 'DK', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'DS', pcolor: el.proof,
                cssClass: 'subessay--none',
    },
    { rgn: 'DH', pcolor: el.proof,
                cssClass: 'subessay--none',
    },
    { rgn: 'PM', pcolor: el.body,
                cssClass: 'subessay--solution',
    },
    { rgn: 'SM', pcolor: el.body,
                cssClass: 'subessay--solution',
    },
    { rgn: 'NS', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'SA', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'NP', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'GP', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'Qv', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'Pv', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'Tv', pcolor: el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'xv', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'Tx', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'Gv', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'PF', pcolor: el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'A,AA', pcolor: el.proof,
                    cssClass: 'logic_phase--none'
    },
    { rgn: 'B,BB', pcolor: el.proof,
                    cssClass: 'logic_phase--none'
    },
    { rgn: 'AT', pcolor: el.proof,
                cssClass: 'subessay--none',
    },
    { rgn: 'CA', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'CB', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'L,LL',
        pcolor: el.borbit,
        cssClass: 'logic_phase--proof subessay--corollary2',
        captionShiftNorm : 22,
        lposYSugar : 3
    },
    { rgn: 'SL', pcolor: el.borbit,
                cssClass: 'logic_phase--none'
    },
    { rgn: 'CD', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'SP',
        pcolor: el.body,
        vectorTipIx : 1,
        cssClass: 'subessay--solution subessay-corollary2',
    },

    //Book's "another solution"
    { rgn: 'Tu', pcolor: el.proof,
                cssClass: 'subessay--none',
    },
    { rgn: 'u,VV', pcolor: el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'uP', pcolor: el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'PQ', pcolor: el.proof,
                cssClass: 'subessay--solution',
    },
    { rgn: 'P,VV', pcolor: el.proof,
                cssClass: 'logic_phase--none',
    },
    { rgn: 'ZetaStart,ZetaEnd',
            pcolor: el.borbit,
            cssClass: 'logic_phase--none',
    },
    ]);
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    //-----------------------------------------
    // //\\ Book's prop. 11
    //-----------------------------------------
    {
        kind: POINT,
        rgn: 'E',
        pcolor: el.proof,
        letterRotRadius : 20,
        undisplayAlways : true,
        doPaintPname : false,
    },
        { rgn: 'H',
            pcolor: el.proof,
            letterAngle : -90,
            cssClass: 'subessay--solution',
        },
        //for P12 code
        { rgn: 'I',
            pcolor: el.proof,
            letterRotRadius : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        { rgn: 'B',
            letterRotRadius : 20,
            pcolor: el.borbit,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'BB',
            letterAngle : 90,
            undisplayAlways : true,
            doPaintPname : false,
            pcolor: el.borbit,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'L',
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'LL',
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'A',
            pcolor: el.borbit,
            letterRotRadius : 20,
            letterAngle : -90,
            cssClass: 'subessay--solution',
        },
        { rgn: 'AA',
            undisplayAlways : true,
            doPaintPname : false,
            pcolor: el.borbit,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'D',
            pcolor: el.proof,
            letterRotRadius : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'K',
            pcolor: el.proof,
            letterRotRadius : 20,
            letterAngle : -60,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'M',
            pcolor: el.proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--solution',
        },
        { rgn: 'N',
            pcolor: el.proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--solution',
        },
        { rgn: 'G',
            pcolor: el.proof,
            letterRotRadius : 20,
            letterAngle : -45,
            cssClass: 'subessay--solution',
        },
        { rgn: 'T',
            pcolor: el.proof,
            //letterAngle : 180,
            letterRotRadius : 20,
            cssClass: 'logic_phase--proof subessay--corollary2',
        },
        { rgn: 'R',
            pcolor: el.proof,
            letterAngle : -45,
            letterRotRadius : 20,
            cssClass: 'logic_phase--proof ' +
                      'logic_phase--corollary',
        },
        { rgn: 'Y',
            pcolor: el.proof,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //speed of the body
        { rgn: 'vb',
            caption : '',
            pcolor: el.proof,
            letterAngle : 135,
            letterRotRadius : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'omegaHandle',
            caption : 'ω',
            pcolor: el.shadow,
            letterAngle : 90,
            letterRotRadius : 17,
            undisplayAlways : true,
            doPaintPname : false,
            fontSize : 20,
        },
        { rgn: 'f',
            caption : '𝛾',
            pcolor: el.force,
            letterAngle : 90,
            letterRotRadius : 17,
            //draggableX: fconf.sappId !== 'b1sec3prop12',
            //draggableY: fconf.sappId !== 'b1sec3prop12',
            fontSize : 20,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'Z',
            pcolor: el.body,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
            cssClass: 'subessay--solution',
        },
        { rgn: 'Zminus',
            caption : 'Z',
            pcolor: el.body,
            letterAngle : 145,
            letterRotRadius : 20,
            doPaintPname : false,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'v',
            caption : '𝑣',
            pcolor: el.proof,
            letterAngle : -45,
            letterRotRadius : 15,
            cssClass: 'subessay--solution',
        },
        //F is possibly a tip of diameter
        //conjugate to Center-Body diameter
        { rgn: 'F',
            pcolor: el.proof,
            letterRotRadius : 20,
            letterAngle : 135,
            cssClass: 'subessay--solution',
        },
        { rgn: 'VV',
            caption : 'V',
            pcolor: el.proof,
            letterAngle : -45,
            undisplayAlways : true,
            doPaintPname : false,
        },

        //center symmetry of orbit
        { rgn: 'C',
            pcolor: el.borbit,
            letterAngle : -45,
            cssClass: 'logic_phase--proof',
        },

        //----------------------------------------
        // //\\ Prop. 10 Book's "another solution"
        //----------------------------------------
        { rgn: 'u',
            caption : '𝑢',
            pcolor: el.proof,
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
        { rgn: 'x',
            caption : "𝑥",
            pcolor: el.proof,
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
        { rgn: 'S',
            pcolor: el.result,
            letterAngle : -115,
            letterRotRadius : 20,
        },
        { rgn: 'P',
            pcolor: el.body,
            letterAngle : 120,
            draggableX  : true,
            draggableY  : true,
        },
        { rgn: 'Fi',
            caption : "φ",
            pcolor: el.shadow, //body,
            letterAngle : 120,
            undisplayAlways : true,
            doPaintPname : false,
        },

        { rgn: 'Q',
        pcolor: el.proof,
            letterAngle : 225,
            letterRotRadius : 20,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'logic_phase--proof subessay--corollary2',
        },

        // //\\ eccentricity slider
        { rgn: 'Zeta',
            caption : 'eccentricity, e',
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.92 ],
            pcolor: el.borbit,
            letterAngle : 90,
            letterRotRadius : 20,
            draggableX  : false,
            undisplayAlways  : true,
            doPaintPname : false,
            unscalable  : true,
            cssClass: 'subessay--none',
        },

        { rgn: 'ZetaCaption',
            pos : [ sf.medWidth * 0.5, sf.medHeight * 0.97 ],
            pcolor: el.borbit,
            undisplayAlways : true,
            letterAngle : 90,
            letterRotRadius : 20,
            doPaintPname : false,
            unscalable  : true,
            cssClass: 'subessay--none',
        },

        { rgn: 'ZetaStart',
            pos : [ sf.medWidth * 0.1, sf.medHeight * 0.92 ],
            pcolor: el.borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
            undisplayAlways : true,
            doPaintPname : false,
        },

        { rgn: 'ZetaEnd',
            pos : [ sf.medWidth * 0.9, sf.medHeight * 0.92 ],
            pcolor: el.borbit,
            undisplayAlways : true,
            doPaintPname : false,
            unscalable  : true,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //---------------------------------------
        // \\// eccentricity slider
        // \\// draggable points
        //---------------------------------------
    ]);
    //*************************************
    // \\// original app points
    //*************************************
}}
