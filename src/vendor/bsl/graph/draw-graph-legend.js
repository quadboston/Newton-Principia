( function() {
    var {
        sn, $$, nsmethods, eachprop, haz, nssvg,
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
        drawsLegendl({ legend : axisYLegend, gname:'y' });
        drawsLegendl({ legend : axisXLegend, gname:'x',
            offset : {
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
        function drawsLegendl({ legend, gname, offset })
        {
            if( !legend ) return;
            offset = offset || { x:0, y:0 };
            let med = graphFM_self.gmedia$();
            let garbage = sn( 'legendArrayGarbageCollector-'+gname, graphFM_self, [] );
            garbage.forEach( leg => {
                leg.remove();
            });
            
            legend.forEach( subLeg => {
                //style is optional in legend
                var sstyle = haz( subLeg, 'style' ) || {};
                if( subLeg.text.match( /^\s*<text>/ ) ) {
                        let html = subLeg.text.replace( /<text>/, '' ).replace( /<\/text>/, '' );
                        var t = $$.cNS( 'text' )
                            .to( med )
                            .aNS( 'x', offset.x + subLeg.x )
                            .aNS( 'y', offset.y + subLeg.y )
                            ();
                        t.innerHTML = html;
                        eachprop( sstyle, (prop, pname) => { 
                           t.style[ pname ] = prop;
                        });
                        //nice to know: Array.from(g.children).forEach( ch => {
                } else {
                    var t = nssvg.printText({
                        text    : subLeg.text,
                        x       : offset.x + subLeg.x,
                        y       : offset.y + subLeg.y,
                        parent  : med,
                        style   : sstyle,
                    });
                }
                garbage.push( t );
            });
        }
        //==================================================
        // \\// draws x and y axes legends
        //==================================================
    }

}) ();

