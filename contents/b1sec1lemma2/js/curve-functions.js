( function() {
    var { sn, fapp, sconf, } = window.b$l.apptree({});

    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var numModel    = sn('numModel', stdL2 );

    Object.assign(study, {
        calculates_microPoints,
    });

    Object.assign(numModel, {
        curveFun,
    });
    return;


    function curveFun(dr, x) {
        //Calculate y value of the curve using linear interpolation.
        const {points, sectionIndices} = dr.curveMicroPts;

        //If not enough points return default value
        if (points.length < 2)
            return 0;

        //If before left bound default to the following
        if (x < points[0][0])
            return points[0][1];

        //Determine which section contains the x value
        for(let i = 0; i < sectionIndices.length; i++) {
            const {indexStart, indexEnd} = sectionIndices[i];
            const xStart = points[indexStart][0];
            const xEnd = points[indexEnd][0];
            const xRange = xEnd - xStart;
            const countSegments = indexEnd - indexStart;

            if (x >= xStart && x < xEnd && xRange > 0 && countSegments > 0) {
                //Section found, determine which line segment contains x.  Note
                //spacing only equal within each section, not between sections.
                const xSpacing = xRange / countSegments;
                const index = indexStart + Math.floor((x - xStart) / xSpacing);
                if (index === indexEnd)
                    return points[indexEnd][1];

                //Interpolate and output y
                const ptL = points[index];
                const ptR = points[index + 1];

                const rise = (ptR[1] - ptL[1]);
                const run  = (ptR[0] - ptL[0]);
                const slope = run <= 0 ? 0 : rise / run;
                const y = ptL[1] + slope * (x - ptL[0]);
                return y;
            }
        }

        //Past right bound or that edge
        return points[points.length - 1][1];
    }



    function calculates_microPoints(dr) {
        //Calculate and store point data (line segments) that approximate the
        //curve for the input datareg.  This code ensures the output is always
        //a function (in a math sense one y value per x value).  The splines
        //used to calculate the curve often yield a relation (more than one y
        //per x) which this "cleans up".

        
        const ptsUntransformed = dr.ctrlPts.untransformed;
        const DRAGGABLE_END_POINTS = dr.ctrlPts.DRAGGABLE_END_POINTS;
        const CURVE_SEGMENTS_APPROXIMATE = sconf.CURVE_SEGMENTS_APPROXIMATE;


        const sorted = copySortAdjustHandlePositions(ptsUntransformed,
            DRAGGABLE_END_POINTS);

        //Approximate line segment spacing for each section.
        const xStart = sorted[0].x;
        const xEnd = sorted[sorted.length - 1].x;
        const spacingApproximate = (xEnd - xStart) / CURVE_SEGMENTS_APPROXIMATE;


        const curveSections = curveSectionsForInterpolation(sorted);


        //Calculate line segments for each section and join them together.
        //This is done section by section to ensure the correct section is
        //always used.  Curve sections often extend horizontally beyond the
        //handles used to create them.  Therefore if points for the entire
        //curve were used, rather than sections, it would often be ambiguous
        //which part should be used.
        const mp = dr.curveMicroPts.points;
        const sectionIndices = dr.curveMicroPts.sectionIndices;
        mp.length = 0;
        sectionIndices.length = 0;

        curveSections.forEach((section, i) => {
            //Only add first handle pos for first section to avoid duplicates
            const points = finalLineSegmentDataForSection(section, (i === 0),
                spacingApproximate);
            if (points) {
                const indexStart = (i === 0 ? 0 : (mp.length - 1));
                mp.push(...points);
                const indexEnd = mp.length - 1;
                sectionIndices.push({indexStart, indexEnd});
            }
        });
        
        //Calculate some figure data
        const fP = dr.figureParams;
        fP.minX = mp[0].x;
        fP.maxX = mp[mp.length - 1].x;
    }



    function copySortAdjustHandlePositions(ptsUntransformed,
        DRAGGABLE_END_POINTS) {
        //Make a copy of the handle positions, sort them by x value, and adjust
        //them to ensure the x values aren't the exact same (ultimately so the
        //curve will only have one y value for each x value).

        // //\\ Copy
        //Copies values rather than references, so modifications won't affect
        //the original.
        let copy = ptsUntransformed.map(p => ({...p}));
        // \\// Copy


        // //\\ Sort
        if (DRAGGABLE_END_POINTS) {
            copy = sortByX(copy);
        } else {
            //Exclude end points from sorting so they can't move by accident.
            const first = copy[0];
            const between = sortByX(copy.slice(1, -1));
            const last = copy[copy.length - 1];
            copy = [first, ...between, last];
        }
        // \\// Sort


        // //\\ Adjust
        const widthOriginal = copy[copy.length - 1].x - copy[0].x;

        //Adjust x values if they are the exact same or very close.
        const spacingMin = 0.01;
        for(let i = 1; i < copy.length; i++) {
            const xMin = copy[i - 1].x + spacingMin;
            //This can break their sorted order therefore check if less than
            //not just equal.
            if (copy[i].x <= xMin)
                copy[i].x = xMin;
        }

        //The above adjustment can result in one or more points moving slightly
        //beyond the right side of the figure.  Therefore scale them to ensure
        //the last x always lines up with that side.
        const widthCopy = copy[copy.length - 1].x - copy[0].x;
        if (widthCopy > 0) {
            const scaleWidth = widthOriginal / widthCopy;
            for(let i = 0; i < copy.length; i++)
                copy[i].x = copy[0].x + (copy[i].x - copy[0].x) * scaleWidth;
        }
        // \\// Adjust

        return copy;


        //Helper function
        function sortByX(array) {
            return array.sort((a, b) => a.x - b.x);
        }
    }



    function curveSectionsForInterpolation(sorted) {
        //Approximate each section of the curve (between and including each
        //pair of handle positions) with points (line segments) that will be
        //used later for interpolation.  Note this is for the exact curve and
        //there can be many y values for each x value.

        //Number of line segments to approximate curve
        const steps = 50;


        //First and last handle points
        const ptFirst = sorted[0];
        const ptLast = sorted[sorted.length - 1];

        const figureWidth = ptLast.x - ptFirst.x;
        const figureHeight = ptLast.y - ptFirst.y;


        //4 points are required to calculate each section (two points for the
        //handles and a point that extends on either side).  To make the curve
        //appear smooth and minimize undesired curves and bends, the following
        //extended points have been chosen.
        const extendedPoints = [
            {x: ptFirst.x - figureWidth * 0.05,
             y: ptFirst.y},
            ...sorted,
            {x: ptLast.x, 
             y: ptLast.y + figureHeight * 0.05}
        ];


        const output = [];

        const countSections = extendedPoints.length - 3;
        for (let i = 0; i < countSections; i++) {
            const section = [];

            //Default points.
            const p0 = {...extendedPoints[i]};
            const p1 = {...extendedPoints[i + 1]};
            const p2 = {...extendedPoints[i + 2]}; 
            const p3 = {...extendedPoints[i + 3]};

            //Adjust extended points as needed
            if (i === 0) {
                //First section
                adjustExtendedPointIfNeeded(p3, p2);
            } else if (i === (countSections - 1)) {
                //Last section
                adjustExtendedPointIfNeeded(p0, p1);
            }

            //Calculate points
            for (let t = 0; t <= steps; t++) {
                const u = t / steps;
                const x = catmullRom(u, p0.x, p1.x, p2.x, p3.x);
                const y = catmullRom(u, p0.y, p1.y, p2.y, p3.y);
                section.push({x, y})
            }

            output.push(section);
        }

        return output;


        function adjustExtendedPointIfNeeded(pAdjust, pOther) {
            //If pAdjust is far from pOther move it closer.  This makes the
            //first and last sections of the curve become more curved when a
            //handle is close to the side of the figure.

            //-Higher distance means more bent
            //-Lower distance means more curved
            //-Very low distance means very straight
            const distMax = Math.hypot(figureWidth, figureHeight) * 0.3;

            const delta = {x: pAdjust.x - pOther.x, y: pAdjust.y - pOther.y};
            const dist = Math.hypot(delta.x, delta.y);

            if (dist > 0 && dist > distMax) {
                //Normalize then adjust
                const n = {x: delta.x / dist, y: delta.y / dist};
                pAdjust.x = pOther.x + n.x * distMax;
                pAdjust.y = pOther.y + n.y * distMax;
            }
        }
    }


    
    function catmullRom(t, p0, p1, p2, p3) {
        //Catmull-Rom spline interpolation for smooth curves
        const t2 = t * t;
        const t3 = t2 * t;
        
        return 0.5 * (
            (2 * p1) +
            (-p0 + p2) * t +
            (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
            (-p0 + 3 * p1 - 3 * p2 + p3) * t3
        );
    }



    function finalLineSegmentDataForSection(section, addFirstHandlePos,
        spacingApproximate) {
        //Calculate the final point data (evenly spaced line segments within
        //the input section) in array format [x, y].  This function ensures
        //there's only one y value for each x value.

        //Not enough points
        if (section.length < 2)
            return null;


        const ptFirst = section[0];
        const ptLast = section[section.length - 1];
        
        const points = [];


        // //\\ First point
        //Only add first handle position if needed
        if (addFirstHandlePos)
            points.push([ptFirst.x, ptFirst.y]);
        // \\// First point


        // //\\ Between points
        const xStart = ptFirst.x;
        const xEnd = ptLast.x;
        const xRange = xEnd - xStart;

        if (spacingApproximate > 0 && xRange > 0) {
            //Use spacingApproximate as a guideline to calculate the following
            const countSegments = Math.floor(xRange / spacingApproximate) + 1;
            const spacing = xRange / countSegments;

            //Index of last line used for interpolation.
            let indexLine = 0;

            //Add one point per segment between handles.
            const countSegmentsBtw = countSegments - 1;
            for (let i = 0; i < countSegmentsBtw; i++) {
                const x = xStart + spacing * (i + 1);
                const data = interpolateY(x, section, indexLine);
                if (!data) {
                    //In the very unlikely event a y value can't be calculated
                    //just skip the remaining points.
                    break;
                }
                
                indexLine = data.indexLine;
                points.push([x, data.y]);
            }
        }
        // \\// Between points


        // //\\ Last point
        //Always add last handle position
        points.push([ptLast.x, ptLast.y]);
        // \\// Last point

        return points;
    }



    function interpolateY(x, section, indexLine) {
        //Interpolate y value for curve in the input section.  For performance
        //start searching at the last checked line, this avoids searching lines
        //that have already been checked previously.

        //Loop through the line segments that approximate the curve and find
        //the one containing the x value.
        while(indexLine < section.length - 1) {
            const ptLeft = section[indexLine];
            const ptRight = section[indexLine + 1];

            const xRange = (ptRight.x - ptLeft.x);
            if (ptLeft.x <= x && x < ptRight.x && xRange > 0) {
                //Found so calculate and output y
                const slope = (ptRight.y - ptLeft.y) / xRange;
                const y = ptLeft.y + slope * (x - ptLeft.x);
                return {y, indexLine};
            } else {
                //Not found so move to next line segment
                indexLine++;
            }
        }

        //No more line segments to check
        return null;
    }
})();