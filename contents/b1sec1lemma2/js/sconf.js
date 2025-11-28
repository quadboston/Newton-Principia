( function () {
    var { sn, nspaste, fapp, fconf, sconf, ssF, fixedColors, } =
	    window.b$l.apptree({ ssFExportList : { init_conf, }, });
    
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var sdata       = sn('sdata', study );
    var dataregs    = sn('dataregs', stdL2 );
    var appstate    = sn('appstate', stdL2 );

    //=====================================
    // //\\ presets data
    //=====================================
    appstate.movingBasePt = false;
    sdata.view = { isInscribed:1, isCircumscribed:1, isFigureChecked:1 };
    //=====================================
    // \\// presets data
    //=====================================    
    return;


    function init_conf()
    {
        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 282;
        var pictureHeight = 290;
        var modorInPicX = 32.5;
        var modorInPicY = 29;
        //.set it from graph editor
        var pictureActiveArea = 259 - modorInPicY;
        //----------------------------------
        // \\// original material parameters
        //----------------------------------


        //----------------------------------
        // //\\ datareg
        //----------------------------------
        dataregs.dr = ssF.initDataReg({
            xLeft  : 32.5,
            width  : 216.5,
            height : 230.5,
            yBottom: 259.5,
            BASE_PT_DRAGGERS_ENABLED : (fconf.sappId === 'b1sec1lemma3'),
            DRAGGABLE_END_POINTS : true,
        });
        //----------------------------------
        // \\// datareg
        //----------------------------------


        //Used to calculate slider width (left side to right side of figure).
        const ptsUntransformed = dataregs.dr.ctrlPts.untransformed;
        const xSliderL = ptsUntransformed[0].x;
        const xSliderR = ptsUntransformed[ptsUntransformed.length - 1].x;
        const BASES_SLIDER_WIDTH_FACTOR = (xSliderR - xSliderL) / pictureWidth;


        //Common settings
        ssF.init_conf_common(BASES_SLIDER_WIDTH_FACTOR);

        // radius of points
        // only works on solid green points, not draggers
        // CTRL_RADIUS, MOVABLE_BASE_RADIUS set in sconf-common.js 
        sconf.pointDecoration.r = 0.5; 

        //predefined-topic colors [R, G, B, Adefault, A-mouse-highlighted]
        const {
            given,
            difference,
            figure,

            widestRectangular,
            widestRectangularHiddenStart,
        } = fixedColors;


        const predT =
        {
            given,
            difference,
            figure,
            //For a line along the base of the figure.  Used for the bottom of
            //the figure, because line "AE" doesn't extend the entire width
            //when there are many bases.
            "base"  : figure,

            "curve" : figure,

            "figure-area"               : fixedColors["figure-area"],
            "figure-area-txt"           : fixedColors["figure-area-txt"],

            "circumscribed-rectangles"  : fixedColors["circumscribed-rectangles"],
            "inscribed-rectangles"      : fixedColors["inscribed-rectangles"],

            "widest-rectangular"        : fconf.sappId.indexOf('b1sec1lemma2')===0 ?
                                            widestRectangularHiddenStart :
                                            widestRectangular,

            "circ-txt"                  : fixedColors["circ-txt"],
            "insc-txt"                  : fixedColors["insc-txt"],
            "widt-txt"                  : fixedColors["widt-txt"],
            'a--K--b--l'                : difference,
            'b--L--c--m'                : difference,
            'c--M--d--n'                : difference,
            'd--e--p--o'                : difference,
        }


        //=====================================
        // //\\ patch for quick slider creation
        //      see //modern approach ... abandoned
        //=====================================
        var originalPoints =
        {
            B : {
                pcolor      : predT.given,
                letterAngle : -45,
            },

            K : {
                pcolor      : predT.given,
                letterAngle : -145,
                letterRotRadius : 40,
            },

            L : {
                pcolor      : predT.given,
                letterAngle : -145,
            },

            M : {
                pcolor      : predT.given,
                letterAngle : -145,
                letterRotRadius : 40,
            },

            a : {
				caption: '𝑎',
                pcolor      : predT.given,
                letterAngle : 45,
            },

            A : {
                pcolor      : predT.given,
                letterAngle : -45,
            },

            F : {
                pcolor      : predT.given,
                letterAngle : 45,
            },

            f : {
				caption: '𝑓',
                pcolor      : predT.given,
                letterAngle : 90,
            },

            C : {
                pcolor      : predT.given,
                letterAngle : -45,
            },

            D : {
                pcolor      : predT.given,
                letterAngle : -45,
            },

            E : {
                pcolor      : predT.given,
                letterAngle : -45,
            },

            l : {
				caption: '𝑙',
                pcolor      : predT.given,
                letterAngle : 135,
            },

            b : {
				caption: '𝑏',
                pcolor      : predT.given,
                letterAngle : 45,
            },

            //invisible point
            c : {
				caption: '𝑐',
                pcolor      : predT.given,
                letterAngle : 45,
            },

            d : {
				caption: '𝑑',
                pcolor      : predT.given,
                letterAngle : 45,
            },
            m : {
				caption: '𝑚',
                pcolor      : predT.given,
                letterAngle : 45,
            },

            n : {
				caption: '𝑛',
                pcolor      : predT.given,
                letterAngle : 45,
            },

            o : {
				caption: '𝑜',
                pcolor      : predT.given,
                letterAngle : 45,
            },

            e : {
				caption: '𝑒',
                pcolor      : predT.given,
                letterAngle : 45,
                hideCaption  : true,
            },
        };

        //AB, BC, CD
        var linesArray =
        [
            { AB : {
                        pcolor : predT.given,
                   },
            },
            { BC : {
                        pcolor : predT.given,
                   },
            },
            { CD : {
                        pcolor : predT.given,
                   },
            },
            { AE : {
                        pcolor : predT.given,
                   },
            },
            { Aa : {
                        pcolor : predT.given,
                   },
            },
            { aK : {
                        pcolor : predT.given,
                   },
            },
            { AK : {
                        pcolor : predT.given,
                   },
            },
            { LB : {
                        pcolor : predT.given,
                   },
            },
            { MC : {
                        pcolor : predT.given,
                   },
            },
            // //\\ top rect sides
            //lower
            { cL : {
                        pcolor : predT.given,
                   },
            },
            { dM : {
                        pcolor : predT.given,
                   },
            },
            //circ, right rect sides
            { lB : {
                        pcolor : predT.given,
                   },
            },
            { mC : {
                        pcolor : predT.given,
                   },
            },
            { nD : {
                        pcolor : predT.given,
                   },
            },
            { oE : {
                        pcolor : predT.given,
                   },
            },


            //upper
            { od : {
                        pcolor : predT.given,
                   },
            },
            { nc : {
                        pcolor : predT.given,
                   },
            },
            { mb : {
                        pcolor : predT.given,
                   },
            },
            { la : {
                        pcolor : predT.given,
                   },
            },
            // \\// top rect sides


            { Bb : {
                        pcolor : predT.given,
                   },
            },
            { Cc : {
                        pcolor : predT.given,
                   },
            },
            { Dd : {
                        pcolor : predT.given,
                   },
            },
            { AF : {
                        pcolor : predT.given,
                   },
            },

            { Kb : {
                        pcolor : predT.given,
                        //undisplayAlways : true,
                        //undisplay : true,
                   },
            },

        ];
        
        nspaste( sconf, {
            predefinedTopics : predT,
            originalPoints,
            linesArray,
            //lines,
            originX_onPicture : modorInPicX,
            originY_onPicture : modorInPicY + pictureActiveArea,
            pictureWidth,
            pictureHeight,
            mod2inn_scale : 1, //was pictureActiveArea,
            //default_tp_stroke_width : 12,
            handleRadius : 55,
        });
        //=====================================
        // \\// patch for quick slider creation
        //=====================================
    };


}) ();


