// //\\// App config

( function () {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var $$          = ns.$$;    
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp');
    var sDomN       = sn('dnative', sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    
    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000






    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var dr          = sn('datareg', l23 );
        var appstate    = sn('appstate', l23 );

        l23.presetData = function()
        {
            //=====================================
            // //\\ presets data
            //=====================================
            Object.assign( dr,
            {
                svgSeg          : studyMods[ SUB_MODEL ].mmedia$(),

                polylineCurve   : document.getElementById( 'polylineCurve' ),
                figureInternalArea : document.getElementById( 'figureInternalArea' ),

                //tod? right: 
                baseAxis        : document.getElementById( 'baseAxis' ),
                //baseAxis        : document.getElementById( 'base' ),

                wallL           : document.getElementById( 'wallL' ),
                wallR           : document.getElementById( 'wallR' ),

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


