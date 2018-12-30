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

    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mainLegend_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;








    function setModule()
    {
        ssF.upcreate_mainLegend = upcreate_mainLegend;
        ssF.create_digital_legend = create_digital_legend;
    }

    function create_digital_legend()
    {
        var mlegend = ssF.tr( 'main-legend' );
        doCreateTable_claim( mlegend );
        doCreateTable_proof( mlegend );
    }

    //=========================================
    // //\\ updates values during simulation
    //=========================================
    function upcreate_mainLegend()
    {
        var calcA = ssD.calculatedAreas;
        var claimR = ssD.claimRatio;

        var www = sconf.LEGEND_NUMERICAL_SCALE;
        var wD2 = www * www;
        var dig = www > 10 ? 0 : 4;

        var ww = clustersToUpdate;
        ww.Abd.innerHTML        = (wD2*calcA[ 'Afd' ].total).toFixed(dig);
        ww.Afd.innerHTML        = (wD2*calcA[ 'Afd' ].base).toFixed(dig);
        ww.AfdPerAge.innerHTML  = (calcA[ 'Afd' ].base/calcA[ 'Age' ].base).toFixed(3);

        ww.Ace.innerHTML        = (wD2*calcA[ 'Age' ].total).toFixed(dig);
        ww.Age.innerHTML        = (wD2*calcA[ 'Age' ].base).toFixed(dig);
        ww.AbdPerAce.innerHTML  = (calcA[ 'Afd' ].total/calcA[ 'Age' ].total).toFixed(3);

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
            .addClass('main-legend')
            .addClass('proof')
            .to(sDomN.medRoot)
            ();
        var tr = ssF.tr;


        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        //:Abd Ace
        var row = $$.c('tr')
            .addClass('proof row1')
            .addClass('tostroke')
            .to(tb)();              
        makeFormatterCell( row, 'DD', '11111', 'first' );
        makeFormatterCell( row, 'DD', '11111', 'second' );
        makeFormatterCell( row, 'DDD/DDD', '11111', 'third' );
        function makeFormatterCell( row, mcaption, val, id )
        {
            $$.c('td').html( mcaption ).to(row);
            $$.c('td').html('=').addClass('eq-sign '+id).to(row);
            $$.c('td').html( val+'' ).to(row);
        }
        //=====================================================
        // \\// idle first row to format table for fixed-layout
        //=====================================================




        //===================
        // //\\ table caption
        //===================
        var row = $$.c('tr').to(tb)();
        $$.c('td').a('colspan','9')
                  .addClass('table-caption')
                  .html('Data')
                  .to(row);
        //===================
        // \\// table caption
        //===================

        //===================
        // //\\ remote areas
        //===================
        //:Abd Ace
        var row = $$.c('tr')
            //.addClass('tfamily-proof')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'Abd' );
        makeCl( row, 'Ace', null, null, null, !!'alignCaptionToRight' );
        makeCl( row, 'AbdPerAce', 'Abd/Ace' );
        //:Afd Age
        var row = $$.c('tr')
            //.addClass('tfamily-proof')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'Afd' );
        makeCl( row, 'Age', null, null, null, !!'alignCaptionToRight' );
        makeCl( row, 'AfdPerAge', 'Afd/Age' );
        //===================
        // \\// remote areas
        //===================


        //===================
        // //\\ vanishing areas
        //===================
        var row = $$.c('tr')
                    .addClass('tfamily-claim')
                    .addClass('tostroke')
                    .to(tb)();
        makeCl( row, 'ABD', null, 2, 2 );
        $$.c('td').to(row); //empty filler-cell
        $$.c('td').to(row); //empty filler-cell
        makeCl( row, 'ABDPerACE', 'ABD/ACE' );
        var row = $$.c('tr')
                    .addClass('tfamily-claim')
                    .addClass('tostroke')
                    .to(tb)();
        makeCl( row, 'ACE', null, 2, 2 );
        //$$.c('td').a('colspan','6').to(row);
        $$.c('td').to(row); //empty filler-cell
        $$.c('td').to(row); //empty filler-cell
        makeCl( row, 'AD2PerAE2', 'AD²/AE²');
        //===================
        // \\// vanishing areas
        //===================

        

        //:model linear unit 
        var row = $$.c('tr')
            .addClass('tfamily-claim')
            .addClass('tostroke')
            .to(tb)();
        //$$.c('td').a('colspan','6').to(row);
        makeCl( row, 'model-linear-unit', 'Ae');
        clustersToUpdate['model-linear-unit'].innerHTML = sconf.LEGEND_NUMERICAL_SCALE.toFixed();
        return;


        ///Makes:  magnitude's cluster in table,
        ///Effect: represents magnitude in html-table-row in 
        ///        form "mname = mvalue",
        ///Input:  mname = magnitude name
        function makeCl( row, mname, mcaption, spanIx, spanVal, alignCaptionToRight )
        {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .addClass('tostroke')
                       .to(row);
            if( alignCaptionToRight ) {
                c$.addClass('align-to-right')
            }

            if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }

            //todm .this does not guarantee adding the class to td ... so far only
            //.topic-engine probably takes care about the class - do fix this
            tr( 'legend-'+mname, 'domel', c$() );

            $$.c('td').html('=').addClass('eq-sign').to(row);
            var c$ = $$.c('td')
                       .addClass('value')
                       .addClass('tostroke')
                       .to(row);
            if( spanIx === 2 ) { c$.a('colspan',''+spanVal); }
            var updateeCell = tr( 'number-'+mname, 'domel', c$() );
            clustersToUpdate[mname] = updateeCell;
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
            .addClass('main-legend')
            .addClass('claim')
            .to(sDomN.medRoot)
            ();
        var tr = ssF.tr;




        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        //:Abd Ace
        var row = $$.c('tr')
            .addClass('claim row1')
            .addClass('tostroke')
            .to(tb)();
        makeFormatterCell( row, 'DD', '11111', 'first' );
        function makeFormatterCell( row, mcaption, val, id )
        {
            $$.c('td').html( mcaption ).to(row);
            $$.c('td').html('=').addClass('eq-sign '+id).to(row);
            $$.c('td').html( val+'' ).to(row);
        }
        //=====================================================
        // \\// idle first row to format table for fixed-layout
        //=====================================================



        //===================
        // //\\ table caption
        //===================
        var row = $$.c('tr').to(tb)();
        $$  .c('td')
            .a('colspan','6')
            .addClass('table-caption')
            .html('Data')
            .to(row);
        //===================
        // \\// table caption
        //===================



        //===================
        // //\\ vanishing areas
        //===================
        var row = $$.c('tr')
            .addClass('tfamily-claim')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'ABDPerACE', 'ABD/ACE' );
        //===================
        // \\// vanishing areas
        //===================

        //:sides row
        var row = $$.c('tr')
            .addClass('tfamily-claim')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'AD2PerAE2', 'AD²/AE²');
        return;


        function makeCl( row, mname, mcaption, spanIx, spanVal )
        {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .to(row);
            if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }
            tr( 'claim-legend-'+mname, 'domel', c$() );
            $$.c('td').html('=').to(row);
            var c$ = $$.c('td')
                       .addClass('value')
                       .to(row);
            if( spanIx === 2 ) { c$.a('colspan',''+spanVal); }
            var updateeCell = tr( 'claim-number-'+mname, 'domel', c$() );
            clustersToUpdate_claim[mname] = updateeCell;
        }
    }
    //=========================================
    // \\// creates claim table
    //=========================================

}) ();

