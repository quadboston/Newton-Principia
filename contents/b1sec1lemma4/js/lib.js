( function() {
    var {
        sconf,
        rg,
        toreg,
        stdMod,
    } = window.b$l.apptree({
        ssFExportList :
        {
            randomGridGenerator,
        },
        stdModExportList :
        {
            recalculates_rg_ptransform,
            xy_2_Txy,
            Txy_2_xy,
            draggable__allTxy_2_allxy,
            draggable__allxy_2_allTxy,
        },
    });
    toreg( 'ptransform' )( 'val', [[1,0],[0,1]] );
    toreg( 'ptransform' )( 'reverse', [[1,0],[0,1]] );

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
    }


    function recalculates_rg_ptransform()
    {
        //* is xL to xR
        var T00 = ( rg.T.pos[0] - rg.P.pos[0] ) / ( rg.E.pos[0] - rg.A.pos[0] );
        //* is yL to xR
        var T10 = ( rg.p.pos[0] - rg.P.pos[0] ) / ( rg.a.pos[1] - rg.A.pos[1] );
        //* is yL to yR:
        var T11 = ( rg.p.pos[1] - rg.P.pos[1] ) / ( rg.a.pos[1] - rg.A.pos[1] );
        var T   = rg.ptransform.val;
        T[0][0] = T00;
        T[1][1] = T11;
        T[1][0] = T10;

        //* is xL to xR
        var determinant1    = 1/(T00*T11);
        var R00             = 1/T00;
        var R11             = 1/T11;
        var R01             = -T10*determinant1;
        var R               = rg.ptransform.reverse;
        R[0][0] = R00;
        R[1][1] = R11;
        R[0][1] = R01;
    }


    function Txy_2_xy( pos )
    {
        var R   = rg.ptransform.reverse;
        var Ppos= rg.P.pos;
        var x   = pos[0] - Ppos[0];
        var y   = pos[1] - Ppos[1];
        var yy  =               R[1][1] * y;
        var xx  = R[0][0] * x + R[0][1] * y;
        return [ xx, yy ];
    }

    function xy_2_Txy( pos )
    {
        var T   = rg.ptransform.val
        var Ppos= rg.P.pos;
        var x   = pos[0];
        var y   = pos[1];
        var xx  = Ppos[0] + T[0][0] * x + T[1][0] * y;
        var yy  = Ppos[1] +               T[1][1] * y;
        return [ xx, yy ];
    }


    function draggable__allTxy_2_allxy()
    {
        var rNorm       = sconf.originalPoints.rightCurvePivots_normalized;
        var rDraggable  = sconf.originalPoints.rightCurvePivots;
        rDraggable.forEach( (rd,pix) => {
            var normPos = stdMod.Txy_2_xy( rd.rgX.pos );
            var nPos = rNorm[ pix ].rgX.pos;
            nPos[0] = normPos[0];
            nPos[1] = normPos[1];
        });
    }

    function draggable__allxy_2_allTxy()
    {
        var rNorm       = sconf.originalPoints.rightCurvePivots_normalized;
        var rDraggable  = sconf.originalPoints.rightCurvePivots;
        rDraggable.forEach( (rd,pix) => {
            var dragPos = stdMod.xy_2_Txy( rNorm[ pix ].rgX.pos );
            rd.rgX.pos[0] = dragPos[0];
            rd.rgX.pos[1] = dragPos[1];
        });
    }


}) ();

