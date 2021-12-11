( function() {
    var {
        nspaste,
        mat,
        rg,
        amode,
        ssD,
        ssF,
        sDomF,
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

        rg.B.circleScribedCurvature_param_t = 0.095; //taking arbitrary
        rg.B.circleScribedParabola_param_t = 0.2; //taking arbitrary
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            //pname, acceptPos, orientation, pos, nospinner,stdMod,
            pname : 'B',
            orientation : 'rotate',
            acceptPos : ( newPos, possibly_dragSurfaceAccomulatedMove ) =>
            {
                //todo: do name? it (drag?)SurfaceAccomulatedMove
                //ccc( 'total move=' + possibly_dragSurfaceAccomulatedMove[1].toFixed(4),
                //     't='+rg.B.circleScribedCurvature_param_t.toFixed(4),
                //);

                if( amode.subessay === 'infinite-frequency-circle-based-curvature' ) {
                    var smv =  possibly_dragSurfaceAccomulatedMove[1];
                    var absMove = Math.abs( smv );
                    var mv = smv / ( 0.5 + absMove );

                    var param_t = Math.max( 1e-20, ( 1 + mv ) * rg.B.achieved_par_t );
                    param_t     = Math.min( param_t, 0.099 );
                    rg.B.circleScribedCurvature_param_t = param_t;
                    //ccc( 'smv='+ smv.toFixed( 4 ) +
                    //     ' move factor=' + ( 1 + mv ).toFixed( 3 ) + ' t=' +
                    //     rg.B.circleScribedCurvature_param_t.toFixed( 10 ) );

                } else {
                    var smv =  possibly_dragSurfaceAccomulatedMove[0];
                    var param_t = rg.B.achieved_par_t + smv;
                    rg.B.circleScribedParabola_param_t = param_t;
                    var theFun = ssD.repoConf[ ssD.funKeyname2funIx.curveParabola ];
                    var Bpos = theFun.fun( param_t );
                    newPos[0] = Bpos[0];;
                    newPos[1] = Bpos[1];
                    //ccc( 'moved to x=' + rg.B.pos[0].toFixed(4) + ', y='+rg.B.pos[1].toFixed(4) );
                }
                return !!'move permitted';
            },
        });

        rg.B.processOwnDownEvent = function()
        {
            if( amode.subessay === 'infinite-frequency-circle-based-curvature' ) {
                rg.B.achieved_par_t = rg.B.circleScribedCurvature_param_t;
            } else {
                rg.B.achieved_par_t = rg.B.circleScribedParabola_param_t;
            }
        };

        stdMod.paintsAllCurves_forBackscene();
    }








    ///****************************************************
    /// model scenario
    ///****************************************************
    function model_upcreate()
    {
        if( amode.subessay === 'infinite-frequency-circle-based-curvature' ) {
            var theFun = ssD.repoConf[ ssD.funKeyname2funIx.curveIFC ];
            var www1 = theFun.fun( rg.B.circleScribedCurvature_param_t );
            nspaste( rg.B.pos, www1 );
        } else {
            var theFun = ssD.repoConf[ ssD.funKeyname2funIx.curveParabola ];
            var Bpos = theFun.fun( rg.B.circleScribedParabola_param_t );
            rg.B.pos[0] = Bpos[0];
            rg.B.pos[1] = Bpos[1];
        }

        ///todm move to essay launch
        (function (){
            //calculating limit by taking very small chord
            var ww_Blpos   = theFun.fun( 0.0000001 );
            var ww_D       = mat.circumscribeCircleOverChordAndBothNormals(
                             null, rg.A.pos, ww_Blpos );
            rg.Rc.pos[1]   = ww_D[1]/2;
        })();

        var AD = ssF.circumscribeCircleOverChordAndBothNormals_XY( rg, 'AB' );
        nspaste( rg.D.pos, AD );
        rg.R.pos[1] = AD[1]/2;
        //ccc( 'Instant Rc = ' + rg.R.pos[1].toFixed( 4 ) );

        stdMod.amode2paintShapes();
    }

}) ();

