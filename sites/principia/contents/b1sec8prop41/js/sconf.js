(function(){
const {
        sn, mat, eachprop, nspaste, userOptions, tprepo, tpelect,
        CONST, fconf, sconf, rg, stdMod, ssD, gshapes,
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
const op = sn( 'orbitParameters', sconf );
const sf = sconf;
const fc = tprepo;
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
return;


function init_conf (){
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
    sf.medWidth = 912;
    sf.medHeight = 603;
    var C = [ 376, 587 ];
    sconf.Fi_distance = 1.8;
    sconf.dRo = 0.075; //dr - infinitesimal interval

    var V = [C[0], 100];

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = C[1] - V[1];

    var A = [C[0], 39];
    var B = [464,  A[1]];
    var forceStart = [ B[0]*1.03, -100 ];
    var D = [C[0], 270];
    var E = [C[0], 304];
    var R = [41, 234];
    var k = [246, 491];

    //decorations
    sconf.angleOfR = Math.PI * 0.245;
    //----------------------------------
    // \\// paper diagram parameters
    //----------------------------------

    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************
    sf.mediaBgImage = "diagram.jpg";
    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;

    //--------------------------------------
    // //\\ does override engine defaults,
    //      in expands-conf.js,
    //--------------------------------------
    sconf.default_tp_lightness = 30;
    sconf.TP_OPACITY_FROM_fixed_colors = true;
    TP_OPACITY_LOW = 0.3;
    TP_OPACITY_HIGH = 1;
    TP_OPACITY_FROM_fixed_colors = false;
    // \\// does override engine defaults,
    // \\// decorational parameters
    //***************************************************************

    //=============================================
    // //\\ points reused in config
    //=============================================
    sconf.diagramOrigin = [ 0, 0 ];
    sf.medposOfModOrigin_x = C[0]; //for model's axis x
    sf.medposOfModOrigin_y = C[1]; //for model's axis y
    //=============================================
    // \\// points reused in config
    //=============================================

    //-----------------------------------
    // //\\ topic group colors,
    //-----------------------------------
    const {
        given,
        body,
        borbit,
        time,
        distance,
        proof,
        force,
        invalid,
        result,
        shadow,
        angleArea,
        angle,
        hidden,
    } = tprepo;

    //special or derivative parameters
    const fi      = [...fc.angle];
    const fiArea  = [...fc.angleArea];
    var Fkernel   = [0,  0,  150,   0.5, 1 ];

    var Zgraph    = [...fc.body];
    Zgraph[3]     = 0.01;
    Zgraph[4]     = 1;
    var Z2graph   = [...fc.body];
    Z2graph[3]    = 0.4;
    Z2graph[4]    = 1;

    var ro        = distance;

    var vgraph    = force;
    vgraph[3]      = 0.1;
    vgraph[4]      = 1;

    //var v2graph   = [0,  140, 0, 0.4];
    var v2graph   = force; //[0,  140, 0, 0.6, 1];
    v2graph[3]     = 0.6;
    v2graph[4]     = 1;
    //var VSarea    = [0,  140, 0, 0.2, 0.4];
    var VSarea    = force; //[0,  140, 0, 0.4, 0.7];
    VSarea[3]     = 0.3;
    VSarea[4]     = 0.7;
    var Tkernel   = time;
    var Tarea     = time;
    Tarea[3]      = 0.01;
    Tarea[4]      = 0.7;

    nspaste( tpelect, { //need deep copy
        given,
        proof,
        result,
        hidden,
        body,
        borbit,
        shadow,
        force,
        fi,
        Zgraph,
        Z2graph,
        vgraph,
        v2graph,
        vback : vgraph,
        //todm: last two pars have no effect
        vgpoint : [0,  140, 0, 0.01, 1],
        Fkernel,
        Tkernel,
        Tarea,
        fiArea,
        VSarea,

        'NK' : Fkernel,
        'ECircle' : Fkernel,
        'DCircle' : Fkernel,
        'MainCircle' : [0,  0,  150,   0.5, 1 ], //Fkernel,
        'YX' : Fkernel,

        XCY : [0,  0,    150, 0.03,  0.5 ],
        IK : body,
        'D𝑐𝑥E' : [0,  0,  150,   0.01, 0.3],
        'D𝑏𝑧E' : [110, 90,  0,   0.01, 0.3],
        VIC : [110, 90, 0, 0.001, 0.5 ],

        //needs color model working:
        ICK : [110, 90, 0, 0.001, 0.5 ], //good but hidden
        //ICK : [110, 90, 0, 0.1, 1 ], //visible, but initially annoying,
    });
    //-----------------------------------
    // \\// topic group colors,
    //-----------------------------------

    //*************************************
    // //\\ shapes
    //*************************************
    gshapes.splice( gshapes.length, 0,
    {
        kind: ANGLE,
        rgn: 'rays-angle-fi', //todm automate this name:
        vertex_id: 'fi',
        vertexTwin_rgn: 'C',
        ABString: 'CV',
        CDString: 'CX',
        pcolor: [0,0,0,0.05],
        cssClass: 'tofill',
        ANGLE_SIZE_eval: '2*rg.V.pos[1]',
        angleCaption: 'φ',
        captionRadiusIncrease: 1.02,
    },
    {
        rgn: 'rays-angle-XCY', //todm automate this name:
        vertex_id: 'XCY',
        vertexTwin_rgn: 'C',
        ABString: 'CX',
        CDString: 'CY',
        pcolor: [0,0,0,0.05],
        cssClass: 'tofill',
        ANGLE_SIZE_eval: '2*rg.V.pos[1]',
        angleCaption: '',
    },
    {
        kind: CURVE,
        rgn: 'force',
        cpivots: [
            forceStart,
            B,
            [467,69],
            [484,147],
            [516, 245],

            [579, 347],

            [657,412],
        ].map( (pivot,ix) => ({
            pos         : pivot,
            pcolor      : force,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
        })),
        initShapes: (gshape, rgn)=>{
            rg[rgn].gshape2svg = ()=>{
                stdMod.pivotsDivDif_2_curve8svg({ rgn });
            };
            rg[rgn].cpivots_initial = nspaste( {},
                rg[rgn].cpivots );
            //this sub is half-standardized: it is not in
            //src/base, but
            //apparently similar to what is in many lemmas,
            stdMod.completesSlidersCreation(); //in-diagram sliders

            let omega = Math.sin( op.angleOmega );
            let vv = [
                //"-" bs x and y swapped in media-model
                -op.Kepler_v * omega,
                op.Kepler_v * Math.cos( op.angleOmega )
            ];
            //initial speed
            nspaste( rg.v.pos, mat.sm( rg.V.pos, vv ) );
            //nspaste( rg.Vangle.pos, mat.sm( 1, rg.V.pos, 2, vv ) );
        }
    });
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    gshapes.splice( gshapes.length, 0,
    {
        kind: LINE,
        rgn: 'V,v',
        pcolor : body,
        vectorTipIx : 1,
    },
    {
        rgn: 'VM',
        pcolor: body, //[100,  0, 20, 0.01, 1],
        vectorTipIx: 1,
    },
    {
        rgn: 'IZ',
        pcolor: Zgraph, //[100,  0, 20, 0.01,  1],
        vectorTipIx: 1
    },
    /*
    {
        rgn: 'V,Vangle',
        pcolor: body,
    },
    */
    {
        rgn: 'CV',
        pcolor: ro,
    },
    {
        rgn: 'Dc',
        pcolor: Fkernel,
    },
    {
        rgn: 'Db',
        pcolor: Tkernel,
    },
    {
        rgn: 'Ex',
        pcolor : Fkernel,
    },
    {
        rgn: 'Ez',
        pcolor: Tkernel,
    },
    {
        rgn: 'Va',
        pcolor: Fkernel,
    },
    {
        rgn: 'VA',
        pcolor: shadow,
    },
    {
        rgn: 'AB',
        pcolor: shadow,
    },
    {
        rgn: 'CA',
        pcolor: ro,
    },
    {
        rgn: 'CX',
        pcolor: [50,  50,  50,    1] //shadow,
    },
    {
        rgn: 'CY',
        pcolor: shadow,
    },
    {
        rgn: 'CI',
        pcolor: ro,
        vectorTipIx: 1
    },
    {
        rgn: 'IN',
        pcolor: ro,
    },
    {
        rgn: 'CD',
        pcolor: ro,
    },
    {
        rgn: 'DF',
        pcolor: force,
    });
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    gshapes.push.apply( gshapes, [
    {
        kind: POINT,
        rgn: 'nonSolvablePoint',
        pos: [666,444], //will be calculated
        caption : 'Force is out of considered range.',
        fontSize : '20',
        pcolor : invalid,
        letterAngle : 90,
    },
    {
        rgn: 'C',
        pcolor : ro,
        letterAngle : -90,
    },
    //-------------------------
    // //\\ given
    //-------------------------
    {
        rgn: 'V',
        pos : V,
        pcolor : ro,
        letterAngle : 140,
        letterRotRadius : 20,
    },

    // //\\ speed
    {
        rgn: 'v',
        caption: 'v',
        pcolor: body,
        letterAngle : 120,
        draggableX: true,
        draggableY : true,
    },
    {
        rgn: 'M',
        pos: V, //sets model's pos[0]
        caption: '',
        pcolor: body,
    },
    /*
    {
        //todm do we need this? in addendum?
        rgn: 'Vangle',
        caption: 'ω',
        pcolor: body,
        letterAngle: 120,
        //draggableX: true,
        //draggableY: true,
        undisplayAlways : true,
        doPaintPname : false,
    },
    */
    //-------------------------
    // \\// speed
    // \\// given
    //-------------------------
    {
        rgn: 'A',
        caption: 'Drop point, A',
        pos: A,
        pcolor: ro,
        letterAngle: 180,
        letterShift: [-120,-5],
    },
    {
        rgn: 'vgpoint',
        caption: 'v',
        pos: A,
        //no effect: pcolor : tpelect.vgpoint,
        letterAngle: 45,
    },
    {
        rgn: 'Zgpoint',
        caption: 'Z',
        pos: A,
        //pcolor : Zgraph,
        letterAngle: 45,
    },
    {
        rgn: 'Z',
        caption: '',
        pcolor: body,
    },
    {   rgn: 'B',
        caption: 'B',
        pcolor: force,
        letterAngle: -45,
    },
    {
        rgn: 'F',
        caption: 'F, ~dv²/dρ',
        pcolor: force,
        letterAngle: -45,
        cssClass : 'tostroke',
    },
    {
        rgn: 'D',
        pos: D,
        pcolor: ro,
        letterAngle: 45,
        draggableY: true,
    },
    {
        rgn: 'E',
        pos: E,
        pcolor: ro,
        letterAngle: 45,
    },
    {
        rgn: 'N',
        pcolor: shadow,
        letterAngle: 150,
    },
    {
        rgn: 'I',
        pcolor: body,
        letterAngle: 150,
    },
    {
        rgn: 'K',
        pcolor: body,
        letterAngle: 150,
    },
    {
        rgn: 'X',
        pcolor: shadow,
        letterAngle: 120,
    },
    {
        rgn: 'Y',
        pcolor: shadow,
        letterAngle: 120,
    },
    {
        rgn: 'R',
        pos: R,
        pcolor: shadow,
        letterAngle: 180,
        cssClass: 'aspect-not-addendum',
    },
    {
        rgn: 'a',
        caption: '𝑎',
        pcolor: Fkernel,
        letterAngle: 120,
    },
    {
        rgn: 'b',
        caption: '𝑏, ~dt/dρ',
        pcolor: Tkernel,
        letterAngle: 120,
    },
    {
        rgn: 'c',
        caption: '𝑐, ~dφ/dρ',
        pcolor: Fkernel,
        letterAngle : 120,
    },
    {
        rgn: 'k',
        caption: '𝑘',
        pos: k,
        pcolor: body,
        letterAngle: 120,
    },
    {
        rgn: 'x',
        caption: '𝑥',
        pcolor: Fkernel,
        letterAngle: 120,
    },
    {
        rgn: 'z',
        caption: '𝑧',
        pcolor: Tkernel,
        letterAngle: 120,
    },
    ].map( pt=>{
        pt.letterRotRadius = 20;
        switch (pt.rgn){
            case 'c':
            case 'x':
            pt.letterAngle = 45;
        }
        return pt;
    }));
    //*************************************
    // \\// points
    //*************************************
}
})();