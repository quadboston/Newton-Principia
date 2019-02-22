( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    cssmods.initSiteWideCSS = initSiteWideCSS;
    //0000000000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000000000








    function initSiteWideCSS(cssp, fconf) 
    {
        //data-entry: put module names here in order
        `
            reset
            base
            typography
            landing
            inner-page
            nav-bar-and-drawer
            pagination
            checkbox
            tabs
            how-to
            main-sapp
            menu-on-top
            essaion-pane
            menu-on-left
        `



        .split(/\r\n|\n/g)
        .forEach( function( modname ) {
            modname = modname.replace(/\s+/g,'');
            if( modname ) {
                ns.globalCss.addText(
                    decorateText( cssmods[ modname ]( cssp, fconf ), modname )
                );
            }
        });
    }





    function decorateText( text, modname )
    {
        return ` 
    /******************************************
       //\\\\ css module = ${modname}
    ******************************************/
    ${text}        
    /******************************************
       \\\\// css module = ${modname}
    ******************************************/
    `;
    }

}) ();

