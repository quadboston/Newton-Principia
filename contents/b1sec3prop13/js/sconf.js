
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
        var pictureWidth = 938;
        var pictureHeight = 611;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize;

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;
        
        fconf.DRAGGER_TOLERANCE = 15; // distance where crosshair appears

        // override engine defaults, in expands-conf.js,
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3.5 * controlsScale ),        
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
        var posF = [ 560, 554 ]; //x,y of whole svg model
        sconf.diagramOrigin = [ 0, 0 ];
        var originX_onPicture = posF[0]; //for model's axis x
        var originY_onPicture = posF[1]; //for model's axis y
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
        op.latusInitial           = 2.10;
        op.initialEccentricity    = 1; //parabola
        var PparQ                 = 0.386 * Math.PI;
        
        op.sagittaDelta_q_initial = 0.39;

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
            L : {
                pcolor : orbit,
				doPaintPname : false,
 				undisplayAlways : true,
            },
            LL : {
                pcolor : orbit,
                doPaintPname : false,
				undisplayAlways : true,
            },

            A : {
                pcolor : orbit,
				letterRotRadius : 25,
                letterAngle : -90,
 				cssClass: 'subessay--solution',
            },
            M : {
                pcolor : proof,
				letterRotRadius : 25,
                letterAngle : -90,
 				cssClass: 'subessay--solution',
            },
            N : {
                pcolor : proof,
                letterRotRadius : 25,
                letterAngle : 125,
 				cssClass: 'subessay--solution',
            },
            T : {
                pcolor : proof,
                letterRotRadius : 20,
 				cssClass: 'subessay--solution subessay--corollary2',
            },
            R : {
                pcolor : proof,
                letterAngle : 135,
                letterRotRadius : 25,
 				cssClass: 'subessay--solution logic_phase--corollary',
            },
            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
 				cssClass: 'subessay--solution',
           },            
            x : {
                caption : "𝑥",
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
				cssClass: 'subessay--solution',
            },
            S : {
                pcolor : result,
                letterAngle : -90,
                letterRotRadius : 25,
            },
            P : {
                pcolor : body,
                letterAngle : 120,
                draggableY  : true,
            },
            Q : {
                pcolor : proof,
                letterAngle : -90,
                letterRotRadius : 25,
                draggableX  : true,
                draggableY  : true,
				cssClass: 'subessay--solution subessay--corollary2',
                conditionalDrag : 'subessay--solution subessay--corollary2',
            },
            AA : {
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : orbit,
            },
            G : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
				cssClass: 'subessay--solution',
            },
            Zminus : {
                caption : 'Z',
                pcolor : body,
                letterAngle : 145,
                letterRotRadius : 20,
                doPaintPname : "b1sec3prop13" !== fconf.sappId,
 				cssClass: 'subessay--solution',
            },

            // //\\ eccentricity slider
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

            // not used but calculated in model-upcreate for P12
            // todo: if splitting P12 from P13 model-upcreate, can delete
            C : { //center symmetry of orbit
                pcolor : orbit,
                letterAngle : -45,
            },
            H : {
                pcolor : proof,
                letterAngle : -90,
            },
            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
 				cssClass: 'subessay--solution',
            },
            O : {
                pos: posF,
                doPaintPname : false,
				undisplayAlways : true,
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
            B : {
                letterRotRadius : 20,
                pcolor : orbit,
            },             
            BB : { // opposite B
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : orbit,
            },
            E : {
                pcolor : proof,
                letterRotRadius : 20,
            }, 
            I : {
                pcolor : proof,
                letterRotRadius : 20,
            },

        });

		const proofSolution = { pcolor : body,
 				cssClass: 'subessay--solution', };

        var linesArray =
        [
			{ QR : { pcolor : proof,
 				cssClass: 'subessay--solution subessay--corollary2', }, },
            { QT : { pcolor : proof,
 				cssClass: 'subessay--solution subessay--corollary2', }, },
            { SP : { pcolor : body,
 				cssClass: 'subessay--solution logic_phase--corollary', }, },
            { PM : { pcolor : body,
 				cssClass: 'subessay--solution', }, },
            { SM : proofSolution },
            { GP : proofSolution },
            { NS : proofSolution },
            { NP :  proofSolution },
            { Pv :  proofSolution },
            { Qv :  proofSolution }, 
            { Qx :  proofSolution },  
            { Px :  proofSolution },
            { Tx :  proofSolution },
            { SA :  proofSolution },
            { xv :  proofSolution },

            // tangent
            { 'PR' : { 
                pcolor : body, 
                'stroke-width' : 2, 
                captionShiftNorm : -18,
				cssClass: 'subessay--solution logic_phase--corollary', }, 
            },                
            { 'P,Zminus' : { pcolor : body,
 				cssClass: 'subessay--solution', }, },

            // base line
            { 'A,AA' : { pcolor : orbit,
 				cssClass: 'subessay--solution', }, },

            { 'L,LL' : { pcolor : resultOnlyVisibleWhenHighlighted,
               captionShiftNorm : 22, lposYSugar : 3 }, },
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

