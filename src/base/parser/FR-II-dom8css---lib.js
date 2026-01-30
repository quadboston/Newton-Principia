( function() {
    var {
        sn, $$, cssp, nsmethods, globalCss, nspaste, haz, has, eachprop,
        fconf, sDomN, ssD, sDomF, ssF, exegs, topics,
        tpid2arrc_repo, lowtpid_2_glocss8anchorRack,
        anid2anrack, anix2anrack,
        amode, sconf, rg, userOptions
    } = window.b$l.apptree({
        ssFExportList :
        {
            BodyMathJax_2_HTML,
            fragment__collectsRawTpLinks,
            rawFragments2htmlText,
            builtFrags_2_dom8mj,
            //updateFrameWorkAnchors_2_basicSiteFeatures,
        },
    });
    var collectedDelayedLinks = sn( 'collectedDelayedLinks', ssD );


    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var tplinkCount = 0;

    //: lemma-wise constructs
    //var topicsCount = 0; //indexes shapes lemma-wise

    //var SPACE_reg = /(\s|\/)+/; //this version has a flaw: adds seps to split
    var SPACE_reg = /\s+|\//;

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
    ///
    ///Does nothing to change acriveFrag, its text, or its HTML.
    ///     acriveFrag contains the "core-semantical-text-content"
    ///Collects
    ///      |...|..|| - like preanchor-topics by TOP_ANCH_REG;
    ///Results in:
    ///     anchorRack.tpid2true                 [ low_tpID ] = true;
    ///     lowtpid_2_glocss8anchorRack[ low_tpID ]
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
                //But it is an index of anid2anrack.
                //(Recall beginning of '¦([^¦]+)¦' ... which catches tplinkConf.)

                //todm: make tplinkConf a leftSideTpCombination_id
                //      make topics.anid2anrack a lstpc_id__2__linkRack

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
                //at the moment tplinkConf is a set of commands,
                //"config" is a poor word,
                //=========================================

                //=========================================
                // collects first link and "loses" others,
                // collects into anid2anrack
                //
                ///this scenario makes anchorRack missed from tplink_ix index, but
                ///it does not matter because these links are searched and
                ///replaced again in aFrags_2_aFragsWithAnchor
                ///recall: anid2anrack lives in lemma-scope.
                //=========================================
                //right name would be anid2arack //anchor id 2 anchors rack
                //of properties
                if( !anid2anrack.hasOwnProperty( tplinkConf ) ) {
                    ////does strip duplicate propery tplinkConf
                    ////from anid2anrack
                    ////  id is equal to tplinkConf

                    //counts unique ids
                    var tplink_ix = tplinkCount++;

                    //recall: anix2anrack and anid2anrack do live in lemma-scope.
                    anix2anrack[ tplink_ix ] =
                    ///at the moment, stripped duplicate links have nothing like
                    ///this object
                    anid2anrack[ tplinkConf ] = {
                        tplink_ix : tplink_ix,
                        tpid2true : {},
                        //link:parsedLink[2], not-used
                    };
                }
                var anchorRack = anid2anrack[ tplinkConf ];
                //why dubbing?:
                collectedTpLinks[ tplinkConf ] = anchorRack;
                var tplink_ix = anchorRack.tplink_ix;
                //=========================================
                // \\// indexes topic links and colors
                //=========================================

                //=========================================
                // //\\ indexes topics locally and globally
                //=========================================
                // splits anchor-configuration to smaller tokens, each
                // token for separate topic or for reserved-command,
                // raw_tpIDs - are "commands",
                anchorRack.raw_tpIDs = tplinkConf.split( SPACE_reg );
                //if( anchorRack.raw_tpIDs.length > 1 )
                //    ccc(tplinkConf);
                var ANCH_COLOR_CAT_rg = /\*anch-color\*(.+)/;
                /// loops via separate anchor operators
                /// collected in anchor's rack
                anchorRack.raw_tpIDs.forEach(
                    anchorOperator => {
                    //..........................................................
                    // //\\ checks for reserved topic categories
                    //      like '*anch-color', ...
                    //..........................................................
                    if( 'cssbold' === anchorOperator ) {
                        anchorRack.anchorIsBold = true;
                        return;
                    } else if( '*anch-color' === anchorOperator ) {
                        anchorRack.cssNoColorToShapes = true;
                        return;
                    } else if( anchorOperator.match( ANCH_COLOR_CAT_rg ) ) {
                        const match = anchorRack.colorCateg =
                              anchorOperator.match( ANCH_COLOR_CAT_rg );
                        //.fixed set to tp-link
                        //elect is already done in expand:
                        anchorRack[ 'tpcolarr' ] = haz( tpid2arrc_elect, match[1] );
                        return;
                    }
                    //..........................................................
                    // \\// checks for reserved topic categories
                    //..........................................................

                    //lowcase anchor's topic id
                    var low_tpID = nsmethods.tpid2low( anchorOperator );
                    //anchorRack has collection of anchor commands,
                    ///now we do add anchorRack.tpid2tru to anchorRack,
                    if( low_tpID  && low_tpID.replace( / /g, '' ) ) {
                        anchorRack.tpid2true[ low_tpID ] = true;
                        //if topicId keyName is missed, then an empty object created
                        //ccc( 'FR II, set low_tpID into lowtpid_2_glocss8anchorRack' );
                        if( !has( lowtpid_2_glocss8anchorRack, low_tpID ) ){
                            ////todm: add this warning to GUI:
                            ccc( 'Helper: text topic "'+low_tpID +'" ' +
                                 'is missed in js-code. '
                            );
                            //for this keyName, 'fixed-colors'
                            //is a flag and is = 'undefined',
                            //don't forget lowtpid_2_glocss8anchorRack is
                            //in topics.lowtpid_2_glocss8anchorRack
                            sn( low_tpID,
                                lowtpid_2_glocss8anchorRack // maps, topicId -> topicId
                            );
                        }
                    }
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
        {
            //skips text block without MathJax
            let iH = domEl.innerHTML;
            //todm a bit risky detection of MJ text
            if( iH.indexOf( '\\(' ) < 0 && iH.indexOf( '\\[' ) < 0 ) return;
        }
        var count = 0;
        mathJax_2_HTML();
        ///===============================================
        /// waits for MathJax and fires it up over domEl
        ///===============================================
        function mathJax_2_HTML()
        {
            count++;
            if( count > 20 ) return;
            //c onsole.log( count + ' ' + Date.now() + ' MathJax=',MathJax );
            if( !window.MathJax_is_fully_loaded_flag ){
                console.log( 'Still waiting for MathJax. Timestamp=' + Date.now() );
                setTimeout( mathJax_2_HTML, 500 );
                return;
            }
            //todm possibly need own MJ promise?:
            //MathJax.startup.promise,
            //https://docs.mathjax.org/en/latest/web/typeset.html#typeset-async
            let promise = Promise.resolve();
            function typeset(code) {
                promise = promise
                    .then(() => MathJax.typesetPromise(code()))
                    .catch((err) => console.log('Typeset failed: ' + err.message));
                return promise;
            }
            let ret = typeset(() => {
                //ccc( domEl.innerHTML );
                if( !no_domEl_pretransformation ) {
                    ssF.finalizes_delayed_anchors(domEl);
                }
                return [domEl];
            })
            if( no_domEl_pretransformation && cbAfterMathJax ) {
                ret.then( cbAfterMathJax );
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

            //these subs are the KINGs of processing the Book
            //  doesInsertSiteHTMLMacros( fragBody_raw )
            //  insertDelayedBatch( fragBody_raw )
            //fragBody_raw = UTF-string of minimal Book-text-fragment

            //***************************************************
            // //\\ Macros filter
            //      (Macros are not "tp-anchor-scripts", macros
            //      are "undivided text bricks".)
            //      Raw html-script-text is fragBody_raw.
            //      Main place to add more fragBody_raw
            //      preconversions before
            //      convertion fragBody_raw to tp-anchor-scripts.
            //***************************************************
//todo why canonical version misses this?
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

            var rack = topics.anid2anrack[ anchorConfig ];
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

        //removed because of emulated by user-options.
        //updateFrameWorkAnchors_2_basicSiteFeatures();

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

    ///replaces raw words with value from value found in
    ///collection of collectedDelayedLinks
    ///runs before tp machine parses fragBody_raw
    function insertDelayedBatch( fragBody_raw ) {
        if( Object.keys( collectedDelayedLinks ).length ) {
            var regEx = '';
            eachprop( collectedDelayedLinks, (lnk) => {
                //these chars "\ [ ] { } ( ) \ ^ $ . | ? * +" must not exist in replaceeKey:
                //see https://javascript.info/regexp-escaping
                //replaceeKey is a "raw word caption": made before as:
                //      replaceeKey : parsedLink[2],  //anchor caption = original-raw-caption
                //      must have no destroy-reg-ex-chars = [ ] { } ( ) \ ^ $ . | ? * +
                regEx += (regEx ? '|' : '') + lnk.replaceeKey;
            });
            //***************************************************************
            //matchinig keyword in text must be separated by spacer,brackets,
            //some punctuation chars,
            //***************************************************************
            //in reg.ex., don't do (...)+ for dividors, apparently
            //JS-replce machinery does not remember more than one dividor:
            let dividors = '(\\s|\\n|\\r|\\[|\\]|\\(|\\)|' +
                           '\\{|\\}|\\+|\\.|\\*|-|;|,)';
            regEx = new RegExp ( dividors + '(' + regEx + ')' + dividors, 'ug' );
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


