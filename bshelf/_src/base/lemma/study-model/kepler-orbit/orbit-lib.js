(function(){
const { sn, $$, nssvg, haz, sDomF, ssF, ssD, stdMod,
        rg, sconf} =
    window.b$l.atree({stdModList: {
        formula2branches,
}});
return;


///INPUT    input parameters are in model namespace,
///         curve formula to branches of a curve,
///OUTPUT   result attaches to brsObj
function formula2branches( brsObj ){
    const {
        stepsCount,
        step,
        start_q,
        formula,
        breakCondition,
    } = brsObj;
    const BRANCH_COMPLETER = haz( brsObj, 'BRANCH_COMPLETER' ) || 0;
    const brs = sn( 'branches', brsObj, [] );
    const totalPoints = brsObj.points = [];
    let bpoints;
    let pointPar; //ro;
    let branchesLen = 0;
    //0 for no-completion, usually 3 for hyperbola:
    for( var ii = 0; ii < stepsCount; ii++ ){
        const orb = formula(start_q + step * ii);
        const point = orb.point;
        if( !ii || breakCondition( pointPar, orb.pointPar ) ){
            bpoints = [];
            brs[ branchesLen ] = brs[ branchesLen ] || {};
            brs[ branchesLen ].points = bpoints;
            branchesLen++;
        }
        pointPar = orb.pointPar;
        bpoints.push( point );
        totalPoints.push( point );
    }
    if( branchesLen === BRANCH_COMPLETER ){
        ////second hyperbola branch is split, to
        ////first and third branch, so do
        ////connect them
        const ps = brs[BRANCH_COMPLETER-1].points;
        const first = brs[0].points[0];
        ps[ ps.length ] = [first[0], first[1]];
    }
    ///removes dom stuff in brs if leftover
    for( ii=branchesLen; ii < brs.length; ii++ ){
        const svgel = haz( brs[ii], 'svgel' );
        if( svgel ){
            svgel.remove();
            delete brs[ii].svgel;
        }
    }
    brs.length = branchesLen;
}
})();