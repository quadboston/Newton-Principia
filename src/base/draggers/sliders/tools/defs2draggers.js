( function() {
    var {
        sn,
        sconf, ssF, sDomF,
    } = window.b$l.apptree({});
    ssF.inits_tools_sliders = inits_tools_sliders;
    return;







    ///==========================================
    /// inits drag points
    ///==========================================
    function inits_tools_sliders( medD8D, stdMod )
    {
        var toolsSliders = sn( 'toolsSliders',stdMod, [] );
        toolsSliders.forEach( slname => {
            createDragger( medD8D, slname, stdMod )
        });
    };



    function createDragger( medD8D, magnitude, stdMod )
    {
        //ccc( 'ready? ' + stdMod.SUB_MODEL, magnitude, stdMod.rg[ magnitude ] );
        var pointWrap = stdMod.rg[ magnitude ];
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
        medD8D.pointWrap_2_dragWrap( argc );
        return;

        function doProcess( arg )
        {
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
                    var mscale = sDomF.out2inn() / stdMod.sconf.originalMod2inn_scale;
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

