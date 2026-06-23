//todo lemma4, research ver, missed:
//http://localhost/np/prj-a/ad/sites/src/vendor/mathjax/
//    output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff
(function(){
const {   ns, eachprop, nspaste, fconf, sf, sconf, tpelect, tprepo,
          originalPoints, rg, toreg, stdMod, ssD,
      } = window.b$l.atree({ ssFList: {
          init_conf
}});
return;


function init_conf (){
    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 699;
    sf.medHeight = 375;
    sf.medposOfModOrigin_x = 80; //for model's axis x
    sf.medposOfModOrigin_y = 329; //for model's axis y
    var A = [sf.medposOfModOrigin_x, sf.medposOfModOrigin_y];
    var a = [A[0], 48.5];
    var E = [334, A[1]];
    var c = [210, 122];
    var P = [381, 333];
    var p = [381, 80.5];
    var T = [641, P[1]];
    var r = [514, 150];
    sf.mod2med = A[1] - a[1];
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at conf/conf.js or especally at conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.mediaBgImage = "l4-diagram.png";
    sf.default_tp_stroke_width = 3;
    sf.defaultLineWidth = 1;
    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //count n slider parameters
    var sliderNStart = [ A[0], E[1]+60 ];
    var sliderNEnd = [ T[0], sliderNStart[1] ];
    sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA = 1;
    sconf.DONT_PAINT_BARS_MORE_THAN = 200;
    sconf.ZEBRA_COLORS = 6;
    sconf.BARS_NUMBER_TO_PLOT = sconf.ZEBRA_COLORS;
    //after assigning, test app; because of
    //algo is repeatable, all next runs will do the same work,
    var BARS_NUMBER_MAX = sconf.BARS_NUMBER_MAX = 500; //850;
    var BARS_NUMBER_INITIAL = sconf.BARS_NUMBER_INITIAL = 4;
    //no effect: sconf.pointDecoration.r= 50;
    //******************************************
    // \\// model principals parameters
    //******************************************

    //*************************************
    // //\\ elected colors,
    //*************************************
    const {
        given,
        proof,
        result,

        hidden,
        context,
        diagram,
    } = tprepo;

    const elect = nspaste( tpelect, { //need deep copy
        given,
        proof,
        result,
        hidden,
        context,
        diagram,
        'acE'  : given,
        'prT'  : given,
        'right-bars' :  [111,0,0,1], //]proof,
        'left-bars' : proof,
        'right-bars-breadths' : [111,0,0,1], //]proof,
        'left-bars-breadths' : proof,
        'leftBarsArea' :  [111,0,0,1], //]proof,
        'rightBarsArea' : proof,
        'barsRatio' : result,
        'figuresRatio' : result,
        'ratio' : result,
        "circumscribed-rectangles":
            tprepo["circumscribed-rectangles"].concat(),
        "inscribed-rectangles":
            tprepo["inscribed-rectangles"].concat(),
    });
    //we will need only hue from
    //"inscribed-rectangles" color:
    //ns.rgb2hsl( elect["inscribed-rectangles"] )[0];
    sconf.MONO_BARS_COLOR = elect["inscribed-rectangles"];

    //optional GUI sugar
    //matching bars:
    //patch which manually matches generated random zebra6-color for bar 1
    //when total bars max = 200:
    tpelect[ 'left-bar-' +
        sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA ] = [111, 50, 1]; //[254, 254, 1];
    tpelect[ 'right-bar-' +
        sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA ] = [111, 50, 1];
    //*************************************
    // \\// elected colors,
    //*************************************

    Object.assign( originalPoints, {
        A : {
            pos: A,
            pcolor : given,
            letterAngle : -90,
        },
        a : {
            pos: a,
            pcolor : given,
            letterAngle : 90,
            //avoids caption duplication for original points
            //merfed with controls' points
            undisplayAlways : true,
            doPaintPname : false,
        },
        E : {
            pos: E,
            pcolor : given,
            letterAngle : -90,
        },
        P : {
            pos: P,
            pcolor : given,
            letterAngle : -90,
        },
        p : {
            pos: p,
            pcolor : given,
            letterRotRadius : 20,
            letterAngle : 180,
            undisplayAlways : true,
            doPaintPname    : false,
        },

        i : {
            cssClass: 'aspect--addendum',
            caption:'I',
            pos: p.concat(),
            pcolor : diagram,
            letterRotRadius : 20,
            letterAngle : 180,
            undisplayAlways : true,
            doPaintPname    : true,
        },
        j : {
            cssClass: 'aspect--addendum',
            caption:'J',
            pos: T.concat(),
            pcolor : diagram,
            letterRotRadius : 20,
            letterAngle : -90,
            undisplayAlways : true,
            doPaintPname    : true,
        },
        r : {
            pos: r,
            pcolor : given,
            letterAngle : 45,
        },
        T : {
            pos: T,
            pcolor : given,
            letterAngle : -90,
            undisplayAlways : true,
            doPaintPname    : false,
        },
        //---------------------------------------
        // //\\ slider
        //---------------------------------------
        countNSlider : {
            caption     : 'n',
            pos         : sliderNStart,
            pcolor      : context,
            doPaintPname: true,
            letterAngle : -90,
            draggableX  : true,
            sliderNStart,
            sliderNEnd,
            displayAlways : true,
            unscalable  : true,
        },
        sliderNStart : {
            caption     : '',
            pos         : sliderNStart,
            pcolor      : hidden,
            undisplayAlways : true,
            unscalable  : true,
        },
        sliderNEnd : {
            caption     : '',
            pos         : sliderNEnd,
            pcolor      : hidden,
            undisplayAlways : true,
            unscalable  : true,
        },
        //---------------------------------------
        // \\// slider
        //---------------------------------------
    });
    eachprop( originalPoints, op => {
        //op.initialR = sf.handleRadius;
    });

    //-----------------------------------
    // //\\ sets bars base points array
    //-----------------------------------
    originalPoints.bars = [
        ///will coinside with point A
        {
            pos: [A[0],A[1]],
            doPaintPname : false,
            undisplayAlways : true,
        },
        {
            //pos: [145,77],
            pos: [145,A[1]],
            pcolor : given,
            letterAngle : 45,
            draggableX : true,
            //initialR : sf.handleRadius,
        },
        {
            //pos: [210,122],
            pos: [210,A[1]],
            pcolor : given,
            letterAngle : 45,
            draggableX : true,
            //cssClass : 'tp-individual-bar',
            //initialR : sf.handleRadius,
        },
        {
            //pos: [272,192],
            pos: [272,A[1]],
            pcolor : given,
            letterAngle : 45,
            draggableX : true,
            //initialR : sf.handleRadius,
        },
        ///will coinside with point E
        {
            pos: [E[0],E[1]],
            doPaintPname : false,
            undisplayAlways : true,
        },
    ]
    //for more options, see expands-conf.js
    originalPoints.bars.doPaintPname = false;
    for( wwix = BARS_NUMBER_INITIAL+1;
        wwix<BARS_NUMBER_MAX; wwix++ ){
        originalPoints.bars.push({
            pos: [100,A[1]], //fake
            pcolor : result,
            undisplayAlways : true,
        });
    }
    //-----------------------------------
    // \\// sets bars base points array
    //-----------------------------------
    //*************************************
    // \\// original app points
    //*************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = [
        { 'Aa' : { pcolor : given }, },
        { 'AE' : { pcolor : given }, },
        { 'Pp' : { pcolor : given }, },
        { 'PT' : { pcolor : given }, },
        { 'Pj' : {
            pcolor : diagram,
            vectorTipIx : 1,
            cssClass: 'aspect--addendum',
        },
        },
        { 'Pi' : {
            pcolor : diagram,
            vectorTipIx : 1,
            cssClass: 'aspect--addendum',
        },
        },
        { 'sliderNStart,sliderNEnd' : { pcolor : context }, },
    ];
    //*************************************
    // \\// original app lines
    //*************************************

    //*************************************
    // //\\ shapes
    //*************************************
    sf.shapesArray = [
    {
        //left line:
        /*
            //apparently this is not enough, need
                //following in study-model.js
                //merges selected points with controls points
                var cPivots = rg.leftCurvePivots.cpivots;
                //merges positions to help d8d
                rg.a.pos = cPivots[0].rgX.pos;
        */
        isCurve: true,
        rgn: 'leftCurvePivots',
        cpivots: (function(){
            const cp = [
                a,
                [ 108, 58 ],
                [ 156, 84 ],
                c,
                [ 283, 210 ],
                [ 305, 251 ],
                E,
            ].map( (medpos, ix) => ({
                pos         : medpos,
                pcolor      : given,
                letterAngle : 45,
                draggableX  : true,
                draggableY  : true,
                doPaintPname : false,
            }));
            //merging with original points
            cp[0].caption = 'a'; //todo fails
            cp[0].draggableX = false;
            cp[0].doPaintPname = true;
            cp[3].caption = 'c';
            cp[3].doPaintPname = true;
            cp[ cp.length - 1 ].draggableX = false;
            return cp;
        })(),
        initShapes: (gshape, rgn)=>{
            toreg( 'leftFunction' );
            rg[rgn].gshape2svg = ()=>{
                rg.leftFunction.dividedDifferences
                   .calculate_polynomial();
            };
            //-------------------------------------------------
            // //\\ merges lemma legacy points a, c, ...
            //      with controls points
            //-------------------------------------------------
            var cPivots = rg[rgn].cpivots;
            const apos = cPivots[0].rgX.pos;
            rg.a.pos = apos;
            //we need this point for scaling purposes for DD-transform
            rg.a.initialPos = [ apos[0], apos[1] ];
            //-------------------------------------------------
            // \\// merges lemma legacy points a, c, ...
            //-------------------------------------------------
        },
    },
    {
        isCurve: true,
        rgn: 'rightCurvePivots',
        cpivots: (function(){
            const rp = [
                //important is the only
                //number of elements
                a,
                [ 108, 58 ],
                [ 156, 84 ],
                c,
                [ 283, 210 ],
                [ 305, 251 ],
                E,
            ].map( cp => ({
                //does not matter, they will be recalculated,
                //to pos = [cp[0], cp[1]]
                pos         : [],
                pcolor      : given,
                letterAngle : 45,
                draggableX  : true,
                draggableY  : true,
                doPaintPname: false,
            }));
            rp[0].doPaintPname = true;
            rp[0].caption = 'p';
            const rplast = rp[ rp.length - 1 ];
            rplast.draggableY = false;
            rplast.caption = 'T';
            rplast.doPaintPname = true;
            return rp;
        })(),
        initShapes: (gshape, rgn)=>{
            toreg( 'rightFunction' );
            rg[rgn].gshape2svg = ()=>{
                rg.rightFunction.dividedDifferences
                   .calculate_polynomial();
            };
            const rightP = rg[rgn].cpivots;
            rightP[0].rgX.pos = rg.p.pos;
            rightP[ rightP.length - 1 ].rgX.pos =
                [rg.T.pos[0], rg.T.pos[1]];
        }
    },
    {
        isCurve: true,
        rgn: 'rightCurvePivots_normalized',
        cpivots: [
            // coordinates are only for model here,
            // points are invisible on GUI,
            // these numbers are "fake", they are
            // not used,
            // important is the only
            // number of elements
            a,
            [ 108, 58 ],
            [ 156, 84 ],
            c,
            [ 283, 210 ],
            [ 305, 251 ],
            E,
        ].map( cp => ({
            //does not matter, they will be recalculated,
            //to pos = [cp[0], cp[1]]
            pos             : [],
            undisplayAlways : true,
            doPaintPname    : false
        })),
        initShapes: (gshape, rgn)=>{
            rg[rgn].gshape2svg = _=>{};
            //-------------------------------------------------
            // //\\ configs model parameters
            //-------------------------------------------------
            //there must be special place for model params
            //usually, there not many of them for
            //math models, and sconf it too crowded place
            //to be lost there ...
            //so, we use ssD in mean time ...
            ssD.AREA_CALCULATION_ACCURACY_DIGITS = 4;
            ssD.AREA_CALCULATION_STEPS = Math.pow( 10,
                ssD.AREA_CALCULATION_ACCURACY_DIGITS );
            ssD.integrationStep = ( rg.E.pos[0] - rg.A.pos[0] )
                / ssD.AREA_CALCULATION_STEPS;
            ssD.FMIN_LIM = 0.02;
            //-------------------------------------------------
            // \\// configs model parameters
            //-------------------------------------------------

            //establishes initial transform DD
            stdMod.recalculates_rg_ptransform();
            stdMod.establishes_right_and_left_curve_pivots();
            stdMod.establishes_x_partition();
            stdMod.establishes_slider_n();
            stdMod.creates_lemma_graph_fw({});
            //stashes fraction of decorational point r
            //on interval PT
            rg.r.rightBase2rx = ( rg.r.pos[0]-rg.P.pos[0] )
                / ( rg.T.pos[0]-rg.P.pos[0] );
        },
      },
    ];
}
})();