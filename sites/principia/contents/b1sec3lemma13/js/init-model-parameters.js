(function(){
const {
    ns, sn, $$, nsmethods, nssvg, mcurve, integral, mat,
    fconf, ssF, ssD, sData, stdMod, sconf, rg, toreg,
} = window.b$l.atree({ stdModList: {
        init_lemma,
}});
const graphArray = sn( 'graphArray', stdMod, [] );
return;


function init_lemma (){
    //=================================================
    // //\\ model parameters,
    //      these are independent parameters,
    //      to be varied by sliders
    //=================================================
    //projection of speed to static tangent vector uu
    //at all points P used for differentiation,
    //body moves backward on x,
    toreg( 'vt' )( 'val', 1 );
    //=================================================
    // \\// model parameters,
    //=================================================
    stdMod.completesSlidersCreation();
    toreg( 'tangentCircle' );
    //==================================================
    // //\\ decoration graph
    //==================================================
    stdMod.graphFW_lemma = stdMod.creates_lemma_graph_fw({
        digramParentDom$:stdMod.legendRoot$
    });
    stdMod.graphFW_lemma.fw.content.pix2values = graphArray;
    //==================================================
    // \\// decoration graph
    //==================================================
}
})();