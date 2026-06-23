(function(){
const {sn, haz, has, sconf, ssF, sDomF, sDomN, rg, toreg,
       stdMod, amode, pntRgid2rgx } =
       window.b$l.atree({ ssFList:{populates__pos_medpos_rgX_p2p} });
return;

///rgX is "complimented", references to pop, medpos,
///and rgX are preserved is they exist,
///Does place rgX result in pntRgid2rgx.
///which is vital for doPaintPoints() showing this point
function populates__pos_medpos_rgX_p2p({
    rgid,
    pos,            //optional
    caption,        //optional
}){
    var rgX = haz( rg, rgid );
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
    rgX = toreg( rgid )
        ( 'rgid', rgid )
        ( 'pos', pos )
        ();
    var medpos = ssF.modpos2medpos( pos, );
    sn('medpos', rgX, []);
    rgX.medpos[0] = medpos[0];
    rgX.medpos[1] = medpos[1];
    rgX.caption = caption;
    pntRgid2rgx[ rgid ] = rgX;
    return rgX;
}
})();