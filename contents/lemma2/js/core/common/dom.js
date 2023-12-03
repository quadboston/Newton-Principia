( function() {
    var {
        sn, $$,
        fapp, fconf, sDomN, ssF,
        stdMod, amode,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2 = sn('stdL2', fapp );
    var dr    = sn('datareg', stdL2 );
    return;







    function setModule()
    {
        ssF.continue_create_8_prepopulate_svg   = continue_create_8_prepopulate_svg;
        ssF.creates_figures_domPlaceholder    = creates_figures_domPlaceholder;
        ssF.create_digital_legend               = create_digital_legend;
        stdL2.state8css_for_l2_l3                  = state8css_for_l2_l3;
    }


    function state8css_for_l2_l3( mcat_id, scat_id )
    {

        if( mcat_id !== 'aspect' || (fconf.sappId !== 'lemma2' && fconf.sappId !== 'lemma3') ) {
            return;
        }
        ////following work is done for mcat_id === 'aspect' and ( lemma2 or lemma3 )

        ///refreshes legacy state of subapplication for l23 ...
        ///should be in some state enging specific to subapplication ...
        stdL2.study.sdata.view.isClaim = amode.theorion === 'claim';


        ///=========================================================================
        /// //\\ 2) Switch: This controls the translation switch ...?Newton/informal
        ///      function l23_english_latin_switch()
        ///=========================================================================
        var isHyper = scat_id === 'hypertext';

        ///apparently this and letter-labels is somehow disabled to
        ///prevent conflict with
        ///colors of topic engine
        ///... possibly look here: var l = makeS_inList_parlessDom("text", list, style+" label");
        ///... in lemma2/core/gui-construct.js
        document.querySelectorAll('.label').forEach( function( el ) {
            el.style.visibility = isHyper ? 'hidden' : 'visible';
        });

        var addRem = isHyper ? 'addClass' : 'removeClass';
        //.area labels color vs black toggle
        $$.$(document.querySelector('.areas'))[addRem]('dull');
        ///-------------------------------------------------------------------------
        /// \\// 2) Switch: This controls the translation switch ...?Newton/informal
        ///=========================================================================
    }

    function creates_figures_domPlaceholder()
    {
        var svg = stdMod.mmedia$.aNS( 'id', 'illus' )();
        $$.cNS( 'polyline' )
            .aNS( 'id', 'polylineCurve' )
            .aNS( 'class', "tp-figure tp-curve figure outline tostroke" )
            .to(svg)
            ;
        sDomN.figureInternalArea$ = $$.cNS( 'polyline' )
            .aNS( 'id', 'figureInternalArea' )
            .aNS( 'class', "tp-figure-area tofill hidden tohidden" )
            .to(svg)
            ;
        dr.figureInternalArea = document.getElementById( 'figureInternalArea' );
    }


    function continue_create_8_prepopulate_svg()
    {
        var svg = stdMod.mmedia$.aNS( 'id', 'illus' )();

        //====================================================================
        // //\\ paints preliminary elements
        //====================================================================
        $$.cNS( 'ellipse' )
            .aNS( 'id', 'outline' )
            .aNS( 'stroke', "#ff88ff" )
            .aNS( 'stroke-opacity', "1" )
            .aNS( 'stroke-width', "2px" )
            .aNS( 'fill', "red" )
            .aNS( 'fill-opacity', "1" )
            .aNS( 'cx', "100" )
            .aNS( 'cy', "100" )
            .aNS( 'rx', "2" )
            .aNS( 'ry', "2" )
            .aNS( 'display', "none" )
            .css( "position", "absolute" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'baseAxis' )
            .aNS( 'class', "tp-figure tp-base figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'wallL' )
            .aNS( 'class', "tp-figure tp-wall figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'wallR' )
            .aNS( 'class', "tp-figure figure outline tostroke" )
            .to(svg)
            ;
        //tod? right:
        dr.baseAxis = document.getElementById( 'baseAxis' );
        dr.wallL = document.getElementById( 'wallL' );
        dr.wallR = document.getElementById( 'wallR' );
        //====================================================================
        // \\// paints preliminary elements
        //====================================================================
    }




    ///====================================================================
    /// this dom is apparently handled in /lemma-2-3/core/event-handlers.js
    /// the names to which events are attached may be hard to find in code
    /// because the attachment is handled like a "batch":
    /// Object.keys( study.eventHandlers ).
    ///         forEach( function( methodName ) ....
    ///====================================================================
    function create_digital_legend()
    {
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
                          tp-circumscribedXXX tocolor tobold">circumscribed</span>
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


                <div class="areas__checkboxes-row"
                     id="widthest-visib-toggler-wrap">
                    <div class="checkbox-wrap">
                        <input id="toggleWidthest" type="checkbox" name="option" 
                               class="checkbox" checked>
                        <label class="tp-widt-txt" for="toggleWidthest"></label>
                    </div>
                    <span class="number">
                        <span class="tp-widt-txt tocolor tobold diffAmtm"
                              id="diffAmtd"></span>
                    </span>
                    <span class="tp-widt-txt tocolor tobold tag proof-tag">
                          area difference</span>
                </div>

        `);

    }

}) ();

