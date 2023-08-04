( function() {
    var {
        sn, $$, cssp, nsmethods, globalCss, nspaste, haz, has, eachprop,
        fconf, sDomN, ssD, sDomF, ssF, exegs, topics,
        lcaseId2allLemTopics,
        id2tplink, ix2tplink,
        amode, sconf, rg, userOptions
    } = window.b$l.apptree({
        ssFExportList :
        {
            BodyMathJax_2_HTML,
            fragment__collectsRawTpLinks,
            rawFragments2htmlText,
            builtFrags_2_dom8mj,
            updateFrameWorkAnchors_2_basicSiteFeatures,
        },
    });
    var collectedDelayedLinks = sn( 'collectedDelayedLinks', ssD );


    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var tplinkCount = 0;

    //: lemma-wise constructs
    //var topicsCount = 0; //indexes shapes lemma-wise

    var SPACE_reg = /(\s|\/)+/; //todo needs global test because "/" is added to space divider

    //todo: these regexes do proliferate in two files
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

    //for delaeyd batch tp-clause:
    //1. these chars "[ \ ^ $ . | ? * + ( )"  must not exist in replaceeKey
    //   ¦controls¦replaceeKey¦¦¦
    //2. replaceeKey must not be naked in controls for ordinary tp-clause and in
    //   , until this fixed, controls for batch.

    var TOP_ANCH_REG = 
        '(¦[^¦]+|)¦' +  //catches tplinkConf
        '([^¦]+)'   +   //catches topic caption
        '¦¦'        +   //catches topic terminator
        '(?:(¦)(¦)*' +  //catches delayed topc-link for MathJax sibling
        '|(\n|.)|$)';   //catches remainder for later accurate replacement

    //flag: u 	"unicode"; treat a pattern as a sequence of unicode code points.
    var TOP_ANCH_REG_gu = new RegExp( TOP_ANCH_REG, 'gu' );
    //flag "g": With this flag the search looks for all matches,
    //          without it – only the first match is returned.
    //          https://javascript.info/regexp-introduction
    //.adding flag "g" ruins the job ... why?
    //.perhaps: "The g flag with match will only return multiple whole
    //          matches, not multiple sub-matches"
    //          https://stackoverflow.com/questions/19913667
    //          /javascript-regex-global-match-groups
    var TOP_ANCH_REG_u = new RegExp( TOP_ANCH_REG, 'u' );
    //---------------------------------------------
    // \\// topic engine variables
    //---------------------------------------------
    return;






    ///*************************************************************
    ///Used: in landing parser and in user-console-messages.
    ///Inputs: text string, rawActFrValue
    ///Does nothing to change acriveFrag, its text, or its HTML.
    ///Collects
    ///      |...|..|| - like preanchor-topics by TOP_ANCH_REG;
    ///Results in:
    ///     tplink.tpid2true                 [ tpid_lowcase ] = true;
    ///     lcaseId2allLemTopics[ tpid_lowcase ]
    ///Returns: collectedTpLinks
    ///*************************************************************
    function fragment__collectsRawTpLinks(
        ///rawActFrValue are obtained from Book
        ///with help by ACTION_SPLITTER = /¿/
        rawActFrValue
    ){
        var topicPreAnchors = rawActFrValue.match( TOP_ANCH_REG_gu );
        var collectedTpLinks = {};

        if( topicPreAnchors ) {
            topicPreAnchors.forEach( link => {
                ////loops via all anchors having topic-link tl-TOPIC
                if( !link ) return;

                //by RegExp( TOP_ANCH_REG, 'u' );
                var parsedLink = link.match( TOP_ANCH_REG_u );
                //=========================================
                // //\\ indexes topic links and colors
                //=========================================
                //parsedLink[3] === '(?:(¦)(¦)*' +  //catches delayed topc-link for MathJax sibling
                if(  parsedLink[3] ) {

                    ///this array collects information for spawning plain-words (which are
                    ///original match keys), collected info will be used later for first-step for
                    ///replacing plain-words with match-clauses,
                    ///in the later second-step replacement, match-clauses will be normally
                    ///parsed to html-anchors as usual "tp-topics",
                    collectedDelayedLinks[ parsedLink[2] ] = {

                        //total future match clause = string aka  ¦anchor config¦anchor caption¦¦
                        //note: trailing ¦¦ are stripped,
                        match : parsedLink[0].substring( 0,
                                //"length-1" erases last char which is "¦"
                                //if is ¦IN¦¦¦, then makes ¦IN¦¦,
                                parsedLink[0].length-1
                        ),
                        anchorConfig : parsedLink[1],
                        replaceeKey : parsedLink[2],  //anchor caption = first match key
                    };
                    //todo: now do remove this tp-clause from rawActFrValue
                }

                //=========================================
                //tplinkConf is a set of raw_tpIDs;
                //This is pre-anchor index and not the "unique key".
                //But it is an index of id2tplink.
                //(Recall beginning of '¦([^¦]+)¦' ... which catches tplinkConf.)

                //todm: make tplinkConf a leftSideTpCombination_id
                //      make topics.id2tplink a lstpc_id__2__linkRack

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
                collectedTpLinks[ tplinkConf ] = tplink;
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


                    var tpid_lowcase = nsmethods.topicIdUpperCase_2_underscore( tpid_user );
                    //tplink has collection of topics,
                    //here is how this collection is populated:
                    tplink.tpid2true[ tpid_lowcase ] = true;

                    //if topicId keyName is missed, then an empty object created
                    //for this keyName,
                    sn( tpid_lowcase, lcaseId2allLemTopics );
                });
                //=========================================
                // \\// indexes topics locally and globally
                //=========================================
            });
        }
        //return { collectedTpLinks, collectedDelayedLinks };
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
                MathJax.Hub.Queue( ["Typeset",MathJax.Hub,domEl],
                    [ ssF.finalizes_delayed_anchors, domEl ] );
            }
        }
    }


    //Frag. step II. Norm. and anchor-texts.
    //======================================================================
    // 1) wraps active and static fragment texts into object and
    // 2) replaces scriptedAnchors with real anchors text
    //    <a ... tl-NNNNN dix ...
    //======================================================================
    ///Input:   rawActiveFrag - string or dictionary of strings,
    ///         string = subexeg.activeFrags[ ...ix-of-fragment... ],
    ///         each string is a plain text, pre-ready for final-HTML-text,
    ///Output:  ready for html act8stat_fragments_texts rack,
    ///         see format at (*) in code below ...
    function rawFragments2htmlText(
        rawActiveFrag,
    ){
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
        eachprop( normalizedActiveFrag, (
            fragBody_raw,   //this is a plain text,
                            //pre-ready for final-HTML-text,
                            //it will be modified few times here without
                            //affecting originally supplied rawActiveFrag argument.
            akey
        ) => {


            //***************************************************
            // //\\ Macros filter
            //      (Macros are not "tp-anchor-scripts", macros
            //      are "undivided text bricks".)
            //      Raw html-script-text is fragBody_raw.
            //      Main place to add more fragBody_raw
            //      preconversions before
            //      convertion fragBody_raw to tp-anchor-scripts.
            //***************************************************
            fragBody_raw = doesInsertSiteHTMLMacros( fragBody_raw );

            //----------------------------------------------------
            // //\\ processes tp-batch-controllers
            //      by replacing marks with tp-script-clauses:
            //          if there are marks in book-text, then replaces all of them,
            //      implemented, since proposition 14,
            //----------------------------------------------------
            if( has( sconf, 'insertDelayedBatch' ) ) {
                fragBody_raw = insertDelayedBatch( fragBody_raw );
            }
            //----------------------------------------------------
            // \\// processes tp-batch-controllers
            //----------------------------------------------------

            //***************************************************
            // \\// Macros filter
            //***************************************************

            norFrRack[ akey ] = {
                //(*) format:
                //text ready to be injected into html dom$
                fragBody    : fragBody_raw.replace( TOP_ANCH_REG_gu, replWithAnchor ),
                              //normalizes scriptedAnchors to form <a ... tl-NNNNN dix ...
                //placeholder to accept text to be injected into html dom$
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
            remainder       //everything remained between ¦conf¦caption¦¦¦¦ and
                            //next occrance of ¦conf¦caption¦¦¦¦
        ){
            ///we must do anchorConfig preporcessing again, for time 2 out of 2:
            ///do handle strip==='' or generate anchorConfig
            if( anchorConfig === '' ) {
                anchorConfig = scaption;
            } else {
                //strips "¦" from the lead of anchorConfig:
                anchorConfig = anchorConfig.substring( 1, anchorConfig.length );
            }

            var rack = topics.id2tplink[ anchorConfig ];
            if( !rack ) return;
            var dix = cflag ? ' delayed-anchor' : '';
            dix += farFlag ? ' delayed-far' : '';
            

            //***********************************************************
            // This anchor with non-empty dix will be hidden? and
            // will be a "seed" from
            // which its config will be spread on to siblings with
            // the same content. Siblings will become anchors which
            // are linked to media content configured in the seed,
            //***********************************************************
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


    ///Frag. step III. Html and global-css-visib-of-active-category.
    ///main sub. placing prof-script-fragments-txt into html-dom$
    function builtFrags_2_dom8mj(
        parentDomEl,

        //rack for placeholder dom$, rack must already contain text
        bFrag,

        fid,    //fragment category:
                //"static" or any custom key: "left", "right", ...
        dontDoMathJax,
    ){
        //*******************************************************
        //.here page content injects into html for the first time
        //*******************************************************
        var domId = 'active-' + fid;
        var styleId = domId + '-style';
        bFrag.dom$ = $$.c('div')
            .cls( domId + ' exeg-frag')
            .html( bFrag.fragBody )
            .to( parentDomEl )
            ;

        //-------------------------------------------------------
        // //\\ sets global css-machinery for reverse-user-action
        //      ===from-media---to---text
        //      ===user-action-in-media ---> to book-text
        //-------------------------------------------------------
        globalCss.updateIfKeyDifferent( `
                .${cssp}-text-widget.active-${fid} .active-${fid} {
                    display : inline;
                }
            `,
            styleId,
        );
        //-------------------------------------------------------
        // \\// sets css-machinery for reverse-action
        //-------------------------------------------------------

        //-----------------------------------------------------------------------
        // //\\ inserts book-references in DOM if professor did specify in text,
        //      ... by html-attribute "book-reference-id"
        //-----------------------------------------------------------------------
        var breferences = bFrag.dom$().querySelectorAll( '[book-reference-id]' );
        breferences.forEach( sel => {
            var skey = sel.getAttribute( 'book-reference-id' );
            var ref = haz( ssD.bookReferences, skey );
            if( ref ) {
                sel.innerHTML = ref + sel.innerHTML;
                var cssText = haz( ssD.bookReferences, skey + '---inline-style' );
                if( cssText ) {
                    sel.style.cssText = cssText;
                }
            }
        });
        //-----------------------------------------------------------------------
        // \\// inserts book-references in DOM
        //-----------------------------------------------------------------------

        updateFrameWorkAnchors_2_basicSiteFeatures();
        //does delayed anchors
        !dontDoMathJax && ssF.BodyMathJax_2_HTML( bFrag.dom$() );
        //do later: ssF.puts_delayed_tp_anch_in_syblings( bFrag.dom$() );
    }

    function doesInsertSiteHTMLMacros( rawActFrValue )
    {
        const HTMLMacroKey = fconf.HTMLMacroKey;
        if( rawActFrValue.indexOf( HTMLMacroKey ) > -1 ) {
            eachprop( fconf.textScriptMacros, (macro, prname) => {
                var reg = new RegExp( fconf.HTMLMacroKey + prname, 'gu' );
                rawActFrValue = rawActFrValue.replace( reg, macro );
            });
        }
        return rawActFrValue;
    }

    ///if we want to keep link-to-link browsing instead of framework with
    ///addendums added to original text, then we have to update static
    ///links referred to Addendums,
    ///this function does this job and is in effect in two places:
    ///1) at landing time and 2) in "tutor framework" when scenario adds a new message
    ///to student's console,
    function updateFrameWorkAnchors_2_basicSiteFeatures( parentDomObj )
    {
        if( userOptions.showingBonusFeatures() ) {
            let anchors = (parentDomObj||document.body).querySelectorAll( 'a' );
            let sea = '?conf=sappId=';
            let reg = new RegExp( '\\' + sea );
            anchors.forEach( anch => {
                if( anch.search.indexOf( sea ) === 0 ) {
                    anch.search = anch.search.replace(
                        reg, '?conf=basicSiteFeatures=no,sappId=' );
                }
            });
        }
    }


    ///replaces raw words with value from value found in collection of collectedDelayedLinks
    ///runs before tp machine parses fragBody_raw
    function insertDelayedBatch( fragBody_raw ) {
        if( Object.keys( collectedDelayedLinks ).length ) {
            var regEx = '';
            eachprop( collectedDelayedLinks, (lnk,keyName) => {
                //these chars "\ [ ] { } ( ) \ ^ $ . | ? * +" must not exist in replaceeKey:
                //see https://javascript.info/regexp-escaping
                //replaceeKey is a "raw word caption": made before as:
                //      replaceeKey : parsedLink[2],  //anchor caption = original-raw-caption
                //      must have no destroy-reg-ex-chars = [ ] { } ( ) \ ^ $ . | ? * +
                regEx += (regEx ? '|' : '') + lnk.replaceeKey;
            });
            //matchinig keyword in text must be separated by spacer,brackets,
            //some punctuation chars,
            //in reg.ex., don't do (...)+ for dividors, apparently
            //JS-replce machinery does not remember more than one dividor:
            regEx = new RegExp ('(\\s|\\n|\\r|\\[|\\]|\\(|\\)|\\{|\\}|\\+|\\.|\\*|-|,)(' + regEx +
                                ')(\\s|\\n|\\r|\\[|\\]|\\(|\\)|\\{|\\}|\\+|\\.|\\*|-|,)', 'ug' );
            fragBody_raw = fragBody_raw.replace( regEx, function( arg ) {
                ///returns full-replacer = full match which
                ///        is match=leadingDividor+|config|caption||+trailingDividor,
                ///        this full-replacer is inserted after execution of this "return",
                return arguments[1] + //leading spacer

                       //this "match" will be a match-key for future replacement with anchor
                       //match===all===config+key+pipes: aka: ¦v2graph VSarea¦ABFD¦¦
                       collectedDelayedLinks[ arguments[2] ].match +

                       arguments[3];  //trailing spacer: !!it cannot be used in ajacent RegEx if any,
                                      //must: KWA dividorA dividorB KWB, not dividorA is the same as
                                      //dividorB
            });
        }
        return fragBody_raw;
    }

}) ();


