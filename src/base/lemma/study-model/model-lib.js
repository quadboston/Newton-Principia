( function() {
    var {
        ns, sn,
        nspaste, mat, has, haz,
        fconf, sconf,
        rg, toreg,
        ssF, ssD,
        sDomF, sDomN, amode,
        exegs,
        studyMods,
        stdMod,
    } = window.b$l.apptree({
        ssFExportList :
        {
            line2abs,
            linePoints2abs,
            circumscribeCircleOverChordAndBothNormals_XY,
            dropPerpend,
            dropLine,
            dropPoint,
        },
    });
    return;














    ///input:       lineName aka 'AB'
    ///acts:        takes rg-points aka rg.A and rg.B
    ///             and adds to line segment AB values
    ///             abs, abs2, dx, dy
    ///todm         reduce this to "linePoints2abs"
    function line2abs(
        lineName,
        dropPointParam,
        dropPointParam_t, //unitless parameter counted from point A
    ){
        var splitToken = lineName.indexOf( ',' ) > -1 ? ',' : '';
        var points = lineName.split( splitToken );
        var AB = toreg( lineName )();
        var A = rg[ points[0] ].pos;
        var B = rg[ points[1] ].pos;
        var dx = B[0]-A[0];
        var dy = B[1]-A[1];
        var d2 = dx*dx + dy*dy;
        var d = Math.sqrt( d2 );
        AB.abs = d;
        AB.abs2 = d2;
        AB.x = dx;
        AB.y = dy;
        if( Math.abs(d) > 1E-100 ) {
            AB.unitX = dx/d;
            AB.unitY = dy/d;
        } else {
            AB.unitX = 0;
            AB.unitY = 0;
        }
        dropPointParam = dropPointParam_t ?
                            dropPointParam_t * d :
                            (dropPointParam || 0);
        AB.dropX = A[0] + AB.unitX * dropPointParam;
        AB.dropY = A[1] + AB.unitY * dropPointParam;

        AB.angle = Math.atan2( dy, dx );
        return AB;
    }

    function linePoints2abs(
        posA,
        posB,
        dropPointParam, //=t, adds point p=u*t along the line, u is unit vector
                        //    applied to point posA.
    ) {
        var AB = {};
        var dx = posB[0]-posA[0];
        var dy = posB[1]-posA[1];
        var d2 = dx*dx + dy*dy;
        var d = Math.sqrt( d2 );
        AB.abs = d;
        AB.abs2 = d2;
        AB.x = dx;
        AB.y = dy;
        if( Math.abs(d) > 1E-100 ) {
            AB.unitX = dx/d;
            AB.unitY = dy/d;
        } else {
            AB.unitX = 0;
            AB.unitY = 0;
        }
        dropPointParam = dropPointParam || 0;
        AB.dropX = posA[0] + AB.unitX * dropPointParam;
        AB.dropY = posA[1] + AB.unitY * dropPointParam;

        AB.angle = Math.atan2( dy, dx );
        return AB;
    }





    ///given a string XY and registry of points, 
    ///returns function which calculates circum... on points in the string XY,
    function circumscribeCircleOverChordAndBothNormals_XY( rg, XY )
    {
        var splitToken = XY.indexOf( ',' ) > -1 ? ',' : '';
        var points = XY.split( splitToken );
        var points = XY.split('');
        var A = rg[ points[0] ].pos;
        var B = rg[ points[1] ].pos;
        return mat.circumscribeCircleOverChordAndBothNormals( null, A, B );
    }





    //===============================================================
    // //\\ scriptable arguments in string
    //===============================================================
    ///Assigns: "A=B,C,D"
    ///         Draws perpend from B to line CD and assigns pos to A.
    ///         A,B,C,D are registry names.
    function dropPerpend( assigneeTopPoint1Point2_str )
    {
        var assigmentPoints = assigneeTopPoint1Point2_str.split( '=' );
        var points = assigmentPoints[1].split( ',' );
        nspaste(
            rg[ assigmentPoints[0] ].pos,
            mat.dropPerpendicular(
                rg[ points[0] ].pos,
                rg[ points[1] ].pos,
                rg[ points[2] ].pos,
            )
        );
    }

    ///Assigns: "A=scale,C,D,S"
    ///         Arguments are similar to mat.dropLine()
    ///         [,S] is optional
    ///         Draws line segment parallel line CD from point C [or S ] and assigns pos to A.
    ///         Line segment length = scale * length_CD
    ///         A,C,D,S are registry names.
    function dropLine( assigneeScalePoint1Point2_str )
    {
        var assigmentPoints = assigneeScalePoint1Point2_str.split( '=' );
        var operands = assigmentPoints[1].split( ',' );
        nspaste(
            rg[ assigmentPoints[0] ].pos,
            mat.dropLine(
                parseFloat( operands[0] ),
                rg[ operands[1] ].pos,
                rg[ operands[2] ].pos,
                operands[3] && rg[ operands[3] ].pos,
            )
        );
    }

    ///Assigns: "A=B"
    ///          A,B are registry names.
    function dropPoint( operands_str )
    {
        var operands = operands_str.split( '=' );
        nspaste(
            rg[ operands[0] ].pos,
            rg[ operands[1] ].pos,
        );
    }
    //===============================================================
    // \\// scriptable arguments in string
    //===============================================================



}) ();

