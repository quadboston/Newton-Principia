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
        var romans      = fconf.appview.lemmaRomanNumbers;
        var pmode       = sapp.pageMode;
        var ln          = sapp.lemmaNumber;
        var landingPath = window.location.pathname;

        if( pmode === 'lemma' ) {
            var lemmaRomanNumber = romans[ln];
            document.title = 'Lemma ' + lemmaRomanNumber.toUpperCase();
        } else {
            var ln = '';
        }
        var body = '';










        //==================================================
        // //\\ creates application root
        //==================================================
        // http://sites.trin.cam.ac.uk/manuscripts/NQ_16_200/manuscript.php?fullpage=1/
        body += `
               <div id="${pmode}${ln}" class="bsl-approot">
        `;
        //==================================================
        // \\// creates application root
        //==================================================





        //==================================================
        // //\\ lemma nav bar
        //==================================================
        if( pmode === 'lemma' ){
            /*
            if( ln !== 9 ) {
                    <!-- seems not in use completely: its css is commented out -->
                    <!--
                    <script src="src0/cards.js"></script>
                    -->
            }
            */
 
            body += `
                <div class="bottom-nav"> 
                    <div class="mobile-page-btn">
                        <a href="lemma${ln}.html" class="btn btn__pagination btn__pagination--left">
                            <img src="images/left-arrow.svg">
                        </a>
                        <div class="video-btn">Watch Video</div>
                        <a href="lemma${ln}.html" class="btn btn__pagination btn__pagination--right">
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
                            <h1>Lemma ${lemmaRomanNumber}</h1>
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
                    An Interactive Exploration <br><span>of</span> Newton’s Lemmas
                </a>
                <ul>
        `;



        //--------------------------------------------------
        // //\\ builds list of nav drawer links
        //--------------------------------------------------
        fconf.enabledLemmas.forEach( function(lnumber) {
            var romann = romans[lnumber];
            var selected = lnumber === ln ? ' selected' : '';
            body += `
                        <li class="nav-drawer__list-item${selected}">
                            <div class="nav-drawer__dot">
                                <img src="images/nav-dot.svg">
                            </div>
                            <a href="${landingPath}?conf=lemma=${lnumber}">
                                <h3 class="nav-drawer__list-item__title">Lemma ${romann}</h3>
                                <span class="nav-drawer__list-item__desc">Lorem ipsum dolor set 
                                ipsum set dolor acnut lima noir set lorem ipsum doler sut.</span>
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

            var romann = fconf.appview.lemmaRomanNumbers[ln];
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
