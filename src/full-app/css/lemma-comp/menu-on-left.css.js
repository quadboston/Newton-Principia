(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);


    var cssmods = sn('cssModules');
    var THIS_MODULE = 'menu-on-left';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var theorionChildWidth = (100 / sDomN.theorionMenuMembersCount).toFixed();
        var aspectionChildWidth = (100 / sDomN.aspectionMenuMembersCount).toFixed();
        var leftTopLeafLength =
            ( sDomN.aspectionMenuMembersCount * fconf.LEFT_SIDE_MENU_ITEM_LENGTH ).toFixed();



    //-------------------------------
    // //\\ top of containers tree
    //-------------------------------
     var ret = `

    /* theorion and aspection */
    .leftside-menuholder
    .menu-teaf {
        position        :relative;
        display         :inline-block;
        padding         :0;
        margin          :0;
        vertical-align  :top;
        white-space     :nowrap;
        box-sizing      :border-box;
    }

    /* aspection rotator to vertical direction */
    .left-side-menu-rotator {
        position    :relative;
        left        :${fconf.LEFT_SIDE_MENU_OFFSET_X}px;
        float       :left;
        width       :${fconf.LEFT_SIDE_MENU_WIDTH}px;
        height      :300px;
        transform   :rotate(90deg);
        box-sizing  :border-box;
        transform-origin: 0px 0px;
    }


    /* aspection */
    .leftside-menuholder
    .menu-teaf.aspect {
        width       : ${leftTopLeafLength}px;
    }

    /* theorion */
    .leftside-menuholder
    .menu-teaf.theorion {
        width       : calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH+10}px);
    }

    /* original text */
    .leftside-menuholder
    .original-text {
        box-sizing      :border-box;
        width           :calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH+10}px);
        padding         :20px;
        vertical-align  :top;
    }
    
    /* //|| this takes higher specifity to override generic display:none property:
            all the troubles it takes is to make text unfading up slowly
    */
    div.leftside-menuholder
    div.original-text {
        //position:absolute;
        //display:inline-block;
        //height:0px;
        opacity:0;
    }
    div.leftside-menuholder
    div.original-text.chosen {
        display:inline-block;
        position:relative;
        //height:auto;
        opacity:1;
        /* todm make this happen: */
        transition :opacity 1s ease-in-out;
    }
    /* ||// this takes higher specifity to override generic display:none property */

    `
    //-------------------------------
    // \\// top of containers tree
    //-------------------------------

    



    //-------------------------------
    // //\\ common decorations
    //-------------------------------
    ret += `
    /* common shape which makes litem, shadows, and handle aligned */
    .leftside-menuholder
    .menu-teaf
    .shape {
        box-sizing      :border-box;
        width           :${theorionChildWidth}%;
        border          :1px solid #CCCCCC;
        border-radius   :10px;
        /* alignes with original-text border if any */
        /* alignes with original-text border if any 
        border-left     :1px solid black;
        border-top      :1px solid black;
        border-right    :1px solid black;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        */
    }

    .leftside-menuholder .menu-teaf.theorion .shape {
        width           :${theorionChildWidth}%;
    }
    .leftside-menuholder .menu-teaf.aspect .shape {
        width           :${aspectionChildWidth}%;
    }
    `;
    //-------------------------------
    // \\// common decorations
    //-------------------------------








    //-------------------------------
    // //\\ fluid part = li-item
    //-------------------------------
    ret += `

    .leftside-menuholder
    .shape.litem  {
        border-color    :transparent;
        background-color:transparent;
        margin          :0;
        cursor          :pointer;
        opacity         :1;
    }        

    .leftside-menuholder
    .shape.litem {
        display:inline-block;
        text-align:center;
    }

    .leftside-menuholder
    .litem .caption {
        display         :inline-block;
        width           :98%;
        position        :relative;
        font-size       :80%;
        font-weight     :bold;
        padding-right   :0;

        /* todm: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        top             :50%;
        transform       :translate(0%, -17%);
        text-align      :center;
        color           :#AAAAAA;
    }

    /* vertical shifts somehow different for theorion and aspec, so
       this CSS-entry tries to adjust aspect-top-menu-node-caption */
    .leftside-menuholder .aspect
    .litem .caption {
        /* todm: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        transform       :translate(0%, -10%);
    }

    /* //|| item is hovered */
    .leftside-menuholder .menu-teaf
    .litem:hover {
        border          :1px solid black;
        color           :black;
    }
    .leftside-menuholder .menu-teaf
    .litem:hover .caption
    {
        color           :#000000;
    }
    .leftside-menuholder .menu-teaf
    .litem.chosen .caption
    {
        color           :#555555;
    }
    /* ||// item is hovered */
    `;
    //-------------------------------
    // \\// fluid part = li-item
    //-------------------------------




    //-----------------------------
    // //\\ animated-decorations
    //-----------------------------
    ret += `

    /* /// todm what? ... was used to set background under shadow and handle
       /// todm is redundant ... shadow and handle can use z-index < 0
       /// holds shadow and handle
    */
    .leftside-menuholder
    .tleaf-decorations-container {
        box-sizing      :border-box;
        position        :absolute;
        left            :0;
        top             :0;
        width           :100%;
        background-color:transparent;
        z-index         :0;
        white-space     :nowrap;
    }

    .leftside-menuholder
    .tleaf-decorations-container .shape {
        /* fixes empty shapes with poor borders */
        height      :18px;
    }

    /* //|| shadow     */
    .leftside-menuholder .shadow {
        display         :inline-block;
        background-color:#CCCCCC;
        opacity         :0.5;
        z-index         :1;
    }
    /* ||// shadow     */
    `;


    //===========================
    // //\\ shuttle 
    //===========================
    ret += `

    .leftside-menuholder .shuttle {
        position        :absolute;
        background-color:white;
        opacity         :1;
        z-index         :10;
    }
    `;
    // //\\ setting up shuttle CSS for all possible menu leaf choices
    for( var ix=0; ix<sDomN.theorionMenuMembersCount; ix++ ) {
        ret += `
            .leftside-menuholder .theorion .shuttle-${ix} {
                left       :${theorionChildWidth*ix}%;
                transition :top 0.3s ease-in-out, left 0.5s ease-in-out;
            }
        `;
    }

    for( var ix=0; ix<sDomN.aspectionMenuMembersCount; ix++ ) {
        ret += `
            .leftside-menuholder .aspect .shuttle-${ix} {
                left       :${aspectionChildWidth*ix}%;
                transition :top 0.3s ease-in-out, left 0.5s ease-in-out;
            }
        `;
    }
    // \\// setting up shuttle CSS for all possible menu leaf choices
    //===========================
    // \\// shuttle 
    //===========================
    // \\// animated-decorations
    //-----------------------------

    return ret;
    }
})();


