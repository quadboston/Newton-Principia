( function () {
    var {
        sn, mat,
        fapp, sconf,
    } = window.b$l.apptree({
    });


    var stdL2       = sn('stdL2', fapp );
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );

    Object.assign( study,
    {
        calculatesMajorantRect,
        calcsMonotIntervalArea,
        calculates_inscr8circums,
    });
    //==================================
    // //\\ declares data
    //==================================
    //TEMP
    [stdL2.datareg, stdL2.datareg2].forEach(dr => {
        Object.assign( dr,
        {
            figureArea  : 0,
        });
    });
    //==================================
    // \\// declares data
    //==================================

    //==================================
    // //\\ exports methods
    //==================================
    Object.assign( numModel, {
        curveFun,
        findCtrlPtPosWithMaxX,
        findCtrlPtPosWithMinX,
        addsNewBases_8_calculatesMaxWidth,
        checkIfCurveSlopeOkTemp,    //TEMP
        checkIfControlPointYOkForSlopeTemp, //TEMP
        checkIfPointOnRightOfCurvePassedSlope, //TEMP
    });
    //==================================
    // \\// exports methods
    //==================================
    return;

    
    //***********************************************
    // //\\  auxiliary prepprocessing functions
    //***********************************************
    ///should be interpolated function via control points
    function curveFun(dr, x) {
        //.in legacy code, this depends on order of
        //.modules-load "intergral.js" must be before "model.js"
        //Un-transformed positions
        const pts = dr.ctrlPts.positions;
        var sum = 0;
        for (var i=0; i<pts.length; i++) {
	        var num = pts[i].y;
	        var den = 1;
	        for (var j=0; j<pts.length; j++) {
		        if (j == i) {
			        continue;
		        }
		        num *= (x - pts[j].x);
	        }
	        for (var j=0; j<pts.length; j++) {
		        if (j == i) {
			        continue;
		        }
		        var diff = pts[i].x - pts[j].x;
		        if (diff != 0) {
			        den *= diff;
		        } else {
			        den = .4;
		        }
	        }
	        sum += (num/den);
        }
        return sum;
    }

    //TEMP Should the following be combined into one function?
    //Un-transformed positions
    function findCtrlPtPosWithMaxX(dr) {
        return dr?.ctrlPts?.positions?.toSorted((a, b) => a.x - b.x)?.at(-1);
    }
    function findCtrlPtPosWithMinX(dr) {
        return dr?.ctrlPts?.positions?.toSorted((a, b) => a.x - b.x)?.at(0);
    }
    //***********************************************
    // \\// auxiliary prepprocessing functions
    //***********************************************

    //***********************************************
    // //\\ auxiliary postprocessing functions
    //***********************************************
    //==================================
    // //\\ calculates mediawidths
    //      after micropoints
    //      and monotonity interval
    //==================================
    function addsNewBases_8_calculatesMaxWidth(dr)
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
        //      , finds dr.widest
        //===================================================
        {
            let widestIndex = 0;
            let widestSize = 0;
            let pwidths = dr.partitionWidths; //normless
            let chosenWidth = dr.yVariations.chosenWidth;
            let factor = 1/sum*chosenWidth;
            for (var i=0; i<basesN; i++) {
                pwidths[i] = pwidths[i] * factor; //normed
                if ( !i || pwidths[i] > widestSize ) {
                    widestSize = pwidths[i]
                    widestIndex = i;
                }
            }
            dr.widestSize = widestSize;
            dr.widestIndex = widestIndex;
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
    ///must run after finding maxWidth
    function calculatesMajorantRect(dr)
    {
        let dv = dr.yVariations;
        let chchosen = dv.chchosen;
        if( dv.chchosen.dir > 0 ) {
            var left = dv.x_start;
            var right = left + dr.widestSize;
        } else {
            var right = dv.x_end;
            var left = right - dr.widestSize;
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


        //TEMP
        //insYar[ib] should be the tops of the inscribed rectangles
        //dv.maxY should be the bottom of the rectangles
        //Should ensure monotonic also
        if (dr.drAdustWidthsTemp) {
            console.log("**********Un-transformed Areas**********");


            let sumAreaIns = 0;
            const areasIns = [];
            const useSecondAreaIns = [];
            for(let ib = 0; ib < basesN; ib++) {
                const barwidth = pwidths[ib];
                const heightIns = Math.abs(dv.maxY - insYar[ib]);
                const areaIns = barwidth * heightIns;
                areasIns.push(areaIns);
                useSecondAreaIns.push(barwidth > heightIns);
                sumAreaIns += areaIns;
            }

            if (sumAreaIns !== 0) {
                const ratiosIns = areasIns.map(area => area / sumAreaIns);
                // console.log("sumRatiosIns =", ratiosIns.reduce((acc, cur) => acc + cur));

                //TEMP The exact width of the last rect
                //////// const widthLastRect = pwidths.at(-1);

                //sumW
                //wLast
                //avgW = sumW / n       Would be a constant for any given n

                //(sumW - wLast) / (n - 1)  As the last width on the left figure gets smaller
                //                          the last width on the right figure will increase


                //TEMP Maybe when it comes to width of the last rect on the
                //right diagram, when using width use the same width as the
                //left diagram.
                //I suppose one alternative would be to use height.  If that's
                //the case then then could send the height of the left side of
                //the last rect.  However one problem that could possibly occur
                //is that a large height could keep the width of the last rect
                //very large even at the limit and therefore prevent the area
                //from converging?
                //  -Actually that might not be the case, wouldn't the height
                //   decrease as the number of bases increase?

                const widthLastRect = pwidths[basesN-1];
                const heightLastRect = Math.abs(dv.maxY - insYar[basesN-2]);
                const ratioLastTemp = widthLastRect * heightLastRect / dr.figureArea;
                
                const widths = calculateRectWidthsToMatchAreaRatios(
                    dr.drAdustWidthsTemp, ratiosIns, ratioLastTemp,
                    widthLastRect);

                if (widths)
                    dr.drAdustWidthsTemp.partitionWidths = widths;
            }
        } else {
            const drL = stdL2.datareg;
            const drR = stdL2.datareg2;


            //TEMP Heights of rectangles
            const heightFirstL = Math.abs(drL.yVariations.maxY);// - 
                // drL.basePts.inscribedY.at(0));
            const height2ndLastL = Math.abs(drL.yVariations.maxY - 
                drL.basePts.inscribedY.at(-2));

            const heightFirstR = Math.abs(drR.yVariations.maxY);// - 
                // drR.basePts.inscribedY.at(0));
            const height2ndLastR = Math.abs(drR.yVariations.maxY - 
                drR.basePts.inscribedY.at(-2));
            // console.log("height2ndLastL / heightFirstL =", height2ndLastL / heightFirstL);
            // console.log("height2ndLastR / heightFirstR =", height2ndLastR / heightFirstR);


            const sumA = drL.areaIns;
            const sumB = drR.areaIns;
            const exactA = drL.figureArea;
            const exactB = drR.figureArea;

            console.log("exactA =", exactA);
            console.log("exactB =", exactB);
            console.log("sumA =", sumA);
            console.log("sumB =", sumB);
            // console.log("sumA / exactA =", sumA / exactA);
            // console.log("sumB / exactB =", sumB / exactB);

            // console.log("sumA =", sumA);
            // console.log("sumB =", sumB);
            // console.log("exactA =", exactA);
            // console.log("exactB =", exactB);
            // console.log("sumA / sumB =", sumA / sumB);
            // console.log("exactA / exactB =", exactA / exactB);
            // console.log("sumA / exactA =", sumA / exactA);
            // console.log("sumB / exactB =", sumB / exactB);


            const areasL = [];
            for(let ib = 0; ib < basesN; ib++) {
                const barwidth = drL.partitionWidths[ib];
                const heightIns = Math.abs(dv.maxY - drL.basePts.inscribedY[ib]);
                const areaIns = barwidth * heightIns;
                areasL.push(areaIns);
            }

            const areasR = [];
            for(let ib = 0; ib < basesN; ib++) {
                const barwidth = drR.partitionWidths[ib];
                const heightIns = Math.abs(dv.maxY - drR.basePts.inscribedY[ib]);
                const areaIns = barwidth * heightIns;
                areasR.push(areaIns);
            }
            console.log("(all)   A_i =", areasL);
            console.log("(all)   B_i =", areasR);

            const areaRatios = [];
            for(let i = 0; i < basesN - 1; i++)
                areaRatios.push(areasL[i] / areasR[i]);
            console.log("exact_ratio = exactA / exactB =", exactA / exactB);
            console.log("sum_ratio = sumA / sumB =", sumA / sumB);
            console.log("(for all i)   i_ratio = A_i / B_i =", areaRatios);
        }
    }



    function checkIfCurveSlopeOkTemp(dr, positionsNewTemp) {
        //TEMP
        const ff = stdL2.numModel.curveFun;
        // const dv = dr.yVariations;
        //TEMP Is something similar to the following needed?
        // if (!dv) return true;
        // const yVariations = dr.yVariations;
        // const xStart = yVariations.x_start;
        // const chosenWidth = yVariations.chosenWidth;
        const xStart = dr.ctrlPts.positions.at(0).x;
        const chosenWidth = dr.ctrlPts.positions.at(-1).x - xStart;

        //TEMP Note that dv.maxY changes when non-monotonic therefore use
        //an alternative.

        //TEMP Store current control point positions
        const positionsStored = [...dr.ctrlPts.positions];

        // dr.ctrlPts.positions = [...positionsNewTemp];
        const positionsSelected = positionsNewTemp || dr.ctrlPts.positions;
        dr.ctrlPts.positions = [...positionsSelected];

        //TEMP
        //Want to check points in between the left and right sides
        //Eg.  0  1  2  3  should be for 2 points
        const countPoints = 30;
        const xInterval = chosenWidth / (countPoints + 1);
        for(let i = 1; i <= countPoints; i++) {
            const x = xStart + xInterval * i;
            const y = ff(dr, x);
            
            if (checkIfControlPointYOkForSlopeTemp(dr, x, y) < 0) {
                dr.ctrlPts.positions = [...positionsStored];
                return false;
            }
        }
        dr.ctrlPts.positions = [...positionsStored];
        return true;
    }

    
    function checkIfPointOnRightOfCurvePassedSlope(dr, positionsNewTemp) {
        //TEMP
        const ff = stdL2.numModel.curveFun;
        const xStart = dr.ctrlPts.positions.at(0).x;
        const chosenWidth = dr.ctrlPts.positions.at(-1).x - xStart;

        //TEMP Store current control point positions
        const positionsStored = [...dr.ctrlPts.positions];

        const positionsSelected = positionsNewTemp || dr.ctrlPts.positions;
        dr.ctrlPts.positions = [...positionsSelected];

        const x = xStart + chosenWidth * 0.95;
        const y = ff(dr, x);

        const output = (checkIfControlPointYOkForSlopeTemp(dr, x, y) < 0);
        dr.ctrlPts.positions = [...positionsStored];
        return output;
    }


    function checkIfControlPointYOkForSlopeTemp(dr, x, y) {
        //TEMP
        //Angle for the slope constraint.
        const angleDeg = parseFloat(document.getElementById("input-slope-constraint-angle").value);
        // console.log(`angleDeg = ${angleDeg}  typeof angleDeg = ${typeof angleDeg}`);
        const andleRadTemp = mat.degToRad(angleDeg);
        // const andleRadTemp = mat.degToRad(15);
        // const dv = dr.yVariations;
        //TEMP Is something similar to the following needed?
        // if (!dv) return true;
        // const yVariations = dr.yVariations;
        // const xStart = yVariations.x_start;
        // const chosenWidth = yVariations.chosenWidth;

        //TEMP Note that dv.maxY changes when non-monotonic therefore use
        //an alternative.
        const maxY = dr.ctrlPts.positions.at(-1).y;

        //TEMP The same is true for the following.
        const xStart = dr.ctrlPts.positions.at(0).x;
        const chosenWidth = dr.ctrlPts.positions.at(-1).x - xStart;


        const slopeBound = (maxY * Math.tan(andleRadTemp)) / chosenWidth;
        
        const height = maxY - y;
            
        const heightBound = slopeBound * (chosenWidth - (x - xStart));
        // console.log("height - heightBound =", height - heightBound);
        // return !(height < heightBound);
        return height - heightBound;
    }



    //TEMP Adjust inputs as needed
    //function calculateRectWidthsToMatchAreaRatios(dr, ratios, widthLast) {
    function calculateRectWidthsToMatchAreaRatios(dr, ratios, ratioLastTemp,
        widthLastRect) {
        //Calculate rectangle widths for the input datareg, so that the ratio
        //of each of their areas (inscribed rectangle area divide by sum of
        //inscribed rectangle areas) match the input ratios.  Uses the Newton
        //Raphson method (using approximate slope for the derivative).
        const dv = dr.yVariations;
        if (!dv) return;
        
        //TEMP
        const isMonotonicTemp = dv.changes.length <= 1;
        if (!isMonotonicTemp) return;
        
        //Useful values
        const ff = numModel.curveFun;
        const yVariations = dr.yVariations;
        const xStart = yVariations.x_start;
        const chosenWidth = yVariations.chosenWidth;
        const xEnd = xStart + chosenWidth;
        const figureArea = dr.figureArea;


        //TEMP Testing different widths
        //The width to use for the last rectangle.
        let widthLastRectUse = widthLastRect;//calculateWidthLastRectUsingArea();//widthLastRect;
        // const rangeWidthLast = document.getElementById("range-width-last");
        // if (rangeWidthLast)
        //     widthLastRectUse = parseFloat(rangeWidthLast.value) * chosenWidth;
        // widthLastRectUse = calculateWidthLastRectUsingArea();//widthLastRect;
        // // const widthLastRectUse = widthLastRect;//calculateWidthLastRectUsingArea();//widthLastRect;


        // console.time("Width calculation converged in");
        //Bounds to constrain the scale.
        const scaleMin = 0.01, scaleMax = 1;//100;

        //Initial guess for first iteration
        let scaleCurrent = 1;
        let widthDataCurrent = calculateWidthData(scaleCurrent);

        //Offset to approximate derivative
        const offset = 0.001;

        //Constrain max iterations for very unlikely event of eg. infinite loop
        let iteration = 0
        const iterationsMax = 10;
        let didNewtonRaphsonConverge = false;
        for(; iteration < iterationsMax; iteration++) {
        // for(let iteration = 0; iteration < 10; iteration++) {
            //Estimate derivative
            const widthDataOffset = calculateWidthData(scaleCurrent - offset);
            const errorC = widthDataCurrent.sumWidth - chosenWidth;
            const errorO = widthDataOffset.sumWidth - chosenWidth;
            const slope = (errorC - errorO) / offset;
            ////Already at minimum error

            //TEMP
            //-At minima (would likely never reach 0 exactally, but would be an
            //issue for the math)
            //-If errorC is zero then so is errorO meaning at a root
            //  -Otherwise just a local minima.
            //    -Overall would likely be more usefult to check if within a
            //     tolerance close to 0.
            if (slope === 0)
                break;
            
            // console.log("**");
            // console.log(`Iteration ${iteration + 1}  scaleCurrent = ${scaleCurrent}  ` + 
            //             `errorC = ${errorC}  errorO = ${errorO}  slope = ${slope}  offset = ${offset}`);

            //Calculate the scale for the next iteration and clamp if needed
            //(eg. became negative because overshot the root).
            let scaleNew = scaleCurrent - errorC / slope;
            // // console.log(`before clamping scaleNew = ${scaleNew}`);
            // scaleNew = Math.min(Math.max(scaleNew, scaleMin), scaleMax);
            if (scaleNew < scaleMin || scaleNew > scaleMax) {
                break;
            }

            //Update the current scale and data, then check if converged.
            scaleCurrent = scaleNew;
            widthDataCurrent = calculateWidthData(scaleCurrent);

            const errorRelative = widthDataCurrent.sumWidth / chosenWidth - 1;
            // console.log(`errorRelative = ${errorRelative}  scale = ${scaleCurrent}  ` +
            //             `sumWidth = ${widthDataCurrent.sumWidth}  widthDataCurrent =`, widthDataCurrent);
            if (Math.abs(errorRelative) < 0.001) {
                didNewtonRaphsonConverge = true;
                break;
            }
        }
        // console.timeEnd("Width calculation converged in");
        const scaleNewtonRaphson = scaleCurrent;
        const widthDataNewtonRaphson = widthDataCurrent;
        
        // // console.log("scaleCurrent =", scaleCurrent);
        // didNewtonRaphsonConverge = iteration < iterationsMax;
        if (didNewtonRaphsonConverge)
            console.log(`Newton Raphson  Converged in ${iteration + 1} iteration` + ((iteration + 1) > 1 ? 's' : ''));
        else
            console.log(`Newton Raphson  Didn't converge iterations = ${iteration}`);
        // console.log(`NR Converged in iterations = ${iteration + 1}  ` +
        //             `sumWidths = ${widthDataCurrent.sumWidth}  ` +
        //             `chosenWidth = ${chosenWidth}`);


        //TEMP Linear Search
        const dataLSTemp = [];
        for(let scale = scaleMin; scale <= scaleMax; scale += 0.001) {
            const widthDataCurrent = calculateWidthData(scale);
            const error = widthDataCurrent.sumWidth - chosenWidth;
            dataLSTemp.push({scale, error});
        }
        //TEMP//
        

        //TEMP Binary Search
        // console.time("best Binary Search");
        let scaleL = scaleMin;
        let scaleR = scaleMax;
        let widthDataL = calculateWidthData(scaleL);
        let widthDataR = calculateWidthData(scaleR);
        let bestLorR = null;
        let didBinaryConverge = false;
        for(let i = 0; i < 20; i++) {
            const scaleM = (scaleL + scaleR) / 2;
            const widthDataM = calculateWidthData(scaleM);
            // const errorRelative = widthDataCurrent.sumWidth / chosenWidth - 1;
            // if (errorRelative > 0) {
            // console.log(`i = ${i}  sumWidth = ${widthDataM.sumWidth}  chosenWidth = ${chosenWidth}`);
            if (widthDataM.sumWidth < chosenWidth) {
                scaleL = scaleM;
                widthDataL = widthDataM;
                bestLorR = 'L';
            } else {
                scaleR = scaleM;
                widthDataR = widthDataM;
                bestLorR = 'R';
            }
            const widthDataBest = (bestLorR === "L" ? widthDataL : widthDataR);
            const errorRelativeBest = widthDataBest.sumWidth / chosenWidth - 1;
            if (Math.abs(errorRelativeBest) < 0.001) {
                didBinaryConverge = true;
                console.log(`Binary Search  Converged  iterations = ${i+1}`);//  sumWidth = ${widthDataM.sumWidth}  figureWidth = ${chosenWidth}`);
                break;
            }
        }
        // console.timeEnd("best Binary Search");
        const scaleBest = (bestLorR === "L" ? scaleL : scaleR);
        const widthDataBest = (bestLorR === "L" ? widthDataL : widthDataR);
        // const errorRelativeBest = widthDataBest.sumWidth / chosenWidth - 1;
        // console.log(`best binary search  scale = ${scaleBest}  ` +
        //             `errorRelative = ${errorRelativeBest}  ` +
        //             `widthDataCurrent =`, widthDataBest);
        //TEMP//
        const scaleBinarySearch = scaleBest;
        const widthDataBinarySearch = widthDataBest;
        
        // console.log("scaleCurrent =", scaleCurrent);


        // //TEMP Add error for width to array to output to get and idea of what the curve looks like
        // // const errorsForCurve = [];
        // let errorsForCurve = 'scale  sumWidth  error\n';
        // const i2Max = 10;
        // const deltaScale = (scaleMax - scaleMin) / i2Max;
        // for(let i2 = 0; i2 <= i2Max; i2++) {
        //     const scale = scaleMin + i2 * deltaScale;
        //     const {sumWidth} = calculateWidthData(scale);
        //     const error = sumWidth - chosenWidth;
        //     // errorsForCurve.push({sumWidth, error});
        //     errorsForCurve += `${scale.toFixed(4)}  ${sumWidth.toFixed(4)}  ${error.toFixed(4)}\n`;
        // }
        // console.log("errorsForCurve =", errorsForCurve);
        // console.log("rootsApproximate =", rootsApproximate);
        // //TEMP//





        // // //TEMP Width where area is max
        // // let valuesAreaMax = null;
        // // const xLeft = xStart + chosenWidth * 0.2;
        // // for(let x = xLeft; x < xEnd; x++) {
        // //     const width = x - xLeft;
        // //     const y = ff(dr, x);
        // //     const height = Math.abs(dv.maxY - y);
        // //     const area = width * height;
        // //     if (!valuesAreaMax || valuesAreaMax.area < area) {
        // //         valuesAreaMax = {
        // //             area,
        // //             width,
        // //             height,
        // //             x,
        // //             y,
        // //             widthDivChosenWidth: width / chosenWidth,
        // //         };
        // //     }
        // // }
        // // console.log("valuesAreaMax =", valuesAreaMax);

        //  //TEMP Width where area is max
        // let strArea = 'width, area\n';//, deltaWidth, deltaHeight, slope\n';
        // const xLeft = xStart;// + chosenWidth;// * 0.2;
        // const deltaWidth = 0.01;
        // for(let x = xLeft + deltaWidth; x < xEnd; x += deltaWidth) {
        //     const width = x - xLeft;
        //     const y = ff(dr, x);
        //     const height = Math.abs(dv.maxY - y);
        //     const area = width * height;

        //     const xLast = x - deltaWidth;
        //     const yLast = ff(dr, xLast);
        //     const heightLast = Math.abs(dv.maxY - yLast);
        //     const deltaHeight = height - heightLast;
        //     const slope = deltaHeight / deltaWidth;
        //     strArea += `${width}, ${area}\n`;
        //     // strArea += `${width}, ${area}, ${deltaWidth}, ${deltaHeight}, ${slope}\n`;
        // }
        // console.log("strArea =", strArea);







        //TEMP Should the widths be scaled?**********************

        //Reverse widths so in correct order.
        // const index = 3;
        // console.log(`scalesLSIntervalsTemp index = ${index}`);
        // const widths = scalesLSIntervalsTemp[index].widthDataCurrent.widthsReversed.reverse();

        let widthDataChosen = null;
        let scaleChosen = null;
        //TEMP Only use Newton Raphson when lots of rectangles.
        if (didNewtonRaphsonConverge && sconf.basesN > 40) {
            widthDataChosen = widthDataNewtonRaphson;
            scaleChosen = scaleNewtonRaphson;
            console.log('Using Newton Raphson solution');
        } else {
            widthDataChosen = widthDataBinarySearch;
            scaleChosen = scaleBinarySearch;
            console.log('Using Binary Search solution');
        }
        console.log("scaleNewtonRaphson =", scaleNewtonRaphson);
        console.log("scaleBinarySearch =", scaleBinarySearch);

        const widths = widthDataChosen.widthsReversed.reverse();
        // const widths = widthDataCurrent.widthsReversed.reverse();
        //Scale to ensure fills figure base (mainly for the very unlikely event
        //that the above didn't converge closely enough).
        const scaleWidth = chosenWidth / widthDataCurrent.sumWidth;
        const outputTemp = widths.map(width => width * scaleWidth);
        
        
        //TEMP Plots and interface with other settings
        createTempPlotsAndInterfaceIfNeeded();
        //TEMP Plots//

        //TEMP
        return outputTemp;
        // const outputTemp = widths.map(width => width * scaleWidth);
        // console.log("outputTemp reduce =", outputTemp.reduce((acc, cur) => acc + cur));
        // return outputTemp;
        // // return widthDataCurrent.widthsReversed.toReversed();



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
            widthsReversed.push(widthLastRectUse);
            sumWidth += widthLastRectUse;
            let xRight = xEnd - widthLastRectUse;
            
            //All remaining rectangles should have a non-zero height. //TEMP
            //Start with the second last rectangle
            for(let i = sconf.basesN - 2; i >= 0; i--) {
                //TEMP May want to improve x constraint eg. to check right side?
                const x = (xRight >= xStart) ? xRight : xStart;
                const y = ff(dr, x);
                const height = Math.abs(dv.maxY - y);
                //TEMP Add check if height 0
                
                //                  A1 / A    * B
                const areaDesired = ratios[i] * sumAreaChosen;
                const width = areaDesired / height;
                //TEMP Should ensure width is +ve
                
                widthsReversed.push(width);
                sumWidth += width;
                xRight -= width;
            }

            return {widthsReversed, sumWidth};
        }



        // function checkIfCurveTooFlat() {
        //     // console.log("checkIfCurveTooFlat");
        //     const slopeBound = (dv.maxY * 0.2) / chosenWidth;
        //     const iMax = 4 + 1;
        //     const xInterval = chosenWidth / iMax;
        //     for(let i = 1; i < iMax; i++){
        //         const x = xStart + xInterval * i;
        //         const y = ff(dr, x);
        //         const height = Math.abs(dv.maxY - y);
                
        //         const heightBound = slopeBound * (chosenWidth - (x - xStart));
        //         // console.log(`i = ${i}  height = ${height}  heightBound = ${heightBound}`);
        //         if (height < heightBound)
        //             return true;
        //     }
        //     return false;
        // }
        
        

        function calculateWidthLastRectUsingArea() {
            //TEMP
            //Using circumscribed area or right rect on left figure
            
            //                  A1 / A        * B
            const areaCirLast = ratioLastTemp * figureArea;
            let xMin = xStart;
            let xMax = xEnd;
            let xBest = xMax;
            for(let i = 0; i < 20; i++) {
                const xMid = (xMin + xMax) / 2;
                const widthMid = xEnd - xMid;
                const xLeftMid = xEnd - widthMid;
                const yMid = ff(dr, xLeftMid);
                const heightMid = Math.abs(dv.maxY - yMid);

                const areaMid = widthMid * heightMid;

                const errorMid = (areaMid - areaCirLast);

                if (errorMid > 0) {
                    xMin = xMid;
                } else {
                    xMax = xMid;
                }
                xBest = xMid;
            }
            const widthLastRectBest = xEnd - xBest;
            return widthLastRectBest;
        }
        



        function rangeFigureChanged(event) {
            renderCanvasFigureTemp2(parseFloat(event.target.value, false));
        }

        function renderCanvasFigureTemp2(scale, updateRangeValue) {
            // console.log("scale =", scale);
            const range = document.getElementById("range-figure");
            if(updateRangeValue && range)
                range.value = scaleBest.toString();
            const labelScale = document.getElementById("label-scale");
            if (labelScale)
                labelScale.textContent = scale.toFixed(4);


            const {widthsReversed} = calculateWidthData(scale);

            const dataWHReversed = [];
            let xRightLast = xEnd;
            for(let i = 0; i < widthsReversed.length; i++) {
                const w = widthsReversed[i];
                
                const y = ff(dr, xRightLast);
                const h = Math.abs(dv.maxY - y);
                
                dataWHReversed.push({w, h});
                xRightLast -= w;
            }

            const dataWHTemp = {
                wh: dataWHReversed.toReversed(),
                widthMax: chosenWidth,
                heightMax: Math.abs(dv.maxY - ff(dr, xStart)),
            };

            renderCanvasPlotTemp("canvas1", dataLSTemp, scale);
            renderCanvasFigureTemp("canvas2", dataWHTemp);//[{w:5, h:30}, {w:15, h: 10}]);
        }




        //createTempPlotsIfNeeded
        function createTempPlotsAndInterfaceIfNeeded() {
            //Temp
            //Temporary div to contain the plots and other settings for test
            //purposes.  It's only intended for test purposes.  If any of this
            //code ends up being kept but commented out it should be improved.  
            let divPlots = document.getElementById("div-plots");
            if (!divPlots) {
                divPlots = document.createElement("div");
                divPlots.id = "div-plots";
                divPlots.style.border = '1px solid green';
                divPlots.style.position = 'absolute';
                divPlots.style.left = '0px';
                divPlots.style.bottom = '0px';
                divPlots.style.maxWidth = '710px';
                divPlots.style.zIndex = '9999'; // very high to float above everything
                divPlots.style.backgroundColor = '#FFF';
                document.body.appendChild(divPlots);

                //Add elements to adjust constraints and plots
                divPlots.innerHTML = 
                    '<div>' +
                    '    <fieldset style="border-width: 1px; border-style: groove; border-color: #000;">' +
                    '        <legend>Select handle constraint method</legend>' +
                    // '        <p style="line-height: 1; margin: 5px;">Prevent curve from passing slope constraint when dragging handles.  Ensure curve is above before enabling, otherwise all the handles can get stuck.</p>' +
                    '        <p style="line-height: 1; margin: 5px;">How should the handles be constrained when they are dragged?  Ensure the curve is above the slope constraint before enabling, otherwise all the handles can get stuck.</p>' +
                    '        <div>' +
                    '            <input id="radio-slope-entire" name="radio-slope" type="radio"/>' +
                    // '            <label for="radio-slope-entire">Check if entire slope passed</label>' +
                    '            <label for="radio-slope-entire">Option 1: Prevent all parts of curve from passing slope constraint</label>' +
                    '        </div>' +
                    '        <div>' +
                    '            <input id="radio-slope-entire-and-move-others" name="radio-slope" type="radio"/>' +
                    '            <label for="radio-slope-entire-and-move-others">Option 2: Prevent all parts of curve from passing slope constraint + Move other nearby handles</label>' +
                    '        </div>' +
                    '        <div>' +
                    '            <input id="radio-slope-handle-y-and-right" name="radio-slope" type="radio"/>' +
                    '            <label for="radio-slope-handle-y-and-right">Option 3: Prevent handle y values from passing slope constraint + Prevent right side of curve from passing slope constraint (checks a single point near the right end only)</label>' +
                    // '            <label for="radio-slope-handle-y-and-right">Handle y values + Check if single point near right side passed slope constraint</label>' +
                    '        </div>' +
                    '        <div>' +
                    '            <input id="radio-slope-handle-y" name="radio-slope" type="radio" checked/>' +
                    '            <label for="radio-slope-handle-y">Option 4: Prevent handle y values from passing slope constraint</label>' +
                    '        </div>' +
                    '        <div>' +
                    '            <input id="radio-slope-none" name="radio-slope" type="radio" checked/>' +
                    '            <label for="radio-slope-none">Disabled</label>' +
                    '        </div>' +
                    '    </fieldset>' +
                    '</div>' +
                    '<br>' +
                    '<div>' +
                    '    <label for="input-slope-constraint-angle">Slope constraint angle in degrees (un-transformed)</label>' +
                    '    <input type="number" id="input-slope-constraint-angle" value="15" min="1" max="40" style="width: 50px;"/>' +
                    '</div>' +
                    '<br>' +
                    '<br>' +
                    '<div>' +
                    '    <label for="range-figure">Scale</label>' +
                    '    <input id="range-figure" type="range" min="0.01" max="1" step="0.001" value="0.01" style="width: 150px; height: 10px !important; background: #FFF0;"/>' +
                    '    <label id="label-scale"></label>' +
                    '</div>';

                //Add the plots.
                createAndAppendCanvasIfNeeded("canvas1", divPlots);
                createAndAppendCanvasIfNeeded("canvas2", divPlots);
            }

            const range = document.getElementById("range-figure");
            if(range) {
                if (range.eventListenerStoredTemp)
                    range.removeEventListener("input", range.eventListenerStoredTemp);
                range.addEventListener("input", rangeFigureChanged);
                range.eventListenerStoredTemp = rangeFigureChanged;

                renderCanvasFigureTemp2(scaleChosen, true);
            }
        }

        function createAndAppendCanvasIfNeeded(id, parent) {
            let canvas = document.getElementById(id);
            if (!canvas) {
                canvas = document.createElement("canvas");
                canvas.width = 350;
                canvas.height = 350;
                canvas.id = id;
                canvas.style.border = '1px solid black';
                parent.appendChild(canvas);
            }
        }

        function renderCanvasPlotTemp(id, dataScaleError, scaleDisplay) {
            const fBorder = 0.15;
            const canvas = document.getElementById(id);
            if (!canvas)
                return;

            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            let errorMin = Infinity;
            let errorMax = -Infinity;
            let scaleMin2 = Infinity;
            let scaleMax2 = -Infinity;

            for(let i = 0; i < dataScaleError.length; i++) {
                const { error, scale } = dataScaleError[i];
                errorMin = Math.min(errorMin, error);
                errorMax = Math.max(errorMax, error);
                scaleMin2 = Math.min(scaleMin2, scale);
                scaleMax2 = Math.max(scaleMax2, scale);
                // if (dataScaleError[i].scale > scaleMax)
                //     break;
            }
            
            const border = {
                x: canvas.width * fBorder,
                // x: canvas.width * fBorder,
                y: canvas.height * fBorder,
                // w: canvas.width * (1 - fBorder),
                w: canvas.width * (1 - fBorder * 2),
                h: canvas.height * (1 - fBorder * 2),
            }

            const labelOffset = canvas.width * 0.03;

            const fontSize = 18;
            ctx.fillStyle = "black";
            ctx.font = `${fontSize}px serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Scale vs Width Error", canvas.width / 2, border.y / 2);

            ctx.fillText("Scale", canvas.width / 2, canvas.height - border.y / 2);
            ctx.fillText(scaleMin2.toFixed(2), border.x + labelOffset, canvas.height - border.y / 2);
            ctx.fillText(scaleMax2.toFixed(2), border.x + border.w - labelOffset, canvas.height - border.y / 2);


            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-90 * Math.PI / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            ctx.fillText("sumWidth - figureWidth", canvas.width / 2, border.y / 2);
            ctx.fillText(errorMin.toFixed(2), border.x - labelOffset, border.y / 2);
            ctx.fillText(errorMax.toFixed(2), border.x + border.w + labelOffset, border.y / 2);
            ctx.restore();
            

            ctx.strokeStyle = "black";
            ctx.strokeRect(border.x, border.y, border.w, border.h);

            const yErrorZero = transformY(0);
            ctx.fillStyle = "black";
            ctx.fillRect(border.x, yErrorZero, border.w, 1);

            if (scaleDisplay != null) {
                const x = transformX(scaleDisplay);
                ctx.fillStyle = "blue";
                ctx.fillRect(x, border.y, 1, border.h);
            }

            ctx.strokeStyle = "green";
            ctx.beginPath();
            for(let i = 0; i < dataScaleError.length; i++) {
                const pointC = dataScaleError[i];
                // if (pointC.scale > scaleMax)
                //     break;

                const xC = transformX(pointC.scale);
                const yC = transformY(pointC.error);

                if (i === 0) {
                    ctx.moveTo(xC, yC);
                } else {
                    ctx.lineTo(xC, yC);
                }
            }
            ctx.stroke();

            function transformX(x) {
                const xScaled = (x - scaleMin2) / (scaleMax2 - scaleMin2);
                return xScaled * border.w + border.x;
                // return (xScaled * (1 - fBorder * 2) + fBorder) * canvas.width;
            }

            function transformY(y) {
                const yScaled = (1 - (y - errorMin) / (errorMax - errorMin));
                return yScaled * border.h + border.y;
                // return (yScaled * (1 - fBorder * 2) + fBorder) * canvas.height;
            }
        }

        function renderCanvasFigureTemp(id, dataTemp) {
            const canvas = document.getElementById(id);
            if (!canvas)
                return;

            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const dataWidthHeight = dataTemp.wh;
            const xMin = 0;
            const xMax = dataTemp.widthMax;
            const yMin = 0;
            const yMax = dataTemp.heightMax;

            

            ctx.fillStyle = "purple";
            let xRightLast = xMax;
            for(let i = dataWidthHeight.length - 1; i >= 0; i--) {
                const {w, h} = dataWidthHeight[i];
                const x2 = transformX(xRightLast - w);
                const y2 = transformY(h);
                const w2 = transformX(xRightLast) - x2;
                const h2 = transformY(0) - y2;

                ctx.fillRect(x2, y2, w2, h2);
                xRightLast -= w;
            }

            function transformX(x) {
                return (x - xMin) / (xMax - xMin) * canvas.width;
            }

            function transformY(y) {
                return (1 - (y - yMin) / (yMax - yMin)) * canvas.height;
            }
        }
    }





    // //function calculateRectWidthsToMatchSumAreaRatios(dr, ratios, widthLast) {
    // function calculateRectWidthsToMatchSumAreaRatiosIns(dr, ratiosIns, widthLastRect, heightLastRect, leftFigureArea) {
    //     //Uses the Newton Raphson method (using approximate slope for the
    //     //derivative) to calculate the widths for the inscribed rectangles.
    //     //-Uses the sum of total rectangle areas rather than exact********
    //     const dv = dr.yVariations;
    //     if (!dv) return;
        
    //     const isMonotonicTemp = dv.changes.length <= 1;
    //     if (!isMonotonicTemp) return;
        
    //     const ff = numModel.curveFun;
    //     const yVariations = dr.yVariations;
    //     const xStart = yVariations.x_start;
    //     const chosenWidth = yVariations.chosenWidth;
    //     const xEnd = xStart + chosenWidth;
    //     const figureArea = dr.figureArea;


    //     //The width to use for the last rectangle.
    //     const widthLastRectUse = calculateWidthLastRectUsingArea();//widthLastRect;


    //     console.time("Width calculation converged in");
    //     //Bounds to constrain the scale.
    //     const scaleMin = 0.01, scaleMax = 100;

    //     //Initial guess for first iteration
    //     let scaleCurrent = 1;
    //     let widthDataCurrent = calculateWidthData(scaleCurrent);

    //     //Offset to approximate derivative
    //     const offset = 0.001;

    //     for(let iteration = 0; iteration < 10; iteration++) {
    //         //For approximate derivative.
    //         const widthDataOffset = calculateWidthData(scaleCurrent - offset);

    //         //Width errors
    //         const errorC = widthDataCurrent.sumWidth - chosenWidth;
    //         const errorO = widthDataOffset.sumWidth - chosenWidth;
    //         // const errorDelta = (errorC - errorO);
    //         //TEMP Don't forget to check if errorDelta is 0****************
    //         //If errorDelta was zero what would that mean?  Slope is 0.
    //         //What would that mean?
    //         const slope = (errorC - errorO) / offset;

    //         //Calculate the scale for the next iteration and clamp if needed
    //         //(eg. became negative because overshot the root).
    //         let scaleNew = scaleCurrent - errorC * slope;
    //         // let scaleNew = scaleCurrent - errorC * offset / errorDelta;
    //         scaleNew = Math.min(Math.max(scaleNew, scaleMin), scaleMax);

    //         //Update the current scale and check if converged.
    //         scaleCurrent = scaleNew;
    //         widthDataCurrent = calculateWidthData(scaleCurrent);

    //         const errorSumWidth = widthDataCurrent.sumWidth / chosenWidth - 1;
    //         if (Math.abs(errorSumWidth) < 0.001) {
    //             console.log(`NR Converged in iterations = ${iteration + 1}  ` +
    //                         `sumWidths = ${widthDataCurrent.sumWidth}  ` +
    //                         `chosenWidth = ${chosenWidth}`);
    //             break;
    //         }
    //     }
    //     console.timeEnd("Width calculation converged in");
    //     //TEMP Should the widths be scaled?**********************
    //     return widthDataCurrent.widthsReversed.toReversed();

        

    //     function calculateWidthData(scale) {
    //         //Calculates widths for each inscribed rectangle using a desired
    //         //sum
    //         const widthsReversed = [];
    //         let sumWidth = 0;

    //         const sumAreaDesired = figureArea * scale;

    //         //The last rectangle
    //         widthsReversed.push(widthLastRectUse);
    //         sumWidth += widthLastRectUse;
    //         let xRight = xEnd - widthLastRectUse;
            
    //         //Start with the second last rectangle
    //         for(let i = sconf.basesN - 2; i >= 0; i--) {
    //             const x = (xRight >= xStart) ? xRight : xStart;
    //             const y = ff(dr, x);
    //             const height = Math.abs(dv.maxY - y);
                
    //             //                  A1 / A       * B
    //             const areaDesired = ratiosIns[i] * sumAreaDesired;
    //             const width = areaDesired / height;
                    
    //             widthsReversed.push(width);
    //             sumWidth += width;
    //             xRight -= width;
    //         }


    //         return {widthsReversed, sumWidth};
    //     }



    //     function calculateWidthLastRectUsingArea() {
    //         //TEMP
    //         //Using circumscribed area or right rect on left figure

    //         //As x increases what happens to area
    //         //Of course area = width * height
    //         //As x increases width decreases (for the last circumscribed rect or similar)
    //         //therefore area decreases
    //         //As x increased height stays the same or decreases (for the last circumscribed rect or similar)
    //         //therefore area stays the same or decreases

    //         const areaData = [];
    //         const iMax = 20;
    //         const xInterval = chosenWidth / iMax;
    //         for(let i = 0; i <= iMax; i++){
    //             const x = xStart + xInterval * i;
    //             const y = ff(dr, x);
    //             const height = Math.abs(dv.maxY - y);
    //             const width = xEnd - x;
    //             const area = width * height;
    //             areaData.push({x, area, width, height});
    //         }
    //         console.log("as x increases  areaData =", areaData);

    //         //                  A1                             / A              * B
    //         const areaCirLast = widthLastRect * heightLastRect / leftFigureArea * figureArea;//sumB;
    //         let xMin = xStart;
    //         let xMax = xEnd;
    //         let xBest = xMax;
    //         for(let i = 0; i < 20; i++) {
    //             const widthMin = xEnd - xMin;
    //             const xLeftMin = xEnd - widthMin;
    //             const yMin = ff(dr, xLeftMin);
    //             const heightMin = Math.abs(dv.maxY - yMin);

    //             const widthMax = xEnd - xMax;
    //             const xLeftMax = xEnd - widthMax;
    //             const yMax = ff(dr, xLeftMax);
    //             const heightMax = Math.abs(dv.maxY - yMax);

    //             const xMid = (xMin + xMax) / 2;
    //             const widthMid = xEnd - xMid;
    //             const xLeftMid = xEnd - widthMid;
    //             const yMid = ff(dr, xLeftMid);
    //             const heightMid = Math.abs(dv.maxY - yMid);

    //             const areaMin = widthMin * heightMin;
    //             const areaMid = widthMid * heightMid;
    //             const areaMax = widthMax * heightMax;

    //             const errorMin = (areaMin - areaCirLast);
    //             const errorMid = (areaMid - areaCirLast);
    //             const errorMax = (areaMax - areaCirLast);
    //             // if (i === 0 || i === 20 - 1)
    //                 console.log(`i = ${i}  errorMin = ${errorMin}  errorMax = ${errorMax}  widthMin = ${widthMin}  widthMax = ${widthMax}  ` +
    //                             `areaMin = ${areaMin}  areaMax = ${areaMax}  areaCirLast = ${areaCirLast}`
    //                 );

    //             if (errorMid > 0) {
    //                 xMin = xMid;
    //             } else {
    //                 xMax = xMid;
    //             }
    //             xBest = xMid;
    //         }
    //         const widthLastRectBest = xEnd - xBest;
    //         return widthLastRectBest;
    //     }
    // }













    //TEMP 2025.08.05
    //Calculate areas of inscribed rectangles using sum areas
    // function calculateRectWidthsToMatchSumAreaRatiosIns(dr, ratiosIns, widthLastRect, heightLastRect, leftFigureArea) {
    //     const dv = dr.yVariations;
    //     if (!dv) return;
        
    //     const isMonotonicTemp = dv.changes.length <= 1;
    //     if (!isMonotonicTemp) return;
        
    //     const ff = numModel.curveFun;
    //     const yVariations = dr.yVariations;
    //     const xStart = yVariations.x_start;
    //     const chosenWidth = yVariations.chosenWidth;
    //     const xEnd = xStart + chosenWidth;
    //     const figureArea = dr.figureArea;



    //     const widthLastRectBest = widthLastRect;//calculateWidthLastRectUsingArea();
    //     // console.log("widthLastRectBest =", widthLastRectBest);
    //     // const widthsData = calculateWidthsData(scale);
    //     // const error = widthsData.sumWidth - chosenWidth;
    //     // const errorAbs = Math.abs(error)

    //     // console.log("heightLastRect =", heightLastRect);

    //     // console.log("widthsData =", widthsData);
    //     // // console.log("width.reduce =", widths.reduce((acc, cur) => acc + cur));

    //     // const widths = widthsData.widthsReversed.toReversed();
    //     // console.log("widths =", widths);
    //     // const scaleWidths = (chosenWidth - widths.at(-1)) / (widthsData.sumWidth - widths.at(-1));
        
    //     // console.log("scaleWidths =", scaleWidths);
    //     // const widthsScaled = widths.map((width, i, arr) => width * (i < arr.length - 1 ? scaleWidths : 1));








    //     //TEMP Newton Raphson 2
    //     console.time("Width calculation converged in");
    //     let scaleCurrent = 1;
    //     let widthDataCurrent = calculateWidthData(scaleCurrent);
    //     const offset = 0.01;
    //     for(let iteration = 0; iteration < 10; iteration++) {
    //         const widthDataOffset = calculateWidthData(scaleCurrent - offset);

    //         const errorC = widthDataCurrent.sumWidth - chosenWidth;
    //         const errorO = widthDataOffset.sumWidth - chosenWidth;

    //         const errorDelta = (errorC - errorO);
    //         const scaleNew = scaleCurrent - errorC * offset / errorDelta;
            
    //         scaleLast = scaleCurrent;
    //         widthDataLast = widthDataCurrent;

    //         scaleCurrent = scaleNew;
    //         widthDataCurrent = calculateWidthData(scaleCurrent);
    //         const errorWidthFactor = widthDataCurrent.sumWidth / chosenWidth - 1;
    //         // console.log(`Newton Raphson itersion i = ${i}  scaleNew = ${scaleNew}  errorWidthFactor = ${errorWidthFactor}`);
    //         // console.log(`errorC = ${errorC}  errorL = ${errorL}  slope = ${slope}  scaleCurrent = ${scaleCurrent}  scaleLast = ${scaleLast}`);
    //         //
    //         if (Math.abs(errorWidthFactor) < 0.001) {
    //             // console.log(`NR Converged in iterations = ${iteration + 1}`);
    //             break;
    //         }
    //     }
    //     console.timeEnd("Width calculation converged in");
    //     return widthDataCurrent.widthsReversed.toReversed();


    //     // //TEMP Newton Raphson
    //     // console.time("NR");
    //     // let scaleCurrent = 1;
    //     // let widthsDataCurrent = calculateWidthsData(scaleCurrent);
    //     // let scaleLast = scaleCurrent - 0.01;
    //     // let widthsDataLast = calculateWidthsData(scaleLast);

    //     // for(let i = 0; i < 10; i++) {
    //     //     const errorC = widthsDataCurrent.sumWidth - chosenWidth;
    //     //     const errorL = widthsDataLast.sumWidth - chosenWidth;
    //     //     const slope = (errorC - errorL) / (scaleCurrent - scaleLast);
    //     //     const scaleNew = scaleCurrent - errorC / slope;
    //     //     scaleLast = scaleCurrent;
    //     //     widthsDataLast = widthsDataCurrent;

    //     //     scaleCurrent = scaleNew;
    //     //     widthsDataCurrent = calculateWidthsData(scaleCurrent);
    //     //     const errorWidthFactor = widthsDataCurrent.sumWidth / chosenWidth - 1;
    //     //     // console.log(`Newton Raphson itersion i = ${i}  scaleNew = ${scaleNew}  errorWidthFactor = ${errorWidthFactor}`);
    //     //     // console.log(`errorC = ${errorC}  errorL = ${errorL}  slope = ${slope}  scaleCurrent = ${scaleCurrent}  scaleLast = ${scaleLast}`);
    //     //     if (Math.abs(errorWidthFactor) < 0.001)
    //     //         break;
    //     // }
    //     // const widthsNR = widthsDataCurrent.widthsReversed.toReversed();
    //     // console.timeEnd("NR");


    //     // return widthsNR;
        

    //     function calculateWidthData(scale) {
    //         const widthsReversed = [];
    //         let sumWidth = 0;

    //         const sumB = figureArea * scale;


    //         //The last rectangle
    //         //Using same width as the left figure
    //         widthsReversed.push(widthLastRectBest);
    //         sumWidth += widthLastRectBest;
    //         let xRight = xEnd - widthLastRectBest;
            

    //         for(let i = sconf.basesN - 2; i >= 0; i--) {
    //             const x = (xRight >= xStart) ? xRight : xStart;
    //             const y = ff(dr, x);
    //             const height = Math.abs(dv.maxY - y);
                
    //             //                  A1 / A       * B
    //             const areaDesired = ratiosIns[i] * sumB;
    //             const width = areaDesired / height;
                    
                
    //             widthsReversed.push(width);
    //             sumWidth += width;
    //             xRight -= width;
    //         }


    //         return { widthsReversed, sumWidth };
    //     }


    //     function calculateErrorTemp(widths, scale) {
    //         const errors = [];
    //         let errorAbsSum = 0;

    //         const sumB = figureArea * scale;
    //         let sumWidths = 0;
    //         let sumAreaDesired = 0;
    //         for(let i = 0; i < widths.length; i++) {
    //             const width = widths[i];
    //             const x = xStart + sumWidths + width;
    //             const y = ff(dr, x);
    //             const height = Math.abs(dv.maxY - y);
    //             const area = width * height;
                
    //             //                  A1 / A       * B
    //             const areaDesired = ratiosIns[i] * sumB;

    //             const errorAbs = Math.abs(area - areaDesired);
    //             errors.push(errorAbs);
    //             errorAbsSum += errorAbs;
    //             sumAreaDesired += areaDesired;
    //             sumWidths += width;
    //         }

    //         return {
    //             errors,
    //             errorAbsSum,
    //             sumAreaDesired,
    //             errorAbsSumDivSumAreaDesired : errorAbsSum / sumAreaDesired,
    //         };
    //     }

    //     function calculateWidthLastRectUsingArea() {
    //         //Using circumscribed area or right rect on left figure

    //         //As x increases what happens to area
    //         //Of course area = width * height
    //         //As x increases width decreases (for the last circumscribed rect or similar)
    //         //therefore area decreases
    //         //As x increased height stays the same or decreases (for the last circumscribed rect or similar)
    //         //therefore area stays the same or decreases

    //         const areaData = [];
    //         const iMax = 20;
    //         const xInterval = chosenWidth / iMax;
    //         for(let i = 0; i <= iMax; i++){
    //             const x = xStart + xInterval * i;
    //             const y = ff(dr, x);
    //             const height = Math.abs(dv.maxY - y);
    //             const width = xEnd - x;
    //             const area = width * height;
    //             areaData.push({x, area, width, height});
    //         }
    //         console.log("as x increases  areaData =", areaData);

    //         //                  A1                             / A              * B
    //         const areaCirLast = widthLastRect * heightLastRect / leftFigureArea * figureArea;//sumB;
    //         let xMin = xStart;
    //         let xMax = xEnd;
    //         let xBest = xMax;
    //         for(let i = 0; i < 20; i++) {
    //             const widthMin = xEnd - xMin;
    //             const xLeftMin = xEnd - widthMin;
    //             const yMin = ff(dr, xLeftMin);
    //             const heightMin = Math.abs(dv.maxY - yMin);

    //             const widthMax = xEnd - xMax;
    //             const xLeftMax = xEnd - widthMax;
    //             const yMax = ff(dr, xLeftMax);
    //             const heightMax = Math.abs(dv.maxY - yMax);

    //             const xMid = (xMin + xMax) / 2;
    //             const widthMid = xEnd - xMid;
    //             const xLeftMid = xEnd - widthMid;
    //             const yMid = ff(dr, xLeftMid);
    //             const heightMid = Math.abs(dv.maxY - yMid);

    //             const areaMin = widthMin * heightMin;
    //             const areaMid = widthMid * heightMid;
    //             const areaMax = widthMax * heightMax;

    //             // const errorMin = Math.abs(areaMin - areaCirLast);
    //             // // const errorMid = Math.abs(widthMid * heightMid - areaCirLast);
    //             // const errorMax = Math.abs(areaMax - areaCirLast);
    //             const errorMin = (areaMin - areaCirLast);
    //             const errorMid = (areaMid - areaCirLast);
    //             const errorMax = (areaMax - areaCirLast);
    //             // if (i === 0 || i === 20 - 1)
    //                 console.log(`i = ${i}  errorMin = ${errorMin}  errorMax = ${errorMax}  widthMin = ${widthMin}  widthMax = ${widthMax}  ` +
    //                             `areaMin = ${areaMin}  areaMax = ${areaMax}  areaCirLast = ${areaCirLast}`
    //                 );

    //             // const errorMin = Math.abs(heightMin - heightLastRect);
    //             // const errorMid = Math.abs(heightMid - heightLastRect);
    //             // const errorMax = Math.abs(heightMax - heightLastRect);
    //             if (errorMid > 0) {//errorMin > errorMax) {
    //                 xMin = xMid;
    //             } else {
    //                 xMax = xMid;
    //             }
    //             xBest = xMid;
    //         }
    //         const widthLastRectBest = xEnd - xBest;
    //         return widthLastRectBest;
    //     }
    // }















    //TEMP 2025.08.01
    //Calculates areas of inscribed rectangles to match using exact areas
    function calculateRectWidthsToMatchExactAreaRatiosIns(dr, ratiosIns, useSecondAreaIns) {
        //Calculate rectangle widths for the input datareg, so that the ratio
        //of each of their areas (rectangle area divide by sum of rectangle
        //areas) match the input ratios.

        //This algorithm starts on the left 

        // console.log("calculateRectWidthsToMatchRatiosIns");

        const dv = dr.yVariations;
        if (!dv) return;
        
        const isMonotonicTemp = dv.changes.length <= 1;
        if (!isMonotonicTemp) return;
        
        const ff = numModel.curveFun;
        const yVariations = dr.yVariations;
        const xStart = yVariations.x_start;
        const chosenWidth = yVariations.chosenWidth;
        const xEnd = xStart + chosenWidth;
        const figureArea = dr.figureArea;


        let widthsData = calculateWidthsData();
        if (!widthsData) {//TEMP
            console.error("Not enough area remains on right figure to fit inscribed rectangles.");
            const output = [];
            for(let i = 0; i < ratiosIns.length; i++)
                output.push(null);
            return output;
        }

        //Output new widths
        return [...widthsData.widths];





        function calculateWidthsData() {
            const output = {
                widths: [],
                sumWidth: 0,
            };

            let xRightLast = xStart;
            for(let i = 0; i < sconf.basesN; i++) {
                if (i === sconf.basesN-1) {
                    //Last rectangle with a height of zero, so fill the remaining width.
                    const width = xEnd - xRightLast;
                    output.widths.push(width);
                    output.sumWidth += width;
                    // console.log(`calculateWidthsData last  width = ${width}  area = ${0}`);
                    break;
                }
                //TEMP
                
                //                  A1 / A       * B
                const areaDesired = ratiosIns[i] * figureArea;



                //Calculate current width using areaDesired / height
                let areaCurrent = 0;
                let width = 0;
                let height = 0;
                const i2Max = 30;
                for(let i2 = 0; i2 <= i2Max; i2++) {
                    const xRight = xRightLast + width;
                    const y = ff(dr, xRight);
                    height = Math.abs(dv.maxY - y);
                    if (i2 < i2Max) {
                        //Next width iteration
                        width = areaDesired / height;
                    } else {
                        //Calculate the actual area of the rectangle
                        areaCurrent = width * height;
                    }
                }
                const errorAreaCurrent = areaCurrent / areaDesired - 1;




                // //TEMP Determine max area this rectangle could be
                // let xBoundL = xRightLast;
                // let xBoundR = xEnd;
                // const dataMax = { area: 0, x: null, interval: null};
                // for(let i3 = 0; i3 < 5; i3++) {
                //     const countInterval = 8;
                //     const xInterval = (xBoundR - xBoundL) / (countInterval - 1);
                //     for(let i2 = 0; i2 < countInterval; i2++) {
                //         const xRight2 = xBoundL + xInterval * i2;
                //         const y = ff(dr, xRight2);
                //         const height2 = Math.abs(dv.maxY - y);
                //         const width2 = xRight2 - xRightLast;
                //         const areaCurrent2 = width2 * height2;
                //         if (dataMax.x === null || areaCurrent2 > dataMax.area) {
                //             dataMax.area = areaCurrent2;
                //             dataMax.x = xRight2;
                //             dataMax.interval = i2;
                //         }
                //     }
                //     xBoundR = xBoundL + xInterval * dataMax.interval;
                //     xBoundL = xBoundL + xInterval * dataMax.interval;
                // }

                // // console.log(`Compare area max error   areaCurrent2Max = ${areaCurrent2Max}  ` +
                // //             `dataMax.area = ${dataMax.area}  error = ${areaCurrent2Max / dataMax.area - 1}`);
                // // const xDistanceFactor = (dataMax.x - xStart) / (xEnd - xStart);
                // const xDistanceFactor = (dataMax.x - xRightLast) / (xEnd - xRightLast);
                // console.log(`Max area = ${dataMax.area}  dataMax.x = ${dataMax.x}  xDistanceFactor = ${xDistanceFactor}`);

                // areaCurrent2Max = dataMax.area;




                // console.log(`i = ${i} areaCurrent / areaDesired = ", areaCurrent / areaDesired);

                // const y = ff(dr, xRightLast);
                // const height = Math.abs(dv.maxY - y);
                // const width = areaDesired / height;
                const xRight = xRightLast + width;


                // console.log(`calculateWidthsData i = ${i}  xRight = ${xRight}  areaCurrent2Max = ${areaCurrent2Max}  errorAreaCurrent = ${errorAreaCurrent}  areaDesired = ${areaDesired}  width = ${width}  height = ${height}  areaCurrent = ${areaCurrent}  areaCurrent - areaDesired = ${areaCurrent - areaDesired}`);


                //TEMP Check if enough area remains, add some margin for math error.
                if (areaCurrent * 1.001 < areaDesired) {
                // if (areaCurrent2Max < areaDesired) {
                    // console.error("Not enough area left");
                    return null;
                }

                if (xRight > xEnd) {
                    //TEMP
                    // output.widths.push(xEnd - xRightLast);
                    // // output.widths.push(width);
                    // console.log(`NULL*** TEMP  i = ${i}  iMax = ${sconf.basesN - 1}  ` +
                    //     `(sumWidth + width) / chosenWidth = ${(output.sumWidth + width) / chosenWidth}`);
                    // console.log("output.widths.length =", output.widths.length);
                    // console.log(`output =`, output);
                    return null;
                }

                // console.log(`width =`, width);
                output.widths.push(width);
                output.sumWidth += width;
                xRightLast = xRight;
            }

            // console.log(`calculateWidthsData output =`, output);
            // console.log("useSecondAreaIns =", useSecondAreaIns);
            return output;
        }
    }








    //TEMP 2025.07.30
    //The following algorithm has been adjusted (along with the code that)
    //calls it, so that the ratios end up the way they need to.  Note that this
    //draft algorithm variation is slow because it eg. uses linear search.
    // function calculateRectWidthsToMatchRatiosIns(dr, ratiosIns, drLeft) {
    //     //Calculate rectangle widths for the input datareg, so that the ratio
    //     //of each of their areas (rectangle area divide by sum of rectangle
    //     //areas) match the input ratios.

    //     //This algorithm starts on the left 

    //     console.log("calculateRectWidthsToMatchRatiosIns");

    //     const dv = dr.yVariations;
    //     if (!dv) return;
        
    //     const isMonotonicTemp = dv.changes.length <= 1;
    //     if (!isMonotonicTemp) return;
        
    //     const ff = numModel.curveFun;
    //     const yVariations = dr.yVariations;
    //     const xStart = yVariations.x_start;
    //     const chosenWidth = yVariations.chosenWidth;
    //     const xEnd = xStart + chosenWidth;
    //     const figureArea = dr.figureArea;


    //     //***Minimum ratio***
    //     //The area calculated by circumscribed rectangles will always be larger
    //     //than the area of the figure.  Therefore with a ratio of 1 they will
    //     //always either have extra area left or be exact.  Therefore the ratio
    //     //must always be >= 1.  However given that error can be present when
    //     //calculating the widths, the ratio could end up slightly less than 1.
    //     //Therefore set it to be a bit smaller to prevent issues.

    //     //TEMP Note sometimes 0.99 seems to cause the width to be way too large.
    //     //Perhaps it has something to do with the fact that the input ratios use
    //     //a different figure?
    //     let ratioMin = 0.01;//0.9999;//0.99;

    //     let widthsData = calculateWidthsData(ratioMin);
    //     if (!widthsData) {//TEMP
    //         console.error("widthsData dne");
    //         return;
    //     }
    //     //***Maximum ratio***
    //     //See function for more details
    //     let ratioMax = calculateRatioMax(ratioMin, widthsData.sumWidth)


    //     //Calculate the actual ratio numerically using binary search.
    //     for(let iteration = 0; false && iteration < 20; iteration++) {
    //         const ratioNew = (ratioMin + ratioMax) * 0.5;
    //         const widthDataNew = calculateWidthsData(ratioNew);

    //         if (!widthDataNew) {
    //             //Not enough area remaining so update the maximum ratio.
    //             ratioMax = ratioNew;
    //             continue;
    //         }

    //         //Extra area remaining so update the minimum ratio.
    //         ratioMin = ratioNew;
    //         widthsData = widthDataNew;

    //         //Check if amount of error is acceptable.
    //         const widthError = Math.abs(widthsData.sumWidth / chosenWidth - 1);
    //         if (widthError <= 0.0001)
    //             break;

    //         //Adjust if 
    //         const ratioMax2 = calculateRatioMax(ratioMin, widthsData.sumWidth);
    //         ratioMax = Math.min(ratioMax, ratioMax2);
    //     }

    //     //TEMP
    //     // //Could always scale the following by chosenWidth / widthsData.sumWidth
    //     // //however if the width error is small it doesn't make much difference.
    //     console.log("ratioMin =", ratioMin);
    //     return [...widthsData.widths];
    //     const ratioWidth = chosenWidth / widthsData.sumWidth;
    //     return widthsData.widths.map(width => width * ratioWidth);



    //     //********************Helper functions********************
    //     function calculateRatioMax(ratioMin, sumWidth) {
    //         //When calculating the widths of the rectangles using ratioMin, the sum
    //         //of widths will be less than the total figure width.  If the width of
    //         //each rectangle is increased by a factor (total figure width divided
    //         //by the sum of widths) then they will fill the remaining width.  Their
    //         //heights will either stay the same or decrease.  This means that
    //         //at most the area, and thus ratio, could increase by is that factor.
    //         return ratioMin * chosenWidth / sumWidth;
    //     }


    //     function calculateWidthsData(ratio) {
    //         const output = {
    //             widths: [],
    //             sumWidth: 0,
    //         };

    //         let xRightLast = xStart;
    //         for(let i = 0; i < sconf.basesN; i++) {
    //             if (i === sconf.basesN-1) {
    //                 const width = xEnd - xRightLast;
    //                 output.widths.push(width);
    //                 output.sumWidth += width;
    //                 console.log(`calculateWidthsData last  width = ${width}  area = ${0}`);
    //                 break;
    //             }
    //             //TEMP
    //             //const ratiosCir = areasCir.map(area => area / dr.figureArea);
    //             //A1 / A
                
    //             //                  A1 / A       * B
    //             const areaDesired = ratiosIns[i] * figureArea * 1.0;//ratio;

    //             //Note because circumscribed rectangles are used the height will
    //             //always be the same no matter the width, unlike with inscribed
    //             //rectangles where the height changes with width.

    //             let areaCurrent = 0;
    //             let width = 0;
    //             let height = 0;
    //             for(; (xRightLast + width) < xEnd && areaCurrent < areaDesired; width += 0.0001) {
    //             // console.log("(xRightLast + width) < xEnd =", (xRightLast + width) < xEnd);
    //             // console.log("areaCurrent < areaDesired =", areaCurrent < areaDesired);
    //                 const xLeft = xRightLast + width;
    //                 const y = ff(dr, xLeft);
    //                 height = Math.abs(dv.maxY - y);
    //                 areaCurrent = width * height;
    //             }
    //             // console.log(`i = ${i} areaCurrent / areaDesired = ", areaCurrent / areaDesired);

    //             // const y = ff(dr, xRightLast);
    //             // const height = Math.abs(dv.maxY - y);
    //             // const width = areaDesired / height;
    //             const xRight = xRightLast + width;


    //             console.log(`calculateWidthsData i = ${i}  areaDesired = ${areaDesired}  width = ${width}  area = ${width * height}`);

    //             if (xRight > xEnd) {
    //                 output.widths.push(xEnd - xRightLast);
    //                 // output.widths.push(width);
    //                 console.log(`NULL*** TEMP ratio = ${ratio}  i = ${i}  iMax = ${sconf.basesN - 1}  ` +
    //                     `(sumWidth + width) / chosenWidth = ${(output.sumWidth + width) / chosenWidth}`);
    //                 console.log("output.widths.length =", output.widths.length);
    //                 console.log(`output =`, output);
    //                 return null;
    //             }

    //             console.log(`width =`, width);
    //             output.widths.push(width);
    //             output.sumWidth += width;
    //             xRightLast = xRight;
    //         }

    //         console.log(`calculateWidthsData output =`, output);
    //         return output;
    //     }
    // }







    // function calculateRectWidthsToMatchRatiosCir(dr, ratiosCir, drLeft) {
    //     //Calculate rectangle widths for the input datareg, so that the ratio
    //     //of each of their areas (rectangle area divide by sum of rectangle
    //     //areas) match the input ratios.

    //     //This algorithm starts on the left 



    //     const dv = dr.yVariations;
    //     if (!dv) return;
        
    //     const isMonotonicTemp = dv.changes.length <= 1;
    //     if (!isMonotonicTemp) return;
        
    //     const ff = numModel.curveFun;
    //     const yVariations = dr.yVariations;
    //     const xStart = yVariations.x_start;
    //     const chosenWidth = yVariations.chosenWidth;
    //     const xEnd = xStart + chosenWidth;
    //     const figureArea = dr.figureArea;


    //     //***Minimum ratio***
    //     //The area calculated by circumscribed rectangles will always be larger
    //     //than the area of the figure.  Therefore with a ratio of 1 they will
    //     //always either have extra area left or be exact.  Therefore the ratio
    //     //must always be >= 1.  However given that error can be present when
    //     //calculating the widths, the ratio could end up slightly less than 1.
    //     //Therefore set it to be a bit smaller to prevent issues.

    //     //TEMP Note sometimes 0.99 seems to cause the width to be way too large.
    //     //Perhaps it has something to do with the fact that the input ratios use
    //     //a different figure?
    //     let ratioMin = 0.01;//0.9999;//0.99;

    //     let widthsData = calculateWidthsData(ratioMin);
    //     if (!widthsData) {//TEMP
    //         console.error("widthsData dne");
    //         return;
    //     }
    //     //***Maximum ratio***
    //     //See function for more details
    //     let ratioMax = calculateRatioMax(ratioMin, widthsData.sumWidth)


    //     //Calculate the actual ratio numerically using binary search.
    //     for(let iteration = 0; false && iteration < 20; iteration++) {
    //         const ratioNew = (ratioMin + ratioMax) * 0.5;
    //         const widthDataNew = calculateWidthsData(ratioNew);

    //         if (!widthDataNew) {
    //             //Not enough area remaining so update the maximum ratio.
    //             ratioMax = ratioNew;
    //             continue;
    //         }

    //         //Extra area remaining so update the minimum ratio.
    //         ratioMin = ratioNew;
    //         widthsData = widthDataNew;

    //         //Check if amount of error is acceptable.
    //         const widthError = Math.abs(widthsData.sumWidth / chosenWidth - 1);
    //         if (widthError <= 0.0001)
    //             break;

    //         //Adjust if 
    //         const ratioMax2 = calculateRatioMax(ratioMin, widthsData.sumWidth);
    //         ratioMax = Math.min(ratioMax, ratioMax2);
    //     }

    //     //TEMP
    //     // //Could always scale the following by chosenWidth / widthsData.sumWidth
    //     // //however if the width error is small it doesn't make much difference.
    //     console.log("ratioMin =", ratioMin);
    //     return widthsData.widths;
    //     const ratioWidth = chosenWidth / widthsData.sumWidth;
    //     return widthsData.widths.map(width => width * ratioWidth);



    //     //********************Helper functions********************
    //     function calculateRatioMax(ratioMin, sumWidth) {
    //         //When calculating the widths of the rectangles using ratioMin, the sum
    //         //of widths will be less than the total figure width.  If the width of
    //         //each rectangle is increased by a factor (total figure width divided
    //         //by the sum of widths) then they will fill the remaining width.  Their
    //         //heights will either stay the same or decrease.  This means that
    //         //at most the area, and thus ratio, could increase by is that factor.
    //         return ratioMin * chosenWidth / sumWidth;
    //     }


    //     function calculateWidthsData(ratio) {
    //         const output = {
    //             widths: [],
    //             sumWidth: 0,
    //         };

    //         let xRightLast = xStart;
    //         for(let i = 0; i < sconf.basesN; i++) {
    //             //TEMP
    //             //const ratiosCir = areasCir.map(area => area / dr.figureArea);
    //             //A1 / A
                
    //             //                  A1 / A       * B
    //             const areaDesired = ratiosCir[i] * figureArea * 1.0;//ratio;

    //             //Note because circumscribed rectangles are used the height will
    //             //always be the same no matter the width, unlike with inscribed
    //             //rectangles where the height changes with width.
    //             const y = ff(dr, xRightLast);
    //             const height = Math.abs(dv.maxY - y);
    //             const width = areaDesired / height;
    //             const xRight = xRightLast + width;
    //             console.log(`calculateWidthsData i = ${i}  areaDesired = ${areaDesired}  area = ${width * height}`);

    //             if (xRight > xEnd) {
    //                 output.widths.push(width);
    //                 console.log(`TEMP ratio = ${ratio}  i = ${i}  iMax = ${sconf.basesN - 1}  ` +
    //                     `(sumWidth + width) / chosenWidth = ${(output.sumWidth + width) / chosenWidth}`);
    //                 return null;
    //             }

    //             output.widths.push(width);
    //             output.sumWidth += width;
    //             xRightLast = xRight;
    //         }

    //         return output;
    //     }
    // }




















    //TEMP 2025.07.30
    //Draft that works overall, and has some code to check error as the solution converges.
    // function calculateRectWidthsToMatchRatiosCir(dr, ratiosCir, drLeft) {
    //     //Calculate rectangle widths for the input datareg, so that the ratio
    //     //of each of their areas (rectangle area divide by sum of rectangle
    //     //areas) match the input ratios.

    //     //This algorithm starts on the left 



    //     const dv = dr.yVariations;
    //     if (!dv) return;
        
    //     const ff = numModel.curveFun;
    //     const yVariations = dr.yVariations;
    //     const xStart = yVariations.x_start;
    //     const chosenWidth = yVariations.chosenWidth;
    //     const xEnd = xStart + chosenWidth;
    //     const figureArea = dr.figureArea;



    //     const heightValuesCachedTemp = [];

    //     const iMax = 100000;
    //     for(let i = 0; i <= iMax; i++) {
    //         const x = xStart + (i / iMax) * chosenWidth;
    //         const y = ff(dr, x);
    //         const height = Math.abs(dv.maxY - y);
    //         heightValuesCachedTemp.push(height);
    //     }

    //     //height = heightValuesCachedTemp[Math.round((x - xStart) / chosenWidth)];



    //     console.log("********************");
    //     console.time("calculateRectWidthsToMatchRatiosCir");
    //     //***Minimum ratio***
    //     //The area calculated by circumscribed rectangles will always be larger
    //     //than the area of the figure.  Therefore with a ratio of 1 they will
    //     //always either have extra area left or be exact.  Therefore the ratio
    //     //must always be >= 1.  However given that error can be present when
    //     //calculating the widths, the ratio could end up slightly less than 1.
    //     //Therefore set it to be a bit smaller to prevent issues.
    //     let ratioMin = 0.9999;//1;//0.9999999;

    //     //***Maximum ratio***
    //     //When calculating the widths of the rectangles using ratioMin, the sum
    //     //of widths will be less than the total figure width.  If the width of
    //     //each rectangle is increased by a factor (total figure width divided
    //     //by the sum of widths) then they will fill the remaining width.  Their
    //     //heights will either stay the same or decrease.  This means that
    //     //at most the area, and thus ratio, could increase is by that factor.
    //     let calculateWidthsL = calculateWidths(ratioMin);
    //     let ratioMax = ratioMin * chosenWidth / calculateWidthsL.sumWidth;
    //     // console.log("chosenWidth / calculateWidthsL.sumWidth =", chosenWidth / calculateWidthsL.sumWidth);
    //     console.log("ratioMax =", ratioMax);
    //     // console.log("errorAvg Start =",computeErrorAvgTemp(calculateWidthsL.widths));
    //     console.log("errorAvg Start Expanded =",computeErrorAvgTemp(calculateWidthsL.widths, chosenWidth / calculateWidthsL.sumWidth));
        
    //     // {
    //     //     const widthError0 = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //     //     console.log("widthError0 =", widthError0);
    //     // }

    //     const widthError0 = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //     // if (widthError0 < 0.001) {
    //     //     console.log("widthError0 =", widthError0);
    //     //     console.timeEnd("calculateRectWidthsToMatchRatiosCir");
    //     //     return calculateWidthsL.widths;
    //     // }


    //     console.log("***");

    //     //Calculate the actual ratio numerically using binary search.
    //     let iteration = 0;
    //     for(; iteration < 20; iteration++) {
    //         // calculateRatioMaxNRTemp();
    //         //ratioMax = calculateRatioMaxNRTemp();
    //         //calculateRatioMaxNRTemp();
    //         const ratioNew067 = ratioMin * 0.67 + ratioMax * 0.33;
    //         // const ratioNew075 = ratioMin * 0.75 + ratioMax * 0.25;
    //         // const ratioNew050 = ratioMin * 0.50 + ratioMax * 0.50;
    //         // const ratioNew = (iteration <= 2) ? 
    //         //     (ratioMax * 0.25 + ratioMin * 0.75) :
    //         //     (ratioMax + ratioMin) * 0.5;
    //         const ratioNew = ratioNew067;//(iteration < 2) ? ratioNew067 : ratioNew050;
    //         // const ratioNew = ratioNew050;
    //         // const ratioNew = (ratioMax + ratioMin) * 0.5;
    //         const widthDataNew = calculateWidths(ratioNew);

    //         // console.log(`iteration = ${iteration}  ratioMin = ${ratioMin}  ratioNew050 = ${ratioNew050}  ratioNew067 = ${ratioNew067}  ratioMax = ${ratioMax}`);
    //         if (!widthDataNew) {
    //             //Not enough area left so update the maximum ratio.
    //             ratioMax = ratioNew;
    //             continue;
    //         }

    //         //Extra area so update the minimum ratio
    //         ratioMin = ratioNew;
    //         calculateWidthsL = widthDataNew;

    //         // console.log("errorAvg =",computeErrorAvgTemp(calculateWidthsL.widths));
    //         console.log("errorAvg Expanded =",computeErrorAvgTemp(calculateWidthsL.widths, chosenWidth / calculateWidthsL.sumWidth));

    //         const widthError = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //         // console.log("widthError =", widthError);
    //         const maxRatio = ratioMin * chosenWidth / calculateWidthsL.sumWidth;
    //         // console.log("maxRatio =", maxRatio);
    //         if (widthError <= 0.001)//0.001)
    //             break;

    //         ratioMax = Math.min(maxRatio, ratioMax);
    //     }
    //     console.timeEnd("calculateRectWidthsToMatchRatiosCir");
    //     console.log("ratioMin =", ratioMin);
    //     console.log("iteration =", iteration);
    //     // drAdustWidthsTemp.partitionWidths = [...calculateWidthsL.widths];

    //     const ratioAdjust = chosenWidth / calculateWidthsL.sumWidth;
    //     console.log("ratioAdjust (adjust widths by this) =", ratioAdjust);
    //     return calculateWidthsL.widths.map(width => width * ratioAdjust);
    //     // return calculateWidthsL.widths;
    //     // const breakPoint = "";


    //     function calculateRatioMaxNRTemp() {
    //         const offset = 0.0001;
    //         const calculateWidthsOffset = calculateWidths(ratioMin + offset);
    //         const fRatioL = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //         const fRatioLOffset = Math.abs((calculateWidthsOffset.sumWidth - chosenWidth) / chosenWidth);
    //         // const slope = ((calculateWidthsLOffset.sumWidth - calculateWidthsL.sumWidth) / offset)
    //         const slope = ((fRatioLOffset - fRatioL) / offset)
    //         const ratioL2 = ratioMin - fRatioL / slope;
    //         // const ratioL2 = ratioL - calculateWidthsL.sumWidth / slope;
    //         console.log("ratioMaxNR =", ratioL2);
    //         return ratioL2;
    //     }


    //     function calculateWidths(ratio, calledByCalculateWidths) {
    //         console.log("calculateWidths  ratio =", ratio);
    //         console.time("calculateWidths");
    //         const output = {
    //             widths: [],
    //             sumWidth: 0,
    //         };

    //         let errorOnLastWidthTemp = false;
    //         let xRightLast = xStart;
    //         for(let i = 0; i < sconf.basesN; i++) {
    //             const areaDesired = ratiosCir[i] * figureArea * ratio;

    //             //Note because circumscribed rectangles are used the height will
    //             //always be the same no matter the width, unlike with inscribed
    //             //rectangles where the height changes with width.
    //             // const y = ff(dr, xRightLast);
    //             // const height = Math.abs(dv.maxY - y);
    //             const height = computeCachedHeightTemp(xRightLast);
    //             const width = areaDesired / height;
    //             const xRight = xRightLast + width;

    //             if (xRight > xEnd) {
    //                 console.timeEnd("calculateWidths");
    //                 if (output.widths.length > 0) {
    //                     const avgWidth = output.widths.reduce((acc, cur) => acc + cur) / output.widths.length;
    //                     const sumWidthAndAvg = output.sumWidth + (sconf.basesN - i) * avgWidth;
    //                     const ratio2 = ratio / (sumWidthAndAvg / chosenWidth);
    //                     if (!calledByCalculateWidths) {
    //                         const calculateWidthsTemp = calculateWidths(ratio2, true);
    //                         const widthError = !calculateWidthsTemp ? "error" : Math.abs((calculateWidthsTemp.sumWidth - chosenWidth) / chosenWidth);
    //                         console.log(`return null i = ${i}  ratio = ${ratio}  iMax = ${sconf.basesN-1}  ` +
    //                             `(sumWidth + width) / chosenWidth = ${(output.sumWidth + width) / chosenWidth}  ` +
    //                             `sumWidthAndAvg = ${sumWidthAndAvg}  sumWidthAndAvg / chosenWidth = ${sumWidthAndAvg / chosenWidth}  ` +
    //                             `ratio / (sumWidthAndAvg / chosenWidth) = ${ratio2}  widthError2 = ${widthError}`);
    //                     }
    //                 }
    //                 return null;
    //                 if (i === sconf.basesN - 1) {
    //                     errorOnLastWidthTemp = true;
    //                     // console.log(`*errorOnLastWidthTemp  xRight = ${xRight}  xEnd = ${xEnd}  width = ${width}`);
    //                 } else {
    //                     // console.log(`calculateWidths reutn null i = ${i}`);
    //                     return null;
    //                 }
    //                 // return null;
    //             }

    //             output.widths.push(width);
    //             output.sumWidth += width;
    //             xRightLast = xRight;
    //         }

    //         if (errorOnLastWidthTemp) {
    //             const ratioAdjust = chosenWidth / output.sumWidth;
    //             for(let i = 0; i < output.widths.length; i++)
    //                 output.widths[i] *= ratioAdjust;
    //             output.sumWidth *= ratioAdjust;
    //             // console.log(`*ratio adjusted  ratioAdjust = ${ratioAdjust}`);
    //         }

    //         console.timeEnd("calculateWidths");
    //         return output;
    //     }


    //     function computeCachedHeightTemp(x) {
    //         const index = (x - xStart) / chosenWidth * heightValuesCachedTemp.length;
    //         const indexLeft = Math.floor(index);
    //         const ratio = index - indexLeft;
    //         const heightLeft = heightValuesCachedTemp[indexLeft];
    //         const heightRight = heightValuesCachedTemp[indexLeft + 1]
    //         const height = heightLeft * (1 - ratio) + heightRight * ratio;
    //         return height;
    //     }


    //     function computeErrorAvgTemp(widths, fAdjustWidth) {
    //         const areas = [];
    //         const widths2 = [];
    //         let sumArea = 0;
    //         let sumHeight = 0;
    //         let xRightLast = xStart;
    //         let xRightLast2 = xStart;
    //         for(let i = 0; i < widths.length; i++) {
    //             const y = ff(dr, xRightLast);
    //             const height = Math.abs(dv.maxY - y);
    //             // const height = computeCachedHeightTemp(xRightLast);
    //             const width = widths[i] * (fAdjustWidth || 1);
    //             const area = width * height;
    //             widths2.push(width);
    //             areas.push(area);
    //             xRightLast += width;
    //             sumArea += area;

    //             const y2 = ff(dr, xRightLast2);
    //             const height2 = Math.abs(dv.maxY - y2);
    //             sumHeight += height2;
    //             xRightLast2 += widths[i];

    //         }

    //         const errorSums = {
    //             errorAbs: 0,
    //             errorSquared: 0,
    //             error2: 0,
    //             widths,
    //             widths2,
    //             widthsDrLeft: drLeft.partitionWidths,
    //         };
    //         for(let i = 0; i < areas.length; i++) {
    //             const ratio = areas[i] / sumArea;
    //             const ratioDesired = ratiosCir[i];
    //             const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
    //             const errorSquared = errorAbs ** 2;

    //             errorSums.errorAbs += errorAbs;
    //             errorSums.errorSquared += errorSquared;
    //             errorSums.error2 += Math.abs(ratioDesired / ratio);
    //         }

    //         errorSums.errorAbs /= areas.length;
    //         errorSums.errorSquared /= areas.length;
    //         errorSums.error2 /= areas.length;
            
    //         const sumWidths = widths.reduce((acc, cur) => acc + cur);
    //         errorSums.widthErrorNotAdjusted = Math.abs((sumWidths - chosenWidth) / chosenWidth);
    //         errorSums.chosenWidthDivSumWidths = chosenWidth / sumWidths;

    //         const y = ff(dr, xStart + sumWidths);
    //         const height = Math.abs(dv.maxY - y);
    //         errorSums.heightLast = height;
    //         errorSums.widthExtra = chosenWidth - sumWidths;
    //         errorSums.areaCirExtra = errorSums.heightLast * errorSums.widthExtra;
    //         errorSums.sumArea = sumArea;
    //         errorSums.areaCirExtraDivAumArea = errorSums.areaCirExtra / errorSums.sumArea;
    //         errorSums.heightAvg = sumHeight / areas.length;

    //         return errorSums;
    //     }
    // }




















    //TEMP 2025.07.30
    //Contains draft code and comments for reference
    // function calculateWidthsTemp8(ratiosCir, drAdustWidthsTemp) {
    //     const dr = drAdustWidthsTemp;
    //     const dv = dr.yVariations;
    //     if (!dv) return;
        
    //     const ff = numModel.curveFun;
    //     const yVariations = dr.yVariations;
    //     const xStart = yVariations.x_start;
    //     const chosenWidth = yVariations.chosenWidth;
    //     const xEnd = xStart + chosenWidth;
    //     const figureArea = dr.figureArea;


    //     // console.log("********************");
    //     // console.time("calculateWidthsTemp8");
    //     //***Minimum ratio***
    //     //The area calculated by circumscribed rectangles will always be larger
    //     //than the area of the figure.  Therefore with a ratio of 1 they will
    //     //always either have extra area left or be exact.  Therefore the ratio
    //     //must always be >= 1.  However given that error can be present when
    //     //calculating the widths, it the ratio could end up slightly less than
    //     //1.  Therefore set it to be a bit smaller to be safe.
    //     let ratioL = 0.99;

    //     //TEMP Check the following idea
    //     //The largest circumscribed area could be is the square that bounds the
    //     //figure.  The smallest it can be is the area of the figure.
    //     //areaMaxCir = chosenWidth * (yVariations.maxY - yVariations.minY)
    //     //  -Probably however there is a better way mentioned below


    //     //***Maximum ratio***
    //     //How to calculate the largest possible ratio.
    //     //Suppose when calculating the rectangles using the initial ratio, the
    //     //sum of widths is 0.8 the total figure width.  If the widths of each
    //     //rectangle increased to fill the remaining width (in this example by
    //     //1/0.8 meaning 1.25) their heights would at most stay the same, and
    //     //realistically they would decrease.  This means at most the area could
    //     //increase by the total figure width divided by the sum of widths.
    //     //Therefore because the area of each rectangle is multiplied by the
    //     //ratio, it could at most increase by that amount.
        
    //     //How to calculate the largest possible ratio.
    //     //Suppose when calculating the rectangles using the initial ratio, the
    //     //sum of widths is 0.8 the total figure width.  If the widths of each
    //     //rectangle increased to fill the remaining width (in this example by
    //     //1/0.8 meaning 1.25) their heights would at most stay the same, and
    //     //realistically they would decrease.  This means at most the area could
    //     //increase by that amount.
    //     //Therefore because the area of each rectangle is multiplied by the
    //     //ratio, it could at most increase by that amount.


        
    //     // to fill the remaining width,
    //     //their heights will either stay the same or decrease.  This means that
    //     //at most the area could increase by that factor.
    //     // 
    //     //If the width of
    //     //the rectangles are increased to fill the remaining width


    //     //***Maximum ratio***
    //     //When calculating the widths of the rectangles using ratioMin, the sum
    //     //of widths will be less than the total figure width.  If the width of
    //     //each rectangle is increased by a factor (total figure width divided
    //     //by the sum of widths) then they will fill the remaining width.  Their
    //     //heights will either stay the same or decrease.  This means that
    //     //at most the area, and thus ratio, could increase is by that factor.
    //     let calculateWidthsL = calculateWidths(ratioL);
    //     let ratioR = ratioL * chosenWidth / calculateWidthsL.sumWidth;



    //     let widthError = 1;
    //     let iteration = 0
    //     for(; iteration < 20 && widthError > 0.001; iteration++) {
    //         const ratioM = (ratioR + ratioL) / 2;
    //         const calculateWidthsM = calculateWidths(ratioM);

    //         if (!calculateWidthsM) {
    //             //TEMP replace R
    //             ratioR = ratioM;
    //             continue;
    //         } else {
    //             //TEMP replace L
    //             ratioL = ratioM;
    //             calculateWidthsL = calculateWidthsM;
    //         }
    //         widthError = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //         const maxAreaIncreaseFactor = chosenWidth / calculateWidthsL.sumWidth;
    //         const maxRatio = ratioL * maxAreaIncreaseFactor;
    //         ratioR = Math.min(maxRatio, ratioR);
    //     }
    //     // console.timeEnd("calculateWidthsTemp8");
    //     drAdustWidthsTemp.partitionWidths = [...calculateWidthsL.widths];
    //     const breakPoint = "";




    //     function calculateWidths(ratio) {
    //         const output = {
    //             widths: [],
    //         };
    //         let xRightLast = xStart;
    //         let sumWidth = 0;

    //         for(let i = 0; i < sconf.basesN; i++) {
    //             const areaDesired = ratiosCir[i] * figureArea * ratio;

    //             //Note because circumscribed rectangles are used the height will
    //             //always be the same no matter the width, unlike with inscribed
    //             //rectangles where the height changes with width.
    //             const y = ff(dr, xRightLast);
    //             const height = Math.abs(dv.maxY - y);
    //             const width = areaDesired / height;
    //             const xRight = xRightLast + width;

    //             if (xRight > xEnd)
    //                 return null;

    //             output.widths[i] = width;
    //             // output.widths.push(width);
    //             xRightLast = xRight;
    //             sumWidth += width;
    //         }

    //         output.sumWidth = sumWidth;

    //         return output;
    //     }
    // }






    //TEMP 2025.07.30
    //Like calculateWidthsTemp7 below but better
    // function calculateWidthsTemp8(ratiosCir, drAdustWidthsTemp) {
    //     const dr = drAdustWidthsTemp;
    //     const dv = dr.yVariations;
    //     if (!dv) return;
        
    //     const ff = numModel.curveFun;
    //     const yVariations = dr.yVariations;
    //     const xStart = yVariations.x_start;
    //     const chosenWidth = yVariations.chosenWidth;
    //     const xEnd = xStart + chosenWidth;
    //     const pw = dr.partitionWidths;
    //     const figureArea = dr.figureArea;


    //     // console.log("********************");
    //     console.time("calculateWidthsTemp8");
    //     //TEMP Check the following idea
    //     //The area calculated by circumscribed rectangles will always be larger
    //     //than the area of the figure.  Therefore with a ratio of 1 they will
    //     //always either have extra area left or be exact.  Therefore the ratio
    //     //must always be >= 1.
    //     //I believe the above it likely true, however keep in mind there can be
    //     //error that can cause it to be eg. slightly less than 1.
    //     let ratioL = 1 * 0.98;//1;//0.000000001;
    //     //TEMP Check the following idea
    //     //The largest circumscribed area could be is the square that bounds the
    //     //figure.  The smallest it can be is the area of the figure.
    //     //areaMaxCir = chosenWidth * (yVariations.maxY - yVariations.minY)
        
    //     // const areaMaxCir = chosenWidth * (yVariations.maxY - yVariations.minY);
    //     // const ratioRMax = areaMaxCir / figureArea * 1.02;
    //     // console.log("ratioRMax = ", ratioRMax);

    //     // let ratioR = ratioRMax;//20;//5;//2;//10;
    //     let calculateWidthsL = calculateWidths(ratioL);
    //     // const sumAreaDivFigureArea = calculateWidthsL.sumArea / figureArea;
    //     // console.log(`sumArea = ${calculateWidthsL.sumArea}  sumAreaDivFigureArea = ${sumAreaDivFigureArea}  ratioL = ${ratioL}`);
                
    //     const ratioRMax2 = ratioL * chosenWidth / calculateWidthsL.sumWidth;
    //     let ratioR = ratioRMax2;
    //     // console.log("ratioR =", ratioR);


    //     const offset = 0.0001;
    //     const calculateWidthsLOffset = calculateWidths(ratioL + offset);
    //     const fRatioL = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //     const fRatioLOffset = Math.abs((calculateWidthsLOffset.sumWidth - chosenWidth) / chosenWidth);
    //     // const slope = ((calculateWidthsLOffset.sumWidth - calculateWidthsL.sumWidth) / offset)
    //     const slope = ((fRatioLOffset - fRatioL) / offset)
    //     const ratioL2 = ratioL - fRatioL / slope;
    //     // const ratioL2 = ratioL - calculateWidthsL.sumWidth / slope;
    //     // console.log("ratioL2 =", ratioL2);



    //     let widthError = 1;
    //     let iteration = 0
    //     for(; iteration < 20 && widthError > 0.001; iteration++) {
    //         const ratioM = (ratioR + ratioL) / 2;
    //         const calculateWidthsM = calculateWidths(ratioM);
    //         if (!calculateWidthsM) {
    //             //TEMP replace R
    //             ratioR = ratioM;
    //             continue;
    //         } else {
    //             //TEMP replace L
    //             ratioL = ratioM;
    //             calculateWidthsL = calculateWidthsM;

    //             // widthError = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //             // // const sumAreaDivFigureArea = calculateWidthsL.sumArea / figureArea;
    //             // // console.log(`iteration = ${iteration}  sumArea = ${calculateWidthsL.sumArea}  sumAreaDivFigureArea = ${sumAreaDivFigureArea}  ratioL = ${ratioL} widthError = ${widthError}`);
    //             // // // console.log(`iteration = ${iteration}  ratioL = ${ratioL}  errorAvg = ${calculateWidthsL.errorAvg}  widthError = ${widthError}`);
    //         }
    //         widthError = Math.abs((calculateWidthsL.sumWidth - chosenWidth) / chosenWidth);
    //         const maxAreaIncreaseFactor = chosenWidth / calculateWidthsL.sumWidth;
    //         const maxRatio = ratioL * maxAreaIncreaseFactor;
    //         // console.log(`iteration = ${iteration}  ratioL = ${ratioL} widthError = ${widthError}  ` +
    //         //     `calculateWidthsL.sumWidth / chosenWidth = ${calculateWidthsL.sumWidth / chosenWidth}  ` +
    //         //     `maxAreaIncreaseFactor = ${maxAreaIncreaseFactor}  maxRatio = ${maxRatio}  ratioR = ${ratioR}`);
    //         ratioR = Math.min(maxRatio, ratioR);
    //     }
    //     console.timeEnd("calculateWidthsTemp8");
    //     // console.log(`iteration = ${iteration}  ratioL = ${ratioL} widthError = ${widthError}`);
    //     // console.log("ratioR Large =", 1 / ratiosCir[0]);


    //     // // const calculateWidthsTemp1 = calculateWidthsLast;//calculateWidths(1.5);//1.167);
    //     // // console.log("ratioCurrent =", ratioCurrent);
    //     // // console.log("calculateWidthsLast =", calculateWidthsLast);

    //     // // const sumWidths = calculateWidthsTemp1.widths.reduce((acc, cur) => acc + cur);
    //     // const sumArea = calculateWidthsL.areas.reduce((acc, cur) => acc + cur);
    //     // const ratios = calculateWidthsL.areas.map(area => area / sumArea);
    //     // console.log("ratios =", ratios);
    //     // console.log("ratiosCir =", ratiosCir);
    //     // console.log("calculateWidthsL =", calculateWidthsL);
    //     // console.log("ratioL =", ratioL);
    //     drAdustWidthsTemp.partitionWidths = [...calculateWidthsL.widths];
    //     const breakPoint = "";




    //     function calculateWidths(ratio) {
    //         const output = {
    //             widths: [],
    //         };
    //         let xRightLast = xStart;
    //         let sumWidth = 0;

    //         for(let i = 0; i < sconf.basesN; i++) {
    //             const areaDesired = ratiosCir[i] * figureArea * ratio;

    //             //Note because circumscribed rectangles are used the height will
    //             //always be the same no matter the width, unlike with inscribed
    //             //rectangles where the height changes with width.
    //             const y = ff(dr, xRightLast);
    //             const height = Math.abs(dv.maxY - y);
    //             const width = areaDesired / height;
    //             const xRight = xRightLast + width;

    //             if (xRight > xEnd)
    //                 return null;

    //             output.widths.push(width);
    //             xRightLast = xRight;
    //             sumWidth += width;
    //         }

    //         output.sumWidth = sumWidth;

    //         return output;
    //     }
    // }










    //TEMP 2025.07.29
    //Seems to work well but slow and code is a draft.  For each rectangle
    //start at the right side of the previous rectangle and uses linear search
    //to determine what width corresponds to the needed area.  There will
    //either be too much area left or not enough.  The areas are then
    //multiplied by a ratio to adjust the amount of remaining area.  Binary
    //search is then used to iterate and converge on the final widths.
    function calculateWidthsTemp7(ratiosCir, drAdustWidthsTemp) {
        const dr = drAdustWidthsTemp;
        const dv = dr.yVariations;
        if (!dv) return;
        
        const ff = numModel.curveFun;
        const yVariations = dr.yVariations;
        const xStart = yVariations.x_start;
        const chosenWidth = yVariations.chosenWidth;
        const xEnd = xStart + chosenWidth;
        const pw = dr.partitionWidths;
        const figureArea = dr.figureArea;

        //TEMP Linear search
        // let calculateWidthsLast = null;
        // let completed = true;
        // let ratioCurrent = 1.15;
        // while(completed && ratioCurrent < 10) {
        //     ratioCurrent += 0.0001
        //     const calculateWidthsCurrent = calculateWidths(ratioCurrent);
        //     if (calculateWidthsCurrent.completedTemp)
        //         calculateWidthsLast = calculateWidthsCurrent;
        //     else
        //         completed = false;
        // }



        let ratioL = 0.1;
        let ratioR = 10;
        let calculateWidthsL = calculateWidths(ratioL);
        let calculateWidthsR = calculateWidths(ratioR);

        for(let iteration = 0; iteration < 20; iteration++) {
            const ratioM = (ratioR + ratioL) / 2;
            const calculateWidthsM = calculateWidths(ratioM);
            if (!calculateWidthsM.completedTemp) {
                //TEMP replace R
                ratioR = ratioM;
                calculateWidthsR = calculateWidthsM;
            } else {
                //TEMP replace L
                ratioL = ratioM;
                calculateWidthsL = calculateWidthsM;
            }
        }


        // const calculateWidthsTemp1 = calculateWidthsLast;//calculateWidths(1.5);//1.167);
        // console.log("ratioCurrent =", ratioCurrent);
        // console.log("calculateWidthsLast =", calculateWidthsLast);

        // const sumWidths = calculateWidthsTemp1.widths.reduce((acc, cur) => acc + cur);
        const sumArea = calculateWidthsL.areas.reduce((acc, cur) => acc + cur);
        const ratios = calculateWidthsL.areas.map(area => area / sumArea);
        console.log("ratios =", ratios);
        console.log("ratiosCir =", ratiosCir);
        console.log("calculateWidthsL =", calculateWidthsL);
        drAdustWidthsTemp.partitionWidths = [...calculateWidthsL.widths];
        const breakPoint = "";


        // function calculateWidths(ratio) {
        //     const widths = [];
        //     let xRightLast = xStart;

        //     // let ranOutOfArea = false;
        //     let extraRatioArea = null;
        //     for(let i = 0; i < pw.length; i++) {
        //         const area = ratiosCir[i] * figureArea * ratio;
        //         // const xRight = calculateRectXRight(xLeftLast, area);
        //         const {xRight, areaCurrent} = calculateRectXRight(xRightLast, area);
        //         if (areaCurrent != null) {
        //             const width = xRight - xRightLast;
        //             widths.push(width);
        //         } else {
        //             //Not enough area
        //             // ranOutOfArea = true;
        //             extraRatioArea = 0;
        //             for(let i2 = i; i2 < ratiosCir.length; i2++)
        //                 extraRatioArea += ratiosCir[i2];
        //             break;
        //         }
        //         xRightLast = xRight;
        //     }

        //     return {
        //         widths,
        //         extraRatioArea,
        //         extraDistance: (extraRatioArea == null) ? xEnd - xRightLast : null,
        //     };
        // }


        function calculateWidths(ratio) {
            console.time("calculateWidths");
            const output = {
                widths: [],
                areas: [],
            };
            let xRightLast = xStart;

            // let ranOutOfArea = false;
            let extraRatioArea = null;
            for(let i = 0; i < pw.length; i++) {
                const area = ratiosCir[i] * figureArea * ratio;
                // const xRight = calculateRectXRight(xLeftLast, area);
                const {xRight, areaCurrent, found} =
                    calculateRectXRight(xRightLast, area);
                output.areas.push(areaCurrent);
                if (found) {
                    const width = xRight - xRightLast;
                    output.widths.push(width);
                } else {
                    //Not enough area
                    // ranOutOfArea = true;
                    extraRatioArea = 0;
                    for(let i2 = i; i2 < ratiosCir.length; i2++)
                        extraRatioArea += ratiosCir[i2];
                    break;
                }
                xRightLast = xRight;
            }

            // output.xRightLast = xRightLast
            output.completedTemp = 
                (output.areas.length === output.widths.length &&
                output.areas.length === pw.length);
            console.timeEnd("calculateWidths");
            if (output.widths.length > 0) {
                output.sumWidth = output.widths.reduce((acc, cur) => acc + cur);
                output.sumWidthDivChosenWidth = output.sumWidth / chosenWidth;
            }

            return output;

            // return {
            //     widths,
            //     extraRatioArea,
            //     extraDistance: (extraRatioArea == null) ? xEnd - xRightLast : null,
            // };
        }




        function calculateRectXRight(xLeft, area) {
            // const deltaX = chosenWidth / 1000000;
            const deltaX = chosenWidth / 100000;
            
            let xRight = xLeft;

            
            let found = false;
            let areaCurrent = null;
            while (xRight < xEnd) {
                const width = xRight - xLeft;

                areaCurrent = calculateRectAreaCir(xLeft, width);
                if (areaCurrent >= area) {
                    found = true;
                    break;
                }
                    // return xRight;

                xRight += deltaX;
            }

            return {
                xRight,
                areaCurrent,
                found,
            };
        }

        function calculateRectAreaCir(xLeft, width) {
                const y = ff(dr, xLeft);
                const height = Math.abs(dv.maxY - y);
                return width * height;
        }
    }





















    //TEMP 2025.07.29
    //Calculates the ratio of areas by calculating the exact area using integrals.
    function calculateWidthsTempExactIntegral(drAdustWidthsTemp, drOriginal) {
        console.log("********************");
        const dv = drAdustWidthsTemp.yVariations;
        if (!dv) return;
        const ff = numModel.curveFun;
        const integralDataDrO = calculateIntegrateAreaDataTemp(drOriginal);
        const integralDataDrA = calculateIntegrateAreaDataTemp(drAdustWidthsTemp);

        const integrateTestO = integrate(
            integralDataDrO, 
            integralDataDrO.xStart,
            integralDataDrO.xStart + integralDataDrO.chosenWidth);
        const integrateTestA = integrate(
            integralDataDrA, 
            integralDataDrA.xStart,
            integralDataDrA.xStart + integralDataDrA.chosenWidth);

        const partitionWidthIntegralsO = calculatePartitionWidthIntegrals(
            integralDataDrO);
        const partitionWidthIntegralsA = calculatePartitionWidthIntegrals(
            integralDataDrA);

        const ratios = partitionWidthIntegralsO.areas.map(
            area => area / partitionWidthIntegralsO.sumArea);
        const partitionWidthsCalculatedO = calculatePartitionWidthsFromRatios(
            integralDataDrO, ratios);
        const partitionWidthsCalculatedA = calculatePartitionWidthsFromRatios(
            integralDataDrA, ratios);
            
        const widths = partitionWidthsCalculatedA.map(data => data.width);
        drAdustWidthsTemp.partitionWidths = [...widths];
        console.log("partitionWidths O =", drOriginal.partitionWidths);
        console.log("partitionWidths A =", drAdustWidthsTemp.partitionWidths);

        const areasO = calculateAreasInscribed(drOriginal);
        const areasA = calculateAreasInscribed(drAdustWidthsTemp);
        console.log("areasO =", areasO);
        console.log("areasA =", areasA);
        const ratiosOInscribed = areasO.areas.map(area => area / areasO.sumArea);
        const ratiosAInscribed = areasA.areas.map(area => area / areasA.sumArea);
        console.log("ratiosOInscribed =", ratiosOInscribed);
        console.log("ratiosAInscribed =", ratiosAInscribed);
        const ratioAreas = ratiosOInscribed.map((ratioO, i) => {
            const ratioA = ratiosAInscribed[i];
            // const errorAbs = Math.abs((ratioA - ratioO) / ratioO)
            // const errorSquared = errorAbs ** 2;
            // return errorSquared;
            return ratioA / ratioO;
        });
        console.log("ratioAreas =", ratioAreas);
        const breakPoint = "";



        function calculateIntegrateAreaDataTemp(dr) {//}, x0, x1) {
            const countRects = sconf.BASE_MAX_NUM;
            const xStart = dr.yVariations.x_start;
            const chosenWidth = dr.yVariations.chosenWidth;
            const widthRect = chosenWidth / countRects;
            // const pWidths = dr.partitionWidths;

            const output = {
                dr,
                countRects,
                xStart,
                chosenWidth,
                widthRect,
                data: [],
            };
            let sumArea = 0;
            // const areas = [];
            for(let i = 0; i < countRects; i++) {
                const xLeftSide = xStart + i * widthRect;
                const y = ff(dr, xLeftSide);
                const height = Math.abs(dv.maxY - y);

                const area = widthRect * height;
                // areas.push(area);
                sumArea += area;
                output.data.push({
                    area,
                    sumArea,
                    xLeftSide,
                    width: widthRect,
                    height,
                });
            }
            output.sumArea = sumArea;
            return output;
        }


        function integrate(integralData, xS, xE) {
            //Calculate area under curve for input interval.
            const {dr,
                countRects,
                xStart,
                chosenWidth,
                widthRect,
                data} = integralData;
            const iS = (xS - xStart) / widthRect;
            let iE = (xE - xStart) / widthRect;

            //TEMP
            if (iE >= 500) {
                iE = 499.9999;
            }

            if (iS > -1 && iS < data.length &&
                iE > -1 && iE < data.length) {
                    const dataPointS = data[Math.floor(iS)];
                    const dataPointE = data[Math.floor(iE)];

                    const ratioS = (xS - dataPointS.xLeftSide) / widthRect;
                    const ratioE = (xE - dataPointE.xLeftSide) / widthRect;

                    const sumAreaS = dataPointS.sumArea - dataPointS.area * (1 - ratioS);
                    const sumAreaE = dataPointE.sumArea - dataPointE.area * (1 - ratioE);
                    const area = sumAreaE - sumAreaS;
                    return area;
            }
            return null;
        }


        function calculatePartitionWidthIntegrals(integralData) {
            //Integrate each partitionWidth
            const {dr,
                countRects,
                xStart,
                chosenWidth,
                widthRect,
                data} = integralData;
            const output = {
                areas: [],
            };
            let sumArea = 0;
            let xRightLast = xStart;
            const pw = dr.partitionWidths;
            for(let i = 0; i < pw.length; i++) {
                const xLeft = xRightLast;
                const xRight = xLeft + pw[i];
                const area = integrate(integralData, xLeft, xRight);
                sumArea += area;
                output.areas.push(area);
                xRightLast = xRight;
            }
            output.sumArea = sumArea;
            return output;
        };


        function calculatePartitionWidthsFromRatios(integralData, ratios) {
            //Calculate partition widths from ratios of area
            const {dr,
                countRects,
                xStart,
                chosenWidth,
                widthRect,
                sumArea,
                data} = integralData;

            const output = [];
            let xS = xStart;
            for(let i = 0; i < dr.partitionWidths.length; i++) {
                const area = ratios[i] * sumArea;
                const xE = calculateXE(integralData, xS, area);
                output.push({
                    width: xE-xS,
                    xS,
                    xE,
                    area,
                });
                xS = xE;
            }
            return output;
        }

        function calculateXE(integralData, xS, area) {
            //Calculate xE using xS and area

            //Calculate area under curve for input interval.
            const {dr,
                countRects,
                xStart,
                chosenWidth,
                widthRect,
                data} = integralData;
            const iS = (xS - xStart) / widthRect;
            let iE = Math.floor(iS);

            const dataPointS = data[Math.floor(iS)];
            const ratioS = (xS - dataPointS.xLeftSide) / widthRect;
            //Starting sum of area
            const sumAreaS = dataPointS.sumArea - dataPointS.area * (1 - ratioS);
            const sumAreaDesired = sumAreaS + area;

            let sumAreaIERight = data[iE].sumArea;
            while (sumAreaIERight < sumAreaDesired && iE < data.length-1) {
                iE++;
                sumAreaIERight = data[iE].sumArea;
            }

            const dataPointE = data[iE];


            const areaERight = dataPointE.sumArea;
            const areaELeft = dataPointE.sumArea - dataPointE.area;

            let ratioE = (sumAreaDesired - areaELeft) / (areaERight - areaELeft);
            if (ratioE > 1) {
                console.error("ratioE > 1   ratioE =", ratioE);
                ratioE = 1;
            }
            const xE = dataPointE.xLeftSide + widthRect * ratioE;

            return xE;
        }


        function calculateAreasInscribed(dr) {
            //Calculates areas of each rectangle for the input dr
            const xStart = dr.yVariations.x_start;
            const pw = dr.partitionWidths;

            const output = {
                dr,
                areas: [],
            };
            let sumWidths = 0;
            let sumArea = 0;
            // const areas = [];
            for(let i = 0; i < pw.length; i++) {
                const width = pw[i];
                sumWidths += width;
                const xRightSide = xStart + sumWidths;
                const y = ff(dr, xRightSide);
                const height = Math.abs(dv.maxY - y);

                const area = width * height;
                sumArea += area;
                output.areas.push(area);
            }
            output.sumArea = sumArea;
            return output;
        }


        // function calculateTotalErrorTemp(widths) {
        //     //TEMP Note uses circumscribed areas.
        //     let sumArea = 0, sumWidths = 0;
        //     const areas = [];
        //     for(let i = 0; i < widths.length; i++) {
        //         const width = widths[i];
        //         const xLeftSide = xStart + sumWidths;
        //         sumWidths += width;

        //         const y = ff(drAdustWidthsTemp, xLeftSide);
        //         const height = Math.abs(dv.maxY - y);

        //         const area = width * height;
        //         areas.push(area);
        //         sumArea += area;
        //     }
        //     // sumArea = sumF1;//TEMP
        //     const ratios = areas.map(area => area / sumArea);

        //     //TEMP Error scaled.
        //     let sumErrorSquared = 0;
        //     const countMax = Math.max(ratiosDesired.length, ratios.length);
        //     for(let i = 0; i < countMax; i++) {
        //         const ratio = ratios[i];
        //         const ratioDesired = ratiosDesired[i];


        //         // const areaCurrent = ratio * sumArea;
        //         // const areaDesired = ratioDesired * sumArea;
                
        //         // const errorAbs = Math.abs((areaCurrent - areaDesired) / areaDesired);
        //         // const errorSquared = errorAbs ** 2;

        //         const scale = 1;//ratiosDesired[i];
        //         const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired) * scale;
        //         const errorSquared = errorAbs ** 2;
        //         // //TEMP
        //         // // const errorSquared2 = errorSquared * (ratio < 0 ? 5 : 1);


        //         // sumErrorSquared += errorSquared2;
        //         sumErrorSquared += errorSquared;
        //     }
        //     return sumErrorSquared;
        // }
    }



































function calculateWidthsTemp5(ratiosDesired, drAdustWidthsTemp, sumF1, drOriginal) {
        const dv = drAdustWidthsTemp.yVariations;
        if (!dv) return;
        const ff = numModel.curveFun;
        const basesN = sconf.basesN;
        const xStart = drAdustWidthsTemp.yVariations.x_start;
        const chosenWidth = drAdustWidthsTemp.yVariations.chosenWidth;
        const widthRect = drAdustWidthsTemp.yVariations.chosenWidth / basesN;
        // const pwidths = [];
        // for(let i = 0; i < basesN; i++) {
        //     if (!drAdustWidthsTemp.partitionWidths[i]) return;
        //     // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
        //     pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
        // }

        //TEMP Equal widths
        const draggerXPositions = [];
        for(let i = 1; i < basesN; i++) {
            if (!drAdustWidthsTemp.partitionWidths[i]) return;
            // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
            // pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
            draggerXPositions.push(xStart + i * widthRect);
        }

        // //TEMP Previous positions
        // const draggerXPositions = [];
        // let sumWidths = 0;
        // for(let i = 0; i < basesN-1; i++) {
        //     if (!drAdustWidthsTemp.partitionWidths[i]) return;
        //     // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
        //     // pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
        //     // draggerXPositions.push(xStart + i * widthRect);
        //     sumWidths += drAdustWidthsTemp.partitionWidths[i];
        //     draggerXPositions.push(xStart + sumWidths);
        // }
        console.log("********************");

        //TEMP Split the range of x values into small increments.  For each of
        //those possible handle positions, calculate the total amount of error
        //for the entire figure.  Also try using circumscribed areas to try and
        //handle the fact that the right most inscribed rectangle has a height
        //of zero.

        //Result
        //When starting with equal rectangle widths and only adjusting the
        //first handle, there was a global minimum and two local minimums.
        //Therefore it is probably best to perform an initial search for the
        //approximate location of the global minimum to find the best initial
        //guess.  Splitting the x range into equal intervals should be a good
        //way to do this.  Next use a different method to iterate in that local
        //spot, given that linear search is inefficient.

        // __|__|__|__

        //For first base point dragger only for now
        // const countIncrements = 1000;
        // const xIncrement = chosenWidth / (countIncrements - 1);

        let countErrorNotBetter = 0, countErrorWorse = 0;
        for(let iterations = 0; iterations < 10; iterations++) {
            const widthsStart = computeWidthsTemp();
            const draggerXPositionsStart = [...draggerXPositions];
            for(let iDrag = 0; iDrag < draggerXPositions.length; iDrag++) {





                const errorC1 = calculateErrorWithDifferentXHandle();
                const countIncrements = 10000;
                let xSelectedLinear = null;
                const xIncrement = chosenWidth / (countIncrements - 1);
                for(let i = 0; i < countIncrements; i++) {
                    const x = xStart + i * xIncrement;
                    const error = calculateErrorWithDifferentXHandle(iDrag, x);
                    const errorS = calculateErrorWithDifferentXHandle(iDrag, xSelectedLinear);
                    if (xSelectedLinear === null || error < errorS)//if (error < errorC1)
                        xSelectedLinear = x;
                }
                console.log("xSelectedLinear =", xSelectedLinear);







                let xLeft = (iDrag === 0) ? xStart : draggerXPositions[iDrag - 1]
                    + chosenWidth / 10000;
                let xRight = (iDrag === draggerXPositions.length - 1) ?
                    (xStart + chosenWidth) : draggerXPositions[iDrag + 1]
                    - chosenWidth / 10000;
                const xLeftStart = xLeft;
                const xRightStart = xRight;


                let middleOk = true;
                for(let i = 0; i < 50; i++) {
                    const xMiddle = (xLeft + xRight) / 2;
                    const errorM = calculateErrorWithDifferentXHandle(iDrag, xMiddle);
                    
                    const errorL = calculateErrorWithDifferentXHandle(iDrag, xLeft);
                    const errorR = calculateErrorWithDifferentXHandle(iDrag, xRight);
                    
                    // const errorC = calculateErrorWithDifferentXHandle();

                    // middleOk = (errorM < errorL && errorM < errorR);
                    // if (!middleOk)
                    //     break;

                    if (errorL < errorR) {
                        xRight = xMiddle;
                    } else {
                        xLeft = xMiddle;
                    }
                    // console.log(`iterations = ${iterations}  i = ${i}`);
                    // console.log("errorL =", errorL);
                    // console.log("errorM =", errorM);
                    // console.log("errorR =", errorR);
                }
                const errorC = calculateErrorWithDifferentXHandle();
                const errorL = calculateErrorWithDifferentXHandle(iDrag, xLeft);
                const errorR = calculateErrorWithDifferentXHandle(iDrag, xRight);

                const xCurrent = draggerXPositions[iDrag];

                const newPossible = (errorL < errorR) ? 
                    {x: xLeft,  error: errorL }: 
                    {x: xRight, error: errorR };
                console.log("xSelectedMidpoint =", newPossible.x);
                if (true || newPossible.error < errorC) {
                    // const x2 = newPossible.x;//(newPossible.x*0.1 + xCurrent * 0.9);
                    // draggerXPositions[iDrag] = x2;//newPossible.x;
                    draggerXPositions[iDrag] = xSelectedLinear;
                } else {
                    countErrorNotBetter++;
                    if (newPossible.error > errorC) {
                        countErrorWorse++;
                    }
                }
                
                // const newOk = (errorM < errorL && errorM < errorR);
                // const xSelected = errors[indexMin].x;
                // draggerXPositions[iRect] = xSelected;


                // const errors = [];
                // for(let increment = 0; increment < countIncrements; increment++) {
                //     // const xEnd = xStart + chosenWidth;
                //     // const rectSides = [xStart, ...draggerXPositions, xEnd];
                //     // const x = xStart + increment * xIncrement;
                //     // rectSides[iRect+1] = x;

                //     // //Calculate widths
                //     // const widths = [];
                //     // let hasInvalidHandle = false;
                //     // for(let i2 = 0; i2 < rectSides.length-1; i2++) {
                //     //     const width = rectSides[i2 + 1] - rectSides[i2];
                //     //     const handleInvalid = (width < 0);
                //     //     // const handleInvalid = (width - sconf.BASE_POINTS_REPELLING_DISTANCE) < 0;
                //     //     if (handleInvalid && !hasInvalidHandle)
                //     //         hasInvalidHandle = handleInvalid;
                //     //     widths.push(width);
                //     // }

                //     // const error = calculateTotalErrorTemp(widths);

                //     const x = xStart + increment * xIncrement;
                //     const error = calculateErrorWithDifferentXHandle(iRect, x);
                //     errors.push({error, x,});
                // }

                // let indexMin = null;
                // let errorMin = null;
                // for(let i = 0; i < errors.length; i++) {
                //     const errorCurrent = errors[i].error;
                //     if (indexMin == null || errorCurrent < errorMin) {
                //         indexMin = i;
                //         errorMin = errorCurrent;
                //     }
                // }
                // const xSelected = errors[indexMin].x;
                // draggerXPositions[iRect] = xSelected;
            }
            const widthsEnd = computeWidthsTemp();
            const draggerXPositionsEnd = [...draggerXPositions];

            const widthsChanges = widthsStart.map((w, i) => {
                return widthsEnd[i] / w - 1;
            });
            const draggerXPositionsChanges = draggerXPositionsStart.map((x, i) => {
                return draggerXPositionsEnd[i] - x;
                // return draggerXPositionsEnd[i] / x - 1;
            });
            console.log(`iterations = ${iterations}  widthsChanges =`, widthsChanges);
            console.log(`iterations = ${iterations}  draggerXPositionsChanges =`, draggerXPositionsChanges);
            const errorC = calculateErrorWithDifferentXHandle();
            console.log("errorC =", errorC);
        }
        // console.log("draggerXPositions =", draggerXPositions);
        // console.log("xFactors =", draggerXPositions.map(x => 
        //     (x - xStart) / chosenWidth
        // ));
        console.log("countErrorNotBetter =", countErrorNotBetter);
        console.log("countErrorWorse =", countErrorWorse);


        //Set widths for second figure using specified method
        const widthsFinal = computeWidthsTemp()
        console.log("widthsFinal =", widthsFinal);
        console.log("drOriginal.partitionWidths =", drOriginal.partitionWidths);
        drAdustWidthsTemp.partitionWidths = [...widthsFinal];

        
        // for(let i = 1; i < errors.length; i++) {
        //     errors[i].increased = (errors[i].error > errors[i-1].error);
        // }
        // console.log("errors =", errors);


        // let indexMin = null;
        // let errorMin = null;
        // for(let i = 0; i < errors.length; i++) {
        //     const errorCurrent = errors[i].error;
        //     if (indexMin == null || errorCurrent < errorMin) {
        //         indexMin = i;
        //         errorMin = errorCurrent;
        //     }
        // }
        // console.log("indexMin =", indexMin);
        // console.log("errorMin =", errorMin);
        // console.log("valueMin =", errors[indexMin].xFactor); 


        function calculateErrorWithDifferentXHandle(indexHandle, xHandle) {
            const widths = computeWidthsTemp(indexHandle, xHandle);
            // const xEnd = xStart + chosenWidth;
            // const rectSides = [xStart, ...draggerXPositions, xEnd];
            // rectSides[indexHandle+1] = xHandle;

            // //Calculate widths
            // const widths = [];
            // let hasInvalidHandle = false;
            // for(let i2 = 0; i2 < rectSides.length-1; i2++) {
            //     const width = rectSides[i2 + 1] - rectSides[i2];
            //     const handleInvalid = (width < 0);
            //     // const handleInvalid = (width - sconf.BASE_POINTS_REPELLING_DISTANCE) < 0;
            //     if (handleInvalid && !hasInvalidHandle)
            //         hasInvalidHandle = handleInvalid;
            //     widths.push(width);
            // }

            const error = calculateTotalErrorTemp(widths);
            return error;
        }

        function computeWidthsTemp(indexHandle, xHandle) {
            const xEnd = xStart + chosenWidth;
            const rectSides = [xStart, ...draggerXPositions, xEnd];
            if (indexHandle != undefined)
                rectSides[indexHandle+1] = xHandle;

            //Calculate widths
            const widths = [];
            let hasInvalidHandle = false;
            for(let i2 = 0; i2 < rectSides.length-1; i2++) {
                const width = rectSides[i2 + 1] - rectSides[i2];
                const handleInvalid = (width < 0);
                // const handleInvalid = (width - sconf.BASE_POINTS_REPELLING_DISTANCE) < 0;
                if (handleInvalid && !hasInvalidHandle)
                    hasInvalidHandle = handleInvalid;
                widths.push(width);
            }
            return widths;
        }


        // function calculateTotalErrorTemp(widths) {
        //     //TEMP Note uses circumscribed areas.
        //     let sumArea = 0, sumWidths = 0;
        //     const areas = [];
        //     for(let i = 0; i < widths.length; i++) {
        //         const width = widths[i];
        //         const xLeftSide = xStart + sumWidths;
        //         sumWidths += width;
        //         // const xRightSide = xStart + sumWidths;

        //         // const y = ff(drAdustWidthsTemp, xRightSide);
        //         const y = ff(drAdustWidthsTemp, xLeftSide);
        //         const height = Math.abs(dv.maxY - y);

        //         const area = width * height;
        //         areas.push(area);
        //         sumArea += area;
        //     }
        //     const ratios = areas.map(area => area / sumArea);

        //     //TEMP Error scaled.
        //     let sumErrorSquared = 0;
        //     const countMax = Math.max(ratiosDesired.length, ratios.length);
        //     for(let i = 0; i < countMax; i++) {
        //         const ratio = ratios[i];
        //         const ratioDesired = ratiosDesired[i];
        //         const scale = 1;//ratiosDesired[i];
        //         const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired) * scale;
        //         const errorSquared = errorAbs ** 2;
        //         //TEMP
        //         // const errorSquared2 = errorSquared * (ratio < 0 ? 5 : 1);


        //         // sumErrorSquared += errorSquared2;
        //         sumErrorSquared += errorSquared;
        //     }
        //     return sumErrorSquared;
        // }

        function calculateTotalErrorTemp(widths) {
            //TEMP Note uses circumscribed areas.
            let sumArea = 0, sumWidths = 0;
            const areas = [];
            for(let i = 0; i < widths.length; i++) {
                const width = widths[i];
                const xLeftSide = xStart + sumWidths;
                sumWidths += width;
                // const xRightSide = xStart + sumWidths;

                // const y = ff(drAdustWidthsTemp, xRightSide);
                const y = ff(drAdustWidthsTemp, xLeftSide);
                const height = Math.abs(dv.maxY - y);

                const area = width * height;
                areas.push(area);
                sumArea += area;
            }
            // sumArea = sumF1;//TEMP
            const ratios = areas.map(area => area / sumArea);

            //TEMP Error scaled.
            let sumErrorSquared = 0;
            const countMax = Math.max(ratiosDesired.length, ratios.length);
            for(let i = 0; i < countMax; i++) {
                const ratio = ratios[i];
                const ratioDesired = ratiosDesired[i];


                // const areaCurrent = ratio * sumArea;
                // const areaDesired = ratioDesired * sumArea;
                
                // const errorAbs = Math.abs((areaCurrent - areaDesired) / areaDesired);
                // const errorSquared = errorAbs ** 2;

                const scale = 1;//ratiosDesired[i];
                const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired) * scale;
                const errorSquared = errorAbs ** 2;
                // //TEMP
                // // const errorSquared2 = errorSquared * (ratio < 0 ? 5 : 1);


                // sumErrorSquared += errorSquared2;
                sumErrorSquared += errorSquared;
            }
            return sumErrorSquared;
        }
    }
























    //2025.07.28 Testing different error functions to better understand their curvature
    function calculateWidthsTemp4(ratiosDesired, drAdustWidthsTemp) {
        const dv = drAdustWidthsTemp.yVariations;
        if (!dv) return;
        const ff = numModel.curveFun;
        const basesN = sconf.basesN;
        const xStart = drAdustWidthsTemp.yVariations.x_start;
        const chosenWidth = drAdustWidthsTemp.yVariations.chosenWidth;
        const widthRect = drAdustWidthsTemp.yVariations.chosenWidth / basesN;
        // const pwidths = [];
        // for(let i = 0; i < basesN; i++) {
        //     if (!drAdustWidthsTemp.partitionWidths[i]) return;
        //     // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
        //     pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
        // }
        const draggerXPositions = [];
        for(let i = 1; i < basesN; i++) {
            if (!drAdustWidthsTemp.partitionWidths[i]) return;
            // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
            // pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
            draggerXPositions.push(xStart + i * widthRect);
        }
        console.log("********************");

        //TEMP Split the range of x values into small increments.  For each of
        //those possible handle positions, calculate the total amount of error
        //for the entire figure.  Also try using circumscribed areas to try and
        //handle the fact that the right most inscribed rectangle has a height
        //of zero.

        //Result
        //When starting with equal rectangle widths and only adjusting the
        //first handle, there was a global minimum and two local minimums.
        //Therefore it is probably best to perform an initial search for the
        //approximate location of the global minimum to find the best initial
        //guess.  Splitting the x range into equal intervals should be a good
        //way to do this.  Next use a different method to iterate in that local
        //spot, given that linear search is inefficient.

        // __|__|__|__

        //For first base point dragger only for now
        const countIncrements = 1000;
        const xIncrement = chosenWidth / (countIncrements - 1);

        for(let iterations = 0; iterations < 10; iterations++) {
            for(let iRect = 0; iRect < draggerXPositions.length; iRect++) {
                const errors = [];
                for(let increment = 0; increment < countIncrements; increment++) {
                    // const xEnd = xStart + chosenWidth;
                    // const rectSides = [xStart, ...draggerXPositions, xEnd];
                    // const x = xStart + increment * xIncrement;
                    // rectSides[iRect+1] = x;

                    // //Calculate widths
                    // const widths = [];
                    // let hasInvalidHandle = false;
                    // for(let i2 = 0; i2 < rectSides.length-1; i2++) {
                    //     const width = rectSides[i2 + 1] - rectSides[i2];
                    //     const handleInvalid = (width < 0);
                    //     // const handleInvalid = (width - sconf.BASE_POINTS_REPELLING_DISTANCE) < 0;
                    //     if (handleInvalid && !hasInvalidHandle)
                    //         hasInvalidHandle = handleInvalid;
                    //     widths.push(width);
                    // }

                    // const error = calculateTotalErrorTemp(widths);

                    const x = xStart + increment * xIncrement;
                    const error = calculateErrorWithDifferentXHandle(iRect, x);
                    errors.push({error, x,});
                }

                let indexMin = null;
                let errorMin = null;
                for(let i = 0; i < errors.length; i++) {
                    const errorCurrent = errors[i].error;
                    if (indexMin == null || errorCurrent < errorMin) {
                        indexMin = i;
                        errorMin = errorCurrent;
                    }
                }
                const xSelected = errors[indexMin].x;
                draggerXPositions[iRect] = xSelected;
            }
        }
        console.log("draggerXPositions =", draggerXPositions);
        console.log("xFactors =", draggerXPositions.map(x => 
            (x - xStart) / chosenWidth
        ));


        //Set widths for second figure using specified method
        drAdustWidthsTemp.partitionWidths = [...computeWidthsTemp()];

        
        // for(let i = 1; i < errors.length; i++) {
        //     errors[i].increased = (errors[i].error > errors[i-1].error);
        // }
        // console.log("errors =", errors);


        // let indexMin = null;
        // let errorMin = null;
        // for(let i = 0; i < errors.length; i++) {
        //     const errorCurrent = errors[i].error;
        //     if (indexMin == null || errorCurrent < errorMin) {
        //         indexMin = i;
        //         errorMin = errorCurrent;
        //     }
        // }
        // console.log("indexMin =", indexMin);
        // console.log("errorMin =", errorMin);
        // console.log("valueMin =", errors[indexMin].xFactor); 


        function calculateErrorWithDifferentXHandle(indexHandle, xHandle) {
            const widths = computeWidthsTemp(indexHandle, xHandle);
            // const xEnd = xStart + chosenWidth;
            // const rectSides = [xStart, ...draggerXPositions, xEnd];
            // rectSides[indexHandle+1] = xHandle;

            // //Calculate widths
            // const widths = [];
            // let hasInvalidHandle = false;
            // for(let i2 = 0; i2 < rectSides.length-1; i2++) {
            //     const width = rectSides[i2 + 1] - rectSides[i2];
            //     const handleInvalid = (width < 0);
            //     // const handleInvalid = (width - sconf.BASE_POINTS_REPELLING_DISTANCE) < 0;
            //     if (handleInvalid && !hasInvalidHandle)
            //         hasInvalidHandle = handleInvalid;
            //     widths.push(width);
            // }

            const error = calculateTotalErrorTemp(widths);
            return error;
        }

        function computeWidthsTemp(indexHandle, xHandle) {
            const xEnd = xStart + chosenWidth;
            const rectSides = [xStart, ...draggerXPositions, xEnd];
            if (indexHandle != undefined)
                rectSides[indexHandle+1] = xHandle;

            //Calculate widths
            const widths = [];
            let hasInvalidHandle = false;
            for(let i2 = 0; i2 < rectSides.length-1; i2++) {
                const width = rectSides[i2 + 1] - rectSides[i2];
                const handleInvalid = (width < 0);
                // const handleInvalid = (width - sconf.BASE_POINTS_REPELLING_DISTANCE) < 0;
                if (handleInvalid && !hasInvalidHandle)
                    hasInvalidHandle = handleInvalid;
                widths.push(width);
            }
            return widths;
        }


        function calculateTotalErrorTemp(widths) {
            //TEMP Note uses circumscribed areas.
            let sumArea = 0, sumWidths = 0;
            const areas = [];
            for(let i = 0; i < widths.length; i++) {
                const width = widths[i];
                const xLeftSide = xStart + sumWidths;
                sumWidths += width;
                // const xRightSide = xStart + sumWidths;

                // const y = ff(drAdustWidthsTemp, xRightSide);
                const y = ff(drAdustWidthsTemp, xLeftSide);
                const height = Math.abs(dv.maxY - y);

                const area = width * height;
                areas.push(area);
                sumArea += area;
            }
            const ratios = areas.map(area => area / sumArea);

            //TEMP Error scaled.
            let sumErrorSquared = 0;
            const countMax = Math.max(ratiosDesired.length, ratios.length);
            for(let i = 0; i < countMax; i++) {
                const ratio = ratios[i];
                const ratioDesired = ratiosDesired[i];
                const scale = ratiosDesired[i];
                const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired) * scale;
                const errorSquared = errorAbs ** 2;
                //TEMP
                // const errorSquared2 = errorSquared * (ratio < 0 ? 5 : 1);


                // sumErrorSquared += errorSquared2;
                sumErrorSquared += errorSquared;
            }
            return sumErrorSquared;
        }
    }




















    //TEMP 2025.07.28
    //Experiment mainly to get an idea of what the function for error looks
    //like.
    // function calculateWidthsTemp4(ratiosDesired, drAdustWidthsTemp) {
    //     const dv = drAdustWidthsTemp.yVariations;
    //     if (!dv) return;
    //     const ff = numModel.curveFun;
    //     const basesN = sconf.basesN;
    //     const xStart = drAdustWidthsTemp.yVariations.x_start;
    //     const chosenWidth = drAdustWidthsTemp.yVariations.chosenWidth;
    //     const widthRect = drAdustWidthsTemp.yVariations.chosenWidth / basesN;
    //     // const pwidths = [];
    //     // for(let i = 0; i < basesN; i++) {
    //     //     if (!drAdustWidthsTemp.partitionWidths[i]) return;
    //     //     // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
    //     //     pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
    //     // }
    //     const draggerXPositions = [];
    //     for(let i = 1; i < basesN; i++) {
    //         if (!drAdustWidthsTemp.partitionWidths[i]) return;
    //         // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
    //         // pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
    //         draggerXPositions.push(xStart + i * widthRect);
    //     }

    //     //TEMP Split the range of x values into small increments.  For each of
    //     //those possible handle positions, calculate the total amount of error
    //     //for the entire figure.  Also try using circumscribed areas to try and
    //     //handle the fact that the right most inscribed rectangle has a height
    //     //of zero.

    //     //Result
    //     //When starting with equal rectangle widths and only adjusting the
    //     //first handle, there was a global minimum and two local minimums.
    //     //Therefore it is probably best to perform an initial search for the
    //     //approximate location of the global minimum to find the best initial
    //     //guess.  Splitting the x range into equal intervals should be a good
    //     //way to do this.  Next use a different method to iterate in that local
    //     //spot, given that linear search is inefficient.

    //     // __|__|__|__

    //     //For first base point dragger only for now
    //     const errors = [];
    //     const countIncrements = 10;
    //     const xIncrement = chosenWidth / (countIncrements - 1);
    //     for(let i = 0; i < countIncrements; i++) {
    //         // console.log("i =", i);
    //         // const widthsTemp = [...pwidths];
    //         // const xStart = drAdustWidthsTemp.yVariations.x_start;
    //         // const x = xStart + i * xIncrement;
    //         // const iRect1 = 0;
    //         // const iRect2 = iRect1 + 1;

    //         // widthsTemp[iRect1] = x;
    //         // widthsTemp[iRect1] = xLeft;
    //         const xEnd = xStart + chosenWidth;
    //         const rectSides = [xStart, ...draggerXPositions, xEnd];
    //         const x = xStart + i * xIncrement;
    //         rectSides[0+1] = x;

    //         const widths = [];
    //         let hasInvalidHandle = false;
    //         for(let i2 = 0; i2 < rectSides.length-1; i2++) {
    //             const width = rectSides[i2 + 1] - rectSides[i2];
    //             // console.log("width =", width);
    //             const handleInvalid = (width < 0);
    //             // const handleInvalid = (width - sconf.BASE_POINTS_REPELLING_DISTANCE) < 0;
    //             if (handleInvalid && !hasInvalidHandle)
    //                 hasInvalidHandle = handleInvalid;
    //             widths.push(width);
    //         }

    //         const error = calculateTotalErrorTemp(widths);
    //         errors.push({
    //             hasInvalidHandle,
    //             error, 
    //             xFactor: (x - xStart) / chosenWidth,
    //         });
    //         // const rectLeftsTemp = [xStart, ...draggerXPositions];
    //         // const x = xStart + i * xIncrement;
    //         // rectLeftsTemp[0+1] = x;
    //         // errors.push(calculateTotalErrorTemp(rectLeftsTemp));

    //         // const widths = [];
    //         // //The first dragger is on the right side of the first rect and left
    //         // //side of the second.
    //         // for(let i2 = 0; i2 <= rectLeftsTemp.length; i2++) {
    //         //     const xLast = (i2 === -1) ? xStart : draggerXPositions[i2];
                
    //         // }
    //     }

        
    //     for(let i = 1; i < errors.length; i++) {
    //         errors[i].increased = (errors[i].error > errors[i-1].error);
    //     }
    //     console.log("errors =", errors);


    //     let indexMin = null;
    //     let errorMin = null;
    //     for(let i = 0; i < errors.length; i++) {
    //         const errorCurrent = errors[i].error;
    //         if (indexMin == null || errorCurrent < errorMin) {
    //             indexMin = i;
    //             errorMin = errorCurrent;
    //         }
    //     }
    //     console.log("indexMin =", indexMin);
    //     console.log("errorMin =", errorMin);
    //     console.log("valueMin =", errors[indexMin].xFactor);

        

    //     //Need
    //     //-Calculate aobve for a single handle and check what the output looks
    //     // like
    //     //-Function to calcualte total error for figure


    //     // function calculateTotalErrorTemp(rectSides) {
    //     //     //TEMP Note uses circumscribed areas.
    //     //     let sumArea = 0;//, sumWidths = 0;
    //     //     const areas = [];
    //     //     for(let i = 0; i < rectSides.length-1; i++) {
    //     //         const xLeftSide = rectSides[i];
    //     //         const xRightSide = rectSides[i+1];
    //     //         // const xRightSide = (i < rectLefts.length - 1) ?
    //     //         //     rectLefts[i+1] : (xStart + chosenWidth);
    //     //         const width = xRightSide - xLeftSide;

    //     //         // const y = ff(drAdustWidthsTemp, xRightSide);
    //     //         const y = ff(drAdustWidthsTemp, xLeftSide);
    //     //         const height = Math.abs(dv.maxY - y);

    //     //         const area = width * height;
    //     //         areas.push(area);
    //     //         sumArea += area;
    //     //     }
    //     //     const ratios = areas.map(area => area / sumArea);


    //     //     let sumErrorSquared = 0;
    //     //     const countMax = Math.max(ratiosDesired.length, ratios.length);
    //     //     for(let i = 0; i < countMax; i++) {
    //     //         const ratio = ratios[i];
    //     //         const ratioDesired = ratiosDesired[i];
    //     //         const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
    //     //         const errorSquared = errorAbs ** 2;
    //     //         sumErrorSquared += errorSquared;
    //     //     }
    //     //     return sumErrorSquared;
    //     // }

    //     function calculateTotalErrorTemp(widths) {
    //         //TEMP Note uses circumscribed areas.
    //         let sumArea = 0, sumWidths = 0;
    //         const areas = [];
    //         for(let i = 0; i < widths.length; i++) {
    //             const width = widths[i];
    //             const xLeftSide = xStart + sumWidths;
    //             sumWidths += width;
    //             // const xRightSide = xStart + sumWidths;

    //             // const y = ff(drAdustWidthsTemp, xRightSide);
    //             const y = ff(drAdustWidthsTemp, xLeftSide);
    //             const height = Math.abs(dv.maxY - y);

    //             const area = width * height;
    //             areas.push(area);
    //             sumArea += area;
    //         }
    //         const ratios = areas.map(area => area / sumArea);

    //         //TEMP Error scaled.
    //         let sumErrorSquared = 0;
    //         const countMax = Math.max(ratiosDesired.length, ratios.length);
    //         for(let i = 0; i < countMax; i++) {
    //             const ratio = ratios[i];
    //             const ratioDesired = ratiosDesired[i];
    //             const scale = ratiosDesired[i];
    //             const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired) * scale;
    //             const errorSquared = errorAbs ** 2;
    //             //TEMP
    //             const errorSquared2 = errorSquared * (ratio < 0 ? 5 : 1);


    //             sumErrorSquared += errorSquared2;
    //             // sumErrorSquared += errorSquared;
    //         }
    //         return sumErrorSquared;
    //         // return {
    //         //     error: sumErrorSquared,
    //         //     negativeWidth: 
    //         // };


    //         // //TEMP Error in units
    //         // let sumErrorSquared = 0;
    //         // const countMax = Math.max(ratiosDesired.length, ratios.length);
    //         // for(let i = 0; i < countMax; i++) {
    //         //     const area = areas[i];
    //         //     const areaDesired = ratiosDesired[i] * sumArea;

    //         //     const deltaArea = areaDesired - area;
    //         //     const errorAbs = Math.abs(deltaArea) / sumArea;
    //         //     const errorSquared = errorAbs ** 2;
    //         //     //TEMP
    //         //     // const errorSquared2 = errorSquared * ((Math.sign(area) * 1 < 0) ? 50 : 1);
    //         //     sumErrorSquared += errorSquared;//2;


    //         //     // const ratio = ratios[i];
    //         //     // const ratioDesired = ratiosDesired[i];
    //         //     // const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
    //         //     // const errorSquared = errorAbs ** 2;
    //         //     // //TEMP
    //         //     // const errorSquared2 = errorSquared * (ratio < 0 ? 5 : 1);


    //         //     // sumErrorSquared += errorSquared2;
    //         //     // // sumErrorSquared += errorSquared;
    //         // }


    //         // let sumErrorSquared = 0;
    //         // const countMax = Math.max(ratiosDesired.length, ratios.length);
    //         // for(let i = 0; i < countMax; i++) {
    //         //     const ratio = ratios[i];
    //         //     const ratioDesired = ratiosDesired[i];
    //         //     const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
    //         //     const errorSquared = errorAbs ** 2;
    //         //     //TEMP
    //         //     const errorSquared2 = errorSquared * (ratio < 0 ? 5 : 1);


    //         //     sumErrorSquared += errorSquared2;
    //         //     // sumErrorSquared += errorSquared;
    //         // }
    //         // return sumErrorSquared;
    //     }
    // }
























    //TEMP 2025.07.16
    function calculateWidthsTemp3(ratiosDesired, drAdustWidthsTemp) {
        // const heightMinTemp = 0.001;
        const dv = drAdustWidthsTemp.yVariations;
        if (!dv) return;
        const ff = numModel.curveFun;
        const basesN = sconf.basesN;
        const pwidths = [];
        for(let i = 0; i < basesN; i++) {
            if (!drAdustWidthsTemp.partitionWidths[i]) return;
            // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
            pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN); //Equal widths
        }

        const dataMethod1 = {
            widths: [...pwidths],
            widthsLast: [...pwidths],
            sumWidths: 0,
            iterationsConverged: -1,
        };

        const dataMethod2 = {
            widths: [...pwidths],
            widthsLast: [...pwidths],
            sumWidths: 0,
            iterationsConverged: -1,
        };

        console.log("******************************************************************************************");
        console.time("calculateWidths3");
        // for(let iteration = 0; iteration < 100; iteration++) {
        for(let iteration = 0; iteration < 100; iteration++) {
            //TEMP Could calculate values for different methods and compare them.
            console.log("*****iteration =", iteration);
            dataMethod1.sumWidths = 0;
            for(let i = 0; i < basesN - 1; i++) {
                //Temp Method 1
                if (dataMethod1.iterationsConverged < 0) {
                const { sumArea, areas, ratios, errorSquaredAvg } = 
                    calculateAreaDataTemp(dataMethod1.widths);
                    const widthCurrent = dataMethod1.widths[i];
                    const widthNew = widthCurrent * ratiosDesired[i] / ratios[i];
                    dataMethod1.widths[i] = widthNew;
                    dataMethod1.sumWidths += widthNew;
                }


                //Temp Method 2
                if (dataMethod2.iterationsConverged < 0 && i < basesN - 2) {
                    const { sumArea, areas, ratios, errorSquaredAvg } = 
                        calculateAreaDataTemp(dataMethod2.widths);
                    
                    let xLeftSide = drAdustWidthsTemp.yVariations.x_start;
                    for(let i2 = 0; i2 < i; i2++) {
                        xLeftSide += dataMethod2.widths[i2];
                    }

                    const widthC = dataMethod2.widths[i];
                    const yC = ff(drAdustWidthsTemp, xLeftSide + widthC);
                    const heightC = Math.abs(dv.maxY - yC);
                    const areaC = widthC * heightC;

                    const xOffset = drAdustWidthsTemp.yVariations.chosenWidth / 10000;//0.0001;
                    const widthO = widthC + xOffset;
                    const yO = ff(drAdustWidthsTemp, xLeftSide + widthO);
                    const heightO = Math.abs(dv.maxY - yO);
                    const areaO = widthO * heightO;

                    //Rect beside the current one
                    const widthC2 = dataMethod2.widths[i + 1];
                    const yC2 = ff(drAdustWidthsTemp, xLeftSide + widthC + widthC2);
                    const heightC2 = Math.abs(dv.maxY - yC2);
                    const areaC2 = widthC2 * heightC2;
                    
                    const widthO2 = widthC2 - xOffset;
                    const areaO2 = widthO2 * heightC2;


                    const ratioC  = areaC / sumArea;
                    const ratioO  = areaO / sumArea;
                    const ratioC2 = areaC2 / sumArea;
                    const ratioO2 = areaO2 / sumArea;
                    
                    const errorCAbs = Math.abs((ratioC - ratiosDesired[i]) / ratiosDesired[i]);
                    const errorOAbs = Math.abs((ratioO - ratiosDesired[i]) / ratiosDesired[i]);
                    const errorC2Abs = Math.abs((ratioC2 - ratiosDesired[i + 1]) / ratiosDesired[i + 1]);
                    const errorO2Abs = Math.abs((ratioO2 - ratiosDesired[i + 1]) / ratiosDesired[i + 1]);

                    const errorCSquared = errorCAbs ** 2;
                    const errorOSquared = errorOAbs ** 2;
                    const errorC2Squared = errorC2Abs ** 2;
                    const errorO2Squared = errorO2Abs ** 2;

                    //TEMP pairs should be C + C2,  and O + O2
                    const errorBothSquared = errorCSquared + errorC2Squared;
                    const errorBoth2Squared = errorOSquared + errorO2Squared;

                    //Should probably normalize the error in some way eg. divide by sum

                    // const gradient = (errorBothOSquared - errorBothCSquared) / xOffset;//1;
                    const gradient = -(errorBoth2Squared - errorBothSquared) / errorBothSquared;
                    // const gradient2 = -((areaC + areaO) - (areaC2 + areaO2)

                    const desiredAreaR1 = ratiosDesired[i] * sumArea;
                    const desiredAreaR2 = ratiosDesired[i + 1] * sumArea;

                    //const errorAreaR1 = (areaC - desiredAreaR1) / desiredAreaR1;
                    //const errorAreaR2 = (areaO - desiredAreaR2) / desiredAreaR2;
                    //const errorAreaR12 = (areaC2 - desiredAreaR1) / desiredAreaR1;
                    //const errorAreaR22 = (areaO2 - desiredAreaR2) / desiredAreaR2;

                    // const deltaAreaR1 = (areaC - desiredAreaR1);
                    // const deltaAreaR2 = (areaC2 - desiredAreaR2);
                    // const deltaAreaR12 = (areaO - desiredAreaR1);
                    // const deltaAreaR22 = (areaO2 - desiredAreaR2);

                    // const deltaAreaRatio = (Math.abs(deltaAreaR1 / sumArea) + Math.abs(deltaAreaR2 / sumArea));
                    // const deltaAreaRatio2 = (Math.abs(deltaAreaR12 / sumArea) + Math.abs(deltaAreaR22 / sumArea));
                    // const gradient2 = -(deltaAreaRatio - deltaAreaRatio2) / xOffset;

                    const deltaAreaR1 = (areaC - desiredAreaR1);
                    const deltaAreaR2 = (areaC2 - desiredAreaR2);
                    const deltaAreaR12 = (areaO - desiredAreaR1);
                    const deltaAreaR22 = (areaO2 - desiredAreaR2);

                    const deltaAreaBothC = (Math.abs(deltaAreaR1) + Math.abs(deltaAreaR2));
                    const deltaAreaBothO = (Math.abs(deltaAreaR12) + Math.abs(deltaAreaR22));

                    const deltaArea = deltaAreaBothO - deltaAreaBothC;
                    const deltaAreaPerXOffset = deltaArea / xOffset;
                    const deltaXEstimateTemp = deltaAreaBothC / deltaAreaPerXOffset / xOffset;
                    const gradient2 = -deltaArea / xOffset / sumArea;


                    //TEMP
                    const deltaAreaR1PerXOffsetTemp = areaO - areaC;
                    const deltaAreaR1Temp = (desiredAreaR1 - areaC);
                    const deltaWidthEstimateR1Temp = deltaAreaR1Temp / deltaAreaR1PerXOffsetTemp * xOffset;
                    //const errorRatioR1Temp = //How much does changing this afffect the overall error?
                    
                    const deltaAreaR2PerXOffsetTemp = areaO2 - areaC2;
                    const deltaAreaR2Temp = (desiredAreaR2 - areaC2);
                    const deltaWidthEstimateR2Temp = deltaAreaR2Temp / deltaAreaR2PerXOffsetTemp * xOffset;

                    const sumAreasCTemp = areaC + areaC2;
                    const deltaWidthEstimateWeightedTemp = 
                        deltaWidthEstimateR1Temp * areaC / sumAreasCTemp + 
                        deltaWidthEstimateR2Temp * areaC2 / sumAreasCTemp;
                    // const deltaWidthEstimateWeightedTemp = 
                    //     deltaWidthEstimateR1Temp * 1 +
                    //     deltaWidthEstimateR2Temp * 0;
                    const stepCurrent = deltaWidthEstimateWeightedTemp;// * 0.5;

                    const stepDefault = drAdustWidthsTemp.yVariations.chosenWidth / 10;
                    // const stepCurrent = stepDefault * -Math.sign(gradient) * 
                    const stepCurrentOld = stepDefault * gradient2;
                    
                    const widthN = widthC + stepCurrent;
                    const widthN2 = widthC2 - stepCurrent;
                    dataMethod2.widths[i] = widthN;
                    dataMethod2.widths[i + 1] = widthN2;
                    //dataMethod2.sumWidths += widthN;
                }
            }
            //Additional calculations should be performed here (eg. normalize widths)
            //Method 1
            if (dataMethod1.iterationsConverged < 0) {
                const method1AreaData = calculateAreaDataTemp(dataMethod1.widths);
                console.log("method1AreaData.errors before normalizing =", method1AreaData.errors);
                console.log("errorSquaredAvg before normalizing", method1AreaData.errorSquaredAvg);
                console.log("errorAbsAvg before normalizing", method1AreaData.errorAbsAvg);
                console.log("dataMethod1.widths[i] before normalizing =", dataMethod1.widths);
                console.log("sum widths before normalizing =", dataMethod1.widths.reduce((acc, cur) => acc + cur));
                const widthLastRect = dataMethod1.widths[basesN - 1];
                // const sumWidths = pwidths.reduce((acc, cur) => acc + cur) - widthLastRect;
                console.log("drAdustWidthsTemp.yVariations.chosenWidth =", drAdustWidthsTemp.yVariations.chosenWidth);
                
                const ratio = (drAdustWidthsTemp.yVariations.chosenWidth - widthLastRect) / 
                    (dataMethod1.sumWidths);
                console.log("ratio =", ratio);
                for(let i = 0; i < basesN - 1; i++) {
                    dataMethod1.widths[i] *= ratio;
                }
            }

            //Method 2
            // let errorWidthMethod2 = 0;
            // {
            //     const widthLastRect = dataMethod1.widths[basesN - 1];
            //     const chosenWidth = drAdustWidthsTemp.yVariations.chosenWidth;
            //     errorWidthMethod2 = (chosenWidth - (dataMethod2.sumWidths + widthLastRect)) / chosenWidth;
            // }
            const errorSumWidthMethod2 = drAdustWidthsTemp.yVariations.chosenWidth - dataMethod2.widths.reduce((acc, cur) => acc + cur);


            //Values should be output to console here for comparison
            //Method 1
            const changesMethod1 = dataMethod1.widths.map((width, i) => width / dataMethod1.widthsLast[i]);
            console.log("dataMethod1.widths =", dataMethod1.widths);
            console.log("changesMethod1 =", changesMethod1);
            const method1AreaData = calculateAreaDataTemp(dataMethod1.widths);
            console.log("errorSquaredAvg", method1AreaData.errorSquaredAvg);
            console.log("errorAbsAvg", method1AreaData.errorAbsAvg);
            console.log("method1AreaData.errors =", method1AreaData.errors);
            console.log("***");

            //Method 2
            const changesMethod2 = dataMethod2.widths.map((width, i) => width / dataMethod2.widthsLast[i]);
            console.log("dataMethod2.widths =", dataMethod2.widths);
            console.log("changesMethod2 =", changesMethod2);
            console.log("errorSumWidthMethod2 =", errorSumWidthMethod2);
            const method2AreaData = calculateAreaDataTemp(dataMethod2.widths);
            console.log("errorSquaredAvg", method2AreaData.errorSquaredAvg);
            console.log("errorAbsAvg", method2AreaData.errorAbsAvg);


            //Update widthsLast
            if (dataMethod1.iterationsConverged < 0)
                dataMethod1.widthsLast = [...dataMethod1.widths];
            if (dataMethod2.iterationsConverged < 0)
                dataMethod2.widthsLast = [...dataMethod2.widths];


            //Check error
            // let converged = false;
            const errorMaxAbs = 0.01;
            const errorMaxSquared = errorMaxAbs ** 2;
            const converged1 = method1AreaData.errorSquaredAvg < errorMaxSquared;
            if (converged1 && dataMethod1.iterationsConverged < 0) {
                dataMethod1.iterationsConverged = iteration + 1;
                // console.log(`Method 1 converged in ${iteration+1} iterations`);
                // converged = true;
            }
            const converged2 = method2AreaData.errorSquaredAvg < errorMaxSquared;
            if (converged2 && dataMethod2.iterationsConverged < 0) {
                dataMethod2.iterationsConverged = iteration + 1;
                // console.log(`Method 2 converged in ${iteration+1} iterations`);
                // converged = true;
            }
            if (converged1 && converged2)
                break;
            // if (converged)
            //     break;
        }
        console.log(`Method 1 converged in ${dataMethod1.iterationsConverged} iterations`);
        console.log(`Method 2 converged in ${dataMethod2.iterationsConverged} iterations`);
        //Set widths for second figure using specified method
        // drAdustWidthsTemp.partitionWidths = [...dataMethod2.widths];//dataMethod1.widths.map(width => width);
        drAdustWidthsTemp.partitionWidths = [...dataMethod1.widths];//dataMethod1.widths.map(width => width);
        console.timeEnd("calculateWidths3");


        //TEMP Copied from an older version
        function calculateAreaDataTemp(widths) {
            let sumArea = 0, sumWidths2 = 0;
            const areas = [];
            const xStart = drAdustWidthsTemp.yVariations.x_start;
            for(let i = 0; i < basesN; i++) {
                sumWidths2 += widths[i];
                const xRightSide = xStart + sumWidths2;
                const width = widths[i];
                
                const y = ff(drAdustWidthsTemp, xRightSide);
                const height = Math.abs(dv.maxY - y);
                // const height = Math.max(heightMinTemp, Math.abs(dv.maxY - y));

                const area = width * height;
                areas.push(area);
                sumArea += area;
            }
            
            const ratios = areas.map(area => area / sumArea);


            const errors = [];
            let sumErrorAbs = 0;
            let sumErrorSquared = 0;
            const countMax = Math.max(ratiosDesired.length, ratios.length)-1;
            for(let i = 0; i < countMax; i++) {
                const ratio = ratios[i];
                const ratioDesired = ratiosDesired[i];
                const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
                const errorSquared = errorAbs ** 2;
                errors.push({abs: errorAbs, squared: errorSquared});
                sumErrorAbs += errorAbs;
                sumErrorSquared += errorSquared;
            }
            const errorAbsAvg = sumErrorAbs / countMax;
            const errorSquaredAvg = sumErrorSquared / countMax;



            return { sumArea, areas, ratios, errors, errorAbsAvg, errorSquaredAvg };
        }
    }
















