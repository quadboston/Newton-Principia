( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var engCssMs    = sn('engCssMs');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    engCssMs.dispatchesHome8LemmaCss = dispatchesHome8LemmaCss;
    return;








    function dispatchesHome8LemmaCss() 
    {

        //data-entry: put module names here in order
        `
            reset
            dom-roots
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
                    modname === 'dom-roots' ||
                    modname === 'typography' ||
                    modname === 'homepage-basics' ||
                    //modname === 'home-pane' ||
                    modname === 'inner-page'

                    ? 'default' : 'home';
                //-----------------------------------------------------------
                // \\// this places reset and home-pane into 'home' styleTag;
                //-----------------------------------------------------------

                /*
                ns.globalCss.addText(
                    decorateText( engCssMs[ modname ]( cssp, fconf ), modname ),
                    styleTag
                );
                */
                ns.globalCss.update(
                    decorateText( engCssMs[ modname ]( cssp, fconf ), modname ),
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

