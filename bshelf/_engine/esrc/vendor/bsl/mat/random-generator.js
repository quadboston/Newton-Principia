( function() {
	var ns	        = window.b$l;
    var mat         = ns.sn( 'mat' );
    mat.createGen   = createGen;
    return;



    ///Returns: generator reproducable by initial seed
	function createGen(
        seed    //optional seed, will be set to 1 if missed,
                //must be =/= 0
    ){
        var generator_self = {};

        //----------------------------------------------------
        // //\\ fundamental parameters
        //----------------------------------------------------
        //ccc( Math.pow( 7, 5 ), Math.pow( 2, 31 ) );
        //how above function works?
        //apparently gives exact number for integers ... why?
        
        //suggested by Lewis, Goodman and Miller in 1969
        //  https://www.firstpr.com.au/dsp/rand31/p1192-park.pdf
        //      RANDOM NUMBER GEUERATORS: GOOD ONES ARE HARD TO FIND,
        //      STEPHEN K. PARK AND KEITH W. MILLER 
        //      local link: /var/www/html/np/more/theory/random-generators/link
        var MODULE = 2147483647;    //=2^31-1
        var INCR = 16807;           //=7^5

        //----------------------------------------------------
        // \\// fundamental parameters
        //----------------------------------------------------

        var currentSeed = seed || 1;

        generator_self.next = next;
        generator_self.random = random;
        return generator_self;


        ///we always have a chance to start from new seed
        function next(
            seed    //optional; if given, must be =/= 0,
                    //          if missed, this function will return next random from
                    //                     initialy preset random chain
        ){
            return currentSeed = seed || ( ( currentSeed * INCR ) % MODULE );
        }

        ///we always have a chance to start from new seed
        function random()
        {
            return next()/MODULE; 
        }
    };

}) ();


