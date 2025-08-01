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



    //===================================================================
    ///randomly fills grid of size GRID_LENGTH nodes,
    ///performance slows down and possibly can miss required number nodes
    ///as loop advances;
    //
    //https://en.wikipedia.org/wiki/16,807
    //next = previous * INCR % MODULE
    //https://www.firstpr.com.au/dsp/rand31/p1192-park.pdf
    //===================================================================
    function randomGridGenerator({ GRID_LENGTH, SEED })
    {
        //----------------------------------------------------
        // //\\ fundamental parameters
        //----------------------------------------------------
        //ccc( Math.pow( 7, 5 ), Math.pow( 2, 31 ) );
        //how above function works?
        //apparently gives exact number for integers ... why?
        var MODULE = 2147483647;    //=2^31-1
        //----------------------------------------------------
        // \\// fundamental parameters
        //----------------------------------------------------
        var INCR = 16807;           //=7^5


        //----------------------------------------------------
        // //\\ prepares work
        //----------------------------------------------------
        //to secure:
        var COMPLETION_ATTEMPTS_OVERHEAD = GRID_LENGTH * 20;

        var flag = ( new Array( GRID_LENGTH ) ).fill(0);
        var grid = flag.map( (fl,ix) => ix );
        var count = 0;
        var safeCount = 0;
        var current = SEED;
        //----------------------------------------------------
        // \\// prepares work
        //----------------------------------------------------


        //----------------------------------------------------
        // //\\ does the job
        //----------------------------------------------------
        var startTime = Date.now();
        while( count < GRID_LENGTH ||
               safeCount > COMPLETION_ATTEMPTS_OVERHEAD
        ){
            //var cell = Math.floor( current * GRID_LENGTH / MODULE );
            var cell = current % GRID_LENGTH;
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
        endTime = Date.now();
        var floatGrid = grid.map( cell => cell / GRID_LENGTH );
        //----------------------------------------------------
        // \\// does the job
        //----------------------------------------------------


        //----------------------------------------------------
        // //\\ returns results
        //----------------------------------------------------
        /*
        ccc( 'found=' + count + ' GRID_LENGTH='+GRID_LENGTH +
             ' fill fraction=' + (count/GRID_LENGTH) + 
             ' effectivity fraction=' + ( count/ safeCount )
        );
        ccc( 'grid=', grid, 'floatGrid=',floatGrid );
        */
        var results = {
            grid,
            floatGrid,
            performanceEffectivity : count/ safeCount,
            builtCells : count,
            missedCells : GRID_LENGTH - count, 
            missedPerRequested : ( GRID_LENGTH - count) / GRID_LENGTH,
            timeSpentMs : endTime - startTime,
        };
        //ccc( 'requested NODES NUMBER=' + GRID_LENGTH, results ); 
        return results;
        //----------------------------------------------------
        // \\// returns results
        //----------------------------------------------------
    }


    function recalculates_rg_ptransform()
    {
        //* is xL to xR
        var T00 = ( rg.ortI.pos[0] - rg.P.pos[0] ) / ( rg.E.pos[0] - rg.A.pos[0] )
                  / (1 + sconf.ORT_I_SHIFT);
        //* is yL to xR
        var T10 = ( rg.ortJ.pos[0] - rg.P.pos[0] ) / (1 + sconf.ORT_J_SHIFT)
                  / ( rg.a.initialPos[1] - rg.A.pos[1] );
        //* is yL to yR:
        var T11 = ( rg.ortJ.pos[1] - rg.P.pos[1] ) / (1 + sconf.ORT_J_SHIFT)
                  / ( rg.a.initialPos[1] - rg.A.pos[1] );
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
        // var rNorm       = sconf.originalPoints.rightCurvePivots_normalized;
        // var rDraggable  = sconf.originalPoints.rightCurvePivots;
        // rDraggable.forEach( (rd,pix) => {
        //     var dragPos = stdMod.xy_2_Txy( rNorm[ pix ].rgX.pos );
        //     rd.rgX.pos[0] = dragPos[0];
        //     rd.rgX.pos[1] = dragPos[1];
        // });
    }


}) ();

