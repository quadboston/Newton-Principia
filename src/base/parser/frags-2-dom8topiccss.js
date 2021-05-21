( function() {
    var {
        ns, sn, $$, cssp,
        nspaste, haz,
        globalCss,
        sconf,
        fconf,
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
            frags__2__dom_css_mjax_tpanchors,
        },
    });

    //---------------------------------------------
    // //\\ topic engine variables
    //---------------------------------------------
    var tplinkCount = 0;

    //: lemma-wise constructs
    //var topicsCount = 0; //indexes shapes lemma-wise

    var SPACE_reg = /\s+/;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
    var TOP_ANCH_REG = 
        '(¦[^¦]+|)¦' +  //catches tplinkConf
        '([^¦]+)'   +   //catches topic caption
        '¦¦'        +   //catches topic terminator
        '(?:(¦)(¦)*' +  //catches delayed topc-link for MathJax sibling
        '|(\n|.)|$)';   //catches remainder for later accurate replacement

    //flags: https://javascript.info/regexp-introduction
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



















    ///this function needs application-model-view already created;
    ///as of this version, it is executed only once
    ///
    ///called from main.js::bgImagesAreLoaded()...
    ///
    function frags__2__dom_css_mjax_tpanchors()
    {
        //**********************************************************
        // todo
        // The body of this subroutine seems a main place for
        // modernization of dynamic-tpengine of Edu-authorer.
        // This subroutine uses loops via fragments by calling
        // specific-script-parsers.
        // The specific-script-parsers must be further abstracted
        // and reused for dynamic text parsers from user-console.
        //**********************************************************

        //----------------------------------------------------------
        //for dynamic-tpengine,
        //specific codes should be extracted from below sub:
        //  ssF.fragment__2__indexed_links8topics(...
        //  exAspect.subexegs.forEach( ( subexeg, exegId ) => {
        //      subexeg.domEl$.to( sDomN.essaionsRoot$ );
        //----------------------------------------------------------
        //recall: normId2topic is created before from lemma's-js before,
        //        following sub will add more topics and colors
        exegs__2__dom_indexedLinks_indexedTopics();


        ssF.topics__2__topicsColorModel();
        var activeFrags_styles = exegs__2__tpAn8dom8css8mjax();

        //-----------------------------------------------------------
        // //\\ styles
        //-----------------------------------------------------------
        var styleStr                    = ssF.css_4_hidden8frag8active8delayed();
        var { styleAnchors, tplinks }   = ssF.topics_anchor_css();
        var styleMedia                  = ssF.topics_media_css( tplinks );
        //inserts tp-highlight-machinery css into html-document
        globalCss.update( styleStr + activeFrags_styles + styleMedia + styleAnchors,
                          'style8afrag8media8anchors'
        );
        //-----------------------------------------------------------
        // \\// styles
        //-----------------------------------------------------------

        sDomN.topicModelInitialized = true;
    }




    ///builds
    ///         subexeg.subessayCaption
    ///         subexeg.subessayMenuItem$
    ///         subexeg.domEl$
    ///collects fragment__2__indexed_links8topics
    function exegs__2__dom_indexedLinks_indexedTopics()
    {
        eachprop( exegs, ( theorionAspects, mcat_id ) => {
            eachprop( theorionAspects, ( exAspect, scat_id ) => {
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    //====================================================
                    // //\\ creates subessay's doms for text and menuItem
                    //====================================================
                    if( exAspect.subexegs.length > 1 || fconf.SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM ) {
                        subexeg.subessayCaption =
                                haz( subexeg.essayHeader, 'subessayCaption' ) ||
                                haz( subexeg.essayHeader, 'menuCaption' ) ||
                                subexeg.essayHeader.subessay;
                        subexeg.subessayMenuItem$ = $$
                          .c('div')
                          .html( subexeg.subessayCaption )
                          //... wrong wording ... not "toggler" but "subessay-selector" === "menu-item"
                          .cls( 'subessay-toggler highlight-text-disabled' )
                          .e( 'click', () => {
                                amode.subessay = subexeg.essayHeader.subessay;
                                sDomF.menu2lemma();
                                sDomF.tellActivityEngine_that_userStartedSubessay();
                          })
                          ;
                    }
                    subexeg.domEl$ = $$
                      .c('div')
                      .cls( subexeg.classStr )
                      ;
                    subexeg.domEl = subexeg.domEl$();
                    //====================================================
                    // \\// creates subessay's doms for text and menuItem
                    //====================================================

                    ///collecting |...|..|| anchor-topics
                    subexeg.activeFrags.forEach( function( rawActiveFrag, tix ) {
                        if( typeof( rawActiveFrag ) === 'object' ) {
                            eachprop( rawActiveFrag, (rawActFrValue) => {
                                ssF.fragment__2__indexed_links8topics( rawActFrValue );
                            });
                        } else {
                            //.strange why TOP_ANCH_REG_gu (with flag "g") works
                            //.and TOP_ANCH_REG_u does not
                            ssF.fragment__2__indexed_links8topics( rawActiveFrag );
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
                if( exAspect.subexegs.length > 1 || fconf.SHOW_EVEN_SINGLE_SUBESSAY_MENU_ITEM ) {
                    var subessayMenuContainer$ = exAspect.subessayMenuContainer$ = $$
                        .c( 'div' )
                        .cls( 'subessay-menu-container highlight-text-disabled' )
                        .to( sDomN.essaionsRoot$ )
                        ;
                    exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                        subexeg.subessayMenuItem$.to( subessayMenuContainer$ );
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







    ///not sure what this comment means:
    /// This function visualizes the texts upon the mode
    /// at late run-time event, this function is, for example,
    /// used in lemma-2-3::gui-visibility.js::refreshSVG_master()
    ///
    function exegs__2__tpAn8dom8css8mjax()
    {
        var activeFrags_styles = '';
        eachprop( exegs, ( theorionAspects, mcat_id ) => {
            eachprop( theorionAspects, ( exAspect, scat_id ) => {
                exAspect.subexegs.forEach( ( subexeg ) => {
                    subexeg.built_act8stat_fragments = [];

                    ///essay is comprised of fragments; active fragments
                    ///will get css-class which makes them visitble when
                    ///in some application state this class is assigned to top html-parent
                    subexeg.activeFrags.forEach( function( rawActiveFrag, tix ) {
                        subexeg.built_act8stat_fragments[ tix ] = {
                            normFragsRacks : ssF.normalizes___active8static_fragments(
                                                 rawActiveFrag, subexeg
                                             )
                        };
                    });

                    subexeg.built_act8stat_fragments.forEach( function( bFrag, fix ) {
                        eachprop( bFrag.normFragsRacks, ( normFragRack,fid ) => {
                            activeFrags_styles += ssF.builtFrags_2_dom8mj(
                                subexeg, normFragRack, fid, activeFrags_styles );
                        });
                    });
                });
            });
        });
        return activeFrags_styles;
    }

}) ();


