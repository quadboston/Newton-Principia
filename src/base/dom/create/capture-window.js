( function() {
    var {
        ns, $$, hafa,
        ssF, sDomN, fapp,
        stdMod, amode,
    } = window.b$l.apptree({
        sDomFExportList :
        {
            createsCaptureWindow,
        },
    });
    return;    






    function createsCaptureWindow()
    {
        ///this thing collects captured states:
        /// api: capturePoint - count of currently captured states
        ///      captured - 
        ///      pix in code below - id of captured data in string form
        var cap = fapp.captureWind = { capturePoint : 0, captured:{} };

        ///establishes capture
        fapp.captureState = function( captureData )
        {
            captureData = ns.paste( {}, captureData );

            cap.captured[ ''+cap.capturePoint ] = captureData;
            var captureText = JSON.stringify( cap.captured, null, '    ' );
            dom$.html( captureText  );
            dom$().scrollTop = dom$().scrollHeight;
            cap.capturePoint++;

            ///apparently texts is an essay which is currently chosen,
            ///           texts will append captured bookmarks
            var texts = document.querySelectorAll( '.original-text.chosen' );
            for( var ix=0, len=texts.length; ix<len; ix++ ) {
                var etext = texts[ix];
                ns.eachprop( cap.captured, (prop, pix) => {
                    var stateMark = 'captured-state-'+pix;
                    var capturedEl = etext.querySelector( '.'+stateMark );

                    ///adds new capture link
                    if( !capturedEl ) {
                        if( pix === '0' ) {
                            etext.appendChild( $$.c('pre').html('\ncaptures:\n')() );
                        }
                        capturedEl$ = $$.c( 'a' )
                            .a( 'href', '#' )
                            .a( 'title', 'click to go to bookmark ' + pix )
                            .addClass( stateMark )

                            ///*******************************************
                            ///changes the state by click on bookmark
                            ///*******************************************
                            .e( 'click', ()=> {
                                ////prevents code-crash if subapp does
                                //// not define "appState__2..."
                                hafa( stdMod, 'astate_2_rg8model8media' )(
                                        cap.captured[ pix ], );
                                })
                            .html( pix + ' ' )
                            ;
                        etext.appendChild( capturedEl$() );
                    }
                })
            }
        };
        fapp.captureWind.closeWindow = function()
        {
            dom$.css( 'display', 'none' );
        };
        fapp.captureWind.openWindow = function()
        {
            var top = sDomN.captureButton$.box().top - sDomN.topMediaControls$.box().top + 50;
            dom$
                .css( 'display', 'block' )
                .css( 'top', top + 'px' )
                ;
        };
        var dom$ = fapp.captureWind.dom$ = $$
            .c( 'textarea' )
            .a( 'disabled', '' )
            .to( sDomN.topMediaControls$ )
            ;
        var top = sDomN.captureButton$.box().top - sDomN.topMediaControls$.box().top + 50;
        dom$().style.cssText = `
            position    : absolute;
            display     : none;
            top         : ${top}px;
            width       : 80%;
            height      : 300px;
            left        : 50%;
            transform   : translate(-50%, 0);
            font-size   : 11px;
            z-index     : 1111111;
        `;
        /*
        window.addEventListener( 'keydown', function ( event ) {
		    if( event.ctrlKey && event.shiftKey &&
                'abcdefghijklmnopqrstuvxyz'.charAt( event.keyCode - 65 ) === 'e' ) {
                debWind.style.display === 'none' ?
                    debWind.style.display = 'block' :
                    debWind.style.display = 'none';
            }
        });
        ns.d( "To save this log to clipboard, try:\n" +
              "highlight with Ctrl+A and then copy with Ctrl+C\n" +
              "Click on this text log before highlighting it to set focus on it\n" +
              "and to exclude irrelevant text.\n\n"
        );
        */
    };


}) ();

