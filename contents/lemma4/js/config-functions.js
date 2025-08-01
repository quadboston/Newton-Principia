( function() {
    var { mat, rg, ssD, stdMod, sconf, } = window.b$l.apptree({ stdModExportList : {
        recalculateTransforms,
        xy_2_Txy,
        Txy_2_xy, },
    });
    return;


    //TEMP Filename, functions name, and where they are stored may change
    //TEMP Is the following comment needed here?
    ///parameters are enclosed in closure for performance
    
    // xOutput = xInput * factorI + yInput * factorJHorizontal
    // yOutput = xInput  * 0         + yInput * factorJVertical

    //[horizontalSkew, horizontalScale]
    //[verticalSkew,   verticalScale  ]


    function recalculateTransforms(dr) {
        //Recalculates the matrices that are used to transform points.
        const transforms = dr.transforms;

        //TEMP Should probably explain this function more including what each
        //element in the matrix means.

        //Default transformation matrix
        const T = [[1, 0], [0, 1]];

        //TEMP The following could probably have better error checks.
        const {origin, pts} = transforms;
        if (origin && pts) {
            //Horizontal point
            const ptHorizontal = pts.horizontal;
            if (ptHorizontal) {
                const xOffsetInitial = ptHorizontal.xOffsetInitial;
                if (xOffsetInitial) {//Includes non-zero check
                    const deltaX = ptHorizontal.x - origin[0];
                    T[0][0] = deltaX / xOffsetInitial;
                }
            }
            
            //Vertical point
            const ptVertical = pts.vertical;
            if (ptVertical) {
                const yOffsetInitial = ptVertical.yOffsetInitial;
                if (yOffsetInitial) {//Includes non-zero check
                    const deltaX = ptVertical.x - origin[0];
                    const deltaY = ptVertical.y - origin[1];
                    T[0][1] = deltaX / yOffsetInitial;
                    T[1][1] = deltaY / yOffsetInitial;
                }
            }
        }

        //Set matrix values
        transforms.matrix        = T;
        transforms.matrixInverse = mat.inverse2x2(T);
        const breakPoint = ""; //TEMP
    }



    function xy_2_Txy(dr, pos) {
        return transformPos(dr, pos, dr.transforms.matrix);
    }



    function Txy_2_xy(dr, pos) {
        return transformPos(dr, pos, dr.transforms.matrixInverse);
    }



    function transformPos(dr, pos, matrix) {
        //Translate position relative to the transform origin, 
        //TEMP Should error checks be added to the following?

        //TEMP Should the following be renamed to figureOrigin?
        const origin = dr.transforms.origin;
        if (!origin)
            return pos;

        const posLocal = mat.subV(pos, origin);
        const pos2 = mat.MxV(matrix, posLocal);
        return mat.addV(pos2, origin);
    }
})();