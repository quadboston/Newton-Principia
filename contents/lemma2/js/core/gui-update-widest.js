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
        var gui         = sn('gui', stdL2 );
        var guicon      = sn('guiConstruct', gui );
        var guiup       = sn('guiUpdate',gui);
        var dr          = sn('datareg', stdL2 );
        //presets data
        dr.faaf = null;



        //===============================================
        // //\\ widest-rect
        //===============================================
        guicon.constructsWidestRect = function()
        {
            dr.faaf   = document.createElementNS( svgNS, "rect");
            $$.$(dr.faaf)
                .addClass( 'widest-rectangular tp-widest-rectangular tofill' )
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
        };
        //===============================================
        // \\// widest-rect
        //===============================================
    }

}) ();

