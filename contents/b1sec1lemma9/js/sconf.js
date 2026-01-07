(function(){
    const { sconf, paste, fconf, rg } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


function init_conf(){
    //----------------------------------
    // //\\ study model parameters
    //----------------------------------
    var APP_MODEL_Y_RANGE = 1000;
    //----------------------------------
    // \\// study model parameters
    //----------------------------------

    //====================================================
    // //\\ subapp regim switches
    //====================================================
    sconf.enableStudylab            = false;
    sconf.enableTools               = false;
    //sconf.rgShapesVisible           = true;
    //====================================================
    // \\// subapp regim switches
    //====================================================

    //----------------------------------
    // //\\ paper diagram parameters
    //----------------------------------
    var pictureWidth    = 504;
    var pictureHeight   = 495;

    var pointA          = [ 28, 456 ];
    var pointe          = [ 28, 46 ];

    var modorInPicX = pointA[0];
    var modorInPicY = pointA[1];
    //.set it from graph editor
    var pictureActiveArea = pointA[1] - 46;

    var mod2inn_scale = pictureActiveArea / APP_MODEL_Y_RANGE;
    var originX_onPicture = pointA[0];
    var originY_onPicture = pointA[1];
    //----------------------------------
    // \\// paper diagram parameters
    //----------------------------------

    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************
    //to comply standard layout, one must add these 2 lines:
    var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
    var controlsScale = realSvgSize / sconf.standardSvgSize

    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 20;
    //overrides "global", lemma.conf.js::sconf
    //sconf.pointDecoration.r= 3;
    sconf.pointDecoration.r= 4;

    //--------------------------------------
    // //\\ does override engine defaults,
    //      in expands-conf.js,
    //--------------------------------------
    sconf.default_tp_lightness = 30;
    sconf.TP_OPACITY_FROM_fixed_colors = true;
    default_tp_stroke_width = Math.floor( 6 * controlsScale ),
    defaultLineWidth        = Math.floor( 1 * controlsScale ),
    handleRadius            = Math.floor( 3 * controlsScale ),

    // //\\ principal tp-css pars
    //      see: topics-media-glocss.js
    //this makes hanle's border nicely thin
    sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
    sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

    //make effect apparently only for line-captions,
    //not for point-captions bs
    //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
    sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
    sconf.text_hover_width      = 1.5;
    // \\// principal tp-css pars
    // \\// does override engine defaults,
    // \\// decorational parameters
    //***************************************************************


    //----------------------------------------------------
    // //\\  prepares sconf data holder
    //----------------------------------------------------
    //-----------------------------------
    // //\\ topic group colors,
    //      todm: possibly proliferation
    //-----------------------------------
    var given   = [0,     150, 0, ];
    var proof   = [0,     0,   255, ];
    var result  = [200,   40,  0,  ];
    var hidden  = [0,     0,   0,  ];


    var topicColors_elected =
    {
        given,
        proof,
        result,
        hidden,

        //:curves
        "ABC"               : given,
        "mainCurve"         : given,
        "Abc"               : proof,
        "remoteCurve"       : proof,

        //:areas
        "ABD"               : given,
        "ACE"               : given,
        "area-ABD"               : given,
        "area-ACE"               : given,
        "Abd"               : proof,
        "Ace"               : proof,
        "area-Abd"               : proof,
        "area-Ace"               : proof,
        //:linear areas
        "Afd"               : result,
        "Age"               : result,

        "ABDPerACE"         : given,
        "AD2PerAE2"         : result,
    };
    //-----------------------------------
    // \\// topic group colors,
    //-----------------------------------


    var originalPoints =
    {
        'A' : {
            pos         : pointA,
            pcolor      : given,
            letterAngle : -90,
        },
        'e' : {
            pos         : pointe,
            pcolor      : proof,
            letterAngle : 90,
        },

        'B' : {
            pcolor      : given,
            letterAngle : 0,
        },
        'C' : {
            pcolor      : given,
            letterAngle : -45,
        },
        'D' : {
            pcolor      : given,
            letterAngle : 215,
            initialR : 4,
        },
        'E' : {
            pcolor      : given,
            letterAngle : 180,
        },
        'b' : {
            pcolor      : proof,
            letterAngle : 0,
        },
        'c' : {
            pcolor      : proof,
            letterAngle : -90,
        },
        'd' : {
            pcolor      : proof,
            letterAngle : 180,
        },

        'F' : {
            pcolor      : given,
            letterAngle : 135,
        },
        'G' : {
            pcolor      : given,
            letterAngle : 45,
        },
        'f' : {
            pcolor      : proof,
            letterAngle : 90,
        },
        'g' : {
            pcolor      : proof,
            letterAngle : 90,
        },

        'pivotPoint1' : {
            pcolor      : proof,
            doPaintPname : false,
            letterAngle : 90,
        },

        'pivotPoint2' : {
            pcolor      : given,
            letterAngle : 90,
            doPaintPname : false,
        },
    };

    var linesArray =
    [
        { 'Ab' : { pcolor : proof } },
        { 'Ac' : { pcolor : proof } },
        { 'Ad' : { pcolor : result } },
        { 'Ae' : { pcolor : result, 'stroke-width' : 4 } },

        { 'Ag' : { pcolor : result, 'stroke-width' : 4, } },

        { 'ec' : { pcolor : proof } },
        { 'db' : { pcolor : proof } },

        { 'AB' : { pcolor : given } },
        { 'AC' : { pcolor : given } },
        { 'AD' : { pcolor : given } },
        { 'AE' : { pcolor : given,
            'stroke-width' : 1, } },
        { 'AG' : { pcolor : given } },
        { 'EC' : { pcolor : given } },
        { 'DB' : { pcolor : given } },
    ];


    to_sconf =
    {
        //----------------------------------
        // //\\ scenario
        //----------------------------------
        hideProofSlider : false,
        hideProofSliderCompletely : false,
        //----------------------------------
        // \\// scenario
        //----------------------------------


        //----------------------------------
        // //\\ original lemma parameters
        //----------------------------------
        curvePivots :
        [
            [0, 0],
            //The bezier middle pivot is constrained in "model-upcreate.js"
            //beginning of "model_upcreate" function.
            [440, APP_MODEL_Y_RANGE],
            [ 1060, 567 ]

            /* very good for debug: simple curve
            [0, 0],
            [500, 1000],
            [1000, 0]
            */
        ],


        //*************************************************
        // //\\ lemma model parameters
        //*************************************************
        APP_MODEL_Y_RANGE,
        //:ranges
        angleA_min : 5.71,  //Degrees
        pivot1y_max : APP_MODEL_Y_RANGE * 0.99,  //Left here for lemma 10
        pivot2x_max : APP_MODEL_Y_RANGE * 1.8,
        pivot2y_min : APP_MODEL_Y_RANGE * 0.3,
        pivot2y_max : APP_MODEL_Y_RANGE * 0.99,

        //bezier parameter t of point C on principal curve,
        //This value ensures line EC not too high and
        //upper bezier curve not cutoff.
        tC : 0.48,

        claimRatio : 0.74081,
        //range:
        claimRatio_max : 0.9, //Dy_per_Ey


        tiltAngle : 0.0, //controls EC-line tilt:
                         //in degrees;  0.0 is horizontal;
                         //from perspective of point E
                         //(+ve when C y above E y);
        //:ranges
        tiltAngle_min   : -15,
        tiltAngle_max   : 40,

        Cx_min          : 0.1,
        //*************************************************
        // \\// lemma model parameters
        //*************************************************
        //----------------------------------
        // \\// original lemma parameters
        //----------------------------------



        //----------------------------------
        // //\\ model-view parameters
        //----------------------------------
        //100; //display in "percents" of Ae
        LEGEND_NUMERICAL_SCALE : 100,

        modorInPicX,
        modorInPicY,
        //thickness           : 400,
        //----------------------------------
        // \\// model-view parameters
        //----------------------------------
    };
    to_sconf.areaScale = 1 / to_sconf.APP_MODEL_Y_RANGE
                            / to_sconf.APP_MODEL_Y_RANGE;
    //----------------------------------
    // \\// prepares sconf data holder
    //----------------------------------------------------



    //----------------------------------------------------
    // //\\ copy-pastes to sconf
    //----------------------------------------------------
    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 30;

    paste( sconf,
        paste( to_sconf,
        {
            //double back step ../../ is to reuse this path in code for twin-lemma
            mediaBgImage : "../../b1sec1lemma9/img/lemma9-original.png",

            linesArray,
            topicColors_elected,
            originalPoints,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
        })
    );
    //----------------------------------------------------
    // \\// copy-pastes to sconf
    //----------------------------------------------------
}
})();