( function() {
    var {
        $$, has,
        amode, sDomN, sDomF, ssF,
        stdMod, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList : {
            upcreate_mainLegend,
            create_digital_legend,
        },
    });
    var clustersToUpdate = {};
    var clustersToUpdate_claim = {};
    var clustersToUpdate_corollary = {};
    var tableCaptionFun;
    return;


    ///this function is called from common-application-library,
    ///from full-app/dom/...
    function create_digital_legend (){
        var mlegend = toreg( 'main-legend' )();
        doCreateTables( mlegend );
    }

    //=========================================
    // //\\ updates values during simulation
    //      at this lemma, it is called from
    //      slider;
    //=========================================
    function upcreate_mainLegend (){
        tableCaptionFun();
        var ww = clustersToUpdate;
        var wwc = clustersToUpdate_corollary;
        ww.time.innerHTML       = rg.displayTime.value;
        ww.step.innerHTML       = rg.displayPathStep.value + '';
        ww.thought.innerHTML    = rg.thoughtStep.value;
        var stepIx = rg.stepIx.value;
        var fullDtRev = 1/rg.rgslid_dt.val * 2;
        var speed = rg.speeds.vect[stepIx-1];
        if( speed ) {
            var vx = speed[0].toFixed(3);
            var vy = speed[1].toFixed(3);
            var vabs = Math.sqrt( vx*vx + vy*vy ).toFixed(3);
        }
        ww.speed.innerHTML = vabs;
        wwc.speed.innerHTML = vabs;
        //------------------------
        // //\\ perpendicular
        //------------------------
        {
            let p = rg.P.p.abs;
            wwc.SP.innerHTML = p.toFixed(3);
            wwc.vp.innerHTML = (p*vabs).toFixed(2);
        }
        //------------------------
        // \\// perpendicular
        //------------------------
    }
    //=========================================
    // \\// updates values during simulation
    //=========================================
    function doCreateTables(mlegend ){
        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.proof = $$
            .c('table')
            .cls( 'main-legend proof' )
            .to( stdMod.legendRoot$ )
            ();

        var tbc = mlegend.tb.corollary = $$
            .c('table')
            .cls( 'main-legend corollary' )
            .to( stdMod.legendRoot$ )
            ();
        //:Abd Ace
        var row = $$.c('tr')
            .addClass('proof row1')
            .addClass('tostroke')
            .to(tb)();

        //apparently caption meaning has no importance
        makeFormatterCell( row, 'xxxxxxxxxxxx', '111', 'firstx' );
        makeFormatterCell( row, 'xxxxxxxxxxxx', '111', 'second' );
        makeFormatterCell( row, 'xxxxxxxxxxxx', '111', 'thirdx' );

        //-------------------------------
        // //\\ coroll table
        //-------------------------------
        var row = $$.c('tr')
            .addClass('corollary row1')
            .addClass('tostroke')
            .to(tbc)();
        makeFormatterCell( row, 'some1xxxxxxxxxxxxxxx', '111', 'firstx' );
        //we don't need it, but this is a way around to push
        //contents from right to the left for nicer aligment:
        makeFormatterCell( row, 'some2xxxxxxxxxxxxxxx', '111', 'firstx' );
        //-------------------------------
        // \\// coroll table
        //-------------------------------

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
        var forceColor = sDomF.tpid0arrc_2_rgba( 'force' );
        //tableCaptionFun = function( isAddendum ) {
        tableCaptionFun = function() {
            var arr = rg.force.inarray;
            if( amode.aspect === 'model' ) {
                let list = 'k<sub>B,C,D,E,F</sub>=';
                arr.forEach( (f,fix) => {
                    list += f.lawConstant.toFixed(2);
                    if( fix<arr.length-1 ) {
                        list += ', ';
                    }
                });
                var cap = 'Centripetal force f = k<sub>X</sub>' +
                        ' r<sup>' + rg.force.lawPower.toFixed(2) + '</sup>, ' +
                        list + '.';
            } else {
                var cap = '';
                /*
                //shows all forces
                let list = 'f<sub>B,C,D,E,F</sub>=';
                arr.forEach( (f,fix) => {
                    list += arr[ fix ].forceAbs.toFixed(2);
                    if( fix<arr.length-1 ) {
                        list += ', ';
                    }
                })
                var cap = 'Centripetal force ' +
                          list + '.';
               */
            }
            tableCaption$.html( cap );
        }
        var row = $$.c('tr').to(tb)();
        var tableCaption$ = $$.c('td').a('colspan','9')
                  .addClass('table-caption')
                  .css( 'color', forceColor )
                  .cls( 'tp-force' )
                  .to(row);
        //===================
        // \\// table caption
        //===================

        // begins filling data rows

        //==========================
        // //\\ time
        //==========================
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'time', 'time', null, null, !!'alignCaptionToRight' );

        //---------------------------------------
        makeCl( row, 'step', 'path step', null, null, !!'alignCaptionToRight' );
        //---------------------------------------
        //==========================
        // \\// time
        //==========================



        //=====================================
        // //\\ alternative row
        //=====================================
        var row = $$.c('tr')
            .addClass('tostroke')
            .cls( 'tr-logical-step' )
            .to(tb)();
        makeCl( row,
                'thought0',
                ' ', // mcaption,
                null,         // spanIx,
                null,         // spanVal,
                'yes',        // alignCaptionToRight,
                'proof',      // 'claim'
                !!'no equal sign'
        );
        makeCl( row,
                'thought',
                'logical step', // mcaption,
                null,         // spanIx,
                null,         // spanVal,
                'yes',        // alignCaptionToRight,
                'proof',      // 'claim'
                //            // !'no equal sign'
        );
        //=====================================
        // \\// alternative row
        //=====================================

        /*
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'impulse', 'p=2<span class="tp-force tocolor tobold">f</span>∆t', null, null, !!'alignCaptionToRight', 'proof' );
        */
        //perhaps good for model
        /*
        makeCl( row, 'fx', 'px', null, null, !!'alignCaptionToRight', 'proof' );
        makeCl( row, 'fy', 'py', null, null, !!'alignCaptionToRight', 'proof' );
        */

        //-----------------------------------------------------
        // //\\ speed
        //-----------------------------------------------------
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'speed', 'velocity', null, null,
                !!'alignCaptionToRight', 'proof' );

        //perhaps good for model
        /*
        makeCl( row, 'vx', null, null, null, !!'alignCaptionToRight', 'proof' );
        makeCl( row, 'vy', null, null, null, !!'alignCaptionToRight', 'proof' );
        */
        //-----------------------------------------------------
        // \\// speed
        //-----------------------------------------------------

        //-----------------------------------------------------
        // //\\ perpendicular
        //-----------------------------------------------------
        //corollary:
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        makeCl( row, 'speed', 'velocity, v', null, null,
                !!'alignCaptionToRight', 'corollary' );
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        makeCl( row, 'SP', 'perpendicular, p', null, null, !!'alignCaptionToRight', 'corollary' );
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        makeCl( row, 'vp', null, null, null, !!'alignCaptionToRight', 'corollary' );
        //-----------------------------------------------------
        // \\// perpendicular
        // \\//
        //===================
        return;


        function makeCl(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
                table_logic_phase, noEqualSign
         ) {
            return makeClBoth(
                row, mname, mcaption, spanIx, spanVal, alignCaptionToRight,
                table_logic_phase, noEqualSign );
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
    ///Input:  mname = magnitude name, just an ID of a cell and
    ///        tip for the css-class
    function makeClBoth( row, mname, mcaption, spanIx, spanVal,
                         alignCaptionToRight, table_logic_phase, noEqualSign )
    {
        var cssName = sDomF.tpid2low( mname );

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
        switch ( table_logic_phase ) {
            case 'claim':
                clustersToUpdate_claim[mname] = c$();
                break;
            case 'corollary':
                clustersToUpdate_corollary[mname] = c$();
                break;
            default:
                clustersToUpdate[mname] = c$();
                break;
        }
        return c$;
    }
})();

