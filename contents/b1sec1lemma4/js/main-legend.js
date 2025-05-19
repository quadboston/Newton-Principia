( function() {
    var {
        rg, ssF, stdMod,
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
        ////[ topic, caption, JS-expression-of-value-in-local-JS-context ]
        ////
        ////see: function dataSourceParsed1__2__makesBodyCluster({
        ////**********************************************************************************

        var legendScriptParsed = [
            [
                ['none', '', 'null'],
                ['none', '', '"left area:"'],
                ['none', '', '"right area:"'],
                ['none', '', '"left / right ratio:"']
            ],
            [
                ['none', '', '"bar to bar ratio:"'],
                ['none', '', '""'],
                ['none', '', '""'],
                ['none', '', '"min:"+rg.barRatioMin.val+"  "+"max:"+rg.barRatioMax.val']
            ],
            [
                ['none', '', '"bars sum:"'],
                ['leftBarsArea', '', 'rg.leftBarsArea.value'],
                ['rightBarsArea', '', 'rg.rightBarsArea.value'],
                ['barsRatio', '', 'rg.leftBarsArea.value/rg.rightBarsArea.value']
            ],
            [
                ['none', '', '"figure:"'],
                ['acE', '', 'rg.leftFunction.funArea'],
                ['prT', '', 'rg.rightFunction.funArea'],
                ['figuresRatio', '', 'rg.leftFunction.funArea/rg.rightFunction.funArea']
            ]
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

