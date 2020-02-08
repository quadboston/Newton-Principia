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
    var rg          = sn('registry',ssD);
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);
    var exegs       = sn('exegs', ssD);

    var oneTimeUse_globalCSS = '';

    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var tplinkCount = 0;
    var shapesCount = 0;
    var topicLinks = topics.topicLinks = {};
    var shapeid2tshape = topics.shapeid2tshape = {};
    var topicIndexedLinks = topics.topicIndexedLinks = [];

    var SPACE_reg = /\s+/;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    var TOP_ANCH_reg = 
        '¦([^¦]+)¦' +   //catches tplinkConf
        '([^¦]+)'   +   //catches topic caption
        '¦¦'        +   //catches topic terminator
        '(?:(¦)(¦)*' +  //catches delayed topc-link for MathJax sibling
        '|(\n|.)|$)';   //catches remainder for later accurate replacement

    //flag: u 	"unicode"; treat a pattern as a sequence of unicode code points.
    var topAnch_reg = new RegExp( TOP_ANCH_reg, 'gu' );
    //.adding flag "g" ruins the job ... why?
    var topAnch_reg2 = new RegExp( TOP_ANCH_reg, 'u' );
    //---------------------------------------------
    // \\// topic engine variables
    //---------------------------------------------

    sDomF.frags_2_essdom8topiccss = frags_2_essdom8topiccss;
    return; //000000000000000000000000000000000000000000










    ///this function needs application-model-view already created;
    ///as of this version, it is executed only once
    ///
    ///called from main.js::bgImagesAreLoaded()...
    ///
    function frags_2_essdom8topiccss()
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
                        //.strange why topAnch_reg (with flag "g") works
                        //.and topAnch_reg2 does not
                        fragment_2_indexedTopics( activeFrag );
                    }
                });
            });
        });
        //ccc( 'topicLinks=', topics.topicLinks );
        topLinks_2_colors();

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
        sDomF.anchors2topiccss();
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
                    { activeFrag : afrag.replace( topAnch_reg, replWithAnchor ) }
            });
            exeg.builtFrags[ tix ] = { activeFrags : newfrags };
        });
        return;

        //--------------------------------------------------------
        // //\\ html conversion of body fragments
        //--------------------------------------------------------
        function replWithAnchor( match, skey, scaption, cflag, farFlag, remainder )
        {
            var rack = topics.topicLinks[ skey ];
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


    function topLinks_2_colors()
    {

        var SATUR = 99;

        //:this solution is not good:
        //:some lemmas need bright red, but
        //:bright green text is hard to read ...
        //:so we resort to dark color LIGHT = 30
        //var LIGHT = 40;
        var LIGHT = sconf.default_tp_lightness ||  30;
        var OPACITY = 0.6;

        var colorsCount = topicIndexedLinks.length;

        // //\\ apparently used only with alternative color-linking
        //      by anchor and not by shape sconf.topicColorPerAnchor
        topicIndexedLinks.forEach( ( tLink, cCount ) => {
            var hue = 359 / colorsCount * cCount;
            var opacity = OPACITY;
            if( tLink['fixed-color'] ) {
                //ccc( 'rgba=',tLink['fixed-color'] );
                var overridden = ns.rgba2hsla( tLink['fixed-color'] );
                hue = overridden[ 0 ];
                var opacity = overridden[ 3 ] || OPACITY;
            }
            //ccc( 'hsla=', [ hue, SATUR, LIGHT, OPACITY ] );
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, opacity );
            tLink.rgba = corRack.rgba;
            tLink.rgbaCSS = corRack.rgbaCSS;
            var corRack = ns.pars2colors( hue, SATUR, LIGHT, 1 );
            tLink.rgb1 = corRack.rgba;
        });
        // \\// apparently used only with alternative color-linking


        ns.eachprop( shapeid2tshape, ( shape, scount ) => {
            var sc = shape.shapesCount;
            var rem = sc%2;
            var zebra = rem ? (sc-rem)/2 : sc/2 + Math.floor( shapesCount / 2 );
            var hue = 359 / shapesCount * zebra;
            var opacity = OPACITY;

            var fc = shape['fixed-color'];
            if( fc ) {
                var overridden = ns.rgba2hsla( fc );
                hue = overridden[ 0 ];
                var opacity = overridden[ 3 ] || OPACITY;
            }

            var corRack = ns.pars2colors( hue, SATUR, LIGHT, opacity );
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
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,domEl], [sDomF.tpanch2mjax,domEl]);
        }
    }



    ///*************************************************************
    ///collects |...|..|| - like preanchor-topics by TOP_ANCH_reg;
    ///does loop via all possible active fragments;
    ///*************************************************************
    function fragment_2_indexedTopics( activeFrag )
    {
        //by RegExp( TOP_ANCH_reg, 'gu' );
        var topicPreAnchors = activeFrag.match( topAnch_reg );

        if( topicPreAnchors ) {
            topicPreAnchors.forEach( link => {
                ////loops via all anchors having topic-link tl-TOPIC
                if( !link ) return;

                //by RegExp( TOP_ANCH_reg, 'u' );
                var parsedLink = link.match( topAnch_reg2 );
                //=========================================
                // //\\ indexes topic links and colors
                //=========================================


                //=========================================
                //tplinkConf is a set of shapeIds;
                //This is pre-anchor index and not the "unique key".
                //But it is an index of topicLinks.
                //(Recall beginning of '¦([^¦]+)¦' ... which catches tplinkConf.)
                var tplinkConf = parsedLink[1];
                //ccc( 'tplinkConf='+tplinkConf );
                //=========================================

                //=========================================
                ///this scenario makes tplink missed from tplink_ix index, but
                ///it does not matter because these links are searched and
                ///replaced again in aFrags_2_aFragsWithAnchor
                ///recall: topicLinks lives in lemma-scope.
                //=========================================
                if( !topicLinks.hasOwnProperty( tplinkConf ) ) {

                    //.it counts tplinkConf which "duplicates"
                    //.shapes or do not map to any shape
                    var tplink_ix = tplinkCount++;

                    //recall: topicIndexedLinks lives in lemma-scope.
                    topicIndexedLinks[ tplink_ix ] =
                    topicLinks[ tplinkConf ] = {
                        tplink_ix : tplink_ix,
                        shapeid_2_isshape : {},
                        //link:parsedLink[2], not-used
                        'fixed-color' :
                            ns.h( ssD, 'fixed-colors' ) &&
                            ns.haz( ssD['fixed-colors'], tplinkConf )
                    };
                }
                var tLink = topicLinks[ tplinkConf ];
                var tplink_ix = tLink.tplink_ix;
                //=========================================
                // \\// indexes topic links and colors
                //=========================================

                //=========================================
                // //\\ indexes shapes locally and globally
                //=========================================
                // splits anchor-configuration to smaller tokens, each
                // token for separate shape
                var shapeIDs = tplinkConf.split( SPACE_reg );
                tLink.shapeIDs = shapeIDs;

                // loops via separate shapes
                shapeIDs.forEach( shapeId_ => {
                    var shapeId =
                        shapeId_.replace( /([A-Z])/g, ( match, key1 ) => (
                            '_' + key1.toLowerCase()
                        ));
                    //ccc( shapeId );
                    tLink.shapeid_2_isshape[ shapeId ] = true;

                    //..........................................................
                    ///patch: todm:
                    ///some atomic-shape-predefined-reserverd-words have
                    ///effect on their siblings in their anchor-definition-group
                    if( 'cssbold' === shapeId ) {
                        tLink.anchorIsBold = true;
                    }
                    //..........................................................

                    ///recall: shapeid2tshape lives in lemma-scope
                    if( !shapeid2tshape.hasOwnProperty( shapeId ) ) {
                        shapeid2tshape[ shapeId ] = {
                            tplinkConf      : tplinkConf,
                            'fixed-color'   : tLink[ 'fixed-color' ],
                            tplink_ix       : tplink_ix,
                            shapesCount     : shapesCount,
                            shapeId         : shapeId,
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


