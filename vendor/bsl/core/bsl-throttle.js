// //\\//   attaches library function to b$l
( function () {
	var ns	= window.b$l;


    ///This is a throttler not bouncer.
    ///This function code is update 103-06-28. Only wait === 0 argument is tested so far.
    ///
    ///Useful for resize event
    ///Callback: return-function signature:
    ///             doCallNow has effect of immediate calling plus effect of cleaning up,
    ///             arg can be used for ordinary app. paramters
    ///Input:    wait optional, how much to wait till call the most recent function-curry,
    ///          if falsy, then never wait and never curry.
    ///          Ultimately fires if called at elapsed >= wait. If not called this way, then 
    ///          times out to wait, since last call.
    ns.throttle = function( fun, wait )
    {
        var timeout = null;
        var timeStart = null;
        var arg;
        return function( arg_, doCallNow, doCancel ) {
            arg = arg_; //updates arg at every call
            var time = Date.now();
            var elapsed = ( timeStart === null && 0 ) || ( time - timeStart );
            if( !wait || elapsed > wait || doCallNow ) {
                fun( arg );
                if( timeout !== null ) clearTimeout( timeout );
                timeout = null;
                timeStart = null;
                return;
            }
            if( doCancel && timeout !== null ) {
                clearTimeout( timeout );
                return;
            }
            //.this statement prevents program from extension of the term
            //.in contrary to bouncer which extends the term
            if( timeout !== null ) return;
	        timeout = setTimeout( 
                function() {
		            fun( arg );
		            timeout = null;
                    timeStart = null;
	            },
                wait
            );
            timeStart = time;
        };
    };

}) ();


