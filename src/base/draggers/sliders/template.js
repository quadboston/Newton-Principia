( function() {
    var {
        sn,
        $$,
        has,
        haz,
        sv,
        sconf,
        ssF,
        rg,
        rgtools,
        stdMod,
    } = window.b$l.apptree({
        modName : 'mediaModel_create',
        setModule,
        //ssFExportList : { scaleValue2app },
    });

    var pos2pointy;
    var pointies2line;
    return;








    function setModule()
    {
        stdMod.modPos_2_GUI         = modPos_2_GUI;
        stdMod.toogle_detectablilitySliderPoints4Tools  =
                toogle_detectablilitySliderPoints4Tools;
        ssF.sliderTemplate = sliderTemplate;
        pos2pointy      = ssF.pos2pointy;
        pointies2line   = ssF.pointies2line;
    }

    function sliderTemplate({
        magnit,             //=pname of magnit_api = rg[ magnit ];
        sliderCaption,
        cssClsKey,
        max_magnit,
        min_magnit,
        SUGGESTED_COLOR,
        magnitude2app,
    }) {
        var range_magnit    = max_magnit - min_magnit;
        var toolsSliders    = sn( 'toolsSliders',stdMod, [] );
        var sliderIx        = toolsSliders.length;
        toolsSliders.push( magnit );

        //----------------------------------------------------------------------------
        // //\\ in model units and reference system
        //----------------------------------------------------------------------------
        customSlidersAbove    = haz( stdMod, 'railsCustomSlidersCount' ) || 0;
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

        //----------------------------------------------------------------------------
        // //\\ slider object
        //----------------------------------------------------------------------------
        //sets registry
        ssF.tp( 'sliderStart_' + magnit, startPos );
        ssF.tp( 'sliderEnd_' + magnit, endPos );

        var sliderStart_rg = pos2pointy( 'sliderStart_' + magnit,
            { fill : '#9999dd', tpclass:magnit, cssClass : 'tofill tostroke', } );
        var sliderEnd_rg = pos2pointy( 'sliderEnd_' + magnit,
            { fill : '#9999dd', tpclass:magnit, cssClass : 'tofill tostroke', } );
        ///draws rails
        var slider_rg = pointies2line(
             'slider-' + magnit,
             [sliderStart_rg, sliderEnd_rg],
             {
                stroke:SUGGESTED_COLOR,
                'stroke-width':3,
                tpclass:magnit,
                cssClass : 'tofill tostroke',
             }
        );
        $$.$( slider_rg.svgel ).cls( 'tp-' + magnit );
        //----------------------------------------------------------------------------
        // \\// slider object
        //----------------------------------------------------------------------------



        //----------------------------------------------------------------------------
        // //\\ slider api
        //----------------------------------------------------------------------------
        var magnit_api                  = rg[ magnit ];
        magnit_api.startX               = startX;
        magnit_api.endX                 = endX;
        magnit_api.railsLength          = railsLength;
        magnit_api.ignore_hideD8Dpoint_for_CSS = true;

        //-------------------------------------------------
        // //\\ pos to pointy
        //-------------------------------------------------
        value2validate2pos( magnit_api.value );
        pos2pointy(
            magnit,
            {
                cssClass        : 'tostroke' + cssClsKey,
                stroke          : SUGGESTED_COLOR,
                'stroke-width'  : 2,
                fill            : 'white',
                r               : 5,
                tpclass         : magnit,
            }
        );
        //-------------------------------------------------
        // \\// pos to pointy
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ text_svg
        //-------------------------------------------------
        magnit_api.text_svg = sv.printText({
            parent          : stdMod.mmedia,
            text            : sliderCaption,
            style           : { 'font-size' : sconf.GENERIC_SLIDERS_FONT_SIZE +'px' },
           'stroke-width'   : 1,
            stroke          : SUGGESTED_COLOR,
            fill            : SUGGESTED_COLOR,
        });
        $$.$(magnit_api.text_svg).cls( 'tp-' + magnit );
        //-------------------------------------------------
        // \\// text_svg
        // \\// slider api
        //----------------------------------------------------------------------------


        modPos_2_GUI( magnit_api );


        //----------------------------------------------------------------------------
        // //\\ slider methods api
        //----------------------------------------------------------------------------
        ///this function restricts itself to SUB_MODEL === 'common',
        ///not very obvious design
        magnit_api.model8media_upcreate = stdMod_model8media_upcreate;

        ///for slider
        magnit_api.pos2value__8__m8m_upcreate   = pos2value__8__m8m_upcreate;
        magnit_api.move_2_updates               = move_2_updates;
        magnit_api.value2validate2pos           = value2validate2pos;
        magnit_api.modPos_2_GUI                 = stdMod.modPos_2_GUI;
        //----------------------------------------------------------------------------
        // \\// slider methods api
        //----------------------------------------------------------------------------
        return;







        function stdMod_model8media_upcreate() {
            stdMod.model8media_upcreate();
        }

        function pos2value__8__m8m_upcreate( new_modelPos )
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


        function value2validate2pos( val )
        {
            if( val < min_magnit || val > max_magnit ) return;
            var handleXpos  = ( val - min_magnit ) /
                                range_magnit * railsLength + startX;
            magnit_api.pos  = [ handleXpos, startY ];
            return true; //true === validated
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
    }





    ///needs arg or "this"
    function modPos_2_GUI( api )
    {
        api = api || this;
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

        if( has( api, 'slCaption' ) ) {
            ///updates GUI caption
            //api.text_svg.textContent = slCaption + '=' + (value_current-2).toFixed(0);
            api.text_svg.textContent = api.slCaption;
        }
    };


    ///fixes slider pointer detectibility upon mode
    function toogle_detectablilitySliderPoints4Tools()
    {
        var toolsSliders = sn( 'toolsSliders',stdMod, [] );
        toolsSliders.forEach( slname => {
            var sl = rg[ slname ];
            sl.hideD8Dpoint = haz( rgtools, 'value' ) === 'on' ? false : true;
        })
    }


}) ();
