( function() {
    var {
        ns, sn, mat,
        sconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        d8d_p,
        stdMod,
    } = window.b$l.app({
        modName : 'l7-study-model',
        stdModExportList :
        {
            init_model_parameters,
            model8media_upcreate,
            model_upcreate,
            amode2lemma,
        },
    });
    var toreg; // = ssF.toreg;
    return;













    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        //this structure is ready now: sapp.amodel_initial ...
        toreg = ssF.toreg;

        ( function () {
            var pos = [];
            toreg( 'L' )
                ( 'pname', 'L' )
                ( 'pos', pos )
                (
                    'pointWrap', {
                       pos : pos,
                    }
                );
            sconf.pname2point.L = pos; //todm ... programming unwanted surprises
        })();

        ///this changes sconf ... pos
        ns.eachprop( sconf.pname2point, (pos,pname) => {
            toreg( pname )
            ({
                pos,
                pname,
                //todm ... proliferated coding: medpos, pos, ...  are two places:
                //         because of pWrap of itself is a prolifiration of rg.pname rack
                pointWrap : { pos, pname },
            });
        });

        rg.B.pointWrap.unrotatedParameterX = rg.B.pos[0]*1.02;

        //getting original gap tangent
        toreg( 'originalGapTangent' )( 'tangent',
            mat.calculate_divided_differences( sconf.curveModelPivots ).derivativeAtZero()
        );
        rg.originalGapTangent.angle = Math.atan( rg.originalGapTangent.tangent );
        //c cc( 'rg.originalGapTangent.angle='+rg.originalGapTangent.angle );

        //sets angle as it is in original picture in lemma
        toreg( 'curveRotationAngle' )( 'angle', 0 );

        //:we declaring these geometrical shape here
        //:because we need to set their app-state attributes before
        //:these shapes created in media-module.
        toreg( 'line-rd' );
        toreg( 'line-bd' );
        toreg( 'line-Ad' );
        toreg( 'line-Ab' );
        toreg( 'line-AD' );
        toreg( 'line-AL' );
        toreg( 'magnifiedCurve' );

        //l7
        toreg( 'line-BF' );
        toreg( 'line-AG' );
        toreg( 'line-BE' );
        toreg( 'line-AF' );
        toreg( 'line-AE' );
        toreg( 'line-BG' );
        ( function () {
            var pos = [];
            toreg( 'F' )
                ( 'pname', 'F' )
                ( 'pos', pos )
                (
                    'pointWrap', {
                       pos : pos,
                    }
                )
                ;
                sconf.pname2point.F = pos;
        })();
        ( function () {
            var pos = [];
            toreg( 'G' )
                ( 'pname', 'G' )
                ( 'pos', pos )
                (
                    'pointWrap', {
                       pos : pos,
                    }
                )
                ;
                sconf.pname2point.G = pos;
        })();
        ( function () {
            var pos = [];
            toreg( 'E' )
                ( 'pname', 'E' )
                ( 'pos', pos )
                (
                    'pointWrap', {
                       pos : pos,
                    }
                )
                ;
                sconf.pname2point.E = pos;
        })();
    }


    //Called once per every theorion/aspect changing
    //Legend:
    //  ptype borrows the color from topic, but does not set object to the topic
    //  topic belongings happens trought pname or tpclass.
    function variableInit()
    {
        //:principal variable params:
        //sconf.curveModelPivots are negative in this model:
        toreg( 'curvePars' )( 'pars', ns.paste( [], sconf.curveModelPivots ) );

        ///does indexing of pname2point related constructs;
        ///todo ... should be done by amode-state
        ns.eachprop( sconf.pname2point, (pos,pname) => {
            switch( pname ) {
                case 'A' :
                case 'B' :
                case 'D' :

                    //l7

                case 'F' :
                case 'E' :
                case 'G' :
                    rg[ pname ].pointWrap.ptype = 'given';
                    break;
                case 'R' :
                //case 'r' :
                    rg[ pname ].undisplay = true;
                    break;
                case 'd' :
                case 'b' :
                    rg[ pname ].pointWrap.ptype = 'proof';
                    break;
                default:
            }
        });

        //var aname = "ordinate";
        //ssF.toreg( aname );
        //rg[ aname ].undisplay = true;

        var aname = "line-Ar";
        ssF.toreg( aname );
        rg[ aname ].undisplay = true;

        //:sets up converged-tangent placeholder
        rg.L.pointWrap.ptype = 'result';
    }

    //=================================================
    // //\\ state patch
    //=================================================
    function amode2lemma( towhich )
    {
        if( towhich === 'rg8model' ) {
            variableInit();
        }
        applySetter( 'astate_2_' + towhich );
    }

    function applySetter( setter )
    {
        var theorion = amode.theorion;
        var aspect   = amode.aspect;
        var submodel = amode.submodel;

        rg[ "line-AF" ].undisplay = true;
        rg[ "line-BF" ].undisplay = true;
        rg.F.undisplay = true;

        rg[ "line-BG" ].undisplay = true;
        rg[ "line-AE" ].undisplay = true;
        rg[ "line-BE" ].undisplay = true;
        rg[ "line-AG" ].undisplay = true;
        rg.G.undisplay = true;
        rg.E.undisplay = true;

        if( ( theorion === 'claim' || theorion === 'corollary' ) && aspect !== 'model' ) {
            var captured = "L-equal-d";
            rg.r.undisplay = true;
            rg.L.undisplay = true;
            rg.L.pointWrap.hideD8Dpoint = true;
            rg[ 'line-AL' ].undisplay = true;

            rg.d.undisplay = true;
            rg[ 'line-bd' ].undisplay = true;
            //l7
            rg[ 'line-rd' ].undisplay = true;
            rg[ 'line-Ad' ].undisplay = true;

            rg.b.undisplay = true;
            rg[ 'line-Ab' ].undisplay = true;
            rg[ 'magnifiedCurve' ].undisplay = true;
            sDomF.detected_user_interaction_effect();

        } else if(  aspect === 'model' || theorion === 'proof' ) {
            rg.L.undisplay = true;
            rg.L.pointWrap.hideD8Dpoint = true;
            rg[ 'line-AL' ].undisplay = true;

            rg.r.undisplay = true;
            rg.d.undisplay = false;
            rg[ 'line-bd' ].undisplay = false;
            rg[ 'line-rd' ].undisplay = true;
            rg[ 'line-Ad' ].undisplay = false;

            rg.b.undisplay = false;
            rg[ 'line-Ab' ].undisplay = false;

            rg[ 'magnifiedCurve' ].undisplay = false;

            //var captured = "reset-to-origin";
            var captured = "L-equal-d";
            sDomF.detected_user_interaction_effect( 'doUndetected' );
        }
        stdMod[ setter ]( ssD.capture[ captured ] );
    }
    //=================================================
    // \\// state patch
    //=================================================






    //****************************************************
    // //\\ updates model and figure (and creates if none)
    //****************************************************
    function model8media_upcreate()
    {
        model_upcreate();
        media_upcreate();
    }
    //****************************************************
    // \\// updates model and figure (and creates if none)
    //****************************************************



    //****************************************************
    // //\\ updates model (and creates if none)
    //****************************************************
    function model_upcreate()
    {
        //-------------------------------------------------------
        // //\\ updates model
        //-------------------------------------------------------
        rg.curveRotationAngle.sin = Math.sin( rg.curveRotationAngle.angle );
        rg.curveRotationAngle.cos = Math.cos( rg.curveRotationAngle.angle );
        updateCurveFunction();

        //fixing point B
        var newPos = rg.repoConf.value[0].fun( rg.B.pointWrap.unrotatedParameterX );
        rg.B.pos[0] = newPos[0];
        rg.B.pos[1] = newPos[1];

        curvePars_2_L();

        var Bx = rg.B.pos[0];
        var bpos = rayTangent_2_staticPos( rg.B.pos[1] / Bx );
        rg.b.pos =  bpos;
        rg.b.pointWrap.pos = bpos;

        //calculating magn
        var magn = toreg( 'magnitude' )( 'value', bpos[0]/Bx )( 'value' );

        //calculating R,D
        //makes line DR proportionally move
        rg.D.pos[0] = rg.d.pos[0] / magn;
        //rg.R.pos[1] = rg.r.pos[1] / magn;

        //:l7
        rg.F.pos[1] = rg.B.pos[1];
        rg.F.pos[0] = rg.B.pos[0] - rg.D.pos[0];
        rg.E.pos[1] = rg.D.pos[1];
        rg.E.pos[0] = rg.D.pos[0]*0.5;
        rg.G.pos[1] = rg.B.pos[1];
        rg.G.pos[0] = rg.B.pos[0] - rg.E.pos[0];
        //-------------------------------------------------------
        // \\// updates model
        //-------------------------------------------------------
    }
    //****************************************************
    // \\// updates model (and creates if none)
    //****************************************************


    //****************************************************
    // //\\ updates media (and creates if none)
    //****************************************************
    function media_upcreate()
    {
        stdMod.media_upcreate();
        stdMod.upcreate_mainLegend(); //placed into "slider"
    }
    //****************************************************
    // \\// updates media (and creates if none)
    //****************************************************


    //=================================================
    // //\\ configures curve
    //=================================================
    function updateCurveFunction()
    {
        var pol = rg.curve = mat.calculate_divided_differences( rg.curvePars.pars );

        var originalFun = pol.calculate_polynomial;
        ///It is an array because some lemmas can have multiple curves.
        var repoConf =
        [
            {
                fname : "Rotated curve",
                fun : (x ) => {
                        var sin = rg.curveRotationAngle.sin;
                        var cos = rg.curveRotationAngle.cos;
                        var y = originalFun( x );
                        var xx = cos * x - sin * y;
                        var yy = sin * x + cos * y;
                        return [ xx, yy ];
                },
            },
        ];
        rg.repoConf = { value : repoConf };
    }
    //=================================================
    // \\// configures curve
    //=================================================





    function curvePars_2_L()
    {
        var angleL = rg.originalGapTangent.angle + rg.curveRotationAngle.angle;
        rg.L.gapTangent = Math.tan( angleL );
        var newPos = rayTangent_2_staticPos( rg.L.gapTangent );
        rg.L.pos[0] = newPos[0];
        rg.L.pos[1] = newPos[1];
        //sconf.pname2point.L = rg.L.pos;
    }


    ///Input: rayTangent,
    ///Output: position of point of crossing of rayTangent from point A and
    ///static line rd,
    function rayTangent_2_staticPos( rayTangent )
    {
        var rayAngle = -Math.atan( rayTangent ); //treats direction-to-bottom as positive

        var rdX=rg.d.pos[0];
        var rdY=-rg.r.pos[1]; //treats direction-to-bottom as positive
        var rd = Math.sqrt( rdX*rdX + rdY*rdY );
        var sin_d = rdY/rd;
        var cos_d = rdX/rd;
        var angle_d = Math.acos( cos_d );

        var Sd = rdX / Math.sin( angle_d + rayAngle ) * Math.sin( rayAngle );
        var SdX = Sd * cos_d;
        var SdY = -Sd * sin_d; //treats direction-to-bottom as negative (as it must be)
        var Sx = rg.d.pos[ 0 ] - SdX;
        var Spos = [ Sx, SdY ];
        return Spos;
    }

}) ();

