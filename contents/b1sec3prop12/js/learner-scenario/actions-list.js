
( function() {
    var {
        actionsList_coded,
        rg,
    } =  window.b$l.apptree({
    });



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

