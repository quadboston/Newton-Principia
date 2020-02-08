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

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_create';
    srg_modules[ modName + '-' + mCount.count ] = setModule;



    var pos2pointy;
    var pointies2line;
    return;








    function setModule()
    {
        ssF.createSliderPlaceholder_m = createSliderPlaceholder_m;
        pos2pointy      = ssF.pos2pointyLL;
        pointies2line   = ssF.pointies2lineLL;
    }





    //----------------------------------------
    // //\\ param m slider
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function createSliderPlaceholder_m()
    {
        //this sub is to be generalized:
        // //\\ generalize: variable parameters
        var sliderId          = 'm';
        var rgId              = sliderId;
        var captionPrefix     = 'm = ';
        var SUGGESTED_COLOR   = ssD.approxColor; //experColor;
        var max_m             = rg.n.value;
        var min_m             = 1;
        var startX            = ( -sconf.centerOnPicture_X + sconf.innerMediaWidth * 0.05 ) *
                                sconf.med2mod_scale;
        var endX              = startX + sconf.innerMediaWidth*sconf.med2mod_scale * 0.35;
        //var startY            = ( sconf.centerOnPicture_Y - sconf.innerMediaHeight * 0.05 ) *
        var startY            = ( sconf.centerOnPicture_Y - sconf.innerMediaHeight * 0.80 ) *
                                sconf.med2mod_scale;
        // \\// generalize: variable parameters


        //generalize: spawns:
        var railsLength       = endX - startX;
        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];

        // //\\ slider object
        //sets registry
        ssF.tp( 'sliderStart_' + sliderId, startPos );
        ssF.tp( 'sliderEnd_' + sliderId, endPos );

        var sliderStart = pos2pointy( 'sliderStart_' + sliderId,
            { fill : '#9999dd', tpclass:sliderId, cssClass : 'tofill tostroke', } );
        var sliderEnd = pos2pointy( 'sliderEnd_' + sliderId,
            { fill : '#9999dd', tpclass:sliderId, cssClass : 'tofill tostroke', } );
        ///draws rails
        var slider = pointies2line(
             'slider-' + sliderId,
             [sliderStart, sliderEnd],
             {stroke:SUGGESTED_COLOR, 'stroke-width':3, tpclass:sliderId,
                                cssClass : 'tofill tostroke', }
        );
        $$.$(slider.svgel).cls( 'tp-' + sliderId );
        // \\// slider object

        var range_m     = max_m - min_m;
        var m           = rg.m;
        var handleXpos  = ( m.value - min_m ) /
                          range_m * railsLength + startX;
        m.pos           = [ handleXpos, startY ];
        m.startX        = startX;
        m.endX          = endX;
        m.railsLength   = railsLength;
        var m_pt = pos2pointy(
            rgId,
            {
                cssClass : 'tostroke',
                stroke : SUGGESTED_COLOR,
                'stroke-width' : 3,
                fill : 'white',
                r : 8,
                tpclass : sliderId,
            }
        );

        m.text_svg = sv.printText({
            parent : studyMods[ SUB_MODEL ].mmedia,
            text :'m',
           'stroke-width' : 1,
            style : { 'font-size' : '25px',
                      'font-family' : 'helvetica, san-serif',
                       color : SUGGESTED_COLOR,
            },
            stroke  : SUGGESTED_COLOR,
            fill  : SUGGESTED_COLOR,
        });

        rg.m.model8media_upcreate = function() {
            studyMods[ SUB_MODEL ].model8media_upcreate();
        }

        ///for slider
        m.pos2value = function( newPos )
        {
            var newValue = ( max_m - min_m ) * ( newPos[0] - startX ) /
                             railsLength + min_m;
            if( newValue < min_m || newValue > max_m ) return;

            m.value = Math.round( newValue );
            m.value = Math.max(  min_m, Math.min( max_m, m.value ) );

            m.text_svg = sv.printText({
                parent : studyMods[ SUB_MODEL ].mmedia,
                text : captionPrefix + (m.value-1),
                svgel : m.text_svg,
               'stroke-width' : 1,
                style : { 'font-size' : '25px' },
                stroke : SUGGESTED_COLOR,
            });

            m.pos[0] = newPos[0];
            m.pos[1] = newPos[1];
            updateSliderHandlePos();
            m.model8media_upcreate();
            return true;
        }

        function updateSliderHandlePos()
        {
            //var sliderXpos = (m.value - min_m ) /
            //range_m * railsLength + startX;
            //m.pos[0] = sliderXpos;
            m.medpos = ssF.modpos2medpos_originalLL( m.pos );
            sv.u({
                svgel   : m.svgel,
                parent  : studyMods[ SUB_MODEL ].mmedia,
                cx : m.medpos[0],
                cy : m.medpos[1],
            });
            m.text_svg.setAttributeNS( null, 'x', m.medpos[0]-8 );
            m.text_svg.setAttributeNS( null, 'y', m.medpos[1]+37 );
        };
        updateSliderHandlePos();
    }
    //----------------------------------------
    // \\// param m slider
    //----------------------------------------


}) ();

