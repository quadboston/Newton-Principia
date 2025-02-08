( function() {
    var {
        ns, sn, cssp, engCssMs,
        fconf,
    } = window.b$l.apptree({
    });
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
                var cssGenerator = engCssMs[ modname ];
                var cssTxt = cssGenerator( cssp, fconf );
                //update( moreText, htmlkey )
                ns.globalCss.update( //addText(
                    decorateText( cssTxt, modname ),
                    'lemma-style'
                );
            }
        });
    }

    function decorateText( text, modname )
    {
        return ` 
    /******************************************
       //\\\\ css lemma module = ${modname}
    ******************************************/
    ${text}        
    /******************************************
       \\\\// css lemma module = ${modname}
    ******************************************/
    `;
    }
}) ();

