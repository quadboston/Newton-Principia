( function() {
    var {
        ns, sn, haz, nspaste,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            path2rgModelPlaceholders,
        },
    });
    return;



    //indices
    //coinside with paths for
    // rg.pathRacks.pathRacks
    //      'pathSegment-' + pix
    // rg.speeds.pos
    
    //indices late by one unit for
    // rg.impulses.vectors
    //      for rg.impulses.views
    // rgOblects: 'kepltr-' + kix;

    //indices late by two units for
    // rg.freePath.pos
    // rgObj: 'freetr-' + kix
    // rgObj: 'translated-force-' + kix
    // rg.freePathRacks.freePathRacks
    //      and their rgObj: 'freepath-' + pix;
    //      'freePathSegment-' + pix 
    ///at current ver, runs at every model_upcreate
    function path2rgModelPlaceholders()
    {
        var S               = rg.S.pos;
        var force           = rg.force.pos;
        var path            = rg.path.pos;

        //this array feels uselees, it clones path.pos into pt, adds "undisplay",
        //  it serves for pivots for "real path line segment" with
        //      'pathSegment-' + pix, and
        //      upcreates with rg-name = "path-"+pix,
        var pathRacks       = rg.pathRacks.pathRacks;

        var freePath        = rg.freePath.pos;
        var speeds          = rg.speeds.pos;
        var dt              = rg.rgslid_dt.val;

        //=======================================================
        // //\\ spawns path to
        //      path "rgPoints", Kepler-triangles, free-triangles
        //=======================================================
        path.forEach( (pt, pix) => {
            //-------------------------------------------------------------------------
            // //\\ converts path to rg and media which is pathRacks,
            //         path = rg.path.pos;
            //         pathRacks[ pix  ] === rg[ 'path-' + pix ] :=: [
            //              rg[ 'path-0' ] = { pos:[], medpos:[], svgel: ... } //at point "A"
            //              rg[ 'path-1' ] = { pos:[], medpos:[], svgel: ... } //at point "B"
            //            ...
            //         ]
            //-------------------------------------------------------------------------
            var pkey = 'path-' + pix;
            pathRacks[ pix ] = toreg( pkey )({ pos: pt, undisplay : true })();

            //---------------------------------------------------------
            // //\\ placifies keplerTriangles
            //---------------------------------------------------------
            if( pix > 0 ) {
                var kix = pix-1;
                var pkey = 'kepltr-' + kix;
                var ktr = toreg( pkey )({ undisplay : true })();
                //sets up model vertices for triangle
                ktr.vertices = [ path[pix-1], path[pix], S ];
            }
            //---------------------------------------------------------
            // \\// placifies keplerTriangles
            //---------------------------------------------------------

            //-----------------------------------------------------------
            // //\\ free triangles
            //      ... are bound tgo C,c which are mapped tp pointIx = 2
            //-----------------------------------------------------------
            if( pix > 1 ) {
                var kix = pix-2;

                //makes "model-points" for freeTriangles
                //freeTriangles array master-index offset is pi = 2
                var pkey = 'freetr-' + kix;
                var ktr = toreg( pkey )( { undisplay : true } )();
                ktr.vertices = [ path[ pix-1 ], freePath[ pix-2 ], S ];
            }
            //---------------------------------------------------------
            // \\// free triangles
            //---------------------------------------------------------
        });

        //---------------------------------------------------------
        // //\\ path to spatial-model-forces
        //      and media-forces
        //---------------------------------------------------------
        var fvectors    = rg.impulses.vectors;
        var fviews      = sn( 'views', rg.impulses );
        path.forEach( (pt, pix) => {

            //forces master-index offset is pi = 1 and
            //identified with key 'kepltr-' + (pi-1)
            if( pix < 1 ) return;

            //*****************************************
            // //\\ paints forces attached to B, C, ...
            //*****************************************
            var kix = pix-1;
            var fkey = 'force-' + kix;
            var fview = toreg( fkey )();
            //bare position at the base of force
            var pos0 = path[pix];
            //applies force to pos0: just bare position
            var pos1 = [
                ////we really draw paths, not forces
                pos0[0]+fvectors[kix][0] * dt,
                pos0[1]+fvectors[kix][1] * dt,
            ];
            var ffkey0 = fkey+'-0';
            var ffkey1 = fkey+'-1';
            toreg( ffkey0 )({ pos: pos0, undisplay : true })();
            toreg( ffkey1 )({ pos: pos1, undisplay : true })();
            fview.pivots = [ rg[ ffkey0 ], rg[ ffkey1 ] ];
            //makes red line segments for force
            toreg( fkey+'-applied' )({ undisplay : true })();
            //----------------------------------
            // \\// makes red line segments for force
            //----------------------------------

            //----------------------------------------
            // //\\ recalculates decorational Z, V pos
            //----------------------------------------
            if( pix === 1 ) {
                ns.paste( rg.V.pos, pos1 );
            }
            if( pix === 4 ) {
                ns.paste( rg.Z.pos, pos1 );
            }
            //----------------------------------------
            // \\// recalculates decorational Z, V pos
            // \\// paints forces attached to B, C, ...
            //*****************************************



            //*****************************************
            // //\\ paints forces attached to c, d, ...
            //      "translated" forces
            //*****************************************
            if( pix > 1 ) {
                var kix = pix-2;
                var fkey = 'translated-force-' + kix;
                var fview = toreg( fkey )();

                //bare position at the base of force
                var pos0 = freePath[kix];

                //applies force to pos0: just bare position
                var pos1 = [
                    pos0[0]+fvectors[kix][0] * dt,
                    pos0[1]+fvectors[kix][1] * dt
                ];
                //this section can be simplified ... but so far
                //we have to create pointies to make line segments for forces,
                //we have to create "keys" to make pointies
                var ffkey0 = fkey+'-0';
                var ffkey1 = fkey+'-1';
                toreg( ffkey0 )({ pos: pos0, undisplay : true })();
                toreg( ffkey1 )({ pos: pos1, undisplay : true })();

                fview.pivots = [ rg[ ffkey0 ], rg[ ffkey1 ] ];
                toreg( fkey+'-applied' )({ undisplay : true })();
            }
            //*****************************************
            // \\// paints forces attached to c, d, ...
            //*****************************************
        });
        //---------------------------------------------------------
        // \\// path to spatial-model-forces
        //---------------------------------------------------------


        //-------------------------------------------------
        // //\\ paints free path points
        //-------------------------------------------------
        var freePathRacks = freePath.map( (pt, pix) => {
            var pkey = 'freepath-' + pix;
            toreg( pkey )({ pos: pt, })();
            return rg[pkey];
        });
        toreg( 'freePathRacks' )( 'freePathRacks', freePathRacks );
        //-------------------------------------------------
        // \\// paints free path points
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ free line segment
        //-------------------------------------------------
        freePathRacks.forEach( (frack, pix) => {
            if( pix >= freePathRacks.length ) return;
            var wwPivots = [ pathRacks[ pix+1 ], frack ];
            var wwline = toreg( 'freePathSegment-' + pix )({ undisplay : true })();
            wwline.pivots = wwPivots;
        });
        //-------------------------------------------------
        // \\// free line segment
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ real path line segment,
        //      apparently, segment after applying the force
        //-------------------------------------------------
        pathRacks.forEach( (prack, pix) => {
            if( pix === pathRacks.length - 1 ) return;
            var wwPivots = [prack, pathRacks[pix+1]];
            var wwline = toreg( 'pathSegment-' + pix )({ undisplay : true })();
            wwline.pivots = wwPivots;
        });
        //-------------------------------------------------
        // \\// real path line segment
        //-------------------------------------------------
    }

}) ();

