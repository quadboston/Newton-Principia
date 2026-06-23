(function(){
var { ns, nspaste, fconf, sconf, tprepo, tpelect } =
window.b$l.atree({ ssFList : { init_conf } });
return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //in particular, blocks zoom
        sconf.enableTools               = false;

        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var medWidth = 441;
        var medHeight = 709;

        var medposOfModOrigin_x = 58; //for model's axis x
        var medposOfModOrigin_y = 60; //for model's axis y

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var medsize = 2 * ( medWidth + medHeight ) / 2;
        var medsizeScale = medsize / sconf.medsize_standard

        //making size to better fit lemma's diagram
        sconf.LETTER_FONT_SIZE_PER_1000 = 20;
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
        default_tp_stroke_width = Math.floor( 6 * medsizeScale ),
        defaultLineWidth        = Math.floor( 1 * medsizeScale ),
        handleRadius            = Math.floor( 3 * medsizeScale ),
        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js


        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*medsizeScale/1.6 ) );
        //sconf.text_nonhover_width = 1;
        //sconf.nonhover_width = 4;

        sconf.text_hover_width = 2; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),

        //sconf.hover_width = 114; //needs hover-width cls at svg-text-el,
                                    //aka for: Δsin(φ),
        sconf.hover_width       = Math.max( 2, Math.floor( 7*medsizeScale/1.6 ) );
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------

        var A = [medposOfModOrigin_x, medposOfModOrigin_y];
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
			curvatureCircle,
			//givenHover,
        } = tprepo;

        nspaste( tpelect, { //need deep copy
            given,
            proof,
            result,
            hidden,
            curvatureCircle,
            'curve-AB'  : given,
            'arc-AB'    : given,
            'arc-Ab'    : proof,
            'AB2'       : given,
            'Ab2'       : proof,
            'Ab2-AB2'   : proof,
            'bd-BD'     : proof,
            'claimRatio': proof,
            'limitRatio': result,
        });
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
                pcolor : result,
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
        var mod2med = ( originalPoints.J.pos[1] - originalPoints.A.pos[1] ) / 2;

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

            { 'AJ' : { pcolor : result }, },
        ];

        //making size to better fit lemma's diagram
        sconf.LETTER_FONT_SIZE_PER_1000 = 20;

        nspaste( sconf, {
            mediaBgImage : "l11-diagram-3rded.jpg",
            originalPoints,
            linesArray,
            medposOfModOrigin_x,
            medposOfModOrigin_y,
            medWidth,
            medHeight,
            mod2med,
        });
        //--------------------------------------
        // \\// geometics parameters
        //--------------------------------------
        //*************************************
        // //\\ shapes
        //*************************************
        sconf.shapesArray = [
            {
                //todm apparently dummy and not used,
                //it seems will be good simulation
                rgn: 'curvatureCircle',
            }
        ];
        //*************************************
        // \\// shapes
        //*************************************
    }
})();