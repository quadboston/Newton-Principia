(function(){
const { ns, sn, $$, nsmethods, nssvg, ssF, ssD, amode,
        stdMod, sconf, rg, toreg, } =
    window.b$l.atree({ stdModList: {
        media_upcreate___part_of_medupcr_basic,
}});
return;


function media_upcreate___part_of_medupcr_basic(){
    //=============================================================
    // //\\ curvature circle
    //=============================================================
    var cCircleName = 'curvatureCircle';
    var rgX = rg[ cCircleName ];
    var RCmedpos = ssF.modpos2medpos( rg.tCircleCenter.pos, stdMod );
    var RRmedpos = sconf.mod2med * rgX.tangentCircleRadius;
    if( !rgX.svgel ){
        nssvg.u({
            rgX: rgX,
            svgel: rgX.svgel,
            parent: stdMod.medScene,
            type: 'circle',
            stroke: rg.C.pcolor,
            fill: 'transparent',
            'stroke-width': '1',
        });
        rgX.svgel$.addClass(
            'tostroke tp-' +
            nsmethods.camelName2cssName( cCircleName ) +
            (rgX.cssClass ? ' '+rgX.cssClass : ''));
    } else {
        nssvg.u({
            svgel: rgX.svgel,
            cx: RCmedpos[0],
            cy: RCmedpos[1],
            r: RRmedpos,
        })
    }
    //=============================================================
    // \\// curvature circle
    //=============================================================
}
})();