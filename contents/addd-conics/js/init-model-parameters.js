( function() {
    var {
        ns, sn, $$, nsmethods, nssvg, mcurve, integral, mat,
        fconf, ssF, ssD, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_lemma,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    return;


    function init_lemma()
    {
        //=================================================
        // //\\ model parameters,
        //      these are independent parameters,
        //      to be varied by sliders
        //=================================================
        //curve //varied by pivots
        //      //pivot 'P' is attached to initial spped V,
        //      it is already in registry,

        //projection of speed to static tangent vector uu
        //at all points P used for differentiation,
        //body moves backward on x,
        toreg( 'vt' )( 'val', 1 );
        //=================================================
        // \\// model parameters,
        //=================================================

        toreg( 'approxer' );
        stdMod.creates_orbitRack();
        stdMod.completesSlidersCreation();
        toreg( 'tangentCircle' );

        //==================================================
        // //\\ decoration graph
        //==================================================
        stdMod.graphFW_lemma = stdMod.wraps_graph_fw({
            digramParentDom$:stdMod.legendRoot$
        });
        stdMod.graphFW_lemma.fw.content.pix2values = graphArray;
        //==================================================
        // \\// decoration graph
        //==================================================
        rg.allLettersAreHidden = true;
    }
})();
