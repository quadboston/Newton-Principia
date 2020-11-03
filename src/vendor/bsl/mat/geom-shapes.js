( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );

    mat.circumscribeCircleOverChordAndBothNormals = circumscribeCircleOverChordAndBothNormals;
    return;




    ///used in b1s1l1
    function circumscribeCircleOverChordAndBothNormals( chord, A, B )
    {
        ///if par. chord is missed, chord is set by points A, B
        if( !chord ) {
            chord = [ B[0] - A[0], B[1] - A[1] ]; 
        }
        //this is a norm to chord:
        var norm2 = [ -chord[1], chord[0] ];
        //sum of two vectors gives: norm2*l+chord=AG=[0,G]
        var l=-chord[0]/norm2[0];
        var G = norm2[1]*l + chord[1];
        return [ 0, G ];
    }

}) ();