//TEMP Similar to one of the older versions that compared to the current width
//however this instead compares to the height.  2025.07.16
function calculateWidthsTemp2(ratiosDesired, drAdustWidthsTemp) {
        // const heightMinTemp = 0.001;
        const dv = drAdustWidthsTemp.yVariations;
        if (!dv) return;
        const ff = numModel.curveFun;
        const basesN = sconf.basesN;
        const pwidths = [];
        for(let i = 0; i < basesN; i++) {
            if (!drAdustWidthsTemp.partitionWidths[i]) return;
            pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
            //pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN);
        }
        console.log("******************************************************************************************");
        console.time("calculateWidths");

        console.log("drAdustWidthsTemp.yVariations.x_start =", drAdustWidthsTemp.yVariations.x_start);
        // for(let iterations = 0; iterations < 10; iterations++) {
        for(let iterations = 0; iterations < 10; iterations++) {
            const { sumArea, areas, ratios } = calculateAreaDataTemp();
            for(let i = 0; i < basesN - 1; i++) {
                console.log(`iterations = ${iterations}  i = ${i}`);

                
                let xLeftSide = drAdustWidthsTemp.yVariations.x_start;
                for(let i2 = 0; i2 < i; i2++) {
                    xLeftSide += pwidths[i2];
                }
                console.log("xLeftSide =", xLeftSide);

                const widthCurrent = pwidths[i];
                const yC = ff(drAdustWidthsTemp, xLeftSide + widthCurrent);
                const heightC = Math.abs(dv.maxY - yC);
                
                const widthNew = ratiosDesired[i] * sumArea / heightC;


                //const widthNew = widthCurrent * ratiosDesired[i] / ratio[i];
                //const widthNew = widthCurrent * ratiosDesired[i] / (widthCurrent * heightCurrent / sumArea);
                //const widthNew = widthCurrent * ratiosDesired[i] / widthCurrent / heightCurrent * sumArea;
                //const widthNew = ratiosDesired[i] / heightCurrent * sumArea;


                pwidths[i] = widthNew;


                const widthLast = pwidths[basesN - 1];
                const sumWidths = pwidths.reduce((acc, cur) => acc + cur) - widthLast;
                
                const ratio = (drAdustWidthsTemp.yVariations.chosenWidth - widthLast) / sumWidths;
                for(let i = 0; i < basesN - 1; i++) {
                    pwidths[i] *= ratio;
                    // console.log(`i = ${i}  pwidths[i] = ${pwidths[i]}`);
                }
                console.log("Check widths temp =", pwidths.reduce((acc, cur) => acc + cur) - drAdustWidthsTemp.yVariations.chosenWidth);
            }
            //Normalize and adjust widths.
            // const ratio = drAdustWidthsTemp.yVariations.chosenWidth / sumWidths;
            // for(let i = 0; i < basesN; i++) {
            //     pwidths[i] *= ratio;
            // }
            // const widthLast = pwidths[basesN - 1];

            // widthAs.push(widthLast);
            // const sumWidthsA = widthAs.reduce((acc, cur) => acc + cur);
            // // const widthAsAdjusted = widthAs.map(width => width / sumWidthsA);
            // console.log("sumWidthsA =", sumWidthsA);
            // widthAs.forEach((width, i) => console.log(`i = ${i}  widthA adjusted = ${width / sumWidthsA * sumWidthsA}`));



            // console.log("sumWidths + widthLast =", sumWidths + widthLast);
            // console.log("drAdustWidthsTemp.yVariations.chosenWidth =", drAdustWidthsTemp.yVariations.chosenWidth);
            // console.log("ratio for widths (sum / chosen) =", (sumWidths + widthLast) / drAdustWidthsTemp.yVariations.chosenWidth);
            // const ratio = (drAdustWidthsTemp.yVariations.chosenWidth - widthLast) / sumWidths;
            // for(let i = 0; i < basesN - 1; i++) {
            //     pwidths[i] *= ratio;
            //     console.log(`i = ${i}  pwidths[i] = ${pwidths[i]}`);
            // }
            const areaData = calculateAreaDataTemp();
            console.log("errors =", areaData.errors);
            console.log("errorAbs =", areaData.errorAbs);
            console.log("errorSquared =", areaData.errorSquared);
            console.log("*****");
        }
        console.timeEnd("calculateWidths");

        //Determine widths
        drAdustWidthsTemp.partitionWidths = pwidths.map(width => width);
        const breakPointTemp = "";


        function calculateAreaDataTemp() {
            let sumArea = 0, sumWidths2 = 0;
            const areas = [];
            const xStart = drAdustWidthsTemp.yVariations.x_start;
            for(let i = 0; i < basesN; i++) {
                sumWidths2 += pwidths[i];
                const xRightSide = xStart + sumWidths2;
                const width = pwidths[i];
                
                const y = ff(drAdustWidthsTemp, xRightSide);
                const height = Math.abs(dv.maxY - y);
                // const height = Math.max(heightMinTemp, Math.abs(dv.maxY - y));

                const area = width * height;
                areas.push(area);
                sumArea += area;
            }
            
            const ratios = areas.map(area => area / sumArea);




            const errors = [];
            let sumErrorAbs = 0;
            let sumErrorSquared = 0;
            const countMax = Math.max(ratiosDesired.length, ratios.length)-1;
            for(let i = 0; i < countMax; i++) {
                const ratio = ratios[i];
                const ratioDesired = ratiosDesired[i];
                const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
                const errorSquared = errorAbs ** 2;
                errors.push({abs: errorAbs, squared: errorSquared});
                sumErrorAbs += errorAbs;
                sumErrorSquared += errorSquared;
            }
            const errorAbs = sumErrorAbs / countMax;
            const errorSquared = sumErrorSquared / countMax;






            return { sumArea, areas, ratios, errors, errorAbs, errorSquared };
        }
    }
















    //TEMP I suppose trying to renormalize after each width update, however doesn't
    //always work correctly 2025.07.14
