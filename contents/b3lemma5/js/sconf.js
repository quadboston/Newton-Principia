( function() {
    const { sn, haz, nspaste, fconf, fapp, sf, sconf,
            tpid2arrc_elect, } =
        window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


function init_conf()
{

    //======================================
    // //\\ scenario
    //======================================
    //progr:
    sf.dontRun_ExpandConfig = true;
    //user:
    sf.enableStudylab = true;
    sf.hideProofSlider = true;
    sf.enableCapture = true;
    sf.enableDataFunctionsRepository = true;
    //======================================
    // \\// scenario
    //======================================

    //***************************************************************
    // //\\ original picture dimensions for svg scene
    //***************************************************************
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    var pictureWidth = 1340;
    var pictureHeight = 864;

    //to comply standard layout, one must add these 2 lines:
    var realSvgSize = ( pictureWidth + pictureHeight ) / 2;
    var controlsScale = haz( sconf, 'controlsScale' ) ||
                        ( realSvgSize / sconf.standardSvgSize );

    sf.modorInPicX = 98.0;
    var modorInPicY = 474;

    sf.modorInPicY = modorInPicY;
    sf.originX_onPicture = sf.modorInPicX;
    sf.originY_onPicture = modorInPicY;

    sf.innerMediaHeight = pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT;
    sf.innerMediaWidth = pictureWidth;

    //--------------------------------------
    // //\\ original-book picture parameters
    //--------------------------------------
    sf.basePairs =
    [
        [
            { H : [sf.modorInPicX, modorInPicY] }, //abscissa
            { A : [0, 159] },                      //ordinate
        ],
        [
            { I : [329, modorInPicY] },
            { B : [0, 96] },
        ],
        [
            { K : [563, modorInPicY] },
            //C : [561, 157],
            { C : [0, 157] },
        ],
        [
            { L : [781, modorInPicY] },
            //D : [783, 345],
            { D : [0, 345] },
        ],
        [
            { M : [1005, modorInPicY] },
            //E : [1008, 588],
            { E : [0, 588] },
        ],
        [
            { N : [1236, modorInPicY] },
            //F : [1239, 774],
            { F : [0, 774] },
        ],

        ///the last one is an approximatee
        [
            { S : [485, modorInPicY] },
            { R : [0, 119] },
        ],
    ];
    sf.basePairs.forEach( pair => {
        var x = pair[0];
        pair[0].l5key = Object.keys( x )[0];
        //makes in synch with pos
        pair[0].picturepos = x[ pair[0].l5key ];

        var y = pair[1];
        pair[1].l5key = Object.keys( y )[0];
        //makes in synch with pos
        pair[1].picturepos = y[ pair[1].l5key ];
        pair[1].picturepos[0] = pair[0].picturepos[0]; // = abscissa
    });
    //--------------------------------------
    // \\// original-book picture parameters
    //--------------------------------------

    //------------------------------------------------------------
    // //\\ derives initial model parameters from picture's points
    //------------------------------------------------------------
    //appar. as by I.N.: difference between two first x-points:
    sf.mod2med = sf.basePairs[1][0].picturepos[0] -
                       sf.basePairs[0][0].picturepos[0];
    sf.med2mod = 1/sf.mod2med;
    //------------------------------------------------------------
    // \\// derives initial model parameters from picture's points
    //------------------------------------------------------------
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
    sf.default_tp_lightness = 30; //todm no effect
    sf.default_tp_stroke_opacity = 2;
    sf.defaultLineWidth = 2;
    sf.handleRadius = 8,
    sf.pointDecoration.r = sf.handleRadius;
    sf.thickness =1;
    //***************************************************************
    // \\// GUI cosmetics
    //***************************************************************

    //----------------------------------
    // //\\ MONITOR Y FLIP
    //----------------------------------
    //  application coordinate Y
    //  -1 if it goes in opposite-to-screen
    //      direction starting from
    //      centerY_onPicture
    //  1  codirectional with the screen
    //     which means from screen-top to
    //      screen bottom
    sf.MONITOR_Y_FLIP = -1;
    //----------------------------------
    // \\// MONITOR Y FLIP
    //----------------------------------

    //------------------------------------------------------------
    // //\\ derives initial model parameters from picture's points
    //------------------------------------------------------------
    sf.pntRgid2rgx = {}; //todo align with expand-conf
    //var initialModPoints;
    var factor = sf.MONITOR_Y_FLIP * sf.med2mod;
    (function() {
        sf.basePairs.forEach( bpair => {
            bpair.forEach( point => {
                var pp = point.picturepos;
                var l5key = point.l5key;
                var pos = [ pp[0] - sf.modorInPicX, pp[1] - modorInPicY ];
                point.pos = [ pos[0]*sf.med2mod, pos[1]*factor ];
                sf.pntRgid2rgx[l5key] = point;
            });
        });
    })();
    //adds model's origin
    sf.pntRgid2rgx.O = { pos:[0,0], l5key : 'O' };
    //-------------------------------------------------------------
    // \\// derives initial model parameters from picture's points
    //-------------------------------------------------------------

    nspaste( tpid2arrc_elect, {
        "given"          : [0,     50, 0,      1],
        "experimental"   : [0,     0,   255,    1],
        "approximator"   : [255,   0,   0,      1]
    });

    //todm not automated, prolifer.
    fapp.normalizeSliders( pictureHeight / 444 );
};
})();
