( function() {
    var {
        sn, $$, eachprop,
        sconf, ssF, ssD, toreg, rg,
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
        var speedsAracc     = rg.speedsAracc.pos;
        var spatialStepsMax = rg.spatialStepsMax.pos;

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
                var triangleOddness = pix%2 ? 'triangle-odd' : 'triangle-even';
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
                //ccc( 'tohidden' + area_XXX, )
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
                paintTriangle( pkey, 'tofill', 'free-triangle theor1proof',
                               'rgba( 100,255,100,0.2)' );
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
            var forces = rg.forces;
            var fvectors = forces.vectors;
            var fviews = sn( 'views', forces );

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
                    tpclass : 'force',
                } );
                //paints tip of the force in red
                rgPos2rgMedia( ffkey1, {
                    //fill:'red',
                    cssClass:'tofill',
                    tpclass : 'force',
                    r : 6,
                });

                //----------------------------------
                // //\\ makes red line segments for force
                //----------------------------------
                var wwpname = fkey+'-applied';
                var wwline = toreg( wwpname )({ undisplay : true })();
                pointies2line(
                    wwpname,
                    fview.pivots,
                    {
                        cssClass:'tostroke',
                        'stroke-width': 5, //7,
                        //stroke:'transparent',
                        tpclass : 'force',
                    }
                );
                //----------------------------------
                // \\// makes red line segments for force
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
                    var ffkey0 = fkey+'-0';
                    var ffkey1 = fkey+'-1';
                    toreg( ffkey0 )({ undisplay : true })();
                    toreg( ffkey1 )({ undisplay : true })();

                    //defines base of force as invisible point:
                    rgPos2rgMedia( ffkey0, { fill:'transparent' } );
                    //paints tip of the force in red
                    rgPos2rgMedia( ffkey1, {
                        //fill:'red',
                        cssClass:'fill theor1proof',
                        tpclass : 'force',
                        r : 4, //6,
                    });

                    var wwpname = fkey+'-applied';
                    var wwline = toreg( wwpname )({ undisplay : true })();
                    //makes red line segments for force
                    pointies2line(
                        wwpname,
                        fview.pivots,
                        {
                            //stroke:'red',
                            cssClass:'tostroke theor1proof',
                            'stroke-width':4, //5,
                            tpclass : 'force',
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

