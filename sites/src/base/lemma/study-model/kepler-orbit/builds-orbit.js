(function(){
    const {
        sn, has, haz, mcurve, flagdo,
        amode, stdMod, rg, sconf, ssD,
    } = window.b$l.atree({ ssFList: {
        buildsOrbit,
    }});
    const NON_SOLVABLE_THRESHOLD = 0.05;
    const graphArray = sn( 'graphArray', stdMod, [] );
    const tix2orbit = sn( 'tix2orbit', ssD, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    return;


    function buildsOrbit (rgOrb){
        const orbitXY = sn( 'orbitXY', rgOrb, [] );
        const ADDENDUM = amode.aspect === 'addendum';
        //this array speeds up conversion between q and t grids:
        //it elimiantes extra calculations and loops:
        tix2orbit.length = 0;

        graphArray.length =0;
        qix2orb.length = 0;

        const orbit_q_start = sconf.curve.orbit_q_start;
        const dyn_q2xy = rgOrb.bodyq2xy;
        const QS = sconf.Q_STEPS;
        const orbitXYToDraw_LIMIT = Math.min( 1000, QS );
        const qrange = sconf.curveQRange;
        const qgrid_step = sconf.qgrid_step;
        var momentum0; //at start of the path

        flagdo.solvable_orbit = true;
        var foldPoints = [];

        //there is no prebilt orbit points, they are built and
        //embedded into svg in other place,
        ///they are recalculated here
        ///with other step here for derivative params,
        for (var qix = 0; qix<=QS; qix++ )
        {
            var bP = qix2orb[ qix ] = mcurve.planeCurveDerivatives({
                fun : dyn_q2xy,
                q : orbit_q_start + qix * qgrid_step,
                rrc : rg.S.pos,
            });
            bP.qix = qix;
            var {
                rr,
                ds_dq, //|d𝗿/dq|
                r2,
                staticSectorialSpeed_rrrOnUU,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
            } = bP;
            if( qix === 0 ) {
                //sometimes utilized in model for precise sagitta calculations
                ssD.sectSpeed0 = staticSectorialSpeed_rrrOnUU;
            }

            // Kepler's motion: rvₜcos(w) = M
            // f = M²/(Rr²cos³(w))
            //cosAbs = Math.abs( sinOmega );
            //bP.nonSolvablePoint = false; no need bs. prot is null,
            if( NON_SOLVABLE_THRESHOLD > Math.abs( sinOmega ) ) {
                foldPoints.push( [ rr[0], rr[1] ] );
                bP.nonSolvablePoint = true;
                flagdo.solvable_orbit = false;
            }

            //------------------------------------------
            // //\\ preparing time array
            //------------------------------------------
            //meaning: dq_dt = dq/dt
            if( 0 === qix ) {
                momentum0 = staticSectorialSpeed_rrrOnUU;
                var ds_dt = 1;
                var timeAtQ = bP.timeAtQ = 0;
                var pathAtQ = bP.pathAtQ = 0;
                var dq_dt = ds_dt/ds_dq;
            } else {
                var ds_dt = momentum0 / staticSectorialSpeed_rrrOnUU;
                var dq_dt = ds_dt/ds_dq;
                var pathAtQ = bP.pathAtQ = pathAtQ + qgrid_step * ds_dq;
                var timeAtQ = bP.timeAtQ = timeAtQ + qgrid_step / dq_dt;
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
        //todo apparen duplicate with other builder or
        //svg object duplicates and leaks, this is seen when,
        //we do not add ...P11 in media_upcreate basic,
        if( sconf.RESHAPABLE_ORBIT ){
            if( sconf.RESHAPABLE_ORBIT === 1 ){
                ////blocks redraw forever
                sconf.RESHAPABLE_ORBIT = 0;
            }
            ///for static orbit shapes shoult build once per launch,
            ///decoration: builds pivots for scalable decorational orbit
            const ORBIT_STEP = QS/orbitXYToDraw_LIMIT;
            for( let oix=0; oix<=orbitXYToDraw_LIMIT; oix++ ){
                let qix = Math.floor( oix * ORBIT_STEP );
                orbitXY[ oix ] = qix2orb[qix].rr;
            }
        }
        // \\// one or many shapes
        ssD.foldPoints = foldPoints;
    }
})();