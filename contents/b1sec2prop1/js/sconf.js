(function(){
    const {
        sn, haff, has, eachprop, nspaste, capture, toreg,
        stdMod, fconf, sconf, ssF, ssD, sDomF,
        fixedColors, fixedColorsOriginal,
    } = window.b$l.apptree({ ssFExportList : { init_conf } });
    const linesArray = sn( 'linesArray', sconf, [] );
    return;


function init_conf (){
    ccc( 'init_conf' );
    //----------------------------------
    // //\\ original material parameters
    //----------------------------------
    //point e    28x46
    //point A    28x456
    sconf.pictureWidth = 687;
    sconf.pictureHeight = 657;
    {
        let realSvgSize = sconf.pictureWidth + sconf.pictureHeight;
        sconf.controlsScale = realSvgSize / sconf.standardSvgSize
    }
    fconf.DRAGGER_TOLERANCE = 10; // distance where crosshair appears

    //----------------------------------
    // //\\ app view parameters
    //      ,in svg or media space,
    //----------------------------------
    var activeAreaOffsetOnPictureY = 0;
    //  lemma-model coordinate y
    //  -1 if it goes in opposite-to-screen
    //      direction starting from
    //      modorInPicY
    //  1  codirectional with the screen
    //     which means from screen-top to
    //      screen bottom
    var MONITOR_Y_FLIP = -1;
    var pictureActiveArea = 611 - activeAreaOffsetOnPictureY;

    const originX_onPicture = 47; //28
    var modorInPicX = originX_onPicture;

    //done in picture-system y-coord:
    //(pic.bottom-y=+picHeight)
    const originY_onPicture = activeAreaOffsetOnPictureY +
        ( MONITOR_Y_FLIP === -1 ? pictureActiveArea : 0 );
    var modorInPicY = originY_onPicture;
    //.set it from graph editor
    //.todm: trully 611 and rotated
    //----------------------------------
    // \\// app view parameters
    //----------------------------------

    //sconf.pointDecoration.r = 5; // todo: why this doesn't work?

    var initialPath =
    [
        { name:'A', pos:[531, 613] },
        { name:'B', pos:[582, 425 ] },
        /*
        { name:'C', pos:[546,264] },
        { name:'D', pos:[448,152] },
        { name:'E', pos:[299.5,98.5] },
        { name:'F', pos:[117.5,112.5] },
        */
    ];
    //----------------------------------
    // \\// original material parameters
    //----------------------------------

    //----------------------------------------------------
    // //\\  prepares sconf data holder
    //----------------------------------------------------
    let legacyTimeStep = 0.75; //for case we do change initialTimieStep
    let initialTimieStep = 0.75;
    let dtMin = 0.08;
    let stepsRange = 14;
    let timeRange = stepsRange*initialTimieStep;
    let numberOfManyBases = stepsRange*2;
    let timeStepOfManyBases = initialTimieStep/4;
    //let unitlessMinTime = 1.7500000;
    let unitlessMinTime = 1.000001;

    let speed = 1/initialTimieStep;
    to_sconf =
    {
        NUMBER_OF_FORCE_HANDLES : 1, //5,

        TIMER_AND_LOGIC_STEPS_COINSIDE : false,
        FIRST_POINT_LABELS_DISPLAY_LIMIT : 1000, //to hide gracefully: was: 1.2
        hover_width       : Math.max( 10, Math.floor( 7*sconf.controlsScale/1.6 ) ),
        //nonhover_width  : Math.max( 5, Math.floor( 1*sconf.controlsScale/1.6 ) ),
        //this collaborates with impulse line-segment, we are afraide to
        //keep this "undefined",
        nonhover_width : 5,

        SLIDERS_OFFSET_Y : 0,
        GENERIC_SLIDER_HEIGHT_Y : 30,
        SLIDER_TEXT_POZ_Y_FACTOR : 0.7,

        default_tp_lightness : 30,
        mediaBgImage : "../js/img/b1s2p1t1.png",

        //no dice: handleRadius : Math.floor( 13.5 * sconf.controlsScale ),

        //-----------
        // //\\ model
        //-----------
        force :
        [
            //[ -2, 3.9 ], //apparently, the first number is a power n for f=Ar^n
            //f=kr^n
            [   -2,                      //=n
                1.95 / initialTimieStep / initialTimieStep //=k
            ],

            [ -1, 0 ],
            [ 0, 0 ],
            [ 1, 0 ],
            [ 2, 0 ]
        ],

        //for T2.Cor2: accelerating areas:
        tangentialForcePerCentripetal_fraction : 0.4,

        speed,
        initialTimieStep,
        dtMin,
        numberOfManyBases,
        timeStepOfManyBases,
        timeRange,
        unitlessMinTime,
        //maximum first path from A to B
        //too big values will allow user to place
        //point B on legend area ... will look strange ...
        //s0max : 1.4,
        //-----------
        // \\// model
        //-----------



        //----------------------------------
        // //\\ model-view parameters
        //----------------------------------
        //100; //display in "percents" of Ae
        //LEGEND_NUMERICAL_SCALE : 100,
        LEGEND_NUMERICAL_SCALE : 1,

        MONITOR_Y_FLIP      : MONITOR_Y_FLIP,

        pictureActiveArea   : pictureActiveArea,
        modorInPicX,
        modorInPicY,
        innerMediaHeight    : sconf.pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
        innerMediaWidth     : sconf.pictureWidth,

        thickness           : 1,
        default_tp_stroke_width : 10,
        //hide_perp_P_and_alike : false,
        //----------------------------------
        // \\// model-view parameters
        //----------------------------------

        //----------------------------------
        // //\\ scenario
        //----------------------------------
        enableStudylab : false,
        //hideProofSlider : true, //false,
        enableCapture : true,
        enableTools : true,
        //enableDataFunctionsRepository : true,
        //----------------------------------
        // \\// scenario
        //----------------------------------

        //:for tools sliders: todo proliferation
        originX_onPicture : modorInPicX,
        originY_onPicture : modorInPicY,
    };

    //----------------------------------
    // //\\ spawns to_conf
    //----------------------------------
    (function () {
        var a = initialPath[0].pos; //in picture space
        var b = initialPath[1].pos;
        //:speed
        var uu = [ b[0] - a[0], b[1] - a[1] ];
        var u2 = uu[0]*uu[0] + uu[1]*uu[1];
        var u = Math.sqrt( u2 );
        //:
        var mod2inn_scale = u; //initial unit
        var inn2mod_scale = 1/mod2inn_scale;

        var vmodel = [
                uu[0]*inn2mod_scale / to_sconf.initialTimieStep, //* to_sconf.speed,
                MONITOR_Y_FLIP *
                uu[1]*inn2mod_scale / to_sconf.initialTimieStep, //* to_sconf.speed
        ];
        to_sconf.v0 = vmodel;
        //for Y:
        APP_MODEL_Y_RANGE = pictureActiveArea / mod2inn_scale;

        to_sconf.APP_MODEL_Y_RANGE = APP_MODEL_Y_RANGE;
        to_sconf.mod2inn_scale = mod2inn_scale;

        to_sconf.inn2mod_scale = inn2mod_scale;
        to_sconf.areaScale = 1 / to_sconf.APP_MODEL_Y_RANGE
                                / to_sconf.APP_MODEL_Y_RANGE;

        ///creates point A position in model
        to_sconf.A = [
            (a[0] - modorInPicX ) * inn2mod_scale,
            MONITOR_Y_FLIP *
            (a[1] - modorInPicY ) * inn2mod_scale
        ];

        //redundant ... v0 is enough ... do fix later
        ///creates point B position in model
        to_sconf.B = [
            //1, 1 //insignificant
            to_sconf.A[0] + vmodel[0] * initialTimieStep,
            to_sconf.A[1] + vmodel[1] * initialTimieStep,
        ];
        to_sconf.v = [
            to_sconf.A[0] + vmodel[0],
            to_sconf.A[1] + vmodel[1],
        ];
    })();
    //----------------------------------
    // \\// spawns to_conf
    // \\// prepares sconf data holder
    //----------------------------------------------------
    to_sconf.originalPoints = {
        A : {
            //pos: [...initialPath[0].pos], //todo redundant
        },
        S : { pos: [originX_onPicture, initialPath[0].pos[1] ]},
    };

    //----------------------------------------------------
    // //\\ copy-pastes to sconf
    //----------------------------------------------------
    Object.keys( to_sconf ).forEach( function( key ) {
        sconf[ key ] = to_sconf[ key ];
    });

    //affects drag hanldes:
    sconf.pointDecoration.r = Math.floor( 5 * sconf.controlsScale );
    //----------------------------------------------------
    // \\// copy-pastes to sconf
    //----------------------------------------------------

    ssF.setsCommonT1andT2capture();
    //this comes from theorem P2; this does not exist in P1;
    if( has( ssF, 'init_conf_addon' ) ) {
        haff( ssF, 'init_conf_addon' );
    } else {
        ssF.makesProfessorsCaptureFootnotes();
    }
    stdMod.sconf_points8lines();
    ssF.sets_A_v_forces_sliders();
}    
})();