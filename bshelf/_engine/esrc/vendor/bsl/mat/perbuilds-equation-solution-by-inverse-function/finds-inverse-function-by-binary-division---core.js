( function() {
    var {
        sn,
        mat,
    } = window.b$l.nstree();
    var solvesOneDimenstionalEquation = mat.solvesOneDimenstionalEquation =
        sn( 'solvesOneDimenstionalEquation', mat );
    solvesOneDimenstionalEquation.val2between = val2between;
    solvesOneDimenstionalEquation.indMiddle2val = indMiddle2val;
    return;





    ///==================================================
    /// Interpolates values between two nearest array
    /// elements xy[i] and xy[i+1]. Finds nearest to x elements that
    /// x is between them and finds y(x).
    ///==================================================
    function val2between({
        xy, //function y(x) set as pairs in array [e1,e2]
        x,  //"anchor" value of x,
        //By default y=e1, x=e2,
        inv, //inverse pairs, means x=e2, y=e1,
    }){
        var xy          = xy;
        var alen        = xy.length;
        var alen1       = xy.length-1;
        var indMax      = alen - 1;
        var indMin      = 0;

        var frDim       = inv ? 1 : 0;
        var depDim      = frDim ? 0 : 1;

        var xMax        = xy[ alen-1 ][frDim];
        var xMin        = xy[ 0 ][frDim];
        //virtual direction
        var xDir  = xMax - xMin > 0;

        if( xDir === 0 ) {
            return { x, y : xy[0][depDim], indMin : 0, indMax : 0, xMin, xMax,  };
        }
        var xDir  = xDir > 0 ? 1 : -1;

        if( ( xMax - x ) * xDir < 0 ) {
            return { x, y : xy[alen1][depDim], indMin : alen1, indMax : alen1, xMin, xMax,  };
        }
        if( ( xMin - x ) * xDir > 0 ) {
            return {  x, y : xy[0][depDim], indMin : 0, indMax : 0, xMin, xMax,  };
        }

        var count = 0; //todom remove this protector
        while( indMax-indMin > 1 ) {

            /*
            //*********************************************
            // //\\ interpolating algo
            //=============================================
            //this is an alternative to binary division algo,
            //for y = x^5, this ago takes 230 steps vs binary which has only 14
            var frMa = xy[ indMax ][1];
            var frMi = xy[ indMin ][1];
            var scaleY = ( frMa - frMi ) / ( indMax - indMin );
            var indMiddle = scaleY === 0 ? indMin : ( y - frMi ) / scaleY + indMin;
            var { indMin, indMax } = findsContaningInterval(
                                        indMiddle, indMin, indMax, xy );
            if( count++ > 300 ) {
                throw new Error( 'divergent algo' );
            }
            //=============================================
            // \\// interpolating algo
            //*********************************************
            */

            //*********************************************
            // //\\ binary division algo
            //=============================================
            //this is an alternative to interpolating algo
            var binaryMiddle = ( indMax + indMin ) / 2;
            var { indMin, indMax } = findsContaningInterval(
                                        binaryMiddle, indMin, indMax, xy, frDim );
            if( count++ > 200 ) {
                throw new Error( 'divergent algo?' );
            }
            //=============================================
            // //\\ binary division algo
            //*********************************************

            //ccc( { indMin, indMax, count } );
        }

        //final result:
        var frMa = xy[ indMax ][frDim];
        var frMi = xy[ indMin ][frDim];
        if( indMax === indMin  || Math.abs( scaleY ) < 1e-100 ) {
            var y = xy[ indMin ][depDim];
            var indMiddle = indMin;
        } else {
            var scaleY = ( frMa - frMi ) / ( indMax - indMin );
            if( Math.abs( scaleY ) < 1e-100 ) {
                var y = xy[ indMin ][depDim];
                var indMiddle = indMin;
            } else {
                var yMa = xy[ indMax ][depDim];
                var yMi = xy[ indMin ][depDim];
                var scaleX = ( yMa - yMi ) / ( indMax - indMin );
                var y = scaleX * ( x - frMi ) / scaleY + yMi;
                var indMiddle = ( indMax - indMin ) * ( x - frMi ) / scaleY + indMin;
            }
        }
        return { x, y, indMin, indMax, xMin, xMax, indMiddle, count };




        function findsContaningInterval(
            indMiddle, //proposed new position of interval boundary
            indMin,    //current
            indMax,    //current
            xy,        //main array
            frDim,
        ){
            var newMin = Math.floor( indMiddle );
            var newMax = Math.ceil( indMiddle );
            if( ( x - xy[ newMin ][frDim] ) * xDir < 0 ) {
                ////new Min is above x, take it as max
                indMax = newMin;
            } else if( ( x - xy[ newMax ][frDim] ) * xDir > 0 ) {
                ////new Max is below x, take it as min
                indMin = newMax;
            } else {
                ////x is in between grid cell, it can be newMin === newMax,
                indMin = newMin;
                indMax = newMax;
            }
            return { indMin, indMax };
        }

    }





    ///Linearly interpolates values valMin, valMax taken on
    ///two float arguments, indMin and indMax.
    ///If |indMax - indMin| < 1e-150, then returns valMin.
    function indMiddle2val( indMin, indMax, indMiddle, valMin, valMax )
    {
        var delta = indMax - indMin;
        if( Math.abs( delta ) < 1e-150 ) return valMin;
        return ( valMax - valMin ) * ( indMiddle - indMin ) / delta + valMin;
    }


}) ();

