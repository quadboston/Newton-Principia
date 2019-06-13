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
    var rg          = sn('registry',ssD);
    var exegs    = sn('exegs', ssD);

    fmethods.create_video_help_manager = create_video_help_manager;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000









    ///=========================================================
    /// creates video manager
    ///=========================================================
    function create_video_help_manager()
    {
        var videoListPopup_onModelPane$;
        //.this dom el. is to be created when descendants of
        //.sDomN.medSuperroot$ created in media-super-root.js
        sDomN.videoListPopup_button_onModelPane$.e( 'click', function() {
            videoListPopup_onModelPane$.css( 'display','block' );
        });
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





        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        // //\\ populates video icons for
        //         1) popup video list or
        //         2) exegesis tabs 
        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        function spawnVideoList()
        {
            if( !videoListPopup_onModelPane$ ) { createPopupPane(); }

            //:popup list cleanup
            videoListPopup_onModelPane$.html('');
            sDomN.videoListPopup_button_onModelPane$.css(
                'display','none');

            //:theorion menu cleanup
            ///cleans up video icon placeholders in exegesis-tabs
            var iconClass = 'videoicon-placeholder';
            ns.eachprop( rg[ iconClass ], function( iconRg$, iid ) {
                iconRg$.html('');
                //c cc( iid + ' must become empty=',iconRg$() );
            });
            var vConf = exegs[ amode['theorion'] ][ amode['aspect'] ]
                           .essayHeader.video;

            if( vConf ) {
                if( vConf['to model help'] ) {
                    var listForPopup = [];
                    listForPopup.push( vConf );
                    //-------------------------------------------------------------------
                    // //\\ does populate listForPopup ...
                    //      only if videos configured for these app states
                    //-------------------------------------------------------------------
                    sDomN.videoListPopup_button_onModelPane$.css( 'display','block' );
                    //shows video-button for non-empty list
                    addPopupCloseButton();
                    listForPopup.forEach( function( vConf ) {
                        var itemDom$ = createVideoIconEntry( vConf );
                        itemDom$.to( videoListPopup_onModelPane$() );
                    });
                    //-------------------------------------------------------------------
                    // \\// does populate listForPopup ...
                    //-------------------------------------------------------------------

                } else {
                    //----------------------------------------------------------
                    // //\\ teorion video buttons
                    //----------------------------------------------------------
                    var itemDom$ = createVideoIconEntry( vConf );
                    var dom_already_built = rg[ iconClass ][ amode['theorion'] ];
                    if( dom_already_built  ) {
                        itemDom$.to( dom_already_built );
                    }
                    //----------------------------------------------------------
                    // \\// teorion video buttons
                    //----------------------------------------------------------
                }
            }
            return; //rrrrrr

            ///todm: this desing should be improved, but so far:
            /// this html-control is removable, so no pointer and click
            /// must exist when it is removed ... so
            /// it has a placeholder where it is placed or removed
            /// and such placeholder is neutral in respect for clicks
            function createVideoIconEntry( vConf )
            {
                return $$
                    .div()
                    .cls('video-icon-img-container')
                    .html( '<img class="video-help-button" width="25"' +
                           'src="images/camera-lightbulb.png" ' +
                           '>' +
                           ( vConf.caption ?
                             ' <span style="vertical-align:middle;">' +
                             vConf.caption + '</span>' :
                             ''
                           )
                    )
                    .css('cursor','pointer')
                    .css('display', 'inline')
                    .e('click', function() {
                        runVideo( vConf.URL, !vConf.isNotExternal );
                        videoListPopup_onModelPane$.css( 'display', 'none' )
                    })
                    ;
            }
        }
        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        // \\// populates video icons for
        ///WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW




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
            videoListPopup_onModelPane$ = $$
                .c('div')
                .addClass( 'video-list-popup' )
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
                .to(sDomN.medSuperroot$)
                ;
        }
        function addPopupCloseButton()
        {
            $$
                .c('div')
                .to(videoListPopup_onModelPane$())
                .css('position','absolute')
                .css('top','2px')
                .css('right','5px')
                .e( 'click', function(){videoListPopup_onModelPane$.css('display','none')})
                .css('cursor','pointer')
                .html('X')
                ;
        }

    }


}) ();

