/*
    notes for menu items GUI: the tree is:
    menu-teath
        tleaf-decorations-container
            shape shuttle-...
            shape
            shape
        litem
        litem
        litem

    * litem:hover brings border to the tab at user's mouse move
    * tleaf-decorations-container contains "shadows", different shapes and shuttle
      which animate mouse moves,
*/



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

    .leftside-menuholder
    .menu-teaf {
        display         :inline-block;
    }
    /*
    // //|| toggles study teafs visibility
    .bsl-approot .leftside-menuholder .studylab.menu-teaf {
        display         :none;
    }
    .bsl-approot.studylab .leftside-menuholder .studylab.menu-teaf {
        display         :inline-block;
    }
    // ||// toggles study teafs visibility
    */

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
        width       : calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH}px);
    }
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
    /*      .litem is a menu-item-GUI */
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
    /* /// todm what? ... was used to set background under shadow and handle
       /// todm is redundant ... shadow and handle can use z-index < 0
       /// holds shadow and handle
    */
    ret += `

    .leftside-menuholder
    .tleaf-decorations-container {
        box-sizing      :border-box;
        position        :absolute;
        left            :0;
        top             :1px; /* makes litem top and bottom borders visible */
        width           :100%;
        background-color:transparent;
        z-index         :0;
        white-space     :nowrap;
    }
    `;


    /* 
       18px causes 1px bottom border overlap on hover,
       20px hides all borders for chosen item and make it non-responsive,
       17px reveals upper and bottom litem-borders even when chosen item is hovered,
       see comment on this module's top
    */
    ret += `

    .leftside-menuholder
    .tleaf-decorations-container .shape {
        height      :17px;
    }

    /* //|| shadow     */
    .leftside-menuholder .shadow {
        display         :inline-block;
        background-color:#CCCCCC;
        opacity         :0.5;
        z-index         :1;
    }
    /* ||// shadow     */



    /* //|| toggles studylab     */
    .bsl-approot.studylab .menu-teaf .shadow.shape.studylab,
    .bsl-approot.studylab .menu-teaf .litem.studylab {
        display         :inline-block;
    }
    .bsl-approot .menu-teaf .shadow.shape.studylab,
    .bsl-approot .menu-teaf .litem.studylab {
        display : none;
    }
    /* ||// toggles studylab     */
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


