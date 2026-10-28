//module "Animated Flock", aflock.
//  runs a flock: collection of animations,
//  code taken from: /var/www/html/sand/web-dev/tools/frontend
//  /btb-master/btb/jq/create-media-runner.js
//  css vs js: https://developer.mozilla.org/en-US/Apps/Fundamentals
//  /Performance/CSS_JavaScript_animation_performance
(function(){
    var aflock = window.b$l.sn('aflock');
    //API
    aflock.completes8destroys = completes8destroys;
    aflock.adds_to_flock = adds_to_flock;

    //**************************************
    // //\\ prepares native animation frames
    //**************************************
   const FLOCK_START_DELAY = 1; //16.69;
    // //\\ IE10+
    //      good for debug
   const timeoutAnimationFrame = function( callback ){
        var ANIMATION_INTERVAL = 16.69; //200;
        //window.setTimeout( function() { callback(
        //performance.now()-documentStart );}, ANIMATION_INTERVAL);
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

    var unixTime;
    var elapsed;
    var runners = {};
    var animIx = 1;
    var aflockIsStarted;
    return;


    function runsAframesIndefinitely(){
        var timeOrigin  = aflockIsStarted[0];
        unixTime        = Date.now();
        elapsed         = unixTime - timeOrigin;
        ///delays flock added in batch to next frame
        if( elapsed > FLOCK_START_DELAY ) {
            Object.keys(runners).forEach( doRun );
        }
        if( Object.keys(runners).length ){
            //continues running this recursion loop till
            //the end of application
            window.requestAnimationFrame( runsAframesIndefinitely );
        }
	};

    function doRun( animId ){
        const rr          = runners[ animId ];
        const fun         = rr.fun;
        const funComplete = rr.funComplete;
        const ownStart    = rr.ownStart;
        const duration    = rr.duration;
        const ownElapsed  = unixTime - ownStart;
        if(typeof duration === 'undefined'||ownElapsed <= duration){
            //callback signature
            fun( ownElapsed, elapsed, unixTime );
        } else {
            //.fires up funComplete if any at the end of animation
            //callback signature
            funComplete( ownElapsed, elapsed, unixTime );
            delete runners[ animId ];
        }
    };

    ///adds runners to collection of acting animation runners
    ///to be used for "run" button on GUI
    function adds_to_flock(
        fun,        //fun for one of runners
        duration,   //dur for one of runners
        funComplete //for one of runners
    ){
        var animId = '' + animIx++;
        //runner is renewed and not added if it is already
        //ixists: own start is renewed:
        runners[ animId ] = {
          fun: fun || (_=>0),
          funComplete: funComplete || (_=>0),
          ownStart: Date.now(),
          duration: duration,
        };
        if( Object.keys(runners).length === 1 ){
            aflockIsStarted = [ Date.now() ];
            runsAframesIndefinitely();
        }
        return animId;
    };

    ///if animId is not a string, then this function does nothing
    ///to be used for "pause" button on GUI
    function completes8destroys( animId ){
        //automates skipping already cleared runners
        if( typeof animId !== 'string' ) return;
        var rr = runners[ animId ];
        //allows competing removers
        if( !rr ) return; //already destroyed
        //tricks immediate completion in coming anim. frame
        rr.duration = -1000;
    };
})();
