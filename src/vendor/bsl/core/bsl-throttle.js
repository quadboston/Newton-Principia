// //\\//   attaches library function to b$l
( function () {
	var ns	= window.b$l;
    ns.throttle = throttle;
    var throttleDebCount = 0;
    return;



    ///This is a throttler not bouncer.
    ///This function code is update 103-06-28. Only wait === 0 argument is tested so far.
    ///
    ///Useful for resize event
    ///Input:    wait       - optional, how much to wait till call
    ///                       the most recent function-curry,
    ///                       if falsy, then never wait and never curry.
    ///                       if falsy, never throttles: does executes immediately
    ///                       Ultimately fires if called at elapsed >= wait.
    ///                       If not called this way, then 
    ///                       times out to wait, since last call.
    ///          fun        - throttlee,
    ///Return:  return-function signature:
    ///             doCallNow   has effect of immediate calling plus effect of cleaning up,
    ///             arg_        can be used for ordinary app. paramters
    ///             
    ///
    function throttle( fun, wait )
    {
        throttleDebCount++;
        var timeout = null;
        var timeStart = null;
        var arg;
        return function( arg_, doCallNow, doCancel, do_bounce ) {
            arg         = arg_; //updates arg at every call
            var time    = Date.now();
            timeStart   = timeStart === null ? time : timeStart;
            var elapsed = time - timeStart;

            if( do_bounce ) {
                if(timeout !== null) {
                    clearTimeout( timeout );
                }

            } else {
                //ccc( throttleDebCount + ' ** =' + elapsed );

                if( !wait || elapsed > wait || doCallNow ) {
                    //c cc( throttleDebCount + ' fired by elapsed =' + elapsed );
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
                if( timeout !== null ) {
                    //c cc( throttleDebCount + ' waiting =' + elapsed );
                    return;
                }
            }

            //// do bounce or throttle
            timeout = setTimeout( 
                function() {
                    //c cc( throttleDebCount + ' fired by tout: wait=' + wait );
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


