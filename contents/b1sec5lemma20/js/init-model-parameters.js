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


    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        ///creates addendum points non-visibility machinery
        globalCss.replace( `
            .bsl-approot svg .aspect--model,
            .bsl-approot svg .subessay--0,
			.bsl-approot svg .subessay--case1,
			.bsl-approot svg .subessay--case2,
            .bsl-approot svg .subessay--corollary1,
			.bsl-approot svg .subessay--corollary2,
			.bsl-approot svg .subessay--corollary3
            {
                display : none;
            }
            .bsl-approot.subessay--case1 svg .subessay--case1
            {
                display : block;
            }
			.bsl-approot.subessay--case2 svg .subessay--case2
            {
                display : block;
            }
			.bsl-approot.subessay--corollary1 svg .subessay--corollary1
            {
                display : block;
            }
			.bsl-approot.subessay--corollary2 svg .subessay--corollary2
            {
                display : block;
            }
			.bsl-approot.subessay--corollary3 svg .subessay--corollary3
            {
                display : block;
            }
            .bsl-approot.aspect--model svg .aspect--model
            {
                display : block;
            }
            `,
            'lemma-css-overrider'
        );
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
        stdMod.ellmod2arr( sData.polar_ell_model );
        sData.eScale = ( rg.eEnd.pos[0] - rg.eStart.pos[0] ) / sconf.eMax;
        stdMod.slider_a_value2pos();

        stdMod.deriveParameters( 'do set T' );
        stdMod.completesSlidersCreation();
        //dev tool:
        //ellipsePar_create8paint( 1.50 )
    }
})();

