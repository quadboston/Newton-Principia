///=======================================================
/// quadratures lib
///=======================================================

( function() {
    var {
        sn, $$, has, haz, mat, nssvg, mcurve, nspaste,
        fconf, sData, ssF, sDomF,
        amode, stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            quadratures,
            forceIsBounded,
        },
    });
    var op = sn( 'orbitParameters', sconf );
    return;






    ///possibly, "graph of force is bounded on diagram"
    function forceIsBounded( xy )
    {
        var len = xy.length;
        var solvable = true;
        for (var iq=0; iq<len; iq++ )
        {
            var fr = xy[iq];
            if(
                fr[0] > 1000 ||
                fr[0] < 0   //no repelling force
            ) {
                solvable = false;
                break;
            }
        }
        //stdMod.pos2qix = pos2qix;
        return { solvable, fr };
    }

    function quadratures()
    {

        //decoration
        let vgraph = [];
        let v2graph = [];
        let Zgraph = [];
        let Z2graph = [];

        //:0-els. are in cycle:
        let Fkernel = [];
        let Tkernel = [];

        //F = conic's polar angle Fi/2
        let F = [0];
        //time,
        let T = [0];

        let xy = rg[ 'approximated-curve' ].curvePoints;

        //:prepares 0-elements
        var r0      = rg.V.pos;
        let R       = r0[1] - rg.C.pos[1];
        let M       = Math.sin( op.angleOmega ) * op.Kepler_v * R;
        let R2      = R*R;
        {
            let lastIx      = xy.length-1;
            let last        = xy[ lastIx ] [1];
            let first       = xy[ 0 ] [1];
            var fiStartedIx = Math.ceil( ( first - r0[1] ) / ( first - last ) * lastIx );
            fiStartedIx     = Math.min( lastIx-1, fiStartedIx );
        }
        var { dropPointIx, vback, roPlusIx } = findsDropPoint( fiStartedIx )
        //if dropPointIx === 0, then drop point does not exist
        var roPlus0Top = roPlusIx || dropPointIx;
        let v = vback[ roPlus0Top - dropPointIx ][ 0 ];
        let v2 = v * v;
        var roMinusIx = null;
        let frBefore = xy[0];
        let orbit    = [];
        for( let iq=0, len = xy.length-roPlus0Top; iq<len; iq++ ){
            const SAFE_MINUS_IX = 2;
            var iqFull  = iq + roPlus0Top;
            let fr      = xy[ iqFull ];
            let ro      = fr[1];
            if( ro < 1e-50 ) break;

            // //\\ speed
            if( iq > 0 ) {
                var dr = frBefore[1]-ro; //artificially positive
                ////integrates v2
                //v2[iq] = v2[iq-1] + dr * fr[0];
                v2 = v2 + dr * fr[0];
            }
            frBefore = fr;
            // \\// speed

            // //\\ kernel
            let Z = M / ro;
            let potentialWell = v2 - Z*Z;
            if( potentialWell < 0.001 &&

                //todm make this solution more automatic,
                //experimentally we have noted that y-dimension of the potential
                //well is not less than about 0.5, which is hundreds of index units,
                //so it is save to make this number even more than 6,
                iq > 6
            ) {
                roMinusIx = roPlus0Top + iq - SAFE_MINUS_IX;
                //ccc( 'min found='+ roMinusIx + ' iq='+iq );
                break;
            }
            let T_Kernel = R2/2 * M / Math.sqrt( potentialWell );
            F_Kernel = 1 / (ro*ro) * T_Kernel; //for area of Fi because of R2/2
            // \\// kernel

            if( iq > 0 ) {
                // //\\ quadratures
                T[iq] = T[iq-1] + T_Kernel * dr;
                F[iq] = F[iq-1] + F_Kernel * dr;
                // \\// quadratures
            }

            v2graph[iq]    = [ v2, ro ];
            vgraph[iq]     = [ Math.sqrt(v2), ro ]; 
            Tkernel.push( [T_Kernel, ro] );
            Fkernel.push( [F_Kernel, ro] );
            Zgraph[iq]     = [Z,ro]; 
            Z2graph[iq]    = [Z*Z,ro]; 

            if( fiStartedIx === iqFull ) {
                var fi0 = F[iq];
                var t0 = T[iq];
            }
        }
        for( let iq=0, Flen = F.length; iq<Flen; iq++ ) {
            let Fi = F[iq] = 2/R2 * ( F[iq] - fi0 );
            T[iq] -= t0;
            let ro = xy[ iq + roPlus0Top ][ 1 ];
            orbit[ iq ] = [ -ro * Math.sin( Fi ), ro * Math.cos( Fi ) ];
        }

        sData.quadSolved =
            { kernel : {
                //from start point
                Tkernel,
                Fkernel, //area, same factor as for F

                vgraph,
                v2graph,
                Zgraph,
                Z2graph,
                vback,
            },
            orbit,

            //from upper turn point
            F,  //=== fi/2*R² === array of areas

            fiStartedIx,
            roPlus0Top,
            dropPointIx,
            roPlusIx,
            roMinusIx,
        };
    }

    ///finds drop point and top turn point,
    ///no search for low turn point,
    ///builds "back speed" === from turn point to started index,
    function findsDropPoint( fiStartedIx )
    {
        let frArr       = rg[ 'approximated-curve' ].curvePoints;

        //:prepares 0-elements
        let v2          = op.Kepler_v*op.Kepler_v;
        var M           = Math.sin( op.angleOmega ) * op.Kepler_v * 1;
        var r0          = rg.V.pos;
        let frBefore    = frArr[0];
        let R           = rg.V.pos[1] - rg.C.pos[1];
        let R2          = R*R;
        var dropPointIx = 0;
        var roPlusIx    = null; //upper turn point

        var vBbackPre = [];
        var SAFE_PLUS_IX = 1;
        for( var iq=fiStartedIx; iq>=0; iq-- ){
            let fr      = frArr[iq];
            let ro      = fr[1];
            if( ro < 1e-50 ) break;
            vBbackPre.push( [Math.sqrt(v2),ro] );
            if( iq < fiStartedIx ) {
                let dr = frBefore[1] - ro; //negative
                v2 = v2 + dr * fr[0];  //fr[0] = force
            }
            if( v2 <= 0 ) {
                dropPointIx = iq;
                break;
            }
            var vort = M/ro;
            if( roPlusIx === null && v2 - vort*vort < 0.001 ) {
                roPlusIx = Math.min( fiStartedIx, iq+SAFE_PLUS_IX );
            }
            frBefore = fr;
        }
        var vback = [];
        ///indexation of vback goes from small global index to big,
        ///fall point has smallest index,
        for( iq=dropPointIx; iq<=fiStartedIx; iq++ ) {
            let src = vBbackPre[ fiStartedIx-iq ];
            vback.push( [ src[0], src[1] ] );
        }

        return { 
                    vback, //from drop point
                    //golbal array index, index from force top array
                    dropPointIx, roPlusIx
               };
    }

}) ();

