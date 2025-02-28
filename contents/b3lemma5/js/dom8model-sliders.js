( function() {
    var {
        $$, nssvg,
        fconf, sconf, ssF, ssD,
        stdMod, rg, topos,
    } = window.b$l.apptree({
        setModule
    });
    var pos2pointy;
    var pointies2line;
    return;








    function setModule()
    {
        ssF.createSliderPlaceholder_m = createSliderPlaceholder_m;
        pos2pointy      = ssF.pos2pointy;
        pointies2line   = ssF.pointies2line;
    }





    //----------------------------------------
    // //\\ param m slider,
    //      apparenlty only along straight line,
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function createSliderPlaceholder_m()
    {
        //this sub is to be generalized:
        //----------------------------------------------------------------------------
        // //\\ generalize: variable parameters
        //----------------------------------------------------------------------------
        var sliderId          = 'm';
        var captionPrefix     = 'm = ';

        //m is a degree of result-polynomial, it is not a number of
        //  experimental points, m=0 is not a good count for exp. points:
        var COLOR             = ssD.approxColor; //experColor;
        //var COLOR             = ssD.experColor;

        var max_m             = rg.n.value;
        var min_m             = 1;
        var customSliderShift = 0; //picture units

        //----------------------------------------------------------------------------
        // //\\ in model units and reference system
        //----------------------------------------------------------------------------
        var startX            = ( -sconf.modorInPicX +
                                 sconf.innerMediaWidth * sconf.SLIDERS_OFFSET_X
                                ) *
                                sconf.inn2mod_scale;
        var endX              = startX + sconf.innerMediaWidth * sconf.inn2mod_scale *
                                         sconf.SLIDERS_LENGTH_X;
        var startY            = sconf.originY_onPicture
                                      - sconf.innerMediaHeight
                                      + sconf.SLIDERS_LEGEND_HEIGHT
                                      + customSliderShift
                                      + sconf.SLIDERS_OFFSET_Y
                                ;
        var startY            =  startY * sconf.inn2mod_scale;
        //----------------------------------------------------------------------------
        // \\// in model units and reference system
        // \\// generalize: variable parameters
        //----------------------------------------------------------------------------


        //spawns:
        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];
        var railsLength       = endX - startX;

        // //\\ slider object
        //sets registry
        topos( 'sliderStart_' + sliderId, startPos );
        topos( 'sliderEnd_' + sliderId, endPos );

        var sliderStart = pos2pointy( 'sliderStart_' + sliderId,
            { fill : '#9999dd', tpclass:sliderId, cssClass : 'tofill tostroke', } );
        var sliderEnd = pos2pointy( 'sliderEnd_' + sliderId,
            { fill : '#9999dd', tpclass:sliderId, cssClass : 'tofill tostroke', } );
        ///draws rails
        var slider = pointies2line(
             'slider-' + sliderId,
             [sliderStart, sliderEnd],
             {stroke:COLOR, 'stroke-width':3, tpclass:sliderId,
                                cssClass : 'tofill tostroke', }
        );
        $$.$(slider.svgel).cls( 'tp-' + sliderId );
        // \\// slider object



        var range_m = max_m - min_m;
        var m = rg.m;
        m.model8media_upcreate      = stdMod.model8media_upcreate;
        m.pos2value                 = pos2value;
        stdMod.sliders_value2pos    = sliders_value2pos;
        sliders_value2pos();
        return;







        ///for slider
        function pos2value( newPos )
        {
            var newValue = ( max_m - min_m ) * ( newPos[0] - startX ) /
                             railsLength + min_m;
            if( newValue < min_m || newValue > max_m ) return;

            m.value = Math.round( newValue );
            m.value = Math.max(  min_m, Math.min( max_m, m.value ) );

            m.pos[0] = newPos[0];
            m.pos[1] = newPos[1];
            updateSliderHandlePos();
            m.model8media_upcreate();
            return true;
        }

        function updateSliderHandlePos()
        {
            m.medpos = ssF.mod2inn_original( m.pos, stdMod );
            nssvg.u({
                svgel   : m.svgel,
                parent  : stdMod.mmedia,
                cx : m.medpos[0],
                cy : m.medpos[1],
            });
            printText();
            m.text_svg.setAttributeNS( null, 'x', m.medpos[0]-8 );
            var shift =
                m.medpos[1] +
                sconf.GENERIC_SLIDER_HEIGHT_Y * 0.8
                ;
            m.text_svg.setAttributeNS( null, 'y', shift );
        }

        function sliders_value2pos()
        {
            var handleXpos  = ( m.value - min_m ) /
                              range_m * railsLength + startX;
            m.pos           = [ handleXpos, startY ];
            m.startX        = startX;
            m.endX          = endX;
            m.railsLength   = railsLength;

            var m_pt = pos2pointy(
                sliderId,
                {
                    cssClass : 'tostroke',
                    stroke : COLOR,
                    'stroke-width' : 3,
                    fill : 'white',
                    r : 8,
                    tpclass : sliderId,
                }
            );
            updateSliderHandlePos();
        }

        function printText()
        {
            m.text_svg = nssvg.printText({
                parent  : stdMod.mmedia,
                text    : captionPrefix + (m.value-1),
                svgel   : m.text_svg,
               'stroke-width' : 1,
                style   : { 'font-size' : sconf.GENERIC_SLIDERS_FONT_SIZE +'px',
                            'font-family' : 'var(--default-font)',
                             color : COLOR,
                },
                stroke  : COLOR,
                fill    : COLOR,
                //alternative?:
                //x : m.medpos[0]-8,
                //y : m.medpos[1]+37,
            });
        }
    }
    //----------------------------------------
    // \\// param m slider
    //----------------------------------------


}) ();

