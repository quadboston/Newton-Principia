( function() {
    var {
        sn, $$, nsmethods, nspaste, nssvg, mcurve, integral, mat, has,
        fconf, ssF, sData,
        stdMod, amode, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
        },
    });
    return;

















    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        const fun = rg[ 'approximated-curve' ].t2xy;
        var rr0 = rg.P.pos;
        var rrc = rg.S.pos;
        var parP = stdMod.pos2t( rr0 );

        // **api-input---plane-curve-derivatives
        var diff = mcurve.planeCurveDerivatives({
            fun,
            q : parP,
            rrc,
        });
        var {
            RC,
            R,
            uu,
            nn,
            rr,
        } = diff;


        //------------------------------------------------
        // //\\ ellipse spatial params
        //------------------------------------------------
        //conjugate diameters
        nspaste( rg.G.pos, fun( parP + Math.PI ) );
        var PG = [ rg.P.pos[0]-rg.G.pos[0], rg.P.pos[1]-rg.G.pos[1] ];

        // we can use this for graph for inter conjugate lines
        nspaste( rg.D.pos, fun( parP + Math.PI/2 ) );
        nspaste( rg.K.pos, fun( parP + 3/2*Math.PI ) );
        var DK = [ rg.K.pos[0]-rg.D.pos[0], rg.K.pos[1]-rg.D.pos[1] ];
        nspaste( rg.E.pos, mat.lineSegmentsCross(
            rg.D.pos, rg.K.pos,
            rg.S.pos, rg.P.pos,
        ));
        //------------------------------------------------
        // \\// ellipse spatial params
        //------------------------------------------------

        //------------------------------------------------
        // //\\ Z
        //------------------------------------------------
        var wwZ = mat.dropLine(
            0.6,
            rg.P.pos,
            null,
            null,
            uu,
        );
        rg.Z.pos[0] = wwZ[0];
        rg.Z.pos[1] = wwZ[1];
        //------------------------------------------------
        // \\// Z
        //------------------------------------------------

        //------------------------------------------------
        // //\\ PZminus
        //------------------------------------------------
        var wwZ = mat.dropLine(
            -0.6,
            rg.P.pos,
            null,
            null,
            uu,
        );
        rg.Zminus.pos[0] = wwZ[0];
        rg.Zminus.pos[1] = wwZ[1];
        //------------------------------------------------
        // \\// PZminus
        //------------------------------------------------


        //------------------------------------------------
        // //\\ ellipse static params
        //------------------------------------------------
        nspaste( rg.A.pos, fun( 0 ) );
        nspaste( rg.AA.pos, fun( Math.PI ) );
        nspaste( rg.B.pos, fun( Math.PI/2 ) );
        nspaste( rg.BB.pos, fun( Math.PI*3/2 ) );
        //------------------------------------------------
        // \\// ellipse static params
        //------------------------------------------------


        // //\\ graph
        //------------------------------------------------
        stdMod.buildsforceGraphArray();
        stdMod.graphFW.drawGraph_wrap();
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------
    }

}) ();

