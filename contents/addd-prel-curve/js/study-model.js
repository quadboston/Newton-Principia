( function() {
    var {
        nspaste,
        mat,
        rg,
        amode,
        ssD,
        ssF,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;














    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        stdMod.createModelFunctions();

        //calculating limit by taking very small chord
        var theFun  = ssD.repoConf[ ssD.funKeyname2funIx.curveParabola ];
        var ww_Blpos   = theFun.fun( 0.0000001 );
        var ww_D       = mat.circumscribeCircleOverChordAndBothNormals( null, rg.A.pos, ww_Blpos );
        rg.Rc.pos[1]   = ww_D[1]/2;
    }









    ///****************************************************
    /// model scenario
    ///****************************************************
    function model_upcreate()
    {
        var theFun = ssD.repoConf[ ssD.funKeyname2funIx.curveParabola ];
        nspaste( rg.B.pos, theFun.fun( rg.B.pos[0] ) );
        var AD = ssF.circumscribeCircleOverChordAndBothNormals_XY( rg, 'AB' );
        nspaste( rg.D.pos, AD );
        rg.R.pos[1] = AD[1]/2;

        stdMod.amode2paintShapes();
    }

}) ();

