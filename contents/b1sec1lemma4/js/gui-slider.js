( function () {
    var { sn, fapp, fconf, sconf, sDomF, ssF, stdMod, }
        = window.b$l.apptree({});
    var stdL2       = sn('stdL2', fapp );
    var gui         = sn('gui', stdL2 );
    var guiup       = sn('guiUpdate',gui);
    var dataregs    = sn('dataregs', stdL2 );
    var appstate    = sn('appstate', stdL2 );


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
            Object.values(dataregs).forEach((dr) => {
                //TEMP removeOutdatedClasses should only be needed by L2/3
                stdMod.removeOutdatedClasses(dr);
                aduptPartitionChange(dr, newBases);
            });
            sDomF.detected_user_interaction_effect();
            sconf.basesN = newBases;
            showBasesNumberInGui( sliderOutput, baseLabel );

            stdMod.model8media_upcreate();
      	}

        function aduptPartitionChange(dr, newBases, undef) {
            if (dr.BASE_PT_DRAGGERS_ENABLED) {
                const pointsLimit = Math.min( newBases, sconf.DRAGGABLE_BASE_POINTS );
                ///dynamically adds more base points
                for (var i=sconf.basesN; i<pointsLimit; i++) {
                    ///prevents making too many draggable base points
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

