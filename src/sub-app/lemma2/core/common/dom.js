( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;

    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);


    var ss          = sn('ss',fapp);
    var ssF         = sn('ssFunctions',ss);
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);
    
    var sapp        = sn('sapp'); 
    var amode       = sn('mode',sapp);
    var studyMods   = sn('studyMods', sapp);
    var srg_modules = sn('srg_modules', sapp);
    var sDomN       = sn('dnative', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;







    function setModule()
    {
        ssF.continue_create_8_prepopulate_svg  = continue_create_8_prepopulate_svg;
        ssF.create_digital_legend   = create_digital_legend;
        ss.menuExtraWork            = menuExtraWork;
    }


    function menuExtraWork( teaf_id, leaf_id )
    {

        if( teaf_id !== 'aspect' || (fconf.sappId !== 'lemma2' && fconf.sappId !== 'lemma3') ) {
            return;
        }
        ////following work is done for teaf_id === 'aspect' and ( lemma2 or lemma3 )

        ///refreshes legacy state of subapplication for l23 ...
        ///should be in some state enging specific to subapplication ...
        ss.study.sdata.view.isClaim = amode.theorion === 'claim';


        ///=========================================================================
        /// //\\ 2) Switch: This controls the translation switch ...?Newton/informal
        ///      function l23_english_latin_switch()
        ///=========================================================================
        var isHyper = leaf_id === 'hypertext';

        ///apparently this and letter-labels is somehow disabled to
        ///prevent conflict with
        ///colors of topic engine
        ///... possibly look here: var l = makeS_inList("text", list, style+" label");
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

    function continue_create_8_prepopulate_svg()
    {
        var svg = studyMods[ SUB_MODEL ].mmedia$.aNS( 'id', 'illus' )();

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

        $$.cNS( 'polyline' )
            .aNS( 'id', 'polylineCurve' )
            .aNS( 'class', "tp-figure tp-curve figure outline tostroke" )
            .to(svg)
            ;

        sDomN.figureInternalArea$ = $$.cNS( 'polyline' )
            .aNS( 'id', 'figureInternalArea' )
            .aNS( 'class', "tp-figure-area tofill hidden tohidden" )
            .aNS( 'fill', "rgba(0,222,222,0.5)" )
            .to(svg)
            ;

        $$.c('div')
            .addClass("slider-group")
            .to( sDomN.medRoot )
            .html(`
                <input class="slider" type="range" id="mySlider">
                <span class="slider-label" style="width:99px">
                    <span id="baseSpan" class="number"></span>
                    <span id="baseLabelSpan"></span>
                </span>
            `);
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
            sDomN.legendRoot$ )
            .html(`

                <div class="line"></div>
                <div id="two" class="desc__header">
                    <h2 class="desc__header-title">Areas</h2>
                </div>


                <div class="circumscribed  areas__checkboxes-row">
                    <div class="tp-circumscribed checkbox-wrap tobg">
                        <input id="toggleCircumscribed" type="checkbox" name="option" 
                               class="checkbox circumscribed" checked>
                        <label class="tp-circumscribed-rectangles"
                               for="toggleCircumscribed"></label>
                    </div>
                    <span class="number">
                        <span class="tp-circumscribed-rectangles tocolor tobold circAmtd"
                              id="circAmtd"></span>
                    </span>
                    <span class="tp-circumscribed-rectangles tag circumscribed-tag
                          tp-circumscribed tocolor tobold">circumscribed</span>
                </div>
                <!--END Circumscribed-->



                <!-- copy pasted from lemma2.html -->
                <div class="figure  areas__checkboxes-row">
                    <div class="checkbox-wrap tobg">
                        <input id="checkbox_4" type="checkbox" name="option"
                               class="checkbox figure"
                               onclick="window.b$l.fapp.ss.gui.showFig()"
                               checked>
                        <label class="tp-figure tp-figure-area" for="checkbox_4"></label>
                    </div>
                    <span class="number">
                        <span class="tp-figure-area tocolor tobold figAmt"
                              id="figAmt">100.0</span>
                    </span>
                    <span class="tp-figure tocolor tobold figAmt">figure</span>
                </div>
                <!--END figure-->


                <div class="inscribed areas__checkboxes-row">
                    <div class="checkbox-wrap">
                        <input id="toggleInscribed" type="checkbox" name="option" 
                               class="checkbox inscribed" checked>
                        <label class="tp-inscribed-rectangles" for="toggleInscribed"></label>
                    </div>
                    <span class="number">
                        <span class="tp-inscribed-rectangles tocolor tobold inAmt"
                              id="inAmtd"></span>
                    </span>
                    <span class="tp-inscribed-rectangles tocolor tobold tag
                          inscribed-tag">inscribed</span>
                </div>
                <!--END inscribed-->


                <div class="areas__checkboxes-row"
                     id="widthest-visib-toggler-wrap">
                    <div class="checkbox-wrap">
                        <input id="toggleWidthest" type="checkbox" name="option" 
                               class="checkbox" checked>
                        <label class="tp-widthest-rectangular" for="toggleWidthest"></label>
                    </div>
                    <span class="number">
                        <span class="tp-widthest-rectangular tocolor tobold diffAmtm"
                              id="diffAmtd"></span>
                    </span>
                    <span class="tp-widthest-rectangular tocolor tobold tag proof-tag">
                          end rectangle</span>
                </div>

        `);

    }

}) ();

