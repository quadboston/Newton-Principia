( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    cssmods.initSiteWideCSS = initSiteWideCSS;
    return;







    /*
        it was:
        @import "base/variables";
        @import "base/base";
        @import "base/typography";
        @import "pages/landing";
        @import "pages/inner-page";
        @import "components/nav-bar-and-drawer";
        @import "components/switch";
        @import "components/slider";
        @import "components/pagination";
        @import "components/checkbox";
        @import "components/tabs";
        @import "components/how-to";
        @import "components/model";
    */
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
            topic
            pagination
            checkbox
            tabs
            how-to
            main-sapp
            sapp-slider-menu-topic
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

