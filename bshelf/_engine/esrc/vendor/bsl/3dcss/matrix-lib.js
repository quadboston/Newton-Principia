
( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );
    mat.rotates_aroundAxisN = rotates_aroundAxisN;
    return;






    //=========================================================
    // //\\ returns matrix or rotation around axis n
    //      , apparently CSS x,y,z is right and
    //      z is towards user and y is down the screen
    //=========================================================
    function rotates_aroundAxisN({ n, angle })
    {
        var cs = Math.cos( angle );
        var sn = Math.sin( angle );
        switch( n ) {
            case 0:  //around axis x
                var mx =
                [
                    [  1,       0,      0,  0,  ],
                    [  0,      cs,    -sn,  0,  ],
                    [  0,      sn,     cs,  0,  ],
                    [  0,       0,      0,  1,  ],
                ];
            break;
            case 1: //around axis y
                var mx =
                [
                    [  cs,      0,     sn,  0,  ],
                    [  0,       1,      0,  0,  ],
                    [  -sn,     0,     cs,  0,  ],
                    [  0,       0,      0,  1,  ],
                ];
            break;
            case 2: //around axis z
                var mx =
                [
                    [  cs,     -sn,    0,  0,  ],
                    [  sn,      cs,    0,  0,  ],
                    [  0,       0,     1,  0,  ],
                    [  0,       0,     0,  1,  ],
                ];
            break;
        }
        return mx;
    }
    //=========================================================
    // \\// returns matrix or rotation around axis n
    //=========================================================


}) ();


