( function() {
    var {
        ssF, stdMod, topicColors_repo
    } = window.b$l.apptree({
        stdModExportList : {
            create_digital_legend,
        },
    });
    return;


    function create_digital_legend()
    {
        create_digital_legend_for_logic_phase( 'claim' );
        create_digital_legend_for_logic_phase( 'proof' );
        create_digital_legend_for_logic_phase( 'corollary' );
    }

    function create_digital_legend_for_logic_phase( logic_phase )
    {
        const {
            given,
            proof
        } = topicColors_repo;

        //--------------------------
        // //\\ data source scenario
        //--------------------------
        ////legendScript-format: 'topic,caption,JS-expression-of-value-in-local-JS-context'

        var legendScriptParsed = [
            [['BD-bd', `<span style="color:rgb(${given})">BD</span> : <span style="color:rgb(${proof})">bd</span>`, 'rg.BD.abs/rg.bd.abs']], 
            [['AB2-Ab2', `<span style="color:rgb(${given})">AB²</span> : <span style="color:rgb(${proof})">Ab²</span>`, 'rg.AB.abs2/rg.Ab.abs2']],
            [[ 
                'ratio', 
                `(<span style="color:rgb(${given})">BD</span> : <span style="color:rgb(${proof})">bd</span>) : (<span style="color:rgb(${given})">AB²</span> : <span style="color:rgb(${proof})">Ab²</span>)`, 
                '(rg.BD.abs/rg.bd.abs) / (rg.AB.abs2/rg.Ab.abs2)'
            ]]
        ];

        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;
        //--------------------------
        // \\// data source scenario
        //--------------------------

        ssF.createLogic_phaseLegend({
            stdMod_given : stdMod,
            logic_phase,
            rowsCount,
            clustersCount,
            noTableTitle : true,
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

