(function(){
const { sconf, nspaste, capture, toreg, ssF, ssD, sDomF,} =
      window.b$l.apptree({});
ssF.init_conf_addon = init_conf_addon;
ssD.P2_topicColors_elected = P2_topicColors_elected;
return;


///====================================================
/// add ownself to umbrella-subapp init_conf
///====================================================
function init_conf_addon (){
    sconf.mediaBgImage = "../../b1sec2prop1/js/img/b1s2p1t1.png";

    // //\\ makes capture
    nspaste( capture, {
    "proof-step-D": {
    "sl-shpid-time": {
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
    "sl-shpid-time": {
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
    "sl-shpid-time": {
        "curtime": 7.0001/4 * sconf.initialTimieStep
    },
            "sl-shpid-dt": {
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
                "sl-shpid-dt" : { "val" : sconf.initialTimieStep },
                "sl-shpid-time": {
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
}

function P2_topicColors_elected(tpel){
    const {
        force,
        forceMove,
        diagram,
        path,
    } = tpel;

    areaDescriptionAccelerated = [
        force[0], force[1], force[2]
    ];

    return {
        areaDescriptionAccelerated,
        "Paracc"            : force,  //Point C''
        "Caracc"            : force,  //Point C'
        "CCaracc"           : forceMove,  //Line C to C'
        "CParacc"           : diagram,  //Line C to C''
        "cCaracc"           : forceMove,  //Line c to C'
        "CaraccParacc"      : forceMove,  //Line C' to C''
        "BParacc"           : forceMove,  //Line B to C''
        "BCaracc"           : path,     //Line B to C'
        "SCaracc"           : diagram,  //Line S C'

        "SBCaracc"          : areaDescriptionAccelerated,
        // triangle SBC area description accelerated

        "Varacc"            : forceMove,    //Point V'
        "BVaracc"           : forceMove,
            // force at B deviated toward V;        Line B to V'
                                            // area description accelerated

            "VVaracc"           : forceMove,
            // force vector at V displaced to V';   Line V to V'
                                            // area description accelerated
    };
}
})();
