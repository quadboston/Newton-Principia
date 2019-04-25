(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'essaion-pane';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ret = 



// //\\ css /////////////////////////////////////////
`

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
    .original-text {
        display     : none;
    }
    .original-text.chosen {
        display:inline-block;
    }
`;

// \\// css /////////////////////////////////////////





    return ret;
    }
})();


