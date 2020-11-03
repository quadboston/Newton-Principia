( function() {
    var {
        ns, sn,
        sconf, fconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,
        tr, tp,

    } = window.b$l.apptree({
        modName : 'mediaModel_create',
        stdModExportList :
        {
            media_upcreate,
        },
        setModule,
    });
    var pointies2line;
    var pos2pointy;
    var paintTriangle;
    var handleR = 5;
    return;








    function setModule()
    {
        pointies2line           = ssF.pointies2line;
        pos2pointy              = ssF.pos2pointy;
        paintTriangle           = ssF.paintTriangle;
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate()
    {
        if( !ssF.mediaModelInitialized ) {
            stdMod.declaresMediaDecorationElements();
            ns.haff( stdMod, 'create_digital_legend' );
        }
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
        }
        ssF.mediaModelInitialized = true;
    }


    //=========================================================
    // //\\ updater helper
    //=========================================================
    function createMedia0updateMediaAUX()
    {
        stdMod.toogle_detectablilitySliderPoints4Tools(); //todm ... generalize in one spot

        //===================================================
        // //\\ study-pars
        //===================================================
        var S               = rg.S.pos;
        var force           = rg.force.pos;
        var path            = rg.path.pos;
        var freePath        = rg.freePath.pos;
        var speeds          = rg.speeds.pos;
        var spatialStepsMax = rg.spatialStepsMax.pos;
        //===================================================
        // \\// study-pars
        //===================================================

        tr('stepIx','value',-1);
        var pathRacks = [];
        tr( 'pathRacks', 'pathRacks', pathRacks );

        //:fixes lenghts to synch with new spatialStepsMax
        //not used: freeTriangles.length = Math.min( freeTriangles.length, spatialStepsMax );

        if( ns.h( rg.slider_sltime, 'achieved' ) ) {
            ns.haf( stdMod, 'clearScenario' )();
        }

        rg.forces.vectors.length = Math.min(
            rg.forces.vectors.length, spatialStepsMax-1 );
        speeds.length = Math.min( speeds.length, spatialStepsMax-1 );
        freePath.length = Math.min( freePath.length, spatialStepsMax-2 );


        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================
        var pointS = pos2pointy(
            'S',
              { 
                cssClass: 'tofill tostroke',
              }
        );

        //path = rg.path.pos;
        path.forEach( (pt, pix) => {

            //pix === 0 => pt = pos of 'A'
            //pix === 1 => pt = pos of 'B'
            /*
            pathRacks will become pathRacks= [
                rg[ 'path-0' ], // === { pos:[], medpos:[], svgel: ... } //at point "A"
                rg[ 'path-1' ], // === { pos:[], medpos:[], svgel: ... } //at point "B"
                ...
            ]
            */

            var pkey = 'path-' + pix;
            tp( pkey, pt );
            //path pathRacks do start at "A" === (pix === 0)
            pathRacks[ pix ] = pos2pointy(
                ////this adds medpos to rg[ 'path-' + pix ]
                pkey,
                  { 
                    'fill' : 'transparent',
                    r : 1,
                  }
            );

            //---------------------------------------------------------
            //makes keplerTriangles
            //---------------------------------------------------------
            //keplerTriangles master-index offset is pi = 1 and
            //identified with key 'kepltr-' + (pi-1)
            if( pix > 0 ) {
                var kix = pix-1;
                var pkey = 'kepltr-' + kix;
                var ktr = tr( pkey );
                ktr.vertices = [ path[pix-1], path[pix], S ];
                //paints Kepler's triangles rg[pkey] along the path:
                paintTriangle( pkey, !'cssCls', 'kepler-triangle', 'rgba( 100,100,255,0.2)' );
            }

            //---------------------------------------------------------
            // //\\ free triangles
            //---------------------------------------------------------
            if( pix > 1 ) {
                var kix = pix-2;

                //makes freeTriangles
                //freeTriangles array master-index offset is pi = 2
                var pkey = 'freetr-' + kix;
                var ktr = tr( pkey );
                ktr.vertices = [ path[pix-1], freePath[pix-2], S ];
                //paints Kepler's triangles rg[pkey] along the path:
                paintTriangle( pkey, 'tofill', 'free-triangle', 'rgba( 100,255,100,0.2)' );
            }
            //---------------------------------------------------------
            // \\// free triangles
            //---------------------------------------------------------
        });

        path.forEach( (pt, pix) => {

            //why does it make these racks second time?
            var pkey = 'path-' + pix;
            tp( pkey, pt );
            pathRacks[ pix ] = pos2pointy(
                pkey,
                  { 
                    'fill' : 'transparent',
                    r : 1,
                  }
            );

            //---------------------------------------------------------
            // //\\ paints forces
            //---------------------------------------------------------
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
                var fview = tr( fkey );
                //bare position at the base of force
                var pos0 = path[pix];
                //applies force to pos0: just bare position
                var pos1 = [
                    ////we really draw paths, not forces
                    pos0[0]+fvectors[kix][0] * rg.timeStep.t,
                    pos0[1]+fvectors[kix][1] * rg.timeStep.t,
                ];
                //this section can be simplified ... but so far
                //we have to create pointies to make line segments for forces,
                //we have to create "keys" to make pointies
                var ffkey0 = fkey+'-0';
                var ffkey1 = fkey+'-1';
                tp( ffkey0, pos0 );
                tp( ffkey1, pos1 );


                //---------------------------------
                // //\\ adds decorational points
                //---------------------------------
                if( pix === 1 ) {
                    ////does decoration point V
                    ns.paste( rg.V.pos, pos1 );
                }
                if( pix === 4 ) {
                    ////does decoration point V
                    ns.paste( rg.Z.pos, pos1 );
                }
                //---------------------------------
                // \\// adds decorational points
                //---------------------------------

                pos2pointy( ffkey0, {
                    fill:'transparent',
                    tpclass : 'force',
                } );
                //paints tip of the force in red
                pos2pointy( ffkey1, {
                    //fill:'red',
                    cssClass:'tofill',
                    tpclass : 'force',
                    r : 6,
                });
                fview.pivots = [ rg[ ffkey0 ], rg[ ffkey1 ] ];

                //----------------------------------
                // //\\ makes red line segments for force
                //----------------------------------
                pointies2line(
                    fkey+'-applied',
                    fview.pivots,
                    {
                        cssClass:'tostroke',
                        'stroke-width':7,
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
                    var fview = tr( fkey );

                    //bare position at the base of force
                    var pos0 = freePath[kix];

                    //applies force to pos0: just bare position
                    var pos1 = [
                        pos0[0]+fvectors[kix][0] * rg.timeStep.t,
                        pos0[1]+fvectors[kix][1] * rg.timeStep.t
                    ];
                    //this section can be simplified ... but so far
                    //we have to create pointies to make line segments for forces,
                    //we have to create "keys" to make pointies
                    var ffkey0 = fkey+'-0';
                    var ffkey1 = fkey+'-1';
                    tp( ffkey0, pos0 );
                    tp( ffkey1, pos1 );

                    //defines base of force as invisible point:
                    pos2pointy( ffkey0, { fill:'transparent' } );
                    //paints tip of the force in red
                    pos2pointy( ffkey1, {
                        //fill:'red',
                        cssClass:'fill',
                        tpclass : 'force',
                        r : 6,
                    });

                    fview.pivots = [ rg[ ffkey0 ], rg[ ffkey1 ] ];
                    //makes red line segments for force
                    pointies2line(
                        fkey+'-applied',
                        fview.pivots,
                        {
                            //stroke:'red',
                            cssClass:'tostroke',
                            'stroke-width':5,
                            tpclass : 'force',
                        }
                    );
                }
                //*****************************************
                // \\// paints forces attached to c, d, ...
                //*****************************************
            }
            //---------------------------------------------------------
            // \\// paints forces
            //---------------------------------------------------------
        });








        // //\\ paints first radius
        var A = pathRacks[0];
        var wwPivots = [pointS,A];
        pointies2line(
            'radiusToFirstPoint', wwPivots,
            {
                stroke:'black',
                'stroke-width':1,
                tpclass : 'path',
             }
        );
        // \\// paints first radius


        // //\\ paints free path points
        var freePathRacks = freePath.map( (pt, pix) => {
            var pkey = 'freepath-' + pix;
            tp( pkey, pt );
            pos2pointy(
                pkey,
                  {
                    cssClass:'tofill tostroke',
                    tpclass : 'free-path',
                  }
            );

            // //\\ decorations
            //      for c,d,e,f - "free" points
            if( pix === rg.c.decoration_pathIx-3 ) {
                ns.paste( rg.c.pos, pt );
            }
            if( pix === rg.d.decoration_pathIx-3 ) {
                ns.paste( rg.d.pos, pt );
            }
            if( pix === rg.e.decoration_pathIx-3 ) {
                ns.paste( rg.e.pos, pt );
            }
            if( pix === rg.f.decoration_pathIx-3 ) {
                ns.paste( rg.f.pos, pt );
            }
            // \\// decorations

            return rg[pkey];
        });
        tr( 'freePathRacks', 'freePathRacks', freePathRacks );
        // \\// paints free path points



        // //\\ free line segment
        freePathRacks.forEach( (frack, pix) => {
            var wwPivots = [pathRacks[pix+1], frack];
            pointies2line(
                'freePathSegment-' + pix, wwPivots,
                {
                    //stroke:'green',
                    cssClass:'tofill tostroke',
                    tpclass : 'free-path',
                    'stroke-width':4
                }
            );
        });
        // \\// free line segment

        // //\\ real path line segment
        pathRacks.forEach( (prack, pix) => {
            if( pix === pathRacks.length - 1 ) return;
            var wwPivots = [prack, pathRacks[pix+1]];
            pointies2line(
                'pathSegment-' + pix, wwPivots,
                {
                    cssClass:'tostroke',
                    //stroke:'blue',
                    tpclass : 'path',
                    'stroke-width':4
                }
            );
        });
        // \\// real path line segment

        // //\\ creates point B to slide
        //      put this el-definition last to
        //      override all other graphics
        pos2pointy(
            'B',
            { 
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : 'white',
                'stroke' : 'blue',
                'stroke-width' : 3,
                r : 6,
            }
        );
        // \\// creates point B to slide




        // //\\ updates medpos and svg el for point V to slide
        //      put this el-definition last to
        //      override all other graphics
        pos2pointy(
            'V',
            { 
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : 'white',
                'stroke' : sDomF.getFixedColor( 'field' ),
                'stroke-width' : 3,
                r : 6,
            }
        );
        // \\// creates point V to slide

        // //\\ updates medpos and svg el for point V to slide
        //      put this el-definition last to
        //      override all other graphics
        pos2pointy(
            'A',
            {
                'fill' : 'white',
                'stroke' : sDomF.getFixedColor( 'path' ),
                'stroke-width' : 3,
                r : 6,
                cssClass : 'ppp-a',
            }
        );
        // \\// creates point V to slide


        //-------------------------------------------------
        // //\\ Bulk of the painting
        //-------------------------------------------------
        stdMod.does_groupify_showElements();
        //-------------------------------------------------
        // //\\ Wraps final painting iside the d8d slider
        //-------------------------------------------------
        if( ns.h( rg.slider_sltime, 'val_2_pos8GUI8cb' ) ) {
            //if slider is already created ...
            //recall: cb does stand for apiCallback = 'drawEvolution'
            rg.slider_sltime.val_2_pos8GUI8cb();
        } else {
            stdMod.creates_sliderDomModel__4__time();
        }
        //-------------------------------------------------
        // \\// Wraps final painting iside the d8d slider
        // \\// Bulk of the painting
        // \\// does paint view
        //==========================================
    }
    //=========================================================
    // \\// updater helper
    //=========================================================


}) ();

