( function() {
    var {
        sn, $$, eachprop, haz,
        fconf, sconf,
        sDomN, sDomF, ssF, ssD, exegs,
        amode, userOptions
    } = window.b$l.apptree({
        ssFExportList :
        {
            exegs__2__dom_indexedLinks_indexedTopics,
            virtualSubessayClick,
        },
    });
    ssD.subessayClickDisabled = false;
    var collectedDelayedLinks = sn( 'collectedDelayedLinks', ssD, [] );
    return;




    ///builds
    ///         subexeg.subessayCaption
    ///         subexeg.subessayMenuItem$
    ///         subexeg.domEl$
    ///collects fragment__collectsRawTpLinks
    ///contains //Frag. step I.
    /*
        todm: dom and menu are messed with links and topics
                    tplink.tpid2true[ tpid_lowcase ] = true;
                    sn( tpid_lowcase, lcaseId2allLemTopics );
    */
    function exegs__2__dom_indexedLinks_indexedTopics()
    {
        eachprop( exegs, ( theorionAspects, mcat_id ) => {
            eachprop( theorionAspects, ( exAspect, scat_id ) => {
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    subexeg.cssCls = ' subessay-menuitem-id-' + exegId;
                    //====================================================
                    // //\\ creates subessay's doms for text and
                    //      subessay menuItem
                    //====================================================
                    if( userOptions.shouldShowSubessayMenu(exAspect) ) {
                        subexeg.subessayCaption =
                                haz( subexeg.essayHeader, 'subessayCaption' ) ||
                                haz( subexeg.essayHeader, 'menuCaption' ) ||
                                subexeg.essayHeader.subessay;
                        subexeg.subessayMenuItem$ = $$
                          .c('div')
                          .html( subexeg.subessayCaption )
                          //... wrong wording ... not "toggler" but
                          //    "subessay-selector" === "menu-item"
                          .cls( 'subessay-toggler highlight-text-disabled' +
                            subexeg.cssCls +

                            //adds blocker till the first click,
                            //block is done via CSS,
                            ( haz( sconf,
                                'DONT_HIGHLIGHT_UNTOUCHED_SELECTED_SUBESSAY_MENU_ITEM' ) ?
                                ' user-untouched' : ''
                            )
                          )
                          .e( 'click', () => {
                                if( ssD.subessayClickDisabled ) return;
                                virtualSubessayClick( subexeg );
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


                    //===========================================================
                    // //\\ does nothing for html-body
                    //===========================================================
                    ///collecting |...|..|| anchor-topics and
                    //      sn( 'collectedDelayedLinks', ssD, [] ),
                    ///subexeg.activeFrags are obtained by ACTION_SPLITTER = /¿/
                    ///   they are non-unJSONED-active Fragment text units
                    ///rawActiveFrag and rawActFrValue are obtained from Book
                    ///with help by ACTION_SPLITTER = /¿/
                    subexeg.activeFrags.forEach( function( rawActiveFrag, tix ) {
                        if( typeof( rawActiveFrag ) === 'object' ) {
                            eachprop( rawActiveFrag, (rawActFrValue) => {
                                ssF.fragment__collectsRawTpLinks( rawActFrValue );
                            });
                        } else {
                            //.strange why TOP_ANCH_REG_gu (with flag "g") works
                            //.and TOP_ANCH_REG_u does not
                            ssF.fragment__collectsRawTpLinks( rawActiveFrag );
                        }
                    });
                    //===========================================================
                    // \\// does nothing for html-body
                    //===========================================================
                });

                //************************************************************
                // //\\ here page content place holder do inject into html,
                //      NO HTML-content yet created and injected,
                //      this does not mangage their visibility,
                //      lemma-master-menu and toggler click do manage
                //      this visibility,
                //************************************************************
                ///puts togglers on top
                if( userOptions.shouldShowSubessayMenu(exAspect)
                ){
                    var subessayMenuContainer$ = exAspect.subessayMenuContainer$ = $$
                        .c( 'div' )
                        .cls( 'subessay-menu-container highlight-text-disabled' )
                        .to( sDomN.essaionsRoot$ )
                        ;
                    exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                        subexeg.subessayMenuItem$.to( subessayMenuContainer$ );
                        $$.c('span')
                            .addClass( subexeg.cssCls )
                            .html( '<br>' )
                            .to( subessayMenuContainer$ );
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

    ///emulates user-click and first-user-click
    function virtualSubessayClick( subexeg )
    {
        amode.subessay = subexeg.essayHeader.subessay;
        amode.submodel = subexeg.essayHeader.submodel;

        //sets state === user had seen menu-item and clicked on it
        subexeg.domEl$
            //adding this class makes subessay visible if
            //before this subessay had '.user-clicked-sensitive',
            //note: '.user-clicked-sensitive' is set in text-script,
            //the change is set in CSS
            .addClass( 'subessay-had-user-clicked' )
            ;
        //removes blocker at the first click or first
        //virtual subessay click
        subexeg.subessayMenuItem$.removeClass( 'user-untouched' ); //vestige?
        sDomF.menu2lemma( !!'amodel2app_8_extraWork' );
        sDomF.tellActivityEngine_that_userStartedSubessay();
    }



}) ();


