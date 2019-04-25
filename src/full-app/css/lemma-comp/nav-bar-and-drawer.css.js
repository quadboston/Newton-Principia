(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var cssmods = sn('cssModules');
    var THIS_MODULE = 'nav-bar-and-drawer';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs             = fconf.css;
        var colorMain       = ccs['color-main'];
        var colorWhite      = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey  = ccs['color-light-grey']; 
        var colorPaleBlue   = ccs['color-pale-blue']; 
        var colorStoneBlue  = ccs['color-stone-blue']; 
        var colorLight      = ccs['color-light']; 
        var borderRadius    = ccs['border-radius']; 





        // //\\ css /////////////////////////////////////////
        var ret = `

            .nav-bar {
                background:     transparent;
                display:        flex;
                xxxxgrid-area:      nav;
                align-items:    flex-start; xxxxcenter:x;
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


