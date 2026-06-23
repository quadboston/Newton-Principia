(function(){

const {
    ns, sn, $$, nssvg, has, amode, sconf,
    ssD, ssF, tprepo, rg, stdMod,
} = window.b$l.atree({ stdModList: {
        media_upcreate___part_of_medupcr_basic,
    },
});
return;


//=========================================================
// //\\ updates and creates media
//=========================================================
function media_upcreate___part_of_medupcr_basic(){
    branches2svg();
    if( ssF.mediaModelInitialized ) {
        stdMod.lemmaD8D && stdMod.lemmaD8D.updateAllDecPoints();
    }
    ssF.upcreate_mainLegend(); //placed into "slider"
    ssF.mediaModelInitialized = true;
}

function branches2svg(){
    ////----------------------------------------------
    ////branches to svg,
    ////makes conic first to put point over it later
    ////----------------------------------------------
    const bro = ssD.branchesObject;
    const brs = bro.branches
    const bN = brs.length;
    for( var ib = 0; ib < bN; ib++ ){
        const br = brs[ ib ];
        if( has( br, 'svgel' ) ){
            nssvg.branch2svg(br);
        } else {
            ////makes ellipse first to put point over it later
            br.parent = stdMod.medScene;
            br['stroke-width'] = 3;
            br.stroke = ns.arr2rgba( tprepo[ "ellipse" ] );
            br.svgel = nssvg.branch2svg(br);
            $$.$(br.svgel).cls( 'tp-ellipse tostroke thickable' );
        }
    }
}
})();

