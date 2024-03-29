(function() {
    var {
        sn, cssp, cssmod, ssCssOrder,
        fconf,
    } = window.b$l.apptree({
        setModule,
    });
    var cssName = 'inner-page';
    return;






    function setModule()
    {
        cssmod[ cssName ] = assignModule;
    }

    function assignModule( cssp, fconf )
    {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 


        // //|| css /////////////////////////////////////////
        var ret = `

            /* the same as bsl-media */
            #illus {
              width: 100%;
              }

            /* apparently about draggable point on graph */
            .movable {
                cursor: pointer;
            }

            /* sub data-legend html-element,
               display:inline-block; is vital for position,
            */
            #areadesk {
                display:inline-block;
                margin-top : 20px;
                width : 230px;
                z-index : 1000;
            }

            /*---------------------*/
            /* ||\\ area-legend l2 */
            /*---------------------*/
            .desc--claim {
              margin-top: 24px;
              margin-bottom: 64px; }

            .desc--proof {
              margin-top: 24px;
              }

            .desc--proof.hidden,
            .desc--claim.hidden {
                display:none;
            }

            @media only screen and (max-width: 800px) {
                #areadesk.hidden {
                    display:none;
                }
            }

            .desc__header {
              margin-bottom: 12px;
              text-align:center;
              align-items: center;
            }

            .desc__header-title {
                font-family: 'Helvetica',sans-serif;
                font-size: 14px;
                font-weight: bold;
                margin: 0px;
            }

            .desc--areas {
              position: absolute;
              bottom: 0px; }
              .desc--areas h2 {
                font-family: 'Helvetica',sans-serif;
                font-size: 1rem; }

            .areas__checkboxes {
              font-family: 'Helvetica', sans-serif;
              font-size: 1rem; }
              .areas__checkboxes-row {
                display: flex;
                align-items: center;
                margin-bottom: 8px; }
              .areas__checkboxes .checkbox {
                margin-right: 12px; }
            /*---------------------*/
            /* ||// area-legend l2 */
            /*---------------------*/


        `;
        // ||// css /////////////////////////////////////////
        return ret;
    }
})();


