( function() {
    var {
        $$,
        sDomN, sDomF, ssF,
        stdMod, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            upcreate_mainLegend,
            create_digital_legend,
        },
    });
    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];
    var tableCaptionFun;
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
    //      at this lemma, it is called from
    //      slider;
    //=========================================
    function upcreate_mainLegend()
    {
        tableCaptionFun();

        //c cc( 'does upcreate_mainLegend' );
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
            .to( stdMod.legendRoot$ )
            ();


        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        //:Abd Ace
        var row = $$.c('tr')
            .addClass('proof row1')
            .addClass('tostroke')
            .to(tb)();              
        makeFormatterCell( row, 'speedv0', '111', 'firstx' );
        makeFormatterCell( row, 'speedvx', '111', 'second' );
        makeFormatterCell( row, 'power_step', '111', 'thirdx' );
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
        makeCl( row, 'time', 'time', null, null, !!'alignCaptionToRight' );

        //---------------------------------------
        //todm make sure this change is correct
        //makeCl( row, 'step' );
        makeCl( row, 'step', 'motion', null, null, !!'alignCaptionToRight' );
        //---------------------------------------

        //makeCl( row, 'thought' );
        // format( see below: ) row, mname, mcaption,
        //                      spanIx, spanVal, alignCaptionToRight, 'claim' 
        //                      mname - is a "vital" name: does indexing of cluster-to-update,
        //                              seems goes to tp-"name" machinery,
        makeCl( row,
                'thought',
                'proof step', // mcaption,
                null,         // spanIx,
                null,         // spanVal,
                'yes',        // alignCaptionToRight,
                'proof',      // 'claim'
                //            // !'no equal sign'
        );
        //makeCl( row, 'thought', 'py', null, null, !!'alignCaptionToRight', 'proof' );

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
        if( claim0proof === 'claim' ) {
            clustersToUpdate_claim[mname] = c$();
        } else {
            clustersToUpdate[mname] = c$(); //updateeCell;
        }
        return c$;
    }



}) ();

