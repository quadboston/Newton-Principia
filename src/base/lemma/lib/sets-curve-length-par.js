( function() {
    var {
        ns, sn, toreg, mcurve,
        fapp, fconf, sData,
        amode, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            setsPathStates,
        },
    });
    var qix2pstate = sn( 'qix2pstate', sData, [] );
    //var six2state = sn( 'six2state', sData, [] );
    return;






    function setsPathStates()
    {
        var Q_STEPS = 1000;

        //=============================================
        // //\\ localizes curve shape
        //=============================================
        var appCurve = rg[ 'approximated-curve' ];
        var qmax = appCurve.qmax;
        qix2pstate.length = 0;
        //=============================================
        // \\// localizes curve shape
        //=============================================

        //=============================================
        // //\\ setting start position
        //=============================================
        //start state
        var pathState = mcurve.planeCurveDerivatives({
            fun : appCurve.q2xy,
            q : 0,
        });
        pathState.s = 0;
        qix2pstate.qix = 0;
        qix2pstate.push( pathState );
        //=============================================
        // \\// setting start position
        //=============================================






        //=============================================
        // //\\ solves loop
        //=============================================
        var STEP_Q = qmax / Q_STEPS;
        for( var qix = 1; qix<=Q_STEPS; qix++ ) {
            var q = qix*STEP_Q;
            var ss = qix2pstate[ qix-1 ];
            var sstate = mcurve.planeCurveDerivatives({
                fun : appCurve.q2xy,
                q,
            });
            var rrBefore = ss.rr;
            var rr = sstate.rr;

            //gets curve element ds
            var dx = rr[0] - rrBefore[0];
            var dy = rr[1] - rrBefore[1];
            var ds = Math.sqrt( dx*dx + dy*dy );

            sstate.s = ss.s + ds;
            sstate.qix = qix;
            qix2pstate.push( sstate );
        }
        //=============================================
        // \\// solves loop
        //=============================================

        /*
        //=============================================
        // //\\ six2state
        //=============================================
        six2state.length = 0;
        var qix = 0;
        var smax = qix2pstate[ Q_STEPS ].s;
        var sStep = smax / Q_STEPS;
        qix2pstate.forEach( (dummy, six) => {
            var sIndexed = six === Q_STEPS ? smax : six * sStep;
            while( qix < Q_STEPS && qix2pstate[ qix ].s < sIndexed ) {
                ////sets the same state for times below tIndexed
                qix++;
            }
            six2state[ six ] = [ qix-1, qix];
        });
        //=============================================
        // \\// six2state
        //=============================================
        */

        /*
        six2state.forEach( (ps,six) => {
            if( ps[0] >= Q_STEPS - 2 ) {
                ccc( six, ps, qix2pstate[ ps[0] ], qix2pstate[ ps[1] ] );
            }
        });
        */
    }

}) ();

