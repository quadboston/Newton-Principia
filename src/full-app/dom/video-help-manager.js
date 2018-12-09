( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD); //todo should be child of ss

    fmethods.create_video_help_manager = create_video_help_manager;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000









    ///=========================================================
    /// creates video manager
    ///=========================================================
    function create_video_help_manager()
    {
        var menuListPopUp$;
        sDomN.runVideoHelpButton$.e( 'click', function() { menuListPopUp$.css('display','block'); });
        sDomN.doCloseVideoHelp$.e( 'click',  function(e) { leaveVideo(); });

        /*
        ///never processed ... todm why
        sDomN.localVideo$.e('loadeddata', function() {
           ccc('loadeddata');
          if(sDomN.localVideo$().readyState >= 2) {
            ccc('2222222');
            sDomN.localVideo$().play();}
        });
        */
        fmethods.spawnVideoList = spawnVideoList;
        //111111111111111111111111
        return;
        //111111111111111111111111






        ///populates popup video list
        function spawnVideoList()
        {
            if( !menuListPopUp$ ) { createPopupPane(); }
            var list = [];
            ssD.videoList.forEach( function(item) {
                if( item.lemmaNumber && sapp.lemmaNumber !== item.lemmaNumber ) return;
                var selected = true;
                if( item.modeType ) {
                    selected = false;
                    Object.keys( item.modeType ).forEach( function( modeType ) {
                        if( amode[ modeType ] === item.modeType[ modeType ] ) selected = true;
                    });
                }
                selected && list.push( item );
            });
            //.does not populate list if no videos configured for these app states
            if( !list.length ) {
                sDomN.runVideoHelpButton$.css('display','none'); //hides video-button for empty list
                return;
            }
            sDomN.runVideoHelpButton$.css('display','block'); //shows video-button for non-empty list

            menuListPopUp$.html('');
            addPopupCloseButton();
            list.forEach( function( listItem ) {
                $$
                    .c('div')
                    .html( '<img width="25"src="images/camera-lightbulb.png" ' +
                           ' style="position:relative;top:2px; vertical-align:middle;"> ' +
                           '<span style="vertical-align:middle;">' + listItem.caption + '</span>')
                    .css('cursor','pointer')
                    .e('click', function() {
                        runVideo( listItem.URL, listItem.isExternal );
                        menuListPopUp$.css('display','none')
                    })
                    .to(menuListPopUp$())
                    ;
            });
        }


        function runVideo( URL, isExternal )
        {
            leaveVideo();
            if( isExternal ) {
                runExternal(URL);
            } else {
                runInternal(URL);
            }
        }
        function leaveVideo()
        {
            sDomN.localVideo$().pause();
            sDomN.localVideoSource$().src =  "dummy-iframe.html";
            sDomN.iframedVideo$().src = ""; //dummy-iframe.html";             
            setDisplayForInternal( 'none' );
            setDisplayForExternal( 'none' );
        }


        function runExternal( URL )
        {
            sDomN.iframedVideo$().src = URL + '?autoplay=1';
            setDisplayForExternal( 'block' );
        }

        function runInternal(URL) {
            sDomN.localVideoSource$().src = URL;
            setDisplayForInternal( 'block' );
            sDomN.localVideo$().play();
        };

        function setDisplayForInternal( display )
        {
            sDomN.localVideo$.css(       'display', display );
            sDomN.doCloseVideoHelp$.css(  'display', display );
            sDomN.videoWrap$.css(   'display', display );
        }
        function setDisplayForExternal( display )
        {
            sDomN.iframedVideo$.css(    'display', display );
            sDomN.doCloseVideoHelp$.css('display', display );
            sDomN.videoWrap$.css(       'display', display );
        }


        function createPopupPane()
        {
            menuListPopUp$ = $$
                .c('div')
                .css('display','none')
                .css('position', 'absolute')
                .css('padding', '5px')
                .css('padding-right', '25px')
                .css('border-radius', '5px')
                .css('border', '1px solid black')
                .css('left', '30px')
                .css('top', '50px')
                .css('background-color', 'white')
                .css('z-index','111111111')
                .to(sDomN.medSuperroot)
                ;
        }
        function addPopupCloseButton()
        {
            $$
                .c('div')
                .to(menuListPopUp$())
                .css('position','absolute')
                .css('top','2px')
                .css('right','5px')
                .e( 'click', function(){menuListPopUp$.css('display','none')})
                .css('cursor','pointer')
                .html('X')
                ;
        }

    }


}) ();

