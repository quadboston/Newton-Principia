( function() {
    var {
        $$, ssF, sData, rg, stdMod
    } = window.b$l.apptree({
        stdModExportList : {
            create_digital_legend,
        },
    });
    return;


    function create_digital_legend()
    {
        //see lemma 11 for the sample
        create_digital_legend_for_logic_phase( 'proof' );
        create_digital_legend_for_logic_phase( 'corollary' );
    }

    function create_digital_legend_for_logic_phase( logic_phase )
    {
        ////**********************************************************************************
        ////legendScript-format:
        ////[ topic, caption, JS-expression-of-value-in-local-JS-context ]'
        ////
        ////see: function dataSourceParsed1__2__makesBodyCluster({
        ////
        ////**********************************************************************************
        
        ///how this can be a topic? dtime<_>data-monospace
        ///is not dtime a topic only,
        ///
        ///yes commend does mislead, the first token is tpCssName
        ///and goes to css-class after <_> is replaced with space,
        
        ///but still misleads, "data-monospace" used nowhere, it is just 
        ///deleted, but other token are not and will go to css-class,
        ///just append any number of them separated with <_>

        var legendScriptParsed = [
            [['dtime<_>data-monospace', 'Δt', '(rg.tForSagitta.val*2).toFixed(4)']],
            [['_s_p', 'SP', 'rg.SP.vector.abs.toFixed(4)']],
            [['_r_l', 'RL', 'rg.RL.vector.abs.toFixed(4)']],
            [['_p_v', 'PV', 'rg.PV.vector.abs.toFixed(4)']],
            [['estimated_force<_>data-monospace', 'Estimated_force_at_P', 'stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[4].toFixed(4)']],
            [['force<_>data-monospace', 'Actual_force_at_P', 'stdMod.graphFW_lemma.graphArray[stdMod.pos2qix()].y[0].toFixed(4)']],
        ];

        var rowsCount       = legendScriptParsed.length;
        var clustersCount   = legendScriptParsed[0].length;
        //--------------------------
        // \\// data source scenario
        //--------------------------

        ssF.createLogic_phaseLegend({
            tableCaption    : 'Areas and Ratios',
            noTableTitle    : false,
            stdMod_given    : stdMod,
            logic_phase,
            rowsCount,
            clustersCount,
            //makesCaptionCluster, //optional
            //updatesCaptionCluster, //optional
            makesBodyCluster,
            updatesDataInCell,
        });

        function makesBodyCluster({ rowIx, clusterIx, }){
            return ssF.dataSourceParsed1__2__makesBodyCluster({
                rowIx,
                clusterIx,
                legendScriptParsed,
                //noEqualSign : true,
                alignCaptionToRight : true,
            })
        }

        function updatesDataInCell({ rowIx, clusterIx, })
        {
            //patch: disables second row of the table, the raw of dt
            rg[ 'main-legend' ][ logic_phase ].tableDom.children[1].style.display = 'none';
            
            return ssF.dataSourceParsed1__2__updatesDataInCell({
                rowIx,
                clusterIx,
                legendScriptParsed,
                noEqualSignInNumber : true,
            })
        }        
    }

}) ();

