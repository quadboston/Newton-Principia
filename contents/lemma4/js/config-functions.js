( function() {
    var { mat, } = window.b$l.apptree({ stdModExportList : {
        recalculateTransforms,
        xy_2_Txy,
        Txy_2_xy,
        calculateFactorAreaTransformed, },
    });
    return;


    //TEMP Filename, functions name, and where they are stored may change
    //TEMP Is the following comment needed here?
    ///parameters are enclosed in closure for performance
    
    // xOutput = xInput * factorI + yInput * factorJHorizontal
    // yOutput = xInput  * 0         + yInput * factorJVertical

    //TEMP Are the following labeled backwards (skew and scale)?
    //[horizontalSkew, horizontalScale]
    //[verticalSkew,   verticalScale  ]




    //TEMP Should this be renamed to one of the following or similar?...
    //"recalculateTransformsAndStore"
    //"recalculateAndStoreTransforms"
    function recalculateTransforms(dr) {
        //Recalculates and stores matrices used to transform points.
        const transforms = dr.transforms;

        //TEMP Should probably explain this function more including what each
        //element in the matrix means.

        //TEMP Maybe they should be labeled i, j?
        //
        //The figure can be transformed using transform points where...
        //-point i controls the horizontal scale
        //-point j controls the vertical scale and skew
        //
        //                  j____
        // j__             /     |
        // |  \           /      |
        // |   \   -->   /       |
        // |____\       /________|
        // O     i      O        i
        //
        //TEMP Should O be explained (transform origin)?
        //
        //The initial positions of these points are stored, therefore their
        //current positions can be used to calculate the transform.
        //
        //TEMP Add more details
        //
        //The transform matrix is described by...
        //TEMP May be better if comments are moved to the actual calculations
        //below?
        //[horizontalScale, verticalSkew ]
        //[horizontalSkew,  verticalScale]
        //
        //TEMP
        //verticalSkew - I suppose this is how much a point should be moved
        //               along the x axis, per y coordinate amount?

        //Default transformation matrix
        const T = [[1, 0], [0, 1]];

        //TEMP The following could probably have better error checks.
        //The comments should be improved for the following, perhaps added to
        //an explanation above.
        const {origin, pts} = transforms;
        if (origin && pts) {
            //TEMP
            //Horizontal point
            //////Calculates horizontal scale relat (controls horizontal scale)

            ////Calculate horizontal scale by comparing the 
            ////Calculate horizontal scale.
            //Calculate horizontal scale.
            const ptHorizontal = pts.horizontal;
            if (ptHorizontal) {
                const xOffsetInitial = ptHorizontal.xOffsetInitial;
                if (xOffsetInitial) {//Includes non-zero check
                    const deltaX = ptHorizontal.x - origin[0];
                    T[0][0] = deltaX / xOffsetInitial;  //horizontalScale
                }
            }
            
            //TEMP
            ////Vertical point
            //////Calculate the vertical scale and skew.
            //Calculate the vertical scale and skew using point j.
            const ptVertical = pts.vertical;
            if (ptVertical) {
                const yOffsetInitial = ptVertical.yOffsetInitial;
                if (yOffsetInitial) {//Includes non-zero check
                    const deltaX = ptVertical.x - origin[0];
                    const deltaY = ptVertical.y - origin[1];
                    //TEMP The calculations work, however double check they are
                    //what's labeled.  Otherwise label them differently.
                    T[0][1] = deltaX / yOffsetInitial;  //verticalSkew
                    T[1][1] = deltaY / yOffsetInitial;  //verticalScale
                }
            }
        }

        //Set matrix data
        transforms.matrix        = T;
        transforms.matrixInverse = mat.inverse2x2(T);
        // const breakPoint = ""; //TEMP
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