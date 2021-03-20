( function() {
    var {
        ns,
        nsmethods,
        haz,
        nssvg,
        $$,
    } = window.b$l.nstree();
    nsmethods.drawGraphLegend = drawGraphLegend;
    return;







    ///==========================================
    /// API engine
    ///==========================================
    function drawGraphLegend({
        graphFM_self,
        axisXLegend,
        axisYLegend,
        dimX_withMarg,
        marginX,
        dimY_withMarg,
        marginY,
    }){

        //======================================================
        // //\\ draws legend
        //======================================================
        drawsLegendl({ legend : axisYLegend,  });
        drawsLegendl({ legend : axisXLegend, offset : {
            x : dimX_withMarg + marginX,
            y : dimY_withMarg + marginY*(1.3),
        }});
        //======================================================
        // \\// draws legend
        //======================================================
        return;


        //==================================================
        // //\\ draws x and y axes legends
        //==================================================
        function drawsLegendl({ legend, offset })
        {
            if( !legend ) return;
            offset = offset || { x:0, y:0 };
            legend.forEach( subLeg => {
                //style is optional in legend
                var sstyle = haz( subLeg, 'style' ) || {};
                nssvg.printText({
                    text    : subLeg.text,
                    x       : offset.x + subLeg.x,
                    y       : offset.y + subLeg.y,
                    parent  : graphFM_self.gmedia$(),
                    style   : sstyle,
                });
            });
        }
        //==================================================
        // \\// draws x and y axes legends
        //==================================================
    }

}) ();

