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
            [['e', 'eccentricity', 'op.eccentricity']],
            [['conic', 'conic', getEqn()]],
        ];

        function getEqn() {
            return `
                let e = op.eccentricity;

                if(e > 1.0001) 'hyperbola'
				else if(e < 0.004) 'circle'
                else if(e < 0.9999) 'ellipse'
                else 'parabola'
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

		function reportEccentricityAs0WhenNearlyCircle() {
			// threshold should match getEqn()
			legendScriptParsed[0][0][2] = op.eccentricity < 0.004 ?
				 0 : 'op.eccentricity';
		}

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
			
			reportEccentricityAs0WhenNearlyCircle();
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

