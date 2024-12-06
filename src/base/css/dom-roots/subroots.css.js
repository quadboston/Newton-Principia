(function() {
    var {
        sn, globalCss, eachprop,
        fconf, sconf, engCssMs,
        studyMods,
    } = window.b$l.apptree({
    });

    var ccs = 'bsl';

    ///??? application-wide helper
    ///no ... only for lemmas
    engCssMs[ 'dom-subroots' ] = function( cssp, conf ) {
        var colorLight = conf.css['color-light']; 
        var ret =


        // //\\ css /////////////////////////////////////////
        `
    /* @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,800,900"); */


    /* fixes for bully css-reset-tool */
    sub {
        vertical-align: sub;
        font-size: smaller;
    }

    /* fixes for bully css-reset-tool */
    sup {
        vertical-align: super;
        font-size: smaller;
    }

    `;


    /******************************************/
    /* //|| page primary sections             */
    /******************************************/
    ret += `
        .bsl-text-widget svg text {
            font-family : MJXc-TeX-math-I, MJXc-TeX-math-Ix, MJXc-TeX-math-Iw;
    }
    `;

    /* vital */
    /*
    .bsl-menu-filler { 
        height: ${fconf.attach_menu_to_essaion_root ? 65 : 90}px;
    }
    */

    //=======================================
    // //\\ visib
    //=======================================
    //svg display
    //display-inline-and-block-on-svg-elements
    //https://stackoverflow.com/questions/41437423/difference-between-
    /* idea:
        .display-block {
            display : block;
        }
    */
    var ww = `
            .bsl-approot .bsl--svgscene .undisplay,
            .bsl-simscene,
            .display-none {
                display : none;
            }
    `;
    eachprop( studyMods, ( stdMod, modName ) => {
        ww += `
           .bsl-approot.submodel--${modName} .bsl-simscene.submodel--${modName},
        `;
    });
    ret += ww +
        `
            .xxxdummy {
            display : block;
        }
    `;
    //=======================================
    // \\// visib
    //=======================================



    ret += `

    /* enables original-figure-picture disappearance */
    /* at version 1112, restored by client request */
    /* todm: .in-study must be lemma-wise flag, not image-wise */
    .bsl-bg-image.in-study {
        opacity:0;
        transition: opacity 1s ease;
    }

    /*================================*/
    /* //|| bsl--svgscene                */
    /*      .bsl--svgscene === svg       */
    /*================================*/
    `;

    /*
        moved to separate more specific settings module for collection of sites:
        .bsl-bg-image {
            width:100%;
        ...
    */

    ret += `


    /* https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting */
    /* this really solved firefox problem of "shadow-dragging-object"
       the problem tested and logged in 
       83-current-svg-firefox-problems.zip
       as of June 12, 2019 ( a year later we don't see this problem in FF )
       circle.movable { user-select: none; .... 
    */
    .highlight-text-disabled,
    .menu-teaf,
    .master-pagination-btn,
    .bsl--svgscene text {
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome and Opera */
    }
    /*================================*/
    /* ||// bsl--svgscene             */
    /* ||// media pane                */
    /*================================*/
    `;



    ///useful for point-d8d
    ret +=`
        .bsl-sim-superscene .grab {
            cursor : grab;
        }
    `;


    /*---------------------------*/
    /* //|| horizontal resizer   */ 
    /*---------------------------*/
    ret +=`
    #bsl-resizable-handle {
      display: flex;
      align-items: center;
      left: 0px;
      top: 0;
      padding: 0 8px;
      position: absolute;
      height: 100%;
      cursor: grab;
    }
    #bsl-resizable-handle:hover {
      background: ${colorLight};
    }
    .brc-slider-draggee.dividor:hover:after {
        background-color: transparent;
    }        

    /* patch: should be nicely disabling divide-panes-functionality todm */
    /*
    #bsl-resizable-handle {
        top:-300%;
    }
    */
    /*---------------------------*/
    /* \\// horizontal resizer   */ 
    /*---------------------------*/





    .bsl-text-widget svg text {
        font-family : MJXc-TeX-math-I, MJXc-TeX-math-Ix, MJXc-TeX-math-Iw;
    }




    /*========================================*/
    /* //|| mobile                            */
    /*========================================*/
    @media only screen and (max-width:${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
        #bsl-resizable-handle {
            display: none;
        }
    }
    `;

    /*========================================*/
    /* ||// mobile                            */
    /*========================================*/



//========================================
// //\\ main-legend                       
//      the only reason for "flex"
//      it make table narrow ...
//      otherwise, margin may solves all
//========================================
ret += `

    .bsl-legend-root {
        box-sizing   : border-box;
        text-align   : center;
    }

    .main-legend {
        table-layout : auto;
        box-sizing   : border-box;
        margin-left  : 15px;
        margin-right : 15px;
    }

    .main-legend td {
        text-align:center;
    }
    .main-legend td.monospace {
        font-family : monospace;
    }

    .main-legend.hidden {
        display:none;
    }

    /*todm: should be automated */
    .theorion--claim .main-legend.proof,
    .theorion--corollary .main-legend.proof {
        display:none;
    }
    /* visibility per model-mode */
    .theorion--corollary .main-legend.claim,
    .theorion--proof .main-legend.claim {
        display:none;
    }
    /* visibility per model-mode */
    .theorion--claim .main-legend.corollary,
    .theorion--proof .main-legend.corollary {
        display:none;
    }

    .main-legend td {
        padding:1px;
        /* for dev mode: border: 1px solid black; */
    }


    /*====================================*/
    /* //\\ table formatter               */
    /*====================================*/
    .main-legend td {
        text-align:left;
    }
    .main-legend td.table-caption {
        padding-bottom:4px;
        text-align:center;
        font-weight:bold;
    }
    .main-legend td.align-to-right,
    .main-legend td.value {
        text-align:right;
    }    
    .main-legend .eq-sign {
        text-align:center;
    }    

    
    /*------------*/
    /* //\\ proof */
    /*------------*/
    .main-legend.claim,
    .main-legend.proof {
        border-collapse: separate;
        border-spacing: 10px 0px;
    }

    /* was 370px */
    /*
    .main-legend.proof {
        width:470px;
    }
    */

    .corollary.row1,
    .proof.row1 {
        opacity:0;
    }
    /*
    .proof.row1 td:nth-child(4),
    .proof.row1 td:nth-child(1) {
        width:12%;
    }
    .proof.row1 td:nth-child(8),
    .proof.row1 td:nth-child(5),
    .proof.row1 td:nth-child(2) {
        width:4%;
    }
    .proof.row1 td:nth-child(9),
    .proof.row1 td:nth-child(6),
    .proof.row1 td:nth-child(3) {
        width:14%;
    }
    .proof.row1 td:nth-child(7) {
        width:22%;
    }
    */
    /*------------*/
    /* \\// proof */
    /*------------*/


    /*------------*/
    /* //\\ claim */
    /*------------*/
    .claim.row1 {
        opacity:0;
    }
    /*
    .claim.row1 td:nth-child(1) {
        width:52.5%;
    }
    .claim.row1 td:nth-child(2) {
        width:15%;
    }
    .claim.row1 td:nth-child(3) {
        width:22.5%;
    }
    .main-legend.claim {
        what was it? width:140px;
    }
     */
    /*------------*/
    /* \\// claim */
    /*------------*/


    /*====================================*/
    /* \\// table formatter               */
    /*====================================*/
`;

//.changes legend font size by browser-window-width
ret +=`

    .main-legend td {
        font-size:14px;
    }

    @media (max-width: 900px) {
        .main-legend td {
            font-size:11px;
        }
    }

    @media (max-width: 850px) {
        .main-legend td {
            font-size:10px;
        }
    }

    @media (max-width: 800px) {
        .main-legend td {
            font-size:13px;
        }
    }

    @media (max-width: 600px) {
        .main-legend {
            position:static;
            width:100%;
        }
    }
    `;


    //==================================
    // //\\ model help
    //==================================
    ret +=`
    .model-help {
        cursor: pointer;
        opacity:1;
    }
    .video-help-button {
        cursor: pointer;
        opacity:0.2;
    }
    .video-help-button:hover,
    .model-help:hover {
        opacity:1;
    }
    `;

    ///todm ... non-elegant
    if( fconf.appDecor.helpBox_opacity0 ) {
        ret +=`
            .video-help-button,
            .model-help {
                cursor: auto;
            }
        `;
    }
    //==================================
    // \\// model help
    //==================================


    //==================================
    // //\\ video
    //==================================
    ret +=`

    .bsl-showreel-video-wrap {
        position:relative;
        margin-bottom:10px;
        background-color:transparent; /*#DDDDDD;*/
        left        :50%;
        transform   :translate(-50%,0%);
    }

    .bsl-showreel-video,
    .bsl-showreel-video-iframe{
        position:absolute;
        width:96%;
        height:96%;
        left:50%;
        top:50%;
        transform   :translate(-50%,-50%);
        background-color:#DDDDDD;
    }

    .bsl-close-html-button {
        position:absolute;
        width:20px;
        height:20px;
        border-radius:15px;
        right:-20px;
        top:10px;
        padding-top:5px;
        padding-left:9px;
        color:white;
        font-size:16px;
        font-weight:bold;
        background-color:rgba(0,0,0,1);
        cursor:pointer;
        opacity:1;
        z-index:1000;
    }
    `;
    //==================================
    // \\// video
    //==================================




    //==================================
    // //\\ video icon
    //==================================
    ret +=`
        .video-icon-img-container > img {
            position:relative;
            /* version 1685: because of not perfect design,
               the jerk of caption happens when this number
               is greater than 18px
            */
            width:18px;
            top:1px;
        }
        .video-list-popup .video-icon-img-container > img {
            top:2px;
            vertical-align:middle;
        }

    `;
    //==================================
    // \\// video icon
    //==================================


    ret +=`
        .hidden {
            visibility : hidden;
        };

        a:link{
            color:${ccs['color-main']};
        }

        a:visited{
            color:${ccs['color-main']};
            
        }

    `;

/*====================================*/
/* \\// main-legend                   */
/*====================================*/
// \\// css /////////////////////////////////////////


    ///default lemma svg settings,
    ///to be overridedn by lemma-css-policy

    // (remember, in-line attributes are still suppressed)
    // or inline-css,

    // this fixes some pages, but probably makes default
    // color dependent on browser
    //            xxxxstroke          : black;
    //            xxxxfill            : black;



    //
    ///todm: should be in sapp module, not "full app" module,
    globalCss.update( `
            .bsl-simscene svg text {
                font-size       : 12px;
                font-style      : normal;
                stroke-width    : 0.1;
                font-family     : helvetica, arial, san-serif;
                stroke          : black;
                fill            : black;
            }
        `,
        'svg-text-special'
    );


    /*
    ///submodel visibilities
    ret += `
        .submodel---flag {
            display : none;
        }
    `;
    */



return ret;
};
})();


