
( function() {
    var {
        ns,
        fconf,
        sconf
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
        sconf.rgShapesVisible = true;

        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 699;
        var pictureHeight = 375;

        var originX_onPicture = 80; //for model's axis x
        var originY_onPicture = 329; //for model's axis y

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
            'acE'  : given,
            'prT'  : given,
            'right-bars' : proof,
            'left-bars' : proof,
            'right-bars-breadths' : proof,
            'left-bars-breadths' : proof,

            //optional GUI sugar
            //matching bars:
            'left-bar-1' : [0,50,100],
            'right-bar-1' : [0,50,100],
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints =
        {
            A : { 
                pos: A,
                pcolor : given,
                letterAngle : -90,
            },

            a : {
                pos: a,
                pcolor : given,
                letterAngle : 90,
            },

            c : {
                pos: c,
                pcolor : given,
                letterAngle : 45,
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
                letterAngle : 90,
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
        };


        //-----------------------------------
        // //\\ sets bars base points array
        //-----------------------------------
        originalPoints.bars =
        [
            {
                //pos: [145,77],
                pos: [145,A[1]],
                pcolor : given,
                letterAngle : 45,
            },
            {
                //pos: [210,122],
                pos: [210,A[1]],
                pcolor : given,
                letterAngle : 45,
            },

            {
                //pos: [272,192],
                pos: [272,A[1]],
                pcolor : given,
                letterAngle : 45,
            },
        ]
        //for more options, see expands-conf.js
        originalPoints.bars.doPaintPname = false;
        originalPoints.bars.draggableX = true;
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
        ];

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;

        ns.paste( sconf, {
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

