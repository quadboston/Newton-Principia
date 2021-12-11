( function() {
    var {
        ns, sn,
        nsmethods,
        mat,
    } = window.b$l.nstree();
    var solvesOneDimenstionalEquation = mat.solvesOneDimenstionalEquation =
        sn( 'solvesOneDimenstionalEquation', mat );
    window.onload = test;
    return;





    ///==================================================
    /// API sample test
    ///==================================================
    function test()
    {
        var val2between = solvesOneDimenstionalEquation.val2between;

        //makes original array
        var xy = [];
        for( var ix = 0; ix < 300; ix++ ) {
            var x = ix/50;
            xy[ ix ] = [ x, x*x*x ];
        }

        //tests work for single value of y
        var val = val2between({
            xy,
            x : 2,
        });
        ccc( val );

        //tests work for single value of y
        var val = val2between({
            xy,
            x : 27.1,
            inv : true,
        });
        ccc( val );

        //----------------------------------------------
        // //\\ prepares and paints array
        //----------------------------------------------
        var graphArray = [];
        xy.forEach( (point,ind) => {
            var x = point[0];
            var inverse = val2between({
                xy,
                x,
                inv : true,
            }).y
            graphArray.push({
                x,  //independent variable
                ///this thing creates array of ordinates y for each abscissa x
                y : [
                        point[1],       //original y(x)
                        inverse*40,     //inverse, x(y)
                        x*16,           //identity y=x
                    ],
            });
        });
        graphTest( graphArray );
        //----------------------------------------------
        // \\// prepares and paints array
        //----------------------------------------------
    }


    ///==================================================
    /// graphTest
    ///==================================================
    function graphTest( graphArray )
    {
        //=================================================
        // configures params
        //=================================================
        var ORDINATES_MAX   = graphArray[0].y.length;

        //=================================================
        // //\\ prepares params
        //=================================================
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
        // //\\ calls api
        //==================================================
        var fw = nsmethods.createsGraphFramework_simple({ parent,
            parent              : document.body,
            svgWidthCssValue    : '50%',
            svgHeightCssValue   : '200px',
            dimX                : 1000, //innerWidth,
            dimY                : 500,  //innerHeight,
        });
        fw.drawGraph({
            graphArray,
            colorThreadArray,
                style   : {
               'stroke-width' : 2,
            },
        });
    }


}) ();

