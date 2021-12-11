//\\// This file describes comments-syntax jargon and scope of
//     individual comments in this application,

       //\\// The cope of this comment does extend till the end of the file


    ///This scope is till the end of the first nest below. In this example, till the line "})();"
    ( function() {

        // //\\ helpers
        //      the scope of comment "//\\ helpers" extends till the matching token, "\\//".
        btb.dots2object = function( name, value, obj )
        {
            ////The scope is this comment is till the end of the current nest: till the "return value".

            //:Till the next empty line or till the next "//:" comment, so three lines below for given case:
		    var tokens	= name.split( '.' );
		    var len		= tokens.length;
            var done;

            //:till the next "//:", so comments next two lines ( 
		    obj[ prop ] = value;
		    obj[ prop2 ] = value;
            //:comments next line
		    obj[ prop3 ] = value;

            /// Till the end of this nest. Namely till the line "return obj"
		    if( len1 < 0 ) {
                //.comments just one line below
                obj[ name ] = value;
                return obj;
            }
            return value;
        }
        // \\// helpers

    })();




