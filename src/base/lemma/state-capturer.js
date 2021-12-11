( function() {
    var {
        eachprop, nspaste, has, fapp, rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            captureAState_generic,
        },
    });
    return;








    function captureAState_generic( ast )
    {
        var clone = {};
        eachprop( rg, (rgX, kname) => {
            if( typeof rgX !== 'function' &&
                kname !== 'main-legend' &&               //todm ?bug
                kname !== 'videoicon-placeholder' &&     //todm ?bug
                kname !== 'rgId' &&
                kname !== 'stdModName' &&
                true //for "&&" at the end of line
            ) {
                nspaste( clone, { [kname] : rgX } );
            }
        });
        fapp.captureState( clone );
    }

}) ();

