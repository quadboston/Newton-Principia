
( function() {
    var { ns, fconf, sconf } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;









    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        sconf.rgShapesVisible = true;

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = false;
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
        var given   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var hidden  = [0,     0,   0,      0];


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
            'Ab2-AB2'   : proof,
            'bd-BD'     : proof,
            'claimRatio': proof,
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

            { 'AJ' : { pcolor : result }, },
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

