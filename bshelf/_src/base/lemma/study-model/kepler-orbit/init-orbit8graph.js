//attempt began to migrate this set of functions
//under umbrella of variable class rgOrb,
//but it is unfinished: namely some properties
//are still under stdMod umbrella
//
//take special care about stdMod.dyn_d2xy,
//it is rebildable,
(function(){
const {
        sn, $$, nspaste, hafa, haff, has, haz, nssvg, stripp,
        rg, stdMod, sconf, ssD, ssF, sData,
      }= window.b$l.atree({stdModList: {
        init__orbit8graph,
        init__kepler_config,
}});
return;


function init__kepler_config (rgOrb) {
    sconf.CURVE_RANGE =
        sconf.curve.ORBIT_Q_END - sconf.curve.ORBIT_Q_START;
    sconf.qSTEP = sconf.CURVE_RANGE / (sconf.qPOINTS-1);
    sn( 'orbModpos', rgOrb, [] );
    //this length is for orbit painting on svg,
    //we don't want to pant all of qPOINTS points,
    //1000 points is enough,
    rgOrb.orbModpos.length = Math.min( 1000, sconf.qPOINTS );

    sconf.qSTEPinv = 1 / sconf.qSTEP;

    sconf.ro02 = sconf.ro0*sconf.ro0 / 2;

    //3 and 5 make float noize on graph:
    //when DELTA_qix is about 1 - notable fluctuations on plot,
    //let make it 5 empirically,
    sn( 'Q_SLIDER_DELTA_qix_MIN_GAP', sconf, 5 );

    sData.PATH_IS_GRAPH_ABSCISS = haz(sconf,'PATH_IS_GRAPH_ABSCISS');
    //sets parameters of P
    rg.P.qix = Math.floor( sconf.parQ * sconf.qSTEPinv );
}

///executes once per landing
///todm: kepler-orbit-framework should be
///instance rg[rgn] of the class; part of this
///plane is began,
function init__orbit8graph( rgn ){
    const rgOrb = rg[rgn];
    init__kepler_config(rgOrb);
    rgOrb.gshape2svg = gshape2svg;
    rgOrb.rebuilds_orbit = rebuilds_orbit;
    rgOrb.graphFW_lemma = stdMod.creates_lemma_graph_fw
        ({ digramParentDom$:stdMod.legendRoot$ });
    rebuilds_orbit();

    ssF.creates__two_rounds_closest_search();

    // //\\ scenario: coincided P and Q: Q splits first
    rg.P.dragPriority = 10;
    rg.Q.dragPriority = 100;
    rg.P.DRAGGEE_HALF_SIZE = 40; //lets to catch P before Q,
    rg.Q.DRAGGEE_HALF_SIZE = 15; //usual default in fconf,
    // \\// scenario: coincided P and Q: Q splits first

    ssF.creates_Q8P_sliders( rgOrb );
    if( rg.S.draggableX || rg.S.draggableY ) {
        haff( stdMod, 'creates_S_slider' );
    }
    return;

    function gshape2svg(){
        const svgSTEPS = rgOrb.orbModpos.length;
        const qix2o = ssD.qix2orb; //local for speed
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
            const ORBIT_STEP = sconf.qPOINTS/svgSTEPS;
            const orbModpos = rgOrb.orbModpos;
            for( let oix=0; oix<svgSTEPS; oix++ ){
                let qix = Math.floor( oix * ORBIT_STEP );
                orbModpos[ oix ] = qix2o[qix].rr;
            }

            nssvg.polyline({
                rgX: rgOrb,
                pivots: rgOrb.orbModpos.map(
                            cp => ssF.modpos2medpos(cp) ),
                //if rgOrb.svgel is not yet created,
                //creates and keeps rgOrb.svgel always the same,
                //avoiding svgel dom leaks
                svgel: rgOrb.svgel,
                parent: stdMod.medScene,
            });
            rgOrb.cssClass && rgOrb.svgel$.cls(rgOrb.cssClass);
        }
    }

    //todm: there is a confusion in ver version:
    // in ver
    //    keepThisDt is missed,
    //    ssD.Dq = prevDq !== undefined ? prevDq : sconf.Dq0;
    //    ssD.Dt = prevDt || sn( ssD, 'Dt', sconf.Dt0 );
    function rebuilds_orbit( keepThisDt ) {
        hafa( rgOrb, 'recreates__bodyq2xy' )( sconf.curve );
        ssF.buildsOrbit( rgOrb );
        gshape2svg();
        sconf.FORCE_CALCULATION_IS_BASED_ON_TIME &&
            ssF.builds_orbit_time_grid();
        ssD.Dq = sconf.Dq0;
        ssD.Dt = keepThisDt || sn( 'Dt', ssD, sconf.Dt0 );
        ssF.builds_sagitta8fQR( rgOrb );
        ssF.builds_orbGraphData( rgOrb );
    }
}
})();