(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'essaion-pane';

    cssmods[THIS_MODULE] = function( cssp, fconf ) {
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
        ret += `
            .subessay-menu-container {
                margin-top      : 13px;
                padding         : 5px;
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
                color           : #888888;
                background-color: white;
                cursor          : pointer;
            }

            .subessay-toggler.subexeg-toggler-chosen:hover,
            .subessay-toggler.subexeg-toggler-chosen {
                color           : black;
                background-color: #dddddd;
            }

            .subessay-toggler:hover {
                color           : #444444;
                background-color: #bbbbbb;
            }
        `;
        return ret;
    }
})();


