// //\\// do set css order here
(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);

    var ss          = sn('ss', fapp);
    var ssCssOrder  = sn('ssCssOrder',ss);
    setModule();
    return;





    function setModule()
    {
        ssCssOrder.list =
        [
            'proof-vs-claim-visib',
        ];
    }


    

})();


