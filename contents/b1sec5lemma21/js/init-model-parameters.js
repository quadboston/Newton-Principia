( function() {
    var {
        sn, mat,
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
        //:primary params
        var a = toreg( 'a' )( 'value', sconf.a )( 'value' );
        toreg( 'alpha' )( 'value', sconf.alpha );
        toreg( 'beta' )( 'value', sconf.beta );
        toreg( 'gamma' )( 'value', sconf.gamma );

        //dependent parameters
        toreg( 'nB' )( 'value', [ 1, 0 ] );
        toreg( 'nA' )( 'value', [ -1, 0 ] );

        //variable parameter
        toreg( 'g' )( 'value', sconf.initial_g );

        //decorations:
        toreg( 'gN' )( 'value', sconf.initial_gN );

        stdMod.setRgPoint( 'A', [ -rg.a.value, 0 ] );
        stdMod.setRgPoint( 'B', [ 1-rg.a.value, 0 ] );

        toreg( 'b' );
        stdMod.baseParams_2_extendedParams();
        stdMod.completesSlidersCreation();
        //dev tool:
        //ellipsePar_create8paint( 1.50 );
    }

}) ();

