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

        ///todm: this is a patch: removes "proof-row" when it is disabled
        //       in script via "undisplay" flag:
        //       is clumsy because does not shrink row's height:
        if( rg[ 'area-Abd' ].undisplay === true ) {
            AbdAce_row$.addClass( 'hidden' );
        } else {
            AbdAce_row$.removeClass( 'hidden' );
        }

        //ww.Abd.innerHTML        = (wD2*calcA[ 'Afd' ].total).toFixed(dig);

        //:excessive reporting: removed
        //ww.Afd.innerHTML        = (wD2*calcA[ 'Afd' ].base).toFixed(dig);
        //ww.AfdPerAge.innerHTML  = (calcA[ 'Afd' ].base/calcA[ 'Age' ].base).toFixed(3);
        //ww.Age.innerHTML        = (wD2*calcA[ 'Age' ].base).toFixed(dig);

        //ww.Ace.innerHTML        = (wD2*calcA[ 'Age' ].total).toFixed(dig);
        ww.AbdPerAce.innerHTML  = (calcA[ 'Afd' ].total/calcA[ 'Age' ].total).toFixed(3);




        //:vanishing areas
        //:sets display of "main vanishing values"
        //:these statements do output all the "vanishing" digits
        //ww.ABD.innerHTML        = (wD2*calcA[ 'AFD' ].total).toFixed(dig+4);
        //ww.ACE.innerHTML        = (wD2*calcA[ 'AGE' ].total).toFixed(dig+4);

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

        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        // :Abd Ace
        // var row = $$.c('tr')
        //     .addClass('proof row1')
        //     .addClass('tostroke')
        //     .to(tb)();              
        // makeFormatterCell( row, 'DD', '11111', 'first' );
        // makeFormatterCell( row, 'DD', '11111', 'second' );
        // makeFormatterCell( row, 'DDD/DDD', '11111', 'third' );
        // function makeFormatterCell( row, mcaption, val, id )
        // {
        //     $$.c('td').html( mcaption ).to(row);
        //     $$.c('td').html('=').addClass('eq-sign '+id).to(row);
        //     $$.c('td').html( val+'' ).to(row);
        // }
        //=====================================================
        // \\// idle first row to format table for fixed-layout
        //=====================================================


        //===================
        // //\\ table caption
        //===================
        // var row = $$.c('tr').to(tb)();
        // $$.c('td').a('colspan','6')
        //           .addClass('table-caption')
        //           .html('Data')
        //           .to(row);
        //===================
        // \\// table caption
        //===================


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


        //=======================
        // //\\ model linear unit 
        //=======================
        // if (fconf.sappId === "b1sec1lemma9") {
        //     var row = $$.c('tr')
        //         //.addClass('tostroke')
        //         .to(tb)();
        //     //$$.c('td').a('colspan','6').to(row);
        //     makeCl( row, 'model-linear-unit', 'Ae').cls('tp-_ae-length tostroke');
        //     clustersToUpdate['model-linear-unit'].innerHTML = sconf.LEGEND_NUMERICAL_SCALE.toFixed();
        // }
        //=======================
        // \\// model linear unit 
        //=======================
        return;

        function makeCl( row, mname, mcaption, spanIx, spanVal, alignCaptionToRight ) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight, 'proof' );
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


        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        //:Abd Ace
        // var row = $$.c('tr')
        //     .addClass('claim row1')
        //     .addClass('tostroke')
        //     .to(tb)();
        // makeFormatterCell( row, 'DD', '11111', 'first' );
        // function makeFormatterCell( row, mcaption, val, id )
        // {
        //     $$.c('td').html( mcaption ).to(row);
        //     $$.c('td').html('=').addClass('eq-sign '+id).to(row);
        //     $$.c('td').html( val+'' ).to(row);
        // }
        //=====================================================
        // \\// idle first row to format table for fixed-layout
        //=====================================================


        //===================
        // //\\ table caption
        //===================
        // var row = $$.c('tr').to(tb)();
        // $$  .c('td')
        //     .a('colspan','2')
        //     .addClass('table-caption')
        //     .html('Data')
        //     .to(row);
        //===================
        // \\// table caption
        //===================


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


        function makeCl( row, mname, mcaption, spanIx, spanVal, alignCaptionToRight ) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight, 'claim' );
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
    function makeClBoth( row, mname, mcaption, spanIx, spanVal, alignCaptionToRight, claim0proof )
    {
        var cssName = sDomF.topicIdUpperCase_2_underscore( mname );
        var c$ = $$.c('td')
                   .html( mcaption||mname )
                   .addClass('tostroke tocolor tobold tp-' + cssName)
                   .to(row);
        if( alignCaptionToRight ) {
            c$.addClass('align-to-right')
        }

        if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }


        //todm .this does not guarantee adding the class to td ... so far only
        //.topic-engine probably takes care about the class - do fix this
        //tr( 'legend-'+mname, 'domel', c$() );
        //tr( 'claim-legend-'+mname, 'domel', c$() );

        // $$.c('td').html('=').to(row)
        // //.addClass('eq-sign')
        // ;

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

