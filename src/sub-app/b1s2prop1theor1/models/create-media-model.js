( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var tr          = ssF.tr;
    var tp          = ssF.tp;
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_create';
    srg_modules[ modName + '-' + mCount.count ] = setModule;



    var modpos2medpos;
    var pointies2line;
    var pos2pointy;
    var paintTriangle;
    return;








    function setModule()
    {
        modpos2medpos   = ssF.modpos2medposLL;
        pointies2line   = ssF.pointies2lineLL;
        pos2pointy      = ssF.pos2pointyLL;
        paintTriangle   = ssF.paintTriangleLL;
        sn(SUB_MODEL, studyMods ).createMedia = createMedia;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function createMedia()
    {
        //===================================================
        // //\\
        //===================================================
        //:study-pars
        var S       = rg.S.pos;
        var force   = rg.force.pos;
        var path    = rg.path.pos;
        var freePath= rg.freePath.pos;
        //var freeTriangles = rg.freeTriangles.pos;
        //var keplerTriangles = rg.keplerTriangles.pos;
        var speeds  = rg.speeds.pos;
        var spatialStepsMax = rg.spatialStepsMax.pos;
        //===================================================
        // \\//
        //===================================================

        var pathRacks = [];
        tr( 'pathRacks', 'pathRacks', pathRacks );

        //:fixes lenghts to synch with new spatialStepsMax
        //not used: freeTriangles.length = Math.min( freeTriangles.length, spatialStepsMax );

        if( ns.h( rg.time, 'achieved' ) ) {
            ////dragger can be already created in previous simulation, but time
            ////may be corrected at this one, so do limit the time to avoid weird behavior
            rg.time.achieved.achieved = rg.time.t;
            if( ns.h( studyMods[ SUB_MODEL ], 'clearScenario' ) ) {
                ////clears fragments of paths if they were created
                ////in previous iterations
                studyMods[ SUB_MODEL ].clearScenario();
                //studyMods[ SUB_MODEL ].clearScenario();
            }
        }

        rg.forces.vectors.length = Math.min( rg.forces.vectors.length, spatialStepsMax-1 );
        speeds.length = Math.min( speeds.length, spatialStepsMax-1 );
        freePath.length = Math.min( freePath.length, spatialStepsMax-2 );


        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================
        var pointS = pos2pointy(
            'S',
              { 
                cssClass:'tofill tostroke',
                tpclass : 'force-center',
                'fill' : 'blue',
              }
        );

        path.forEach( (pt, pix) => {
            var pkey = 'path-' + pix;
            tp( pkey, pt );
            pathRacks[ pix ] = pos2pointy(
                pkey,
                  { 
                    //cssClass:'tofill tostroke',
                    'fill' : 'transparent',
                    //tpclass : 'path',
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
            // //\\ paints forces
            //---------------------------------------------------------
            //forces master-index offset is pi = 1 and
            //identified with key 'kepltr-' + (pi-1)
            var forces = rg.forces;
            var fvectors = forces.vectors;
            var fviews = sn( 'views', forces );

            if( pix > 0 ) {
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
                //makes red line segments for force
                pointies2line(
                    fkey+'-applied',
                    fview.pivots,
                    {
                        cssClass:'tostroke',
                        'stroke-width':5,
                        //stroke:'red',
                        tpclass : 'force',
                    }
                );

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
            }
            //---------------------------------------------------------
            // \\// paints forces
            //---------------------------------------------------------



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
                paintTriangle( pkey, !'cssCls', 'free-triangle', 'rgba( 100,255,100,0.2)' );
            }
            //---------------------------------------------------------
            // \\// free triangles
            //---------------------------------------------------------
        });



        // //\\ paints first radius
        var A = pathRacks[0];
        var wwPivots = [pointS,A];
        pointies2line(
            'radiusToFirstPoint', wwPivots,
            {stroke:'black', 'stroke-width':1}
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
                    //'fill' : '#00aa00',
                    tpclass : 'free-path',
                  }
            );
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
                cssClass : 'tofill tostroke',
                'fill' : 'white',
                'stroke' : 'blue',
                'stroke-width' : 3,
                r : 6,
            }
        );
        // \\// creates point B to slide


        setupScenario();
        if( ns.h( rg.time, 'doUpdateModelAndMediaPosition' ) ) {
            //if slider is already created ...
            rg.time.doUpdateModelAndMediaPosition();
        } else {
            createSlider();
        }
        return;





        //----------------------------------------
        // //\\ makes up time slider
        //----------------------------------------
        function createSlider()
        {
            //  timeSlider already has a parameter "t"
            //  we are adding more elements and functionality
            //  into this namespace now
            var startX                  = rg.S.pos[0]+0.2;
            var endX                    = A.pos[0]-0.2;
            var slideModelRailsLength   = endX - startX;
            var startPointPos           = [startX, rg.S.pos[1]-0.15];
            var endPointPos             = [endX, A.pos[1]-0.15];

            // //\\ slider object
            tp( 'sliderStart', startPointPos );
            tp( 'sliderEnd', endPointPos );
            var sliderStart = pos2pointy( 'sliderStart', { fill : '#9999dd' } );
            var sliderEnd = pos2pointy( 'sliderEnd', { fill : '#9999dd' } );
            ///draws rails
            var slider = pointies2line(
                 'time-slider',
                 [sliderStart, sliderEnd],
                 {stroke:'#9999dd', 'stroke-width':3}
            );
            $$.$(slider.svgel).cls( 'tp-time-slider' );
            // \\// slider object

            var time = rg.time;
            tr( 'time','pos', [startPointPos, endPointPos] );
            time.startX = startX;
            time.endX = endX;
            time.slideModelRailsLength = slideModelRailsLength;

            pos2pointy(
                'time',
                {
                    stroke : '#9999dd',
                    'stroke-width' : 3,
                    fill : 'white',
                    r : 8,
                    tpclass : 'time',
                }
            );

            time.doUpdateModelAndMediaPosition = function() {
                var sliderXpos =
                     time.t*slideModelRailsLength/rg.spatialStepsMax.pos +
                     sliderStart.pos[0];
                var pt = time;
                pt.pos = [ sliderXpos, sliderStart.pos[1] ];
                pt.medpos = modpos2medpos( pt.pos );
                //ccc( 'time', time.t.toFixed(2) )
                sv.u({
                    svgel   : pt.svgel,
                    parent  : studyMods[ SUB_MODEL ].mmedia,
                    cx : pt.medpos[0],
                    cy : pt.medpos[1],
                });
                sn(SUB_MODEL, studyMods ).drawEvolution( time.t );
            };
            time.doUpdateModelAndMediaPosition();
        }
        //----------------------------------------
        // \\// makes up time slider
        //----------------------------------------
        //==========================================
        // \\// does paint view
        //==========================================




        //*******************************************
        // //\\ setsup scenario
        //*******************************************
        function setupScenario()
        {
            var scenario = pathRacks.map( (pt, pix) => {
                var fragment = [];

                if( pix === 1 ) {
                    var fgroup = [];
                    fragment.push( fgroup );
                    //:"circumscribed" triangle
                    fgroup.push( rg[ 'kepltr-' + (pix-1) ] );
                    //:final path
                    fgroup.push( rg[ 'pathSegment-' + (pix-1) ] );
                }

                if( pix > 1 ) {

                    //0
                    //------------------------------------
                    // //\\ initial group
                    //------------------------------------
                    var fgroup = [];
                    fragment.push( fgroup );   
                    //:previous kepler
                    fgroup.push( rg[ 'kepltr-' + (pix-2) ] );
                    //:current free path segment added
                    fgroup.push(
                        rg[ 'freePathSegment-' + (pix-2) ]
                    );
                    //:current free path added
                    fgroup.push(
                        rg[ 'freepath-' + (pix-2) ]
                    );
                    fgroup.push(
                        rg[ 'freetr-' + (pix-2) ]
                    );
                    //------------------------------------
                    // \\// initial group
                    //------------------------------------

                    //1
                    //------------------------------------
                    // //\\ added force group
                    //------------------------------------
                    var fgroup = [];
                    fragment.push( fgroup );   
                    //:previous added
                    fgroup.push( rg[ 'kepltr-' + (pix-2) ] );
                    fgroup.push(
                        rg[ 'freePathSegment-' + (pix-2) ]
                    );   
                    fgroup.push(
                        rg[ 'freepath-' + (pix-2) ]
                    );
                    fgroup.push(
                        rg[ 'freetr-' + (pix-2) ]
                    );
                    //:force appears
                    var fkey = 'force-' + (pix-2);
                    var fappliedKey = fkey + '-applied';
                    var tipKey = fkey+'-1';
                    fgroup.push( rg[ fappliedKey ] );   
                    fgroup.push( rg[ tipKey ] );   
                    //------------------------------------
                    // \\// added force group
                    //------------------------------------

                    //2
                    //------------------------------------
                    // //\\ force applied group
                    //------------------------------------
                    var fgroup = [];
                    fragment.push( fgroup );   
                    //:previous added
                    fgroup.push( rg[ 'kepltr-' + (pix-2) ] );
                    fgroup.push(
                        rg[ 'freePathSegment-' + (pix-2) ]
                    );   
                    fgroup.push(
                        rg[ 'freepath-' + (pix-2) ]
                    );
                    fgroup.push(
                        rg[ 'freetr-' + (pix-2) ]
                    );
                    //:force appears
                    var fkey = 'force-' + (pix-2);
                    var fappliedKey = fkey + '-applied';
                    var tipKey = fkey+'-1';
                    fgroup.push( rg[ fappliedKey ] );   
                    fgroup.push( rg[ tipKey ] );   

                    //.new kepler
                    fgroup.push( rg[ 'kepltr-' + (pix-1) ] );

                    //:still keep free path
                    fgroup.push( rg[ 'freePathSegment-' + (pix-2) ] );
                    //:shows force translated to the tip of free path segment
                    fgroup.push( rg[ 'translated-force-' + (pix-2) + '-applied' ] );
                    fgroup.push( rg[ 'translated-force-' + (pix-2) + '-1' ] );
                    //------------------------------------
                    // \\// force applied group
                    //------------------------------------

                    //3
                    //------------------------------------
                    // //\\ path finalized group
                    //------------------------------------
                    var fgroup = [];
                    fragment.push( fgroup );   
                    //:previous kepler
                    fgroup.push( rg[ 'kepltr-' + (pix-1) ] );
                    fgroup.push( pathRacks[ pix-1 ] );
                    fgroup.push( rg[ 'pathSegment-' + (pix-1) ] );

                    //:force still visible
                    var fkey = 'force-' + (pix-2);
                    var fappliedKey = fkey + '-applied';
                    var tipKey = fkey+'-1';
                    fgroup.push( rg[ fappliedKey ] );   
                    fgroup.push( rg[ tipKey ] );   
                    //------------------------------------
                    // \\// path finalized group
                    //------------------------------------

                }
                if( !fragment.length ) {
                    fragment[0] = [];
                }
                return fragment;
            });
            sn(SUB_MODEL, studyMods ).drawEvolution = drawEvolution;
            sn(SUB_MODEL, studyMods ).clearScenario = clearScenario;
            clearScenario();
            return;



            //*******************************************
            // //\\ clears scenario
            //      does it every time before drag
            //*******************************************
            function clearScenario() {
                scenario.forEach( (fragment,fix) => {
                    //ccc( fix + ' clears fragment=', fix );
                    fragment.forEach( (fgroup,gix) => {
                        //ccc( fix + ' ' + gix + ' clears fgroup=', fgroup );
                        fgroup.forEach( ( paintee, mix ) => {
                            //ccc( fix + ' ' + gix + ' ' + mix + ' class=', paintee );
                            $$.$(paintee.svgel).addClass( 'opacity0' ).removeClass( 'opacity1' );
                        });
                    });
                });

                pathRacks.forEach( (prack, pix ) => {
                    $$.$(prack.svgel).addClass( 'opacity0' ).removeClass( 'opacity1' );

                    //:hides all forces
                    if( pix > 0 ) {
                        var fkey = 'force-' + (pix-1);
                        var fappliedKey = fkey + '-applied';
                        var tipKey = fkey+'-1';
                        $$.$(rg[ fappliedKey ].svgel)
                                .addClass( 'opacity0' ).removeClass( 'opacity1' );   
                        $$.$(rg[ tipKey ].svgel)
                                .addClass( 'opacity0' ).removeClass( 'opacity1' );   
                    }

                    if( pix < pathRacks.length-1 && pix-1 >= 0 ) {
                        //cleans final path
                        $$.$(rg[ 'pathSegment-' + (pix-1) ].svgel)
                            .addClass( 'opacity0' ).removeClass( 'opacity1' );

                        var fkey = 'force-' + (pix-1);
                        var fappliedKey = fkey + '-applied';
                        var tipKey = fkey+'-1';
                        $$.$(rg[ fappliedKey ].svgel)
                          .addClass( 'opacity0' ).removeClass( 'opacity1' );
                        $$.$(rg[ tipKey ].svgel).addClass( 'opacity0' ).removeClass( 'opacity1' );   
                    }
                });
            }
            //*******************************************
            // \\// clears scenario
            //*******************************************




            //*******************************************
            // //\\ particle evolution master painter
            //*******************************************
            function drawEvolution( time )
            {
                //skips first step:
                var steps = pathRacks.length;
                time = time / steps * (steps-1) + 1;
                var stepIx = Math.floor( time * 4 );
                var substepIx = stepIx%4;
                stepIx = ( stepIx - substepIx ) / 4;
                if( pathRacks.length <= stepIx ) return;
                clearScenario();

                //: always shows first Kepler's triangle to "point out"
                //;  it is equal to all others
                $$.$( rg[ 'kepltr-' + 0 ].svgel)
                        .addClass( 'opacity1' ).removeClass( 'opacity0' );
 
                ///draws previous path
                pathRacks.forEach( (prack, pix ) => {

                    //: already accomplished path
                    $$.$(prack.svgel).addClass( 'opacity1' ).removeClass( 'opacity0' );
                    if( pix > 0 && pix < stepIx) {
                        $$.$( rg[ 'pathSegment-' + (pix-1) ].svgel)
                            .addClass( 'opacity1' ).removeClass( 'opacity0' );
                    }

                    if( pix > stepIx - 2 ) return; //draws only previous path
                    if( pix-1 >= 0 ) {
                        var fkey = 'force-' + (pix-1);
                        var fappliedKey = fkey + '-applied';
                        var tipKey = fkey+'-1';
                        $$.$(rg[ fappliedKey ].svgel)
                          .addClass( 'opacity1' ).removeClass( 'opacity0' );
                        $$.$(rg[ tipKey ].svgel).addClass( 'opacity1' ).removeClass( 'opacity0' );   
                    }
                });


                //.there can be less fgroups than 4, set phase to latest one index
                var fgroups = scenario[ stepIx ];  
                substepIx = Math.min( fgroups.length-1, substepIx );

                //ccc( 'draws: ' +stepIx + '.' + substepIx + ' ')

                var fgroup = fgroups[substepIx];
                if( !fgroup ) return;


                fgroup.forEach( (paintee, leafix) => {
                    $$.$(paintee.svgel).addClass( 'opacity1' ).removeClass( 'opacity0' );
                    //ccc( 'draws: ' +stepIx + '.' + substepIx + ' ' + leafix);
                });
            }
        }
        //*******************************************
        // \\// particle evolution master painter
        // \\// setsup scenario
        //*******************************************



        function initMediaModel()
        {
            studyMods[ SUB_MODEL ].mmedia$.cls( 'submodel-' + SUB_MODEL );
            sn( SUB_MODEL, studyMods ).initDragModel();
        }
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

}) ();

