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

    ssF.mod2inn                 = mod2inn;
    ssF.mod2inn_original        = mod2inn_original;
    sDomF.createsCaptureWindow  = createsCaptureWindow;
    sDomF.out2inn               = out2inn;
    sDomF.outparent2inn         = outparent2inn;
    sDomF.inn2outparent         = inn2outparent;
    return;    







    //==========================================
    // //\\ pos to pos
    //==========================================
    ///transforms model-coordinates to media-coordinates
    function mod2inn( pos )
    {
        if( !pos ) { pos = this; }
        return [
            pos[0] * sconf.mod2inn_scale + sconf.activeAreaOffsetX,
            pos[1] * sconf.mod2inn_scale * sconf.MONITOR_Y_FLIP +
            sconf.activeAreaOffsetY,
        ];
    }
    ///purpose: use for controls undependent on model scale and origin
    ///         user controls,
    function mod2inn_original( pos )
    {
        if( !pos ) { pos = this; }
        return [
            pos[0] * sconf.originalMod2inn_scale +
            //sconf.activeAreaOffsetX,
            sconf.originX_onPicture,

            pos[1] * sconf.originalMod2inn_scale * sconf.MONITOR_Y_FLIP +
            //sconf.activeAreaOffsetY,
            sconf.originY_onPicture,
        ];
    }
    //==========================================
    // \\// pos to pos
    //==========================================


    //===============================
    // //\\ inn2outparent and inverse
    //===============================
    ///converts pos-in-media-scope to pos-in-dom-scope-related-to-media-dom-offset
    function inn2outparent()
    {
        var off     = sconf.mediaOffset;
        var medpos  = this.medpos;
        var i2o     = 1/sDomF.out2inn();
        return [
            medpos[0] * i2o + off[0],

            //this is not required because of media root already margined, so
            //has been shifted as mediaLeftMargin
            // + sDomN.mediaLeftMargin,

            medpos[1] * i2o + off[1]
        ];
    };


    ///converts dom-pos to media pos
    ///for lemma1, drag_surface = sDomN.medRoot
    function outparent2inn( outparent )
    {
        var moffset = sconf.mediaOffset;
        var c2m     = sDomF.out2inn();
        return [
            c2m * ( outparent[0] - moffset[0]
                    //- sDomN.mediaLeftMargin //media-root is already shifted ...
                  ),
            c2m * ( outparent[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// inn2outparent and inverse
    //===============================


    function out2inn()
    {
        return sconf.innerMediaWidth / sDomN.mediaWidth;

        /*
        //todm: for this at the moment, have to define amode['submodel'] even
        //      at phase content2exegs.js ... too early ...
        var sm = studyMods[ amode['submodel'] ];
        var me = sm.mmedia;
        var re = me.getBoundingClientRect();
        var wi = re.width;
        if( wi === 0 ) {
            wi = sconf.innerMediaWidth;
            //ccc( '**** alert: width === 0: media=', me, 'rect=', re );
            //ccc( '**** alert: width === 0:');
        } else {
            //ccc( '**** scale is set to = ' + sconf.innerMediaWidth / wi );
        }
        return sconf.innerMediaWidth / wi;
               //studyMods[ amode['submodel'] ].mmedia.getBoundingClientRect().width;
        */
    };



    function createsCaptureWindow()
    {
        ///this thing collects captured states:
        /// api: capturePoint - count of currently captured states
        ///      captured - 
        ///      pix in code below - id of captured data in string form
        var cap = fapp.captureWind = { capturePoint : 0, captured:{} };

        ///establishes capture
        fapp.captureWind.setText = function( captureData )
        {
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
                            ///changes the state by click
                            .e( 'click', ()=> {
                                //ccc( 'bm=' + pix, cap.captured[ pix ] )

                                ////prevents code-crash if subapp does
                                //// not define "appState__2..."
                                var stdMod = ns.haz( studyMods, amode.submodel );
                                if( ns.h( stdMod, 'astate_2_rg8model8media' ) ) {
                                    ns.haf( stdMod, 'astate_2_rg8model8media' )(
                                        cap.captured[ pix ] );
                                } else {
                                    ////remove this later
                                    ns.haf( ssF, 'astate_2_rg8model8media' )(
                                        cap.captured[ pix ] );
                                }
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

