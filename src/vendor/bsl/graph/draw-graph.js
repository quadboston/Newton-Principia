( function() {
    var {
        nsmethods,
        nssvg,
        $$,
    } = window.b$l.nstree();
    window.onload = test;
    return;



    ///==========================================
    /// test case
    ///==========================================
    function drawGraph({
        graphArray,
        axisX,
        axisY,
        dimX,
        dimY,
        gmedia,
    }){
        var polylines = graphArray[ 0 ].y.map( ordinate => ([]) );
        var rangeX = 10;
        var rangeY = 10;

        graphArray.forEach( (points,pix) => {

            var mediaX = points.x / rangeX * dimX;

            points.y.forEach( (pointY,yix) => {
                var mediaY = pointY / rangeY * dimY;
                polylines[ yix ].push( [ mediaX, mediaY ] );
            });
        });
        polylines.forEach( pl => {
            pl.push( pl[0] ); //to close
            nssvg.polyline({
                pivots : pl,
                parent : gmedia,
                'stroke-width' : 10,
                //fill : 'black',
                /*
                    style   : arg.style,
                    stroke  : arg.stroke || 'rgba( 0,0,0, 1 )', 
                        //must be transparent bs stroke or fill are often exclusive
                    fill    : arg.fill || 'transparent',
                    'stroke-width' : arg[ 'stroke-width' ] || 1
                */
            });
            ccc( pl );
        });
    }


    function test()
    {
        var graphArray = [];
        var count = 3;
        for( var ix=0; ix<count; ix++ ) {
            graphArray.push(
            {
                x : ix,
                y : [ ix, -ix+1, ix*ix ],
            });
        }
        var axisX = {
            min : 0,
            max : 100,
        };

        var axisY = {
            min : 0,
            max : 100,
        };

        var gmedia = $$.c( 'svg' )
                .to( document.body )
                .css( 'width', '1000px' )
                .css( 'height', '500px' )
                ();
        $$.$( document.body )
            .css( 'position', 'absolute' )
            .css( 'width', '1000px' )
            .css( 'height', '500px' )
            ;

        var innerWidth = 1000;
        var innerHeight = 500;
        gmedia.setAttributeNS(
            null, 'viewBox', '0 0 ' +
            innerWidth + ' ' +
            innerHeight
        );
        gmedia.setAttributeNS( null, 'preserveAspectRatio', "xMidYMid meet" );

        drawGraph({
            graphArray,
            axisX,
            axisY,
            dimX : innerWidth,
            dimY : innerHeight,
            gmedia,
        });
    }

}) ();

