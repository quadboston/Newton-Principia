{const{
    sn, apush, arrover, mat, eachprop, nspaste, tprepo, tpelect,
    sf, rg, ssF, gshapes,
}=window.b$l.atree();
const op = sn( 'orbitParameters', sf );
const tr = tprepo;
const el = tpelect;

//todo lost area colors in sample orbit
ssF.init_conf=function(){
    //----------------------------------
    // //\\ study model parameters
    //----------------------------------
    //sets cinematics
    op.Kepler_v_initial   = 0.1536;
    op.Kepler_v           = op.Kepler_v_initial;
    op.angleOmega         = 2.255644;  //Math.PI - Math.asin( omega );
    op.angleOmega_initial = op.angleOmega;
    //----------------------------------
    // \\// study model parameters
    //----------------------------------

    //----------------------------------
    // //\\ paper diagram parameters
    //----------------------------------
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    var C = [ 376, 587 ];
    var V = [C[0], 100];
    var A = [C[0], 39];
    var B = [464,  A[1]];
    var forceStart = [ B[0]*1.03, -100 ];
    var D = [C[0], 270];
    var E = [C[0], 304];
    var R = [41, 234];
    var k = [246, 491];

    sf.medWidth = 912;
    sf.medHeight = 603;
    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = C[1] - V[1];
    sf.medposOfModOrigin_x = C[0];
    sf.medposOfModOrigin_y = C[1];
    sf.diagramOrigin = [ 0, 0 ];

    sf.Fi_distance = 1.8;
    sf.dRo = 0.075; //dr - infinitesimal interval

    //decorations
    sf.angleOfR = Math.PI * 0.245;
    //----------------------------------
    // \\// paper diagram parameters
    //----------------------------------

    //*********************************************
    // //\\ decorational parameters
    //*********************************************
    sf.mediaBgImage = "diagram.jpg";
    //making size to better fit lemma's diagram
    sf.LETTER_FONT_SIZE_PER_1000 = 20;

    sf.default_tp_lightness = 30;
    //todo ?
    //sf.TP_OPACITY_FROM_fixed_colors = true;
    sf.TP_OPACITY_LOW = 0.3;
    sf.TP_OPACITY_HIGH = 1;
    sf.TP_OPACITY_FROM_fixed_colors = false;
    // \\// decorational parameters
    //*********************************************

    //*************************************
    // //\\ elected colors,
    //*************************************
    nspaste( el, {
        given:      tr.given,
        body:       tr.body,
        borbit:     tr.borbit,
        time:       tr.time,
        distance:   tr.distance,
        proof:      tr.proof,
        force:      tr.force,
        invalid:    tr.invalid,
        result:     tr.result,
        shadow:     tr.shadow,
        angleArea:  tr.angleArea,
        angle:      tr.angle,
        hidden:     tr.hidden,
        fi:         tr.angle,
        Tkernel:    tr.time,
        fiArea:     tr.angleArea,
        ro:         tr.distance,
        Zgraph:     arrover( tr.body, [,,, 0.01, 1] ),
        Z2graph:    arrover( tr.body, [,,, 0.4, 1 ] ),
        vgraph:     arrover( tr.force, [,,, 0.1, 1 ] ),
        v2graph:    arrover( tr.force, [,,, 0.6, 1 ] ),
        VSarea:     arrover( tr.force, [,,, 0.3, 0.7 ] ),
        Tarea:      arrover( tr.time, [,,, 0.01, 0.7 ] ),
        Fkernel:    [0,  0,  150,   0.5, 1 ],
    });
    nspaste( el, {
        vback: el.vgraph,
        //todm: last two pars have no effect
        vgpoint: [0,  140, 0, 0.01, 1],

        NK: el.Fkernel,
        ECircle: el.Fkernel,
        DCircle: el.Fkernel,
        MainCircle: el.Fkernel,
        YX: el.Fkernel,
        IK: el.body,
        XCY: [0,  0,    150, 0.03,  0.5 ],
        'D𝑐𝑥E': [0,  0,  150,   0.01, 0.3],
        'D𝑏𝑧E': [110, 90,  0,   0.01, 0.3],
        VIC: [110, 90, 0, 0.001, 0.5 ],
        //needs color model working:
        ICK: [110, 90, 0, 0.001, 0.5 ], //good but hidden
        //visible, but initially annoying,
        //ICK: [110, 90, 0, 0.1, 1 ],
    });
    //*************************************
    // \\// elected colors,
    //*************************************
    ssF.init_conf_shapes({ forceStart, B, V });
    ssF.init_conf_lines();
    ssF.init_conf_points({ V, A, D, E, R, k });
}}