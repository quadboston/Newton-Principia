( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );

    mat.circumscribeCircleOverChordAndBothNormals = circumscribeCircleOverChordAndBothNormals;
    mat.pos2angle = pos2angle;
    return;



    ///Assumptions:
    ///     diameter is paralell to axis x=0,
    ///Returns:
    ///     vector relative to point A.
    function circumscribeCircleOverChordAndBothNormals(
        chord,  //alternative-A-from-AB
        A,      //alternative-A-from-AB
        B,      //alternative-A-from-AB
    ){
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

    ///returns angle from interval [0,2PI),
    ///converts atan2 from interval [-PI,PI] to interval [0,2PI),
    ///when atan2 < 0 returns angle from [0,2PI).
    function pos2angle( pos )
    {
        var t = Math.atan2( pos[1], pos[0] );
        if( t < 0 ) {
            t = 2*Math.PI + t;
        }
        return t;
    }


}) ();


