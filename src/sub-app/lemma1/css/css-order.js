// //\\// if css order is important, set it here
(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);

    var ss          = sn('ss', fapp);
    var ssCssOrder  = sn('ssCssOrder',ss);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'setCssOrder';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        ssCssOrder.list =
        [
            'proof-vs-claim-modes'
        ];
    }


    

})();


