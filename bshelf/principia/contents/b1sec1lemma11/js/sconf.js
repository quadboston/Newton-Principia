{
const { ns, nspaste, fconf, sf, sconf, tprepo, tpelect,
        apush, gshapes, CONST,
      } = window.b$l.atree({ ssFList : { init_conf } });
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;


function init_conf(){
    //in particular, blocks zoom
    sconf.enableTools               = false;
    //--------------------------------------
    // //\\ geometics parameters
    //--------------------------------------
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 441;
    sf.medHeight = 709;

    sf.medposOfModOrigin_x = 58; //for model's axis x
    sf.medposOfModOrigin_y = 60; //for model's axis y
    //--------------------------------------
    // \\// geometics parameters
    //--------------------------------------

    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************
    sf.mediaBgImage = "l11-diagram-3rded.jpg";
    //to comply standard layout, one must add these 2 lines:
    var medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    var medsizeScale = medsize / sconf.medsize_standard

    //making size to better fit lemma's diagram
    //overrides "global", lemma.c onf.js::sc onf
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;

    //overrides "global", lemma.c onf.js::sc onf
    sconf.pointDecoration.r= 3;
    sconf.pointDecoration.r= 5;

    //--------------------------------------
    // //\\ do override engine defaults,
    //      in expands-c onf.js,
    //--------------------------------------
    sconf.default_tp_lightness = 22;
    sconf.default_tp_lightness = 30;
    sconf.default_tp_stroke_width = 8;
    default_tp_stroke_width = Math.floor( 6 * medsizeScale ),
    defaultLineWidth        = Math.floor( 1 * medsizeScale ),
    handleRadius            = Math.floor( 3 * medsizeScale ),

    //this makes hanle's border nicely thin
    sconf.nonhover_width = Math.max( 1, Math.floor(
        1*medsizeScale/1.6 ) );
    //sconf.text_nonhover_width = 1;
    //sconf.nonhover_width = 4;

    //needs hover-width cls at svg-text-el,
    //aka for: Δsin(φ),
    sconf.text_hover_width = 2;
    //needs hover-width cls at svg-text-el,
    //aka for: Δsin(φ),
    //sconf.hover_width = 114;
    sconf.hover_width = Math.max( 2,
        Math.floor( 7*medsizeScale/1.6 ) );
    //--------------------------------------
    // \\// do override engine defaults,
    //--------------------------------------

    var A = [sf.medposOfModOrigin_x, sf.medposOfModOrigin_y];
    var D = [321, A[1]];
    var C = [A[0], 195];
    var B = [D[0], C[1]];

    var c = [A[0], 109];
    var c = [A[0], 113];
    var d = [235, A[1]];
    var b = [d[0], c[1]];
    var J = [A[0], 584];

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = ( J[1] - A[1] ) / 2;

    //*************************************
    // //\\ elected colors,
    //      does import topic colors to
    //      elected colors from
    //      c onf/lemma.c onf.js
    //*************************************
    [
        'given',
        'proof',
        'result',
        'hidden',
        'curvatureCircle',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    nspaste( el, { //need deep copy
        'curve-AB'  : el.given,
        'arc-AB'    : el.given,
        'arc-Ab'    : el.proof,
        'AB2'       : el.given,
        'Ab2'       : el.proof,
        'Ab2-AB2'   : el.proof,
        'bd-BD'     : el.proof,
        'claimRatio': el.proof,
        'limitRatio': el.result,
    });
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    sconf.gshapes = [
        {
            //todm apparently dummy and not used,
            //it seems will be good simulation
            rgn: 'curvatureCircle',
        }
    ];
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    apush( gshapes, [
        {
            kind: LINE,
            rgn: 'AB',
            pcolor: el.given
        },
        { rgn: 'AB', pcolor: el.given },
        { rgn: 'AD', pcolor: el.given },
        { rgn: 'BD', pcolor: el.given },
        { rgn: 'BC', pcolor: el.given },
        { rgn: 'AG', pcolor: el.given },
        { rgn: 'BG', pcolor: el.given },
        { rgn: 'GJ', pcolor: el.given },

        { rgn: 'Ab', pcolor: el.proof },
        { rgn: 'Ad', pcolor: el.proof },
        { rgn: 'Ag', pcolor: el.proof },
        { rgn: 'bc', pcolor: el.proof },
        { rgn: 'bd', pcolor: el.proof },
        { rgn: 'bg', pcolor: el.proof },

        { rgn: 'AJ', pcolor: el.result },
    ]);

    //*************************************
    // //\\ original app points
    //*************************************
    apush( gshapes, [
    // //\\ no visibility cssClass
    {
        kind: POINT,
        rgn: 'A',
        pos: A,
        pcolor: el.given,
        letterAngle : 90,
    },
    {   rgn: 'D',
        pos: D,
        pcolor: el.given,
        letterAngle : 90,
    },
    {   rgn: 'B',
        pos: B,
        pcolor: el.given,
        letterAngle : 0,
    },
    {   rgn: 'C',
        pos: C,
        pcolor: el.given,
        letterAngle : 180,
    },
    {   rgn: 'c',
        pos: c,
        pcolor: el.proof,
        letterAngle : 180,
    },
    {   rgn: 'b',
        pos: b,
        pcolor: el.proof,
        letterAngle : 45,
    },
    {   rgn: 'd',
        pos: d,
        pcolor: el.proof,
        letterAngle : 90,
    },
    {   rgn: 'J',
        pos: J,
        pcolor: el.result,
        letterAngle : 180,
        letterRotRadius : 20,
    },
    {   rgn: 'g',
        pos: [A[0], 622],
        pcolor: el.proof,
        letterAngle : 45,
    },
    {   rgn: 'G',
        pos: [A[0], 677],
        pcolor: el.given,
        letterAngle : -45,
    },
    ]);
    //*************************************
    // \\// original app points
    //*************************************
}
}