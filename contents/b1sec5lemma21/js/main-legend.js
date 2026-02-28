( function() {
    var {
        $$, mat,
        sconf, sDomF, sDomN, ssD, ssF,
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
        //c cc( 'starts create_digital_legend' );
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
        ww[ 'a' ].innerHTML = rg.a.value.toFixed(3);
        ww[ 'b' ].innerHTML = rg.b.value.toFixed(3);

        //todm this is a patch: do use Pr/Pt
        let grad = '<sup>ᵒ</sup>';
        let rad2grad = 180/Math.PI;
        ww[ 'eta' ].innerHTML = (rg.angleBCM*rad2grad).toFixed(1) + grad;

        ww[ 'beta' ].innerHTML = (rg.beta.value*rad2grad).toFixed(1) + grad;
        ww[ 'alpha' ].innerHTML = (rg.alpha.value*rad2grad).toFixed(1) + grad;
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
        makeFormatterCell( row, 'angle.BCM xxx', '1111', 'xxxxx' );
        makeFormatterCell( row, 'angle.BCM.xxx', '1111', 'xxxxx' );
        makeFormatterCell( row, 'dummy', 'dummy', 'xxxxx' );
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
                  .html('')
                  .to(row);
        //===================
        // \\// table caption
        //===================

        // begins to fill data rows

        //===================
        // //\\
        //===================
        var row = $$.c('tr')
            //.addClass('tostroke')
            .to(tb)
            .addClass( 'aspect--model' )
            ();
        makeCl( row, 'a', 'c', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'core' );
        makeCl( row, 'b', '1-c', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'core' );

        var row = $$.c('tr')
            //.addClass('tostroke')
            .to(tb)();
        makeCl( row, 'eta', 'angle BCM', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'eta' );

        var row = $$.c('tr')
            .to(tb)();
        makeCl( row, 'alpha', 'angle ACB', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'angle-alpha' );
        makeCl( row, 'beta', 'angle ABC', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'angle-beta' );

        /*
        var row = $$.c('tr')
            .to(tb)();
        makeCl( row, 'medzoom', 'scale', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'medzoom' );
        */
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
        //var updateeCell = tr( 'td-'+mname, 'domel', c$() );
        if( claim0proof === 'claim' ) {
            //var updateeCell = tr( 'claim-number-'+mname, 'domel', c$() );
            //clustersToUpdate_claim[mname] = updateeCell;
            clustersToUpdate_claim[mname] = c$();
        } else {
            //var updateeCell = tr( 'number-'+mname, 'domel', c$() );
            clustersToUpdate[mname] = c$(); //updateeCell;
        }
        return c$;
    }



}) ();

