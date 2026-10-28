( function() {
    var {
        $$, haz,
        nsmethods,
        globalCss,
    } = window.b$l.nstree();

    nsmethods.create_select_radio_table = create_select_radio_table;
    var boxIdCount = 0;
    return;











    ///==========================================
    /// creates dom select box
    ///==========================================
    function create_select_radio_table({

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
        showRadioButtons,
    }) {
        var sboxRack = {};
        selectBoxClassId = selectBoxClassId ?
            selectBoxClassId :
            'radio--table--' + boxIdCount++;

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
        sbox$.addClass( selectBoxClassId );
        var sboxTable$ = sboxRack.sboxTable$ = $$.c( 'table' )
                    .css( 'position', 'absolute' )
                    .css( 'table-layout', 'fixed' )
                    .css( 'width', '1200px' )
                    .css( 'border-spacing', '0' )
                    //.css( 'padding-right', '0' )
                    .css( 'left', '0' )
                    .css( 'top', '0' )
                    .css( 'text-align', 'left' )
                    .to( sbox$ )
                    ;

        if( defaultPrompt ) {
            sboxTable$.ch( $$.c( 'tr' )
                        .addClass( 'radio-table-prompt' )
                        //.css( 'padding', '0' )
                        .html( '<td>' + defaultPrompt + '</td>' )
                        .e( 'mousedown', function( event ) {
                            //nested function which finally has own "this" as rgR
                            selectonIsReset_cb && selectonIsReset_cb();
                        })
            );
        }




        //=============================================================
        // //\\ core-code fo distribution
        //      ? of clickable-content along table-rows
        //=============================================================
        var globalCss_str = '';
        sboxRack.rawIx2contentCell$ = [];
        sboxRack.rawIx2radioOption$ = [];
        iarrays.forEach( (iarray,iix) => {
            var wwRow$;


            //CSS machine for radio symbol
            if( showRadioButtons ) {
                var optDatAtr = 'data-selected-option';
                var optClsId = selectBoxClassId + '-opt-' + iix;
                globalCss_str += ( globalCss_str ? ',\n' : '' ) +
                             'table[' + optDatAtr + '="' + iix + '"] .' + optClsId;
            }
            sboxTable$.ch( wwRow$ = $$.c( 'tr' )
                .ch( $$.c( 'td' )
                    .css( 'border-radius',      '8px' )

                    //------------------------------------------------
                    // //\\ creates clickable option symbol
                    //------------------------------------------------
                    .ch(
                        sboxRack.rawIx2radioOption$[ iix ] = $$.c( 'div' )
                        .addClass( optClsId + ' radio-table-button ' )
                    )
                    //------------------------------------------------
                    // \\// creates clickable option symbol
                    //------------------------------------------------


                    //------------------------------------------------
                    // //\\ creates row's contents placeholder
                    //      for selection caption or sandbox
                    //------------------------------------------------
                    .ch( $$.div()
                        .css( 'display',    'inline-block' )
                        .css( 'position',   'relative' )
                        .css( 'right',      '0' )
                        //.css( 'border',     '1px solid black' )

                        //==================================================
                        // //\\ div-in-row selector === selection caption
                        //      clickabal and hidenable when selected
                        //==================================================
                        .ch( sboxRack.rawIx2contentCell$[ iix ] = $$.div()
                            .addClass( 'radio-table-selectable-content' )
                            .css( 'display', 'inline-block' )
                            .css( 'padding', '4px 12px' )
                            .css( 'border-radius', '5px' )
                            .css( 'cursor', 'pointer' )
                            .a( 'title', 'Click to select this row.' )
                            .html(
                                iarray[0] +
                                ( addValueToCaption ? ', ' + iarray[1] : '' )
                            )
                            .e( 'mousedown', function( event ) {
                                if( showRadioButtons ) {
                                    sboxRack.sboxTable$.a( optDatAtr, ''+iix );
                                }
                                optionIsChanged_cb({
                                    selectedIndex   : iix,
                                    selectedCaption : iarrays[iix][0],
                                    selectedValue   : iarrays[iix][1],
                                    sboxTable$,               
                                    ev              : event,
                                });
                                //https://javascript.info/bubbling-and-capturing
                                //if we attach by addEventListener, then
                                //event.target === this
                                //var mostDeepleNestedTarget = event.target;
                                //but we don't need event.target because we have sbox$,
                            })
                        )
                        //==================================================
                        // \\// div-in-row selector,
                        //==================================================
                    )
                    //------------------------------------------------
                    // \\// creates row's contents placeholder
                    //------------------------------------------------
                )
            );
            if( tableRowTitle ) {
                wwRow$.a( 'title', tableRowTitle );
            }
        }); //loop via table rows

        //CSS machine for radio symbol
        globalCss_str += `{
                background-color : black;
            }
        `;
        sbStyle = sbStyle ? sbStyle + '\n' + globalCss_str : globalCss_str;

        //todm: patch: should be in parent sub. or here, not in both:
        //      poor design,
        sbStyle += `
            .${selectBoxClassId} tr {
                background-color : #eeeeee;
                color            : #444444;
            }

            tr.radio-table-prompt td {
                text-align          : center;
                color               : #666666;
                background-color    : #ffffff;
            }
            .radio-table-selectable-content:hover {
                background-color : #444444;
                color            : #ffffff;
            }
        `;

        if( showRadioButtons ) {
            sbStyle += `
                tr .radio-table-button {
                    display             : inline-block;
                    border              : 5px solid grey;
                    border-radius       : 10px;
                    width               : 10px;
                    height              : 10px;
                    margin-right        : 15px;
                    cursor              : pointer;
                }
                tr:hover .radio-table-button {
                    border-color : black;
                }
            `;
        } else {
            sbStyle += `
                tr .radio-table-button {
                    display             : none;
                }
            `;
        }
        //================================================================
        // //\\ unfinished change to merged sandBox with selectBox
        //================================================================
        sboxRack.rawIx2contentCell_stashed$ = [];
        sboxRack.rawIx2rowDom = [];
        iarrays.forEach( (iarray,iix) => {
            var ww = sboxRack.rawIx2contentCell$[ iix ];
            sboxRack.rawIx2contentCell$[ iix ] = ww;
            sboxRack.rawIx2contentCell_stashed$[ iix ] = ww;
            sboxRack.rawIx2rowDom[ iix ] = ww().parentNode;
        });
        //================================================================
        // \\// unfinished change to merged sandBox with selectBox
        //================================================================


        if( sbStyle ) {
            globalCss.update( sbStyle, selectBoxClassId, );
        }
        //=============================================================
        // \\// core-code fo distribution
        //=============================================================



        sboxRack.restart = restart;
        return sboxRack;


        function restart()
        {
            //ccc( 'sb restart called' );
            //sboxTable$().value = defaultPrompt ? 'default' : 'i0';
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

