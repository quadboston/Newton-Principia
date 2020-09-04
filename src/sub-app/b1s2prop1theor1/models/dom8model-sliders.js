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
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var pos2pointy;
    var pointies2line;

    var stdMod;
    return;








    function setModule()
    {
        stdMod = sn(SUB_MODEL, studyMods);
        stdMod.creates_sliderDomModel__4__time = creates_sliderDomModel__4__time;

        pos2pointy      = ssF.pos2pointy;
        pointies2line   = ssF.pointies2line;
    }

    //----------------------------------------
    // //\\ makes up time slider
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function creates_sliderDomModel__4__time()
    {
        //=========================================
        // //\\ slider api pars
        //=========================================
        var slCaption   = 'time';
        var sliderId    = 'time';

        /// adds input pars to api
        var apiValueName = 't';
        var apiCallback  = 'drawEvolution';

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
        var api = ssF.toreg( api_rgid )( 'pos', [startPos, endPos] )();
        api.startX      = startX;
        api.endX        = endX;
        api.railsLength = endX - startX; //in model units
        api.pcolor      = COLOR;
        api.slCaption   = slCaption;

        //-------------------------------------
        // //\\ adds helpers
        //-------------------------------------
        tp( start_rgid, startPos );
        tp( end_rgid, endPos );
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
             { stroke:COLOR, 'stroke-width':3,
               tpclass:tpId,
               cssClass : 'tofill tostroke',
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

        api.apiValueName = apiValueName;

        api.move_2_updates      = move_2_updates;
        api.processDownEvent    = processDownEvent;
        api.modPos_2_GUI        = stdMod.modPos_2_GUI;
        api.val_2_pos8GUI8cb    = val_2_pos8GUI8cb;
        //-------------------------------------
        // \\// slider api
        //--------------------------------------------------------

        var rgX = api; //rg.slider_sltime;
        stdMod.addsCustomSlider({
            rgX,
            orientation         : 'axis-x',
        });

        //initiates slider from initial value
        api.val_2_pos8GUI8cb();
        return;












        ///this function does "minor" update: it does not
        ///recalculate the evolution, but 
        ///  sets slider position and
        ///  shows evolution corresponding to time;
        function val_2_pos8GUI8cb()
        {
            //:takes input to api from app:
            var value_max       = rg.spatialStepsMax.pos;
            var value_current   = api[ apiValueName ];

            //.interpolates slider GUI position
            var sliderXpos =
                 railsStart.pos[0] + 
                 value_current / value_max * api.railsLength
                 ;
            api.pos = [ sliderXpos, railsStart.pos[1] ];
            api.modPos_2_GUI();
            //at the end of job, runs application-provided callback
            //recall: apiCallback  = 'drawEvolution';
            stdMod[ apiCallback ]( value_current );
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
    function move_2_updates( move_in_model )
    {
        var api = this;
        sDomF.detected_user_interaction_effect();

        //sets preliminary time:
        var newTime = api.achieved.achieved +
                move_in_model[ 0 ] /
                    api.railsLength *
                    rg.spatialStepsMax.pos;
        //sets value:
        var val = Math.max(
                     Math.min( newTime, rg.spatialStepsMax.pos ),
                     1.75000001 //1.75 fits slider 4-step scenario
        );

        //todm ... doAcceptValue later ...
        //         aka acceptPos : B2params, ...
        //if( api[ api.apiValueName ] === val ) return;

        api[ api.apiValueName ] = val;

        //sets the rest:
        api.val_2_pos8GUI8cb();
    }

}) ();

