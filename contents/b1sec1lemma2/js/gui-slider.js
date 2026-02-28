(function(){

var {sn, fapp, fconf, sconf, sDomF, ssF, rg, stdMod} =
    window.b$l.apptree({
        stdModExportList: {completes_bottomSlider}
});
var stdL2       = sn('stdL2', fapp );
var gui         = sn('gui', stdL2 );
var guiup       = sn('guiUpdate',gui);
var appstate    = sn('appstate', stdL2 );
var dr          = sn('datareg', stdL2 );
return;


    //======================================
    // //\\ bottomSlider
    //======================================
    function completes_bottomSlider (){
        const start = rg.bottomSliderStart.pos[0];
        const end = rg.bottomSliderEnd.pos[0];
        const scale = end-start;
        const valueScale = sconf.BASE_MAX_NUM - sconf.MINP;
        model2pos (rg.bottomSlider.pos);

        rg.bottomSlider.acceptPos = newPos => {
            var slideFraction = ( newPos[0]-start ) / scale;
            var newModelValue = sconf.MINP+Math.min( Math.max(
                0, Math.floor(slideFraction*valueScale) ),
                valueScale );
            stdMod.removeOutdatedClasses();
            appstate.basePointsAreMoving = false;
            sDomF.detected_user_interaction_effect();
            adaptsPartitionChange( newModelValue, dr.basePts );
            dr.basesN = newModelValue;
            model2pos (newPos);
            return true;
        };
        function model2pos (newPos){
            newPos[0] = start +
                (dr.basesN-sconf.MINP)*scale/valueScale;;
            newPos[1] = rg.bottomSliderStart.pos[1];
            rg.bottomSlider.caption = dr.basesN +
                (dr.basesN === 1 ? " base":" bases");
        }
    }
    //======================================
    // \\// bottomSlider
    //======================================

    function adaptsPartitionChange( newBases, basePts, undef) {
        if( fconf.sappId === 'b1sec1lemma3' ) {
            const pointsLimit =
                Math.min( newBases, sconf.DRAGGABLE_BASE_POINTS );
            ///dynamically adds more base points
            for (var i=dr.basesN; i<pointsLimit; i++) {
                ///prevents making too many draggable base points
                guiup.figurePnt_2_cls8style( basePts.list[i] );
            }
        }
        var partitionWidths = dr.partitionWidths;
        for (var i=newBases; i < dr.basesN; i++) {
            partitionWidths[i] = undef;
        }
    }
})();

