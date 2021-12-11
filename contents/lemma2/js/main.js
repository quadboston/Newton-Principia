// //\\// Main entrance into sub-application.

(function() {
    var {
        sn, eachprop, haff,
        sapp, ss, ssF, sDomF,
        studyModsActivated, stdMod,
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

        //see:     ///modern approach ... abandoned
        //createsBaseSlider();

        study.eventHandlers.toggleChangeFigure();

        //---------------------------------------
        //overwork??
        studyModsActivated.forEach( stdMod => {
        //---------------------------------------

            stdMod.model8media_upcreate();
        });

        gui.buildSlider();
    }

    /*
    ///modern approach ... abandoned
    ///unrem this: //todm remove: experiment:
    function createsBaseSlider()
    {
        //====================================
        // //\\ slider
        //====================================
        var pname = 'baseSlider';
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname,
            orientation : 'axis-x',
            acceptPos : newPos =>
            {
                var drX = stdMod.rg[ pname ];
                drX.pos[0] = newPos[0];
                newPos[1] = drX.pos[1];
                return !!'move permitted';
            },
        });
        ccc( rg.baseSlider );
        sDomF.createsFW__8__executes_dragWr_gens_list( stdMod );
        //====================================
        // \\// slider
        //====================================
    }
    */



    function finish_sapp_UI()
    {
        gui.createDragModel();
        study.setupEvents();
    }

}) ();


