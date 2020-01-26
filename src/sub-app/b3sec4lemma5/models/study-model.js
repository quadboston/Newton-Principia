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

    var chosenExperimentalFunction;
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var repoConf;
    (function() {
        var a = 5; //usually interval length
        repoConf =
        [
            {
                fname : "Original function",
                fun : x => x,
            },
            {
                fname : "Line y = x/" + a,
                fun : x => x / a,
            },
            {
                fname : "Parabola y = 2x^2/"+a*a,
                fun : x => 2*x*x/(a*a),
            },
            {
                fname : "Parabola y = 2sqrt(|x/" + a + "|)/",
                fun : x => 2 * Math.sqrt( Math.abs(x/a) ),
            },
            {
                fname : "Hyperbola y=2/( x + 1 )",
                fun : x => 2 / ( x + 1 ),
            },
            {
                fname : "Ellipse x^2 + 4y^2 = " + a*a,
                fun : x => {
                    var a2 = a*0.5;
                    var xx = x - a2;
                    return Math.sqrt( Math.abs( a2*a2 - xx*xx ) )/2;
                },
            },
            {
                fname : "sin( PI/" + a + "*x )",
                fun : x => Math.sin( Math.PI / a * x ),
            },
        ];
    })();
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
        ssF.toggleData = toggleExperimentalFunction;
    }


    function toggleExperimentalFunction( dontRunModel )
    {
        chosenExperimentalFunction = ( chosenExperimentalFunction + 1 ) % repoConf.length;
        var chosen = repoConf[ chosenExperimentalFunction ];
        var fun = chosen.fun;
        var n = sconf.basePairs.length-1;
        for( i=0; i<n; i++ ) {
            //// this context does:
            //// the master data points are in
            //// sconf.pname2point[ pname ].pos;
            //// do change them and this will change an experimental data points;
            var rp = sconf.basePairs[ i ];
            var xx = rp[0].pos[0];
            rp[1].pos[1] = fun( xx ) ;
        }
        rg.experimental.expFunction = chosen.fun;
        rg.experimental.fname = chosen.fname;
        !dontRunModel && ssF.model8media_upcreate();
    }


    //----------------------------------------------------------
    // //\\ calculates and stores original
    //----------------------------------------------------------
    //      experimental function "dividedDifferences"
    //      repo.basePairs = sconf.basePairs ...
    function addBookFunction()
    {
        var xy = [];
        //... n = length - 1 because of stripping last element which is "(S,R)";
        var n = sconf.basePairs.length-1;
        for( i=0; i<n; i++ ) {
            var rp = sconf.basePairs[ i ];
            var xx = rp[0].pos[0];
            var yy = rp[1].pos[1];
            xy[ i ] = [ xx, yy ];
        }

        //.makes beginning of original-book-curve smooth
        xy.splice( 0,0, [xy[ 0 ][ 0 ] - 0.5, xy[ 0 ][ 1 ] * 0.7] );
        var lastPoint = xy[ xy.length-1 ];
        xy = xy.concat( [[ lastPoint[ 0 ] + 0.5, lastPoint[ 1 ] * 1.2 ]] );

        repoConf[0] =
        {
            fname : "Original lemma function",
            fun : mat.calculate_divided_differences( xy ).calculate_polynomial,
        };
        //checks the job;
        //var dd = mat.calculate_divided_differences( xy ).calculate_polynomial;
        //var Sx = sconf.pname2point.S.pos[0];
        //var rr = dd( Sx );
        //ccc( 'compare: xexp='+Sx + ' yexp=' + sconf.pname2point.R.pos[1] + ' res=' + rr);
    }
    //----------------------------------------------------------
    // \\// calculates and stores original
    //----------------------------------------------------------







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
        tr( 'experimental' );

        //.spawns original experimental function data from book;
        addBookFunction();

        ///does indexing of pname2point related constructs;
        ///does this for all repo functions at once;
        Object.keys( sconf.pname2point ).forEach( pname => {
            tr( pname, 'pos', sconf.pname2point[ pname ].pos ); //in sync by reference
            rg[ pname ].pname   = pname;
            var opoint          = sconf.pname2point[ pname ];
            opoint.pointWrap    = rg[ pname ];
            opoint.ptype        = opoint.pname === "S" ?
                                  'approximator' : 'experimental';
        });
        chosenExperimentalFunction = -1;
        ssF.toggleData( !!"don't run model yet" );

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
            //.gets point of approximation R
            var pointApproxim = sconf.basePairs[ sconf.basePairs.length-1 ][1];
            //.calculates ordinate of R by supplying abscissa of R
            pointApproxim.pos[1] = rg.approximator_curve
                .dividedDifferences
                 //.supplies abscissa of R
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

