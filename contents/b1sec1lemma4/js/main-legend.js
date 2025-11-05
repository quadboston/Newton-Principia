( function() {
    var { ssF, stdMod } = window.b$l.apptree({
        stdModExportList : { create_digital_legend, }, });
    return;


    //TEMP This file is used by L4 only
    function create_digital_legend()
    {
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
                'figuresRatio',
                'A𝑎𝑐E : P𝑝𝑟T',
                getMonotonic('rg.exact_ratio.value')
            ]],
            [[
                'parallelogramsRatio',
                'ratio of corresponding parallelograms, A𝑎𝑐E : P𝑝𝑟T',
                getMonotonic('rg.sum_ratio.value')
            ]],
        ];


        function getMonotonic(val) {
            return `
                fapp?.stdL2?.study?.areBothFiguresMonotonic() ?
                ${val} :
                "<span class='limit'>N/A<span>";
                `;
        }


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

