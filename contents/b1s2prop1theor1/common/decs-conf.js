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
    
    var LOGIC = false; //true; //makes logic steps c and C clearer;
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
        var pcolorForceMove = sDomF.getFixedColor( 'forceMove' )
        //var pcolorForceMove = sDomF.getFixedColor( 'forceMove' )
        //------------------------------------
        // //\\ declares decorational points
        //      A,B are special d8d points
        //------------------------------------
        var firstSteps_conf = {
            A   : { decStart : -2, decEnd : 1111111111, pos : sconf.A.concat() },
            //todo redundant
            B   : { decStart : -2, decEnd : 1111111111, pos : sconf.B.concat() },
        };
        Object.assign( decor, firstSteps_conf );

        //----------------------------------------------------
        // //\\ proof final points
        //----------------------------------------------------
        var CDEF_conf = {
            C   : { decStart : 6, },
            D   : { decStart : 10, },
            E   : { decStart : 14, },
            F   : { decStart : 18 },
        };
        ///makes proof final points to disappear after a while
        eachprop( CDEF_conf, (fs, kName) => {
            fs.decEnd = sconf.numberOfManyBases*4 *
                        sconf.FIRST_POINT_LABELS_DISPLAY_LIMIT;
        });
        Object.assign( decor, CDEF_conf );
        //----------------------------------------------------
        // \\// proof final points
        //----------------------------------------------------



        //----------------------------------------------------
        // //\\ theor 2 coroll. path decor
        //----------------------------------------------------
        var aracc_conf = {
            Caracc : {
                caption : "C'",
                decStart : decor.C.decStart,
                decEnd : decor.C.decStart,
                cssClass : 'theor2corollary',
            },
            //will be repositioned by algo
            Paracc : {
                caption : "C''",
                decStart : decor.C.decStart,
                decEnd : decor.C.decStart,
                cssClass : 'theor2corollary',
            },
            Varacc : {
                caption : "V'",
                decStart : decor.C.decStart,
                decEnd : decor.C.decStart,
                cssClass : 'theor2corollary',
            },
        };
        //----------------------------------------------------
        // \\// theor 2 coroll. path decor
        //----------------------------------------------------



        var middleSteps_conf = {
            // //\\ c,d,e,f
            c   : {
                decStart : LOGIC ? 5 : decor.C.decStart,
                decEnd : decor.F.decStart+2, //22, //10,
                cssClass : 'theor1proof theor2corollary',
            },
            d   : { decStart : LOGIC ? 9 : decor.D.decStart,
                    decEnd : decor.F.decStart+2,
                cssClass : 'theor1proof theor2proof theor2corollary',
            },
            e   : { decStart : LOGIC ? 13 : decor.E.decStart,
                    decEnd : decor.F.decStart+2,
                    cssClass : 'theor1proof theor2proof theor2corollary',
            },
            f   : { decStart : LOGIC ? 17 : decor.F.decStart,
                    decEnd : decor.F.decStart+2,
                    cssClass : 'theor1proof theor2proof theor2corollary',
            },
            // \\// c,d,e,f

            // //\\ c-col3
            h   : {
                caption : 'c',
                decStart : decor.C.decStart+1,
                decEnd : decor.F.decStart+4,
                cssClass : 'theor1corollary theor2proof',
            },
            g   : {
                caption : 'f',
                decStart : decor.F.decStart,
                decEnd : decor.F.decEnd,
                cssClass : 'theor1corollary',
            },
            // \\// c-col3
        };

        var forceTip_conf = {
            Z   : {
                    decStart : decor.F.decStart,
                    decEnd : decor.F.decEnd,
                    cssClass : 'theor1corollary',
                  },
            V   : { decStart : 2, decEnd : 1111111,
                    cssClass : 'theor1corollary theor2corollary'
            },
        };

        var mixedSteps_conf = ssD.mixedSteps_conf = {
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
                    doPaintPname : false,
                    cssClass : 'theor1corollary',
                  },
            T   : { decStart : 28,
                    decEnd : -2,  //no end visibility
                    doPaintPname : false,
                    cssClass : 'theor1corollary',
                    //undisplay : true,
                  },
            //sagittae ABC=middle sagitta in sagittae-parallelogram
            U   : {
                    decStart : decor.C.decStart,
                    decEnd : decor.C.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
                    cssClass : 'hidden',
            },
            //sagittae DEF=middle sagitta in sagittae-parallelogram
            W   : {
                    decStart : decor.F.decStart,
                    decEnd : decor.D.decEnd,
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
            'v-white-filler'   : {
                    decStart    : firstSteps_conf.B.decStart,
                    decEnd      : firstSteps_conf.B.decEnd, //todm too complex
                    //decStart    :  -2,
                    decEnd      : firstSteps_conf.A.decEnd, //todo patch
                    //decEnd      : firstSteps_conf.vB.decEnd,
                    doPaintPname : false,
                    pointWrap : { doPaintPname : false },
            },
        };
        ['B','C','D','E','F'].forEach( (pname, ix) => {
            let nam0 = 'VV'+ix;
            let nam1 = 'VVV'+ix;
            let nam1f = nam1+'-white-filler';
            let doPaintPname = false;
            let pcolor = sDomF.getFixedColor( 'force' )
            mixedSteps_conf[ nam0 ] = {
                doPaintPname,
                pointWrap : { doPaintPname },
                pcolor,
            };
            mixedSteps_conf[ nam1 ] = {
                doPaintPname,
                pointWrap : { doPaintPname },
                pcolor,
            };
            mixedSteps_conf[ nam1f ] = {
                doPaintPname,
                pointWrap : { doPaintPname },
                pcolor,
            };
        });
        Object.assign( decor, mixedSteps_conf );

        //---------------------------------------------------
        // //\\ comprises decor
        //---------------------------------------------------
        Object.assign( decor, middleSteps_conf );
        Object.assign( decor, forceTip_conf );
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

        ///syncs these points with hidden force-displacement-handles bases
        ['B','C','D','E','F'].forEach( (name, ix) => {
            let nam0='VV'+ix;
            rg[nam0].pos = rg[name].pos;
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
        Object.assign( sconf.pname2point, mapp( decor,              dc => dc.pos ) );
        Object.assign( sconf.pname2point, mapp( aracc_conf,         dc => dc.pos ) );
        //---------------------------------------------------
        // \\// synching rg and dec pos with pname2point
        // \\// declares decorational points
        //------------------------------------


        [
            { nam : ['A', 'B'], },
            ////todm possibly redundant, isn't pathSegment-' + pix enougth?
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
                cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
            },
            { nam : ['F', 'f'],
                decStart : rg.F.decStart,
                cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
            },
            { nam : ['B', 'c'],
                cssClass : 'theor1proof theor2corollary',
                decEnd : rg.f.decStart,
            },
            { nam : ['B', 'h'], cssClass : 'theor1corollary theor2proof', },
            { nam : ['C', 'h'], cssClass : 'theor1corollary theor2proof', },
            { nam : ['E', 'g'], cssClass : 'theor1corollary', },
            { nam : ['F', 'g'], cssClass : 'theor1corollary', },

            { nam : ['D', 'e'], cssClass : 'theor1proof theor2proof', },
            { nam : ['E', 'f'], cssClass : 'theor1proof theor2proof', },

            { nam : ['A', 'v'], decStart : -2, cssClass : 'tp-speed' },

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

            { nam : ['A', 'C'], cssClass : 'theor1corollary' },
            { nam : ['D', 'F'], cssClass : 'theor1corollary' },

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
                let pcolor = sDomF.getFixedColor( 'speed' )
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
                        ( 'pcolor', pcolorForceMove )
                        ( 'tipFill', pcolorForceMove )
                        ();
            }
            if( pNam.nam[0] === 'E' && pNam.nam[1] === 'W' ) {
                ////patch for purpose of drawing a vector tip
                let line = toreg( 'EW' )
                        ( 'vectorTipIx', 1 )
                        ( 'tipFraction', 0.4 )
                        ( 'pcolor', pcolorForceMove )
                        ( 'tipFill', pcolorForceMove )
                        ();
            }
            if( pNam.nam[0] === 'B' && pNam.nam[1] === 'V' ) {
                ////patch for purpose of drawing a vector tip
                let line = toreg( 'BV' )
                        ();
            }
            var rgElem = ssF.pnames2line(
                pNam.nam[0],
                pNam.nam[1],
                haz( pNam, 'cssClass' ), //for tp-links
                stdMod,
            );
            if( pNam.nam[0] === 'B' && pNam.nam[1] === 'V' ) {
                rgElem.svgel.style.strokeWidth = '1';
                //rgElem.svgel.style.stroke = '#00ff00';
                //rgElem.vectorArrowSvg.style.fill = '#00ff00';
                //rgElem.vectorArrowSvg.style.stroke = '#00ff00';
                //rgElem.vectorArrowSvg.style.strokeWidth = '1';
            }
            decor[ rgElem.pname ] = rgElem;
            decor[ rgElem.pname ].isPoint = false;

            ///if there is not explicit decStart in the line element, then
            ///decStart in extracted from the directional point of the line segment
            var decStart = has( pNam, 'decStart' ) ?
                pNam.decStart : rg[ pNam.nam[1] ].decStart;
            ///the same procedure happens with "end" setting
            var decEnd = has( pNam, 'decEnd' ) ?
                pNam.decEnd : rg[ pNam.nam[1] ].decEnd;
            if( pNam.nam[0] === 'S' && pNam.nam[1] === 'C' ) {
                decStart = 7;
            }
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
        ssD.logicalSteps = [
            rg.C, rg.V, rg.c, rg.Cc, rg.Bc, rg.BC, rg.SC, rg.Sc, rg.SBc,
            rg.D, rg.d, rg.Dd, rg.Cd, rg.CD, rg.SD, rg.Sd, rg.SCd, rg.SABCD, 
            rg.E, rg.e, rg.Ee, rg.De, rg.DE, rg.SE, rg.Se, rg.SDe,
            rg.F, rg.f, rg.Ff, rg.Ef, rg.EF, rg.SF, rg.Sf, rg.SEf, rg.SABCDEF,
        ];
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
        rg.ABCV.decStart = 7;
        rg.DEFZ.decStart += 1;
        rg.DEFZ.decEnd += 1;
    }

    function keplerPolyNames_2_rg8media(
    ){
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
                'theor1proof tofill',
                null,
                !!'undisplay',
                !'tostroke',
                stdMod,
            );
            var lp = rg[ pNames[ pNames.length-1 ] ];
            decor[ rgElem.pname ] = rgElem;
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = 4 * 1.2 * sconf.numberOfManyBases;
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

