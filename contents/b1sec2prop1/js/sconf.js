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

        {
            ///--------------------------------------------------
            ///expands predefinedTopic colors into rg,
            ///fixedColors, and fixedColorsOriginal
            ///as in expands-conf.js
            ///--------------------------------------------------
            var { all_elected, p2_elected } = tpCamel__2__electedColArray();
            const tpel = all_elected;
            sconf.predefinedTopics = all_elected;
            ////array all_elected will be discraded upon leaving this function,
            Object.keys( all_elected ).forEach( tpCamel => {
                //generates rg for all topics,
                //this code is a substitute of expand-config.js
                toreg( tpCamel )( 'pname', tpCamel );
                var tpLowKey = sDomF.topicIdUpperCase_2_underscore( tpCamel );
                //compliments fixedColors from stuff created in this sconf,
                //fixedColors are based on non-Camel id,
                var fck = fixedColors[ tpLowKey ] = all_elected[ tpCamel ].concat();
                //compensates missing of "extend-confib" in engine core
                fixedColorsOriginal[ tpCamel ] = fck; //based on Camel Id
                //todo why rg colors are not set here?
            });
         }

         ///adds flag isPoint0Line to P2_electedTopicColors
         if( has( ssD, 'P2_electedTopicColors' ) ) {
             ////we are working in prop 2,
             ////above condition is a flag
             Object.keys( p2_elected ).forEach( camelId => {
                if( camelId === 'SBCaracc' ) return;
                let fc = fixedColorsOriginal[ camelId ];

                 //this thing only affects difference between strokable
                 //and areas like this:
                 //sconfOPACITY_LOW = isPoint0Line ?
                 //sconf.TP_OPACITY_LOW_POINT : sconf.TP_OPACITY_LOW;
                fc.isPoint0Line = true;
             })
         }


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
            dontRun_ExpandConfig : 0,

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
        //----------------------------------------------------
        // \\// copy-pastes to sconf
        //----------------------------------------------------

        //todo get rid all of this: let core do this:
         //Duplicate g and h used by P1 Corollary 3 see predefinedTopics for more
        'A B C D E F S c d e f P g h'.split(' ').forEach( camelId => {
            let fc = fixedColorsOriginal[ camelId ];
            fc.isPoint = true;
            fc.isPoint0Line = true;
        });
        //Duplicate Ch and Fg used by P1 Corollary 3 see predefinedTopics for more
        ( 'Ch Fg SP Av dt time Ff Ee Dd Cc ' +
        'force-0-applied force-1-applied force-2-applied ' +
        'force-3-applied force-4-applied')
        .split(' ')
            .forEach( camelId => {
                let fc = fixedColorsOriginal[ camelId ];
                laObj = {};
                laObj[ camelId ] = { pcolor : [...fc]};
                sconf.linesArray.push( laObj );
                fc.isLine = true;
                fc.isPoint0Line = true;
            });
        ssF.setsCommonT1andT2capture();
        //this comes from theorem P2; this does not exist in P1;
        if( has( ssF, 'init_conf_addon' ) ) {
            haff( ssF, 'init_conf_addon' );
        } else {
            ssF.makesProfessorsCaptureFootnotes();
        }
        stdMod.sconf_points8lines();
        ssF.sets_A_v_forces_sliders();
    };
    return;


    ///local function, discarded upon leaving parent function,
    function tpCamel__2__electedColArray (){
        const {
            force,

            freeMove,
            forceMove,
            diagram,
            path,
            time,
            sagittaeChords,
            speed,

            trianglePurpleTextAreaColor,
            triangleGreen,

            perpendicular,
            tangent,
        } = fixedColors;

        const all_elected = {
            speed,
            force,
            forceMove,
            time,                       //Time slider
            dt                  : time, //Delta time slider
            path,
            "path-change"       : path,

            //The following sets the color of the text in
            //the text area for these triangles.  If
            //these are placed after "kepler-triangle-odd" and
            //"kepler-triangle-even", they will
            //also set the triangle color in the model area.
            //If these are removed the triangles
            //default to red and green "zebra-colors"
            //(for more see "colors-lib.js" section
            //"generates pseudo-random zebra colors" in function
            //lowtpid__2__glocss8anchorRack).
            "SBC"               : trianglePurpleTextAreaColor,
            "SCD"               : trianglePurpleTextAreaColor,
            "SDE"               : trianglePurpleTextAreaColor,
            "SEF"               : trianglePurpleTextAreaColor,
            "SAB"               : trianglePurpleTextAreaColor,

            "kepler-triangle-odd"   : fixedColors["kepler-triangle-odd"],
            "kepler-triangle-even"  : fixedColors["kepler-triangle-even"],

            "sagitta-chords"    : sagittaeChords,

            "SBc"               : triangleGreen,
            "SCd"               : triangleGreen,
            "SDe"               : triangleGreen,
            "SEf"               : triangleGreen,

            "A"                 : path,
            "B"                 : path,
            "C"                 : path,
            "D"                 : path,
            "E"                 : path,
            "F"                 : path,

            "AB"                : path,
            "BC"                : path,
            "CD"                : path,
            "DE"                : path,
            "EF"                : path,

            "ABCV"              : forceMove,
            "DEFZ"              : forceMove,

            "Sc"                : diagram,
            "Sd"                : diagram,
            "Se"                : diagram,
            "Sf"                : diagram,

            "Cc"                : forceMove,
            //Duplicate of "Cc" used by P1 Corollary 3.
            //Also referenced in cohen.txt
            "Ch"                : forceMove,
            "Dd"                : forceMove,
            "Ee"                : forceMove,
            "Ff"                : forceMove,
            //Duplicate of "Ff" used by P1 Corollary 3.
            //Also referenced in cohen.txt
            "Fg"                : forceMove,
            "force-0-applied"   : forceMove,
            "force-1-applied"   : forceMove,
            "force-2-applied"   : forceMove,
            "force-3-applied"   : forceMove,
            "force-4-applied"   : forceMove,

            "force-center"      : force,
            "S"                 : force,

            "SA"                : diagram,
            "SB"                : diagram,
            "SC"                : diagram,
            "SD"                : [255,0,0], //diagram,
            "SE"                : diagram,
            "SF"                : diagram,

            "BU"                : forceMove,
            "EW"                : forceMove,
            "AC"                : sagittaeChords,
            "Av"                : speed,
            "DF"                : sagittaeChords,

            force,
            "Z"                 : force,
            "V"                 : force,
            "BV"                : forceMove,

            //perpendicular
            "SP"                : perpendicular,
            "P"                 : perpendicular,
            //tangent
            "T"                 : tangent,
            "TP"                : tangent,

            "free-path"         : freeMove,
            "c"                 : freeMove,
            "h"                 : freeMove, //Duplicate of "c" used by P1 Corollary 3
            "d"                 : freeMove,
            "e"                 : freeMove,
            "f"                 : freeMove,
            "g"                 : freeMove, //Duplicate of "f" used by P1 Corollary 3

            "Bc"                : freeMove,
            "Bh"                : freeMove, //Duplicate of "Bc" used by P1 Corollary 3.  Also referenced in cohen.txt

            "Cd"                : freeMove,
            "De"                : freeMove,

            "Ef"                : freeMove,
            "Eg"                : freeMove, //Duplicate of "Ef" used by P1 Corollary 3  Also referenced in cohen.txt

            "free-triangle"     : freeMove,
        };
        var p2_elected = haff( ssD, 'P2_electedTopicColors' );
        if( p2_elected ) {
            Object.assign( all_elected, p2_elected );
        }
        return { all_elected, //all possible topics accumulated
                 p2_elected   //from prop 2.
        };
    }
})();
