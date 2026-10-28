(function(){
const {sn, haz, has, sconf, ssF, sDomF, rg, toreg,
       stdMod, amode, point_rgn2rgx } =
       window.b$l.atree({ ssFList:{upd__pos_medpos_rgn2rgx} });
return;

///rg[rgn] is preserved
///rgX complements references to pop, medpos,
///Does place rgX result in point_rgn2rgx.
///which is vital for doPaintPoints() showing this point
function upd__pos_medpos_rgn2rgx({
    rgn,
    pos,            //optional
    caption,        //optional
}){
    var rgX = haz( rg, rgn );
    if( rgX ) {
        ////rgX does already exist
        var rgpos = haz( rgX, 'pos' );
        if( rgpos && pos) {
            rgX.pos[0] = pos[0];
            rgX.pos[1] = pos[1];
        }
        ///caption arg overrides rgX.caption
        if( has(rgX,'caption') &&
            ( !caption && caption !== '' )
        ){
            caption = rgX.caption;
        }
    }
    //.................................
    //preserves pos reference if exists
    pos = rgpos || pos || [0,0];
    //.................................
    rgX = toreg( rgn )
        ( 'rgn', rgn )
        ( 'pos', pos )
        ();
    var medpos = ssF.modpos2medpos( pos, );
    sn('medpos', rgX, []);
    rgX.medpos[0] = medpos[0];
    rgX.medpos[1] = medpos[1];
    rgX.caption = caption;
    point_rgn2rgx[ rgn ] = rgX;
    return rgX;
}
})();