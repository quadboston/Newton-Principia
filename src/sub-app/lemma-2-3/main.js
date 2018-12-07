// //\\// Main entrance into sub-application.

        // TODO: graphic artist help
        // fade descriptions
        // ?form color coded in/circ
        // nn bases location fix
        // B&W squares in Newton's?
        // Scale with screen size
        // MY TODO
        // clean up code

(function() {
    var ns          = window.b$l;
    var $$          = ns.$$;    
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 

    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions', sapp);

    var ss          = sn('ss', fapp);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return;





    function setModule()
    {
        sapp.init_sapp =  init_sapp;
    }

    function init_sapp()
    {
        var l23         = ss;
        var study       = sn('study', l23 );
        var gui         = sn('gui', l23 );
        var guicon      = sn('guiConstruct', gui );

        l23.presetData();
        gui.constructWidthestRectangular();
        guicon.constructFigure();
        
        study.eventHandlers.toggleChangeFigure();
        sapp.upcreate();
        gui.buildSlider();

        //:initMediaModel
        sDomF.topicModel_2_css_html();
        sapp.readyToPopulateMenu = true;
        sDomF.populateMenu();
        gui.createDragModel();

        study.setupEvents();
    };


}) ();


