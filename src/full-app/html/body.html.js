( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;
    var sapp        = sn('sapp' ); 
    var html        = sn('html');
    var rootvm      = sn('rootvm');

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);









    html.body = function()
    {
        var pmode       = sapp.pageMode;
        var landingPath = window.location.pathname;

        if( pmode === 'lemma' ) {
            var rootDomId = sapp.sappId;
            document.title = sapp.siteCaptionPlain;
        } else {
            var rootDomId = 'landing';
        }
        var body = '';










        //==================================================
        // //\\ creates application root
        //==================================================
        // http://sites.trin.cam.ac.uk/manuscripts/NQ_16_200/manuscript.php?fullpage=1/
        body += `
               <div id="${rootDomId}" class="bsl-approot">
        `;
        //==================================================
        // \\// creates application root
        //==================================================





        //==================================================
        // //\\ lemma nav bar
        //==================================================
        if( pmode === 'lemma' ){
            body += `
                <div class="bottom-nav"> 
                    <div class="mobile-page-btn">
                        <a class="btn page-btn mobile-link page-btn--left">
                            <img src="images/left-arrow.svg">
                        </a>
                        <a class="btn page-btn mobile-link page-btn--right">
                            <img src="images/right-arrow.svg">
                        </a>
                    </div>
                </div>
                <!--END bottom nav-->
            `;
        }
        //==================================================
        // \\// lemma nav bar
        //==================================================




        //==================================================
        // //\\ site-wide nav bar
        //==================================================
        body += `
                <div class="nav-bar">
                    <div class="btn btn__menu">
        `;


        ///this makes lines in master menu bar
        [1,2,3].forEach( function(lineN) {
            body += `
                    <span id="menu-line-${lineN}" class="btn__menu__bar">
                        <span class="btn__menu__bar--dot"></span>
                        <span class="btn__menu__bar--line"></span>
                    </span>
            `;
        });
        body += `
               </div>
        `;
        //==================================================
        // \\// site-wide nav bar
        //==================================================





        if( pmode === 'lemma' ) {
            //==================================================
            // //\\ lemma mobile nav bar
            //==================================================
            ///goes somewhere on top menu bar
            body += `
                    <div class="sub-nav-bar">
                            <!-- tmp: title on menu bar -->
                            <h1>${sapp.siteCaptionHTML}</h1>
                    </div>
                </div>
            `; 
            //==================================================
            // \\// lemma mobile nav bar
            //==================================================
        } else { 
            body += `
                </div>
                <div id="shade"></div>
            `;
        }



        //==================================================
        // //\\ nav drawer
        //==================================================
        body += `
            <div id="navDrawer" class="nav-drawer">
                <a href="index.html" class="nav-drawer__title">
                    ${sapp.siteCaptionHTML}
                </a>
                <ul>
        `;



        //--------------------------------------------------
        // //\\ builds list of nav drawer links
        //--------------------------------------------------
        fconf.sappModulesArray.forEach( function( sappItem ) {
            var selected = sappItem.sappId === sapp.sappId ? ' selected' : '';
            body += `
                        <li class="nav-drawer__list-item${selected}">
                            <div class="nav-drawer__dot">
                                <img src="images/nav-dot.svg">
                            </div>
                            <a href="${landingPath}?conf=sappId=${sappItem.sappId}">
                                <h3 class="nav-drawer__list-item__title">
                                    ${sappItem.caption}</h3>
                                <span class="nav-drawer__list-item__desc">${sappItem.annotation}
                                </span>
                            </a>
                        </li>
            `;
        });
        //--------------------------------------------------
        // \\// builds list of nav drawer links
        //--------------------------------------------------



        //--------------------------------------------------
        // //\\ builds other-links
        //--------------------------------------------------
        body += `
                </ul>
                <div class="other-links">
                    <a class="other-links__link" href="${landingPath}">
                            <span class="other-links__link__graphic">
                                <img src="images/back-arrow-link.svg">
                            </span>
                            <span class="other-links__link__text">
                                Back to home
                            </span>
                        </a>
                </div>
            </div>
        `;
        //--------------------------------------------------
        // \\// builds other-links
        // \\// nav drawer
        //==================================================



        if( pmode === 'lemma' ) {
            body += `
                <div id="shade"></div>
            <!-- END navigation markup ~~~~~~~~~~~~~~~~~ -->
            `;
        }
        //==================================================
        // nav markup end
        //==================================================




        //==================================================
        // //\\ sub-application switch
        //==================================================
        if( pmode === 'landing' ) {
            body += html.landingCore();
        } 
        //==================================================
        // \\// sub-application switch
        //==================================================







        return body;
    };


}) ();
