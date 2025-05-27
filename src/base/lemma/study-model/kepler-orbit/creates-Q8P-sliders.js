///adds Q and P sliders for
///for dq and body in
///models in propopositions 6-17 in Principia
( function() {
    var {
        sn,
        ssD,stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_Q8P_sliders,
            creates__gets_orbit_closest_point,
        },
    });
    const tix2orbit = sn( 'tix2orbit', ssD, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
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
                let tt = qix2orb[ Qqix ].timeAtQ;
                let Dt = tt - qix2orb[ qix ].timeAtQ;
                if( Dt < ssD.tgrid_step * (sconf.SAGITTA_ACCURACY_LIMIT+1) ||
                    sconf.DT_SLIDER_MAX <= Dt ) return;
                ssD.Dt = Dt;
            } else {
                const q = qix2orb[ Qqix ].q;
                let Dq = q - qix2orb[ qix ].q;
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
       //the more, the better: slider accuracy:
       const SEARCH_POINTS = 50;
       //:alternative orbit arrays to be used:
       const q2o = qix2orb;
       const ga = graphArray;
       
       stdMod.gets_orbit_closest_point = gets_orbit_closest_point;
       return;

       
       function gets_orbit_closest_point(
            r, //distance to this point
            fromGraph //optional, using valid graph points
        ){
            const arr = fromGraph ? ga : q2o;
            const len = arr.length;
            const STEP = Math.max( 1, Math.floor( len / SEARCH_POINTS ));
            const point = arr[0];
            const pos = point.rr;
            const x = r[0]-pos[0];
            const y = r[1]-pos[1];
            let min = x*x + y*y;
            let qix_min = null;
            for( let qix=STEP; qix<len; qix+=STEP ){
                const point = arr[qix];
                //if( point.invalid ) continue;
                const pos = point.rr;
                const x = r[0]-pos[0];
                const y = r[1]-pos[1];
                const d2 = x*x + y*y;
                if( qix_min === null || min>d2 ){
                    min = d2;
                    qix_min = fromGraph ? point.qix : qix;
                }
            }
            if( fromGraph ) return qix_min;
 
 
            const FINE_SEARCH_POINTS = 20;
            const fstart = qix_min-FINE_SEARCH_POINTS;
            const fend = qix_min+FINE_SEARCH_POINTS;
            ///refines the search
            for( let qix=fstart; qix<=fend; qix++ ){
                const point = q2o[qix];
                if( 
                    //we prefer sort out by "!" than
                    //by limits 0 and array.length
                    !point
                    ||
                    point.invalid
                    
                    //search for Q, for example, ignores
                    //null flagged points
                    //(fromGraph && point.invalid )
                ) continue;
                const pos = point.rr;
                const x = r[0]-pos[0];
                const y = r[1]-pos[1];
                const d2 = x*x + y*y;
                if( min>d2 ){
                    min = d2;
                    qix_min = qix;
                }
            }
            return qix_min;
        }
   }
}) ();

