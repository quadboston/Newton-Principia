( function () {
    var ns          = window.b$l;
    var $$          = ns.$$;    
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sacf        = sconf;

    var ss          = sn('ss',fapp);
    var ssF         = sn('ssFunctions',ss);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var gui         = sn('gui', l23 );
        var guicon      = sn('guiConstruct', gui );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );
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
            dr.labelf = guicon.constructSingle_dom( "text", "figure label f", "f" );
            dr.labelF = guicon.constructSingle_dom( "text", "figure label F", "F" );
            dr.faaf   = ( function() {
	                        var x = document.createElementNS( sacf.svgns, "rect");
	                        //not in use: x.setAttributeNS(null, "class", "dottedRect");
	                        dr.svgSeg.appendChild(x);
	                        return x;
            })();
            $$.$(dr.faaf).addClass( 'widthest-rectangular tofill tostroke' );
            //redundant ... class works well: ssF.tr( 'widthest-rectangular', 'domel', dr.faaf );
        };

        gui.widthEnd = function(pt, showRectPts, view)
        {
            var fb = dr.figureBasics;
	        pt.setAttributeNS(null, "class", "figure");
	        pt.setAttributeNS(null, "r", showRectPts ? sacf.FINEPTS_RADIUS : 0);
	        if (fb.deltaOnLeft) {
		        var x = fb.minX; //x of control point
		        var y = numModel.f(x);
                //.offset and sizes
		        guiup.updateRectLike(
                        dr.faaf, x, Math.min(y, fb.baseY),
                        dr.widest, Math.abs(fb.baseY-y));
	        } else {

                // //\\ somehow this does not work
		        //var x = 100; //fb.maxX;
		        //var y = numModel.f(x);
		        //guiup.updateRectLike(
                //        dr.faaf, x-dr.widest,
                //        Math.min(y, fb.baseY), dr.widest, Math.abs(fb.baseY-y));
                // \\// somehow this does not work

                var x = fb.maxX-dr.widest;
                var y = numModel.f(x);
		        guiup.updateRectLike(
                        dr.faaf,
                        x, Math.min(y, fb.baseY),
                        dr.widest, Math.abs(fb.baseY-y));
                //ccc(fb.minX, fb.maxX, ' dr.widest='+dr.widest );
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
//ccc( !sapp.isLite(), view.isClaim );
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

