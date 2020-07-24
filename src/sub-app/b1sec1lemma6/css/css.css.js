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
    var modName     = 'css';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;



    //svg display
    //https://stackoverflow.com/questions/41437423/difference-between-
    //display-inline-and-block-on-svg-elements
    function setModule()
    {
        cssmod[ modName ] = function( cssp, conf ) {

        var ret = `

            .opacity0 {
                display : none;
            }
            .opacity1 {
                display : svg;
            }

        /*
        this is a good start to enforce desired colors ...
        but needs to synch with anchor colors ... not at the moment ...
        .tp-path {
            stroke:blue !important;
        }

        .tp-free-triangle,
        .tp-free-path {
            stroke:green !important;
            fill:green !important;
        }
        */

        `;
return ret;
};}
})();


