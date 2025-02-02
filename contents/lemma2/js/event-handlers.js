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

        //sdata.curveDragHandlesVisible = true;
        study.eventHandlers =
        {
	        toggleInscribed,
	        toggleCircumscribed,
        };
        study.setupEvents = setupEvents;
        return;



        function setupEvents()
        {
            Object.keys( study.eventHandlers ).forEach( function( methodName ) {
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
            //stdMod.r efreshSVG_master();
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

}) ();


