( function() {
    var SUB_MODEL   = 'common';
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
    var sDomF   = sn('dfunctions',sapp);
    var studyMods = sn('studyMods', sapp);

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
    var tableCaptionFun;

    var stdMod;
    return;








    function setModule()
    {
        stdMod = sn( SUB_MODEL, studyMods );
        stdMod.upcreate_mainLegend = upcreate_mainLegend;
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
    //      at this lemma, it is called from
    //      slider;
    //=========================================
    function upcreate_mainLegend()
    {
        tableCaptionFun();

        //ccc( 'does upcreate_mainLegend' );
        var ww = clustersToUpdate;
        ww.time.innerHTML       = rg.displayTime.value;
        ww.step.innerHTML       = rg.displayStep.value;
        ww.thought.innerHTML    = rg.thoughtStep.value;

        var stepIx = rg.stepIx.value;
        if( stepIx > 0 ) {
            var force = rg.forces.vectors[stepIx-1];
            var fx = force[0];
            var fy = force[1];
            var fabs = Math.sqrt( fx*fx + fy*fy );
            ww.force.innerHTML = fabs.toFixed(3);
            ww.fx.innerHTML = fx.toFixed(3);
            ww.fy.innerHTML = fy.toFixed(3);
        }
        var speed = rg.speeds.pos[stepIx-1];
        if( speed ) {
            var vx = speed[0].toFixed(3);
            var vy = speed[1].toFixed(3);
            var vabs = Math.sqrt( vx*vx + vy*vy ).toFixed(3);
        //} else {
        //    var vx = '';
        //    var vy = '';
        //    var vabs = '';
        }
        ww.speed.innerHTML = vabs;
        ww.vx.innerHTML = vx;
        ww.vy.innerHTML = vy;
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
        //:Abd Ace
        var row = $$.c('tr')
            .addClass('proof row1')
            .addClass('tostroke')
            .to(tb)();              
        makeFormatterCell( row, 'speedv0', '11111', 'firstxxxxx' );
        makeFormatterCell( row, 'speedvx', '11111', 'secondxxxx' );
        makeFormatterCell( row, 'speedvy', '11111', 'thirdxxxxx' );
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
        //prepares force parameters
        var forceColor = sDomF.getFixedColor( 'field' );
        tableCaptionFun = function() {
            var cap = 'Centripetal force f = ' +  rg.force.lawConstant.toFixed(2) +
                    ' r<sup>' + rg.force.lawPower.toFixed(2) + '</sup>';
            tableCaption$.html( cap );
        }
        var row = $$.c('tr').to(tb)();
        var tableCaption$ = $$.c('td').a('colspan','9')
                  .addClass('table-caption')
                  .css( 'color', forceColor )
                  .cls( 'tp-field' )
                  .to(row);
        //===================
        // \\// table caption
        //===================

        // begins filling data rows

        //===================
        // //\\
        //===================
        //:time
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'time' );

        //---------------------------------------
        //todm make sure this change is correct
        //makeCl( row, 'step' );
        makeCl( row, 'step', 'motion' ); //second par really sets caption in table
        //---------------------------------------

        //makeCl( row, 'thought' );
        // format( see below: ) row, mname, mcaption, spanIx, spanVal, alignCaptionToRight, 'claim' 
        //                           mname - is a "vital" name: does indexing of cluster-to-update,
        //                                   seems goes to tp-"name" machinery,
        makeCl( row,
                'thought',
                ']no caption[', // mcaption,
                2,   // spanIx,
                2,   // spanVal,
                '',  // alignCaptionToRight,
                '',  // 'claim'
                !!'no equal sign'
        );
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'force', '<b>p</b>', null, null, !!'alignCaptionToRight', 'proof' );
        makeCl( row, 'fx', 'px', null, null, !!'alignCaptionToRight', 'proof' );
        makeCl( row, 'fy', 'py', null, null, !!'alignCaptionToRight', 'proof' );
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'speed', null, null, null, !!'alignCaptionToRight', 'proof' );
        makeCl( row, 'vx', null, null, null, !!'alignCaptionToRight', 'proof' );
        makeCl( row, 'vy', null, null, null, !!'alignCaptionToRight', 'proof' );

        //===================
        // \\//
        //===================
        return;


        function makeCl(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
                claim0proof, noEqualSign
         ) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
                'proof', noEqualSign );
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
                         alignCaptionToRight, claim0proof, noEqualSign )
    {
        var tr = ssF.tr;
        var cssName = sDomF.topicIdUpperCase_2_underscore( mname );

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

