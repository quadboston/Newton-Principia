( function() {
    var {
        sn, $$, haz,
        sconf, fconf, sDomN,
    } = window.b$l.apptree({
        stdModExportList :
        {
            cre__extraImages,
        },
    });
    return;













    ///adds an extra stuff to simScene
    function cre__extraImages()
    {
        var stdMod = this;
        //-------------------------------------------
        // //\\ main root
        //      top div
        //-------------------------------------------
        sDomN.commonAnimRoot$ = $$
            .c( 'div' )
            .addClass( 'common-anim-root' )
            .css( 'position', 'absolute' )
            .to( stdMod.simScene )
            ;
        //-------------------------------------------
        // \\// main root
        //-------------------------------------------

        $$
            .c( 'img' )
            .addClass( 'corollary-diagram' )
            .css( 'width','100%')
            .css( 'left','0%')
            .css( 'top','0%')
            .css( 'position', 'absolute' )
            .a( 'src',
                fconf.pathToContentSite +
                '/contents/' + fconf.sappId + '/img/lemma-theoremII-corollary1.jpg'
                //'/contents/b1sec2prop2/img/lemma-theoremII-corollary1.jpg'
            )
            .to( sDomN.commonAnimRoot$ )
            ;
    }
}) ();

