(function(){
const {
        ns, sn, $$, nsmethods, nspaste, nssvg, mcurve,
        integral, mat, bezier, ssF, ssD, sDomN, stdMod,
        sconf, rg, toreg,
      } = window.b$l.atree({ stdModList: {
        init_lemma__p6patch,
}});
return;


///====================================
/// //\\ expands sconf.js
/// sconf is insufficient, there is a fine tuneup,
///====================================
function init_lemma__p6patch(){
    ///curve parameters
    const rgn = 'borbit';
    const rgShape = rg[rgn];
    let ocp = rgShape.cpivots;
    let pivotsPos = ocp.map( (cp,cpix) => {
        const rgPivot = rg[ rgn + '-' + cpix ];
        let pos = rgPivot.pos;
        return [ pos[0], pos[1] ];
    });
    pivotsPos = pivotsPos.map( (pos,cpix) => {
        let scale = 1.2;
        let scaleX = 1;
        switch (cpix)
        {
            case 1 : scale = 1.4;
                        scaleX = 1.02;
            break;
            case 4 : scale = 1.12;
            break;
            case 7 : scale = 1.38;
                        scaleX = 1.1;
            break;
        }
        rg[ rgn + '-' + cpix ].q = cpix / (pivotsPos.length-1);
        return [ pos[0]*scaleX, pos[1]*scale ];
    }); //map

    //generates framework:
    const bezio = ssD.bezio = bezier.preparesOptimizedBezier( pivotsPos );;
    bezio.pivotsPos = pivotsPos;
    ssD.initialPivots = nspaste( [], pivotsPos );

    //fixes small pivots and curve displacements,
    //todm why do they exist in the first place?
    stdMod.bp2cp();
}
})();