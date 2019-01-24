( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'create-proof-slider';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.create_proofSlider = create_proofSlider;
    }

    function create_proofSlider()
    {
        //=====================================================
        // //\\ animated slider
        //      slides point C by changing Beizier parameter tC
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
            ancestorClassToHideSlider   :'proof--claim',


            dataInMove:         function( dataArg, draggee ) {
                                    //:master place where tC updates

                                    //.todo wrong: belongs to subapp instance
                                    ssD.tC = dataArg;
                                    sapp.upcreate();
                                    setCaption( sDomF.proofSlider.slider );
                                },
            //.callback when handler stops
            dataInArrival:      function( dataArg ) {
                                    //.does synch secondary slider
                                    rg.point_C.achieved.achieved = dataArg;
                                },
            setCaption: setCaption
        });
        //.args: final-value-after-animation, period
        //.setting second arg to 20 makes introductory animation instant
        sDomF.proofSlider.doSet_childOpeningAnimation(
            1, sconf.tC,
            sconf.hideProofSlider ? 20 : 2000
        );
        ///converts study-model pos to draggee caption
        function setCaption( slider_arg )
        {
            var pC = rg.point_C.pos;
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

