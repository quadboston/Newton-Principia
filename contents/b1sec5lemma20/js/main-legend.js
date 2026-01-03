( function() {
    var {
        $$, mat,
        sconf, sDomF, sDomN, ssD, ssF, sData,
        stdMod, rg, toreg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            upcreate_mainLegend,
            create_digital_legend,
        },
    });
    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];
    return;


    ///this function is called from common-application-library,
    ///from full-app/dom/...
    function create_digital_legend()
    {
        var mlegend = toreg( 'main-legend' )();
        doCreateTable_proof( mlegend );
    }





    //=========================================
    // //\\ updates values during simulation
    //      can be called from slider and from
    //      other places
    //=========================================
    function upcreate_mainLegend()
    {
        var ww = clustersToUpdate;
        //ww[ 'a' ].innerHTML = sData.polar_ell_model.e.toFixed(2);
        //ww[ 'b' ].innerHTML = rg.b.value.toFixed(2);

        //var wwT=rg.T.pos;

        //todm this is a patch: do use Pr/Pt
        var PT = Math.abs( rg.T.value ) < 1e-20 ? 1 : rg.T.value;

        var wwR=rg.R.pos;
        var wwP=rg.P.pos;
        var PR = mat.unitVector( [wwR[0]-wwP[0], wwR[1]-wwP[1] ] ).abs;
        var PR_PT = (PR/PT);
        ww[ 'PT' ].innerHTML = PT.toFixed(2);
        ww[ 'PR' ].innerHTML = PR.toFixed(2);
        ww[ 'PR-PT' ].innerHTML     = PR_PT.toFixed(2);
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
        var row = $$.c('tr')
            .addClass('proof row1')
            .addClass('tostroke')
            .to(tb)();
        makeFormatterCell( row, 'semiaxis a xxxxxxxxx', '111', 'xxxxxxxxx' );
        makeFormatterCell( row, 'semiaxis a xxxxxxxxx', '111', 'xxxxxxxxx' );
        makeFormatterCell( row, 'xxx', '11111', 'xxxxxxxxx' );
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
                  .html('ratio:')
                  .to(row);
        //===================
        // \\// table caption
        //===================

        // begins to fill data rows

        //===================
        // //\\
        //===================
        //:time
        var row = $$.c('tr')
            //.addClass('tostroke')
            .to(tb)();
        var row = $$.c('tr')
            .to(tb)();
        makeCl( row, 'PT', 'PT', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'key-triangle' );
        makeCl( row, 'PR', 'PR', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'key-triangle' );
        makeCl( row, 'PR-PT', 'PR/PT', null, null,  !'alignCaptionToRight', 'proof', !'skipEqualSign', 'key-triangle' );
        var row = $$.c('tr').to(tb)();
        //===================
        // \\//
        //===================
        return;


        function makeCl(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
                claim0proof, noEqualSign, cssName
         ) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
                'proof', noEqualSign, cssName );
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
                         alignCaptionToRight, claim0proof, noEqualSign, cssName )
    {
        //todm: ?no need for extra function argument:
        //      tp-cssName may be taken from "rg.Elem point wrap" ...
        cssName = sDomF.tpid2low( cssName || mname );

        if( mcaption !== ']no caption[' ) {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .addClass('tostroke tocolor tobold tp-' + cssName)
                       .to(row);
            if( alignCaptionToRight ) {
                c$.addClass('align-to-right')
            }
            if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }
        }

        //todm .this does not guarantee adding the class to td ... so far only
        //.topic-engine probably takes care about the class - do fix this
        //tr( 'legend-'+mname, 'domel', c$() );
        //tr( 'claim-legend-'+mname, 'domel', c$() );

        if( !noEqualSign ) {
            //$$.c('td').html( noEqualSign ? '' : '=' ).to(row)
            $$.c('td').html( '=' ).to(row)
                //.addClass('eq-sign')
                ;
        }
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

