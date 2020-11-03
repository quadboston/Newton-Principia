(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'menu-on-top';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ret = 



// //\\ css /////////////////////////////////////////
`


    /*=======================================
     menu top leaf properties
     =======================================*/
    .bsl-menu .menu-teaf {
        position        :relative;
        display         :inline-block;
        float           :right;
        border-radius   :10px;

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
    /* .shape sets common decorational properties for litem, shadows, and handle
       and aligns them
    */
    .bsl-menu .shape {
        border          :1px solid black;
        border-radius   :15px;
        white-space     :nowrap;
    }

    /*-------------------*/
    /* //|| radio circle */
    /*-------------------*/
    .shadow .radio-circle,
    .litem .radio-circle,
    .shuttle .radio-circle {
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
    .litem .radio-circle {
        visibility:hidden;
    }
    .bsl-menu .litem .caption {
        display         :inline-block;
        position        :relative;
        font-size       :80%;
        padding-right   :5px;

        /* todm: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        top             :50%;
        transform       :translate(0%, -10%);
    }
    /*--------------------*/
    /* ||// fluid part    */
    /*--------------------*/







    /* /// was used to set background under shadow and handle
       /// todm is redundant ... shadow and handle can use z-index < 0
       /// holds shadow and handle
    */
    .bsl-menu .tleaf-decorations-container {
        position        :absolute;
        left            :0;
        top             :0;
        background-color:transparent;
        z-index:-1;
    }

    /* twin navitation controls: shadow and handle */
    .bsl-menu .shadow,
    .bsl-menu .shuttle {
        position        :absolute;
        width           :100%;
        background-color:#CCCCCC;
    }


    /* //|| shadow     */
    .bsl-menu .shadow {
        opacity         :0.5;
        z-index         :1;
    }
    /* ||// shadow     */


    /* //\\ moving handle     */
    .bsl-menu .shuttle {
        background-color:white;
        opacity         :1;
        z-index         :10;
    }
    /* \\// moving handle     */




    .litem:hover .radio-circle {
        visibility:visible;
    }
    .litem.chosen:hover .radio-circle {
        visibility:hidden;
    }





`;

// \\// css /////////////////////////////////////////





    return ret;
    }
})();


