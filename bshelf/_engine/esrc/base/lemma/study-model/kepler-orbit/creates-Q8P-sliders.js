///adds Q and P sliders for
///for dq and body in
///models in propopositions 6-17 in Principia
(function(){
const { sn, nspaste, fldo, ssD,stdMod, sconf, rg, ssF } =
        window.b$l.atree({ ssFList: {
            creates__two_steps_closest_search,
            creates_Q8P_sliders,
}});
const qix2orb = sn( 'qix2orb', ssD, [] );
const graphArray = sn( 'graphArray', stdMod, [] );
return;


function creates_Q8P_sliders( rgOrb ){
    /// point P slider
    rg.P.acceptPos = newPos => {
        //we do employ a crude search for P, because it has
        //only decorational importance
        const qix = stdMod.two_steps_closest_search(
            newPos, !!'search from Graph array', 'skip_point' );
        if( qix !== null ){
            rg.P.qix = qix;
            ssF.updatesPNeighbours();
            stdMod.model8media_upcreate();
            return; //avoids repetition
        }
    }

    /// point Q slider
    rg.Q.acceptPos = newPos => {
        if( rg.P.skipPoint ) return;
        const qix = rg.P.qix;
        //we do employ a precise search for Q, for the sake
        //of exact simulation
        var Qqix = stdMod.two_steps_closest_search( newPos );
        if( Qqix === null || Qqix === qix ) return;
        if( sconf.TIME_IS_FREE_VARIABLE ){
            let tt = qix2orb[ Qqix ].tQ;
            let Dt = tt - qix2orb[ qix ].tQ;
            if( sconf.CURVE_REVOLVES && Dt<0 ) {
                ////the point P crossed start of the coninc,
                ////usually point A and point t(Q) became less
                ////than t(P),
                ////this line adjusts Dt by using "cycled t change",
                ////where time period is ssD.trange,
                Dt = (Dt + ssD.trange) % ssD.trange;
            }
            if(Dt< ssD.tStep*(sconf.SAGITTA_ACCURACY_LIMIT+1)||
                sconf.DT_SLIDER_MAX <= Dt ) return;
            ssD.Dt = Dt;
        } else {
            const q = qix2orb[ Qqix ].q;
            let Dq = q - qix2orb[ qix ].q;
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
            ssD.Dt = Dq/rg.P.dt_dq;
        }
        //:Dt or Dq changed
        ssF.builds_dq8sagit8displace( {rgOrb} );
        ssF.builds_orbit_data_graph( rgOrb );
        stdMod.model8media_upcreate();
        return; //avoids repetition
    }
}

function creates__two_steps_closest_search() {
    //the more, the better: slider accuracy:
    const SEARCH_POINTS = 50;
    //:alternative orbit arrays to be used:
    const q2o = qix2orb;
    const ga = graphArray;

    stdMod.two_steps_closest_search = two_steps_closest_search;
    return;


    ///doing two searches, first sparse
    ///and the second - precise,
    ///if argument fromGraph is truthed, then
    ///first sparce search done via valid graph points and
    ///then via exact orbit points,
    function two_steps_closest_search(
        r, //distance to this point

        //optional, using valid graph points and leave
        fromGraph,
        skip_point,
    ){
        fromGraph = !sn( 'solvable_orbit', fldo, true )
            ? false : fromGraph;
        const arr = fromGraph ? ga : q2o;
        const len = arr.length;
        const STEP = fromGraph ? 1 :
            Math.max( 1, Math.floor( len / SEARCH_POINTS ));
        const point = arr[0];
        const pos = point.rr;
        const x = r[0]-pos[0];
        const y = r[1]-pos[1];
        let min = x*x + y*y;
        let qix_closest = null;
        ///should be from 0: let qix=0;
        for( let qix=STEP; qix<len; qix+=STEP ){
            const point = arr[qix];
            if( skip_point && point.skipPoint ) continue;
            const pos = point.rr;
            const x = r[0]-pos[0];
            const y = r[1]-pos[1];
            const d2 = x*x + y*y;
            if( qix_closest === null || min>d2 ){
                min = d2;
                qix_closest = fromGraph ? point.qix : qix;
            }
        }
        if( fromGraph ) return qix_closest;


        const FINE_SEARCH_POINTS = 20;
        const fstart = qix_closest-FINE_SEARCH_POINTS;
        const fend = qix_closest+FINE_SEARCH_POINTS;
        ///refines the search
        for( let qix=fstart; qix<=fend; qix++ ){
            const point = q2o[qix];
            if(
                //we prefer sort out by "!" than
                //by limits 0 and array.length
                !point
                ||
                skip_point && point.skipPoint
            ) continue;
            const pos = point.rr;
            const x = r[0]-pos[0];
            const y = r[1]-pos[1];
            const d2 = x*x + y*y;
            if( min>d2 ){
                min = d2;
                qix_closest = qix;
            }
        }
        return qix_closest;
    }
}
})();