( function() {
    var { $$, sDomF, ssD, stdMod, rg, toreg, } 
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

        //: proof
        var ww = clustersToUpdate;
        ww.AbdPerAce.innerHTML  = (calcA[ 'Afd' ].total/calcA[ 'Age' ].total).toFixed(3);
        ww.ABDPerACE.innerHTML  = (calcA[ 'AFD' ].total/calcA[ 'AGE' ].total).toFixed(3);
        ww.AD2PerAE2.innerHTML  = (claimR*claimR).toFixed(3);
        ww.Ad2PerAe2.innerHTML  = (claimR*claimR).toFixed(3);
        
        //: claim
        var ww = clustersToUpdate_claim;
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
        // //\\ first row
        //===================
        //:Abd Ace
        AbdAce_row$ = $$.c('tr')
            .addClass('tostroke')
            .to(tb);
        var row = AbdAce_row$();        
        makeCl( row, 'ABDPerACE', '△ABD : △ACE' );  
        makeCl( row, 'AbdPerAce', '△Abd : △Ace' );
        //===================
        // \\// first row
        //===================

        //===================
        // //\\ second row
        //===================
        var row = $$.c('tr')
                    .addClass('tostroke')
                    .to(tb)();              
        makeCl( row, 'AD2PerAE2', 'AD² : AE²');    
        makeCl( row, 'Ad2PerAe2', 'Ad² : Ae²');
        //===================
        // \\// second row
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
        makeCl( row, 'ABDPerACE', '△ABD : △ACE' );
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

