( function () {
    var {
        sn,
        fapp, fconf, sapp,
        stdMod, rg,
    } = window.b$l.apptree({
    });
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var sdata       = sn('sdata', study );
    var dr          = sn('datareg', stdL2 );
    var appstate    = sn('appstate', stdL2 );

    //=====================================
    // //\\ presets data
    //=====================================
    Object.assign( dr,
    {
        basePts         : {offset:1, visOffset:0, list:[]},
        curvPts         : {offset:1, visOffset:0, list:[]},
        circRects       : {offset:0, visOffset:0, list:[]},
        InscrRects       : {offset:0, visOffset:0, list:[]},
        //baseLabels      : {offset:1, visOffset:0, list:[]},
        curvLabels      : {offset:0, visOffset:0, list:[]},
        leftLabels      : {offset:0, visOffset:0, list:[]},
        //righLabels      : {offset:0, visOffset:0, list:[]},
        //deltaOnLeft historically means "virtual majoranta-rectangle"
        //is on the right
        figureParams    : {minX:0, maxX:0, baseY:0, deltaOnLeft:true},
        ctrlPts         : [],
        partitionWidths      : [],
        basesN         : 4,
        movables        : {} //key-value for movable jswrap
    });
    appstate.movingBasePt = false;
    sdata.view = { isInscribed:1, isCircumscribed:1, isFigureChecked:1 };
    //=====================================
    // \\// presets data
    //=====================================

}) ();


