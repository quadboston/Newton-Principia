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
    var dr          = sn('datareg', stdL2 );

    //=====================================
    // //\\ does gui configuration
    //=====================================
    Object.assign( sconf,
    {
        //:slider config
        MINP            : 1,
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
    function buildSlider( undefined )
    {
        //.appar. slider-for-base-points-number
        var slider = document.getElementById("mySlider");
        slider.setAttributeNS( null, "min", sconf.MINP );
        slider.setAttributeNS( null, "max", sconf.MAXP );

        //.appar. sets current base-points-number
        slider.setAttributeNS( null, "value", dr.bases );

        var sliderOutput = document.getElementById("baseSpan");
        var baseLabel = document.getElementById("baseLabelSpan");
        showBasesNumberInGui( sliderOutput, baseLabel );

        slider.oninput = function() {
            appstate.movingBasePt = false; // better way?
	        var newB = interpretSlider( this.value );
            //dr.bases === basesAmount
	        sliderEvent( newB-dr.bases, newB, dr.basePts );
	        dr.bases = newB;
	        showBasesNumberInGui( sliderOutput, baseLabel );

            ssF.media_upcreate_generic();
      	}

        function sliderEvent(bd, newBases, basePts) {
            sDomF.detected_user_interaction_effect();
        	//var baseDelta = bd;
	        if( fconf.sappId === 'lemma3' ) {
                ///dynamically adds more base points
                for (var i=newBases-bd; i<newBases; i++) {
                    ///prevents making too many draggable base points
                    if( i < sconf.draggableBasePoints ) {
       		            guiup.set_pt2movable( basePts.list[i] );
                    }
                }
            }
            var baseWidths = dr.baseWidths;
            for (var i=newBases; i < newBases-bd; i++) {
	            baseWidths[i] = undefined;
            }
        }

        function showBasesNumberInGui( sliderOutput, baseLabel )
        {
            sliderOutput.innerHTML = dr.bases;
            baseLabel.innerHTML = dr.bases === 1 ? " base":" bases";
        }

        function interpretSlider(val)
        {
            const maxLinV = 20; //linear through 20
            if (val <= maxLinV) {
	            return parseInt(val);
            }
            const minV = Math.log(maxLinV);
            const maxV = Math.log(sconf.baseMax);
            var scale = (maxV-minV) / (sconf.MAXP-maxLinV);
            return Math.round(Math.exp(minV + scale*(val-maxLinV)));
        }
    }
    //======================================
    // \\// slider
    //======================================
}) ();

