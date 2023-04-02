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
        //-------------------------------------------------------
        // \\// dom z-order patch
        //-------------------------------------------------------

        //----------------------------------------------
        // //\\ fits lemma to modern framework
        //----------------------------------------------
        {
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
        //forces generic-fw-points to be initiated under specific points,
        //specific points will be initiated later,
        ssF.media_upcreate_generic();

        //stdMod.model8media_upcreate = stdMod.refreshSVG_master;
        //we do this because of refreshSVG_master may play role of model, so all the
        //stuff for gui must be created before framework's media update
        stdMod.media_upcreate___before_basic = stdMod.refreshSVG_master;
        //stdMod.media_upcreate___part_of_medupcr_basic = refreshSVG_master;
        //----------------------------------------------
        // \\// fits lemma to modern framework
        //----------------------------------------------


        gui.constructWidthestRectangular();
        guicon.constructFigure();
        ssF.convergenceResultArea(); //do on top of ancestors
        guicon.buildPoints();
        dr.figureInternalArea = document.getElementById( 'figureInternalArea' );
        guicon.buildControlPoints();
        ssF.media_upcreate_generic(); //vital, perhaps for synch
        //stdMod.syncPoints();
        //ssF.poly_2_updatedPolyPos8undisplay( rg[ 'K--b--l--a' ] );

        //see:     ///modern approach ... abandoned
        //createsBaseSlider();

        study.eventHandlers.toggleChangeFigure();

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


