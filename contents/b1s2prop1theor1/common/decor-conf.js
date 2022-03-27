( function() {
    var {
        sn, eachprop, mapp, nspaste, haz, has,
        sconf, toreg, rg, ssF, ssD, sDomF,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            decShapes_conf,
        },
    });
    var decor = sn( 'decor', stdMod );
    return;











    //----------------------------------------
    // //\\ declares decorations
    //      complimentary to and runs after
    //      sconf.js::init_conf(),
    //
    //      runs only once at start of init_model_parameters,
    //----------------------------------------
    function decShapes_conf()
    {
        //------------------------------------
        // //\\ declares decorational points
        //      A,B are special d8d points
        //------------------------------------
        var firstSteps_conf = {
            A   : { decStart : -2, pos : sconf.A.concat() },
            B   : { decStart : -2, pos : sconf.B.concat() },
        };

        //----------------------------------------------------
        // //\\ proof final points
        //----------------------------------------------------
        var finalSteps_conf = {
            C   : { decStart : 10, },
            D   : { decStart : 14, },
            E   : { decStart : 18, },
            F   : { decStart : 22, },
        };
        ///makes proof final points to disappear after a while
        eachprop( finalSteps_conf, (fs, kName) => {
            fs.decEnd = fs.decStart+27;
        });
        //----------------------------------------------------
        // \\// proof final points
        //----------------------------------------------------



        //----------------------------------------------------
        // //\\ theor 2 coroll. path decor
        //----------------------------------------------------
        var aracc_conf = {
            Caracc : {
                caption : "C'",
                decStart : 10,
                decEnd : 10,
                cssClass : 'theor2corollary',
            },
            //will be repositioned by algo
            Paracc : {
                caption : "C''",
                decStart : 10,
                decEnd : 10,
                cssClass : 'theor2corollary',
            },
            Varacc : {
                caption : "V'",
                decStart : 10,
                decEnd : 10,
                cssClass : 'theor2corollary',
            },
        };
        //----------------------------------------------------
        // \\// theor 2 coroll. path decor
        //----------------------------------------------------



        var middleSteps_conf = {
            c   : {
                decStart : 8,
                decEnd : 10,
                cssClass : 'theor1proof theor2corollary',
            },

            //c-col3
            h   : {
                decStart : finalSteps_conf.C.decStart,
                decEnd : finalSteps_conf.C.decEnd,
                cssClass : 'theor1corollary theor2proof',
            },
            d   : { decStart : 12, decEnd : 14,
                cssClass : 'theor1proof',
            },

            //t2 proof
            j   : {
                caption : 'd', //will coinside with "d", so keep pos equal with "d"
                decStart : finalSteps_conf.D.decStart,
                decEnd : finalSteps_conf.D.decEnd,
                cssClass : 'theor1proof theor2proof tohidden', //this uhides in Theor. 2
            },

            e   : { decStart : 16, decEnd : 18,
                cssClass : 'theor1proof theor2proof',
            },

            f   : { decStart : 20, decEnd : 22,
                cssClass : 'theor1proof theor2proof',
            },

            //f-col3
            g   : {
                caption : 'f',
                decStart : finalSteps_conf.F.decStart,
                decEnd : finalSteps_conf.F.decEnd,
                cssClass : 'theor1corollary',
            },
        };
        toreg( 'h' )( 'caption', 'c' );
        toreg( 'g' )( 'caption', 'e' );

        var forceTip_conf = {
            Z   : {
                    decStart : 22,
                    decEnd : 27,
                    cssClass : 'theor1corollary',
                  },
            V   : { decStart : -2, },
        };

        var mixedSteps_conf = {
            S   : {
                    pos      : [0,0],
                    decStart : -2, //always visible
                  },
            P   : {
                    decStart : -2, //always visible
                    cssClass : 'theor1corollary',
                  },
            T   : { decStart : 28,
                    decEnd : -2,  //no end visibility
                    cssClass : 'theor1corollary',
                    //undisplay : true,
                  },
            //sagittae ABC=middle sagitta in sagittae-parallelogram
            U   : {
                    decStart : finalSteps_conf.C.decStart,
                    decEnd : finalSteps_conf.C.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
                    cssClass : 'theor1corollary',
            },
            //sagittae DEF=middle sagitta in sagittae-parallelogram
            W   : {
                    decStart : finalSteps_conf.F.decStart,
                    decEnd : finalSteps_conf.D.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
                    cssClass : 'theor1corollary',
            },

            'A-white-filler'   : {
                    decStart    : firstSteps_conf.A.decStart,
                    decEnd      : firstSteps_conf.A.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
            },

            'B-white-filler'   : {
                    decStart    : firstSteps_conf.B.decStart,
                    decEnd      : firstSteps_conf.B.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
            },

            'V-white-filler'   : {
                    decStart    : forceTip_conf.V.decStart,
                    decEnd      : forceTip_conf.V.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
            },

        };


        //---------------------------------------------------
        // //\\ comprises decor
        //---------------------------------------------------
        Object.assign( decor, firstSteps_conf );
        Object.assign( decor, middleSteps_conf );
        Object.assign( decor, forceTip_conf );
        Object.assign( decor, mixedSteps_conf );
        Object.assign( decor, finalSteps_conf );
        Object.assign( decor, aracc_conf );
        //---------------------------------------------------
        // \\// comprises decor
        //---------------------------------------------------

        //---------------------------------------------------
        // //\\ syncs decor and rg
        //---------------------------------------------------
        eachprop( decor, (dec,kName) => {
            var pname           = kName;
            var pos             = haz( dec, 'pos' ) || [0,0];
            var doPaintPname    = has( dec, 'doPaintPname' ) ? dec.doPaintPname : true;
            toreg( kName );
            Object.assign( decor[ kName ], rg[ kName ] );
            Object.assign( rg[ kName ], decor[ kName ] );
            Object.assign( rg[ kName ], {
                pos,
                medpos : [0,0], //fake reasonA, //todm reasonA seems weird ... why?
                pname,
                doPaintPname,
                isPoint : true,
                //todm ? ... proliferated coding: medpos, pos, ...  are two places:
                //           because of pWrap of itself is a proliferation of rg.pname rack
                pointWrap : {
                    pos,
                    pname,
                    doPaintPname,
                },
            });
            decor[ kName ] = rg[ kName ];
        });
        //---------------------------------------------------
        // \\// syncs decor and rg
        //---------------------------------------------------


        //---------------------------------------------------
        // //\\ synching rg and dec pos with pname2point
        //---------------------------------------------------
        sconf.pname2point = {};
        Object.assign( sconf.pname2point, mapp( firstSteps_conf,    dc => dc.pos ) );
        Object.assign( sconf.pname2point, mapp( forceTip_conf,      dc => dc.pos ) );
        Object.assign( sconf.pname2point, mapp( mixedSteps_conf,    dc => dc.pos ) );
        Object.assign( sconf.pname2point, mapp( middleSteps_conf,   dc => dc.pos ) );
        Object.assign( sconf.pname2point, mapp( finalSteps_conf,    dc => dc.pos ) );
        Object.assign( sconf.pname2point, mapp( aracc_conf,         dc => dc.pos ) );
        //---------------------------------------------------
        // \\// synching rg and dec pos with pname2point
        // \\// declares decorational points
        //------------------------------------


        [
            { nam : ['A', 'B'], },
            { nam : ['B', 'C'], },
            { nam : ['C', 'D'], },
            { nam : ['D', 'E'], },
            { nam : ['E', 'F'], },

            { nam : ['S', 'A'], },
            { nam : ['S', 'B'], },
            { nam : ['S', 'C'], },
            { nam : ['S', 'D'], },
            { nam : ['S', 'E'], },
            { nam : ['S', 'F'], },

            { nam : ['S', 'c'],
                cssClass : 'theor1proof',
            },
            { nam : ['S', 'd'],
                cssClass : 'theor1proof',
            },
            { nam : ['S', 'e'],
                cssClass : 'theor1proof',
            },
            { nam : ['S', 'f'],
                cssClass : 'theor1proof',
            },

            { nam : ['C', 'c'], decStart : rg.C.decStart,
                cssClass : 'theor1proof theor2proof theor2corollary',
            },
            { nam : ['D', 'd'], decStart : rg.D.decStart,
                cssClass : 'theor1proof theor2proof',
            },
            { nam : ['E', 'e'], decStart : rg.E.decStart,
                cssClass : 'theor1proof theor2proof',
            },
            { nam : ['F', 'f'], decStart : rg.F.decStart,
                cssClass : 'theor1proof theor2proof',
            },

            { nam : ['B', 'c'], cssClass : 'theor1proof theor2proof theor2corollary', },
            { nam : ['B', 'h'], cssClass : 'theor1corollary theor2proof', },
            { nam : ['C', 'h'], cssClass : 'theor1corollary theor2proof', },

            { nam : ['C', 'd'], cssClass : 'theor1proof', },
            { nam : ['C', 'j'], cssClass : 'theor1proof theor2proof', }, //theorem 2
            { nam : ['D', 'j'], cssClass : 'theor1proof theor2proof', }, //theorem 2

            { nam : ['D', 'e'], cssClass : 'theor1proof theor2proof', },

            { nam : ['E', 'f'], cssClass : 'theor1proof theor2proof', },
            { nam : ['E', 'g'], cssClass : 'theor1corollary', },
            { nam : ['F', 'g'], cssClass : 'theor1corollary', },

            { nam : ['B', 'V'], },
            { nam : ['E', 'Z'], },

            { nam : ['C', 'V'], },
            { nam : ['A', 'V'], },
            { nam : ['F', 'Z'], },
            { nam : ['D', 'Z'], },

            { nam : ['S', 'P'], decStart : -2,
                cssClass : 'theor1corollary', }, //for perpendicular
            { nam : ['T', 'P'], decStart : -2,
                cssClass : 'theor1corollary', }, //for tangent

            { nam : ['B', 'U'], },
            { nam : ['E', 'W'], },
            { nam : ['A', 'C'], cssClass : 'theor1corollary', },
            { nam : ['D', 'F'], cssClass : 'theor1corollary', },



            { nam : ['c','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['C','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['S','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['B','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['C','Paracc'], cssClass : 'theor2corollary', },
            { nam : ['V','Varacc'], cssClass : 'theor2corollary', },
            { nam : ['B','Varacc'], cssClass : 'theor2corollary', },
            { nam : ['Caracc','Paracc'], cssClass : 'theor2corollary', },

        ].forEach( pNam => {
            var rgElem = ssF.pnames2line(
                pNam.nam[0],
                pNam.nam[1],
                haz( pNam, 'cssClass' ),
                stdMod,
            );
            decor[ rgElem.pname ] = rgElem;
            decor[ rgElem.pname ].isPoint = false;
            var decStart = has( pNam, 'decStart' ) ?
                pNam.decStart : rg[ pNam.nam[1] ].decStart;
            var decEnd = has( pNam, 'decEnd' ) ?
                pNam.decEnd : rg[ pNam.nam[1] ].decEnd;
            rgElem.decStart = decStart;
            rgElem.decEnd = decEnd;
            ////---------------------------------------------------
        });

        //note: in svg-z-order, these fall behind
        //      decorational-"kepler-triangles" etc, but
        //      due transparency are still well-visible,
        saggPolyNames_2_rg8media();
        keplerPolyNames_2_rg8media();
        arbitraryArea_PolyNames_2_rg8media();
        acceleratingArea_2_rg8media();

        toreg( 'displayTime' )( 'value', '' );
        toreg( 'displayStep' )( 'value', '' );
        toreg( 'thoughtStep' )( 'value', '' );
    }
    //----------------------------------------
    // \\// declares decorations
    //----------------------------------------



    function saggPolyNames_2_rg8media(
    ){
        [
            ['A', 'B', 'C', 'V'],
            ['D', 'E', 'F', 'Z'],
        ].forEach( pNames => {
            var rgElem = ssF.pnames2poly(
                pNames,
                'theor1corollary tostroke',
                null,
                !!'undisplay',
                null,
                stdMod,
            );
            decor[ rgElem.pname ] = rgElem;
            //lead Point defines range and ix
            var leadPoint = 2;
            rgElem.decStart = rg[ pNames[leadPoint] ].decStart;
            rgElem.decEnd = rg[ pNames[leadPoint] ].decEnd;
        });
    }

    function keplerPolyNames_2_rg8media(
    ){
        [
            ['S', 'A', 'B',],
            ['S', 'B', 'C',],
            ['S', 'C', 'D',],
            ['S', 'D', 'E',],
            ['S', 'E', 'F',],
            ['S', 'B', 'c',],
        ].forEach( pNames => {
            var rgElem = ssF.pnames2poly(
                pNames,
                'theor1proof theor2proof tohidden tofill theor2corollary',
                null,
                !!'undisplay',
                !'tostroke',
                stdMod,
            );
            decor[ rgElem.pname ] = rgElem;
            var lp = rg[ pNames[ 2 ] ];
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = lp.decEnd;
        });
    }

    function arbitraryArea_PolyNames_2_rg8media(
    ){
        [
            ['S', 'A', 'B', 'C', 'D' ],
            ['S', 'A', 'B', 'C', 'D', 'E', 'F'],
        ].forEach( pNames => {
            var rgElem = ssF.pnames2poly(
                pNames,
                'theor1proof tohidden tofill',
                null,
                !!'undisplay',
                !'tostroke',
                stdMod,
            );
            var lp = rg[ pNames[ pNames.length-1 ] ];
            decor[ rgElem.pname ] = rgElem;
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = lp.decEnd;
        });
    }



    function acceleratingArea_2_rg8media(
    ){
        [
            ['S', 'B', 'Caracc',],
        ].forEach( pNames => {
            var rgElem = ssF.pnames2poly(
                pNames,
                'theor2corollary tofill',
                null,
                !!'undisplay',
                !'tostroke',
                stdMod,
            );
            var lp = rg[ pNames[ pNames.length-1 ] ];
            decor[ rgElem.pname ] = rgElem;
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = lp.decEnd;
        });
    }



}) ();

