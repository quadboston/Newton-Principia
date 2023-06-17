
( function() {
    var {
        ns, sn, $$,
        haz, haf, haff,
        eachprop,
        globalCss,
        fconf,
        sconf,
        exegs, actionsList_coded, actionsList_default,
        ssF, ssD, amode,
        rg,
        studyMods,
    } = window.b$l.apptree({
        ssFExportList :
        {
            executesTopicScenario,
            doDebugMessage,
            doInitTopicScenarioCss,
            executesMessageAction,
            restylifyUserConsole,
        },
    });
    var eventFlow_locked = false;
    var doInitCssDone = false;

    //for ctype ::#
    var previousMessage = '';
    return;










    function doInitTopicScenarioCss()
    {
        globalCss.update( `
            .model-user-feedback {
                width           : calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH+10}px);
                height          : 400px;
                font-size       : 15px;
                border          : 1px solid black;
                border-radius   : 5px;
                color           : #444444;
                background-color: #eeeeee;
                padding         : 15px;
                overflow-y      : auto;
            }
            .dialog-prompt {
                padding         : 6px;
                margin-bottom   : 5px;
                border          : 1px solid #aaaaaa;
            }
            .model-user-feedback > div:last-child .dialog-prompt {
                font-weight     : bold;
                color           : #222222;
                background-color: #cccccc;
            }
            `,
            'user-feedback-style-tag'
        );
    }


    ///returns "executable" = false if no event found for eventId
    function executesTopicScenario(
        eventId,
        runOnSubessay, //rerouts script to this name from amode.subessay
    ){

        if( eventFlow_locked ) {
            //basic-console-output  //bbbbbbbbbbbbbb
            //ccc( '--- skipped: ' + eventId );
            return;
        }

        var { theorion, aspect, submodel, subessay } = amode;
        if( runOnSubessay ) {
            subessay = runOnSubessay;
        }
        var subessayRack    = exegs[ theorion ][ aspect ].subessay2subexeg[ subessay ];
        var stateId2state   = subessayRack.stateId2state;
        var scenarioState   = haz( stateId2state, subessayRack.scenario_stateId );
        var stdMod          = studyMods[ submodel ];
        if( !scenarioState ) {
            ////todm: this is better run in parser after all states are parsed
            executesMessageAction(
                'State "' + subessayRack.scenario_stateId +
                '" is not declared in activities script.' +
                " Scenario flow is frozen.",
                '::'
            );
            return;
        }
        var pullsEvent      = haz( scenarioState, 'eventId2eventBlock' );
        var eventBlock      = haz( scenarioState.eventId2eventBlock, eventId );
        ///undeclared event is simply ignored:
        if( !eventBlock )   return false;

        var newState        = null;
        var timeOutFired    = false;

        //basic-console-output  //bbbbbbbbbbbbbb
        //ccc(
        //    "** " + subessay.substring( 0, 10 ) + '..\n||' + //don't show entire subessay name
        //    subessayRack.scenario_stateId + ' +' +
        //    eventId
        //);

        eventBlock.statements.forEach( statemen => {
            var ctype = statemen.commandType;

            /*
            if( ctype !== '->' ) {
                ccc( '    ' + ctype + ' ' + statemen.command.substring( 0, 30 ) );
            }
            */
            if( ctype.indexOf(':') === 0 ) {
                ////message scheduled for user
                executesMessageAction( statemen.command, ctype );
            } else if( ctype === '->' ) {
                newState = statemen.command;
            } else if( ctype === '^' ) {
                eventFlow_locked = true;
                setTimeout(
                    function(){
                        eventFlow_locked = false;
                        executesTopicScenario( statemen.command );
                    },
                    statemen.nextEventTimeout
                );
                timeOutFired = true;
            } else if(
                statemen.command.indexOf( 'stdMod.' ) === 0 ||
                statemen.command.indexOf( 'stdMod[' ) === 0 ||
                statemen.command.indexOf( 'rg.' ) === 0 ||
                statemen.command.indexOf( 'rg[' ) === 0
            ){
                ////executes direct reference to code
                eval( statemen.command );
            } else if(
                statemen.command.indexOf( 'eval.' ) === 0
            ){
                ////executes direct reference to code
                eval( statemen.command.substring( 5 ) );
            } else {
                //ccc( '      ' + ctype + ' ' + statemen.command );
                var actionItem = haz( actionsList_coded, statemen.command  ) ||
                                      actionsList_default[ statemen.command ];
                actionItem( scenarioState.stateId, eventId, runOnSubessay );
            }
        });
        if ( newState ) {
            subessayRack.scenario_stateId = newState;
            //basic-console-output  //bbbbbbbbbbbbbb
            //ccc( '-> ' + newState );
            //tries to run state-establishment-event "start"
            var executable = executesTopicScenario( 'start' );
            if( executable ) return;
        }
        haff( stdMod, 'model8media_upcreate' );
        if( timeOutFired ) {
            return; //autopilot is ignored because of timeout is scheduled
        }

        //------------------------------------------------------------------------------
        // //\\ executes autopilot
        //------------------------------------------------------------------------------
        var autopilot = ns.haz( ns.conf, 'autopilot' );
        if( autopilot && autopilot > 0 ) {
            var autopilotInterval = ns.conf.autopilot;
            var autopilotEventId = haz( eventBlock, 'autopilotEventId' );

            var wwMessage = 'a u t o p   ' + eventBlock.autopilotEventId +
                                ' in st=' + subessayRack.scenario_stateId; 
            doDebugMessage( wwMessage )

            if( autopilotEventId ) {
                setTimeout(
                    function(){ executesTopicScenario( eventBlock.autopilotEventId ); },
                    autopilotInterval
                );
            } else {
                //basic-console-output  //bbbbbbbbbbbbbb
                //ccc( '*** Autopilot is finished ***\n' );
            }
        }
        //------------------------------------------------------------------------------
        // \\// executes autopilot
        //------------------------------------------------------------------------------
        return true;
    }

    ///aka: var wwMessage = 'a u t o p   '+eventBlock.autopilotEventId; 
    function doDebugMessage( wwMessage )
    {
        //ccc( wwMessage );
        if( ns.haz( ns.conf, 'deb' ) ) {
            ns.d( wwMessage );
        }
    }


    //api
    //:, :-     - do start over
    //:-        - no scroll
    //::-       - no scroll
    //::#       - do condence message to equal previous message
    function executesMessageAction( ecommand, ctype, noMathJax )
    {
        doDebugMessage( 'p r o m p t   ' + ecommand );
        if( ctype === '::#' && ecommand === previousMessage ) return;
        previousMessage = ecommand;

        var { subessay }    = amode;
        var cssPath         = '.subessay-' + subessay;

        //finds window from content-script
        var fbFrame_dom = document.querySelector( cssPath + ' .model-user-feedback' );
        if( ctype === ':' || ctype === ':-' ) {
            fbFrame_dom.innerHTML = '';
        }
        var doScroll = ctype === ':-' || ctype === '::-' ?
                       () => {} :
                       () => { fbFrame_dom.scrollTop = fbFrame_dom.scrollHeight; }

        //adds ecommand to feedback frame 
        ecommand            = '<div class="dialog-prompt">' + ecommand + '</div>';
        var newMessage_dom  = $$.c('div')();
        $$.$( fbFrame_dom ).ch( newMessage_dom );

        //todm: why there are two MathJax flags? here and below,
        ssF.digestsSingleMessage_2_topics( newMessage_dom, ecommand, !!'dontDoMathJax' );
        if( noMathJax ) return;

        ///we put new message in MathJax queue:
        ssF.BodyMathJax_2_HTML(
            newMessage_dom,
            !!'no_domEl_pretransformation',
            doScroll,
        );
    }


    ///overrides user console global-css style,
    ///     for example for { subessay } = amode;
    function restylifyUserConsole({
        subessay,
        style,
        theorion,   //optional, if missed taken from state
        aspect,     //optional, if missed taken from state
    }){
        theorion = theorion || amode.theorion;
        aspect = aspect || amode.aspect;
        cssPath = '.original-text' +
                  '.' + theorion +
                  '.' + aspect +
                  '.subessay-' + subessay +
                  ' .model-user-feedback';
        var fbFrame_dom = document.querySelector( cssPath );
        eachprop( style, (prop,propname) => {
            fbFrame_dom.style[ propname ] = prop;
        });
    }


}) ();

