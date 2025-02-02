( function() {
    var {
        sn, haz, $$, nsmethods, nspaste, nssvg, mcurve, integral, mat, has,
        fconf, ssF, sData, sDomF,
        stdMod, amode, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
            buildsQuadPlot,
        },
    });
    var op = sn( 'orbitParameters', sconf );
    return;










    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        ccc( 'mod 44' );
        stdMod.quadratures();
        //if( !stdMod.drop8pointE() ) {
            ////must not happen
        //}

        //time T and angle F points
        let orbSolved = sData.quadSolved;
        let F = orbSolved.F;
        let kernel = orbSolved.kernel;
        let xy = rg[ 'approximated-curve' ].curvePoints;
        nspaste( rg.a.pos, kernel.Tkernel[ orbSolved.fiStartedIx - orbSolved.roPlus0Top ] );
        {
            var Dpos = rg.D.pos;
            var tk = kernel.Tkernel;
            var fk = kernel.Fkernel;
            let start = tk[0][1];
            let l1 = tk.length - 1;
            let end = tk[ l1 ][1];
            let fraction = ( Dpos[1] - start ) / (end - start);
            //====================================
            var iqD = Math.floor( fraction * l1 ); //iqD is from top point or turn point ix
            //====================================
            nspaste( rg.b.pos, tk[iqD] );
            nspaste( rg.c.pos, fk[iqD] );

            nspaste( rg.vgpoint.pos, kernel.vgraph[iqD] );
            nspaste( rg.vgpoint.pos, kernel.v2graph[iqD] );
            nspaste( rg.Zgpoint.pos, kernel.Zgraph[iqD] );
            nspaste( rg.Z2graph.pos, kernel.Z2graph[iqD] );

            let dp = xy[ orbSolved.dropPointIx ];
            nspaste( rg.A.pos, [ rg.A.pos[0], dp[1] ] );
            nspaste( rg.B.pos, [ dp[0], dp[1] ] );

            var Epos = rg.E.pos;
            nspaste( Epos, [ Dpos[0], Dpos[1] - sconf.dRo ] );
            fraction = ( Epos[1] - start ) / (end - start);
            var iqE = Math.floor( fraction * l1 );
            nspaste( rg.z.pos, kernel.Tkernel[iqE] );
            nspaste( rg.x.pos, fk[iqE] );

            start = xy[0][1];
            l1 = xy.length - 1;
            end = xy[ l1 ][1];
            fraction = ( Dpos[1] - start ) / (end - start);
            let iqF = Math.floor( fraction * l1 );
            nspaste( rg.F.pos, xy[iqF] );
        }


        //point on spheres
        {
            var R = rg.V.pos[1]; //because C is an origin [0,0]
            let aOfR = sconf.angleOfR;
            nspaste( rg.R.pos, [ -R * Math.sin( aOfR ), R * Math.cos( aOfR ) ] );

            let FiD = F[iqD];
            rg.X.FiD = FiD;
            nspaste( rg.X.pos, [ -R * Math.sin( FiD ), R * Math.cos( FiD ) ] );

            let FiE = F[iqE];
            nspaste( rg.Y.pos, [ -R * Math.sin( FiE ), R * Math.cos( FiE ) ] );
            rg.Y.FiE = FiE;

            //radius D
            let RadD = Dpos[1];
            nspaste( rg.I.pos, [ -RadD * Math.sin( FiD ), RadD * Math.cos( FiD ) ] );

            //radius E
            let RadE = Epos[1];
            nspaste( rg.K.pos, [ -RadE * Math.sin( FiE ), RadE * Math.cos( FiE ) ] );

            //point N
            nspaste( rg.N.pos, [ -RadE * Math.sin( FiD ), RadE * Math.cos( FiD ) ] );

            //point k
            var iqk = fk.length - 1;
            let Fiend = F[iqk];
            var Rend = fk[iqk][1];
            nspaste( rg.k.pos, [ -Rend * Math.sin( Fiend ), Rend * Math.cos( Fiend ) ] );
        }


        //areas
        {
            let firstIx = orbSolved.fiStartedIx - orbSolved.roPlus0Top;
            pivots2graph( 'fiArea', kernel.Fkernel, iqD, firstIx );
            pivots2graph( 'Tarea', kernel.Tkernel, iqD, firstIx );
            pivots2graph(
                'VSarea',
                xy, Math.min( xy.length-1, iqD+orbSolved.roPlus0Top ), //todm why block?
                orbSolved.dropPointIx
            )
        }

        //----------------------------------------
        // //\\ orbit areas
        //----------------------------------------
        {
            let pname = 'ICK';
            let graph = sData.quadSolved.orbit;
            let rgX = toreg( pname )( 'pname', pname )();
            let pivots = rgX.pivots = [];

            //:fills model pivots
            pivots.push( [ rg.C.pos[0], rg.C.pos[1], ] );
            for( let iq=iqD; iq<=iqE; iq++ ) {
                pivots.push( graph[iq] );
            }

            //builds
            buildsQuadPlot( rgX, 'fill' );
        }

        {
            let pname = 'VIC';
            let graph = sData.quadSolved.orbit;
            let rgX = toreg( pname )( 'pname', pname )();
            let pivots = rgX.pivots = [];

            //:fills model pivots
            pivots.push( [ rg.C.pos[0], rg.C.pos[1], ] );
            for( let iq=0; iq<=iqD; iq++ ) {
                pivots.push( graph[iq] );
            }

            //builds
            buildsQuadPlot( rgX, 'fill' );
        }
        //----------------------------------------
        // \\// orbit areas
        //----------------------------------------




        pivots2graph( 'IK', sData.quadSolved.orbit, iqE, iqD, 'stroke' );

        pivots2graph( 'D𝑐𝑥E', kernel.Fkernel, iqE, iqD );
        pivots2graph( 'D𝑏𝑧E', kernel.Tkernel, iqE, iqD );

        //---------------------------
        // //\\ v and momentum
        //---------------------------
        rg.M.pos[0] = rg.v.pos[0];
        {
            let M = Math.sin( op.angleOmega ) * op.Kepler_v * 1;
            let ro = rg.I.pos;
            let Mfactor = M / ( ro[0]*ro[0] + ro[1]*ro[1] );
            let norm = [ -ro[1]*Mfactor, ro[0]*Mfactor ];
            nspaste( rg.Z.pos, mat.sm( rg.I.pos, norm ) );
        }

        //decorates
        rg[ 'V,v' ].caption = 'vₒ = ' + op.Kepler_v.toFixed(3);
        //---------------------------
        // \\// v and momentum
        //---------------------------
    }




    function pivots2graph( pname, graph, lastIq, firstIq, fill0stroke )
    {
        //alternates
        fill0stroke = fill0stroke || 'fill';
        firstIq = firstIq || 0;

        //sets registry space
        let rgX = toreg( pname )( 'pname', pname )();
        let pivots = rgX.pivots = [];

        //:fills model pivots
        fill0stroke === 'fill' && pivots.push( [ 0, graph[firstIq][1] ] );
        for( let iq=firstIq; iq<=lastIq; iq++ ) {
            pivots.push( graph[iq] );
        }
        fill0stroke === 'fill' && pivots.push( [ 0, graph[lastIq][1] ] );

        //builds
        buildsQuadPlot( rgX, fill0stroke );
    }


    function buildsQuadPlot( rgX, fill0stroke )
    {
        fill0stroke = fill0stroke || 'stroke';

        //fills media pivots
        var pivots = rgX.pivots.map( p => ssF.mod2inn( p, stdMod ) );

        //draws svg
        nssvg.polyline({
            rgX,
            pivots,
            svgel   : haz( rgX, 'svgel' ),
            parent  : stdMod.svgScene,
        });

        //:paints colors
        var lowname = sDomF.topicIdUpperCase_2_underscore( rgX.rgId );
        rgX.svgel$.addClass( 'to' + fill0stroke + ' thickable tp-' + lowname );
    }

}) ();

