(function(){
const {
        sn, $$, nsmethods, nssvg, mcurve, integral, fldo, nspaste,
        mat, has, ssF, ssD, amode, stdMod, sconf, rg, toreg, flcs,
        haz,
    } = window.b$l.atree({ stdModList : {
        model_upcreate,
}});
return;


///****************************************************
/// model scenario
/// is required; to skip define as ()=>{};
///****************************************************
function model_upcreate (){
    const M_v0 = ssD.M_v0;
    const solvable_orbit = sn( 'solvable_orbit', fldo, true );
    const Porb = ssD.qix2orb[ rg.P.qix ];
    var {
        RC,
        R,
        curvatureChordSecondPoint,
        projectionOfCenterOnTangent,
        uu,
        rr,
    } = Porb;
    rg.P.q = Porb.q;
    rg.P.pos[0] = rr[0];
    rg.P.pos[1] = rr[1];
    const rr0 = rg.P.pos;
    const rrc = rg.S.pos;
    const Rc = R; //curvature radius

    if( solvable_orbit ){
        flcs['flcs--solvable_orbit'] = true;
        const rrplus = Porb.rrplus;
        const rrminus = rg.rrminus.pos;

        rg.QtimeDecor.caption = 'Δt=' + (2*ssD.Dt).toFixed(5);
        rg.QtimeDecor.pos = Porb.rrplus;
        let sagV = Porb.sagittaVector;

        rg.sagitta.pos = [sagV[0]+rr[0],sagV[1]+rr[1]];
        const chord = rg.chord = [ rrplus[0] - rrminus[0],
                        rrplus[1] - rrminus[1], ];
        rg.chord2 = chord[0]*chord[0]+chord[1]*chord[1];

        //R = parallel-projection of Q to tangent
        var RR = mat.linesCross(
            uu, rr0, //direction, start
            [rr0[0]-rrc[0], rr0[1]-rrc[1]], rg.Q.pos, //direction, start
        );
        rg.R.pos[0] = RR[0];
        rg.R.pos[1] = RR[1];
        //T = perp. from Q to radius-vector
        const TT = mat.dropPerpendicular( rg.Q.pos, rrc, rr0 )
        rg.T.pos[0] = TT[0];
        rg.T.pos[1] = TT[1];
    } else {
        flcs['flcs--solvable_orbit'] = false;
    }
    //================================================
    // //\\ curvature circle
    //================================================
    rg.C.pos[0] = RC[0];
    rg.C.pos[1] = RC[1];
    rg.V.pos[0] = curvatureChordSecondPoint[0];
    rg.V.pos[1] = curvatureChordSecondPoint[1];
    rg.Y.pos[0] = projectionOfCenterOnTangent[0];
    rg.Y.pos[1] = projectionOfCenterOnTangent[1];
    {
        const RCmedpos = ssF.modpos2medpos( RC, );
        const RRmedpos = sconf.mod2med * Rc;
        var rgC = rg.curvatureCircle;
        nssvg.u({
            rgX : rgC,
            svgel   : rgC.svgel,
            parent  : stdMod.medScene,
            type    : 'circle',
            stroke  : rg.C.pcolor,
            fill    : 'transparent',
            'stroke-width' : '1',
            cx : RCmedpos[0],
            cy : RCmedpos[1],
            r : RRmedpos,
        });
        rgC.svgel$.addClass( nsmethods.stripsExtraSpace(
            'tostroke ' + rgC.cssClass ));
    }
    //================================================
    // \\// curvature circle
    //================================================

    //================================================
    // //\\ decorations
    // //\\ graph
    //------------------------------------------------
    //if( solvable ) {
        //t/const mask = [];
        //t/mask[1]=0;
        rg.borbit.graphFW_lemma.draw_graph({
            //t/mask,
            printAxisXDigits : true,
        });
    //}
    //------------------------------------------------
    // \\// graph
    //------------------------------------------------

    //------------------------------------------------
    // //\\ PZ
    //------------------------------------------------
    var wwZ = mat.dropLine(
        -0.6,     //q
        rg.P.pos, //A
        rg.Y.pos, //B
    );
    rg.Z.pos[0] = wwZ[0];
    rg.Z.pos[1] = wwZ[1];
    //------------------------------------------------
    // \\// PZ
    // \\// decorations
    //================================================

    //================================================
    // //\\ hides/shows split points
    //      todm can? be automated? via cssClass
    //================================================
    {
        //original placeholders:
        let cpivots = rg.foldPoints.cpivots;
        let folds = ssD.foldPoints;
        let flen = folds.length;
        //ssD.pastFoldPointsLen;
        let pastlen = haz( ssD, 'pastFoldPointsLen' )||0;
        //todm for( let i=folds.length; i<flen; i++ ) {
        for( let i=0; i<pastlen; i++ ) {
            cpivots[i].rgShape.undisplay = true;
        }
        ////otherwise, cannot display all separation points;
        ////therfore, displays nothing,
        if( folds.length <= cpivots.length ) {
            for( let i=0; i<flen; i++ ){
                let fp = folds[i];
                let rgShape = cpivots[i].rgShape;
                rgShape.pos = fp;
                rgShape.undisplay = false;
            };
            ssD.pastFoldPointsLen = flen;
        }
    }
    {
        ///single fold point decorations
        let nsp = rg.nonSolvablePoint;
        let nsl = rg[ 'S,nonSolvablePoint' ];
        let len = ssD.foldPoints.length;
        if( len ) {
            ////displays last fold point
            nsp.pos[0] = ssD.foldPoints[len-1][0];
            nsp.pos[1] = ssD.foldPoints[len-1][1];
            nsp.undisplay = false;
            nsl.undisplay = false;
        } else {
            nsp.undisplay = true;
            nsl.undisplay = true;
        }
    }
    //================================================
    // \\// hides/shows split points
    //================================================
}
})();
