( function() {
    var { sData, stdMod, }
        = window.b$l.apptree({ stdModExportList : { createsGraph_FW_lemma, }, });
    return;


    function createsGraph_FW_lemma({ digramParentDom$ }){
        const graphFW = {};
        stdMod.createsGraphFW_class({
            graphFW,
            digramParentDom$,
            customXLegend,
        });
		//first array must be enabled
        //but can be dynamically overridden,
        return graphFW;

		function customXLegend() {
			return {
				legendText	: sData.GRAPH_PATH ? 'Distance along arc' : 'Distance from force center, r',
				legendX	: -520,
			}
		}
    }
}) ();