( function() {
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

    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;








    function setModule()
    {
        ssF.calculateCurvedArea = calculateCurvedArea;
        ssF.x0y_2_t             = x0y_2_t;
        ssF.const2positions     = const2positions;
        sapp.upcreate           = upcreate;
    }

    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function upcreate()
    {
        //:study-pars
        var modCurvPivots   = ssD.curvePivots;    //curve params
        var tC              = ssD.tC;             //point C curve param = vanish param
        var claimRatio      = ssD.claimRatio;
        var tiltRatio       = ssD.tiltRatio;

        var yRange          = sconf.APP_MODEL_Y_RANGE;



        //===================================================
        // //\\ spawns study model from main parameters ssD
        //===================================================
        var tanA        = modCurvPivots[1][0] / modCurvPivots[1][1];
                          tp( 'point_A', [ 0, 0 ] );
        var mod_e       = tp( 'point_e', [ 0, yRange ] );

        var modC        = tp( 'point_C', bezier.parT2point( tC, modCurvPivots ) );
        //var test      = tp( 'point_TEST', bezier.parT2point( 0.79, modCurvPivots ) );

        var Ey          = tiltRatio * modC[1];
        var Dy          = claimRatio * Ey;

        var modD        = tp( 'point_D', [ 0, Dy ] );
        var modE        = tp( 'point_E', [ 0, Ey ] );

        var remoteRatio = ssD.remoteRatio = mod_e[1] / modE[1];

        // //\\ looking for pointB
        var directionX  = modC[0];
        var directionY  = modC[1] - modE[1];
        var tB          = ssF.tB = bezier.line2bezier( 
                            modD, 
                            [ directionX, directionY ],
                            modCurvPivots[1],
                            modCurvPivots[2]
        )[0];
        var modB        = tp( 'point_B', bezier.parT2point( tB, modCurvPivots ) );
        // \\// looking for pointB

        var mod_b       = tp( 'point_b', mat.sm( remoteRatio, modB ) );
        var mod_c       = tp( 'point_c', mat.sm( remoteRatio, modC ) );
        var mod_d       = tp( 'point_d', mat.sm( remoteRatio, modD ) );

        // //\\ making areas
        tr( 'AGE', 'vertices', make_points_AGE( modC, modE, tanA ) );
        tr( 'AFD', 'vertices', make_points_AGE( modB, modD, tanA ) );
        tr( 'Age', 'vertices', make_points_AGE( mod_c, mod_e, tanA ) );
        tr( 'Afd', 'vertices', make_points_AGE( mod_b, mod_d, tanA ) );
        // \\// making areas


        var mod_g = rg[ 'Age' ].vertices[1];
        tp( 'point_g', mod_g );
        var mod_f = mat.sm( claimRatio, mod_g );
        tp( 'point_f', mod_f );




        //=======================
        // //\\ calculates areas
        //=======================
        var calcAreas = ssD.calculatedAreas = ssD.calculatedAreas || {};
        var rr2 = ssD.remoteRatio * ssD.remoteRatio;
        var rr_2 = 1/rr2;
        var claimRatio_2 = 1 / claimRatio / claimRatio;
        var remote = ssD.modRemoteCurPivots = const2positions( ssD.remoteRatio, modCurvPivots );
        var tiltEC = ( modC[1] - Ey ) / modC[0];
        var areas = bezier.zbezier2areas( [remote[1], remote[2]], tC, tiltEC, mod_g, sconf.areaScale );
        var areas = calcAreas[ 'Age' ] = 
        {
            total     : areas.areaBetweenTanT_8_curve,
            base      : areas.areaUnderTan1,
            delta     : areas.areaBetween_Tan1_Tan2_Curve
        };
        calcAreas[ 'AGE' ] = 
        {
            total     : areas.total * rr_2,
            base      : areas.base * rr_2,
            delta     : areas.delta * rr_2
        };
        var areas = bezier.zbezier2areas( [remote[1], remote[2]], tB, tiltEC, mod_f, sconf.areaScale );
        var areas = calcAreas[ 'Afd' ] = 
        {
            total     : areas.areaBetweenTanT_8_curve,
            base      : areas.areaUnderTan1,
            delta     : areas.areaBetween_Tan1_Tan2_Curve
        };
        calcAreas[ 'AFD' ] = 
        {
            total     : areas.total * rr_2,
            base      : areas.base * rr_2,
            delta     : areas.delta * rr_2
        };
        //=======================
        // \\// calculates areas
        //=======================

        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================






        //-------------------------------------------------------
        // //\\ media part
        //-------------------------------------------------------
        ssF.upcreateMedia();
        //-------------------------------------------------------
        // \\// media part
        //-------------------------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================



    //==========================================
    // //\\ model helpers
    // //\\ calculates area similar to AGE
    //==========================================
    /*
        Points and angles Aa, Ea, Ga, Ca:

        |                            .  
        |                         .
        |                    C  .  a
     Cy o----------.----------o--------------
        |         .       . .  
        |        . a  .   . 
        |     G o .     .
        |    . .      .
        |.    .     .
      E o a  .    .
        |   .   .
        |  .  .
        |a. .
        |. 
      A o      

    */
    ///Inputs: C,E
    ///Returns: A,G,E
    function make_points_AGE( C, E, tanAa )
    {
        var tanCa = (C[1]-E[1])/C[0];
        var Ca = Math.atan( tanCa );
        var Ea = Math.PI/2 + Ca;
        var Aa = Math.atan(tanAa);
        var Ga = Math.PI/2 - Aa - Ca;
        var AG = Math.sin(Ea) * E[1] / Math.sin( Ga );
        var G = [];
        G[1] = AG * Math.cos( Aa );
        G[0] = AG * Math.sin( Aa );
        return [ [0,0], G, E ];
    }
    //==========================================
    // \\// calculates area similar to AGE
    //==========================================


    //==========================================
    // //\\ calculateCurvedArea
    //==========================================
    function calculateCurvedArea( areaId, pivots, tend, startPoint, endPoint )
    {
        var area = tr( areaId );
        area.curve = bezier.bezier2lower( pivots, tend );
        area.startPoint = startPoint;
        area.endPoint = endPoint;
    }
    //==========================================
    // \\// calculateCurvedArea
    //==========================================


    //====================================================================
    // //\\ converts point-on-curve-coordinate x or y
    //      to curve parameter t
    //====================================================================
    ///returns: there can be two t`s:
    ///         in this case, t-of-closest-to-pivot0 is returned
    ///input:   x0y   = x or y
    ///         x0yIx = 1 for y, =0 for x
    function x0y_2_t( x0y, x0yIx )
    {
        // //\\ patches: todm
        //.avoid_param_t_interval_ends
        var avoid_ends = 0.00001;
        //.no negative x-ses and y-s
        x0y = Math.max( avoid_ends, x0y );
        // \\// patches: todm

        var modCurvPivots = ssD.curvePivots;

        var aa = modCurvPivots[0][x0yIx] - 2 * modCurvPivots[1][x0yIx] + modCurvPivots[2][x0yIx];
        var bb = -2*modCurvPivots[0][x0yIx] + 2 * modCurvPivots[1][x0yIx];
        var cc = modCurvPivots[0][x0yIx] - x0y;
        var roots = mat.squarePolyRoot( aa, bb, cc );
        if( roots.length === 0 ) {
            throw "Unexpected no-solution case: do better coding: todm";
        } else if( roots.length === 1 ) {
            var result = roots[0];
        } else if( Array.isArray(roots[0]) ) {
            ////edge cases, returns extremum of t
            var result = -bb / ( 2 * aa );
        } else {
            //c cc( 'two real roots: x0y=' + x0y + ' t1,t2=', roots );
            //'pivots=', modCurvPivots,
            //'aa=' + aa + ',' + bb + ',' + cc );
            //.here the home-cooking begins
            if( roots[0] < 0 ) {
                roots[0] = roots[1];
            }
            if( roots[1] < 0 ) {
                roots[1] = roots[0];
            }
            var result = Math.min( roots[0], roots[1], 1 - avoid_ends );
        }
        result = Math.max( Math.min( result, 1-avoid_ends ), avoid_ends );
        return result;
    }
    //====================================================================
    // \\// converts point-on-curve-coordinate x or y
    //====================================================================


    ///====================================================================
    ///rescales pivots
    ///====================================================================
    function const2positions( con, positions )
    {
        return positions.map( function( pos ) {
            return mat.sm( con, pos );
        });
    }
    //====================================================================
    // \\// model helpers
    //====================================================================

}) ();
