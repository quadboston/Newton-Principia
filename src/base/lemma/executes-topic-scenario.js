
( function() {
    var {
        sn, haz, haf, haff,
        exegs,
        amode,
        studyMods,
    } = window.b$l.apptree({
        ssFExportList :
        {
            executesTopicScenario,
        },
    });
    return;





    function executesTopicScenario( eventId )
    {
        var { theorion, aspect, submodel, subessay } = amode;
        var stdMod  = studyMods[ submodel ];
        var scenarioActionsList = sn( 'scenarioActionsList', stdMod );

        var subessayRack = exegs[ theorion ][ aspect ].subessay2subexeg[ subessay ];
        var stateId2state = subessayRack.stateId2state;

        var scenarioState = stateId2state[ amode.scenarioState ];
        var eventBlock = scenarioState.eventId2eventBlock[ eventId ];
        eventBlock.statements.forEach( eventItem => {
            var ctype = eventItem.commandType;
            if( ctype === ':' ) {
                haf( scenarioActionsList, ':'  )( eventItem.command, eventId ) ;
            } else if( ctype === '->' ) {
                amode.scenarioState = eventItem.command;
                ccc( 'state -> ' + eventItem.command );
            } else {
                haf( scenarioActionsList, eventItem.command )( eventId );
            }
        });

        haff( stdMod, 'model_upcreate' );
    }


}) ();

