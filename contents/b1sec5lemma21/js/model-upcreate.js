( function() {
    var {
        sn, mat, nspaste,
        amode, stdMod, rg, sconf, ssF, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
            pos8tg_2_rg,
            baseParams_2_extendedParams,
            calculateConicPoint_algo,
            //deriveParameters,
        },
    });
    var DID_INITIALIZED = false;
    return;


    //***************************************************
    // //\\ updates figure (and creates if none)
    //***************************************************
    function model_upcreate()
    {
        baseParams_2_extendedParams();
        var {D,M,A,P, angleBCM} = calculateConicPoint_algo( rg.g.value );
        rg.angleBCM = angleBCM;
        pos8tg_2_rg( 'D', D );
        pos8tg_2_rg( 'M', M );
        pos8tg_2_rg( 'A', A );
        pos8tg_2_rg( 'P', P );
        //decorations:
        var N = [
            rg.gN.value*Math.cos( rg.gamma.value ) + rg.H.pos[0],
            -rg.gN.value*Math.sin(rg.gamma.value) + rg.H.pos[1]
        ];
        pos8tg_2_rg( 'N', N );

        if( amode.subessay === 'converse-proof' ) {
            let np = rg.n.pos;
            nspaste( np, mat.dropLine( 1.4, rg.N.pos, rg.M.pos, ) );
            {
                //point p
                let alpha = rg.alpha.value;
                let beta = rg.beta.value;
                let B = rg.B.pos;
                let C = rg.C.pos;
                let BN = mat.p1_to_p2( B, np ).vector;
                let CN = mat.p1_to_p2( C, np ).vector;
                //rotates sides of triangle n to cross them into point p
                let Bp = mat.rotatesVect( BN, -beta );
                let Cp = mat.rotatesVect( CN, alpha );
                nspaste( rg.p.pos, mat.linesCross( Bp, B, Cp, C ) );
                //point M
                rg.M.pos[0] += 0.1;
            }
        }
        curveModel2branches();
    }
    //***************************************************
    // \\// updates figure (and creates if none)
    //***************************************************

    function baseParams_2_extendedParams()
    {
        rg.b.value = 1- rg.a.value;
        pos8tg_2_rg( 'H', [ rg.C.pos[0] + rg.a.value, rg.O.pos[1] ] );
    }

    ///input:   parameter g, along the model line OM (former OG)
    function calculateConicPoint_algo( g )
    {
        var a = rg.a.value; //AH = a
        var b = rg.b.value; //BH = b
        var gamma = rg.gamma.value;
        var alpha = rg.alpha.value;
        var beta = rg.beta.value;
        var C = rg.C.pos;
        var B = rg.B.pos;

        //explanation:
        //triangle ABM sines theorem: b*sin(BS) = g*sin(BS+G)
        //(b-g*cosG)tgBS = gsinG;
        var cosG = Math.cos(gamma);
        var sinG = Math.sin(gamma);

        var ww = b-g*cosG;
        if( Math.abs(ww) < 1e-20 ) {
            BS = Math.PI/2;
        } else {
            var tanBS = g/ww * sinG;
            var BS = Math.atan( tanBS );
        }
        var addAngleBeta = beta-BS;
        var rayB = [ -Math.cos( addAngleBeta ), Math.sin( addAngleBeta ) ];

        //triangle BAG sines theorem: a*sin(AS) = g*sin(G-AS)
        //(a+g*cosG)tgBS = g*sinG;
        var ww = a+g*cosG;
        if( Math.abs(ww) < 1e-20 ) {
            AS = Math.PI/2;
        } else {
            var tanAS = g/ww * sinG;
            var AS = Math.atan( tanAS );
        }
        var addAngleAlpha = alpha-AS;
        var rayA = [ Math.cos( addAngleAlpha ), Math.sin( addAngleAlpha ) ];
        var D = mat.linesCross( rayA, C, rayB, B );
        var M = [ g*cosG + rg.H.pos[0], -g*sinG + rg.H.pos[1] ]; //was point G

        // //\\ point A
        var rayB = [ -Math.cos( beta ), Math.sin( beta ) ];
        var rayA = [ Math.cos( alpha ), Math.sin( alpha ) ];
        var A = mat.linesCross( rayA, C, rayB, B );
        // \\// point A

        // //\\ point P
        {
            let BN = mat.p1_to_p2( rg.B.pos, rg.N.pos ).vector;
            let CN = mat.p1_to_p2( rg.C.pos, rg.N.pos ).vector;
            let Bp = mat.rotatesVect( BN, -beta );
            let Cp = mat.rotatesVect( CN, alpha );
            var P = mat.linesCross( Bp, B, Cp, C );
        }
        // \\// point P

        let angleBCM = Math.asin( mat.p1_to_p2(
                                  rg.C.pos, rg.M.pos ).unitVec[1] );
        return { D, M, A, P, angleBCM };
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================

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
    
    function curveModel2branches(){
        ////makes branches
        const algfun = stdMod.calculateConicPoint_algo;
        const stepsCount = 400;
        const start_q = - 5;
        const end_q = 5;
        const range_q = end_q - start_q;
        const step = range_q / stepsCount;
        const bro = ssD.branchesObject = sn( 'branchesObject', ssD );
        bro.stepsCount = stepsCount;
        bro.step = step;
        bro.start_q = start_q;
        bro.BRANCH_COMPLETER = 0;
        bro.formula = function( q ) {
            let point = algfun( q ).D;
            return {
                point,
                pointPar : point,
            };
        };
        bro.breakCondition = function( pointPar1,  pointPar2 ){
            return Math.max(
                Math.abs(pointPar1[0]-pointPar2[0]),
                Math.abs(pointPar1[1]-pointPar2[1])
            ) > 1;
        };
        stdMod.formula2branches(bro);
    }
})();