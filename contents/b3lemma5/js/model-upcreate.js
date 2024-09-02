( function() {
    var at = window.b$l.apptree({
        stdModExportList : {
            model_upcreate,
        },
    });
    var sDomF = at.sDomF;
    return;
    
    

    function model_upcreate()
    {
        var rg = at.rg;

        at.stdMod.updateExperimentalFunction();
        //above rebuilds at.sconf.basePairs[ i ][0/1].pos
        //which changes rg.approximator_curve in body of current function;

        //----------------------------------------------------------
        // //\\ calculates and stores approximator curve
        //----------------------------------------------------------
        var xy = [];
        var m = rg.m.value;
        for( i=0; i<m; i++ ) {
            xy[ i ] = [ at.sconf.basePairs[ i ][0].pos[0], at.sconf.basePairs[ i ][1].pos[1] ];
        }
        at.toreg( 'approximator_curve' )( 'value', xy );
        //sets the function:
        rg.approximator_curve.dividedDifferences = at.mat.calculate_divided_differences( xy );

        //takes care about single poit (S,R) which approximeates curve at abscissa S
        //.gets point of approximation R
        var pointApproxim = at.sconf.basePairs[ at.sconf.basePairs.length-1 ][1];
        //.calculates ordinate of R by supplying abscissa of R
        pointApproxim.pos[1] = rg.approximator_curve
            .dividedDifferences
             //.supplies abscissa of R
            .calculate_polynomial( pointApproxim.pos[0] );
        //----------------------------------------------------------
        // \\// calculates and stores approximator curve
        //----------------------------------------------------------
    }

}) ();

