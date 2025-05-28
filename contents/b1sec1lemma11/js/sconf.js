
( function() {
    var { ns, fconf, sconf, fixedColors } =
        window.b$l.apptree({ ssFExportList : { init_conf } });
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
        sconf.enableTools               = false;
        sconf.rgShapesVisible           = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 441;
        var pictureHeight = 709;

        var originX_onPicture = 58; //for model's axis x
        var originY_onPicture = 60; //for model's axis y

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;
        //overrides "global", lemma.conf.js::sconf

        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;
        sconf.pointDecoration.r= 5;

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 22;
        sconf.default_tp_lightness = 30;
        sconf.default_tp_stroke_width = 8;
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),
        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js

  
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        //sconf.text_nonhover_width = 1;
        //sconf.nonhover_width = 4;

        sconf.text_hover_width = 2; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),

        //sconf.hover_width = 114; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------

        var A = [originX_onPicture, originY_onPicture];
        var D = [321, A[1]];
        var C = [A[0], 195];
        var B = [D[0], C[1]];

        var c = [A[0], 109];
        var c = [A[0], 113];
        var d = [235, A[1]];
        var b = [d[0], c[1]];

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            given,
            proof,
            result,
            hidden,
        } = fixedColors;

        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            'curve-AB'  : given,
            'arc-AB'    : given,
            'arc-Ab'    : proof,
            'AB2'       : given,
            'Ab2'       : proof,
            'AB2-Ab2'   : proof,
            'BD-bd'     : proof,
            'claimRatio': proof,
            'ratio'     : proof,
            'limitRatio': result,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------


        var originalPoints =
        {
            A : { 
                pos: A,
                pcolor : given,
                letterAngle : 90,
            },
            D : {
                pos: D,
                pcolor : given,
                letterAngle : 90,
            },

            B : {
                pos: B,
                pcolor : given,
                letterAngle : 0,
            },
            C : {
                pos: C,
                pcolor : given,
                letterAngle : 180,
            },

            c : {
                pos: c,
                pcolor : proof,
                letterAngle : 180,
            },
            b : {
                pos: b,
                pcolor : proof,
                letterAngle : 45,
            },
            d : {
                pos: d,
                pcolor : proof,
                letterAngle : 90,
            },

            J : {
                pos: [A[0], 584],
                pcolor : given,
                letterAngle : 180,
                letterRotRadius : 20, 
            },
            g :
            {
                pos: [A[0], 622],
                pcolor : proof,
                letterAngle : 45,
            },
            G :
            {
                pos: [A[0], 677],
                pcolor : given,
                letterAngle : -45,
            },
        };


        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = ( originalPoints.J.pos[1] - originalPoints.A.pos[1] ) / 2;

        var linesArray =
        [
            { 'AB' : { pcolor : given }, },
            { 'AD' : { pcolor : given }, },
            { 'BD' : { pcolor : given }, },
            { 'BC' : { pcolor : given }, },
            { 'AG' : { pcolor : given }, },
            { 'BG' : { pcolor : given }, },
            { 'GJ' : { pcolor : given }, },

            { 'Ab' : { pcolor : proof }, },
            { 'Ad' : { pcolor : proof }, },
            { 'Ag' : { pcolor : proof }, },
            { 'bc' : { pcolor : proof }, },
            { 'bd' : { pcolor : proof }, },
            { 'bg' : { pcolor : proof }, },

            { 'AJ' : { pcolor : given }, },
        ];

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;

        ns.paste( sconf, {
            mediaBgImage : "l11-diagram-3rded.jpg",
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

