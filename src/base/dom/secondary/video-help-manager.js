( function() {
    var {
        $$, eachprop, has,
        fconf, fmethods, exegs, sDomN,
        amode, rg,
    } = window.b$l.apptree({
    });
    fmethods.create_video_help_manager = create_video_help_manager;
    return;









    ///=========================================================
    /// creates video manager
    ///=========================================================
    function create_video_help_manager()
    {
        var videoListPopup_onModelPane$;
        //.this dom el. is to be created when descendants of
        //.sDomN.simSScene$
        sDomN.videoListPopup_button_onModelPane$.e( 'click', function() {
            videoListPopup_onModelPane$.css( 'display','block' );
        });
        sDomN.doCloseVideoHelp$.e( 'click',  function(e) { leaveVideo(); });

        /*
        ///never processed ... todm why
        sDomN.localVideo$.e('loadeddata', function() {
           c cc('loadeddata');
          if(sDomN.localVideo$().readyState >= 2) {
            c cc('2222222');
            sDomN.localVideo$().play();}
        });
        */
        fmethods.spawnVideoList = spawnVideoList;
        return;





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

            //:logic_phase menu cleanup
            ///cleans up video icon placeholders in exegesis-tabs,
            ///in tabs, not in help button,
            [ 'videoicon-placeholder', 'videoicon-placeholder-aspect' ]
                .forEach( iconClass => {
                    eachprop( rg[ iconClass ], function( iconRg$, iid ) {
                        if( iid === 'rgId' ) return;
                        iconRg$.html('');
                    });
                });
            var vConf = exegs[ amode['logic_phase'] ][ amode['aspect'] ].subexegs[0]
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
                    let iconClass = 'videoicon-placeholder' +
                                    ( has( vConf, 'to-aspect' ) ? '-aspect' : '' );
                    let category = has( vConf, 'to-aspect' ) ? 'aspect' : 'logic_phase';
                    var itemDom$ = createVideoIconEntry( vConf );
                    var dom_already_built = rg[ iconClass ][ amode[ category ] ];
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
                           'src="' + fconf.engineImg + '/camera-lightbulb.png" ' +

                           ( vConf.tooltip ?
                             'title="' + vConf.tooltip + '" ' : ''
                           ) +

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

            //which is a correct statement?
            //sDomN.localVideoSource$().src = URL;
            sDomN.localVideoSource$().src = URL + '?autoplay=1';

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
                .to(sDomN.simSScene$)
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

