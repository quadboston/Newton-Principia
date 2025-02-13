(function() {
    var {
        sn,
        fconf, sconf, engCssMs,
    } = window.b$l.apptree({
    });
    var THIS_MODULE = 'dom-roots';


    engCssMs[ THIS_MODULE ] = function() {

        var ret = `
            html, body
            { 
                border      : none;
                font-size   : 15px; /*this defines what 1rem is */
                background-color : ${ fconf.css[ 'color-light'] };
            }

            /*================================*/
            /* //|| position flow             */
            /*================================*/
            html, body
            { 
                width       : 100%;
                height      : 100vh;
                overflow    : hidden;
                padding     : 0;
                margin      : 0;
             }

            .bsl-approot {
                position    : relative;
                width       : 100%;
                margin      : 0;
                padding     : 0;
                /* todo patch, just to hide accidental misfits, but there
                   must be no misfits
                */
                /* ?? todo why needed for shift-up-bug-making-hidden? */
                overflow    : hidden;
             }
            .bsl-sim-superscene {
                position    : relative;
                display     : inline-block;
                float       : left;
                box-sizing  : border-box;
                padding     : 0;
                margin      : 0;
                overflow    : visible;
            }
            .bsl-text-widget {
                position        : relative; /* does not help ... no difference */
                float           : left;
                padding         : 10px;
                padding-left    : 5px;
                padding-right   : 20px;
                margin          : 0;
                overflow-y      : auto;
                overflow-x      : hidden; /*patch for css-opacity-transition*/
            }
            /* fixes media by making margins dynamically in-line */
            .bsl-simscene {
                position    : relative;
                clear       : both; /* clears against media-top-controls */
                left        : ${sconf.main_horizontal_dividor_width_px}px;
                overflow    : visible;
                padding     : 0;
                margin      : 0;
                box-sizing  : border-box;
            }
            /* browser-controlled height ends here: next components
               may take absolute positioning
            */
            .bsl--svgscene {
                position    : absolute;
                left        : 0;
                top         : 0;
                box-sizing  : border-box;
            }
            .bsl-legend-root {
                position    : absolute;
            }
            /*================================*/
            /* ||// position flow             */
            /*================================*/


            /*================================*/
            /* //|| essay pane                */
            /*================================*/
            .bsl-text-widget {
                background-color: white;
            }
            /*================================*/
            /* ||// essay pane                */
            /*================================*/


            /*================================*/
            /* //|| media pane                */
            /*================================*/
            .bsl-simscene {
                text-align  : center;
                font-family : Montserrat,arial,helvetica,san-serif;
            }
            .bsl--svgscene {
                opacity     : 1;
                z-index     : 10;
            }
            /*================================*/
            /* ||// media pane                */
            /*================================*/

            /* todm non-consistent style set, must be dynamic by box-tester as for other parts */
            @media screen and (max-width: ${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {

                /*================================*/
                /* //|| position flow             */
                /*================================*/
                html,
                body
                { 
                    height      : auto;
                    /* for case to make visible absolute overflow over auto-page */
                    overflow-y  : auto;
                }
                .bsl-text-widget {
                    width           : 94%;
                    margin-right    : 3%;
                    margin-left     : 2%;
                    margin-bottom   : 20px;
                }
                .bsl-sim-superscene {
                    width       : 94%;
                    margin-left : 3%;
                    margin-right: 3%;
                    float       : none;
                }
                .bsl-simscene {
                    /* no "width and left" for d8d dividor in mobile */
                    width   : 100%;
                    left    : 0px;
                }
                .bsl--svgscene,
                .bsl-legend-root {
                    position : relative;
                    width    : 100%;
                }
                /*================================*/
                /* ||// position flow             */
                /*================================*/
            }

            @media only screen and (max-width:720px){
                .btn--how-to{
                    display: none !important; /* tod? */
                } 
            }

        `;
        return ret;
    };
})();


