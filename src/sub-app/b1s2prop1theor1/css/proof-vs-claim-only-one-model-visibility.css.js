(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'proof-vs-claim-only-one-model-visibility';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        cssmod[ modName ] = function( cssp, conf ) {

        var ret =


// //\\ css /////////////////////////////////////////
`
    /*========================================================*/
    /* //|| modes                                             */
    /*      establishes visibility only one model at the time */
    /*      proof vs claim                                    */
    /*========================================================*/
    .bsl-approot.theorion--proof .theorion--claim,
    .bsl-approot.theorion--claim .theorion--proof {
        visibility:hidden;
    }    
    .bsl-approot.theorion--claim .theorion--claim,
    .bsl-approot.theorion--proof .theorion--proof {
        visibility:visible;
    }    
    /*========================================================*/
    /* ||// modes                                             */
    /*========================================================*/

`;
// \\// css /////////////////////////////////////////





return ret;
};}
})();


