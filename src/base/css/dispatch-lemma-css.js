( function() {
    var {
        ns, sn, cssp, engCssMs,
        fconf, sDomN 
    } = window.b$l.apptree({
    });
    engCssMs.places_engineCSSes2styleTags = places_engineCSSes2styleTags;
    engCssMs['menu-on-left'] = createsMenuCss;
    return;

    ///no not site wide ... not for home page
    ///only for lemmas/lessons
    function places_engineCSSes2styleTags() 
    {
        //does break app if do it conventional way
        //            site-sapp

        //data-entry: put module names here in order
        `
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

    function createsMenuCss( cssp, fconf ) {
        var theorionChildWidth = (100 / sDomN.theorionMenuMembersCount).toFixed();
        var aspectionChildWidth = (100 / sDomN.aspectionMenuMembersCount).toFixed();
        var leftTopLeafLength =
            ( sDomN.aspectionMenuMembersCount * fconf.LEFT_SIDE_MENU_ITEM_LENGTH ).toFixed();

        let root = document.documentElement;
        root.style.setProperty('--theorionChildWidth', theorionChildWidth);
        root.style.setProperty('--aspectionChildWidth', aspectionChildWidth);
        root.style.setProperty('--leftTopLeafLength', leftTopLeafLength);

        //===========================
        // //\\ shuttle 
        //===========================
        // //\\ setting up shuttle CSS for all possible menu leaf choices
        var ret;
        for( var ix=0; ix<sDomN.theorionMenuMembersCount; ix++ ) {
            ret += `
                .menu-teaf.theorion .decorated.litem-${ix},
                .menu-teaf.theorion .litem-${ix},
                .menu-teaf.theorion .shuttle-${ix} {
                    left       :${theorionChildWidth*ix}%;
                }
                .menu-teaf.theorion .shuttle-${ix} {
                    transition :top 0.3s ease-in-out, left 0.5s ease-in-out;
                }
            `;
        }

        for( var ix=0; ix<sDomN.aspectionMenuMembersCount; ix++ ) {
            ret += `
                .menu-teaf.aspect .decorated.litem-${ix},
                .menu-teaf.aspect .litem-${ix},
                .menu-teaf.aspect .shuttle-${ix} {
                    left       :${aspectionChildWidth*ix}%;
                }
                .menu-teaf.aspect .shuttle-${ix} {
                    transition :top 0.3s ease-in-out, left 0.5s ease-in-out;
                }
            `;
        }

        return ret;
    }

}) ();

