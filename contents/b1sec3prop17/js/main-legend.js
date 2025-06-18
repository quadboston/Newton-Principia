( function() {
    var {
        ssF, stdMod
    } = window.b$l.apptree({
        stdModExportList : {
            create_digital_legend,
        },
    });
    return;


    function create_digital_legend()
    {
        create_digital_legend_for_logic_phase( 'proof' );
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
            [['L,LL', 'L', "rg[ 'L,LL' ].value"]],
            [['SP', 'SP', 'rg.SP.abs']],
            [['PK', 'KP', 'rg.PK.abs']],
            [['eqn merge-cells', '', getEqn()]],
        ];

        function getEqn() {
            return `
                let e = op.eccentricity;
                let L = rg['L,LL'].value;
                ssF.line2abs( 'PK' );
                let SP = 2*rg.SP.abs;
                let PK = 2*rg.PK.abs;
                let SPPK = SP + PK;

                console.log(SPPK);

                if(L === SPPK) 'L = 2SP + 2KP (parabola)'
                else if(L < SPPK) 'L < 2SP + 2KP (ellipse)'
                else 'L > 2SP + 2KP (hyperbola)'
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

