( function() {
    var { $$, sconf, fconf, sDomF, ssD, stdMod, rg, toreg, } 
        = window.b$l.apptree({ ssFExportList : { upcreate_mainLegend, create_digital_legend, }, });
    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];
    var AbdAce_row$;
    return;

    
    function create_digital_legend()
    {
        var mlegend = toreg( 'main-legend' )();
        doCreateTable_claim( mlegend );
        doCreateTable_proof( mlegend );
    }

    //=========================================
    // //\\ updates values during simulation
    //=========================================
    function upcreate_mainLegend()
    {
        //********************************************
        // takes values not from registry rg, but from
        var calcA = ssD.calculatedAreas;
        // values-ids are unprefixed area-id like
        // AGE (not area-AGE)
        //********************************************

        var claimR = ssD.claimRatio;

        var www = sconf.LEGEND_NUMERICAL_SCALE;
        var wD2 = www * www;
        var dig = www > 10 ? 0 : 4;

        var ww = clustersToUpdate;

        //:vanishing areas
        //:sets display of "main vanishing values"
        //:these statements do output all the "vanishing" digits
        ww.ABD.innerHTML        = (wD2*calcA[ 'AFD' ].total).toFixed(dig+4);
        ww.ACE.innerHTML        = (wD2*calcA[ 'AGE' ].total).toFixed(dig+4);

        ww.ABDPerACE.innerHTML  = (calcA[ 'AFD' ].total/calcA[ 'AGE' ].total).toFixed(3);
        ww.AD2PerAE2.innerHTML  = (claimR*claimR).toFixed(3);
        
        var ww = clustersToUpdate_claim;
        //: vanishing areas
        ww.ABDPerACE.innerHTML  = (calcA[ 'AFD' ].total/calcA[ 'AGE' ].total).toFixed(3);
        ww.AD2PerAE2.innerHTML  = (claimR*claimR).toFixed(3);
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
        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.proof = $$
            .c('table')
            .cls( 'main-legend proof' )
            .to( stdMod.legendRoot$ )
            ();

        //===================
        // //\\ row 1
        //===================
        var row = $$.c('tr')
                    .addClass('tostroke')
                    .to(tb)();
        makeCl( row, 'ABD' ); //...span-index, span-value
        makeCl( row, 'ABDPerACE', 'ABD : ACE' );
        //===================
        // \\// row 1
        //===================

        //===================
        // //\\ row 2
        //===================
        var row = $$.c('tr')
                    .addClass('tostroke')
                    .to(tb)();                    
        makeCl( row, 'ACE');
        makeCl( row, 'AD2PerAE2', 'AD² : AE²');
        //===================
        // \\// row 2
        //===================
        return;

        function makeCl( row, mname, mcaption, spanIx, spanVal ) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, 'proof' );
        }
    }
    //=========================================
    // \\// creates proof table
    //=========================================


    //=========================================
    // //\\ creates claim table
    //      similar to doCreateTable()
    //=========================================
    function doCreateTable_claim(mlegend)
    {
        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.claim = $$
            .c('table')
            .cls( 'main-legend claim' )
            .to( stdMod.legendRoot$ )
            ();


        //===================
        // //\\ vanishing areas
        //===================
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'ABDPerACE', 'ABD : ACE' );
        //===================
        // \\// vanishing areas
        //===================

        //:sides row
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'AD2PerAE2', 'AD² : AE²');
        return;


        function makeCl( row, mname, mcaption, spanIx, spanVal ) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, 'claim' );
        }
    }
    //=========================================
    // \\// creates claim table
    //=========================================


    //=========================================
    //
    //=========================================
    ///Makes:  magnitude's cluster in table,
    ///Effect: represents magnitude in html-table-row in 
    ///        form "mname = mvalue",
    ///Input:  mname = magnitude name
    function makeClBoth( row, mname, mcaption, spanIx, spanVal, claim0proof )
    {
        var cssName = sDomF.tpid2low( mname );
        var c$ = $$.c('td')
                   .html( mcaption||mname )
                   .addClass('tostroke tocolor tobold tp-' + cssName)
                   .to(row);

        if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }

        var c$ = $$.c('td')
                   .cls('value')
                   .cls('tostroke tocolor tobold tp-'+cssName)
                   .to(row);
        if( spanIx === 2 ) { c$.a('colspan',''+spanVal); }
        if( claim0proof === 'claim' ) {
            clustersToUpdate_claim[mname] = c$();
        } else {
            clustersToUpdate[mname] = c$(); //updateeCell;
        }
        return c$;
    }

}) ();
