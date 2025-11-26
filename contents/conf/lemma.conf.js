// //\\// main configuration,
//        may be overriden later by URL-query or sconf.js,
//        execution order is contents/conf.js and then this file,
( function() {
    const { fapp, sconf, fixedColors,} = window.b$l.apptree({});
    fapp.normalizeSliders = normalizeSliders;
    fapp.doesConfigLemma = doesConfigLemma;
    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sf ... anyway, they do ? override from URL-query,
    const sf = sconf;
    const fc = fixedColors;
    return;


    function doesConfigLemma (){
        //tools
        sconf.enableStudylab = false;
        //true enables framework zoom:
        sconf.enableTools = true;

        //=======================================
        // //\\ topicGroupColors
        //      , templates for use in optional
        //      overriding in sconf.js,
        //=======================================
        Object.assign( fc, {
            // //\\ physics
            orbit           : [0,   180, 0,   1  ],
            //moving body on orbit
            body            : [0,   120,  0,   1 ],

            force           : [250, 0,   0       ],
            sagitta         : [100, 50,  0       ],

            time            : [0,   150, 200     ],

            distance        : [60,  20,  0       ],
            chord           : [0,0,255,   1  ],
            // \\// physics

            // //\\ diagram
            angle       : [0,  0,  150,   0.1, 0.4 ],
            angleArea   : [0,  0,  150,   0.1, 0.3 ],

            // //\\ proof steps
            given       : [0,   150, 0,   1  ],
            proof       : [0,   0,   255     ],
            result      : [100, 0,   0       ],
            invalid     : [0,   0,   0,   1  ],
            // \\// proof steps

            //neutral elements
            shadow      : [50,  50, 50,      ],
            hidden      : [0,   0,  0,    0  ],
            context     : [0,   0,  0,    1  ],
        });
        fc.estimatedForce   = [...fc.sagitta];
        fc.fQR              = [...fc.estimatedForce];
        fc.displacement     = [...fc.fQR];
        fc.distanceToCenter = [...fc.body];
        fc.curvature        = [...fc.force];
        fc.curvatureCircle  = [...fc.force];
        fc.dtime            = [...fc.time, 1];
        //=======================================
        // \\// topicGroupColors
        //=======================================

        ///for default points (and draggers???)
        ///in module points.js
        sf.standardSvgSize = 1000;
        //can be reset in blesson sonf:
        sf.realSvgSize = 1000;
        sf.graphSvgSize = (1000+600)/2;

        //---------------------------------------------------------------
        // //\\ moved to site conf from expand-conf.js,
        //      defaults for standardSvgSize = 1000 px,
        //---------------------------------------------------------------
        sf.default_tp_stroke_width = 10;
        sf.defaultLineWidth = 4;
        sf.handleRadius = 3;

        //unitless, will be multiplied by controlsScale,
        //controlsScale = realSvgSize / sf.standardSvgSize
        //see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sf.nonhover_width = 1;
        sf.hover_width = 3;

        //apparently, we often disable this stroke at all
        //by minimizing its width
        //because of it only corrupts bold font on
        //mouse hover,
        //overrides hover_width for texts
        //for activation, needs class "hover-width" in element
        sf.text_nonhover_width = 0.01; //0.5; //0.13;
        //vital to fix too thick text-anchor-hovered font:
        sf.text_hover_width = 0.01; //1.0; //0.33;
        //---------------------------------------------------------------
        // \\// moved to site conf from expand-conf.js
        //---------------------------------------------------------------

        //this looks not very consistent because
        //gives this object special attention:
        sf.pointDecoration =  {
            cssClass        : 'tostroke tofill thickable',
            'stroke-width'  : sf.handleRadius,
            r               : sf.handleRadius,
        };

        //app modes
        sf.mediaMoverPointDisabled = false;

        Object.assign( sf, {
            //***************************************************
            // //\\ tp color
            //===================================================
            //topics:
            DEFAULT_TP_SATUR : 99,

            //---------------------------------------------------
            // //\\ tp color opacity
            //---------------------------------------------------
            //affects only ssF.topics__2__topicsColorModel and  ssF.colorArray_2_rgba
            //does not affect anchor colors,
            TP_OPACITY_LOW : 0.5,

            //for points only,
            //0.6-makes opacity points do look "non-solid",
            TP_OPACITY_LOW_POINT : 1,
            TP_OPACITY_HIGH : 0.8,
            TP_OPACITY_HIGH_POINT : 1,

            TP_OPACITY_FROM_fixed_colors : true, //false,
            SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,
            default_tp_stroke_opacity   : 0.5, //2, todotodo bug everywhere

            //affects only anchor colors in Book text,
            ANCHOR_OPACITY_LOW : '0.7',
            ANCHOR_OPACITY_HIGH : '1',
            ANCHOR_DEFAULT_COLOR : 'rgba( 150, 0, 150, 1 )',
            //---------------------------------------------------
            // \\//  tp color
            //===================================================

            //diagram drag handle mouse pointer styles
            spinnerCursorGrab : 'crosshair',
            spinnerCursorGrabbed : 'crosshair',

            //---------------------------------------------------------------
            // //\\ anchor control
            //---------------------------------------------------------------
            ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS : 0.6,
            ANCHOR_TOPIC__OPACITY_IN_FOCUS : 0.9,
            //for anchor-text, sets fixed-color opacity to 1
            ITEM_BASE_COLOR_TO_ANCHOR : false,
            //---------------------------------------------------------------
            // \\// anchor control
            //---------------------------------------------------------------
            //***************************************************
            // \\// TOPIC COLORS AND SHAPES
            //***************************************************

            //***************************************************
            // ??? in better design, this setting should come
            // from ns.dpdec.dimensions.WIDTH bsl-core,
            // to do this, this module should have
            // delayed execution based on setModue
            // machinery,
            //
            // in mean time, these 21px comes as a sum
            // for 5px of image width + 2*8px margin from
            //     subroots.css.js::#bsl-resizable-handle
            // and not from dpdec.dimensions.WIDTH as may appear,
            main_horizontal_dividor_width_px : 21,
            //***************************************************

            mediaOffset : [ 0, 0 ], //in respect to simscene

            GENERIC_SLIDERS_FONT_SIZE : 15,
            GENERIC_SLIDER_HEIGHT_Y : 25,
            GENERIC_SLIDERS_COUNT : 2,
            SLIDERS_LEGEND_HEIGHT : 25*2+20, //2=GENERIC_SLIDERS_COUNT
            SLIDERS_OFFSET_Y      : 0,
            SLIDERS_OFFSET_X : 0.05, //in respect to background-image-width
            SLIDERS_LENGTH_X : 0.70, //in respect to background-image-width
            dragHidesPictures : true,  //vital for show/hide letters machinery
        });
    }

    function normalizeSliders( sscale )
    {
        sf.GENERIC_SLIDERS_FONT_SIZE *= sscale;
        sf.GENERIC_SLIDER_HEIGHT_Y *= sscale;
        sf.SLIDERS_LEGEND_HEIGHT *= sscale;
        sf.SLIDERS_OFFSET_Y *= sscale;
    }
})();