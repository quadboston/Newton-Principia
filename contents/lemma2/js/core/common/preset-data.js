// //\\// App config

( function () {
    var {
        sn,
        sapp, ss, sconf,
        fconf,
        stdMod, rg,
    } = window.b$l.apptree({
        setModule,
    });
    return;




    function setModule()
    {
        var study       = sn('study', ss );
        var sdata       = sn('sdata', study );
        var dr          = sn('datareg', ss );
        var appstate    = sn('appstate', ss );

        ss.presetData = function()
        {
            //=====================================
            // //\\ presets data
            //=====================================
            Object.assign( dr,
            {
                svgSeg          : stdMod.mmedia$(),
                basePts         : {offset:1, visOffset:0, list:[]},
                curvPts         : {offset:1, visOffset:0, list:[]},
                leftPts         : {offset:0, visOffset:0, list:[]},
                righPts         : {offset:0, visOffset:0, list:[]},
                righRects       : {offset:0, visOffset:0, list:[]},
                leftRects       : {offset:0, visOffset:0, list:[]},
                baseLabels      : {offset:1, visOffset:0, list:[]},
                curvLabels      : {offset:0, visOffset:0, list:[]},
                leftLabels      : {offset:0, visOffset:0, list:[]},
                righLabels      : {offset:0, visOffset:0, list:[]},
                figureBasics    : {minX:0, maxX:0, baseY:0, deltaOnLeft:true},
                ctrlPts         : [],
                baseWidths      : fconf.sappId === 'lemma3' ? sconf.baseWidths_for_lemma3 : [],
                bases           : 4,
                movables        : {} //key-value for movable jswrap
            });

            appstate.movingBasePt = false;
            appstate.showRectPts  = false;
            sdata.view = { isClaim:1, isInscribed:1, isCircumscribed:1 };
            //=====================================
            // \\// presets data
            //=====================================
        };
    }
}) ();


