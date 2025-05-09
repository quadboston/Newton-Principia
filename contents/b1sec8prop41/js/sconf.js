
( function() {
    var { sn, mat, eachprop, nspaste, userOptions, fixedColors, fconf, sconf,
        rg, stdMod, } = window.b$l.apptree({ ssFExportList : { init_conf } });
    var op = sn( 'orbitParameters', sconf );
    return;


    function init_conf()
    {
        //----------------------------------
        // //\\ study model parameters
        //----------------------------------
        //sets cinematics
        op.Kepler_v_initial   = 0.1536;
        op.Kepler_v           = op.Kepler_v_initial;
        op.angleOmega         = 2.255644;  //Math.PI - Math.asin( omega );
        op.angleOmega_initial = op.angleOmega;
        //----------------------------------
        // \\// study model parameters
        //----------------------------------

        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;
        //sconf.rgShapesVisible           = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //----------------------------------
        // //\\ paper diagram parameters
        //----------------------------------
        if( fconf.sappId === 'b1sec8prop41' ) {
            switch ( fconf.sappId ) {
            case "b1sec8prop41" :

                    //for real picture if diagram's picture is supplied or
                    //for graphical-media work-area if not supplied:
                    var pictureWidth = 912;
                    var pictureHeight = 603;
                    var C = [ 376,
                              587
                            ];
                    sconf.Fi_distance = 1.8;
                    sconf.insertDelayedBatch = true;
                    sconf.dRo = 0.075; //dr - infinitesimal interval

                    var V = [C[0], 100];

                    //model's spacial unit expressed in pixels of the picture:
                    //vital to set to non-0 value
                    var mod2inn_scale = C[1] - V[1];

                    var A = [C[0], 39];
                    var B = [464,  A[1]];
                    var forceStart = [ B[0]*1.03, -100 ];
                    var D = [C[0], 270];
                    var E = [C[0], 304];
                    var R = [41, 234];
                    var k = [246, 491];

                    //decorations
                    sconf.angleOfR = Math.PI * 0.245;
                  break;
            }
        }
        //----------------------------------
        // \\// paper diagram parameters
        //----------------------------------

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************
        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;

        //--------------------------------------
        // //\\ does override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 30;

        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 3 * controlsScale ),
        //overrides "global", lemma.conf.js::sconf
        sconf.pointDecoration.r = handleRadius;

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
        // \\// does override engine defaults,
        // \\// decorational parameters
        //***************************************************************



        //=============================================
        // //\\ points reused in config
        //=============================================
        sconf.diagramOrigin = [ 0, 0 ];
        var originX_onPicture = C[0]; //for model's axis x
        var originY_onPicture = C[1]; //for model's axis y
        //=============================================
        // \\// points reused in config
        //=============================================

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var {
            given,
            body,
            orbit,
            time,
            distance,
            proof,
            force,
            invalid,
            result,
            shadow,
            hidden,

            fi,
            Fkernel,
            bodyHiddenStart,

            forceTransparentStart,
            VSarea,

            timeHiddenStart,

            vgpoint,

            XCY,
            D𝑐𝑥E,
            D𝑏𝑧E,
            VIC,
            ICK,
        } = fixedColors;

        const Zgraph = bodyHiddenStart;
        const vgraph = forceTransparentStart;
        const ro = distance;
        const Tkernel = time;


        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            body,
            orbit,

            shadow,
            force,
            fi,
            Zgraph,
            Z2graph     : body,
            vgraph,
            v2graph     : force,
            vback       : vgraph,
            vgpoint,
            Fkernel,
            Tkernel,
            Tarea       : timeHiddenStart,
            fiArea      : fi,
            VSarea,

            'NK'        : Fkernel,
            'ECircle'   : Fkernel,
            'DCircle'   : Fkernel,
            'MainCircle': Fkernel,
            'YX'        : Fkernel,

            XCY,
            IK          : body,
            D𝑐𝑥E,
            D𝑏𝑧E,
            VIC,

            ICK,
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //---------------------------------------------------
        // //\\ points to approximate and draw original curve
        //---------------------------------------------------
        var curvePivots =
        [
            forceStart,

            B,

            [467,69],
            [484,147],
            [516, 245],

            [579, 347],

            [657,412],
        ];
        curvePivots = curvePivots.map( (pivot,ix) => ({
            pos         : pivot,
            pcolor      : force,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
        }));
        //---------------------------------------------------
        // \\// points to approximate and draw original curve
        //---------------------------------------------------


        let originalPoints = {
            curvePivots,
            nonSolvablePoint : {
                pos: [666,444], //will be calculated
                caption : 'Force is out of considered range.',
                fontSize : '20',
                pcolor : invalid,
                letterAngle : 90,
            },

            C : {
                pcolor : ro,
                letterAngle : -90,
             },

            //-------------------------
            // //\\ given
            //-------------------------
            V : {
                pos : V,
                pcolor : ro,
                letterAngle : 140,
                letterRotRadius : 20,
            },

            // //\\ speed
            v : {
                caption : 'v',
                pcolor : body,
                letterAngle : 120,
                draggableX  : true,
                draggableY  : true,
            },

            M : {
                pos : V, //sets model's pos[0]
                caption : '',
                pcolor : body,
            },

            Vangle : {
                caption : 'ω',
                pcolor : body,
                letterAngle : 120,
                draggableX  : true,
                draggableY  : true,
            },
            // \\// speed
            //-------------------------
            // \\// given
            //-------------------------

            A : {
                caption : 'Drop point, A',
                pos : A,
                pcolor : ro,
                letterAngle : 180,
                letterShift : [-120,-5],
            },

            vgpoint : {
                caption : 'v',
                pos : A,
                //no effect: pcolor : predefinedTopics.vgpoint,
                letterAngle : 45,
            },

            Zgpoint : {
                caption : 'Z',
                pos : A,
                //pcolor : Zgraph,
                letterAngle : 45,
            },

            Z : {
                caption : '',
                pcolor : body,
            },

            B : {
                caption : 'B',
                pcolor : force,
                letterAngle : -45,
            },

            F : {
                caption : 'F, ~dv²/dρ',
                pcolor : force,
                letterAngle : -45,
                cssClass : 'tostroke',
            },

            D : {
                pos : D,
                pcolor : ro,
                letterAngle : 45,
                draggableY  : true,
            },

            E : {
                pos : E,
                pcolor : ro,
                letterAngle : 45,
            },

            N : {
                pcolor : shadow,
                letterAngle : 150,
            },

            I : {
                pcolor : body,
                letterAngle : 150,
            },

            K : {
                pcolor : body,
                letterAngle : 150,
            },

            X : {
                pcolor : shadow,
                letterAngle : 120,
            },

            Y : {
                pcolor : shadow,
                letterAngle : 120,
            },

            R : {
                pos : R,
                pcolor : shadow,
                letterAngle : 180,
            },

            a : {
                caption : '𝑎',
                pcolor : Fkernel,
                letterAngle : 120,
            },

            b : {
                caption : '𝑏, ~dt/dρ',
                pcolor : Tkernel,
                letterAngle : 120,
            },

            c : {
                caption : '𝑐, ~dφ/dρ',
                pcolor : Fkernel,
                letterAngle : 120,
            },

            k : {
                caption : '𝑘',
                pos : k,
                pcolor : body,
                letterAngle : 120,
            },

            x : {
                caption : '𝑥',
                pcolor : Fkernel,
                letterAngle : 120,
            },

            z : {
                caption : '𝑧',
                pcolor : Tkernel,
                letterAngle : 120,
            },
        };
        eachprop( originalPoints, sp => {
            sp.letterRotRadius = 20;
        });
        originalPoints.c.letterAngle = 45;
        originalPoints.x.letterAngle = 45;

        var linesArray =
        [
            { 'V,v' : {
                    pcolor : body,
                    vectorTipIx : 1 },
            },

            { VM : {
                    pcolor : body,
                    vectorTipIx : 1 },
            },

            { IZ : {
                    pcolor : Zgraph,
                    vectorTipIx : 1
                },
            },

            { 'V,Vangle' : {
                    pcolor : body,
                },
            },

            { 'CV' : {
                    pcolor : ro,
                },
            },

            { Dc : {
                    pcolor : Fkernel,
                },
            },

            { Db : {
                    pcolor : Tkernel,
                },
            },

            { Ex : {
                    pcolor : Fkernel,
                },
            },

            { Ez : {
                    pcolor : Tkernel,
                },
            },

            { Va : {
                    pcolor : Fkernel,
                },
            },

            { VA : {
                    pcolor : shadow,
                },
            },

            { AB : {
                    pcolor : shadow,
                },
            },

            { CA : {
                    pcolor : ro,
                },
            },

            { CX : {
                    pcolor : shadow,
                },
            },

            { CY : {
                    pcolor : shadow,
                },
            },

            { CI : {
                    pcolor : ro,
                    vectorTipIx : 1
                },
            },

            { IN : {
                    pcolor : ro,
                },
            },

            { CD : {
                    pcolor : ro,
                },
            },

            { DF : {
                    pcolor : force,
                },
            },
        ];

        //stdMod.init_sliders_conf();
        nspaste( sconf, {
            mediaBgImage : "diagram.jpg",
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

