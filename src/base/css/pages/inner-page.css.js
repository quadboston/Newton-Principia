(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var engCssMs = sn('engCssMs');
    var THIS_MODULE = 'inner-page';
    
    //todm crude patch
    var SHUTTLE_COLOR = ns.SHUTTLE_COLOR = 'rgba(150, 175, 200';

    engCssMs[THIS_MODULE] = function( cssp, fconf ) {
        var ccs             = fconf.css;
        var colorMain       = ccs['color-main'];
        var colorWhite      = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey  = ccs['color-light-grey']; 
        var colorPaleBlue   = ccs['color-pale-blue']; 
        var colorStoneBlue  = ccs['color-stone-blue']; 
        var colorLight      = ccs['color-light']; 
        var borderRadius    = ccs['border-radius']; 
        var helpBoxOpacity  = fconf.appDecor.helpBox_opacity0 ? 0 : 1;

    var ret = `

    .top-media-controls {
        position : relative;
    }

    /*--------------------------------------
        //\\\\ master pagination button
        margin-bottom is perplexing, why
        disbalance between home, left, current buttons?
      -------------------------------------*/
    .master-pagination-btn {
        display:inline-block;
        position:relative;
        transform: none;
        box-shadow: 0 0px 4px 0 rgba(32, 41, 54, 0.2);
        box-sizing: border-box;
        background-color: ${colorWhite};
        border-radius: ${borderRadius};
        cursor: pointer;

        white-space : nowrap;

        text-align:center;

        height: 29px;
        margin: 0px 16px 0 16px;
        padding: 5px 8px 2px 8px;
        transition: all .2s ease;
        z-index: 1002;
    }
    .left-home-button {
        font-size:15px;
    }
    .master-pagination-btn img {
        opacity : 0.5;
        margin-left: 5px;
        margin-right: 5px;
        vertical-align:middle;
    }
    .master-pagination-btn.left img {
        margin-left: 2px;
    }
    .master-pagination-btn.left img,
    .master-pagination-btn.right img {
        width: 7px;
    }
    
    /* //\\\\ effect of outstanding button in top menu */
    .master-pagination-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 0px 12px 0 rgba(32, 41, 54, 0.2);
        transition: all .2s ease;
    }
    .master-pagination-btn.current-lemma:hover,
    .master-pagination-btn.current-lemma {
        transform: scale(1.0);
        box-shadow       : 0 0px 8px 0 ${SHUTTLE_COLOR}, 0.4);
        border           : 3px solid ${SHUTTLE_COLOR}, 1);
        padding          : 3px 8px 3px 8px;
        margin-top       : 6px;
        transform        : translate( 0px, 1px );
    }
    /* \\\\// effect of outstanding button in top menu */

    .master-pagination-btn.non-displayed {
        display:none;
    }
    
    .middle-subnav-bar {
        display : inline-block;
        margin:auto;
    }

    /* hides return-to-lemma-button if user has landed to dumb front-page */
    .appid-home-pane .return-to-lemma-button {
        display:none;
    }
    .return-to-lemma-button {
        display:inline-block;
    }
    
    .return-to-lemma-button,
    .home-button {
        margin-left         : 30px;
        font-weight         : normal;
        z-index             : 1000000006;
    }
    .home-button {
        width               : 120px;
        margin-top          : 6px;
        color               : ${colorMediumGrey};
        background-color    : white;
    }
    .return-to-lemma-button {
        width               : 190px;
        color               : white;
        background-color    : #303946;
    }
    .return-to-lemma-button:hover {
        color               : white;
        background-color    : #606986;
    }
    /*--------------------------------------
        \\\\// master pagination button
      -------------------------------------*/


    /*---------------------------------------------
        //\\\\ Hover over the diagram to interact
      --------------------------------------------*/
    .help-box {
        float           : left;
        margin-top      : 8px;
        color           : ${colorMediumGrey};
        font-size       : 12px;
        padding         : 0 16px;
        border-radius   : ${borderRadius};
        display         : flex;
        align-items     : center;
        opacity         : ${helpBoxOpacity};
    }
    .help-box img {
        margin-right: 8px;
    }
    /*---------------------------------------------
        \\\\// Hover over the diagram to interact
      --------------------------------------------*/



    /*---------------------------------------------
        //\\\\ study-lab buttons
      --------------------------------------------*/
    .bsl-approot.studylab  .capture-button,
    .bsl-approot.studylab  .change-model-data-button,
    .bsl-approot.studylab  .change-tools-button {
        display : flex;
    }
    .capture-button,
    .change-model-data-button,
    .change-tools-button {
        display : none;
    }

    .studylab-button,
    .capture-button,
    .change-model-data-button,
    .change-tools-button {
        float:right;
        margin-top:8px;
        margin-right:5px;
        color: ${colorMediumGrey};
        font-size: 12px;
        padding: 0 16px;
        border-radius: ${borderRadius};
        border : 1px solid grey;
        align-items: center;
        cursor:pointer;
    }
    .studylab-button img,
    .capture-button img,
    .change-model-data-button img,
    .change-tools-button img {
        margin-right: 8px;
    }
    .studylab-button:hover,
    .capture-button:hover,
    .change-model-data-button:hover,
    .change-tools-button:hover {
        border : 1px solid black;
        color : black;
    }
    /*---------------------------------------------
        \\\\// study-lab buttons
      --------------------------------------------*/


    /*********************************************/
    .todo-this-fails-for-fancy-handlers {
    }
    .tp-thickness,
    .tp-media_scale {
        display : none;
    }
    .rgtools .tp-thickness,
    .rgtools .tp-media_scale {
        display : block;
    }
    /*********************************************/

    .content-list {
      border:2px solid #dddddd;
      border-radius:25px;
      padding:15px 20px 20px 0px;
      cursor: default;
    }
    .content-list>div {
       height:400px;
       padding-right:10px;
       overflow: auto;
    }
    .content-list .lemma-item-title {
        display : inline-block;
        padding : 4px 8px 2px 1px;
        border-radius : 10px;
        border : 1px solid #cccccc;
        background-color : white;
    }
    .content-list .lemma-item-title.go-to-front-page {
        padding-left : 6px;
        padding-bottom : 4px;
        cursor: pointer;
    }
    
    .content-list .lemma-item-title:hover {
        transform : scale(1.1);
        color : #ffffff;
        background-color : #999999;
   }
   .home-button.master-pagination-btn:hover {
        transform : scale(1.0);
   }
}
`;
        return ret;
    };
})();