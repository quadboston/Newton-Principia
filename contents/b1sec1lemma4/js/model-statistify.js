( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        sconf,
        amode,
        toreg,
        stdMod,
        
    } = window.b$l.apptree({
        stdModExportList :
        {
            calculateBars,
        },
    });

    toreg( 'barRatioMax' );
    toreg( 'barRatioMin' );
    toreg( 'mediaBars' )( 'val', [] );
    var graphArray = stdMod.graphArray = [];
    return;



















    //=========================================================
    // //\\ calculates figure, bars areas
    //      and paints bars
    //=========================================================
    function calculateBars(
        left0right,
        leftBarsAreas
    ){
        var T               = rg.ptransform.val;
        var transformVolume = T[0][0] * T[1][1];
        var ordPP           = rg.orderedPartPoints.val;
        const PP_COUNT      = ordPP.length;
        const BCOUNT        = PP_COUNT-1;
        var barRatioMax     = null;
        var barRatioMin     = null;
        var DO_COLLECT_MEDIA_BARS = BCOUNT <= sconf.DONT_PAINT_BARS_MORE_THAN;

        if(
            amode.subessay === 'non-similar-curves'
        ) {
            if( left0right !== 'left' ) {
                if( PP_COUNT === sconf.BARS_NUMBER_INITIAL + 1 ) {
                    //starts bar sequence over
                    graphArray.length = 0;
                }
                graphArray[ BCOUNT ] = {
                    x : BCOUNT,
                    y : [],
                };
                var graphArrayY = graphArray[ BCOUNT ].y;
            }
        }


        var barsArea = 0;
        ordPP.forEach( (bar, bix) => {
            if( bix === BCOUNT ) return; //last point has no bar

            //:calculates bar vertices
            if( left0right === 'left' && DO_COLLECT_MEDIA_BARS ) {
                rg.mediaBars.val[ bix ] = { fmin4bar : {} };
            }
            var integX  = bar.integ[ left0right === 'left' ? 'f' : 'g' ];
            var integX1 = ordPP[ bix+1 ].integ[ left0right === 'left' ? 'f' : 'g' ];
            var p1X     = integX.x;    //left-bar side coordinate x
            var p2X     = integX1.x;   //right-bar side coordinate x
            var p2minus1= p2X - p1X;

            if( DO_COLLECT_MEDIA_BARS ) {
                rg.mediaBars.val[ bix ][ left0right ] = { p1X, p2X };
            }

            //=======================================================
            //gets function values
            var leftFun     = integX.fun;
            var rightFun    = integX1.fun;
            var barArea     = integX.barArea;
            //ccc( left0right + ' ' + bix + ' figArea/barArea=' +
            //     ( integX.figArea/barArea ).toFixed(3) );
            //=======================================================



            //=======================================================
            // //\\ builds stats in loop
            //      for areas and ratios
            //=======================================================
            if( DO_COLLECT_MEDIA_BARS ) {
                rg.mediaBars.val[ bix ][ left0right ].fmin4bar = integX.min;
            }

            barsArea += barArea;
            if( left0right === 'left' ) {
                leftBarsAreas[ bix ] = barArea;
            } else {
                var barRatio = Math.abs( leftBarsAreas[ bix ] / (barArea * transformVolume) );
                barRatioMax = barRatioMax === null ||
                              barRatioMax < barRatio ? barRatio : barRatioMax;
                barRatioMin = barRatioMin === null ||
                              barRatioMin > barRatio ? barRatio : barRatioMin;
                ///prepares data to plot bar-ratio-convergence-graph
                if(
                    bix < sconf.BARS_NUMBER_TO_PLOT &&
                    amode.subessay === 'non-similar-curves'
                ) {
                    graphArrayY.push( barRatio );
                }
            }
            //=======================================================
            // \\// builds stats in loop
            //=======================================================
        });


        //=======================================================
        // //\\ builds stats
        //      for areas and ratios
        //=======================================================

        //for legend
        rg.barRatioMax.val = barRatioMax ?
                //( barRatioMax / transformVolume ).toFixed(3) : '';
                ( barRatioMax ).toFixed(3) : '';
        rg.barRatioMin.val = barRatioMin ?
                ( barRatioMin ).toFixed(3) : '';

        if( left0right === 'left' ) {
            rg.leftFunction.funArea = ssD.FGstats.originF.integral;
            toreg( 'leftBarsArea' )( 'value', barsArea );
        } else {
            toreg( 'rightBarsArea' )( 'value', barsArea * transformVolume );
            rg.rightFunction.funArea = ssD.FGstats.originG.integral * transformVolume;
        }
        //=======================================================
        // \\// builds stats
        //      for areas and ratios
        //=======================================================
    }
    //=========================================================
    // \\// calculates figure, bars areas
    //=========================================================


}) ();

