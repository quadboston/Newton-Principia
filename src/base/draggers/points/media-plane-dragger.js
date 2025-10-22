//todm: apparently vital to merge this module with proper s ubmodel
( function() {
    var {
        ns, $$, sn, ssF, sconf, nspaste,
        stdMod, sDomF, sDomN, rg
    } = window.b$l.apptree({
        setModule,
        resetModelPos
    });
    return;


    function setModule()
    {
        sDomF.creates_mediaMover_in_rgX8dragWrapGenList =
            creates_mediaMover_in_rgX8dragWrapGenList;
        sDomF.resetModelPos = resetModelPos;
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

    
    // reset model back to its original [x,y] position
    function resetModelPos() {
        nspaste( rg[ "media-mover" ].achieved,
            {
                "achieved": [
                    sconf.originX_onPicture, //492,
                    sconf.originY_onPicture, //565
                ]
            }
        );
        var ach = rg[ "media-mover" ].achieved.achieved;
        sconf.modorInPicX = ach[0];
        sconf.modorInPicY = ach[1];
    }

}) ();

