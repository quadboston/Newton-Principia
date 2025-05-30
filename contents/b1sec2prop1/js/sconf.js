( function() {
    var { haff, has, eachprop, nspaste, capture, toreg, sconf, ssF, ssD, sDomF, fixedColors, 
        fixedColorsOriginal, } = window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        //point e    28x46
        //point A    28x456 
        var pictureWidth = 687;
        var pictureHeight = 657;

        {
            let realSvgSize = pictureWidth + pictureHeight;
            sconf.controlsScale = realSvgSize / sconf.standardSvgSize
        }

        var modorInPicX = 47; //28; 
        var activeAreaOffsetOnPictureY = 0; 
        var modorInPicY = 'to be calculated'; 

        //.set it from graph editor
        //.todm: trully 611 and rotated
        var pictureActiveArea = 611 - activeAreaOffsetOnPictureY;

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



        //----------------------------------
        // //\\ app view parameters
        //----------------------------------
        //  lemma-model coordinate y
        //  -1 if it goes in opposite-to-screen
        //      direction starting from
        //      modorInPicY
        //  1  codirectional with the screen
        //     which means from screen-top to
        //      screen bottom
        var MONITOR_Y_FLIP = -1;

        //done in picture-system y-coord:
        //(pic.bottom-y=+picHeight)
        var modorInPicY = activeAreaOffsetOnPictureY +
            ( MONITOR_Y_FLIP === -1 ? pictureActiveArea : 0 );
        //----------------------------------
        // \\// app view parameters
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
            //nonhover_width    : Math.max( 5, Math.floor( 1*sconf.controlsScale/1.6 ) ),
            //this collaborates with impulse line-segment, we are afraide to
            //keep this "undefined",
            nonhover_width : 5,

            SLIDERS_OFFSET_Y : 0,
            GENERIC_SLIDER_HEIGHT_Y : 30,
            SLIDER_TEXT_POZ_Y_FACTOR : 0.7,

            default_tp_lightness : 30,
            mediaBgImage : "../js/img/b1s2p1t1.png",
            dontRun_ExpandConfig : true,

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
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,
            pictureWidth,       //needed only to paint vecor's Av tip

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
            enableTools : false,
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
            },
            S : {
            },
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

        {
            ////--------------------------------------------------
            ////expands predefinedTopic colors into rg
            ////--------------------------------------------------
            var { pt_all, p2_pt } = predefinedTopics();
            Object.keys( pt_all ).forEach( topicKey => {
                toreg( topicKey )( 'pname', topicKey );
                var tk = sDomF.topicIdUpperCase_2_underscore( topicKey );
                var fck = fixedColors[ tk ] = pt_all[ topicKey ].concat();
                //compensates missing of "extend-confib" in engine core
                fixedColorsOriginal[ topicKey ] = fck;
            });
         }
         if( has( ssD, 'P2_predefinedTopics' ) ) {
             Object.keys( p2_pt ).forEach( camelId => {
                if( camelId === 'SBCaracc' ) return;
                let fc = fixedColorsOriginal[ camelId ];
                fc.isPoint0Line = true;
             })
         }
        'A B C D E F S c d e f P g h'.split(' ').forEach( camelId => {  //Duplicate g and h used by P1 Corollary 3 see predefinedTopics for more
            let fc = fixedColorsOriginal[ camelId ];
            fc.isPoint = true;
            fc.isPoint0Line = true;
        });
        ( 'Ch Fg SP Av dt time Ff Ee Dd Cc ' +      //Duplicate Ch and Fg used by P1 Corollary 3 see predefinedTopics for more
        'force-0-applied force-1-applied force-2-applied ' +
        'force-3-applied force-4-applied')
        .split(' ')
            .forEach( camelId => {
                let fc = fixedColorsOriginal[ camelId ];
                fc.isLine = true;
                fc.isPoint0Line = true;
            });

        setsCommonT1andT2capture(); 
        //this comes from theorem P2; this does not exist in P1;
        if( has( ssF, 'init_conf_addon' ) ) {
            haff( ssF, 'init_conf_addon' );
        } else {
            makesProfessorsCaptureFootnotes();
        }
    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================
    return;


    function setsCommonT1andT2capture()
    {
        nspaste( capture, {
            //"1-B", replaced with 1-4
            "1-C": {
                "slider_sltime": {
                    //"curtime": 2.71, // 2.5752915514853103 * sconf.initialTimieStep
                    "curtime": 3.01 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
            },
            "1-D": {
                "slider_sltime": {
                    //"curtime": 3.45
                    "curtime": 4.01 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
            },
            "1-E": {
                "slider_sltime": {
                    //"curtime": 4.26
                    "curtime": 5.01 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
            },
        });
    }
    
    ///sets captured states of the simulator,
    ///used in by-click-actions in text,
    ///jsobject has indices of this these actions,
    function makesProfessorsCaptureFootnotes()
    {
        nspaste( capture, {

            "1-0": {
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
                "speeds": {
                    "pos": [
                        [
                            0.2618140190615299 / sconf.initialTimieStep,
                            0.9651183447758357 / sconf.initialTimieStep
                        ]
                    ]
                },
                "A": {
                    "pos": [
                        2.4846663769760875,
                        -0.010267216433785486
                    ]
                },

                "slider_sltime": {
                    //"curtime": 1.75000001 * sconf.initialTimieStep
                    "curtime": 1.01  * sconf.initialTimieStep
                },
            },

            "1-1": {
                "slider_sltime": {
                    //"curtime": 2.099161816013016 * sconf.initialTimieStep
                    "curtime": 1.26 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
            },
            "1-2": {
                "slider_sltime": {
                    //"curtime": 2.099161816013016 * sconf.initialTimieStep
                    "curtime": 1.51 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
            },
            "1-3": {
                "slider_sltime": {
                    //"curtime": 2.765743445674228 * sconf.initialTimieStep
                    "curtime": 1.751 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
            },
            "motion-F": {
                "slider_sltime": {
                    "curtime": 5.01 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
            },
            "more-triangles": {
                "speeds": {
                    "pos": [
                        [
                            0.15653007129470273/sconf.initialTimieStep,
                            0.9876731933086345/sconf.initialTimieStep
                        ]
                    ]
                },
                "slider_sltime": {
                    "curtime":
                        sconf.numberOfManyBases * sconf.timeStepOfManyBases,
                },
                "rgslid_dt": {
                    "val": sconf.timeStepOfManyBases
                },
            },
            ///see also __amode2rgstate,
            ///the very first generic statement
            "initial-state" : {
                "A": {
                    "pos": [
                        2.4846663769760875,
                        -0.010267216433785486
                    ]
                },
                "slider_sltime": {
                    "curtime": 5.01 * sconf.initialTimieStep
                },
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
                "speeds": {
                    "pos": [
                        [
                            0.2618140190615299 / sconf.initialTimieStep,
                            0.9651183447758357 / sconf.initialTimieStep
                        ]
                    ]
                },
                "force" : {
                    'lawPower' : sconf.force[0][0],
                    'lawConstant' : sconf.force[0][1]
                }
            },

            "corollary-1": {
                "media-mover": {
                    "achieved": {
                        "achieved": [
                            47,
                            611
                        ]
                    }
                },
                 "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
                "slider_sltime": {
                    "curtime": 3.00,
                },

                 "A": {
                    "pos": [
                        2.4846663769760875,
                        -0.010267216433785486
                    ]
                },
                //---------------------------
                // //\\ perpendicular
                //---------------------------
                "SP": {
                    //normal step=stepIx4=23
                    "decStart" :1, "decEnd" : 1111111111111
                },
                "TP": {
                    //normal step=stepIx4=23
                    "decStart" :1, "decEnd" : 1111111111111
                },
                "P": {
                    "decStart" :1, "decEnd" : 1111111111111
                },
                "T": {
                    "decStart" :1, "decEnd" : 1111111111111
                },
                //---------------------------
                // \\// perpendicular
                //---------------------------
            },
            "corollary-2": {
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
                "speeds": {
                    "pos": [
                        [
                            0.2618140190615299/sconf.initialTimieStep,
                            0.9651183447758357/sconf.initialTimieStep
                        ]
                    ]
                },
                "slider_sltime": {
                    "curtime": 2.9897076114077104 * sconf.initialTimieStep
                }
            },
            "corollary-4" : {
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
                "AC": {
                    //stepIx4=23
                    "decStart" :10, "decEnd" :111111111111,
                },
                "DF": {
                    "decStart" :21, "decEnd" :111111111111,
                },
                "BU": {
                    "decStart" :10, "decEnd" :111111111111,
                },
                "EW": {
                    "decStart" :21, "decEnd" :111111111111,
                },
                "slider_sltime": {
                    "curtime": 4.8 * sconf.initialTimieStep,
                },
                "speeds": {
                    "pos": [
                        [
                            0.29155658394042205/sconf.initialTimieStep,
                            0.9565535836329252/sconf.initialTimieStep
                        ]
                    ]
                },
            },


            "corollary-3" : {
                "rgslid_dt": {
                    "val": sconf.initialTimieStep
                },
                "speeds": {
                    "pos": [
                        [
                            0.2618140190615299/sconf.initialTimieStep,
                            0.9651183447758357/sconf.initialTimieStep
                        ]
                    ]
                },
                "slider_sltime": {
                    "curtime": 4.8 * sconf.initialTimieStep
                }
            },




            "__amode2rgstate" :
            [
                [
                    "true",
                    {
                        //this clears up state for all lemmas and all subessays,
                        //every time, even when capture-by-capture-toggler-in-text is clicked,
                        //this block does its job:
                        rg : {
                            "V": {
                                "decEnd" : 1,
                            },
                            'V-white-filler' : {
                                "decStart" : -2,
                            },
                            "AC": {
                                //normal step=stepIx4=23
                                "decStart" :10, "decEnd" :1
                            },
                            "DF": {
                                "decStart" :10, "decEnd" :1
                            },
                            //saggitas
                            "BU": {
                                "decStart" :10, "decEnd" :1
                            },
                            "EW": {
                                "decStart" :10, "decEnd" :1
                            },
                 
                            //---------------------------
                            // //\\ perpendicular
                            //---------------------------
                            "SP": {
                                //normal step=stepIx4=23
                                "decStart" :10, "decEnd" :1
                            },
                            "TP": {
                                //normal step=stepIx4=23
                                "decStart" :10, "decEnd" :1
                            },
                            "P": {
                                //normal step=stepIx4=23
                                "decStart" :10, "decEnd" :1
                            },
                            "T": {
                                //normal step=stepIx4=23
                                "decStart" :10, "decEnd" :1
                            },
                            //---------------------------
                            // \\// perpendicular
                            //---------------------------
                        }
                    }
                ], 
                [
                    "!ssF.mediaModelInitialized",
                    {
                        "captured" : "initial-state",
                        "rg" :
                        {
                        }
                    }
                ],
                [
                    "( logic_phase === 'proof' )",
                    {
                        "captured" : "1-0",
                        "rg" :
                        {
                            "V": {
                                "decEnd" : 11111111,
                                "doPaintPname" : true,
                            },
                        }
                    }
                ],

                [
                    "( logic_phase === 'claim' && aspect !== 'model' )",
                    {
                        "captured" : "initial-state",
                        "rg" :
                        {
                        }
                    }
                ],
                 
                [
                    "( logic_phase === 'corollary' )",
                    {
                        "captured" : "initial-state",
                        "rg" :
                        {
                        }
                    }
                ],
                [
                    //"( fconf.sappId === 'b1sec2prop1' && subessay === 'cor-4' )",
                    "( subessay === 'cor-1' )",
                    {
                        "captured" : "corollary-1",
                        "rg" : {
                        }
                    }
                ],
                [
                    "( subessay === 'cor-2' )",
                    {
                        "captured" : "corollary-2",
                        "rg" : {
                        }
                    }
                ],
                [
                    //"( fconf.sappId === 'b1sec2prop1' && subessay === 'cor-4' )",
                    "( subessay === 'cor-3' )",
                    {
                        "captured" : "corollary-3",
                        "rg" : {
                        }
                    }
                ],
                [
                    //"( fconf.sappId === 'b1sec2prop1' && subessay === 'cor-4' )",
                    "( subessay === 'cor-4' )",
                    {
                        //we set here condisions of cor4, but saggita will depend on time
                        //which is good for cor2
                        "captured" : "corollary-4",
                        "rg" : {
                        }
                    }
                ],
                
                //---------------------------
                // //\\ redundant points
                //---------------------------
                [
                    "( subessay === 'cor-2' || subessay === 'cor-3' || subessay === 'cor-4' )",
                    {
                        //we set here condisions of cor4, but saggita will depend on time
                        //which is good for cor2
                        "captured" : "",
                        "rg" : {
                            "Z": {
                                "decEnd" : 11111111
                            },
                            "V": {
                                "decEnd" : 11111111,
                            },
                            "ABCV": {
                                "decEnd" : 11111111
                            },
                            "DEFZ" : {
                                "decEnd" : 11111111
                            },
                        }
                    }
                ],
                [
                    "( subessay !== 'cor-2' && subessay !== 'cor-3' && subessay !== 'cor-4' )",
                    {
                        //we set here condisions of cor4, but saggita will depend on time
                        //which is good for cor2
                        "captured" : "",
                        "rg" : {
                            "Z" : {
                                "decEnd" : 1
                            },
                            "ABCV": {
                                "decEnd" : 1
                            },
                            "DEFZ" : {
                                "decEnd" : 1
                            },
                        }
                    }
                ],
                //---------------------------
                // \\// redundant points
                //---------------------------

                [
                    "( subessay !== 'cor-3' )",
                    {
                        //we set here condisions of cor4, but saggita will depend on time
                        //which is good for cor2
                        "captured" : "",
                        "rg" : {
                            "h": {              //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1
                            },
                            "Bh": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1
                            },
                            "Ch": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1
                            },
                            "g": {              //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1
                            },
                            "Eg": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1
                            },
                            "Fg": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1
                            },
                        }
                    }
                ],
                [
                    "( subessay === 'cor-3' )",
                    {
                        //we set here conditions of cor4, but saggita will depend on time
                        //which is good for cor2
                        "captured" : "",
                        "rg" : {
                            "h": {              //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1111111111
                            },
                            "Bh": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1111111111
                            },
                            "Ch": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1111111111
                            },
                            "g": {              //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1111111111
                            },
                            "Eg": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1111111111
                            },
                            "Fg": {             //Duplicate used by P1 Corollary 3 see predefinedTopics for more
                                "decEnd" : 1111111111
                            },
                        }
                    }
                ],
                 
                [
                    //"( fconf.sappId === 'b1sec2prop1' && subessay === 'cor-4' )",
                    "( logic_phase === 'corollary' && aspect === 'model' )",
                    {
                        //we set here condisions of cor4, but saggita will depend on time
                        //which is good for cor2
                        "captured" : "corollary-4",
                        "rg" : {
                            //---------------------------
                            // //\\ perpendicular
                            //---------------------------
                            "SP": {
                                //normal step=stepIx4=23
                                "decStart" :1, "decEnd" : 1111111111111
                            },
                            "TP": {
                                //normal step=stepIx4=23
                                "decStart" :1, "decEnd" : 1111111111111
                            },
                            "P": {
                                "decStart" :1, "decEnd" : 1111111111111
                            },
                            "T": {
                                "decStart" :1, "decEnd" : 1111111111111
                            },
                            //---------------------------
                            // \\// perpendicular
                            //---------------------------
                        }
                    }
                ],
            ]
        });
        }


    function predefinedTopics()
    {
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


        const pt_all = {
            speed,
            force,
            forceMove,
            time,                       //Time slider
            dt                  : time, //Delta time slider
            path,
            "path-change"       : path,

            //The following sets the color of the text in the text area for these triangles.  If 
            //these are placed after "kepler-triangle-odd" and "kepler-triangle-even", they will 
            //also set the triangle color in the model area.  If these are removed the triangles
            //default to red and green "zebra-colors" (for more see "colors-lib.js" section
            //"generates pseudo-random zebra colors" in function topics__2__topicsColorModel).
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
            "Ch"                : forceMove,//Duplicate of "Cc" used by P1 Corollary 3.  Also referenced in cohen.txt
            "Dd"                : forceMove,
            "Ee"                : forceMove,
            "Ff"                : forceMove,
            "Fg"                : forceMove,//Duplicate of "Ff" used by P1 Corollary 3.  Also referenced in cohen.txt
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
            "SD"                : diagram,
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
        var p2_pt = haff( ssD, 'P2_predefinedTopics' );
        if( p2_pt ) {
            Object.assign( pt_all, p2_pt );
        }
        return { pt_all, p2_pt };
    }
}) ();

