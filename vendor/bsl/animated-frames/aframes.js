//code taken from: /var/www/html/sand/web-dev/tools/frontend/btb-master/btb/jq/create-media-runner.js
//css vs js: https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/CSS_JavaScript_animation_performance



( function() {
    var ns      = window.b$l;
    var aframes = ns.sn('aframes');




    //**************************************
    // //\\ prepares native animation frames
    //**************************************
    var ANIMATION_THROTTLER = 16.69;
    //var ANIMATION_THROTTLER = 200;

    // //\\ IE10+
    //      good for debug
    //var documentStart = performance.now(); //not for IE9?
	var timeoutAnimationFrame = function( callback )
	{
        var ANIMATION_INTERVAL = 200;
		//window.setTimeout( function() { callback( performance.now() - documentStart ); }, ANIMATION_INTERVAL );
		window.setTimeout( callback, ANIMATION_INTERVAL );
	};
	//window.requestAnimationFrame = timeoutAnimationFrame;
    // \\// IE10+

	window.requestAnimationFrame =
				window.requestAnimationFrame		||
		        window.webkitRequestAnimationFrame	||
		        window.mozRequestAnimationFrame		||
		        window.oRequestAnimationFrame		||
		        window.msRequestAnimationFrame		||
				timeoutAnimationFrame;
    //**************************************
    // \\// prepares native animation frames
    //**************************************




    //**************************************
    // //\\ animation frames framework
    //**************************************
    //MicroAPI
        //start
        //add
        //add8complete
        //remove
    var unixTime;
    var elapsed;
    var runners = {};
    var hash = 1;
    var aframes_start = null;

	aframes.start = function ()
	{
        if( !aframes_start ) { aframes_start = [ Date.now() ]; }
        var timeOrigin  = aframes_start[0];
        unixTime        = Date.now();
        elapsed         = unixTime - timeOrigin;
        if( elapsed > ANIMATION_THROTTLER ) {
            Object.keys(runners).forEach( doRun );
        }
		window.requestAnimationFrame( aframes.start );
	};


    function doRun( hashStr )
    {
        var rr          = runners[ hashStr ];
        var fun         = rr.fun;
        var funComplete = rr.funComplete;
        var ownStart    = rr.ownStart;
        var duration    = rr.duration;
        var ownElapsed  = unixTime - ownStart;
        //c cc( 'ownElapsed='+ownElapsed + ' elapsed='+elapsed + ' duration='+duration + ' unixTime='+unixTime );

        if( typeof duration === 'undefined' || ownElapsed <= duration ) {
            //==============================================
            // MicroAPI: callback signature
            fun( ownElapsed, elapsed, unixTime );
            //==============================================
        } else {
            //.fires up funComplete if any at the end of animation
            funComplete && funComplete( ownElapsed, elapsed, unixTime );
            aframes.remove( hashStr );
        }
    };


    /// adds callbacks to "dispatcher"
    /// see callback signature above
    aframes.add = function( fun, duration, funComplete ) {
        var hashStr = '' + hash++;
        runners[ hashStr ] = { ownStart:Date.now(), fun:fun, duration:duration, funComplete:funComplete };
        return hashStr;
    };

    aframes.add8complete = function( fun, duration, funComplete ) {
        if( !aframes_start ) aframes.start();
        return aframes.add( fun, duration, funComplete );
    };

    aframes.remove = function( hashStr ) {
        //other way?: https://stackoverflow.com/questions/12216540/how-to-test-for-equality-of-functions-in-javascript
        delete runners[ hashStr ];
    };
    ///if hashStr is not a string, then this function does nothing
    aframes.complete8remove = function( hashStr ) {
        if( typeof hashStr !== 'string' ) return; //automates skipping already cleared runners
        var rr = runners[ hashStr ];
        if( !rr ) return; //allows competing removes
        if( !aframes_start ) {
            ////nothing started yet
            //.todm ... this scenario is not good enough ... is unclear for the newcomer
            aframes.remove( hashStr );
            return;
        }
        rr.duration = -1000;
        doRun( hashStr );
    };
    //**************************************
    // \\// animation frames framework
    //**************************************


}) ();
