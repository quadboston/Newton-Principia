
( function() {
    const { nspaste, fconf, sconf, fixedColors, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //***************************************************************
        // //\\ geometical scales
        //***************************************************************
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 922;
        var pictureHeight = 705;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize
        //***************************************************************
        // \\// geometical scales
        //***************************************************************

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================


        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;
        sconf.rgShapesVisible = true;
        
        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 30;

        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r= 3;

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
        sconf.text_nonhover_width   = 1000;
        sconf.text_hover_width      = 2000;
        // \\// principal tp-css pars
        // \\// do override engine defaults,
        // \\// decorational parameters
        //***************************************************************

        //=============================================
        // //\\ points reused in config
        //=============================================
        var C = [443, 375 ];
        var S = C;
        //=============================================
        // \\// points reused in config
        //=============================================


        //:diagram sandbox spatial parameters
        //model's spacial unit expressed in pixels of the picture:
        //vital to set to non-0 value
        var mod2inn_scale = 360;
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y
        sconf.diagramOrigin = [ 0, 0 ];

        //-------------------------------------------
        // //\\ calculation algo parameters
        //-------------------------------------------
        const FT = sconf.TIME_IS_FREE_VARIABLE = true; //vs q is free variable
        sconf.CURVE_REVOLVES = true; //true for cyclic orbit
        sconf.DQ_SLIDER_MAX = FT ? null : 1.0;
        sconf.DT_SLIDER_MAX = FT ? 0.66 : null;
        var Q_STEPS = 1000;
        var TIME_STEPS = 1000;
        var DATA_GRAPH_STEPS = 500;
        sconf.IS_DEVIATION_SCALED_BY_FORCE_MAX = true;
        sconf.DEVIATION_SCALE_FACTOR = 0.5;
        //-------------------------------------------
        // \\// calculation algo parameters
        //-------------------------------------------

        //-------------------------------------------
        // //\\ curve shape parameters
        //-------------------------------------------
        sconf.ellipseA  = 1.03;
        sconf.ellipseB  = 0.86;
        sconf.orbit_q_start = 0;
        sconf.orbit_q_end = 2.0 * Math.PI;
        //-------------------------------------------
        // \\// curve shape parameters
        //-------------------------------------------

        //to be studied in given proposition:
        sconf.force_law_function = bp => 1/(bp.R*bp.r2*(bp.sinOmega**3));

        //intervals of dt or dq to construct an arc for
        //displacement or sagitta,
        //Sets initial distance of point Q from P
        if( FT ){
            sconf.Dt0 = 0.36;
        } else {
            sconf.Dq0 = 0.42;
        }

        //pos of P
        sconf.parQ = 0.255 * Math.PI;

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        const {
            given,
            body,
            orbit,
            proof,
            force,
            result,
            hidden,
            curvature,
            context,
            displacement,
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
            orbit,
            force,
            tangentCircle : curvature,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var originalPoints = {
            
            // //\\ no visibility cssClass            
            AA : {
                undisplayAlways : true,
                doPaintPname : false,
            },

            BB : {
                letterAngle : 90,
                undisplayAlways : true,
                doPaintPname : false,
            },

            C : {
                pcolor : proof,
                pos: C,
                letterAngle : 120,
                letterRotRadius : 35,
            },

            Z : {
                pcolor : body,
                letterAngle : 45,
                undisplayAlways : true,
                doPaintPname : false,
            },

            Zminus : {
                pcolor : body,
                letterAngle : 45,
                //undisplay : true,
                undisplayAlways : true,
                doPaintPname : false,
            },
            // \\// no visibility cssClass

            B : {
                pcolor : proof,
                letterAngle : 90,
                cssClass: 'aspect--english',
            },

            A : {
                pcolor : proof,
                cssClass: 'aspect--english',
            },

            // //\\ proof
            D : {
                pcolor : proof,
                letterAngle : 70,
                cssClass: 'logic_phase--proof',
            },

            K : {
                pcolor : proof,
                letterAngle : 70,
                cssClass: 'logic_phase--proof',
            },

            G : {
                pcolor : proof,
                letterAngle : 90,
                letterRotRadius : 25,
                cssClass: 'logic_phase--proof',
            },

            T : {
                pcolor : proof,
                letterAngle : 180,
                letterRotRadius : 15,
                cssClass: 'logic_phase--proof',
            },

            R : {
                pcolor : proof,
                letterAngle : 45,
                cssClass: 'logic_phase--proof',
            },

            v : {
                caption : '𝑣',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
                cssClass: 'logic_phase--proof',
            },

            F : {
                pcolor : proof,
                letterAngle : -135,
                cssClass: 'logic_phase--proof',
            },

            VV : {
                caption : 'V',
                pcolor : proof,
                letterAngle : -45,
                cssClass: 'logic_phase--proof',
            },

            Q : {
                pcolor : proof,
                letterAngle : 180,
                letterRotRadius : 25,
                draggableX  : true,
                draggableY  : true,
                cssClass: 'logic_phase--proof',
            },
            // \\// proof
  

            //Book's "another solution"
            u : {
                caption : '𝑢',
                pcolor : proof,
                letterAngle : -45,
                letterRotRadius : 15,
                cssClass: 'subessay--another-solution',
            },

            tCircleCenter : {
                pos : C,
                caption : "C'",
                pcolor : curvature,
                letterAngle : -45,
                cssClass: 'subessay--another-solution',
            },

            //---------------------------------------
            // //\\ draggable points
            //---------------------------------------
            S : {
                pos: S,
                pcolor : result,
                letterAngle : -115,
                letterRotRadius : 25,
                // draggableX  : true,
                // draggableY  : true,
            },

            P : {
                pcolor : body,
                letterAngle : 70,
                draggableX  : true,
                draggableY  : true,
            },
            //---------------------------------------
            // \\// draggable points
            //---------------------------------------
        };


        var linesArray =
        [
            { 'A,AA' : { pcolor : proof, }, },
            { 'B,BB' : { pcolor : proof }, },
            { 'P,Zminus' : { pcolor : body }, },
            { 'PZ' : { pcolor : body }, },
            { 'ZR' : { pcolor : body }, },


            { CA : { pcolor : proof,
                     cssClass: 'aspect--english',
            }, },
            { CB : { pcolor : proof,
                     cssClass: 'aspect--english',
            }, },
            { PC : { pcolor : proof,
                     cssClass: 'aspect--english',
            }, },

            // //\\ proof
            { 'P,VV' : { pcolor : proof,
                         cssClass: 'logic_phase--proof',
            }, },
  
            /*{ 'PC' : { pcolor : proof,//??
                       cssClass: 'logic_phase--proof',
            }, },*/

            { 'SP' : { pcolor : result }, },

            { 'PR' : { pcolor : body,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'QR' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'SQ' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'QT' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },
            { 'PT' : { pcolor : proof,
                       cssClass: 'logic_phase--proof',
            }, },

            { DK : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { GP : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { Qv : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { Pv : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { Tv : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },

            { vG : { pcolor : proof,                 
                     cssClass: 'logic_phase--proof',
            }, },
            { PF : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            { DC : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
  
           /* { GO : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },*/
            { CF : { pcolor : proof,
                     cssClass: 'logic_phase--proof',
            }, },
            // \\// proof

            //Book's "another solution"
            { Tu : { pcolor : proof,
                     cssClass: 'subessay--another-solution',
            }, },
            { 'u,VV' : { pcolor : proof,
                         cssClass: 'subessay--another-solution',
            }, },
            { uP : { pcolor : proof,
                     cssClass: 'subessay--another-solution',
            }, },
            { PQ : { pcolor : proof,
                     cssClass: 'subessay--another-solution',
            }, },
            { 'P,tCircleCenter' : { pcolor : curvature,
                                    cssClass: 'subessay--another-solution',
            }, },
        ];

        nspaste( sconf, {
            Q_STEPS,
            DATA_GRAPH_STEPS,
            TIME_STEPS,

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
})();
