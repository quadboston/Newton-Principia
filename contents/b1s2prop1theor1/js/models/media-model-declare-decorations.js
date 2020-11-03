( function() {
    var {
        ns, sn,
        sconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            declaresMediaDecorationElements,
            updatePolygons,
        },
    });
    return;











    //----------------------------------------
    // //\\ declares decorations
    //      should run only one time ... todm,
    //      runs only once in first media_upcreate call,
    //----------------------------------------
    function declaresMediaDecorationElements()
    {
        //------------------------------------
        // //\\ declares decorational points
        //------------------------------------
        ns.sn( 'decor', ssD );
        sconf.pname2point =
        {
            A   : sconf.A,
            C   : [0,0], //fake
            D   : [0,0],
            E   : [0,0],
            F   : [0,0],
            Z   : [0,0],
            V   : [0,0],


            S   : [0,0],
            P   : [0,0], //will be cross of speed and perpendicular to it
            T   : [0,0], //will be starting point for line reaching P
            U   : [0,0], //sagittae ABC
            W   : [0,0], //sagittae DEF

            b   : [0,0], //fake
            c   : [0,0],
            d   : [0,0],
            e   : [0,0],
            f   : [0,0],
        };
        ns.eachprop( sconf.pname2point, (pos,pname) => {
            ssD.decor[ pname ] = ssF.toreg( pname )
            ({
                pos,
                medpos : [0,0], //fake
                pname,
                //todm ... proliferated coding: medpos, pos, ...  are two places:
                //         because of pWrap of itself is a proliferation of rg.pname rack
                pointWrap : { pos, pname },
            })
            ();
        });

        //B is a special which is already featured in study-model.js
        sconf.pname2point.B = rg.B.pos;
        rg.B.medpos = [0,0]; //fake //todm seems weird ... why?
        ssD.decor.B = rg.B;

        ns.eachprop( ssD.decor, dec => {
            dec.pointWrap.doPaintPname = true;
        });
        //rg.T.doPaintPname = false; //it will coinside with other points
        rg.A.decoration_pathIx = 0;
        rg.B.decoration_pathIx = 0;
        rg.C.decoration_pathIx = 3;
        rg.c.decoration_pathIx = 3;
        rg.D.decoration_pathIx = 4;
        rg.d.decoration_pathIx = 4;
        rg.E.decoration_pathIx = 5;
        rg.e.decoration_pathIx = 5;
        rg.F.decoration_pathIx = 6;
        rg.f.decoration_pathIx = 6;
        rg.Z.decoration_pathIx = 6;
        rg.V.decoration_pathIx = 3;
        ns.eachprop( ssD.decor, dec => {
            dec.decoration_range = [ dec.decoration_pathIx, dec.decoration_pathIx+11 ];
        });
        rg.c.decoration_range = [3,3];
        rg.d.decoration_range = [4,4];
        rg.e.decoration_range = [5,6];
        rg.f.decoration_range = [6,7];


        rg.U.decoration_range = [ 7,7 ];
        rg.W.decoration_range = [ 7,7 ];
        rg.U.pointWrap.doPaintPname = false;
        rg.W.pointWrap.doPaintPname = false;
        //------------------------------------
        // \\// declares decorational points
        //------------------------------------

        [
            ['A', 'B'],
            ['B', 'C'],
            ['C', 'D'],
            ['D', 'E'],
            ['E', 'F'],

            ['S', 'A'],
            ['S', 'B'],
            ['S', 'C'],
            ['S', 'D'],
            ['S', 'E'],
            ['S', 'F'],

            ['S', 'b'],
            ['S', 'c'],
            ['S', 'd'],
            ['S', 'e'],
            ['S', 'f'],

            ['C', 'c'],
            ['D', 'd'],
            ['E', 'e'],
            ['F', 'f'],

            ['B', 'c'],
            ['C', 'd'],
            ['D', 'e'],
            ['E', 'f'],

            ['B', 'V'],
            ['E', 'Z'],

            ['C', 'V'],
            ['A', 'V'],
            ['F', 'Z'],
            ['D', 'Z'],

            ['S', 'P'], //for perpendicular
            ['T', 'P'], //for tangent

            ['B', 'U'],
            ['E', 'W'],
            ['A', 'C'],
            ['D', 'F'],


        ].forEach( pNam => {
            var rgElem = ssF.pnames2line( pNam[0], pNam[1] );
            ssD.decor[ rgElem.pname ] = rgElem;

            ////--------------------------------------
            //// last point defines range and ix
            ////--------------------------------------
            //:specifies when to set and turn on/off this decoration
            rgElem.decoration_pathIx = rg[ pNam[1] ].decoration_pathIx;
            rgElem.decoration_range = rg[ pNam[1] ].decoration_range;
        });
        rg.SP.decoration_range = [ 0, -2 ]; //disables range management
        rg.TP.decoration_range = [ 0, -2 ]; //disables range management
        rg.P.decoration_range = [ 0, -2 ];  //disables range management
        rg.T.decoration_range = [ 0, -2 ];  //disables range management
        rg.T.undisplay = true;

        rg.AC.decoration_range = [ 7, 7 ];
        rg.DF.decoration_range = [ 7, 7 ];

        updatePolygons();

        ssF.toreg( 'displayTime' )( 'value', '' );
        ssF.toreg( 'displayStep' )( 'value', '' );
        ssF.toreg( 'thoughtStep' )( 'value', '' );
    }
    //----------------------------------------
    // \\// declares decorations
    //----------------------------------------


    /// decoration triangles and polygons
    function updatePolygons()
    {
        [
            /*
            ['A', 'B', 'S'],
            */
            ['A', 'B', 'C', 'V'],
            ['D', 'E', 'F', 'Z'],
        ].forEach( pNames => {
            var rgElem = ssF.pnames2poly( pNames );
            ssD.decor[ rgElem.pname ] = rgElem;

            ////--------------------------------------
            //// lead Point defines range and ix
            ////--------------------------------------
            var leadPoint = pNames.length === 4 ? pNames.length-1 : pNames.length-2;

            rgElem.decoration_pathIx = rg[ pNames[leadPoint] ].decoration_pathIx;
            rgElem.decoration_range = rg[ pNames[leadPoint] ].decoration_range;
        });
        rg.ABCV.decoration_range = [3,7];
        //rg.DEFZ.decoration_range = [5,6];
    }

}) ();

