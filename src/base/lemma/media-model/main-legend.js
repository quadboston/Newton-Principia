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
        ssFExportList : {
            createLogic_phaseLegend,
        },
    });
    return;


    //=========================================
    // //\\ creates logic_phase table
    //      does one time work of html creation
    //=========================================
    function createLogic_phaseLegend({
        stdMod_given,
        logic_phase,
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
    }){
        // called once per table on page load (all tables, not just one first shown)
        // console.log('createLogic_phaseLegend');

        //stdMod_given.upcreate_mainLegend  = upcreate_mainLegend;
        toreg( 'main-legend' )
            ( logic_phase,     {
                                upcreate_mainLegend,
                            }
            );
        var rgTeoTab = rg[ 'main-legend' ][ logic_phase ];
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
                .cls( 'main-legend ' + logic_phase )

                //removes set of .main-legend.]logic_phase[ {
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
                style,
        }){
            tpCssName = sDomF.tpid2low( tpCssName || clusterKey );
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
                if( ixOfSpanBeginning === 0 ) { c$.a( 'colspan', '' + spanVal ); }
                cells$.push( c$ );
            }
            //========================================================
            // \\// cell = value title
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
            // called 3x when should only be called once
            // console.log('upcreate_mainLegend actual');

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

