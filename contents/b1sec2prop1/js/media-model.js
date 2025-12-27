( function() {
    var {
        ns, sn, $$, eachprop, nspaste, has, haz, hafff, fmethods,
        toreg, sconf, ssF, ssD, sDomF, rg, exegs,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___before_basic,
            media_upcreate___after_basic,
        },
    });
    var initialization_is_done = false;
    //enables steps BC, CD, ... by clicks on B, C, ...
    var POINTS_BCDE_ARE_ACTIVE = false;
    var lemmaP2coroll =
        ('Caracc Paracc Varacc CCaracc SCaracc BCaracc BParacc' +
         ' CParacc VVaracc BVaracc CaraccParacc SBCaracc cCaracc').split(' ');
    return;


    function media_upcreate___before_basic (){
        //console.log('P1 media_upcreate');
        //reestablishes detecton to hide/unhide image for case the state
        //rg.detected_user_interaction_effect_DONE came from subessay launch
        sDomF.detected_user_interaction_effect(
            !rg.detected_user_interaction_effect_DONE );
        ccc( sconf.linesArray[4] );

        //***********************************************************
        //wraps remained tasks into d8d slider
        //if slider is already created ...
        //needs svgs ? fails
        //hafff( rg.slider_sltime, 'upates_timeSlider8unmasksSvgDom' );

        //todo //patch
        sn( 'displayPathStep', rg, { value : 1 } );
        sn( 'stepIx', rg, { value : 1 } );
        sn( 'p', rg.P, { abs : 1 } );
        //***********************************************************
    }

    function media_upcreate___after_basic (){
        if( sconf.TIMER_AND_LOGIC_STEPS_COINSIDE ||
            ( haz( amode, 'logic_phase') === 'proof' &&
              fconf.sappId === "b1sec2prop1"
            )
        ){
            //Adjust when the following decorations start
            //becoming visible for the P1 proof tab.

            //There was a bug where even though the step’s value was
            //the same, decoration visibility was different depending
            //on whether the
            //user clicked text in the text area vs the time slider.
            //Therefore they are now both set with the exact same code below.

            //decStart = 5 corresponds to clicking “the second part of
            //the time” in the 2nd paragraph.
            const last = 5
            rg.c.decStart = last;
            rg.Bc.decStart = last;
            rg.SBc.decStart = last;
            //There was a bug where hovering the mouse over “cS”,
            //only made that line visible starting with “when the body
            //comes to B” rather
            //than “the second part of the time”.  Therefore decStart was
            //switched to the following from last+1 (6).
            rg.Sc.decStart = last;

            //decStart = 6 corresponds to clicking “when the body comes to B”
            //in the 2nd paragraph.
            rg.C.decStart = last+1;
            rg.V.decStart = last+1;
            rg.BC.decStart = last+1; //rg.C.decStart;
            rg.Cc.decStart = last+1; //rg.C.decStart;
        } else {
            const last = 7
            rg.c.decStart = last;
            rg.Bc.decStart = last;
            rg.SBc.decStart = last;
            rg.Sc.decStart = last;

            rg.C.decStart = last;
            rg.V.decStart = last;
            rg.BC.decStart = last;
            rg.Cc.decStart = last;
        }


        //-------------------------------------------------------
        // //\\ fixes logical step to 7 for corollary of P2
        //-------------------------------------------------------
        let CStart = rg.C.decStart;
        lemmaP2coroll.forEach( pn => {
            rg[pn].decStart = CStart;
            rg[pn].decEnd = CStart+3;
         });
        if(
            amode.subessay === 'cor-1' ||
            amode.subessay === 'cor-6' ||
            amode.logic_phase !== 'corollary'
        ){
            rg.V.decStart = 11111111;
            rg.V.decEnd   = 1111111;
        } else {
            rg.V.decStart = 2;
            rg.V.decEnd   = 1111111;
        }
        //-------------------------------------------------------
        // \\// fixes logical step to 7 for corollary of P2
        //-------------------------------------------------------
        //no svg, only logic:
        pathDelays2forceDraggers();

        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        //:updates subessay menu
        //var exAspect = exegs[ amode.logic_phase ][ amode.aspect ];
        //var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
        //css and reveals subessay in menu and in text
        //no paints and no svg
        //sDomF.addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg })

        //todm ... generalize in one spot
        //ssF.toogle_detectablilitySliderPoints4Tools();

        ///why apparently duplicate tr 2 shapes?
        ///because this thing does historical job, it updates core svg shapes
        ///along the path; but while program progressed, new decorations
        ///came up which need their own work,
        ///todo may confilict with lemma core shapes svg,
        stdMod.allPathRacks_2_unseenSVGs();
        stdMod.paints_draggableDecPoints8Line(); //changes svg

        //these are the new generation decorational svg objects
        //does not repeat creation ...A.svgel, ...
        //they may corrupt svg-zorder-for-dragging-handle-points
        //if used non-properly, f.e. create and dress svg first,
        //stdMod.dec2svg();
        eachprop( stdMod.decor, (dec,pname) => {
            if( !dec.isPoint && dec.pivotNames.length !== 2 ) {
                dec.poly_2_updatedPolyPos8undisplay();
            }
        });

        if( initialization_is_done ) {
            stdMod.hollowHandles_2_dynamicMedpos();
            stdMod.hollowForceHandlers_2_dynamicMedpos();
        } else {
            ///drags holes, take care for svg-elements are not
            ///yet created,
            ///drags holes, but then hides them (why?)
            stdMod.hollowHandles_2_rgPlaces8media();
            stdMod.hollowForceHandlers_2_rgPlaces8media();
        }
        //***********************************************************
        //wraps remained tasks into d8d slider
        //if slider is already created ...
        ccc( 'media-model.js, does value to life for main-legend' );
        hafff( rg.slider_sltime, 'upates_timeSlider8unmasksSvgDom' );
        //c cc( 'media rg.rgslid_dt,' + rg.rgslid_dt.val );
        hafff( rg.rgslid_dt, 'updates_sliderGUI' );
        //***********************************************************

        //----------------------------------------------------
        // //\\ shows next move of the proof
        //----------------------------------------------------
        if( !initialization_is_done ) {
            ///launch time work
            initialization_is_done = true;
            if( POINTS_BCDE_ARE_ACTIVE ) {
                rg.B.svgel.addEventListener( 'click', function() {
                    if( amode.logic_phase === 'proof' ) {
                        fmethods.executeCapturedState( '1-4' );
                    }
                });
                rg.C.svgel.addEventListener( 'click', function() {
                    if( amode.logic_phase === 'proof' ) {
                        fmethods.executeCapturedState( '1-C' );
                    }
                });
                rg.D.svgel.addEventListener( 'click', function() {
                    if( amode.logic_phase === 'proof' ) {
                        fmethods.executeCapturedState( '1-D' );
                    }
                });
                rg.E.svgel.addEventListener( 'click', function() {
                    if( amode.logic_phase === 'proof' ) {
                        fmethods.executeCapturedState( '1-E' );
                    }
                });
                ['B', 'C', 'D', 'E'].forEach( id => {
                    rg[id + 'title'] = $$
                        .cNS( 'title' )
                        .to( rg[id].svgel )
                        .addClass( 'tpstroke' )
                        .addClass( 'tpfill' )
                        ();
                });
            }
        }
        var pointsAreOn = POINTS_BCDE_ARE_ACTIVE &&
                          amode.logic_phase === 'proof';
        ['B', 'C', 'D', 'E'].forEach( id => {
                let rgX = rg[ id ];
                if( has(rgX, 'svgel' )){
                    rgX.svgel.setAttribute( 'r', pointsAreOn ? '6' : '4' );
                    rgX.svgel.style[ 'fill' ] = pointsAreOn ?
                    '#cccccc' : sDomF.getFixedColor( 'path' );
                } else {
                    ccc( rgX.pname + ' svg is missed in media-model.js' );
                }
                if( POINTS_BCDE_ARE_ACTIVE ) {
                    rg[ id + 'title' ].textContent =
                        pointsAreOn ? 'show next move' : '';
                }
        });
        //----------------------------------------------------
        // \\// shows next move of the proof
        //----------------------------------------------------

        rg['main-legend'].tb.corollary.style.display =
            ( amode.logic_phase === 'corollary' && amode.subessay === 'cor-1' ) ?
            'table' : 'none';

        {
            ////apparently working with non-standard lemma,
            ////one of triangles
            ////triangle-even tp-_s_b_c tp-kepler-triangle
            ////(try document.querySelector( '.tp-_s_b_c' ).style.display = 'none';)
            ////covers these two lines,
            ////we do a manual patch to remove and add them
            ////over this triangle,
            let svg = rg.VVaracc.svgel;
            let parent = svg.parentNode;
            if( !parent ) return; //todo fix rightly, fix the cause
            svg.remove();
            parent.appendChild( svg );
            svg = rg.BVaracc.svgel;
            svg.remove();
            parent.appendChild( svg );
            //similar method:
            svg = rg.CaraccParacc.svgel;
            if( !has( rg.CaraccParacc, 'svgel' ) ) return; //todo patch
            svg.remove();
            parent.appendChild( svg );
            //making this point over the line
            svg = haz( rg['VVV0-white-filler'], 'svgel' );
            svg.remove();
            parent.appendChild( svg );
        }

        ssF.mediaModelInitialized = true;
    }

    function pathDelays2forceDraggers (){
        ['B','C','D','E','F'].forEach( (pname, ix) => {
            let decEnd = rg.C.decEnd+(ix+10)*4;
            let decStart = rg.C.decStart+ix*4;
            let nam0 = 'VV'+ix;
            let nam1 = 'VVV'+ix;
            let nam1f = nam1+'-white-filler';
            let doPaintPname = false;
            Object.assign( rg[ nam0 ], {
                decStart    : 111111111,
                decEnd,
                doPaintPname,
                pointWrap : { doPaintPname },
            });
            Object.assign( rg[ nam1 ], {
                decStart    : 111111111,
                decEnd,
                doPaintPname,
                pointWrap : { doPaintPname },
            });
            Object.assign( rg[ nam1f ], {
                decStart,
                decEnd,
                doPaintPname,
                pointWrap : { doPaintPname },
            });
        });
    }
})();