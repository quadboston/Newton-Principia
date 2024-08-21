( function() {
    var {
        sn,
        fapp, sconf, sDomF, sDomN, ssD, ssF,
        stdMod, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            captureAState,
        },
    });


    //=================================
    // //\\ capturers/readers
    //=================================
    ///captures AState
    function captureAState( ast )
    {
        var ast = ast || {}; //astate;

        Object.keys( sconf.pname2point ).forEach( pname => {
            if( pname === 'media-mover' ) return; //todm ... non-elegant
            var p = rg[ pname ].pos;
            ast[ pname ] = { pos : [ p[0], p[1] ] }; //vital to clone
        });

        ast.chosenExperimentalFunction = { value: rg.chosenExperimentalFunction.value };
        ast.m = { value : rg.m.value };
        fapp.captureState( ast );
    }
    //=================================
    // \\// capturers/readers
    //=================================

}) ();

