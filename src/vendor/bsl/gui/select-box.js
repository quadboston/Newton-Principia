( function() {
    var {
        $$, haz,
        nsmethods,
        globalCss,
    } = window.b$l.nstree();

    nsmethods.create_select_box = create_select_box;
    return;











    ///==========================================
    /// creates dom select box
    ///==========================================
    function create_select_box({

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
        sbStyle,
        defaultPrompt,

    }) {
        var sboxRack = {};

        if( listText ) {
            var plines = nsmethods.splitText_2_purgedLines( listText );
            iarrays = purgedLines_2_itemArrays( plines );
        }

        var sbox$ = sboxRack.sbox$ = $$.c( 'select' )
                      .e( 'change', function( event ) {
                            var ix = sbox$().selectedIndex;
                            ix -= defaultPrompt ? 1 : 0;
                            optionIsChanged_cb({
                                selectedIndex : ix,
                                selectedCaption : iarrays[ix][0],
                                selectedValue : iarrays[ix][1],
                                sbox$,               
                            });
                            //https://javascript.info/bubbling-and-capturing
                            //if we attach by addEventListener, then
                            //event.target === this
                            //var mostDeepleNestedTarget = event.target;
                            //but we don't need event.target because we have sbox$,
                      })
                      ;
        if( selectBoxClassId ) {
            sbox$.addClass( selectBoxClassId );
        }

        if( defaultPrompt ) {
            sbox$.ch( $$.c( 'option' )
                        .a( 'name', 'default' )
                        .a( 'value', 'default' )
                        .html( defaultPrompt )
            );
        }

        iarrays.forEach( (iarray,iix) => {
            sbox$.ch( $$.c( 'option' )
                        .a( 'name', 'i'+iix )
                        .a( 'value', 'i'+iix )
                        .html(
                            iarray[0] +
                            ( addValueToCaption ? ', ' + iarray[1] : '' )
                        )
            );
        });

        if( sbStyle && selectBoxClassId ) {
            globalCss.update( sbStyle, selectBoxClassId, );
        }
        return sboxRack;
    }


    function purgedLines_2_itemArrays( plines )
    {
        const SPLIT_COLUMNS = /\s+\||\|\s+/;
        var iarrays = plines.map( (pline,lix) =>
            pline.split( SPLIT_COLUMNS )
        );
        return iarrays;
    }


}) ();

