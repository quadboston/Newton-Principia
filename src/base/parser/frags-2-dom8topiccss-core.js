( function() {
    var {
        ns, sn, $$, cssp,
        nspaste, haz,
        sconf,
        rg,
        sDomN,
        ssD,
        sDomF,
        ssF,
        exegs,
        topics,
        normId2topic,
        id2tplink,
        ix2tplink,
        amode,
        eachprop,
    } = window.b$l.apptree({
        ssFExportList :
        {
            BodyMathJax_2_HTML,
            fragment__2__indexed_links8topics,
            normalizes___active8static_fragments,
            builtFrags_2_dom8mj,
        },
    });

    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var tplinkCount = 0;

    //: lemma-wise constructs
    //var topicsCount = 0; //indexes shapes lemma-wise

    var SPACE_reg = /\s+/;

    //todo: these regexes do proliferate in two files
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
    //.perhaps: "The g flag with match will only return multiple whole matches, not multiple sub-matches"
    //          https://stackoverflow.com/questions/19913667/javascript-regex-global-match-groups
    var TOP_ANCH_REG_u = new RegExp( TOP_ANCH_REG, 'u' );
    //---------------------------------------------
    // \\// topic engine variables
    //---------------------------------------------
    return;







    ///*************************************************************
    ///collects |...|..|| - like preanchor-topics by TOP_ANCH_REG;
    ///does loop via all possible active fragments;
    ///*************************************************************
    function fragment__2__indexed_links8topics( rawActFrValue )
    {
        var topicPreAnchors = rawActFrValue.match( TOP_ANCH_REG_gu );

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
                tplink.raw_tpIDs.forEach( tpid_user => {
                    //..........................................................
                    // //\\ checks for reserved topic categories
                    //      like '*anch-color', ...
                    //..........................................................
                    if( 'cssbold' === tpid_user ) {
                        tplink.anchorIsBold = true;
                        return;
                    } else if( '*anch-color' === tpid_user ) {
                        tplink.cssNoColorToShapes = true;
                        return;
                    } else if( tpid_user.match( ANCH_COLOR_CAT_rg ) ) {
                        var ww = tplink.colorCateg = tpid_user.match( ANCH_COLOR_CAT_rg );
                        //.fixed set to tp-link
                        tplink[ 'fixed-color' ] = haz( ssD['fixed-colors'], ww[1] );
                        return;
                    }
                    //..........................................................
                    // \\// checks for reserved topic categories
                    //..........................................................


                    var tpid_norm = sDomF.topicIdUpperCase_2_underscore( tpid_user );
                    //tplink has collection of topics,
                    //here is how this collection is populated:
                    tplink.tpid2true[ tpid_norm ] = true;
                    sn( tpid_norm, normId2topic );
                });
                //=========================================
                // \\// indexes topics locally and globally
                //=========================================
            });
        }
    }


    function BodyMathJax_2_HTML( domEl, no_domEl_pretransformation, cbAfterMathJax )
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

            if( no_domEl_pretransformation ) {
                if( cbAfterMathJax ) {
                    MathJax.Hub.Queue([ "Typeset",MathJax.Hub,domEl ],
                                      [ cbAfterMathJax,domEl ] );
                } else {
                    MathJax.Hub.Queue([ "Typeset",MathJax.Hub,domEl ]);
                }
            } else {
                //MathJax.Hub.Typeset() 
                //MathJax.Hub.Queue(["Typeset",MathJax.Hub,"script"]);
                //function hideFlicker() { contentDom.style.visibility = 'hidden'; }
                //function unhideAfterFlicker() { contentDom.style.visibility = 'visible'; }
                MathJax.Hub.Queue(["Typeset",MathJax.Hub,domEl], [ssF.tpanch2mjax,domEl]);
            }
        }
    }

    //======================================================================
    // 1) normalizes active and static fragments and
    // 2) replaces scriptedAnchors with real anchors <a ... tl-NNNNN dix ...
    //======================================================================
    ///Input:   exeg.activeFrags
    ///Output:  exeg.built_act8stat_fragments
    ///         format is: exeg.built_act8stat_fragments[ index_in_exeg.activeFrags ] = ..
    ///         see at (*) below ...
    function normalizes___active8static_fragments( rawActiveFrag )
    {
        if( typeof( rawActiveFrag ) === 'object' ) {
            ////we have active fragments:
            ////     { name1 : fragBody_raw1,
            ////       name2 : fragBody_raw2,
            ////       ....
            var normalizedActiveFrag = nspaste( {}, rawActiveFrag );
        } else {
            ////normalizes rawActiveFrag string to comply with active fragments format:
            ////     { static : fragBody_raw,
            ////     }
            ////       ....
            var normalizedActiveFrag = { 'static' : rawActiveFrag };
        }
        var norFrRack = {};
        eachprop( normalizedActiveFrag, ( fragBody_raw, akey ) => {
            norFrRack[ akey ] = {
                //(*) format:
                fragBody    : fragBody_raw.replace( TOP_ANCH_REG_gu, replWithAnchor ),
                              //normalizes scriptedAnchors to form <a ... tl-NNNNN dix ...
                dom$        : 'to be defined later',
                //...       : ...
            };
        });
        return norFrRack;

        //--------------------------------------------------------
        // //\\ html conversion of body fragments
        //--------------------------------------------------------
        // todo: to fix the bug, topics and links ids must be collected here.
        //       perhaps make a special parser for |...|| incursions.

        function replWithAnchor(
            match,          //total match:      ¦anchor config¦anchor caption¦¦
            anchorConfig,    //¦anchor config
            scaption,       //anchor caption
            cflag,          //close flag ¦
            farFlag,        //far flag   ¦
            remainder       //not sure what is this
        ){

            ///we must do anchorConfig preporcessing again, for time 2 out of 2:
            ///do handle strip==='' or generate anchorConfig
            if( anchorConfig === '' ) {
                anchorConfig = scaption;
            } else {
                anchorConfig = anchorConfig.substring( 1, anchorConfig.length );
                //ccc( 'link=', match[0], anchorConfig );
            }

            var rack = topics.id2tplink[ anchorConfig ];
            if( !rack ) return;
            var dix = cflag ? ' delayed-anchor' : '';
            dix += farFlag ? ' delayed-far' : '';
            
            //.we cannot use anchorConfig because spaces inside of it, so
            //.we use tplink_ix_str
            //.todm ... this is a real bug: tplink_ix does not count all links with
            //          the same config, same anchorConfig.
            //          So, different targets will be "killed", and
            //          there will be only one target.
            var repl = '<a class="tl-' + rack.tplink_ix + dix + '">'+ scaption +
                       '</a>' + (remainder || '' );
            return repl;
        }
        //--------------------------------------------------------
        // \\// html conversion of body fragments
        //--------------------------------------------------------
    }


    function builtFrags_2_dom8mj( exeg, bFrag, fid, )
    {
        //*******************************************************
        //.here page content injects into html for the first time
        //*******************************************************
        bFrag.dom$ = $$.c('div').to( exeg.domEl );

        //-------------------------------------------------------
        // //\\ sets css-machinery for reverse-action
        //      ===from-media---to---text
        //-------------------------------------------------------
        bFrag.dom$.cls( 'active-'+fid + ' exeg-frag');
        activeFrags_styles = `
            .${cssp}-text-widget.active-${fid} .active-${fid} {
                display : inline;
            }
        `;
        //-------------------------------------------------------
        // \\// sets css-machinery for reverse-action
        //-------------------------------------------------------

        bFrag.dom$.html( bFrag.fragBody );
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

        ssF.BodyMathJax_2_HTML( bFrag.dom$() );

        return activeFrags_styles;
    }



}) ();