// function calculateWidthsTemp2(ratiosDesired, drAdustWidthsTemp) {
//         // const heightMinTemp = 0.001;
//         const dv = drAdustWidthsTemp.yVariations;
//         if (!dv) return;
//         const ff = numModel.curveFun;
//         const basesN = sconf.basesN;
//         const pwidths = [];
//         for(let i = 0; i < basesN; i++) {
//             if (!drAdustWidthsTemp.partitionWidths[i]) return;
//             pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
//             //pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN);
//         }
//         console.log("******************************************************************************************");
//         console.time("calculateWidths");

//         console.log("drAdustWidthsTemp.yVariations.x_start =", drAdustWidthsTemp.yVariations.x_start);
//         // for(let iterations = 0; iterations < 10; iterations++) {
//         for(let iterations = 0; iterations < 25; iterations++) {
//             // for(let i = 0; i < basesN; i++) {
//             // let xRightSideTemp = drAdustWidthsTemp.yVariations.x_start;
//             // const widthAs = [];
//             for(let i = 0; i < basesN - 1; i++) {
//                 const { sumArea, areas, ratios } = calculateAreaDataTemp();
//                 console.log(`iterations = ${iterations}  i = ${i}`);

                
//                 let xLeftSide = drAdustWidthsTemp.yVariations.x_start;
//                 for(let i2 = 0; i2 < i; i2++) {
//                     xLeftSide += pwidths[i2];
//                 }
//                 console.log("xLeftSide =", xLeftSide);
                

