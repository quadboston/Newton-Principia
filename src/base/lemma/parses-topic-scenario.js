
( function() {
    var {
        sn, haz, eachprop, exegs,
    } = window.b$l.apptree({
        ssFExportList :
        {
            parsesTopicScenarios,
        },
    });
    return;





    function parsesTopicScenarios()
    {

        var SPLIT_STATES = /\|\|\s/gu;
        var SPLIT_EVENTS = /\+\s/gu;
        var EMPTY = /^(\s|\n|\r)*|(\s|\n|\r)*$/g;
        var STRING = /\n\r|\n|\r/g;
        //https://stackoverflow.com/questions/32116312/javascript-regex-special-characters
        //makes most sense: https://javascript.info/regexp-escaping
        var EVENT_STATEMENT = /^(\||:|->)*\s*(.*)$/

        eachprop( exegs, ( theorionAspects, theorion_id ) => {
            eachprop( theorionAspects, ( exAspect, aspect_id ) => {
                exAspect.subexegs.forEach( ( subexeg, exegId ) => {
                    var scenarioScript = haz( subexeg, 'scenarioScript' );
                    if( !scenarioScript ) return;

                    //gets array of state-blocks in form of text for each block
                    var stateTexts = scenarioScript.split( SPLIT_STATES );
                    //var states = []; //allocates states placeholder
                    var stateId2state = {}; //allocates states index

                    stateTexts.forEach( stateScript => {
                        var stateScript = stateScript.replace( EMPTY, '' );
                        if( !stateScript ) return; //discards empty space

                        //gets array of the eventScripts for each state-block
                        var eventScripts = stateScript.split( SPLIT_EVENTS );
                        //first line of state-block is a stateId
                        var stateId = eventScripts[0].replace( EMPTY, '' );
                        //eventScripts is an array of event-blocks
                        eventScripts.splice( 0, 1 );

                        //var eventBlocs = [];
                        var eventId2eventBlock = {};
                        eventScripts.forEach( evScript => {
                            var elines = evScript.split( STRING );
                            var statements = [];
                            var eventId;
                            ///extracts statements belonging to an event
                            elines.forEach( (eline,eix) => {
                                eline = eline.replace( EMPTY, '' );
                                if( eix === 0 ) {
                                    ////first line makes eventId
                                    eventId = eline; 
                                } else {
                                    if( !eline ) return;
                                    var wwmach = eline.match( EVENT_STATEMENT );
                                    wwmach[1] = wwmach[1] || 'funct';
                                    var statement = { commandType:wwmach[1], command:wwmach[2] };
                                    statements.push( statement );
                                }
                            });
                            var evBlock = { eventId, statements };
                            //eventBlocs.push( evBlock );
                            eventId2eventBlock[ eventId ] = evBlock;
                        });

                        //composes state
                        var stateRack = {};
                        //stateRack = { stateId, eventBlocs, eventId2eventBlock };
                        stateRack = { stateId, eventId2eventBlock };
                        //states.push( stateRack );
                        stateId2state[ stateId ] = stateRack;

                        //subexeg.scenarioStates = states;
                        subexeg.stateId2state = stateId2state;
                    });
                });
            });
        });



    }


}) ();

