( function() {
    var {
        ns, sn, $$, eachprop, has, haz, hafff, fmethods,
        toreg, sconf, ssF, ssD, sDomF, rg, exegs,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate,
        },
    });
    var initialization_is_done = false;
    //enables steps BC, CD, ... by clicks on B, C, ...
    var POINTS_BCDE_ARE_ACTIVE = false;
    
    var lemmaP2coroll =
        ('Caracc Paracc Varacc CCaracc SCaracc BCaracc BParacc' +
         ' CParacc VVaracc BVaracc CaraccParacc SBCaracc cCaracc').split(' ');
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
        if( sconf.TIMER_AND_LOGIC_STEPS_COINSIDE ||
            haz( amode, 'userControl') === 'text' ) {
            //The following code is run when the user clicks text in the text area.  For example on the proof tab in the 2nd paragraph where
            //decStart = 5 corresponds to clicking “the second part of the time”, and decStart = 6 to clicking “when the body comes to B”.
            let last = 5
            rg.c.decStart = last;
            rg.Bc.decStart = last;
            rg.SBc.decStart = last;
            //There was a bug where hovering the mouse over “cS”, only made that line visible starting with “when the body comes to B” rather
            //than “the second part of the time”.  Therefore decStart was switched to the following from last+1 (6).
            rg.Sc.decStart = last;

            rg.C.decStart = last+1;
            rg.V.decStart = last+1;
            rg.BC.decStart = last+1; //rg.C.decStart;
            rg.Cc.decStart = last+1; //rg.C.decStart;
        } else {
            last = 7
            rg.C.decStart = last;
            rg.V.decStart = last;
            rg.c.decStart = last;
            rg.Cc.decStart = last;
            rg.Bc.decStart = last;
            rg.BC.decStart = last;
            rg.SC.decStart = last;
            rg.Sc.decStart = last;
            rg.SBc.decStart = last;
            last += 4
            rg.D.decStart = last;
            rg.d.decStart = last;
            rg.Dd.decStart = last;
            rg.Cd.decStart = last;
            rg.CD.decStart = last;
            rg.SD.decStart = last;
            rg.Sd.decStart = last;
            rg.SCd.decStart = last;
            rg.SABCD.decStart = last;
            last += 4
            rg.E.decStart = last;
            rg.e.decStart = last;
            rg.Ee.decStart = last;
            rg.De.decStart = last;
            rg.DE.decStart = last;
            rg.SE.decStart = last;
            rg.Se.decStart = last;
            rg.SDe.decStart = last;
            last += 4
            rg.F.decStart = last;
            rg.Z.decStart = last;
            rg.W.decStart = last;
            rg.EW.decStart = last;
            rg.g.decStart = last;
            rg.Eg.decStart = last;
            rg.Fg.decStart = last;
            rg.DF.decStart = last;
            rg.f.decStart = last;
            rg.Ff.decStart = last;
            rg.Ef.decStart = last;
            rg.EF.decStart = last;
            rg.SF.decStart = last;
            rg.Sf.decStart = last;
            rg.SEf.decStart = last;
            rg.SABCDEF.decStart = last;
        }

        //Update decEnd for the following decorations, to ensure they are hidden once the time slider is advanced beyond point F.
        [
            rg.c, rg.Cc, rg.Bc, rg.Sc, rg.SBc,
            rg.d, rg.Dd, rg.Cd, rg.SD, rg.Sd, rg.SCd, rg.SABCD, 
            rg.e, rg.Ee, rg.De, rg.SE, rg.Se, rg.SDe,
            rg.f, rg.Ff, rg.Ef, rg.SF, rg.Sf, rg.SEf, rg.SABCDEF,
        ].forEach( pn => {
            pn.decEnd = rg.f.decStart+3;
        });


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
            amode.textSection !== 'corollary'
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
        pathDelays2forceDraggers();

        // //\\ logical steps are requested to be hidden
        let legendTrLogicalStep = document.querySelector( '.tr-logical-step' );
        ///tabke may not yet exist, but it's possible next iterations will make it
        if( legendTrLogicalStep ) {
            legendTrLogicalStep.style.display =
            amode.aspect === 'model' ? "table-row" : 'none';
        }
        // \\// logical steps are requested to be hidden

        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        if( !ssF.mediaModelInitialized ) {
            ns.haff( stdMod, 'create_digital_legend' );
        }

        //:updates subessay menu
        var exAspect = exegs[ amode.textSection ][ amode.aspect ];
        var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
        ////reveals subessay in menu and in text
        sDomF.addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg })

        //todm ... generalize in one spot
        ssF.toogle_detectablilitySliderPoints4Tools();

        ///why apparently duplicate tr 2 shapes?
        ///because this thing does historical job, it updates core svg shapes
        ///along the path; but while program progressed, new decorations
        ///came up which need their own work
        stdMod.allPathRacks_2_unseenSVGs();

        ssF.v2GUI();
        stdMod.paints_draggableDecPoints8Line(); //changes svg

        //these are the new generation decorational svg objects
        //does not repeat creation ...A.svgel, ...
        //they may corrupt svg-zorder-for-dragging-handle-points
        //if used non-properly, f.e. create and dress svg first,
        stdMod.dec2svg();

        
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
                    if( amode.textSection === 'proof' ) {
                        fmethods.executeCapturedState( '1-4' );
                    }
                });
                rg.C.svgel.addEventListener( 'click', function() {
                    if( amode.textSection === 'proof' ) {
                        fmethods.executeCapturedState( '1-C' );
                    }
                });
                rg.D.svgel.addEventListener( 'click', function() {
                    if( amode.textSection === 'proof' ) {
                        fmethods.executeCapturedState( '1-D' );
                    }
                });
                rg.E.svgel.addEventListener( 'click', function() {
                    if( amode.textSection === 'proof' ) {
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
                          amode.textSection === 'proof';
        ['B', 'C', 'D', 'E'].forEach( id => {
                let rgX = rg[ id ];
                rgX.svgel.setAttribute( 'r', pointsAreOn ? '6' : '4' );
                rgX.svgel.style[ 'fill' ] = pointsAreOn ?
                    '#cccccc' : sDomF.getFixedColor( 'path' );
                if( POINTS_BCDE_ARE_ACTIVE ) {
                    rg[ id + 'title' ].textContent =
                        pointsAreOn ? 'show next move' : '';
                }
        });
        //----------------------------------------------------        
        // \\// shows next move of the proof
        //----------------------------------------------------        
        
        rg['main-legend'].tb.corollary.style.display =
            ( amode.textSection === 'corollary' && amode.subessay === 'cor-1' ) ?
            'table' : 'none';

        ssF.mediaModelInitialized = true;
    }

    
    function pathDelays2forceDraggers()
    {
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
    
    
}) ();

