
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

        fconf.effId = fconf.sappId === 'b1sec3prop14' ||
                      fconf.sappId === 'b1sec3prop15' ||
                      fconf.sappId === 'b1sec3prop16' ||
                      fconf.sappId === 'b1sec3prop17' ? 'b1sec3prop14' : fconf.sappId;

        switch ( fconf.sappId ) {
            case "b1sec3prop12" :

                //conic pars
                op.initialEccentricity = 1.365; //hyperbola
                op.latusInitial = 0.90;
                var PparQ = 0.49 * Math.PI;
                //decorations
                
                op.sagittaDelta_q_initial = 1;
                break;
            case "b1sec3prop13" :

                //conic pars
                op.latusInitial           = 2.10;
                op.initialEccentricity    = 1; //parabola
                var PparQ                 = 0.386 * Math.PI;
                //decorations
                op.sagittaDelta_q_initial = 0.39;
                break;

            default : //14,15,16
                op.initialEccentricity = fconf.sappId === 'b1sec3prop16' ? 0.67 : 0.68;
                sconf.insertDelayedBatch = true;
                op.latusInitial = 0.83;
                var PparQ       = ( fconf.sappId === 'b1sec3prop16' ? 0.14 : 0.07 ) * Math.PI;
                {
                    let sag_q = fconf.sappId === 'b1sec3prop16' ?
                        //0.2 :
                        0.4 :
                        //0.19;
                        0.62;
                    op.sagittaDelta_q_initial     = sag_q;
                    op.Dt0 = sag_q * 2.5;
                }
                op.Dt = op.Dt0;
                op.delta_t_LIMIT = op.Dt0 * 1.5;
                sconf.Fi_distance = 1.8;
        }
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
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            given,
            body,
            orbit,
            orbitareaSample,
            orbitarea,
            orbitareaHiddenStart,
            instanttriangle,
            instanttriangleHiddenStart,
            proof,
            proofHidden,
            result,
            force,
            shadow,
            hidden,
            curvature,
            context,
            attention,
        } = fixedColors;
        let red = [255,0,0]; //for debugging

        var p17_result_proof = proof;
        var p17_result_orbit = orbit;
        var p17_body_proof   = proof;
        var p17_force_result = result;

        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            body,
            orbit               : p17_result_orbit,
            'orbit-sample'      : given,
            orbitarea           : (fconf.effId === "b1sec3prop14" ? orbitarea : orbitareaHiddenStart),
            'orbitarea-sample'  : orbitareaSample,
            orbitdq             : p17_result_orbit,
            'orbitdq-sample'    : given, //todm remove
            shadow,
            force               : p17_force_result,
            instanttriangle     : (fconf.effId === "b1sec3prop14" ? instanttriangle : instanttriangleHiddenStart),
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints = {};
        Object.assign( originalPoints, {
            O : {
                pcolor : context,
                caption : 'O',
                pos: F,
                letterAngle : 45,
                letterRotRadius : 20,
            },

            //-----------------------------------------
            // //\\ Book's prop. 11
            //-----------------------------------------
            E : {
                pcolor : proof,
                letterRotRadius : 20,
                //letterAngle : 90,
            },
            H : {
                pcolor : p17_result_proof,
                letterAngle : -90,
            },
            I : {
                pcolor : proof,
                letterRotRadius : 20,
            },
            //-----------------------------------------
            // \\// Book's prop. 11
            //-----------------------------------------



            B : {
                letterRotRadius : 20,
                pcolor : p17_result_orbit,
            },

            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : p17_result_orbit,
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


            l : {
                //no need: will be dynamic: caption : 'mmm',
                pcolor : given,
                letterAngle : -45,
                letterRotRadius : 20,
            },

            ll : {
                pcolor : given,
                doPaintPname : false,
            },


            A : {
                pcolor : p17_result_orbit,
                letterRotRadius : 20,
                letterAngle : -90,
            },

            AA : {
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : p17_result_orbit,
            },


            D : {
                pcolor : p17_result_proof,
                letterRotRadius : 20,
                //letterAngle : 135,
            },

            K : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -60,
            },

            M : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },

            N : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },
            G : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : -45,
            },


            T : {
                pcolor : proof,
                //letterAngle : 180,
                letterRotRadius : 20,
            },

            R : {
                pcolor : p17_body_proof,
                letterAngle : -45,
                letterRotRadius : 20,
            },



            vSample : {
                ////prop17
                caption : 'r',
                pcolor : given,
                letterAngle : 135,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },


            Y : {
                pcolor : proof,
                letterAngle : 45,
            },

            //speed of the body
            vb : {
                caption : '',
                pcolor : p17_body_proof,
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


            f : {
                caption : '𝛾',
                pcolor : force,
                letterAngle : 90,
                letterRotRadius : 17,
                draggableX  : true,
                draggableY  : true,
                fontSize : 20,
            },

            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
            },


            Zminus : {
                caption : 'Z',
                pcolor : body,
                letterAngle : 145,
                letterRotRadius : 20,
                doPaintPname : "b1sec3prop13" !== fconf.sappId,
            },

            /*
            V : {
                pcolor : proof,
                letterAngle : -45,
            },
            */

            Ys : {
                caption : '',
                pcolor : proof,
                letterAngle : 45,
            },

            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
            },

            F : {
                pcolor : proof,
                letterRotRadius : 20,
                letterAngle : 135,
            },

            VV : {
                caption : 'V',
                pcolor : proof,
                letterAngle : -45,
            },


            //center symmetry of orbit
            C : {
                pcolor : p17_result_orbit,
                letterAngle : -45,
            },

            //----------------------------------------
            // //\\ Prop. 10 Book's "another solution"
            //----------------------------------------
            u : {
                caption : '𝑢',
                pcolor : p17_body_proof,
                letterAngle : -45,
                letterRotRadius : 15,
            },
            /*
            tCircleCenter : {
                caption : "C'",
                pcolor : curvature,
                letterAngle : -45,
            },
            */
            //----------------------------------------
            // \\// Prop. 10 Book's "another solution"
            //----------------------------------------



            //----------------------------------------
            // //\\ Prop. 11
            //----------------------------------------
            x : {
                caption : "𝑥",
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 20,
            },
            //----------------------------------------
            // \\// Prop. 11
            //----------------------------------------


            //---------------------------------------
            // //\\ draggable points
            //---------------------------------------
            S : {
                pcolor : result,
                letterAngle : -115,
                letterRotRadius : 20,
            },

            P : {
                pcolor : body,
                letterAngle : fconf.sappId === 'b1sec3prop16' ? -90 :
                                ( fconf.sappId === 'b1sec3prop17' ? 225 : 120 ),
                draggableY  : (fconf.sappId === 'b1sec3prop12' || fconf.sappId === 'b1sec3prop13'),
            },

            p : {
                pcolor : given,
                letterAngle : 120,
            },


            Fi : {
                caption : "φ",
                pcolor : shadow, //body,
                letterAngle : 120,
                draggableX  : true,
                draggableY  : true,
            },

            Q : {
                pcolor : p17_result_proof,
                letterAngle : 225,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },
            q : {
                ////prop17
                pcolor : given,
                letterAngle : -65,
                letterRotRadius : 20,
            },


            // //\\ eccentricity slider
            Zeta : {
                caption : 'eccentricity, e',
                pos : [ pictureWidth * 0.5, pictureHeight * 0.92 ],
                pcolor : p17_result_orbit,
                letterAngle : 90,
                letterRotRadius : 20,
                draggableX  : 'b1sec3prop13' !== fconf.sappId,
                undisplayAlways  : 'b1sec3prop13' === fconf.sappId,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },

            ZetaCaption : {
                pos : [ pictureWidth * 0.5, pictureHeight * 0.97 ],
                pcolor : p17_result_orbit,
                undisplayAlways : true,
                letterAngle : 90,
                letterRotRadius : 20,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },

            ZetaStart : {
                pos : [ pictureWidth * 0.1, pictureHeight * 0.92 ],
                pcolor : p17_result_orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },

            ZetaEnd : {
                pos : [ pictureWidth * 0.9, pictureHeight * 0.92 ],
                pcolor : p17_result_orbit,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },
            // \\// eccentricity slider
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        });

        var linesArray =
        [
            //-----------------------------------------
            // //\\ Book's prop. 11
            //-----------------------------------------
            { Qx : { pcolor : proof }, },
            { Px : { pcolor : proof }, },
            //todm: proliferation
            { EP : { pcolor : proof }, },
            { PE : { pcolor : proof }, },
            { ES : { pcolor : proof }, },
            { EI : { pcolor : proof }, },
            { EO : { pcolor : proof }, },
            { EC : { pcolor : proof }, },
            { PH : {
                        pcolor : proof,
                        vectorTipIx : 0,
                   },
            },
            { PK : { pcolor : attention }, },
            { SK : { pcolor : proof }, },
            { HI : { pcolor : proof }, },
            { BH : { pcolor : proof }, },
            //{ OS : { pcolor : proof }, },
            { OH : { pcolor : proof }, },
            { PI : { pcolor : proof }, },
            //-----------------------------------------
            // \\// Book's prop. 11
            //-----------------------------------------

            //{ 'CV' : { pcolor : curvature }, },
            { 'PC' : { pcolor : proof }, },
            { 'O,Fi' : { pcolor : shadow }, },

            { ST : { pcolor : proof, }, },

            { 'SY' : { pcolor : fconf.sappId === "b1sec3prop17" ? proofHidden : proof,
                       captionShiftNorm : -28 }, },
            { 'S,Ys' : { pcolor : fconf.sappId === "b1sec3prop17" ? proofHidden : proof,
                       captionShiftNorm : -28 }, },

            { 'PY' : { pcolor : body }, },
            { 'CS' : { pcolor : p17_result_proof }, },
            { 'CH' : { pcolor : proof }, },

            { 'P,Zminus' : { pcolor : body }, },
            { 'P,omegaHandle' : { pcolor : context }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },

            { 'PR' : { pcolor : body, 'stroke-width' : 2, captionShiftNorm : -18, }, },
            { 'P,vb' : { pcolor : body, 'stroke-width' : 2, captionShiftNorm : -18,
                       vectorTipIx : 1 }, },
            { 'p,vSample' : { pcolor : given, 'stroke-width' : 1.1, captionShiftNorm : -18,
                       vectorTipIx : 1 }, },
            { 'p,f' : { pcolor : force, 'stroke-width' : 1.1, captionShiftNorm : -18,
                       vectorTipIx : 1 }, },

            { 'QR' : { pcolor : p17_result_proof }, },
            //{ 'SQ' : { pcolor : proof }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { DK : { pcolor : proof }, },
            { DS : { pcolor : proof }, },
            { DH : { pcolor : p17_result_proof }, },
            { PM : { pcolor : body }, },
            { SM : { pcolor : body }, },

            { OM : { pcolor : proof }, },
            { ON : { pcolor : proof }, },
            { NS : { pcolor : proof }, },
            { SA : { pcolor : p17_result_proof }, },
            { NP : { pcolor : proof }, },

            { GP : { pcolor : proof }, },
            { Qv : { pcolor : proof }, },
            { Pv : { pcolor : proof }, },
            { Tv : { pcolor : proof }, },
            { xv : { pcolor : proof }, },
            { Tx : { pcolor : proof }, },

            { Gv : { pcolor : proof }, },
            { PF : { pcolor : proof }, },
            { 'A,AA' : { pcolor : p17_result_orbit }, },
            { 'B,BB' : { pcolor : p17_result_orbit }, },
            //{ AO : { pcolor : p17_result_orbit }, },
            { AT : { pcolor : proof }, },
            { CA : { pcolor : p17_result_proof }, },

            //{ DO : { pcolor : p17_result_proof }, },
            //{ BO : { pcolor : p17_result_proof }, },
            { CB : { pcolor : p17_result_proof }, },
            //{ 'L,LL' : { pcolor : proof, caption : 'L/2',
            //             captionShiftNorm : -18, fontSize : 20, }, },
            { 'L,LL' : { pcolor : p17_result_orbit,
               captionShiftNorm : 22, lposYSugar : 3 }, },
            { 'l,ll' : { pcolor : given,
               captionShiftNorm : 44, lposYSugar : -5, }, },
            { SL : { pcolor : orbit, }, },
            { CD : { pcolor : p17_result_proof }, },

            { PO : { pcolor : proof }, },
            //{ GO : { pcolor : proof }, },
            { FO : { pcolor : proof }, },
            { 'SP' : {
                    pcolor : fconf.sappId === "b1sec3prop17" ? body : body,
                    vectorTipIx : 1 },
            },
            { 'Sp' : { pcolor : given, 'stroke-width' : 1.1, captionShiftNorm : -18,
                       vectorTipIx : 1 }, },

            //Book's "another solution"
            { Tu : { pcolor : proof }, },
            { 'u,VV' : { pcolor : proof }, },
            { uP : { pcolor : proof }, },
            { PQ : { pcolor : proof }, },
            { 'P,VV' : { pcolor : proof }, },
            { 'ZetaStart,ZetaEnd' :
              { pcolor : p17_result_orbit } 
            },
        ];

        //stdMod.init_sliders_conf();
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

