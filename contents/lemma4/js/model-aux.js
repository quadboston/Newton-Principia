( function () {
    var { sn, mat, fapp, stdMod, sconf, } = window.b$l.apptree({});


    var stdL2       = sn('stdL2', fapp );
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );

    Object.assign( study,
    {
        calculatesMajorantRect,
        calcsMonotIntervalArea,
        calculates_inscr8circums,
        calculateCurve2Temp, //TEMP
        constrainCurveAtSidesTemp, //TEMP
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
        curveFunOldTemp,//TEMP
    });
    //==================================
    // \\// exports methods
    //==================================
    return;

    
    //***********************************************
    // //\\  auxiliary prepprocessing functions
    //***********************************************
    // function curveFun2Temp(dr, x) {
    //     const positions = dr.ctrlPts.positions;
    //     const ptFirst = positions[0];
    //     const ptLast = positions[positions.length - 1];

    //     const slope = (ptLast.y - ptFirst.y) / (ptLast.x - ptFirst.x);
    //     // const deltaX = ptLast.x - x;
    //     const y = ptLast.y - slope * (ptLast.x - x);
    //     // const y = 
    //     return y;
    // }

    function createCurveSegments2(dr) {
        //TEMP
        //Outputs a list of points that approximate the curve as line segments.

        const steps = 50;
        //
        //TEMP May want to create a generic function for this that can be used
        //throughout the project.  I believe most of the project is mainly
        //interested in the first and last points.  For L4 they never change,
        //however I believe they can for L2/3.  Therefore sorting them for all
        //those models could probably work fine, and the check to ensure they
        //don't pass the end points could be when a handle attempts to move.
        //There is something similar to this that needs to be finalized.
        const points = [...dr.ctrlPts.positions].sort((a, b) => a.x - b.x);


        const ptFirst = points[0];
        const ptLast = points[points.length - 1];


        const figureWidth = ptLast.x - ptFirst.x;
        //TEMP Think about how the height might change for L2/L3
        const figureHeight = ptLast.y - ptFirst.y;


        //TEMP Add comment for the following
        const extendedPoints = [
            {x: ptFirst.x - figureWidth * 0.05,
             y: ptFirst.y + figureHeight * 0},
            ...points,
            {x: ptLast.x - figureWidth * 0, 
            //TEMP Think about how the height might change for L2/L3
             y: ptLast.y + figureHeight * 0.05}
        ];

        const distanceMax = Math.hypot(figureWidth, figureHeight) * 0.25;


        const output = [];

        //TEMP Maybe the last one should be added to ensure it's exact?
        //Calculate curve line segments
        for (let i = 0; i < extendedPoints.length - 3; i++) {
            const p0 = {...extendedPoints[i]};
            const p1 = {...extendedPoints[i + 1]};
            const p2 = {...extendedPoints[i + 2]}; 
            const p3 = {...extendedPoints[i + 3]};

            const adjustExtendedPointsTemp =
                document.getElementById("checkbox-extended-points")?.checked;
            if (adjustExtendedPointsTemp) {
                // //if i === 0 and p3 too far from p2
                if (i === 0) {
                    const delta = {x: p3.x - p2.x, y: p3.y- p2.y};
                    const distance = Math.hypot(delta.x, delta.y);
                    if (distance > distanceMax) {
                        const n = {x: delta.x / distance, y: delta.y / distance};
                        p3.x = p2.x + n.x * distanceMax;
                        p3.y = p2.y + n.y * distanceMax;
                    }
                }
                // //if i === 1 and p1 too far from p2
                if (i === 2) {
                    const delta = {x: p0.x - p1.x, y: p0.y - p1.y};
                    const distance = Math.hypot(delta.x, delta.y);
                    if (distance > distanceMax) {
                        const n = {x: delta.x / distance, y: delta.y / distance};
                        p0.x = p1.x + n.x * distanceMax;
                        p0.y = p1.y + n.y * distanceMax;
                    }
                }
            }


            //Skip first point unless just starting to avoid duplicates
            const t0 = (i === 0 ? 0 : 1);
            for (let t = t0; t <= steps; t++) {
                const u = t / steps;
                const x = catmullRom2(u,
                    p0.x, p1.x, p2.x, p3.x
                    // extendedPoints[i].x, 
                    // extendedPoints[i + 1].x, 
                    // extendedPoints[i + 2].x, 
                    // extendedPoints[i + 3].x
                );
                const y = catmullRom2(u,
                    p0.y, p1.y, p2.y, p3.y
                    // extendedPoints[i].y,
                    // extendedPoints[i + 1].y,
                    // extendedPoints[i + 2].y,
                    // extendedPoints[i + 3].y
                );
                
                output.push({x, y})
            }
        }

        return output;
    }


    // Catmull-Rom spline interpolation for smooth curves
    function catmullRom2(t, p0, p1, p2, p3) {
        const t2 = t * t;
        const t3 = t2 * t;
        
        return 0.5 * (
            (2 * p1) +
            (-p0 + p2) * t +
            (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
            (-p0 + 3 * p1 - 3 * p2 + p3) * t3
        );
    }


    function calculateCurve2Temp(dr) {
        console.time("calculateCurve2Temp");
        // function createCurveSegments2() {
        //TEMP Ensure this is the correct number, should it really be +1?
        //Eg. if there are 4 line segments, there should be 5 points.
        // const steps = sconf.BASE_MAX_NUM;
        const segments = sconf.BASE_MAX_NUM;
        const output = [];

        const curveSegments = createCurveSegments2(dr);


        //TEMP May need to change the following
        if (curveSegments.length < 2)
        // if (curveSegments.length === 0)
            return null;

        //TEMP
        //Could first and last points be backwards sometimes?  I suppose it
        //depends on how the array gets created.  Therefore should probably
        //ensure it starts from left to right in that function.
        const ptFirst = curveSegments[0];
        const ptLast = curveSegments[curveSegments.length - 1];
        const xRange = ptLast.x - ptFirst.x;

        //Add the first point
        output.push({...curveSegments[0]});

        // for(let i = 0; i < curveSegments.length - 1; i++) {
        //     const ptA = curveSegments[i-1];
        //     const ptB = curveSegments[i];
        // }
        let indexLeft = 0;
        //TEMP
        //Skip the first and last points.
        //0  1  2  3  4
        for (let i = 1; i < segments; i++) {
            const x = ptFirst.x + xRange * i / segments;


            while(indexLeft < curveSegments.length - 1) {
                let xRight = curveSegments[indexLeft + 1].x;

                if (xRight >= x) {
                    const ptLeft = curveSegments[indexLeft];
                    const ptRight = curveSegments[indexLeft + 1];
                    const slope = (ptRight.y - ptLeft.y) / (ptRight.x - ptLeft.x);
                    const y = ptLeft.y + slope * (x - ptLeft.x);
                    output.push({x, y});
                    break;
                } else {
                    indexLeft++;
                }
            }
        }
        
        //Add the last point
        output.push({...curveSegments[curveSegments.length - 1]});
        console.timeEnd("calculateCurve2Temp");

        return output;
    }


    function constrainCurveAtSidesTemp(points) {
        //90 is vertical
        // const angleDeg = 85;
        const angleDeg =
            parseFloat(document.getElementById("input-slope-sides").value);
        
        const ptFirst = points[0];
        const ptLast = points[points.length - 1];
        // const xRange = ptLast.x - ptFirst.x;

        const slope = Math.tan(mat.degToRad(angleDeg));

        return points.map((pt) => {
            const x = pt.x;

            const yMin = ptLast.y  + slope * (x - ptLast.x);
            const yMax = ptFirst.y + slope * (x - ptFirst.x);
            const y = Math.max(Math.min(pt.y, yMax), yMin);
            return {x, y};
        });
    }


    function curveFun(dr, x) {



        const ptFirst = dr.curveMicroPts[0];
        const ptLast = dr.curveMicroPts[dr.curveMicroPts.length - 1];
        const xRange = ptLast[0] - ptFirst[0];

        const len = dr.curveMicroPts.length;
        // const x = ptFirst.x + xRange * i / (len - 1);

        //x - ptFirst.x = xRange * i / (len - 1);
        //(x - ptFirst.x) * (len - 1) / xRange = i;

        const indexLeft = Math.floor((x - ptFirst[0]) * (len - 1) / xRange);
        // console.log("indexLeft =", indexLeft);
        if (indexLeft >= 0 && indexLeft < dr.curveMicroPts.length - 1) {
            const ptLeft = dr.curveMicroPts[indexLeft];
            const ptRight = dr.curveMicroPts[indexLeft + 1];
            
            // // const xLeftCalculated = ptFirst[0] + xRange * (indexLeft) / (len - 1);
            // // const xRightCalculated = ptFirst[0] + xRange * (indexLeft + 1) / (len - 1);

            // // console.log(`errorX = ${xLeftCalculated - ptLeft[0]}  ` +
            // //             `errorY = ${xRightCalculated - ptRight[0]}`);

            // if (x >= ptLeft[0] && x <= ptRight[0]) {
                const slope = (ptRight[1] - ptLeft[1]) / (ptRight[0] - ptLeft[0]);
                const y = ptLeft[1] + slope * (x - ptLeft[0]);
                return y;//[x, y];
            // // } else{
            // //     console.error("Problem with indexLeft");
            // }
        }



        // //TEMP To interpolate positions
        // for(let i = 0; i < dr.curveMicroPts.length - 1; i++) {
        //     const ptLeft = dr.curveMicroPts[i];
        //     const ptRight = dr.curveMicroPts[i + 1];

        //     if (x >= ptLeft[0] && x <= ptRight[0]) {
        //         const slope = (ptRight[1] - ptLeft[1]) / (ptRight[0] - ptLeft[0]);
        //         const y = ptLeft[1] + slope * (x - ptLeft[0]);
        //         return y;//[x, y];
        //     }
        // }

        if (x < dr.curveMicroPts[0][0]) {
            return dr.curveMicroPts[0][1];//[...dr.curveMicroPts[0]];
        } else {
            return dr.curveMicroPts[dr.curveMicroPts.length - 1][1];
            // return [...dr.curveMicroPts[dr.curveMicroPts.length - 1]];
        }
    }

    // function curveFun(dr, x) {
    //     //TEMP To interpolate positions
    //     for(let i = 0; i < dr.curveMicroPts.length - 1; i++) {
    //         const ptLeft = dr.curveMicroPts[i];
    //         const ptRight = dr.curveMicroPts[i + 1];

    //         if (x >= ptLeft[0] && x <= ptRight[0]) {
    //             const slope = (ptRight[1] - ptLeft[1]) / (ptRight[0] - ptLeft[0]);
    //             const y = ptLeft[1] + slope * (x - ptLeft[0]);
    //             return y;//[x, y];
    //         }
    //     }

    //     if (x < dr.curveMicroPts[0][0]) {
    //         return dr.curveMicroPts[0][1];//[...dr.curveMicroPts[0]];
    //     } else {
    //         return dr.curveMicroPts[dr.curveMicroPts.length - 1][1];
    //         // return [...dr.curveMicroPts[dr.curveMicroPts.length - 1]];
    //     }
    // }






    function curveStraightLineTemp(x, ptFirst, ptLast) {
        // const positions = dr.ctrlPts.positions;
        // const ptFirst = positions[0];
        // const ptLast = positions[positions.length - 1];

        const slope = (ptLast.y - ptFirst.y) / (ptLast.x - ptFirst.x);
        // const deltaX = ptLast.x - x;
        const y = ptLast.y - slope * (ptLast.x - x);
        // const y = 
        return y;
    }


    function curveFunOldTemp(dr, x) {
    // function curveFun(dr, x) {
        // return curveFun2Temp(dr, x);
        //TEMP Needs to be improved
        // const points = dr.ctrlPts.positions;
        const pointsBtw = [];
        for(let i = 1; i < dr.ctrlPts.positions.length-1; i++) {
            pointsBtw.push({...dr.ctrlPts.positions[i]});
        }
        pointsBtw.sort((a, b) => a.x - b.x);

        const points = [
            {...dr.ctrlPts.positions[0]},
            ...pointsBtw,
            {...dr.ctrlPts.positions[dr.ctrlPts.positions.length - 1]},
        ];
        // points.push({...dr.ctrlPts.positions[0]});
        // points.push(
        //     {...dr.ctrlPts.positions[dr.ctrlPts.positions.length - 1]});

        // const output = [];

        // // For smooth curve, we need to handle endpoints specially
        // const extendedPoints = [
        //     {x: points[0].x - (points[1].x - points[0].x), y: points[0].y - (points[1].y - points[0].y)},
        //     ...points,
        //     {x: points[points.length-1].x + (points[points.length-1].x - points[points.length-2].x), 
        //         y: points[points.length-1].y + (points[points.length-1].y - points[points.length-2].y)}
        // ];

        const figureWidth = points.at(-1).x - points.at(0).x;
        const figureHeight = points.at(-1).y - points.at(0).y;

        // const factor = 0.05;
        
        // //Seems pretty good overall when 2 handles
        // const extendedPoints = [
        //     {x: points[0].x - figureWidth * 0.05,
        //         y: points[0].y + figureHeight * 0.05},
        //     ...points,
        //     {x: points.at(-1).x - figureWidth * 0.4, 
        //         y: points.at(-1).y + figureHeight * 0.4}
        // ];



        // const extendedPoints = [
        //     {x: points[0].x - figureWidth * 0.2,
        //         y: points[0].y + figureHeight * 0},
        //     ...points,
        //     {x: points.at(-1).x - figureWidth * 0, 
        //         y: points.at(-1).y + figureHeight * 0.4}
        // ];

        const extendedPoints = [
            {x: points[0].x - figureWidth * 0.05,
                y: points[0].y + figureHeight * 0},
            ...points,
            {x: points.at(-1).x - figureWidth * 0, 
                y: points.at(-1).y + figureHeight * 0.05}
        ];



        //Determine which control points x is between.
        const i2MinTemp = 1;
        const i2MaxTemp = points.length - 1 - 1;
        let i2 = i2MaxTemp;//points.length - 1 - 1;
        for (let i = i2MinTemp; i <= i2MaxTemp; i++) {
        // for (let i = 1; i < extendedPoints.length-1; i++) {
            const point1 = extendedPoints[i];
            const point2 = extendedPoints[i + 1];

            if (x >= point1.x && x <= point2.x) {
                // const deltaX = (point2.x - point1.x);
                // const deltaY = (point2.y - point1.y);
                // const t = (x - point1.x) / deltaX;
                // // const x = point1.x + deltaX * t;
                // const y = point1.y + deltaY * t;
                // return y;
                i2 = i - 1;
                break;
            }
        }

        if (i2 > points.length - 1 - 1)
            console.error(`i2 out of bounds temp.  i2 = ${i2}  x = ${x}`);
            // console.error("i2 out of bounds temp.  i2 =", i2);

        // //TEMP Test that makes the last part of the curve a straight line.
        // if (i2 >= 2)
        //     return curveStraightLineTemp(x, extendedPoints[i2 + 1],
        //                                     extendedPoints[i2 + 2]);
        
        // //TEMP Test that makes the last part of the curve a horizontal line
        // if (i2 >= 2)
        //     return extendedPoints[i2 + 2].y;

        //TEMP
        if (x === extendedPoints[i2 + 1 + 1].x)
            return extendedPoints[i2 + 1 + 1].y;

        let uMin = 0;
        let uMax = 1;
        let uBest = null;
        // for(let i = 0; i < 15; i++) {
        for(let i = 0; i < 30; i++) {
            const uMid = (uMin + uMax) / 2;
            const x2 = catmullRom(uMid, 
                extendedPoints[i2].x, 
                extendedPoints[i2 + 1].x, 
                extendedPoints[i2 + 2].x, 
                extendedPoints[i2 + 3].x
            );
            // const y2 = catmullRom(uMid,
            //     extendedPoints[i2].y,
            //     extendedPoints[i2 + 1].y,
            //     extendedPoints[i2 + 2].y,
            //     extendedPoints[i2 + 3].y
            // );
            if (x2 < x)
                uMin = uMid;
            else
                uMax = uMid;
            uBest = uMid;
        }

        const y = catmullRom(uBest,
            extendedPoints[i2].y,
            extendedPoints[i2 + 1].y,
            extendedPoints[i2 + 2].y,
            extendedPoints[i2 + 3].y
        );

        return y;
        
        // const steps = 50;
        // for (let t = 0; t <= steps; t++) {
        //     const u = t / steps;
        //     const x = catmullRom(u, 
        //         extendedPoints[i].x, 
        //         extendedPoints[i + 1].x, 
        //         extendedPoints[i + 2].x, 
        //         extendedPoints[i + 3].x
        //     );
        //     const y = catmullRom(u,
        //         extendedPoints[i].y,
        //         extendedPoints[i + 1].y,
        //         extendedPoints[i + 2].y,
        //         extendedPoints[i + 3].y
        //     );
            
        //     // if (t === steps)
        //     //     output.push({
        //     //         x: extendedPoints[i + 2].x,
        //     //         y: extendedPoints[i + 2].y,
        //     //     })
        //     // else if (i === 0 || t > 0)
        //     //     output.push({x, y})
        //     if (i === 0 || t > 0)
        //         output.push({x, y})
        // }
    }



    // function curveFun(dr, x) {
    //     //TEMP A simple but inefficient and unfinished way to calculate the
    //     //y value of the function.
    //     const curvePointsTemp = createCurveSegments(dr);

    //     for (let i = 0; i < curvePointsTemp.length-1; i++) {
    //         const point1 = curvePointsTemp[i];
    //         const point2 = curvePointsTemp[i + 1];

    //         if (x >= point1.x && x <= point2.x) {
    //             const deltaX = (point2.x - point1.x);
    //             const deltaY = (point2.y - point1.y);
    //             const t = (x - point1.x) / deltaX;
    //             // const x = point1.x + deltaX * t;
    //             const y = point1.y + deltaY * t;
    //             return y;
    //         }
    //     }

    //     const breakPointTemp = "";
    //     //TEMP Just use the last point for now
    //     const point = curvePointsTemp.at(-1);
    //     // const x = curvePointsTemp.at(-1).x;
    //     // const y = curvePointsTemp.at(-1).y;
    //     console.error("curveFun x not found using last point.  x - xLast =", x - point.x);
    //     return point.y;
    //     // return null;
    // }

    //Creates array with all points on curve
    function createCurveSegments(dr) {
        const points = dr.ctrlPts.positions;

        const output = [];

        // For smooth curve, we need to handle endpoints specially
        const extendedPoints = [
            {x: points[0].x - (points[1].x - points[0].x), y: points[0].y - (points[1].y - points[0].y)},
            ...points,
            {x: points[points.length-1].x + (points[points.length-1].x - points[points.length-2].x), 
                y: points[points.length-1].y + (points[points.length-1].y - points[points.length-2].y)}
        ];
        
        // Draw curve segments
        for (let i = 0; i < points.length - 1; i++) {
            const steps = 50;
            for (let t = 0; t <= steps; t++) {
                const u = t / steps;
                const x = catmullRom(u, 
                    extendedPoints[i].x, 
                    extendedPoints[i + 1].x, 
                    extendedPoints[i + 2].x, 
                    extendedPoints[i + 3].x
                );
                const y = catmullRom(u,
                    extendedPoints[i].y,
                    extendedPoints[i + 1].y,
                    extendedPoints[i + 2].y,
                    extendedPoints[i + 3].y
                );
                
                // if (t === steps)
                //     output.push({
                //         x: extendedPoints[i + 2].x,
                //         y: extendedPoints[i + 2].y,
                //     })
                // else if (i === 0 || t > 0)
                //     output.push({x, y})
                if (i === 0 || t > 0)
                    output.push({x, y})
            }
        }

        return output;
    }
        
    // Catmull-Rom spline interpolation for smooth curves
    // function catmullRom(t, p0, p1, p2, p3) {
    //     const t2 = t * t;
    //     const t3 = t2 * t;
        
    //     return 0.5 * (
    //         (2 * p1) +
    //         (-p0 + p2) * t +
    //         (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    //         (-p0 + 3 * p1 - 3 * p2 + p3) * t3
    //     );
    // }

    function catmullRom(t, p0, p1, p2, p3, tension = 0) {
        const t2 = t * t;
        const t3 = t2 * t;

        // Tangent scaling (tau = 0 → standard Catmull-Rom)
        const s = (1 - tension) / 2;

        const m1 = s * (p2 - p0);
        const m2 = s * (p3 - p1);

        const a = 2*t3 - 3*t2 + 1;
        const b = t3 - 2*t2 + t;
        const c = -2*t3 + 3*t2;
        const d = t3 - t2;

        return a*p1 + b*m1 + c*p2 + d*m2;
    }







    //TEMP Should the following be combined into one function?
    //Un-transformed positions
    function findCtrlPtPosWithMaxX(dr) {
        //TEMP Double check browser compatibility for toSorted, at etc.
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
        //TEMP Is the following used outside of this function?
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
                //TEMP Would this calculate most y values twice?  Eg. rect 1
                //left and right, then rect2's left side is the same as rect 1.
                //Previously with the old handles the function was expensive to
                //call and likely still will be with the new handles.
                //Therefore storing the previous value or similar would
                //probably improve performance.
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
        outputImportantDataForFiguresTemp(dr);

        //Automatically adjust rectangle widths in the specified datareg to
        //match the ratio of areas in dr if needed.
        if (dr.drAdjustRectWidthsToMatchAreaRatios) {
            const drOther = dr.drAdjustRectWidthsToMatchAreaRatios;

            //TEMP It may be possible to combine the following with the above.
            //GIven that they use slightly different methods, use whatever
            //method works best for both.
            //Calculate data for ratio of areas.
            let sumAreaIns = 0;
            const areasIns = [];
            for(let ib = 0; ib < basesN; ib++) {
                const barwidth = pwidths[ib];
                const heightIns = Math.abs(dv.maxY - insYar[ib]);
                const areaIns = barwidth * heightIns;
                areasIns.push(areaIns);
                sumAreaIns += areaIns;
            }

            if (sumAreaIns !== 0) {
                const ratiosIns = areasIns.map(area => area / sumAreaIns);
                const widthLastRect = pwidths[basesN-1];
                
                //Calculate new widths and update them if successful
                const widths = calculateRectWidthsToMatchAreaRatios(drOther,
                    ratiosIns, widthLastRect);
                if (widths)
                    //TEMP Confirm if this is the correct place for this
                    drOther.partitionWidths = widths;
            }
        }
    }



    function outputImportantDataForFiguresTemp(dr) {
        //TEMP Output important data for the figures, that's similar to
        //what will be displayed in the data tables later.
        if (dr.drAdjustRectWidthsToMatchAreaRatios) {
            console.log("**********Transformed Areas**********");
        } else {
            let dv = dr.yVariations;
            const drL = stdL2.datareg;
            const drR = stdL2.datareg2;

            //Factors to multiply un-transformed areas by to get transformed
            //areas, see the function that calculates them for more detail.
            const areaFactorA = stdMod.calculateFactorAreaTransformed(drL);
            const areaFactorB = stdMod.calculateFactorAreaTransformed(drR);
            // console.log("areaFactorA =", areaFactorA);
            // console.log("areaFactorB =", areaFactorB);

            const exactA = drL.figureArea * areaFactorA;
            const exactB = drR.figureArea * areaFactorB;
            const sumA = drL.areaIns * areaFactorA;
            const sumB = drR.areaIns * areaFactorB;

            console.log("exactA =", exactA);
            console.log("exactB =", exactB);
            console.log("sumA =", sumA);
            console.log("sumB =", sumB);


            const areasL = [];
            for(let ib = 0; ib < sconf.basesN; ib++) {
                const barwidth = drL.partitionWidths[ib];
                const heightIns = Math.abs(dv.maxY - drL.basePts.inscribedY[ib]);
                const areaIns = barwidth * heightIns * areaFactorA;
                areasL.push(areaIns);
            }

            const areasR = [];
            for(let ib = 0; ib < sconf.basesN; ib++) {
                const barwidth = drR.partitionWidths[ib];
                const heightIns = Math.abs(dv.maxY - drR.basePts.inscribedY[ib]);
                const areaIns = barwidth * heightIns * areaFactorB;
                areasR.push(areaIns);
            }
            console.log("(all)   A_i =", areasL);
            console.log("(all)   B_i =", areasR);

            const areaRatios = [];
            for(let i = 0; i < sconf.basesN - 1; i++)
                areaRatios.push(areasL[i] / areasR[i]);
            console.log("exact_ratio = exactA / exactB =", exactA / exactB);
            console.log("sum_ratio = sumA / sumB =", sumA / sumB);
            console.log("(for all i)   i_ratio = A_i / B_i =", areaRatios);
        }
    }



    function calculateRectWidthsToMatchAreaRatios(dr, ratios, widthLastRect) {
        //Calculate rectangle widths for the input datareg, so that the ratio
        //of each of their areas (inscribed rectangle area divide by sum of
        //inscribed rectangle areas) match the input ratios.

        //TEMP Should probably mention something about jumping in this
        //function, as there are some comments that reference it.

        //TEMP The following will need to be adjusted.
        //TEMP Should probably use points that are reliable even if the figure
        //is non-monotonic to prevent issues.  Also probably shouldn't
        //calculate if a figure is non-monotonic or similar.
        //Maybe using hte below values is fine as long as there is a monotonic
        //check?
        //Uses the Newton
        //Raphson method (using approximate slope for the derivative).
        const dv = dr.yVariations;
        if (!dv) return;
        
        //TEMP
        const isMonotonicTemp = dv.changes.length <= 1;
        if (!isMonotonicTemp) return;
        
        //Useful values
        const ff = numModel.curveFun;
        const yVariations = dr.yVariations;
        //TEMP Given that the following can have issues when non-monotonic,
        //should it be adjuted to use eg. the curve control point positions?
        //There is the temporary monotonic check above of course, however it
        //may not be enough.
        const xStart = yVariations.x_start;
        const chosenWidth = yVariations.chosenWidth;
        const xEnd = xStart + chosenWidth;

        const figureArea = dr.figureArea;
    
        //TEMP
        {
            const x = 548;
            const y = ff(dr, x);
            console.log(`x = ${x}  y = ${y}`);
        }
        {
            const x = 547.999;
            const y = ff(dr, x);
            console.log(`x = ${x}  y = ${y}`);
        }



        //Bounds to constrain the scale.
        const scaleMin = 0.01, scaleMax = 1;

        //TEMP May want to rename
        //
        const errorTolerance = 0.001;

        //**********TEMP Newton Raphson Method**********
        const dataNewtonRaphson = solveUsingNewtonRaphson();
        if (dataNewtonRaphson)
            console.log(`Newton Raphson  Converged iterations =`,
                dataNewtonRaphson.iteration);
        else
            console.log(`Newton Raphson  Didn't converge`);
        //**********TEMP Newton Raphson Method**********/
        

        // //TEMP Bisection
        // const dataBisection = solveUsingBisection();
        // if (dataBisection)
        //     console.log(`Bisection  Converged iterations =`,
        //         dataBisection.iteration);
        // else
        //     console.log(`Bisection  Didn't converge`);
        let dataBisection = null;

        //TEMP Data for the plots
        const dataLSTemp = [];
        for(let scale = scaleMin; scale <= scaleMax; scale += 0.001) {
            const widthDataCurrent = calculateWidthData(scale);
            const error = widthDataCurrent.sumWidth - chosenWidth;
            dataLSTemp.push({scale, error});
        }





        let widthDataChosen = null;
        let scaleChosen = null;
        //TEMP Only use Newton Raphson when lots of rectangles.
        //I believe there's a comment (in that function) that mentions why
        //there's more than one root finding algorithm, as well as some details
        //on why it makes sense to switch between them.  Perhaps it would be
        //best to move some of those details here?
        if (dataNewtonRaphson && sconf.basesN > 40) {
            widthDataChosen = dataNewtonRaphson.widthData;
            scaleChosen = dataNewtonRaphson.scale;
            console.log('Using Newton Raphson solution');
        // } else if (dataBisection) {
        } else {
            //TEMP Bisection
            dataBisection = solveUsingBisection();
            if (dataBisection)
                console.log(`Bisection  Converged iterations =`,
                    dataBisection.iteration);
            else
                console.log(`Bisection  Didn't converge`);

            if (dataBisection) {
                widthDataChosen = dataBisection.widthData;
                scaleChosen = dataBisection.scale;
                console.log('Using Bisection solution');
            // }
            } else {
                //TEMP
                //Solution not found (unlikely to happen).
                return null;
            }
        }

        console.log("Scale Newton Raphson", dataNewtonRaphson ? dataNewtonRaphson.scale : "N/A");
        console.log("Scale Bisection", dataBisection ? dataBisection.scale : "N/A");

        //Reverse widths so in correct order.
        const widths = widthDataChosen.widthsReversed.reverse();
        //Scale to ensure fills figure base (mainly for the very unlikely event
        //that the above didn't converge closely enough).
        const scaleWidth = chosenWidth / widthDataChosen.sumWidth;
        const outputTemp = widths.map(width => width * scaleWidth);
        
        
        //TEMP Plots and interface with other settings
        createTempPlotsAndInterfaceIfNeeded();
        //TEMP Plots//

        return outputTemp;



        function calculateWidthData(scale) {
            //TEMP If this can output null then adjust anywhere this is called.

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
            widthsReversed.push(widthLastRect);
            sumWidth += widthLastRect;
            let xRight = xEnd - widthLastRect;
            
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



        function solveUsingNewtonRaphson() {
            //Use the Newton Raphson method to find a root of the mathmatic
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
                    const widthDataOffset =
                        calculateWidthData(scale - offset);
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
                const errorRelative = widthData.sumWidth / chosenWidth - 1;
                if (Math.abs(errorRelative) < errorTolerance)
                    return {scale, widthData, iteration};
            }

            //Didn't converge
            return null;
        }


        function solveUsingBisection() {
            //Use the Bisection method to find a root of the mathmatic function
            //created by calculateWidthData().  This method slow but very
            //reliable at finding a root, even when the function isn't very
            //straight (eg. has one or more local minimums).  It works best
            //when the number of bases is low.

            //Lower and upper bound of interval.
            let scaleL = scaleMin;
            let scaleU = scaleMax;

            //Constrain max iteration to prevent eg. infinite loop
            for(let iteration = 0; iteration < 20; iteration++) {
                //Calculate new scale for midpoint
                const scale = (scaleL + scaleU) / 2;

                //Update width data and interval.
                const widthData = calculateWidthData(scale);
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




        function rangeFigureChanged(event) {
            renderCanvasFigureTemp2(parseFloat(event.target.value, false));
        }

        function renderCanvasFigureTemp2(scale, updateRangeValue) {
            // console.log("scale =", scale);
            const range = document.getElementById("range-figure");
            if(updateRangeValue && range)
                range.value = scaleChosen.toString();
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
                    // '<p>After checking/unchecking one of the following checkboxes, click a curve handle to refresh the curves.</p>' +
                    '<p>After changing one of the following settings, click a curve handle to refresh the curves.</p>' +
                    '<div>' +
                    '    <input type="checkbox" id="checkbox-constrain-sides"/>' +
                    '    <label for="checkbox-constrain-sides">Constrain curve at sides - Slope angle of line (degrees)</label>' + // - Prevents the curve from passing sloped lines on both sides of the figure.</label>' +
                    '    <input type="number" id="input-slope-sides" value="85" min="45" max="89"/>' +
                    '</div>' +
                    // '<div>' +
                    // '    <label for="input-slope-sides">Slope on sides</label>' +
                    // '    <input type="number" id="input-slope-sides" value="85" min="45" max="89"/>' +
                    // '</div>' +
                    '<div>' +
                    '    <input type="checkbox" id="checkbox-extended-points"/>' +
                    '    <label for="checkbox-extended-points">Adjust points used to generate curve</label>' +// - Makes the curve appear more round when handle 1 and/or 2 is close to the side of the figure, and they are far apart.</label>' +
                    '</div>' +
                    '<br>' +
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
    //***********************************************
    // \\// auxiliary postprocessing functions
    //***********************************************
    
}) ();
