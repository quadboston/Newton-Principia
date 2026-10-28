(function(){
const {
        ns, sn, nspaste, capture, userOptions,
        amode, toreg, stdMod, rg, sDomF, ssD, ssF, fconf, sconf,
    } = window.b$l.atree({ ssFList: {
        amode2rgstate,
}});
return;


///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate( captured ){
    var { logic_phase, aspect, subessay } = amode;
    //----------------------------------
    // //\\ common values
    //----------------------------------
    //interval of t to construct an arc for
    //Newton's sagitta
    //toreg( 'sForSagitta' )( 'val', 0.210 );
    toreg( 'sForSagitta' )( 'val', 0.310 );
    //----------------------------------
    // \\// common values
    //----------------------------------

    if( subessay === 'corollary2' || subessay === 'corollary3' ){
        sDomF.shows_book_picture( !'doUndetected' );
        nspaste( rg.A.pos, rg.borbit.dyn_q2xy(
            -0.5, //chosen value for A
        ));
        nspaste( rg.P.pos, rg.borbit.dyn_q2xy(
            0.5, //chosen value for P
        ));
        var Ss = Math.PI * 1.2;
        var S = rg.borbit.dyn_q2xy( Ss );
        rg.S.pos[0] = S[0]*0.4;
        rg.S.pos[1] = S[1]*0.4;

        var Rcol2_s = Math.PI * 0.75;
        var Rcol2 = rg.borbit.dyn_q2xy( Rcol2_s );
        rg.Rcol2.pos[0] = Rcol2[0]*0.4;
        rg.Rcol2.pos[1] = rg.P.pos[1]; //Rcol2[1]*0.4;

    } else {
        nspaste( rg.A.pos,
            [-0.6030729600066013, 0.13447833820836858] //Book's value
        );
        nspaste( rg.S.pos,
            [-0.6030729600066013, 0.13447833820836858] //Book's value
        );
        nspaste( rg.P.pos, rg.borbit.dyn_q2xy(
            0.7262954797868 // Book's value for P
        ));
        // setsCoroll2( !'yes0not' );
        if( subessay === 'corollary1' ) {
            //this setting
            //      nspaste( rg.S.pos, [-0.9997779468574, -0.0210731450212] );
            //has non-resolved problem for norming by fmax,
            //apparently force -> oo and disappears from the graph,
            //when placing S to close to the circle,
            //we partially solve it by making the S close to the circle,
            nspaste( rg.S.pos, [-0.97, -0.16] );
        }
        sDomF.shows_book_picture( subessay !== 'corollary1' );
    }
    ssD.stashedVisibility = null;
    stdMod.curveIsSolvable();
    return captured;
}
})();