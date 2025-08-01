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
        // var dr          = sn('datareg', stdL2 );
        //presets data
        [stdL2.datareg, stdL2.datareg2].forEach(dr => {
            dr.faaf = null;
        });



        //===============================================
        // //\\ widest-rect
        //===============================================
        guicon.constructsWidestRect = function(dr)
        {
            //Really a polygon so it can be transformed
            dr.faaf   = document.createElementNS( svgNS, "polygon");
            $$.$(dr.faaf)
                .addClass( 'widest-rectangular tp-widest-rectangular tofill' )
                .to( stdMod.svgScene );
        };


        gui.drawsWidestRect = function(dr, pt, showRectPts, view)
        {
	        pt.setAttributeNS(null, "class", "figure");
	        pt.setAttributeNS(null, "r", showRectPts ? sconf.FINEPTS_RADIUS : 0);

            let { left, right, top, } = dr.widestRect;
            guiup.updatesRect(
                dr,
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

