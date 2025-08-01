( function () {
    var {
        sn,
        fapp, fconf, sconf, sDomF, ssF,
        stdMod,
    } = window.b$l.apptree({});
    var stdL2       = sn('stdL2', fapp );
    var gui         = sn('gui', stdL2 );
    var guiup       = sn('guiUpdate',gui);
    var appstate    = sn('appstate', stdL2 );
    //TEMP Don't forget to remove or replace the following.
    // var dr          = sn('datareg', stdL2 );

    //=====================================
    // //\\ does gui configuration
    //=====================================
    Object.assign( sconf,
    {
        //:slider config
        MINP            : 4,
        MAXP            : 50
    });
    //=====================================
    // \\// does gui configuration
    //=====================================

    //======================================
    // //\\ exports module
    //======================================
    Object.assign( gui, {
        buildSlider: buildSlider
    });
    //======================================
    // \\// exports module
    //======================================
    return;


    //======================================
    // //\\ slider
    //======================================
    function buildSlider()
    {
        //.appar. slider-for-base-points-number
        var slider = document.getElementById("mySlider");
        slider.setAttributeNS( null, "min", sconf.MINP );
        slider.setAttributeNS( null, "max", sconf.MAXP );

        //.appar. sets current base-points-number
        slider.setAttributeNS( null, "value", sconf.basesN );

        var sliderOutput = document.getElementById("baseSpan");
        var baseLabel = document.getElementById("baseLabelSpan");
        showBasesNumberInGui( sliderOutput, baseLabel );

        slider.oninput = function() {
            const newBases = interpretSlider( this.value );
            appstate.movingBasePt = false; // better way?
            //TEMP Does the following forEach have the correct functions etc.
            //within and outside of it?
            [stdL2.datareg, stdL2.datareg2].forEach((dr) => {
                stdMod.removeOutdatedClasses(dr);
                aduptPartitionChange(dr, newBases);
            });
            sDomF.detected_user_interaction_effect();
            sconf.basesN = newBases;
            showBasesNumberInGui( sliderOutput, baseLabel );

            stdMod.model8media_upcreate();
      	}

        function aduptPartitionChange(dr, newBases, undef) {
            if (dr.basePtDraggersEnabled) {
                const pointsLimit = Math.min( newBases, sconf.DRAGGABLE_BASE_POINTS );
                ///dynamically adds more base points
                for (var i=sconf.basesN; i<pointsLimit; i++) {
                    ///prevents making too many draggable base points
                    //TEMP This seems to have more to do with adjusting which
                    //handles are visible.  The code in "d8d-model.js" is
                    //responsible for the code that's run when dragging.
                    //Therefore code should probably be added there for that.
   		            guiup.sets_pt2movable(dr.basePts.list[i]);
                }
            }
            var partitionWidths = dr.partitionWidths;
            for (var i=newBases; i < sconf.basesN; i++) {
	            partitionWidths[i] = undef;
            }
        }

        function showBasesNumberInGui( sliderOutput, baseLabel )
        {
            sliderOutput.innerHTML = sconf.basesN;
            baseLabel.innerHTML = sconf.basesN === 1 ? " base":" bases";
        }

        function interpretSlider(val)
        {
            const maxLinV = 20; //linear through 20
            if (val <= maxLinV) {
	            return parseInt(val);
            }
            const minV = Math.log(maxLinV);
            const maxV = Math.log(sconf.BASE_MAX_NUM);
            var scale = (maxV-minV) / (sconf.MAXP-maxLinV);
            return Math.round(Math.exp(minV + scale*(val-maxLinV)));
        }
    }
    //======================================
    // \\// slider
    //======================================
}) ();

