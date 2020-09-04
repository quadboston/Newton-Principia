(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');

    var fapp        = sn('fapp' ); 
    var sapp        = sn('sapp');
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);



    ///application-wide helper
    cssmods['main-sapp'] = function( cssp, conf ) {
        var colorLight = conf.css['color-light']; 

        if( fconf.ESSAY_PANE_IS_BEFORE_MEDIA_IN_HTML ) {
            var essayPaneFloat = 'float : ' +
            ( conf.model_float_dir === 'right' ? 'left' : 'right' ) + ';';
            var mediaPaneFloat = '';
        } else {
            var mediaPaneFloat = 'float : ' + conf.model_float_dir + ';';
            var essayPaneFloat = '';
        }            


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


    /******************************************/
    /* //|| page primary sections             */
    /******************************************/
    .bsl-approot {
        position    : relative;
        width       : 100%;
        margin      : 0;
        padding     : 0;
        /* overflow    : auto;  todo */
        overflow    : hidden; /* todo why needed for shift-up-bug-making-hidden? */
    }

    .bsl-approot svg text {
        font-family : MJXc-TeX-math-I, MJXc-TeX-math-Ix, MJXc-TeX-math-Iw;
    }

    /* vital */
    /*
    .bsl-menu-filler { 
        height: ${fconf.attach_menu_to_essaion_root ? 65 : 90}px;
    }
    */

    /*================================*/
    /* //|| media pane                */
    /*================================*/
    .bsl-media-superroot {
        ${mediaPaneFloat}
        position    :relative;
        float       :left;
        display     :inline-block;
        box-sizing  :border-box;
        height      :auto;

        padding     :0;
        margin      :0;
        overflow    :visible;
    }

    .bsl-media-root {
        clear       :both; /* clears against media-top-controls */
        position    :relative;
        display     :block;
        box-sizing  :border-box;

        /* todm: simpler solution: add padding to parent, 21px */
        left        :${sconf.main_horizontal_dividor_width_px}px;
        padding     :0;
        margin      :0;
        text-align  :center;
        font-family :Montserrat,arial,helvetica,san-serif;
        overflow    :visible;
    }

    /* enables original-figure-picture disappearance */
    /* at version 1112, restored by client request */
    /* todm: .in-study must be lemma-wise flag, not image-wise */
    .bsl-bg-image.in-study {
        opacity:0;
        transition: opacity 1s ease;
    }

    /*
    .bsl-bg-image.disabled {
        display : none;
    }
    */
    /*================================*/
    /* //|| bsl-media                 */
    /*      .bsl-media === svg        */
    /*================================*/
    .bsl-media {
        position:absolute;
        width:100%;
        left:0;
        top:0;
        opacity:1;
        z-index:10;
    }

    .bsl-bg-image {
        width:100%;
        left:0;
        top:0;
        z-index:9;
    }

    /* https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting */
    /* this really solved firefox problem of "shadow-dragging-object"
       the problem tested and logged in 
       83-current-svg-firefox-problems.zip
       as of June 12, 2019 ( a year later we don't see this problem in FF )
       circle.movable { user-select: none; .... 
    */
    .bsl-media text {
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                      supported by Chrome and Opera */
    }
    /*================================*/
    /* ||// bsl-media                 */
    /* ||// media pane                */
    /*================================*/
    `;

    //====================================
    // //\\ display/unsisplay
    //====================================
    //svg display
    //display-inline-and-block-on-svg-elements
    //https://stackoverflow.com/questions/41437423/difference-between-
    ret +=`
        .display-none {
            display : none;
        }
        .display-yes {
            display : block;
        }

        .bsl-approot .bsl-media .undisplay
        {
            display : none;
        }
    `;
    //====================================
    // \\// display/unsisplay
    //====================================


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




    /*================================*/
    /* //|| essay pane                */
    /*================================*/
    .bsl-text-widget {
        ${essayPaneFloat}
        position        :relative; /* does not help ... no difference */
        padding         :10px;
        padding-left    :5px;
        padding-right   :20px;

        overflow-y      :auto;
        margin          :0;
        overflow-x      :hidden; /*patch for css-opacity-transition*/
        background-color:${conf.css.exegesisBackgroundColor};
    }
    /*================================*/
    /* ||// essay pane                */
    /*================================*/






    /*========================================*/
    /* //|| mobile                            */
    /*========================================*/
    @media (max-width: ${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {

        .bsl-approot {
            /* solves the problem of double y-scroll-bar and truncated legend:
               todm: needs other solution, padding is a patch ...
            */
            padding-bottom:40px;
        }

        /* todm: this "double-selector" is a poor practice */
        #bsl-media-superroot.bsl-media-superroot {
            width       :94%;
            height      :auto;
            margin-left :3%;
            margin-right:3%;
            float:none;
        }
        #bsl-resizable-handle {
            display: none;
        }
        .bsl-media-root {
            width       :100%;
            left        :0;
        }
        /* todm: this "double-selector" is a poor practice */
        #bsl-text-widget.bsl-text-widget {
            width       :94%;
            height      :auto;
            margin-right:3%;
            margin-left: 2%;
            margin-bottom: 20px;
        }
    }
    /*========================================*/
    /* ||// mobile                            */
    /* ||// page primary sections             */
    /******************************************/
    `;





//========================================
// //\\ main-legend                       
//      the only reason for "flex"
//      it make table narrow ...
//      otherwise, margin may solves all
//========================================
ret += `

    .bsl-legend-root {
        display : flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }

    .main-legend {
        /* table-layout:fixed; */
        table-layout:auto;
        box-sizing: border-box;
        margin-left : 15px;
        margin-right : 15px;
        flex-grow : 0;
        flex-shrink : 1;
    }


    .main-legend td {
        text-align:center;
    }

    .main-legend.hidden {
        display:none;
    }

    /* visibility per model-mode */
    .theorion--claim .main-legend.proof {
        display:none;
    }
    /* visibility per model-mode */
    .theorion--proof .main-legend.claim {
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

    .proof.row1 {
        opacity:0;
    }
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
    /*------------*/
    /* \\// proof */
    /*------------*/


    /*------------*/
    /* //\\ claim */
    /*------------*/
    .claim.row1 {
        opacity:0;
    }
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
        width:140px;
    }
    /*------------*/
    /* \\// claim */
    /*------------*/


    /*====================================*/
    /* \\// table formatter               */
    /*====================================*/
`;

//.changes legend font size by browser-window-width
ret +=`

    .bsl-media-root.main-legend-disabled .main-legend {
        display:none;
    }

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
    `;

/*====================================*/
/* \\// main-legend                   */
/*====================================*/
// \\// css /////////////////////////////////////////





return ret;
};
})();


