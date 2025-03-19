( function() {
    var { sconf, nspaste, capture, toreg,
         ssF, sDomF, fixedColors,
    } = window.b$l.apptree({});
    ssF.init_conf_addon = init_conf_addon;
    return;



    ///====================================================
    /// add ownself to umbrella-subapp init_conf
    ///====================================================
    function init_conf_addon()
    {
        sconf.mediaBgImage = "../../b1sec2prop1/js/img/b1s2p1t1.png";
        sconf.hide_perp_P_and_alike = true;
        //dose not work: sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY = 0.8;

        {
            ////--------------------------------------------------
            ////expands predefinedTopic colors into rg
            ////--------------------------------------------------
            let pt = predefinedTopics();
            Object.keys( predefinedTopics() ).forEach( topicKey => {
                toreg( topicKey )( 'pname', topicKey );
                var tk = sDomF.topicIdUpperCase_2_underscore( topicKey );
                fixedColors[ tk ] = pt[ topicKey ];
            });
         }

        // //\\ makes capture
        nspaste( capture, {
    "proof-step-D": {
        "slider_sltime": {
            "curtime": 4.01 * sconf.initialTimieStep
        },
        "A": {
            "pos": [
                2.4846663769760875,
                -0.010267216433785486
            ]
        }
    },

    "initial-state" : {
        "slider_sltime": {
            "curtime": 5.0001 * sconf.initialTimieStep
        },
        "A": {
            "pos": [
                2.4846663769760875,
                -0.010267216433785486
            ]
        }
    },
    "t2corollary": {

        "detected_user_interaction_effect_DONE" : true,
        "slider_sltime": {
            "curtime": 7.0001/4 * sconf.initialTimieStep
        },
                "rgslid_dt": {
                "val": sconf.initialTimieStep
        },
        "media-mover": {
            "achieved": {
                "achieved": [
                    47,
                    611
                ]
            }
        },
        "A": {
            "pos": [
                2.4846663769760875,
                -0.010267216433785486
            ]
        }
    },







    "__amode2rgstate" :
    [
        [
            "!ssF.mediaModelInitialized || amode.logic_phase === 'scholium' || amode.logic_phase === 'claim'",
            {
                "captured" : "initial-state",
                "rg" :
                {
                    ///proliferation: repetition with T1
                    'V-white-filler' : {
                        "decStart" : -2,
                    },
                }
            }
        ],

        [
            "amode.logic_phase === 'proof'",
            {
                "rg" :
                {
                    "rgslid_dt" : { "val" : sconf.initialTimieStep },
                    "slider_sltime": {
                        "curtime": 3.2 //to capture dD, triangle SCD
                    }
                }
            }
        ],

        [
            "( logic_phase === 'corollary' )",
            {
                "captured" : "t2corollary",
                "rg" :
                {
                }
            }
        ]
    ]
    });
    // \\// makes capture
    }

    function predefinedTopics()
    {
        var forceMoveX = [150,0,0, 0.9];
        return {
            "SP"                : [200, 100, 0, 0],
            "P"                 : [200, 100, 0, 0],
            "T"                 : [200, 100, 0, 0],
            "TP"                : [200, 100, 0, 0],
            "Caracc"            : [100,   0,  100],
            "CCaracc"           : [100,   0,  100],
            "CParacc"           : [100,   0,  100],
            "SBCaracc"          : [255,  100, 0, 0.5],  // triangle SBC area description accelerated
            "cCaracc"           : [100,   0,  100],

            "Varacc"            : forceMoveX,
            "BVaracc"           : forceMoveX,   // force at B deviated toward V; area description accelerated
            "VVaracc"           : forceMoveX,   // force vector at V displaced to V'; area description accelerated
            "CParacc"           : forceMoveX,
            "CaraccParacc"      : [100,   0,  100],

            "j"                 : [0,100,0],
            "e"                 : [0,100,0],
            "f"                 : [0,100,0],

            "Cj"                : [0,100,0],
            "Dj"                : [255, 100, 0],
        };
    }
}) ();

