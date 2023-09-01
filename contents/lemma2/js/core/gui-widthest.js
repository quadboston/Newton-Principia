( function () {
    var {
        sn, $$, svgNS,
        fapp, sapp, sconf, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2 = sn('stdL2', fapp );
    return;





    function setModule()
    {
        var study       = sn('study', stdL2 );
        var gui         = sn('gui', stdL2 );
        var guicon      = sn('guiConstruct', gui );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', stdL2 );
        var dr          = sn('datareg', stdL2 );
        var numModel    = sn('numModel', stdL2 );
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
            dr.faaf   = document.createElementNS( svgNS, "rect");
            stdMod.svgScene.appendChild( dr.faaf );
            //not in use: x.setAttributeNS(null, "class", "dottedRect");
            $$.$(dr.faaf).addClass(
                'widthest-rectangular tp-widthest-rectangular tofill' );
        };

        gui.calculatesWidest = function () {
            var fb = dr.figureBasics;
            let yVar = dr.yVariations;
            ccc( 'gui.calculatesWidest' );
            if( yVar.changes.length > 2 ) { //3 elements == two intervals
                ccc( (yVar.changes.length-1) + ' monotonity intervals' );
	            var left = fb.minX; //x of control point
	            var x = left; //todo right?
                var right = x + dr.widest;
                var bottom = yVar.minY;
                var y = bottom; //wright?
	            var top = bottom - yVar.maximumDeltaF;;

                //todm need? correct?
                rightX = right;

            } else if( fb.deltaOnLeft ) {
                ////supposition is that function monotonically decreases

                //left top
		        var x = fb.minX; //x of control point
		        var y = numModel.f(x);

                //left top for the next
                var rightX = x + dr.widest;
                var f = numModel.f( rightX ); //rubbish

                var F = rightX;
                //x, y, left-top-corner:
                //F,0   bottom right corner

            } else {
                ////supposition is that function monotonically increases
                var x = fb.maxX-dr.widest;  //gets rect's left side x
                var y = numModel.f(fb.maxX); //gets rect's right side y

                var rightX = fb.maxX;
                var f = numModel.f( x );
                var F = x;

                //x, y, left-top-corner:
                //F,0   bottom right corner
            }
            //x, y, left-top-corner:
            //F,0   bottom right corner
            var rightY = numModel.f( rightX );
            dr.widestRect = {
                x,  //left
                y,  //left-top-corner for inscribed rect
                rightX, rightY,
                F, //F,f = bottom right corner
                f,  //top y
                left,
                right,
                bottom,
                top,
            };
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
        gui.styles___show_widthest_claim_labels = function( view )
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

