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

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
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

        //:primary params
        tr( 'O', 'pos', [0,0] );

        var n = sconf.basePairs.length-1;
        tr( 'n', 'value', n );
        tr( 'm', 'value', n );

        Object.keys( sconf.pname2point ).forEach( pname => {
            tr( pname, 'pos', sconf.pname2point[ pname ].pos ); //in sync by reference
            //todm ... circular dependency:
            var opoint = sconf.pname2point[ pname ];
            opoint.pointWrap = rg[ pname ];
            rg[ pname ].originalPoint = opoint;
            opoint.ptype = opoint.pname === "S" || opoint.pname === "S" ?
                           'approximator' : 'experimental';
        });

        //----------------------------------------------------------
        // //\\ calculates and stores original
        //----------------------------------------------------------
        //      experimental function "dividedDifferences"
        ( function () {
            var xy = [];
            //... length - 1 because of stripping last element which is "(S,R)";
            for( i=0; i<n; i++ ) {
                xy[ i ] = [ sconf.basePairs[ i ][0].pos[0], sconf.basePairs[ i ][1].pos[1] ];
            }
            //.makes beginning of original-book-curve smooth
            xy.splice( 0,0, [xy[ 0 ][ 0 ] - 0.5, xy[ 0 ][ 1 ] * 0.7] );
            //.makes beginning of original-book-curve smooth
            xy = xy.concat( [ [xy[ xy.length-1 ][ 0 ] + 0.5, xy[ xy.length-1 ][ 1 ] * 1.2 ] ] );
            //ccc( 'xy=', xy );
            var experimental = tr( 'experimental', 'value', xy );
            //sets the function:
            rg.experimental.dividedDifferences = mat.calculate_divided_differences( xy );
            //checks the job;
            //var dd = mat.calculate_divided_differences( xy ).calculate_polynomial;
            //var Sx = sconf.pname2point.S.pos[0];
            //var rr = dd( Sx );
            //ccc( 'compare: xexp='+Sx + ' yexp=' + sconf.pname2point.R.pos[1] + ' res=' + rr);

        })();
        //----------------------------------------------------------
        // \\// calculates and stores original
        //----------------------------------------------------------

        //----------------------------------------------------------
        // //\\ constructing draggable points
        //----------------------------------------------------------
        /*
        ( function () {
            tr( 'draggable_points', 'pos', [0,0] );
        })();
        */
        //----------------------------------------------------------
        // \\// constructing draggable points
        //----------------------------------------------------------
    }

    //***************************************************
    // //\\ updates figure (and creates if none)
    //***************************************************
    function model8media_upcreate()
    {

        //----------------------------------------------------------
        // //\\ calculates and stores approximator curve
        //----------------------------------------------------------
        ( function () {
            var xy = [];
            var m = rg.m.value;
            for( i=0; i<m; i++ ) {
                xy[ i ] = [ sconf.basePairs[ i ][0].pos[0], sconf.basePairs[ i ][1].pos[1] ];
            }
            tr( 'approximator_curve', 'value', xy );
            //sets the function:
            rg.approximator_curve.dividedDifferences = mat.calculate_divided_differences( xy );

            //takes care about single poit (S,R) which approximeates curve at abscissa S
            var pointApproxim = sconf.basePairs[ sconf.basePairs.length-1 ][1];
            pointApproxim.pos[1] = rg.approximator_curve
                .dividedDifferences
                .calculate_polynomial( pointApproxim.pos[0] );
        })();
        //----------------------------------------------------------
        // \\// calculates and stores approximator curve
        //----------------------------------------------------------


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

}) ();

