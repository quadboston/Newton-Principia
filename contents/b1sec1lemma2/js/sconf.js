( function () {
    var { sn, nspaste, fapp, fconf, sconf, ssF, topicColors_repo, } =
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
        } = topicColors_repo;


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

            "figure-area"               : topicColors_repo["figure-area"],
            "figure-area-txt"           : topicColors_repo["figure-area-txt"],

            "circumscribed-rectangles"  : topicColors_repo["circumscribed-rectangles"],
            "inscribed-rectangles"      : topicColors_repo["inscribed-rectangles"],

            "widest-rectangular"        : fconf.sappId.indexOf('b1sec1lemma2')===0 ?
                                            widestRectangularHiddenStart :
                                            widestRectangular,

            "circ-txt"                  : topicColors_repo["circ-txt"],
            "insc-txt"                  : topicColors_repo["insc-txt"],
            "widt-txt"                  : topicColors_repo["widt-txt"],
            'a--K--b--l'                : difference,
            'b--L--c--m'                : difference,
            'c--M--d--n'                : difference,
            'd--e--p--o'                : difference,
        }


        var originalPoints =
        {
            A : {
                pcolor      : predT.figure,
                letterAngle : -90,
            },
            B : {
                pcolor      : predT.figure,
                letterAngle : -90,
            },
            C : {
                pcolor      : predT.figure,
                letterAngle : -90,
            },
            D : {
                pcolor      : predT.figure,
                letterAngle : -90,
            },
            E : {
                pcolor      : predT.figure,
                letterAngle : -90,
            },
			F : {
                pcolor      : predT["widt-txt"],
                letterAngle : 45,
            },
            K : {
                pcolor      : predT["insc-txt"],
                letterAngle : -145,
                letterRotRadius : 40,
            },
            L : {
                pcolor      : predT["insc-txt"],
                letterAngle : -145,
            },
            M : {
                pcolor      : predT["insc-txt"],
                letterAngle : -145,
                letterRotRadius : 40,
            },

            a : {
				caption: '𝑎',
                pcolor      : predT.figure,
                letterAngle : 45,
            },
			b : {
				caption: '𝑏',
                pcolor      : predT.figure,
                letterAngle : 45,
            },
            c : {
				caption: '𝑐',
                pcolor      : predT.figure,
                letterAngle : 45,
            },
            d : {
				caption: '𝑑',
                pcolor      : predT.figure,
                letterAngle : 45,
            },
            f : {
				caption: '𝑓',
                pcolor      : predT["widt-txt"],
                letterAngle : 90,
            },
            l : {
				caption: '𝑙',
                pcolor      : predT["circ-txt"],
                letterAngle : 135,
            },
            m : {
				caption: '𝑚',
                pcolor      : predT["circ-txt"],
                letterAngle : 45,
            },
            n : {
				caption: '𝑛',
                pcolor      : predT["circ-txt"],
                letterAngle : 45,
            },
            o : {
				caption: '𝑜',
                pcolor      : predT["circ-txt"],
                letterAngle : 45,
            },
        };

        var linesArray =
        [
            { AB : {
                        pcolor : predT.figure,
                   },
            },
            { BC : {
                        pcolor : predT.figure,
                   },
            },
            { CD : {
                        pcolor : predT.figure,
                   },
            },
            { AE : {
                        pcolor : predT.figure,
                   },
            },

            { aK : {
                        pcolor : predT["circ-txt"],
                   },
            },
            { AK : {
                        pcolor : predT.given,
                   },
            },
            // //\\ top rect sides
            //lower
            { cL : {
                        pcolor : predT["insc-txt"],
                   },
            },
            { dM : {
                        pcolor : predT["insc-txt"],
                   },
            },
            //circ, right rect sides
            { lb : {
                        pcolor : predT["circ-txt"],
                   },
            },
            { mc : {
                        pcolor : predT["circ-txt"],
				   },
            },
            { nd : {
                        pcolor : predT["circ-txt"],
                   },
            },
            { oE : {
                        pcolor : predT["circ-txt"],
                   },
            },

            //upper
            { od : {
                        pcolor : predT["circ-txt"],
                   },
            },
            { nc : {
                        pcolor : predT["circ-txt"],
                   },
            },
            { mb : {
                        pcolor : predT["circ-txt"],
                   },
            },
            { la : {
                        pcolor : predT["circ-txt"],
                   },
            },
            // \\// top rect sides

            { Bb : {
                        pcolor : predT["insc-txt"],
                   },
            },
            { Cc : {
                        pcolor : predT["insc-txt"],
                   },
            },
            { Dd : {
                        pcolor : predT["insc-txt"],
                   },
            },
            { AF : {
                        pcolor : predT.given,
                   },
            },
            { Kb : {
                        pcolor : predT["insc-txt"],
                   },
            },
            { Aa : {
                        pcolor : predT.figure,
                   },
            },
        ];
        
        nspaste( sconf, {
            topicColors_elected : predT,
            originalPoints,
            linesArray,
            originX_onPicture : modorInPicX,
            originY_onPicture : modorInPicY + pictureActiveArea,
            pictureWidth,
            pictureHeight,
            mod2inn_scale : 1, //was pictureActiveArea,
            //default_tp_stroke_width : 12,
            handleRadius : 55,
        });
    };
}) ();