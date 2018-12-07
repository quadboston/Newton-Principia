(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'sapp-slider-menu-topic';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ret = 



// //\\ css /////////////////////////////////////////
`


    .sub-nav-bar.bsl-menu h1 {
        display :inline-block;
        float   :left;
    }

    /*=======================================
     //|| menu which follows burger-menu   
     =======================================*/
    .bsl-menu  .submenu.proof {
        /* replaced with tab-switch sitewide, as of ver 600 */
        display:none;
    }

    .bsl-menu .submenu {
        position:relative;
        display:inline-block;
        float       :right;
        border-radius:10px;

        /*
        this was vital at some CSS
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
        -moz-padding-start: 0px;
        */
        padding:0;
        margin:0;
        margin-right:10px;
    }




    /* //|| common handle features */

    /* /// was used to set background under shadow and handle
       /// todm is redundant ... shadow and handle can use z-index < 0
       /// holds shadow and handle
    */
    .bsl-menu .handle-background {
        position        :absolute;
        left            :0;
        top             :0;
        background-color:transparent;
        z-index:-1;
    }

    /* common shape which makes litem, shadows, and handle aligned */
    .bsl-menu .shape {
        border          :1px solid black;
        border-radius   :15px;
        white-space     :nowrap;
    }

    /* twin navitation controls: shadow and handle */
    .bsl-menu .shadow,
    .bsl-menu .handle {
        position        :absolute;
        width           :100%;
        background-color:#CCCCCC;
    }


    /*-------------------*/
    /* //|| radio circle */
    /*-------------------*/
    .bsl-menu .shadow .radio-circle,
    .bsl-menu .litem .radio-circle,
    .bsl-menu .handle .radio-circle {
        display         :inline-block;
        /* border          :1px solid black; shifts radio up ... why? */
        border-radius   :11px;
        width           :11px;
        height          :11px;
        margin-left     :5px;
        margin-right    :4px;
        background-image:radial-gradient(
            farthest-corner at 3px 3px,
                rgb(230,230,230) 0%,
                rgb(230,230,230) 5%,
                rgb(180,180,180) 30%,
                rgb(80,80,80) 60%,
                rgb(0,0,0) 100%
        );
    }
    /*-------------------*/
    /* \\|| radio circle */
    /*-------------------*/
    /* \\|| common handle features */


    /* //\\ shadow     */
    .bsl-menu .shadow {
        opacity         :0.5;
        z-index         :1;
    }
    /* \\// shadow     */


    /* //\\ moving handle     */
    .bsl-menu .handle {
        background-color:white;
        opacity         :1;
        z-index         :10;
    }
    /* \\// moving handle     */


    /*--------------------*/
    /* //|| fluid part    */
    /*--------------------*/
    .bsl-menu .litem.shape  {
        border-color    :transparent;
        background-color:transparent;
        margin          :0;
        margin-bottom   :3px;
        cursor          :pointer;
        opacity         :1;
    }        
    .bsl-menu .litem .radio-circle {
        visibility:hidden;
    }
    .bsl-menu .litem .caption {
        display         :inline-block;
        position        :relative;
        font-size       :80%;
        padding-right   :5px;

        /* todom: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        top             :50%;
        transform       :translate(0%, -10%);
    }
    /*--------------------*/
    /* \\// fluid part    */
    /*--------------------*/


    .bsl-menu .litem:hover .radio-circle {
        visibility:visible;
    }
    .bsl-menu .litem.chosen:hover .radio-circle {
        visibility:hidden;
    }

    /*=======================================*/
    /* \\// menu which follows burger-menu   */
    /*=======================================*/



    /******************************************/
    /* //\\ exegesis                          */
    /******************************************/
    .original-text {
        /* is this font really a fit? font-family : 'Goudy Old Style', 'Garamond', Montserrat, 'Times', serif; */
        font-family : 'Helvetica',sans-serif;
        color       : ${fconf.css['color-medium-grey']};
        line-height : 1.3;
        display     : none;
    }

    .original-text.chosen {
        display:block;
    }
    .original-text h2,
    .original-text h1 {
        margin  :0;
        font-weight:200;
        color:${fconf.css['color-main']};
    }
    @media only screen and (max-width: 800px) {
        .original-text.chosen.hidden {
            display:none;
        }
    }
    /******************************************/
    /* \\// exegesis                          */
    /******************************************/

`;

// \\// css /////////////////////////////////////////





    return ret;
    }
})();


