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
        sDomN.runVideoHelpButton$.e( 'click', function() {
            menuListPopUp$.css('display','block');
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
            if( !menuListPopUp$ ) { createPopupPane(); }
            var iconClass = 'exegesis-tab-icon-placeholder';

            var listForPopup = [];
            var listForExegesisTabs = {};
            ssD.videoList.forEach( function(item) {
                if( item.lemmaNumber && sapp.lemmaNumber !== item.lemmaNumber ) return;

                ///----------------------
                ///prebilds exegesis list
                ///----------------------
                if( item.exegesisTab ) {
                    var selected = true;
                    if( item.modeType ) {
                        selected = false;
                        Object.keys( item.modeType ).forEach( function( modeType ) {
                            if( amode[ modeType ] === item.modeType[ modeType ] ) {
                                selected = true;
                            }
                        });
                    }
                    if( selected ) {
                        listForExegesisTabs[ iconClass + '_' + item.exegesisTab ] = item;
                    }

                ///----------------------
                ///prebilds popup list
                ///----------------------
                } else {
                    var selected = true;
                    if( item.modeType ) {
                        selected = false;
                        Object.keys( item.modeType ).forEach( function( modeType ) {
                            if( amode[ modeType ] === item.modeType[ modeType ] ) selected = true;
                        });
                    }
                    selected && listForPopup.push( item );
                }
            });

            //----------------------------------------------------------
            // //\\ exegesis tabs
            //----------------------------------------------------------
            ///cleans up video icon placeholders in exegesis-tabs
            Object.keys( rg[ iconClass ] ).forEach( function( tabKey ) {
                rg[ iconClass ][ tabKey ].innerHTML = '';
            });
            ///repopulates video icon placehoders in exegesis-tabs
            Object.keys( listForExegesisTabs ).forEach( function( itemKey ) {
                var listItem = listForExegesisTabs[ itemKey ];
                var itemDom$ = createVideoIconEntry( listItem );
                itemDom$.to( rg[ iconClass ][ listItem.exegesisTab ] );
            });
            //----------------------------------------------------------
            // \\// exegesis tabs
            //----------------------------------------------------------


            //-------------------------------------------------------------------
            // //\\ does populate listForPopup ...
            //      only if videos configured for these app states
            //-------------------------------------------------------------------
            if( !listForPopup.length ) {
                sDomN.runVideoHelpButton$.css('display','none'); //hides video-button for empty list
            } else {
                sDomN.runVideoHelpButton$.css('display','block'); //shows video-button for non-empty list

                menuListPopUp$.html('');
                addPopupCloseButton();

                listForPopup.forEach( function( listItem ) {
                    var itemDom$ = createVideoIconEntry( listItem );
                    itemDom$.to(menuListPopUp$());
                });
            }
            //-------------------------------------------------------------------
            // \\// does populate listForPopup ...
            //-------------------------------------------------------------------
            return; //rrrrrr



            function createVideoIconEntry( listItem )
            {
                return $$
                    .c('div')
                    .addClass('video-icon-fragment')
                    .html( '<img class="video-help-button" width="25" src="images/camera-lightbulb.png" ' +
                           '>' +
                           (listItem.caption ? 
                                ' <span style="vertical-align:middle;">' + listItem.caption + '</span>' :
                                ''
                           )
                    )
                    .css('cursor','pointer')
                    .css('display', 'inline')
                    .e('click', function() {
                        runVideo( listItem.URL, listItem.isExternal );
                        menuListPopUp$.css('display','none')
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
            menuListPopUp$ = $$
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

