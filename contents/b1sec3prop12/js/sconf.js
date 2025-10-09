
( function() {
    var { ns, sn, mat, fconf, sconf, stdMod, fixedColors, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    var op = sn( 'orbitParameters', sconf );
    var sop = sn( 'sampleOrbitParameters', sconf );
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        console.log('init P12');
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
        sconf.rgShapesVisible           = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //media
        var pictureWidth = 690;
        var pictureHeight = 836; //728;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize;

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;

        // override engine defaults, in expands-conf.js,
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),        
        sconf.pointDecoration.r = handleRadius;
        sconf.default_tp_lightness = 30;

        // principal tp-css pars; see: topics-media-glocss.js
        // this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
        sconf.text_hover_width      = 1.5;

        // points reused in config      
        var F = [ 492, 565 ]; //x,y of whole svg model
        sconf.diagramOrigin = [ 0, 0 ];
        var originX_onPicture = F[0]; //for model's axis x
        var originY_onPicture = F[1]; //for model's axis y
        //***************************************************************
        // \\// decorational parameters
        //***************************************************************

        //gravitational constant
        var Kepler_g = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
        op.Kepler_g = op.Kepler_gInitial = Kepler_g;
        sop.Kepler_g = sop.Kepler_gInitial = Kepler_g;

        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 145;

        //sets model offset
        op.mainAxisAngle_initial = 0;
        op.mainAxisAngle = op.mainAxisAngle_initial;
        op.delta_v_increase_LIMIT = 1.5;

        //conic pars
        op.initialEccentricity = 1.365; //hyperbola
        op.latusInitial = 0.90;
        var PparQ = 0.49 * Math.PI;
        
        op.sagittaDelta_q_initial = 1;
               
        op.PparQ_initial        = PparQ;
        op.PparQ_initial_essay  = PparQ;
        op.sagittaDelta_q       = op.sagittaDelta_q_initial;

        //-----------------------------------------------------
        // //\\ sets Kepler_v
        //-----------------------------------------------------
        op.latus = op.latusInitial;
        stdMod.establishesEccentricity( op.initialEccentricity );
        var { Kepler_v, cosOmega, om } = mat.conics.innerPars2innerPars({
                lat         : op.latusInitial,
                fi          : PparQ,
                e           : op.initialEccentricity,
                Kepler_g    : op.Kepler_g,
        });
        //saves initial speed
        op.cosOmega             = cosOmega;
        op.om                   = om;
        op.cosOmega_initial     = cosOmega;
        op.om_initial           = om;
        op.Kepler_v_initial     = Kepler_v;
        op.Kepler_v             = op.Kepler_v_initial;
        //-----------------------------------------------------
        // \\// sets Kepler_v
        //-----------------------------------------------------


        //-----------------------------------
        // //\\ topic group colors
        //-----------------------------------
        const {
            given,
            body,
            orbit,
            instanttriangleHiddenStart,
            resultOnlyVisibleWhenHighlighted,
            proof,
            result,
            shadow,
            hidden,
            curvature,
            context,
        } = fixedColors;
        let red = [255,0,0]; //for debugging

        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            body,
            orbit               : orbit,
            orbitdq             : orbit,
            shadow,
            force               : result,
            instanttriangle     : instanttriangleHiddenStart,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints = {};
        Object.assign( originalPoints, {
            // hyperbola
            S : {
                pcolor : result,
                letterAngle : -115,
                letterRotRadius : 20,
            },
            P : {
                pcolor : body,
                letterAngle : 120,
                draggableY  : true,
            },
            LL : { // opposite of P, unlabelled
                doPaintPname : false,
				undisplayAlways : true,
            },
            A : {
                pcolor : orbit,
                letterRotRadius : 20,
                letterAngle : -90,
            },            
            AA : { // opposite A
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : orbit,
            },
            B : {
                letterRotRadius : 20,
                pcolor : orbit,
            },            
            BB : { // opposite B
                doPaintPname : false,
                pcolor : orbit,
            },
            C : { //center symmetry of orbit
                pcolor : orbit,
                letterAngle : -45,
            },
            Zminus : {
                caption : 'Z',
                pcolor : body,
                letterAngle : 145,
                letterRotRadius : 20,
            },
            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
            },
            Q : {
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },


            // triangle
            G : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },
            D : {
                pcolor : proof,
                letterRotRadius : 20,
                //letterAngle : 135,
            },
            K : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -60,
            },
            F : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : 135,
            },
            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
            },
            E : {
                pcolor : proof,
                letterRotRadius : 20,
                //letterAngle : 90,
            },            
            x : {
                caption : "𝑥",
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
            },
            R : {
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
            },
            
            H : {
                pcolor : proof,
                letterAngle : -90,
            },
            I : {
                pcolor : proof,
                letterRotRadius : 20,
            },
            T : {
                pcolor : proof,
                //letterAngle : 180,
                letterRotRadius : 20,
            },
            O : {
                pcolor : context,
                caption : 'O',
                pos: F,
                letterAngle : 45,
                letterRotRadius : 20,
            },

            L : { // not shown, but mentionned in text
                pcolor : orbit,
                letterAngle : -45,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },

            // eccentricity slider
            Zeta : {
                caption : 'eccentricity, e',
                pos : [ pictureWidth * 0.5, pictureHeight * 0.92 ],
                pcolor : orbit,
                letterAngle : 90,
                letterRotRadius : 20,
                draggableX  : 'b1sec3prop13' !== fconf.sappId,
                undisplayAlways  : 'b1sec3prop13' === fconf.sappId,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },
            ZetaCaption : {
                pos : [ pictureWidth * 0.5, pictureHeight * 0.97 ],
                pcolor : orbit,
                undisplayAlways : true,
                letterAngle : 90,
                letterRotRadius : 20,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },
            ZetaStart : {
                pos : [ pictureWidth * 0.1, pictureHeight * 0.92 ],
                pcolor : orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },
            ZetaEnd : {
                pos : [ pictureWidth * 0.9, pictureHeight * 0.92 ],
                pcolor : orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },

        });

        var linesArray =
        [
            // hyperbola
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'PR' : { pcolor : body, 'stroke-width' : 2, 
                captionShiftNorm : -18, }, },
            { 'SP' : { pcolor : body },},            
            { 'B,BB' : { pcolor : orbit }, },

            // triangle            
            { CA : { pcolor : proof }, },
            { CB : { pcolor : proof }, },
            { GP : { pcolor : proof }, },
            { DK : { pcolor : proof }, },
            { PF : { pcolor : proof }, },            
            { Qv : { pcolor : proof }, },
            { QR : { pcolor : proof }, },
            { Qx : { pcolor : proof }, },
            { Px : { pcolor : proof }, },
            
            { EP : { pcolor : proof }, },            
            { HI : { pcolor : proof }, },
            { EC : { pcolor : proof }, },
            { ES : { pcolor : proof }, },
            { EI : { pcolor : proof }, },
            { CS : { pcolor : proof }, },
            { CH : { pcolor : proof }, },
            { PI : { pcolor : proof }, },
            { PH : { pcolor : proof, },},
            
            { QT : { pcolor : proof }, },
            { PT : { pcolor : proof }, },
            { AT : { pcolor : proof }, },
            { Pv : { pcolor : proof }, },            
            { xv : { pcolor : proof }, },
            { PC : { pcolor : proof }, },
            { PE : { pcolor : proof }, },
            { Gv : { pcolor : proof }, },
            { CD : { pcolor : proof }, },

            { 'L,LL' : { pcolor : resultOnlyVisibleWhenHighlighted,
               captionShiftNorm : 22, lposYSugar : 3 }, },

            // e slider
            { 'ZetaStart,ZetaEnd' :
              { pcolor : orbit } 
            },
        ];

        ns.paste( sconf, {
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
    }
}) ();

