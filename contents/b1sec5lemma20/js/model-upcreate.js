( function() {
    var {
        sn, haz, mat,
        stdMod, rg, sconf, ssF, sData,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
            deriveParameters,
            ellmod2arr,
        },
    });
    var DID_INITIALIZED = false;
    return;


    function model_upcreate()
    {
        //stdMod.slider_a_pos2value( rg.a.pos );
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
        var qScale = 1.4;
        var Pq = PR * qScale;
        var Rpos = [ P[0] + Pr.unitVec[0] * PR, P[1] + Pr.unitVec[1] * PR ]; 
        var qpos = [ P[0] + Pr.unitVec[0] * Pq, P[1] + Pr.unitVec[1] * Pq ]; 
        var R = pos8tg_2_rg( 'R', Rpos ).pos;
        var q = pos8tg_2_rg( 'q', qpos ).pos;

        var C = rg.C.pos;
        var CR = mat.p1_to_p2( C,R );
        var Cq = mat.p1_to_p2( C,q );
        
        var B = rg.B.pos;
        var BT = mat.p1_to_p2( B,rg.T.pos );

        //intersection of two lines CR and BT has to be found:
        //q*uCR + C = q'*uBT + B needs to be solved against q,q' to find D
        var D = mat.linesCross( CR.unitVec, C, BT.unitVec, B );
        pos8tg_2_rg( 'D', D );

        var d = mat.linesCross( Cq.unitVec, C, BT.unitVec, B );
        pos8tg_2_rg( 'd', d );

        //------------------------------------
        // \\// thread from T to D
        //------------------------------------
        var A = rg.A.pos;
        var AB = [ B[0]-A[0], B[1]-A[1] ];
        var AC = [ C[0]-A[0], C[1]-A[1] ];
        var PB = [ P[0]-B[0], P[1]-B[1] ];
        var PC = [ P[0]-C[0], P[1]-C[1] ];

        var G = mat.linesCross( AB, D, AC, A );
        pos8tg_2_rg( 'G', G );
        var DG = [ D[0]-G[0], D[1]-G[1] ];

        var AC = [ C[0]-A[0], C[1]-A[1] ];
        var I = mat.linesCross( AB, D, AC, P );
        pos8tg_2_rg( 'I', I );
        var E = mat.linesCross( AB, A, AC, D );
        pos8tg_2_rg( 'E', E );
        var K = mat.linesCross( AB, P, AC, D );
        pos8tg_2_rg( 'K', K );
        var H = mat.linesCross( PB, P, DG, D );
        pos8tg_2_rg( 'H', H );
        var F = mat.linesCross( PC, P, AC, D );
        pos8tg_2_rg( 'F', F );
    }

    function q2rg( parQ, pname )
    {
        const pem = sData.polar_ell_model;
        pem.q = parQ;
        var { point, tangent } = mat.polar_ellipse( pem );
        pos8tg_2_rg( pname, point, tangent );
        return rg[ pname ];
    }

    /*
    ///draws pointy named "art" on ellipse ...
    ///good for dev ...
    function ellipsePar_create8paint( ePar )
    {
        q2rg( ePar, 'art' )
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
    */
    
    function pos8tg_2_rg( nameP, pos, tangent )
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
        var P = q2rg( sData.initialparP, 'P' ).pos;
        var A = q2rg( sData.initialparA, 'A' ).pos;
        var C = q2rg( sData.initialparC, 'C' ).pos;
        var B = q2rg( sData.initialparB, 'B' ).pos;
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
        //all in model units:
        var tpos = mat.linesCross(
            [-rg.B.tangent[0],-rg.B.tangent[1] ], B, nBA , P );
        pos8tg_2_rg( 't', tpos );
        //-----------------------
        // \\// deriving tangent
        //-----------------------

        var rpos = mat.linesCross( nCA, P, nCB, C );
        pos8tg_2_rg( 'r', rpos );

        //---------------------------
        // //\\ setting initial parT
        //      doing this only once per lemma init;
        //      later, this par will be from slider;
        //---------------------------
        if( DID_INITIALIZED ) { //ns.haz( rg, 'T' ) ) {
            var parT = rg.T.value;
        } else {
            var parT = sconf.initialParT;
            pos8tg_2_rg( 'T', [] );
            rg.T.value = parT;
            rg.T.pos2Tpar = pos2Tpar;
            DID_INITIALIZED = true;
        }
        var Tpos = [ -nBA[0]*parT + P[0],  -nBA[1]*parT + P[1] ];
        pos8tg_2_rg( 'T', Tpos );
        //---------------------------
        // \\// setting parT
        //---------------------------


        //decorations
        var Spos = mat.linesCross( nBA, P, nCA, C );
        pos8tg_2_rg( 'S', Spos );

        var Qpos = mat.linesCross( nBA, B, nCA, rpos );
        pos8tg_2_rg( 'Q', Qpos );
        //=========================================
        // \\// derived parameters
        //=========================================
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================

    ///does project vector(pos-P) on Pt:
    ///secures from perpendicular deviation of pos
    ///from the line Pt
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

     
    ///input parameters are in model namespace,
    ///ellipse to array
    function ellmod2arr( arg )
    {
        const stepsCount = arg.stepsCount;
        const step = 2*Math.PI/stepsCount;
        const pe = mat.polar_ellipse;
        const brs = sn( 'branches', arg, [] );
        const points = arg.points = [];
        let bpoints;
        let ro;
        let branchesLen = 0;
        for( var ii = 0; ii < stepsCount; ii++ ){
            arg.q = step * ii;
            const orb = pe(arg);
            if( !ii || Math.sign(ro)!==Math.sign(orb.ro) ){
                ro = orb.ro;
                bpoints = [];
                brs[ branchesLen ] = brs[ branchesLen ] || {};
                brs[ branchesLen ].points = bpoints;
                branchesLen++;
            }
            bpoints.push( orb.point );
            points.push( orb.point );
        }
        if( branchesLen === 3 ){
            ////second hyperbola branch is split, to
            ////first and third branch, so do
            ////connect them
            const ps = brs[2].points;
            const first = brs[0].points[0];
            ps[ ps.length ] = [first[0], first[1]];
        }
        ///removes dom stuff in brs if leftover
        for( ii=branchesLen; ii < brs.length; ii++ ){
            const svgel = haz( brs[ii], 'svgel' );
            if( svgel ){
                svgel.remove();
                delete brs[ii].svgel;
            }
        }
        brs.length = branchesLen;
    };
})();

