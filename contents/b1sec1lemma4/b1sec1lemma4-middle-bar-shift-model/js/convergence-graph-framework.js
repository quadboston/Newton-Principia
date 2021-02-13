( function() {
    var {
        ns, sn,
        nsmethods,
        sDomN,
        ssD,
        stdMod,
        
    } = window.b$l.apptree({
        stdModExportList :
        {
            createConvergenceGraphFW,
        },
    });
    return;



    //==================================================
    // //\\ creates pHGraph wrap around fw
    //==================================================
    function createConvergenceGraphFW({
        ORDINATES_MAX,   
    }){
        pHGraph_self = {};
        var fw = null;

        //=================================================
        // //\\ configures params
        //=================================================
        var graphArray      = [];
        var innerWidth      = 1000;
        var innerHeight     = 500;
        //=================================================
        // \\// configures params
        //=================================================

        //=================================================
        // //\\ prepares params
        //=================================================
        colorThreadArray = ssD.zebraCols.multicolor.map( col => col.rgba_high );
        //=================================================
        // \\// prepares params
        //=================================================

        var dimX = innerWidth;
        var dimY = innerHeight;
        createFramework();
        return pHGraph_self;




        function createFramework()
        {
            fw = pHGraph_self.fw = nsmethods.createsGraphFramework({
                parent              : sDomN.medRoot,
                svgWidthCssValue    : '200px',
                svgHeightCssValue   : '200px',
                dimX,
                dimY,
            });
            pHGraph_self.callPHGraph = callPHGraph;
        }


        function callPHGraph({
            graphArray,
        }) {
            //==================================================
            // //\\ fills api content
            //==================================================
            var style = {
               'stroke-width' : 4,
            }
            //==================================================
            // \\// fills api content
            //==================================================

            //==================================================
            // //\\ calls api
            //==================================================
            fw.drawGraph({
                graphArray,
                colorThreadArray,
                style,
            });
            fw.gmedia$.css( 'border', '2px solid black' );
            fw.gmedia$.css( 'z-index', '1111111' );
            fw.gmedia$.css( 'position', 'absolute' );
            fw.gmedia$.css( 'width', '90%' );
            fw.gmedia$.css( 'height', '50%' );
            fw.gmedia$.css( 'left', '3%' );
            fw.gmedia$.css( 'top', '3%' );
            fw.gmedia$.css( 'background-color', 'rgba(255,255,255,0.8' );
            fw.gmedia$.addClass( 'ph-graph' );
            //==================================================
            // \\// calls api
            //==================================================
        }
        return pHGraph_self;
    }
    //==================================================
    // \\// creates pHGraph wrap around fw
    //==================================================

}) ();

