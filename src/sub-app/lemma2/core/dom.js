( function() {
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
    var srg_modules = sn('srg_modules', sapp);
    var sDomN       = sn('dnative', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;







    function setModule()
    {
        ssF.create8prepopulate_svg  = create8prepopulate_svg;
        ssF.create_digital_legend   = create_digital_legend;
        ss.menuExtraWork            = menuExtraWork;
    }


    function menuExtraWork( teaf_id, leaf_id )
    {




        if( teaf_id !== 'aspect' || (sapp.sappId !== 'lemma2' && sapp.sappId !== 'lemma3') ) {
            return;
        }

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
        ///... possibly look here: var l = constructSingleInList_dom("text", list, style+" label");
        ///... in lemma2/core/gui-construct.js
        document.querySelectorAll('.label').forEach( function( el ) {
            el.style.visibility = isHyper ? 'hidden' : 'visible';
        });

        var addRem = isHyper ? 'addClass' : 'removeClass';
        var wVideo = document.querySelector('.video-desktop');
        //.todm querySelectorAll ?
        wVideo && ( wVideo.style.visibility = isHyper ?'hidden' : 'visible');
        //.area labels color vs black toggle
        $$.$(document.querySelector('.areas'))[addRem]('dull');

        /*
        //conflicts with topic-engine colors
        document.querySelectorAll('.model').forEach( function( el ) {
            $$.$(el)[addRem]( 'informalcolor' );
        });
        */

        /*
        //todm what for? n/i ?
        if( !isHyper ) {
            //$('.informal').hide(); //apparently sets switch-default-position
        } else {
            //$('.informal').show();
        }
        */
        ///-------------------------------------------------------------------------
        /// //\\ apparently toggles all colored goodies of informal text
        ///-------------------------------------------------------------------------
        ///translates the description text, changes the model style from b&w to color 
        /*
        function translate(){
            //todm make fade
            $('.desc').find('.informal, .newton').fadeToggle( "fast", "linear" );
            //todm make fade
            $('.video-desktop').toggle();
            $('.label').toggle();
            $('.model').toggleClass('informalcolor');
            $('.areas').toggleClass('dull');//area labels color vs black toggle
        }
        */
        ///-------------------------------------------------------------------------
        /// \\// apparently toggles all colored goodies of informal text
        /// \\// 2) Switch: This controls the translation switch ...?Newton/informal
        ///=========================================================================
    }

    function create8prepopulate_svg()
    {

        //====================================================================
        // //\\ makes media-draw-area
        //====================================================================
        var svg = sDomN.mmedia = sDomN.svg = $$.cNS( 'svg' )
            .aNS( 'id',     'illus' )
            .aNS( 'class',   cssp +'-media' )
            .aNS( 'version', '1.1' ) //todo ??
            .aNS( 'viewBox', '0 0 ' +
                             sconf.innerMediaWidth + ' ' +
                             sconf.innerMediaHeight )
            .aNS( 'baseProfile', "full" ) //magic todo? //todm ?
            //todo magic: https://stackoverflow.com/questions/
            //            16438416/cross-browser-svg-preserveaspectratio
            .aNS( 'preserveAspectRatio', "xMidYMid meet" )  //todm ?
            .to( sDomN.medRoot )
            ();
        //====================================================================
        // \\// makes media-draw-area
        //====================================================================



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
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'wallL' )
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'wallR' )
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'polyline' )
            .aNS( 'id', 'polylineCurve' )
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        sDomN.figureInternalArea$ = $$.cNS( 'polyline' )
            .aNS( 'id', 'figureInternalArea' )
            .aNS( 'class', "tofill" )
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
            sDomN.modelDataLegend$ )
            .html(`

                <div class="line"></div>
                <div id="two" class="desc__header">
                    <h2 class="desc__header-title">Areas</h2>
                </div>


                <div class="circumscribed  areas__checkboxes-row">
                    <div class="checkbox-wrap">
                        <input id="toggleCircumscribed" type="checkbox" name="option" 
                               class="checkbox circumscribed" checked>
                        <label for="toggleCircumscribed"></label>
                    </div>
                    <span class="number">
                        <span class="circAmtd" id="circAmtd"></span>
                    </span>
                    <span class="tag circumscribed-tag">circumscribed</span>
                </div>
                <!--END Circumscribed-->



                <!-- copy pasted from lemma2.html -->
                <div class="figure  areas__checkboxes-row">
                    <div class="checkbox-wrap">
                        <input id="checkbox_4" type="checkbox" name="option"
                               class="checkbox figure"
                               onclick="window.b$l.fapp.ss.gui.showFig()"
                               checked>
                        <label for="checkbox_4"></label>
                    </div>
                    <span class="number">
                        <span class="figAmt" id="figAmt">100.0</span>
                    </span>
                    <span>figure</span>
                </div>
                <!--END figure-->


                <div class="inscribed areas__checkboxes-row">
                    <div class="checkbox-wrap">
                        <input id="toggleInscribed" type="checkbox" name="option" 
                               class="checkbox inscribed" checked>
                        <label for="toggleInscribed"></label>
                    </div>
                    <span class="number">
                        <span class="inAmt" id="inAmtd"></span>
                    </span>
                    <span class="tag inscribed-tag">inscribed</span>
                </div>
                <!--END inscribed-->


                <div class="areas__checkboxes-row"
                     id="widthest-visib-toggler-wrap">
                    <div class="checkbox-wrap">
                        <input id="toggleWidthest" type="checkbox" name="option" 
                               class="checkbox" checked>
                        <label for="toggleWidthest"></label>
                    </div>
                    <span class="number">
                        <span class="diffAmtm" id="diffAmtd"></span>
                    </span>
                    <span class="tag proof-tag">end rectangle</span>
                </div>

        `);

    }

}) ();
