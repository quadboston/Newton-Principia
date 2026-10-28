{
const { nspaste, fconf, sf, tpelect, CONST,
        apush, gshapes, eachprop, mat, fapp, sconf,
      } = window.b$l.atree({ ssFList: { init_conf }});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;

function init_conf(){
    sf.medWidth = 1856;
    sf.medHeight = 1700;
    var orx = sf.medposOfModOrigin_x = 853;
    var ory = sf.medposOfModOrigin_y = 978;
    sf.innerMediaWidth = sf.medWidth;
    sf.innerMediaHeight = sf.medHeight +
        sconf.SLIDERS_LEGEND_HEIGHT;
    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************
    //do not change total dimension of svgdom and the picture,
    //to comply standard layout, one must add these 2 lines:
    var medsize = ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sconf.medsize_standard
    //sconf.medsize_standard = 250;

    sconf.LETTER_FONT_SIZE_PER_1000 = 25; //works

    //--------------------------------------
    // //\\ does override engine defaults,
    //      in expands-c onf.js,
    //--------------------------------------
    sf.thickness = 1;
    sconf.default_tp_lightness = 30;
    //default_tp_stroke_opacity : 0.5, //already
    sf.default_tp_stroke_width = Math.floor( 6 * medsizeScale );
    sf.defaultLineWidth = Math.floor( 1 * medsizeScale );
    sf.handleRadius = Math.floor( 6 * medsizeScale );
    //overrides "global", lemma.c onf.js::sc onf
    sconf.pointDecoration.r = sf.handleRadius;

    // //\\ principal tp-css pars
    //      see: topics-media-glocss.js
    //this makes hanle's border nicely thin
    sf.nonhover_width = Math.max( 1,
        Math.floor( 1*medsizeScale/1.6 ) );
    sf.hover_width = Math.max( 2,
        Math.floor( 7*medsizeScale/1.6 ) );
    //make effect apparently only for line-captions,
    //not for point-captions bs
    //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
    sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
    sconf.text_hover_width      = 1.5;
    // \\// principal tp-css pars
    // \\// does override engine defaults,
   //todo not automated, prolifer.
    fapp.normalizeSliders( sf.medHeight / 500 );
    // \\// decorational parameters
    //***************************************************************

    Object.assign( el, {
        "static"                : [0,     200, 255, 1],
        //with half opacity
        "static-half"           : [0,     200, 255, 0.5],
        "core"                  : [255,   0, 0, 1],
        "core-half"             : [255,   0, 0, 0.5],
        "aux"                   : [255,   0, 255, 1],
        "constructors"          : [0,     0, 255, 1],
        "ellipse"               : [0,   150, 0, 1],
    });
    el[ "gamma" ] = el[ "core" ];
    el[ "g-parameter" ] = el[ "core" ];
    el[ "angle-alpha" ] = el[ "static-half" ];
    el[ "angle-beta" ] = el[ "static-half" ];
    el[ "angle-alpha-core" ] = el[ "core-half" ];
    el[ "angle-beta-core" ] = el[ "core-half" ];
    var pointsOnPicture = {
        C : [50, ory], //550],
        B : [838, ory], //552],
        M : [391-384+orx,634],
        //:apparently inactive static points
        N : [380-384+orx,
            476-553+ory],
        T : [411-384+orx,
            219-553+ory],
        P : [548-384+orx, 77-553+ory],
        R : [734-384+orx, 346-553+ory],
        O : [orx, ory],
        H : [orx, ory],
        A : [568, 244],
    };
    ///bigger diagram
    //eachprop( pointsOnPicture, v => {
    //    v[0] -= 300;
    //    v[1] -= 246;
    //});
    {
        ////derives initial model parameters from picture's points
        const pp = pointsOnPicture;
        const B = pp.B;
        const C = pp.C;
        const O = pp.O;
        const M = pp.M;
        const N = pp.N;
        const A = pp.A;
        sf.mod2med = mat.unitVector(
            [ B[0] - C[0], B[1] - C[1] ]).abs;
        //todm proliferation in each lemma:
        sf.med2mod = 1/sf.mod2med;
        //const wwb = ( B[0] - O[0] ) / ( B[0] - C[0] ); //0.6
        //a = 1 - wwb;
        var a = 0.435;
        //---sets initial param g
        //possibly initial_g = initial_Munit.abs/mod2med;
        var initial_g = 0.105;
        //is an absolute value of an angle:
        var gamma = Math.acos(
            mat.unitVector(
                [ M[0] - O[0], M[1] - O[1] ] //OM
            ).unitVec[0] );
        gamma *= 1.01;
        //---sets initial decorational param gN
        sf.initial_gN =
             -mat.unitVector([ N[0] - O[0], N[1] - O[1] ]).abs
             /sf.mod2med;
        //var BAA = mat.p1_to_p2( B, A );
        //beta = -Math.asin( BAA.unitVec[1] );
        var beta = 0.863;
        //c cc( 'beta fraction=' + (beta/Math.PI).toFixed(3) );
        //var CAA = mat.p1_to_p2( C, A );
        //alpha = -Math.asin( CAA.unitVec[1] );
        var alpha = 0.528;
        sf.a = a;
        sf.alpha = alpha;
        sf.beta = beta;
        sf.gamma = gamma;
        sf.initial_g = initial_g;
    }

    //*************************************
    // //\\ shapes
    //*************************************
    sf.gshapes = [
        {
            isAngle: true,
            vertex_id : 'vertex-alpha',
            rgn : 'alpha',
            angleCaption: '',
            cssClass: 'tofill',
            tpClassName: 'angle-alpha',
            vertexTwin_rgn: 'C',
            ABString: 'CB',
            CDString: 'CA',
            ANGLE_SIZE: 0.3,
        },
        {
            isAngle: true,
            vertex_id : 'vertex-beta',
            rgn : 'beta',
            angleCaption: '',
            cssClass: 'tofill',
            tpClassName: 'angle-beta',
            vertexTwin_rgn: 'B',
            ABString: 'BA',
            CDString: 'BC',
            ANGLE_SIZE: 0.3,
        },
        {
            //todo black angles
            isAngle: true,
            vertex_id : 'vertex-angle-alpha-core',
            //todm why not to name MCD?
            rgn : 'angle-alpha-core',

            //pcolor: el[ "core" ],
            angleCaption: '',
            cssClass: 'tofill',
            vertexTwin_rgn: 'C',
            ABString: 'CM',
            CDString: 'CD',
            ANGLE_SIZE: 0.3,
        },
        {
            isAngle: true,
            vertex_id : 'vertex-angle-beta-core',
            //todm why not to name MCD?
            rgn : 'angle-beta-core',

            //pcolor: el[ "core" ],
            angleCaption: '',
            cssClass: 'tofill',
            vertexTwin_rgn: 'B',
            ABString: 'BD',
            CDString: 'BM',
            ANGLE_SIZE: 0.3,
        },
    ];
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
        //-------------------------
        // //\\ static
        //-------------------------
        {
            //'AABAangleA
            kind: LINE,
            rgn: 'AB',
            pcolor : el.static,
            cssClass : 'tp-angle-beta',
        },
        //-------------------------------------------------
        // \\// given static angles alpha, beta
        //-------------------------------------------------
        {
            rgn: 'BA',
                pcolor : el.static,
        },
        {
            //'AABAangleAA'
            rgn: 'CB',
                pcolor : el.static,
                cssClass : 'tp-angle-beta',
        },
        //-------------------------------------------------
        // \\// given static angles alpha, beta
        //-------------------------------------------------

        //-----------------------------------------------
        // //\\ decorates draggers
        //-----------------------------------------------
        {
            rgn: 'MB',
                pcolor : el[ "core" ],
                cssClass : 'tp-constructors',
        },
        {
            rgn: 'BM',
                cssClass : 'addendum--none',
        },
        {
            rgn: 'MC',
                pcolor : el[ "core" ],
                cssClass : 'tp-constructors',
        },
        //-----------------------------------------------
        // \\// decorates draggers
        //-----------------------------------------------

        //-------------------------------------------------
        // //\\ base sides
        //-------------------------------------------------
        {
            rgn: 'BH',
                pcolor : el.static,
        },
        {
            rgn: 'MH',
                cssClass: 'subessay--direct-proof',
                pcolor : el[ "core" ],
        },
        {
            rgn: 'MN',
                pcolor : el[ "core" ],
        },

        {
            rgn: 'nN',
                pcolor : el.core,
                cssClass: 'subessay--converse-proof',
        },
        {
            rgn: 'Cn',
                pcolor : el.aux,
                cssClass: 'subessay--converse-proof',
        },

        {
            rgn: 'Bn',
                pcolor : el.aux,
                cssClass: 'subessay--converse-proof',
        },
        {
            rgn: 'Cp',
                pcolor : el.aux,
                cssClass: 'subessay--converse-proof',
        },
        {
            rgn: 'Bp',
                pcolor : el.aux,
                cssClass: 'subessay--converse-proof',
        },

        {
            rgn: 'BC',
                pcolor : el.static,
                cssClass:'tp-angle-alpha tp-angle-beta',
        },
        {
            rgn: 'BN',
                pcolor : el.static,
        },
        {
            rgn: 'CN',
                pcolor : el.static,
        },
        {
            rgn: 'BD',
                pcolor : el[ "constructors" ],
        },
        {
            rgn: 'CR',
                cssClass: 'subessay--direct-proof',
                pcolor: el[ "constructors" ],
        },
        {
            rgn: 'BT',
                    cssClass: 'subessay--direct-proof',
                    pcolor: el[ "constructors" ],
        },
        {
            rgn: 'CD',
                pcolor : el[ "constructors" ],
        },
        {
            rgn: 'PT',
                cssClass: 'subessay--direct-proof',
                pcolor : el[ "core" ],
        },
        {
            rgn: 'PR',
                cssClass: 'subessay--direct-proof',
                pcolor : el[ "core" ],
        },
        {
            rgn: 'PC',
                cssClass: 'logic_phase--proof',
                pcolor : el[ "static" ],
        },
        {
            rgn: 'PB',
                cssClass: 'logic_phase--proof',
                pcolor : el[ "static" ],
        },
        //-------------------------------------------------
        // \\// base sides
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ given static angles alpha, beta
        //-------------------------------------------------
        //'AAABangleA',
        {
            rgn: 'AC', //line AC
            pcolor : el[ "static" ],
            cssClass:'tp-angle-alpha',
        },
        //AAABangleB
        {
            rgn: 'AB',
            pcolor : el[ "static" ],
            cssClass:'tp-angle-beta',
        },
        //-------------------------------------------------
        // \\// given static angles alpha, beta
        //-------------------------------------------------
    ]);
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    const initialR = sf.handleRadius;
    const pop = pointsOnPicture;
    apush( gshapes, [
    {   kind: POINT,
        rgn: 'C',
        pos: [0,0], //fake pos
        pcolor: el.static,
        cssClass: 'tp-static tp-_C',
        initialR,
        letterAngle : -90,
        letterRotRadius : 20,
    },
    {   rgn: 'B',
                pos: pop.B,
                pcolor: el.static,
                cssClass: 'tp-static',
                initialR,
                letterAngle : -90,
                letterRotRadius : 20,
        },
        {   rgn: 'D',
                pcolor: el[ "constructors" ],
                //cssClass: 'tp-g-parameter',
                initialR,
                letterAngle : 180,
                letterRotRadius : 20,
        },
        {   rgn: 'O',
                pos: pop.O,
                //pcolor: el[ "g-parameter" ],
                //cssClass: 'tp-static',
                //cssClass : 'logic_phase--proof',
                cssClass: 'aspect--model',
                initialR,
                letterAngle : 0,
                letterRotRadius : 20,
                doPaintPname:false,
        },
        {   rgn: 'P',
                cssClass: 'logic_phase--proof',
                pcolor: el.static,
                initialR,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        {   rgn: 'N',
                pos: pop.N,
                pcolor: el.static,
                initialR,
                letterAngle : -45,
                letterRotRadius : 20,
        },
        {   rgn: 'n',
                cssClass: 'subessay--converse-proof',
                pcolor: el.core,
                initialR,
                letterAngle : -45,
                letterRotRadius : 20,
        },
        {   rgn: 'p',
                cssClass: 'subessay--converse-proof',
                pcolor: el.constructors,
                initialR,
                letterAngle : 180,
                letterRotRadius : 20,
        },
        {   rgn: 'T',
                cssClass: 'subessay--direct-proof',
                pos: pop.T,
                pcolor: el.core,
                initialR,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        {   rgn: 'R',
                cssClass: 'subessay--direct-proof',
                pos: pop.R,
                pcolor: el.core,
                initialR,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        //============================================
        // //\\ sliders
        //============================================
        {   rgn: 'A',
                draggableX : true,
                draggableY : true,
                pos: pop.A,
                pcolor: el.static,
                style: {fill: '#ffffff'},
                cssClass: 'tp-static',
                initialR,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        {   rgn: 'H',
                draggableX : true,
                pos: pop.H,
                //pcolor: el[ "g-parameter" ],
                pcolor: el.static,
                style: {fill: '#ffffff'},
                cssClass: 'tp-static',
                initialR,
                letterAngle : 45,
                letterRotRadius : 20,
                doPaintPname:false,
        },
        {   rgn: 'M',
                draggableY : true,
                pcolor: el.core,
                style: {fill: '#ffffff'},
                cssClass: 'tp-static',
                initialR,
                letterAngle : 225,
                letterRotRadius : 25,
        },
        //============================================
        // \\// sliders
        //============================================
    ]);
    //*************************************
    // \\// points
    //*************************************
}
}