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
        //todo 8 is a hack ... lesser value, like 6 causes flicker ...
        //ps bs a CSS/JS loop when CSS causes resize, JS catches resize and changes CSS
        return 100 - mediaPerc - 8; 
    };
    cssmods['main-sapp'] = function( cssp, conf ) {
        var colorLight = conf.css['color-light']; 
        var mediaPerc = sconf.mediaDefaultWidthPercent;
        var textPercStr = cssmods.calculateTextPerc( mediaPerc ).toFixed(2) + '%';
        var aroot_DesktopOverflow = sapp.pageMode === 'lemma' ?
                                    'overflow-x:hidden' : 'overflow:visible';


        var ret =



// //\\ css /////////////////////////////////////////
`
    /* @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,800,900"); */





    /******************************************/
    /* //\\ page primary sections             */
    /******************************************/
    .bsl-approot {
        width:100%;
        margin:0;
        padding:0;
        ${aroot_DesktopOverflow}
    }

    .bsl-menu-filler, /* todm need? */
    .bsl-menu {
        vertical-align: top;
        height: 90px;
        width: 98%;
        margin:0px;
        padding:10px;
        padding-top:0px;
        padding-bottom:0px;
        top: 0px;
        border-radius:10px;
        font-family:helvetica,arial,san-serif;
        z-index:1001;
    }

    .bsl-media-superroot {
        float       :${conf.model_float_dir};
        position    :relative;
        display     :block;
        width       :${mediaPerc.toFixed(2)}%;
        xxxxx-done-programmatically-max-width   :1000px;
        height      :${(conf.exegesis_floats && 'auto') || 'calc(100vh - 140px )'};
        padding     :0;
        margin      :0;
        margin-right:2%; /* pushes the text right */
        overflow    :visible;
    }

    .bsl-media-root {
        clear       :both; /* clears against media-top-controls */
        position    :relative;
        display     :block;

        /* todm: simpler solution: add padding to parent, 21px */
        width       :calc(100% - ${sconf.main_horizontal_dividor_width_px}px);
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
    /*---------------------------*/
    /* \\// horizontal resizer   */ 
    /*---------------------------*/


    .bsl-text-widget {
        padding             :2%;
        width               :${(conf.exegesis_floats && 'auto') || textPercStr };
        height              :${(conf.exegesis_floats && 'auto') || 'calc(100vh - 140px )'};
        overflow-y          :${(conf.exegesis_floats && 'none') || 'auto'};
        margin-right        :${(conf.exegesis_floats && '0')    || '50px'};
        background-color    :${conf.css.exegesisBackgroundColor};
    }

    /*========================================*/
    /* //\\ exegesis-modes to sizes           */
    /*========================================*/
    .bsl-approot.text--none .bsl-media-superroot {
        width:94%;
        margin-left:3%;
        margin-right:3%;
        /* this sugar needs synch with JS-resize event
        transition: width 1s ease;
        */
    }
    .bsl-approot.text--none #bsl-resizable-handle {
      display: none;
    }
    .bsl-approot.text--none .bsl-media-root {
            width       :100%;
            left        :0;
    }

    @media (max-width: 800px) {

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
        }
    }
    /*========================================*/
    /* \\// exegesis-modes to sizes           */
    /* \\// page primary sections             */
    /******************************************/
    `;





/*========================================*/
/* //\\ main-legend                       */
/*========================================*/
ret += `

    @media only screen and (max-width: 800px) {
        .main-legend.hidden {
            display:none;
        }
    }

    /* visibility per model-mode */
    .proof--claim .main-legend.proof {
        display:none;
    }
    /* visibility per model-mode */
    .proof--proof .main-legend.claim {
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
        .video-icon-fragment > img {
            position:relative;
            width:20px;
            top:1px;
        }
        .video-list-popup .video-icon-fragment > img {
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


