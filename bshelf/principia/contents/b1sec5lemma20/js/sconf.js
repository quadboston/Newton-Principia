{
const { nspaste, mat, fapp, fconf, sconf, sf, apush, gshapes,
        CONST, tpelect, ssF, stdMod, rg, sData, stfMod } =
      window.b$l.atree({ ssFList: { init_conf } });
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;

function init_conf (){
    //====================================================
    // //\\ subapp regim switches
    //====================================================
    //for some standard sliders
    sconf.hideProofSlider = true; //todo
    //====================================================
    // \\// subapp regim switches
    //====================================================

    sf.medWidth = 2000;
    sf.medHeight = 1660;
    //offset of eccentricy slider in picture-space
    sf.medposOfModOrigin_x = 821;
    sf.medposOfModOrigin_y = 906;
    const O = [sf.medposOfModOrigin_x, sf.medposOfModOrigin_y];
    const P = [996, 570];
    const pointRadius = 12;
    sf.pictureActiveArea = mat.unitVector(
        [ P[0] - O[0], P[1] - O[1] ]).abs;
    sf.mod2med = sf.pictureActiveArea;
    //todm proliferation in each lemma:
    sf.med2mod = 1/sf.mod2med;

    // //\\ this approximately fits Newton's diagram
    sf.focus = [263, 535]; //in media scale

    //lemma-wide constant, never changes,
    //causes "canonical ellipse" to rotate slightly clockwise
    //to fit Newton's diagram
    sf.q0 = -Math.PI*0.19;

    sf.excentricity = 0.8702;

    sf.latus2 = 190.621; //in media scale

    sf.initialParT = 0.735; //parameter T on line Pt
    sf.initialparC = 0.58;
    sf.initialparP = -0.05;
    sf.initialparA = 5.17;
    sf.initialparB = -0.51;
    // \\// this approximately fits Newton's diagram
    //----------------------------------
    // \\// spawns to_conf
    // \\// prepares sconf data holder
    //----------------------------------------------------

    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************
    sf.mediaBgImage = "l20.jpg";
    fapp.normalizeSliders( sf.medHeight / 444 );
    //for e slider
    sf.eMax = 1.5;
    const slider_aY = sf.medHeight*0.9;
    //to comply standard layout, one must add these 2 lines:
    const medsizeScale = (2 * ( sf.medWidth + sf.medHeight ) / 2)
                       / sconf.medsize_standard;
    sconf.LETTER_FONT_SIZE_PER_1000 = 20; //works
    //100; //display in "percents" of Ae
    sf.MODEL_SCALE_TO_SLIDER_CAPTION_SCALE = 1;

    //--------------------------------------
    // //\\ does override engine defaults,
    //      in expands-c onf.js,
    //--------------------------------------
    sconf.default_tp_lightness = 30;
    sf.default_tp_stroke_width = Math.floor( 6 * medsizeScale );
    sf.defaultLineWidth        = Math.floor( 1 * medsizeScale );
    //overrides "global", lemma.c onf.js::sconf
    sconf.pointDecoration.r = Math.floor( 3.5 * medsizeScale );

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
    sf.thickness = 2;
    //***************************************************************

    Object.assign( el, {
        "static"                : [0,     200, 255, 1],
        "core"                  : [155,  70, 0, 1],
        "aux"                   : [255,   0, 255, 1],
        "constructors"          : [0,     0, 255, 1],
        "ellipse"               : [0,   150, 0, 1],
        "legend"                : [200,   200, 200],
    });
    el[ "key-triangle" ] = el.core;
    el[ "key-parts" ] = el.core;
    el[ "similar-triangle" ] = el.static;
    el.PT = el.core;
    el[ "base-figure" ] = el.core;
    el[ "static-generator" ] = el[ "constructors" ];
    el[ "given-parallelogram" ] = el.static;
    el[ "generators" ] = el[ "constructors" ];
    el[ "tangent" ] = el[ "constructors" ];
    el[ "aux-dots" ] = el.aux;
    el[ "perigeum" ] = el.legend;
    el[ "apogee" ] = el.legend;
    el[ "focus" ] = el.legend;
    el[ "rectum" ] = el.legend;
    el[ "ellipse_center" ] = el.legend;

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
        {   kind: LINE,
            rgn: 'KS',
                    pcolor : el.aux,
        },
        { rgn: 'AE',
                    pcolor : el.aux,
        },
        //-------------------------
        // //\\ base-figure
        //-------------------------
        { rgn: 'CA',
                    pcolor : el.static,
                    cssClass : 'tp-base-figure',
        },
        { rgn: 'BC',
                    pcolor : el.static,
                    cssClass : 'tp-base-figure',
        },
        { rgn: 'BA',
                    pcolor : el.static,
                    cssClass : 'tp-base-figure',
        },
        { rgn: 'PB',
                    pcolor : el.static,
                    cssClass : 'tp-base-figure',
        },
        { rgn: 'PC',
                    pcolor : el.static,
                    cssClass : 'tp-base-figure',
        },
        //-------------------------
        // \\// base-figure
        //-------------------------

        { rgn: 'PT',
                    pcolor: el["key-triangle"],
                    'stroke-width' : 10,
                    cssClass : 'tp-key-triangle tp-key-parts',
        },
        { rgn: 'PR',
                    pcolor: el["key-triangle"],
                    'stroke-width' : 10,
                    cssClass : 'tp-key-triangle tp-key-parts',
        },
        { rgn: 'RT',
                    pcolor: el["key-triangle"],
                    'stroke-width' : 10,
                    cssClass : 'tp-key-triangle',
        },



        //-------------------------
        // //\\ given parallelogram
        //-------------------------
        { rgn: 'PQ',
                    pcolor : el.static,
                    cssClass : 'tp-given-parallelogram',
        },
        { rgn: 'AS',
                    pcolor : el.static,
                    cssClass : 'tp-given-parallelogram',
        },
        { rgn: 'AC',
                    pcolor : el.static,
                    cssClass : 'tp-given-parallelogram',
        },
        { rgn: 'AQ',
                    pcolor : el.static,
                    cssClass : 'tp-given-parallelogram',
        },
        { rgn: 'QA',
                    pcolor : el.static,
                    cssClass : 'tp-given-parallelogram',
        },
        { rgn: 'PS',
                    pcolor : el.static,
                    cssClass : 'tp-given-parallelogram',
        },
        //-------------------------
        // \\// given parallelogram
        //-------------------------

        //------------------------
        // //\\ linear-generators
        //------------------------
        { rgn: 'BT',
                    pcolor : el[ "constructors" ],
                    cssClass : 'tp-generators',
        },
        { rgn: 'CR',
                    pcolor : el[ "constructors" ],
                    cssClass : 'tp-generators',
        },
        { rgn: 'BD',
                    pcolor : el[ "constructors" ],
                    cssClass : 'tp-generators',
        },
        { rgn: 'CD',
                    pcolor : el[ "constructors" ],
                    cssClass : 'tp-generators',
        },
        //------------------------
        // \\// linear-generators
        //------------------------


        //------------------------
        // //\\ aux-lines
        //------------------------
        { rgn: 'DG',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'IG',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },

        { rgn: 'DI',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'DE',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'DK',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'Bt',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof' +
                                ' subessay--corollary1' +
                                ' subessay--corollary2',
        },
        { rgn: 'CF',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'HB',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'DH',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'DF',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'IQ',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        //------------------------
        // \\// aux-lines
        //------------------------

        //------------------------
        // //\\ static triangle
        //------------------------
        { rgn: 'rt',
                    pcolor : el.aux,
                    cssClass : 'logic_phase--proof',
        },
        { rgn: 'Pr',
                    pcolor: el["static-generator"],
                    cssClass : 'tp-static-generator',
        },
        { rgn: 'Pt',
                    pcolor: el["static-generator"],
                    cssClass : 'tp-static-generator',
        },
        { rgn: 'Cd',
                    pcolor: el["aux"],
                    cssClass : 'subessay--corollary3',
        },
        { rgn: 'Pq',
                    pcolor: el["aux"],
                    cssClass : 'subessay--corollary3',
        },
        //------------------------
        // \\// static triangle
        //------------------------

        //------------------------
        // //\\ similar triangles
        //      in circle case
        //------------------------
        { rgn: 'BP',
                    pcolor: el["similar-triangle"],
                    cssClass : 'tp-similar-triangle',
        },
        { rgn: 'BC',
                    pcolor: el["similar-triangle"],
                    cssClass : 'tp-similar-triangle',
        },
        //------------------------
        // \\// similar triangles
        //------------------------
        // //\\ decorations
        { rgn: 'rectumLow,rectum',
                pcolor: el["rectum"],
        },
        { rgn: 'perigeum,apogee',
                pcolor: el["rectum"],
        },
        { rgn: 'focus,apogee',
                pcolor: el["rectum"],
        },
        // \\// decorations
    ]);
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    {   kind: POINT,
        rgn: 'P',
        pos: P.concat(),
        pcolor: el.static,
        cssClass: 'tp-key-triangle',
        initialR: pointRadius,
        letterAngle: 45,
        letterRotRadius: 20,
    },
    {   rgn: 'A',  pos: [623, 1232],
                pcolor: el.static,
                cssClass: 'tp-base-figure',
                initialR: pointRadius,
                letterAngle : 45,
                letterRotRadius : 20,
            },
    {   rgn: 'B',  pos: [1497, 1230],
                pcolor: el.static,
                cssClass: 'tp-base-figure',
                //style: {fill: '#ffffff'}, works
                initialR: pointRadius,
            },
    {   rgn: 'C',  pos: [509,383],
                pcolor: el.static,
                cssClass: 'tp-base-figure',
                initialR: pointRadius,
                letterAngle : 45,
                letterRotRadius : 20,
            },

        // //\\ aux points
    {   rgn: 'G',
                pcolor : el.aux,
                cssClass : 'logic_phase--proof',
                letterAngle : 45,
                },
    {   rgn: 'I',
                pcolor : el.aux,
                cssClass : 'logic_phase--proof',
                letterAngle : -125,
                letterRotRadius : 20,
                },
    {   rgn: 'H',
                pcolor : el.aux,
                cssClass : 'logic_phase--proof',
                letterAngle : -90,
                letterRotRadius : 20,
                },
    {   rgn: 'E',
                pcolor : el.aux,
                cssClass : 'logic_phase--proof',
                letterAngle : -125,
                letterRotRadius : 20,
                },
    {   rgn: 'K',
                pcolor : el.aux,
                cssClass : 'logic_phase--proof',
                letterAngle : 90,
                letterRotRadius : 20,
            },
    {   rgn: 'F',
                pcolor : el.aux,
                cssClass : 'logic_phase--proof',
                letterAngle : 0,
                letterRotRadius : 20,
            },
    {   rgn: 't',  pos: [1511, 574],
                pcolor : el.aux,
                cssClass : 'logic_phase--proof subessay--corollary1' +
                            ' subessay--corollary2',
                initialR: pointRadius,
                letterAngle : 45,
                letterRotRadius : 20,
            },
    {   rgn: 'r',  pos: [1028, 830],
                pcolor : el.aux,
                cssClass : 'logic_phase--proof',
                initialR: pointRadius,
            },
    {   rgn: 'q',  pos: [1028, 830],
                pcolor : el.aux,
                cssClass : 'subessay--corollary3',
                initialR: pointRadius,
            },
    {   rgn: 'd',  pos: [1028, 830],
                pcolor : el.aux,
                cssClass : 'subessay--corollary3',
                initialR: pointRadius,
            },
        // \\// aux points

        ///-------------------------------------------------
        ///builds center point first to be used in ellipse
        ///-------------------------------------------------
    {   rgn: 'O',
        pos: O.concat(),
        cssClass: 'aspect--model tp-base-figure',
        r : pointRadius,
        letterRotRadius : 20,
    },
        // //\\ decorations
        ///conic focus
    {   rgn: 'focus',
                //caption : 'focus',
                initialR: pointRadius/2,
                letterRotRadius : 15,
                letterAngle : 0,
                fontSize : 15,
        },

        ///conic latus rectum
    {   rgn: 'rectum',
                //caption : 'rectum',
                letterRotRadius : 20,
                hideCaption : true,
                undisplayAlways : true,
        },
    {   rgn: 'rectumLow',
                hideCaption : true,
                undisplayAlways : true,
        },
    {   rgn: 'perigeum',
                //hideCaption : true,
                undisplayAlways : true,
                initialR: pointRadius/2,
                letterRotRadius : 15,
                letterAngle : 20,
                fontSize : 15,
        },
    {   rgn: 'apogee',
                //hideCaption : true,
                undisplayAlways : true,
                initialR: pointRadius/2,
                letterRotRadius : 15,
                letterAngle : 0,
                fontSize : 15,
        },
        //to be counted as ellipse_center=(apogee+perigeum)/2
    {   rgn: 'ellipse_center',
                caption : 'center',
                initialR: pointRadius/2,
                letterRotRadius : 15,
                letterAngle : 190,
                letterRotRadius : 45,
                fontSize : 15,
        },
        // \\// decorations
        //derived points, should not be used in model
     {   rgn: 'Q',  pos: [1077, 1231],
                pcolor: el.static,
                cssClass: 'tp-base-figure',
                initialR: pointRadius,
                letterAngle : 45,
                letterRotRadius : 20,
     },
     {   rgn: 'R',  pos: [1010, 712],
                pcolor: tpelect['key-triangle'],
                cssClass: 'tp-key-triangle',
                initialR: pointRadius,
                letterAngle : -10,
                letterRotRadius : 20,
     },
     {   rgn: 'S',  pos: [532,561],
                pcolor: el.static,
                cssClass: 'tp-base-figure',
                initialR: pointRadius,
                letterAngle : 45,
                letterRotRadius : 20,
     },
    ]);

    ssF.conf__points2sliders({
        sliderPoints: [
        {  rgn: 'D',
            pos: [1410, 965],
            pcolor: tpelect['generators'],
            cssClass: 'tp-generators',
            initialR: pointRadius,
            letterRotRadius : 30,
            letterAngle : 45,
            draggableX : true,
            draggableY : true,
            nonInLegendSlider: true,
            gconf:{
                caption: _=>'D',
                unit: '',
                //todo
                val: 0.742,
                min: -338,
                max: 1655,
            },
            acceptPos : function( newPos ){
                const pem = sData.polar_ell_model;
                const pix = ssF.gets_orbit_closest_point(
                    newPos, pem.points );
                const Dpos = pem.points[ pix ];
                rg.D.pos[0] = Dpos[0];
                rg.D.pos[1] = Dpos[1];
                const Tpos = mat.lineSegmentsCross(
                    Dpos, rg.B.pos,
                    rg.P.pos, rg.t.pos );
                const T = rg.T;
                T.pos[0] = Tpos[0];
                T.pos[1] = Tpos[1];
                //algebraic distancs from P to T:
                T.value = T.pos2Tpar( Tpos );
                stdMod.model8media_upcreate();
            },
        },
        {   rgn: 'T',
            pos: [1283, 572],
            draggableX : true,
            draggableY : true,
            pcolor: tpelect['key-triangle'],
            style: {fill: '#ffffff'},
            cssClass: 'tp-key-triangle',
            letterAngle : 45,
            letterRotRadius : 20,
            draggableX : true,
            nonInLegendSlider: true,
            gconf:{
                caption: _=>'T',
                unit: '',
                val: 0.742,
                min: -338,
                max: 1655,
                //protects drag from going outside of
                //the initial window
                //min: -6.5,
                //max: 2.5,
            },
            afterInitShapes: () => {
                var parT = sconf.initialParT;
                rg.T.value = parT;
            },
            acceptPos: function( newPos ){
                var T = rg.T;
                //algebraic distancs from P to T:
                var Tvalue = stdMod.pos2Tpar( newPos )
                //todm: merge val with value:
                //ccc( this.val, 'value='+this.value );
                if( Tvalue < T.gconf.min ||
                    Tvalue > T.gconf.max ) return;

                T.value = Tvalue;
                //redundant: T.val = Tvalue - T.gs.gconf.min;
                T.pos[0] = newPos[0];
                T.pos[1] = newPos[1];
                return true;
            },
        },
        {
            rgn: 'exc',
            pcolor: el.ellipse,
            //cssClass: //'tp-time flcs--solvable_orbit' +
            animateDuration_flg: 5000,
            gconf: {
                unit: '',
                val: sf.excentricity,
                min: 0.00001,
                max: 1.49,
                caption: ( e, unit ) => {
                    let cap;
                    if( e<0.01 ){
                        cap = 'circle, eccentricity = 0';
                    } else if( e<0.999 ){
                        cap = 'ellipse, eccentricity = ' +
                        e.toFixed(2);
                    } else if ( e<=1 ){
                        cap = 'parabola, eccentricity = 1';
                    } else {
                        cap = 'hyperbola, eccentricity = ' +
                        e.toFixed(2);
                    }
                    return cap;
                },
            },
            afterInitShapes: (gs_origin) => {
                const rgn = gs_origin.rgn;
                rg[rgn].processOwnMoveEent = ()=>{
                    sData.polar_ell_model.e = rg[rgn].val;
                    stdMod.curveModel2branches();
                };
            },
        },
    ]});
}
}