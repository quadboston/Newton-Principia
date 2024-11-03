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
        //sDomF.doProcess_rgX = doProcess_rgX;
    }

    ///===========================================================
    /// api
    ///
    ///===========================================================
    function rgX_2_dragWrap({
            medD8D,
            rgX,            //===pointWrap
                            //must have rgX.pname: for spinner
                            //see ** below
            orientation,
            nospinner,
    }) {
        var pointWrap               = rgX;
        pointWrap.spinnerClsId      = 'point-' +
            sDomF.topicIdUpperCase_2_underscore( rgX.pname ) +
            '-slider';
        //**rgX must have dragDecorColor' ) || pcolor:
        pointWrap.dragDecorColor    = haz( rgX, 'dragDecorColor' ) || rgX.pcolor;
        var argc = //= see: **api-pointWrap_2_dragWrap
        {
            pointWrap           : rgX,


            /*
                //see: **api-doProcessWrap
                down_move_up    : down_move_up, //flag, string
                surfMove        : surfMove,     //possibly = move from start to current,
                moveIncrement   : moveIncrement,
                dragWrap        : selectedElement_flag,
                point_on_dragSurf,

           */
            doProcess,


            orientation         : orientation,
            nospinner           : nospinner,
        };
        medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE( argc );
    }

    //todo check note in buffer: slider
    function doProcess(
        /*
            //see: **api-doProcessWrap
            down_move_up    : down_move_up, //flag, string
            surfMove        : surfMove,     //possibly = move from start to current,
            moveIncrement   : moveIncrement,
            dragWrap        : selectedElement_flag,
            point_on_dragSurf,

       */
        arg
    ){
        var pWrap = arg.pointWrap; 
        switch( arg.down_move_up ) {
            case 'down':
                //**rgX optionally can have processDownEvent method:
                ns.hafb( pWrap, 'processDownEvent' )( arg );
                break;
            case 'up' :
                //**rgX optionally can have processUpEvent method:
                ns.hafb( pWrap, 'processUpEvent' )(arg);
                break;
            case 'move':

                //**rgX can be media mover engine
                if( ns.haz( pWrap, 'mediaMover' ) ) {
                    var css2model = sDomF.out2inn();
                    var mouseOnSurf = sDomF.outparent2inn( arg.point_on_dragSurf );

                } else {
                    //move in model units
                    var css2model = sDomF.out2inn() * sconf.inn2mod_scale;
                }
                var scaledMove = [
                    arg.surfMove[0] * css2model,
                    arg.surfMove[1] * css2model,
                ];
                //ccc(
                //     ' css move='+ arg.surfMove[1].toFixed() +
                //     ' diagram-model move=' + scaledMove[1].toFixed(5)
                //)
                //**rgX must have move_2_updates,
                //  for some rgX, move_2_updates is added when composing
                //  from draggable point set in ?sconf,
                //  this sub. basically creates newPos from move
                pWrap.move_2_updates(

                    //"fullMoveInsideMathModel",
                    //is in model units except for media-mover(-as-a-whole)
                    scaledMove, 

                    mouseOnSurf, //possibly in media units, not im model units,
                );
                break;
        }
    }
    //==========================================
    // \\// attemt to unify dragger for point
    //==========================================



}) ();