//                 const widthCurrent = pwidths[i];

//                 const ratioA = ratiosDesired[i] / ratios[i];
//                 const ratioB = ratios[i] / ratiosDesired[i];

//                 const widthA = widthCurrent * ratioA;
//                 const widthB = widthCurrent * ratioB;



//                 //TEMP
//                 const yA = ff(drAdustWidthsTemp, xLeftSide + widthA);
//                 const heightA = Math.abs(dv.maxY - yA);
//                 const areaA = widthA * heightA;
//                 const ratioAreaA = areaA / sumArea;
                
//                 const yB = ff(drAdustWidthsTemp, xLeftSide + widthB);
//                 const heightB = Math.abs(dv.maxY - yB);
//                 const areaB = widthB * heightB;
//                 const ratioAreaB = areaB / sumArea;

//                 console.log("ratioA =", ratioA);
//                 console.log("ratioB =", ratioB);
//                 console.log("ratioAreaA =", ratioAreaA);
//                 console.log("ratioAreaB =", ratioAreaB);
//                 console.log("ratios[i] =", ratios[i]);
//                 console.log("ratiosDesired[i] =", ratiosDesired[i]);


//                 // const areaC = (pwidths[i]) * hC;
//                 // if (areaA > areaC && areaA > areaB) {
//                 //     console.log("A area greater");
//                 // } else if (areaB > areaC && areaB > areaA) {
//                 //     console.log("B area greater");
//                 // } else {
//                 //     console.log("Current area greater");
//                 // }

