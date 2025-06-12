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
            rg.P.qix = stdMod.gets_orbit_closest_point( newPos, !!'fromGraph' );
            stdMod.model8media_upcreate();
        }

        /// point Q slider
        rg.Q.acceptPos = newPos => {
            const qix = rg.P.qix;
            var Qqix = stdMod.gets_orbit_closest_point( newPos );
            if( Qqix === qix ) return;
            if( sconf.TIME_IS_FREE_VARIABLE ){
                let tt = qIndexToOrbit[ Qqix ].timeAtQ;
                let Dt = tt - qIndexToOrbit[ qix ].timeAtQ;
                if( Dt < ssD.delta_t_between_steps * (sconf.SAGITTA_ACCURACY_LIMIT+1) ||
                    sconf.DT_SLIDER_MAX <= Dt ) return;
                ssD.Dt = Dt;
            } else {
                const q = qIndexToOrbit[ Qqix ].q;
                let Dq = q - qIndexToOrbit[ qix ].q;
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
       //Previously SEARCH_POINTS was 50, and there was also a second step that
       //refined the search with fine search points if not fromGraph however...
       //-When fromGraph was true (for point P dragging) there wern't enough
       // search points so it's movement was choppy.
       //-The main search runs in a fraction of a millisecond even with a large
       // number of points, so a second step for fine search isn't needed.
       //the more, the better: slider accuracy:
       const SEARCH_POINTS = 500;
       
       stdMod.gets_orbit_closest_point = gets_orbit_closest_point;
       return;


       function gets_orbit_closest_point(
            r, //distance to this point
            fromGraph //optional, using valid graph points
        ){
            const arr = fromGraph ? graphArray : qIndexToOrbit;
            const len = arr.length;
            const STEP = Math.max( 1, Math.floor( len / SEARCH_POINTS ));
            let min = null;
            let qix_min = null;
            for( let qix=STEP; qix<len; qix+=STEP ){
                const point = arr[qix];
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

