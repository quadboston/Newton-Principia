( function() {
    var {
        nsmethods,
    } = window.b$l.nstree();

    nsmethods.splitText_2_purgedLines = splitText_2_purgedLines;
    nsmethods.purgedLines_2_itemArrays = purgedLines_2_itemArrays;
    nsmethods.lines2itemArrays = lines2itemArrays;
    return;



    ///text --> text split to lines
    ///     --> white-space-trimmed lines
    ///     --> removed empty lines
    function splitText_2_purgedLines( text, noPipeDelimiter )
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


    ///splits line by SPLIT_COLUMNS
    function purgedLines_2_itemArrays( plines, noPipeDelimiter )
    {
        const SPLIT_COLUMNS = noPipeDelimiter ? /\s+/ : /\s*\|\s*/;
        var iarrays = plines.map( (pline,lix) =>
            pline.split( SPLIT_COLUMNS )
        );
        return iarrays;
    }

    ///splits line by SPLIT_COLUMNS
    function lines2itemArrays( plines, noPipeDelimiter )
    {
        return purgedLines_2_itemArrays( splitText_2_purgedLines( plines ), noPipeDelimiter );
    }

}) ();

