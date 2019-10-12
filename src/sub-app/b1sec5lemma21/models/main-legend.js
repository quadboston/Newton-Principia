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



    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];
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
        var ww = clustersToUpdate;
        ww[ 'a' ].innerHTML = rg.a.value.toFixed(3);
        ww[ 'b' ].innerHTML = rg.b.value.toFixed(3);

        //todm this is a patch: do use Pr/Pt
        var g = Math.abs( rg.g.value ) < 1e-20 ? 1 : rg.g.value;
        ww[ 'g' ].innerHTML = g.toFixed(3);

        ww[ 'beta' ].innerHTML = rg.beta.value.toFixed(3);
        ww[ 'alpha' ].innerHTML = rg.alpha.value.toFixed(3);
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
            .to( sDomN.legendRoot$ )
            //sDomN.medRoot)
            ();
        var tr = ssF.tr;


        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        var row = $$.c('tr')
            .addClass('proof row1')
            .addClass('tostroke')
            .to(tb)();              
        makeFormatterCell( row, 'xxxxxxx', '11111', 'xxxxxxxxx' );
        makeFormatterCell( row, 'xxxxxxx', '11111', 'xxxxxxxxx' );
        makeFormatterCell( row, 'xxxxxxx', '11111', 'xxxxxxxxx' );
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
                  .html('Model Data')
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
        makeCl( row, 'a', 'c', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'balance-parameters' );
        makeCl( row, 'b', '1-c', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'balance-parameters' );

        var row = $$.c('tr')
            //.addClass('tostroke')
            .to(tb)();
        makeCl( row, 'g', 'g', null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'g-parameter' );

        var row = $$.c('tr')
            .to(tb)();
        makeCl( row, 'alpha', null, null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'angle-alpha' );
        makeCl( row, 'beta', null, null, null, !'alignCaptionToRight', 'proof', !'skipEqualSign', 'angle-beta' );
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
        var tr = ssF.tr;
        //todm: ?no need for extra function argument:
        //      tp-cssName may be taken from "rg.Elem point wrap" ...
        cssName = (cssName || mname ).replace( /([A-Z])/g, ( match, key1 ) => (
                      '_' + key1.toLowerCase()
        ));

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

