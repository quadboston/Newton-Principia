( function() {
    const { nspaste, fconf, sconf } = window.b$l.apptree({
        ssFExportList : { init_conf }
    });
    return;


    function init_conf()
    {
        //tools
        sconf.enableStudylab = false;
        //true enables framework zoom:
        sconf.enableTools = true;

        //navigation
        sconf.FIXED_CHORD_LENGTH_WHEN_DRAGGING = false;
        sconf.GO_AROUND_CURVE_PIVOTS_WHEN_DRAG_OTHER_HANDLES = false;


        //***************************************************************
        // //\\ original picture dimensions for svg scene
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 892;
        var pictureHeight = 840;
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        var A = [785, 441];
        var V = [64, 462 ];
        var S = [207, 403];
        var P = [693, 213];
        var Q = [646.0, 168.0 ];

        let C;
        let RR;
        {
            const ww1 = A[0]-V[0];
            RR = ww1*ww1;
            const ww2 = A[1]-V[1];
            RR += ww2*ww2;
            RR = Math.sqrt( RR ) / 2;
            C = [ V[0] + ww1/2, V[1] + ww2/2, ];
        }
 
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = RR;

        sconf.prop7R = 1;
        sconf.prop7Center = [ 0, 0 ];
        //***************************************************************
        // \\// original picture dimensions for svg scene
        //***************************************************************


        //***************************************************************
        // //\\ GUI cosmetics
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;

        sconf.TP_OPACITY_FROM_fixed_colors = true;
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;

        //--------------------------------------
        // //\\ these do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 8 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 4 * controlsScale ),

        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 9*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        //overrides hover_width for texts
        //for activation, needs class "hover-width" in element

        //sconf.text_nonhover_width   = 1000; //todm why such a big value?
        //sconf.text_hover_width      = 2000;
        sconf.text_nonhover_width   = 1;
        sconf.text_hover_width      = 1;
        // \\// principal tp-css pars

        //--------------------------------------
        // \\// these do override engine defaults,
        //***************************************************************
        // \\// GUI cosmetics
        //***************************************************************


        //******************************************
        // //\\ model principals parameters
        //******************************************
        //pos of P
        //s/sconf.parQ = 0.250;
        //s/sconf.orbit_q_start = 0;
        //s/sconf.orbit_q_end = 1;
        sconf.tForSagitta0 = 0.168;

        //the law to be studied in given lemma:
        //fe: for 1/r^2, the assigment is
        //    sconf.force_law = bP => 1/(bP.r2);
        //null means that program will calculated the law
        //based on dt -> 0:
        sconf.force_law = null;

        //******************************************
        // \\// model principals parameters
        //******************************************


        //***************************************************************
        // //\\ math model auxilaries
        //***************************************************************

        //calculation decoration and quality
        sconf.BESIER_PIVOTS = 0; //5; //otherwise assumed 9 pivots
        sconf.ADDENDUM_NORM_BY_MIN = true;
        sconf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN = true; //only for non addendum
        //***************************************************************
        // \\// math model auxilaries
        //***************************************************************


        //***************************************************************
        // //\\ model comparison demo
        //***************************************************************
        sconf.SHOW_FORMULAS = [
            //usually, bP is context of "plane-cureve-derivatives"  
            { label:'1/r⁵',
              fun:(bP) => { const r2 = bP.r2;  return 1/(r2*r2*bP.r);},
              //e// cssclass : 'tp-context tostroke',
            }, 
            { label:'1/r²',
              fun:(bP) => 1/bP.r2,
            }, 
        ];
        //***************************************************************
        // \\// model comparison demo
        //***************************************************************


        //*************************************
        // //\\ topic group colors,
        //*************************************
        var estimatedForce = [100,50,0];
        var fQR = estimatedForce;
        var sagitta = [100,0,100];
        var orbit   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var curvature  = [200,   40,  200, 1];
        var timeColor  = [200,  0,  255, 1];
        //e/var displacement = [200,   0,  200, 1];
        var body    = [0,     150,  200,   1];
        var dtime   = [0,     150,  200,  1];
        var hidden  = [0,     0,   0,      0];
        var context = [0,     0,   0,      1];
        var force = [255,    0,  0,      1];
        var invalid = [0,     0,   0,      1];
        var chord = [0,0,255, 1];

        var predefinedTopics =
        {
            estimatedForce,
            fQR,
            body,
            force,
            sagitta,
            chord,
            invalid,
            proof,
            hidden,
            context,
            curvature,
            dtime,
            time    : timeColor,
            curvatureCircle : curvature,
            orbit,
            timearc : proof,
            APQ     : orbit,
        };
        //*************************************
        // \\// topic group colors,
        //*************************************

        /*
            //apparently this is not enough, need following in study-model.js
                //except point P which will be user-slided along curve,
                //merges selected points with controls points
                var cPivots = sconf.originalPoints.curvePivots;
                //merges positions to help d8d
                rg.a.pos = cPivots[0].rgX.pos;
                rg.c.pos = cPivots[2].rgX.pos;
        */
        var foldPoints  = (new Array(200)).fill({}).map( fp => ({
            pcolor      : invalid,
            doPaintPname : false,
        }));


        //*************************************
        // //\\ original app points
        //*************************************
        var originalPoints =
        {
            foldPoints,
        };

        Object.assign( originalPoints, {
            //e/ X : {
            //e/    cssClass : 'tp-dtime',
            //e/    pos: S,
            //e/    pcolor : force,
            //e/    letterAngle : -90,
            //e/    letterRotRadius : 40,
            //e/    draggableX  : true,
            //e/    draggableY  : fconf.sappId === 'b1sec2prop7',
            //e/    initialR    : 5 * controlsScale,
            //e/    fontSize : 30,
            //e/    undisplayAlways : true,
            //e/    doPaintPname : false,
            //e/},
            S : {
                pos: S,
                pcolor : force,
                letterAngle : -90,
                draggableX  : true,
                draggableY  : true,
                initialR    : 5,
            },
            P : {
                pos: P,
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },
            Q : {
                pos: Q,
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
                draggableX  : true,
                draggableY  : fconf.sappId === 'b1sec2prop7',
            },
            QtimeDecor : {
                undisplayAlways : true,
                //pos: will be as Q, 
                cssClass : 'tp-dtime',
                pcolor : dtime, //proof,
                fontSize : 30,
                letterAngle : 225,
                letterShift : [30,0],
                letterRotRadius : 180,
            },
            R : {
                pcolor : proof,
                letterAngle : 45,
            },
            T : {
                pcolor : proof,
                letterAngle : 180,
            },
            Z : {
                pcolor : body,
                letterAngle : 45,
            },
            Zminus : {
                pcolor : body,
                letterAngle : 45,
                //undisplay : true,
                undisplayAlways : true,
                doPaintPname : false,
            },
            V : {
                pos: V,
                pcolor : curvature,
                letterAngle : -45,
            },
            //?center of instant curvature circle
            C : {
                pos : C,
                caption : 'Rc',
                pcolor : curvature,
                letterAngle : -45,
            },
            Y : {
                pos: Q,
                pcolor : proof,
                letterAngle : -90,
            },
            L : {
                pcolor : curvature,
                letterAngle : -45,
            },
            A : {
                pos: A,
                pcolor : orbit,
                //letterAngle : -90,
                //undisplayAlways : true,
                //doPaintPname : false,
            },
            rrminus : {
                caption : 'Q-',
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 40,
            },
            sagitta : {
                caption : 'I',
                //pos: Q,
                pcolor : sagitta,
                letterAngle : 270,
                letterRotRadius : 35,
                //initial setting does not work well bs poor code design
                //undisplay : true,
            },
            nonSolvablePoint : {
                pos: [0,0], //will be calculated
                caption : 'Orbits are disconnected.',
                fontSize : '25',
                /*
                //no dice:
                title : 'Kepler force does not exist ' +
                        'in neighborhood of this point.',
                */
                undisplayAlways : true,
                pcolor : invalid,
                letterAngle : 0,
            },

            //col2
            Tcol2 : {
                caption : 'T',
                pcolor : curvature,
                letterAngle : -45,
            },
            Rcol2 : {
                ////for corollary2, second center of force
                caption : 'R',
                pcolor : curvature,
                letterAngle : -45,
                draggableX  : true,
                draggableY  : true,
            },
            Gcol2 : {
                caption : 'G',
                pcolor : curvature,
                letterAngle : -45,
            },
        });
        //*************************************
        // \\// original app points
        //*************************************


        //*************************************
        // //\\ original app lines
        //*************************************
        var linesArray =
        [
            { 'SP' : { pcolor : body }, },
            { 'PV' : { pcolor : proof }, },
            { 'PR' : { pcolor : body }, },
            { 'SY' : { pcolor : proof }, },
            { 'QR' : { pcolor : proof }, },
            { 'QP' : { pcolor : proof }, },
            { 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },
            { 'PC' : { pcolor : curvature }, },
            { 'PY' : { pcolor : body }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'ZQ' : { pcolor : body }, },
            { 'AV' : { pcolor : proof }, },
            { 'AP' : { pcolor : proof }, },
            { 'RL' : { pcolor : proof }, },
            { 'P,rrminus' : { pcolor : proof }, },
            { 'P,sagitta' : { pcolor : sagitta, vectorTipIx : 1 } },
            { 'Q,rrminus' : { pcolor : proof }, },

            //col2
            { 'Rcol2,P' : { pcolor : [150, 0, 150] }, },
            { 'Rcol2,Tcol2' : { pcolor : proof }, },
            { 'Tcol2,V' : { pcolor : proof }, },
            { 'Gcol2,S' : { pcolor : proof }, },
            { 'Gcol2,P' : { pcolor : proof }, },
            { 'S,nonSolvablePoint' : { pcolor : invalid }, },
        ];
        //*************************************
        // \\// original app lines
        //*************************************


        //*************************************
        // //\\ passing locals to sconf
        //*************************************
        nspaste( sconf, {
            mediaBgImage : "diagram.png",
            predefinedTopics,
            originalPoints,
            linesArray,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,

            default_tp_stroke_width,
            defaultLineWidth,
            handleRadius,
        });
        sconf.pointDecoration.r = sconf.handleRadius;
        //*************************************
        // \\// passing locals to sconf
        //*************************************
    }
})();
