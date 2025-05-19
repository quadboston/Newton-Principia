( function() {
    var {
        sn, has, mcurve, mat, userOptions,
        amode, stdMod, rg, sconf, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsOrbit,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const tix2orbit = sn( 'tix2orbit', ssD, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    const orbitXYToDraw = sn( 'orbitXYToDraw', ssD, [] );
    const BONUS = userOptions.showingBonusFeatures() ? 1 : 0;
    return;


    function buildsOrbit()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        
        //this array speeds up conversion between q and t grids:
        //it elimiantes extra calculations and loops:
        tix2orbit.length = 0;
        
        graphArray.length =0;
        qix2orb.length = 0;
        
        const orbit_q_start = sconf.orbit_q_start;
        const q2xy = stdMod.q2xy;
        const FS = sconf.Q_STEPS;
        const orbitXYToDraw_LIMIT = Math.min( 1000, FS );
        const qrange = sconf.curveQRange;
        const qgrid_step = sconf.qgrid_step;
        var momentum0; //at start of the path
        //there is no prebilt orbit points, they are built and
        //embedded into svg in other place,
        ///they are recalculated here
        ///with other step here for derivative params,
        for (var qix = 0; qix<=FS; qix++ )
        {
            var bP = qix2orb[ qix ] = mcurve.planeCurveDerivatives({
                fun : q2xy,
                q : orbit_q_start + qix * qgrid_step,
                rrc : rg.S.pos,
            });
            var {
                rr,
                v, //|d𝗿/dq|
                r2,
                staticSectorialSpeed_rrrOnUU,
            } = bP;
            //------------------------------------------
            // //\\ preparing time array
            //------------------------------------------
            //meaning: dq_dt = dq/dt
            if( 0 === qix ) {
                momentum0 = staticSectorialSpeed_rrrOnUU;
                var ds_dt = 1;
                //v = ds/dq
                bP.timeAtQ = 0;
                var dq_dt = ds_dt/v;
            } else {
                var ds_dt = momentum0 / staticSectorialSpeed_rrrOnUU;
                var dq_dt = ds_dt/v;
                bP.timeAtQ = qix2orb[ qix -1 ].timeAtQ +
                             qgrid_step / dq_dt;
            }
            bP.ds_dt = ds_dt;
            bP.dq_dt = dq_dt;
            //------------------------------------------
            // \\// preparing time array
            //------------------------------------------
        }

        // //\\ one or many shapes
        if( !has( sconf, 'RESHAPABLE_ORBIT' ) ){
            sconf.RESHAPABLE_ORBIT = 1;
        }
        if( sconf.RESHAPABLE_ORBIT ){
            if( sconf.RESHAPABLE_ORBIT === 1 ){
                ////blocks redraw forever
                sconf.RESHAPABLE_ORBIT = 0;
            }
            ///for static orbit shapes shoult build once per launch,
            ///decoration: builds pivots for scalable decorational orbit
            const ORBIT_STEP = FS/orbitXYToDraw_LIMIT;
            for( let oix=0; oix<=orbitXYToDraw_LIMIT; oix++ ){
                let qix = Math.floor( oix * ORBIT_STEP );
                orbitXYToDraw[ oix ] = qix2orb[qix].rr;
            }
        }
        // \\// one or many shapes
        
        if( sconf.TIME_IS_FREE_VARIABLE ) {
            stdMod.builds_orbit_time_grid();        
        }
    }
}) ();

