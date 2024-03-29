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
            //    methane     | CH₄    | 4*C-H         | CH₄ + 2O₂     -> CO₂ + 2H₂0     | 4*C-H,  2*O=O  -> 2*C=O, 4*H-O    | 1 |
            //    ethane      | C₂H₆   | 1*C-C, 6*C-H  | 2C₂H₆ + 7O₂   -> 4CO₂ + 6H₂0    | 12*C-H, 7*O=O  -> 8*C=O, 12*H-O   | 2 |
            //      item = iarrays[ix]
            //      itemarray = iarrays[ix][ array ]
            //          iarrays[ix][0] - caption
            //          iarrays[ix][1] - value
            iarrays, //itemArrays
        //------------------------------


        //optionals:
        addValueToCaption,
            removeCommaBetweenValueAndCaption,
        useValueAsCaption,

        selectBoxClassId,   //for domEl-css

        optionIsChanged_cb, //callback
        selectonIsReset_cb,
        sbStyle,
        defaultPrompt,
        itemCaptionPostfix,

    }) {
        itemCaptionPostfix = itemCaptionPostfix || '';

        var sboxRack = {};

        if( listText ) {
            var plines = nsmethods.splitText_2_purgedLines( listText );
            iarrays = sboxRack.iarrays = purgedLines_2_itemArrays( plines );
        }

        var sbox$ = sboxRack.sbox$ = $$.c( 'select' )
                      //otherwise left positions move at scale transform
                      .css( 'transform-origin', '0px 0px' )

                      .e( 'change', function( ev ) {
                            var ix = sbox$().selectedIndex;
                            ix -= defaultPrompt ? 1 : 0;
                            if( ix < 0 ) {
                                //todm: bug, fix?:
                                //selectonIsReset_cb && selectonIsReset_cb();
                                selectonIsReset_cb();
                                return;
                            }
                            optionIsChanged_cb({
                                selectedIndex : ix,
                                selectedCaption : iarrays[ix][0],
                                selectedValue : iarrays[ix][1],
                                sbox$,
                                iarrays, //added later in ver7817
                                ev,      //added later in ver7817
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

            if( useValueAsCaption ) {
                var capt = iarray[1] + '';
            } else {
                var capt = iarray[0];
                if( addValueToCaption ) {
                    capt +=
                            ( removeCommaBetweenValueAndCaption ? '' : ', ' ) +
                            iarray[1];
                }
            }
            capt += itemCaptionPostfix;
            sbox$.ch( $$.c( 'option' )
                        .a( 'name', 'i'+iix )
                        .a( 'value', 'i'+iix )
                        .html( capt )
            );
        });

        if( sbStyle && selectBoxClassId ) {
            globalCss.update( sbStyle, selectBoxClassId, );
        }
        sboxRack.restart = restart;
        return sboxRack;


        function restart()
        {
            //ccc( 'sb restart called' );
            sbox$().value = defaultPrompt ? 'default' : 'i0';
            selectonIsReset_cb && selectonIsReset_cb();
        }
    }


    function purgedLines_2_itemArrays( plines )
    {
        const SPLIT_COLUMNS = /\s+\|\s*|\s*\|\s+/;
        var iarrays = plines.map( (pline,lix) =>
            pline.split( SPLIT_COLUMNS )
        );
        return iarrays;
    }


}) ();

