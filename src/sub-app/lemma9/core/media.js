( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'core';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.create8prepopulate_svg = create8prepopulate_svg;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function create8prepopulate_svg()
    {

        //..........................
        // //\\ media
        //..........................
        ////makes svg-draw-area
        //pitfall: no dice: sDomN.svg = $$.c( 'svg' ).a( 'class', '...' ).a( 'id', ... ).to( ... )();
        sDomN.svg = document.createElementNS( fconf.svgNS, 'svg' );
        sDomN.mmedia = sDomN.svg;
        sDomN.svg.setAttributeNS( null, 'class', cssp +'-media' );
        sDomN.svg.setAttributeNS( null, 'version', "1.1" );    //todo ??
        sDomN.svg.setAttributeNS( null, 'viewBox', '0 0 ' +
                                 sconf.innerMediaWidth + ' ' +
                                 sconf.innerMediaHeight );
        //magic todo?
        sDomN.svg.setAttributeNS( null, 'baseProfile', "full" ); //todm ?

        //todo magic: https://stackoverflow.com/questions/16438416/cross-browser-svg-preserveaspectratio
        sDomN.svg.setAttributeNS( null, 'preserveAspectRatio', "xMidYMid meet" );  //todm ?

        $$.to( sDomN.medRoot, sDomN.svg );
        //sDomN.svg.setAttributeNS( null, 'fill', "#FFFFAA" );
        //no good: sDomN.svg.style.fill = "#FFFFAA";
        //..........................
        // \\// media
        //..........................
    }
    //=========================================================
    // \\//
    //=========================================================


}) ();

