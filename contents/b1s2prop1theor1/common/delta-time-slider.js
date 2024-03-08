( function() {
    var {
        sn, $$, sv, hafff,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
    });
    stdMod.creates_delta_time_slider = creates_delta_time_slider;
    return;









    //----------------------------------------
    // //\\ makes up time slider
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function creates_delta_time_slider()
    {
        var pos2pointy    = ssF.pos2pointy;
        var pointies2line = ssF.pointies2line;

        //=========================================
        // //\\ slider api pars
        //=========================================
        var sliderId    = 'dt';
        var tpId        = sliderId;
        var tptpId      = 'tp-' + tpId;
        var slCaption   = '∆t';

        ///will be overridden with tp-color if any:
        var COLOR = sDomF.getFixedColor( sliderId );
        var customSliderShift = -20; //picture units
        //=========================================
        // \\// slider api pars
        //=========================================

        //:spawns api pars
        var api_rgid    = 'rgslid_'   + sliderId;
        var api         = toreg( api_rgid )();
        var rgX         = api;
        var start_rgid  = 'railsStart_' + sliderId;
        var end_rgid    = 'railsEnd_'   + sliderId;
        var rails_rgid  = 'slider_'     + sliderId;


        //--------------------------------------------------------------------------
        // //\\ in model units and reference system
        //--------------------------------------------------------------------------
        var startX            = ( -sconf.originX_onPicture +
                                   sconf.innerMediaWidth *
                                   sconf.SLIDERS_OFFSET_X
                                ) * sconf.inn2mod_scale;
        var endX              = startX + sconf.innerMediaWidth *
                                         sconf.SLIDERS_LENGTH_X *
                                         sconf.inn2mod_scale;
        var startY            = sconf.originY_onPicture
                                        - sconf.innerMediaHeight
                                        + sconf.SLIDERS_LEGEND_HEIGHT
                                        + sconf.SLIDERS_OFFSET_Y
                                        + customSliderShift
                                ;
        var startY            =  startY * sconf.inn2mod_scale;
        //--------------------------------------------------------------------------
        // \\// in model units and reference system
        //--------------------------------------------------------------------------


        //:spawns api pars
        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];
        toreg( start_rgid )( 'pos', startPos );
        toreg( end_rgid )( 'pos', endPos );

        //--------------------------------------------------------
        // //\\ slider api
        //--------------------------------------------------------
        api.pos         = [startX, startY];
        api.startX      = startX;
        api.endX        = endX;
        api.railsLength = endX - startX; //in model units
        api.pcolor      = COLOR;
        api.slCaption   = slCaption;

        //-------------------------------------
        // //\\ adds helpers
        //-------------------------------------
        var railsStart = pos2pointy(
            start_rgid,
            { fill : COLOR, tpclass:tpId, cssClass : 'tofill tostroke', }
        );
        var railsEnd = pos2pointy(
            end_rgid,
            { fill : COLOR, tpclass:tpId, cssClass : 'tofill tostroke', }
        );
        ///draws rails
        ///if tpclass does exist, it apparently overrides stroke and
        ///some other styles,
        var rails = pointies2line(
             rails_rgid,
             [ railsStart, railsEnd ],
             { stroke           : COLOR,
               'stroke-width'   : 3,
               tpclass          : tpId,
               cssClass         : 'tofill tostroke',
             }
        );
        $$.$( rails.svgel ).cls( tptpId );
        //-------------------------------------
        // \\// adds helpers
        //-------------------------------------


        //------------------------------------------------
        // //\\ makes svg representation of api
        //      as a point, adds medpos to api
        //-------------------------------------
        pos2pointy(
            api_rgid,
            {
                cssClass : 'tostroke',
                stroke : COLOR,
                'stroke-width' : 3,
                fill : 'white',
                r : 5,
                tpclass : tpId,
            }
        //.overrides tp - machinery suppressed opacity,
        //.the handler must be solid,
        ).svgel.style[ 'fill-opacity' ] = '1';
        //-------------------------------------
        // \\// makes svg representation of api
        //--------------------------------------------------------

        /// adds text to api-GUI
        api.text_svg = sv.printText({
            parent          : stdMod.mmedia,
            text            : sliderId,
           'stroke-width'   : 1,
            style           :
            {
                'font-family'   : 'helvetica, san-serif',
                'font-size'     : sconf.GENERIC_SLIDERS_FONT_SIZE +'px',
                'stroke-width'  : 1,
                 color          : COLOR,
                fill            : 'transparent',
            },
            stroke  : COLOR,
            fill    : COLOR,
        });
        //todmm ... patch ... adds tp dimming machinery
        $$.$( api.text_svg ).addClass( tptpId );

        api.move_2_updates      = move_2_updates;
        api.processDownEvent    = processDownEvent;
        api.modPos_2_GUI        = ssF.modPos_2_GUI;
        api.stdMod              = stdMod;
        api.val                 = sconf.initialTimieStep;

        api.upd_sliderGUI8legend__8__unmask = upd_sliderGUI8legend__8__unmask;
        //-------------------------------------
        // \\// slider api
        //--------------------------------------------------------

        ///this sub is defined in full-app/lib/custom-slider.js module
        ssF.rgXSlider__2__dragwrap_gen_list({
            rgX,
            orientation         : 'axis-x',
            stdMod,
        });
        return;












        ///this function does "minor" update: it does not
        ///recalculate the evolution, but 
        ///  sets slider position and
        ///  shows evolution corresponding to time;
        function upd_sliderGUI8legend__8__unmask()
        {
            var rawDeltaT = api.val;
            ccc( 'upd in sl: dt=' + api.val );
            //-----------------------------------------------------
            // //\\ corrects pos and updates slider's GUI
            //-----------------------------------------------------
            //interpolates slider GUI position
            var sliderXpos =
                 railsStart.pos[0] + 
                 rawDeltaT / sconf.initialTimieStep * api.railsLength
                 ;
            api.pos = [ sliderXpos, railsStart.pos[1] ];
            //at curr. ver., does what it says: pos to GUI
            ///updates media position of svg-shape from
            ///model position of this shape;
            ///also updates text-caption if any of this shape;
            api.modPos_2_GUI();
            //-----------------------------------------------------
            // \\// corrects pos and updates slider's GUI
            //-----------------------------------------------------

            //at the end of job, runs application-provided callback
            //stdMod.unmasksVisib();
            //stdMod.upcreate_mainLegend();
            if( ssF.mediaModelInitialized ) {
                stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
            }
        };
    }
    //----------------------------------------
    // \\// makes up time slider
    //----------------------------------------

    ///must be in contex of pointWrap ( like this = rg.B )
    function processDownEvent( arg )
    {
        this.achieved.achieved = this.val;
    }

    ///move_2_val8gui8cb
    ///todm: this sub should be automatically throttled
    function move_2_updates( move_in_model )
    {
        var api = this;
        sDomF.detected_user_interaction_effect();

        //this fixes missed model-decoration-points after user made an action,
        //not sure why media-model.js::media_upcreate does not fix it?,
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        //sets preliminary time:
        var newdt = api.achieved.achieved +
                            move_in_model[ 0 ] /
                            api.railsLength *
                            sconf.initialTimieStep;
        newdt = Math.max( 0.01, Math.min( sconf.initialTimieStep, newdt ) );
        api.val = newdt;
        rg.spatialStepsMax.pos = Math.ceil( 7/newdt );
        ccc( 'slider dt updater: rg.spatialStepsMax.pos' );
        var posB = rg.path.pos[0];
        var absAB = sconf.vabs0 * newdt;
        var absB = Math.sqrt( posB[0]*posB[0] + posB[1]*posB[1] );
        var scale = absAB / absB;
        posB[0] = posB[0]*scale;
        posB[1] = posB[1]*scale;
        hafff( rg.slider_sltime, 'upd_sliderGUI8legend__8__unmask' );

        ssF.solvesTrajectoryMath();

        //sets the rest:
        api.upd_sliderGUI8legend__8__unmask();
    }

}) ();

