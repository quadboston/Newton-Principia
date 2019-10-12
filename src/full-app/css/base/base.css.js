(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;
    var cssmods = sn('cssModules');
    var sapp    = sn('sapp');


    var THIS_MODULE = 'base';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;

        var body_DesktopOverflow = fconf.sappId === 'home-pane' ?
                                   'overflow-x:hidden' : 'overflow:hidden';

// //\\ css /////////////////////////////////////////
var ret = `

    /******************************************/
    /* //\\\\ html, body                      */
    /******************************************/
    html, body
    { 
        /* //\\ added for lemma9 */
        width:100%;
        height:100%;
        padding:0;
        margin:0;
        border:none;
        /* \\// added for lemma9 */

        background-color:${ccs['color-light']};
        font-size:15px; /*this defines what 1rem is */
    }

    /* //\\ added for lemma9 */
    body
    { 
        ${body_DesktopOverflow}
    }
    @media only screen and (max-width:${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
        body
        { 
            overflow-y:auto;
            overflow-x:hidden;
        }
    }
    /* \\// added for lemma9 */

    


    /******************************************/
    /* \\// html, body                        */
    /******************************************/


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
// \\// css /////////////////////////////////////////




        return ret;
    };
})();


