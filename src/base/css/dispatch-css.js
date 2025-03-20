( function() {
    var {
        ns, sn, cssp, engCssMs,
        sconf, fconf, sDomN 
    } = window.b$l.apptree({
    });
    const root = document.documentElement;
    engCssMs.dispatches_css = dispatch_css; //called from app-main.js to init variable css
    engCssMs['menu-on-left'] = createsMenuCss;
    return;

    function dispatch_css() 
    {
        //ensures css vars are correct
        root.style.setProperty('--main_horizontal_dividor_width_px', sconf.main_horizontal_dividor_width_px + "px");
        root.style.setProperty('--doDisplayPageTopNavigatMenu', fconf.doDisplayPageTopNavigatMenu ? 'flex' : 'none');
        root.style.setProperty('--LEFT_SIDE_MENU_WIDTH', fconf.LEFT_SIDE_MENU_WIDTH + "px");
        root.style.setProperty('--LEFT_SIDE_MENU_OFFSET_X', fconf.LEFT_SIDE_MENU_OFFSET_X + "px");

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

    /* text area horizontal and vertical tab buttons */
    function createsMenuCss( cssp, fconf ) {
        var logic_phaseChildWidth = (100 / sDomN.logic_phaseMenuMembersCount).toFixed();
        var aspectionChildWidth = (100 / sDomN.aspectionMenuMembersCount).toFixed();
        var leftTopLeafLength =
            ( sDomN.aspectionMenuMembersCount * fconf.LEFT_SIDE_MENU_ITEM_LENGTH ).toFixed();

        root.style.setProperty('--logic_phaseChildWidth', logic_phaseChildWidth);
        root.style.setProperty('--aspectionChildWidth', aspectionChildWidth);
        root.style.setProperty('--leftTopLeafLength', leftTopLeafLength);

        //===========================
        // //\\ shuttle 
        //===========================
        // //\\ setting up shuttle CSS for all possible menu leaf choices
        var ret;
        for( var ix=0; ix<sDomN.logic_phaseMenuMembersCount; ix++ ) {
            ret += `
                .menu-teaf.logic_phase .decorated.litem-${ix},
                .menu-teaf.logic_phase .litem-${ix},
                .menu-teaf.logic_phase .shuttle-${ix} {
                    left       :${logic_phaseChildWidth*ix}%;
                }
                .menu-teaf.logic_phase .shuttle-${ix} {
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