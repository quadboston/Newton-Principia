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
        gui.constructWidthestRectangular_parameterlessDom = function()
        {
            dr.labelf = guicon.makeShape_parlessDom( "text", "figure label f", "f" );
            dr.labelF = guicon.makeShape_parlessDom( "text", "figure label F", "F" );
            dr.faaf   = document.createElementNS( svgNS, "rect");
            //not in use: x.setAttributeNS(null, "class", "dottedRect");
            $$.$(dr.faaf)
                .addClass( 'widthest-rectangular tp-widthest-rectangular tofill' )
                .to( stdMod.svgScene );
        };


        gui.drawsWidestRect = function(pt, showRectPts, view)
        {
	        pt.setAttributeNS(null, "class", "figure");
	        pt.setAttributeNS(null, "r", showRectPts ? sconf.FINEPTS_RADIUS : 0);

            let { left, right, top, } = dr.widestRect;
	        guiup.xywh2svg(
                dr.faaf, //item
                left,
                top,
                right - left,
                dr.yVariations.yRef - top,
            );
	        document.getElementById( "diffAmtd").innerHTML =
                guiup.normalizedStr( dr.widest * (dr.yVariations.yRef - top ) );
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

