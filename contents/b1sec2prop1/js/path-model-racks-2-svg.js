( function() {
    var {
        sn, $$, eachprop,
        sconf, ssF, ssD, sDomF, toreg, rg,
        amode,
    } = window.b$l.apptree({
        stdModExportList :
        {
            allPathRacks_2_unseenSVGs,
        },
    });
    return;









    ///this fun. completes the split model and media code,
    function allPathRacks_2_unseenSVGs()
    {
        var pointies2line   = ssF.pointies2line;
        var rg8pos_2_svg    = ssF.rgPos2rgMedia;
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
            rg8pos_2_svg(
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
                //if( pix <=5 ) {
                //    var triangleOddness = 'hidden';
                var triangleOddness = pix%2 ? 'triangle-odd' : 'triangle-even';
                switch (pix) {
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

                rg8pos_2_svg( ffkey0, {
                    fill:'transparent',
                    tpclass : 'force-_move hidden',
                } );
                //paints tip of the force in red
                rg8pos_2_svg( ffkey1, {
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
                let forceShape = pointies2line(
                    wwpname,
                    fview.pivots,
                    {
                        cssClass:'tostroke tp-' + wwpname,
                        'stroke-width': 3,
                        tpclass : 'forceMove',
                    }
                );
                //----------------------------------
                // \\// makes red line segments for force
                // \\// paints forces attached to B, C, ...
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
            rg8pos_2_svg(
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

