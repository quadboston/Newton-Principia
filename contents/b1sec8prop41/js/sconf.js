( function() {
    const {
        sn, mat, eachprop, nspaste, userOptions,
        tpid2arrc_repo, tpid2arrc_elect,
        fconf, sconf, rg, stdMod,
    } = window.b$l.apptree({ //export to apptree
        ssFExportList : { init_conf }
    });
    const op = sn( 'orbitParameters', sconf );
    const sf = sconf;
    const fc = tpid2arrc_repo;
    return;


    function init_conf (){
        //todo true makes a bug
        //in amode8captures in prop 41
        sf.mediaMover_isDisabled = false;

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
                    var mod2med = C[1] - V[1];

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
        //making size to better fit lemma's diagram
        sconf.LETTER_FONT_SIZE_PER_1000 = 20;

        //--------------------------------------
        // //\\ does override engine defaults,
        //      in expands-conf.js,
        //--------------------------------------
        sconf.default_tp_lightness = 30;
        sconf.TP_OPACITY_FROM_fixed_colors = true;
        TP_OPACITY_LOW = 0.3;
        TP_OPACITY_HIGH = 1;
        TP_OPACITY_FROM_fixed_colors = false;
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
        //-----------------------------------
        const {
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
            angleArea,
            angle,
            hidden,
        } = tpid2arrc_repo;

        //special or derivative parameters
        const fi      = [...fc.angle];
        const fiArea  = [...fc.angleArea];
        var Fkernel   = [0,  0,  150,   0.5, 1 ];

        var Zgraph    = [...fc.body];
        Zgraph[3]     = 0.01;
        Zgraph[4]     = 1;
        var Z2graph   = [...fc.body];
        Z2graph[3]    = 0.4;
        Z2graph[4]    = 1;

        var ro        = distance;

        var vgraph    = force;
        vgraph[3]      = 0.1;
        vgraph[4]      = 1;

        //var v2graph   = [0,  140, 0, 0.4];
        var v2graph   = force; //[0,  140, 0, 0.6, 1];
        v2graph[3]     = 0.6;
        v2graph[4]     = 1;
        //var VSarea    = [0,  140, 0, 0.2, 0.4];
        var VSarea    = force; //[0,  140, 0, 0.4, 0.7];
        VSarea[3]     = 0.3;
        VSarea[4]     = 0.7;
        var Tkernel   = time;
        var Tarea     = time;
        Tarea[3]      = 0.01;
        Tarea[4]      = 0.7;

        nspaste( tpid2arrc_elect, { //need deep copy
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
            Z2graph,
            vgraph,
            v2graph,
            vback : vgraph,
            vgpoint : [0,  140, 0, 0.01, 1], //todm: last two pars have no effect
            Fkernel,
            Tkernel,
            Tarea,
            fiArea,
            VSarea,

            'NK' : Fkernel,
            'ECircle' : Fkernel,
            'DCircle' : Fkernel,
            'MainCircle' : [0,  0,  150,   0.5, 1 ], //Fkernel,
            'YX' : Fkernel,

            XCY : [0,  0,    150, 0.03,  0.5 ],
            IK : body,
            'D𝑐𝑥E' : [0,  0,  150,   0.01, 0.3],
            'D𝑏𝑧E' : [110, 90,  0,   0.01, 0.3],
            VIC : [110, 90, 0, 0.001, 0.5 ],

            //needs color model working:
            ICK : [110, 90, 0, 0.001, 0.5 ], //good but hidden
            //ICK : [110, 90, 0, 0.1, 1 ], //visible, but initially annoying,
        });
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
                //no effect: pcolor : tpid2arrc_elect.vgpoint,
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
                    pcolor : body, //[100,  0, 20, 0.01, 1],
                    vectorTipIx : 1 },
            },

            { IZ : {
                    pcolor : Zgraph, //[100,  0, 20, 0.01,  1],
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
                    pcolor : [50,  50,  50,    1] //shadow,
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
            originalPoints,
            linesArray,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2med,
        });
    }
})();