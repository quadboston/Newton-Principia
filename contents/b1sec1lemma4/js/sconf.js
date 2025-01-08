
( function() {
    var {
        ns, eachprop,
        fconf,
        sconf,
    } =
    window.b$l.apptree({
        ssFExportList : { init_conf }
    });
    return;









    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================


        //***************************************************************
        // //\\ geometical scales
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 699;
        var pictureHeight = 375;
        var originX_onPicture = 80; //for model's axis x
        var originY_onPicture = 329; //for model's axis y

        //to comply standard layout, one must add these 2 lines:
        var svgScale = 1.5 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = svgScale / sconf.standardSvgSize


        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 3 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 4 * controlsScale ),
        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin if it has CSS hover-width:
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        //this makes curve's border nicely thin if it has CSS hover-width:
        sconf.hover_width       = Math.max( 1, Math.floor( 10*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        sconf.text_nonhover_width   = 1000;
        sconf.text_hover_width      = 2000;
        sconf.thickness = 0.1; //sconf.nonhover_width;
        // \\// principal tp-css pars
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------
        //***************************************************************
        // \\// geometical scales
        //***************************************************************




        sconf.rgShapesVisible = true;

        sconf.DONT_PAINT_BARS_MORE_THAN = 200;

        sconf.ZEBRA_COLORS = 6;
        sconf.BARS_NUMBER_TO_PLOT = sconf.ZEBRA_COLORS;

        //after assigning, test app; because of
        //algo is repeatable, all next runs will do the same work,
        var BARS_NUMBER_MAX = sconf.BARS_NUMBER_MAX = 500; //850;

        var BARS_NUMBER_INITIAL = sconf.BARS_NUMBER_INITIAL = 4;

        //prevents collision of points p,T with orts j,i tips
        sconf.ORT_J_SHIFT = 0.1;
        sconf.ORT_I_SHIFT = 0.1;


        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        var A = [originX_onPicture, originY_onPicture];

        var a = [A[0], 48.5];
        var E = [334, A[1]];
        var c = [210, 122];
        //var P = [381, A[1]];
        var P = [381, 333];

        var p = [381, 80.5];
        //in Book: 
        //var T = [641, 332];
        var T = [641, P[1]];
        var r = [514, 150];



        //count n slider parameters
        var sliderNStart    = [ A[0], E[1]+60 ];
        var sliderNEnd      = [ T[0], sliderNStart[1] ];

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var given   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var hidden  = [0,     0,   0,      0];
        var context = [0,     0,   0,      1];

        sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA = 1;

        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            context,
            'acE'  : given,
            'prT'  : given,
            'right-bars' : proof,
            'left-bars' : proof,
            'right-bars-breadths' : proof,
            'left-bars-breadths' : proof,
            'leftBarsArea' : proof,
            'rightBarsArea' : proof,
            'barsRatio' : result,
            'figuresRatio' : result,
            'ratio' : result,
        };
        sconf.MONO_BARS_COLOR = proof;

        //optional GUI sugar
        //matching bars:
        //patch which manually matches generated random zebra6-color for bar 1
        //when total bars max = 200:
        predefinedTopics[ 'left-bar-' +
            sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA ] = [254, 254, 1];
        predefinedTopics[ 'right-bar-' +
            sconf.INDIVIDUAL_BAR_INDEX_IN_LEMMA ] = [254, 254, 1];
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        /*
            //apparently this is not enough, need following in study-model.js
                //merges selected points with controls points
                var cPivots = sconf.originalPoints.curvePivots;
                //merges positions to help d8d
                rg.a.pos = cPivots[0].rgX.pos;
                rg.c.pos = cPivots[2].rgX.pos;
        */
        var curvePivots =
        [
            a,
            [ 108, 58 ],
            [ 156, 84 ],
            c,
            [ 283, 210 ],
            [ 305, 251 ],
            E,
        ];
        curvePivots = curvePivots.map( pivot => ({
            pos         : pivot,
            pcolor      : given,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            initialR : handleRadius,
        }));
        //merging with original points
        curvePivots[0].caption = 'a';
        curvePivots[3].caption = 'c';
        curvePivots[1].doPaintPname = false;
        curvePivots[2].doPaintPname = false;
        curvePivots[4].doPaintPname = false;
        curvePivots[5].doPaintPname = false;
        curvePivots[6].doPaintPname = false;
        curvePivots[ 0 ].draggableX = false;
        curvePivots[ curvePivots.length - 1 ].draggableX = false;
        //---------------------------------------------------
        var originalPoints =
        {
            curvePivots,
        };
        // \\// points to approximate and draw original curve
        //---------------------------------------------------




        //---------------------------------------------------
        // //\\ points to draw righ side curve
        //      coordinates are fake here,
        //      initially, they will be transformed
        //---------------------------------------------------
        var rightCurvePivots =
        [
            a,
            [ 108, 58 ],
            [ 156, 84 ],
            c,
            [ 283, 210 ],
            [ 305, 251 ],
            E,
        ];
        rightCurvePivots = rightCurvePivots.map( pivot => ({
            pos         : pivot,
            pcolor      : given,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname: false,
            initialR : handleRadius,
        }));
        rightCurvePivots[ 0 ].draggableX = false;
        rightCurvePivots[ rightCurvePivots.length - 1 ].draggableX = false;
        Object.assign( originalPoints, {
            rightCurvePivots
        });
        //---------------------------------------------------
        // \\// points to approximate and draw original curve
        //---------------------------------------------------

        //---------------------------------------------------
        // //\\ points to draw righ side curve
        //      coordinates are only for model here,
        //      points are invisible on GUI
        //---------------------------------------------------
        var rightCurvePivots_normalized =
        [
            a,
            [ 108, 58 ],
            [ 156, 84 ],
            c,
            [ 283, 210 ],
            [ 305, 251 ],
            E,
        ];
        rightCurvePivots_normalized = rightCurvePivots_normalized.map( pivot => ({
            pos             : pivot,
            undisplayAlways : true,
            doPaintPname    : false,
            //caption         : '',
        }));
        Object.assign( originalPoints, {
            rightCurvePivots_normalized
        });
        //---------------------------------------------------
        // \\// points to approximate and draw original curve
        //---------------------------------------------------

        Object.assign( originalPoints, {
            A : { 
                pos: A,
                pcolor : given,
                letterAngle : -90,
            },

            a : {
                pos: a,
                pcolor : given,
                letterAngle : 90,
                //avoids caption duplication for original points merfed with controls' points
                undisplayAlways : true,
                doPaintPname : false,
            },

            c : {
                pos: c,
                pcolor : given,
                letterAngle : 45,
                //avoids caption duplication for original points merfed with controls' points
                undisplayAlways : true,
                doPaintPname : false,
            },

            E : {
                pos: E,
                pcolor : given,
                letterAngle : -90,
            },

            P : {
                pos: P,
                pcolor : given,
                letterAngle : -90,
            },

            p : {
                pos: p,
                pcolor : given,
                letterRotRadius : 20,
                letterAngle : 180,
            },

            ortJ : {
                pos: [p[0], p[1] - ( P[1] - p[1] ) * sconf.ORT_J_SHIFT],
                caption : 'j',
                fontSize : Math.floor( fconf.LETTER_FONT_SIZE_PER_1000 * 1.3 ),
                pcolor : [0,0,0,1],
                letterAngle : 90,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : true,
            },

            ortI : {
                pos: [ P[0] + ( T[0]-P[0] ) * ( 1 + sconf.ORT_I_SHIFT ), T[1] ],
                caption : 'i',
                fontSize : Math.floor( fconf.LETTER_FONT_SIZE_PER_1000 * 1.3 ),
                pcolor : [0,0,0,1],
                letterRotRadius : 20,
                letterAngle : 0,
                draggableX  : true,
            },

            r : {
                pos: r,
                pcolor : given,
                letterAngle : 45,
            },


            T : {
                pos: T,
                pcolor : given,
                letterAngle : -90,
            },

            //---------------------------------------
            // //\\ slider
            //---------------------------------------
            countNSlider : {
                caption     : 'n',
                pos         : sliderNStart,
                pcolor      : context,
                doPaintPname: true,
                letterAngle : -90,
                draggableX  : true,
                sliderNStart,
                sliderNEnd,
                displayAlways : true,
                unscalable  : true,
            },

            sliderNStart : {
                caption     : '',
                pos         : sliderNStart,
                pcolor      : hidden,
                undisplayAlways : true,
                unscalable  : true,
            },

            sliderNEnd : {
                caption     : '',
                pos         : sliderNEnd,
                pcolor      : hidden,
                undisplayAlways : true,
                unscalable  : true,
            },
            //---------------------------------------
            // \\// slider
            //---------------------------------------
        });
        eachprop( originalPoints, op => {
            op.initialR = handleRadius;
        });

        //-----------------------------------
        // //\\ sets bars base points array
        //-----------------------------------
        originalPoints.bars =
        [
            ///will coinside with point A
            {
                pos: [A[0],A[1]],
                doPaintPname : false,
                undisplayAlways : true,
            },
            {
                //pos: [145,77],
                pos: [145,A[1]],
                pcolor : given,
                letterAngle : 45,
                draggableX : true,
                initialR : handleRadius,
            },
            {
                //pos: [210,122],
                pos: [210,A[1]],
                pcolor : given,
                letterAngle : 45,
                draggableX : true,
                //classmark : 'tp-individual-bar',
                initialR : handleRadius,
            },

            {
                //pos: [272,192],
                pos: [272,A[1]],
                pcolor : given,
                letterAngle : 45,
                draggableX : true,
                initialR : handleRadius,
            },
            ///will coinside with point E
            {
                pos: [E[0],E[1]],
                doPaintPname : false,
                undisplayAlways : true,
            },
        ]
        //for more options, see expands-conf.js
        originalPoints.bars.doPaintPname = false;
        for( wwix = BARS_NUMBER_INITIAL+1; wwix<BARS_NUMBER_MAX; wwix++ )
        {
            originalPoints.bars.push({
                pos: [100,A[1]], //fake
                pcolor : result,
                undisplayAlways : true,
            });
        }
        //-----------------------------------
        // \\// sets bars base points array
        //-----------------------------------


        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = ( originalPoints.A.pos[1] - originalPoints.a.pos[1] );

        var linesArray =
        [
            { 'Aa' : { pcolor : given }, },
            { 'AE' : { pcolor : given }, },
            { 'Pp' : { pcolor : given }, },
            { 'PT' : { pcolor : given }, },
            { 'sliderNStart,sliderNEnd' : { pcolor : context }, },
        ];

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;

        ns.paste( sconf, {
            default_tp_stroke_width,
            defaultLineWidth,
            handleRadius,

            mediaBgImage : "l4-diagram.png",
            predefinedTopics,
            originalPoints,
            linesArray,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
        });
        //--------------------------------------
        // \\// geometics parameters
        //--------------------------------------
    }
}) ();

