
( function() {
    var {
        sn, haz, haff,
        eachprop,
        fconf,
        sconf,
        ss, ssF,
        rg, toreg,
        exegs,
        amode,
        stdMod,
    } =  window.b$l.apptree({
    });

    var ts = sn( 'activityScenario', ss );
    var actionsList_coded = sn( 'actionsList_coded', ts );


    Object.assign( actionsList_coded, {

        'template' : function(
                stateId,
                eventId,
                runOnSubessay, //special context only for lesson-start event
         ) {
            rg.idle.restart();
        },

    });


}) ();

