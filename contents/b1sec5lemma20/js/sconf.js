// //\\// widget config
( function() {
    var {
        mat,
        fapp, sconf,
    } = window.b$l.apptree({
        ssFExportList : { init_conf }
    });
    return;






    function init_conf()
    {
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        //for some standard sliders
        sconf.enableTools               = true;
        sconf.hideProofSlider           = true; //todo
        //sconf.rgShapesVisible         = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        var pictureWidth = 2000;
        var pictureHeight = 1660;
        //offset of eccentricy slider in picture-space
        var originX_onPicture = 821;
        var originY_onPicture = 906;

        let slider_a_start=pictureWidth*0.05;
        let slider_a_end=pictureWidth*0.7;
        let slider_aX=532;
        let slider_aY=pictureHeight*0.9;
        let pointRadius = 12;
        
        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        //gives bar full range of opacity for tp machine
        sconf.TOPIC_FILL_OPACITY_IN_FOCUS = 1;
        //makes idle bars brighter
        sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS = 0.6;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20; //works

        //--------------------------------------
        // //\\ does override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 30;
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 4 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;

        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
        sconf.text_hover_width      = 1.5;
        // \\// principal tp-css pars
        // \\// does override engine defaults,
        // \\// decorational parameters
        //***************************************************************
        
        var predefinedTopics =
        {
            "key-triangle"          : [255,   0, 0, 1],
            "key-parts"             : [255,   0, 0, 1],
            "similar-triangle"      : [0,     0, 255, 1],

            "PT"                    : [255,   0, 0, 1],

            "base-figure"           : [0,     0, 255, 1],
            "static-generator"      : [255,   0, 255, 1],
            "ellipse"               : [0,   150, 0, 1],
            "tangent"               : [0,   150, 0, 1],
            "given-parallelogram"   : [0,   200, 255, 1],
            "generators"            : [200, 150, 0, 1]
        };
        
        
        var originalPoints =
        {
            P : { pos: [996, 570],
                  pcolor: predefinedTopics["key-triangle"],
                  cssClass: 'tp-key-triangle',
                  initialR: pointRadius,
                  letterAngle : 45,
                  letterRotRadius : 20,
                },
            A : { pos: [623, 1232],
                  pcolor: predefinedTopics['base-figure'],
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 45,
                  letterRotRadius : 20,
                },
            B : { pos: [1497, 1230],
                  pcolor: predefinedTopics['base-figure'],
                  cssClass: 'tp-base-figure',
                  //style: {fill: '#ffffff'}, works
                  initialR: pointRadius,
                },
            C : { pos: [509,383],
                  pcolor: predefinedTopics['base-figure'],
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 45,
                  letterRotRadius : 20,
                },
  
            ///-------------------------------------------------
            ///builds center point first to be used in ellipse
            ///-------------------------------------------------
            O : { pos: [originX_onPicture, originY_onPicture],
                  cssClass: 'aspect--model tp-aspect-model tp-base-figure',
                  r : pointRadius,
                  letterRotRadius : 20,
                },

            //derived points, should not be used in model
            Q : { pos: [1077, 1231],
                  pcolor: predefinedTopics['base-figure'],
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 45,
                  letterRotRadius : 20,
                },
            t : { pos: [1511, 574],
                  pcolor: predefinedTopics['static-generator'],
                  cssClass: 'tp-static-generator',
                  initialR: pointRadius,
                  letterAngle : 45,
                  letterRotRadius : 20,
                },
            r : { pos: [1028, 830],
                  pcolor: predefinedTopics['static-generator'],
                  cssClass: 'tp-static-generator',
                  initialR: pointRadius,
                },

            D : { pos: [1410, 965],
                  pcolor: predefinedTopics['generators'],
                  cssClass: 'tp-generators',
                  initialR: pointRadius,
                  letterRotRadius : 20,
                },
            R : { pos: [1010, 712],
                  pcolor: predefinedTopics['key-triangle'],
                  cssClass: 'tp-key-triangle',
                  initialR: pointRadius,
                  letterAngle : -10,
                  letterRotRadius : 20,
                },
            S : { pos: [532,561],
                  pcolor: predefinedTopics['base-figure'],
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 45,
                  letterRotRadius : 20,
                },

            //============================================
            // //\\ sliders
            //============================================
            T : { pos: [1283, 572],
                  draggableX : true,
                  pcolor: predefinedTopics['key-triangle'],
                  style: {fill: '#ffffff'},
                  cssClass: 'tp-key-triangle',
                  letterAngle : 45,
                  letterRotRadius : 20,
                  //initialR: 8, //overrides handle radius if any
                },
            a : {
                    caption : 'semiaxis a',
                    draggableX : true,
                    draggableY : false,
                    
                    pos: [slider_aX,slider_aY],
                    pcolor : predefinedTopics.ellipse,
    
                    letterAngle : 90,
                    letterRotRadius : 20,
                    //makes display independent on user action
                    displayAlways : true,
                    unscalable : true,
                },
            //rails
            aStart : {
                pos : [ slider_a_start, slider_aY ],
                pcolor : predefinedTopics.ellipse,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },
            aEnd : {
                pos : [ slider_a_end, slider_aY ],
                pcolor : predefinedTopics.ellipse,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },
            //============================================
            // \\// sliders
            //============================================
        };
        //----------------------------------
        // \\// original material parameters
        //----------------------------------

        
        var linesArray =
        [
           //-------------------------
           // //\\ base-figure
           //-------------------------
           { 'CA' : {
                        pcolor : predefinedTopics["base-figure"],
                        cssClass : 'tp-base-figure',
                    }
           },
           { 'BC' : {
                        pcolor : predefinedTopics["base-figure"],
                        cssClass : 'tp-base-figure',
                    }
           },
           { 'BA' : {
                        pcolor : predefinedTopics["base-figure"],
                        cssClass : 'tp-base-figure',
                    }
           },
           { 'PB' : {
                        pcolor : predefinedTopics["base-figure"],
                        cssClass : 'tp-base-figure',
                    }
           },
           { 'PC' : {
                        pcolor : predefinedTopics["base-figure"],
                        cssClass : 'tp-base-figure',
                    }
           },
           //-------------------------
           // \\// base-figure
           //-------------------------
  
           { 'PT' : {
                        pcolor : predefinedTopics["key-triangle"],
                        'stroke-width' : 10,
                        cssClass : 'tp-key-triangle tp-key-parts',
                    }
           },
           { 'PR' : {
                        pcolor : predefinedTopics["key-triangle"],
                        'stroke-width' : 10,
                        cssClass : 'tp-key-triangle tp-key-parts',
                    }
           },
           { 'RT' : {
                        pcolor : predefinedTopics["key-triangle"],
                        'stroke-width' : 10,
                        cssClass : 'tp-key-triangle',
                    }
           },


  
            //-------------------------
            // //\\ given parallelogram
            //-------------------------
            { 'PQ' : {
                        pcolor : predefinedTopics["given-parallelogram"],
                        cssClass : 'tp-given-parallelogram',
                    }
            },
            { 'AS' : {
                        pcolor : predefinedTopics["given-parallelogram"],
                        cssClass : 'tp-given-parallelogram',
                    }
            },
            { 'AQ' : {
                        pcolor : predefinedTopics["given-parallelogram"],
                        cssClass : 'tp-given-parallelogram',
                    }
            },
            { 'QA' : {
                        pcolor : predefinedTopics["given-parallelogram"],
                        cssClass : 'tp-given-parallelogram',
                    }
            },
            /*
            { 'rQ' : {
                        pcolor : predefinedTopics["given-parallelogram"],
                        cssClass : 'tp-given-parallelogram',
                    }
            },
            */
            { 'PS' : {
                        pcolor : predefinedTopics["given-parallelogram"],
                        cssClass : 'tp-given-parallelogram',
                    }
            },
            //-------------------------
            // \\// given parallelogram
            //-------------------------

            //------------------------
            // //\\ linear-generators
            //------------------------
            { 'BT' : {
                        pcolor : predefinedTopics["generators"],
                        cssClass : 'tp-generators',
                    }
            },
            { 'CR' : {
                        pcolor : predefinedTopics["generators"],
                        cssClass : 'tp-generators',
                    }
            },
            { 'BD' : {
                        pcolor : predefinedTopics["generators"],
                        cssClass : 'tp-generators',
                    }
            },
            { 'CD' : {
                        pcolor : predefinedTopics["generators"],
                        cssClass : 'tp-generators',
                    }
            },
            { 'Bt' : {
                        pcolor : predefinedTopics["ellipse"],
                        cssClass : 'tp-tangent',
                    }
            },
            //------------------------
            // \\// linear-generators
            //------------------------

            //------------------------
            // //\\ static triangle
            //------------------------
            { 'rt' : {
                        pcolor : predefinedTopics["static-generator"],
                        cssClass : 'tp-static-generator',
                    }
            },
            { 'Pr' : {
                        pcolor : predefinedTopics["static-generator"],
                        cssClass : 'tp-static-generator',
                    }
            },
            { 'Pt' : {
                        pcolor : predefinedTopics["static-generator"],
                        cssClass : 'tp-static-generator',
                    }
            },
            //------------------------
            // \\// static triangle
            //------------------------

            //------------------------
            // //\\ similar triangles
            //      in circle case
            //------------------------
            { 'CP' : {
                        pcolor : predefinedTopics["similar-triangle"],
                        cssClass : 'tp-similar-triangle',
                    }
            },
            { 'BP' : {
                        pcolor : predefinedTopics["similar-triangle"],
                        cssClass : 'tp-similar-triangle',
                    }
            },
            { 'BC' : {
                        pcolor : predefinedTopics["similar-triangle"],
                        cssClass : 'tp-similar-triangle',
                    }
            },
            //------------------------
            // \\// similar triangles
            //------------------------

            { 'aStart,aEnd' : {
                        pcolor : predefinedTopics["ellipse"],
                        cssClass : 'ellipse',
                    }
            },

        ];

        //----------------------------------
        // //\\ app view parameters
        //----------------------------------
        var pictureActiveArea;
        {
            let pp = originalPoints;
            let OO = pp.O.pos;
            let PP = pp.P.pos;
            let P = [ PP[0] - OO[0], PP[1] - OO[1] ];
            pictureActiveArea = mat.unitVector(P).abs;
        }
        //mediaSize = mod2inn_scale * modelSize, 
        var mod2inn_scale = pictureActiveArea;
        //----------------------------------
        // \\// app view parameters
        //----------------------------------



        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        fapp.normalizeSliders( pictureHeight / 444 ); //todo not automated, prolifer.
        to_sconf =
        {
            predefinedTopics,
            originalPoints,
            linesArray,
            mediaBgImage : "l20.jpg",
            //dontRun_ExpandConfig : true,

            a : 2.03,
            aMax : 10,
            b : 1,
            rotationRads : Math.PI*0.19,

            //given points on ellipse if fractions of
            //full cycle of param t
            initialparP : 0.259,
            initialparA : 0.7542,
            initialparC : 0.379,
            initialparB : 0.0468,
            initialParT : 0.760, //parameter T on line Pt


            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            //100; //display in "percents" of Ae
            //LEGEND_NUMERICAL_SCALE : 100,
            LEGEND_NUMERICAL_SCALE : 1,

            pictureActiveArea,
            originX_onPicture,
            originY_onPicture,
            pictureHeight,
            pictureWidth,

            thickness : 2,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //default_tp_stroke_opacity : 0.5,
            default_tp_stroke_width, // : 20,
            defaultLineWidth, // : 3,
        };

        //todm proliferation in each lemma:
        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        (function () {
            var inn2mod_scale = 1/mod2inn_scale;
            to_sconf.mod2inn_scale = mod2inn_scale;
            to_sconf.inn2mod_scale = inn2mod_scale;
        })();
        //----------------------------------
        // \\// spawns to_conf
        // \\// prepares sconf data holder
        //----------------------------------------------------



        //----------------------------------------------------
        // //\\ copy-pastes to sconf
        //----------------------------------------------------
        Object.keys( to_sconf ).forEach( function( key ) {
            sconf[ key ] = to_sconf[ key ];
        });
        //----------------------------------------------------
        // \\// copy-pastes to sconf
        //----------------------------------------------------
    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

