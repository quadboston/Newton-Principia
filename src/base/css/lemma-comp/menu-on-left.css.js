/*
    notes for menu items GUI: the tree is:
    menu-teath
        shuttle-...
        litem
        litem
        litem

    * litem:hover brings border to the tab at user's mouse move
      which animate mouse moves,
*/



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);
    var FOCUS_COLOR = '#888888';
    var FOCUS_OFF_COLOR = '#888888';
    //var SHUTTLE_COLOR ='rgba(32, 41, 54, 0.4)';
    var SHUTTLE_COLOR ='rgba(150, 175, 200'; //6,7,8 150, 175, 200//'rgba(70, 92, ad, 0.4)';
    var SHUTTLE_BG_COLOR ='rgba(245, 245, 255)';

    var engCssMs = sn('engCssMs');
    var THIS_MODULE = 'menu-on-left';
    engCssMs[THIS_MODULE] = function( cssp, fconf ) {
        var theorionChildWidth = (100 / sDomN.theorionMenuMembersCount).toFixed();
        var aspectionChildWidth = (100 / sDomN.aspectionMenuMembersCount).toFixed();
        var leftTopLeafLength =
            ( sDomN.aspectionMenuMembersCount * fconf.LEFT_SIDE_MENU_ITEM_LENGTH ).toFixed();



    //--------------------------------------
    // //\\ top level geometrical-containers
    //--------------------------------------
     var ret = `

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
     
     
    /*******************************************/
    /* top-level geometrical sub-containers    */
    /*******************************************/
    /* geometrically contains all button-shapes and decorations */
    /* theorion and aspection */
    .menu-teaf {
        position        :relative;
        display         :inline-block;
        padding         :0;
        margin          :0;
    }
    .menu-teaf {
        vertical-align  :top;
        white-space     :nowrap;
    }
    
    /*
        // //|| toggles study teafs visibility
        .bsl-approot .studylab.menu-teaf {
            display         :none;
        }
        .bsl-approot.studylab .studylab.menu-teaf {
            display         :inline-block;
        }
        // ||// toggles study teafs visibility
    */

    /* aspection */
    .menu-teaf.aspect {
        width       : ${leftTopLeafLength}px;
    }

    /* theorion */
    .menu-teaf.theorion {
        width       : calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH}px);
    }
    `
    //--------------------------------------
    // \\// top level geometrical-containers
    //--------------------------------------

    



    //-------------------------------
    // //\\ common decorations
    //      padding-top :0px; does fix Chrome, but distorts FireFox
    //      FireFox needs 1px; todm what is the problem?
    //-------------------------------
    ret += `
    .menu-teaf .litem {
        position        :absolute;
        box-sizing      :border-box;
        height          :20px;
        padding-top     :0px;
        border-radius   :10px;
        border          :1px solid transparent;
        border-color    :transparent;
        margin          :0;
        cursor          :pointer;
        opacity         :1;
        z-index         :30;
    }
    .menu-teaf.theorion .litem {
        width           :${theorionChildWidth}%;
    }
    .menu-teaf.aspect .litem {
        width           :${aspectionChildWidth}%;
    }
    .menu-teaf .litem.shuttle {
        box-shadow       : 0 0px 10px 0 ${SHUTTLE_COLOR}, 0.4);
        border           : 3px solid ${SHUTTLE_COLOR}, 1);
        background-color : ${SHUTTLE_BG_COLOR};
        z-index          : 20;
    }
    .menu-teaf .decorated.litem {
        border          :1px solid ${FOCUS_OFF_COLOR};
        z-index         :10;
    }
    `;
    //-------------------------------
    // \\// common decorations
    //-------------------------------








    //-------------------------------
    // //\\ fluid part = li-item
    //-------------------------------
    ret += `

    .litem .caption {
        position        :relative;
        background-color:transparent;
        width           :98%;
        font-size       :80%;
        font-weight     :bold;
        padding-right   :0;

        /* todm: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        top             :50%;
        transform       :translate(0%, -50%);
        text-align      :center;
        color           :${FOCUS_OFF_COLOR};
    }

    /* //|| item is focused */
    .menu-teaf .litem.chosen .caption,
    .menu-teaf .litem:hover .caption {
        color :${FOCUS_COLOR};
    }
    .menu-teaf .decorated.hovered {
        border:1px solid ${FOCUS_COLOR};
        box-shadow: 0 0px 14px 0 rgba(32, 41, 54, 0.6);
    }
    /* ||// item is focused */
    `;
    //-------------------------------
    // \\// fluid part = li-item
    //-------------------------------




    //-----------------------------
    // //\\ animated-decorations
    //-----------------------------
    ret += `

    /* //|| toggles studylab     */
    .bsl-approot.studylab .menu-teaf .litem.studylab,
    .bsl-approot.studylab .menu-teaf .litem.studylab {
        display         :inline-block;
    }
    .bsl-approot .menu-teaf .litem.studylab,
    .bsl-approot .menu-teaf .litem.studylab {
        display : none;
    }
    /* ||// toggles studylab     */
    `;


    //===========================
    // //\\ shuttle 
    //===========================
    // //\\ setting up shuttle CSS for all possible menu leaf choices
    for( var ix=0; ix<sDomN.theorionMenuMembersCount; ix++ ) {
        ret += `
            .menu-teaf.theorion .decorated.litem-${ix},
            .menu-teaf.theorion .litem-${ix},
            .menu-teaf.theorion .shuttle-${ix} {
                left       :${theorionChildWidth*ix}%;
            }
            .menu-teaf.theorion .shuttle-${ix} {
                transition :top 0.3s ease-in-out, left 0.5s ease-in-out;
            }
        `;
    }
    ret += `
        .menu-teaf .litem .caption {
            transition :color 0.3s ease-in-out;
        }
    `;

    for( var ix=0; ix<sDomN.aspectionMenuMembersCount; ix++ ) {
        ret += `
            .menu-teaf.aspect .decorated.litem-${ix},
            .menu-teaf.aspect .litem-${ix},
            .menu-teaf.aspect .shuttle-${ix} {
                left       :${aspectionChildWidth*ix}%;
            }
            .menu-teaf.aspect .shuttle-${ix} {
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


