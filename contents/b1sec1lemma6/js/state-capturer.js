( function() {
    var {
        ns, fapp, rg,
    } = window.b$l.apptree({
        stdModExportList : {
            captureAState,
        },
    });
    return;


    ///==========================================
    ///put rg-subtrees you disire to capture here
    ///==========================================
    function captureAState( ast )
    {
        fapp.captureState(
            ns.paste( 
                {
                    B: { pos : rg.B.pos },
                },
                ast
            )
        );
    }

}) ();

