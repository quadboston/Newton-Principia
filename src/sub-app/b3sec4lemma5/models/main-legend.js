( function() {
    var ns      = window.b$l;
    var $$      = ns.$$;
    var sn      = ns.sn;    
    var bezier  = sn('bezier');
    var sv      = sn('svg');

    var fapp    = sn('fapp'); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);

    var sapp    = sn('sapp'); 
    var sDomN   = sn('dnative',sapp);

    var ss      = sn('ss',fapp);
    var ssD     = sn('ssData',ss);
    var ssF     = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mainLegend_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;


    var domModel$ = {
        firstRow$ : [],
        body$ : [],
    }
    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];
    var visibilizeTableLocal;
    var fillTableData_inModule;
    return;








    function setModule()
    {
        ssF.upcreate_mainLegend = upcreate_mainLegend;
        //.uncomment this to ad a legend
        ssF.create_digital_legend = create_digital_legend;
    }

    ///this function is called from common-application-library,
    ///from full-app/dom/...
    function create_digital_legend()
    {
        //ccc( 'starts create_digital_legend' );
        var mlegend = ssF.tr( 'main-legend' );
        doCreateTable_proof( mlegend );
    }





    //=========================================
    // //\\ updates values during simulation
    //      can be called from slider and from
    //      other places
    //=========================================
    function upcreate_mainLegend()
    {
        visibilizeTableLocal();
        fillTableData_inModule({
            tdata:rg.approximator_curve.dividedDifferences.coefficients,
            indexFrom:1
        });

        $$.q('.table-caption')
          .html( rg.experimental.fname + '. Divided Differences:')
        //rg.approximator_curve.dividedDifferences
        //var poly = F[0][0][1];

        //{ coefficients:F, calculate_polynomial }

    }
    //=========================================
    // \\// updates values during simulation
    //=========================================





    //=========================================
    // //\\ creates proof table
    //      does one time work of html creation
    //=========================================
    function doCreateTable_proof(mlegend)
    {
        fillTableData_inModule = fillTableData;
        var tr = ssF.tr;

        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.proof = $$
            .c('table')
            .cls( 'main-legend proof' )

            //.css( 'table-layout', 'auto' ) //makes problem ... table moves out of pane ...
            //.css( 'width', '500px' )       //possible responsivness problems

            //removes set of .main-legend.proof {
            .css( 'border-collapse', 'collapse' )

            .to( sDomN.legendRoot$ )
            //sDomN.medRoot)
            ();


        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        var max_m = sconf.basePairs.length-1; //rg.n.value;
        var row = $$.c('tr')

            //vital ... removes global css which corrupts table
            //.addClass('proof row1 tostroke')
            .addClass('proof tostroke')

            .css( 'visibility', 'hidden' ) //todm ... tmp fix
            .to(tb)();
        //:todm ... kitchen ... non-reliable
        $$.c('td').html( 'xxx' ).to(row);
        $$.c('td').html( '-0.333x' ).to(row);
        $$.c('td').html( 'xx' ).to(row);
        //=====================================================
        // \\// idle first row to format table for fixed-layout
        //=====================================================


        //===================
        // //\\ table caption
        //===================
        var row = $$.c('tr').to(tb)();
        $$.c('td').a('colspan','33')
                  .addClass('table-caption')
                  .html('Divided Differences')
                  .to(row);
        //===================
        // \\// table caption
        //===================

        // begins to fill data rows

        //===================
        // //\\
        //===================
        doCreateTable();
        visibilizeTableLocal = visibilizeTable;
        visibilizeTable();
        //===================
        // \\//
        //===================
        return;



        function doCreateTable()
        {

            //================================================
            // //\\ creates first row below the table caption;
            //      fills it like:
            //      "H, x=0.00, I, x=1.00 ... "
            //================================================
            //.creates only once
            if( domModel$.firstRow$.length ) return;
            var row = $$.c('tr')
                //.addClass('tostroke')
                .to( tb )()
                ;
            for( var cellIx=0; cellIx<max_m; cellIx++ )
            {
                var bpair = sconf.basePairs[ cellIx ];
                var letter = bpair[0].pname +

                    //.makes this string smaller to tackle the unclear bug of
                    //.table disappearence
                    '<span style="font-size:9px">' +
                    ', x=' +
                    bpair[0].pos[0].toFixed(2) +
                    '</span>'
                ;

               var id = rowIx+'-'+cellIx+'-letter';
                domModel$.firstRow$[ cellIx ] = makeCl({
                    row,
                    mname: id,
                    mcaption: letter,
                    claim0proof: 'proof',
                    tpCssName: 'experimental ' + id,
                    noEqualSign : true,
                });
            }
            //================================================
            // \\// creates first row below the table caption;
            //================================================


            for( var rowIx=0; rowIx<=max_m; rowIx++ )
            {
                var row = $$.c('tr')
                    //.addClass('tostroke')
                    .to( tb )()
                    ;
                domModel$.body$[ rowIx ] = [];
                for( var cellIx=0; cellIx<=max_m-rowIx-1; cellIx++ )
                {
                    var indices = ''+cellIx;
                    if( rowIx ) {
                         indices += cellIx+rowIx;
                    }
                    var id = rowIx+'-'+cellIx+'-cell';
                    var P = cellIx ? '' : '<br>=P<sub>'+rowIx+'</sub>';

                    var tpCssName = cellIx === 0 ?
                                        'approximator ' + id:
                                        ( rowIx === 0 ?
                                            'experimental ' + id : '' )
                    domModel$.body$[ rowIx ][ cellIx ] = makeCl({
                        row,
                        mname: id,
                        mcaption: 'y<sub>' + indices + '</sub>' + P,
                        claim0proof: 'proof',
                        tpCssName: tpCssName,
                        noEqualSign : true,
                        cellIx,
                    });
                }
            }
        }


        function visibilizeTable()
        {
            // //\\ hides all
            for( var cellIx=0; cellIx<max_m; cellIx++ )
            {
                domModel$.firstRow$[ cellIx ].forEach( c$ => {
                    c$.addClass( 'hidden' );
                });
            }
            for( var rowIx=0; rowIx<=max_m; rowIx++ )
            {
                for( var cellIx=0; cellIx<=max_m-rowIx-1; cellIx++ )
                {
                    domModel$.body$[ rowIx ][ cellIx ].forEach( c$ => {
                        c$.addClass( 'hidden' );
                    });
                }
            }
            // \\// hides all

            if( !ns.h( rg, 'm' ) ) return;


            // //\\ shows only existing
            var m = rg.m.value
            for( var cellIx=0; cellIx<m; cellIx++ )
            {
                domModel$.firstRow$[ cellIx ].forEach( c$ => {
                        c$.removeClass( 'hidden' );
                    });
            }
            for( var rowIx=0; rowIx<=m; rowIx++ )
            {
                for( var cellIx=0; cellIx<=m-rowIx-1; cellIx++ )
                {
                    domModel$.body$[ rowIx ][ cellIx ].forEach( c$ => {
                        c$.removeClass( 'hidden' );
                    });
                }
            }
            // \\// shows only existing

        }

        ///this function do not fill header row ...
        function fillTableData({ tdata, indexFrom })
        {
            var m = rg.m.value
            var indexTo = 1;

            for( var rowIx=0; rowIx<=m; rowIx++ )
            {
                for( var cellIx=0; cellIx<=m-rowIx-1; cellIx++ )
                {
                    domModel$.body$[ rowIx ][ cellIx ][indexTo].html(
                        '=' + tdata[ rowIx ][ cellIx ][ indexFrom ].toFixed(3) );
                }
            }
        }




        function makeCl({
            row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
            claim0proof, noEqualSign, tpCssName, cellIx
         }) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
                'proof', noEqualSign, tpCssName, cellIx );
        }
    }
    //=========================================
    // \\// creates proof table
    //=========================================






    //=========================================
    //
    //=========================================
    ///Makes:  magnitude's cluster in table,
    ///Effect: represents magnitude in html-table-row in 
    ///        form "mname = mvalue",
    ///Input:  mname = magnitude name
    function makeClBoth( row, mname, mcaption, spanIx, spanVal,
                         alignCaptionToRight, claim0proof, noEqualSign, tpCssName, cellIx )
    {
        var tr = ssF.tr;
        //todm: ?no need for extra function argument:
        //      tp-tpCssName may be taken from "rg.Elem point wrap" ...
        tpCssName = (tpCssName || mname ).replace( /([A-Z])/g, ( match, key1 ) => (
                      '_' + key1.toLowerCase()
        ));
        var cells$ = [];

        if( mcaption !== ']no caption[' ) {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .addClass('tostroke tocolor tobold tp-' + tpCssName)
                       .to(row);
            if( alignCaptionToRight ) {
                c$.addClass('align-to-right')
            }
            if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }
            cells$.push( c$ );
        }

        //todm .this does not guarantee adding the class to td ... so far only
        //.topic-engine probably takes care about the class - do fix this
        //tr( 'legend-'+mname, 'domel', c$() );
        //tr( 'claim-legend-'+mname, 'domel', c$() );

        if( !noEqualSign ) {
            //$$.c('td').html( noEqualSign ? '' : '=' ).to(row)
            var c$ = $$.c('td').html( '=' ).to(row)
                //.addClass('eq-sign')
                ;
            cells$.push( c$ );
        }

        //========================================================
        // //\\ last placeholder
        //========================================================
        var lastPlaceholder$ = $$.c('td')
                   .cls('value')
                   .cls('tostroke tocolor tobold tp-'+tpCssName)
                   .css( 'padding-right', '4px' )
                   .css( 'padding-left', '0px' )
                   .to(row);
        if( spanIx === 2 ) { lastPlaceholder$.a('colspan',''+spanVal); }
        cells$.push( lastPlaceholder$ );
        //var updateeCell = tr( 'td-'+mname, 'domel', lastPlaceholder$() );
        if( claim0proof === 'claim' ) {
            //var updateeCell = tr( 'claim-number-'+mname, 'domel', lastPlaceholder$() );
            //clustersToUpdate_claim[mname] = updateeCell;
            clustersToUpdate_claim[mname] = lastPlaceholder$();
        } else {
            //var updateeCell = tr( 'number-'+mname, 'domel', lastPlaceholder$() );
            clustersToUpdate[mname] = lastPlaceholder$(); //updateeCell;
        }
        //========================================================
        // \\// last placeholder
        //========================================================

        //filler after cluster
        var filler$ = $$.c('td').html( ' ' ).to(row)
            ;
        cells$.push( filler$ );

        return cells$;
    }



}) ();

