( function() {
	var ns = window.b$l;

	///	Keyboard Table:
	//	Maps keyCodes to human words across the browsers.
	//	Not to be used directly. Use whichKey(...).
	//	Credit as of November 11, 2011 to Jan Wolter: http://unixpapa.com/js/key.html
	KEY =
	{	
			//C o m m o n:
			//Mozilla, IE, Opera, pseudoASCII, no exceptions:

				//alpha: from 65 till 90:
				65	: [	'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
						'o','p','q','r','s','t','u','v','w','x','y','z'],


				32	: ' ',
				13	: 'enter',
				9	: 'tab',
				27	: 'escape',
				8	: 'backspace',
				//Arrows:
				37	: 'left',
				38	: 'up',
				39	: 'right',
				40	: 'down',
				//Special:
				45	: 'insert',
				46	: 'delete',
				36	: 'home',
				35	: 'end',
				33	: 'pageup',
				34	: 'pagedown',
				//Function keys:
				112	: 'F1',
				113	: 'F2',
				114	: 'F3',
				115	: 'F4',
				116	: 'F5',
				117	: 'F6',
				118	: 'F7',
				119	: 'F8',
				120	: 'F9',
				121	: 'F10',
				122	: 'F11',
				123	: 'F12',

			//M i s c o m m o n:
			//Modifiers: Exceptions.
			16	: 'shift',
			17	: 'control',
			18	: 'alt',
			20	: 'capslock',
			144	: 'numlock',
			//Keyboard Number. Except p.A. Exceptions.
			48	: '0',
			49	: '1',
			50	: '2',
			51	: '3',
			52  : '4',
			53  : '5',
			54	: '6',
			55	: '7',
			56	: '8',
			57	: '9',
			//Symbols. Many differences.
			59	: ':',
			61	: '+',
			188	: ',',
			109	: '-',
			190	: '.',
			191	: '?',
			192	: '~',
			219	: '(',
			220	: '|',
			221	: ')',
			222	: '\''
			//TODm add keypad:
	};		

	ns.keyCode2char = function( keyCode )
	{
		if( !keyCode ) return null;
		if( 65 <= keyCode && keyCode <= 90 ) return KEY[ 65 ][ keyCode - 65 ];
		return KEY[ keyCode ];
	}


}) ();


