// //\\// Main entrance into sub-application.

(function() {
    var ns          = window.b$l;
    var $$          = ns.$$;    
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var sDomF       = sn('dfunctions', sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss', fapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return;





    function setModule()
    {
        sapp.init_sapp = init_sapp;
        sapp.finish_sapp_UI = finish_sapp_UI;
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
        ns.eachprop( studyMods, ( stdMod, modName ) => {
            stdMod.model8media_upcreate();
        });
        gui.buildSlider();
    }

    function finish_sapp_UI()
    {
        var l23         = ss;
        var gui         = sn('gui', l23 );
        var study       = sn('study', l23 );
        gui.createDragModel();
        study.setupEvents();
    }

}) ();


