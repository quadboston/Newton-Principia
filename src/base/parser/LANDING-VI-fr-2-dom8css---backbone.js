( function() {
    var {
        sn, eachprop, nspaste, haz, globalCss,
        sDomN, ssD, sDomF, ssF, exegs,
    } = window.b$l.apptree({
        ssFExportList :
        {
            frags__2__dom_css_mjax_tpanchors,
            digestsSingleMessage_2_topics,
        },
    });

    var newlyDigestedStyleId = 0; //to create a new style sheet every time for new anchor
    return;









    ///this function needs application-model-view already created;
    ///as of this version, it is executed only once
    ///
    ///called from main.js::bgImagesAreLoaded()...
    ///
    function frags__2__dom_css_mjax_tpanchors()
    {
        //***********************************************************
        //contains //Frag. step I.
        ssF.exegs__2__dom_indexedLinks_indexedTopics();
        //***********************************************************

        //***********************************************************
        //Frag. step Ib. Colors.
        ssF.topics__2__topicsColorModel();
        ///Frag. step II. Norm. and anchor-texts and
        ///Frag. step III. Html and global-css-visib-of-active-category.
        ssF.exegs__2__tpAn8dom8css8mjax();
        //***********************************************************


        //***********************************************************
        // styles
        //-----------------------------------------------------------
        //var styleStr = ssF.css_4_hidden8frag8active8delayed();

        ///Frag. step IV. Text anchors.
        var { styleAnchors, nextTplinks } = ssF.topics_anchor_css();

        ///Frag. step V. Unhighlighted global CSS.
        ssF.v2_topics_2_unhighCss();
        ///Frag. step VI. Highlighted global CSS.
        ssF.v2_tplinks_2_highlightCss( nextTplinks, );
        //inserts tp-highlight-machinery css into html-document
        //globalCss.update( styleStr, 'style8afrag8media8anchors-media' );
        globalCss.update( styleAnchors, 'style8afrag8media8anchors-anchors' );
        //***********************************************************
    }


    ///apparently this thing ruins performance and pollutes css
    function digestsSingleMessage_2_topics( messageDomEl, singleMessageText )
    {
        //Frag. step I.
        //collects and adds more entries into l caseId2allLemTopics,
        //var collectedTpLinks = 
        ssF.fragment__collectsRawTpLinks( singleMessageText );
        //  link = {
        //                tplink_ix : tplink_ix,
        //                tpid2true : {
        //                    tpid_normalized2lowcase1 : true,
        //                    tpid_normalized2lowcase2 : true,
        //                    ....
        //                },
        //                raw_tpIDs,

        //Frag. step Ib. Colors.
        //Repeates the job which was done for all l caseId2allLemTopics,
        //If some topics are "zerbra-generated", then colors distribution is
        // "condenced" more.
        ssF.topics__2__topicsColorModel();

        //Input:   rawActiveFrag - string or dictionary of strings,
        //         f.e. subexeg.activeFrags[ ...IX... ] which are elements of
        //Output:  format = { 'static' : { fragBody, } },
        //Frag. step II. Norm. and anchor-texts and
        var ready_for_html_act8stat_fragments_texts_rack =
            ssF.rawFragments2htmlText(
                singleMessageText,
            );
        //Frag. step III. Html and global-css-visib-of-active-category.
        ssF.builtFrags_2_dom8mj(
            messageDomEl,
            ready_for_html_act8stat_fragments_texts_rack[ 'static' ],
            'static',
        );
        //***********************************************************


        //***********************************************************
        // Frag. steps IV, V, VI
        //===========================================================
        //Frag. step IV. Text anchors. Only for new anchors.
        var { styleAnchors, nextTplinks } = ssF.topics_anchor_css( messageDomEl );
        ///Frag. step VI. Highlighted global CSS.
        ssF.v2_tplinks_2_highlightCss( nextTplinks, );

        //inserts tp-highlight-machinery css into html-document,
        //only for new nextTplinks
        styleAnchors && globalCss.update( styleAnchors, 'style8afrag8media8anchors-'+
            newlyDigestedStyleId  );
        //***********************************************************
        newlyDigestedStyleId++;
    }
}) ();


