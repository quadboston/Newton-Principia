// //\\// Main entrance into sub-application.
(function(){
const {sn, $$, nspaste, haff, fapp, sf, ssF, sData, sDomF, rg, stdMod,
       tpid2arrc_elect} =
      window.b$l.apptree({
        ssFExportList: {finish_sapp_UI,},
        stdModExportList: {init_lemma,},
});
var stdL2       = sn('stdL2', fapp );
var study       = sn('study', stdL2 );
var gui         = sn('gui', stdL2 );
var dr          = sn('datareg', stdL2 );
var numModel    = sn('numModel', stdL2 );
var guicon      = sn('guiConstruct', gui );
var sdata       = sn('sdata', study );
var appstate    = sn('appstate', stdL2 );
return;


///one of the first thing called in app-wide sapp.init_sapp
function init_lemma (){
    createsDataPlaceholders();
    //========================
    // //\\ creates button
    //========================
    {
        let pid = 'proof-pop-up';
        ssF.createButton({
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
                color: ${sDomF.tpid0arrc_2_rgba(
                           tpid2arrc_elect.attention)};
                cursor              : pointer;
                z-index             : 111111111;
            `,
        });
    }
    //========================
    // \\// creates button
    //========================

    //dom z-order patch
    //creates "shallow axis line"
    dr.baseAxis = $$.cNS( 'line' )
        .aNS( 'class',
                "tp-figure tp-base figure outline-cls tostroke" )
        .to(stdMod.medScene)
        ();

    //----------------------------------------------
    // //\\ fits lemma to modern framework
    // //\\ trick
    //---------------------------------------------
    //forces generic-fw-points to be initiated under specific points,
    //specific points will be initiated later,
    //this call does invoke core engine, and not lemma-code:
    //it will not call stdMod.media_upcreate___before_basic because this
    //function does not exist in engine core:
    ssF.media_upcreate_generic();

    guicon.createsWidestRectSvg();
    guicon.constructsRectsSvg_tillExtraOffset_without_parameters();

    //numberless:
    stdMod.constructsCurve8Area(); //do on top of ancestors

    guicon.constructBasePts_domParless(dr.basePts);

    //sets their positions:
    guicon.constructsControlPoints();

    stdMod.model_upcreate();
    stdMod.completes_bottomSlider();

    //*************************************************************
    //this completes media_upcreate_generic and media_upcreate
    //*************************************************************
    //we do delay this assignment till this moment
    //because of this sub may play role of model, so all the
    //stuff for gui must be created before lemma's media update
    stdMod.media_upcreate___before_basic =
        stdMod.media_upcreate___before_basic_L2;
    //now, this call does
    //stdMod.media_upcreate___before_basic_L2

    //ssF.media_upcreate_generic(); //vital, perhaps for synch
    //because of media_upcreate and giu
    //builders are already done
    ssF.media_upcreate_generic(); //vital, perhaps for synch
    //---------------------------------------------
    // \\// trick
    // \\// fits lemma to modern framework
    //---------------------------------------------
    stdMod.fixesZorder();
    sDomF.detected_user_interaction_effect( 'doUndetected' );
}

function createsDataPlaceholders (){
    Object.assign( dr, {
        basePts         : {offset:1, visOffset:0, list:[]},
        curvPts         : {offset:1, visOffset:0, list:[]},
        circRects       : {offset:0, visOffset:0, list:[]},
        InscrRects      : {offset:0, visOffset:0, list:[]},
        differenceRects : {offset:0, visOffset:0, list:[]},

        //baseLabels    : {offset:1, visOffset:0, list:[]},
        curvLabels      : {offset:0, visOffset:0, list:[]},
        leftLabels      : {offset:0, visOffset:0, list:[]},
        //righLabels      : {offset:0, visOffset:0, list:[]},
        //deltaOnLeft historically means "virtual majoranta-rectangle"
        //is on the right
        figureParams    : {minX:0, maxX:0, deltaOnLeft:true},
        rgCtrlPts       : [],
        partitionWidths : [1],
        basesN          : 4,
        //movables        : {} //key-value for movable jswrap
    });
    appstate.basePointsAreMoving = false;
    sdata.view = { isInscribed:1, isCircumscribed:1, isFigureChecked:1 };
}

///this thing overrides app-wide finish_sapp_UI
function finish_sapp_UI (){
    gui.createDragModel();
    study.setupEvents();
}
})();
