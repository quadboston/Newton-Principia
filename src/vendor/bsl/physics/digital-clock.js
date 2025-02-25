//historical archive reference is in /var/www/html/fbwork/SVG-CAN-VID/.../prj/507-steps-.../app/src/js/init-anim/digital-clock.js

( function() {
    var {
        ns,
        nsmethods,
        $$,
    } = window.b$l.nstree();
    nsmethods.initsDigitalClock = initsDigitalClock;
    return;



    //Inputs: **api-input---digital-screen-clockRack
    //Returns: see **api-return---digital-screen-clockRack...
    function initsDigitalClock({

        //below are optional parameters
        parentDom,

        //'float seconds' causes this format: SSSS.MMMM
        //or
        //  (misleading instruction? : '0123' === 'hours, mins, secs, ms' )

        // apparently: '01' means hours and minutes,
        //             '02' means hours, minutes and seconds

        //  exampe:
        //      'float seconds' means 'sssss.mmm'
        //      '12'            means 'mins:secs'
        //      '13'            means 'mins:secs.ms'
        clockFormat,

        millsDigits, //1 by default

        //half or whole:
        //24*
        //12*
        //3600*1000
        halfDay,
        clockId,

        // //\\ css
        clockWidth,      //size
        offsetX,         //cell x offset
        offsetY,         //cell y offset

        // \\// css

    }) {

        parentDom   = parentDom || document.body;
        clockWidth  = clockWidth || 100;
        offsetX     = offsetX || 0;
        offsetY     = offsetY || 0;
        halfDay     = halfDay || 24*3600*1000;
        fontFamily  = 'san-serif,monospace';
        //digitColor  = '#aaaaaa';
        clockFormat = clockFormat || '12';
        millsDigits = millsDigits || 1;
        clockId     = clockId || 'digital-clock';


        var clcokRack = {};

        // **api-return---digital-screen-clockRack1
        var domStore = clcokRack.domStore = {};
        clcokRack.durationScale = 1;
        clcokRack.clockLoop_cb = clockLoop_cb;
        clcokRack.setsDurationScale = setsDurationScale;

        if( 'float seconds' === clockFormat ) {

            var startIx     = 2;
            var endIx       = 3;
            var hasMillisec = true;

            //3 is an average number of seconds
            var digitsCount = millsDigits + 1 + 3;
                
            var digitWidth  = clockWidth / digitsCount;
            var fontSize    = digitWidth * 1.2;

        } else {
            var startIx     = parseInt( clockFormat.charAt( 0 ) );
            var endIx       = parseInt( clockFormat.charAt( clockFormat.length-1 ) );
            var hasMillisec = endIx === 3;
            var cellsCount  = endIx - startIx + 1;
            var digitsCount = cellsCount * 2 +
                              ( hasMillisec ? millsDigits-2 : 0 ) +
                              cellsCount - 1
                              ;
            var digitWidth  = clockWidth / digitsCount;
            var fontSize    = digitWidth * 1.2;
        }

        buildHtml();
        return clcokRack;






        ///inputs Unix-time
        function clockLoop_cb( liveT )
        {
            if( liveT < 0 ) return; //before Unix-epoch protection
            liveT               = ( liveT * clcokRack.durationScale ) % halfDay;
            var milliseconds    = liveT % 1000;
            var millisecondsStr = ('' + milliseconds).substr( 0, millsDigits );

            var seconds         = (liveT - milliseconds) / 1000;
            secondsRem          = (seconds % 60);
            //prepends 0 before seconds if seconds do take only one decimal position
            var secondsRemStr   = secondsRem  < 10 ? '0' : '';
            secondsRemStr       = secondsRemStr + secondsRem;

            if( 'float seconds' === clockFormat ) {
                secondsRemStr = seconds + '';
            }

            var minutes         = ( seconds - secondsRem ) / 60;
            minutesRem          = ( minutes % 60);
            var minutesRemStr   = minutesRem  < 10 ? '0' : '';
            minutesRemStr       = minutesRemStr + minutesRem;

            var hours           = ( minutes - minutesRem ) / 60;
            hoursRem            = ( hours % 24 );
            var hoursRemStr     = hoursRem  < 10 ? '0' : '';
            hoursRemStr         = hoursRemStr + hoursRem;

            var html = '';
            for( var ix = startIx; ix <= endIx; ix++ ) {
                var domCell$ = domStore.digitalClockCells[ ix ];
                switch (ix) {
                    case 0 : html = hoursRemStr;
                    break;
                    case 1 : html = minutesRemStr;
                    break;
                    case 2 : html = secondsRemStr;
                    break;
                    case 3 : html = millisecondsStr;
                    break;
                }
                var dividor = ix === 2 ? '.' : ':';
                domCell$.html( html + ( ix < endIx ? dividor : '' ) );
            }
        }


        function buildHtml()
        {
            // **api-return---digital-screen-clockRack2
            clcokRack.clockTable$ = domStore.clockTable$ = $$.c( 'table' )
                .to( parentDom )
                .addClass( clockId + '-table' )

                //.css( 'box-sizing',     'border-box')
                .css( 'border-spacing', '0')
                ;
            domStore.clockRow$   = $$.c( 'row' ).to( domStore.clockTable$ );
            domStore.digitalClockCells  = [];
            for( var ix = startIx; ix <= endIx; ix++ ) {
                makesCell( ix );
            }
            return;



            //ix is segment index for hours, minutes, seconds, milliseconds
            function makesCell( ix )
            {
                domStore.digitalClockCells[ ix ] = $$.c( 'td' )
                    .addClass( clockId + '-cell' )

                    .css('font-family', 'var(--font-serif)' )

                    .css('fontSize',  fontSize.toFixed(2) + 'px' )
                    .html( ' ' )
                    .to( domStore.clockRow$ )
                    ;
            }
        }

        function setsDurationScale( durationScale )
        {
            // **api-return---digital-screen-clockRack3
            clcokRack.durationScale = durationScale;
        }

    }

}) ();

