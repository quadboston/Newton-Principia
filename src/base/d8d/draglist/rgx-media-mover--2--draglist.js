//todm: apparently vital to merge this module with proper s ubmodel
(function(){
    const {$$, sn, ssF, sconf, fconf, stdMod, sDomF,} =
         window.b$l.apptree({
            sDomFExportList:{rgxMediaMover2draglist}
    });
    return;


    //===================================================
    //interface for media-mover
    //===================================================
    function rgxMediaMover2draglist (){
        var shpid = 'media-mover';
        var pos = [ -11111, -11111 ]; //fake
        var rgX = sDomF.rgx2draglist({
            shpid,
            pos,
            acceptPos : () => true,
            orientation : 'rotate',
            nospinner : true,
        });
        rgX.achieved =
        {
            achieved :
            [
                sconf.modorInPicX,
                sconf.modorInPicY,
            ]
        };

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
    }
})();

