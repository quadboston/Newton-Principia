(function(){
    const {
        sn, haff, has, eachprop, nspaste, capture, toreg,
        stdMod, fconf, sconf, ssF, ssD, sDomF,
        topicColors_repo, topicColors_repo_camel2col, originalPoints,
    } = window.b$l.apptree({ ssFExportList : { init_conf } });
    const linesArray = sn( 'linesArray', sconf, [] );
    return;


function init_conf (){
    ccc( 'init_conf' );
    //----------------------------------
    // //\\ scenario
    //----------------------------------
    sconf.enableStudylab = false;
    //hideProofSlider = true, //false,
    sconf.enableCapture = true;
    sconf.enableTools = true;
    //enableDataFunctionsRepository : true,
    //----------------------------------
    // \\// scenario
    //----------------------------------
     
    //----------------------------------
    // //\\ picture points medpos
    //----------------------------------
    sconf.pictureWidth = 687;
    sconf.pictureHeight = 657;
    sconf.controlsScale = (sconf.pictureWidth + sconf.pictureHeight)
                          / sconf.standardSvgSize
    sconf.innerMediaHeight = sconf.pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT;
    sconf.innerMediaWidth = sconf.pictureWidth;
                          
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
    sconf.MONITOR_Y_FLIP = -1;
    sconf.pictureActiveArea = 611 - activeAreaOffsetOnPictureY;

    sconf.originX_onPicture = 47; //28
    //todm duplication?
    sconf.modorInPicX = sconf.originX_onPicture;

    //done in picture-system y-coord:
    //(pic.bottom-y=+picHeight)
    sconf.originY_onPicture = activeAreaOffsetOnPictureY +
        ( sconf.MONITOR_Y_FLIP === -1 ? sconf.pictureActiveArea : 0 );
    //todm duplic?        
    sconf.modorInPicY = sconf.originY_onPicture;
    //.set it from graph editor
    //.todm: trully 611 and rotated
    //for Y:
    sconf.APP_MODEL_Y_RANGE = sconf.pictureActiveArea / sconf.mod2inn_scale;
    sconf.areaScale = 1 / sconf.APP_MODEL_Y_RANGE
                        / sconf.APP_MODEL_Y_RANGE;
    sconf.LEGEND_NUMERICAL_SCALE = 1; //todm what is this?
    //----------------------------------
    // \\// app view parameters
    //----------------------------------
    const medposA = [531, 613];
    const medposB = [582, 425];
    //medposC=[546,264]
    //medposD=[448,152]
    //medposE=[299.5,98.5]
    //medposF=[117.5,112.5]
    //----------------------------------
    // \\// picture points medpos
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
    let unitlessMinTime = 1.000001;
    let speed = 1/initialTimieStep;
    
    fconf.DRAGGER_TOLERANCE = 10; // distance where crosshair appears
    //affects drag hanldes in p1
    sconf.pointDecoration.r = Math.floor( 5 * sconf.controlsScale );
    Object.assign( sconf, {
        //======================================
        // //\\ does shape GUI
        //======================================
        hover_width : Math.max( 10, Math.floor( 7*sconf.controlsScale/1.6 ) ),
        //nonhover_width  : Math.max( 5, Math.floor( 1*sconf.controlsScale/1.6 ) ),
        //this collaborates with impulse line-segment, we are afraide to
        //keep this "undefined",
        nonhover_width : 5,

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
        //======================================
        // \\//does shape GUI
        //======================================

        NUMBER_OF_FORCE_HANDLES : 1, //5,

        TIMER_AND_LOGIC_STEPS_COINSIDE : false,
        FIRST_POINT_LABELS_DISPLAY_LIMIT : 1000, //to hide gracefully: was: 1.2

        //----------------
        // //\\ math model
        //----------------
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
        //----------------
        // \\// math model
        //----------------
    });
    //----------------------------------------------------
    // \\// prepares sconf data holder
    //----------------------------------------------------

    //----------------------------------
    // //\\ mod2inn_scale and speed v0
    //----------------------------------
    {
        const mp = sconf.modelPoints = {};
        const uu = [ medposB[0] - medposA[0], medposB[1] - medposA[1] ];
        const u2 = uu[0]*uu[0] + uu[1]*uu[1];
        const u = Math.sqrt( u2 );
        sconf.mod2inn_scale = u; //initial unit
        sconf.inn2mod_scale = 1/sconf.mod2inn_scale;
        mp.v0 = [
            uu[0]*sconf.inn2mod_scale / sconf.initialTimieStep,
            uu[1]*sconf.inn2mod_scale / sconf.initialTimieStep *
                sconf.MONITOR_Y_FLIP
        ];
    }
    //----------------------------------
    // \\// mod2inn_scale and speed v0
    //----------------------------------
    
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
