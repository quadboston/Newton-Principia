(function(){
    const { sn, eachprop, mapp, nspaste, haz, has, haff,
            sconf, toreg, rg, ssF, ssD, sDomF, amode, stdMod,
            fixedColors, fixedColorsOriginal, originalPoints,
    } = window.b$l.apptree({ stdModExportList : { sconf_points8lines, }, });
    const decor = sn( 'decor', stdMod );
    const LOGIC = false; //true; //makes logic steps c and C clearer;
    return;


//-------------------------------------------------------
// //\\ declares decorations
//      complimentary to and runs after
//      sconf.js::init_conf(),
//
//      runs only once at start of init_model_parameters,
//-------------------------------------------------------
function sconf_points8lines (){
    var {
        force,
        pcolorForceMove,
        freeMove,
        forceMove,
        diagram,
        path,
        time,
        sagittaeChords,
        speed,

        trianglePurpleTextAreaColor,
        triangleGreen,

        perpendicular,
        tangent,
    } = fixedColors;
    ///topic names elected
    var tpel = {
        speed,
        force,
        forceMove,
        time,                       //Time slider
        dt                  : time, //Delta time slider
        path,
        "path-change"       : path,

        //The following sets the color of the text in
        //the text area for these triangles.  If
        //these are placed after "kepler-triangle-odd" and
        //"kepler-triangle-even", they will
        //also set the triangle color in the model area.
        //If these are removed the triangles
        //default to red and green "zebra-colors"
        //(for more see "colors-lib.js" section
        //"generates pseudo-random zebra colors" in function
        //lowtpid__2__glocss8anchorRack).
        "SBC"               : trianglePurpleTextAreaColor,
        "SCD"               : trianglePurpleTextAreaColor,
        "SDE"               : trianglePurpleTextAreaColor,
        "SEF"               : trianglePurpleTextAreaColor,
        "SAB"               : trianglePurpleTextAreaColor,

        "kepler-triangle-odd"   : fixedColors["kepler-triangle-odd"],
        "kepler-triangle-even"  : fixedColors["kepler-triangle-even"],

        "sagitta-chords"    : sagittaeChords,

        "SBc"               : triangleGreen,
        "SCd"               : triangleGreen,
        "SDe"               : triangleGreen,
        "SEf"               : triangleGreen,

        "A"                 : path,
        "B"                 : path,
        "C"                 : path,
        "D"                 : path,
        "E"                 : path,
        "F"                 : path,

        "AB"                : path,
        "BC"                : path,
        "CD"                : path,
        "DE"                : path,
        "EF"                : path,

        "ABCV"              : forceMove,
        "DEFZ"              : forceMove,

        "Sc"                : diagram,
        "Sd"                : diagram,
        "Se"                : diagram,
        "Sf"                : diagram,

        "Cc"                : forceMove,
        //Duplicate of "Cc" used by P1 Corollary 3.
        //Also referenced in cohen.txt
        "Ch"                : forceMove,
        "Dd"                : forceMove,
        "Ee"                : forceMove,
        "Ff"                : forceMove,
        //Duplicate of "Ff" used by P1 Corollary 3.
        //Also referenced in cohen.txt
        "Fg"                : forceMove,
        "force-0-applied"   : forceMove,
        "force-1-applied"   : forceMove,
        "force-2-applied"   : forceMove,
        "force-3-applied"   : forceMove,
        "force-4-applied"   : forceMove,

        "force-center"      : force,
        "S"                 : force,

        "SA"                : diagram,
        "SB"                : diagram,
        "SC"                : diagram,
        "SD"                : [255,0,0], //diagram,
        "SE"                : diagram,
        "SF"                : diagram,

        "BU"                : forceMove,
        "EW"                : forceMove,
        "AC"                : sagittaeChords,
        "Av"                : speed,
        "DF"                : sagittaeChords,

        force,
        "Z"                 : force,
        "V"                 : force,
        "BV"                : forceMove,

        //perpendicular
        "SP"                : perpendicular,
        "P"                 : perpendicular,
        //tangent
        "T"                 : tangent,
        "TP"                : tangent,

        "free-path"         : freeMove,
        "c"                 : freeMove,
        "h"                 : freeMove, //Duplicate of "c" used by P1 Corollary 3
        "d"                 : freeMove,
        "e"                 : freeMove,
        "f"                 : freeMove,
        "g"                 : freeMove, //Duplicate of "f" used by P1 Corollary 3

        "Bc"                : freeMove,
        //Duplicate of "Bc" used by P1
        // Corollary 3.  Also referenced in cohen.txt
        "Bh"                : freeMove, 
        "Cd"                : freeMove,
        "De"                : freeMove,
        "Ef"                : freeMove,
        //Duplicate of "Ef" used by P1 Corollary 3  Also referenced in cohen.txt
        "Eg"                : freeMove, 
        "free-triangle"     : freeMove,
    };
    var p2_elected = haff( ssD, 'P2_electedTopicColors' );
    if( p2_elected ) {
        Object.assign( tpel, p2_elected );
    }
    
    //******************************
    // //\\ points config
    //******************************
    //------------------------------------
    // //\\ declares decorational points
    //      A,B are special d8d points,
    //      in model space
    //------------------------------------
    var firstSteps_conf = {
        A   : { decStart : -2, decEnd : 1111111111,
                draggableX : true, draggableY : true,
              },
        B   : { decStart : -2, decEnd : 1111111111,
              },
    };
    Object.assign( decor, firstSteps_conf );
    //----------------------------------------------------
    // //\\ proof points initial settings
    //----------------------------------------------------
    var CDEF_conf = {
        C   : {
            // //\\ templates are labeled with //t/
            decStart : 6,
            //pcolor : force,
            //cssClass : 'tp-force',
            //t/ X : {
            //t/ caption : 'X',
            //t/ pos: S,
            //t/ letterAngle : -90, //works
            //t/ letterRotRadius : 40, //works
            //t/ draggableX  : true,
            //t/ draggableY  : fconf.sappId === 'b1sec2prop7',
            //t/ initialR    : 5 * sconf.controlsScale, //works
            //t/ fontSize : 30,
            //t/ undisplayAlways : true,
            //t/ doPaintPname : false,
            // \\// templates are labeled with //t/
        },
        D   : { decStart : 10, },
        E   : { decStart : 14,
                letterAngle : 45,
        },
        F   : { decStart : 18,
                letterAngle : 90,
        },
    };
    ///makes proof points disappear after a while
    eachprop( CDEF_conf, (fs, kName) => {
        fs.decEnd = sconf.numberOfManyBases*4 *
                    sconf.FIRST_POINT_LABELS_DISPLAY_LIMIT;
    });
    Object.assign( decor, CDEF_conf );
    //----------------------------------------------------
    // \\// proof points initial settings
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
            cssClass : 'theor1proof theor2proof theor2corollary',
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
        h   : {     //Duplicate used by P1 Corollary 3 see
                    //"sconf.js" predefinedTopics for more
            caption : 'c',
            decStart : decor.C.decStart+1,
            decEnd : decor.F.decStart+4,
            cssClass : 'theor1corollary theor2proof',
        },
        g   : {     //Duplicate used by P1 Corollary 3 see
                    //"sconf.js" predefinedTopics for more
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
                decStart : -2, //always visible
                letterAngle : -90,
              },
        v   : {
                //pos      : sconf.B.concat(),
                decStart : -2, //always visible
                draggableX : true, draggableY : true,
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
        let nam0 = 'VV'+ix;  //starts of forces
        let nam1 = 'VVV'+ix; //tips of forces (double sagittas)
        //possibly white kernels, possibly duplicates
        let nam1f = nam1+'-white-filler';
        let doPaintPname = false;
        let pcolor = tpel.force;
        mixedSteps_conf[ nam0 ] = {
            doPaintPname,
            pointWrap : { doPaintPname },
            pcolor,
            initialR    : 5 * sconf.controlsScale,
        };
        //tips of foreces (double sagittas)
        mixedSteps_conf[ nam1 ] = {
            doPaintPname,
            pointWrap : { doPaintPname },
            pcolor,
            initialR    : 5 * sconf.controlsScale,
            draggableX : true,
            draggableY : true,
        };
        mixedSteps_conf[ nam1f ] = {
            doPaintPname,
            pointWrap : { doPaintPname },
            pcolor,
        };
    });
    Object.assign( decor, mixedSteps_conf );
    Object.assign( decor, middleSteps_conf );
    Object.assign( decor, forceTip_conf );
    Object.assign( decor, aracc_conf );

    ///unifies with originalPoints
    Object.keys( decor ).forEach( propKey => {
        const point = decor[propKey];
        const pointRack = originalPoints[propKey]={};
        Object.keys( point ).forEach( pointKey => {
            let pointProp = point[pointKey];
            pointRack[pointKey] = pointProp;
        });
    });
    
    //---------------------------------------------------
    // //\\ equalizing points in decor and rg
    //---------------------------------------------------
    eachprop( decor, (dec,pname) => {
        rgElem = sn( pname, rg );
        rgElem.pname = pname;
        rgElem.isPoint = true;
        var doPaintPname    = has( dec, 'doPaintPname' ) ?
                              dec.doPaintPname : true;
            Object.assign( dec, {
            doPaintPname,
            isPoint : true,

            //todm ? ... proliferated coding: medpos, pos, ...  are two places:
            //           because of pWrap of itself is a
            //           proliferation of rg.pname rack
            pointWrap : {
                pos : [0,0],
                pname,
                doPaintPname,
            },
        });
        Object.assign( rg[ pname ], dec );
        Object.assign( dec, rg[ pname ] );
        rg[ pname ] = dec;
    });
    //---------------------------------------------------
    // \\// equalizing decor and rg
    // \\// points config
    //******************************

    //******************************
    // //\\ lines config
    //******************************
    [
        { nam : ['A', 'B'], },  // AB
        ////todm possibly redundant, isn't pathSegment-' + pix enough?
        { nam : ['B', 'C'], },  // BC
        { nam : ['C', 'D'], },  // CD
        { nam : ['D', 'E'], },  // DE
        { nam : ['E', 'F'], },  // EF

        { nam : ['S', 'A'], },  // SA
        { nam : ['S', 'B'], },  // SB
        { nam : ['S', 'C'], },  // SC
        { nam : ['S', 'D'], },  // SD
        { nam : ['S', 'E'], },  // SE
        { nam : ['S', 'F'], },  // SF

        { nam : ['S', 'P'],     // Sc
            cssClass : 'theor1proof',
        },

        { nam : ['T', 'P'],     // Sc
            cssClass : 'theor1proof',
        },

        { nam : ['S', 'c'],     // Sc
            cssClass : 'theor1proof',
        },
        { nam : ['S', 'd'],     // Sd
            cssClass : 'theor1proof',
        },
        { nam : ['S', 'e'],     // Se
            cssClass : 'theor1proof',
        },
        { nam : ['S', 'f'],     // Sf
            cssClass : 'theor1proof',
        },

        //this is a thin line, which remains after thick line goes away,
        { nam : ['C', 'c'], decStart : rg.C.decStart,   // Cc
            cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
        },
        { nam : ['D', 'd'],                             // Dd
            decStart : rg.D.decStart,
            cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
        },
        { nam : ['E', 'e'],                             // Ee
            decStart : rg.E.decStart,
            cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
        },
        { nam : ['F', 'f'],                             // Ff
            decStart : rg.F.decStart,
            cssClass : 'theor1proof theor2proof theor2corollary tp-force-_move',
        },
        { nam : ['B', 'c'],                             // Bc
            cssClass : 'theor1proof theor2proof theor2corollary',
            decEnd : rg.f.decStart,
        },
        { nam : ['C', 'd'],                             // Cd
            cssClass : 'theor1proof theor2proof',
            decEnd : rg.f.decStart,
        },
        { nam : ['B', 'h'], cssClass : 'theor1corollary theor2proof', },
        // Bh   Duplicate used by P1 Corollary 3 see "sconf.js"
        //predefinedTopics for more
  
        { nam : ['C', 'h'], cssClass : 'theor1corollary theor2proof', },
        // Ch   Duplicate used by P1 Corollary 3 see "sconf.js"
        //predefinedTopics for more
        { nam : ['E', 'g'], cssClass : 'theor1corollary', },
        // Eg   Duplicate used by P1 Corollary 3 see "sconf.js" predefinedTopics
        //for more
        { nam : ['F', 'g'], cssClass : 'theor1corollary', },
        // Fg   Duplicate used by P1 Corollary 3 see "sconf.js"
        //predefinedTopics for more

        { nam : ['D', 'e'], cssClass : 'theor1proof theor2proof', },        // De
        { nam : ['E', 'f'], cssClass : 'theor1proof theor2proof', },        // Ef

        { nam : ['A', 'v'], decStart : -2, cssClass : 'tp-speed' },         // Av

        { nam : ['S', 'P'], decStart : -2,                                  // SP
            cssClass : 'theor1corollary', }, //for perpendicular
        { nam : ['T', 'P'], decStart : -2,                                  // TP
            cssClass : 'theor1corollary', }, //for tangent

        { nam : ['B', 'U'], //saggitae at B                                 // BU
            cssClass : 'hover-width theor1corollary' //for specaial width at hover
        },
        { nam : ['B', 'V'],                                                 // BV
            cssClass : 'hover-width theor1corollary theor1proof'
        },

        { nam : ['E', 'W'],  //saggitae at E                                // EW
            decStart : rg.F.decStart,
            cssClass : 'hover-width theor1corollary'
        },

        { nam : ['A', 'C'], cssClass : 'theor1corollary' },                 // AC
        { nam : ['D', 'F'], cssClass : 'theor1corollary' },                 // DF

        { nam : ['c','Caracc'], cssClass : 'theor2corollary', },        // cCaracc
        { nam : ['C','Caracc'], cssClass : 'theor2corollary', },        // CCaracc
        { nam : ['S','Caracc'], cssClass : 'theor2corollary', },        // SCaracc
        { nam : ['B','Caracc'], cssClass : 'theor2corollary', },        // BCaracc
        { nam : ['B','Paracc'], cssClass : 'theor2corollary', },        // BParacc
        { nam : ['C','Paracc'], cssClass : 'theor2corollary', },        // CParacc
        { nam : ['V','Varacc'], cssClass : 'theor2corollary', },        // VVaracc
        { nam : ['B','Varacc'], cssClass : 'theor2corollary', },        // BVaracc
        { nam : ['Caracc','Paracc'], cssClass : 'theor2corollary', },
        // CaraccParacc

    ].forEach( pNam => {
        const lineName = pNam.nam[0]+pNam.nam[1];
        let laObj = {};
        laObj[ lineName ] = {
            isLine : true,
            //placeholder to add for expand array,
            //fe caption
            //caption : "MOO", //works
        };
        sconf.linesArray.push(laObj);

        if( pNam.nam[0] === 'A' && pNam.nam[1] === 'v' ) {
            ////patch for purpose of drawing a vector tip
            let pcolor = sDomF.getFixedColor( 'speed' );
            let line = toreg( 'Av' )
                    //expand config misses some of these
                    ( 'vectorTipIx', 1 )
                    ( 'tipFraction', 0.15 ) //works
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
            let line = toreg( 'BV' )();
        }
         const cssClass = haz( pNam, 'cssClass' );
        if( cssClass ) {
            laObj[ lineName ].cssClass = cssClass;
        }
        //equalizing rg and decor elements:
        let rgElem = decor[ lineName ] = sn( lineName, rg );
        rgElem.pname = lineName;
        rgElem.pivotNames = [pNam.nam[0],pNam.nam[1]];
        rgElem.isPoint = false;

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
    });

    toreg( 'displayTime' )( 'value', '' );
    toreg( 'thoughtStep' )( 'value', '' );

    //---------------------------------------------------
    // //\\ equalizes decor and rg
    //---------------------------------------------------
    /*
    eachprop( decor, (dec,kName) => {
        if( dec.isPoint ) return; //avoids dubbing work
        var pname = kName;
        toreg( kName );
        Object.assign( decor[ kName ], rg[ kName ] );
        Object.assign( rg[ kName ], decor[ kName ] );
        decor[ kName ] = rg[ kName ];
    });
    */
    //---------------------------------------------------
    // \\// equalizes decor and rg
    //---------------------------------------------------

    //==================================================
    // //\\ equalizes predefinedTopics, fixedColors, and
    // fixedColorsOriginal
    // which should be done in the core,
    //
    // this is abnormal, there must be two arrays:
    // topics_repo and tpel
    //
    // expands predefinedTopic colors into rg,
    // todo rg.SCd will be crashed later without this
    // expansion, this scenario must have more steps    
    //==================================================
    sconf.predefinedTopics = tpel;
    ////array tpel will be discraded upon leaving this function,
    Object.keys( tpel ).forEach( tpCamel => {
        //generates rg for all topics,
        //this code is a substitute of expand-config.js
        toreg( tpCamel )( 'pname', tpCamel );
        var tpLowKey = sDomF.topicIdUpperCase_2_underscore( tpCamel );
        //compliments fixedColors from stuff created in this sconf,
        //fixedColors are based on non-Camel id,
        var fck = fixedColors[ tpLowKey ] = tpel[ tpCamel ].concat();
        //compensates missing of "extend-confib" in engine core
        fixedColorsOriginal[ tpCamel ] = fck; //based on Camel Id
        //todo why rg colors are not set here?
    });
    if( has( ssD, 'P2_electedTopicColors' ) ) {
        ////we are working in prop 2,
        ////above condition is a flag
        Object.keys( p2_elected ).forEach( camelId => {
            if( camelId === 'SBCaracc' ) return;
            var tpLowKey = sDomF.topicIdUpperCase_2_underscore( camelId );
            let fc = fixedColorsOriginal[ camelId ] =
                    fixedColors[ tpLowKey ] =
                    tpel[ camelId ];
                //this thing only affects difference between strokable
                //and areas like this:
        });
    }
    //==================================================
    // \\// equalizes predefinedTopics, fixedColors, and
    //==================================================
    
    //Update decStart for the following decorations if needed,
    //to ensure they start becoming visible for the specified steps.
    if (sconf.TIMER_AND_LOGIC_STEPS_COINSIDE === false) {
        rg.SC.decStart = 7;
        [ rg.D, rg.d, rg.Dd, rg.Cd, rg.CD, rg.SD, rg.Sd, rg.SCd ].forEach( pn => {
            pn.decStart = rg.SC.decStart + 4;
        });
        [ rg.E, rg.e, rg.Ee, rg.De, rg.DE, rg.SE, rg.Se, rg.SDe ].forEach( pn => {
            pn.decStart = rg.SC.decStart + 8;
        });
        [ rg.F, rg.Z, rg.W, rg.EW, rg.DF, rg.f, rg.Ff, rg.Ef, rg.EF,
            rg.SF, rg.Sf, rg.SEf,
            rg.g, rg.Eg, rg.Fg ].forEach( pn => {
            //Duplicate g, Eg, Fg used by P1 Corollary 3 see "sconf.js"
            //predefinedTopics for more
            pn.decStart = rg.SC.decStart + 12;
        });
    }

    //Update decEnd for the following decorations, to ensure they are
    //hidden once the time slider is advanced beyond point F.
    [
        rg.c, rg.Cc, rg.Bc, rg.Sc, rg.SBc,
        rg.d, rg.Dd, rg.Cd, rg.SD, rg.Sd, rg.SCd,
        rg.e, rg.Ee, rg.De, rg.SE, rg.Se, rg.SDe,
        rg.f, rg.Ff, rg.Ef, rg.SF, rg.Sf, rg.SEf,
    ].forEach( pn => {
        pn.decEnd = rg.f.decStart + 3;
    });
    //******************************
    // \\// lines config
    //******************************
}})();
