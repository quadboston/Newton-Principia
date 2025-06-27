
( function() {
    var { ns, sn, mat, fconf, sconf, rg, stdMod, fixedColors, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    var op = sn( 'orbitParameters', sconf );
    var sop = sn( 'sampleOrbitParameters', sconf );
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //console.log('sconf.js init_conf'); //called once on page load
        
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
        sconf.rgShapesVisible           = true; // setting to false removes S, SA, P, SP, eccentricity label and line (not dot)
        sconf.default_tp_lightness = 30;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //sets model offset
        op.mainAxisAngle_initial = 0;
        op.mainAxisAngle = op.mainAxisAngle_initial;
        op.delta_v_increase_LIMIT = 1.5;

        //sets cinematics
        var Kepler_g        = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
        op.Kepler_g         = Kepler_g;
        op.Kepler_gInitial  = Kepler_g;
        sop.Kepler_g        = Kepler_g;
        sop.Kepler_gInitial = Kepler_g;


        //====================================================
        // //\\ b1sec3prop17
        //====================================================
        //media
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 1037;
        var pictureHeight = 765;
        var mod2inn_scale = 260; //model's spacial unit expressed in pixels of the picture, vital to set to non-0 value
        var forceHandleInitial = 0.8; //todm fix
        var F = [ 350, 410 ];
        sconf.Fi_distance = 1.8;
        sconf.insertDelayedBatch = true;

        //-------------------------------------------
        // //\\ sop (green circle)
        //-------------------------------------------
        //sets cinematics
        sop.latusInitial       = 1;
        sop.latus              = sop.latusInitial;
        sop.forceHandleInitial = forceHandleInitial;
        sop.forceHandle        = forceHandleInitial;
        {
            //Book's diagram values
            let r             = 1.30307;
            let r2axisX_angle = 2.24;
            let sin2speed     = 0.999;
            //Book's derivative values
            let eta = sop.latus / r;
            let e   = Math.sqrt( eta*eta / sin2speed / sin2speed - 2 * eta + 1 );
            let fi  = Math.acos( (1-eta)/e );

            //sop.latusInitial is already saved
            sop.r = r;
            sop.PparQ_initial = fi;
            sop.initialEccentricity = e;
            //diagram valuse:
            sop.r2axisX_angle = r2axisX_angle;
            sop.r2axisX_angle_initial = r2axisX_angle;
            //derived
            sop.mainAxisAngle = sop.r2axisX_angle - sop.PparQ_initial;
        }
        stdMod.establishesEccentricity( sop.initialEccentricity, null, sop ); 
        sop.sagittaDelta_q_initial = 0.4;//decoration
        //-------------------------------------------
        // \\// sop
        //-------------------------------------------

        //-------------------------------------------
        // //\\ op (brown ellipse)
        //-------------------------------------------
        op.latusInitial         = 0.93;
        op.latus                = op.latusInitial;
        op.initialEccentricity  = 0.60; // change this to 1 to test parabola condition
        var PparQ = 0.39 * Math.PI;
        {
            let sag_init                    = 0.16;
            op.sagittaDelta_q_initial       = sag_init;
            //in this prop, using delta_t instead of delta_q
            op.delta_t_initial              = sag_init * 2.5;
            op.delta_t                      = op.delta_t_initial;
            op.delta_t_LIMIT                = op.delta_t_initial * 1.5;
        }

        //-----------------------------------------
        // //\\ defines sample speed
        //-----------------------------------------
        var { Kepler_v, cosOmega, om } = mat.conics.innerPars2innerPars({
                lat         : sop.latusInitial,
                fi          : sop.PparQ_initial,
                e           : sop.initialEccentricity,
                Kepler_g    : sop.Kepler_g,
        })
        sop.Kepler_v         = Kepler_v;
        sop.Kepler_v_initial = Kepler_v;
        sop.cosOmega         = cosOmega;
        sop.om               = om;
        sop.cosOmega_initial = cosOmega;
        sop.om_initial       = om;
        //-----------------------------------------
        // \\// defines sample speed
        //-----------------------------------------
        //====================================================
        // \\// b1sec3prop17
        //====================================================


        op.PparQ_initial        = PparQ;
        op.PparQ_initial_essay  = PparQ;
        op.sagittaDelta_q       = op.sagittaDelta_q_initial;

        //-----------------------------------------------------
        // //\\ sets Kepler_v
        //-----------------------------------------------------
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


        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;

        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = 3;

        //--------------------------------------
        // //\\ do override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),
        // //\\ principal tp-css pars
        //      see: topics-media-glocss.js
        //this makes hanle's border nicely thin
        sconf.nonhover_width    = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width       = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
        sconf.text_hover_width      = 1.5;
        // \\// principal tp-css pars
        //--------------------------------------
        // \\// do override engine defaults,
        //--------------------------------------
        //***************************************************************
        // \\// decorational parameters
        //***************************************************************


        //=============================================
        // //\\ points reused in config
        //=============================================
        var S = F;
        sconf.diagramOrigin = [ 0, 0 ];
        var originX_onPicture = F[0]; //for model's axis x
        var originY_onPicture = F[1]; //for model's axis y
        //=============================================
        // \\// points reused in config
        //=============================================

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

        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            context,
            curvature,
            body,
            orbit               : result,
            'orbit-sample'      : given,
            orbitarea           : orbitarea,
            'orbitarea-sample'  : orbitareaSample,
            orbitdq             : result,
            'orbitdq-sample'    : given, //todm remove
            shadow,
            force               : force,
            instanttriangle     : instanttriangle,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        /*
            //apparently this is not enough, need following in study-model.js
                //except point P which will be user-slided along curve,
                //merges selected points with controls points
                var cPivots = sconf.originalPoints.curvePivots;
                //merges positions to help d8d
                rg.a.pos = cPivots[0].rgX.pos;
                rg.c.pos = cPivots[2].rgX.pos;
        */
        var originalPoints =
        {
        };

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
                pcolor : result,
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
                pcolor : result,
            },

            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : result,
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
                pcolor : result,
                letterRotRadius : 20,
                letterAngle : -90,
            },

            AA : {
                undisplayAlways : true,
                doPaintPname : false,
                pcolor : result,
            },


            D : {
                pcolor : result,
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
                pcolor : body,
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
                pcolor : body,
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
                pcolor : result,
                letterAngle : -45,
            },

            //----------------------------------------
            // //\\ Prop. 10 Book's "another solution"
            //----------------------------------------
            u : {
                caption : '𝑢',
                pcolor : body,
                letterAngle : -45,
                letterRotRadius : 15,
            },
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
                pcolor : result,
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
                pcolor : result,
                letterAngle : 90,
                letterRotRadius : 20,
                draggableX  : 'b1sec3prop13' !== fconf.sappId,
                undisplayAlways  : 'b1sec3prop13' === fconf.sappId,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },

            ZetaCaption : {
                pos : [ pictureWidth * 0.5, pictureHeight * 0.97 ],
                pcolor : result,
                undisplayAlways : true,
                letterAngle : 90,
                letterRotRadius : 20,
                doPaintPname : 'b1sec3prop13' !== fconf.sappId,
                unscalable  : true,
            },

            ZetaStart : {
                pos : [ pictureWidth * 0.1, pictureHeight * 0.92 ],
                pcolor : result,
                undisplayAlways : true,
                doPaintPname : false,
                unscalable  : true,
            },

            ZetaEnd : {
                pos : [ pictureWidth * 0.9, pictureHeight * 0.92 ],
                pcolor : result,
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
            { 'CS' : { pcolor : result }, },
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

            { 'QR' : { pcolor : result }, },
            { 'QT' : { pcolor : proof }, },
            { 'PT' : { pcolor : proof }, },

            { DK : { pcolor : proof }, },
            { DS : { pcolor : proof }, },
            { DH : { pcolor : result }, },
            { PM : { pcolor : body }, },
            { SM : { pcolor : body }, },

            { OM : { pcolor : proof }, },
            { ON : { pcolor : proof }, },
            { NS : { pcolor : proof }, },
            { SA : { pcolor : result }, },
            { NP : { pcolor : proof }, },

            { GP : { pcolor : proof }, },
            { Qv : { pcolor : proof }, },
            { Pv : { pcolor : proof }, },
            { Tv : { pcolor : proof }, },
            { xv : { pcolor : proof }, },
            { Tx : { pcolor : proof }, },

            { Gv : { pcolor : proof }, },
            { PF : { pcolor : proof }, },
            { 'A,AA' : { pcolor : result }, },
            { 'B,BB' : { pcolor : result }, },
            { AT : { pcolor : proof }, },
            { CA : { pcolor : result }, },

            { CB : { pcolor : result }, },
            { 'L,LL' : { pcolor : result,
               captionShiftNorm : 22, lposYSugar : 3 }, },
            { 'l,ll' : { pcolor : given,
               captionShiftNorm : 44, lposYSugar : -5, }, },
            { SL : { pcolor : orbit, }, },
            { CD : { pcolor : result }, },

            { PO : { pcolor : proof }, },
            //{ GO : { pcolor : proof }, },
            { FO : { pcolor : proof }, },
            { 'SP' : {
                    pcolor : body,
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
              { pcolor : result } 
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
        sconf.pointDecoration.r = sconf.handleRadius;
        //***************************************************************
        // \\// geometics parameters
        //***************************************************************
    }
}) ();

