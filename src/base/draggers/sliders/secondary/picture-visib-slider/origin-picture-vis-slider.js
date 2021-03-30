( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);
    var sDomF       = sn('dfunctions', sapp);

    var d8d_p       = sn('d8d-point');

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    sDomF.create_original_picture_vis_slider = create_original_picture_vis_slider;
    //00000000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000000







    function create_original_picture_vis_slider()
    {

        sDomN.visib_right_image$ = $$.c('img')
          .a('src', fconf.engineImg + '/mouse-icon--outdated-slider.png')
          .css('width','26px')
          .css('float','right')
          .css('position','relative')
          .css('top','4px')
          .css('left','-9px')
          .to(sDomN.topMediaControls$())
          ;
        var captionScale    = 1;
        var sliderClassId   = 'origin-vis-slider';
        var railsLegend     = '';

        //=====================================================
        //      animated slider
        //      Based on ns.sliderControl which is based on,
        //      as of version 1072,
        //      module bsl/slider/d8d-app-template.js 
        //=====================================================
        var vis_slider = ssF.animatedSlider({

            parent              :sDomN.topMediaControls$(),
            cssp                :cssp,
            sliderClassId       :sliderClassId,
            customCss           :customCss( cssp, sliderClassId, railsLegend ),
            railsLegend         :railsLegend,

            dataInMove:         function( dataArg, draggee ) {
                                    slider2opacity( dataArg );
                                },
            //.callback when handler stops
            dataInArrival:      function( dataArg ) {
                                    slider2opacity( dataArg );
                                }
        });
        sDomN.visib_left_image$ = $$.c('img')
          .a('src', fconf.engineImg + '/scroll-icon.png')
          .css('width','19px')
          .css('float','right')
          .css('position','relative')
          .css('top','6px')
          .css('right','-10px')
          .to(sDomN.topMediaControls$())
          ;

        vis_slider.doSet_childOpeningAnimation(
            0, 1 - fconf.ORIGINAL_FIGURE_VISIBILITY,
            fconf.ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS
        );
        //11111111111111111111111111111111111111
        return;
        //11111111111111111111111111111111111111







        ///converts study-model pos to draggee caption
        function setCaption( slider_arg )
        {
            //slider_arg.draggee.innerHTML = ( captionScale ).toFixed(2);
        }

        function slider2opacity( sliderParameter )
        {
            var pictureOpacity = Math.max(0,1-sliderParameter).toFixed(3);
            var modelOpacity   = Math.min(1, Math.max(0,sliderParameter)).toFixed(3);
            var strongerModelOpacity = Math.min(1, Math.max(0,sliderParameter*2)).toFixed(3);
            var weakerPictureOpacity = Math.max(0,1-sliderParameter*1.2).toFixed(3);;

            sDomN.bgImage$ && sDomN.bgImage$.css( 'opacity', weakerPictureOpacity );
            sDomN.visib_left_image$.css( 'opacity', pictureOpacity );

            sDomN.mmedia$.css( 'opacity', '' + strongerModelOpacity );
            sDomN.visib_right_image$.css( 'opacity', modelOpacity );
        }
    }

    function customCss ( cssp, csskey, railsLegend )
    {
        var ret = `

            .${cssp}-slider-${csskey} {
                float:right;
                width:80px;
                height:30px;
                left:unset;
                top: 0;
                display:inline-block;
                position:relative;
                z-index:1000;
            }

        `;

        /*
        variant when slider is not visible originally
        .${cssp}-slider-${csskey} {
            visibility:hidden;            
        .${cssp}-slider-${csskey}.${cssp}-highlited-chart {
            visibility:visible;
        }
        */

        ret += `
            /* rails */
            .${cssp}-slider-${csskey}:after {
                content:'';
                display:block;
                position:absolute;
                width:72px;
                height:0px;
                border-top:1px solid #aaaaaa;
                left:6px;
                top:18px;
                color:black;
                background-color:white;
            }

            /* drag background */
            .${cssp}-slider-${csskey}:before {
                content:'${railsLegend}';
                display:block;
                position:absolute;
                width:75px;
                height:30px;
                left: 0px;
                top:0px;
                color:#aaaaaa;
            }

            .${cssp}-slider-${csskey} .${cssp}-draggee {
                position:absolute;
                top:10px;
                width:3px;
                height:14px;
                border-radius:3px;
                border:1px solid #888888;
                color:black;
                background-color:#dddddd;
                z-index:1000;
                cursor:pointer;
            }
        `;
        return ret;
    }

}) ();

