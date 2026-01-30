(function(){
const { ns, nspaste, fconf, sconf, sf, tpid2arrc_repo,
        tpid2arrc_elect, originalPoints } =
window.b$l.apptree({ ssFExportList : { init_conf } });
return;


function init_conf (){
    //navigation
    //sf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
    //sf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;

    //====================================================
    // //\\ subapp regim switches
    //====================================================
    sconf.enableStudylab            = false;
    sconf.enableTools               = true;
    sconf.rgShapesVisible           = false;
    //====================================================
    // \\// subapp regim switches
    //====================================================

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.pictureWidth = 839;
    sf.pictureHeight = 563;
    //to comply standard layout, one must add these 2 lines:
    var realSvgSize = 2 * ( sf.pictureWidth + sf.pictureHeight ) / 2;
    var controlsScale = realSvgSize / sconf.standardSvgSize
    sf.modorInPicX = 140;
    sf.modorInPicY = 61;
    sconf.diagramOrigin = [ 0, 0 ];
    var A = [ sf.modorInPicX, sf.modorInPicY];
    var r = [ sf.modorInPicX, 531];
    var R = [ sf.modorInPicX, 302];
    var B = [323, 156];
    var D = [474, sf.modorInPicY];
    var d = [778, sf.modorInPicY];
    var b = [514, 254];
    //var M = [50, sf.modorInPicY];
    //sets position of axis-y for Calculus-framework, not for model axis-y
    var ytop = [-151, 50];
    //model's spacial unit in pixels of the picture:
    sf.mod2inn_scale = R[1] - A[1];
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at conf/conf.js or especally at conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sf.mediaBgImage = "../../b1sec1lemma6/img/b1s1l6-diagram-3rded-b.png";
    sconf.TP_OPACITY_LOW_POINT = 1;
    sconf.TP_OPACITY_LOW = 1; // applied to points, lines, and table data
    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;
    //overrides "global", lemma.conf.js::sconf
    sconf.pointDecoration.r= 5;

    sconf.default_tp_lightness = 22;
    sconf.default_tp_stroke_width = 8;
    default_tp_stroke_width = Math.floor( 6 * controlsScale ),
    defaultLineWidth        = Math.floor( 1 * controlsScale ),
    handleRadius            = Math.floor( 3 * controlsScale ),

    // //\\ principal tp-css pars
    //      see: topics-media-glocss.js
    //this makes hanle's border nicely thin
    sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
    //sconf.nonhover_width = 4;
    sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );
    //sconf.hover_width = 114;  //needs hover-width cls at svg-text-el,
                                //aka for: Δsin(φ),

    //make effect apparently only for line-captions,
    //not for point-captions bs
    //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
    //sconf.text_nonhover_width = 1;
    sconf.text_hover_width = 2; //needs hover-width cls at svg-text-el,
                                //aka for: Δsin(φ),
    // \\// principal tp-css pars
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //--------------------------------------
    // //\\ lemma 7
    //--------------------------------------
    //fixes direction of line BE as constant
    //can be any number from -oo to +oo
    sconf.BXBE_per_BY = 0.5;
    //todm ... bug: when decreasing then ratio begins worse:
    sconf.NON_ZERO_A_PREVENTOR = 0.0001;
    //--------------------------------------
    // \\// lemma 7
    //--------------------------------------

    //*************************************
    // //\\ elected colors,
    //      to see templates what to override here, do
    //      look at conf/lemma.conf.js:
    //*************************************
    var context = [0, 0, 0];
    var given   = tpid2arrc_repo.given;
    var proof   = tpid2arrc_repo.proof;
    var result  = tpid2arrc_repo.result;
    var hidden  = tpid2arrc_repo.hidden;

    ///does export topic colors
    nspaste( tpid2arrc_elect, { //need deep copy
        //:basic topics
        proof,
        given,
        result,
        hidden,

        //:given
        "curve-AB"      : given,
        "left-curve-AB" : given, //patch for left branch
        "arc-AB"        : given,

        //proof
        "curve-Ab"      : proof,
        "arc-Ab"        : proof,

        //addendum
        "phi0"          : given,
        "deltaphi"      : given,
        "tangentPhi"    : result,
        'angleBAD'      : given,
        'conterminousRatio' : proof,
    });
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    //*************************************
    // \\// bricks for originalPoints
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    //-------------------------------------
    // //\\ prepares points
    //-------------------------------------
    //----------------------------------
    // //\\ curve pars
    //      points for divided
    //      differences interpolation
    //----------------------------------
    /*
    var minusX1 = 148 -  sf.modorInPicX;
    var minusX2 = 161 -  sf.modorInPicX;
    var minusX3 = 202 -  sf.modorInPicX;
    var minusX4 = 259 -  sf.modorInPicX;
    var minusX5 = 305 -  sf.modorInPicX;
    var minusX6 = B[0] -  sf.modorInPicX;
    var minusX7 = 353 -  sf.modorInPicX;
    var minusX8 = 360.5 -  sf.modorInPicX;
    */
    var givenCurve_pivots = [
        //extending the curve to the left is quite a work bs
        //we need to change hard-coded tangent
        // [86,75],
        // [135,64],
        // [100,75],
        // [10,151],

        [148,62],
        [161,64],
        [202,75],
        [259,100],
        [305,135],
        [B[0], B[1]],
        [353,203],
        //[360.5, 239.0], //"oversampling"
    ];
    {
        const MONITOR_Y_FLIP = -1;
        const inn2mod_scale = 1/sf.mod2inn_scale;
        const factor = MONITOR_Y_FLIP * inn2mod_scale;
        sf.givenCurve_pivots_inModel = givenCurve_pivots.map( opoint =>
            [ ( opoint[0] -  sf.modorInPicX ) * inn2mod_scale,
                ( opoint[1] - sf.modorInPicY +

                //additional tune-up: shifting curve exactly into origin A
                sf.modorInPicY - 61.085869

                ) * factor,
            ]
        );
    }
    //----------------------------------
    // \\// curve pars
    //----------------------------------
    //-------------------------------------
    // \\// prepares points
    //-------------------------------------

    Object.assign( originalPoints, {
        //:context
        //axis-y addendum
        'ytop' : {
            pos             : ytop,
            letterAngle     : 90,
            caption         : 'axis y',
            letterRotRadius : 35,
            pcolor          : context,
        },
        "ylow" : {
            letterAngle : 90,
        },
        O : {
            letterAngle : -90,
            pcolor : given,
        },
        'axis-y_X_rd' : {
        },

        //axis-x addendum
        'xtop' : {
            letterAngle     : 130,
            caption         : 'axis x',
            letterRotRadius : 40,
            //pcolor : given,
        },
        "xlow" : {
            letterAngle : 90,
        },

        //beyond X and L to enable show of tangent angle
        "line-AL-end" : {
        },

        //extends rd to show an angle
        "line-dr-start" : {
            letterAngle : 30,
        },
        ///modified point r, closer to d
        "dr-decorpoint" : {
            caption : 'r',
            pcolor      : proof,
            letterAngle : -90,
            letterRotRadius : 20,
        },

        "y0" : {
            caption     : 'yₒ',
            letterAngle : 225,
            pcolor      : given,
        },
        //By
        'y' : {
            caption     : 'y',
            letterAngle : 45,
            pcolor      : given,
        },
        //Ax
        x : {
            caption     : 'x',
            letterAngle : -45,
            pcolor      : given,
        },
        //Bx
        x0 : {
            caption     : 'xₒ',
            letterAngle : 135,
            pcolor      : given,
        },

        // //\\ magnified points
        'Y0' : {
            pos             : A,
            caption         : 'Yₒ',
            letterAngle     : 210,
            letterRotRadius : 50,
            pcolor          : proof,
        },
        //BY
        'Y' : {
            caption         : 'Y',
            letterAngle     : 180,
            letterRotRadius : 35,
            pcolor          : proof,
        },
        //AX0
        'X0' : {
            caption         : 'Xₒ',
            letterAngle     : -90,
            pcolor          : proof,
        },
        //BX
        'X' : {
            caption         : 'X',
            letterAngle     : -90,
            pcolor          : proof,
        },
        // \\// magnified points


        //:originals from Book
        A : {
            //assigment by reference to pos is safe:
            //no parasite links, pos is recalculated later
            pos         : A,
            letterAngle : 90,
            pcolor      : given,
        },
        r : {
            pos: r,
            letterAngle : 135,
            pcolor      : given,
        },
        R : {
            pos: R,
            letterAngle : 135,
            pcolor      : given,
        },
        B : {
            pos: B,
            letterAngle : 0,
            pcolor      : given,
        },
        /*
        'B-kernelx' : {
            cssClass : 'hover-width',
        },
        */

        C : {
            letterAngle : 45,
            letterRotRadius : 13,
            pcolor      : given,
        },

        D : {
            pos: D,
            letterAngle : 90,
            pcolor      : given,
        },
        DLeft : {
            letterAngle : 90,
            pcolor      : given,
            doPaintPname : false,
        },

        //proof
        b : {
            pos: b,
            letterAngle : 0,
            pcolor      : proof,
        },

        c : {
            letterAngle : 45,
            letterRotRadius : 13,
            pcolor      : proof,
        },


        d : {
            pos         : d,
            letterAngle : 90,
            pcolor      : proof,
        },

        curveStart  : {
            pos : [ A[0]-80, 0 ],
        },

        curveEnd : {
            pos : [B[0]+50,0],
        },
        curveLeftEnd : {
            pos : [250,100],
        },

        //lemma 7, coroll 1
        F : {
            letterAngle : 90,
            pcolor      : given,
        },
        G : {
            letterAngle : 90,
            pcolor      : given,
        },
        E : {
            letterAngle : 90,
            pcolor      : given,
        },
        e : {
            letterAngle : 90,
            pcolor      : proof,
        },
        L : {
            letterAngle : -45,
            pcolor      : result,
        },

    });

    //*********************************************
    // //\\ pcolor -> elected topics,
    //      colors can be set in points and
    //      then added to elected topics
    //*********************************************
    ///alternatively to this, you can set own colors for originalPoints
    ///by your own
    ns.eachprop( sf.originalPoints, (point,pname) => {
        point.pcolor = ns.haz( point, 'pcolor' ) ||
        tpid2arrc_elect[ pname ];
    });
    //*********************************************
    // \\// pcolor -> elected topics,
    //*********************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    sf.linesArray = nspaste( {}, [
        { 'Ad' : { pcolor : context } }, // used in proof
        { 'Ar' : { pcolor : given } },
        { 'Ab' : { pcolor : proof } },
        { "rd" : { pcolor : proof } },

        { 'dr-decorpoint,d' : { pcolor : proof } },
        { 'dr' : { pcolor : proof } },

        //l7
        { 'bd' : { pcolor : proof } },
        { 'BD' : { pcolor : given } },  //lemma 7, coroll 1
        { 'BF' : { pcolor : given } },
        { 'AF' : { pcolor : given } },
        { 'AG' : { pcolor : given } },
        { 'AE' : { pcolor : given } },
        { 'BG' : { pcolor : given } },
        { 'be' : { pcolor : proof } },

        //sin(x)/x
        { 'Br' : { pcolor : given } },

        { 'line-dr-start,dr-decorpoint' : { pcolor : proof, undisplay : true } },

            //:context
        { 'ylow,ytop' : { pcolor : context, } },
        { 'xlow,xtop' : { pcolor : context, } },
        { 'O,ytop'    : { pcolor : context, } },

        //cirle radius
        { 'AO'    : { pcolor : given, 'stroke-width' : 1, } },
        { 'A,DLeft'  : { pcolor : given, 'stroke-width' : 2, } },

        //cirle radius
        { 'BO'    : { pcolor : given, 'stroke-width' : 1, } },

            //x-drops to axix x
        { 'A,x0'  : { pcolor : given, 'stroke-width' : 1, } },
        { 'Bx'    : { pcolor : given, 'stroke-width' : 1, } },
            //y-drops to axix y
        { 'A,y0'  : { pcolor : given, 'stroke-width' : 1, } },
        { 'By'    : { pcolor : given, 'stroke-width' : 1, } },

        //dy
        { 'y0,y' : { pcolor : given, 'stroke-width' : 8, } },
        //dx
        { 'x0,x' : { pcolor : given, 'stroke-width' : 8, } },

        { 'A,line-AL-end' : { pcolor : result } },

        //DY
        { 'A,Y' : { pcolor : proof, 'stroke-width' : 8, } },
        //DX
        { 'X0,X' : { pcolor : proof, 'stroke-width' : 8, } },

        //tangent
        { 'AL' : { pcolor : result } },
        { 'Ae' : { pcolor : proof } },

        { 'AE' : { pcolor : given } },
        { 'BE' : { pcolor : given } },
        { 'AB' : { pcolor : given } },
        { 'AD' : { pcolor : given } },
    ]);
    //*************************************
    // \\// original app lines
    //*************************************
}
})();

