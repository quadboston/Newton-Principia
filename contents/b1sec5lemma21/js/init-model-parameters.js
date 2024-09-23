( function() {
    var {
        sn, mat, globalCss,
        sconf, ssD, ssF, sapp,
        amode, stdMod, rg, toreg,
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
        ///todm do in generic way on platform-level
        globalCss.replace( `
            .bsl-approot tr.aspect--model,
            .bsl-approot svg .subessay--0,
            .bsl-approot svg .subessay--converse-proof,
            .bsl-approot svg .subessay--direct-proof
            {
                display : none;
            }
            .bsl-approot.subessay--converse-proof svg .subessay--converse-proof,
            .bsl-approot.subessay--direct-proof svg .subessay--direct-proof
            {
                display : block;
            }
            .bsl-approot.aspect--model tr.aspect--model {
                display : table-row;
            }
        `,
        'lemma-css-overrider'
        );
        
        //:primary params
        var a = toreg( 'a' )( 'value', sconf.a )( 'value' );
        toreg( 'alpha' )( 'value', sconf.alpha );
        toreg( 'beta' )( 'value', sconf.beta );
        toreg( 'gamma' )( 'value', sconf.gamma );

        //variable parameter
        toreg( 'g' )( 'value', sconf.initial_g );

        //decorations:
        toreg( 'gN' )( 'value', sconf.initial_gN );

        stdMod.setRgPoint( 'C', [ -rg.a.value, 0 ] ); //AH = a
        stdMod.setRgPoint( 'B', [ 1-rg.a.value, 0 ] ); //BH = b

        toreg( 'b' );
        stdMod.baseParams_2_extendedParams();
        stdMod.completesSlidersCreation();
        //dev tool:
        //ellipsePar_create8paint( 1.50 );
    }

}) ();

