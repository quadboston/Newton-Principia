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

    var fapp        = sn('fapp'); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions',sapp);

    var srg         = sn('sapprg', fapp ); 
    //:nearly a patch
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var cssmod      = sn('ssCssModules',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var drg         = sn('datarg', fapp ); 

    ssF.tr = tr;
    ssF.tp = tp;

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // //\\ establishes landing-start-state
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    document.documentElement.className += 'non-loaded';
    $$  .c( 'style' )
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
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // \\// establishes landing-start-state
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    document.addEventListener( "DOMContentLoaded", init );
    //00000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000











    //=========================================================
    // //\\ inits full app
    //=========================================================
    function init() 
    {
        //===============================
        // //\\ establishes configuration
        //===============================
        ns.url2conf( fconf );
        sapp.pageMode = ( fconf.lemma && 'lemma'              ) || 'landing';
        var lemmaNumber = ( fconf.lemma && parseInt(fconf.lemma) ) || '';
        sapp.lemmaNumber = lemmaNumber; //todm patch ... not enough generic

        switch( lemmaNumber )
        {
            case 9: 
                    var sappKey = 'lemma9';
                    var dataKey = 'lemma9';
                    break;
            case 2: 
                    var dataKey = 'lemma2';
                    var sappKey = 'l23';
                    break;
            case 3: 
                    var dataKey = 'lemma3';
                    var sappKey = 'l23';
                    break;
        }
        sapp.sappKey = sappKey;
        var srg_modules = sn(sappKey, srg);

        var drg_own = drg[ dataKey ];
        if( lemmaNumber ) {
            Object.keys( srg_modules ).forEach( function( key ) {
                srg_modules[ key ]();
            });
            Object.keys( drg_own.modules ).forEach( function( key ) {
                drg_own.modules[ key ]();
            });
            ssF.init_conf();
            ns.url2conf( fconf ); //overrides subapp conf
        }
        //===============================
        // \\// establishes configuration
        //===============================




        //=======================================
        // //\\ html and css
        //=======================================
        cssmods.initSiteWideCSS(cssp, fconf);
        if( sapp.pageMode === 'lemma' ) {
            sn('ssCssOrder',ss).list.forEach( function( cssName ) {
                ns.globalCss.addText( cssmod[cssName]( cssp, fconf ) );
            });
        }
        ns.globalCss.update();
        document.body.innerHTML = html.body();
        //.must be called fapproot
        rootvm.approot          = document.querySelector( '.' + cssp + '-approot' ); //binds to app root
        ns.create_mobile_tester(rootvm.approot,fconf.mobileDetectorMediaThreshold);
        fapp.initBurgerMenu_8_navDrawerShade();
        //=======================================
        // \\// html and css
        //=======================================



        //==============================================
        // //\\ lemma-page-router
        //==============================================
        if( sapp.pageMode === 'lemma' ) { initLemma(); }
        //==============================================
        // \\// lemma-page-router
        //==============================================



        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // //\\ removes landing-start-state
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //.todmm ... why without 1s transition the landing flickers?
        //todm ... use regEx to cooperate with other frameworks on html-element
        document.documentElement.className =
            document.documentElement.className.replace( 'non-loaded', '' );
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // \\// removes landing-start-state
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        fmethods.setupSiteWideEvents();
    }
    //=========================================================
    // \\// inits full app
    //=========================================================




    //=======================================
    // //\\ lemma-page-router
    //=======================================
    function initLemma()
    {
        fmethods.createLemmaDom();
        sapp.init_sapp();
        sapp.isInitialized = true;
        //.does initial transclusion
        fmethods.test_mobile_and_attach_exegesis_tabs();
        //.sets default ... disabled so "Area-legend" cannot be a default
        //.because of sapp.isInitialized, we can set tabs and menus
        rg['mobile-tabs'][ sconf.defaultMobileTabSelection ].clicker.click();
        fmethods.setupEvents();
        fmethods.fullResize();
    }
    //=======================================
    // \\// lemma-page-router
    //=======================================




    ///function "to registry"
    ///does register model unit if not yet exist
    ///useful to prevent unit's duplication
    function tr( id, key, val )
    {
        rg[ id ] = rg.hasOwnProperty( id ) ? rg[ id ] : {};
        if( key ) { rg[ id ][ key ] = val; }
        return key ? val : rg[ id ];
    }
    function tp( id, val )  { return tr( id, 'pos', val ); }    //pos to registry

}) ();

