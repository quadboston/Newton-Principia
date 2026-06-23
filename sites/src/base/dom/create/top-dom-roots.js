(function(){
const {
        $$, fapp, fconf, rootWnd, sDomN, sDomF,
        stdMod, amode, rg,
      } = window.b$l.atree();
sDomF.shows_book_picture = shows_book_picture;
sDomF.creates_mainWorkspace_domRoots = creates_mainWorkspace_domRoots;
return;


function creates_mainWorkspace_domRoots(){
    //==============================================================
    // //\\ essay and media panes
    //==============================================================
    for( wx=0; wx<2; wx++ ) {
        if( ( wx===0 && fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ||
            ( wx===1 && !fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) ) {
            // //\\ creates essaion pane
            //      "essaion superroot"
            var wCls = 'bsl-text-widget';
            if( fconf.attach_menu_to_essaion_root ) {
                wCls += ' leftside-menuholder';
            }
            sDomN.essaionsRoot$ = $$.div()
                .cls( wCls )
                .to( fapp.fappRoot$ )
                ;
            // \\// creates essaion pane
        } else {
            //: creates media superroot
            sDomN.simSScene$ = $$.div()
                .cls( 'bsl-sim-superscene' )
                .to(fapp.fappRoot$)
                ;
        }
    }
    //==============================================================
    // \\// essay and media panes
    //==============================================================
    sDomF.build_menu_top_leafs_placeholders();
    rootWnd.createDividorResizer();
}

//===================================================================
// //\\ this makes effect of fading-out
//      the original picture
//===================================================================
function shows_book_picture( show_book_picture ){
    showsBookPicture( show_book_picture );
    if( typeof fconf.timeToShowOriginalDiagram_effective === 'number' &&
        fconf.timeToShowOriginalDiagram_effective > 0 && show_book_picture ) {
        setTimeout(
            () => {
                showsBookPicture( false ),
                stdMod.media_upcreate();
            },
            fconf.timeToShowOriginalDiagram_effective
        );
    }
}

function showsBookPicture( show_book_picture ){
    rg.USER_TOUCHED_SCREEN = !show_book_picture;
    stdMod.imgRk.dom$
        [ show_book_picture ? 'removeClass' : 'addClass' ]( 'in-study' );
    rg.allLettersAreHidden = show_book_picture;
}
//===================================================================
// \\// this makes effect of fading-out
//===================================================================
})();