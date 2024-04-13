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
        var pcolorForce = sDomF.getFixedColor( 'force' )
        //var pcolorForceMove = sDomF.getFixedColor( 'forceMove' )
        //------------------------------------
        // //\\ declares decorational points
        //      A,B are special d8d points
        //------------------------------------
        var firstSteps_conf = {
            A   : { decStart : -2, pos : sconf.A.concat() },
            //todo redundant
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
            fs.decEnd = finalSteps_conf.F.decStart+5;
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
                decEnd : finalSteps_conf.F.decStart, //22, //10,
                cssClass : 'theor1proof theor2corollary',
            },

            //c-col3
            h   : {
                caption : 'c',
                decStart : finalSteps_conf.C.decStart,
                decEnd : finalSteps_conf.C.decEnd,
                cssClass : 'theor1corollary theor2proof',
            },
            d   : { decStart : 12, decEnd : 22, //14,
                cssClass : 'theor1proof theor2proof',
            },

            //t2 proof, todm not sure we need it?
            j   : {
                caption : 'd', //will coinside with "d", so keep pos equal with "d"
                decStart : finalSteps_conf.D.decStart,
                decEnd : finalSteps_conf.F.decEnd,
                cssClass : 'theor1proof theor2proof tohidden', //this uhides in Theor. 2
            },

            e   : { decStart : 16,
                    decEnd : finalSteps_conf.F.decStart, //22, //18,
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
            v   : {
                    pos      : sconf.B.concat(),
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
                    cssClass : 'hidden',
            },
            //sagittae DEF=middle sagitta in sagittae-parallelogram
            W   : {
                    decStart : finalSteps_conf.F.decStart,
                    decEnd : finalSteps_conf.D.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
                    cssClass : 'hidden',
                    //cssClass : 'theor1corollary',
            },

            'A-white-filler'   : {
                    decStart    : firstSteps_conf.A.decStart,
                    decEnd      : firstSteps_conf.A.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
            },
            'V-white-filler'   : {
                    decStart    : forceTip_conf.V.decStart,
                    decEnd      : forceTip_conf.V.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
            },
            'v-white-filler'   : {
                    decStart    : forceTip_conf.V.decStart,
                    decEnd      : forceTip_conf.V.decEnd, //todm too complex
                    //decStart    :  -2,
                    decEnd      : firstSteps_conf.A.decEnd, //todo patch
                    //decEnd      : firstSteps_conf.vB.decEnd,
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
            var doPaintPname    = has( dec, 'doPaintPname' ) ?
                                  dec.doPaintPname : true;
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

            //this is a thin line, which remains after thick line goes away,
            { nam : ['C', 'c'], decStart : rg.C.decStart,
                cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
            },
            { nam : ['D', 'd'],
                decStart : rg.D.decStart,
                cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
            },
            { nam : ['E', 'e'],
                decStart : rg.E.decStart,
                //decEnd : rg.F.decEnd,
                cssClass : 'theor1proof theor2proof tp-force-_move',
            },
            { nam : ['F', 'f'],
                decStart : rg.F.decStart,
                cssClass : 'theor1proof theor2proof tp-force-_move',
            },

            { nam : ['B', 'c'],
                cssClass : 'theor1proof xtheor2proof theor2corollary',
                decEnd : rg.f.decStart,
            },
            { nam : ['B', 'h'], cssClass : 'theor1corollary theor2proof', },
            { nam : ['C', 'h'], cssClass : 'theor1corollary theor2proof', },

            //{ nam : ['C', 'd'], cssClass : 'theor1proof', },
            //{ nam : ['C', 'j'], cssClass : 'theor1proof theor2proof', },
            //{ nam : ['D', 'j'], cssClass : 'theor1proof theor2proof', },

            { nam : ['D', 'e'], cssClass : 'theor1proof theor2proof', },

            { nam : ['E', 'f'], cssClass : 'theor1proof theor2proof', },
            { nam : ['E', 'g'], cssClass : 'theor1corollary', },
            { nam : ['F', 'g'], cssClass : 'theor1corollary', },

            { nam : ['C', 'V'], decStart : rg.C.decStart, },
            { nam : ['A', 'v'], decStart : -2, },

            { nam : ['S', 'P'], decStart : -2,
                cssClass : 'theor1corollary', }, //for perpendicular
            { nam : ['T', 'P'], decStart : -2,
                cssClass : 'theor1corollary', }, //for tangent

            { nam : ['B', 'U'], //saggitae at B
                cssClass : 'hover-width theor1corollary' //for specaial width at hover
            },
            { nam : ['B', 'V'],
              cssClass : 'hover-width theor1corollary theor1proof'
            },

            { nam : ['E', 'W'],  //saggitae at E
                decStart : rg.F.decStart,
                cssClass : 'hover-width theor1corollary'
            },
            { nam : ['E', 'Z'],
                cssClass : 'hover-width theor1corollary',
                decStart : rg.F.decStart,
            },

            { nam : ['A', 'C'], cssClass : 'theor1corollary', },
            { nam : ['D', 'F'], cssClass : 'theor1corollary', },



            { nam : ['c','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['C','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['S','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['B','Caracc'], cssClass : 'theor2corollary', },
            { nam : ['B','Paracc'], cssClass : 'theor2corollary', },
            { nam : ['C','Paracc'], cssClass : 'theor2corollary', },
            { nam : ['V','Varacc'], cssClass : 'theor2corollary', },
            { nam : ['B','Varacc'], cssClass : 'theor2corollary', },
            { nam : ['Caracc','Paracc'], cssClass : 'theor2corollary', },

        ].forEach( pNam => {
            if( pNam.nam[0] === 'A' && pNam.nam[1] === 'v' ) {
                ////patch for purpose of drawing a vector tip
                let pcolor = sDomF.getFixedColor( 'path' )
                let line = toreg( 'Av' )
                        ( 'vectorTipIx', 1 )
                        ( 'tipFraction', 0.15 )
                        ( 'pcolor', pcolor )
                        ( 'tipFill', pcolor )
                        ();
            }
            if( pNam.nam[0] === 'B' && pNam.nam[1] === 'U' ) {
                ////patch for purpose of drawing a vector tip
                let line = toreg( 'BU' )
                        ( 'vectorTipIx', 1 )
                        ( 'tipFraction', 0.2 )
                        ( 'pcolor', pcolorForce )
                        ( 'tipFill', pcolorForce )
                        ();
            }
            if( pNam.nam[0] === 'E' && pNam.nam[1] === 'W' ) {
                ////patch for purpose of drawing a vector tip
                let line = toreg( 'EW' )
                        ( 'vectorTipIx', 1 )
                        ( 'tipFraction', 0.4 )
                        ( 'pcolor', pcolorForce )
                        ( 'tipFill', pcolorForce )
                        ();
            }
            if( pNam.nam[0] === 'B' && pNam.nam[1] === 'V' ) {
                ////patch for purpose of drawing a vector tip
                let line = toreg( 'BV' )
                        ( 'vectorTipIx', 1 )
                        ( 'tipFraction', 0.4 )
                        ( 'pcolor', pcolorForce )
                        ( 'tipFill', pcolorForce )
                        ();
            }
            if( pNam.nam[0] === 'E' && pNam.nam[1] === 'Z' ) {
                ////patch for purpose of drawing a vector tip
                let line = toreg( 'EZ' )
                        ( 'vectorTipIx', 1 )
                        ( 'tipFraction', 0.4 )
                        ( 'pcolor', pcolorForce )
                        ( 'tipFill', pcolorForce )
                        ();
            }
            var rgElem = ssF.pnames2line(
                pNam.nam[0],
                pNam.nam[1],
                haz( pNam, 'cssClass' ), //for tp-links
                stdMod,
            );
            decor[ rgElem.pname ] = rgElem;
            decor[ rgElem.pname ].isPoint = false;

            ///if there is not explicit decStart in the line element, then
            ///decStart in extracted from the directional point of the line segment
            var decStart = has( pNam, 'decStart' ) ?
                pNam.decStart : rg[ pNam.nam[1] ].decStart;
            ///the same procedure happens with "end" setting
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

        //---------------------------------------------------
        // //\\ syncs decor and rg
        //---------------------------------------------------
        eachprop( decor, (dec,kName) => {
            var pname = kName;
            toreg( kName );
            Object.assign( decor[ kName ], rg[ kName ] );
            Object.assign( rg[ kName ], decor[ kName ] );
            decor[ kName ] = rg[ kName ];
        });
        //---------------------------------------------------
        // \\// syncs decor and rg
        //---------------------------------------------------
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

        ///decorations
        [   ////these triangles override kepler-triangles attached to path
            ////in path-2-media js-code,
            ['S', 'A', 'B',],
            ['S', 'B', 'C',],
            ['S', 'C', 'D',],
            ['S', 'D', 'E',],
            ['S', 'E', 'F',],
        ].forEach( pNames => {
            var rgElem = ssF.pnames2poly(
                pNames,
                'theor1proof theor2proof tofill ',
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


        [   ////these triangles override free triangles attached to path
            ////in path-2-media js-code,
            ['S', 'B', 'c',],
            ['S', 'C', 'd',],
            ['S', 'D', 'e',],
            ['S', 'E', 'f',],
        ].forEach( pNames => {
            var rgElem = ssF.pnames2poly(
                pNames,
                'theor1proof theor2proof tofill theor2corollary ', //makes green
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

        ///makes first few free-triangles living
        ///until the passing of the point f
        [
            ['S', 'B', 'c',],
            ['S', 'C', 'd',],
            ['S', 'D', 'e',],
            ['S', 'E', 'f',],
        ].forEach( pNames => {
            var pn = pNames.join('');
            rg[pn].decEnd = rg.f.decEnd;
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

