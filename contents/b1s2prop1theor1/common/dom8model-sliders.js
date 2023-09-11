( function() {
    var {
        sn, $$, sv,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            //creates_sliderDomModel__4__time,
        },
    });
    stdMod.creates_sliderDomModel__4__time = creates_sliderDomModel__4__time; 
    return;









    //----------------------------------------
    // //\\ makes up time slider
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function creates_sliderDomModel__4__time()
    {
        var pos2pointy    = ssF.pos2pointy;
        var pointies2line = ssF.pointies2line;

        //=========================================
        // //\\ slider api pars
        //=========================================
        var slCaption   = 'time';
        var sliderId    = 'time';

        /// adds input pars to api
        /// store-name for value delivered from sliding ===
        /// model value which is set by slider,
        var apiValueName = 't';

        var captionPrefix = 'm = ';
        var COLOR         = sDomF.getFixedColor( sliderId );
        var customSliderShift = 0; //picture units
        //=========================================
        // \\// slider api pars
        //=========================================

        //:spawns api pars
        var api_rgid    = 'slider_sl'   + sliderId;
        var start_rgid  = 'railsStart_' + sliderId;
        var end_rgid    = 'railsEnd_'   + sliderId;
        var rails_rgid  = 'slider_'     + sliderId;
        var tpId        = sliderId;
        var tptpId      = 'tp-' + tpId;


        //----------------------------------------------------------------------------
        // //\\ in model units and reference system
        //----------------------------------------------------------------------------
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
        //----------------------------------------------------------------------------
        // \\// in model units and reference system
        //----------------------------------------------------------------------------


        //:spawns api pars
        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];

        //--------------------------------------------------------
        // //\\ slider api
        //--------------------------------------------------------
        var api = toreg( api_rgid )();
        api.pos         = [startX, startY];
        api.startX      = startX;
        api.endX        = endX;
        api.railsLength = endX - startX; //in model units
        api.pcolor      = COLOR;
        api.slCaption   = slCaption;

        //-------------------------------------
        // //\\ adds helpers
        //-------------------------------------
        toreg( start_rgid )( 'pos', startPos );
        toreg( end_rgid )( 'pos', endPos );
        var railsStart = pos2pointy(
            start_rgid,
            { fill : COLOR, tpclass:tpId, cssClass : 'tofill tostroke', }
        );
        var railsEnd = pos2pointy(
            end_rgid,
            { fill : COLOR, tpclass:tpId, cssClass : 'tofill tostroke', }
        );
        ///draws rails
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
        var wwrack = pos2pointy(
            api_rgid,
            {
                cssClass : 'tostroke',
                stroke : COLOR,
                'stroke-width' : 3,
                fill : 'white',
                r : 5,
                tpclass : tpId,
            }
        );
        //.overrides tp - machinery suppressed opacity,
        //.the handler must be solid,
        wwrack.svgel.style[ 'fill-opacity' ] = '1';
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
        $$.$( api.text_svg ).addClass( 'tp-time' );

        api.apiValueName        = apiValueName;
        api.move_2_updates      = move_2_updates;
        api.processDownEvent    = processDownEvent;
        api.modPos_2_GUI        = ssF.modPos_2_GUI;
        api.stdMod              = stdMod;
        api.upd_sliderGUI8legend__8__unmask = upd_sliderGUI8legend__8__unmask;
        //-------------------------------------
        // \\// slider api
        //--------------------------------------------------------

        var rgX = api; //rg.slider_sltime;
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
            var rawTime = api[ apiValueName ]; //===rg.slider_sltime.t;

            //-----------------------------------------------------
            // //\\ corrects pos and updates slider's GUI
            //-----------------------------------------------------
            //interpolates slider GUI position
            var sliderXpos =
                 railsStart.pos[0] + 
                 rawTime / rg.spatialStepsMax.pos * api.railsLength
                 ;
            api.pos = [ sliderXpos, railsStart.pos[1] ];

            //at curr. ver., does what it says: pos to GUI
            api.modPos_2_GUI();
            //-----------------------------------------------------
            // \\// corrects pos and updates slider's GUI
            //-----------------------------------------------------

            //does what it says, no extra calculations
            stdMod.sliderTime_2_time8stepIndices();

            //apparently, only decoration like time labels
            stdMod.time_2_displayTimeStrings();
            //perpendicular and point "T"
            //they depend on slider-time, this is why their math model pos
            //updates here and not in model_upcreate()
            stdMod.doesPosition_PTandTheirLine();

            //at the end of job, runs application-provided callback
            stdMod.unmasksVisib();
            stdMod.upcreate_mainLegend();
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
        this.achieved.achieved = this.t;
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
        var newTime = api.achieved.achieved +
                            move_in_model[ 0 ] /
                            api.railsLength *
                            rg.spatialStepsMax.pos;
        //sets value:
        var rawTime = stdMod.protects_stepIx_ranges( newTime );
        api[ api.apiValueName ] = rawTime;
        //sets the rest:
        api.upd_sliderGUI8legend__8__unmask();
    }

}) ();

