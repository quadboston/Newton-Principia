(function(){
const { nspaste, fconf, sf, tprepo, stripp, CONST, apush, gshapes,
        rg, tpelect, stdMod, ssD
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const el = tpelect;
return;


function init_conf (){
    //navigation
    sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 892;
    sf.medHeight = 840;
    //to comply standard layout, one must add these 2 lines:
    let medsize = sf.medWidth + sf.medHeight;
    let medsizeScale = medsize / sf.medsize_standard

    let A = [785, 441];
    let V = [64, 462 ];
    let S = [207, 403];
    let P = [693, 213];
    let Q = [646.0, 168.0 ];

    let C;
    let RR;
    {
        const ww1 = A[0]-V[0];
        RR = ww1*ww1;
        const ww2 = A[1]-V[1];
        RR += ww2*ww2;
        RR = Math.sqrt( RR ) / 2;
        C = [ V[0] + ww1/2, V[1] + ww2/2, ];
    }

    sf.medposOfModOrigin_x = C[0]; //for model's axis x
    sf.medposOfModOrigin_y = C[1]; //for model's axis y

    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = RR;

    sf.prop7R = 1;
    sf.prop7Center = [ 0, 0 ];
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at c onf/c onf.js or especally at c onf/lemma.c onf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.allLettersAreHidden = true;
    //t/sf.default_tp_lightness = 30;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //interval of t to construct an arc for
    //Newton's sagitta
    rg.tForSagitta = stripp({ val: 0.168 });
    //the law to be studied in given lemma:
    //fe: for 1/r^2, the assigment is
    //    sf.force_law = bP => 1/(bP.r2);
    //null means that program will calculated the law
    //based on dt -> 0:
    sf.force_law = null;
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
    sf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN = true; //only for non addendum
    const FT = sf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
    sf.CURVE_REVOLVES = false; //true for cyclic orbit
    sf.ADDENDUM_NORM_BY_MIN = true;
    //calculation decoration and quality
    sf.BESIER_PIVOTS = 0; //5; //otherwise assumed 9 pivots
    //***************************************************************
    // \\// math model auxilaries
    //***************************************************************

    //***************************************************************
    // //\\ model comparison demo
    //      , even if no sf.SHOW_FORMULAS, do preserve this as
    //      a commented template,
    //***************************************************************
    sf.SHOW_FORMULAS = [
        //usually, bP is context of "plane-cureve-derivatives"
        { label:'1/r⁵',
            fun:(bP) => { const r2 = bP.r2;  return 1/(r2*r2*bP.r);},
            //t// cssclass : 'tp-context tostroke',
        },
        { label:'1/r²',
            fun:(bP) => 1/bP.r2,
        },
    ];
    //***************************************************************
    // \\// model comparison demo
    //***************************************************************

    //*************************************
    // //\\ elected colors,
    //      does import topic colors to 
    //      elected colors from
    //      c onf/lemma.c onf.js
    //*************************************
    [
        'force',
        'estimatedForce',
        'fQR',
        'curvature',
        'sagitta',
        'body',
        'borbit',
        'chord',
        'time',
        'dtime',
        'proof',
        'hidden',
        'context',
        'invalid',
    ].forEach( n => { el[n]=tprepo[n].concat(); });
    el.APQ = el.borbit.concat();
    el.orbitGap = [255,255,255,1];
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    apush( gshapes, [
    {
        kind: CURVE,
        rgn: 'foldPoints',
        cpivots: (new Array(200)).fill({}).map( fp => ({
            pcolor: el.attention,
            initialR: 1,
            doPaintPname: false,
        })),
        //todm implement: this will remove code from
        //amode8captures,
        //flcs: 'solvable_orbit',
        //flcs: 'flcs--off-solvable_orbit',
        },
        {
          kind: CURVE,
          rgn : 'borbit',
          initShapes: ()=>{
            stdMod.init__Shapes();
            var rgCurve = rg.borbit;
            rgCurve.q2ix = 1/(rgCurve.tEnd-rgCurve.tStart)*sf.curveSTEPS;
            rg.P.q = stdMod.pos2t( rg.P.pos );
            stdMod.completesSlidersCreation();
            stdMod.graphFW_lemma = stdMod.creates_lemma_graph_fw({
                digramParentDom$:stdMod.legendRoot$ });
            //-----------------------------------------
            // //\\ partially draggers and decoration
            //      are initiated here
            //      todm: not very consistent,
            //-----------------------------------------
            ssD.PdragInitiated = false;
            ssD.SdragInitiated = false;
            //-----------------------------------------
            // \\// partially draggers and decoration
            //-----------------------------------------
          },
        },
    ]);
    //*************************************
    // \\// shapes
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    {
        kind: LINE,
        rgn: 'AV',
        pcolor: el.proof,
        cssClass: 'logic_phase--proof subessay--corollary2 ' +
                  'aspect--addendum',
    },
    {   rgn: 'AP',
        pcolor : el.proof,
        cssClass: 'logic_phase--proof aspect--addendum',
    },
    {   rgn: 'SP',
        pcolor : el.body,
        cssClass: 'logic_phase--proof logic_phase--corollary' +
                    ' aspect--addendum',
    },
    {   rgn: 'PV',pcolor : el.proof,
                cssClass: 'logic_phase--proof subessay--corollary2' +
                            ' aspect--addendum',
    },
    {   rgn: 'PR',
        pcolor : el.body,
        cssClass: 'subessay--solution aspect--addendum',
    },
    {   rgn: 'SY', pcolor : el.proof,
                cssClass: "subessay--another-solution",
    },
    {   rgn: 'QR', pcolor : el.proof,
                cssClass: 'subessay--solution aspect--addendum',
    },
    {   rgn: 'QT', pcolor : el.proof,
                cssClass: 'subessay--solution aspect--addendum',
    },
    {   rgn: 'PT', pcolor : el.proof,
                cssClass: 'subessay--solution',
    },
    {   rgn: 'PC', pcolor : el.curvature,
                cssClass: 'logic_phase--none',
    },
    {   rgn: 'PY', pcolor : el.body,
                cssClass: "subessay--another-solution",
    },
    {   rgn: 'P,Zminus',
        pcolor : el.body,
        cssClass: 'subessay--solution',
    },
    {   rgn: 'PZ', pcolor : el.body,
                cssClass: 'subessay--solution',
    },
    {   rgn: 'ZR', pcolor : el.body,
                cssClass: 'subessay--solution',
    },

    {   rgn: 'ZQ', pcolor : el.body,
                cssClass: 'subessay--solution',
    },
    {   rgn: 'RL', pcolor : el.proof,
                cssClass: 'subessay--solution aspect--addendum',
    },
    {   rgn: 'P,rrminus', pcolor : el.proof,
                        cssClass: 'subessay--solution',
    },
    {   rgn: 'P,sagitta',
        pcolor : el.sagitta,
        vectorTipIx : 1,
        cssClass: 'aspect--addendum',
    },
    //col2
    {
        rgn: 'Rcol2,P', pcolor : [150, 0, 150],
        cssClass: 'subessay--corollary2 subessay--corollary3',
    },
    {
        rgn: 'Rcol2,Tcol2', pcolor : el.proof,
        cssClass: 'subessay--corollary2',
    },
    {
        rgn: 'P,Tcol2', pcolor : el.proof,
        cssClass: 'subessay--corollary2',
    },
    {
        rgn: 'Tcol2,V', pcolor : el.proof,
        cssClass: 'subessay--corollary2',
    },
    {
        rgn: 'Gcol2,S',
        pcolor : el.proof,
        cssClass: 'subessay--corollary2 subessay--corollary3',
    },
    {   rgn: 'Gcol2,P', pcolor : el.proof,
        cssClass: 'subessay--corollary2 subessay--corollary3',
    },
    {   rgn: 'S,nonSolvablePoint',
        pcolor: el.invalid,
        //cssClass: 'subessay--corollary2',
        cssClass: 'subessay--none',
    },
    ]);
    //*************************************
    // \\// lines
    //*************************************

    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    {
        kind: POINT,
        rgn: 'A',
        pos: A,
        pcolor : el.borbit,
        cssClass: 'logic_phase--proof subessay--corollary2 ' +
                  'aspect--addendum',
    },
    {
        rgn: 'S',
        pos: S,
        pcolor : el.force,
        letterAngle : -90,
        draggableX  : true,
        draggableY  : true,
        initialR    : 5,
    },
    {
        rgn: 'P',
        pos: P,
        pcolor : el.body,
        cssClass: 'tp-body',
        letterAngle : 70,
        draggableX  : true,
        draggableY  : true,
    },
    {
        rgn: 'Q',
        pos: Q,
        pcolor : el.proof,
        letterAngle : 225,
        letterRotRadius : 40,
        draggableX  : true,
        draggableY  : fconf.sappId === 'b1sec2prop7',
        cssClass: 'subessay--solution aspect--addendum',
    },
    ///point to display dt
    {
        rgn: 'QtimeDecor',
        //pos: will be as Q,
        undisplayAlways : true,
        cssClass: 'tp-dtime subessay--solution aspect--addendum',
        pcolor : el.dtime, //proof,
        fontSize : 30,
        letterAngle : 225,
        letterShift : [30,0],
        letterRotRadius : 180,
    },
    {
        rgn: 'R',
        pcolor : el.proof,
        letterAngle : 45,
        cssClass: 'subessay--solution aspect--addendum',
    },
    {
        rgn: 'T',
        pcolor : el.proof,
        letterAngle : 180,
        cssClass: 'subessay--solution aspect--addendum',
    },
    {
        rgn: 'Z',
        pcolor : el.body,
        letterAngle : 45,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'Zminus',
        pcolor : el.body,
        letterAngle : 45,
        //undisplay : true,
        undisplayAlways : true,
        doPaintPname : false,
        cssClass: 'subessay--solution',
    },
    {
        rgn: 'V',
        pos: V,
        pcolor : el.curvature,
        letterAngle : -45,
        cssClass: 'logic_phase--proof subessay--corollary1' +
                    ' subessay--corollary2 aspect--addendum',
    },
    //?center of instant curvature circle
    {
        rgn: 'C',
        pos : C,
        caption : '',
        pcolor : el.curvature,
        letterAngle : -45,
        cssClass: 'logic_phase--proof subessay--corollary2',
    },
    {
        rgn: 'Y',
        pos: Q,
        pcolor : el.proof,
        letterAngle : -90,
        cssClass: "subessay--another-solution",
    },
    {
        rgn: 'L',
        pcolor : el.curvature,
        letterAngle : -45,
        cssClass: 'subessay--solution aspect--addendum',
    },
    {
        rgn: 'rrminus',
        caption : 'Q-',
        pcolor : el.proof,
        letterAngle : 225,
        letterRotRadius : 40,
        undisplayAlways: true,
        doPaintPname : false,
    },
    {
        rgn: 'sagitta',
        cssClass: 'aspect--addendum',
        caption : 'I',
        //pos: Q,
        pcolor : el.sagitta,
        letterAngle : 270,
        letterRotRadius : 35,
        //initial setting does not work well bs poor code design
        //undisplay : true,
    },
    {
        rgn: 'nonSolvablePoint',
        pos: [0,0], //will be calculated
        caption : 'Orbit`s tangent cannot pass throgh center of force.',
        fontSize : '25',
        /*
        //no dice:
        title : 'Kepler force does not exist ' +
                'in neighborhood of this point.',
        */
        undisplayAlways : true,
        pcolor : el.invalid,
        letterAngle : 0,
    },

    //col2
    {
        rgn: 'Tcol2',
        caption : 'T',
        pcolor : el.curvature,
        letterAngle : -45,
        cssClass: 'subessay--corollary2',
    },
    {
        rgn: 'Rcol2',
        ////for corollary2, second center of force
        caption : 'R',
        pcolor : el.curvature,
        letterAngle : -45,
        draggableX  : true,
        draggableY  : true,
        cssClass: 'subessay--corollary2 subessay--corollary3',
    },
    {
        rgn: 'Gcol2',
        caption : 'G',
        pcolor : el.curvature,
        letterAngle : -45,
        cssClass: 'subessay--corollary2 subessay--corollary3',
    },
    ]);
    //*************************************
    // \\// points
    //*************************************
}
})();
