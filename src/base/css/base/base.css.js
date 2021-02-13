(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;
    var cssmods = sn('cssModules');
    var sapp    = sn('sapp');


    var THIS_MODULE = 'base';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;

        var body_DesktopOverflow = fconf.sappId === 'home-pane' ?
                                   'overflow-x:hidden' :
                                   'overflow:hidden'
                                   //'overflow-y:hidden' //todo ... why?
                                   //overflow:auto'    //breaks
        ;


// //\\ css /////////////////////////////////////////
//core css for /sites and /main-site
var ret = `

    html, body
    { 
        /* //\\\\ added for lemma9 */
        width   :   100%;
        height  :   100vh;
        padding :   0;
        margin  :   0;
        border:none;
        /* \\\\// added for lemma9 */

        background-color:${ccs['color-light']};
        font-size:15px; /*this defines what 1rem is */
        overflow-x: hidden;
        overflow-y: hidden;
    }

    /* added for lemma9 */
    body
    { 
        ${body_DesktopOverflow}
    }

    .bsl-approot {
        position    : relative;
        width       : 100%;
        height      : 100vh;
        margin      : 0;
        padding     : 0;
        /* overflow    : auto;  todo */
        overflow    : hidden; /* todo why needed for shift-up-bug-making-hidden? */
    }


    @media only screen and (max-width:${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
        html,
        body,
        .bsl-approot
        { 
            height  : auto;
            overflow-y:auto;
        }
    }


    a:link{
        color:${ccs['color-main']};
    }

    a:visited{
        color:${ccs['color-main']};
        
    }

    @media only screen and (max-width:720px){
        .btn--how-to{
            display: none !important; /* tod? */
        } 
    }

`;
// \\\\// css /////////////////////////////////////////




        return ret;
    };
})();


