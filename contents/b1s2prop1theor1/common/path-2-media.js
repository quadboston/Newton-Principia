( function() {
    var {
        sn, $$, eachprop,
        sconf, ssF, ssD, sDomF, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            trajectoryShapes_2_media,
        },
    });
    return;









    ///this fun. completes the split model and media code,
    function trajectoryShapes_2_media()
    {
        var pointies2line   = ssF.pointies2line;
        var rgPos2rgMedia   = ssF.rgPos2rgMedia;
        var paintTriangle   = ssF.paintTriangle;

        var S               = rg.S.pos;
        var force           = rg.force.pos;
        var path            = rg.path.pos;
        var pathRacks       = rg.pathRacks.pathRacks;
        var freePath        = rg.freePath.pos;
        var speeds          = rg.speeds.pos;

        //=======================================================
        // //\\ spawns path to
        //      path "rgPoints", Kepler-triangles, free-triangles
        //=======================================================
        path.forEach( (pt, pix) => {

            //---------------------------------------------------------
            // //\\ spawns path-points to media,
            //      path[0] apparently used nowhere
            //---------------------------------------------------------
            var pkey = 'path-' + pix;
            pathRacks[ pix ].undisplay = true;
            rgPos2rgMedia(
                pkey,
                  {
                    'fill' : 'transparent',
                    r : 1,
                  }
            );
            //---------------------------------------------------------
            // \\// spawns path-points to media,
            //---------------------------------------------------------

            //---------------------------------------------------------
            // //\\ placifies keplerTriangles
            //---------------------------------------------------------
            if( pix > 0 ) {
                var kix             = pix-1;
                var pkey            = 'kepltr-' + kix;
                var ktr             = toreg( pkey )({ undisplay : true })();

                var triangleOddness = '';
                //this solution is not good:
                //if( pix <=5 ) var triangleOddness = 'hidden';
                var triangleOddness = pix%2 ? 'triangle-odd' : 'triangle-even';
                switch (pix) {
                    case 0: var triangleOddness = triangleOddness + ' tp-_s_a_b';
                    break;
                    case 1: var triangleOddness = triangleOddness + ' tp-_s_a_b';
                    break;
                    case 2: var triangleOddness = triangleOddness + ' tp-_s_b_c  ';
                    break;
                    case 3: var triangleOddness = triangleOddness + ' tp-_s_c_d';
                    break;
                    case 4: var triangleOddness = triangleOddness + ' tp-_s_d_e';
                    break;
                    case 5: var triangleOddness = triangleOddness + ' tp-_s_e_f';
                    break;
                }
                var tpCls           = 'kepler-triangle';

                //sets up model vertices for triangle
                // paints Kepler's triangles rg[pkey] along the path:
                // /media-model/linears.js::ssF.paintTriangle()
                // based on "triang = rg[ pkey ]"
                paintTriangle(
                    pkey,       //triangleId
                    triangleOddness,
                    tpCls,
                    '', //rgba( 100,100,255,0.2)'    //for svgarg.fill = defaultFill
                );
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

                //makes freeTriangles
                //freeTriangles array master-index offset is pi = 2
                var pkey = 'freetr-' + kix;
                var ktr = toreg( pkey )( { undisplay : true } )();
                //paints Kepler's triangles rg[pkey] along the path:
                let triang = paintTriangle(
                    pkey, 'tofill', 'free-triangle theor1proof',
                    'rgba( 100,255,100,0.2)' );
                if( kix < 4 ) {
                    ////todm don't create it at all or do coinside with decor
                    ////other object, decor will take care of painting, because
                    ////of decor already has these objects
                    triang.svgel.style.display = 'none';
                }
            }
            //---------------------------------------------------------
            // \\// free triangles
            //---------------------------------------------------------
        });



        //---------------------------------------------------------
        // //\\ path to spatial-model-forces
        //      and media-forces
        //---------------------------------------------------------
        path.forEach( (pt, pix) => {

            //forces master-index offset is pi = 1 and
            //identified with key 'kepltr-' + (pi-1)
            if( pix > 0 ) {

                //*****************************************
                // //\\ paints forces attached to B, C, ...
                //*****************************************
                var kix = pix-1;
                var fkey = 'force-' + kix;
                var fview = toreg( fkey )();
                var ffkey0 = fkey+'-0';
                var ffkey1 = fkey+'-1';
                toreg( ffkey0 )({ undisplay : true })();
                toreg( ffkey1 )({ undisplay : true })();

                rgPos2rgMedia( ffkey0, {
                    fill:'transparent',
                    tpclass : 'force-_move hidden',
                } );
                //paints tip of the force in red
                rgPos2rgMedia( ffkey1, {
                    //fill:'red',
                    cssClass:'tofill',
                    tpclass : 'force-_move hidden',
                    r : 6, //this is circle's radius
                });

                //----------------------------------
                // //\\ makes red line segments for force
                //      attached to points C, D, E, ...
                //      not a sagittae,
                //----------------------------------
                var wwpname = fkey+'-applied';
                let pcolor = sDomF.getFixedColor( 'forceMove' )
                var wwline = toreg( wwpname )
                    ({ undisplay : true })

                    ////patch for purpose of drawing a vector tip
                    ( 'vectorTipIx', 1 )
                    ( 'tipFraction', 0.4 )
                    ( 'pcolor', pcolor )
                    ( 'tipFill', pcolor )

                    ();
                pointies2line(
                    wwpname,
                    fview.pivots,
                    {
                        cssClass:'tostroke',
                        'stroke-width': 3,
                        //stroke:'transparent',
                        tpclass : 'forceMove',
                    }
                );
                //----------------------------------
                // \\// makes red line segments for force
                // \\// paints forces attached to B, C, ...
                //*****************************************



                //*****************************************
                // //\\ paints forces attached to c, d, ...
                //      "translated" forces,
                //      "short living on diagram",
                //*****************************************
                if( pix > 1 ) {
                    ////makes short living
                    var kix = pix-2;
                    var fkey = 'translated-force-' + kix;
                    var fview = toreg( fkey )();
                    var ffkey0 = fkey+'-0';
                    var ffkey1 = fkey+'-1';
                    toreg( ffkey0 )({ undisplay : true })();
                    toreg( ffkey1 )({ undisplay : true })();

                    //defines base of force as invisible point:
                    rgPos2rgMedia( ffkey0, { fill:'transparent' } );
                    //paints tip of the force as a red circle
                    rgPos2rgMedia( ffkey1, {
                        //fill:'red',
                        cssClass:'fill theor1proof',
                        tpclass : 'force-_move',
                        r : 4, //6,
                    });

                    var lineName = fkey+'-applied';
                    toreg( lineName )({ undisplay : true })();
                    //makes red line segments for force
                    //it is duplicated with decoration line, but
                    //decor line is not in sync with it,
                    pointies2line(
                        lineName,
                        fview.pivots,
                        {
                            //stroke:'red',
                            cssClass:'tostroke theor1proof',
                            'stroke-width': 3,
                            tpclass : 'forceMove',
                        }
                    );
                }
                //*****************************************
                // \\// paints forces attached to c, d, ...
                //*****************************************
            }
        });
        //---------------------------------------------------------
        // \\// path to spatial-model-forces
        //---------------------------------------------------------


        //-------------------------------------------------
        // //\\ paints free path points
        //-------------------------------------------------
        freePath.forEach( (pt, pix) => {
            var pkey = 'freepath-' + pix;
            toreg( pkey )({ undisplay : true })();
            rgPos2rgMedia(
                pkey,
                  {
                    cssClass: 'tofill tostroke theor1proof',
                    tpclass : 'free-path',
                  }
            );
        });
        //-------------------------------------------------
        // \\// paints free path points
        //-------------------------------------------------



        //-------------------------------------------------
        // //\\ free line segment
        //-------------------------------------------------
        var freePathRacks = rg.freePathRacks.freePathRacks;
        freePathRacks.forEach( (frack, pix) => {
            if( pix >= freePathRacks.length ) return;
            var wwpname = 'freePathSegment-' + pix;
            toreg( wwpname )({ undisplay : true })();
            pointies2line(
                wwpname,
                !'wwPivots',
                {
                    //stroke:'green',
                    cssClass:'tofill tostroke theor1proof',
                    tpclass : 'free-path',
                    'stroke-width':4
                }
            );
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
            var wwpname = 'pathSegment-' + pix;
            toreg( wwpname )({ undisplay : true })();
            pointies2line(
                wwpname,
                !'wwPivots',
                {
                    cssClass:'tostroke',
                    //stroke:'blue',
                    tpclass : 'path',
                    'stroke-width':4
                }
            );
        });
        //-------------------------------------------------
        // \\// real path line segment
        //-------------------------------------------------
    }


}) ();

