( function() {
    var { sData, }
        = window.b$l.apptree({ stdModExportList : { customXLegend}, });
    return;


	function customXLegend() {
		return {
			legendText	: sData.GRAPH_PATH ? 'Distance along arc' : 'Distance from force center, r',
			legendX	: -520,
		}
	}
}) ();