//\\// Application Entry
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var rootvm      = sn('rootvm');
    var cssmods     = sn('cssModules');
    var dpdec       = ns.sn('drag-point-decorator');
    var html        = sn('html');

    var nsmethods   = sn('methods');

    var fapp        = sn('fapp'); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative', sapp);

    var srg         = sn('sapprg', fapp ); 
    //:nearly a patch
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var cssmod      = sn('ssCssModules',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);




    //======================================================
    // //\\ establishes landing-start-state
    //======================================================
    document.documentElement.className += 'non-loaded';
    $$  .style()
        .to( document.head )
        .html(
            "html.non-loaded body { \n" +
                "opacity :0; \n" +
            "} \n" +
            "html body { \n" +
            "    opacity :1; \n" +
            "    transition  :opacity 1s ease-in-out; \n" +
            "} \n"
        );
    //======================================================
    // \\// establishes landing-start-state
    //======================================================
    document.addEventListener( "DOMContentLoaded", init );

    ssF.tr = tr;
    ssF.tp = tp;
    //00000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000









    //=========================================================
    // //\\ inits full app
    //=========================================================
    function init() 
    {
        ns.url2conf( fconf );

        //:todm this seems messy ... fix later
        fconf.sappId = fconf.sappId || 'home-pane';
        sapp.sappId = fconf.sappId;
        sapp.pageMode = sapp.sappId === 'home-pane' ?  'home-pane' : 'lemma';

        sapp.siteCaptionHTML = fconf.siteCaptionHTML;
        sapp.siteCaptionPlain = fconf.siteCaptionPlain;

        cssmods.initHomePageCSS(cssp, fconf);
        html.buildCommonHTMLBody();
        fapp.fappRoot$.id( sapp.pageMode );

        html.buildHomePage();
        document.title = sapp.siteCaptionPlain;
        starts_lemmaInit();
    }
    //=========================================================
    // \\// inits full app
    //=========================================================




    //=========================================================
    // //\\  establishes configuration, loads sub-app scripts
    //=========================================================
    function starts_lemmaInit()
    {
        var mList = fconf.sappModulesList[ sapp.sappId ];
        sapp.siteCaptionHTML = mList.caption;
        sapp.siteCaptionPlain = mList.caption;
        sapp.ix = mList.ix; 

        // //\\ prepares sub-application-source-code-files list for load
        ///prepends common path
        var effectiveId = mList.sappCodeReference || mList.sappId;
        var codesList = mList.codesList || [];
        codesList.forEach( function( codeItem ) {
            codeItem.src = "src/sub-app/" + effectiveId + "/" + codeItem.src;
        });
        // \\// prepares sub-application-source-code-files list for load

        ///loads sub-application-source-code-files
        if( sapp.sappId === 'home-pane' ) {
            continues_lemma_afterSourcesLoad();
        } else {
            nsmethods.loadScripts(
                codesList,
                function()
                {
                    ////executes this body when all scripts completed loading
                    ///executes modules from modules registry
                    ns.eachprop( srg_modules, function( module ) {
                        module();
                    });
                    ssF.init_conf();
                    ns.url2conf( fconf ); //overrides subapp conf
                    continues_lemma_afterSourcesLoad();
                }
            );
        }
    }
    //=========================================================
    // \\//  establishes configuration, loads sub-app scripts
    //=========================================================




    //=========================================================
    // //\\ continues lemma after sources
    //=========================================================
    function continues_lemma_afterSourcesLoad()
    {

        //=======================================
        // //\\ gets content texts and continues
        //=======================================

        if( sapp.sappId === 'home-pane' ) {
            continues_lemma_afterContentsLoad();
        } else {
            sDomF.get_content_texts( function() {
                    //=======================================
                    // //\\ html and css
                    //=======================================
                    cssmods.initSiteWideCSS(cssp, fconf);
                    sn('ssCssOrder',ss).list.forEach( function( cssName ) {
                        ns.globalCss.addText( cssmod[cssName]( cssp, fconf ) );
                    });
                    ns.globalCss.update();
                    //=======================================
                    // \\// html and css
                    //=======================================

                    continues_lemma_afterContentsLoad();
            });
        }
        //=======================================
        // \\// gets content texts and continues
        //=======================================
    }
    //=========================================================
    // \\// continues lemma after sources
    //=========================================================






    //=======================================
    // //\\ finalizes lemma
    //=======================================
    function continues_lemma_afterContentsLoad()
    {
        if( sapp.sappId !== 'home-pane' ) {
            fmethods.createLemmaDom();
            sDomF.originalTexts_2_html_texts();
            sapp.init_sapp();
            sDomF.populateMenu();
            sapp.init_sapp_II && sapp.init_sapp_II();

            sapp.isInitialized = true;
            fmethods.setupEvents();

            ///.this is a patch: the cause and real solution is not known;
            ///.and it still does not work for l2,3
            ///
            ///.this timeout is vital: it allows to hovering-arrows to get to their
            ///.place: othewise, the img.style.top for draggee is wrong which
            ///.moves arrows to the top edge of media which is wrong
            ///.the value of timeout seems also vital for l9
            //setTimeout( fmethods.fullResize, 50 ); 50 is enouth for l9
            setTimeout( fmethods.fullResize, 500 );

        }
        //sDomN.captionHTML$.html( sapp.siteCaptionHTML );
        remove_landing_state_from_top_html();
        fmethods.setupSiteWideEvents();
        //ccc( 'end of main proc' );
        //setTimeout( fmethods.fullResize, 1000 );
        //fmethods.finish_Media8Ess8Legend_resize(null, null, !!'doDividorSynch');
        //fmethods.panesD8D && fmethods.panesD8D.updateAllDecPoints();

        if( sapp.sappId === 'home-pane' ) {
            sDomN.homeButton$().click();
        }
    }
    //=======================================
    // \\// finalizes lemma
    //=======================================






    // //\\// helpers

    //===========================================
    // //\\ removes landing-start-state
    //===========================================
    function remove_landing_state_from_top_html()
    {
        //.todmm ... why without 1s transition the
        //.landing flickers?
        //.todm ... use regEx to cooperate with
        //.other frameworks on html-element
        var de = document.documentElement;
        de.className = de.className.replace(
                       'non-loaded', '' );
    }
    //===========================================
    // \\// removes landing-start-state
    //===========================================


    ///================================================
    /// //\\ does registry initiation or overriding job.
    ///================================================
    /// Purpose: to prevent unit's duplication.
    /// If no rg[id] exists, then creates empty rg[id].
    /// Then
    ///     If no key is supplied.
    ///         Returns rg[id].
    ///     If key is supplied:
    ///         Sets rg[ id ][ key ] = val
    ///         Returns val.
    function tr( id, key, val )
    {
        rg[ id ] = rg.hasOwnProperty( id ) ? rg[ id ] : {};
        if( key ) { rg[ id ][ key ] = val; }
        return key ? val : rg[ id ];
    }
    ///================================================
    /// \\// does registry initiation or overriding job.
    ///================================================


    ///================================================
    /// //\\ sugar: sets rg[ id ][pos] = val
    ///================================================
    ///Sets rg[ id ][pos] = val
    ///If rg[ id ] does not exist, then creates it.
    function tp( id, val ) { return tr( id, 'pos', val ); }
    ///================================================
    /// \\// sugar: sets rg[ id ][pos] = val
    ///================================================





}) ();

