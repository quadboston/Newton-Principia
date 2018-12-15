// //\\// Simple matrix operations.
//        (c) 2017 Konstantin Kirillov. License MIT.
//        Origin taken from: /var/www/html/bids/done/SMALL/ww/calibrator/now/vendor/btb/matrix.js. Nov. 2014.


( function ( window ) {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );




    /*
        Title:      summ of vectors with weights a,b
        Action:     returns vectors linear combination aA+bB
        Input:
            A,B     - sum of A,B
            a,A     - product aA
            A,b,B   - comb A+bB
            a,A,b,B - comb aA+bB
    */
    mat.sm = function( arg )
    {
        var a = 1;
        var b = 1;
        var B = [0,0];
        var A;
        var ar = arguments;

        if( typeof ar[0] === 'number' ) { 
            a = ar[0]; A = ar[1];
            if( ar.length === 4 ) { b = ar[2]; B = ar[3]; }
        } else {
            A = ar[0];
            if( ar.length === 3 ) {
                b = ar[1];
                B = ar[2];
            } else {
                B = ar[1];
            }
        }
        return [
                    a*A[0]+b*B[0],
                    a*A[1]+b*B[1]
               ];
    }

    /*
    //subtracts vectors
    function mn( A, B ) { return [ A[0] - B[0], A[1] - B[1] ]; }
    */


}) ( window );

