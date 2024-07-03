( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var engCssMs     = sn('engCssMs');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    engCssMs.places_engineCSSes2styleTags = places_engineCSSes2styleTags;
    return;







    ///no not site wide ... not for home page
    ///only for lemmas/lessons
    function places_engineCSSes2styleTags() 
    {
        //does break app if do it conventional way
        //            site-sapp

        //data-entry: put module names here in order

        `
            nav-bar-and-drawer
            checkbox
            tabs
            dom-subroots
            essaion-pane
            menu-on-left
        `

        .split(/\r\n|\n/g)
        .forEach( function( modname ) {
            modname = modname.replace(/\s+/g,'');
            if( modname ) {
                ////this list is prone to manual-errors, commas, etc
                ////this is why this debug-style-coding
                var wwFun = engCssMs[ modname ];
                var ww = wwFun( cssp, fconf );
                ns.globalCss.addText(
                    decorateText( ww, modname )
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

