//default app wide settings for lemmas
//may be overriden later by URL-query or lemma sconf.js,
(function(){
    const { fapp, fconf, sf, userOptions, topicColors_repo } =
           window.b$l.apptree({});
    fapp.normalizeSliders = normalizeSliders;
    fapp.doesConfigLemma = doesConfigLemma;
    const tr = topicColors_repo;

    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sf ... anyway, they
    //do ? override from URL-query,
    return;


function doesConfigLemma (){
    // runs once per page load
    // c cc('doesConfigLemma');
 
    //tools
    sf.enableStudylab = false;
    //true enables framework zoom:
    sf.enableTools = true;
    //app modes
    sf.mediaMoverPointDisabled = false;

    //=======================================
    // //\\ topic colors repo
    //=======================================
    //-----------------------
    // //\\ physics
    //-----------------------
    tr.time   = [0,   150, 200     ];
    tr.dtime  = [...tr.time, 1];
    
    //moving body on orbit
    tr.body   = [0,   120,  0,   1 ];
    tr.speed  = [...tr.body];
    tr.orbit  = [0,   180, 0,   1  ];
    tr.triangleGreen  = [...tr.orbit];
    tr.tangent = [0, 150, 0];
    tr.distanceToCenter = [...tr.body];

    //distances
    tr.path = [0,   0, 150,  1  ];
    tr.chord = [...tr.path];
    tr.trianglePurpleTextAreaColor = [...tr.path];
    tr["kepler-triangle-odd"]  = [102, 102, 255, 0.35, 0.7];
    tr["kepler-triangle-even"] = [153, 153, 255, 0.35, 0.7];
    tr.triangleGreen           = [0, 150, 0, 0.25, 0.64];
    tr.freeMove                = [0, 150, 0];
    tr.diagram                 = [150, 0, 90];
    tr.distance        = [60,  20,  0       ];
    tr.chord           = [0,0,255,   1  ];

    //dynamics
    tr.force           = [250, 0,   0       ];
    tr.curvature       = [...tr.force];
    tr.curvatureCircle = [...tr.force];

    tr.estimatedForce  = [100, 50,  0       ];
    tr.forceMove       = [250, 0,   0       ];
    tr.sagitta         = [...tr.estimatedForce];
    tr.sagittaeChords  = [...tr.sagitta];
    tr.displacement    = [...tr.estimatedForce];
    tr.fQR             = [...tr.estimatedForce];
    tr.perpendicular   = [150, 80, 0];
    //-----------------------
    // \\// physics
    //-----------------------
    
    // //\\ diagram
    tr.angle       = [0,  0,  150,   0.1, 0.4 ];
    tr.angleArea   = [0,  0,  150,   0.1, 0.3 ];
    // \\// diagram
    
    // //\\ proof steps
    tr.given       = [0,   150, 0,   1  ];
    tr.proof       = [0,   0,   255     ];
    tr.result      = [100, 0,   0       ];
    tr.invalid     = [0,   0,   0,   1  ];
    // \\// proof steps

    //neutral elements
    tr.shadow      = [50,  50, 50,      ];
    tr.hidden      = [0,   0,  0,    0  ];
    tr.context     = [0,   0,  0,    1  ];
    tr.attention   = [250, 150,   0 ];
    //=======================================
    // \\// topic colors repo
    //=======================================


    //we adopt strategy when svg x-scale is unchanged and set as
    //sconf.mod2inn_scale, but y-scale can have additional factor,
    //mod2inn_scaleY, to be overriden in lemma's conf.js
    //except lemmas 1 and 5 for which dontRun_ExpandConfig === true
    //
    //as of Dec 2025 never used in this app,
    sf.mod2inn_scaleY = 1;

    //initial visibility of rg elements with pname
    //when subessay relaunches
    sf.rgShapesVisible = true;

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

    //overrides hover_width for texts
    //for activation, needs class "hover-width" in element,
    //
    //apparently, we often disable this stroke at all
    //by minimizing its width
    //because of it only corrupts bold font on mouse hover,
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

    Object.assign( sf, {
        //***************************************************
        // //\\ tp color
        //===================================================
        //topics:
        DEFAULT_TP_SATUR : 99,

        //---------------------------------------------------
        // //\\ tp color opacity
        //---------------------------------------------------
        //affects only ssF.lowtpid__2__glocss8anchorRack and
        //ssF.colorArray_2_rgba
        //does not affect anchor colors,
        TP_OPACITY_LOW : 0.5,

        //for points only,
        //0.6-makes opacity points do look "non-solid",
        TP_OPACITY_LOW_POINT : 1,
        TP_OPACITY_HIGH : 0.8,

        SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,
        default_tp_stroke_opacity   : 0.5, //2, todotodo bug everywhere

        ANCHOR_OPACITY_LOW : '0.7',
        ANCHOR_OPACITY_HIGH : '1',
        ANCHOR_DEFAULT_COLOR : 'rgba( 150, 0, 150, 1 )',

        //affects only anchor colors in Book text,
        TP_OPACITY_FROM_fixed_colors : true,
        //---------------------------------------------------
        // \\// tp color opacity
        // \\// tp color
        //===================================================

        //diagram drag handle mouse pointer styles
        spinnerCursorGrab : 'crosshair',
        spinnerCursorGrabbed : 'crosshair',

        //---------------------------------------------------------------
        // //\\ anchor control
        //---------------------------------------------------------------
        ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS : 0.6,
        ANCHOR_TOPIC__OPACITY_IN_FOCUS : 0.9,
        //for anchor-text, sets tpcolarr opacity to 1
        ITEM_BASE_COLOR_TO_ANCHOR : false,
        //---------------------------------------------------------------
        // \\// anchor control
        //---------------------------------------------------------------

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
        LETTER_FONT_SIZE_PER_1000 : 32,

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
