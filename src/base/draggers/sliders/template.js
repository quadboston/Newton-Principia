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
    var rg          = sn('registry',ssD);
    var rgtools     = sn('tools',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_create';
    srg_modules[ modName + '-' + mCount.count ] = setModule;



    var pos2pointy;
    var pointies2line;
    var stdMod;
    return;








    function setModule()
    {
        stdMod = sn(SUB_MODEL, studyMods);
        stdMod.modPos_2_GUI         = modPos_2_GUI;
        stdMod.toogle_detectablilitySliderPoints4Tools  = toogle_detectablilitySliderPoints4Tools;
        ssF.sliderTemplate = sliderTemplate;
        pos2pointy      = ssF.pos2pointy;
        pointies2line   = ssF.pointies2line;
    }

    function sliderTemplate({
        magnit,
        sliderCaption,
        cssClsKey,
        max_magnit,
        min_magnit,
        range_magnit,
        SUGGESTED_COLOR,
        magnitude2app,
    }) {
        var range_magnit      = max_magnit - min_magnit;

        var toolsSliders = ns.sn( 'toolsSliders',stdMod, [] );
        var sliderIx = toolsSliders.length;
        toolsSliders.push( magnit );

        //----------------------------------------------------------------------------
        // //\\ in model units and reference system
        //----------------------------------------------------------------------------
        customSlidersAbove    = ns.haz( stdMod, 'railsCustomSlidersCount' ) || 0;
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
                                            + customSlidersAbove
                                          ) * sconf.GENERIC_SLIDER_HEIGHT_Y
                                        + sconf.SLIDERS_LEGEND_HEIGHT
                                ;
        var startY            = startY * sconf.inn2mod_scale;
        var railsLength       = endX - startX;
        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];
        //----------------------------------------------------------------------------
        // \\// in model units and reference system
        //----------------------------------------------------------------------------

        // //\\ slider object
        //sets registry
        ssF.tp( 'sliderStart_' + magnit, startPos );
        ssF.tp( 'sliderEnd_' + magnit, endPos );

        var sliderStart = pos2pointy( 'sliderStart_' + magnit,
            { fill : '#9999dd', tpclass:magnit, cssClass : 'tofill tostroke', } );
        var sliderEnd = pos2pointy( 'sliderEnd_' + magnit,
            { fill : '#9999dd', tpclass:magnit, cssClass : 'tofill tostroke', } );
        ///draws rails
        var slider = pointies2line(
             'slider-' + magnit,
             [sliderStart, sliderEnd],
             {stroke:SUGGESTED_COLOR, 'stroke-width':3, tpclass:magnit,
                                cssClass : 'tofill tostroke', }
        );
        $$.$(slider.svgel).cls( 'tp-' + magnit );
        // \\// slider object

        var magnit_api = rg[ magnit ];
        var handleXpos  = ( magnit_api.value - min_magnit ) /
                            range_magnit * railsLength + startX;
        magnit_api.pos           = [ handleXpos, startY ];
        magnit_api.startX        = startX;
        magnit_api.endX          = endX;
        magnit_api.railsLength   = railsLength;
        magnit_api.ignore_hideD8Dpoint_for_CSS = true;
        pos2pointy(
            magnit,
            {
                cssClass : 'tostroke' + cssClsKey,
                stroke : SUGGESTED_COLOR,
                'stroke-width' : 2,
                fill : 'white',
                r : 5,
                tpclass : magnit,
            }
        );

        magnit_api.text_svg = sv.printText({
            parent : studyMods[ SUB_MODEL ].mmedia,
            text :sliderCaption,
            style : { 'font-size' : sconf.GENERIC_SLIDERS_FONT_SIZE +'px' },
           'stroke-width' : 1,
            stroke  : SUGGESTED_COLOR,
            fill  : SUGGESTED_COLOR,
        });
        $$.$(magnit_api.text_svg).cls( 'tp-' + magnit );

        ///this function restricts itself to SUB_MODEL === 'common',
        ///not very obvious design
        magnit_api.model8media_upcreate = function() {
            studyMods[ SUB_MODEL ].model8media_upcreate();
        }

        ///move_2_val8gui8cb
        function move_2_updates( achieved, move_in_model )
        {
            var new_modelPos = [
                    achieved[0] + move_in_model[0],
                    achieved[1] + move_in_model[1],
                ];
            //sets the rest:
            magnit_api.pos2value__8__m8m_upcreate( new_modelPos );
        }
        ///for slider
        magnit_api.pos2value__8__m8m_upcreate = function( new_modelPos )
        {
            var newValue = ( max_magnit - min_magnit ) * ( new_modelPos[0] - startX ) /
                             railsLength + min_magnit;
            if( newValue < min_magnit || newValue > max_magnit ) return;

            magnitude2app( magnit_api, newValue );

            magnit_api.pos[0] = new_modelPos[0];
            //no vertical movement from rails: magnit_api.pos[1] = new_modelPos[1];
            magnit_api.modPos_2_GUI();
            magnit_api.model8media_upcreate();
            return true;
        }

        magnit_api.move_2_updates = move_2_updates;
        magnit_api.modPos_2_GUI = stdMod.modPos_2_GUI;
        magnit_api.modPos_2_GUI();
        return;


    }

    function modPos_2_GUI()
    {
        var api = this;
        api.medpos = ssF.mod2inn_original( api.pos );
        sv.u({
            svgel   : api.svgel,
            parent  : stdMod.mmedia,
            cx : api.medpos[0],
            cy : api.medpos[1],
        });
        api.text_svg.setAttributeNS( null, 'x', api.medpos[0]-8 );
        api.text_svg.setAttributeNS( null, 'y',
             api.medpos[1] + 
             sconf.GENERIC_SLIDER_HEIGHT_Y * 0.8
        );

        if( ns.h( api, 'slCaption' ) ) {
            ///updates GUI caption
            //api.text_svg.textContent = slCaption + '=' + (value_current-2).toFixed(0);
            api.text_svg.textContent = api.slCaption;
        }
    };


    ///fixes slider pointer detectibility upon mode
    function toogle_detectablilitySliderPoints4Tools()
    {
        var toolsSliders = ns.sn( 'toolsSliders',stdMod, [] );
        toolsSliders.forEach( slname => {
            var sl = rg[ slname ];
            sl.hideD8Dpoint = ns.haz( rgtools, 'value' ) === 'on' ? false : true;
        })
    }


}) ();

