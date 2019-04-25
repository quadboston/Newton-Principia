// //\\// limit definition demo framework

( function() {
	var ns	        = window.b$l;
    var nssvg       = ns.sn( 'svg' );
	var mat	        = ns.mat        = ns.mat || {};
	var limDemo     = mat.limDemo   = mat.limDemo || {};

    limDemo.setDemo = setDemo;
    limDemo.dataSamples =
    { 
        beats_sample:
        {
            lim             : 1/2,
            vibrationSlope  : -0.5,
            lowFrequency    : 0.11,
            lowAmpl         : 2.5,

            rangeSlope      : 0,
            rangeFrequency  : 0.133,

            rangeAmpl       : 7,
            rangeLevel      : 1, //should be 1 because it multiplies 
            xPointsNum      : 400,

            xStart          : 0.000001,
            xRange          : 1,
            xScale          : 0.15,
            functionSample  : 'beats_sample'
        }
    };  
    //00000000000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000000000





    //================================
    // //\\ demo framework constructor
    //================================
    function setDemo( arg )
    {
        const PI2 = 2* Math.PI;
        const SVG_SCALE = 1000;
        const SVG_XAXIS_LEN = 800;
        const SVG_XAXIS_START = 100;
        const SVG_YAXIS_LEN = 900;
        const SVG_YAXIS_START = 50; //goes from screen top to bottom
        

        var functionSamples =
        { 
            beats_sample: beats_sample()
        };  


        var lim             = arg.lim;
        var lowSlope        = arg.lowSlope;
        var vibrationSlope  = arg.vibrationSlope;
        var lowFrequency    = arg.lowFrequency;
        var lowAmpl         = arg.lowAmpl;

        var rangeSlope      = arg.rangeSlope;
        var rangeFrequency  = arg.rangeFrequency;
        var rangeAmpl       = arg.rangeAmpl;
        var rangeLevel      = arg.rangeLevel;

        var xPointsNum      = arg.xPointsNum;
        var xStart          = arg.xStart;
        var xRange          = arg.xRange;
        var xScale          = arg.xScale;
        var lowBoundary     = functionSamples[arg.functionSample].lowBoundary;
        var topBoundary     = functionSamples[arg.functionSample].topBoundary;


        var yMax = [];
        var yMin = [];
        var yAbsMax = [];


        //:export
        var thisDemo = {};
        thisDemo.model_2_media = model_2_media;
        thisDemo.xy2mediaArr = xy2mediaArr;
        return thisDemo; //rrrrrrrrrrr






        //====================================
        // //\\ self test runner
        //====================================
        function model_2_media( svg )
        {
            var paths = model_2_virtual_svg_path();
            var path = paths.graph;
            nssvg.u({
                type    :'polyline',
                points  :path,
                parent  :svg,
                style   :
                {
                    stroke:'none',
                    fill  :'blue',
                    opacity : 0.8
                }
            });


            //draw them on user demand
            /*
            //top boundary
            nssvg.u({
                type    :'polyline',
                points  :paths.max,
                parent  :svg,
                style   :
                {
                    stroke:'orange',
                    "stroke-width":'1',
                    fill  :'none',
                    opacity : 1
                }
            });

            //low boundary
            nssvg.u({
                type    :'polyline',
                points  :paths.min,
                parent  :svg,
                style   :
                {
                    stroke:'green',
                    "stroke-width":'1',
                    fill  :'none',
                    opacity : 1
                }
            });

            //epsilon(x)
            nssvg.u({
                type    :'polyline',
                points  :paths.abs,
                parent  :svg,
                style   :
                {
                    stroke:'red',
                    "stroke-width":'1',
                    fill  :'none',
                    opacity : 1
                }
            });
            */

            ///master boundaries
            nssvg.u({
                type    :'polyline',
                points  :paths.yNeighbourhoodMax,
                parent  :svg,
                style   :
                {
                    stroke:'red',
                    "stroke-width":'1',
                    fill  :'none',
                    opacity : 0.3
                }
            });
            nssvg.u({
                type    :'polyline',
                points  :paths.yNeighbourhoodMin,
                parent  :svg,
                style   :
                {
                    stroke:'red',
                    "stroke-width":'1',
                    fill  :'none',
                    opacity : 0.3
                }
            });

            //drawing limit line
            var limLine = xy2media( xStart-0.02, lim ) + ' ' + xy2media( xStart + xRange, lim );
            nssvg.u({
                type    :'polyline',
                points  :limLine,
                parent  :svg,
                style   :
                {
                    stroke:'green',
                    "stroke-width":'3',
                    fill  :'none',
                    opacity : 0.8
                }
            });

            // //\\ drawing decorations
            ///axis x
            var limLine = xy2media( xStart-0.1, 0 ) + ' ' + xy2media( xStart + xRange, 0 );
            nssvg.u({
                type    :'polyline',
                points  :limLine,
                parent  :svg,
                style   :
                {
                    stroke:'black',
                    "stroke-width":'3',
                    fill  :'none',
                    opacity : 1
                }
            });
            ///axis y
            var limLine = xy2media( xStart, -0.1 ) + ' ' + xy2media( xStart, 1 );
            nssvg.u({
                type    :'polyline',
                points  :limLine,
                parent  :svg,
                style   :
                {
                    stroke:'black',
                    "stroke-width":'3',
                    fill  :'none',
                    opacity : 1
                }
            });
            // \\// drawing decorations
        }
        //====================================
        // \\// self test runner
        //====================================






        function xy2media( x, y )
        {
            var yf = 1-y;
            return (SVG_XAXIS_START + SVG_XAXIS_LEN * x).toFixed(8) + ',' +
                   (SVG_YAXIS_START + SVG_YAXIS_LEN * yf).toFixed(8);
        }

        function xy2mediaArr( x, y )
        {
            var yf = 1-y;
            return [SVG_XAXIS_START + SVG_XAXIS_LEN * x,
                    SVG_YAXIS_START + SVG_YAXIS_LEN * yf
                   ];
        }






        //=================================
        // //\\ calculates data populations
        //=================================
        function model_2_virtual_svg_path()
        {
            var step = xRange / xPointsNum;
            var svgp = '';
            var pathBack = '';

            var maxPath = '';
            var minPath = '';
            var absPath = '';
            var yNeighbourhoodMax = '';
            var yNeighbourhoodMin = '';

            var maxCur;
            var minCur;
            var absCur; 
            for( var ix = 0; ix < xPointsNum; ix++ ) {
                var point = buldPoint( ix );
                var x  = point[0];
                var yl = point[1];
                var yt = point[2];

                //.finds variation aground lim,
                //.secures the case that point1/point2 can be low/top or top/low
                var yyMax = Math.max( 0, Math.max( point[1], point[2] )-lim );
                var yyMin = Math.min( 0, Math.min( point[1], point[2] )-lim );

                if( ix === 0 || maxCur < yyMax ) {
                    maxCur = yyMax;
                }
                if( ix === 0 || minCur > yyMin ) {
                    minCur = yyMin;
                }
                //.gets abs value of variation
                var yyAbs = Math.max( Math.abs(maxCur), Math.abs(minCur) );
                if( ix === 0 || absCur < yyAbs ) {
                    absCur = yyAbs;
                }
                //.stores max variation and min variation and abs variation
                yMax[ix] = maxCur;
                yMin[ix] = minCur;
                yAbsMax[ix] = absCur;

                //.draws lower boundary of the set-function
                svgp += ' ' + xy2media(x,point[1]);
                //.draws upper boundary of the set-function
                pathBack = xy2media(x,point[2]) + ' ' + pathBack;

                //.draws variations in respect to real svg offsets
                //.should usually duplicate pathBack
                maxPath += ' ' + xy2media(x,yMax[ix]+lim);
                //.should usually duplicate svgp
                minPath += ' ' + xy2media(x,yMin[ix]+lim);
                //.draws pure abs-variation in respect to svg offsets
                absPath += ' ' + xy2media(x,yAbsMax[ix]);

                //.draws y-neighbourhoods boundaries
                yNeighbourhoodMax  += ' ' + xy2media(x,lim + yAbsMax[ix]);
                yNeighbourhoodMin  += ' ' + xy2media(x,lim - yAbsMax[ix]);
            }

            svgp += ' ' + pathBack;
            return {
                //.closed full graph of the set-function
                graph:svgp,

                max:maxPath, min:minPath, abs:absPath,

                //.y-neighbourhoods boundaries
                yNeighbourhoodMax:yNeighbourhoodMax, yNeighbourhoodMin:yNeighbourhoodMin
            };

            function buldPoint( ix )
            {
                var x = xStart + step * ix;
                var y = lowBoundary( x*xScale );
                var yt = topBoundary( x*xScale );
                return [x,y,yt];
            }
        }
        //=================================
        // \\// calculates data populations
        //=================================






        //================================
        // //\\ sample functions set,
        //      returns functions
        //================================
        function beats_sample()
        {
            var rack =
            {
                topBoundary:topBoundary,
                lowBoundary:lowBoundary
            };
            return rack; //rrrrrrrrrrrrrrrrrr

            
            function vibration( x )
            {
                return vibrationSlope * x + lowAmpl * x * Math.sin( PI2 * lowFrequency / x );
            }
     
            function lowBoundary( x )
            {
                return lim + vibration( x );
            }
            function makesRange( x )
            {
                var vib = rangeAmpl * x * Math.sin( PI2 * rangeFrequency / x );
                var mod = rangeSlope * x + vib * vib;
                var val = rangeLevel + mod;

                //var mod = rangeSlope * x + rangeAmpl * x * Math.sin( PI2 * rangeFrequency / x );
                //var val = rangeLevel + mod * mod;
                return val;
            }
            function topBoundary( x )
            {
                return ( lim + vibration( x ))*makesRange( x );
            }
        }
        //================================
        // \\// sample functions set
        //================================

    }
    //================================
    // \\// demo framework constructor
    //================================

}) ();





