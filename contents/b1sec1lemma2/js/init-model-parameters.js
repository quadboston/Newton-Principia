// //\\// Main entrance into sub-application.

(function() {
    var {
        sn, eachprop, haff, numModel,
        fapp, sapp, ssF, sDomF, rg,
        stdMod,
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

        {
            let pid = 'proof-pop-up';
            let button = ssF.createButton({
                caption                 :
                    'Newton\'s logic applies to monotonic curves',
                buttonUniversalId       : pid,
                //scenarioEventOnClick    : 'graph-is-plotted',
                clickCallback           : () => {
                    sData[ pid ].dom$.css( 'display', 'none' );
                },
                noTopicScenario         : true,
                cssText                 : `
                    position            : absolute;
                    width               : 330px;
                    height              : 18px;
                    top                 : 0%;
                    padding             : 8px;
                    left                : 50%;
                    transform           : translate( -50%, 0% );
                    border-radius       : 15px;
                    border              : 3px outset #cccccc;
                    font-size           : 16px;
                    text-align          : center;
                    background-color    : #dddddd;
                    color               : red;
                    cursor              : pointer;
                    z-index             : 111111111;
                `,
            });
        }        

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
        //we do this because of this sub
        //may play role of model, so all the
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
        //guicon.constructsCtrPoints();

        stdMod.model_upcreate();
        //now, this call does
        //stdMod.media_upcreate___before_basic_L2
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
                var drX = rg[ pname ];
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


