(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var engCssMs = sn('engCssMs');
    var THIS_MODULE = 'nav-bar-and-drawer';
    engCssMs[THIS_MODULE] = function( cssp, fconf ) {
        var ccs             = fconf.css;
        var colorMain       = ccs['color-main'];
        var colorWhite      = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey  = ccs['color-light-grey']; 
        var colorPaleBlue   = ccs['color-pale-blue']; 
        var colorStoneBlue  = ccs['color-stone-blue']; 
        var colorLight      = ccs['color-light']; 
        var borderRadius    = ccs['border-radius']; 
        var cssDisplay      = fconf.doDisplayPageTopNavigatMenu ? 'flex' : 'none';


        // //\\ css /////////////////////////////////////////
        var ret = `

            .page-top-nav-bar {
                background:     transparent;
                display:        ${cssDisplay};
                align-items:    flex-start;
                width:          100%;
                padding-top:    20px;
                padding-bottom: 20px;
                top:            0px;
                z-index:        1010;
            }

        `;
        // \\// css /////////////////////////////////////////



        return ret;
    };
})();


