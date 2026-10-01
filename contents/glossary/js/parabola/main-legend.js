( function() {
    var { ssF, amode, } = window.b$l.apptree({ stdModExportList : {
        create_digital_legend, }, });
    return;


	function create_digital_legend() {
		var legendScriptParsed = [
			[['dtime<_>data-monospace', 'Qv', 'mat.lengthOf(rg.Q, rg.v).toFixed(2)'],
				['dtime<_>data-monospace', 'Qv²','mat.squaredDistance(rg.Q, rg.v).toFixed(2)']],
			[['dtime<_>data-monospace', 'Pv','mat.lengthOf(rg.P, rg.v).toFixed(2)'],
				['dtime<_>data-monospace', 'Qv²/Pv','(mat.squaredDistance(rg.Q, rg.v) / mat.lengthOf(rg.P, rg.v)).toFixed(2)']]
		];
		var rowsCount       = legendScriptParsed.length;
		var clustersCount   = legendScriptParsed[0].length;
		ssF.createLogic_phaseLegend({
			noTableTitle    : true,
			logic_phase :  'claim',
			tableVisibilityCondition : () => amode.subessay === 'latus-rectum-parabola',
			rowsCount,
			clustersCount,
			makesBodyCluster,
			updatesDataInCell,
		});

		function makesBodyCluster({ rowIx, clusterIx, }) {
			return ssF.dataSourceParsed1__2__makesBodyCluster({
				rowIx,
				clusterIx,
				legendScriptParsed,
			})
		}

		function updatesDataInCell({ rowIx, clusterIx, }) {
			return ssF.dataSourceParsed1__2__updatesDataInCell({
				rowIx,
				clusterIx,
				legendScriptParsed,
			})
		}
	}

}) ();
