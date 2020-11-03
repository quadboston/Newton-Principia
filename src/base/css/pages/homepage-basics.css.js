(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'homepage-basics';




    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var colorMain = fconf.css['color-main'];
        return `
            .bsl-home-pane {
                position        : absolute;
                width           : 100%;
                padding-top     : 80px;
                top             : 0;
                left            : 0;
                transition      : left 1s ease;
                background-color: ${colorMain};
                z-index         : 1005;
            }

            .bsl-home-pane.is-hidden {
                left : -130%;
            }
       `;
    };
})();


