(function(){
const { mat, rg, ssD, stdMod, sconf } =
    window.b$l.atree({ stdModList: {
        bp2cp,
}});
return;


///besier pivots to curve pivots
function bp2cp() {
    const bezio = ssD.bezio;
    bezio.pivotsPos.map( (pos,ix) => {
        let cp = rg[ 'borbit-' + ix ];
        let posNew = bezio.fun( cp.q );
        cp.pos[0] = posNew[0];
        cp.pos[1] = posNew[1];
    });
}
})();