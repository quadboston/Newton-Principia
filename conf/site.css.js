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

            table.essay-normal {
                display         : inline-block;
                text-align      : left;
                border-collapse : collapse;
                border          : 1px solid black;
            }
            table.essay-normal td {
                padding : 5px;
                border  : 1px solid black;
            }

            table.essay-no-border {
                border-collapse : collapse;
                display         : inline-block;
                text-align      : left;
                border          : none;
            }
            table.essay-no-border td {
                padding : 5px;
                border          : none;
            }


        `)
        .to( document.head )
        ;

})();


