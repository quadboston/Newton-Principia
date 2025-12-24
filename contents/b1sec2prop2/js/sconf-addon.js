( function() {
    var { sconf, nspaste, capture, toreg, ssF, ssD, sDomF, fixedColors, } =
        window.b$l.apptree({});
    ssF.init_conf_addon = init_conf_addon;
    ssD.P2_P2_electedTopicColors = P2_electedTopicColors;
    return;


    ///====================================================
    /// add ownself to umbrella-subapp init_conf
    ///====================================================
    function init_conf_addon()
    {
        sconf.mediaBgImage = "../../b1sec2prop1/js/img/b1s2p1t1.png";
        //sconf.hide_perp_P_and_alike = true;
        //dose not work: sconf.SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY = 0.8;

        {
            ////--------------------------------------------------
            ////expands predefinedTopic colors into rg
            ////--------------------------------------------------
            /*
            let pt = P2_electedTopicColors();
            Object.keys( P2_electedTopicColors() ).forEach( topicKey => {
                toreg( topicKey )( 'pname', topicKey );
                var tk = sDomF.topicIdUpperCase_2_underscore( topicKey );
                fixedColors[ tk ] = pt[ topicKey ];
            });
            */
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

    function P2_electedTopicColors()
    {
        const {
            forceMove,

            diagram,
            areaDescriptionAccelerated,
        } = fixedColors;


        return {
            "Paracc"            : diagram,  //Point C''
            "Caracc"            : diagram,  //Point C'
            "CCaracc"           : diagram,  //Line C to C'
            "CParacc"           : diagram,  //Line C to C''
            "cCaracc"           : diagram,  //Line c to C'
            "CaraccParacc"      : diagram,  //Line C' to C''
            "BParacc"           : diagram,  //Line B to C''
            "BCaracc"           : diagram,  //Line B to C'
            "SCaracc"           : diagram,  //Line S C'

            "SBCaracc"          : areaDescriptionAccelerated,   // triangle SBC area description accelerated

            "Varacc"            : forceMove,    //Point V'
            "BVaracc"           : forceMove,    // force at B deviated toward V;        Line B to V'
                                                // area description accelerated
            "VVaracc"           : forceMove,    // force vector at V displaced to V';   Line V to V'
                                                // area description accelerated
        };
    }
}) ();

