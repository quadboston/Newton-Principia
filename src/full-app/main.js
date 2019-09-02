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
    document.addEventListener( "DOMContentLoaded", initConfiguration );

    ssF.tr = tr;
    ssF.tp = tp;
    return; //00000000000000000000000000000000000000









    //=========================================================
    // //\\ inits full app
    //=========================================================
    function initConfiguration() 
    {
        ns.url2conf( fconf );
        fconf.sappId = fconf.sappId || 'home-pane';
        sapp.siteCaptionHTML = fconf.siteCaptionHTML;
        sapp.siteCaptionPlain = fconf.siteCaptionPlain;
        document.title = sapp.siteCaptionPlain;

        cssmods.initHomePageCSS(cssp, fconf);
        html.buildCommonHTMLBody();
        fapp.fappRoot$.id( fconf.sappId === 'home-pane' ?  'home-pane' : 'lemma' );
        html.buildHomePage();

        config8run_subappModules();
    }
    //=========================================================
    // \\// inits full app
    //=========================================================




    //=========================================================
    // //\\  establishes configuration, loads sub-app scripts
    //=========================================================
    function config8run_subappModules()
    {
        //==============================
        // //\\ configure subapp modules
        //==============================
        var lemmaConfig = fconf.sappModulesList[ fconf.sappId ];
        sapp.siteCaptionHTML = lemmaConfig.caption;
        sapp.siteCaptionPlain = lemmaConfig.caption;
        sapp.ix = lemmaConfig.ix; 

        //------------------------------------------------
        // //\\ prepares sub-application-source-code-files
        //------------------------------------------------
        //      list for load
        //.makes common path
        var effectiveId = lemmaConfig.sappCodeReference || lemmaConfig.sappId;
        var codesList = lemmaConfig.codesList || [];
        codesList.forEach( function( codeItem ) {
            codeItem.src = "src/sub-app/" + effectiveId + "/" + codeItem.src;
        });
        //------------------------------------------------
        // \\// prepares sub-application-source-code-files
        // \\// configure subapp modules
        //==============================


        //=======================================
        // //\\ loads and executes subapp modules
        //=======================================
        if( fconf.sappId === 'home-pane' ) {
            loadsContents();
        } else {
            nsmethods.loadScripts(
                codesList,
                function()
                {
                    ////executes loaded modules from modules registry
                    ////after all modules have been loaded
                    ns.eachprop( srg_modules, function( module ) {
                        module();
                    });
                    ssF.init_conf();
                    ns.url2conf( fconf ); //overrides subapp conf
                    loadsContents();
                }
            );
        }
        //=======================================
        // \\// loads and executes subapp modules
        //=======================================
    }
    //=========================================================
    // \\//  establishes configuration, loads sub-app scripts
    //=========================================================




    //=========================================================
    // //\\ continues lemma after sources
    //=========================================================
    function loadsContents()
    {
        //=======================================
        // //\\ gets content texts and continues
        //=======================================
        if( fconf.sappId === 'home-pane' ) {
            subappCore_after_contentsLoad();
        } else {
            sDomF.ajax_2_prepopulated_exegsMatrix( function() {
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
                    subappCore_after_contentsLoad();
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
    // //\\ starts subapp core
    //=======================================
    function subappCore_after_contentsLoad()
    {
        if( fconf.sappId !== 'home-pane' ) {
            ////the body which follows below can be put in cb for image-loader-ajax
            fmethods.createLemmaDom();
            sDomF.exeg_2_frags();
            sDomF.frags_2_essdom8topiccss();
            sapp.init_sapp();
            sDomF.populateMenu();
            sapp.finish_sapp_UI && sapp.finish_sapp_UI();

            sapp.isInitialized = true;
            fmethods.setupEvents();

            ///.this is a patch: the cause and real solution is not known;
            ///.and it still does not work for l2,3
            ///
            ///.this timeout is vital: it allows to hovering-arrows to get to their
            ///.place: othewise, the img.style.top for draggee is wrong which
            ///.moves arrows to the top edge of media which is wrong
            ///.the value of timeout seems also vital for l9
            //setTimeout( fmethods.fullResize, 50 ); 50 is enough for l9
            setTimeout( fmethods.fullResize, 500 );

        }
        //sDomN.captionHTML$.html( sapp.siteCaptionHTML );
        remove_landing_state_from_top_html();
        fmethods.setupSiteWideEvents();
        //ccc( 'end of main proc' );
        //setTimeout( fmethods.fullResize, 1000 );
        //fmethods.finish_Media8Ess8Legend_resize(null, null, !!'doDividorSynch');
        //fmethods.panesD8D && fmethods.panesD8D.updateAllDecPoints();

        if( fconf.sappId === 'home-pane' ) {
            sDomN.homeButton$().click();
        }
    }
    //=======================================
    // \\// starts subapp core
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
    /// //\\ to position
    ///      sugar: sets rg[ id ][pos] = val
    ///================================================
    ///Sets rg[ id ][pos] = val
    ///If rg[ id ] does not exist, then creates it.
    function tp( id, val ) { return tr( id, 'pos', val ); }
    ///================================================
    /// \\// to position
    ///================================================





}) ();

