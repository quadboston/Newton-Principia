(function() {
    var ns          = window.b$l;

    /*
    var cssmods     = sn('cssModules');
    cssmods['site-sapp'] = function( cssp, conf ) {
            return `
                .where-is-this-css,
                .bsl-bg-image {
                    width:100%;
                    left:0;
                    top:0;
                    z-index:9;
                }
            `;
        };
    */

    var st = ns.$$.c( 'style' )
        .html( `
            .bsl-bg-image {
                width:100%;
                left:0;
                top:0;
                z-index:9;
            }
        `)
        .to( document.head )
        ;

})();


