(function(){
const {
    ns, sn, $$, nsmethods, nssvg, mcurve, integral, mat,
    fconf, ssF, ssD, sData, stdMod, sconf, rg, toreg,
} = window.b$l.atree({ stdModList: {
        init_lemma,
}});
const graphArray = sn( 'graphArray', stdMod, [] );


function init_lemma(){
    stdMod.completesSlidersCreation();
    stdMod.graphFW_lemma = stdMod.creates_lemma_graph_fw({
        digramParentDom$:stdMod.legendRoot$
    });
    stdMod.graphFW_lemma.fw.content.pix2values = graphArray;
}
})();
