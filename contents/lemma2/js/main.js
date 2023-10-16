// //\\// Main entrance into sub-application.

(function() {
    var {
        sn, eachprop, haff,
        fapp, sapp, ssF, sDomF,
        studyModsActivated, stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var gui         = sn('gui', stdL2 );
    var guicon      = sn('guiConstruct', gui );
    var dr          = sn('datareg', stdL2 );
    return;







    function setModule()
    {
        //:fitting early lemmas to modern framework
        stdMod.init_model_parameters = () => {};
        let f = sapp.init_sapp;
        sapp.init_sapp = function() {
            init_sapp();
            f();
        };

        sapp.finish_sapp_UI = finish_sapp_UI;
    }


    function init_sapp()
    {
        // dom z-order patch
        haff( ssF, 'continue_create_8_prepopulate_svg' );

        //----------------------------------------------
        // //\\ fits lemma to modern framework
        //----------------------------------------------
        {
            //tp-difference is a color set in sconf in predefinedTopics
            let cssClass = 'tp-difference tofill biggap';
            ssF.pnames2poly(
                [ 'a', 'K', 'b', 'l', ],
                cssClass,
                !!'correctJoin'
            ).UPDATE_MPOS_BEFORE_POLY = true;
            ssF.pnames2poly(
                [ 'b', 'L', 'c', 'm' ],
                cssClass,
                !!'correctJoin'
            ).UPDATE_MPOS_BEFORE_POLY = true;
            ssF.pnames2poly(
                [ 'c', 'M', 'd', 'n' ],
                cssClass,
                !!'correctJoin'
            ).UPDATE_MPOS_BEFORE_POLY = true;
            ssF.pnames2poly(
                [ 'd', 'D', 'E', 'o' ],
                cssClass,
                !!'correctJoin'
            ).UPDATE_MPOS_BEFORE_POLY = true;
        }

        //---------------------------------------------
        // //\\ trick
        //---------------------------------------------
        //forces generic-fw-points to be initiated under specific points,
        //specific points will be initiated later,
        ssF.media_upcreate_generic();

        //we do this because of refreshSVG_master may play role of model, so all the
        //stuff for gui must be created before framework's media update
        stdMod.media_upcreate___before_basic = stdMod.refreshSVG_master;
        //---------------------------------------------
        // \\// trick
        // \\// fits lemma to modern framework
        //----------------------------------------------

        gui.constructWidthestRectangular_parameterlessDom();
        guicon.constructFigure_tillExtraOffset_parlessDom();
        ssF.creates_figures_domPlaceholder(); //do on top of ancestors
        guicon.buildsRect8BasePoints();
        guicon.buildsControlPoints();
        ssF.media_upcreate_generic(); //vital, perhaps for synch

        //see:     ///modern approach ... abandoned
        //createsBaseSlider();

        study.eventHandlers.toggleChangeFigure();

        gui.buildSlider();
        sDomF.detected_user_interaction_effect( 'doUndetected' );
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
        c cc( rg.baseSlider );
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


