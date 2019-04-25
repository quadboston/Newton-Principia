( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    cssmods.initHomePageCSS = initHomePageCSS;
    //0000000000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000000000








    function initHomePageCSS(cssp, fconf) 
    {

        //data-entry: put module names here in order
        `
            reset
            base
            typography
            home-pane
            inner-page
            how-to
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

