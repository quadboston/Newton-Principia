//todm: apparently vital to merge this module with proper submodel
( function() {
    var {
        ns, $$, sn, ssF, sconf, fconf,
        sDomF, sDomN,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    return;











    function setModule()
    {
        sDomF.mediaMoverPoint       = mediaMoverPoint;
    }


    //===================================================
    //interface for media-mover
    //===================================================
    function mediaMoverPoint()
    {
        var pname = 'media-mover';
        var pos = [ -11111, -11111 ]; //fake
        var rgX = sDomF.modelPointDragger({
            pname,
            pos, 
            acceptPos : () => true,
            orientation : 'rotate',
            nospinner : true,
        });
        rgX.achieved            =
        {
            achieved :
            [
                sconf.activeAreaOffsetX,
                sconf.activeAreaOffsetY,
            ]
        };

        rgX.mediaMover = true;

        rgX.undisplay = true;
        rgX.unfound = true;

        rgX.pcolor = 'transparent';
        // //\\ creates point I to slide
        ssF.pos2pointy(
            'media-mover',
            {
                'fill' : 'transparent',
                'stroke' : 'transparent',
                'stroke-width' : 3,
                r : 6,
            }
        );
    }



}) ();

