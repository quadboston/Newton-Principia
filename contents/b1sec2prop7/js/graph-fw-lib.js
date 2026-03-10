( function() {
    var { stdMod }
        = window.b$l.apptree({ stdModExportList : { createsGraph_FW_lemma, }, });
    return;


    function createsGraph_FW_lemma({ digramParentDom$ }){
        const graphFW = {};
        stdMod.createsGraphFW_class({
            graphFW,
            digramParentDom$,
        });
        //first array must be enabled
        //but can be dynamically overridden,
        graphFW.graphArrayMask = [ 'force', 'estforce', ];
        return graphFW;
    }
}) ();