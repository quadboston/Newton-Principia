( function() {
    var {
        mat, globalCss,
        sconf, ssF, rg, stdMod, toreg, sData,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    return;


    function init_model_parameters()
    {
        sData.initialparC = sconf.initialparC;
        sData.initialparA = sconf.initialparA;
		sData.initialparB = sconf.initialparB;
        sData.initialparP = sconf.initialparP;
        toreg( 'b' )( 'value', sconf.b );
        const i2m = sconf.inn2mod_scale;
        {
            sData.polar_ell_model = {
                q0 : sconf.q0,
                e : sconf.excentricity,
                focus : ssF.inn2mod( sconf.focus ),
                latus2 : sconf.latus2*i2m,
                stepsCount : 1000,
            };
        }
        stdMod.curveModel2branches();
        sData.eScale = ( rg.eEnd.pos[0] - rg.eStart.pos[0] ) / sconf.eMax;
        stdMod.slider_a_value2pos();

        stdMod.deriveParameters( 'do set T' );
        stdMod.completesSlidersCreation();
    }
})();

