// //\\// Simple matrix operations.
//        (c) 2017 Konstantin Kirillov. License MIT.
//        Origin taken from: /var/www/html/bids/done/SMALL/ww/calibrator/now/vendor/btb/matrix.js. Nov. 2014.



( function ( window ) {
    var ns      = window.b$l;
    var mat     = ns.mat         = ns.mat         || {};


	///	calculates: c = a*b, where
    ///             (a*b)[y][z] = SUM_VIA_x(  a[y][x] * b[x][z]  );
    ///             a[y][x], b[x][z] is conventional JS-indexation of arrays;    
	///	input:		aa is m x n; y=0,...,m; bb is n x k;
	//				m is outer index ( number of rows in a ),
    //              k is outer index ( number of columns in b )
    mat.MxM = function( aa, bb )
	{
		var mm	= aa.length;
		var nn	= aa[ 0 ].length;
		var kk	= bb[ 0 ].length;

		var res	= [];
		for ( var yy = 0; yy < mm; yy++ )
		{
			res[ yy ] = [];
			for ( var zz = 0; zz < kk; zz++ )
			{
				var sum = 0;
				var row = aa[ yy ];
				for ( var xx = 0; xx < nn; xx++ )
				{
					sum += row[ xx ] * bb[ xx ][ zz ];
				}
				res[ yy ][ zz ] = sum;
			}
		}
		return res;
	};



	///	calculates: c = a x v;
	///	input:		aa is a matrix m x n, vv has lenght n;
	mat.MxV = function( aa, vv )
	{
		var mm	= aa.length;
		var nn	= vv.length;

		var res	= [];
		for ( var yy = 0; yy < mm; yy++ )
		{
			var arow = aa[ yy ];
    		var sum = 0;
			for ( var zz = 0; zz < nn; zz++ )
			{
    			sum += arow[ zz ] * vv[ zz ];
			}
            res[ yy ] = sum;
		}
		return res;
	};



	///	calculates c = Aa + Bb;
	//	a is m x n matrix;
	//	A, B are optional
	mat.addM = function( aa, bb, A, B )
	{
		var mm	= aa.length;
		var nn	= aa[ 0 ].length;
		var cc	= [];
		A		= A || A === 0 ? A : 1; 
		B		= B || B === 0 ? B : 1; 

		for ( var yy = 0; yy < mm; yy++ )
		{
			var rowa = aa[ yy ];
			var rowb = bb[ yy ];
			var rowc = cc[ yy ] = [];

			for ( var xx = 0; xx < nn; xx++ )
			{
				rowc[ xx ] = A * rowa[ xx ] + B * rowb[ xx ];
			}
		}
		return cc;
	};

	///	calculates c = Aa + Bb;
	//	a b are vectors
	//	A, B are optional
	mat.addV = function( aa, bb, A, B )
	{
		var nn	= aa.length;
		var cc	= [];
		A		= A || A === 0 ? A : 1; 
		B		= B || B === 0 ? B : 1; 

		for ( var xx = 0; xx < nn; xx++ )
		{
			cc[ xx ] = A * aa[ xx ] + B * bb[ xx ];
		}
		return cc;
	};

    ///returns aa - bb
	mat.subV = function( aa, bb )
	{
		var nn	= aa.length;
		var cc	= [];
		for ( var xx = 0; xx < nn; xx++ )
		{
			cc[ xx ] = aa[ xx ] - bb[ xx ];
		}
		return cc;
	};


    ///returns aa - bb
	mat.scaleV = function( A, aa )
	{
		var nn	= aa.length;
		var cc	= [];
		for ( var xx = 0; xx < nn; xx++ )
		{
			cc[ xx ] = A *  aa[ xx ];
		}
		return cc;
	};

    mat.zero4 = [ 0, 0, 0, 0 ];
    mat.zero3 = [ 0, 0, 0 ];

    mat.unit4x4 = 
    [
        [ 1, 0, 0, 0 ],
        [ 0, 1, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ]
    ];

    mat.turnX =
        [
            [ 1,    0,  0,  0  ],
            [ 0,    0, -1,  0  ],
            [ 0,    1,  0,  0  ],
            [ 0,    0,  0,  1  ]
        ];

    mat.turnY =
        [
            [ 0,    0, -1,  0  ],
            [ 0,    1,  0,  0  ],
            [ 1,    0,  0,  0  ],
            [ 0,    0,  0,  1  ]
        ];

    mat.turnZ =
        [
            [ 0,    -1, 0,  0  ],
            [ 1,    0,  0,  0  ],
            [ 0,    0,  1,  0  ],
            [ 0,    0,  0,  1  ]
        ];
    mat.turn = [ mat.turnX, mat.turnY, mat.turnZ ];


    ///before use this, test this for speed against legacy-loop
    var cloneM = mat.cloneM = function( mm ) {
        //return mm.map( function( row ) { return row.map( function( val ) { return val; } ); });
        return mm.map( function( row ) { return row.slice(); } );
    };

    mat.getClonedUnitMatrix4x4 = function() { return cloneM( mat.unit4x4 ); };

}) ( window );

