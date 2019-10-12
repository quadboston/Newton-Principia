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

    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    //ssF.pointB_2_time0 = pointB_2_time0;
    return;











    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    /// registers model pars into common scope
    ///mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    function setModule()
    {
        ssF.init_model            = init_model;
        sn(SUB_MODEL, studyMods ).model8media_upcreate = model8media_upcreate;
        sn(SUB_MODEL, studyMods ).upcreate = model8media_upcreate;
        sn(SUB_MODEL, studyMods ).calculateConicPoint = calculateConicPoint;
    }

    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model()
    {
        //:primary params
        var a = tr( 'a', 'value', sconf.a );
        tr( 'alpha', 'value', sconf.alpha );
        tr( 'beta', 'value', sconf.beta );
        tr( 'gamma', 'value', sconf.gamma );
        tr( 'O', 'pos', [0,0] );
        tr( 'H', 'pos', [0,0] );

        //dependent parameters
        tr( 'nB', 'value', [ 1, 0 ] );
        tr( 'nA', 'value', [ -1, 0 ] );

        //variable parameter
        tr( 'g', 'value', sconf.initial_g );
        //tr( 'g', 'value', 0.4 );

        //decorations:
        tr( 'gN', 'value', sconf.initial_gN );

        setRgPoint( 'A', [ -rg.a.value, 0 ] )
        setRgPoint( 'B', [ 1-rg.a.value, 0 ] )

        var b = tr( 'b' );
        deriveParameters();
        //dev tool:
        //ellipsePar_create8paint( 1.50 )
    }

    function deriveParameters()
    {
        rg.b.value = 1- rg.a.value;
        setRgPoint( 'H', [ rg.A.pos[0] + rg.a.value, rg.O.pos[1] ] );
    }


    ///input:   parameter g, along the model line OG
    function calculateConicPoint( g )
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






    //***************************************************
    // //\\ updates figure (and creates if none)
    //***************************************************
    function model8media_upcreate()
    {
        deriveParameters();
        var {D,G,AA} = calculateConicPoint( rg.g.value );
        setRgPoint( 'D', D );
        setRgPoint( 'G', G );
        setRgPoint( 'AA', AA );


        //decorations:
        var N = [
            rg.gN.value*Math.cos( rg.gamma.value ) + rg.H.pos[0],
            -rg.gN.value*Math.sin(rg.gamma.value) + rg.H.pos[1]
        ];
        setRgPoint( 'N', N );

        //-------------------------------------------------------
        // //\\ media part
        //-------------------------------------------------------
        sn(SUB_MODEL, studyMods ).media_upcreate();
        ssF.upcreate_mainLegend(); //placed into "slider"
        //-------------------------------------------------------
        // \\// media part
        //-------------------------------------------------------
    }
    //***************************************************
    // \\// updates figure (and creates if none)
    //***************************************************


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

