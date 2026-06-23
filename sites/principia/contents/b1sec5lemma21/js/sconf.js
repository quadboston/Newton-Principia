(function(){
const { nspaste, fconf, sf, tpelect, originalPoints,
        eachprop, mat, fapp, sconf,
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
return;


function init_conf(){
    //====================================================
    // //\\ subapp regim switches
    //====================================================
    sconf.hideProofSlider           = true; //todo
    //====================================================
    // \\// subapp regim switches
    //====================================================

    var medWidth = 1856;
    var medHeight = 1700;
    //var medWidth = 1251; //bigger diagram
    //var medHeight = 1074; //bigger diagram

    var medposOfModOrigin_x = 853;
    var medposOfModOrigin_y = 978;
    //var medposOfModOrigin_x = 853 - 300;
    //var medposOfModOrigin_y = 978 - 246;

    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************

    //do not change total dimension of svgdom and the picture,
    //to comply standard layout, one must add these 2 lines:
    var medsize = ( medWidth + medHeight ) / 2;
    var medsizeScale = medsize / sconf.medsize_standard
    //sconf.medsize_standard = 250;

    sconf.LETTER_FONT_SIZE_PER_1000 = 25; //works

    //--------------------------------------
    // //\\ does override engine defaults,
    //      in expands-conf.js,
    //--------------------------------------
    sconf.default_tp_lightness = 30;
    default_tp_stroke_width = Math.floor( 6 * medsizeScale ),
    defaultLineWidth        = Math.floor( 1 * medsizeScale ),
    handleRadius            = Math.floor( 6 * medsizeScale ),
    //overrides "global", lemma.conf.js::sconf
    sconf.pointDecoration.r = handleRadius;

    // //\\ principal tp-css pars
    //      see: topics-media-glocss.js
    //this makes hanle's border nicely thin
    sconf.nonhover_width    = Math.max( 1, Math.floor( 1*medsizeScale/1.6 ) );
    sconf.hover_width       = Math.max( 2, Math.floor( 7*medsizeScale/1.6 ) );

    //make effect apparently only for line-captions,
    //not for point-captions bs
    //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
    sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
    sconf.text_hover_width      = 1.5;
    // \\// principal tp-css pars
    // \\// does override engine defaults,
    // \\// decorational parameters
    //***************************************************************

    nspaste( tpelect, { //need deep copy
        "static"                : [0,     200, 255, 1],

        //with half opacity
        "static-half"           : [0,     200, 255, 0.5],

        "core"                  : [255,   0, 0, 1],
        "core-half"             : [255,   0, 0, 0.5],

        "aux"                   : [255,   0, 255, 1],
        "constructors"          : [0,     0, 255, 1],
        "ellipse"               : [0,   150, 0, 1],
    });
    let pt = tpelect;
    pt[ "gamma" ] = pt[ "core" ];
    pt[ "g-parameter" ] = pt[ "core" ];
    pt[ "angle-alpha" ] = pt[ "static-half" ];
    pt[ "angle-beta" ] = pt[ "static-half" ];
    pt[ "angle-alpha-core" ] = pt[ "core-half" ];
    pt[ "angle-beta-core" ] = pt[ "core-half" ];

    var pointsOnPicture =
    {
        C : [50, medposOfModOrigin_y], //550],
        B : [838, medposOfModOrigin_y], //552],
        M : [391-384+medposOfModOrigin_x,634],

        //:apparently inactive static points
        N : [380-384+medposOfModOrigin_x, 476-553+medposOfModOrigin_y],
        T : [411-384+medposOfModOrigin_x, 219-553+medposOfModOrigin_y],
        P : [548-384+medposOfModOrigin_x, 77-553+medposOfModOrigin_y],
        R : [734-384+medposOfModOrigin_x, 346-553+medposOfModOrigin_y],

        O : [medposOfModOrigin_x, medposOfModOrigin_y],
        H : [medposOfModOrigin_x, medposOfModOrigin_y],
        A : [568, 244],
    };

    ///bigger diagram
    //eachprop( pointsOnPicture, v => {
    //    v[0] -= 300;
    //    v[1] -= 246;
    //});

    var gamma; // = Math.PI*0.49;
    var a;
    var beta;
    var alpha;

    var initial_g;

    ///derives initial model parameters from picture's points
    var to_sconf = {};
    var mod2med;
    (function() {
        var pp = pointsOnPicture;
        var B = pp.B;
        var C = pp.C;
        var O = pp.O;
        var M = pp.M;
        var N = pp.N;
        var A = pp.A;
        var BC = [ B[0] - C[0], B[1] - C[1] ];
        mod2med = mat.unitVector(BC).abs;
        var wwb = ( B[0] - O[0] ) / ( B[0] - C[0] ); //0.6
        //a = 1 - wwb;
        a = 0.435;

        //---sets initial param g
        var OM = [ M[0] - O[0], M[1] - O[1] ];
        initial_Munit = mat.unitVector(OM);
        //possibly initial_g = initial_Munit.abs/mod2med;
        initial_g = 0.105;
        //is an absolute value of an angle:
        gamma = Math.acos( initial_Munit.unitVec[0] );
        gamma *= 1.01;

        //---sets initial decorational param gN
        var ON = [ N[0] - O[0], N[1] - O[1] ];
        initial_Nunit = mat.unitVector(ON);

        //var BAA = mat.p1_to_p2( B, A );
        //beta = -Math.asin( BAA.unitVec[1] );
        beta = 0.863;

        //c cc( 'beta fraction=' + (beta/Math.PI).toFixed(3) );
        //var CAA = mat.p1_to_p2( C, A );
        //alpha = -Math.asin( CAA.unitVec[1] );
        alpha = 0.528;

        to_sconf.a = a;
        to_sconf.alpha = alpha;
        to_sconf.beta = beta;
        to_sconf.gamma = gamma;
        to_sconf.initial_g = initial_g;
        to_sconf.initial_gN = -initial_Nunit.abs/mod2med;
        //c cc( 'alpha fraction=' + (alpha/Math.PI).toFixed(3) );
    })();

    let pointRadius = handleRadius;
    let pop = pointsOnPicture;
        Object.assign( originalPoints, {
        C : {
                pos: [0,0], //fake pos
                pcolor: pt.static,
                cssClass: 'tp-static tp-_C',
                initialR: pointRadius,
                letterAngle : -90,
                letterRotRadius : 20,
        },
        B : {
                pos: pop.B,
                pcolor: pt.static,
                cssClass: 'tp-static',
                initialR: pointRadius,
                letterAngle : -90,
                letterRotRadius : 20,
        },
        D : {
                pcolor: pt[ "constructors" ],
                //cssClass: 'tp-g-parameter',
                initialR: pointRadius,
                letterAngle : 180,
                letterRotRadius : 20,
        },
        O : {
                pos: pop.O,
                //pcolor: pt[ "g-parameter" ],
                //cssClass: 'tp-static',
                //cssClass : 'logic_phase--proof',
                cssClass: 'aspect--model',
                initialR: pointRadius,
                letterAngle : 0,
                letterRotRadius : 20,
                doPaintPname:false,
        },
        P : {
                cssClass: 'logic_phase--proof',
                pcolor: pt.static,
                initialR: pointRadius,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        N : {
                pos: pop.N,
                pcolor: pt.static,
                initialR: pointRadius,
                letterAngle : -45,
                letterRotRadius : 20,
        },
        n : {
                cssClass: 'subessay--converse-proof',
                pcolor: pt.core,
                initialR: pointRadius,
                letterAngle : -45,
                letterRotRadius : 20,
        },
        p : {
                cssClass: 'subessay--converse-proof',
                pcolor: pt.constructors,
                initialR: pointRadius,
                letterAngle : 180,
                letterRotRadius : 20,
        },
        T : {
                cssClass: 'subessay--direct-proof',
                pos: pop.T,
                pcolor: pt.core,
                initialR: pointRadius,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        R : {
                cssClass: 'subessay--direct-proof',
                pos: pop.R,
                pcolor: pt.core,
                initialR: pointRadius,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        //============================================
        // //\\ sliders
        //============================================
        A : {
                draggableX : true,
                draggableY : true,
                pos: pop.A,
                pcolor: pt.static,
                style: {fill: '#ffffff'},
                cssClass: 'tp-static',
                initialR: pointRadius,
                letterAngle : 0,
                letterRotRadius : 20,
        },
        H : {
                draggableX : true,
                pos: pop.H,
                //pcolor: pt[ "g-parameter" ],
                pcolor: pt.static,
                style: {fill: '#ffffff'},
                cssClass: 'tp-static',
                initialR: pointRadius,
                letterAngle : 45,
                letterRotRadius : 20,
                doPaintPname:false,
        },
        M : {
                draggableY : true,
                pcolor: pt.core,
                style: {fill: '#ffffff'},
                cssClass: 'tp-static',
                initialR: pointRadius,
                letterAngle : 225,
                letterRotRadius : 25,
        },
        //============================================
        // \\// sliders
        //============================================
    });

    var linesArray =
    [
        //-------------------------
        // //\\ static
        //-------------------------
        {
            //-------------------------------------------------
            // \\// given static angles alpha, beta
            //-------------------------------------------------
            //'AABAangleA
            'AB' :
            {
                pcolor : pt.static,
                cssClass : 'tp-angle-beta',
            },
        },
        {
            'BA' :
            {
                pcolor : pt.static,
            },
        },
        {
            //'AABAangleAA'
            'CB' :
            {
                pcolor : pt.static,
                cssClass : 'tp-angle-beta',
            },
        },
        //-------------------------------------------------
        // \\// given static angles alpha, beta
        //-------------------------------------------------

        //-----------------------------------------------
        // //\\ decorates draggers
        //-----------------------------------------------
        {
            'MB' :
            {
                pcolor : pt[ "core" ],
                cssClass : 'tp-constructors',
            },
        },
        {
            'BM' :
            {
                cssClass : 'addendum--none',
            },
        },
        {
            'MC' :
            {
                pcolor : pt[ "core" ],
                cssClass : 'tp-constructors',
            },
        },
        //-----------------------------------------------
        // \\// decorates draggers
        //-----------------------------------------------

        //-------------------------------------------------
        // //\\ base sides
        //-------------------------------------------------
        {
            'BH' :
            {
                pcolor : pt.static,
            },
        },
        {
            'MH' :
            {
                cssClass: 'subessay--direct-proof',
                pcolor : pt[ "core" ],
            },
        },
        {
            'MN' :
            {
                pcolor : pt[ "core" ],
            },
        },

        {
            nN :
            {
                pcolor : pt.core,
                cssClass: 'subessay--converse-proof',
            },
        },
        {
            Cn :
            {
                pcolor : pt.aux,
                cssClass: 'subessay--converse-proof',
            },
        },

        {
            Bn :
            {
                pcolor : pt.aux,
                cssClass: 'subessay--converse-proof',
            },
        },



        {
            Cp :
            {
                pcolor : pt.aux,
                cssClass: 'subessay--converse-proof',
            },
        },

        {
            Bp :
            {
                pcolor : pt.aux,
                cssClass: 'subessay--converse-proof',
            },
        },

        {
            'BC' :
            {
                pcolor : pt.static,
                cssClass:'tp-angle-alpha tp-angle-beta',
            },
        },
        {
            'BN' :
            {
                pcolor : pt.static,
            },
        },
        {
            'CN' :
            {
                pcolor : pt.static,
            },
        },
        {
            'BD' :
            {
                pcolor : pt[ "constructors" ],
            },
        },
        {
            CR : {
                cssClass: 'subessay--direct-proof',
                pcolor: pt[ "constructors" ],
            },
        },
        {
            BT : {
                    cssClass: 'subessay--direct-proof',
                    pcolor: pt[ "constructors" ],
            },
        },
        {
            'CD' :
            {
                pcolor : pt[ "constructors" ],
            },
        },
        {
            'PT' :
            {
                cssClass: 'subessay--direct-proof',
                pcolor : pt[ "core" ],
            },
        },
        {
            'PR' :
            {
                cssClass: 'subessay--direct-proof',
                pcolor : pt[ "core" ],
            },
        },
        {
            'PC' :
            {
                cssClass: 'logic_phase--proof',
                pcolor : pt[ "static" ],
            },
        },
        {
            'PB' :
            {
                cssClass: 'logic_phase--proof',
                pcolor : pt[ "static" ],
            },
        },
        //-------------------------------------------------
        // \\// base sides
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ given static angles alpha, beta
        //-------------------------------------------------
        //'AAABangleA',
        {
            'AC' : //line AC
            {
                pcolor : pt[ "static" ],
                cssClass:'tp-angle-alpha',
            },
        },
        //AAABangleB
        {
            'AB' :
            {
                pcolor : pt[ "static" ],
                cssClass:'tp-angle-beta',
            },
        },
        //-------------------------------------------------
        // \\// given static angles alpha, beta
        //-------------------------------------------------
    ];


    //----------------------------------------------------
    // //\\  prepares sconf data holder
    //----------------------------------------------------
    fapp.normalizeSliders( medHeight / 500 ); //todo not automated, prolifer.
    Object.assign( to_sconf, {
        originalPoints,
        linesArray,
        mediaBgImage : "diagram.png",
        //mediaBgImage : "diagram3.png", //bigger diagram

        //----------------------------------
        // //\\ model-view parameters
        //----------------------------------
        medposOfModOrigin_x, //needed for common sliders
        medposOfModOrigin_y, //needed for common sliders

        innerMediaHeight    : medHeight + sconf.SLIDERS_LEGEND_HEIGHT,
        innerMediaWidth     : medWidth,
        medWidth,
        medHeight,

        thickness           : 1,
        //----------------------------------
        // \\// model-view parameters
        //----------------------------------

        //default_tp_stroke_opacity : 0.5, //already
        default_tp_stroke_width,
        defaultLineWidth,
        handleRadius,
    });

    //todm proliferation in each lemma:
    //----------------------------------
    // //\\ spawns to_conf
    //----------------------------------
    (function () {
        var med2mod = 1/mod2med;
        to_sconf.mod2med = mod2med;
        to_sconf.med2mod = med2mod;
    })();
    //----------------------------------
    // \\// spawns to_conf
    // \\// prepares sconf data holder
    //----------------------------------------------------



    //----------------------------------------------------
    // //\\ copy-pastes to sconf
    //----------------------------------------------------
    Object.keys( to_sconf ).forEach( function( key ) {
        sconf[ key ] = to_sconf[ key ];
    });
    //----------------------------------------------------
    // \\// copy-pastes to sconf
    //----------------------------------------------------

    //*************************************
    // //\\ shapes
    //*************************************
    sf.shapesArray = [
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

            //pcolor: pt[ "core" ],
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

            //pcolor: pt[ "core" ],
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
};
//====================================================
// \\// inits and sets config pars
//====================================================
})();
