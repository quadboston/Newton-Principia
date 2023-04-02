( function () {
    var {
        sn, $$,
        sapp, sconf, ss,
    } = window.b$l.apptree({
        setModule,
    });
    return;





    function setModule()
    {
        var study       = sn('study', ss );
        var gui         = sn('gui', ss );
        var guicon      = sn('guiConstruct', gui );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', ss );
        var dr          = sn('datareg', ss );
        var numModel    = sn('numModel', ss );
        var sdata       = sn('sdata', study );







        //===============================================
        // //\\ presets data
        //===============================================
        Object.assign( dr,
        {
            labelf      : null,
            labelF      : null,
            faaf        : null
        });
        //===============================================
        // \\// presets data
        //===============================================




        //===============================================
        // //\\ widthest-rect
        //===============================================
        gui.constructWidthestRectangular = function()
        {
            dr.labelf = guicon.makeShape( "text", "figure label f", "f" );
            dr.labelF = guicon.makeShape( "text", "figure label F", "F" );
            dr.faaf   = ( function() {
	                        var x = document.createElementNS( sconf.svgns, "rect");
	                        //not in use: x.setAttributeNS(null, "class", "dottedRect");
	                        dr.svgSeg.appendChild(x);
	                        return x;
            })();
            $$.$(dr.faaf).addClass(
                'widthest-rectangular tp-widthest-rectangular tofill' );
        };

        gui.calculatesWidest = function () {
            var fb = dr.figureBasics;
	        if (fb.deltaOnLeft) {
                ////supposition is that function monotonically decreases
		        var x = fb.minX; //x of control point
		        var y = numModel.f(x);
                var rightX = x + dr.widest;
                var f = numModel.f( rightX );
                var F = rightX;
	        } else {
                ////supposition is that function monotonically increases
                var x = fb.maxX-dr.widest;  //gets rect's left side x
                var y = numModel.f(fb.maxX); //gets rect's right side y
                var rightX = fb.maxX;
                var f = numModel.f( x );
                var F = x;
	        }
            var rightY = numModel.f( rightX );
            dr.widestRect = { x, y, rightX, rightY, F, f };
            return dr.widestRect;
        }

        gui.widthEnd = function(pt, showRectPts, view)
        {
            var fb = dr.figureBasics;
	        pt.setAttributeNS(null, "class", "figure");
	        pt.setAttributeNS(null, "r", showRectPts ? sconf.FINEPTS_RADIUS : 0);
            var { x, y } = gui.calculatesWidest();
	        guiup.updateRectLike(
                dr.faaf, //item
                x, Math.min(y, fb.baseY), //x,y
                dr.widest, Math.abs(fb.baseY-y)); //width, height
            if( fb.deltaOnLeft ) {
		        dr.widest *= -1;
	        }
	        guiup.updateLabel( dr.labelf, x+dr.widest-3, y-10);
	        guiup.updateLabel( dr.labelF, x+dr.widest-5, fb.baseY+20);
	        //tod? document.getElementById("diffAmt").innerHTML =
	        document.getElementById("diffAmtd").innerHTML =
                guiup.normalizedStr( Math.abs( dr.widest * (fb.baseY-y)) );
        };
        gui.show_widthest_claim_labels = function( view )
        {
            var visib = !sapp.isLite() && !sdata.view.isClaim ? "visible":"hidden";
	        dr.labelf.setAttributeNS(null, "visibility", visib );
            dr.labelf.style.visibility = visib; //vital line
	        dr.labelF.setAttributeNS(null, "visibility", visib );
            dr.labelF.style.visibility = visib; //vital line
        };
        //===============================================
        // \\// widthest-rect
        //===============================================


    }

}) ();

