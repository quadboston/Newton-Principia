( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var sn          = ns.sn;
    var bezier      = sn('bezier');
    var mat         = sn('mat');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var sapp        = sn('sapp');
    var studyMods   = sn('studyMods', sapp);

    var tr; //       = ssF.tr;
    var tp; //       = ssF.tp;
    var toreg; //    = ssF.toreg;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';

    srg_modules[ modName + '-' + mCount.count ] = setModule;
    ssF.model8media_upcreate  = model8media_upcreate;

    return;












    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    /// registers model pars into common scope
    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    function setModule()
    {
        ssF.init_model_parameters = init_model_parameters;
        sn(SUB_MODEL, studyMods ).model8media_upcreate = model8media_upcreate;
        sn(SUB_MODEL, studyMods ).upcreate = model8media_upcreate;
        ssF.model8media_upcreate  = model8media_upcreate;
    }



    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        tr = ssF.tr;
        tp = ssF.tp;
        toreg = ssF.toreg;



        //:principal variable params:
        //sconf.curveModelPivots are negative in this model:
        toreg( 'curvePars' )( 'pars', ns.paste( [], sconf.curveModelPivots ) );

        //adds origin name, "O", for completeness
        var pn2p = sconf.pname2point;

        ///does indexing of pname2point related constructs;
        ns.eachprop( pn2p, (pos,pname) => {
            toreg( pname )
            ({
                pos,
                pname,
                //todm ... prolifirated coding: medpos, pos, ...  are two places:
                //         because of pWrap of itself is a prolifiration of rg.pname rack
                pointWrap : { pos:pos, pname },
            });

            switch( pname ) {
                case 'A' :
                case 'B' :
                    rg[ pname ].pointWrap.ptype = 'given';
                    break;
                /*
                case 'R' :
                case 'D' :
                    //we still possibly need medpos for these points for line
                    //and possibly need their line, this is why we keep these points
                    rg[ pname ].pointWrap.ptype = '';
                    break;
                */
                case 'd' :
                case 'r' :
                case 'b' :
                    rg[ pname ].pointWrap.ptype = 'proof';
                    break;
                default:
            }
        });

        //:sets up converged-tangent placeholder
        var pos = [];
        toreg( 'L' )( 'pname', 'L' )( 'pos', pos )(
            'pointWrap', {
                pos : pos,
                ptype : 'result',
            } );

        rg.B.pointWrap.unrotatedParameterX = rg.B.pos[0]*1.02;

        //getting original gap tangent
        toreg( 'originalGapTangent' )( 'tangent',
            mat.calculate_divided_differences( sconf.curveModelPivots ).derivativeAtZero()
        );
        rg.originalGapTangent.angle = Math.atan( rg.originalGapTangent.tangent );
        //ccc( 'rg.originalGapTangent.angle='+rg.originalGapTangent.angle );

        //sets angle as it is in original picture in lemma
        toreg( 'curveRotationAngle' )( 'angle', 0 );
    }





    //****************************************************
    // //\\ updates model and figure (and creates if none)
    //****************************************************
    function model8media_upcreate()
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
        //rg.D.pos[0] = rg.d.pos[0] / magn;
        //rg.R.pos[1] = rg.r.pos[1] / magn;
        //-------------------------------------------------------
        // \\// updates model
        //-------------------------------------------------------

        //-------------------------------------------------------
        // //\\ updates media
        //-------------------------------------------------------
        sn(SUB_MODEL, studyMods ).media_upcreate();
        ssF.upcreate_mainLegend(); //placed into "slider"
        //-------------------------------------------------------
        // \\// updates media
        //-------------------------------------------------------
    }
    //****************************************************
    // \\// updates model and figure (and creates if none)
    //****************************************************



    //=================================================
    // //\\ configures curve
    //=================================================
    function updateCurveFunction()
    {
        var pol = rg.curve = mat.calculate_divided_differences( rg.curvePars.pars );

        //ccc( 'rg.curve=', rg.curve );
        var originalFun = pol.calculate_polynomial;
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
        //ccc( 'angleL='+ angleL );
        rg.L.gapTangent = Math.tan( angleL );
        var newPos = rayTangent_2_staticPos( rg.L.gapTangent );
        rg.L.pos[0] = newPos[0];
        rg.L.pos[1] = newPos[1];
        sconf.pname2point.L = rg.L.pos;
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

