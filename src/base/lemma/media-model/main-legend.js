/*
    table logical structure:
        logical rows built up on clusters,
        clusters are logical cells,
        clusters have set of visual cells,
        visual cells which go to visual-row
*/

( function() {
    var {
        ns, sn, $$, mat,
        sconf, ssF, ssD, sDomF, sDomN,
        amode, stdMod, toreg, rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            createTheorionLegend,
        },
    });
    return;









    //=========================================
    // //\\ creates theorion table
    //      does one time work of html creation
    //=========================================
    function createTheorionLegend({
        stdMod_given,
        theorion,
        rowsCount,
        clustersCount,
        tableCaption,
        noTableTitle,
        cellsVisibilityCondition,
        makesCaptionCluster,
        makesBodyCluster,
        updatesDataInCell,
        updatesCaptionCluster,
        updatesTableTitle,
        createsIdleFirstRow_forFormat,
    }){
        //stdMod_given.upcreate_mainLegend  = upcreate_mainLegend;
        toreg( 'main-legend' )
            ( theorion,     {
                                upcreate_mainLegend,
                            }
            );
        var rgTeoTab = rg[ 'main-legend' ][ theorion ];
        var clustersToUpdate = [];
        var tableCaption$;
        var tb;
        var domModel$ =
        {
            columnCaptionsRow   : [],
            body$       : [],
        };

        //securing optional functions
        cellsVisibilityCondition = cellsVisibilityCondition || (()=>true);

        createsTablePlaceholder();
        createsIdleFirstRow_forFormat = createsIdleFirstRow_forFormat ||
                                        createsIdleFirstRow_forFormat_default;
        createsIdleFirstRow_forFormat( tb, theorion );
        !noTableTitle && createsTableTitle();
        creates_caption8body_rows();
        visibilizeTable();

        rgTeoTab.tableDom = tb;
        return;






        ///====================
        /// creates GUI table
        ///====================
        function createsTablePlaceholder()
        {
            tb = $$
                .c('table')
                .to( stdMod.legendRoot$ )
                .cls( 'main-legend ' + theorion )

                //removes set of .main-legend.]theorion[ {
                .css( 'border-collapse', 'collapse' )
                ()
                //css( 'table-layout', 'auto' ) //makes problem ... table moves out of pane ...
                //css( 'width', '500px' )       //possible responsivness problems
                ;
        }

        ///====================
        /// creates table title
        ///====================
        function createsTableTitle()
        {
            var row = $$.c('tr').to( tb )();
            tableCaption$ = $$.c('td')
                .a('colspan','33')
                .addClass('table-caption')
                .html( tableCaption )
                .to(row);
        }



        ///=====================
        /// first row for format
        ///=====================
        function createsIdleFirstRow_forFormat_default( tb, theorion )
        {
            //=====================================================
            // //\\ idle first row to format table for fixed-layout
            //=====================================================
            var row = $$.c('tr')
                //vital ... removes global css which corrupts table
                //aka .addClass( 'proof row1 tostroke' )
                .addClass( theorion +' tostroke')

                .css( 'visibility', 'hidden' ) //todm ... tmp fix
                .to(tb)
                ();
            //:todm ... kitchen ... non-reliable
            $$.c('td').html( 'xxx' ).to(row);
            $$.c('td').html( '-0.333x' ).to(row);
            $$.c('td').html( 'xx' ).to(row);
            //=====================================================
            // \\// idle first row to format table for fixed-layout
            //=====================================================
        }


        function creates_caption8body_rows()
        {
            //this is a protection: creates legend only once:
            //we don't need this protection because it's done elsewhere
            //if( domModel$.body$.length ) return;

            //================================================
            // //\\ creates first row below the table caption;
            //================================================
            if( makesCaptionCluster ) {
                var row = $$.c('tr').to( tb )();
                var rowRack = domModel$.columnCaptionsRow;
                for( var clusterIx=0; clusterIx < clustersCount; clusterIx++ )
                {
                    var clusterPars = makesCaptionCluster({
                        row,
                        clusterIx,
                    });
                    rowRack[ clusterIx ] = makesClusterCells(
                        Object.assign(
                        {
                            row,
                            clusterIx,
                        },
                        clusterPars
                    )); 
                }
                updateCaptionsRow();
            }
            //================================================
            // \\// creates first row below the table caption;
            //================================================


            //================================================
            // //\\ creates rows below captions-row
            //================================================
            for( var rowIx=0; rowIx < rowsCount; rowIx++ )
            {
                var row = $$.c('tr').to( tb )();
                var rowRack = domModel$.body$[ rowIx ] = [];
                ///================================================
                /// creates cells for given row
                ///================================================
                for( var clusterIx=0; clusterIx < clustersCount; clusterIx++ )
                {
                    if( !cellsVisibilityCondition( rowIx, clusterIx ) ) continue;
                    var clusterPars = makesBodyCluster({
                        rowIx,
                        clusterIx,
                        row,
                        makesClusterCells,
                    });
                    rowRack[ clusterIx ] = makesClusterCells(
                        Object.assign(
                        {
                            row,
                            clusterIx,
                        },
                        clusterPars
                    )); 
                }
            }
            //================================================
            // \\// creates rows below captions-row
            //================================================
        }


        //=========================================
        //
        //=========================================
        ///Makes:  magnitude's cluster in table,
        ///Effect: represents magnitude in html-table-row in 
        ///        form "clusterKey = mvalue",
        ///Input:  clusterKey = magnitude name
        function makesClusterCells({
                row,
                clusterIx,
                clusterKey,     //tp-aware
                tpCssName,      //unfilteredYetCapsTopic-with-additional-tokens
                clusterCaption,
                ixOfSpanBeginning,     
                spanVal,
                alignCaptionToRight,
                noEqualSign,
                fillerAfterValue,
                style,
        }){
            tpCssName = sDomF.topicIdUpperCase_2_underscore( tpCssName || clusterKey );
            tpCssName = tpCssName.replace( /<_>/g, ' ' );
            var dataMonospace = tpCssName.indexOf( 'data-monospace' ) > -1;
            if( dataMonospace ) {
                tpCssName = tpCssName.replace( /(\s+data-monospace)/,'' );
            }
            var cells$ = [];
            //========================================================
            // //\\ cell = value title
            //========================================================
            if( clusterCaption !== ']no caption[' ) {
                var c$ = $$.c('td')
                   .html( clusterCaption || clusterKey )
                   .addClass('tostroke tocolor tobold tp-' + tpCssName)
                   .to(row);
                if( alignCaptionToRight ) {
                    c$.addClass('align-to-right')
                }
                if( ixOfSpanBeginning === 0 ) { c$.a( 'colspan', '' + spanVal ); }
                cells$.push( c$ );
            }
            //========================================================
            // \\// cell = value title
            //========================================================

            //========================================================
            // //\\ cell = equality tocken
            //========================================================
            if( !noEqualSign ) {
                //$$.c('td').html( noEqualSign ? '' : '=' ).to(row)
                var c$ = $$.c('td')
                    .html( '=' )
                    .to(row)
                    //.addClass('eq-sign')
                    ;
                cells$.push( c$ );
            }
            //========================================================
            // \\// cell = equality tocken
            //========================================================

            //========================================================
            // //\\ cell = value placeholder
            //      , cell of data,
            //========================================================
            var valuePlaceholder$ = $$.c( 'td' )
               .cls( 'value' )
               .cls( 'tostroke tocolor tobold tp-'+tpCssName + (dataMonospace ? ' monospace' : '') )
               .css( 'padding-right', '4px' )
               .css( 'padding-left', '0px' )
               .to( row );
            if( ixOfSpanBeginning === 2 ) { valuePlaceholder$.a( 'colspan', '' + spanVal ); }
            cells$.push( valuePlaceholder$ );
            clustersToUpdate[ clusterKey ] = valuePlaceholder$();
            //========================================================
            // \\// cell = value placeholder
            //========================================================

            //========================================================
            // //\\ cell = filler after cluster
            //========================================================
            if( fillerAfterValue ) {
                var filler$ = $$.c('td').html( fillerAfterValue ).to(row);
                cells$.push( filler$ );
            }
            //========================================================
            // \\// cell = filler after cluster
            //========================================================


            ///"quick and angry" made clumsy style engine
            if( style ) {
                style.forEach( (stl,six) => {
                    stl.forEach( st => {
                        cells$[ six ].css( st[0], st[1] );
                    });
                });
            }
            return cells$;
        }

















        //=========================================
        // //\\ updates values during simulation
        //      can be called from slider and from
        //      other places
        //      ************************************
        //      todom: change name to update_legend,
        //             this thing does not create
        //             anything
        //      ************************************
        //=========================================
        function upcreate_mainLegend()
        {
            !noTableTitle && updatesTableTitle && updatesTableTitle({ tableCaption$ });
            updateCaptionsRow();
            for( var rowIx = 0; rowIx < rowsCount; rowIx++ )
            {
                for( var clusterIx=0; clusterIx < clustersCount; clusterIx++ )
                {
                    if( !cellsVisibilityCondition( rowIx, clusterIx ) ) continue;
                    var { clusterCellIx, htmlbody, } = updatesDataInCell({ rowIx, clusterIx, });
                    domModel$.body$[ rowIx ][ clusterIx ][ clusterCellIx ].html( htmlbody );
                }
            }
            visibilizeTable();
        }
        //=========================================
        // \\// updates values during simulation
        //=========================================


        ///================================================
        /// refills first row below the table caption;
        ///================================================
        function updateCaptionsRow()
        {
            if( updatesCaptionCluster ) {
                var len = clustersCount;
                for( var clusterIx=0; clusterIx < len; clusterIx++ )
                {
                    var { columnCaptionTitle, clusterCellIx  } =
                        updatesCaptionCluster({ clusterIx, });
                    domModel$.columnCaptionsRow[ clusterIx ][ clusterCellIx ]
                        .html( columnCaptionTitle )
                        ;
                }
            }
        }



        ///================================================
        /// selectively makes table's cells visible
        ///================================================
        function visibilizeTable()
        {
            //--------------------------------------------
            // //\\ hides all cells
            //--------------------------------------------
            if( makesCaptionCluster ) {
                for( var clusterIx=0; clusterIx<clustersCount; clusterIx++ )
                {
                    domModel$.columnCaptionsRow[ clusterIx ].forEach( c$ => {
                        c$.addClass( 'hidden' );
                    });
                }
            }
            for( var rowIx=0; rowIx < rowsCount; rowIx++ )
            {
                for( var clusterIx=0; clusterIx <= clustersCount-rowIx-1; clusterIx++ )
                {
                    domModel$.body$[ rowIx ][ clusterIx ].forEach( c$ => {
                        c$.addClass( 'hidden' );
                    });
                }
            }
            //--------------------------------------------
            // \\// hides all cells
            //--------------------------------------------

            //--------------------------------------------
            // //\\ shows cells by condition
            //--------------------------------------------
            if( makesCaptionCluster ) {
                for( var clusterIx=0; clusterIx < clustersCount; clusterIx++ )
                {
                    domModel$.columnCaptionsRow[ clusterIx ].forEach( c$ => {
                        ///by design, captions visibility is the same as row-0
                        cellsVisibilityCondition( 0, clusterIx ) && c$.removeClass( 'hidden' );
                    });
                }
            }
            for( var rowIx = 0; rowIx < rowsCount; rowIx++ )
            {
                for( var clusterIx=0; clusterIx < clustersCount; clusterIx++ )
                {
                    cellsVisibilityCondition( rowIx, clusterIx ) &&
                    domModel$.body$[ rowIx ][ clusterIx ].forEach( c$ => {
                        c$.removeClass( 'hidden' );
                    });
                }
            }
            //--------------------------------------------
            // \\// shows cells by condition
            //--------------------------------------------
        }
    }
}) ();