//                 const errorA = Math.abs(ratiosDesired[i] - ratioAreaA);
//                 const errorB = Math.abs(ratiosDesired[i] - ratioAreaB);

//                 const usingA = true;//errorA < errorB;
//                 console.log("usingA =", usingA);
//                 const widthNew = (usingA ? widthA : widthB);



//                 pwidths[i] = widthNew;//width2R;
//                 //sumWidths += widthNew;//width2R;
//                 // console.log("widthCurrent =", widthCurrent);
//                 // console.log("widthNew =", widthNew);
//                 // widthAs.push(widthA);

//                 //TEMP Try normalizing the widths again




//                 const widthLast = pwidths[basesN - 1];
//                 const sumWidths = pwidths.reduce((acc, cur) => acc + cur) - widthLast;
                
//                 const ratio = (drAdustWidthsTemp.yVariations.chosenWidth - widthLast) / sumWidths;
//                 for(let i = 0; i < basesN - 1; i++) {
//                     pwidths[i] *= ratio;
//                     // console.log(`i = ${i}  pwidths[i] = ${pwidths[i]}`);
//                 }
//                 console.log("Check widths temp =", pwidths.reduce((acc, cur) => acc + cur) - drAdustWidthsTemp.yVariations.chosenWidth);
//             }
//             //Normalize and adjust widths.
//             // const ratio = drAdustWidthsTemp.yVariations.chosenWidth / sumWidths;
//             // for(let i = 0; i < basesN; i++) {
//             //     pwidths[i] *= ratio;
//             // }
//             // const widthLast = pwidths[basesN - 1];

