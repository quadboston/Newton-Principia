//todm: apparently vital to merge this module with proper s ubmodel
(function(){

const {$$, sn, ssF, sconf, fconf, stdMod,
        sDomF, stripp} = window.b$l.atree({
        sDomFExportList:{rgxMediaMover2draglist}
});
return;


//===================================================
//interface for media-mover
//===================================================
function rgxMediaMover2draglist (){
    var rgid = 'media-mover';
    var pos = [ -11111, -11111 ]; //fake
    var rgX = sDomF.rgx2draglist({
        rgid,
        pos,
        acceptPos : () => true,
        orientation : 'rotate',
        nospinner : true,
    });
    rgX.achievedtop = stripp({
        achieved: [
            sconf.medposOfModOrigin_x,
            sconf.medposOfModOrigin_y,
        ]
    });

    rgX.mediaMover  = true;
    rgX.undisplay   = true;
    rgX.unfound     = true;
    rgX.pcolor      = 'transparent';

    ssF.pos2pointy(
        'media-mover',
        {
            'fill' : 'transparent',
            'stroke' : 'transparent',
            'stroke-width' : 3,
            r : 6,
        },
    );
}})();