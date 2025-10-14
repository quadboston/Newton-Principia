( function () {
    var { sn, rg, mat, fapp, toreg, stdMod, sconf, } = window.b$l.apptree({});

    var stdL2       = sn('stdL2', fapp );
    var dataregs    = sn('dataregs', stdL2 );
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );

    Object.assign( study,
    {
        calculatesMajorantRect,
        calcsMonotIntervalArea,
        calculates_inscr8circums,
        calculateAndStoreTransformedFigureAreaRatios,
        adjustRectWidthsToMatchAreaRatiosIfNeeded,
    });

    //==================================
    // //\\ exports methods
    //==================================
    Object.assign( numModel, {
        addsNewBases_8_convertWidths,
    });
    //==================================
    // \\// exports methods
    //==================================
    
    //TEMP L4 Only
    //Initial values to ensure they exist for the data table.
    toreg('exact_ratio')('value', 0);
    toreg('sum_ratio')('value', 0);
    return;


    //***********************************************
    // //\\ auxiliary postprocessing functions
    //***********************************************
    //==================================
    // //\\ calculates mediawidths
    //      after micropoints
    //      and monotonity interval
    //==================================
    function addsNewBases_8_convertWidths(dr)
    {
        var basesN = sconf.basesN;
        var sum = 0;
        //===================================================
        // //\\ adds "balanced" new bars to existing
        //===================================================
        //      if basesN did increase,
        ///new bars have equal lengths which is an average
        ///of previously existing bars,
        for (var i=0; i<basesN; i++) {
            ///if base is new and to be added
	        if ( !dr.partitionWidths[i] ) {
                //makes average base constant and, therefore,
                //provides equal basesN for all added basesN
		        dr.partitionWidths[i] = sum / i;
            }
	        sum += dr.partitionWidths[i];
            //in first round of setting partitionWidths, sum = basesN
        }
        //now, average sum=previous average sum = sum/basesN;
        //===================================================
        // \\// adds "balanced" new bars to existing
        //===================================================

        //===================================================
        // //\\ converts balanced widths to real media widths
        //===================================================
        {
            //Wait to calculate widestSize as it can change, for example by the
            //algorithm that automatically adjusts the rectangle widths.
            let pwidths = dr.partitionWidths; //normless
            let chosenWidth = dr.yVariations.chosenWidth;
            let factor = 1/sum*chosenWidth;
            for (var i=0; i<basesN; i++) {
                pwidths[i] = pwidths[i] * factor; //normed
            }
        }
        //===================================================
        // \\// converts balanced widths to real media widths
        //===================================================
    }
    //==================================
    // \\// calculates mediawidths
    //==================================
    function calcsMonotIntervalArea(dr)
    {
        let ff = numModel.curveFun;
        let dv = dr.yVariations;
        let x_start = dv.x_start;
        let chosenWidth = dv.chosenWidth;
        let len = sconf.BASE_MAX_NUM;
        let step = chosenWidth/len;
        let sum = 0;
        for( var ii=0; ii<len; ii++ ) {
            sum += ff(dr, ii*step+x_start);
        }
        sum *= step;
        dr.figureArea = dv.complimentaryAreaBar-sum;
    }
    ///must run after widths have been finalized
    function calculatesMajorantRect(dr)
    {
        let widestSize = 0;
        for(let i=0; i<sconf.basesN; i++ ) {
            const width = dr.partitionWidths[i];
            widestSize = Math.max(widestSize, width);
        }

        let dv = dr.yVariations;
        let chchosen = dv.chchosen;
        if( dv.chchosen.dir > 0 ) {
            var left = dv.x_start;
            var right = left + widestSize;
        } else {
            var right = dv.x_end;
            var left = right - widestSize;
        }
        var top = dv.minY;
        var bottom = dv.maxY;
        dr.widestRect = {
            left,
            right,
            bottom,
            top,
        };
    }
    
    
    function calculates_inscr8circums(dr)
    {
        var insYar = sn( 'inscribedY', dr.basePts, [] );
        var cirYar = sn( 'circumscribedY', dr.basePts, [] );
        var baseBarsLefts = sn( 'baseBarsLefts', dr.basePts, [] );
        var baseBarsRights = sn( 'baseBarsRights', dr.basePts, [] );
        insYar.length = 0;
        cirYar.length = 0;
        baseBarsLefts.length = 0;
        baseBarsRights.length = 0;
        var pwidths = dr.partitionWidths;
        var basesN = sconf.basesN;

        ///creates baseBarsLefts points of base partion
        //we make them by adding already known widths
        //to the monotonity interval,
        var bbl = dr.yVariations.x_start;
        for( var ib = 0; ib < basesN; ib++ ) {
            baseBarsLefts[ib] = bbl;
            bbl += pwidths[ib];
            baseBarsRights[ib] = bbl;
        }
        
        // //\\ calculates min and max on separate bases
        {
            let ff = numModel.curveFun;
            let yRef = dr.yVariations.yRef;
            let dir = dr.yVariations.chchosen.dir;
            for( var ib = 0; ib < basesN; ib++ ) {
                let ymin = ff(dr, baseBarsLefts[ib]);
                let ymax = ff(dr, baseBarsRights[ib]);
                if( dir <=0 ) {
                    let d = ymin;
                    ymin = ymax;
                    ymax = d;
                }
                ymax = Math.min(ymax, yRef*0.9999999);
                if( ymin>=ymax ) {
                    ////otherwise negative heights
                    ////happens at svg
                    ymin = ymax < 0 ? ymax*1.0000001 : ymax * 0.999999;
                }
                insYar[ib] = ymax;
                cirYar[ib] = ymin;
            }
        }
        // \\// calculates min and max on separate bases

        
        // //\\ calculates min and max areas
        var pwidths = dr.partitionWidths;
        var areaCir = 0;
        var areaIns = 0;
        for( var ib = 0; ib < basesN; ib++ ) {
            let barwidth = pwidths[ib];
            areaCir += barwidth*cirYar[ib];
            areaIns += barwidth*insYar[ib];
        }
        let dv = dr.yVariations;
        dr.areaCir = dv.complimentaryAreaBar - areaCir;
        dr.areaIns = dv.complimentaryAreaBar - areaIns;
        // \\// calculates min and max on separate bases
    }



    function calculateAndStoreTransformedFigureAreaRatios() {
        //TEMP L4 only
        const drL = dataregs.drL;
        const drR = dataregs.drR;

        //Factors to multiply un-transformed areas to get transformed areas
        const areaFactorA = stdMod.calculateFactorAreaTransformed(drL);
        const areaFactorB = stdMod.calculateFactorAreaTransformed(drR);

        const exactA = drL.figureArea * areaFactorA;
        const exactB = drR.figureArea * areaFactorB;
        const sumA = drL.areaIns * areaFactorA;
        const sumB = drR.areaIns * areaFactorB;


        toreg('exact_ratio')('value', calculateRatio(exactA, exactB));
        toreg('sum_ratio')('value', calculateRatio(sumA, sumB));


        function calculateRatio(a, b) {
            //Calculate the ratio safely
            const maxRatio = 1e7;
            if (Math.abs(b) < 1e-5)
                return maxRatio;
            const ratio = Math.abs(a / b);
            if (ratio > maxRatio)
                return maxRatio;
            return ratio;
        }
    }



    function adjustRectWidthsToMatchAreaRatiosIfNeeded(dr) {
        //Automatically adjust rectangle widths in the input datareg to match
        //the ratio of areas in the other specified datareg if needed.
        const drOther = dr.DR_ADJUST_WIDTHS_MATCH_AREA_RATIOS;
        if (!drOther)
            return;

        //Only adjust the widths if both figures are monotonic.
        if(!study.areBothFiguresMonotonic())
            return;


        const ratioData = calculateRatioInscribedAreasAndWidthLast(drOther);
        if (!ratioData)
            return;
        const {ratios, widthLastRect} = ratioData;


        const widths = calculateRectWidthsToMatchAreaRatios(dr, ratios,
            widthLastRect);
        if (widths)
            dr.partitionWidths = widths;
    }



    function calculateRatioInscribedAreasAndWidthLast(dr) {
        const dv = dr.yVariations;
        if (!dv)
            return null;

        const pwidths = dr.partitionWidths;
        const ff = numModel.curveFun;
        let xLast = dv.x_start;

        let sumAreaIns = 0;
        const areasIns = [];
        for(let i = 0; i < sconf.basesN; i++) {
            const width = pwidths[i];
            const x = xLast + width;
            const y = ff(dr, x);
            const height = dv.yRef - y;
            const area = width * height;
            areasIns.push(area);
            sumAreaIns += area;
            xLast = x;
        }

        if (sumAreaIns <= 0)
            return null;

        return {
            ratios: areasIns.map(area => area / sumAreaIns),
            widthLastRect: pwidths[sconf.basesN-1],
        };
    }



    function calculateRectWidthsToMatchAreaRatios(dr, ratios, widthLastRect) {
        //Calculate rectangle widths for the input datareg, so that the ratio
        //of each of their areas (inscribed rectangle area divide by sum of
        //inscribed rectangle areas) match the input ratios.

        //Tolerance for calculated sum of widths
        const errorTolerance = 0.001;


        //Ensure the following has been initialized.
        const dv = dr.yVariations;
        if (!dv)
            return null;
        

        const {x_start, x_end, chosenWidth} = dv;
        const ff = numModel.curveFun;
        const figureArea = dr.figureArea;

        //Bounds to constrain the scale (1 means exact figure area).
        const scaleMin = 0.01, scaleMax = 1;


        //Calculate the widths.  Sometimes there are multiple roots/solutions
        //and the algorithm can "jump" between them.  This issue mainly occurs
        //when the number of bases is small.  Sticking to one root finding
        //method under these conditions is more consistent, and helps to reduce
        //this issue, as different methods often prefer different roots.
        //Overall multiple methods are used below because each have strengths
        //and weaknesses (refer to their respective functions for more).
        let solvedData = null;

        //Only use the Newton Raphson method when the number of bases is large.
        if (sconf.basesN > 40)
            solvedData = solveUsingNewtonRaphson();
        //Use bisection when number of bases is small, or as a backup if the
        //Newton Raphson method failed.
        if (!solvedData)
            solvedData = solveUsingBisection();


        //If solution not found (unlikely to happen).
        if (!solvedData || !solvedData.widthData)
            return null;

        //If calculated data not usable (unlikely to happen).
        const {widthsReversed, sumWidth} = solvedData.widthData;
        if (!widthsReversed || sumWidth <= 0)
            return null;


        //Reverse widths so in correct order.
        const widths = widthsReversed.reverse();

        //Scale to ensure fills figure width (mainly for the very unlikely
        //event the above didn't converge closely enough).
        const scaleWidth = chosenWidth / sumWidth;

        return widths.map(width => width * scaleWidth);



        function calculateWidthData(scale) {
            //Calculate widths for each inscribed rectangle using a chosen sum
            //for their combined area (scaled by the input scale), and a fixed
            //width for the last one.  If there's extra space the sum of their
            //widths will be less than that of the figure.  If there isn't
            //enough space the sum will be greater (the width of each will be
            //added by assuming their height is that of the figure).  This
            //gives an estimate of how far the scale is off by.

            //Given that inscribed rectangles use the height on their right
            //side, it's simpler and more efficient to calculate them in
            //reverse order (from last to first).  For any given rectangle it's
            //height is determined by the left side of the previous rectangle.
            //This means that the height is constant and the width is simply
            //calculated as width = area / height.  If instead the rectangles
            //were calculated from first to last...
            // -The height would have to be calculated eg. numerically which
            //  would be much slower.
            // -There are often two possible rectangles with the same area
            //  (wide and short, or narrow and tall) and it can be tricky to
            //  determine which one to choose.
            // -When the input scale it large and there isn't enough space for
            //  all the rectangles, it's difficult to get an estimate how much
            //  the scale is off by.  This is because any remaining rectangles
            //  have a height of zero.

            //Outputs
            const widthsReversed = [];
            let sumWidth = 0;

            //Chosen area for the sum of rectangles
            const sumAreaChosen = figureArea * scale;

            //Set the last width to a fixed value, as that rectangle's height
            //is zero, a width can't be calculated for it using area.
            if (widthLastRect <= 0)
                return null;
            widthsReversed.push(widthLastRect);
            sumWidth += widthLastRect;
            let xRight = x_end - widthLastRect;

            //All remaining rectangles, start with the second last.
            for(let i = sconf.basesN - 2; i >= 0; i--) {
                //If x is beyond the left side, constrain it so the height of
                //that side is used.  This is helpful for estimating how much
                //the scale is off by, because it still allows a width to be
                //calculated.  Otherwise when the sum of widths is greater than
                //the width of the figure, it wouldn't be possible to know how
                //much it's off by.
                const x = Math.max(x_start, xRight);
                const y = ff(dr, x);
                const height = dv.yRef - y;
                if (height === 0)
                    return null;
                
                //                  A1 / A    * B
                const areaDesired = ratios[i] * sumAreaChosen;
                const width = areaDesired / height;

                //Width must be +ve otherwise an error occured
                if (width <= 0)
                    return null;
                widthsReversed.push(width);
                sumWidth += width;
                xRight -= width;
            }

            return {widthsReversed, sumWidth};
        }



        function solveUsingNewtonRaphson() {
            //Use the Newton Raphson method to find a root of the mathematic
            //function created by calculateWidthData().  In many cases it's a
            //straight or slightly curved line, especially when the number of
            //bases gets large.  This means it often converges in just a few
            //iterations.  If it has problems converging that generally means
            //the function isn't very straight, and it isn't going to.  When
            //this happens it's best to stop early and use another root finding
            //method.  Note that converging quickly is very important when the
            //number of bases is large to prevent performance issues.

            
            const offset = 0.001;//Offset to approximate derivative
            const slopeTolerance = 1e-9;//Tolerance for a flat slope

            //Initial scale guess
            //A scale of 1 represents exact figure area, and is a good initial
            //guess.  This is especially true when the number of bases gets
            //large, since the sum of inscribed rectangle area approaches the
            //exact figure area.
            let scale = 1;
            
            let widthData = null;

            //Constrain max iteration to prevent eg. infinite loop
            for(let iteration = 0; iteration <= 4; iteration++) {
                //Calculate new scale or skip to check initial guess.
                if (widthData) {
                    //Estimate derivative
                    const widthDataOffset = calculateWidthData(scale - offset);
                    if (!widthDataOffset)
                        return null;
                    const errorC = widthData.sumWidth - chosenWidth;
                    const errorO = widthDataOffset.sumWidth - chosenWidth;
                    const slope = (errorC - errorO) / offset;

                    //At a minima so either stuck or at a root.  If at a root
                    //would have already returned the output before.
                    if (Math.abs(slope) <= slopeTolerance)
                        return null;

                    scale -= errorC / slope;
                }

                //Out of bounds and unlikely to converge.
                if (scale < scaleMin || scale > scaleMax)
                    return null;

                //Update width data and check if converged.
                widthData = calculateWidthData(scale);
                if (!widthData)
                    return null;
                const errorRelative = widthData.sumWidth / chosenWidth - 1;
                if (Math.abs(errorRelative) < errorTolerance)
                    return {scale, widthData, iteration};
            }

            //Didn't converge
            return null;
        }


        function solveUsingBisection() {
            //Use the bisection method to find a root of the mathematic
            //function created by calculateWidthData().  This method is slow
            //but very reliable at finding a root, even when the function isn't
            //very straight (eg. has one or more local minimums).  It works
            //best when the number of bases is low.

            //Lower and upper bound of interval.
            let scaleL = scaleMin;
            let scaleU = scaleMax;

            //Constrain max iteration to prevent eg. infinite loop
            for(let iteration = 0; iteration < 20; iteration++) {
                //Calculate new scale for midpoint
                const scale = (scaleL + scaleU) / 2;

                //Update width data and interval.
                const widthData = calculateWidthData(scale);
                if (!widthData)
                    return null;
                if (widthData.sumWidth < chosenWidth)
                    scaleL = scale;
                else
                    scaleU = scale;
                    
                //Check if converged.
                const errorRelative = widthData.sumWidth / chosenWidth - 1;
                if (Math.abs(errorRelative) < errorTolerance)
                    return {scale, widthData, iteration};
            }

            //Didn't converge
            return null;
        }
    }
    //***********************************************
    // \\// auxiliary postprocessing functions
    //***********************************************
    
}) ();
