(function(){
const {
        mat, rg, ssD, stdMod, sconf,
      } = window.b$l.atree({ stdModList: {
        recreates__posCorrector,
}});
return;


function recreates__posCorrector(){
    const dor = sconf.curve.diagramOrigin;
    const ellA = 1/sconf.curve.ellipseA;
    const ellB = 1/sconf.curve.ellipseB;
    const fi0 = sconf.curve.curveParFi0;
    stdMod.correctsPos8angle2angle = correctsPos8angle2angle;
    return;

    ///pos to "virtual" andle
    function pos2t( newPos ){
        return mat.pos2angle([
            (newPos[0] - dor[0])*ellA,
            (newPos[1] - dor[1])*ellB,
        ])-fi0; //sconf.curveParFi0 is not a real angle, but
                //"virtueal" inner_angle fi0
    }
    ///corrects approximate mouse point to exact point on the circle
    function correctsPos8angle2angle( rgid, newPos, inner_angle ){
        let rgX = rg[rgid];
        if( typeof inner_angle === 'undefined' ){
            inner_angle = pos2t( newPos );
        }
        if( inner_angle < Math.PI*0.01 ||
            inner_angle > sconf.curve.orbit_q_end
        ){
            inner_angle = ( inner_angle +
            sconf.curve.orbit_q_end ) % sconf.curve.orbit_q_end;
        }
        let qix = Math.floor( inner_angle/sconf.qgrid_step );
        rgX.qix = qix;
        rgX.parQ = qix * sconf.qgrid_step;
        var newP = ssD.qix2orb[ qix ].rr;
        let pos = rgX.pos;
        pos[0] = newP[0];
        pos[1] = newP[1];
        return pos;
    }
}
})();