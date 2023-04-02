( function () {
    var {
        sn, ss,
        sconf, sDomF, ssF,
        fconf,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    return;





    function setModule()
    {
        var gui         = sn('gui', ss );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', ss );
        var dr          = sn('datareg', ss );

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
                //stdMod.model8media_upcreate();
                //stdMod.syncPoints();
                ssF.media_upcreate_generic();
          	}

            function sliderEvent(bd, newBases, basePts) {
                sDomF.detected_user_interaction_effect();
            	//var baseDelta = bd;
  		        if( fconf.sappId === 'lemma3' ) {
	                for (var i=newBases-bd; i<newBases; i++) {
       		            guiup.set_pt2movable( basePts.list[i] );
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

            function interpretSlider(val){
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
    }
}) ();

