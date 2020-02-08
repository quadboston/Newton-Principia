( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var sapp        = sn('sapp' ); 

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sDomN       = sn('dnative', sapp);
    var sDomF       = sn('dfunctions', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);



    //===============================
    // //\\ medpos2dompos and inverse
    //===============================
    ///converts pos-in-media-scope to pos-in-dom-scope-related-to-media-dom-offset
    sDomF.medpos2dompos = function()
    {
        var off = sconf.mediaOffset;
        var medpos = this.medpos;
        var c2m = sDomF.css2media();
        return [ medpos[0] / c2m + off[0], medpos[1] / c2m  + off[1]];
    };

    ///converts dom-pos to media pos
    sDomF.pOnDs_2_innerViewBox = function( point_on_drag_surface )
    {
        var pod = point_on_drag_surface; //for lemma1, drag_surface = sDomN.medRoot
        var moffset = sconf.mediaOffset;
        var c2m = sDomF.css2media();
        return [
            c2m * ( pod[0] - moffset[0] ),
            c2m * ( pod[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// medpos2dompos and inverse
    //===============================


    ///cssMed2innMed
    sDomF.css2media = function()
    {
        if( amode['submodel'] ) {
            //c cc(amode['submodel'], studyMods )
            return sconf.innerMediaWidth /
                   studyMods[ amode['submodel'] ].mmedia.getBoundingClientRect().width;
        } else {
            //c cc( '... not exist' );
            return 1;
            //return sconf.innerMediaWidth / sDomN.mmedia$().getBoundingClientRect().width;
        }
    };

    sDomF.createsCaptureWindow = function()
    {
        var cap = fapp.captureWind = { capturePoint : 0, captured:{} };

        ///establishes capture
        fapp.captureWind.setText = function( captureData )
        {
            cap.captured[ ''+cap.capturePoint ] = captureData;
            var captureText = JSON.stringify( cap.captured, null, '    ' );
            dom$.html( captureText  );
            dom$().scrollTop = dom$().scrollHeight;
            cap.capturePoint++;
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
                            .addClass( stateMark )
                            ///changes the state by click
                            .e( 'click', ()=> {
                                //ccc( 'bm=' + pix, cap.captured[ pix ] )
                                ssF.appState__2__study8media__models( cap.captured[ pix ] );
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
            dom$.css( 'display', 'block' );
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

