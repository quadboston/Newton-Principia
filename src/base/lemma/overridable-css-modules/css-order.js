// //\\// do set css order here
(function() {
    var {
        ssCssOrder,
    } = window.b$l.apptree({
        setModule
    });
    return;




    ///this sub creates the list, which can be overridden by
    ///sub "setModule" in specific lemma module loaded after index.html-engine-modules
    function setModule()
    {
        ssCssOrder.list =
        [
            'proof-vs-claim-visib',
        ];
    }


    

})();


