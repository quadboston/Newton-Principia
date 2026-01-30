(function(){
const {sn, $$, fapp, fconf, sf, tpid2arrc_elect,
       sDomN, ssF, sDomF, stdMod, amode,} =
      window.b$l.apptree({
        stdModExportList: { constructsCurve8Area, },
        ssFExportList: { continue_create_8_prepopulate_svg,
                         create_digital_legend, },
});
var stdL2   = sn('stdL2', fapp );
var dr      = sn('datareg', stdL2 );
var gui     = sn('gui', stdL2 );
var guicon  = sn('guiConstruct', gui );
return;


function constructsCurve8Area (){
    var svg = stdMod.mmedia$.aNS( 'id', 'illus' )();
    sDomN.curve_pre$ = $$.cNS( 'polyline' )
        .aNS( 'class', "outline-cls" )
        .css( 'stroke', sDomF.tpid0arrc_2_rgba(
                tpid2arrc_elect.attention) )
        .to(svg)
        ;
    sDomN.curve_past$ =$$.cNS( 'polyline' )
        .aNS( 'class', "outline-cls" )
        .css( 'stroke', sDomF.tpid0arrc_2_rgba(
                tpid2arrc_elect.attention) )
        .to(svg)
        ;
    sDomN.curve_middle$ = $$.cNS( 'polyline' )
        .aNS( 'class', "tp-figure tp-curve figure outline-cls tostroke" )
        .to(svg)
        ;
    sDomN.figureInternalArea$ = $$.cNS( 'polyline' )
        .aNS( 'class', "tp-figure-area tofill hidden tohidden" )
        .to(svg)
        ;
    dr.figureInternalArea = sDomN.figureInternalArea$();
}

function continue_create_8_prepopulate_svg (){
    var svg = stdMod.mmedia$.aNS( 'id', 'illus' )();

    //====================================================================
    // //\\ paints preliminary elements
    //====================================================================
    //creates "shallow axis line"
    dr.baseAxis = $$.cNS( 'line' )
        .aNS( 'class', "tp-figure tp-base figure outline-cls tostroke" )
        .to(svg)
        ();
    //====================================================================
    // \\// paints preliminary elements
    //====================================================================
}

///====================================================================
/// create_digital_legend
/// Don't mix this with stdMod.create_digital_legend.
/// Current function has specific to lemma construction,
/// events, and updater.
///
/// this dom is apparently handled in /lemma-2-3/core/event-handlers.js
/// the names to which events are attached may be hard to find in code
/// because the attachment is handled like a "batch":
/// Object.keys( study.eventHandlers ).
///         forEach( function( methodName ) ....
///====================================================================
function create_digital_legend (){
    sDomN.digitalLegend$ = $$.dict(
        "areadesk",
        "areas dull desc default-content main-legend",
        stdMod.legendRoot$ )
        .html(`

            <div class="line"></div>
            <div id="two" class="desc__header">
                <h2 class="desc__header-title">Areas</h2>
            </div>


            <div class="circumscribed  areas__checkboxes-row">
                <div class="tp-circumscribed checkbox-wrap tobg">
                    <input id="toggleCircumscribed" type="checkbox" name="option"
                            class="checkbox circumscribed" checked>
                    <label class="tp-circ-txt"
                            for="toggleCircumscribed"></label>
                </div>
                <span class="number">
                    <span class="tp-circ-txt tocolor tobold circAmtd"
                            id="circAmtd"></span>
                </span>
                <span class="tp-circ-txt tag circumscribed-tag
                        tocolor tobold">circumscribed</span>
            </div>
            <!--END Circumscribed-->



            <!-- copy pasted from lemma2.html -->
            <div class="figure  areas__checkboxes-row">
                <div class="checkbox-wrap tobg">
                    <input id="checkbox_4" type="checkbox" name="option"
                            class="checkbox figure"
                            onclick="window.b$l.fapp.stdL2.gui.showFig()"
                            checked>
                    <label class="tp-figure tp-figure-area-txt" for="checkbox_4"></label>
                </div>
                <span class="number">
                    <!-- class="tp-figure-area-txt -->
                    <span class="tp-figure tp-figure-area-txt tocolor tobold figAmt"
                            id="figAmt">100.0</span>
                </span>
                <span class="tp-figure tp-figure-area-txt tocolor tobold figAmt">figure</span>
            </div>
            <!--END figure-->


            <div class="inscribed areas__checkboxes-row">
                <div class="checkbox-wrap">
                    <input id="toggleInscribed" type="checkbox" name="option"
                            class="checkbox inscribed" checked>
                    <label class="tp-insc-txt" for="toggleInscribed"></label>
                </div>
                <span class="number">
                    <span class="tp-insc-txt tocolor tobold inAmt"
                            id="inAmtd"></span>
                </span>
                <span class="tp-insc-txt tocolor tobold tag
                        inscribed-tag">inscribed</span>
            </div>
            <!--END inscribed-->

    `);
}
})();

