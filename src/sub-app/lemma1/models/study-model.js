( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var bezier      = sn('bezier');
    var mat         = sn('mat');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var sapp        = sn('sapp');
    var sDomN       = sn('dnative', sapp);

    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;


    var modelPaths = null;


    return;








    function setModule()
    {
        sapp.upcreate = upcreate;
    }

    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function upcreate()
    {
        //:study-pars
        var EPSILON   = ssD.EPSILON;    //curve params

        var mat	        = ns.mat        = ns.mat || {};
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
            modelPaths = limDemo.instance.model_2_media( sDomN.svg );
        }
        var lim = limDemo.dataSamples.beats_sample.lim;
        var modE = tp( 'point-E', [-0.06,lim + EPSILON] );
        //ccc('upcr: modE.posY=' + rg['point-E']['pos'][1] );
        ///full interval of epsilon range
        tr( 'eps_Neighb', 'eps_Neighb',
            [
                [ modE[0], 2*lim - modE[1] ],
                [ modE[0], modE[1] ]
            ]
        );
        ///upper half of epsilon strip
        tr( 'eps_NeighbUp', 'eps_NeighbUp',
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
        //ccc( neighbIx, xNeighb, yNeighb );

        tr( 'yNeighbUpper', 'yNeighbUpper',
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
        tr( 'neighbVertical', 'neighbVertical',
            [
                [ xNeighb,  lim+yNeighb ],
                [ xNeighb,  0 ]
            ]
        );
        tr( 'neighbHor', 'neighbHor',
            [
                [ 0,        0 ],
                [ xNeighb,  0 ]
            ]
        );
        //-----------------------------------------
        // \\// finds gamma-neighbourhood
        //-----------------------------------------
                

        //-------------------------------------------------------
        // //\\ media part
        //-------------------------------------------------------
        ssF.upcreateMedia( limDemo );
        //-------------------------------------------------------
        // \\// media part
        //-------------------------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================

}) ();

