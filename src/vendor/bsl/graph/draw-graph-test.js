( function() {
    var {
        ns,
        nsmethods,
        nssvg,
        $$,
    } = window.b$l.nstree();
    window.onload = test;
    return;




    ///==================================================
    /// API sample test
    ///==================================================
    function test()
    {
        //=================================================
        // //\\ configures params
        //=================================================
        var graphArray      = [];
        var count           = 20;
        var ORDINATES_MAX   = 10;
        var innerWidth      = 1000;
        var innerHeight     = 500;
        //=================================================
        // \\// configures params
        //=================================================



        //=================================================
        // //\\ prepares params
        //=================================================
        /*
        var colorThreadArray = [];
        for( var ord=0; ord<ORDINATES_MAX; ord++ )
        {
            //variable opacity
            //colorThreadArray[ ord ] = 'rgba( 0,0,0,' + (ord/ORDINATES_MAX).toFixed(3) + ')';
        }
        */
        colorThreadArray = ns.builds_zebraNColors_array({
            maxColors   : ORDINATES_MAX,
            SATUR       : 100,
            LIGHT       : 50,
            zebraNumber : ORDINATES_MAX,
            //monoColorHue, //optional, makes zebra via lightness, not via colors
        }).map( col => col.rgba_high );
        //=================================================
        // \\// prepares params
        //=================================================




        //==================================================
        // //\\ fills api content
        //==================================================
        for( var ix=0; ix<count; ix++ ) {
            graphArray.push(
            {
                x : ix,
                y : colorThreadArray.map( (c,ix) => Math.random()*ix )
            });
        }

        var style = {
           'stroke-width' : 2,
        }
        var dimX = innerWidth;
        var dimY = innerHeight;
        //==================================================
        // \\// fills api content
        //==================================================



        //==================================================
        // //\\ calls api
        //==================================================
        var fw = nsmethods.createsGraphFramework_simple({ parent,
            parent              : document.body,
            svgWidthCssValue    : '50%',
            svgHeightCssValue   : '200px',
            dimX,
            dimY,
        });
        fw.drawGraph({
            graphArray,
            colorThreadArray,
            style,
        });
        //==================================================
        // \\// calls api
        //==================================================

        setTimeout(
            () => {
            fw.drawGraph({
                graphArray,
                colorThreadArray,
                style : {
                   'stroke-width' : 11,
                },
            });
        }, 2444 );

        setTimeout(
            () => {
                fw.removeFromDom();

                graphArray = [];
                for( var ix=0; ix<count*0.7; ix++ ) {
                    graphArray[ix] =
                    {
                        x : ix,
                        y : [ Math.atan2( 0.51, ix-count/2 ) ],
                    };
                }
                //==================================================
                // //\\ calls api
                //==================================================
                fw = nsmethods.createsGraphFramework_simple({ parent,
                    parent              : document.body,
                    svgWidthCssValue    : '50%',
                    svgHeightCssValue   : '200px',
                    dimX,
                    dimY,
                });
                fw.drawGraph({
                    graphArray,
                    colorThreadArray,
                    style,
                    xMin : -10,
                    xMax : +10,
                    yMin : -Math.PI/2,
                    yMax : Math.PI/2,
                });
                fw.gmedia$.css( 'border', '2px solid black' );
                for( var ix=Math.floor(count*0.7); ix<count; ix++ ) {
                    graphArray[ix] =
                    {
                        x : ix,
                        y : [ Math.atan2( 0.51, ix-count/2 ) ],
                    };
                }
                ///this proves that graph can be extended
                fw.drawGraph({
                    graphArray,
                    colorThreadArray,
                    style,
                    xMin : -10,
                    xMax : +10,
                    yMin : -Math.PI/2,
                    yMax : Math.PI/2,
                });
                //==================================================
                // \\// calls api
                //==================================================
            }, 4000 );
    }

}) ();

