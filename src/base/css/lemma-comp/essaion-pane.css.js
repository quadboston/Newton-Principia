(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var engCssMs = sn('engCssMs');
    var THIS_MODULE = 'essaion-pane';

    engCssMs[THIS_MODULE] = function( cssp, fconf ) {
        var ret = `

            /* original text */
            .original-text {
                display     : none;
            }
            /*  this takes higher specifity to override generic display:none property:
                all the troubles it takes is to make text unfading up slowly
                div.leftside-menuholder
            */
            div.original-text.chosen {
                /* inline-block (vs block) makes left-menu floating nicer */
                display : inline-block;
            }



            .leftside-menuholder
            .original-text {
                box-sizing      :border-box;
                width           :calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH+10}px);
                padding         :20px;
                vertical-align  :top;
            }
            
            div.leftside-menuholder
            div.original-text {
                opacity:0;
            }

            div.leftside-menuholder
            div.original-text.chosen {
                position:relative;
                opacity:1;
                /* todm make this happen: */
                transition :opacity 1s ease-in-out;
            }

            .original-text {
                /* is this font really a fit? font-family :
                   'Goudy Old Style', 'Garamond', Montserrat, 'Times', serif; */
                font-family : 'Helvetica',sans-serif;
                color       : ${fconf.css['color-medium-grey']};
                line-height : 1.3;
            }
            .original-text h2,
            .original-text h1 {
                margin  :0;
                font-weight:200;
                color:${fconf.css['color-main']};
            }

            .captured-reference {
                cursor : pointer;
                color : #555555;
                background-color : #dddddd;
            }
            .captured-reference:hover {
                color : #000000;
            }
        `;


        //subessay-toggler
        //it shifts itself from the left menu by own margin 20px;
        //but essaying text shifts itself by of a parent padding 20px;
        //this is why "+50px" here:
        ret += `
            .subessay-menu-container {
                width           : calc(100% - ${fconf.LEFT_SIDE_MENU_WIDTH+50}px);
                margin-top      : 13px;
                padding         : 5px;
                margin-left     : 20px;
                border-radius   : 10px;
                border          : 1px solid #aaaaaa;
                background-color: #fefefe;
            }
            .subessay-menu-container {
                display         : none;
            }
            .subessay-menu-container.chosen {
                display         : inline-block;
            }
            .subessay-toggler {
                display         : inline-block;
                padding         : 3px 8px;
                margin-bottom   : 2px;
                border-radius   : 10px;
                cursor          : pointer;
            }



            .subessay-toggler {
                color           : #888888;
                background-color: white;
            }
            .subessay-toggler.subexeg-toggler-chosen,
            .subessay-toggler.user-untouched:hover,
            .subessay-toggler:hover {
                color           : #444444;
                background-color: #cccccc;
            }
            .subessay-toggler.user-untouched {
                color           : #888888;
                background-color: white;
            }

        `;


        ///from "essaion-pane.css.js"
        ///relates to activity-scenario,
        ///keeps some divs hidden until user clicks on activity,
        ///
        ///.subessay-had-user-clicked is a state of subessay,
        ///
        ///problem is that at least one activity is defined by default,
        ///which is non-permitted for some tutorials,
        ///
        ret += `
            .user-clicked-sensitive {
                display : none;
            }
            .subessay-had-user-clicked .user-clicked-sensitive {
                display : inline-block;
            }
        `;

        return ret;
    }
})();


