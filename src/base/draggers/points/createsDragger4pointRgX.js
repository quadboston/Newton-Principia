//todm: apparently vital to merge this module with proper submodel
( function() {
    var {
        ns, $$, sn, haz, sconf, fconf,
        sDomF,
    } = window.b$l.apptree({
        setModule,
    });
    return;











    function setModule()
    {
        //todm: must be loop via stMods
        sDomF.rgX_2_dragWrap   = rgX_2_dragWrap;
        sDomF.doProcess_rgX = doProcess_rgX;
    }


    function rgX_2_dragWrap({
            medD8D,
            rgX,
            orientation,
            nospinner,
    }) {
        var pointWrap               = rgX;
        pointWrap.spinnerClsId      = 'point-' + rgX.pname + '-slider';
        pointWrap.dragDecorColor    = haz( rgX, 'dragDecorColor' ) || rgX.pcolor;
        var argc =
        {
            pointWrap           : rgX,
            doProcess           : sDomF.doProcess_rgX, //todm: doProcess_rgX,
            orientation         : orientation,
            nospinner           : nospinner,
        };
        //if( rgX.pname === 'fret-0-0' ) {
        //    ccc( 'starting pointWrap_2_dragWrap for ' + rgX.pname );
        //}
        medD8D.pointWrap_2_dragWrap( argc );
    }

    //todo check note in buffer: slider
    function doProcess_rgX( arg )
    {
        var pWrap = arg.pointWrap; 
        switch( arg.down_move_up ) {
            case 'down':
                ns.hafb( pWrap, 'processDownEvent' )( arg );
                break;
            case 'up' :
                ns.hafb( pWrap, 'processUpEvent' )(arg);
                break;
            case 'move':
                if( ns.haz( pWrap, 'mediaMover' ) ) {
                    var mscale = sDomF.out2inn();
                    var mouseOnSurf = sDomF.outparent2inn( arg.point_on_dragSurf );

                } else {
                    //move in model units
                    var mscale = sDomF.out2inn() * sconf.inn2mod_scale;
                }
                var scaledMove = [
                    arg.surfMove[0] * mscale,
                    arg.surfMove[1] * mscale,
                ];
                //this sub. basically creates newPos from move
                pWrap.move_2_updates(
                    scaledMove, //is in model units except for media-mover(-as-a-whole)
                    mouseOnSurf,
                );
                break;
        }
    }
    //==========================================
    // \\// attemt to unify dragger for point
    //==========================================



}) ();

