(function(){
const { nspaste, fconf, sf, tprepo, stripp,
        rg, tpelect, originalPoints, stdMod, ssD
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
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
    //      look at conf/conf.js or especally at conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.mediaBgImage = "diagram.png";
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
    // //\\ topic group colors,
    //      to see templates what to override here, do
    //      look at conf/lemma.conf.js:
    //*************************************
    ///does import topic colors
    const {
        estimatedForce,
        fQR,
        sagitta,
        borbit,
        proof,
        curvature,
        time,
        dtime,
        body,
        hidden,
        context,
        force,
        invalid,
        chord,
    } = tprepo;

    ///does export topic colors
    nspaste( tpelect, { //need deep copy
        force,
        curvature,
        fQR,
        estimatedForce,
        sagitta,
        body,
        borbit,
        chord,
        invalid,
        proof,
        hidden,
        context,
        dtime,
        time,
        APQ     : borbit,
        orbitGap: [255,255,255,1],
    });
    //*************************************
    // \\// topic group colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    originalPoints.foldPoints = (new Array(200)).fill({}).map( fp => ({
        pcolor      : tpelect.orbitGap,
        doPaintPname : false,
        undisplayAlways : true,
    }));

    Object.assign( originalPoints, {
        A : {
            pos: A,
            pcolor : borbit,
            cssClass: 'logic_phase--proof subessay--corollary2 ' +
                       'aspect--addendum',
        },
        S : {
            pos: S,
            pcolor : force,
            letterAngle : -90,
            draggableX  : true,
            draggableY  : true,
            initialR    : 5,
        },
        P : {
            pos: P,
            pcolor : body,
            cssClass: 'tp-body',
            letterAngle : 70,
            draggableX  : true,
            draggableY  : true,
        },
        Q : {
            pos: Q,
            pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 40,
            draggableX  : true,
            draggableY  : fconf.sappId === 'b1sec2prop7',
            cssClass: 'subessay--solution aspect--addendum',
        },
        ///point to display dt
        QtimeDecor : {
            //pos: will be as Q,
            undisplayAlways : true,
            cssClass: 'tp-dtime subessay--solution aspect--addendum',
            pcolor : dtime, //proof,
            fontSize : 30,
            letterAngle : 225,
            letterShift : [30,0],
            letterRotRadius : 180,
        },
        R : {
            pcolor : proof,
            letterAngle : 45,
            cssClass: 'subessay--solution aspect--addendum',
        },
        T : {
            pcolor : proof,
            letterAngle : 180,
            cssClass: 'subessay--solution aspect--addendum',
        },
        Z : {
            pcolor : body,
            letterAngle : 45,
            cssClass: 'subessay--solution',
        },
        Zminus : {
            pcolor : body,
            letterAngle : 45,
            //undisplay : true,
            undisplayAlways : true,
            doPaintPname : false,
            cssClass: 'subessay--solution',
        },
        V : {
            pos: V,
            pcolor : curvature,
            letterAngle : -45,
            cssClass: 'logic_phase--proof subessay--corollary1' +
                      ' subessay--corollary2 aspect--addendum',
        },
        //?center of instant curvature circle
        C : {
            pos : C,
            caption : '',
            pcolor : curvature,
            letterAngle : -45,
            cssClass: 'logic_phase--proof subessay--corollary2',
        },
        Y : {
            pos: Q,
            pcolor : proof,
            letterAngle : -90,
            cssClass: "subessay--another-solution",
        },
        L : {
            pcolor : curvature,
            letterAngle : -45,
            cssClass: 'subessay--solution aspect--addendum',
        },
        rrminus : {
            caption : 'Q-',
            pcolor : proof,
            letterAngle : 225,
            letterRotRadius : 40,
            undisplayAlways: true,
            doPaintPname : false,
        },
        sagitta : {
            cssClass: 'aspect--addendum',
            caption : 'I',
            //pos: Q,
            pcolor : sagitta,
            letterAngle : 270,
            letterRotRadius : 35,
            //initial setting does not work well bs poor code design
            //undisplay : true,
        },
        nonSolvablePoint : {
            pos: [0,0], //will be calculated
            caption : 'Orbit`s tangent cannot pass throgh center of force.',
            fontSize : '25',
            /*
            //no dice:
            title : 'Kepler force does not exist ' +
                    'in neighborhood of this point.',
            */
            undisplayAlways : true,
            pcolor : invalid,
            letterAngle : 0,
        },

        //col2
        Tcol2 : {
            caption : 'T',
            pcolor : curvature,
            letterAngle : -45,
            cssClass: 'subessay--corollary2',
        },
        Rcol2 : {
            ////for corollary2, second center of force
            caption : 'R',
            pcolor : curvature,
            letterAngle : -45,
            draggableX  : true,
            draggableY  : true,
            cssClass: 'subessay--corollary2 subessay--corollary3',
        },
        Gcol2 : {
            caption : 'G',
            pcolor : curvature,
            letterAngle : -45,
            cssClass: 'subessay--corollary2 subessay--corollary3',
        },
    });
    //*************************************
    // \\// original app points
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = [
        { 'AV' : { pcolor : proof,
                   cssClass: 'logic_phase--proof subessay--corollary2 ' +
                             'aspect--addendum',
        }, },
        { 'AP' : { pcolor : proof,
                   cssClass: 'logic_phase--proof aspect--addendum',
        }, },
        { 'SP' : {
           pcolor : body,
           cssClass: 'logic_phase--proof logic_phase--corollary' +
                     ' aspect--addendum',
        }, },
        { 'PV' : { pcolor : proof,
                   cssClass: 'logic_phase--proof subessay--corollary2' +
                             ' aspect--addendum',
        }, },
        { 'PR' : { pcolor : body,
            cssClass: 'subessay--solution aspect--addendum',
        }, },
        { 'SY' : { pcolor : proof,
                   cssClass: "subessay--another-solution",
        }, },
        { 'QR' : { pcolor : proof,
                   cssClass: 'subessay--solution aspect--addendum',
        }, },
        { 'QT' : { pcolor : proof,
                   cssClass: 'subessay--solution aspect--addendum',
        }, },
        { 'PT' : { pcolor : proof,
                   cssClass: 'subessay--solution',
        }, },
        { 'PC' : { pcolor : curvature,
                   cssClass: 'logic_phase--none',
        }, },
        { 'PY' : { pcolor : body,
                   cssClass: "subessay--another-solution",
        }, },
        { 'P,Zminus' : {
            pcolor : body,
            cssClass: 'subessay--solution',
        }, },
        { 'PZ' : { pcolor : body,
                   cssClass: 'subessay--solution',
        }, },
        { 'ZR' : { pcolor : body,
                   cssClass: 'subessay--solution',
        }, },

        { 'ZQ' : { pcolor : body,
                   cssClass: 'subessay--solution',
        }, },
        { 'RL' : { pcolor : proof,
                   cssClass: 'subessay--solution aspect--addendum',
        }, },
        { 'P,rrminus' : { pcolor : proof,
                          cssClass: 'subessay--solution',
        }, },
        { 'P,sagitta' : {
            pcolor : sagitta, vectorTipIx : 1,
            cssClass: 'aspect--addendum',
        }, },
        //col2
        { 'Rcol2,P' : { pcolor : [150, 0, 150],
             cssClass: 'subessay--corollary2 subessay--corollary3',
        }, },
        { 'Rcol2,Tcol2' : { pcolor : proof,
             cssClass: 'subessay--corollary2',
        }, },
        { 'P,Tcol2' : { pcolor : proof,
             cssClass: 'subessay--corollary2',
        }, },
        { 'Tcol2,V' : { pcolor : proof,
            cssClass: 'subessay--corollary2',
        }, },
        { 'Gcol2,S' : {
            pcolor : proof,
            cssClass: 'subessay--corollary2 subessay--corollary3',
        }, },
        { 'Gcol2,P' : { pcolor : proof,
            cssClass: 'subessay--corollary2 subessay--corollary3',
        }, },
        { 'S,nonSolvablePoint' : {
            pcolor: invalid,
            //cssClass: 'subessay--corollary2',
            cssClass: 'subessay--none',
        },},
    ];
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    sf.shapesArray= [
        {
          isCurve: true,
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
    ];
    //*************************************
    // \\// shapes
    //*************************************
}
})();
