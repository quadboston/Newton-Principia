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
        //create_digital_legend_for_logic_phase( 'claim' ); //todo: remove
        create_digital_legend_for_logic_phase( 'proof' );
    }

    function create_digital_legend_for_logic_phase( logic_phase )
    {
        //console.log('create_digital_legend'); //called once per phase, all on page load

        ////**********************************************************************************
        ////legendScript-format:
        ////[topic, caption, JS-expression-of-value-in-local-JS-context]
        ////
        ////see: function dataSourceParsed1__2__makesBodyCluster({
        ////
        ////**********************************************************************************

        var legendScriptParsed = [
            [['e', 'eccentricity', 'op.eccentricity']],
            [['L,LL', 'L', getL()]],
            [['SP', 'SP', 'rg.SP.abs']],
            [['PK', 'KP', 'rg.PK.abs']],
            [['eqn merge-cells', '', getEqn()]],
        ];

        function getL() {
            return `
                let L = rg['L,LL'].value;
                ssF.line2abs( 'SP' );
                ssF.line2abs( 'PK' );
                let SP = 2*rg.SP.abs.toFixed(3);
                let PK = 2*rg.PK.abs.toFixed(3);
                let SPPK = SP + PK;
                if(Math.abs(SPPK-L) < 0.01) L = SPPK; // to account for rounding error

                L
            `;
        }

        function getEqn() {
            return `
                let e = op.eccentricity;
                let L = rg['L,LL'].value;
                ssF.line2abs( 'SP' );
                ssF.line2abs( 'PK' );
                let SP = 2*rg.SP.abs.toFixed(3);
                let PK = 2*rg.PK.abs.toFixed(3);
                let SPPK = SP + PK;

                if(Math.abs(SPPK-L) < 0.01) {
                    //console.log('L: ' + L + ' SPPK: ' + SPPK)
                    L = SPPK; // to account for rounding error
                }

                //todo: table gets updated 3x on tab load, 
                //continuously while mouse is down and moving,
                //and once more after mouseEnd, which causes a weird jump
                
                //console.log('SPPK: ' + SPPK);

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
            //console.log('updates table'); //called 12x when switching to tab with table, then 4x each time model moves
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

