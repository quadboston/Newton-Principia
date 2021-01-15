
( function() {
    var {
        ns, sn,
        haz, eachprop,
        ss, ssF, exegs,
    } = window.b$l.apptree({
        ssFExportList :
        {
            parsesTopicScenarios,
        },
    });
    var ts = sn( 'activityScenario', ss );
    var actionsList_default = sn( 'actionsList_default', ts );
    var actionsList_coded = sn( 'actionsList_coded', ts );
    var actionsList_shells = '';
    return;










    function parsesTopicScenarios()
    {
        //https://stackoverflow.com/questions/32116312/javascript-regex-special-characters
        //makes most sense: https://javascript.info/regexp-escaping
        var SPLIT_STATES = /\|\|\s/gu;
        var SPLIT_EVENTS = /\+\s/gu;
        var EMPTY = /^(\s|\n|\r)*|(\s|\n|\r)*$/g;
        var STRING = /\n\r|\n|\r/g;

        //for message: :- ::- no console scroll, ::# don't repeat message after the same one
        var EVENT_STATEMENT = /^((?:\||:|->|\*|'|\^|-|#)*)\s*(.*)$/;

        var TIMEOUT = /^(\d+)\s*(.*)$/;
        var PURGE_EVENT = /^>\s/;

        eachprop( exegs, ( theorionAspects, theorion_id ) => {
            eachprop( theorionAspects, ( exAspect, aspect_id ) => {
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    var scenarioScript = haz( subexeg, 'scenarioScript' );
                    if( !scenarioScript ) return;

                    //gets array of state-blocks in form of text for each block
                    var stateTexts = scenarioScript.split( SPLIT_STATES );
                    var orderedStates = []; //allocates states to build user emulator
                    var stateId2state = {}; //allocates states index
                    var previousEventBlock_forAutopilot = {};

                    stateTexts.forEach( stateScript => {
                        var stateScript = stateScript.replace( EMPTY, '' );
                        if( !stateScript ) return; //discards empty space

                        //gets array of the eventScripts for each state-block
                        var eventScripts = stateScript.split( SPLIT_EVENTS );
                        //first line of state-block is a stateId
                        var stateId = eventScripts[0].replace( EMPTY, '' );
                        //eventScripts is an array of event-blocks
                        eventScripts.splice( 0, 1 );

                        var orderedEvents = [];
                        var eventId2eventBlock = {};
                        eventScripts.forEach( evScript => {
                            var elines = evScript.split( STRING );
                            var statements = [];
                            var eventId;
                            var autopilotEventId = '';
                            var event2state = false;
                            ///extracts statements belonging to an event
                            elines.forEach( (eline,eix) => {
                                var nextEventTimeout = null;
                                eline = eline.replace( EMPTY, '' );
                                if( eix === 0 ) {
                                    if( eline.indexOf( '>' ) === 0 ) {
                                        event2state = true;
                                        eline = eline.replace( PURGE_EVENT, '' );
                                    }
                                    ////first line makes eventId
                                    eventId = eline; 
                                } else {
                                    if( !eline ) return;
                                    var wwmach = eline.match( EVENT_STATEMENT );
                                    var commandType = wwmach[1];
                                    commandType = commandType || 'funct';
                                    var theCommand = wwmach[2];

                                    //does not include comment into statements array
                                    if( commandType.indexOf("'") === 0 ) {
                                        return;
                                    }
                                    if( "*" === commandType ) {
                                        autopilotEventId = theCommand;
                                        return;
                                    } else if( commandType === '^' ) {
                                        var wwmach = theCommand.match( TIMEOUT );
                                        var nextEventTimeout = parseInt( wwmach[1] );
                                        var theCommand = wwmach[2];
                                    }
                                    var statement = { commandType, command:theCommand, };
                                    if( commandType === '^' ) {
                                        statement.nextEventTimeout = nextEventTimeout;
                                    }
                                    statements.push( statement );
                                }
                            });

                            ///state sugar ... if no statemens, then
                            ///interprets the event as state establisher
                            if( event2state ) {
                                statements.push( { commandType:'->', command:eventId } );
                            }

                            var evBlock = { eventId, statements, autopilotEventId };
                            orderedEvents.push( evBlock );
                            eventId2eventBlock[ eventId ] = evBlock;

                            //if missed, fills previous event block autopoilot to ownself
                            if( !haz( previousEventBlock_forAutopilot, 'autopilotEventId' )
                                //event 'start' runs automatically ... it does not have
                                //to advertize own self and pollute the link of
                                //autopilotEventId
                                && eventId !== 'start'
                            ) {
                                previousEventBlock_forAutopilot.autopilotEventId = eventId;
                            }
                            previousEventBlock_forAutopilot = evBlock;
                        });
                        //composes state
                        subexeg.orderedStates       = orderedStates;
                        subexeg.stateId2state       = stateId2state;
                        var stateRack               = {
                                                        stateId,
                                                        orderedEvents,
                                                        eventId2eventBlock
                                                       };
                        stateId2state[ stateId ]    = stateRack;
                        orderedStates.push( stateRack );
                        buildUserAutoPilot( subexeg );
                    });
                });
            });
        });

        if( ns.haz( ns.conf, 'makeactions' ) ) {
            actionsList_shells =
                "Object.assign( actionsList_coded, { \n" +
                actionsList_shells + '\n};';
            ns.d( actionsList_shells );
        }
    }


    function buildUserAutoPilot( subexeg )
    {
        subexeg.orderedStates.forEach( stateRack => {
        stateRack.orderedEvents.forEach( oEvent => {
                oEvent.statements.forEach( statement => {
                    var ctype = statement.commandType;
                    if( ctype !== '->' && ctype !== ':' && ctype !== '*' ) {
                        var ald = haz( actionsList_default, statement.command );
                        if( ald ) return;
                        actionsList_shells +=

    //----------------------------------------------------------------------
    `
    ///for state=${stateRack.stateId} event=${oEvent.eventId} acttype=${ctype} 
    '${statement.command}'   : function( stateId, eventId ) {
        ccc( '  pl.hold. act: ||' + stateId +
             ' +' + eventId +
             ' ' + ctype + statement.command );
    },

    `;
    //----------------------------------------------------------------------

                        actionsList_default[ statement.command ] = function( stateId, eventId ) {
                                var wwMessage =
                                     '  pl.holder act:  ||' + stateId +
                                     ' +' + eventId +
                                     ' ' + ctype + ' ' + statement.command;
                                ssF.doDebugMessage( wwMessage );
                        };
                    }
                });
            });
        });
    }


}) ();