//             // widthAs.push(widthLast);
//             // const sumWidthsA = widthAs.reduce((acc, cur) => acc + cur);
//             // // const widthAsAdjusted = widthAs.map(width => width / sumWidthsA);
//             // console.log("sumWidthsA =", sumWidthsA);
//             // widthAs.forEach((width, i) => console.log(`i = ${i}  widthA adjusted = ${width / sumWidthsA * sumWidthsA}`));



//             // console.log("sumWidths + widthLast =", sumWidths + widthLast);
//             // console.log("drAdustWidthsTemp.yVariations.chosenWidth =", drAdustWidthsTemp.yVariations.chosenWidth);
//             // console.log("ratio for widths (sum / chosen) =", (sumWidths + widthLast) / drAdustWidthsTemp.yVariations.chosenWidth);
//             // const ratio = (drAdustWidthsTemp.yVariations.chosenWidth - widthLast) / sumWidths;
//             // for(let i = 0; i < basesN - 1; i++) {
//             //     pwidths[i] *= ratio;
//             //     console.log(`i = ${i}  pwidths[i] = ${pwidths[i]}`);
//             // }
//             const areaData = calculateAreaDataTemp();
//             console.log("errors =", areaData.errors);
//             console.log("errorAbs =", areaData.errorAbs);
//             console.log("errorSquared =", areaData.errorSquared);
//             console.log("*****");
//         }
//         console.timeEnd("calculateWidths");

