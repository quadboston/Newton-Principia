( function() {
    var {
        sn, $$, sv, globalCss, haz,
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
        var slCaption0   = 'time';
        var sliderId    = 'time';

        /// adds input pars to api
        /// store-name for value delivered from sliding ===
        /// model value which is set by slider,
        var apiValueName = 'curtime';

        var captionPrefix = 'm = ';
        ///will be overridden with tp-color if any:
        var COLOR         = sDomF.getFixedColor( sliderId );
        var customSliderShift = 0; //picture units
        //=========================================
        // \\// slider api pars
        //=========================================

        //:spawns api pars
        var api_rgid    = 'slider_sl'   + sliderId;

        //leaving this as toolsSliders breaks sliders, needs
        //split from generic slider framework,
        var toolsSliders_    = sn( 'toolsSliders_',stdMod, [] );
        var sliderIx        = toolsSliders_.length;
        toolsSliders_.push( api_rgid );

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
                                        + sconf.SLIDERS_OFFSET_Y
                                        - ( sliderIx
                                            //+ customSlidersAbove
                                          ) * sconf.GENERIC_SLIDER_HEIGHT_Y
                                        + sconf.SLIDERS_LEGEND_HEIGHT
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
        api.slCaption   = slCaption0;

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
            },
        });
        $$.$( api.text_svg ).addClass( 'tp-time' );
        globalCss.update( `
                .bsl-simscene svg text.${tptpId} {
                    stroke          : ${COLOR};
                    fill            : ${COLOR};
                }
            `,
            'svg-text-special'
        );



        api.apiValueName        = apiValueName;
        api.move_2_updates      = move_2_updates;
        api.processDownEvent    = processDownEvent;
        api.modPos_2_GUI        = ssF.modPos_2_GUI;
        api.stdMod              = stdMod;
        api.upates_timeSlider8unmasksSvgDom = upates_timeSlider8unmasksSvgDom;
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
        function upates_timeSlider8unmasksSvgDom()
        {
            var rawTime = api[ apiValueName ]; //===rg.slider_sltime.curtime;

            //interpolates slider GUI position
            var sliderXpos =
                 railsStart.pos[0] + 
                 rawTime / sconf.timeRange * api.railsLength;
            api.pos = [ sliderXpos, railsStart.pos[1] ];

            //does what it says, no extra calculations
            slTime_2_stepIndice8tCaption();

            api.slCaption = slCaption0 + ' = ' +
                            //discrete time:
                            rg.displayTime.value;                                
                            //continuous time: api[ apiValueName ].toFixed(2);
            //at curr. ver.,
            //    does pos to GUI, does slCaption
            api.modPos_2_GUI();

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
        this.achieved.achieved = this.curtime;
    }

    ///move_2_val8gui8cb
    ///todm: this sub should be automatically throttled
    function move_2_updates( move_in_model )
    {
        var api = this;
        amode.userControl = 'diagram';
        sDomF.detected_user_interaction_effect();

        //this fixes missed model-decoration-points after user made an action,
        //not sure why media-model.js::media_upcreate does not fix it?,
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        //sets preliminary time:
        var newTime = api.achieved.achieved +
                            move_in_model[ 0 ] /
                            api.railsLength *
                            sconf.timeRange;
        //sets value:
        stdMod.protects_curTime_ranges( newTime );

        stdMod.media_upcreate();
        //we don't need this, this slider does not affect
        //path calculation
        //stdMod.model_upcreate();
        //======================================================
    }
    
   
    function slTime_2_stepIndice8tCaption()
    {
        var sp8ep   = haz( rg, 'slider_sltime' );
        var ctime    = rg.slider_sltime.curtime;
        //----------------------------------------
        // //\\ establishes model step and substep
        //      stepIx4   = 0,1,2,3,  4,5,6,7,  8,9,10,11, ... 
        //      substepIx = 0,1,2,3,  0,1,2,3,  0,1, 2, 3, ...
        //      stepIx    = 0,0,0,0,  1,1,1,1,  2,2, 2, 2, ... 
        //      point     = A,A,A,A,  -,-,-,B,  -,-, C, C, ...
        //----------------------------------------
        //virtual thing, just stretches time to better subdivide stepIx
        var stepIx4 = Math.floor( ctime * 4 / rg.rgslid_dt.val );
        rg.stretchedFourTimes_stIx = stepIx4;
        //substep in its original meaning: one of the four substeps indices
        rg.substepIx    = stepIx4%4;
        //steps in its original meaning
        var stepIx      = ( stepIx4 - rg.substepIx ) / 4;
        stepIx          = Math.min( stepIx, rg.spatialSteps - 1 );
        toreg( 'stepIx' )( 'value', stepIx );
        /*
            c cc( 'ctime=' + ctime +
             ' ESTABLISH: stepIx4=' + stepIx4 +
             ' substepIx=' + rg.substepIx +
             ' stepIx=' + stepIx
            );
        */
        //----------------------------------------
        // \\// establishes model step and substep
        //----------------------------------------
        rg.thoughtStep.value = (rg.substepIx+1) + '';
        //sets granular time display increment during last proof step
        let nexStepDisplay = ( rg.substepIx === 3 ? 1 : 0 ) + rg.stepIx.value;
        rg.displayTime.value = ( nexStepDisplay * rg.rgslid_dt.val ).toFixed(2);
        rg.displayPathStep = { value:nexStepDisplay };
    }

}) ();

