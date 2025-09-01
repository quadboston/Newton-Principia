( function() {
    var { mat, } = window.b$l.apptree({ stdModExportList : {
        recalculateAndStoreTransforms,
        xy_2_Txy,
        Txy_2_xy,
        calculateFactorAreaTransformed, },
    });
    return;


    function recalculateAndStoreTransforms(dr) {
        //Recalculates and stores matrices used to transform points.
        const transforms = dr.transforms;

        //Handles i, j on the figure can be adjusted to transform it, therefore
        //there needs to be a way to transform any point on the figure.  The
        //initial positions of i and j are stored and their current positions
        //are know, therefore the difference between them can be used to
        //calculate a matrix for this.  Refer to the calculations in the code
        //below for more details.
        //
        // i - controls the horizontal scale
        // j - controls the vertical scale and skew
        // O - Transform Origin
        //
        //                  j____
        // j__             /     |
        // |  \           /      |
        // |   \   -->   /       |
        // |____\       /________|
        // O     i      O        i

        //Default transformation matrix
        const T = [[1, 0], [0, 1]];

        const {origin, pts, isPointIEnabled, isPointJEnabled} = transforms;
        if (origin && pts) {
            const {i, j} = pts;
            //Calculate matrix values using point i if needed
            if (isPointIEnabled && i) {
                const xOffsetInitial = i.xOffsetInitial;
                if (xOffsetInitial) {//Includes non-zero check
                    const xOffsetCurrent = i.x - origin[0];
                    //horizontalScale - How much to scale a point along x axis
                    T[0][0] = xOffsetCurrent / xOffsetInitial;
                }
            }

            //Calculate matrix values using point j if needed
            if (isPointJEnabled && j) {
                const yOffsetInitial = j.yOffsetInitial;
                if (yOffsetInitial) {//Includes non-zero check
                    const xOffsetCurrent = j.x - origin[0];
                    const yOffsetCurrent = j.y - origin[1];
                    //verticalSkew - How much a point should move along x axis
                    //per y coordinate amount
                    T[0][1] = xOffsetCurrent / yOffsetInitial;
                    //verticalScale - How much to scale a point along y axis
                    T[1][1] = yOffsetCurrent / yOffsetInitial;
                }
            }
        }

        //Set matrix data
        transforms.matrix        = T;
        transforms.matrixInverse = mat.inverse2x2(T);
    }



    function xy_2_Txy(dr, pos) {
        return transformPos(dr, pos, dr.transforms.matrix);
    }


    function Txy_2_xy(dr, pos) {
        return transformPos(dr, pos, dr.transforms.matrixInverse);
    }


    function transformPos(dr, pos, matrix) {
        //Transform pos relative to the transform origin.

        const origin = dr.transforms.origin;
        if (!origin)
            return pos;

        const posRelative = mat.subV(pos, origin);
        const posRelativeT = mat.MxV(matrix, posRelative);
        return mat.addV(posRelativeT, origin);
    }



    function calculateFactorAreaTransformed(dr) {
        //Calculate a factor to multiply un-transformed areas by to get the
        //transformed areas.
        //
        //The figure can be approximated by parallelograms, where at the limit
        //the sum of their areas will equal the exact figure area.  Suppose the
        //figure width was reduced by half, the width of all the parallelograms
        //would also be reduced by half, therefore the area of both would also
        //be reduced by half.  Note the same logic also holds true for height.
        //This means if the change in area of a single parallelogram is known,
        //the change in area of the figure is also known.
        //
        //Suppose there is a parallelogram and its bottom left point is at the
        //origin of the transform.  If it starts with a unit area (base = 1,
        //height = 1) calculate its area once transformed.  This represents
        //the change in area of the entire figure.  Note that starting at the
        //origin simplifies the calculation.
        //
        // TL  - Top Left
        // BR  - Bottom right
        // TLT - Top Left Transformed
        // BRT - Bottom Right Transformed
        // O   - Transform Origin
        //
        //                 TLT____
        // TL______          /   /
        //  |      |        /   /
        //  |      |  -->  /   /
        //  |______|      /___/
        //  O       BR   O    BRT

        const matrix = dr.transforms.matrix;

        //Un-transformed
        const base = 1;
        const height = 1;
        const posBR = [base, 0];
        const posTL = [0, height];
        
        //Transformed
        const posBRT = mat.MxV(matrix, posBR);
        const posTLT = mat.MxV(matrix, posTL);
        const baseT = posBRT[0];
        const heightT = posTLT[1];

        //Ensure output is always positive, in case the figure is flipped.
        return Math.abs(baseT * heightT);
    }
})();