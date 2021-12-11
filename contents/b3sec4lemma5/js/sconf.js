// //\\// widget config
( function() {
    var ns      = window.b$l;
    var mat     = ns.sn( 'mat' );
    var sn      = ns.sn;

    var fapp    = sn('fapp' ); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);
    var sapp    = sn('sapp'); 

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_conf';
    //var ccc         = console.log; ccc && ( ccc = console.log );
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return;









    function setModule()
    {
        ssF.init_conf = init_conf;
    }
    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //--------------------------------------
        // //\\ original-book picture parameters
        //--------------------------------------
        var pictureWidth = 1340;
        var pictureHeight = 864;

        var modorInPicX = 98.0;
        var modorInPicY = 474;


        var basePairs =
        [
            [
                { H : [modorInPicX, modorInPicY] }, //abscissa
                { A : [0, 159] },                               //ordinate
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
        basePairs.forEach( pair => {

            var x = pair[0];
            pair[0].pname = Object.keys( x )[0];
            pair[0].picturepos = x[ pair[0].pname ];       //makes in synch with pos

            var y = pair[1];
            pair[1].pname = Object.keys( y )[0];
            pair[1].picturepos = y[ pair[1].pname ];       //makes in synch with pos
            pair[1].picturepos[0] = pair[0].picturepos[0]; // = abscissa
        });
        //result is like this: basePairs =
        /*
        [
            [
                {
                    "H": [  //abscissa
                        98,
                        474
                    ],
                    "pname": "H",
                    "picturepos": [
                        98,
                        474
                    ]
                },
                {
                    "A": [  //ordinate
                        98,
                        159
                    ],
                    "pname": "A",
                    "picturepos": [
                        98,
                        159
                    ]
                }
            ],
            ....
        ]
        */
        //--------------------------------------
        // \\// original-book picture parameters
        //--------------------------------------



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
        var MONITOR_Y_FLIP = -1;
        //----------------------------------
        // \\// MONITOR Y FLIP
        //----------------------------------


        //---------------------------------------------------------------------------
        // //\\ derives initial model parameters from picture's points
        //---------------------------------------------------------------------------
        //appar. as by I.N.: difference between two first x-points:
        var mod2inn_scale = basePairs[1][0].picturepos[0] - basePairs[0][0].picturepos[0];
        var inn2mod_scale = 1/mod2inn_scale;

        var pname2point = {};
        //var initialModPoints;
        var factor = MONITOR_Y_FLIP * inn2mod_scale;
        (function() {
            basePairs.forEach( bpair => {
                bpair.forEach( point => {
                    var pp = point.picturepos;
                    var pname = point.pname;
                    var pos = [ pp[0] - modorInPicX, pp[1] - modorInPicY ];
                    point.pos = [ pos[0]*inn2mod_scale, pos[1]*factor ];
                    pname2point[pname] = point;
                });
            });
        })();


        //================================================================
        //ccc( 'pname2point', JSON.stringify( pname2point, null, '    ' ) );
        //ccc( 'basePairs', JSON.stringify( basePairs, null, '    ' ) );
        /*
        //In both pname2point and basePairs at this moment, the leaf-element,
        //the point has following format:
        sconf.pname2point[pname] = sconf.basePairs[NN][MM] =
        {
            "H": [
                98,
                474
            ],
            "pname": "H",
            "picturepos": [
                98,
                474
            ],
            "pos": [ //in model units and model-plane-space ...
                0,
                0
            ]
        },
        */
        //================================================================


        //adds model's origin
        pname2point.O = { pos:[0,0], pname : 'O' };
        //ccc( basePairs );
        //---------------------------------------------------------------------------
        // \\// derives initial model parameters from picture's points
        //---------------------------------------------------------------------------




        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        fapp.normalizeSliders( pictureHeight / 444 ); //todo not automated, prolifer.
        Object.assign( sconf, {
            mediaBgImage : "diagram.png",
            dontRun_ExpandConfig : true,

            MONITOR_Y_FLIP : MONITOR_Y_FLIP,
            //SLIDERS_LEGEND_HEIGHT,
            //SLIDERS_OFFSET_Y : -70,

            pname2point : pname2point,
            basePairs : basePairs,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            modorInPicX,
            modorInPicY,

            originX_onPicture   : modorInPicX,
            originY_onPicture   : modorInPicY,



            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,
            thickness           : 1,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            enableStudylab : true,
            hideProofSlider : true, //false,
            enableCapture : true,
            enableTools : true,
            enableDataFunctionsRepository : true,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            default_tp_stroke_opacity : 2,
            default_tp_stroke_width : 10,
            default_tp_lightness : 40, //50 is full lightness
            defaultLineWidth : 2,

            mod2inn_scale : mod2inn_scale,
            inn2mod_scale : inn2mod_scale,
            mod2inn_scale_initial : mod2inn_scale,
            inn2mod_scale_initial : inn2mod_scale,
        });
        //----------------------------------
        // \\// prepares sconf data holder
        //----------------------------------------------------
    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

