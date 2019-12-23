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
        ssF.createSliderPlaceholder_thickness = createSliderPlaceholder_thickness;
        ssF.createSliderPlaceholder_media_scale = createSliderPlaceholder_media_scale;
        pos2pointy      = ssF.pos2pointyLL;
        pointies2line   = ssF.pointies2lineLL;
    }


    //----------------------------------------
    // //\\ param media_scale slider
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function createSliderPlaceholder_media_scale()
    {
        var max_media_scale             = 3;
        var min_media_scale             = 0.3;
        var range_media_scale           = max_media_scale - min_media_scale;
        var SUGGESTED_COLOR             = "#999999";

        var startX            = ( -sconf.originX_onPicture + sconf.innerMediaWidth*0.05 ) *
                                sconf.med2mod_scale;
        var endX              = startX + sconf.innerMediaWidth*sconf.med2mod_scale*0.35;
        var startY            = ( sconf.originY_onPicture - sconf.innerMediaHeight *.87 ) *
                                sconf.med2mod_scale;
        var railsLength       = endX - startX;

        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];

        // //\\ slider object
        //sets registry
        ssF.tp( 'sliderStart', startPos );
        ssF.tp( 'sliderEnd', endPos );

        var sliderStart = pos2pointy( 'sliderStart',
            { fill : '#9999dd', tpclass:'media_scale', cssClass : 'tofill tostroke', } );
        var sliderEnd = pos2pointy( 'sliderEnd',
            { fill : '#9999dd', tpclass:'media_scale', cssClass : 'tofill tostroke', } );
        ///draws rails
        var slider = pointies2line(
             'slider-media_scale',
             [sliderStart, sliderEnd],
             {stroke:SUGGESTED_COLOR, 'stroke-width':3, tpclass:'media_scale',
                                cssClass : 'tofill tostroke', }
        );
        $$.$(slider.svgel).cls( 'tp-media_scale' );
        // \\// slider object

        var media_scale           = rg.media_scale;
        var handleXpos  = ( media_scale.value - min_media_scale ) /
                            range_media_scale * railsLength + startX;
        media_scale.pos           = [ handleXpos, startY ];
        media_scale.startX        = startX;
        media_scale.endX          = endX;
        media_scale.railsLength   = railsLength;
        pos2pointy(
            'media_scale',
            {
                cssClass : 'tostroke media_scale',
                stroke : SUGGESTED_COLOR,
                'stroke-width' : 3,
                fill : 'white',
                r : 8,
                tpclass : 'media_scale',
            }
        );

        media_scale.text_svg = sv.printText({
            parent : studyMods[ SUB_MODEL ].mmedia,
            text :'scale',
            style : { 'font-size' : '30px' },
           'stroke-width' : 1,
            stroke  : SUGGESTED_COLOR,
            fill  : SUGGESTED_COLOR,
        });
        $$.$(media_scale.text_svg).cls( 'tp-media_scale' );

        rg.media_scale.model8media_upcreate = function() {
            studyMods[ SUB_MODEL ].model8media_upcreate();
        }

        ///for slider
        media_scale.pos2value = function( newPos )
        {
            var newValue = ( max_media_scale - min_media_scale ) * ( newPos[0] - startX ) /
                             railsLength + min_media_scale;
            if( newValue < min_media_scale || newValue > max_media_scale ) return;

            // //\\ todm: fullLength patch,
            //            to fit CB in window
            var fullLength = 1;
            media_scale.value = newValue * fullLength;
            sconf.mod2med_scale = sconf.originalMod2med_scale * media_scale.value;
            sconf.med2mod_scale = 1/sconf.mod2med_scale;
            // \\// todm: fullLength patch

            media_scale.pos[0] = newPos[0];
            media_scale.pos[1] = newPos[1];
            updateSliderHandlePos();
            media_scale.model8media_upcreate();
            return true;
        }

        function updateSliderHandlePos()
        {
            //var sliderXpos = (media_scale.value - min_media_scale ) /
            //range_media_scale * railsLength + startX;
            //media_scale.pos[0] = sliderXpos;
            media_scale.medpos = ssF.modpos2medpos_originalLL( media_scale.pos );
            sv.u({
                svgel   : media_scale.svgel,
                parent  : studyMods[ SUB_MODEL ].mmedia,
                cx : media_scale.medpos[0],
                cy : media_scale.medpos[1],
            });
            media_scale.text_svg.setAttributeNS( null, 'x', media_scale.medpos[0]-8 );
            media_scale.text_svg.setAttributeNS( null, 'y', media_scale.medpos[1]+37 );
        };
        updateSliderHandlePos();
    }
    //----------------------------------------
    // \\// param media_scale slider
    //----------------------------------------





    //----------------------------------------
    // //\\ param media_scale slider
    //      creates slider only once per
    //      app model creation;
    //----------------------------------------
    function createSliderPlaceholder_thickness()
    {
        var max_thickness             = 30;
        var min_thickness             = 1;
        var range_thickness           = max_thickness - min_thickness;
        var SUGGESTED_COLOR           = "#999999";

        var startX            = ( -sconf.originX_onPicture + sconf.innerMediaWidth * 0.05 ) *
                                sconf.med2mod_scale;
        var endX              = startX + sconf.innerMediaWidth*sconf.med2mod_scale * 0.35;
        var startY            = ( sconf.originY_onPicture - sconf.innerMediaHeight * 0.93 ) *
                                sconf.med2mod_scale;
        var railsLength       = endX - startX;

        var startPos          = [ startX, startY ];
        var endPos            = [ endX, startY ];

        // //\\ slider object
        //sets registry
        ssF.tp( 'sliderStart_thickness', startPos );
        ssF.tp( 'sliderEnd_thickness', endPos );

        var sliderStart = pos2pointy( 'sliderStart_thickness',
            { fill : '#9999dd', tpclass:'thickness', cssClass : 'tofill tostroke', } );
        var sliderEnd = pos2pointy( 'sliderEnd_thickness',
            { fill : '#9999dd', tpclass:'thickness', cssClass : 'tofill tostroke', } );
        ///draws rails
        var slider = pointies2line(
             'slider-thickness',
             [sliderStart, sliderEnd],
             {stroke:SUGGESTED_COLOR, 'stroke-width':3, tpclass:'thickness',
                                cssClass : 'tofill tostroke', }
        );
        $$.$(slider.svgel).cls( 'tp-thickness' );
        // \\// slider object

        var thickness           = rg.thickness;
        var handleXpos          = ( thickness.value - min_thickness ) /
                                    range_thickness * railsLength + startX;
        thickness.pos           = [ handleXpos, startY ];
        thickness.startX        = startX;
        thickness.endX          = endX;
        thickness.railsLength   = railsLength;
        pos2pointy(
            'thickness',
            {
                cssClass : 'tostroke',
                stroke : SUGGESTED_COLOR,
                'stroke-width' : 3,
                fill : 'white',
                r : 8,
                tpclass : 'thickness',
            }
        );

        thickness.text_svg = sv.printText({
            parent : studyMods[ SUB_MODEL ].mmedia,
            text :'thickness',
            style : { 'font-size' : '30px' },
           'stroke-width' : 1,
            stroke  : SUGGESTED_COLOR,
            fill  : SUGGESTED_COLOR,
        });
        $$.$(thickness.text_svg).cls( 'tp-thickness' );

        rg.thickness.model8media_upcreate = function() {
            studyMods[ SUB_MODEL ].model8media_upcreate();
        }

        ///for slider
        thickness.pos2value = function( newPos )
        {
            var newValue = ( max_thickness - min_thickness ) * ( newPos[0] - startX ) /
                             railsLength + min_thickness;
            if( newValue < min_thickness || newValue > max_thickness ) return;

            //==========================================
            // //\\ sets thickness to specified elements
            //==========================================
            thickness.value = newValue;
            ns.globalCss.upqueue(`
                .tofill.tostroke.thickable,
                .thickable.tostroke {
                    stroke-width : ${newValue.toFixed()};
                }
            `);
            //==========================================
            // \\// sets thickness to specified elements
            //==========================================

            thickness.pos[0] = newPos[0];
            thickness.pos[1] = newPos[1];
            updateSliderHandlePos();
            thickness.model8media_upcreate();
            return true;
        }

        function updateSliderHandlePos()
        {
            //var sliderXpos = (thickness.value - min_thickness ) /
            //range_thickness * railsLength + startX;
            //thickness.pos[0] = sliderXpos;
            thickness.medpos = ssF.modpos2medpos_originalLL( thickness.pos );
            sv.u({
                svgel   : thickness.svgel,
                parent  : studyMods[ SUB_MODEL ].mmedia,
                cx : thickness.medpos[0],
                cy : thickness.medpos[1],
            });
            thickness.text_svg.setAttributeNS( null, 'x', thickness.medpos[0]-8 );
            thickness.text_svg.setAttributeNS( null, 'y', thickness.medpos[1]+37 );
        };
        updateSliderHandlePos();
    }
    //----------------------------------------
    // \\// param thickness slider
    //----------------------------------------


}) ();

