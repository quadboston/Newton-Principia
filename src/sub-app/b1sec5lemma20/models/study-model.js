( function() {
    var {
        ns, sn, mat,
        sconf,
        ssD, ssF, rg,
        sapp, amode,
        stdMod,

        //for lemma-scope-load-modules only
        tr,

    } = window.b$l.app({
        modName:'studyModel_2_ss',
        setModule });
    return;









    function setModule()
    {
        stdMod.init_model_parameters= init_model_parameters;
        stdMod.model8media_upcreate = model8media_upcreate;
        stdMod.upcreate             = model8media_upcreate;
        stdMod.amode2lemma          = amode2lemma;
        stdMod.model_upcreate       = model_upcreate;
    }

    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        //:primary params
        tr( 'a', 'value', sconf.a );
        tr( 'b', 'value', sconf.b );
        tr( 'O', 'pos', [0,0] );
        deriveParameters( 'do set T' );

        /*
        ///draws correct ellipse by model params
        (function() {
            var stepsCount = 50;
            var step = 2*Math.PI/stepsCount;
            for( var ii = 0; ii < stepsCount; ii++ ) {
                var t = step * ii;
                var ell = mat.ellipse({
                    //t:Math.PI*1.5,
                    t:t,
                    a:rg.a.value,
                    b:rg.b.value,
                    x0:0,
                    y0:0,
                    t0:0,
                    rotationRads:-sconf.rotationRads,
                });
                tr( 'e'+ii, 'pos', [ell.x, ell.y] );
                ssF.pos2pointy(
                    'e'+ii,
                    { 
                        cssClass        : 'tofill tostroke',
                        'stroke'        : 'red',
                        'fill'          : 'transparent',
                        'stroke-width'  : 1,
                        r               : 2,
                    }
                );
            };
        })();
        */
        //dev tool:
        //ellipsePar_create8paint( 1.50 )

    }


    function deriveParameters( doSetT )
    {
        //=========================================
        // //\\ "given" parameters
        //=========================================
        var P = par2ellipsePoint( Math.PI*2*sconf.initialparP, 'P' ).pos;
        var A = par2ellipsePoint( Math.PI*2*sconf.initialparA, 'A' ).pos;
        var C = par2ellipsePoint( Math.PI*2*sconf.initialparC, 'C' ).pos;
        var B = par2ellipsePoint( Math.PI*2*sconf.initialparB, 'B' ).pos;
        var nBA = mat.p1_to_p2( B, A ).unitVec;
        var nCA = mat.p1_to_p2( C, A ).unitVec;
        var nCB = mat.p1_to_p2( C, B ).unitVec;
        //=========================================
        // \\// "given" parameters
        //=========================================

        //=========================================
        // //\\ derived parameters
        // //\\ deriving tangent
        //-----------------------
        var t = mat.linesCross( [-rg.B.tangent[0],-rg.B.tangent[1] ], B, nBA , P );
        setRgPoint( 't', t );
        //-----------------------
        // \\// deriving tangent
        //-----------------------

        var r = mat.linesCross( nCA, P, nCB, C );
        setRgPoint( 'r', r );

        //---------------------------
        // //\\ setting initial parT
        //      doing this only once per lemma init;
        //      later, this par will be from slider;
        //---------------------------
        if( ns.haz( rg, 'T' ) ) {
            var parT = rg.T.value;
        } else {
            var parT = sconf.initialParT;
            setRgPoint( 'T', [] );
            rg.T.value = parT;
            rg.T.pos2Tpar = pos2Tpar;
        }
        var T = [ -nBA[0]*parT + P[0],  -nBA[1]*parT + P[1] ];
        setRgPoint( 'T', T );
        //---------------------------
        // \\// setting parT
        //---------------------------


        //decorations
        var S = mat.linesCross( nBA, P, nCA, C );
        setRgPoint( 'S', S );

        var Q = mat.linesCross( nBA, B, nCA, r );
        setRgPoint( 'Q', Q );
        //=========================================
        // \\// derived parameters
        //=========================================
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================

    //does project (pos-P) on Pt:
    function pos2Tpar( pos )
    {
        var P=rg.P.pos;
        var t=rg.t.pos;
        var PT = mat.p1_to_p2( P, pos );
        var Pt = mat.p1_to_p2( P,t );
        //finds algebraic sign
        var ut = Pt.unitVec;
        var uT = PT.unitVec;
        //does project (pos-P) on Pt:
        var PTalgebraic = PT.abs * ( ut[0]*uT[0]+ut[1]*uT[1] );
        return PTalgebraic;
     }


    //=================================================
    // estableishes amode and astate
    //=================================================
    function amode2lemma( towhich )
    {
        var theorion = amode.theorion;
        var aspect   = amode.aspect;
        var submodel = amode.submodel;
        //sDomF.detected_user_interaction_effect( 'doUndetected' );
        //if( theorion === 'claim' && aspect !== 'model' ) {
        var captured = null;
        /*
        if( !ssF.mediaModelInitialized ) {
            var captured = "initial-state";
        }
        */
        stdMod[ 'astate_2_' + towhich ]( ssD.capture[ captured ] );
    }


    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model8media_upcreate()
    {
        deriveParameters();
        model_upcreate();

        stdMod.media_upcreate();
        ssF.upcreate_mainLegend(); //placed into "slider"
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================




    function model_upcreate()
    {
        deriveParameters();

        //------------------------------------
        // //\\ thread from T to D
        //------------------------------------
        (function() {
            var P=rg.P.pos;
            var r=rg.r.pos;
            var t=rg.t.pos;
            var Pt = mat.p1_to_p2( P,t );
            var Pr = mat.p1_to_p2( P,r );
            var Pr_by_Pt = Pr.abs/Pt.abs;

            var PR = rg.T.pos2Tpar( rg.T.pos ) * Pr_by_Pt;
            var Rpos = [ P[0] + Pr.unitVec[0] * PR, P[1] + Pr.unitVec[1] * PR ]; 
            var R = setRgPoint( 'R', Rpos ).pos;

            var C = rg.C.pos;
            var CR = mat.p1_to_p2( C,R );
            var B = rg.B.pos;
            var BT = mat.p1_to_p2( B,rg.T.pos );

            //intersection of two lines CR and BT has to be found:
            //q*uCR + C = q'*uBT + B needs to be solved against q,q' to find D
            var Dpos = mat.linesCross( CR.unitVec, C, BT.unitVec, B );
            setRgPoint( 'D', Dpos );
        })();
        //------------------------------------
        // \\// thread from T to D
        //------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================



    function par2ellipsePoint( parP, nameP )
    {
        var { x,y,tangent } = mat.ellipse({
            t   : parP,
            a   : rg.a.value,
            b   : rg.b.value,
            x0  : 0,
            y0  : 0,
            t0  : 0,
            rotationRads : -sconf.rotationRads,
        });
        setRgPoint( nameP, [x,y], tangent );
        return rg[ nameP ];
    }

    ///draws pointy named "art" on ellipse ...
    ///good for dev ...
    function ellipsePar_create8paint( ePar )
    {
        par2ellipsePoint( Math.PI*2*ePar, 'art' )
        ssF.pos2pointy(
            'art',
            { 
                cssClass        : 'tofill tostroke',
                'stroke'        : 'brown',
                'fill'          : 'white',
                'stroke-width'  : 3,
                r               : 11,
            }
        );
    }

    function setRgPoint( nameP, pos, tangent )
    {
        //we cannot do P = tr( nameP, 'pos', [x, y] );
        //in a fear to erase [x,y] reference which may be already stored
        var P = sn( nameP, rg );
        var Ppos = sn( 'pos', P, [] );
        Ppos[0] = pos[0];
        Ppos[1] = pos[1];
        if( tangent )
        {
            var Ptangent = sn( 'tangent', P, [] );
            Ptangent[0] = tangent[0];
            Ptangent[1] = tangent[1];
        }
        return rg[ nameP ];
    } 



}) ();

