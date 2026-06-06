
( function() {
    var {
        ns, $$,
        globalCss,
        fconf,
        ssF, amode,
    } = window.b$l.apptree({
        ssFExportList :
        {
            doDebugMessage,
            doInitTopicScenarioCss,
            executesMessageAction,
        },
    });

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
    function executesMessageAction( ecommand, ctype )
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

        //adds ecommand to feedback frame 
        ecommand            = '<div class="dialog-prompt">' + ecommand + '</div>';
        var newMessage_dom  = $$.c('div')();
        $$.$( fbFrame_dom ).ch( newMessage_dom );
        ssF.digestsSingleMessage_2_topics( newMessage_dom, ecommand );

        //updates only for newMessage
        //removed because of emulated by user-options.
        //ssF.updateFrameWorkAnchors_2_basicSiteFeatures( newMessage_dom );
    }
}) ();
