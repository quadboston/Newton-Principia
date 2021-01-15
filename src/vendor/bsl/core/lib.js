( function() {
    var {
        nsmethods,
    } = window.b$l.nstree();

    nsmethods.splitText_2_purgedLines = splitText_2_purgedLines;
    return;




    function splitText_2_purgedLines( text )
    {
        const STRING          = /\n\r|\n|\r/g;
        const EMPTY           = /^(\s|\n|\r)*|(\s|\n|\r)*$/g;

        var rawLines    = text.split( STRING );
        var plines       = [];

        ///sugar feature: strips empty lines
        rawLines.forEach( (rline,lix) => {
            rline = rline.replace( EMPTY, '' );
            if( rline ) plines.push( rline );
        });
        return plines;
    }


}) ();

