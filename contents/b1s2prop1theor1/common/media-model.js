( function() {
    var {
        ns, sn, $$, eachprop, has, haz, hafff, fmethods,
        sconf, ssF, sDomF, rg, exegs,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate,
        },
    });
    var handleR = 5;
    var pointsBCDE_events_are_assignend = false;
    return;









    ///=========================================================
    /// engine legacy function,
    /// GUIfies what is still not GUIfied,
    ///=========================================================
    function media_upcreate()
    {
        //reestablishes detecton to hide/unhide image for case the state
        //rg.detected_user_interaction_effect_DONE came from subessay launch
        sDomF.detected_user_interaction_effect( !rg.detected_user_interaction_effect_DONE );

        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        if( !ssF.mediaModelInitialized ) {
            ns.haff( stdMod, 'create_digital_legend' );
        }

        //:updates subessay menu
        var exAspect = exegs[ amode.theorion ][ amode.aspect ];
        var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
        ////reveals subessay in menu and in text
        sDomF.addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg })

        //todm ... generalize in one spot
        ssF.toogle_detectablilitySliderPoints4Tools( stdMod, );

        ///why apparently duplicate tr 2 shapes?
        ///because this thing does historical job, it updates core svg shapes
        ///along the path; but while program progressed, new decorations
        ///came up which need their own work
        stdMod.trajectoryShapes_2_media();

        ssF.v2GUI();
        stdMod.paints_draggableDecPoints8Line(); //changes svg

        //these are the new generation decorational svg objects
        //does not repeat creation ...A.svgel, ...
        stdMod.dec2svg();

        
        if( pointsBCDE_events_are_assignend ) {
            stdMod.fakePoints_2_svgPosition();
        } else {
            ///drags holes, but then hides them (why?)
            stdMod.dragPointPos_2_mediaOfDragKernels();
        }
        //***********************************************************
        //wraps remained tasks into d8d slider
        //if slider is already created ...
        hafff( rg.slider_sltime, 'upates_timeSlider8unmasksSvgDom' );
        //c cc( 'media rg.rgslid_dt,' + rg.rgslid_dt.val );
        hafff( rg.rgslid_dt, 'updates_sliderGUI' );
        //***********************************************************

        //----------------------------------------------------        
        // //\\ shows next move of the proof
        //----------------------------------------------------        
        if( !pointsBCDE_events_are_assignend ) {
            ///launch time work
            pointsBCDE_events_are_assignend = true;
            rg.B.svgel.addEventListener( 'click', function() {
                if( amode.theorion === 'proof' ) {
                    fmethods.executeCapturedState( '1-B' );
                }
            });
            rg.C.svgel.addEventListener( 'click', function() {
                if( amode.theorion === 'proof' ) {
                    fmethods.executeCapturedState( '1-C' );
                }
            });
            rg.D.svgel.addEventListener( 'click', function() {
                if( amode.theorion === 'proof' ) {
                    fmethods.executeCapturedState( '1-D' );
                }
            });
            rg.E.svgel.addEventListener( 'click', function() {
                if( amode.theorion === 'proof' ) {
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
        var pointsAreOn = amode.theorion === 'proof';
        ['B', 'C', 'D', 'E'].forEach( id => {
                let rgX = rg[ id ];
                rgX.svgel.setAttribute( 'r', pointsAreOn ? '6' : '4' );
                //rgX.svgel$.addClass( 'tofill' ).addClass( 'tostroke' );
                //rgX.svgel.style[ 'stroke-width' ] = pointsAreOn ? '5' : '2';
                rgX.svgel.style[ 'fill' ] = pointsAreOn ?
                    'white' : sDomF.getFixedColor( 'path' );
                rg[ id + 'title' ].textContent = pointsAreOn ? 'show next move' : '';
        });
        //----------------------------------------------------        
        // \\// shows next move of the proof
        //----------------------------------------------------        
        
        ssF.mediaModelInitialized = true;
    }

}) ();

