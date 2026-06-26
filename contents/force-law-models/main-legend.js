( function() {
    var { ssD, ssF, stdMod, sconf, rg, } = window.b$l.apptree({
		stdModExportList : { create_digital_legend, }, });
    return;
	
	
	function create_digital_legend()
	{
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
			[['dtime<_>data-monospace', 'Δt', '(ssD.Dt*2).toFixed(4)']]
			//TEMP
			// [['dtime<_>data-monospace', 'Δt', '(15).toFixed(4)']]
		];

		var rowsCount       = legendScriptParsed.length;
		var clustersCount   = legendScriptParsed[0].length;

		ssF.createLogic_phaseLegend({
			tableCaption    : 'Δt',
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
			//TEMP Test code to calculate Dt when q is the free variable, every
			//time the data table needs to be updated.  It will likely need to
			//be moved elsewhere.
            // const Pqix = rg.P.qix;
			// const qP = qIndexToOrbit[ Pqix ].q;
			// stdMod.convert_q_to_time(qP);

			// console.log("*****updatesDataInCell")
			// console.log("rg.P.qix =", rg.P.qix);
			const Porb = ssD.qIndexToOrbit[ rg.P.qix ];
			// console.log("Porb.qix =", Porb.qix);
			// console.log("Porb =", Porb);
			// const qP = Porb.q;
			// console.log("qP =", qP);
			// console.log("ssD.Dq =", ssD.Dq);
			// const qQ2 = qP + ssD.Dq;
			// console.log("qQ2 =", qQ2);

			const qQ = Porb.plusQ;
			// console.log("qQ =", qQ);
			const time = stdMod.convert_q_to_time(qQ, true);


			//TEMP null tests
			// console.log("*****Start Tests");
			// test_convert_q_to_time(sconf.orbit_q_start-0.000000001);
			// test_convert_q_to_time(sconf.orbit_q_start-0.000000001, true);

			// test_convert_q_to_time(sconf.orbit_q_start);
			// test_convert_q_to_time(sconf.orbit_q_start, true);

			// test_convert_q_to_time(sconf.orbit_q_end);
			// test_convert_q_to_time(sconf.orbit_q_end, true);

			// test_convert_q_to_time(sconf.orbit_q_end+0.000000001);
			// test_convert_q_to_time(sconf.orbit_q_end+0.000000001, true);

			// function test_convert_q_to_time(q, clamp) {
			// 	console.log(`test convert_q_to_time(${q}, ${clamp}) =`,
			// 		stdMod.convert_q_to_time(q, clamp));
			// }
			// console.log("*****End Tests");
			//TEMP null tests//


			// console.log("time =", time);
			// console.log("timeP =", Porb.timeAtQ);

			const timeDeltaTemp = time - Porb.timeAtQ;
			console.log("Δt =", timeDeltaTemp);
			// const qixL = stdMod.convert_q_to_time(qQ);
			// console.log("qixL =", qixL);

			//TEMP
			// console.log("Updating data table");
			// const testNumber = ssD.Dq;
			// var legendScriptParsed2 = [
			// 	[['dtime<_>data-monospace', 'Δt', `${(testNumber).toFixed(4)}`]]
			// ];
			return ssF.dataSourceParsed1__2__updatesDataInCell({
				rowIx,
				clusterIx,
				//TEMP
				// legendScriptParsed: legendScriptParsed2,
				legendScriptParsed,
			})
		}
	}
}) ();
