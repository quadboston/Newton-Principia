( function() {
    var {
        mat, globalCss,
        sconf, ssF, rg, stdMod, toreg, sData,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_lemma,
        },
    });
    return;


    function init_lemma()
    {
        sData.initialparC = sconf.initialparC;
        sData.initialparA = sconf.initialparA;
        sData.initialparB = sconf.initialparB;
        sData.initialparP = sconf.initialparP;
        toreg( 'b' )( 'value', sconf.b );
        const i2m = sconf.med2mod;
        {
            sData.polar_ell_model = {
                q0 : sconf.q0,
                e : sconf.excentricity,
                focus : ssF.medpos2modpos( sconf.focus ),
                latus2 : sconf.latus2*i2m,
                stepsCount : 1000,
            };
        }
        stdMod.curveModel2branches();
        sData.eScale = ( rg.eEnd.pos[0] - rg.eStart.pos[0] ) / sconf.eMax;
        stdMod.slider_a_value2pos();

        stdMod.deriveParameters( 'do set T' );
        stdMod.completesSlidersCreation();
        //dev tool: ellipsePar_create8paint( 1.50 )
    }
})();

