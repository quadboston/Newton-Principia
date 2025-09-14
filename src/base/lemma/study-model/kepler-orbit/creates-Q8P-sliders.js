///adds Q and P sliders for
///for dq and body in
///models in propopositions 6-17 in Principia
( function() {
    var { sn, ssD,stdMod, sconf, rg, } = window.b$l.apptree({ stdModExportList : {
            creates_Q8P_sliders, creates__gets_orbit_closest_point, }, });
    const tIndexToOrbit = sn( 'tIndexToOrbit', ssD, [] );
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    const graphArray = sn( 'graphArray', stdMod, [] );
    return;


    function creates_Q8P_sliders()
    {
        /// point P slider
        rg.P.acceptPos = newPos => {
            //Ensure solvable and qix exist to help prevent P6 errors when orbits
            //are disconnected
            if (ssD.solvable) {
                const qix = stdMod.gets_orbit_closest_point( newPos, !!'fromGraph' );
                if (qix) {
                    rg.P.qix = qix;
                    stdMod.model8media_upcreate();
                }
            }
        }

        /// point Q slider
        rg.Q.acceptPos = newPos => {
            const qix = rg.P.qix;
            var Qqix = stdMod.gets_orbit_closest_point( newPos );
            if( Qqix === qix ) return;
            if( sconf.TIME_IS_FREE_VARIABLE ){
                let tt = qIndexToOrbit[ Qqix ].timeAtQ;
                let Dt = tt - qIndexToOrbit[ qix ].timeAtQ;
                if( sconf.CURVE_REVOLVES ){
                    if( Dt<0 ) {
                        ////the point P crossed start of the coninc,
                        ////usually point A and point t(Q) became less than t(P),
                        ////this line adjusts Dt by using "cycled t change",
                        ////where time period is ssD.timeRange,
                        Dt = (Dt + ssD.timeRange) % ssD.timeRange;
                    }
                }
                if( Dt < ssD.delta_t_between_steps * (sconf.SAGITTA_ACCURACY_LIMIT+1) ||
                    sconf.DT_SLIDER_MAX <= Dt ) return;
                ssD.Dt = Dt;
            } else {
                const q = qIndexToOrbit[ Qqix ].q;
                let Dq = q - qIndexToOrbit[ qix ].q;
                if( sconf.CURVE_REVOLVES ){
                    if( Dq<0 ) {
                        ////the point P crossed start of the coninc,
                        ////usually point A and point q(Q) became less than q(P),
                        ////this line adjusts Da by using "cycled a change",
                        ////where q period is sconf.curveQRange,
                        Dq = (Dq + sconf.curveQRange ) % sconf.curveQRange;
                    }
                }
                if( Dq <=0  || Dq >= sconf.DQ_SLIDER_MAX ) return;
                ssD.Dq = Dq;
            }
            //:Dt or Dq changed
            stdMod.builds_dq8sagit8displace({});
            stdMod.builds_orbit_data_graph();
            stdMod.model8media_upcreate();
            return; //avoids repetition
        }
    }


   function creates__gets_orbit_closest_point() {
       stdMod.gets_orbit_closest_point = gets_orbit_closest_point;
       return;

       function gets_orbit_closest_point(
            r, //distance to this point
            fromGraph //optional, using valid graph points
        ){
            //Search every point in the array to ensure point P dragging isn't
            //choppy (previously only some points were checked).  Note this
            //runs in a fraction of a millisecond even with a large number of
            //points.
            const arr = fromGraph ? graphArray : qIndexToOrbit;
            let min = null;
            let qix_min = null;
            for( let qix=0; qix<arr.length; qix++){
                const point = arr[qix];
                if(!point) continue;
                const pos = point.rr;
                const x = r[0]-pos[0];
                const y = r[1]-pos[1];
                const d2 = x*x + y*y;
                if( qix_min === null || min>d2 ){
                    min = d2;
                    qix_min = fromGraph ? point.qix : qix;
                }
            }
            return qix_min;
        }
   }
}) ();

