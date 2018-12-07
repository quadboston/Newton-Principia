(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var fapp        = sn('fapp'); 

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var modulesCount = sn('modulesCount', sapp);
    modulesCount.count = modulesCount.count ? modulesCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + modulesCount.count ] = setModule;

    var cssName     = 'widget-media';
    return;





    function setModule() {

        cssmod[ cssName ] = function( cssp ) {


            // //\\ css /////////////////////////////////////////
            var ret = `

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



/*==========================================*/
/* //\\ bsl-media                           */
/*==========================================*/
.bsl-media .phantom {
    fill:transparent;
    stroke:green;
}
/*
svg {
    boder:40px solid red;
}
*/
/*==========================================*/
/* \\// bsl-media                           */
/*==========================================*/



        `;
        // \\// css /////////////////////////////////////////


        return ret;
        };
    }
})();


