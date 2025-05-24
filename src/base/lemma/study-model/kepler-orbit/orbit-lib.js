( function() {
    var {
        $$, nssvg,
        sDomF, ssF, ssD,
        stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_poly2svg_for_lemma,
        },
    });
    return;

    
    ///analogy of function
    ///pointsArr_2_singleDividedDifferences()
    function creates_poly2svg_for_lemma()
    {
        var polylineSvg;
        stdMod.poly2svgP11 = poly2svgP11;
        return;

        ///decoration, should run in upcreate_media
        function poly2svgP11(arg)
        {
            const curve_points = ssD.orbitXYToDraw;
            polylineSvg = nssvg.polyline({
                pivots  : curve_points.map( cp => ssF.mod2inn( cp, stdMod ) ), 
                svgel   : polylineSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            const lowname = sDomF.topicIdUpperCase_2_underscore( 'orbit' );
            //sets tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );
        }
    }
}) ();

