(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'media';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        cssmod[ modName ] = function( cssp, conf ) {

// //\\ fill css here
var ret = `




    /********************************************/
    /* //\\ bsl-media                           */
    /********************************************/
    .bsl-media {
        position:absolute;
        width:100%;
        left:0;
        top:0;
        opacity:1;
        z-index:10;
    }

    .bsl-bg-image {
        width:100%;
        left:0;
        top:0;
        z-index:9;
    }
    /********************************************/
    /* \\// bsl-media                           */
    /********************************************/


`;
// \\// fill css here




return ret;
};}
})();


