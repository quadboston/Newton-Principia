
( function() {
    var { ns, sn, mat, fconf, sconf, stdMod, topicColors_repo, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    var op = sn( 'orbitParameters', sconf );
    var sop = sn( 'sampleOrbitParameters', sconf );
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        console.log('init P14/P16');
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
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 884;
        var pictureHeight = 733;

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
        var F = [ fconf.sappId === 'b1sec3prop16' ? 170 : 160,
            fconf.sappId === 'b1sec3prop16' ? 440 : 410
        ]; //x,y of whole svg model
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
        var mod2inn_scale = 260;

        //sets model offset
        op.mainAxisAngle_initial = 0;
        op.mainAxisAngle = op.mainAxisAngle_initial;
        op.delta_v_increase_LIMIT = 1.5;

        fconf.effId = 'b1sec3prop14';

        op.initialEccentricity = fconf.sappId === 'b1sec3prop16' ? 0.67 : 0.68;
        sconf.insertDelayedBatch = true;
        op.latusInitial = 0.83;
        var PparQ       = ( fconf.sappId === 'b1sec3prop16' ? 0.14 : 0.07 ) * Math.PI;
        {
            let sag_q = fconf.sappId === 'b1sec3prop16' ? 0.4 : 0.62;
            op.sagittaDelta_q_initial     = sag_q;
            op.Dt0 = sag_q * 2.5;
        }
        op.Dt = op.Dt0;
        op.delta_t_LIMIT = op.Dt0 * 1.5;
        sconf.Fi_distance = 1.8;

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
            orbitareaSample,
            orbitarea,
            instanttriangle,
            proof,
            result,
            force,
            shadow,
            hidden,
            curvature,
            context,
        } = topicColors_repo;
        let red = [255,0,0]; //for debugging

        var topicColors_elected =
        {
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            body,
            orbit               : orbit,
            'orbit-sample'      : given,
            orbitarea           : orbitarea,
            'orbitarea-sample'  : orbitareaSample,
            orbitdq             : orbit,
            'orbitdq-sample'    : given, //todm remove
            shadow,
            force               : result,
            instanttriangle     : instanttriangle,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints = {};
        Object.assign( originalPoints, {
            // common
            S : {
                pcolor : result,
                letterAngle : -115,
                letterRotRadius : 20,
            },
            P : {
                pcolor : body,
                letterAngle : fconf.sappId === 'b1sec3prop16' ? -90 :120
            },
            Fi : {
                caption : "φ",
                pcolor : shadow, //body,
                letterAngle : 120,
                draggableX  : true,
                draggableY  : true,
            },
            Q : {
                pcolor : proof,
                letterAngle : 225,
                letterRotRadius : 20,
            },
            L : {
                //no need: will be dynamic: caption : 'mmm',
                pcolor : orbit,
                letterAngle : -45,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },
            LL : {
                pcolor : orbit,
                doPaintPname : false,
            },
            A : {
                pcolor : orbit,
                letterRotRadius : 20,
                letterAngle : -90,
            },
            AA : {
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : orbit,
            },
            T : {
                pcolor : proof,
                //letterAngle : 180,
                letterRotRadius : 20,
            },
            R : {
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
            },
            Y : {
                pcolor : proof,
                letterAngle : 45,
            },            
            vb : { //speed of the body
                caption : '',
                pcolor : proof,
                letterAngle : 135,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },
            omegaHandle : {
                caption : 'ω',
                pcolor : shadow,
                letterAngle : 90,
                letterRotRadius : 17,
                draggableX  : true,
                draggableY  : true,
                fontSize : 20,
            },            
            C : { //center symmetry of orbit
                pcolor : orbit,
                letterAngle : -45,
            },
            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
            },

            // used for calcs only
            F : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : 135,
            },
            O : {
                pcolor : context,
                caption : 'O',
                pos: F,
                letterAngle : 45,
                letterRotRadius : 20,
            },
            H : {
                pcolor : proof,
                letterAngle : -90,
            },            
            B : {
                letterRotRadius : 20,
                pcolor : orbit,
            },
            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : orbit,
            },
            x : {
                caption : "𝑥",
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
            },
            Zminus : {
                caption : 'Z',
                pcolor : body,
                letterAngle : 145,
                letterRotRadius : 20,
            },

            // //\\ eccentricity slider
            Zeta : {
                caption : 'eccentricity, e',
                pos : [ pictureWidth * 0.5, pictureHeight * 0.92 ],
                pcolor : orbit,
                letterAngle : 90,
                letterRotRadius : 20,
                draggableX  : true,
                unscalable  : true,
            },
            ZetaCaption : {
                pos : [ pictureWidth * 0.5, pictureHeight * 0.97 ],
                pcolor : orbit,
                undisplayAlways : true,
                letterAngle : 90,
                letterRotRadius : 20,
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
            { SL : { pcolor : orbit, }, },
            { 'L,LL' : { 
                pcolor : orbit,
                captionShiftNorm : 22, 
                lposYSugar : 3 }, 
            },
            { Px : { pcolor : proof }, },
            { 'SP' : {
                pcolor : body,
                vectorTipIx : 1 },
            },
            { 'PY' : { pcolor : body }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'PR' : { pcolor : body, 'stroke-width' : 2, captionShiftNorm : -18, }, },
            { 'A,AA' : { pcolor : orbit }, },
            { 'ZetaStart,ZetaEnd' :
              { pcolor : orbit } 
            },
            { CA : { pcolor : proof }, },            
            { 'QR' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { PO : { pcolor : proof }, },
            { 'O,Fi' : { pcolor : shadow }, },

            { 'P,vb' : { 
                pcolor : body, 
                'stroke-width' : 2, 
                captionShiftNorm : -18,
                vectorTipIx : 1 }, 
            },

            { 'SY' : { 
                pcolor : proof,
                captionShiftNorm : -28 }, 
            },
            { 'P,omegaHandle' : { pcolor : context }, },
            { PQ : { pcolor : proof }, },

        ];

        //stdMod.init_sliders_conf();
        ns.paste( sconf, {
            mediaBgImage : "diagram.png",
            topicColors_elected,
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

