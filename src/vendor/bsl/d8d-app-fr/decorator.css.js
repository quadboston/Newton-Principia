//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.css.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

    var globalCssCreated_flag = false;

    dpdec.create_individualCss = create_individualCss;
    dpdec.createGlobal = createGlobal;
    return;








    ///Input: parent_classes - optional array:
    ///                        these classes do increase specifity for decoration-point.
    function create_individualCss( id, color, parent_classes )
    {
        parent_classes = parent_classes || [''];
        var ret = '';

        // //\\ css /////////////////////////////////////////
        parent_classes.forEach( function( dclass ) {
            dclass = dclass ? '.' + dclass : '';
            ret +=
            `

            /*=============================*/
            /* //\\ parent after           */
            /*=============================*/
            ${dclass} .${id}.brc-slider-draggee:hover:after {
                background-color: ${color};
            }
            /*=============================*/
            /* \\// parent after           */
            /*=============================*/


            /*=============================*/
            /* //\\ animates slider arrows */
            /*=============================*/
            ${dclass} .${id} .brc-slider-draggee-right {
                border-left:15px solid ${color};
            }
            ${dclass} .${id} .brc-slider-draggee-left {
                border-right:15px solid ${color};
            }
            /*=============================*/
            /* \\// animates slider arrows */
            /*=============================*/
            `
        });
        // \\// css /////////////////////////////////////////
        ns.globalCss.addText( ret );
    }


    function createGlobal()
    {
        if( globalCssCreated_flag ) return;
        var ret =

        // //\\ css /////////////////////////////////////////
        `

        /*=============================*/
        /* //\\ parent handler         */
        /*=============================*/
        .brc-slider-draggee {
            position:absolute;
            top:0%;
            width:40px;
            height:40px;
            z-index:1000;
            cursor:pointer;
            /* .good for devel. */
            /* border: 1px solid red; */
            transform: translate(-50%, -50%);
        }

        .brc-slider-draggee.rotate {
            animation: 2s linear 0s infinite normal do-rotate;
        }
        .brc-slider-draggee.axis-y {
            transform: translate(-50%, -50%) rotate(90deg);
        }

        @keyframes do-rotate {
            0% {
	            transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
	            transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        /*=============================*/
        /* \\// parent handler         */
        /*=============================*/




        /*=============================*/
        /* //\\ parent after;          */
        /*      this is handle's disk  */
        /*      if visible;            */
        /*=============================*/
        .brc-slider-draggee:hover:after {
            content:''; /* seems vital ... why? */
            position:absolute;
            left:20px;
            top:20px;
            width:15px;
            height:15px;
            transform: translate(-50%, -50%);

            padding-top:0px;
            border-radius: 15px;
            font-size:11px;
            font-weight:bold;
            text-align:center;
            background-color: black;
            z-index:1000;
            cursor:pointer;
        }
        /*=============================*/
        /* \\// parent after           */
        /*=============================*/






        /*=============================*/
        /* //\\ animates slider arrows */
        /*=============================*/
        .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee .brc-slider-draggee-left {
            visibility:hidden;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee:hover .brc-slider-draggee-right {
            content:'';
            position:absolute;
            height:1px;
            width:1px;
            top:5px;
            left: 24px;
            left: 20px;
            animation: 4s ease-out 0s infinite normal slider-hover-right;
            visibility:visible;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-left,
        .brc-slider-draggee:hover .brc-slider-draggee-left {
            content:'';
            position:absolute;
            height:1px;
            width:1px;
            left:-10px;
            top:5px;
            animation: 4s ease-out 0s infinite normal slider-hover-left;
            visibility:visible;
        }

        @keyframes slider-hover-right {
            0% {
	            left: 20px;
	            opacity: 0;
            }
            12.5% {
	            opacity: 1;
            }
            25% {
	            left: 40px;
	            opacity: 0;
            }
            100% {
	            left: 40px;
	            opacity: 0;
            }
        }

        @keyframes slider-hover-left {
            0% {
	            left: -10px;
	            opacity: 0;
            }
            12.50% {
	            left: -10px;
	            opacity: 0;
            }
            25% {
	            opacity: 1;
            }
            37.5% {
	            opacity: 0;
	            left: -35px;
            }
            100% {
	            left: -35px;
	            opacity: 0;
            }
        }

        .brc-slider-draggee-right {
            border:15px solid transparent;
            border-left:15px solid grey;
        }
        .brc-slider-draggee-left {
            border:15px solid transparent;
            border-right:15px solid grey;
        }
        /*=============================*/
        /* \\// animates slider arrows */
        /*=============================*/



        `;
        // \\// css /////////////////////////////////////////
        ns.globalCss.addText( ret );
        globalCssCreated_flag = true;
    };
})();


