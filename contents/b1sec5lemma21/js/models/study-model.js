( function() {
    var {
        sn, mat,
        sconf, ssD, ssF, sapp,
        amode, stdMod, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
            init_model_parameters,
            calculateConicPoint_algo,
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
        toreg( 'O' )( 'pos', [0,0] );
        toreg( 'H' )( 'pos', [0,0] );

        //dependent parameters
        toreg( 'nB' )( 'value', [ 1, 0 ] );
        toreg( 'nA' )( 'value', [ -1, 0 ] );

        //variable parameter
        toreg( 'g' )( 'value', sconf.initial_g );

        //decorations:
        toreg( 'gN' )( 'value', sconf.initial_gN );

        setRgPoint( 'A', [ -rg.a.value, 0 ] )
        setRgPoint( 'B', [ 1-rg.a.value, 0 ] )

        toreg( 'b' );
        baseParams_2_extendedParams();
        //dev tool:
        //ellipsePar_create8paint( 1.50 )
    }




    //***************************************************
    // //\\ updates figure (and creates if none)
    //***************************************************
    function model_upcreate()
    {
        baseParams_2_extendedParams();
        var {D,G,AA} = calculateConicPoint_algo( rg.g.value );
        setRgPoint( 'D', D );
        setRgPoint( 'G', G );
        setRgPoint( 'AA', AA );


        //decorations:
        var N = [
            rg.gN.value*Math.cos( rg.gamma.value ) + rg.H.pos[0],
            -rg.gN.value*Math.sin(rg.gamma.value) + rg.H.pos[1]
        ];
        setRgPoint( 'N', N );
    }
    //***************************************************
    // \\// updates figure (and creates if none)
    //***************************************************








    function baseParams_2_extendedParams()
    {
        rg.b.value = 1- rg.a.value;
        setRgPoint( 'H', [ rg.A.pos[0] + rg.a.value, rg.O.pos[1] ] );
    }


    ///input:   parameter g, along the model line OG
    function calculateConicPoint_algo( g )
    {
        var a = rg.a.value;
        var b = rg.b.value;
        var gamma = rg.gamma.value;
        var alpha = rg.alpha.value;
        var beta = rg.beta.value;
        var A = rg.A.pos;
        var B = rg.B.pos;

        //explanation:
        //triangle ABG sines theorem: b*sin(BS) = g*sin(BS+G)
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
        var D = mat.linesCross( rayA, A, rayB, B );
        var G = [ g*cosG + rg.H.pos[0], -g*sinG + rg.H.pos[1] ];

        // //\\ point AA
        var rayB = [ -Math.cos( beta ), Math.sin( beta ) ];
        var rayA = [ Math.cos( alpha ), Math.sin( alpha ) ];
        var AA = mat.linesCross( rayA, A, rayB, B );
        // \\// point AA

        return { D, G, AA };
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================



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

}) ();

