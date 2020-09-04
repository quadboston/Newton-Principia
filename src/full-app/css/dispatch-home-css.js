( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    cssmods.adds_home8lemma_baseCss = adds_home8lemma_baseCss;
    return;








    function adds_home8lemma_baseCss() 
    {

        //data-entry: put module names here in order
        `
            reset
            base
            typography
            homepage-basics
            home-pane
            inner-page
        `

        .split(/\r\n|\n/g)
        .forEach( function( modname ) {
            modname = modname.replace(/\s+/g,'');
            if( modname ) {

                //todm: the home and lemma styles are not yet completely separated;
                //-----------------------------------------------------------
                // //\\ this places reset and home-pane into 'home' styleTag;
                //      the rest will go to "default" tag with less
                //      css-precedence than "home";
                //-----------------------------------------------------------
                var styleTag =
                    modname === 'base' ||
                    modname === 'typography' ||
                    modname === 'homepage-basics' ||
                    //modname === 'home-pane' ||
                    modname === 'inner-page'

                    ? 'default' : 'home';
                //-----------------------------------------------------------
                // \\// this places reset and home-pane into 'home' styleTag;
                //-----------------------------------------------------------


                ns.globalCss.addText(
                    decorateText( cssmods[ modname ]( cssp, fconf ), modname ),
                    styleTag
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

