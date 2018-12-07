// //\\// if css order is important, set it here
(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 

    var sapp        = sn('sapp');

    var ss          = sn('ss', fapp);
    var ssCssOrder  = sn('ssCssOrder',ss);

    var srg         = sn('sapprg', fapp); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'setCssOrder';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        ssCssOrder.list =
        [
            'proof-vs-claim-modes',
            'media'
        ];
    }


    

})();


