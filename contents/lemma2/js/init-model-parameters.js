// //\\// Main entrance into sub-application.

(function() {
    var {
        sn, eachprop, haff, numModel,
        fapp, sapp, ssF, sDomF,
        studyModsActivated, stdMod,
    } = window.b$l.apptree({
        setModule,
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    var stdL2       = sn('stdL2', fapp );
    var study       = sn('study', stdL2 );
    var gui         = sn('gui', stdL2 );
    var dr          = sn('datareg', stdL2 );
    var numModel    = sn('numModel', stdL2 );
    var guicon      = sn('guiConstruct', gui );
    return;







    function setModule()
    {
        ///this thing works in context of
        ///LANDING_IV___loadLemmaJSCodes() after
        ///and overrided setModule of Landing II
        sapp.finish_sapp_UI = finish_sapp_UI;
    }

    ///one of the first thing called in app-wide sapp.init_sapp
    function init_model_parameters()
    {
        // dom z-order patch
        haff( ssF, 'continue_create_8_prepopulate_svg' );
        
        //----------------------------------------------
        // //\\ fits lemma to modern framework
        // //\\ trick
        //---------------------------------------------
        //forces generic-fw-points to be initiated under specific points,
        //specific points will be initiated later,
        //this call is from core engine, not from lemma-code:
        //it will not call stdMod.media_upcreate___before_basic because this
        //function does not exist in engine core:
        ssF.media_upcreate_generic();

        //*************************************************************
        //this completes media_upcreate_generic and media_upcreate
        //*************************************************************
        //we do this because of r efreshSVG_master may play role of model, so all the
        //stuff for gui must be created before framework's media update
        stdMod.media_upcreate___before_basic = stdMod.media_upcreate___before_basic_L2;
        //---------------------------------------------
        // \\// trick
        // \\// fits lemma to modern framework
        //----------------------------------------------

        guicon.constructsWidestRect();
        guicon.constructsRects_tillExtraOffset_parlessDom();
        
        //numberless:
        guicon.constructsCurve8Area(); //do on top of ancestors

        guicon.constructBasePts_domParless(dr.basePts);
        
        //sets their positions:
        guicon.constructsControlPoints();
        /*
         * //remove when approved
        {
            let newY = [];
            let a = sconf.ctrlPtXYs_js;
            sconf.ctrlPtXYs_js.forEach( (item,ix) => {
                if( ix===0 || ix===4 ) return;
                let x = a[0].x + ix*(a[a.length-1].x- a[0].x)/5
                let y = numModel.curveFun( x ); 
            });
            let x = a[0].x + 4*(a[a.length-1].x- a[0].x)/5
            let y = numModel.curveFun( x ); 
        }
        */
        //now, this call does "r efreshSVG_master"
        stdMod.model_upcreate();
        ssF.media_upcreate_generic(); //vital, perhaps for synch

        //see:     ///modern approach ... abandoned
        //createsBaseSlider();

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


