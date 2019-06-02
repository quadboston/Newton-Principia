( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssModes     = sn('ssModes',ss);
    var rg          = sn('registry',ssD);
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);

    var oneTimeUse_globalCSS = '';

    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var topicsCount = 0;
    var shapesCount = 0;
    var topicLinks = topics.topicLinks = {};
    var topicShapes = topics.topicShapes = {};
    var topicIndexedLinks = topics.topicIndexedLinks = [];

    var SPACE_reg = /\s+/;
    var TOP_ANCH_reg = 
        '¦([^¦]+)¦' + //catches topicId
        '([^¦]+)'   + //catches topic caption
        '¦¦';


    var topAnch_reg = new RegExp( TOP_ANCH_reg, 'gu' );
    //.adding flag "g" ruins the job ... why?
    var topAnch_reg2 = new RegExp( TOP_ANCH_reg, 'u' );
    //---------------------------------------------
    // \\// topic engine variables
    //---------------------------------------------


    sDomF.topicModel_2_css_html = topicModel_2_css_html;
    sDomF.repopulateContent = repopulateContent;
    return; //00000










    ///this function needs application-model-view already created,
    ///as of this version, it is executed only once
    function topicModel_2_css_html()
    {
        establishCurrentMode();
        topics.esseyions_rack.forEach( function( ess_rack ) {
            ess_rack.domEl = $$
              .c('div')
              .cls( ess_rack.classStr )
              //*******************************************************
              //.here page content injects into html for the first time
              //*******************************************************
              .to( sDomN.essaionsRoot$() )
              ();

            ///collecting |...|..|| anchor-topics
            ess_rack.activeFrags.forEach( function( activeFrag, tix ) {
                if( typeof( activeFrag ) === 'object' ) {
                    ns.eachprop( activeFrag, (avalue) => {
                        extractLinks( avalue );
                    });
                } else {
                    //.strange why topAnch_reg (with flag "g") works
                    //.and topAnch_reg2 does not
                    extractLinks( activeFrag );
                }
            });
        });
        //ccc( 'topicLinks=', topics.topicLinks );
        topLinks_2_colors();
        repopulateContent();
        sDomF.anchors2topics();

        //========================================================
        // //\\ finalizes global css
        //========================================================
        ns.globalCss.add8update( oneTimeUse_globalCSS );
        sDomN.topicModelInitialized = true;
        //========================================================
        // \\// finalizes global css
        //========================================================
    };





    ///Converts these stubs, ess_rack.activeFrags, to
    ///     1. ess_rack.builtFrags ( depending on app mode )
    ///     2. creates dom-placeholders for essaion's fragments which not yet created
    ///     3. and makes final fragments parsing: BodyMathJax_2_HTML( domComponents[ fix ] )
    ///      
    ///This function visualizes the texts upon the mode
    ///at late run-time event, this function is, for example,
    ///used in lemma-2-3::gui-visibility.js::refreshSVG_master()
    ///
    function repopulateContent()
    {
        var esseyions_rack = topics.esseyions_rack;

        //??? outdated comment??: purges all contents and can be a bug
        //bs tabs are transcluded into the same el:
        //sDomN.essaionsRoot$.html('');
        esseyions_rack.forEach( function( ess_rack ) {


            activeFrags_2_htmlFrags( ess_rack );
            //above line produces this: ess_rack.builtFrags
            //as furthre-processed-fragments-of-essaion


            var domComponents = ess_rack.domComponents;
            ess_rack.builtFrags.forEach( function( bFrag, fix ) {
                /*
                if( !ess_rack.domEl ) {
                    ccc( 'missed ess_rack.domEl ' );
                    return; //todo patch ... rethink landing scenario
                }
                */
                if( !domComponents[fix] ) {
                    domComponents[fix] = $$
                        .c('div')
                        .css( 'display', 'inline' )
                        //*******************************************************
                        //.here page content injects into html for the first time
                        //*******************************************************
                        .to( ess_rack.domEl )
                        ();
                    domComponents[fix].innerHTML = bFrag.text;
                    BodyMathJax_2_HTML( domComponents[ fix ] );
                }
                //todm: ineffective: do throttle or create html only once and
                //      update only CSS-display
                if( bFrag.modeIsTogglable ) {
                    domComponents[fix].innerHTML = bFrag.text;
                    BodyMathJax_2_HTML( domComponents[ fix ] );
                }
            });
        });
    }



    //===============================================
    //
    //===============================================
    function activeFrags_2_htmlFrags( ess_rack )
    {
        var builtFrags = ess_rack.builtFrags;
        ess_rack.activeFrags.forEach( function( activeFrag, tix ) {

            //--------------------------------------------------------
            // //\\ finalizes script active instructions
            //--------------------------------------------------------
            if( typeof( activeFrag ) === 'object' ) {
                var finalActive = activeFrag['default'];
                Object.keys( ssModes ).forEach( function( smode ) {
                    finalActive = ( ssModes[smode] && activeFrag[smode] ) || finalActive;
                    //if( ssModes[smode] && activeFrag[smode] )
                    //ccc( 'new script:' + ( ssModes[smode] && activeFrag[smode] ) );
                });
            } else {
                var finalActive = activeFrag;
            }
            //--------------------------------------------------------
            // \\// finalizes script active instructions
            //--------------------------------------------------------



            //--------------------------------------------------------
            // //\\ html conversion of body fragments
            //--------------------------------------------------------
            txt = finalActive; //.replace( re_amp, '&amp;' );
            if( topics.convert_lineFeed2htmlBreak ) {
                //.converts text from <pre> format
                var txt = ns.pre2fluid( txt ) 
            }
            if( typeof( activeFrag ) === 'object' ) {
                ////reparses text every time ...
                ////todm: ineffective ... parses toggles at "each change"
                var txt = txt.replace( topAnch_reg, replWithAnchor );
                builtFrags[tix] =
                {
                    modeIsTogglable : true,
                    text : txt
                };
            } else {
                ////makes it up only once ... no redundant parsing
                if( !builtFrags[tix] ) {
                    var txt = txt.replace( topAnch_reg, replWithAnchor );
                    builtFrags[tix] =
                    {
                        modeIsTogglable : false,
                        text : txt
                    };
                }
            }

            function replWithAnchor( match, skey, scaption )
            {
                var rack = topics.topicLinks[ skey ];
                if( !rack ) return;
                //.we cannot use skey because spaces inside of it, so
                //.we use colorId
                var repl = '<a class="tl-' + rack.colorId + '">'+ scaption + '</a>';
                return repl;
            }
            //--------------------------------------------------------
            // \\// html conversion of body fragments
            //--------------------------------------------------------

        });
    }


    function topLinks_2_colors()
    {
        var SATUR = 99;
        var LIGHT = 30;
        var OPACITY = 0.6;
        var colorsCount = topicIndexedLinks.length;
        topicIndexedLinks.forEach( ( tLink, cCount ) => {
            var hue = 359 / colorsCount * cCount;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, OPACITY );
            tLink.rgba = corRack.rgba;
            tLink.rgbaCSS = corRack.rgbaCSS;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, 1 );
            tLink.rgb1 = corRack.rgba;
        });

        ns.eachprop( topicShapes, ( shape, scount ) => {
            var sc = shape.shapesCount;
            var rem = sc%2;
            var zebra = rem ? (sc-rem)/2 : sc/2 + Math.floor( shapesCount / 2 );
            var hue = 359 / shapesCount * zebra;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, OPACITY );
            shape.rgba = corRack.rgba;
            shape.rgbaCSS = corRack.rgbaCSS;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, 1 );
            shape.rgb1 = corRack.rgba;
        });
    }


    function BodyMathJax_2_HTML( domEl )
    {
        mathJax_2_HTML();
        ///===============================================
        /// waits for MathJax and fires it up over domEl
        ///===============================================
        function mathJax_2_HTML()
        {
            if( !window.MathJax ) {
                //c cc( 'Still waiting for MathJax. Timestamp=' + Date.now() );
                //.no way to avoid this ... mj doc does not help:
                setTimeout( mathJax_2_HTML, 100 );
                return;
            }
            //c cc( 'MathJax is loaded. ' + Date.now() );

            //MathJax.Hub.Typeset() 
            //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"script"]);
            //function hideFlicker() { contentDom.style.visibility = 'hidden'; }
            //function unhideAfterFlicker() { contentDom.style.visibility = 'visible'; }

            MathJax.Hub.Queue(["Typeset",MathJax.Hub,domEl]);
        }
    }


    function establishCurrentMode()
    {
        // //\\ gets established theorion-aspect mode
        var mediaClass = sDomN.mmedia$._cls() || '';
        var essayAspects = mediaClass.match( /(?:\s|^)essay-(\S*)/ );
        // \\// gets established theorion-aspect mode

        //=====================================================
        // //\\ makes only one media-model togglable visibility
        //=====================================================
        //      othe theo-asp modes are simply ignored
        if( essayAspects ) {
            essayAspects = essayAspects[1].split( '--' );
            ///makes media-model visible only like by
            ///bsl-approot theorion--claim aspect--english
            oneTimeUse_globalCSS += `
                .${cssp}-approot .${cssp}-media-superroot {
                    display:none;
                }
                .${cssp}-approot.theorion--${essayAspects[0]}.aspect--${essayAspects[1]}
                .${cssp}-media-superroot {
                    display:inline-block;
                }
            `;
        }
        //=====================================================
        // \\// makes only one media-model togglable visibility
        //=====================================================
    }


    ///collecting |...|..|| anchor-topics
    ///does loop via all possible active fragments
    function extractLinks( activeFrag )
    {
        var topicPreAnchors = activeFrag.match( topAnch_reg );
        if( topicPreAnchors ) {
            topicPreAnchors.forEach( link => {
                ////loops via all anchors having topic-link tl-TOPIC
                if( !link ) return;
                var parsedLink = link.match( topAnch_reg2 );

                //=========================================
                // //\\ indexes topic links and colors
                //=========================================
                var topicId = parsedLink[1];
                if( !topicLinks.hasOwnProperty( topicId ) ) {
                    var colorIx = topicsCount++;
                    topicIndexedLinks[ colorIx ] =
                    topicLinks[ topicId ] = {
                        colorIx:colorIx,
                        colorId:colorIx+'',
                        shapes:{},
                        link:parsedLink[2]
                    };
                }
                var tLink = topicLinks[ topicId ];
                var colorIx = tLink.colorIx;
                //=========================================
                // \\// indexes topic links and colors
                //=========================================

                //=========================================
                // //\\ indexes shapes locally and globally
                //=========================================
                var parsedLinks = topicId.split( SPACE_reg );
                parsedLinks.forEach( shapeId_ => {

                    var shapeId = shapeId_.replace( /([A-Z])/g, ( match, key1 ) => (
                        '_' + key1.toLowerCase()
                    ));
                    //ccc( shapeId );
                    tLink.shapes[ shapeId ] = true;
                    if( !topicShapes.hasOwnProperty( shapeId ) ) {
                        topicShapes[ shapeId ] = {
                            topicId : topicId,
                            colorIx:colorIx,
                            shapesCount:shapesCount,
                            shapeId : shapeId
                        }
                        shapesCount++;
                    }
                });
                //=========================================
                // \\// indexes shapes locally and globally
                //=========================================
            });
        }
    }

}) ();


