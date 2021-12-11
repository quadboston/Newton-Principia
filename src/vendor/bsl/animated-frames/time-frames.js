//code taken from:
// /var/www/html/sand/web-dev/tools/frontend/btb-master/btb/jq/create-media-runner.js
//css vs js: https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/CSS_JavaScript_animation_performance

( function() {
    var {
        tframes,
    } = window.b$l.nstree();


    var ANIMATION_THROTTLER = 16.69;


    var unixTime;
    var managerElapsed;
    var runners         = {};
    var kNameCount      = 1;
    var managerStart    = null;

    tframes.runsMainCycle               = runsMainCycle;
    tframes.schedulesAddee              = schedulesAddee;
    tframes.removesAddee                = removesAddee;

    //at this development-moment, this must start and
    //starts here once per app launch
    tframes.runsMainCycle();

    /*
    //=========================================================
    // //\\ test
    //=========================================================
    tframes.schedulesAddee({
        lifeRunFun : (arg) => { ccc( 'run', arg ); },
        lifeMax    : 1000,
        lifeFinishFun : (arg) => { ccc( 'done', arg ); },
    });
    var longKName = tframes.schedulesAddee({
        lifeRunFun : (arg) => { ccc( 'forever', arg ); },
        lifeFinishFun : (arg) => { ccc( 'never', arg ); },
    });
    ccc( 'longKName', longKName );
    ///terminates ownself and "forever"
    tframes.schedulesAddee({
        lifeMax    : 3000,
        lifeRunFun : (arg) => { ccc( 'waits', arg ); },
        lifeFinishFun : (arg) => {
            tframes.removesAddee( longKName );
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
        //if( managerElapsed > ANIMATION_THROTTLER || fisrtStart ) {
            Object.keys(runners).forEach( runsAddee );
        //}
		setTimeout( tframes.runsMainCycle, ANIMATION_THROTTLER ); //todo: setInterval
	};

    /// adds callbacks to "dispatcher",
    /// return kName for case of prescheduled disposal
    function schedulesAddee({
        /// see callback signatures there:
        ///     lifeRunFun( lifeElapsed, managerElapsed, unixTime );
        ///     lifeFinishFun( lifeElapsed, managerElapsed, unixTime );
        lifeRunFun,
        lifeFinishFun,   //optional
        lifeMax,         //optional
        lifeIntervalMax, //optional
    }) {
        var kName = '' + kNameCount++;
        var now = Date.now();
        runners[ kName ] = {
            lifeIntervalMax,
            lifeMax,
            lifeRunFun,
            lifeFinishFun,
            lifeStart         : now,
            lifeIntervalStart : now,
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
        /*
        //this would more economical approach, run only when
        //at least one demand is made
        tframes.runsMainCycle();
        */

        var now                     = Date.now();
        var rr                      = runners[ kName ];
        var lifeRunFun              = rr.lifeRunFun;
        var lifeFinishFun           = rr.lifeFinishFun;

        var lifeMax                 = rr.lifeMax;
        var lifeIntervalMax         = rr.lifeIntervalMax;

        var lifeStart               = rr.lifeStart;
        var lifeIntervalStart       = rr.lifeIntervalStart;

        var lifeElapsed             = now - lifeStart;
        var lifeIntervalElapsed     = now - lifeIntervalStart;

        //ccc( 'lifeIntervalElapsed='+lifeIntervalElapsed.toFixed() );
        if( typeof lifeMax === 'undefined' || lifeElapsed < lifeMax ) {
            if( typeof lifeIntervalMax === 'undefined' ||
                lifeIntervalMax <= lifeIntervalElapsed
            ){
                rr.lifeIntervalStart = now;
                lifeRunFun({
                    lifeElapsed, lifeIntervalElapsed, managerElapsed, now
                });
            }
        } else {
            //.fires up lifeFinishFun if any at the end of animation
            lifeFinishFun && lifeFinishFun({
                lifeElapsed, lifeIntervalElapsed, managerElapsed, now
            });
            removesAddee( kName );
        }
    };
    //**************************************
    // \\// animation frames framework
    //**************************************


}) ();
