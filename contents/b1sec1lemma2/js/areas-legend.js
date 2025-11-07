( function() {
    var { sn, $$, fapp, sDomN, ssF, stdMod, }
        = window.b$l.apptree({ setModule, });
    var stdL2 = sn('stdL2', fapp );
    return;


    function setModule()
    {
        var gui         = sn('gui', stdL2 );
        var guiup       = sn('guiUpdate',gui);
        var study       = sn('study', stdL2 );
        var sdata       = sn('sdata', study );

        study.eventHandlers =
        {
	        toggleInscribed,
	        toggleCircumscribed,
        };
        study.setupEventsAreasLegend = setupEventsAreasLegend;

        Object.assign( ssF, {
            create_digital_legend,
        });

        Object.assign( guiup, {
            updateLegendAmounts,
        });
        return;


        function setupEventsAreasLegend()
        {
            Object.keys( study.eventHandlers ).forEach( function( methodName ) {
                document.getElementById( methodName )
                    .addEventListener( 'change', study.eventHandlers[ methodName ] );
            });


            // //\\ copy-pasted from gui-art
            gui.showFig = function(){
                //https://stackoverflow.com/questions/4754699/
                //  how-do-i-determine-if-a-checkbox-is-checked
                //no good: var cbox = document.getElementById(
                //'checkbox_4').getAttribute('checked');
                //no good: if($('.figur').is(':checked'))  {
                var checked = document.getElementById('checkbox_4').checked;
                sdata.view.isFigureChecked = checked;
                if(!checked)  {
                    let view = sdata.view;
                    let isFig = view.isFigureChecked;
                    let isIn = view.isInscribed;
                    let isCir = view.isCircumscribed;
                    if( !isIn && !isCir ) {
                        document.getElementById('checkbox_4').checked = true;
                        sdata.view.isFigureChecked = true;
                        return;
                    }
                }
                ssF.media_upcreate_generic();
            }
            // \\// copy-pasted from gui-art
        };


        //======================================
        // //\\ event-handlers
        //======================================
        function toggleInscribed() {
            let view = sdata.view;
            let isFig = view.isFigureChecked;
            let isIn = view.isInscribed;
            let isCir = view.isCircumscribed;
            if( !isFig && !isCir ) {
                document.getElementById('toggleInscribed').checked = true;
                sdata.view.isInscribed=1;
                return;
            }
	        sdata.view.isInscribed^=1;
	        //stdL2.shows_rects();
            //has: stdMod.media_upcreate___before_basic_L2
            ssF.media_upcreate_generic();
        }

        function toggleCircumscribed() {
            let view = sdata.view;
            let isFig = view.isFigureChecked;
            let isIn = view.isInscribed;
            let isCir = view.isCircumscribed;
            if( !isFig && !isIn ) {
                document.getElementById('toggleCircumscribed').checked = true;
                view.isCircumscribed = 1;
                return;
            }
	        sdata.view.isCircumscribed^=1;
	        //stdL2.shows_rects();
            ssF.media_upcreate_generic();
        }
        //======================================
        // \\// event-handlers
        //======================================
    }


    ///====================================================================
    /// create_digital_legend
    /// Don't mix this with stdMod.create_digital_legend.
    /// Current function has specific to lemma construction,
    /// events, and updater.
    ///
    /// this dom is now handled in this file
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
                          tocolor tobold">circumscribed</span>
                </div>
                <!--END Circumscribed-->



                <!-- copy pasted from lemma.html -->
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


    function updateLegendAmounts(dr) {
        document.getElementById("figAmt").innerHTML =
            ((Math.sign( dr.figureArea )==-1)?"-":"" )+ "100.0";
        document.getElementById("inAmtd").innerHTML =
            normalizedStr( dr, dr.areaIns, dr.figureArea);
        document.getElementById("circAmtd").innerHTML =
            normalizedStr( dr, dr.areaCir, dr.figureArea);
    }

    function normalizedStr( dr, amt )
    {
        return (100*amt/Math.abs(dr.figureArea)).toFixed(1);
    }

}) ();

