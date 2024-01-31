( function () {
    var {
        ns, sn, $$, haz,
        fapp, sconf, fmethods, sDomN, ssF,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2 = sn('stdL2', fapp );
    return;







    function setModule()
    {
        var study       = sn('study', stdL2 );
        var sdata       = sn('sdata', study );
        var gui         = sn('gui', stdL2 );
        var dr          = sn('datareg', stdL2 );

        sdata.curveDragHandlesVisible = true;
        study.eventHandlers =
        {
            toggleChangeFigure,
	        toggleInscribed,
	        toggleCircumscribed,
        };
        study.setupEvents = setupEvents;
        return;



        function setupEvents()
        {
            Object.keys( study.eventHandlers ).forEach( function( methodName ) {
                //todo these things are too different to art-pack ... skips them for now
                if( 'toggleChangeFigure' === methodName ) return;

                document.getElementById( methodName )
                    .addEventListener( 'change', study.eventHandlers[ methodName ] );
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
                sdata.view.isFigureChecked = checked;
                if(checked)  {
                    //$('.outline').toggle();
                    $$.qa( '.outline' )().forEach( outlinee => {
                        $$.$(outlinee).removeClass( 'hidden' );
                        //outlinee.style.visibility =
                        // 'visible'; //todm ... is this a right action?
                    });
                    //sDomN.figureInternalArea$.removeClass('hidden');
                }else{
                    let view = sdata.view;
                    let isFig = view.isFigureChecked;
                    let isIn = view.isInscribed;
                    let isCir = view.isCircumscribed;
                    if( !isIn && !isCir ) {
                        document.getElementById('checkbox_4').checked = true;
                        sdata.view.isFigureChecked = true;
                        return;
                    }
                    $$.qa( '.outline' )().forEach( outlinee => {
                        //outlinee.style.visibility = 'hidden';
                        $$.$(outlinee).cls( 'hidden' );
                    });
                }
                ssF.media_upcreate_generic();
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
            //stdMod.refreshSVG_master();
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
    		        dr.ctrlPts[i].dom.setAttributeNS(null, "visibility",
                        cvis ? "visible":"hidden");
    	        } else {
                    //here we disable dragPointVisibilityToggling
    		        dr.ctrlPts[i].dom.setAttributeNS(null, "visibility", "visible");
    	        }
	        }
        }
        //======================================
        // \\// event-handlers
        //======================================
    }

}) ();


