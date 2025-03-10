//todm: apparently vital to merge this module with proper s ubmodel
( function() {
    var {
        ns, $$, sn, ssF, sconf, fconf,
        stdMod, sDomF, sDomN,
    } = window.b$l.apptree({
        setModule,
    });
    return;











    function setModule()
    {
        sDomF.creates_mediaMover_in_rgX8dragWrapGenList =
            creates_mediaMover_in_rgX8dragWrapGenList;
    }


    //===================================================
    //interface for media-mover
    //===================================================
    function creates_mediaMover_in_rgX8dragWrapGenList()
    {
        var pname = 'media-mover';
        var pos = [ -11111, -11111 ]; //fake
        var rgX = sDomF.params__2__rgX8dragwrap_gen_list({
            pname,
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



}) ();

