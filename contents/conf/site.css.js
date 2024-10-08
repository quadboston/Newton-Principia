(function() {
    var ns          = window.b$l;

    var st = ns.$$.c( 'style' )
        .html( `
        
            body .show-picture-credit {
                display : none;
            }               
            body.contents .show-picture-credit {
                display : block;
            }               
        
            .bsl-bg-image {
                position : absolute;
                width   : 100%;
                left    : 0;
                top     : 0;
                z-index : 9;
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

            table.essay-columns td {
                padding : 5px;
                border  : 1px solid grey;
                border-top : none;
                border-bottom : none;
            }

            table.essay-no-border {
                border-collapse : collapse;
                display         : inline-block;
                text-align      : left;
                border          : none;
            }
            table.essay-no-border td {
                padding         : 5px;
                border          : none;
            }
            table.essay-minimal-td td {
                padding         : 0px 0px 0px 10px;
                border          : none;
            }

            table.matrix-determinant {
                border          : none;
                border-left     : 2px solid #626D7E;
                border-right    : 2px solid #626D7E;
            }
            table.matrix-determinant td {
                text-align      : center;
                border-collapse : collapse;
                border          : none;
                padding         : 0px;
            }

        `)
        .to( document.head )
        ;

})();


