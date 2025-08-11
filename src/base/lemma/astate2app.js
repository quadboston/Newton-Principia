( function() {
    var {
        nspaste, eachprop, haff, haz,
        sconf, sapp, ssF, rg,
        stdMod, amode,
    } = window.b$l.apptree({
        setModule,
    });
    return;


    function setModule()
    {
        sapp.init_astate2sapp = init_astate2sapp;
    }

    ///inits effective or empty astate_2_.... functions
    function init_astate2sapp()
    {
        ///and we add astate_2_rg8model8media to study model ...
        stdMod.astate_2_rg8model8media  = astate_2_rg8model8media;
        stdMod.astate_2_rg8model        = astate_2_rg8model;
        return;

        ///seems wrong approach, should be model upcreate
        function astate_2_rg8model8media( astate4rg, )
        {
            astate_2_rg8model( astate4rg, );
            haff( stdMod, 'sliders_value2pos' );
            //haff is for lemmas from the past: l1, l2, ...
            haff( stdMod, 'media_upcreate' ); //todm swap to ...generic
        }

        ///poor name, should be capture_2_rg8modelUpcreate
        ///possibly has nothing to do with amode toggler:
        function astate_2_rg8model( astate, dontRun_model_upcreate )
        {
            if( astate ) {
                nspaste( rg, astate );
                delete rg.subessay; //should not be there

                ///patch: changes non-rg property: media center:
                ///todm: legalize;
                var mcenter = haz( astate, 'media-mover' );
                if( mcenter ) {
                    var mcenterA = haz( mcenter, 'achieved' );
                    if( mcenterA ) {
                        var mcenterAA = haz( mcenterA, 'achieved' );
                        if( mcenterAA ) {
                            sconf.modorInPicX = mcenterAA[0];
                            sconf.modorInPicY = mcenterAA[1];
                        }
                    }
                }
                var subessay = haz( astate, 'subessay' );
                if( subessay ) {
                    amode.subessay = subessay;
                }
            }
            !dontRun_model_upcreate && haff( stdMod, 'model_upcreate' );
        }
    }    
})();