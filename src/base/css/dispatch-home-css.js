( function() {
    var {
        ns, sn, cssp, engCssMs,
        fconf,
    } = window.b$l.apptree({
    });
    engCssMs.dispatchesHome8LemmaCss = dispatchesHome8LemmaCss;
    return;



    function dispatchesHome8LemmaCss() 
    {
        //presence of "reset" module as the first
        //apparenlty indicates that "home" style tag will be before
        //style tag with class "default"
        
        //data-entry: put module names here in order
        `
            reset
            typography
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
                    //modname === 'home-pane' || //does put it in "home" style tag
                    modname === 'inner-page'
                    ? 'default' : 'home';
                //-----------------------------------------------------------
                // \\// this places reset and home-pane into 'home' styleTag;
                //-----------------------------------------------------------

                //this creates rack for style tag, tags-precedence, but awaits for
                //"click-function" which sets is front-pane visible or not,
                ns.globalCss.addText(
                    decorateText( engCssMs[ modname ]( cssp, fconf ), modname ),
                    styleTag
                );
                //this does not seem required:
                //ns.globalCss.update(
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

