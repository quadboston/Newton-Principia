( function() {
    var {
        $$, haz,
        nsmethods,
        globalCss,
    } = window.b$l.nstree();

    nsmethods.create_select_table = create_select_table;
    return;











    ///==========================================
    /// creates dom select box
    ///==========================================
    function create_select_table({

        //------------------------------
        //alternatives listText or iarrays
            listText,

            //api:
            // iarrays[ix][0] - caption
            // iarrays[ix][1] - value
            iarrays, //itemArrays
        //------------------------------


        //optionals:
        addValueToCaption,
        selectBoxClassId,   //for domEl-css

        optionIsChanged_cb, //callback
        selectonIsReset_cb,
        sbStyle,
        defaultPrompt,
        tableRowTitle,

    }) {
        var sboxRack = {};

        if( listText ) {
            var plines = nsmethods.splitText_2_purgedLines( listText );
            iarrays = sboxRack.iarrays = purgedLines_2_itemArrays( plines );
        }


        var sbox$ = sboxRack.sbox$ = $$.c( 'div' )
                      //otherwise left positions move at scale transform
                      .css( 'transform-origin', '0px 0px' )
                      .css( 'position', 'absolute' )
                      .css( 'overflow-y', 'auto' )
                      .css( 'overflow-x', 'visible' )
                      .addClass( 'disabled' )
                      ;
        if( selectBoxClassId ) {
            sbox$.addClass( selectBoxClassId );
        }

        var sboxTable$ = sboxRack.sboxTable$ = $$.c( 'table' )
                    .css( 'position', 'absolute' )
                    .css( 'left', '0px' )
                    .css( 'top', '0px' )
                    .to( sbox$ )
                    ;

        if( defaultPrompt ) {
            sboxTable$.ch( $$.c( 'tr' )
                        .html( '<td>' + defaultPrompt + '</td>' )
                        .e( 'mousedown', function( event ) {
                            //nested function which finally has own "this" as rgR
                            selectonIsReset_cb && selectonIsReset_cb();
                        })
            );
        }

        iarrays.forEach( (iarray,iix) => {
            var wwRow$;
            sboxTable$.ch( wwRow$ = $$.c( 'tr' )
                        .ch( $$.c( 'td' )
                                .html(
                                    iarray[0] +
                                    ( addValueToCaption ? ', ' + iarray[1] : '' )
                               )
                        )
                        .e( 'mousedown', function( event ) {
                            var ix = iix;
                            optionIsChanged_cb({
                                selectedIndex : ix,
                                selectedCaption : iarrays[ix][0],
                                selectedValue : iarrays[ix][1],
                                sboxTable$,               
                                ev : event,
                            });
                            //https://javascript.info/bubbling-and-capturing
                            //if we attach by addEventListener, then
                            //event.target === this
                            //var mostDeepleNestedTarget = event.target;
                            //but we don't need event.target because we have sbox$,
                        })
            );
            if( tableRowTitle ) {
                wwRow$.a( 'title', tableRowTitle );
            }
        });


        if( sbStyle && selectBoxClassId ) {
            globalCss.update( sbStyle, selectBoxClassId, );
        }
        sboxRack.restart = restart;
        return sboxRack;


        function restart()
        {
            //ccc( 'sb restart called' );
            //sboxTable$().value = defaultPrompt ? 'default' : 'i0';
            selectonIsReset_cb && selectonIsReset_cb();
        }
    }

    ///todm ... migrate to nsmethods.purgedLines_2_itemArrays
    function purgedLines_2_itemArrays( plines )
    {
        const SPLIT_COLUMNS = /\s+\|\s*|\s*\|\s+/;
        var iarrays = plines.map( (pline,lix) =>
            pline.split( SPLIT_COLUMNS )
        );
        return iarrays;
    }


}) ();