//         //Determine widths
//         drAdustWidthsTemp.partitionWidths = pwidths.map(width => width);
//         const breakPointTemp = "";


//         function calculateAreaDataTemp() {
//             let sumArea = 0, sumWidths2 = 0;
//             const areas = [];
//             const xStart = drAdustWidthsTemp.yVariations.x_start;
//             for(let i = 0; i < basesN; i++) {
//                 sumWidths2 += pwidths[i];
//                 const xRightSide = xStart + sumWidths2;
//                 const width = pwidths[i];
                
//                 const y = ff(drAdustWidthsTemp, xRightSide);
//                 const height = Math.abs(dv.maxY - y);
//                 // const height = Math.max(heightMinTemp, Math.abs(dv.maxY - y));

//                 const area = width * height;
//                 areas.push(area);
//                 sumArea += area;
//             }
            
//             const ratios = areas.map(area => area / sumArea);




//             const errors = [];
//             let sumErrorAbs = 0;
//             let sumErrorSquared = 0;
//             const countMax = Math.max(ratiosDesired.length, ratios.length)-1;
//             for(let i = 0; i < countMax; i++) {
//                 const ratio = ratios[i];
//                 const ratioDesired = ratiosDesired[i];
//                 const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
//                 const errorSquared = errorAbs ** 2;
//                 errors.push({abs: errorAbs, squared: errorSquared});
//                 sumErrorAbs += errorAbs;
//                 sumErrorSquared += errorSquared;
//             }
//             const errorAbs = sumErrorAbs / countMax;
//             const errorSquared = sumErrorSquared / countMax;






//             return { sumArea, areas, ratios, errors, errorAbs, errorSquared };
//         }
//     }




    //TEMP DOesn't always converge, has some kind of issue when trying to take into account
    //the correct direction.  2025.07.14
// function calculateWidthsTemp2(ratiosDesired, drAdustWidthsTemp) {
//         // const heightMinTemp = 0.001;
//         const dv = drAdustWidthsTemp.yVariations;
//         if (!dv) return;
//         const ff = numModel.curveFun;
//         const basesN = sconf.basesN;
//         const pwidths = [];
//         for(let i = 0; i < basesN; i++) {
//             if (!drAdustWidthsTemp.partitionWidths[i]) return;
//             // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
//             pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN);
//         }
//         console.log("******************************************************************************************");
//         console.time("calculateWidths");


//         // for(let iterations = 0; iterations < 10; iterations++) {
//         for(let iterations = 0; iterations < 10; iterations++) {
//             const { sumArea, areas, ratios } = calculateAreaDataTemp();
//             let sumWidths = 0;
//             // for(let i = 0; i < basesN; i++) {
//             let xRightSideTemp = drAdustWidthsTemp.yVariations.x_start;
//             const widthAs = [];
//             for(let i = 0; i < basesN - 1; i++) {


//                 xRightSideTemp += pwidths[i];
                
//                 // const yC = ff(drAdustWidthsTemp, xRightSideTemp);
//                 // const hC = Math.abs(dv.maxY - yC);
//                 // const xDelta = 0.0001;
//                 // const yL = ff(drAdustWidthsTemp, xRightSideTemp - xDelta);
//                 // const hL = Math.abs(dv.maxY - yL);
//                 // const yR = ff(drAdustWidthsTemp, xRightSideTemp + xDelta);
//                 // const hR = Math.abs(dv.maxY - yR);
                

//                 console.log(`iterations = ${iterations}  i = ${i}`);
//                 const widthCurrent = pwidths[i];
//                 // const ratioTemp = ratiosDesired[i] / ratios[i];

//                 const ratioA = ratiosDesired[i] / ratios[i];
//                 const ratioB = ratios[i] / ratiosDesired[i];

//                 // const ratio2 = i === (basesN-1) ? 1 : ratiosDesired[i] / ratios[i];//TEMP
//                 const widthA = widthCurrent * ratioA;
//                 const widthB = widthCurrent * ratioB;



//                 //TEMP
//                 const yA = ff(drAdustWidthsTemp, xRightSideTemp - widthCurrent + widthA);
//                 const heightA = Math.abs(dv.maxY - yA);
//                 const areaA = widthA * heightA;
//                 const ratioAreaA = areaA / sumArea;
                
//                 const yB = ff(drAdustWidthsTemp, xRightSideTemp - widthCurrent + widthB);
//                 const heightB = Math.abs(dv.maxY - yB);
//                 const areaB = widthB * heightB;
//                 const ratioAreaB = areaB / sumArea;

//                 console.log("ratioA =", ratioA);
//                 console.log("ratioB =", ratioB);
//                 console.log("ratioAreaA =", ratioAreaA);
//                 console.log("ratioAreaB =", ratioAreaB);
//                 console.log("ratios[i] =", ratios[i]);
//                 console.log("ratiosDesired[i] =", ratiosDesired[i]);


//                 // const areaC = (pwidths[i]) * hC;
//                 // if (areaA > areaC && areaA > areaB) {
//                 //     console.log("A area greater");
//                 // } else if (areaB > areaC && areaB > areaA) {
//                 //     console.log("B area greater");
//                 // } else {
//                 //     console.log("Current area greater");
//                 // }

//                 const errorA = Math.abs(ratiosDesired[i] - ratioAreaA);
//                 const errorB = Math.abs(ratiosDesired[i] - ratioAreaB);

//                 const usingA = errorA < errorB;
//                 console.log("usingA =", usingA);
//                 const widthNew = (usingA ? widthA : widthB);



//                 pwidths[i] = widthNew;//width2R;
//                 sumWidths += widthNew;//width2R;
//                 console.log("widthCurrent =", widthCurrent);
//                 console.log("widthNew =", widthNew);
//                 widthAs.push(widthA);
//             }
//             //Normalize and adjust widths.
//             // const ratio = drAdustWidthsTemp.yVariations.chosenWidth / sumWidths;
//             // for(let i = 0; i < basesN; i++) {
//             //     pwidths[i] *= ratio;
//             // }
//             const widthLast = pwidths[basesN - 1];

//             widthAs.push(widthLast);
//             const sumWidthsA = widthAs.reduce((acc, cur) => acc + cur);
//             // const widthAsAdjusted = widthAs.map(width => width / sumWidthsA);
//             console.log("sumWidthsA =", sumWidthsA);
//             widthAs.forEach((width, i) => console.log(`i = ${i}  widthA adjusted = ${width / sumWidthsA * sumWidthsA}`));



//             console.log("sumWidths + widthLast =", sumWidths + widthLast);
//             console.log("drAdustWidthsTemp.yVariations.chosenWidth =", drAdustWidthsTemp.yVariations.chosenWidth);
//             console.log("ratio for widths (sum / chosen) =", (sumWidths + widthLast) / drAdustWidthsTemp.yVariations.chosenWidth);
//             const ratio = (drAdustWidthsTemp.yVariations.chosenWidth - widthLast) / sumWidths;
//             for(let i = 0; i < basesN - 1; i++) {
//                 pwidths[i] *= ratio;
//                 console.log(`i = ${i}  pwidths[i] = ${pwidths[i]}`);
//             }
//             const areaData = calculateAreaDataTemp();
//             console.log("errors =", areaData.errors);
//             console.log("errorAbs =", areaData.errorAbs);
//             console.log("errorSquared =", areaData.errorSquared);
//             console.log("*****");
//         }
//         console.timeEnd("calculateWidths");

//         //Determine widths
//         drAdustWidthsTemp.partitionWidths = pwidths.map(width => width);
//         // drAdustWidthsTemp.basePts.baseBarsLefts = drAdustWidthsTemp.basePts.baseBarsLefts.map(value => 0);
//         // drAdustWidthsTemp.basePts.baseBarsRights = drAdustWidthsTemp.basePts.baseBarsRights.map(value => 0);
//         // ssF.media_upcreate_generic();
//         // if (!drAdustWidthsTemp.updateTemp) {
//         //     drAdustWidthsTemp.updateTemp = 1;
//         // } else {
//         //     drAdustWidthsTemp.updateTemp++;
//         //     console.log("drAdustWidthsTemp.updateTemp =", drAdustWidthsTemp.updateTemp);
//         //     if (drAdustWidthsTemp.updateTemp === 10) {
//         //         stdMod.model8media_upcreate();
//         //     }
//         // }
//         // const areaData = calculateAreaDataTemp();
//         // console.log("ratiosDesired =", ratiosDesired);
//         // console.log("ratios =", areaData.ratios);
//         // const errors = [];
//         // let sumErrorAbs = 0;
//         // let sumErrorSquared = 0;
//         // const countMax = Math.max(ratiosDesired.length, areaData.ratios.length)-1;
//         // for(let i = 0; i < countMax; i++) {
//         //     const ratio = areaData.ratios[i];
//         //     const ratioDesired = ratiosDesired[i];
//         //     const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
//         //     const errorSquared = errorAbs ** 2;
//         //     errors.push({abs: errorAbs, squared: errorSquared});
//         //     sumErrorAbs += errorAbs;
//         //     sumErrorSquared += errorSquared;
//         // }
//         // const errorAbs = sumErrorAbs / countMax;
//         // const errorSquared = sumErrorSquared / countMax;
        
//         // const areaData = calculateAreaDataTemp();
//         // console.log("errors =", areaData.errors);
//         // console.log("errorAbs =", areaData.errorAbs);
//         // console.log("errorSquared =", areaData.errorSquared);
//         const breakPointTemp = "";


//         function calculateAreaDataTemp() {
//             let sumArea = 0, sumWidths2 = 0;
//             const areas = [];
//             const xStart = drAdustWidthsTemp.yVariations.x_start;
//             for(let i = 0; i < basesN; i++) {
//                 sumWidths2 += pwidths[i];
//                 const xRightSide = xStart + sumWidths2;
//                 const width = pwidths[i];
                
//                 const y = ff(drAdustWidthsTemp, xRightSide);
//                 const height = Math.abs(dv.maxY - y);
//                 // const height = Math.max(heightMinTemp, Math.abs(dv.maxY - y));

//                 const area = width * height;
//                 areas.push(area);
//                 sumArea += area;
//             }
            
//             const ratios = areas.map(area => area / sumArea);




//             const errors = [];
//             let sumErrorAbs = 0;
//             let sumErrorSquared = 0;
//             const countMax = Math.max(ratiosDesired.length, ratios.length)-1;
//             for(let i = 0; i < countMax; i++) {
//                 const ratio = ratios[i];
//                 const ratioDesired = ratiosDesired[i];
//                 const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
//                 const errorSquared = errorAbs ** 2;
//                 errors.push({abs: errorAbs, squared: errorSquared});
//                 sumErrorAbs += errorAbs;
//                 sumErrorSquared += errorSquared;
//             }
//             const errorAbs = sumErrorAbs / countMax;
//             const errorSquared = sumErrorSquared / countMax;






//             return { sumArea, areas, ratios, errors, errorAbs, errorSquared };
//         }
//     }









//     TEMP Draft that overall works pretty good but one main problem is that
//     it always assumes one direction increases area.  2025.07.14
// function calculateWidthsTemp2(ratiosDesired, drAdustWidthsTemp) {
//         // const heightMinTemp = 0.001;
//         const dv = drAdustWidthsTemp.yVariations;
//         if (!dv) return;
//         const ff = numModel.curveFun;
//         const basesN = sconf.basesN;
//         const pwidths = [];
//         for(let i = 0; i < basesN; i++) {
//             if (!drAdustWidthsTemp.partitionWidths[i]) return;
//             // pwidths.push(drAdustWidthsTemp.partitionWidths[i]);//TEMP Commented
//             pwidths.push(drAdustWidthsTemp.yVariations.chosenWidth / basesN);
//         }
//         console.log("******************************");
//         console.time("calculateWidths");


//         for(let iterations = 0; iterations < 10; iterations++) {
//             const { sumArea, areas, ratios } = calculateAreaDataTemp();
//             let sumWidths = 0;
//             // for(let i = 0; i < basesN; i++) {
//             let xRightSideTemp = drAdustWidthsTemp.yVariations.x_start;
//             for(let i = 0; i < basesN - 1; i++) {


//                 xRightSideTemp += pwidths[i];
                
//                 const yC = ff(drAdustWidthsTemp, xRightSideTemp);
//                 const hC = Math.abs(dv.maxY - yC);
//                 const xDelta = 0.0001;
//                 const yL = ff(drAdustWidthsTemp, xRightSideTemp - xDelta);
//                 const hL = Math.abs(dv.maxY - yL);
//                 const yR = ff(drAdustWidthsTemp, xRightSideTemp + xDelta);
//                 const hR = Math.abs(dv.maxY - yR);
//                 //slope = rise / run
//                 //slope = (y2 - y1) / (x2 - x1)
//                 //slope = (yR - yC) / (xR - xC)

                
//                 //slope = (y2 - yC) / (x2 - xC)
//                 //x2 = widthDelta + xC;
//                 //y2 = heightDelta + yC;

//                 //width2 = widthCurrent + widthDelta
//                 //height2 = heightCurrent + heightDelta


                
//                 //slope = (heightDelta + yC - yC) / (widthDelta + xC - xC)
//                 //slope = (heightDelta) / (widthDelta)
//                 //(1)
//                 //slope = (height2 - heightCurrent) / (width2 - widthCurrent)
//                 //slope * (width2 - widthCurrent) = (height2 - heightCurrent)

                


                
//                 //height / width = (y2 - y1) / (x2 - x1)
//                 //height * (x2 - x1) / (y2 - y1) = width
//                 // const height = Math.max(heightMinTemp, Math.abs(dv.maxY - y));

                



//                 //area = width * height;

//                 //areaCurrent = widthCurrent * heightCurrent

//                 //areaDesired = areaCurrent * ratiosDesired[i] / ratios[i]

//                 //areaDesired = width2 * height2
//                 //(2)
//                 //areaDesired / width2 = height2

//                 //sub (2) in (1)
//                 //slope * (width2 - widthCurrent) = (areaDesired / width2 - heightCurrent)
//                 //slope * width2 - slope * widthCurrent = areaDesired / width2 - heightCurrent
//                 //slope * width2 - areaDesired / width2 = slope * widthCurrent - heightCurrent
                
//                 //slope * width2 ** 2 - areaDesired = (slope * widthCurrent - heightCurrent) * width2
//                 //slope * width2 ** 2 - (slope * widthCurrent - heightCurrent) * width2 - areaDesired = 0
//                 //a = slope
//                 //b = -(slope * widthCurrent - heightCurrent);
//                 //c = -areaDesired;

//                 //width2 = (-b - Math.sqrt(b**2 - 4*a*c)) / (2 * a);
//                 //width2 = (-b - Math.sqrt(b**2 - 4*a*c)) / (2 * a);



//                 // const widthCurrent = pwidths[i];
//                 // const y = ff(drAdustWidthsTemp, xRightSide);
//                 // const heightCurrent = Math.abs(dv.maxY - y);
//                 // const areaCurrent = width * height;

//                 // const ratioCurrent = areaCurrent / sumArea;
//                 // const widthDesired = ratiosDesired[i] / ratioCurrent * widthCurrent;

//                 const widthCurrent = pwidths[i];
//                 const ratioTemp = ratiosDesired[i] / ratios[i];
//                 // const ratio2 = i === (basesN-1) ? 1 : ratiosDesired[i] / ratios[i];//TEMP
//                 const width2R = ratioTemp * widthCurrent;
//                 const width2L = widthCurrent / ratioTemp;

//                 //TEMP
//                 const y2R = ff(drAdustWidthsTemp, xRightSideTemp - widthCurrent + width2R);
//                 const height2R = Math.abs(dv.maxY - y2R);
//                 const area2R = width2R * height2R;
//                 const ratio2R = area2R / sumArea;
                
//                 const y2L = ff(drAdustWidthsTemp, xRightSideTemp - widthCurrent + width2L);
//                 const height2L = Math.abs(dv.maxY - y2L);
//                 const area2L = width2L * height2L;
//                 const ratio2L = area2L / sumArea;

//                 const ratiosCurrent = {ratio: ratios[i], ratioDesired: ratiosDesired[i]};

//                 const ratioWidth = width2R / widthCurrent;
//                 const ratioHeight = height2R / hC;
//                 const ratioWidthDivHeight = ratioWidth / ratioHeight;


//                 const areaC = (pwidths[i]) * hC;
//                 const areaL = (pwidths[i] - xDelta) * hL;
//                 const areaR = (pwidths[i] + xDelta) * hR;
//                 if (areaR > areaC && areaR > areaL) {
//                     console.log("Right area greater");
//                 } else if (areaL > areaC && areaL > areaR) {
//                     console.log("Left area greater");
//                 } else {
//                     console.log("Current area greater");
//                 }



//                 pwidths[i] = width2L;//width2R;
//                 sumWidths += width2L;//width2R;
//             }
//             //Normalize and adjust widths.
//             // const ratio = drAdustWidthsTemp.yVariations.chosenWidth / sumWidths;
//             // for(let i = 0; i < basesN; i++) {
//             //     pwidths[i] *= ratio;
//             // }
//             const widthLast = pwidths[basesN - 1];
//             const ratio = (drAdustWidthsTemp.yVariations.chosenWidth - widthLast) / sumWidths;
//             for(let i = 0; i < basesN - 1; i++) {
//                 pwidths[i] *= ratio;
//             }
//         }
//         console.timeEnd("calculateWidths");

//         //Determine widths
//         drAdustWidthsTemp.partitionWidths = pwidths.map(width => width);
//         // drAdustWidthsTemp.basePts.baseBarsLefts = drAdustWidthsTemp.basePts.baseBarsLefts.map(value => 0);
//         // drAdustWidthsTemp.basePts.baseBarsRights = drAdustWidthsTemp.basePts.baseBarsRights.map(value => 0);
//         // ssF.media_upcreate_generic();
//         // if (!drAdustWidthsTemp.updateTemp) {
//         //     drAdustWidthsTemp.updateTemp = 1;
//         // } else {
//         //     drAdustWidthsTemp.updateTemp++;
//         //     console.log("drAdustWidthsTemp.updateTemp =", drAdustWidthsTemp.updateTemp);
//         //     if (drAdustWidthsTemp.updateTemp === 10) {
//         //         stdMod.model8media_upcreate();
//         //     }
//         // }
//         const areaData = calculateAreaDataTemp();
//         // console.log("ratiosDesired =", ratiosDesired);
//         // console.log("ratios =", areaData.ratios);
//         const errors = [];
//         let sumErrorAbs = 0;
//         let sumErrorSquared = 0;
//         const countMax = Math.max(ratiosDesired.length, areaData.ratios.length)-1;
//         for(let i = 0; i < countMax; i++) {
//             const ratio = areaData.ratios[i];
//             const ratioDesired = ratiosDesired[i];
//             const errorAbs = Math.abs((ratio - ratioDesired) / ratioDesired);
//             const errorSquared = errorAbs ** 2;
//             errors.push({abs: errorAbs, squared: errorSquared});
//             sumErrorAbs += errorAbs;
//             sumErrorSquared += errorSquared;
//         }
//         const errorAbs = sumErrorAbs / countMax;
//         const errorSquared = sumErrorSquared / countMax;
//         console.log("errors =", errors);
//         console.log("errorAbs =", errorAbs);
//         console.log("errorSquared =", errorSquared);
//         const breakPointTemp = "";


//         function calculateAreaDataTemp() {
//             let sumArea = 0, sumWidths2 = 0;
//             const areas = [];
//             const xStart = drAdustWidthsTemp.yVariations.x_start;
//             for(let i = 0; i < basesN; i++) {
//                 sumWidths2 += pwidths[i];
//                 const xRightSide = xStart + sumWidths2;
//                 const width = pwidths[i];
                
//                 const y = ff(drAdustWidthsTemp, xRightSide);
//                 const height = Math.abs(dv.maxY - y);
//                 // const height = Math.max(heightMinTemp, Math.abs(dv.maxY - y));

//                 const area = width * height;
//                 areas.push(area);
//                 sumArea += area;
//             }
            
