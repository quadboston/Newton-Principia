( function() {
    var {
        $$, ssF, rg, stdMod
    } = window.b$l.apptree({
        stdModExportList : {
            create_digital_legend,
        },
    });
    return;


    function create_digital_legend()
    {
        create_digital_legend_for_logic_phase( 'proof' );
        create_digital_legend_for_logic_phase( 'claim' );
        create_digital_legend_for_logic_phase( 'corollary' );
    }

    function create_digital_legend_for_logic_phase( logic_phase )
    {
        ////**********************************************************************************
        ////legendScript-format:
        ////[topic, caption, JS-expression-of-value-in-local-JS-context]
        ////
        ////see: function dataSourceParsed1__2__makesBodyCluster({
        ////
        ////**********************************************************************************

        var legendScriptParsed = [
            [['dtime<_>data-monospace', 'Δt', '(rg.tForSagitta.val*2).toFixed(4)']],
            [['P<>sagitta<_>data-monospace', 'Estimated_force_at_P', 'stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[1].toFixed(4)']],
            [['force<_>data-monospace', 'Actual_force_at_P', 'stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[0].toFixed(4)']]
        ]

        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;

        ssF.createLogic_phaseLegend({
            tableCaption    : '',
            noTableTitle    : true,
            stdMod_given    : stdMod,
            logic_phase,
            rowsCount,
            clustersCount,
            //makesCaptionCluster, //optional
            //updatesCaptionCluster, //optional
            makesBodyCluster,
            updatesDataInCell,
            createsIdleFirstRow_forFormat,
        })
        return;



        function makesBodyCluster({ rowIx, clusterIx, }){
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
            })
        }

        function updatesDataInCell({ rowIx, clusterIx, })
        {
            return ssF.dataSourceParsed1__2__updatesDataInCell({
                rowIx,
                clusterIx,
                legendScriptParsed,
            })
        }
        
        function createsIdleFirstRow_forFormat( tb, logic_phase )
        {
            //=====================================================
            // //\\ idle first row to format table for fixed-layout
            //=====================================================
            var row = $$.c('tr')
                //vital ... removes global css which corrupts table
                //aka .addClass( 'proof row1 tostroke' )
                .addClass( logic_phase +' tostroke')

                .css( 'visibility', 'hidden' ) //todm ... tmp fix
                .to(tb)
                ();
            //:todm ... kitchen ... non-reliable
            $$.c('td').html( 'Estimated-force-s--at-P-(per-smax)xxxxxxx' ).to(row);
            $$.c('td').html( '-0.333' ).to(row);
            $$.c('td').html( '-0.333xxx' ).to(row);
            //=====================================================
            // \\// idle first row to format table for fixed-layout
            //=====================================================
        }
        
    }
    //=========================================
    // \\// creates logic_phase table
    //=========================================

}) ();

