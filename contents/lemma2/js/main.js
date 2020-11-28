// //\\// Main entrance into sub-application.

(function() {
    var {
        sn, eachprop, haff,
        sapp, ss, ssF,
        studyMods,
    } = window.b$l.apptree({
        setModule,
    });
    var study       = sn('study', ss );
    var gui         = sn('gui', ss );
    var guicon      = sn('guiConstruct', gui );
    var dr          = sn('datareg', ss );
    return;







    function setModule()
    {
        sapp.init_sapp = init_sapp;
        sapp.finish_sapp_UI = finish_sapp_UI;
    }

    function init_sapp()
    {
        ss.presetData();

        //-------------------------------------------------------
        // //\\ dom z-order patch
        //-------------------------------------------------------
        haff( ssF, 'continue_create_8_prepopulate_svg' );

        //tod? right: 
        dr.baseAxis = document.getElementById( 'baseAxis' );
        //baseAxis        : document.getElementById( 'base' ),

        dr.wallL = document.getElementById( 'wallL' );
        dr.wallR = document.getElementById( 'wallR' );
        //ccc( 'dr.baseAxis', dr.baseAxis );
        //-------------------------------------------------------
        // \\// dom z-order patch
        //-------------------------------------------------------

        gui.constructWidthestRectangular();
        guicon.constructFigure();
        ssF.convergenceResultArea(); //do on top of ancestors
        guicon.buildPoints();
        dr.figureInternalArea = document.getElementById( 'figureInternalArea' );
        guicon.buildControlPoints();

        study.eventHandlers.toggleChangeFigure();
        eachprop( studyMods, ( stdMod ) => {
            stdMod.model8media_upcreate();
        });
        gui.buildSlider();
    }

    function finish_sapp_UI()
    {
        gui.createDragModel();
        study.setupEvents();
    }

}) ();


