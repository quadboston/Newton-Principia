(function() {
    var ns = window.b$l;
    var anslider = ns.sn('animated-slider');





    anslider.css = function( 
        ///all input pars are optional
        cssp,
        csskey,
        railsLegend,
        ancestorClassToHideSlider,
        doHideSlider
    ) {
        railsLegend = railsLegend || '';

        var ret = `
            .${cssp}-slider-${csskey} {
                display:inline-block;
                position:relative;
                width:150px;
                height:30px;
                border-radius:4px;
                left:0px;
                top:15px;
                right:5%;
                z-index:1000;
            }
            `;

        if( doHideSlider ) {
            ret +=` 
                div.${cssp}-slider-${csskey} {
                    position:absolute;
                    visibility:hidden;
                }
            `;
            //return ret; /* todmm why this does not work */
        }
        if( ancestorClassToHideSlider ) {
            ret +=` 
                .${ancestorClassToHideSlider} .${cssp}-slider-${csskey} {
                    position:absolute;
                    visibility:hidden;
                }
            `;
        }

        /*
        variant when slider is not visible originally
        .${cssp}-slider-${csskey} {
            visibility:hidden;            
        .${cssp}-slider-${csskey}.${cssp}-highlited-chart {
            visibility:visible;
        }
        */

        ret += `
            /* rails */
            .${cssp}-slider-${csskey}:after {
                content:'';
                display:block;
                position:absolute;
                width:170px;
                height:2px;
                border:1px solid #888888;
                border-radius:2px;
                left:-2px;
                top:18px;
                color:black;
                background-color:white;
            }

            /* drag background */
            .${cssp}-slider-${csskey}:before {
                content:'${railsLegend}';
                display:block;
                position:absolute;
                width:170px;
                height:30px;
                border-radius:4px;
                left:-2px;
                top:0px;
                text-align:center;
                font-size:10px;
                font-family:var(--default-font);
                color:#aaaaaa;
            }

            .${cssp}-draggee {
                position:absolute;
                top:13px;
                width:33px;
                height:12px;
                padding-top:2px;
                border-radius:6px;
                border:1px solid #888888;

                font-size:8px;
                text-align:center;
                font-family:var(--default-font);
                color:black;
                background-color:#dddddd;
                z-index:1000;
                cursor:grab;
            }
        `;

        return ret;
    };

})();


