//attempt began to migrate this set of functions
//under umbrella of variable class rgOrb,
//but it is unfinished: namely some properties
//are still under stdMod umbrella
//
//take special care about stdMod.dyn_d2xy,
//it is rebillable,
(function(){
const {
        sn, $$, nspaste, hafa, haff, haz, nssvg, stripp,
        rg, stdMod, sconf, ssD, ssF, sData,
      }= window.b$l.atree({stdModList: {
        init__orbit8graph,
        init__kepler_config,
}});
const graphArray = sn( 'graphArray', stdMod, [] );
const qix2orb = sn( 'qix2orb', ssD, [] );
return;


function init__kepler_config (){
    sconf.curveQRange = sconf.curve.orbit_q_end -
                        sconf.curve.orbit_q_start;
    sconf.qgrid_step = sconf.curveQRange / sconf.Q_STEPS;

    //todm competing aliases:
    sconf.qgrid_step1 = 1 / sconf.qgrid_step;
    sconf.q2qix = 1 / sconf.qgrid_step;

    sconf.ro02 = sconf.ro0*sconf.ro0 / 2;

    //3 and 5 make float noize on graph:
    sn( 'SAGITTA_ACCURACY_LIMIT', sconf, 10 );
    sData.FORCE_PARAM_IS_ALONG_CURVE = false; //local lemma can change this
}

///executes once per landing
///todm: kepler-orbit-framework should be
///instance rg[rgn] of the class; part of this
///plane is began,
function init__orbit8graph( rgn ){
    init__kepler_config();
    const rgOrb = rg[rgn];
    rgOrb.gshape2svg = gshape2svg;
    rgOrb.rebuilds_orbit = rebuilds_orbit;
    rgOrb.graphFW_lemma = stdMod.creates_lemma_graph_fw
        ({ digramParentDom$:stdMod.legendRoot$ });
    rebuilds_orbit();

    ssF.creates__gets_orbit_closest_point();

    //:sets parameters of P
    rg.P.qix = Math.floor( sconf.parQ * sconf.q2qix );
    var Porb = ssD.qix2orb[ rg.P.qix ];
    nspaste( rg.P.pos, Porb.rr );

    // //\\ scenario: coincided P and Q: Q splits first
    rg.P.dragPriority = 10;
    rg.Q.dragPriority = 100;
    rg.P.DRAGGEE_HALF_SIZE = 40; //lets to catch P before Q,
    rg.Q.DRAGGEE_HALF_SIZE = 15; //usual default in fconf,
    // \\// scenario: coincided P and Q: Q splits first

    ssF.creates_Q8P_sliders( rgOrb );
    if( rg.S.draggableX || rg.S.draggableY ) {
        stdMod.creates_S_slider();
    }
    return;

    function gshape2svg(){
        nssvg.polyline({
            rgX: rgOrb,
            pivots: rgOrb.orbitXY.map(
                        cp => ssF.modpos2medpos(cp) ),
            svgel: rgOrb.svgel,
            parent: stdMod.medScene,
        });
        rgOrb.cssClass && rgOrb.svgel$.cls(rgOrb.cssClass);
    }

    //todm: there is a confusion in ver version:
    // in ver
    //    keepThisDt is missed,
    //    ssD.Dq = prevDq !== undefined ? prevDq : sconf.Dq0;
    //    ssD.Dt = prevDt || sn( ssD, 'Dt', sconf.Dt0 );
    function rebuilds_orbit( keepThisDt ) {
        const SACC = sconf.SAGITTA_ACCURACY_LIMIT;
        const QS = sconf.Q_STEPS;
        hafa( rgOrb, 'recreates__bodyq2xy' )( sconf.curve );
        ssF.buildsOrbit( rgOrb );
        gshape2svg();
        sconf.TIME_IS_FREE_VARIABLE && ssF.builds_orbit_time_grid();
        ssD.Dq = sconf.Dq0;
        ssD.Dt = keepThisDt || sn( 'Dt', ssD, sconf.Dt0 );
        ssF.builds_dq8sagit8displace({ ulitmacy:sData.ULTIM_MAX, rgOrb });
        ssF.builds_dq8sagit8displace({ ulitmacy:sData.ULTIM_INSTANT, rgOrb });
        ssF.builds_dq8sagit8displace({ rgOrb });
        ssF.builds_orbit_data_graph( rgOrb );
    }
}
})();