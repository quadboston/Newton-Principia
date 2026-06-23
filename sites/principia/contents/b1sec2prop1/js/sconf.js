(function(){
const { sn, haff, has, eachprop, nspaste, capture, toreg,
        stdMod, fconf, sconf, ssF, ssD, sDomF, originalPoints,
      } = window.b$l.atree({ ssFList: {
        init_conf
}});
const linesArray = sn( 'linesArray', sconf, [] );
return;


function init_conf (){
    //====================================================
    // //\\ user scenarios
    //====================================================
    sconf.enableCapture = true;
    //====================================================
    // \\// user scenarios
    //====================================================

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    sconf.medWidth = 687;
    sconf.medHeight = 657;
    sconf.medsizeScale = (sconf.medWidth + sconf.medHeight)
                          / sconf.medsize_standard;
    sconf.innerMediaHeight = sconf.medHeight +
          sconf.SLIDERS_LEGEND_HEIGHT;
    sconf.innerMediaWidth = sconf.medWidth;

    //----------------------------------
    // //\\ app view parameters,
    //      in svg or media space,
    //----------------------------------
    sconf.medposOfModOrigin_x = 47; //28
    var activeAreaOffsetOnPictureY = 0;
    sconf.pictureActiveArea = 611 - activeAreaOffsetOnPictureY;
    //  lemma-model coordinate y
    //  -1 if it goes in opposite-to-screen
    //      direction starting from
    //      medposOfModOrigin_y
    //  1  codirectional with the screen
    //     which means from screen-top to
    //      screen bottom
    const MONITOR_Y_FLIP = -1;

    //done in picture-system y-coord:
    //(pic.bottom-y=+picHeight)
    sconf.medposOfModOrigin_y = activeAreaOffsetOnPictureY +
        sconf.pictureActiveArea;
    //.set it from graph editor
    //.todm: trully 611 and rotated
    //for Y:
    //----------------------------------
    // \\// app view parameters,
    //----------------------------------
    const medposA = [531, 613];
    const medposB = [582, 425];
    //medposC=[546,264]
    //medposD=[448,152]
    //medposE=[299.5,98.5]
    //medposF=[117.5,112.5]

    //----------------------------------
    // //\\ mod2med and speed v0
    //----------------------------------
    let legacyTimeStep = 0.75; //for case we do change initialTimieStep
    let initialTimieStep = 0.75;
    {
        const mp = sconf.modelPoints = {};
        const uu = [ medposB[0] - medposA[0], medposB[1] - medposA[1] ];
        const u2 = uu[0]*uu[0] + uu[1]*uu[1];
        const u = Math.sqrt( u2 );
        sconf.mod2med = u; //initial unit
        sconf.med2mod = 1/sconf.mod2med;
        mp.v0 = [
            uu[0]*sconf.med2mod / initialTimieStep,
            uu[1]*sconf.med2mod / initialTimieStep *
                MONITOR_Y_FLIP
        ];
    }
    //----------------------------------
    // \\// mod2med and speed v0
    //----------------------------------
    //----------------------------------
    // \\// picture points medpos
    //----------------------------------
    //***************************************************************
    // \\// original picture dimensions for svg scene
    //***************************************************************

    //***************************************************************
    // //\\ GUI cosmetics
    //      to see templates what to override here, do
    //      look at conf/conf.js or especally at conf/lemma.conf.js:
    //      //t/sf.text_nonhover_width   = 0.01;
    //***************************************************************
    sconf.APP_MODEL_Y_RANGE = sconf.pictureActiveArea
          / sconf.mod2med;
    sconf.areaScale = 1 / sconf.APP_MODEL_Y_RANGE
                        / sconf.APP_MODEL_Y_RANGE;
    //affects drag hanldes in p1
    sconf.pointDecoration.r = Math.floor( 5 * sconf.medsizeScale );

    Object.assign( sconf, {
        SLIDERS_OFFSET_Y : 0,
        GENERIC_SLIDER_HEIGHT_Y : 30,
        SLIDER_TEXT_POZ_Y_FACTOR : 0.7,

        default_tp_lightness : 30,
        mediaBgImage : "../js/img/b1s2p1t1.png",
        thickness           : 1,
        default_tp_stroke_width : 10,

        //0.5 is good for areas, bad for lines,
        //so, lines shold have color pattern [x,x,x,1,1]
        TP_OPACITY_LOW : 0.5,
        TP_OPACITY_HIGH : 1,

       hover_width : Math.max( 10,
                     Math.floor( 7*sconf.medsizeScale/1.6 ) ),
        //nonhover_width  : Math.max( 5, Math.floor(
        //           1*sconf.medsizeScale/1.6 ) ),
        //this collaborates with impulse line-segment, we are afraide to
        //keep this "undefined",
        nonhover_width : 5,
    });
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //******************************************
    // //\\ model principals parameters
    //******************************************
    //----------------------------------------------------
    // //\\  prepares sconf data holder
    //----------------------------------------------------
    let dtMin = 0.08;
    let stepsRange = 14;
    let timeRange = stepsRange*initialTimieStep;
    let numberOfManyBases = stepsRange*2;
    let timeStepOfManyBases = initialTimieStep/4;
    let unitlessMinTime = 1.000001;
    let speed = 1/initialTimieStep;

    Object.assign( sconf, {
         NUMBER_OF_FORCE_HANDLES : 1, //5,

        //"true" means timer slider shows "proof logic",
        //otherwise it shows "physical motion",
        TIMER_AND_LOGIC_STEPS_COINSIDE : false,

        FIRST_POINT_LABELS_DISPLAY_LIMIT : 1000,
        //to hide gracefully: was: 1.2

        //----------------
        // //\\ math model
        //----------------
        force :
        [
            //[ -2, 3.9 ], //apparently, the first number
            //is a power n for f=Ar^n
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
        //----------------
        // \\// math model
        //----------------
    });
    //----------------------------------------------------
    // \\// prepares sconf data holder
    //----------------------------------------------------
    //******************************************
    // \\// model principals parameters
    //******************************************

    //***************************************************************
    // //\\ math model auxilaries
    //***************************************************************
    //***************************************************************
    // \\// math model auxilaries
    //***************************************************************

    //***************************************************************
    // //\\ model comparison demo
    //***************************************************************
    //***************************************************************
    // \\// model comparison demo
    //***************************************************************


    ssF.setsCommonT1andT2capture();
    //this comes from theorem P2; this does not exist in P1;
    if( has( ssF, 'init_conf_addon' ) ) {
        haff( ssF, 'init_conf_addon' );
    } else {
        ssF.makesProfessorsCaptureFootnotes();
    }

    //*************************************
    // //\\ elected colors,
    //*************************************
    ///does import topic colors from conf/lemma.conf.js
    stdMod.sconf_points8lines();
    //*************************************
    // \\// elected colors,
    //*************************************

    //*************************************
    // //\\ original app points
    //*************************************
    //*************************************
    // //\\ bricks for originalPoints
    //*************************************
    //*************************************
    // \\// bricks for originalPoints
    //*************************************
    //-------------------------------------
    // //\\ prepares points
    //-------------------------------------
    //-------------------------------------
    // \\// prepares points
    //-------------------------------------
    //in stdMod.sconf_points8lines();
    //*************************************
    // \\// original app points
    //*************************************

    //*********************************************
    // //\\ pcolor -> elected topics,
    //      colors can be set in points and
    //      then added to elected topics
    //*********************************************
    //*********************************************
    // \\// pcolor -> elected topics,
    //*********************************************

    //*************************************
    // //\\ original app lines
    //*************************************
    //in stdMod.sconf_points8lines();
    //*************************************
    // \\// original app lines
    //*************************************
    ssF.sets_A_v_forces_sliders();
}
})();
