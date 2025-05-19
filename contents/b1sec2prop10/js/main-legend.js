( function() {
    var {  ns, sn, $$, sconf, rg, ssF, stdMod, toreg, amode, } 
        = window.b$l.apptree({ stdModExportList : { create_digital_legend, }, });
    return;

    
    function create_digital_legend()
    {
        return; //todo: remove this return once rg.tForSagitta.val is defined
        create_digital_legend_for_logic_phase( 'claim' );
        create_digital_legend_for_logic_phase( 'proof' );
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
            [['dtime<_>data-monospace', 'Δt', '(rg.tForSagitta.val*2).toFixed(4)']]
        ];

        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;

        ssF.createLogic_phaseLegend({
            tableCaption    : '',
            noTableTitle    : true,
            stdMod_given    : stdMod,
            logic_phase,
            rowsCount,
            clustersCount,
            makesBodyCluster,
            updatesDataInCell,
        });

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
        
    }
    //=========================================
    // \\// creates logic_phase table
    //=========================================

}) ();

