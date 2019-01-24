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



        //===================================================
        // //\\ spawns study model from main parameters ssD
        //===================================================
        //=======================
        // //\\ calculates areas
        //=======================
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

