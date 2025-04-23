// //\\// file where to set plugin main configuration
( function() {
    var { fapp, sconf, userOptions, fixedColors, } = 
        window.b$l.apptree({});

    fapp.doesConfigLemma = doesConfigLemma;
    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sconf ... anyway, they do ? override from URL-query,
    return;
    
    
    function doesConfigLemma()
    {
        //====================================================
        // //\\ optionally overriden by url-query-config
        //====================================================
        var GENERIC_SLIDERS_FONT_SIZE = 15;
        var GENERIC_SLIDER_HEIGHT_Y = 25;
        var GENERIC_SLIDERS_COUNT = 2; //todm ... not automated
        var SLIDERS_LEGEND_HEIGHT = 25*GENERIC_SLIDERS_COUNT+20;
        var SLIDERS_OFFSET_Y      = 0;

        //=======================================
        // //\\ topicGroupColors
        //      historically named as fixedColors
        //=======================================
        {
            //The color constants could be further improved.  Some draft notes are below
            //which may not all be up to date.


            //usually as a condition of a claim,
            //condition of the theorem,
            //given parameters of the claim or proof
            var given = [0, 150, 0];

            //relates to moving body, to an orbit
            var body      = [0,     150, 0];
            var orbit     = body;
            var orbitareaSample  = [0, 150, 0,  0.05];  //P12 (This model shares code with many other propositions)
            var orbitarea = [0, 150, 0,  0.1, 0.5];     //P14 (in P12 sconf)  Why do orbitarea and orbitarea2 share the same name but have different low opacity values?
            var orbitareaHiddenStart = [0, 150, 0,  0.001, 0.5];   //P12
            var instanttriangle  = [0, 150, 200, 0.2, 0.5 ];//P14 (in P12 sconf)  Why do instanttriangle and instanttriangle2 share the same name but have different low opacity values?
            var instanttriangleHiddenStart  = [0, 150, 200, 0.001, 0.5 ];  //P12
            var time      = [0,     150,  200];
            var dtime     = time;
            var distance  = [60, 20, 0];
            
            //logical steps of the proof, auxilary constructs
            //of a proof
            var proof     = [0,     0,   255];
            var proofHidden = [0, 0,   255,   0.05];        //P17 (in P12 sconf)
            var result    = [100,   0,  0];

            ///addendum has different color concepts
            if( userOptions.showingBonusFeatures() ) {
                ////swaps colors
                var force = [250, 0, 0];
                var invalid = [0, 0, 0];
            } else {
                //alert, invalid user actions
                var invalid   = [250,  0,  0];
                //force, energy
                var force     = [200,  150,  0];
                //conclusion of the proof
            }
            //neutral elements
            var shadow    = [50,  50,  50];
            var hidden    = [0, 0, 0, 0];


            var estimatedForce = [200,0,200];
            var sagitta = estimatedForce;
            var curvature  = [200,   40,  200];
            var context = [0, 0, 0];
            var chord = [0, 0, 255];
            var attention = [200,  200,  0];


            //From L20, L21
            //-May be able to combine with other color variables
            var static              = [0,     200, 255];
            var staticHalfOpacity   = [0, 200, 255, 0.5];
            var core                = [255,   150, 0];
            var coreHalfOpacity     = [255, 150, 0, 0.5];
            var aux                 = [255,   0, 255];
            var constructors        = [0,     0, 255];
            var ellipse             = [0,   150, 0];


            //From L2, L3
            var difference = [150, 50, 0, 0, 0.64];
            var base = [0,    150,  0];
            var curve = [0,    150,  0];
            var figure = [0,    150,  0];


            //P1 (Shared with P2)
            var freeMove = [0,150,0];
            var forceMove = [150,50,0];
            var diagram = [150,0,90];
            var path = [0,0,150];
            var sagittaeChords = [150, 0, 150];     //Could this be combined with sagitta and sagitta2?
            var speed = [150,120,0]; 

            var trianglePurpleTextAreaColor = path;//[0,0,150];
            var triangleGreen = [0, 150,  0,  0.25, 0.64];

            var perpendicular = [150, 80, 0];
            var tangent = [0, 150, 0]; 

            //P2
            var areaDescriptionAccelerated = [255,  100, 0];    //The description of the areas triangle under the P2 proof tab


            //P41
            //The following could have better generic variable names
            //special or derivative parameters
            //Note that Fi for P12 is shadow (see its sconf.js ~line 635)
            var fi        = [0,  0,  150,   0.1, 0.3];
            var Fkernel   = [0,  0,  150];

            //Maybe rename this to something about body with info about the opacities?
            var Zgraph    = [...body];
            Zgraph[3]     = 0.01;
            Zgraph[4]     = 1;

            //Maybe rename this to something about force with info about the opacities?
            var vgraph    = [...force];
            vgraph[3]      = 0.1;
            vgraph[4]      = 1;
            

            //-eg. area ABFD
            //Maybe rename this to something about force with info about the opacities?
            var VSarea    = [...force];
            VSarea[3]     = 0.3;
            VSarea[4]     = 0.7;


            //Maybe rename this to something about time with info about the opacities?
            var Tarea     = [...time];
            Tarea[3]      = 0.01;
            Tarea[4]      = 0.7;


            //Not sure what this is.  Seems to be after "Drop point, A" in Elements under developer tools
            //however I haven't seen it visually yet.
            var vgpoint = [0,  150, 0, 0.01, 1]; //todm: last two pars have no effect


            var XCY     = [0, 0, 150,  0.03,  0.5];

            var D𝑐𝑥E    = [0, 0, 150,  0.01,  0.5];

            
            //TEMP Could name the following based on their color and opacity values (eg. starts hidden)?
            //However many of the other variables describe what they do.  What name might describe these?
            var D𝑏𝑧E    = [110, 90, 0, 0.01, 0.5];
            var VIC     = [110, 90, 0, 0.01, 0.5];
            var ICK     = [110, 90, 0, 0.01, 0.5];

            

                
            Object.assign( fixedColors, {
                given,
                body,
                orbit,
                orbitareaSample,
                orbitarea,
                orbitareaHiddenStart,
                instanttriangle,
                instanttriangleHiddenStart,
                time,
                dtime,
                distance,
                proof,
                proofHidden,
                force,
                invalid,
                result,
                shadow,
                hidden,

                estimatedForce,
                sagitta,
                curvature,
                context,
                chord,
                attention,
                
                static,
                staticHalfOpacity,
                core,
                coreHalfOpacity,
                aux,
                constructors,
                ellipse,

                given,
                difference,
                base,
                curve,
                figure,

                //From L2, L3 may want to rename the following to remove hyphens
                //Could create a few opacity constants as there are only a few unique ones below
                "figure-area"               : [0,    150,  0, 0.32, 0.64],

                "circumscribed-rectangles"  : [0,   80, 150, 0.32, 0.64],
                "inscribed-rectangles"      : [150,  0, 150, 0.32, 0.64],

                //Could modify the varaible name for the first one to describe that it's initially hidden?
                "widest-rectangularL2"      : [0,  0, 150, 0.0, 0.49],
                "widest-rectangularL3"      : [0,  0, 150, 0.28, 0.49],

                
                //Do the opacity values really need to be as follows or could they be the defaults?
                //Doesn't other text use the defaults?  Would this situation be different?
                "figure-area-txt"           : [0,    150,  0, 0.7, 1],
                //Should the following variable names be longer? eg. circumscribed instead of circ?
                //I believe this refers to circumscribed
                "circ-txt"                  : [0,  80, 150, 0.7, 1],
                //I believe this refers to inscribed
                "insc-txt"                  : [150,  0, 150, 0.7, 1],
                //Would this refer to widest-rectangular?
                "widt-txt"                  : [0,  0, 150, 0.7, 1],



                freeMove,
                forceMove,
                diagram,
                path,
                sagittaeChords,
                speed,

                trianglePurpleTextAreaColor,
                triangleGreen,

                perpendicular,
                tangent,

                areaDescriptionAccelerated,


                //From P1 may want to rename the following to remove hyphens
                "kepler-triangle-odd"   : [102,102,255, 0.35, 0.7],
                "kepler-triangle-even"  : [153,153,255, 0.35, 0.7],


                
                fi,
                Fkernel,
                Zgraph,

                vgraph,
                VSarea,
                
                Tarea,

                vgpoint,

                XCY,
                D𝑐𝑥E,
                D𝑏𝑧E,
                VIC,
                ICK,
            });
        }
        //=======================================
        // \\// topicGroupColors
        //=======================================
        
        to_sconf =
        {
            //***************************************************
            // //\\ TOPIC COLORS AND SHAPES
            // //\\ tp color
            //===================================================
            //takes precedence in: ssF.colorArray_2_rgba
            //                     ssF.topics__2__topicsColorModel

            //this solution is not good:
            //some lemmas need bright red, but
            //bright green text is hard to read ...
            //so we resort to dark color LIGHT = 30

            //This sets L-paramter in SHL color model.
            //Range of L is from 0 to 100. 100 is 100% lightness which mean
            //all colors are equaly bright and diagram becomes invisible. 0 - is complete darkness.
    
            //topics:
            DEFAULT_TP_SATUR : 99,

            //---------------------------------------------------
            // //\\ tp color opacity
            //---------------------------------------------------
            //affects only ssF.topics__2__topicsColorModel and  ssF.colorArray_2_rgba
            //does not affect anchor colors,
            TP_OPACITY_LOW : 0.5,
            //0.6-makes opacity points do look "non-solid"
            TP_OPACITY_LOW_POINT : 1, //for points only,

            TP_OPACITY_HIGH : 0.8,
            TP_OPACITY_HIGH_POINT : 1,
    
            ANCHOR_OPACITY_LOW : '0.7',
            ANCHOR_OPACITY_HIGH : '1',
            ANCHOR_DEFAULT_COLOR : 'rgba( 150, 0, 150, 1 )',
    

            //affects only anchor colors in Book text,
            TP_OPACITY_FROM_fixed_colors : true, //false,
            //---------------------------------------------------
            // \\// tp color opacity
            // \\// tp color
            //===================================================
    
            //diagram drag handle mouse pointer styles
            spinnerCursorGrab : 'crosshair',
            spinnerCursorGrabbed : 'crosshair',
    
            SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,

            default_tp_stroke_opacity   : 0.5, //2, todotodo bug everywhere
    
            //---------------------------------------------------------------
            // //\\ anchor control
            //---------------------------------------------------------------
            ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS : 0.6,
            ANCHOR_TOPIC__OPACITY_IN_FOCUS : 0.9,
            ITEM_BASE_COLOR_TO_ANCHOR : false, //for anchor-text, sets fixed-color opacity to 1
            //---------------------------------------------------------------
            // \\// anchor control
            //---------------------------------------------------------------
    
            //---------------------------------------------------------------
            // //\\ moved to site conf from expand-conf.js
            //---------------------------------------------------------------
            default_tp_stroke_width     : 10,
            defaultLineWidth            : 2,
            //---------------------------------------------------------------
            // \\// moved to site conf from expand-conf.js
            //***************************************************
            // \\// TOPIC COLORS AND SHAPES
            //***************************************************
                
                
                
                
            //***************************************************
            // in better design, this setting should come
            // from ns.dpdec.dimensions.WIDTH bsl-core,
            // to do this, this module should have
            // delayed execution of to_sconf based on setModue
            // machinery,
            //
            // in mean time, these 21px comes as a sum
            // for 5px of image width + 2*8px margin from
            //     subroots.css.js::#bsl-resizable-handle
            // and not from dpdec.dimensions.WIDTH as may appear,
            main_horizontal_dividor_width_px : 21,
            //***************************************************
    
            mediaOffset : [ 0, 0 ],                 //in respect to simscene
            GENERIC_SLIDERS_FONT_SIZE,
            GENERIC_SLIDER_HEIGHT_Y,
            GENERIC_SLIDERS_COUNT,
            SLIDERS_LEGEND_HEIGHT,
            SLIDERS_OFFSET_Y,

            SLIDERS_OFFSET_X : 0.05, //in respect to background-image-width
            SLIDERS_LENGTH_X : 0.70, //in respect to background-image-width

            dragHidesPictures : true,  //vital for show/hide letters machinery

            ///for default points (and draggers???)
            ///in module points.js
            handleRadius : 8,
            standardSvgSize : 1000,
        };

        to_sconf.pointDecoration =
        {
            cssClass        : 'tostroke tofill thickable',
            'stroke-width'  : 3,
            r               : to_sconf.handleRadius,
        };
        //====================================================
        // \\// optionally overriden by url-query-config
        //====================================================




        //adds to_sconf to commong sconf
        Object.keys( to_sconf ).forEach( function( key ) {
            sconf[ key ] = to_sconf[ key ];
        });

        fapp.normalizeSliders = normalizeSliders;
        return;






        //fapp
        function normalizeSliders( sscale )
        {
            sconf.GENERIC_SLIDERS_FONT_SIZE *= sscale;
            sconf.GENERIC_SLIDER_HEIGHT_Y *= sscale;
            sconf.SLIDERS_LEGEND_HEIGHT *= sscale;
            sconf.SLIDERS_OFFSET_Y *= sscale;
        }
    }
}) ();

