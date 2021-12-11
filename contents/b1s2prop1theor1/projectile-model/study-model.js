( function() {
    var {
        sn, haff, haz,
        ssF,
        stdMod, amode, toreg, rg, sconf,
    } = window.b$l.apptree({
        SUB_MODEL : 'projectile_model',
        stdModExportList :
        {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;










    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        //develop. of this submodel is suspended
        return;

        // complimentary to and runs after
        // sconf.js::init_conf(),
        stdMod.decShapes_conf();
        //:primary params
        toreg( 'force' )
            ( 'lawPower', sconf.force[0][0] ) //-2
            ( 'lawConstant', sconf.force[0][1] )
            ;
        toreg( 'spatialStepsMax' )( 'pos', sconf.spatialStepsMax0 );

        //path and speeds have master-index, pi, offset pi=0
        toreg( 'path' )( 'pos', [
            rg.A.pos    //synchs ref to A
        ] );

        //:auxiliary params
        toreg( 'freePath' )( 'pos', [] );

        //freeTriangles have master-index, pi, offset ... see media-model
        //tp( 'freeTriangles', [] );

        //keplerTriangles have master-index, pi, offset ... see media-model
        toreg( 'keplerTriangles' )( 'pos', [] );

        //forces have master-index, pi, offset  ... see media-model
        toreg( 'forces' )( 'vectors', [] );

        //spawnes path placeholder
        toreg( 'pathRacks' )( 'pathRacks', [] );

        //**********************************************************************************
        //initially done in slider module
        //toreg( 'slider_sltime' ...
        //toreg( 'speeds' ...
        //toreg( 'timeStep' ...
        //toreg( 'spatialStepsMax' ...
        //**********************************************************************************

        ssF.doesSchedule_A_B_V_sliders_in_init_pars( stdMod );
        stdMod.creates_sliderDomModel__4__time();
        haff( stdMod, 'init_model_parameters_addon' );
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================



    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model_upcreate()
    {
        return;
        haff( stdMod, 'model_upcreate_addon' );
        ssF.ABVpos_2_trajectory( stdMod );
        stdMod.path_2_pathCrowd();
        stdMod.groupifies_pathModelShapes();
    }

}) ();

