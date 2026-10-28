( function() {
const { sn, has, haz, rg, amode, stdMod, sconf, ssD,
        fldo, sData, ssF }
    = window.b$l.atree({
        stdModList : {
            P2gix,
        },
        ssFList : {
            builds_orbit_data_graph_generic,
        }
});
return;


function P2gix(){
    const qix = rg.P.qix;
    const gix = qix2orb[ qix ].gix;
    return gix;
}

function builds_orbit_data_graph_generic( rgOrb ){
    const qix2orb = sn( 'qix2orb', rgOrb, [] );
    const graphArray = rgOrb.graphFW_lemma.fw.content.pix2values;
    const QS = sconf.Q_STEPS;
    const DS = sconf.DATA_GRAPH_STEPS;
    const dataPeriod = Math.max( 1, Math.floor( QS/DS ) );
    graphArray.length = 0;

    ///prepares averages and placeholder for data graphs
    const qix2orb_len = qix2orb.length;
    for( let qix=0; qix<qix2orb_len; qix++ ){
        const bP = qix2orb[ qix ];
        bP.gix = Math.max(0,graphArray.length);
        if( qix%dataPeriod && qix!==QS ) continue;
        let graphColumn = {
            qix,
            nonSolvablePoint: bP.skipPoint,
            rr : bP.rr,
            x : bP.r,
            y : [],
        };
        graphArray.push( graphColumn );
        if( bP.skipPoint ) continue;
    }

    //------------------------------------------
    // //\\ resets graphArray
    //------------------------------------------
    var garrLen = graphArray.length;
    for( var gix = 0; gix<garrLen; gix++ ){
        const ga = graphArray[ gix ];
        const qix = ga.qix;
        const bP = qix2orb[ qix ];
        bP.gix = gix;
        if( !ga.nonSolvablePoint ){
            ga.y[0]= rgShape.qix2val(qix);
        }
    }
    //------------------------------------------
    // \\// resets graphArray
    //------------------------------------------
}
})();