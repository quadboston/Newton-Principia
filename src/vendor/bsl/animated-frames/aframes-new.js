//code taken from:
// /var/www/html/sand/web-dev/tools/frontend/btb-master/btb/jq/create-media-runner.js
//css vs js: https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/CSS_JavaScript_animation_performance

( function() {
    var {
        sn, haz,
    } = window.b$l.nstree();

    var aframes = sn( 'aframes' );

    //********************************************************
    // //\\ native or shim time-frames
    //********************************************************
    var ANIMATION_THROTTLER = 16.69;

    //------------------------------------------------------
    // //\\ IE10+
    //------------------------------------------------------
    //      good for debug
    //var documentStart = performance.now(); //not for IE9?
	var timeoutAnimationFrame = function( callback )
	{
        var ANIMATION_INTERVAL = 200;
		//window.setTimeout( function()
        // { callback( performance.now() - documentStart ); },
        // ANIMATION_INTERVAL );
		window.setTimeout( callback, ANIMATION_INTERVAL );
	};
	//window.requestAnimationFrame = timeoutAnimationFrame;
    //------------------------------------------------------
    // \\// IE10+
    //------------------------------------------------------


	window.requestAnimationFrame =
		window.requestAnimationFrame		||
        window.webkitRequestAnimationFrame	||
        window.mozRequestAnimationFrame		||
        window.oRequestAnimationFrame		||
        window.msRequestAnimationFrame		||
		timeoutAnimationFrame;
    //********************************************************
    // \\// native or shim time-frames
    //********************************************************



    var unixTime;
    var managerElapsed;
    var runners         = {};
    var kNameCount      = 1;
    var managerStart    = null;

    aframes.runsMainCycle               = runsMainCycle;
    aframes.schedulesAddee              = schedulesAddee;
    aframes.removesAddee                = removesAddee;

    //aframes.runs8removes                = runs8removes;
    //aframes.schedules_addee8Dispatcher  =
    //    schedules_addee8Dispatcher;

    //at this development-moment, this must start and
    //starts here once per app launch
    aframes.runsMainCycle();


    /*
    //=========================================================
    // //\\ test
    //=========================================================
    aframes.schedulesAddee({
        lifeRunFun : (arg) => { ccc( 'run', arg ); },
        lifeMax    : 1000,
        lifeFinishFun : (arg) => { ccc( 'done', arg ); },
    });
    var longKName = aframes.schedulesAddee({
        lifeRunFun : (arg) => { ccc( 'forever', arg ); },
        lifeFinishFun : (arg) => { ccc( 'never', arg ); },
    });
    ccc( 'longKName', longKName );
    ///terminates ownself and "forever"
    aframes.schedulesAddee({
        lifeMax    : 3000,
        lifeRunFun : (arg) => { ccc( 'waits', arg ); },
        lifeFinishFun : (arg) => {
            aframes.removesAddee( longKName );
            ccc( 'must be removed', longKName );
        },
    });
    //=========================================================
    // \\// test
    //=========================================================
    */

    return;















	function runsMainCycle()
	{
        var fisrtStart = false;
        if( !managerStart ) {
            var fisrtStart = true;
            managerStart = [ Date.now() ];
        }
        var timeOrigin  = managerStart[ 0 ];
        managerStart    = [ Date.now() ]; //reschedules manager
        unixTime        = Date.now();
        managerElapsed  = unixTime - timeOrigin;
        if( managerElapsed > ANIMATION_THROTTLER || fisrtStart ) {
            Object.keys(runners).forEach( runsAddee );
        }
		window.requestAnimationFrame( aframes.runsMainCycle );
	};

    /// adds callbacks to "dispatcher",
    /// return kName for case of prescheduled disposal
    function schedulesAddee({
        /// see callback signatures there:
        ///     lifeRunFun( lifeElapsed, managerElapsed, unixTime );
        ///     lifeFinishFun( lifeElapsed, managerElapsed, unixTime );
        lifeRunFun,
        lifeFinishFun,  //optional
        lifeMax,        //optional
    }) {
        var kName = '' + kNameCount++;
        runners[ kName ] = {
            lifeStart : Date.now(),
            lifeRunFun,
            lifeMax,        //optional, if missed runs forever
            lifeFinishFun,  //optional
        };
        return kName;
    };

    function removesAddee( kName )
    {
        //other way?:
        // https://stackoverflow.com/questions/12216540
        //      /how-to-test-for-equality-of-functions-in-javascript
        delete runners[ kName ];
    };

    function runsAddee( kName )
    {
        var rr              = runners[ kName ];
        var lifeRunFun      = rr.lifeRunFun;
        var lifeFinishFun   = rr.lifeFinishFun;
        var lifeStart       = rr.lifeStart;
        var lifeMax         = rr.lifeMax;
        var lifeElapsed     = unixTime - lifeStart;
        //c cc( 'lifeElapsed='+lifeElapsed + ' managerElapsed='+managerElapsed +
        // ' lifeMax='+lifeMax + ' unixTime='+unixTime );

        if( typeof lifeMax === 'undefined' || lifeElapsed < lifeMax ) {
            lifeRunFun( lifeElapsed, managerElapsed, unixTime );
        } else {
            //.fires up lifeFinishFun if any at the end of animation
            lifeFinishFun && lifeFinishFun( lifeElapsed, managerElapsed, unixTime );
            removesAddee( kName );
        }
    };



    /*
    //-------------------------------------------------------
    // //\\ management sugar,
    //      NOT TESTED AND NEVER RUN
    //-------------------------------------------------------
    ///adds runners to collection of acting animation runners
    ///this function is a candidate for removal, it's rare
    ///when dispatcher is not run
    function schedules_addee8Dispatcher({
            lifeRunFun,
            lifeMax,
            lifeFinishFun
    }) {
        if( !managerStart ) aframes.runsMainCycle();
        return schedulesAddee({
            lifeRunFun,
            lifeMax,
            lifeFinishFun
        });
    };

    ///if kName is not a string, then this function does nothing
    function runs8removes( kName )
    {
        if( typeof kName !== 'string' ) return; //automates skipping already cleared runners
        var rr = haz( runners, kName );
        if( !rr ) return; //allows competing removes
        if( !managerStart ) {
            ////nothing started yet
            //.todm ... this scenario is not good enough ... is unclear for the newcomer
            removesAddee( kName );
            return;
        }
        rr.lifeMax = -1000;
        runsAddee( kName );
    };
    //-------------------------------------------------------
    // \\// management sugar,
    //-------------------------------------------------------
    */
    //**************************************
    // \\// animation frames framework
    //**************************************


}) ();
