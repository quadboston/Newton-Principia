(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'inner-page';





    cssmods[THIS_MODULE] = function( cssp, fconf ) {
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

    /*
    .${cssp}-media-root {
      width: calc(100% - 90px) ;
    }
    */


    .top-media-controls {
        position : relative;
    }

    /*--------------------------------------
        //|| master pagination button
      -------------------------------------*/
    .master-pagination-btn {
        box-sizing: border-box;
        display:inline-block;

        background-color: ${colorWhite};
        border-radius: ${borderRadius};
        cursor: pointer;

        white-space : nowrap;

        text-align:center;

        height: 29px;
        margin: 0 16px 0 16px;
        padding: 5px 8px 2px 8px;
        transition: all .2s ease;
        z-index: 1002;




    }

    .master-pagination-btn img {
        width : 7px;
        opacity : 0.5;
        margin-left: 5px;
        margin-right: 5px;
        vertical-align:middle;
    }

    /* //\\ effect of outstanding button in top menu */
    .master-pagination-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 0px 12px 0 rgba(32, 41, 54, 0.2);
        transition: all .2s ease;
    }
    .master-pagination-btn.current-lemma:hover,
    .master-pagination-btn.current-lemma {
        box-shadow: 0px 0 8px 0 rgba(32, 41, 54, 0.4);
        transform: scale(1.0);
    }
    .master-pagination-btn {
        transform: none;
        box-shadow: 0 0px 4px 0 rgba(32, 41, 54, 0.2);
    }
    /* \\// effect of outstanding button in top menu */

    .master-pagination-btn.non-displayed {
        display:none;
    }

    .middle-subnav-bar {
        margin:auto;
    }

    .home-button {
        width               : 190px;
        margin-left         : 35px;
        font-weight         : bold;
        color               : white;
        background-color    : #303946;
        z-index             : 1011;
    }

    .home-button:hover {
        background-color    : #404956;
    }

    .home-button.is-hidden:hover,
    .home-button.is-hidden {
        font-weight         : normal;
        color               : ${colorMediumGrey};
        background-color    : white;
    }


    /*--------------------------------------
        ||// master pagination button
      -------------------------------------*/


    /*---------------------------------------------
        //|| Hover over the diagram to interact
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
        ||// Hover over the diagram to interact
      --------------------------------------------*/



    /*---------------------------------------------
        //|| study-lab buttons
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
        ||// study-lab buttons
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



`;
        return ret;
    };
})();


