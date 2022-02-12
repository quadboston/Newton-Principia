( function () {
    var {
        ns, sn, $$, haz,
        sconf, ss, fmethods, sDomN,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    return;







    function setModule()
    {
        var l23         = ss;
        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var numModel    = sn('numModel', l23 );
        var gui         = sn('gui', l23 );
        var dr          = sn('datareg', l23 );

        sdata.curveDragHandlesVisible = true;
        study.eventHandlers =
        {
            toggleChangeFigure  : toggleChangeFigure,
	        toggleInscribed     : toggleInscribed,
	        toggleCircumscribed : toggleCircumscribed,
	        toggleWidthest : showOrHide_widthest
        };
        study.setupEvents = setupEvents;
        return;



        function setupEvents()
        {
            Object.keys( study.eventHandlers ).forEach( function( methodName ) {
                //todo these things are too different to art-pack ... skips them for now
                if( 'toggleChangeFigure' === methodName ) return;

                document.getElementById( methodName )
                    .addEventListener( 'click', study.eventHandlers[ methodName ] );
            });


            // //\\ copy-pasted from gui-art
            stdMod.mmedia$
                .e( "mouseenter", doToggleHelp )
                .e( "mouseleave", doToggleHelp )
                ;

            function doToggleHelp()
            {
                toggleChangeFigure();
                var txtEl = sDomN.helpBoxText$();
                var defaultT = 'Hover over the diagram to interact';
                txtEl.innerHTML = txtEl.innerHTML === defaultT ?
                    'Drag the dot to alter the diagram' :
                    defaultT;
            }
            
            gui.showFig = function(){
                //https://stackoverflow.com/questions/4754699/
                //  how-do-i-determine-if-a-checkbox-is-checked
                //no good: var cbox = document.getElementById(
                //'checkbox_4').getAttribute('checked');
                //no good: if($('.figur').is(':checked'))  {
                var checked = document.getElementById('checkbox_4').checked;

                if(checked)  {
                    //$('.outline').toggle();
                    $$.qa( '.outline' )().forEach( outlinee => {
                        //ccc( 'checked', outlinee );
                        $$.$(outlinee).removeClass( 'hidden' );
                        //outlinee.style.visibility = 'visible'; //todm ... is this a right action?
                    });
                    //sDomN.figureInternalArea$.removeClass('hidden');
                }else{
                    $$.qa( '.outline' )().forEach( outlinee => {
                        //outlinee.style.visibility = 'hidden';
                        $$.$(outlinee).cls( 'hidden' );
                    });
                    //sDomN.figureInternalArea$.cls('hidden');
                    //ccc( 'non checked sDomN.figureInternalArea$', sDomN.figureInternalArea$() );
                }
            }
            // \\// copy-pasted from gui-art



            //--------------------------------------------------------
            // //\\ attaches ownself to resize manager
            //--------------------------------------------------------
            var hazR = haz( fmethods, 'resizeHappened' );
            fmethods.resizeHappened  = hazR ?
                    () => {
                        hazR();
                        doFitScene();
                    }
                :
                    doFitScene
                ;
            //--------------------------------------------------------
            // \\// attaches ownself to resize manager
            //--------------------------------------------------------
            return;

            function doFitScene()
            {
                sDomN.sliderGroup$.css( 'top',
                    ( stdMod.bgImgW * stdMod.simSceSvg_narrowestAsp ).toFixed() + 'px'
                );
            }
        };




        //======================================
        // //\\ event-handlers
        //======================================
        function showOrHide_widthest() {
            if(document.getElementById('toggleWidthest').checked){
                $$.$(dr.faaf).removeClass( 'invisible' );
            } else {
                $$.$(dr.faaf).addClass( 'invisible' );
            }
        }

        function toggleInscribed() {
	        sdata.view.isInscribed^=1;
	        l23.show_LPR();
        }

        function toggleCircumscribed() {
	        sdata.view.isCircumscribed^=1;
	        l23.show_LPR();
        }

        ///toggles mode for curve-shape is-draggable/non-draggable
        ///this function is "hidden" in its wrapper:
        ///     function doToggleHelp() {
        ///     ...
        ///     .e( "mouseleave", doToggleHelp )
        function toggleChangeFigure(){

            //work of this statement is based on a trick:
            //mouse in: it is on, mouse out: it is off:
            //the trick does assume that mouse in and mouse out always match each other;
            var cvis = sdata.curveDragHandlesVisible = !sdata.curveDragHandlesVisible;

	        for (var i=0, len = dr.ctrlPts.length; i < len; i++) {
                //.as of version 91, used in mouse-down point-detection
                dr.ctrlPts[i].visible = !!cvis; 
                if( sconf.dragPointVisibilityToggling ) {                
    		        dr.ctrlPts[i].dom.setAttributeNS(null, "visibility", cvis ? "visible":"hidden");
    	        } else {
                    //here we disable dragPointVisibilityToggling
    		        dr.ctrlPts[i].dom.setAttributeNS(null, "visibility", "visible");
    	        }
	        }
        }
        //======================================
        // \\// event-handlers
        //======================================






        //todo 	        gui.show_widthest_claim_labels( view );
    }

}) ();


