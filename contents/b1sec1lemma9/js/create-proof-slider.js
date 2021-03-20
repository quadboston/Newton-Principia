( function() {
    var {
        eachprop,
        sn,
        fconf,
        sconf,
        sDomF,
        sDomN,
        studyMods,
        ssD,
        ssF,
        rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            create_proofSlider,
        },
    });
    return;









    function create_proofSlider()
    {
        //=====================================================
        // //\\ animated slider
        //      slides point C by changing Bezier parameter tC
        //      At page load time, animates to value sconf.tC.
        //      Based on ns.sliderControl which is based on,
        //      as of version 1072,
        //      module bsl/slider/d8d-app-template.js 
        //=====================================================

        ///as of version 1072, ssF.animatedSlider is set in full-app/lib/animated-slider/
        var captionScale = 1;
        sDomF.proofSlider = ssF.animatedSlider({
            //parent            :sDomN.menu,
            //.adds slider usually below numbers' table
            parent              :sDomN.medRoot,
            cssp                :'bsl',
            hideProofSlider     :sconf.hideProofSlider,
            sliderClassId       :'simple',
            captionScale        :captionScale,
            railsLegend         :'Process proof by decreasing AC:',
            ancestorClassToHideSlider   :'theorion--claim',


            dataInMove:         function( dataArg, draggee ) {
                                    //:master place where tC updates

                                    //.todm wrong: belongs to subapp instance
                                    ssD.tC = dataArg;
                                    eachprop( studyMods, ( stdMod, modName ) => {
                                        stdMod.model8media_upcreate();
                                    });
                                    //appar. this is an internal business: nothing with app
                                    setCaption( sDomF.proofSlider.slider );
                                },
            //.callback when handler stops
            dataInArrival:      function( dataArg ) {
                                    //.does synch secondary slider
                                    rg.C.achieved.achieved = dataArg;
                                },
            setCaption: setCaption //apparently this is for dom-el created internally,
                                   //nothing to do with app or parent
        });
        sDomF.proofSlider.doSet_childOpeningAnimation(
            1,            //initial application data  
            sconf.tC,     //final application data

            //setting second arg to 20 makes introductory animation instant
            sconf.hideProofSlider ? 20 : 2000 //sets dur to min if no anim
        );

        //appar. this is an internal slider business:
        //       nothing affecting of the parent app
        ///converts study-model pos to draggee caption
        function setCaption( slider_arg )
        {
            var pC = rg.C.pos;
            var pClen = Math.sqrt( pC[0]*pC[0]+pC[1]*pC[1] ) /
                        sconf.APP_MODEL_Y_RANGE;
            var capt = sconf.LEGEND_NUMERICAL_SCALE ?
                        ( captionScale * sconf.LEGEND_NUMERICAL_SCALE * pClen ).toFixed(2) :
                        ( captionScale * pClen ).toFixed(2);
            slider_arg.draggee.innerHTML = capt;
        }
        //=====================================================
        // \\// animated slider
        //=====================================================
    }

}) ();

