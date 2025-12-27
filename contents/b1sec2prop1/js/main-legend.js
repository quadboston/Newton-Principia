( function() {
    var {
        $$, sDomF, stdMod, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList : {
            upcreate_mainLegend,
            create_digital_legend,
        },
    });
    var clustersToUpdate = {};
    var clustersToUpdate_claim = {};
    var clustersToUpdate_corollary = {};
    return;


    ///this function is called from common-application-library,
    ///from full-app/dom/...
    function create_digital_legend()
    {
        var mlegend = toreg( 'main-legend' )();
        doCreateTables( mlegend );
    }

    //=========================================
    // //\\ updates values during simulation
    //      at this lemma, it is called from
    //      slider;
    //=========================================
    function upcreate_mainLegend (){
       //console.log( 'upcreate_mainLegend' );
        var ww = clustersToUpdate;
        var wwc = clustersToUpdate_corollary;
        ww.step.innerHTML = rg.displayPathStep.value + '';
        var stepIx = rg.stepIx.value;

        var speed = rg.speeds.pos[stepIx-1];
        if( speed ) {
            var vx = speed[0].toFixed(3);
            var vy = speed[1].toFixed(3);
            var vabs = Math.sqrt( vx*vx + vy*vy ).toFixed(3);
        }
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

    function doCreateTables(mlegend)
    {
        //console.log('doCreateTables');
        //==========================
        // //\\ proof
        //==========================
        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.proof = $$
            .c('table')
            .cls( 'main-legend proof' )
            .to( stdMod.legendRoot$ )
            ();

        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'step', 'path step' );
        //==========================
        // \\// proof
        //==========================


        //-----------------------------------------------------
        // //\\ corollary 1
        //-----------------------------------------------------
        var tbc = mlegend.tb.corollary = $$
            .c('table')
            .cls( 'main-legend corollary' )
            .to( stdMod.legendRoot$ )
            ();

        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        makeCl( row, 'speed', 'velocity', 'corollary' );
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        makeCl( row, 'SP', 'perpendicular', 'corollary' );
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        var row = $$.c('tr')
            .addClass('tostroke')
            .to(tbc)();
        makeCl( row, 'vp', 'velocity * perpendicular', 'corollary' );
        //-----------------------------------------------------
        // \\// corollary 1
        //=====================================================
    }

    //=========================================
    //
    //=========================================
    ///Makes:  magnitude's cluster in table,
    ///Effect: represents magnitude in html-table-row in
    ///        form "mname = mvalue",
    ///Input:  mname = magnitude name, just an ID of a cell and
    ///        tip for the css-class
    function makeCl( row, mname, mcaption, table_logic_phase )
    {
        var cssName = sDomF.topicIdUpperCase_2_underscore( mname );

        if( mcaption !== ']no caption[' ) {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .addClass('tostroke tocolor tobold tp-' + cssName)
                       .to(row);
        }

        var c$ = $$.c('td')
                   .cls('value')
                   .cls('tostroke tocolor tobold tp-'+cssName)
                   .to(row);
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

}) ();

