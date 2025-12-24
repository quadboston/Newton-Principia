(function(){
    const { nspaste, capture, sconf, } =
        window.b$l.apptree({ ssFExportList : {
            setsCommonT1andT2capture,
            makesProfessorsCaptureFootnotes,
    }});
    return;


function setsCommonT1andT2capture (){
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
function makesProfessorsCaptureFootnotes (){
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
                    //every time, even when capture-by-capture-toggler-in-text
                    //is clicked,
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
                    //we set here condisions of cor4, but saggita will
                    //depend on time which is good for cor2
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
})();