// //\\// Application core-events setup
( function() {
    var sn          = window.b$l.sn;
    var fapp        = sn('fapp' ); 
    var sapp        = sn('sapp' ); 
    var fconf       = sn('fconf',fapp);
    var fmethods    = sn('methods',fapp);
    var sDomF       = sn('dfunctions', sapp);

    fmethods.setupEvents            = setupEvents;
    fmethods.setupSiteWideEvents    = setupSiteWideEvents;
    fmethods.fullResize             = fullResize;
    return;






    function setupEvents()
    {
        window.addEventListener( 'resize', fullResize );
    };

    function fullResize( arg )
    {
        fmethods.test_mobile_and_attach_exegesis_tabs();
        //.application part
        //.solves draggee-point-arrows-misplacement
        //.after resize
        //if( sapp.lemmaNumber === 9 ) 
        sapp.upcreate();
        sDomF.resizeMenuDecorations();
        fmethods.restrictMediaDimensions && fmethods.restrictMediaDimensions(
            null, null, !!'doDividorSynch'
        );
    }

    function setupSiteWideEvents()
    {
        setNextLemmaButton( 'right' );
        setNextLemmaButton( 'left' );
    };

    function setNextLemmaButton( direction )
    {
        var pager = document.querySelector( '.page-btn--' + direction );
        if( pager ) {
            var next = -1;
            fconf.enabledLemmas.forEach( function(lem, ix) {
                if( next > -1 ) return; //all found
                if( direction === 'right' ) {
                    if( lem > sapp.lemmaNumber ) { next = lem; }
                } else {
                    lem = fconf.enabledLemmas[ fconf.enabledLemmas.length - ix - 1 ];
                    if( lem < sapp.lemmaNumber ) { next = lem; }
                }
            });
            if( next > 0 ) {
                pager.title = "Go to lemma " + next;    
            } else {
                pager.style.visibility = 'hidden';
            }
            if( next > 0 ) {
                pager.addEventListener( 'click', function() {
                    var newLoc = window.location.pathname + '?conf=lemma=' + next;
                    window.location = newLoc;
                    return false;
                });
            }
        }
    }
    

}) ();

