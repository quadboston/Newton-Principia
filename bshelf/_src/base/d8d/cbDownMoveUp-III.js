(function(){
const { ns, $$, sn, haz, sconf, fconf, sDomF, stripp, rg } =
    window.b$l.atree({ ssFList:{
        cbDownMoveUp_III__from_user,
        cbDownMoveUp_III__from_emulator,
        startForwardAnimation,
    }});
return;

function cbDownMoveUp_III__from_emulator(farg){ let {
        down_move_up,
        pointWrap,
        scaledMove, //in terms of model pos,
    } = stripp( farg );
    switch (down_move_up){
        case 'down':
        ns.hafb( pointWrap, 'processDownEvent_IV' )(); //no (arg);
        break;
        case 'move':
        pointWrap.processMoveEvent_IV( scaledMove );
        break;
        case 'up':
        ns.hafb( pointWrap, 'processUpEvent_IV' )(); //no (arg);
        break;
    }
}

///defines landing animation
function startForwardAnimation(
    rgn,
    totalDur //duration of animation for full range
){
    const rgX = rg[rgn];
    totalDur = typeof totalDur === 'function' ?
        totalDur() : totalDur;
    if( !totalDur ) {
      completesMove();
      return;
    }
    rgX.cbDownMoveUp_III__from_emulator({
      down_move_up: 'down',
    });
    rgX.sliderAnimationStarted = true;

    var aflock = ns.aflock;
    var valStart = rgX.val;
    var rangeX = rgX.gconf.max - valStart;
    const partialDuration =
        rangeX / (rgX.gconf.max - rgX.gconf.min) * totalDur;
    rgX.removeAnimation = removeAnimation;
    ///adds runner to collection of acting animation runners
    ///runner runs and disposes
    const animationID = aflock.adds_to_flock(
        emulatesMove,
        //duration for this runner path segment
        partialDuration,
        completesMove
    );
    return;

    function removeAnimation(){
        aflock.completes8destroys( animationID );
    }
    function emulatesMove( timestamp ){
        var newVal = valStart +
            rangeX*(Math.min(timestamp, partialDuration))
            / partialDuration;
        //todo why val is not set directly?
        const newPosX = rgX.slider_val2railsModQ( newVal ) -
            rgX.achievedtop.achieved[0];
        rgX.cbDownMoveUp_III__from_emulator({
            down_move_up: 'move',
            scaledMove: [newPosX, 0],
        });
    }
    function completesMove(){
        rgX.sliderAnimationStarted = false;
        rgX.cbDownMoveUp_III__from_emulator({
            down_move_up: 'up',
        });
    }
}

function cbDownMoveUp_III__from_user( arg ){
    var pWrap = arg.pointWrap;
    switch( arg.down_move_up ) {
        case 'down':
            const fb = ns.hafb( pWrap, 'processDownEvent_IV' )(arg);
            if( fb ) return true;
            break;
        case 'up' :
            ns.hafb( pWrap, 'processUpEvent_IV' )(arg);
            break;
        case 'move':
            if( ns.haz( pWrap, 'mediaMover' ) ) {
                var dom2med = sDomF.dom2med();
                var mouseOnSurf =
                    sDomF.pos_dom2med( arg.point_on_dragSurf );
                var scaledMove = [
                    arg.domMove__downToCurrent[0] * dom2med,
                    arg.domMove__downToCurrent[1] * dom2med,
                ];
            } else if( haz(pWrap, 'unscalable' ) ){
                ////good for bottom side sliders which must
                ////igonre zooming
                var dom2med = sDomF.dom2med()
                    / sconf.mod2med_original;
                var scaledMove = [
                    arg.domMove__downToCurrent[0] * dom2med,
                    arg.domMove__downToCurrent[1] * dom2med,
                ];
            } else {
                //move in model units
                var dom2mod = sDomF.dom2med() * sconf.med2mod;
                var scaledMove = [
                    arg.domMove__downToCurrent[0] * dom2mod,
                    arg.domMove__downToCurrent[1] * dom2mod,
                ];
            }
            pWrap.processMoveEvent_IV(
                //"fullMoveInsideMathModel",
                //is in model units except for
                //media-mover(-as-a-whole)
                scaledMove,
                //possibly in media units, not im model units,
                mouseOnSurf,
            );
            break;
    }
}
})();