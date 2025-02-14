//apparently this is an initial front-page-css whioh later can be overridden
//with "home-pane"-modele css settings,
( function() {
    var {
        ns, sn, userOptions, engCssMs,
    } = window.b$l.apptree({
    });
    var THIS_MODULE = 'homepage-basics';

    engCssMs[THIS_MODULE] = function( cssp, fconf ) {
        var colorMain = fconf.css['color-main'];
        return `
            .bsl-home-pane {
                position        : absolute;
                width           : 100%;
                height          : 100vh;
                top             : 0;
                left            : 0;
                transition      : left 1s ease;
                background-color: ${colorMain};
                overflow-x      : hidden;
                overflow-y      : scroll;
                z-index         : 1000000005;
            }

            .bsl-home-pane.is-hidden {
                left : -130%;
            }
            
            .${userOptions.BONUS_START} {
                display : none;
            }
            .shows-bonus-features .${userOptions.BONUS_START} {
                display : block;
            }
            
            .non-displayed {
                display : none;
            }
       `;
    };
})();


