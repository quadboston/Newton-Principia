( function () {
    var {
        stdMod,
    } = window.b$l.apptree({
    });
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);
    var sacf    = sconf;

    var ss          = sn('ss',fapp);
    
    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomF       = sn('dfunctions', sapp);
    var studyMods   = sn('studyMods', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );

        //=====================================
        // //\\ does gui configuration
        //=====================================
        Object.assign( sacf,
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
        function buildSlider()
        {
            //.appar. slider-for-base-points-number
	        var slider = document.getElementById("mySlider");
	        slider.setAttributeNS( null, "min", sacf.MINP );
	        slider.setAttributeNS( null, "max", sacf.MAXP );

            //.appar. sets current base-points-number
	        slider.setAttributeNS( null, "value", dr.bases );

	        var sliderOutput = document.getElementById("baseSpan");
	        var baseLabel = document.getElementById("baseLabelSpan");
	        showBasesNumberInGui( sliderOutput, baseLabel );

	        slider.oninput = function() {
                appstate.movingBasePt = false; // better way?
		        var newB = interpretSlider( this.value );
		        sliderEvent( newB-dr.bases, newB, dr.basePts );
		        dr.bases = newB;
		        showBasesNumberInGui( sliderOutput, baseLabel );
                stdMod.model8media_upcreate();
          	}

            function sliderEvent(bd, newBases, basePts) {
                sDomF.detected_user_interaction_effect();
            	//var baseDelta = bd;
	            for (var i=newBases-bd; i<newBases; i++) {
    		        if( fconf.sappId === 'lemma3' ) {
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
	            const maxV = Math.log(sacf.baseMax);
	            var scale = (maxV-minV) / (sacf.MAXP-maxLinV);
	            return Math.round(Math.exp(minV + scale*(val-maxLinV)));
            }
        }
        //======================================
        // \\// slider
        //======================================
    }
}) ();

