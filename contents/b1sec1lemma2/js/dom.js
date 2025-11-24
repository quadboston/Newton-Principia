( function() {
    var { sn, $$, fapp, fconf, sDomF, sDomN, ssF, stdMod, amode, }
        = window.b$l.apptree({ setModule, });
    var stdL2   = sn('stdL2', fapp );
    var gui     = sn('gui', stdL2 );
    var guicon  = sn('guiConstruct', gui );
    return;


    function setModule()
    {
        Object.assign( ssF,
        {
            continue_create_8_prepopulate_svg,
        });
        Object.assign( guicon,
        {
            constructsCurve8Area,
        });
    }


    function constructsCurve8Area(dr)
    {
        var svg = stdMod.mmedia$.aNS( 'id', 'illus' )();
        dr.curve_pre$ = $$.cNS( 'polyline' )
            .aNS( 'class', "outline-cls" )
            .css( 'stroke', 'red' )
            .to(svg);
        dr.curve_past$ = $$.cNS( 'polyline' )
            .aNS( 'class', "outline-cls" )
            .css( 'stroke', 'red' )
            .to(svg);

        const lowname = stdMod.generateCurveName?.(dr);
        const classCurve = lowname ? `tp-${lowname} ` : "";
        dr.curve_middle$ = $$.cNS( 'polyline' )
            .aNS( 'class', classCurve + "tp-figure tp-curve figure" +
                ` outline-cls tostroke` )
            .to(svg);

        dr.figureInternalArea$ = $$.cNS( 'polyline' )
            .aNS( 'class', "tp-figure-area tofill hidden tohidden" )
            .to(svg);
        dr.figureInternalArea = dr.figureInternalArea$();
    }


    function continue_create_8_prepopulate_svg(dr)
    {
        var svg = stdMod.mmedia$.aNS( 'id', 'illus' )();

        //====================================================================
        // //\\ paints preliminary elements
        //====================================================================
        //creates "shallow axis line" (line that extends entire base of figure)
        dr.baseAxis = $$.cNS( 'line' )
            .aNS( 'class', "tp-figure tp-base figure outline-cls tostroke" )
            .to(svg)
            ();
        //====================================================================
        // \\// paints preliminary elements
        //====================================================================
    }
}) ();

