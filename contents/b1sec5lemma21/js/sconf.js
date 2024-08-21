( function() {
    var {
        eachprop, mat,
        fapp, sconf,
    } = window.b$l.apptree({
        ssFExportList : { init_conf }
    });
    return;






    function init_conf()
    {
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        //for some standard sliders
        sconf.enableTools               = true;
        sconf.hideProofSlider           = true; //todo
        //sconf.rgShapesVisible         = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        var pictureWidth = 1856;
        var pictureHeight = 1700;
        //var pictureWidth = 1251; //bigger diagram
        //var pictureHeight = 1074; //bigger diagram

        var originX_onPicture = 853;
        var originY_onPicture = 978;
        //var originX_onPicture = 853 - 300;
        //var originY_onPicture = 978 - 246;

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************

        //do not change total dimension of svgdom and the picture,
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize
        //sconf.standardSvgSize = 250;

        //gives bar full range of opacity for tp machine
        sconf.TOPIC_FILL_OPACITY_IN_FOCUS = 1;
        //makes idle bars brighter
        sconf.TOPIC_FILL_OPACITY_NOT_IN_FOCUS = 0.6;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 25; //works

        //--------------------------------------
        // //\\ does override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 30;
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 6 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;

        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
        sconf.text_hover_width      = 1.5;
        // \\// principal tp-css pars
        // \\// does override engine defaults,
        // \\// decorational parameters
        //***************************************************************

        var predefinedTopics =
        {
            "gamma"                 : [255,   0, 0, 1],
            "g-parameter"           : [255,   0, 0, 1],
            "balance-parameters"    : [255,   0, 0, 1],
            "CB"                    : [255,   0, 0, 1],

            "PT"                    : [255,   0, 0, 1],

            "base-figure"           : [0,     0, 255, 1],
            "base-point"            : [0, 0, 200, 1],
            "angle-alpha"           : [255,   0, 0, 1],
            "angle-beta"            : [255,   0, 0, 1],

            "static-generator"      : [255,   0, 255, 1],
            "ellipse"               : [0,   150, 0, 1],
            "tangent"               : [0,   150, 0, 1],
            "given-parallelogram"   : [0,   200, 255, 1],
            "generators"            : [0,   0,   255, 1]
        };
        let pt = predefinedTopics;

        var pointsOnPicture =
        {
            C : [50, originY_onPicture], //550],
            B : [838, originY_onPicture], //552],
            M : [391-384+originX_onPicture,634],

            //:apparently inactive static points
            N : [380-384+originX_onPicture, 476-553+originY_onPicture],
            T : [411-384+originX_onPicture, 219-553+originY_onPicture],
            P : [548-384+originX_onPicture, 77-553+originY_onPicture],
            R : [734-384+originX_onPicture, 346-553+originY_onPicture],
  
            O : [originX_onPicture, originY_onPicture],
            H : [originX_onPicture, originY_onPicture],
            AA : [568, 244],
        };
        
        ///bigger diagram
        //eachprop( pointsOnPicture, v => {
        //    v[0] -= 300;
        //    v[1] -= 246;
        //});        
        
        var gamma; // = Math.PI*0.49;
        var a;
        var beta;
        var alpha;

        var initial_g;

        ///derives initial model parameters from picture's points
        var to_sconf = {};
        var mod2inn_scale;
        (function() {
            var pp = pointsOnPicture;
            var B = pp.B;
            var C = pp.C;
            var O = pp.O;
            var M = pp.M;
            var N = pp.N;
            var AA = pp.AA;
            var BC = [ B[0] - C[0], B[1] - C[1] ];
            mod2inn_scale = mat.unitVector(BC).abs;
            var wwb = ( B[0] - O[0] ) / ( B[0] - C[0] ); //0.6
            //a = 1 - wwb;
            a = 0.435;

            //---sets initial param g
            var OM = [ M[0] - O[0], M[1] - O[1] ];
            initial_Munit = mat.unitVector(OM);
            //possibly initial_g = initial_Munit.abs/mod2inn_scale;
            initial_g = 0.105;
            //is an absolute value of an angle:
            gamma = Math.acos( initial_Munit.unitVec[0] ); 
            gamma *= 1.01;

            //---sets initial decorational param gN
            var ON = [ N[0] - O[0], N[1] - O[1] ];
            initial_Nunit = mat.unitVector(ON);

            var BAA = mat.p1_to_p2( B, AA );
            //beta = -Math.asin( BAA.unitVec[1] ); 
            beta = 0.863;

            //c cc( 'beta fraction=' + (beta/Math.PI).toFixed(3) );
            var CAA = mat.p1_to_p2( C, AA );
            //alpha = -Math.asin( CAA.unitVec[1] ); 
            alpha = 0.528;

            to_sconf.a = a;
            to_sconf.alpha = alpha;
            to_sconf.beta = beta;
            to_sconf.gamma = gamma;
            to_sconf.initial_g = initial_g;
            to_sconf.initial_gN = -initial_Nunit.abs/mod2inn_scale;
            //c cc( 'alpha fraction=' + (alpha/Math.PI).toFixed(3) );
        })();

        let pointRadius = handleRadius;
        let pop = pointsOnPicture;
        var originalPoints =
        {
            A : {
                  caption: 'C',
                  pos: [0,0], //fake pos
                  pcolor: pt['base-point'],
                  cssClass: 'tp-base-figure tp-_C',
                  initialR: pointRadius,
                  letterAngle : -90,
                  letterRotRadius : 20,
            },
            B : {
                  caption: 'E',
                  pos: pop.B,
                  pcolor: pt['base-point'],
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : -90,
                  letterRotRadius : 20,
            },
            /*
            C : {
                  pos: pop.C,
                  pcolor: pt['ellipse'],
                  //cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            */
            D : {
                  pcolor: pt[ "g-parameter" ],
                  cssClass: 'tp-g-parameter',
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            O : {
                  pos: pop.O,
                  //pcolor: pt[ "g-parameter" ],
                  //cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
                  doPaintPname:false,
            },
            P : {
                  pos: pop.P,
                  pcolor: pt['base-point'],
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            /*
            M : {
                  pos: pop.M,
                  pcolor: pt['base-point'],
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            */
            N : {
                  pos: pop.N,
                  pcolor: pt['base-point'],
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            T : {
                  pos: pop.T,
                  pcolor: pt['base-point'],
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            R : {
                  pos: pop.R,
                  pcolor: pt['base-point'],
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            //============================================
            // //\\ sliders
            //============================================
            AA : {
                  caption: 'A',
                  draggableX : true,
                  draggableY : true,
                  pos: pop.AA,
                  pcolor: pt['base-point'],
                  style: {fill: '#ffffff'},
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 0,
                  letterRotRadius : 20,
            },
            H : {
                  draggableX : true,
                  pos: pop.H,
                  //pcolor: pt[ "g-parameter" ],
                  pcolor: pt['base-point'],
                  style: {fill: '#ffffff'},
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : 45,
                  letterRotRadius : 20,
            },
            G : {
                  caption: 'M',
                  draggableY : true,
                  //pos: pop.G,
                  pcolor: pt['base-point'],
                  style: {fill: '#ffffff'},
                  cssClass: 'tp-base-figure',
                  initialR: pointRadius,
                  letterAngle : -70,
                  letterRotRadius : 20,
            },
            //============================================
            // \\// sliders
            //============================================
      };

        var linesArray =
        [
            //-------------------------
            // //\\ base-figure
            //-------------------------
            {
                //-------------------------------------------------
                // \\// given static angles alpha, beta
                //-------------------------------------------------
                //'AABAangleA
                'AA,B' :
                {   //good
                    pcolor : [222,0, 0], // predefinedTopics["base-figure"],
                    cssClass : 'tp-angle-beta',
                },
            },
            {
               //'AABAangleAA'
               'AB' :
               {
                    pcolor : [222,0, 0], //predefinedTopics["base-figure"],
                    cssClass : 'tp-angle-beta',
               },
            },

            /*
            {
               //'AABAangleAA'
               'BA' :
               {
                    pcolor : [222, 0, 0], //predefinedTopics["base-figure"],
                    cssClass : 'tp-CB',
               },
            },
            */
            //-------------------------------------------------
            // \\// given static angles alpha, beta
            //-------------------------------------------------

            //-----------------------------------------------
            // //\\ decorates draggers
            //-----------------------------------------------
            {
                'GB' :
                {
                    pcolor : predefinedTopics["base-figure"],
                    cssClass : 'tp-generators',
                },
            },
            {
                'GA' :
                {
                    pcolor : predefinedTopics["base-figure"],
                    cssClass : 'tp-generators',
                },
            },
            //-----------------------------------------------
            // \\// decorates draggers
            //-----------------------------------------------

            //-------------------------------------------------
            // //\\ base sides
            //-------------------------------------------------
            {
                'BH' :
                {
                    pcolor : pt[ "gamma" ],
                },
            },
            {
                'GH' :
                {
                    pcolor : pt[ "gamma" ],
                },
            },
            {
                'NG' :
                {
                    pcolor : pt[ "generators" ],
                },
            },
            /*
            {
                'CH' :
                {
                    pcolor : pt[ "balance-parameters" ],
                },
            },
  */
            {
                'BA' :
                {
                    pcolor : pt[ "base-figure" ],
                },
            },
            {
                'BD' :
                {
                    pcolor : pt[ "generators" ],
                },
            },
            {
                'AD' :
                {
                    pcolor : pt[ "generators" ],
                },
            },
            {
                'A,AA' :
                {
                    pcolor : pt[ "base-figure" ],
                },
            },
            {
                'B,AA' :
                {//good
                    pcolor : [0,222, 0, 1], //pt[ "base-figure" ],
                },
            },
            //-------------------------------------------------
            // \\// base sides
            //-------------------------------------------------

            
            //-------------------------------------------------
            // //\\ given static angles alpha, beta
            //-------------------------------------------------
            //'AAABangleA',
            {
                'AA,A' :
                {
                    pcolor : pt[ "base-figure" ],
                    cssClass:'tp-angle-alpha',
                },
            },
            //AAABangleB
            {
                'A,B' :
                {
                    pcolor : pt[ "base-figure" ],
                    cssClass:'tp-angle-alpha',
                },
            },
            //-------------------------------------------------
            // \\// given static angles alpha, beta
            //-------------------------------------------------
        ]; 


        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        fapp.normalizeSliders( pictureHeight / 500 ); //todo not automated, prolifer.
        Object.assign( to_sconf, {
            predefinedTopics,
            originalPoints,
            linesArray,
            mediaBgImage : "diagram.png",
            //mediaBgImage : "diagram3.png", //bigger diagram
            //dontRun_ExpandConfig : true,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            originX_onPicture, //needed for common sliders
            originY_onPicture, //needed for common sliders

            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,
            pictureWidth,
            pictureHeight,
            
            thickness           : 1,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //default_tp_stroke_opacity : 0.5, //already
            default_tp_stroke_width,
            defaultLineWidth,
            handleRadius,
        });

        //todm proliferation in each lemma:
        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        (function () {
            var inn2mod_scale = 1/mod2inn_scale;
            to_sconf.mod2inn_scale = mod2inn_scale;
            to_sconf.inn2mod_scale = inn2mod_scale;
        })();
        //----------------------------------
        // \\// spawns to_conf
        // \\// prepares sconf data holder
        //----------------------------------------------------



        //----------------------------------------------------
        // //\\ copy-pastes to sconf
        //----------------------------------------------------
        Object.keys( to_sconf ).forEach( function( key ) {
            sconf[ key ] = to_sconf[ key ];
        });
        //----------------------------------------------------
        // \\// copy-pastes to sconf
        //----------------------------------------------------
    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

