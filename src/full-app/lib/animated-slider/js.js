// //\\//
(function() {
	var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var anslider    = ns.sn('animated-slider');

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    ssF.animatedSlider = animatedSlider;
    //0000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000








    ///... appar. this function is derived from vbls/... animated-slider.js
    ///... which had prototype: ns.simpleSlider = function( parent, cssp, sliderClassId, captionScale )
    function animatedSlider( sarg )
    {
        var parent          = sarg.parent;
        var cssp            = sarg.cssp;
        var hideProofSlider = sarg.hideProofSlider;
        var sliderClassId   = sarg.sliderClassId;
        var railsLegend     = sarg.railsLegend;
        var dataInMove      = sarg.dataInMove;
        var dataInArrival   = sarg.dataInArrival;
        //:optional
        var setCaption      = sarg.setCaption;
        //.overrides animated-slider-plugin's default css
        var customCss       = sarg.customCss; 
        //.hides but displays slider by ancestor css-class
        var ancestorClassToHideSlider = sarg.ancestorClassToHideSlider;
        //:
        parent = parent || document.body;
        return_slider = {};



        //===============================
        // //\\ creates dom placeholders
        //===============================
        // //\\ appends style
        //-------------------------------
        var css = customCss ||
                  anslider.css( cssp, sliderClassId, railsLegend,
                                ancestorClassToHideSlider, sconf.hideProofSlider
                  );
        $$  .c( 'style' )
            .html( css )
            .to( document.head );
        //-------------------------------
        // \\// appends style
        //-------------------------------



        //:appends slider root
        return_slider.slider$ = $$
            .c( 'div' )
            .a( 'class', cssp + '-slider-' + (sliderClassId ? sliderClassId : '' ) )
            .to( parent );
        //:appends draggee
        return_slider.draggee$ = $$
            .c( 'div' )
            .a( 'class', cssp +'-draggee' )
            .to( return_slider.slider$() );
        //===============================
        // \\// creates dom placeholders
        //===============================



        //======================
        // //\\ creates slider
        //======================
        ///as of version 1072, calls this function from module bsl/slider/d8d-app-template.js 
        ///there are too many drag-and-drop variants now, it's easy to be lost ...
        var slider = ns.sliderControl({
            drawSurfaceDomEl:   return_slider.slider$(),
            handleDomEl:        return_slider.draggee$(),
            lowLimit:0.001,
            maxLimit:1,
            //.callback when handler moves
            dataInMove:  dataInMove,
            dataInArrival   :dataInArrival
        });
        return_slider.slider = slider;
        //.displays draggee caption at start up
        setCaption && setCaption( slider );
        //======================
        // \\// creates slider
        //======================



        //===============================
        // //\\ starts landing animation
        //===============================
        return_slider.doSet_childOpeningAnimation = doSet_childOpeningAnimation;
        //===============================
        // \\// starts landing animation
        //===============================
        //1111111111111111111111111111111
        return return_slider;
        //1111111111111111111111111111111










        ///defines landing animation
        function doSet_childOpeningAnimation( startX, endX, dur )
        {
            var aframes = ns.aframes;
            var slider  = return_slider.slider;
            var rangeX  = endX - startX;
            function emulatesMove( timestamp ){
                var dataArg = startX + rangeX*(Math.min(timestamp, dur)) / dur;
                //c cc( 'emulates: moves dataArg=' + dataArg );
                slider.d8d_emulateAbsFractionX( dataArg, 'move' );
            }
            function completesMove()
            {
                slider.d8d_emulateAbsFractionX( endX, 'up' );
            };
            animInProgressHashStr = aframes.add8complete( emulatesMove, dur, completesMove );
        }

    };

})();

