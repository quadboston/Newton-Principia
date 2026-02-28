( function() {
    var {
        ns, sn, mat,
        sconf, ssD,
        stdMod,  toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
        },
    });
    var modelPaths = null;
    return;








    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model_upcreate()
    {
        //==========================
        //:at landing, copies study-model-pars from config to app model
        if( !ns.h( ssD, 'EPSILON' ) ) {
            ssD.EPSILON = sconf.EPSILON;
            ssD.delta_fraction = sconf.DELTA_FRACTION;
        }
        //==========================
        //:study-pars
        var EPSILON   = ssD.EPSILON;    //curve params
        var delta_fraction = ssD.delta_fraction;
        var limDemo     = mat.limDemo   = mat.limDemo || {};
        if( !limDemo.instance ) {
            //.recall: beats_sample is a result of execution of the data generator
            //.beats_sample = prepareBeatData()
            var ww = limDemo.dataSamples.beats_sample;
            ww.SVG_XAXIS_LEN    = 800;
            ww.SVG_XAXIS_START  = 100;

            ww.SVG_YAXIS_LEN    = 800;
            ww.SVG_YAXIS_START  = 50;
            limDemo.instance = limDemo.setDemo( ww );

            modelPaths = limDemo.instance.model_2_media(
                stdMod.medScene
            );
            toreg( 'modelPaths' )( 'modelPaths', modelPaths );
        }
        var lim = limDemo.dataSamples.beats_sample.lim;
        var modE = toreg( 'point-E' )( 'pos', [-0.06,lim + EPSILON] )( 'pos' );
        //ccc('upcr: modE.posY=' + rg['point-E']['pos'][1] );
        ///full interval of epsilon range
        toreg( 'eps_Neighb' )( 'eps_Neighb',
            [
                [ modE[0], 2*lim - modE[1] ],
                [ modE[0], modE[1] ]
            ]
        );
        ///upper half of epsilon strip
        toreg( 'eps_NeighbUp' )( 'eps_NeighbUp',
            [
                [ modE[0], lim ],
                [ modE[0], EPSILON + lim ]
            ]
        );

        //-----------------------------------------
        // //\\ finds gamma-neighbourhood
        //-----------------------------------------
        var absVariation = modelPaths.absVariation;
        var neighbIx = 0;
        absVariation.forEach( (abs, ix) => {
            if( EPSILON > abs ) {
                neighbIx = ix;
            }
        });
        var xNeighb= modelPaths.xArray[ neighbIx ];
        var yNeighb= modelPaths.absVariation[ neighbIx ];

        var neighbIxChosen = 1;
        var ww = delta_fraction * xNeighb;
        modelPaths.modelLowPath.forEach( (point, ix) => {
            if( point[0] <= ww && ix ) {
                neighbIxChosen = ix;
            }
        });
        toreg( 'neighbIxChosen' )( 'neighbIxChosen', neighbIxChosen );

        //ccc( neighbIx, xNeighb, yNeighb );
        var modD = toreg( 'point-D' )( 'pos', [delta_fraction * xNeighb, 0] )( 'pos' );

        toreg( 'yNeighbUpper' )( 'yNeighbUpper',
            {
                upperLine :
                [
                    [ 0,        lim+yNeighb ],
                    [ xNeighb,  lim+yNeighb ]
                ],
                lowerLine :
                [
                    [ 0,        lim-yNeighb ],
                    [ xNeighb,  lim-yNeighb ]
                ]
            }
        );
        toreg( 'neighbVertical' )( 'neighbVertical',
            [
                [ xNeighb,  lim+yNeighb ],
                [ xNeighb,  0 ]
            ]
        );
        ///permitted delta range:
        toreg( 'neighbHor' )( 'neighbHor',
            [
                [ 0,        0 ],
                [ xNeighb,  0 ]
            ]
        );
        ///permitted delta range:
        toreg( 'chosenDelta' )( 'chosenDelta',
            [
                [ 0,        0 ],
                [ modD[0],  modD[1] ]
            ]
        );
        //-----------------------------------------
        // \\// finds gamma-neighbourhood
        //-----------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================

}) ();

