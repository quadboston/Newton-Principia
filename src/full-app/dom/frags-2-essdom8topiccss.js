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
    //abandoned var pseudoLink  = sn('pseudoLink',ssD, []);
    var rg          = sn('registry',ssD);
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);
    var exegs       = sn('exegs', ssD);

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
        '¦([^¦]+)¦' +   //catches tplinkConf
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
    return;










    ///this function needs application-model-view already created;
    ///as of this version, it is executed only once
    ///
    ///called from main.js::bgImagesAreLoaded()...
    ///
    function frags__2__dom_css_mjax_tpanchors()
    {
        ns.eachprop( exegs, ( theorionAspects, teaf_id ) => {
            ns.eachprop( theorionAspects, ( exeg, leaf_id ) => {
                exeg.domEl = $$
                  .c('div')
                  .cls( exeg.classStr )
                  //*******************************************************
                  //.here page content injects into html for the first time
                  //*******************************************************
                  .to( sDomN.essaionsRoot$() )
                  ();

                ///collecting |...|..|| anchor-topics
                exeg.activeFrags.forEach( function( activeFrag, tix ) {
                    if( typeof( activeFrag ) === 'object' ) {
                        ns.eachprop( activeFrag, (avalue) => {
                            fragment_2_indexedTopics( avalue );
                        });
                    } else {
                        //.strange why TOP_ANCH_REG_gu (with flag "g") works
                        //.and TOP_ANCH_REG_u does not
                        fragment_2_indexedTopics( activeFrag );
                    }
                });
            });
        });
        topics_2_topicsColorModel();

        exegs_2_tpAn8dom8mjax();
        //this is moved into MathJax callback: setTimeout( sDomF.tpanch2mjax, 3000 );

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





    ///Converts these stubs, exeg.activeFrags, to
    ///     1. exeg.builtFrags ( depending on app mode )
    ///     2. creates dom-placeholders for essaion's fragments which not yet created
    ///     3. and makes final fragments parsing: BodyMathJax_2_HTML( domComponents[ fix ] )
    ///

    ///start here: crack/understand this:

    ///This function visualizes the texts upon the mode
    ///at late run-time event, this function is, for example,
    ///used in lemma-2-3::gui-visibility.js::refreshSVG_master()
    ///
    function exegs_2_tpAn8dom8mjax()
    {
        ns.eachprop( exegs, ( theorionAspects, teaf_id ) => {
            ns.eachprop( theorionAspects, ( exeg, leaf_id ) => {
                exeg.builtFrags = [];
                anchConfigs_2_anchors( exeg );
                //as further-processed-fragments-of-exeg
                exeg.builtFrags.forEach( function( bFrag, fix ) {
                    ns.eachprop( bFrag.activeFrags, (afrag,fid) => {
                        afrag_2_dom8mj( exeg, afrag, fid );
                    });
                });
            });
        });
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
            BodyMathJax_2_HTML( bFrag.dom$() );
        }
    }



    //===========================================================
    // normalizes scriptedAnchors to form <a ... tl-NNNNN dix ...
    //===========================================================
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
            ns.eachprop( activeFrag, ( afrag, akey ) => {
                ////normalizes scriptedAnchors to form <a ... tl-NNNNN dix ...
                newfrags[ akey ] =
                    { activeFrag : afrag.replace( TOP_ANCH_REG_gu, replWithAnchor ) }
            });
            exeg.builtFrags[ tix ] = { activeFrags : newfrags };
        });
        return;

        //--------------------------------------------------------
        // //\\ html conversion of body fragments
        //--------------------------------------------------------
        function replWithAnchor( match, skey, scaption, cflag, farFlag, remainder )
        {
            var rack = topics.id2tplink[ skey ];
            if( !rack ) return;
            var dix = cflag ? ' delayed-anchor' : '';
            dix += farFlag ? ' delayed-far' : '';
            
            //.we cannot use skey because spaces inside of it, so
            //.we use tplink_ix_str
            var repl = '<a class="tl-' + rack.tplink_ix + dix + '">'+ scaption +
                       '</a>' + (remainder || '' );
            return repl;
        }
        //--------------------------------------------------------
        // \\// html conversion of body fragments
        //--------------------------------------------------------
    }


    function topics_2_topicsColorModel()
    {
        var SATUR = 99;

        //:this solution is not good:
        //:some lemmas need bright red, but
        //:bright green text is hard to read ...
        //:so we resort to dark color LIGHT = 30
        //var LIGHT = 40;
        var LIGHT = sconf.default_tp_lightness ||  30;
        var OPACITY = 0.6;

        var colorsCount = ix2tplink.length;
        ns.eachprop( ssD.topics.id2topic, ( topi_c, scount ) => {
            var sc = topi_c.topicsCount;
            var rem = sc%2;
            var zebra = rem ? (sc-rem)/2 : sc/2 + Math.floor( topicsCount / 2 );
            var hue = 359 / topicsCount * zebra;
            var opacity = OPACITY;

            var fc = topi_c['fixed-color'];
            if( fc ) {
                var overridden = ns.rgba2hsla( fc );
                hue = overridden[ 0 ];
                var opacity = overridden[ 3 ] || OPACITY;
            }

            var corRack = ns.pars2colors( hue, SATUR, LIGHT, opacity );
            topi_c.rgba_low = corRack.rgba;
            topi_c.rgbaCSS = corRack.rgbaCSS;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, 1 );
            topi_c.rgba_high = corRack.rgba;
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
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,domEl], [sDomF.tpanch2mjax,domEl]);
        }
    }



    ///*************************************************************
    ///collects |...|..|| - like preanchor-topics by TOP_ANCH_REG;
    ///does loop via all possible active fragments;
    ///*************************************************************
    function fragment_2_indexedTopics( activeFrag )
    {
        /*
        abandoned
        if( Array.isArray( activeFrag ) ) {
            ////we met common app link
            var topicPreAnchors = [ '¦' + activeFrag.join( ' ' ) + '¦pseudo¦¦' ];
        } else {
        */

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
                //ccc( 'tplinkConf='+tplinkConf );
                //=========================================

                //=========================================
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
                        'fixed-color' : ns.haz( ssD['fixed-colors'], tplinkConf ),
                    };
                }
                var tplink = id2tplink[ tplinkConf ];
                var tplink_ix = tplink.tplink_ix;
                //=========================================
                // \\// indexes topic links and colors
                //=========================================

                //=========================================
                // //\\ indexes shapes locally and globally
                //=========================================
                // splits anchor-configuration to smaller tokens, each
                // token for separate shape
                tplink.raw_tpIDs = tplinkConf.split( SPACE_reg );

                // loops via separate shapes
                tplink.raw_tpIDs.forEach( tpid_ => {

                    //..........................................................
                    if( 'cssbold' === tpid_ ) {
                        tplink.anchorIsBold = true;
                        return;
                    } else if( 'css-no-color-to-shapes' === tpid_ ) {
                        tplink.cssNoColorToShapes = true;
                        return;
                    }
                    //..........................................................


                    var tpid = topicIdUpperCase_2_underscore( tpid_ );
                    tplink.tpid2true[ tpid ] = true;

                    ///recall: ssD.topics.id2topic,
                    ///if tpid is not yet ready added
                    if( !id2topic.hasOwnProperty( tpid ) ) {
                        id2topic[ tpid ] = {
                            tplinkConf      : tplinkConf,
                            'fixed-color'   : ns.haz( ssD['fixed-colors'], tpid ),
                            tplink_ix       : tplink_ix,
                            topicsCount     : topicsCount, //implicit index
                            tpid            : tpid,
                        }
                        topicsCount++;
                    }
                });
                //=========================================
                // \\// indexes shapes locally and globally
                //=========================================
            });
        }
    }


    function topicIdUpperCase_2_underscore( topicId )
    {
        return topicId.replace( /([A-Z])/g,
            ( match, key1 ) => ( '_' + key1.toLowerCase() )
        );
    }


}) ();


