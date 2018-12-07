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

        var USE_EXTERNAL_VIDEO = !fconf.USE_LOCAL_VIDEO;
        var EXTERNAL_VIDEO_TIMEOUT = 3600000;
        var AUTOPLAY_EXTERNAL_VIDEO = true; //forces autoplay via URL ... set false if set in html
        var USER_CLICK_CANCELS_VIDEO = false;


        var EXTERNAL_URL = '';
        //var EXTERNAL_URL = "https://www.youtube.com/embed/3xLQW5rm92s";
        var EXTERNAL_URL = "https://www.youtube.com/embed/pS-hjfKlips";
        //var EXTERNAL_URL = "https://www.youtube.com/embed/csIW4W_DYX4";


        if( USE_EXTERNAL_VIDEO ) {
            setExternalVideo();
        } else {
            //setAutonomousVideo();
        }


        function setExternalVideo()
        {
            var showreelIFrame$ = sDomN.iframedVideo$;
            var showreelIFrame = showreelIFrame$();
            showreelIFrame$.css( 'display', 'none' );
            var closeButton$ = sDomN.doCloseVideoHelp$.css( 'display', 'none' );

	        sDomN.runVideoHelpButton$.e( 'click', function(e) {
                if( EXTERNAL_URL ) {
                    showreelIFrame.src = EXTERNAL_URL + 
                    ( AUTOPLAY_EXTERNAL_VIDEO ? '?autoplay=1' : '');
                }
                sDomN.localVideoWrap$.css( 'display', 'block' );
                showreelIFrame$.css( 'display', 'block' );
                closeButton$.css( 'display', 'block' )
                setTimeout( leaveIFrame, EXTERNAL_VIDEO_TIMEOUT );
                if( USER_CLICK_CANCELS_VIDEO ) {
                    //sets video-cancel by user click on iframe:
                    setClickEventOnIFrame();
                }
            });

	        closeButton$.e( 'click',  function(e) {
                leaveIFrame();
            });

            function leaveIFrame()
            {
                showreelIFrame.src = "dummy-iframe.html";             
                showreelIFrame$.css( 'display', 'none' );
                closeButton$.css( 'display', 'none' );
                sDomN.localVideoWrap$.css( 'display', 'none' );
            }

            function setClickEventOnIFrame () {
                //https://stackoverflow.com/questions/2381336/detect-click-into-iframe-using-javascript
                focus();
                var listener = window.addEventListener('blur', function() {
                    if (document.activeElement === showreelIFrame) {
                        leaveIFrame();
                    }
                    window.removeEventListener('blur', listener);
                });
            }
        }



        // //\\ autonomous video
        function setAutonomousVideo()
        {
            var showreelVideo$ = $('#showreel-video');
            if( !showreelVideo$.length ) return;
            var showreelVideo = showreelVideo$[0];

            //var sourceTag = showreelVideo$.children( 'video source' )
            //.attr( 'src', AUTONOMOUS_URL );

            var videoWrap$ = $("#showreel-video-wrap");
            var closeButton$ = $('.close-html-button');
            var had_enough_data;
            var HAVE_ENOUGH_DATA = 4;
	        var haveEnoughData = function ()
	        {
		        if( had_enough_data ) return true;
		        had_enough_data = showreelVideo.readyState === HAVE_ENOUGH_DATA;
                return had_enough_data;
	        };
	        $('#play-showreel').click (function(e) {
                if( haveEnoughData() ) {
                    videoWrap$.addClass( 'playing' );
                    closeButton$.addClass( 'shown' );
                    sDomN.localVideoWrap$.css( 'display', 'block' );
                    showreelVideo.play();
                }
            });

            function leaveVideo()
            {
                showreelVideo.pause();
                $("#showreel-video-wrap").removeClass( 'playing' );
                closeButton$.removeClass( 'shown' );
            }

            showreelVideo.onended = leaveVideo;
            $(document.body).on( 'keydown', function( event ) {
                ////leaves video on key "Escape"
                if( event.keyCode === 27 ) {
                    leaveVideo();
                }
            });
	        closeButton$.click (function(e) {
                leaveVideo();
            });
            showreelVideo$.on( 'mouseleave', function() {
                showreelVideo$.removeAttr( 'controls' );
            });
            showreelVideo$.on( 'mouseover', function() {
                showreelVideo$.attr( 'controls', '1' );
            });
            if( USER_CLICK_CANCELS_VIDEO ) {
                //sets video-cancel by user click on iframe:
                showreelVideo$.on( 'click', leaveVideo );
            }
        }
    }


}) ();

