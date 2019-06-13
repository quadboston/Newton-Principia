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
    var studyMods   = sn('studyMods', sapp);

    sDomF.create8prepopulate_svg = create8prepopulate_svg;
    return;
    //00000000000000000000000000000000000000




    //=========================================================
    // //\\ updates and creates media
    //=========================================================


    function create8prepopulate_svg()
    {
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            create8prepopulate_singleSvg( stdMod );
        });
    }



    function create8prepopulate_singleSvg( stdMod )
    {
        //..........................
        // //\\ media
        //..........................
        ////makes svg-draw-area

        sDomN.mmedia$ = //todo: patch: sets this to most recent called media creator:
        stdMod.mmedia$ = $$.$( document.createElementNS( fconf.svgNS, 'svg' ) );

        var mmedia = sDomN.mmedia = stdMod.mmedia = stdMod.mmedia$();
        mmedia.setAttributeNS( null, 'class', cssp +'-media' );

        //https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/version
        //mmedia.setAttributeNS( null, 'version', "1.1" ); //no need

        mmedia.setAttributeNS( null, 'viewBox', '0 0 ' +
                                 sconf.innerMediaWidth + ' ' +
                                 sconf.innerMediaHeight );
        //https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
        //minor details:
        //https://stackoverflow.com/questions/16438416/cross-browser-svg-preserveaspectratio
        mmedia.setAttributeNS( null, 'preserveAspectRatio', "xMidYMid meet" );

        //depricated in svg:
        //mmedia.setAttributeNS( null, 'baseProfile', "full" );

        stdMod.mmedia$.to( sDomN.medRoot );
        //mmedia.setAttributeNS( null, 'fill', "#FFFFAA" );
        //no good: mmedia.style.fill = "#FFFFAA";
        //..........................
        // \\// media
        //..........................
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================


}) ();

