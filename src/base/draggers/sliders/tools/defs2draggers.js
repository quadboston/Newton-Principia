( function() {
    var {
        sn,
        sconf, ssF, sDomF, rg,
        stdMod,
    } = window.b$l.apptree({});
    ssF.inits_tools_sliders = inits_tools_sliders;
    return;







    ///==========================================
    /// inits drag points
    ///==========================================
    function inits_tools_sliders( medD8D, )
    {
        var toolsSliders = sn( 'toolsSliders',stdMod, [] );
        toolsSliders.forEach( slname => {
            createDragger( medD8D, slname, );
        });
    };



    function createDragger( medD8D, magnitude, )
    {
        var pointWrap = rg[ magnitude ];
        //:sets dragger handle color
        pointWrap.spinnerClsId = 'tp-' + magnitude;
        //todm ... not straight
        pointWrap.dragDecorColor= pointWrap.svgel.getAttribute( 'stroke' );
        var argc =
        {
            pointWrap,
            doProcess,
            //update_decPoint:
                //if this property is missed, then using
                //d8d-framework.js::update_decPoint_inn2outparent() ...
                //  ... dompos = inn2outparent.call( pointWrap

                //update_decPoint : 'update_decPoint_default',
                //      apparently above needs this: dragHandleDOM
                //      which we don't provide as this "argc" prop;
        };
        //ccc( 'does create ' + pointWrap.spinnerClsId + ' ' + pointWrap.pname);
        medD8D.pointWrap_2_dragWrap_BSLd8d2PIPE( argc );
        return;

        function doProcess(
            //see: **api-doProcessWrap
            /*
                down_move_up    : down_move_up,
                surfMove        : surfMove,
                moveIncrement   : moveIncrement,
                dragWrap        : selectedElement_flag,
                point_on_dragSurf,
            */
            arg
        ){
            var pointWrap = arg.pointWrap;
            var ach = pointWrap.achieved;
            switch( arg.down_move_up ) {
                case 'down':
                     ach.achieved = [ pointWrap.pos[0], pointWrap.pos[1] ];
                     break;
                case 'move':

                    //vital-for-mobile
                    //ns.d('mv: comm-tools');

                    sDomF.detected_user_interaction_effect();
                    var mscale = sDomF.out2inn() / sconf.originalMod2inn_scale;
                    var move_in_model = [ //move in model units
                            arg.surfMove[0] * mscale,
                            arg.surfMove[1] * mscale,
                        ];
                    pointWrap.move_2_updates(
                        ach.achieved,
                        move_in_model,
                    );
                    break;
            }
        }

    }



}) ();

