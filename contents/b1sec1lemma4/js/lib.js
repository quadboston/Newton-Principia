( function() {
    var {
    } = window.b$l.apptree({
        ssFExportList :
        {
            randomGridGenerator,
        },
    });


    //test
    //var grid = randomGridGenerator({ GRID_LENGTH:10000, SEED:1 });
    //ccc( grid );
    return;


    /*
    ///intended: build random permutation as a grid
    ///abandoned because other algo is used
    function randomGridGenerator({ GRID_LENGTH, SEED, forbiddenIx_fractions })
    {
        var MODULE = 2147483647;
        var INCR = 16807;

        //==========================================================
        // //\\ creates prelimenary grid and removes forbidden cells
        //==========================================================
        var grid = [];
        for( ix = 0; ix < GRID_LENGTH; ix++ ) {
            var ixPermitted = true;
            forbiddenCells_array.forEach( forb => {
                var cell = forbiddenIx_fractions * GRID_LENGTH;
                var c1 = Math.ceil( cell );
                var c2 = Math.floor( cell );
                if( c1 === ix || c2 === ix ) {
                    ixPermitted = false;
                    break;
                }
            }
            if( ixPermitted ) {
                grid.push( ix );
            }
        }
        //==========================================================
        // \\// creates prelimenary grid and removes forbidden cells
        //==========================================================

        var floatGrid = grid.map( cell => cell / GRID_LENGTH );
        ccc( grid, floatGrid );
        return { grid, floatGrid };
    }
    */




    //fills grid randomly
    //flaw: repeated cells can be generated when algo did not
    //      fill all the cells

    //https://en.wikipedia.org/wiki/16,807
    //next = previous * INCR % MODULE
    //      22605091*19*5 ?= 2147483647
    //      var MODULE = 2147483647;    //=2^31-1
    //      var INCR = 16807;           //=7^5
    //https://www.firstpr.com.au/dsp/rand31/p1192-park.pdf
    function randomGridGenerator({ GRID_LENGTH, SEED })
    {
        var MODULE = 2147483647;
        var INCR = 16807;
        var COMPLETION_ATTEMPTS_OVERHEAD = GRID_LENGTH * 20;

        var flag = ( new Array( GRID_LENGTH ) ).fill(0);
        var grid = flag.map( (fl,ix) => ix );
        //ccc( Math.pow( 7, 5 ), Math.pow( 2, 31 ) );
        var count = 0;
        var safeCount = 0;

        var current = SEED;
        while( count < GRID_LENGTH ||
               safeCount > COMPLETION_ATTEMPTS_OVERHEAD
        ){
            var cell = Math.floor( current * GRID_LENGTH / MODULE );
            if( flag[ cell ] === 0 ) {
                flag[ cell ] = count+1;
                grid[ count ] = cell;
                //ccc( count, current, 'cell='+cell );
                count++;
            //} else {
            //    ccc( 'already filled ', current, cell );
            }
            //count++;
            //algo:
            current = ( current * INCR ) % MODULE;
            safeCount++;
        }
        //ccc( 'fill fraction=' + (count/GRID_LENGTH) + 
        //     ' effectivity fraction=' + ( count/ safeCount )
        //);

        var floatGrid = grid.map( cell => cell / GRID_LENGTH );
        //ccc( floatGrid );
        return { grid, floatGrid };
    };

}) ();

