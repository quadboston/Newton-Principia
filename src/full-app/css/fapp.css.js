(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');

    var fapp        = sn('fapp' ); 
    var sapp        = sn('sapp');
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);



    ///application-wide helper
    cssmods.calculateTextPerc = function( mediaPerc ) {
        //todo 
        //100 - mediaPerc - NNN
        //is a hack
        //...NNN like 15 breaks app-CSS-floating model
        //...NNN like 6 causes flicker ...
        //ps bs a CSS/JS loop when CSS causes resize, JS catches resize and changes CSS
        return 100 - mediaPerc - 15; 
    };
    cssmods['main-sapp'] = function( cssp, conf ) {
        var colorLight = conf.css['color-light']; 
        var mediaPerc = sconf.mediaDefaultWidthPercent;
        var textPercStr = cssmods.calculateTextPerc( mediaPerc ).toFixed(2) + '%';

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

    /******************************************/
    /* //|| page primary sections             */
    /******************************************/
    .bsl-approot {
        width:100%;
        margin:0;
        padding:0;
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
        height      :auto;

        padding     :0;
        margin      :0;
        overflow    :visible;
    }

    .bsl-media-root {
        clear       :both; /* clears against media-top-controls */
        position    :relative;
        display     :block;

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
    .bsl-bg-image.in-study {
        opacity:0;
        transition: opacity 1s ease;
    }

    .bsl-bg-image.disabled {
        display : none;
    }

    /*================================*/
    /* //|| bsl-media                 */
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
    /*================================*/
    /* ||// bsl-media                 */
    /* ||// media pane                */
    /*================================*/


    /*---------------------------*/
    /* //\\ horizontal resizer   */ 
    /*---------------------------*/
    #bsl-resizable-handle {
      display: flex;
      align-items: center;
      left: 0px;
      top: 0;
      padding: 0 8px;
      position: absolute;
      height: 100%;
      cursor: pointer;
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
        xxxxxxtop:-300%;
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

        width           :${(conf.exegesis_floats && 'auto') ||
                            textPercStr };
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





/*========================================*/
/* //\\ main-legend                       */
/*========================================*/
ret += `

    .bsl-legend-root {
        padding-left : 30px;
        padding-right : 10px;
    }

    .main-legend td {
        text-align:center;
    }

    @media only screen and (max-width: ${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
        .main-legend.hidden {
            display:none;
        }
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
    }
    .main-legend {
        table-layout:fixed;
        margin:auto;
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
    .main-legend.proof {
        width:370px;
    }
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

    .bsl-media-root.main-legend-disabled .main-legend {
        display:none;
    }

`;
    
if( conf.exegesis_floats ) {
    ret +=`
        .main-legend {
            position:absolute;
            left:32%;
            top:60%;
        }
        .main-legend td {
            font-size:12px;
        }
    `;

} else {
    ret +=`
        .main-legend {
            position:static;
            width:100%;
        }
        .main-legend td {
            font-size:14px;
        }
    `;
}


ret +=`

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




/*====================================*/
/* \\// main-legend                   */
/*====================================*/
// \\// css /////////////////////////////////////////





return ret;
};
})();


