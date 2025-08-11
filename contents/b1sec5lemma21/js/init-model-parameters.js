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


    function init_model_parameters()
    {
        //:primary params
        var a = toreg( 'a' )( 'value', sconf.a )( 'value' );
        toreg( 'alpha' )( 'value', sconf.alpha );
        toreg( 'beta' )( 'value', sconf.beta );
        toreg( 'gamma' )( 'value', sconf.gamma );

        //variable parameter
        toreg( 'g' )( 'value', sconf.initial_g );

        //decorations:
        toreg( 'gN' )( 'value', sconf.initial_gN );

        stdMod.pos8tg_2_rg( 'C', [ -rg.a.value, 0 ] ); //AH = a
        stdMod.pos8tg_2_rg( 'B', [ 1-rg.a.value, 0 ] ); //BH = b

        toreg( 'b' );
        stdMod.baseParams_2_extendedParams();
        stdMod.completesSlidersCreation();
        //dev tool: ellipsePar_create8paint( 1.50 );
    }
})();