//             const ratios = areas.map(area => area / sumArea);
//             return { sumArea, areas, ratios };
//         }
//     }




    //TEMP Uses a different method, it estimates the widths then normalizes and adjusts them
    //2025.07.10
    // function calculateWidthsTemp2(ratiosDesired, drAdustWidthsTemp) {
    //     // const heightMinTemp = 0.001;
    //     const dv = drAdustWidthsTemp.yVariations;
    //     if (!dv) return;
    //     const ff = numModel.curveFun;
    //     const basesN = sconf.basesN;
    //     const pwidths = [];
    //     for(let i = 0; i < basesN; i++) {
    //     if (!drAdustWidthsTemp.partitionWidths[i]) return;
    //         pwidths.push(drAdustWidthsTemp.partitionWidths[i]);
    //     }
    //     console.time("calculateWidths");


    //     for(let iterations = 0; iterations < 10; iterations++) {
    //         const { sumArea, areas, ratios } = calculateAreaDataTemp();
    //         let sumWidths = 0;
    //         for(let i = 0; i < basesN; i++) {
    //             // const widthCurrent = pwidths[i];
    //             // const y = ff(drAdustWidthsTemp, xRightSide);
    //             // const heightCurrent = Math.abs(dv.maxY - y);
    //             // const areaCurrent = width * height;

    //             // const ratioCurrent = areaCurrent / sumArea;
    //             // const widthDesired = ratiosDesired[i] / ratioCurrent * widthCurrent;
    //             const widthCurrent = pwidths[i];
    //             const ratio2 = i === (basesN-1) ? 1 : ratiosDesired[i] / ratios[i];//TEMP
    //             const widthDesired = ratio2 * widthCurrent;
    //             pwidths[i] = widthDesired;
    //             sumWidths += widthDesired;
    //         }
    //         //Normalize and adjust widths.
    //         const ratio = drAdustWidthsTemp.yVariations.chosenWidth / sumWidths;
    //         for(let i = 0; i < basesN; i++) {
    //             pwidths[i] *= ratio;
    //         }
    //     }
    //     console.timeEnd("calculateWidths");

    //     //Determine widths
    //     drAdustWidthsTemp.partitionWidths = pwidths.map(width => width);
    //     const areaData = calculateAreaDataTemp();
    //     const breakPointTemp = "";


    //     function calculateAreaDataTemp() {
    //         let sumArea = 0, sumWidths2 = 0;
    //         const areas = [];
    //         const xStart = drAdustWidthsTemp.yVariations.x_start;
    //         for(let i = 0; i < basesN; i++) {
    //             sumWidths2 += pwidths[i];
    //             const xRightSide = xStart + sumWidths2;
    //             const width = pwidths[i];
                
    //             const y = ff(drAdustWidthsTemp, xRightSide);
    //             const height = Math.abs(dv.maxY - y);
    //             // const height = Math.max(heightMinTemp, Math.abs(dv.maxY - y));

    //             const area = width * height;
    //             areas.push(area);
    //             sumArea += area;
    //         }
            
    //         const ratios = areas.map(area => area / sumArea);
    //         return { sumArea, areas, ratios };
    //     }
    // }


    


    function calculateWidthsTemp(ratiosDesired, drAdustWidthsTemp) {
        //-Could calculate the current ratios for the second dr and add up the
        //error.  Would probably need the total error (likely abs, squared or
        //similar) and an array with the amounts for each rect.
        //-May be easiest to have an array with the points between the
        //rectangles rather than trying to adjust the partition widths.

        //-In terms of the bar on the right that has zero area or near zero, it
        //may be best to either keep the width the exact same, or look at the
        //entire problem more from the perspective of width rather than area.
        //As in which width is the best.


        //0 __ 1 __ 2 __ 3 __ 4
        //0 - Stays
        //1 - Movable
        //2 - Movable
        //3 - Movable
        //4 - Stays
        //
        //If a movable point moved to the left what affect would that have on
        //the rectangle on both sides?  Could look at the difference in total
        //error between them?


        const ff = numModel.curveFun;
        const basesN = sconf.basesN;
        const pwidths = drAdustWidthsTemp.partitionWidths;
        const dv = drAdustWidthsTemp.yVariations;
        if (!dv) return;


        console.time("calculateWidths");
        var xStart = drAdustWidthsTemp.yVariations.x_start;
        const xValues = [xStart]; //Start with first point
        let sumWidthTemp = 0;
        for (let i = 0; i < basesN; i++) {
            sumWidthTemp += pwidths[i];
            xValues.push(xStart + sumWidthTemp);
        }


        // const step = drAdustWidthsTemp.yVariations.chosenWidth / 10000;
        // for(let iterations = 0; iterations < 10000; iterations++) {
        const step = drAdustWidthsTemp.yVariations.chosenWidth / 1000;// * 3;
        // const step = drAdustWidthsTemp.yVariations.chosenWidth / 1000;
        for(let iterations = 0; iterations < 1; iterations++) {
            const areaData = calculateAreaDataTemp();
            const areaTotal = areaData.sumArea;//calculateAreaTotalTemp();
            // for(let i = 1; i < xValues.length - 1; i++) {
            //TEMP Skip adjusting the last rect for now
            for(let i = 1; i < xValues.length - 1 - 1; i++) {
                const xLeft = xValues[i - 1];
                const xCurrentMinus = xValues[i] - step;
                const xCurrent = xValues[i];
                const xCurrentPlus = xValues[i] + step;
                const xRight = xValues[i + 1];
                
                const yCurrentMinus = ff(drAdustWidthsTemp, xCurrentMinus);
                const yCurrent = ff(drAdustWidthsTemp, xCurrent);
                const yCurrentPlus = ff(drAdustWidthsTemp, xCurrentPlus);
                const yRight = ff(drAdustWidthsTemp, xRight);

                //
                const heghtCurrentMinus = Math.abs(dv.maxY - yCurrentMinus);
                const heghtCurrent      = Math.abs(dv.maxY - yCurrent);
                const heghtCurrentPlus  = Math.abs(dv.maxY - yCurrentPlus);
                const heghtRight        = Math.abs(dv.maxY - yRight);

                const areasRectFirst = {
                    minus   : (xCurrentMinus - xLeft) * heghtCurrentMinus,
                    current : (xCurrent - xLeft) * heghtCurrent,
                    plus    : (xCurrentPlus - xLeft) * heghtCurrentPlus,
                };

                const areasRectSecond = {
                    minus   : (xRight - xCurrentMinus) * heghtRight,
                    current : (xRight - xCurrent) * heghtRight,
                    plus    : (xRight - xCurrentPlus) * heghtRight,
                };

                const ratioDesiredR1 = ratiosDesired[i - 1];
                const ratioR1M = areasRectFirst.minus / areaTotal;
                const ratioR1C = areasRectFirst.current / areaTotal;
                const ratioR1P = areasRectFirst.plus / areaTotal;
                
                const ratioDesiredR2 = ratiosDesired[i];
                const ratioR2M = areasRectSecond.minus / areaTotal;
                const ratioR2C = areasRectSecond.current / areaTotal;
                const ratioR2P = areasRectSecond.plus / areaTotal;
                
                const errorR1M = (ratioR1M - ratioDesiredR1) / ratioDesiredR1;
                const errorR1C = (ratioR1C - ratioDesiredR1) / ratioDesiredR1;
                const errorR1P = (ratioR1P - ratioDesiredR1) / ratioDesiredR1;
                
                const errorR2M = (ratioR2M - ratioDesiredR2) / ratioDesiredR2;
                const errorR2C = (ratioR2C - ratioDesiredR2) / ratioDesiredR2;
                const errorR2P = (ratioR2P - ratioDesiredR2) / ratioDesiredR2;

                const sumErrorMSquared = errorR1M ** 2 + errorR2M ** 2;
                const sumErrorCSquared = errorR1C ** 2 + errorR2C ** 2;
                const sumErrorPSquared = errorR1P ** 2 + errorR2P ** 2;

                //TEMP Changing the step size in this way actually seems to make it converge slower.
                //FOr example suppose there are 3 visible rectangles.
                //If the first rectangle is large and the second thin, the thin one (second) gets the boost
                //and it's right side moves more quickly to the left.  Then later the step size for both get
                //decreased so much that they don't move to the right very quickly.
                const step2 = Math.max(step * 0.1, Math.min(1, Math.abs(errorR1C)) * (3 * step));
                console.log("stepRatioTemp =", step2 / step);

                if (sumErrorMSquared < sumErrorCSquared && sumErrorMSquared < sumErrorPSquared) {
                    const xNew = xCurrent - step2;
                    //Minus best
                    //TEMP Probably best to check for errors (at least for now)
                    if (xNew < xLeft) {
                        xValues[i] = xValues[i] = xLeft + step;
                    } else {
                        xValues[i] = xNew;
                    }
                } else if (sumErrorPSquared < sumErrorCSquared && sumErrorPSquared < sumErrorMSquared) {
                    const xNew = xCurrent + step2;
                    //Plus best
                    //TEMP Probably best to check for errors (at least for now)
                    if (xNew > xRight) {
                        xValues[i] = xValues[i] = xLeft - step;
                    } else {
                        xValues[i] = xNew;
                    }
                }

                //             //TEMP 0.1 should probably be scaled relative to the width of the figure.
                //             if (xNew < xLeft) {
                //                 xValues[i] = xLeft + 0.1;
                //             } else if (xNew > xRight) {
                //                 xValues[i] = xRight - 0.1;
                //             } else {
                //                 xValues[i] = xNew;
                //             }


                // if (sumErrorMSquared < sumErrorCSquared && sumErrorMSquared < sumErrorPSquared) {
                //     //Minus best
                //     //TEMP Probably best to check for errors (at least for now)
                //     if (xCurrentMinus > xLeft)
                //         xValues[i] = xCurrentMinus;
                // } else if (sumErrorPSquared < sumErrorCSquared && sumErrorPSquared < sumErrorMSquared) {
                //     //Plus best
                //     //TEMP Probably best to check for errors (at least for now)
                //     if (xCurrentPlus < xRight)
                //         xValues[i] = xCurrentPlus;
                // }
            }
        }
        console.timeEnd("calculateWidths");

        //Determine widths
        const widthsNew = [];
        for(let i = 1; i < xValues.length; i++) {
            widthsNew.push(xValues[i] - xValues[i - 1]);
        }
        drAdustWidthsTemp.partitionWidths = widthsNew.map(width => width);
        const areaData = calculateAreaDataTemp();
        const breakPointTemp = "";


        function calculateAreaDataTemp() {
            let sumArea = 0;
            const areas = [];
            for(let i = 1; i < xValues.length; i++) {
                const xLeftSide = xValues[i - 1];
                const xRightSide = xValues[i];
                const width = xRightSide - xLeftSide;
                
                const y = ff(drAdustWidthsTemp, xRightSide);
                const height = Math.abs(dv.maxY - y);

                const area = width * height;
                areas.push(area);
                sumArea += area;
            }
            
            const ratios = areas.map(area => area / sumArea);
            return { sumArea, areas, ratios };
        }
    }













    //TEMP Trying to improve performance, by using a variable step size however needs work 2025.07.10
    // function calculateWidthsTemp(ratiosDesired, drAdustWidthsTemp) {
    //     //-Could calculate the current ratios for the second dr and add up the
    //     //error.  Would probably need the total error (likely abs, squared or
    //     //similar) and an array with the amounts for each rect.
    //     //-May be easiest to have an array with the points between the
    //     //rectangles rather than trying to adjust the partition widths.

    //     //-In terms of the bar on the right that has zero area or near zero, it
    //     //may be best to either keep the width the exact same, or look at the
    //     //entire problem more from the perspective of width rather than area.
    //     //As in which width is the best.


    //     //0 __ 1 __ 2 __ 3 __ 4
    //     //0 - Stays
    //     //1 - Movable
    //     //2 - Movable
    //     //3 - Movable
    //     //4 - Stays
    //     //
    //     //If a movable point moved to the left what affect would that have on
    //     //the rectangle on both sides?  Could look at the difference in total
    //     //error between them?


    //     const ff = numModel.curveFun;
    //     const basesN = sconf.basesN;
    //     // const pwidths = drAdustWidthsTemp.partitionWidths;
    //     const pwidths = [];
    //     const dv = drAdustWidthsTemp.yVariations;
    //     if (!dv) return;


    //     console.log("************************************************************");
    //     console.time("calculateWidths");
    //     // var xStart = drAdustWidthsTemp.yVariations.x_start;
    //     // const xValues = [xStart]; //Start with first point
    //     // let sumWidthTemp = 0;
    //     // for (let i = 0; i < basesN; i++) {
    //     //     sumWidthTemp += pwidths[i];
    //     //     xValues.push(xStart + sumWidthTemp);
    //     // }
    //     var xStart = drAdustWidthsTemp.yVariations.x_start;
    //     const xValues = [];//[xStart]; //Start with first point
    //     let sumWidthTemp = drAdustWidthsTemp.yVariations.gapXMax;
    //     for (let i = 0; i < basesN+1; i++) {
    //         xValues.push(xStart + sumWidthTemp * i / basesN );
    //     }


    //     const step = drAdustWidthsTemp.yVariations.chosenWidth / 50;//10000;
    //     for(let iterations = 0; iterations < 200; iterations++) {
    //         const areaData = calculateAreaDataTemp();
    //         const areaTotal = areaData.sumArea;//calculateAreaTotalTemp();
    //         // for(let i = 1; i < xValues.length - 1; i++) {
    //         //TEMP Skip adjusting the last rect for now
    //         let sumErrorTemp = 0;
    //         for(let i = 1; i < xValues.length - 1 - 1; i++) {
    //             const xLeft = xValues[i - 1];
    //             const xCurrentMinus = xValues[i] - step;
    //             const xCurrent = xValues[i];
    //             const xRight = xValues[i + 1];
                
    //             const yCurrentMinus = ff(drAdustWidthsTemp, xCurrentMinus);
    //             const yCurrent = ff(drAdustWidthsTemp, xCurrent);
    //             const yRight = ff(drAdustWidthsTemp, xRight);

    //             //
    //             const heghtCurrentMinus = Math.abs(dv.maxY - yCurrentMinus);
    //             const heghtCurrent      = Math.abs(dv.maxY - yCurrent);
    //             const heghtRight        = Math.abs(dv.maxY - yRight);

    //             const areasRectFirst = {
    //                 minus   : (xCurrentMinus - xLeft) * heghtCurrentMinus,
    //                 current : (xCurrent - xLeft) * heghtCurrent,
    //             };

    //             const areasRectSecond = {
    //                 minus   : (xRight - xCurrentMinus) * heghtRight,
    //                 current : (xRight - xCurrent) * heghtRight,
    //             };

    //             const ratioDesiredR1 = ratiosDesired[i - 1];
    //             const ratioR1M = areasRectFirst.minus / areaTotal;
    //             const ratioR1C = areasRectFirst.current / areaTotal;
                
    //             const ratioDesiredR2 = ratiosDesired[i];
    //             const ratioR2M = areasRectSecond.minus / areaTotal;
    //             const ratioR2C = areasRectSecond.current / areaTotal;
                
    //             const errorR1M = (ratioR1M - ratioDesiredR1) / ratioDesiredR1;
    //             const errorR1C = (ratioR1C - ratioDesiredR1) / ratioDesiredR1;
                
    //             const errorR2M = (ratioR2M - ratioDesiredR2) / ratioDesiredR2;
    //             const errorR2C = (ratioR2C - ratioDesiredR2) / ratioDesiredR2;

    //             const sumErrorMSquared = errorR1M ** 2 + errorR2M ** 2;
    //             const sumErrorCSquared = errorR1C ** 2 + errorR2C ** 2;
    //             sumErrorTemp += Math.abs(errorR1C);//sumErrorCSquared;


    //             const directionDecreasingError = sumErrorMSquared < sumErrorCSquared ? -1 : 1;

    //             const stepAdjusted = step * Math.min(1, Math.abs(errorR1C));
    //             // const stepAdjusted = step * Math.min(1, Math.abs(sumErrorCSquared));
    //             // console.log("stepAdjusted =", stepAdjusted);

    //             let xNew = xCurrent + directionDecreasingError * stepAdjusted;



    //             // //TEMP If height were the same how much should width change?
    //             // //Suppose was 0.5
    //             // //However should be 0.75
    //             // //Then width would need to increase by 0.5 * currentWidth?
    //             // // const deltaWidthEstimate1 = Math.abs((ratioR1C - ratioDesiredR1) / ratioR1C) * (xCurrent - xLeft);
    //             // // const deltaWidthEstimate2 = Math.abs((ratioR2C - ratioDesiredR2) / ratioR2C) * (xRight - xCurrent);
    //             // const deltaWidthEstimate1 = -((ratioR1C - ratioDesiredR1) / ratioR1C) * (xCurrent - xLeft);
    //             // const deltaWidthEstimate2 = -((ratioR2C - ratioDesiredR2) / ratioR2C) * (xRight - xCurrent);
    //             // console.log("deltaWidthEstimate1 =", deltaWidthEstimate1);
    //             // console.log("deltaWidthEstimate2 =", deltaWidthEstimate2);

    //             // const sumRatios = ratioDesiredR1 + ratioDesiredR2;

    //             // const deltaWidthEstAvgTemp = (
    //             //     deltaWidthEstimate1 * ratioDesiredR1 / sumRatios + 
    //             //     deltaWidthEstimate2 * ratioDesiredR2 / sumRatios);
    //             // // xNew = xCurrent + Math.sign(deltaWidthEstAvgTemp) * Math.min(step, Math.abs(deltaWidthEstAvgTemp));
    //             // const stepAdjusted2 = Math.min(step, Math.abs(deltaWidthEstAvgTemp));
    //             // xNew = xCurrent + directionDecreasingError * stepAdjusted2;
    //             // console.log("stepAdjusted2 =", stepAdjusted2);


    //             //TEMP 0.1 should probably be scaled relative to the width of the figure.
    //             if (xNew < xLeft) {
    //                 xValues[i] = xLeft + 0.1;
    //             } else if (xNew > xRight) {
    //                 xValues[i] = xRight - 0.1;
    //             } else {
    //                 xValues[i] = xNew;
    //             }
    //         }
    //         // console.log("*****");
    //         // console.log(sumErrorTemp);
    //     }
    //     console.timeEnd("calculateWidths");

    //     //Determine widths
    //     const widthsNew = [];
    //     for(let i = 1; i < xValues.length; i++) {
    //         widthsNew.push(xValues[i] - xValues[i - 1]);
    //     }
    //     drAdustWidthsTemp.partitionWidths = widthsNew.map(width => width);
    //     const areaData = calculateAreaDataTemp();
    //     const breakPointTemp = "";


    //     function calculateAreaDataTemp() {
    //         let sumArea = 0;
    //         const areas = [];
    //         for(let i = 1; i < xValues.length; i++) {
    //             const xLeftSide = xValues[i - 1];
    //             const xRightSide = xValues[i];
    //             const width = xRightSide - xLeftSide;
                
    //             const y = ff(drAdustWidthsTemp, xRightSide);
    //             const height = Math.abs(dv.maxY - y);

    //             const area = width * height;
    //             areas.push(area);
    //             sumArea += area;
    //         }
            
    //         const ratios = areas.map(area => area / sumArea);
    //         return { sumArea, areas, ratios };
    //     }
    // }





    // // TEMP Seems to work however uses a fixed step size and lacks error checks
    // // 2025.07.10
    // function calculateWidthsTemp(ratiosDesired, drAdustWidthsTemp) {
    //     //-Could calculate the current ratios for the second dr and add up the
    //     //error.  Would probably need the total error (likely abs, squared or
    //     //similar) and an array with the amounts for each rect.
    //     //-May be easiest to have an array with the points between the
    //     //rectangles rather than trying to adjust the partition widths.

    //     //-In terms of the bar on the right that has zero area or near zero, it
    //     //may be best to either keep the width the exact same, or look at the
    //     //entire problem more from the perspective of width rather than area.
    //     //As in which width is the best.


    //     //0 __ 1 __ 2 __ 3 __ 4
    //     //0 - Stays
    //     //1 - Movable
    //     //2 - Movable
    //     //3 - Movable
    //     //4 - Stays
    //     //
    //     //If a movable point moved to the left what affect would that have on
    //     //the rectangle on both sides?  Could look at the difference in total
    //     //error between them?


    //     const ff = numModel.curveFun;
    //     const basesN = sconf.basesN;
    //     const pwidths = drAdustWidthsTemp.partitionWidths;
    //     const dv = drAdustWidthsTemp.yVariations;
    //     if (!dv) return;


    //     console.time("calculateWidths");
    //     var xStart = drAdustWidthsTemp.yVariations.x_start;
    //     const xValues = [xStart]; //Start with first point
    //     let sumWidthTemp = 0;
    //     for (let i = 0; i < basesN; i++) {
    //         sumWidthTemp += pwidths[i];
    //         xValues.push(xStart + sumWidthTemp);
    //     }


    //     // const step = drAdustWidthsTemp.yVariations.chosenWidth / 10000;
    //     // for(let iterations = 0; iterations < 10000; iterations++) {
    //     const step = drAdustWidthsTemp.yVariations.chosenWidth / 1000;
    //     for(let iterations = 0; iterations < 1; iterations++) {
    //         const areaData = calculateAreaDataTemp();
    //         const areaTotal = areaData.sumArea;//calculateAreaTotalTemp();
    //         // for(let i = 1; i < xValues.length - 1; i++) {
    //         //TEMP Skip adjusting the last rect for now
    //         for(let i = 1; i < xValues.length - 1 - 1; i++) {
    //             const xLeft = xValues[i - 1];
    //             const xCurrentMinus = xValues[i] - step;
    //             const xCurrent = xValues[i];
    //             const xCurrentPlus = xValues[i] + step;
    //             const xRight = xValues[i + 1];
                
    //             const yCurrentMinus = ff(drAdustWidthsTemp, xCurrentMinus);
    //             const yCurrent = ff(drAdustWidthsTemp, xCurrent);
    //             const yCurrentPlus = ff(drAdustWidthsTemp, xCurrentPlus);
    //             const yRight = ff(drAdustWidthsTemp, xRight);

    //             //
    //             const heghtCurrentMinus = Math.abs(dv.maxY - yCurrentMinus);
    //             const heghtCurrent      = Math.abs(dv.maxY - yCurrent);
    //             const heghtCurrentPlus  = Math.abs(dv.maxY - yCurrentPlus);
    //             const heghtRight        = Math.abs(dv.maxY - yRight);

    //             const areasRectFirst = {
    //                 minus   : (xCurrentMinus - xLeft) * heghtCurrentMinus,
    //                 current : (xCurrent - xLeft) * heghtCurrent,
    //                 plus    : (xCurrentPlus - xLeft) * heghtCurrentPlus,
    //             };

    //             const areasRectSecond = {
    //                 minus   : (xRight - xCurrentMinus) * heghtRight,
    //                 current : (xRight - xCurrent) * heghtRight,
    //                 plus    : (xRight - xCurrentPlus) * heghtRight,
    //             };

    //             // const areasRectFirst = {
    //             //     minus   : (xCurrentMinus - xLeft) * yCurrentMinus,
    //             //     current : (xCurrent - xLeft) * yCurrent,
    //             //     plus    : (xCurrentPlus - xLeft) * yCurrentPlus,
    //             // };

    //             // const areasRectSecond = {
    //             //     minus   : (xRight - xCurrentMinus) * yRight,
    //             //     current : (xRight - xCurrent) * yRight,
    //             //     plus    : (xRight - xCurrentPlus) * yRight,
    //             // };

    //             const ratioDesiredR1 = ratiosDesired[i - 1];
    //             const ratioR1M = areasRectFirst.minus / areaTotal;
    //             const ratioR1C = areasRectFirst.current / areaTotal;
    //             const ratioR1P = areasRectFirst.plus / areaTotal;
                
    //             const ratioDesiredR2 = ratiosDesired[i];
    //             const ratioR2M = areasRectSecond.minus / areaTotal;
    //             const ratioR2C = areasRectSecond.current / areaTotal;
    //             const ratioR2P = areasRectSecond.plus / areaTotal;
                
    //             const errorR1M = (ratioR1M - ratioDesiredR1) / ratioDesiredR1;
    //             const errorR1C = (ratioR1C - ratioDesiredR1) / ratioDesiredR1;
    //             const errorR1P = (ratioR1P - ratioDesiredR1) / ratioDesiredR1;
                
    //             const errorR2M = (ratioR2M - ratioDesiredR2) / ratioDesiredR2;
    //             const errorR2C = (ratioR2C - ratioDesiredR2) / ratioDesiredR2;
    //             const errorR2P = (ratioR2P - ratioDesiredR2) / ratioDesiredR2;

                
    //             // const ratioDesiredR1 = ratiosDesired[i - 1];
    //             // const errorR1M = (areasRectFirst.minus / areaTotal - ratioDesiredR1) / ratioDesiredR1;
    //             // const errorR1C = (areasRectFirst.current / areaTotal - ratioDesiredR1) / ratioDesiredR1;
    //             // const errorR1P = (areasRectFirst.plus / areaTotal - ratioDesiredR1) / ratioDesiredR1;
                
    //             // const ratioDesiredR2 = ratiosDesired[i];
    //             // const errorR2M = (areasRectSecond.minus / areaTotal - ratioDesiredR2) / ratioDesiredR2;
    //             // const errorR2C = (areasRectSecond.current / areaTotal - ratioDesiredR2) / ratioDesiredR2;
    //             // const errorR2P = (areasRectSecond.plus / areaTotal - ratioDesiredR2) / ratioDesiredR2;

    //             const sumErrorMSquared = errorR1M ** 2 + errorR2M ** 2;
    //             const sumErrorCSquared = errorR1C ** 2 + errorR2C ** 2;
    //             const sumErrorPSquared = errorR1P ** 2 + errorR2P ** 2;

    //             if (sumErrorMSquared < sumErrorCSquared && sumErrorMSquared < sumErrorPSquared) {
    //                 //Minus best
    //                 //TEMP Probably best to check for errors (at least for now)
    //                 if (xCurrentMinus > xLeft)
    //                     xValues[i] = xCurrentMinus;
    //             } else if (sumErrorPSquared < sumErrorCSquared && sumErrorPSquared < sumErrorMSquared) {
    //                 //Plus best
    //                 //TEMP Probably best to check for errors (at least for now)
    //                 if (xCurrentPlus < xRight)
    //                     xValues[i] = xCurrentPlus;
    //             }
    //         }
    //     }
    //     console.timeEnd("calculateWidths");

    //     //Determine widths
    //     const widthsNew = [];
    //     for(let i = 1; i < xValues.length; i++) {
    //         widthsNew.push(xValues[i] - xValues[i - 1]);
    //     }
    //     drAdustWidthsTemp.partitionWidths = widthsNew.map(width => width);
    //     const areaData = calculateAreaDataTemp();
    //     const breakPointTemp = "";


    //     function calculateAreaDataTemp() {
    //         let sumArea = 0;
    //         const areas = [];
    //         for(let i = 1; i < xValues.length; i++) {
    //             const xLeftSide = xValues[i - 1];
    //             const xRightSide = xValues[i];
    //             const width = xRightSide - xLeftSide;
                
    //             const y = ff(drAdustWidthsTemp, xRightSide);
    //             const height = Math.abs(dv.maxY - y);

    //             const area = width * height;
    //             areas.push(area);
    //             sumArea += area;
    //         }
            
    //         const ratios = areas.map(area => area / sumArea);
    //         return { sumArea, areas, ratios };
    //     }
    //     // function calculateAreaTotalTemp() {
    //     //     let sum = 0;
    //     //     for(let i = 1; i < xValues.length - 1; i++) {
    //     //         const xLeftSide = xValues[i - 1];
    //     //         const xRightSide = xValues[i];
    //     //         const width = xRightSide - xLeftSide;
                
    //     //         const y = ff(drAdustWidthsTemp, xRightSide);
    //     //         const height = Math.abs(dv.maxY - y);
    //     //         sum += width * height;
    //     //     }
    //     //     return sum;
    //     // }
    // }




    //TEMP Doesn't really work but good initial experiment.  Initial area calculation
    //seems to work.  2025.07.10
    // function calculateWidthsTemp(ratiosDesired, drAdustWidthsTemp) {
    //     //-Could calculate the current ratios for the second dr and add up the
    //     //error.  Would probably need the total error (likely abs, squared or
    //     //similar) and an array with the amounts for each rect.
    //     //-May be easiest to have an array with the points between the
    //     //rectangles rather than trying to adjust the partition widths.

    //     //-In terms of the bar on the right that has zero area or near zero, it
    //     //may be best to either keep the width the exact same, or look at the
    //     //entire problem more from the perspective of width rather than area.
    //     //As in which width is the best.


    //     //0 __ 1 __ 2 __ 3 __ 4
    //     //0 - Stays
    //     //1 - Movable
    //     //2 - Movable
    //     //3 - Movable
    //     //4 - Stays
    //     //
    //     //If a movable point moved to the left what affect would that have on
    //     //the rectangle on both sides?  Could look at the difference in total
    //     //error between them?



    //     const basesN = sconf.basesN;
    //     const pwidths = drAdustWidthsTemp.partitionWidths;
    //     const dv = drAdustWidthsTemp.yVariations;
    //     if (!dv) return;


    //     const pointsBetween = [];
    //     let sumWidth = 0;
    //     for (let i = 0; i < basesN; i++) {
    //         sumWidth += pwidths[i];
    //         // yOffset = ff(drAdustWidthsTemp, x);
    //         if (i < basesN - 1)
    //             pointsBetween.push(sumWidth);//xOffset);//{x, y});
    //     }




    //     var xStart = drAdustWidthsTemp.yVariations.x_start;
    //     const ff = numModel.curveFun;
    //     let sum = 0;
    //     const areas = [];
    //     for(let ib = 0; ib < basesN; ib++) {
    //         const xRightLocal = (ib < basesN - 1) ? pointsBetween[ib] : sumWidth;
    //         const xLeftLocal = (ib === 0) ? 0 : pointsBetween[ib - 1];
    //         const width = xRightLocal - xLeftLocal;
    //             // pointsBetween[ib] : 
    //             // sumWidth - pointsBetween[basesN - 2];

    //         const y = ff(drAdustWidthsTemp, xStart + xRightLocal);
    //         const height = Math.abs(dv.maxY - y);
    //         const area = width * height;
    //         sum += area;
    //         areas.push(area);
    //     }
    //     //TEMP May be best to check if the areas are calculated correctly at
    //     //this point or not.  Seem ok so far.
    //     // const temp = "breakpoint";

    //     if (sum !== 0) {
    //         const ratios = areas.map(area => area / sum);

    //         const errors = [];
    //         let errorSquared = 0;//let errorTotal = 0;//TEMP Not sum
    //         for(let i = 0; i < basesN; i++) {
    //             //Don't forget divide by zero check (and others throughout the code).
    //             const error = (ratios[i] - ratiosDesired[i]) / ratiosDesired[i];
    //             errors.push(error);
    //             errorSquared += error ** 2;//Math.abs(error);
    //         }
    //         // const temp = "breakpoint";

            
    //         const step = drAdustWidthsTemp.yVariations.chosenWidth / 10000;
    //         //For each rectangle check a point on the left and right of the
    //         //current right side of the rectangle and see which of the three
    //         //is best.

    //         //Note rather than just move the right, maybe the left should be moved as well?
    //         //Otherwise for example, won't the right most rectangle get ignored?
    //         //For now -1 has been added to basesN.
    //         for(let iterations = 0; iterations < 100; iterations++) {
    //             for(let ib = 0; ib < basesN - 1; ib++) {
    //                 const xRightLocal = (ib < basesN - 1) ? pointsBetween[ib] : sumWidth;
    //                 const xLeftLocal = (ib === 0) ? 0 : pointsBetween[ib - 1];

    //                 const xRightLocalLeft = xRightLocal - step;
    //                 const xRightLocalRight = xRightLocal + step;

    //                 const yCurrent = ff(drAdustWidthsTemp, xStart + xRightLocal);
    //                 const yLeft = ff(drAdustWidthsTemp, xStart + xRightLocalLeft);
    //                 const yRight = ff(drAdustWidthsTemp, xStart + xRightLocalRight);

    //                 const areaCurrent = (xRightLocal - xLeftLocal) * Math.abs(dv.maxY - yCurrent);
    //                 const areaLeft = (xRightLocalLeft - xLeftLocal) * Math.abs(dv.maxY - yLeft);
    //                 const areaRight = (xRightLocalRight - xLeftLocal) * Math.abs(dv.maxY - yRight);

    //                 const ratioCurrent = areaCurrent / sum;
    //                 const ratioLeft = areaLeft / sum;
    //                 const ratioRight = areaRight / sum;
                    
    //                 const errorCurrent = (ratioCurrent - ratiosDesired[ib]) / ratiosDesired[ib];
    //                 const errorLeft = (ratioLeft - ratiosDesired[ib]) / ratiosDesired[ib];
    //                 const errorRight = (ratioRight - ratiosDesired[ib]) / ratiosDesired[ib];

    //                 if (errorLeft < errorCurrent && errorLeft < errorRight) {
    //                     pointsBetween[ib] = xRightLocalLeft;
    //                 } else if (errorRight < errorCurrent && errorRight < errorLeft) {
    //                     pointsBetween[ib] = xRightLocalRight;
    //                 }
    //             }
    //         }


    //         const widthsNew = [];
    //         let sum2 = 0;
    //         for (let i = 0; i < pointsBetween.length; i++) {
    //             widthsNew.push(pointsBetween[i] - sum2);
    //             sum2 += pointsBetween[i];
    //         }
    //         widthsNew.push(sumWidth - sum2);
    //         const temp = "breakpoint";
    //     }



    //     // const insYar = [];

    //     // let ff = numModel.curveFun;
    //     // let yRef = drAdustWidthsTemp.yVariations.yRef;
    //     // let dir = drAdustWidthsTemp.yVariations.chchosen.dir;
    //     // for( var ib = 0; ib < basesN; ib++ ) {
    //     //     let ymin = ff(drAdustWidthsTemp, baseBarsLefts[ib]);
    //     //     let ymax = ff(drAdustWidthsTemp, baseBarsRights[ib]);
    //     //     if( dir <=0 ) {
    //     //         let d = ymin;
    //     //         ymin = ymax;
    //     //         ymax = d;
    //     //     }
    //     //     ymax = Math.min(ymax, yRef*0.9999999);
    //     //     if( ymin>=ymax ) {
    //     //         ////otherwise negative heights
    //     //         ////happens at svg
    //     //         ymin = ymax < 0 ? ymax*1.0000001 : ymax * 0.999999;
    //     //     }
    //     //     insYar[ib] = ymax;
    //     // }



    //     // let sum = 0;
    //     // const areas = [];
    //     // for(let ib = 0; ib < basesN; ib++) {
    //     //     const barwidth = pwidths[ib];
    //     //     const height = Math.abs(dv.maxY - insYar[ib]);
    //     //     const area = barwidth * height;
    //     //     sum += area;
    //     //     areas.push(area);
    //     // }

    //     // if (sum !== 0) {
    //     //     const ratios = areas.map(area => area / sum);
    //     //     const widths = calculateWidthsTemp(ratios, dr.drAdustWidthsTemp);
    //     //     const test = 2;
    //     // }
    // }
    //***********************************************
    // \\// auxiliary postprocessing functions
    //***********************************************
    
}) ();
