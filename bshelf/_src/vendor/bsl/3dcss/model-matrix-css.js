// this design implements: right-oriented coordinate axes: x,y,z,
// to work in app-model coord. system, not in browser's css coord. system,
// it is different crom "canonical" CSS coordinate system:
// the difference is: axis y is "up"
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web
//
//  axis y: ^
//          |
//          |
//          |
//          |
//          |
//          |
//          o ----------------->  axis x
//
//  axis z is from screen-user:  normZ = [normY, normX] where [] is a vector product
//  right turns matrix blocks are:
//       around z: x' = x * cosA - y * sinA, ...
//       see "rotates_aroundAxisN" below ...         

( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );

    mat.modelMatrix2css = modelMatrix2css;
    return;





    ///input    mx - 3 or 4 dimenstional matrix mx[y][x] in JS indices,
    ///              y - matix column, x - matrix row,
    ///output   4 - dimensional CSS matrix string
    function modelMatrix2css( mx, mxIs3dim )
    {
        const ACCURACY = 10; //sets maximum accuracy of created style sheet
        var str = 'matrix3d( ';
        for(var y = 0; y < 4; y++ ) {
            for(var x = 0; x < 4; x++ ) {

                //this changes direction of axis y
                var sign =      ( x !== y &&

                                    //would be z and y sign changes
                                    //( x === 1 || y === 1 || x === 2 || y === 2 )

                                    //only y sign change
                                    ( x === 1 || y === 1 )
                                )
                            ?
                                -1 : 1
                            ;

                str +=
                        ( mxIs3dim && (x > 2 || y > 2)) ?

                            //only one 4 dimensional element is non zero:
                            //on diagonal
                            (
                                ( x === y ? 1 : 0 )
                            ) 
                        :
                            (
                                (
                                    sign *
                                    //three-dimensional elements are taken
                                    //from original matrix
                                    mx[x][y]  //vital to note: x,y swap comparing to "canonical converter"
                                ).toFixed( ACCURACY )
                            )
                ;
                //no comma added at the end of created string
                str += x === 3 && y === 3 ? '' :',';
            }
        }
        return str + ')';
    }


}) ();


