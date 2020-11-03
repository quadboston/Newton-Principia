( function() {
    var {
        ns, sn, $$, cssp,
        haz,
        sconf,
        rg,
        sDomN,
        ssD,
        sDomF,
        exegs,
        references,
        topics,
        amode,
        eachprop,
    } = window.b$l.apptree({
    });


    var oneTimeUse_globalCSS = '';

    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var tplinkCount = 0;

    //: lemma-wise constructs
    var topicsCount = 0; //indexes shapes lemma-wise
    var id2topic    = topics.id2topic = {};

    var id2tplink   = topics.id2tplink = {};
    var ix2tplink   = topics.ix2tplink = [];

    var SPACE_reg = /\s+/;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    var TOP_ANCH_REG = 
        '(¦[^¦]+|)¦' +  //catches tplinkConf
        '([^¦]+)'   +   //catches topic caption
        '¦¦'        +   //catches topic terminator
        '(?:(¦)(¦)*' +  //catches delayed topc-link for MathJax sibling
        '|(\n|.)|$)';   //catches remainder for later accurate replacement

    //flag: u 	"unicode"; treat a pattern as a sequence of unicode code points.
    var TOP_ANCH_REG_gu = new RegExp( TOP_ANCH_REG, 'gu' );
    //.adding flag "g" ruins the job ... why?
    var TOP_ANCH_REG_u = new RegExp( TOP_ANCH_REG, 'u' );
    //---------------------------------------------
    // \\// topic engine variables
    //---------------------------------------------

    sDomF.frags__2__dom_css_mjax_tpanchors = frags__2__dom_css_mjax_tpanchors;
    sDomF.topicIdUpperCase_2_underscore = topicIdUpperCase_2_underscore;
    sDomF.colorArray_2_rgba = colorArray_2_rgba;
    return;



















    ///this function needs application-model-view already created;
    ///as of this version, it is executed only once
    ///
    ///called from main.js::bgImagesAreLoaded()...
    ///
    function frags__2__dom_css_mjax_tpanchors()
    {
        exegs__2__dom_indexedLinks_indexedTopics();
        topics__2__topicsColorModel();
        exegs__2__tpAn8dom8mjax();

        //this is moved into MathJax callback:
        //setTimeout( sDomF.tpanch2mjax, 3000 );

        //todo ... this pollutes the code ... set in separate css for topics
        oneTimeUse_globalCSS += `
            .${cssp}-text-widget .exeg-frag {
                display : none;
            }
            .${cssp}-text-widget .active-static {
                display : inline;
            }
            .${cssp}-text-widget .delayed-far,
            .${cssp}-text-widget .delayed-anchor {
                display : none;
            }
        `;
        ns.globalCss.update( oneTimeUse_globalCSS );
        sDomF.tpAnchors_2_anchors8media_css();
        sDomN.topicModelInitialized = true;
    };




    ///builds
    ///         subexeg.subessayCaption
    ///         subexeg.domTogglerEl$
    ///         subexeg.domEl$
    ///collects fragment__2__indexed_links8topics

    function exegs__2__dom_indexedLinks_indexedTopics()
    {
        eachprop( exegs, ( theorionAspects, mcat_id ) => {
            eachprop( theorionAspects, ( exAspect, scat_id ) => {
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    //====================================================
                    // //\\ creates text and toggler elements
                    //====================================================
                    if( exAspect.subexegs.length > 1) {
                        subexeg.subessayCaption =
                                haz( subexeg.essayHeader, 'subessayCaption' ) ||
                                haz( subexeg.essayHeader, 'menuCaption' ) ||
                                subexeg.essayHeader.subessay;
                        subexeg.domTogglerEl$ = $$
                          .c('div')
                          .html( subexeg.subessayCaption )
                          .cls( 'subessay-toggler highlight-text-disabled' )
                          .e( 'click', () => {
                                amode.subessay = subexeg.essayHeader.subessay;
                                sDomF.menu2lemma();
                          })
                          ;
                    }
                    subexeg.domEl$ = $$
                      .c('div')
                      .cls( subexeg.classStr )
                      ;
                    subexeg.domEl = subexeg.domEl$();
                    //====================================================
                    // \\// creates text and toggler elements
                    //====================================================

                    ///collecting |...|..|| anchor-topics
                    subexeg.activeFrags.forEach( function( activeFrag, tix ) {
                        if( typeof( activeFrag ) === 'object' ) {
                            eachprop( activeFrag, (avalue) => {
                                fragment__2__indexed_links8topics( avalue );
                            });
                        } else {
                            //.strange why TOP_ANCH_REG_gu (with flag "g") works
                            //.and TOP_ANCH_REG_u does not
                            fragment__2__indexed_links8topics( activeFrag );
                        }
                    });
                });

                //************************************************************
                // //\\ here page content injects into html for the first time
                //      this does not mangage their visibility,
                //      lemma-master-menu and toggler click do manage
                //      this visibility,
                //************************************************************
                ///puts togglers on top
                if( exAspect.subexegs.length > 1 ) {
                    var subessayMenuContainer$ = exAspect.subessayMenuContainer$ = $$
                        .c( 'div' )
                        .cls( 'subessay-menu-container highlight-text-disabled' )
                        .to( sDomN.essaionsRoot$ )
                        ;
                    exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                        subexeg.domTogglerEl$.to( subessayMenuContainer$ );
                        $$.c('span').html('<br>').to( subessayMenuContainer$ );
                    });
                }
                ///puts bodies to the bottom
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    subexeg.domEl$.to( sDomN.essaionsRoot$ );
                });
                //************************************************************
                // \\// here page content injects into html for the first time
                //************************************************************
            });
        });
    }







    ///Converts these stubs, exeg.activeFrags, to
    ///     1. exeg.builtAFrags ( depending on app mode )
    ///     2. creates dom-placeholders for essaion's fragments which not yet created
    ///     3. and makes final fragments parsing: BodyMathJax_2_HTML( domComponents[ fix ] )
    ///

    ///This function visualizes the texts upon the mode
    ///at late run-time event, this function is, for example,
    ///used in lemma-2-3::gui-visibility.js::refreshSVG_master()
    ///
    function exegs__2__tpAn8dom8mjax()
    {
        eachprop( exegs, ( theorionAspects, mcat_id ) => {
            eachprop( theorionAspects, ( exAspect, scat_id ) => {
                exAspect.subexegs.forEach( ( exeg, exegId ) => {
                    //if( exegId === 0 ) {
                        exeg.builtAFrags = [];
                        anchConfigs_2_anchors( exeg );
                        //as further-processed-fragments-of-exeg
                        exeg.builtAFrags.forEach( function( bFrag, fix ) {
                            eachprop( bFrag.activeFrags, (afrag,fid) => {
                                afrag_2_dom8mj( exeg, afrag, fid );
                            });
                        });
                    //}
                });
            });
        });
        return;

        function afrag_2_dom8mj( exeg, bFrag, fid )
        {
            //*******************************************************
            //.here page content injects into html for the first time
            //*******************************************************
            bFrag.dom$ = $$.c('div').to( exeg.domEl );
            bFrag.dom$.cls( 'active-'+fid + ' exeg-frag');
            oneTimeUse_globalCSS += `
                .${cssp}-text-widget.active-${fid} .active-${fid} {
                    display : inline;
                }
            `;
            bFrag.dom$.html( bFrag.activeFrag );
            //-----------------------------------------------------------------------
            // //\\ inserts book-references in DOM
            //      by html-attribute "book-reference-id"
            //-----------------------------------------------------------------------
            var breferences = bFrag.dom$().querySelectorAll( '[book-reference-id]' );
            breferences.forEach( sel => {
                var skey = sel.getAttribute( 'book-reference-id' );
                var ref = haz( ssD.bookReferences, skey );
                if( ref ) {
                    sel.innerHTML = ref;
                }
            });
            //-----------------------------------------------------------------------
            // \\// inserts book-references in DOM
            //-----------------------------------------------------------------------

            BodyMathJax_2_HTML( bFrag.dom$() );
        }
    }



    //===========================================================
    // normalizes scriptedAnchors to form <a ... tl-NNNNN dix ...
    //===========================================================
    ///Input:   exeg.activeFrags
    ///Output:  exeg.builtAFrags
    ///         format is: exeg.builtAFrags[ index_in_exeg.activeFrags ] =
    ///                    { activeFrags : newfrags }
    ///                    newfrags[ akey ] =
    ///                              { activeFrag : afrag-body }
    ///                        akey = 'static', ...
    function anchConfigs_2_anchors( exeg )
    {
        exeg.activeFrags.forEach( function( activeFrag, tix ) {
            if( typeof( activeFrag ) !== 'object' ) {
                ////normalizes activeFrag to form { prop:value } for non active fragment;
                ////for active fragments, there can be any string for the "prop" and
                ////any number of props;
                activeFrag = { 'static' : activeFrag };
            }
            var newfrags = {};
            eachprop( activeFrag, ( afrag, akey ) => {
                ////normalizes scriptedAnchors to form <a ... tl-NNNNN dix ...
                newfrags[ akey ] =
                    { activeFrag : afrag.replace( TOP_ANCH_REG_gu, replWithAnchor ) }
            });
            exeg.builtAFrags[ tix ] = { activeFrags : newfrags };
        });
        return;

        //--------------------------------------------------------
        // //\\ html conversion of body fragments
        //--------------------------------------------------------
        // todo: to fix the bug, topics and links ids must be collected here.
        //       perhaps make a special parser for |...|| incursions.

        function replWithAnchor(
            match,          //total match:      ¦anchor config¦anchor caption¦¦
            skey,           //¦anchor config
            scaption,       //anchor caption
            cflag,          //close flag ¦
            farFlag,        //far flag   ¦
            remainder       //not sure what is this
        ){

            ///we must do skey preporcessing again, for time 2 out of 2:
            ///do handle strip==='' or generate skey
            if( skey === '' ) {
                skey = scaption;
            } else {
                skey = skey.substring( 1, skey.length );
                //ccc( 'link=', match[0], skey );
            }

            var rack = topics.id2tplink[ skey ];
            if( !rack ) return;
            var dix = cflag ? ' delayed-anchor' : '';
            dix += farFlag ? ' delayed-far' : '';
            
            //.we cannot use skey because spaces inside of it, so
            //.we use tplink_ix_str
            //.todm ... this is a real bug: tplink_ix does not count all links with
            //          the same config, same skey. So, different targets will be "killed", and
            //          there will be only one target.
            var repl = '<a class="tl-' + rack.tplink_ix + dix + '">'+ scaption +
                       '</a>' + (remainder || '' );
            return repl;
        }
        //--------------------------------------------------------
        // \\// html conversion of body fragments
        //--------------------------------------------------------
    }


    function topics__2__topicsColorModel()
    {
        var SATUR   = sconf.DEFAULT_TP_SATUR;
        var LIGHT   = sconf.default_tp_lightness || sconf.DEFAULT_TP_LIGHT;
        var OPACITY = sconf.DEFAULT_TP_OPACITY;

        var colorsCount = ix2tplink.length;
        eachprop( ssD.topics.id2topic, ( topi_c, scount ) => {
            var fc = topi_c['fixed-color'];
            if( fc ) {
                /*
                if( topi_c.tpid === '_sc' ) {
                     ccc(  'tpid after conversion: ' +
                            'fc=',fc,
                            // 'lh=', lh
                     );
                }
                */
                var lh = colorArray_2_rgba( fc )

            } else {
                var sc = topi_c.topicsCount;
                var rem = sc%2;
                var zebra = rem ? (sc-rem)/2 : sc/2 + Math.floor( topicsCount / 2 );
                var hue = 359 / topicsCount * zebra;
                var lh = hslo_2_low8high( hue, SATUR, LIGHT, OPACITY );
            }
            Object.assign( topi_c, lh );
        });
    }

    function hslo_2_low8high( hue, sat, light, op )
    {
        var corRack     = ns.pars2colors( hue, sat, light, op );
        rgba_low        = corRack.rgba;
        rgbaCSS         = corRack.rgbaCSS;
        var corRack     = ns.pars2colors( hue, sat, light, 1 );
        rgba_high       = corRack.rgba;
        return { rgba_low, rgba_high }; 
    }

    ///color low    goes to supplied-color or default,
    ///color height goes to opacity = 1
    function colorArray_2_rgba( colorArray )
    {
        var SATUR = sconf.DEFAULT_TP_SATUR;
        var LIGHT = sconf.default_tp_lightness || sconf.DEFAULT_TP_LIGHT;

        //.apparently does job as said: color to color
        var overridden = ns.rgba2hsla( colorArray );
        hue = overridden[ 0 ];
        var opacity = overridden[ 3 ] || overridden[ 3 ] === 0 ?
                        overridden[ 3 ] :
                        sconf.DEFAULT_TP_OPACITY;
        //.for grey or black color: we set satur to 0 manually
        var satur = overridden[1] === 0 ? 0 : SATUR;
        //.apparently does the color as is, but for high, opacity is set to 1
        return hslo_2_low8high( hue, satur, LIGHT, opacity );
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
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,domEl], [sDomF.tpanch2mjax,domEl]);
        }
    }



    ///*************************************************************
    ///collects |...|..|| - like preanchor-topics by TOP_ANCH_REG;
    ///does loop via all possible active fragments;
    ///*************************************************************
    function fragment__2__indexed_links8topics( activeFrag )
    {
        var topicPreAnchors = activeFrag.match( TOP_ANCH_REG_gu );

        if( topicPreAnchors ) {
            topicPreAnchors.forEach( link => {
                ////loops via all anchors having topic-link tl-TOPIC
                if( !link ) return;

                //by RegExp( TOP_ANCH_REG, 'u' );
                var parsedLink = link.match( TOP_ANCH_REG_u );
                //=========================================
                // //\\ indexes topic links and colors
                //=========================================

                //=========================================
                //tplinkConf is a set of raw_tpIDs;
                //This is pre-anchor index and not the "unique key".
                //But it is an index of id2tplink.
                //(Recall beginning of '¦([^¦]+)¦' ... which catches tplinkConf.)
                var tplinkConf = parsedLink[1];
                ///we must do key preporcessing, for time 1 out of 2:
                ///handle strip '' or generate key
                if( tplinkConf === '' ) {
                    ////no config found, taking caption as config
                    tplinkConf = parsedLink[2]
                } else {
                    ////config found, extracting it
                    tplinkConf = tplinkConf.substring( 1, tplinkConf.length );
                }
                //=========================================

                //=========================================
                // collects first link and "loses" others,
                // collects into id2tplink
                //
                ///this scenario makes tplink missed from tplink_ix index, but
                ///it does not matter because these links are searched and
                ///replaced again in aFrags_2_aFragsWithAnchor
                ///recall: id2tplink lives in lemma-scope.
                //=========================================
                if( !id2tplink.hasOwnProperty( tplinkConf ) ) {
                    //.it counts tplinkConf which "duplicates"
                    //.shapes or do not map to any shape
                    var tplink_ix = tplinkCount++;

                    //recall: ix2tplink and id2tplink do live in lemma-scope.
                    ix2tplink[ tplink_ix ] =
                    id2tplink[ tplinkConf ] = {
                        tplink_ix : tplink_ix,
                        tpid2true : {},
                        //link:parsedLink[2], not-used
                    };
                }
                var tplink = id2tplink[ tplinkConf ];
                var tplink_ix = tplink.tplink_ix;
                //=========================================
                // \\// indexes topic links and colors
                //=========================================

                //=========================================
                // //\\ indexes topics locally and globally
                //=========================================
                // splits anchor-configuration to smaller tokens, each
                // token for separate topic or for reserved-command
                tplink.raw_tpIDs = tplinkConf.split( SPACE_reg );

                var ANCH_COLOR_CAT_rg = /\*anch-color\*(.+)/;
                /// loops via separate topic IDs
                tplink.raw_tpIDs.forEach( tpid_ => {
                    //..........................................................
                    // //\\ checks for reserved topic categories
                    //      like '*anch-color', ...
                    //..........................................................
                    if( 'cssbold' === tpid_ ) {
                        tplink.anchorIsBold = true;
                        return;
                    } else if( '*anch-color' === tpid_ ) {
                        tplink.cssNoColorToShapes = true;
                        return;
                    } else if( tpid_.match( ANCH_COLOR_CAT_rg ) ) {
                        var ww = tplink.colorCateg = tpid_.match( ANCH_COLOR_CAT_rg );
                        //.fixed set to tp-link
                        tplink[ 'fixed-color' ] = haz( ssD['fixed-colors'], ww[1] );
                        return;
                    }
                    //..........................................................
                    // \\// checks for reserved topic categories
                    //..........................................................


                    var tpid = topicIdUpperCase_2_underscore( tpid_ );
                    //tplink has collection of topics,
                    //here is how this collection is populated:
                    tplink.tpid2true[ tpid ] = true;

                    ///recall: ssD.topics.id2topic,
                    ///if tpid is not yet ready added
                    if( !id2topic.hasOwnProperty( tpid ) ) {
                        id2topic[ tpid ] = {
                            tplinkConf      : tplinkConf,   //all other links are "lost" here
                            //.fixed color added to topic
                            'fixed-color'   : haz( ssD['fixed-colors'], tpid ),  //flag
                            tplink_ix       : tplink_ix,    //all other links are "lost" here
                            topicsCount     : topicsCount,  //implicit index
                            tpid            : tpid,         //just a self-reference
                        }
                        //further, id2topic[ tpid ] colors converted here:
                        //topics__2__topicsColorModel()
                        topicsCount++;
                    }
                });
                //=========================================
                // \\// indexes topics locally and globally
                //=========================================
            });
        }
    }

    ///converts "A" -> "_a",  ... and "," to "_-"
    function topicIdUpperCase_2_underscore( topicId )
    {
        return topicId.replace( /([A-Z,])/g,
            ( match, key1 ) => ( key1 === ',' ? '_-' : '_' + key1.toLowerCase() )
        );
    }


}) ();


