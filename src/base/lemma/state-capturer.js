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
        eachprop( rg, (prop, propname) => {
            if( typeof prop !== 'function' &&
                propname !== 'main-legend' &&               //todm ?bug
                propname !== 'videoicon-placeholder' &&     //todm ?bug
                true
            ) {
                nspaste( clone, { [propname] : prop } );
                //if( !has( prop, 'pname' ) )ccc( propname, prop );
            }
        });
        fapp.captureState( clone );
    }

}) ();

