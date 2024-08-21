( function() {
    var {
        sn, mat,
        stdMod, rg, sconf, ssF,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
            deriveParameters,
        },
    });
    var DID_INITIALIZED = false;
    return;
    








    function model_upcreate()
    {
        stdMod.slider_a_pos2value( rg.a.pos );
        deriveParameters();

        //------------------------------------
        // //\\ thread from T to D
        //------------------------------------
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
        //------------------------------------
        // \\// thread from T to D
        //------------------------------------
    }



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
        //we cannot do P = t r( nameP, 'pos', [x, y] );
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
        var tpos = mat.linesCross( [-rg.B.tangent[0],-rg.B.tangent[1] ], B, nBA , P );
        setRgPoint( 't', tpos );
        //-----------------------
        // \\// deriving tangent
        //-----------------------

        var rpos = mat.linesCross( nCA, P, nCB, C );
        setRgPoint( 'r', rpos );

        //---------------------------
        // //\\ setting initial parT
        //      doing this only once per lemma init;
        //      later, this par will be from slider;
        //---------------------------
        if( DID_INITIALIZED ) { //ns.haz( rg, 'T' ) ) {
            var parT = rg.T.value;
        } else {
            var parT = sconf.initialParT;
            setRgPoint( 'T', [] );
            rg.T.value = parT;
            rg.T.pos2Tpar = pos2Tpar;
            DID_INITIALIZED = true;
        }
        var Tpos = [ -nBA[0]*parT + P[0],  -nBA[1]*parT + P[1] ];
        setRgPoint( 'T', Tpos );
        //---------------------------
        // \\// setting parT
        //---------------------------


        //decorations
        var Spos = mat.linesCross( nBA, P, nCA, C );
        setRgPoint( 'S', Spos );

        var Qpos = mat.linesCross( nBA, B, nCA, rpos );
        setRgPoint( 'Q', Qpos );
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

}) ();

