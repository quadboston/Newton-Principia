( function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var engCssMs = sn('engCssMs');
    var THIS_MODULE = 'typography';



    engCssMs[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        return `

            /*fonts*/
            body{
                color: ${ccs['color-medium-grey']};
                font-family: 'Helvetica',sans-serif;
            }
            h1,h2,h3,h4,h5,h6{
                color: ${ccs['color-main']};
                font-weight:200;
                font-family: 'Goudy Old Style', 'Garamond','Times', serif;
            }
            h1{
                font-size: 48px;
            }
            h2{
                font-size: 24px;
            }

            a{
                text-decoration: none;
            }
            p{
                font-size: 1rem;
                line-height: 1.75;
            }

            /* home page::user-guide-paragraphs */
            .how-to__cell p {
                line-height: 1.2;
            }

            b {
                font-weight : bold;
            }
        `;
    };
})();


