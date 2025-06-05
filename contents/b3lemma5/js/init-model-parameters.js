( function() {
    var at = window.b$l.apptree({
        stdModExportList : {
            updateExperimentalFunction,
            init_model_parameters,
            toggleData : toggleExperimentalFunction,
        }
    });
    var sDomF = at.sDomF;
    //at.stdMod.updateExperimentalFunction = updateExperimentalFunction;
    
    //=================================================
    // //\\ configures repo of "experimental" functions
    //=================================================
    var repoConf;
    (function() {
        var a = 5; //usually interval length
        var a5 = a*a*a*a*a;
        var a7 = a5*a*a;
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
                fname : "Parabola y = 2sqrt(|x/" + a + "|)",
                fun : x => 2 * Math.sqrt( Math.abs(x/a) ),
            },
            {
                fname : "Polynomial y = 2(x/" + a + ")<sup>5</sup>",
                fun : x => { var x2 = x*x; return 2*x2*x2*x/a5; },
            },
            {
                fname : "Polynomial y = 2(x/" + a + ")<sup>7</sup>",
                fun : x => { var x2 = x*x; var x4=x2*x2; return 2*x4*x2*x/a7; },
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
    //=================================================
    // \\// configures repo of "experimental" functions
    //=================================================
    return;












    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        var toreg = at.toreg;
        var rg = at.rg;
        toreg( 'chosenExperimentalFunction' )( 'value', 0 );

        //:primary params
        toreg( 'O' )( 'pos', [0,0] );

        var n = at.sconf.basePairs.length-1;
        toreg( 'n' )( 'value', n );
        toreg( 'm' )( 'value', n );
        toreg( 'experimental' );

        //.spawns original experimental function data from book;
        addBookFunction();

        ///does indexing of pname2point related constructs;
        ///does this for all repo functions at once;
        Object.keys( at.sconf.pname2point ).forEach( pname => {
            toreg( pname )( 'pos', at.sconf.pname2point[ pname ].pos ); //in sync by reference
            rg[ pname ].pname   = pname;
            var opoint          = at.sconf.pname2point[ pname ];
            opoint.pointWrap    = rg[ pname ];
            opoint.ptype        = opoint.pname === "S" ?
                                  'approximator' : 'experimental';
        });
        rg.chosenExperimentalFunction.value = -1;
        at.stdMod.toggleData( !!"don't run model yet" );
        sDomF.detected_user_interaction_effect( 'doUndetected' );
    }

    //----------------------------------------------------------
    // //\\ calculates original function and
    //      adds it to repo
    //----------------------------------------------------------
    //      experimental function "dividedDifferences"
    //      repo.basePairs = sconf.basePairs ...
    function addBookFunction()
    {
        var xy = [];
        //... n = length - 1 because of stripping last element which is "(S,R)";
        var n = at.sconf.basePairs.length-1;
        for( i=0; i<n; i++ ) {
            var rp = at.sconf.basePairs[ i ];
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
            fun : at.mat.calculate_divided_differences( xy ).calculate_polynomial,
        };
        //checks the job;
        //var dd = mat.calculate_divided_differences( xy ).calculate_polynomial;
        //var Sx = sconf.pname2point.S.pos[0];
        //var rr = dd( Sx );
        //ccc( 'compare: xexp='+Sx + ' yexp=' + sconf.pname2point.R.pos[1] + ' res=' + rr);
    }
    //----------------------------------------------------------
    // \\// calculates original function and
    //----------------------------------------------------------

    function toggleExperimentalFunction( dontRunModel )
    {
        at.rg.chosenExperimentalFunction.value =
            ( at.rg.chosenExperimentalFunction.value + 1 ) % repoConf.length;
        !dontRunModel && at.stdMod.model8media_upcreate();
    }

    function updateExperimentalFunction()
    {
        var rg = at.rg;
        var chosen = repoConf[ rg.chosenExperimentalFunction.value ];
        var fun = chosen.fun;
        var n = at.sconf.basePairs.length-1;
        for( i=0; i<n; i++ ) {
            //// this context does:
            //// the master data points are in
            //// sconf.pname2point[ pname ].pos;
            //// do change them and this will change an experimental data points;

            var rp = at.sconf.basePairs[ i ];
            var xx = rp[0].pos[0];
            rp[1].pos[1] = fun( xx );
        }
        rg.experimental.expFunction = chosen.fun;
        rg.experimental.fname = chosen.fname;
    }

    
}) ();

