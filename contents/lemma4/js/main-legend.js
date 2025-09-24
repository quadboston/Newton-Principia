( function() {
    var { ssF, stdMod } = window.b$l.apptree({
        stdModExportList : { create_digital_legend, }, });
    return;

    //TEMP This file is used by L4 only
    function create_digital_legend()
    {
        //TEMP Once the text area is updated for L4, double check that the data
        //table is visible for the following tabs.
        create_digital_legend_for_logic_phase( 'claim' );
        create_digital_legend_for_logic_phase( 'proof' );
        create_digital_legend_for_logic_phase( 'corollary' );
    }

    function create_digital_legend_for_logic_phase( logic_phase )
    {
        //called once per phase, all on page load
        //console.log('create_digital_legend'); 

        ////********************************************************************
        ////legendScript-format:
        ////[topic, caption, JS-expression-of-value-in-local-JS-context]
        ////
        ////see: function dataSourceParsed1__2__makesBodyCluster({
        ////
        ////********************************************************************

        var legendScriptParsed = [
            [[
                'figure',
                'AacE : PprT',
                'rg.exact_ratio.value'
            ]],
            [[
                'inscribed-rectangles',
                'ratio of corresponding parallelograms, AacE : PprT',
                'rg.sum_ratio.value'
            ]],
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
            //called 12x when switching to tab with table, then 4x each time model moves
            //console.log('updates table'); 

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

