( function() {
const { sn, has, haz, rg, amode, stdMod, sconf, ssD,
        fldo, sData, ssF }
    = window.b$l.atree({
        stdModList : {
            P2gix,
        },
        ssFList : {
            builds_orbit_data_graph,
        }
});
const graphArray = sn( 'graphArray', stdMod, [] );
const qix2orb = sn( 'qix2orb', ssD, [] );
return;


function P2gix(){
    const qix = rg.P.qix;
    const gix = qix2orb[ qix ].gix;
    return gix;
}

function builds_orbit_data_graph( rgOrb ){
    const ADD = amode.aspect === 'addendum';
    const ULTIM_NORM = !ADD && haz( sconf,
                        'NORMALIZE_BY_ULTIM_IN_NON_ADDEN' );
    const TIME = sconf.TIME_IS_FREE_VARIABLE;
    const FORCE_PARAM_IS_ALONG_CURVE =
        sData.FORCE_PARAM_IS_ALONG_CURVE;
    const QS = sconf.Q_STEPS;
    const DS = sconf.DATA_GRAPH_STEPS;
    const known_force_law = sconf.force_law;
    const dataPeriod = Math.max( 1, Math.floor( QS/DS ) );

    rgOrb.graphFW_lemma.fw.content.pix2values = graphArray;
    graphArray.length = 0;

    ///prepares averages and placeholder for data graphs
    const qix2orb_len = qix2orb.length;
    var fQR_max = 0;
    var sagittaMax = -1;
    var instantForceMax = 0;
    let show_force_max = [];
    let show_force_min = [];
    var speedMax = 0;
    let forceSign = 1;
    for( let qix=0; qix<qix2orb_len; qix++ ){
        const bP = qix2orb[ qix ];
        bP.gix = Math.max(0,graphArray.length);
        if( qix%dataPeriod && qix!==QS ) continue;
        let graphColumn = {
            qix,
            nonSolvablePoint: bP.skipPoint,
            rr : bP.rr,
            //remnant from roller coaster
            x : FORCE_PARAM_IS_ALONG_CURVE ? bP.pathAtQ : bP.r,
            y : [],
        };
        graphArray.push( graphColumn );
        if( bP.skipPoint ) continue;

        const fQR = bP.fQR;
        const sagitta = bP.sagitta;
        const ds_dt = bP.ds_dt;
        if( known_force_law ){
            var instantForce = known_force_law(bP);
        } else {
            var instantForce = bP.trajectorialForce;
        }
        bP.instantForce = instantForce;
        if( forceSign > 0 ){
            //once it happened -1, it stays -1,
            forceSign = Math.sign(instantForce) < 0 ? -1 : 1;
        }
        if( TIME ){
            sagittaMax = Math.max( Math.abs( sagitta ),
                                sagittaMax );
        }
        instantForceMax = Math.max( Math.abs( instantForce ),
                                instantForceMax );
        fQR_max = Math.max( Math.abs( fQR ), fQR_max );
        speedMax = Math.max( speedMax, ds_dt );

        ///formulas predefined in sconf
        sconf.SHOW_FORMULAS.forEach( (f,fix) => {
            const val = f.fun(bP);
            const abs = Math.abs(val);
            if( !show_force_max.length ){
                show_force_max[fix] = abs;
                show_force_min[fix] = abs;
            }
            if( show_force_min[fix] > abs ) {
                show_force_min[fix] = abs;
            }
            if( show_force_max[fix] < abs ) {
                show_force_max[fix] = abs;
            }
            graphColumn.y[4+fix] = val;
        });
    }

    //------------------------------------------
    // //\\ resets graphArray
    //------------------------------------------
    graphArray.forceSign = forceSign;
    var garrLen = graphArray.length;
    const instantForceMax1 = 1/instantForceMax;
    //const fQR_max1 = ULTIM_NORM ? 1/instantForceMax : 1/fQR_max;
    const fQR_max1 = 1/fQR_max;
    const sagittaMax1 = 1/sagittaMax;
    const speedMax1 = 1/speedMax;

    //we estimate the sign of force by the sign of
    //some of the element,
    //if, in the future, this method become inaccurate,
    //this line needs modification,
    for( var gix = 0; gix<garrLen; gix++ ){
        const ga = graphArray[ gix ];
        const qix = ga.qix;
        const bP = qix2orb[ qix ];
        bP.gix = gix;
        let ds_dt = bP.ds_dt;
        ds_dt *= speedMax1;
        const inf = bP.instantForce;
        if( !ga.nonSolvablePoint ){
            ////avoids points already labeled as garbage
            ga.y[0]= instantForceMax1 * (ADD ? inf : Math.abs(inf));
            ga.y[1]= fQR_max1 * (ADD ? bP.fQR : Math.abs(bP.fQR)) ;
            ga.y[2]=ds_dt;
            if( TIME ){
                ga.y[3] = sagittaMax1 * (
                    ADD ? bP.sagitta : Math.abs(bP.sagitta)) ;
            }
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                ga.y[4+fix] /= show_force_max[fix] * (
                    ADD ? forceSign : 1);
            });
        }
    }
    //------------------------------------------
    // \\// resets graphArray
    //------------------------------------------
}
})();