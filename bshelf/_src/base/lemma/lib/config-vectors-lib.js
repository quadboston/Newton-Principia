(function(){
const {
    sn, stripp, apush, nspaste,
    tpelect, sf, rg, ssF, sDomF, gshapes, CONST,
} = window.b$l.atree({ ssFList:{
    conf__vectors,
}});
const el=tpelect;
return;

//===============================
// //\\ expands vectors
//===============================
function conf__vectors(arg){ let {
        //contains configuration of vectors
        configVectors,
    }=stripp(arg);
    const starts = [];
    configVectors.forEach( (elem,ix) => {
        //this elem remains ending point of the vector
        elem.kind = CONST.POINT;
        elem.undisplayAlways = true;
        ///this array creates starting points, but
        starts.push({
            kind: CONST.POINT,
            rgn: elem.rgn + '-start',
            medpos: elem.medpos.concat(),
            doPaintPname: false,
            undisplayAlways: true,
        });
    });
    configVectors.forEach( (elem,ix) => {
        ///this accumulates vector intervals:
        gshapes.push({
            kind: CONST.LINE,
            rgn: elem.rgn + '-start,' + elem.rgn,
            cssClass: sDomF.rgid2low('tp-'+elem.rgn) +
                ' ' + elem.cssClass,
            'stroke-width': 5,
            vectorTipIx: 1,
        });
    });
    apush( gshapes, configVectors.concat(starts) );
}
//===============================
// \\// expands vectors
//===============================
})();