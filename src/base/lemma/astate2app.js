
( function() {
    var {
        ns,
        sconf,
        sapp,
        ssF,
        rg,
        amode,
        studyMods,
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
        ///todm: we assume all the studyMods are already created as
        ///part of "setModule()::stdMod = sn(SUB_MODEL, studyMods).... "
        ///and we add astate_2_rg8model8media to each study model ...
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            stdMod.astate_2_rg8model8media  = astate_2_rg8model8media;
            stdMod.astate_2_rg8model        = astate_2_rg8model;
            return;

            function astate_2_rg8model8media( astate, astateKey )
            {
                astate_2_rg8model( astate, astateKey );
                ns.haff( stdMod, 'sliders_value2pos' );
                //haff is for lemmas from the past: l1, l2, ...
                ns.haff( stdMod, 'media_upcreate' );
            }

            function astate_2_rg8model( astate, astateKey, dontRun_model_upcreate )
            {
                if( astate ) {
                    ns.paste( rg, astate );
                    rg.astateKey = astateKey;
                    ///patch: changes non-rg property: media center:
                    ///todm: legalize;
                    var mcenter = ns.haz( astate, 'media-mover' );
                    if( mcenter ) {
                        var mcenterA = ns.haz( mcenter, 'achieved' );
                        if( mcenterA ) {
                            var mcenterAA = ns.haz( mcenterA, 'achieved' );
                            if( mcenterAA ) {
                                sconf.activeAreaOffsetX = mcenterAA[0];
                                sconf.activeAreaOffsetY = mcenterAA[1];
                            }
                        }
                    }
                    var subessay = ns.haz( astate, 'subessay' );
                    if( subessay ) {
                        amode.subessay = subessay;
                    }
                }
                !dontRun_model_upcreate && ns.haff( stdMod, 'model_upcreate' );
            }
        });
    }    



}) ();

